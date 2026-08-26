"use strict";

// Answers one question: is the durable host serving the boards this repository
// holds, byte for byte?
//
//   node check-current.js [--url <build-info url>] [--ref <rev>] [--json]
//
// Exit 0 when production is current, or has drifted only by commits that cannot
// change a deployed byte. Exit 1 otherwise — including when the answer could
// not be measured at all.
//
// WHY THIS EXISTS
//
// The boards host had no currency check. The PWA has had one since production
// went stale twice — once for seventeen days, once by four commits on the day
// the fix in them landed — and both were caught by a human happening to look.
// On 2026-08-26 the boards host repeated it in miniature: Cloudflare created
// production deployments that completed successfully and were never aliased, so
// boards.skyrailreclamation.com served a build ~30 minutes stale (CFD-199). It
// was caught only because a landing happened to be in flight. Nothing was
// watching, and the index page's own footer says "a board is not delivered
// until its bytes hash-match on this host."
//
// This is the thing that watches, and it grades the footer's claim rather than
// a version string: every board's sim.js is fetched and hashed against the blob.
// sim.js is uninjected, unlike HTML, which the durable host rewrites with a
// +359 B Cloudflare Insights beacon — so HTML can never hash-match live and is
// deliberately not graded here.
//
// TWO RULES IT INHERITS FROM THE HOUSE
//
//   Prefer null to a plausible number. An unreachable host, an unreadable
//   build-info, or a live sha this checkout does not contain are all reported
//   as UNAVAILABLE and all exit 1. An unavailable measurement is never a pass.
//
//   A gate that is permanently red stops being read. Drift is the NORMAL state
//   between a merge and a deploy, so this runs on a daily schedule rather than
//   per push, and docs-only drift is a pass rather than a failure.
//
// The decision is `decide()`, which takes its git and fetch as injected
// dependencies so test/deploy-current.test.js can reach the branches the real
// ones make unreachable — "not a checkout", "host unreachable", "live sha
// unknown here". Those are exactly the cases a currency check gets wrong, and
// CFD-148 is on the board because the PWA's equivalent shipped without a test.

const DEFAULT_URL = "https://boards.skyrailreclamation.com/build-info.json";
const SHIPPED_PREFIX = "public/";

// Pure. Knows nothing about the network, the clock, or the filesystem.
//
//   liveInfo      the parsed build-info.json, or null if it could not be read
//   expectedSha   what the host SHOULD be serving, or null if not a checkout
//   changedPaths  paths between live and expected, or null if not measurable
//   boards        [{ id, liveHash, blobHash }] — liveHash null if unfetchable
function decide(input) {
  const { liveInfo, expectedSha, changedPaths, boards } = input;
  const lines = [];
  const fail = (reason) => ({ ok: false, reason, lines });

  if (!expectedSha) {
    lines.push("UNAVAILABLE: not a git checkout, so there is nothing to compare against.");
    return fail("no-checkout");
  }
  if (!liveInfo || typeof liveInfo.commit !== "string") {
    lines.push("UNAVAILABLE: the host did not return a readable build-info.json.");
    lines.push("An unreachable deploy is not a passing deploy — this exits 1 on purpose.");
    return fail("host-unavailable");
  }

  lines.push(`live     ${liveInfo.commit}`);
  lines.push(`expected ${expectedSha}`);

  if (liveInfo.dirty === true) {
    lines.push("");
    lines.push("Production was built from a DIRTY tree. Kills recorded against this");
    lines.push("build cite a sha that does not describe its bytes.");
    return fail("dirty");
  }

  // The bytes come first: they are the claim the index page makes.
  const unfetchable = boards.filter((b) => b.liveHash === null).map((b) => b.id);
  const mismatched = boards.filter((b) => b.liveHash !== null && b.liveHash !== b.blobHash);

  if (unfetchable.length) {
    lines.push("");
    lines.push(`UNAVAILABLE: could not fetch sim.js for ${unfetchable.join(", ")}.`);
    return fail("board-unavailable");
  }
  if (mismatched.length) {
    lines.push("");
    for (const b of mismatched) {
      lines.push(`BYTES DIFFER  /${b.id}/sim.js  live ${b.liveHash}  repo ${b.blobHash}`);
    }
    lines.push("");
    lines.push("A board is not delivered until its bytes hash-match on this host.");
    return fail("bytes");
  }
  lines.push(`bytes    ${boards.length} board(s) hash-match the repository`);

  if (liveInfo.commit === expectedSha) {
    lines.push("");
    lines.push("Production is current.");
    return { ok: true, reason: "current", lines };
  }

  if (changedPaths === null) {
    lines.push("");
    lines.push("UNAVAILABLE: this checkout does not contain the live commit, so the");
    lines.push("drift could not be classified. Fetch, then re-run.");
    return fail("unknown-live-sha");
  }

  const shipped = changedPaths.filter((p) => p.startsWith(SHIPPED_PREFIX));
  lines.push("");
  lines.push(`Production is behind by ${changedPaths.length} changed path(s).`);
  if (shipped.length === 0) {
    lines.push("None of them touch a shipped path, so the deployed bytes are unaffected.");
    lines.push("Not a failure. Deploy when convenient.");
    return { ok: true, reason: "benign-drift", lines };
  }
  for (const p of shipped.slice(0, 12)) lines.push(`  ${p}`);
  if (shipped.length > 12) lines.push(`  ... and ${shipped.length - 12} more`);
  lines.push("");
  lines.push("These are shipped paths. Production is serving different bytes than main.");
  lines.push("Deploy: gh workflow run deploy.yml --ref main");
  return fail("stale");
}

module.exports = { decide, DEFAULT_URL, SHIPPED_PREFIX };

// ---------------------------------------------------------------- the shell

if (require.main === module) {
  const { execFileSync } = require("node:child_process");
  const crypto = require("node:crypto");
  const path = require("node:path");
  const fs = require("node:fs");

  const ROOT = __dirname;
  const argOf = (name, fallback) => {
    const i = process.argv.indexOf(name);
    return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
  };
  const url = argOf("--url", DEFAULT_URL);
  const asJson = process.argv.includes("--json");
  const origin = new URL(url).origin;

  const git = (args) => {
    try {
      return execFileSync("git", args, { cwd: ROOT, maxBuffer: 1 << 28 }).toString("utf8").trim();
    } catch {
      return null;
    }
  };

  (async () => {
    const expectedSha = argOf("--ref", null)
      ? git(["rev-parse", argOf("--ref", null)])
      : git(["rev-parse", "origin/main"]) || git(["rev-parse", "HEAD"]);

    const liveInfo = await fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);

    const boardIds = fs
      .readdirSync(path.join(ROOT, "public"), { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();

    const boards = [];
    for (const id of boardIds) {
      const blobHash = crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(ROOT, "public", id, "sim.js")))
        .digest("hex")
        .slice(0, 16);
      const liveHash = await fetch(`${origin}/${id}/sim.js`, { cache: "no-store" })
        .then((r) => (r.ok ? r.arrayBuffer() : null))
        .then((b) => (b ? crypto.createHash("sha256").update(Buffer.from(b)).digest("hex").slice(0, 16) : null))
        .catch(() => null);
      boards.push({ id, liveHash, blobHash });
    }

    let changedPaths = null;
    if (liveInfo && typeof liveInfo.commit === "string" && expectedSha) {
      const names = git(["diff", "--name-only", `${liveInfo.commit}..${expectedSha}`]);
      if (names !== null) changedPaths = names ? names.split("\n").filter(Boolean) : [];
    }

    const verdict = decide({ liveInfo, expectedSha, changedPaths, boards });
    if (asJson) {
      console.log(JSON.stringify({ ok: verdict.ok, reason: verdict.reason, url, expectedSha, live: liveInfo, boards }, null, 2));
    } else {
      console.log(`deploy   ${url}`);
      for (const l of verdict.lines) console.log(l);
    }
    process.exit(verdict.ok ? 0 : 1);
  })();
}

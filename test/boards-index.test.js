"use strict";

// CFD-197. public/index.html publishes a per-board hash line — hand-typed,
// and until this file existed, ungraded. It drifted: from 2026-08-24 the
// /dawnspur/ card published index 78efc96e / sim f9395d38 while the shipped
// bytes were bdde9b50 / 395c18f2, on the page whose own footer says "a board
// is not delivered until its bytes hash-match on this host". Two boards that
// had already passed a sit were also unlisted.
//
// WHICH BYTES ARE "SHIPPED" — read this before changing the instrument.
// What deploys is a fresh actions/checkout on ubuntu, so the shipped bytes
// are always the BLOB. On a Windows tree they need not be the bytes on disk:
// core.autocrlf is true repo-locally and conflicts with the `* -text` in
// .gitattributes, so a file whose index entry predates .gitattributes
// (7b3ddb6) keeps a CRLF worktree copy — and git reports it CLEAN, because
// the index caches the CRLF size and never compares content. Measured
// 2026-08-26, SEVEN tracked files were in that state, deploy.mjs and
// deploy.yml among them; heat's board files were the visible pair:
//   public/dawnspur-heat/index.html  disk f78697a2 (11510 B) / blob b5f7e14f (11219 B)
//   public/dawnspur-heat/sim.js      disk 99cba38d           / blob 292d6645
// The blob is the truth: the live host serves 292d6645 for heat's sim.js.
// All seven were normalised to their blob bytes the same day — no shipped
// byte moved, only the lying worktree copies. 7b3ddb6's claim that
// .gitattributes "ends the class" holds only for files added after it.
//
// The third test is the RATCHET that keeps it ended: no tracked file may
// differ from its blob unless git actually reports it modified. Silence is
// the defect — a file that lies while git calls it clean is how a passed
// board's bytes get rewritten by an unrelated checkout.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const INDEX = fs.readFileSync(path.join(PUBLIC, "index.html"), "utf8");
const NL = String.fromCharCode(10);

// MANIFEST.txt is deliberately excluded: it is a record about the board, not
// a shipped runtime file, and its own copies may legitimately differ.
const GRADED = ["index.html", "sim.js"];

const sha8 = (buf) => crypto.createHash("sha256").update(buf).digest("hex").slice(0, 8);
const git = (args) => execFileSync("git", args, { cwd: ROOT, maxBuffer: 1 << 28 });

function inHead(rel) {
  try { execFileSync("git", ["cat-file", "-e", "HEAD:" + rel], { cwd: ROOT, stdio: "ignore" }); return true; }
  catch { return false; }
}
const blob = (rel) => git(["cat-file", "blob", "HEAD:" + rel]);
// The bytes a fresh checkout would deploy. Uncommitted work reads from disk;
// the ratchet below is what makes that safe.
const shipped = (rel) => (inHead(rel) ? blob(rel) : fs.readFileSync(path.join(ROOT, rel)));

const boardDirs = () =>
  fs.readdirSync(PUBLIC, { withFileTypes: true })
    .filter((e) => e.isDirectory()).map((e) => e.name).sort();

function cards() {
  const out = [];
  const re = /<a class="board[^"]*" href="\/([a-z0-9-]+)\/">([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(INDEX))) out.push({ slug: m[1], body: m[2] });
  return out;
}

test("every hash the index publishes is the hash of the bytes that ship", () => {
  const found = cards();
  assert.ok(found.length > 0, "no board cards parsed out of public/index.html");
  for (const card of found) {
    for (const file of GRADED) {
      const rel = "public/" + card.slug + "/" + file;
      const published = new RegExp(file.replace(".", "\.") + " ([0-9a-f]{8})…").exec(card.body);
      assert.ok(published, "/" + card.slug + "/ card publishes no " + file + " hash");
      const actual = sha8(shipped(rel));
      assert.equal(
        published[1], actual,
        "/" + card.slug + "/ card says " + file + " is " + published[1] + "… but the shipped bytes are " +
          actual + "… — the index is the page that defines delivery as a hash match, so it may not " +
          "publish a hash that is not true",
      );
    }
  }
});

test("every board shipped under public/ has a card — a board cannot go live unlisted", () => {
  const carded = cards().map((c) => c.slug).sort();
  assert.deepEqual(
    carded, boardDirs(),
    "public/index.html cards " + JSON.stringify(carded) + " but public/ ships " +
      JSON.stringify(boardDirs()) + ". Add the card, with its measured hashes, in the same commit " +
      "that ships the board.",
  );
});

test("RATCHET: no tracked file silently differs from the bytes it ships", () => {
  const tracked = git(["ls-files"]).toString("utf8").split(NL).filter(Boolean);
  // Anything git reports as modified is a legitimate uncommitted edit.
  const dirty = new Set(
    git(["status", "--porcelain"]).toString("utf8").split(NL).filter(Boolean).map((l) => l.slice(3).trim()),
  );
  const silent = [];
  for (const rel of tracked) {
    if (dirty.has(rel)) continue;
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    if (sha8(blob(rel)) !== sha8(fs.readFileSync(abs))) silent.push(rel);
  }
  assert.deepEqual(
    silent, [],
    "these tracked files differ from their blob while git calls them clean: " + JSON.stringify(silent) +
      ". core.autocrlf is rewriting the worktree behind .gitattributes. Restore them from the blob " +
      "(rm + git checkout --), which changes no shipped byte — do not 'fix' the blob to match the worktree.",
  );
});

test("sit/ and public/ copies are byte-identical — sit is the source, public is what deploys", () => {
  for (const slug of boardDirs()) {
    const sitDir = path.join(ROOT, "sit", slug);
    if (!fs.existsSync(sitDir)) continue; // pre-sit/ boards are grandfathered
    for (const file of GRADED) {
      if (!fs.existsSync(path.join(sitDir, file))) continue;
      assert.equal(
        sha8(shipped("sit/" + slug + "/" + file)), sha8(shipped("public/" + slug + "/" + file)),
        "sit/" + slug + "/" + file + " and public/" + slug + "/" + file +
          " differ — the deployed copy is not the authored one",
      );
    }
  }
});

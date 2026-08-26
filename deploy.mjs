// Stamp build-info, deploy ONLY to Pages project skyrail-boards, fetch-verify the durable host.
// Usage: node deploy.mjs
// GitHub Actions secrets: CLOUDFLARE_API_TOKEN (required, boards-only) and CLOUDFLARE_ACCOUNT_ID (optional).
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const PROJECT = "skyrail-boards";
const VERIFY_ORIGIN = "https://boards.skyrailreclamation.com";
const DEFAULT_ACCOUNT_ID = "95aea3d30c8926aafa5296b257fe6386";
const VERIFY_ATTEMPTS = 6;
const VERIFY_DELAY_MS = 8_000;
// Every board the host serves, so a board that 404s after a deploy cannot pass.
// This listed 2 of 4 until CFD-197: heat and scale had both passed a sit and
// neither was checked.
const BOARD_PATHS = [
  "/dawnspur-dispatch/",
  "/dawnspur-scale/",
  "/dawnspur-heat/",
  "/dawnspur/",
  "/convoy-stop/",
];

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  fail("CLOUDFLARE_API_TOKEN is required (boards-only Pages token). Do not print or log the token.");
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || DEFAULT_ACCOUNT_ID;
const wranglerEnv = {
  ...process.env,
  CLOUDFLARE_API_TOKEN: token,
  CLOUDFLARE_ACCOUNT_ID: accountId,
};

const sha = execSync("git rev-parse HEAD").toString().trim();
const dirty = execSync("git status --porcelain").toString().trim().length > 0;

const stamp = {
  name: "Skyrail Boards",
  builtAt: new Date().toISOString(),
  commit: sha,
  dirty,
};
writeFileSync("public/build-info.json", JSON.stringify(stamp, null, 2) + "\n");

console.log(`stamped ${VERIFY_ORIGIN}/build-info.json commit=${sha}${dirty ? " (DIRTY — kills against this sha are suspect)" : ""}`);
console.log(`CLOUDFLARE_API_TOKEN: ${token ? "set" : "missing"}`);
console.log(`CLOUDFLARE_ACCOUNT_ID: ${accountId} (len ${accountId.length})`);

await assertExistingPagesProject();

console.log(`deploying to Pages project ${PROJECT} (never creating a project; workers.dev is not the product)`);
execSync(
  `npx --yes wrangler pages deploy public --project-name=${PROJECT} --branch=main --commit-hash=${sha} --commit-dirty=true`,
  { stdio: "inherit", env: wranglerEnv },
);

const live = await fetchVerifyBuildInfo(sha);
if (live.commit !== sha) {
  fail(
    `fetch-verify failed: ${VERIFY_ORIGIN}/build-info.json live.commit=${live.commit ?? "unreachable"} expected=${sha}. ` +
      `pages.dev / workers.dev is not success.`,
  );
}
console.log(`VERIFIED: ${VERIFY_ORIGIN}/build-info.json serves ${sha}`);

for (const path of BOARD_PATHS) {
  const url = `${VERIFY_ORIGIN}${path}`;
  const res = await fetch(url, { cache: "no-store", redirect: "follow" });
  assertProductHost(res.url);
  console.log(`board ${url} → ${res.status} (final ${res.url})`);
  if (res.status !== 200) {
    fail(`fetch-verify failed: ${url} returned ${res.status} (expected 200 after redirects)`);
  }
}

console.log("deploy verified on boards.skyrailreclamation.com");

async function assertExistingPagesProject() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${PROJECT}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    fail(
      `Pages project ${PROJECT} is not reachable (HTTP ${res.status}). ` +
        `Refusing to create a new project or publish a workers.dev name.`,
    );
  }
}

async function fetchVerifyBuildInfo(expected) {
  let last = { commit: null };
  for (let attempt = 1; attempt <= VERIFY_ATTEMPTS; attempt++) {
    const url = `${VERIFY_ORIGIN}/build-info.json`;
    const res = await fetch(url, { cache: "no-store", redirect: "follow" }).catch(() => null);
    if (!res) {
      console.log(`verify ${attempt}/${VERIFY_ATTEMPTS}: ${url} unreachable`);
    } else {
      assertProductHost(res.url);
      last = await res.json().catch(() => ({ commit: null }));
      if (last?.commit === expected) return last;
      console.log(
        `verify ${attempt}/${VERIFY_ATTEMPTS}: live=${last?.commit ?? "unreadable"} expected=${expected}`,
      );
    }
    if (attempt < VERIFY_ATTEMPTS) await sleep(VERIFY_DELAY_MS);
  }
  return last;
}

function assertProductHost(finalUrl) {
  let host;
  try {
    host = new URL(finalUrl).hostname;
  } catch {
    fail(`fetch-verify landed on unparseable URL ${finalUrl}`);
  }
  if (host.endsWith(".pages.dev") || host.endsWith(".workers.dev")) {
    fail(`fetch-verify landed on ${finalUrl} — pages.dev / workers.dev is not the product`);
  }
  if (host !== "boards.skyrailreclamation.com") {
    fail(`fetch-verify must hit ${VERIFY_ORIGIN} (got ${finalUrl})`);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

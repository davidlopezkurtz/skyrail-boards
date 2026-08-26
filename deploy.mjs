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

// CFD-199. A deploy that uploads, completes, and never reaches production used
// to fail with nothing but "live != expected" — six identical lines and no
// cause, which cost a round-trip to the account owner. The token is already in
// hand here, so ask it the question instead of guessing: is this deployment
// production or preview, and is the project's production branch the one we
// pushed? Prints non-secret facts only.
await reportDeploymentState();

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

async function cfApi(pathname) {
  const res = await fetch("https://api.cloudflare.com/client/v4" + pathname, {
    headers: { Authorization: "Bearer " + token },
  }).catch(() => null);
  if (!res || !res.ok) return null;
  const body = await res.json().catch(() => null);
  return body && body.success ? body.result : null;
}

// Never throws and never fails the run: this is an instrument, not a gate.
// The gate is fetchVerifyBuildInfo below.
async function reportDeploymentState() {
  const project = await cfApi(`/accounts/${accountId}/pages/projects/${PROJECT}`);
  const deployments = await cfApi(
    `/accounts/${accountId}/pages/projects/${PROJECT}/deployments?per_page=3`,
  );
  if (!project && !deployments) {
    console.log("deployment-state: UNAVAILABLE (Pages API unreachable or token lacks Pages:Read)");
    return;
  }
  if (project) {
    console.log(`project production_branch: ${project.production_branch ?? "unknown"} (deploying --branch=main)`);
    if (project.production_branch && project.production_branch !== "main") {
      console.log(
        `  ^ MISMATCH: deployments to main are PREVIEWS while production_branch is ${project.production_branch}. ` +
          `That is why production does not move. Fix the project's production branch, or deploy that branch.`,
      );
    }
  }
  for (const d of (deployments ?? []).slice(0, 3)) {
    const stage = d.latest_stage ? `${d.latest_stage.name}/${d.latest_stage.status}` : "unknown";
    console.log(
      `deployment ${(d.id ?? "").slice(0, 8)} env=${d.environment} branch=${d.deployment_trigger?.metadata?.branch ?? "?"} ` +
        `stage=${stage} aliases=${JSON.stringify(d.aliases ?? [])}`,
    );
  }
  const newest = (deployments ?? [])[0];
  if (newest && newest.environment !== "production") {
    console.log(
      `  ^ the deployment just created is env=${newest.environment}, NOT production — ` +
        `the durable host will not move until a production deployment exists.`,
    );
  }
}

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

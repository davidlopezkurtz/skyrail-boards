// Stamp build-info, deploy to the FIXED Pages project, verify by fetching.
// Usage: node deploy.mjs   (requires wrangler login or CLOUDFLARE_API_TOKEN)
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const PROJECT = "skyrail-boards";
const sha = execSync("git rev-parse HEAD").toString().trim();
const dirty = execSync("git status --porcelain").toString().trim().length > 0;

writeFileSync("public/build-info.json", JSON.stringify({
  name: "Skyrail Boards",
  builtAt: new Date().toISOString(),
  commit: sha,
  dirty,
}, null, 2) + "\n");

console.log(`deploying ${sha.slice(0, 7)}${dirty ? " (DIRTY — kills against this sha are suspect)" : ""}`);
execSync(`npx wrangler pages deploy public --project-name=${PROJECT} --commit-dirty=true`, { stdio: "inherit" });

// Verify by fetching — never assume the upload.
const live = await fetch(`https://${PROJECT}.pages.dev/build-info.json`, { cache: "no-store" }).then((r) => r.json()).catch(() => null);
if (live?.commit === sha) console.log(`VERIFIED: ${PROJECT}.pages.dev serves ${sha.slice(0, 7)}`);
else console.log(`NOT YET VERIFIED: live=${live?.commit?.slice(0, 7) ?? "unreachable"} expected=${sha.slice(0, 7)} — re-run the fetch in a minute, do not assume`);

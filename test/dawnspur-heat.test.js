"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Dawnspur = require("../sit/dawnspur-heat/sim.js");

// Live kill this sitting must not overwrite. Do not deploy.
const LIVE_INDEX = "bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59";
const LIVE_SIM = "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c";

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-heat/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-heat/sim.js"), "utf8");

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

// Committed bytes, not working-tree bytes: on a Windows autocrlf checkout the
// working tree holds CRLF for files git stores as LF, so fs.readFileSync gives
// a machine-dependent hash. The blob is the shipped artefact; hash the blob.
function gitBlob(p) {
  return execFileSync("git", ["cat-file", "blob", "HEAD:" + p], { cwd: ROOT });
}

function pathToFirstWarm() {
  const b = Dawnspur.createBoard({ fresh: true });
  assert.ok(b.commitGoods());
  assert.ok(b.commitB());
  assert.ok(b.commitHold());
  return b;
}

test("this branch does not recut git public/dawnspur or public/convoy-stop", () => {
  // Hashes measured from git at main 44e4d03; dawnspur's pair is the preserved kill.
  assert.equal(sha256(gitBlob("public/dawnspur/index.html")), "bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59");
  assert.equal(sha256(gitBlob("public/dawnspur/sim.js")), "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c");
  assert.equal(sha256(gitBlob("public/convoy-stop/index.html")), "f453b78964aaf9072c47f311036b8309a2a93b302c173a8552f2ea7638916137");
  assert.equal(sha256(gitBlob("public/convoy-stop/sim.js")), "5ad814e6eb9f8263be5dd224ae42497de932ec87b767a96399aaa4348a4a146f");
});

test("deploy copy public/dawnspur-heat is byte-identical to sit/dawnspur-heat", () => {
  // Working-tree reads, CRLF-normalized — not git blobs — because this pair is
  // staged in the same commit that edits sit/: while the patch is being
  // authored HEAD cannot see either side, so a blob read would grade the wrong
  // tree. Normalizing \r\n to \n makes the comparison machine-stable on
  // autocrlf checkouts; git stores both sides as LF, so LF-normalized equality
  // is byte equality of what gets committed.
  const norm = (p) => fs.readFileSync(path.join(ROOT, p), "utf8").replace(/\r\n/g, "\n");
  assert.equal(sha256(norm("public/dawnspur-heat/index.html")), sha256(norm("sit/dawnspur-heat/index.html")));
  assert.equal(sha256(norm("public/dawnspur-heat/sim.js")), sha256(norm("sit/dawnspur-heat/sim.js")));
});

test("pin live sit (host kill; do not overwrite)", () => {
  assert.equal(LIVE_INDEX, "bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59");
  assert.equal(LIVE_SIM, "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c");
  assert.equal(typeof Dawnspur.createBoard, "function");
  assert.equal(typeof Dawnspur.buildInfo, "function");
  assert.equal(Dawnspur.buildInfo().name, "Skyrail Boards");
});

test("marks ≥ 1 lights a job", () => {
  const b = Dawnspur.createBoard();
  assert.ok(b.marks >= 1);
  assert.ok(b.litJobs().length >= 1);

  const f = Dawnspur.createBoard({ fresh: true });
  assert.ok(f.commitGoods());
  assert.ok(f.marks >= 1);
  assert.ok(f.litJobs().length >= 1);
  assert.ok(f.commitB());
  assert.ok(f.marks >= 1);
  assert.ok(f.litJobs().length >= 1);
  assert.ok(f.commitHold());
  assert.ok(f.marks >= 1);
  assert.deepEqual(f.litJobs(), ["warm"]);
});

test("one B per wreck", () => {
  const b = Dawnspur.createBoard();
  assert.ok(b.canB());
  assert.ok(b.commitB());
  assert.equal(b.canB(), false);
  assert.equal(b.commitB(), false);
  assert.ok(!b.litJobs().includes("B"));
});

test("GOODS → B → HOLD → WARM lights in order", () => {
  const b = Dawnspur.createBoard({ fresh: true });
  assert.deepEqual(b.litJobs(), ["goods"]);
  assert.ok(b.commitGoods());
  assert.deepEqual(b.litJobs(), ["B"]);
  assert.ok(b.commitB());
  assert.deepEqual(b.litJobs(), ["hold"]);
  assert.ok(b.commitHold());
  assert.deepEqual(b.litJobs(), ["warm"]);
  assert.ok(b.commitWarm());
  assert.equal(b.warmed, true);
  assert.equal(b.heldA, true);
});

test("WARM does not spend a mark", () => {
  const b = pathToFirstWarm();
  const before = b.marks;
  assert.ok(before >= 1);
  assert.ok(b.commitWarm());
  assert.equal(b.marks, before);
});

test("WARM does not read marks", () => {
  // David refused marks gating WARM ("Marks do not buy it"). Pin the source
  // text so the coupling cannot silently return: on the sitting's own paths
  // marks is always >= 2 by phase "warm", so a reinstated marks clause would
  // be invisible to every behavioural fixture that starts from a reachable
  // state. The function's text is the only stable instrument.
  const m = SIT_SIM.match(/function canWarm\(\)[\s\S]*?\n  \}/);
  assert.ok(m, "canWarm() found in sim.js");
  assert.doesNotMatch(m[0], /marks/, "canWarm must not read marks");
});

test("leftover GOODS is not the next lit job", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.canGoods(), false);
  assert.ok(!b.litJobs().includes("goods"));
  assert.ok(b.wait());
  assert.equal(b.canGoods(), false);
  assert.ok(!b.litJobs().includes("goods"));
});

test("dest bank holds after wait; it does not die", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.banked, true);
  assert.equal(b.heldA, true);
  assert.equal(b.hearth, "held");
  assert.equal(b.step, "out");
  assert.ok(b.wait());
  assert.equal(b.banked, true);
  assert.equal(b.heldA, true);
  assert.equal(b.hearth, "held");
  assert.notEqual(b.hearth, "dim");
  assert.ok(b.wait());
  assert.equal(b.banked, true);
  assert.equal(b.hearth, "held");
});

test("HOLD does not refill heat", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.canHold(), false);
  assert.equal(b.commitHold(), false);
  assert.equal(b.banked, true);
  assert.ok(b.wait());
  assert.equal(b.canHold(), false);
  assert.equal(b.commitHold(), false);
  assert.equal(b.banked, true);
  assert.equal(b.hearth, "held");
});

test("after wait, WARM is not the only lit job", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.ok(!b.litJobs().includes("goods"));
  assert.ok(b.wait());
  assert.notDeepEqual(b.litJobs(), ["warm"]);
  assert.equal(b.canWarm(), false);
  assert.equal(b.step, "gone");
});

test("after WARM and the wait, the sitting stops: nothing is lit", () => {
  // The notDeepEqual above is satisfiable by any list that isn't exactly
  // ["warm"]; this states the end state outright — the board goes dark.
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.ok(b.wait());
  assert.deepEqual(b.litJobs(), []);
});

test("outward step is the only thing that may starve", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.step, "out");
  assert.equal(b.hearth, "held");
  assert.ok(b.wait());
  assert.equal(b.step, "gone");
  assert.equal(b.hearth, "held");
  assert.equal(b.banked, true);
  assert.equal(b.heldA, true);
});

test("no dest-core starve-or-feed, no #2 leak/refill API", () => {
  const b = pathToFirstWarm();
  assert.equal(b.core, undefined);
  assert.equal(typeof b.tickLeak, "undefined");
  assert.equal(typeof b.tickDie, "undefined");
  assert.ok(b.commitWarm());
  assert.equal(b.core, undefined);
  assert.ok(b.wait());
  assert.equal(b.hearth, "held");
});

test("sitting source refuses furnace word, fuel clock, radius, Air, Foundry, attacker, dest-quad glow", () => {
  const src = SIT_HTML + "\n" + SIT_SIM;
  const banned = [
    /furnace/i,
    /\bfuel\b/i,
    /(?<!border-|border)radius/i,
    /\bAir\b/,
    /Foundry/i,
    /attacker/i,
    /tickLeak/,
    /tickDie/,
    /core-dim/,
    /core-full/,
    /core-dead/,
    /id="band"/,
    /id="core"/,
    /id="drive"/,
    /CFD-163/,
  ];
  for (const re of banned) {
    assert.equal(re.test(src), false, "banned token " + re);
  }
});

test("WARM is not on the civic row with GOODS / B / HOLD", () => {
  const civic = SIT_HTML.match(/<div id="pads">([\s\S]*?)<\/div>/);
  assert.ok(civic, "civic #pads row exists");
  assert.match(civic[1], /id="goodsA"/);
  assert.match(civic[1], /id="sendB"/);
  assert.match(civic[1], /id="holdA"/);
  assert.doesNotMatch(civic[1], /id="warmA"/);
  assert.match(SIT_HTML, /id="heat-row"/);
  assert.match(SIT_HTML, /id="warmA"/);
  const heat = SIT_HTML.match(/<div id="heat-row">([\s\S]*?)<\/div>/);
  assert.ok(heat, "heat row exists");
  assert.match(heat[1], /id="warmA"/);
  assert.doesNotMatch(heat[1], /id="goodsA"/);
  assert.doesNotMatch(heat[1], /id="holdA"/);
  assert.doesNotMatch(heat[1], /id="sendB"/);
});

test("keel-fire is a banked mass in dest A; step sits off A", () => {
  assert.match(SIT_HTML, /id="bank"/);
  assert.match(SIT_HTML, /id="step"/);
  assert.match(SIT_HTML, /#destA\.banked #bank/);
  assert.doesNotMatch(SIT_HTML, /id="core"/);
  assert.doesNotMatch(SIT_HTML, /dest-quad/);
});

test("CFD-174 stakes dressing: canon nouns on the board, placeholders gone", () => {
  // Every noun below is from the stakes pack (skyrail-stakes-pack-2026-08-24,
  // data/skyrail-stakes.json): routes[dawnspur-halt].name, routes[mosswake-loop].name,
  // buildings[greenhouse].name; "CARRY" from contracts[first-run].title
  // ("Carry Herbs from Mosswake Loop"), "food" from resources / greenhouse unlocks,
  // "terrace" from the greenhouse description ("restored sunlit terraces") and
  // routes[dawnspur-halt].island ("Verdant terrace"), "marks" from resources /
  // economyConfig.currencyType. The played numbers (+3, 1) stay exactly — no
  // economyConfig number may replace them without a new play.
  assert.match(SIT_HTML, /<title>Dawnspur Halt<\/title>/);
  assert.match(SIT_HTML, /aria-label="Greenhouse District"/);
  assert.match(SIT_HTML, /aria-label="Mosswake Loop"/);
  assert.match(SIT_HTML, />CARRY FOOD</);
  assert.match(SIT_HTML, />MOSSWAKE \+3</);
  assert.match(SIT_HTML, />REPAIR 1</);
  assert.match(SIT_HTML, />WARM THE TERRACE</);
  assert.match(SIT_HTML, /String\(board\.marks\) \+ " marks"/);
  // The placeholder strings are gone.
  assert.doesNotMatch(SIT_HTML, /GOODS A/);
  assert.doesNotMatch(SIT_HTML, /B \+3/);
  assert.doesNotMatch(SIT_HTML, /HOLD 1/);
  assert.doesNotMatch(SIT_HTML, /aria-label="A"/);
  assert.doesNotMatch(SIT_HTML, /aria-label="B"/);
  assert.doesNotMatch(SIT_HTML, />WARM</);
});

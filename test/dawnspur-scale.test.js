"use strict";

// CFD-183 scale sitting. The spec is the signed beat: docs/cfd-183-beat.md.
// Every testable kill line below is a test; the REFUSED table is the ban list.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Scale = require("../sit/dawnspur-scale/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-scale/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-scale/sim.js"), "utf8");

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}
function gitBlob(p) {
  return execFileSync("git", ["cat-file", "blob", "HEAD:" + p], { cwd: ROOT });
}
function fresh() {
  return Scale.createBoard({ fresh: true });
}
// Reachable mid-walk fixtures. Every board here starts from the opening and
// walks real commits — no state is pre-set that the board cannot produce.
function heldWithMarks4() {
  // c B h c B h → level 1, held ground, 4 marks: UP is lit and the ground holds.
  const b = fresh();
  assert.ok(b.commitCarry()); // 1, wrecked
  assert.ok(b.commitB());     // 3
  assert.ok(b.commitHold());  // 2, held
  assert.ok(b.commitCarry()); // 3, wrecked
  assert.ok(b.commitB());     // 5
  assert.ok(b.commitHold());  // 4, held
  return b;
}
function level2Wrecked() {
  // c B h c UP → level 2, 0 marks, wrecked ground: the fall is live.
  const b = fresh();
  assert.ok(b.commitCarry()); // 1, wrecked
  assert.ok(b.commitB());     // 3
  assert.ok(b.commitHold());  // 2, held
  assert.ok(b.commitCarry()); // 3, wrecked
  assert.ok(b.commitUp());    // level 2, 0 marks, still wrecked
  return b;
}
function snapshot(b) {
  return {
    marks: b.marks, heldA: b.heldA, level: b.level, alive: b.alive,
    topped: b.topped, stopped: b.stopped, hearth: b.hearth, banked: b.banked,
    haul: b.haul, carryYield: b.carryYield, upPrice: b.upPrice,
    lit: b.litJobs(),
  };
}

// ---------------------------------------------------------------- guards

test("guard: heat sitting blobs at HEAD are unchanged (do not recut 176's lights)", () => {
  assert.equal(sha256(gitBlob("sit/dawnspur-heat/index.html")), "b5f7e14f4ed82a81e8b5bbc8b07c1e808698ca3a90f0fd9664db2f0d5dbba995");
  assert.equal(sha256(gitBlob("sit/dawnspur-heat/sim.js")), "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
  assert.equal(sha256(gitBlob("sit/dawnspur-heat/greenhouse.png")), "7fdf746844ec7efa6e7f4c515845362188268392f934e1453a3e82197af1e74f");
  assert.equal(sha256(gitBlob("public/dawnspur-heat/index.html")), "b5f7e14f4ed82a81e8b5bbc8b07c1e808698ca3a90f0fd9664db2f0d5dbba995");
  assert.equal(sha256(gitBlob("public/dawnspur-heat/sim.js")), "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
});

test("guard: preserved kill blobs are unchanged (do not overwrite /dawnspur/)", () => {
  assert.equal(sha256(gitBlob("public/dawnspur/index.html")), "bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59");
  assert.equal(sha256(gitBlob("public/dawnspur/sim.js")), "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c");
});

test("deploy copy public/dawnspur-scale is byte-identical to sit/dawnspur-scale", () => {
  // Raw bytes, no normalization: .gitattributes declares `* -text` (7b3ddb6),
  // so checkouts are byte-exact and normalizing here would mask a drift.
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  for (const f of ["index.html", "sim.js", "greenhouse.png", "MANIFEST.txt"]) {
    assert.equal(sha256(raw("public/dawnspur-scale/" + f)), sha256(raw("sit/dawnspur-scale/" + f)),
      "sit/public drift: " + f);
  }
});

test("MANIFEST.txt records the shipped hashes — the 7b3ddb6 rule, graded", () => {
  // The manifest's figures are asserted, not typed: each recorded sha256 must
  // match the bytes on disk, which `* -text` makes the committed bytes.
  const man = fs.readFileSync(path.join(ROOT, "sit/dawnspur-scale/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js", "greenhouse.png"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-scale/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
});

test("greenhouse asset in both scale copies is the masters byte-copy", () => {
  const MASTERS_GREENHOUSE = "7fdf746844ec7efa6e7f4c515845362188268392f934e1453a3e82197af1e74f";
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-scale/greenhouse.png"))), MASTERS_GREENHOUSE);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dawnspur-scale/greenhouse.png"))), MASTERS_GREENHOUSE);
});

// ------------------------------------------------------ fixtures & opening

test("fixture: the default board is reachable — it is the opening after one carry", () => {
  const walked = fresh();
  assert.ok(walked.commitCarry());
  assert.deepEqual(snapshot(Scale.createBoard()), snapshot(walked));
});

test("the opening: rooted at level 1 on held ground, scenery standing, only the carry lit", () => {
  const b = fresh();
  assert.equal(b.level, 1);
  assert.equal(b.alive, true);
  assert.equal(b.heldA, true);
  assert.equal(b.marks, 0);
  assert.equal(b.banked, true);
  assert.equal(b.hearth, "held");
  assert.equal(b.carryYield, 1);
  assert.equal(b.upPrice, 3);
  assert.deepEqual(b.litJobs(), ["carry"]);
});

// ------------------------------------------------------------- kill: UP

test("kill: UP is not free and its price climbs — 3, then 4, then 5", () => {
  const b = fresh();
  assert.equal(b.upPrice, 3);
  assert.ok(b.commitCarry());          // 1 mark
  assert.equal(b.canUp(), false, "1 mark must not buy level 2");
  assert.equal(b.commitUp(), false);
  assert.equal(b.marks, 1, "a refused UP must not spend");
  assert.ok(b.commitB());              // 3 marks
  assert.equal(b.canUp(), true);
  assert.ok(b.commitUp());
  assert.equal(b.level, 2);
  assert.equal(b.marks, 0, "UP at level 1 spends exactly 3");
  assert.equal(b.upPrice, 4);
  assert.ok(b.commitCarry());          // +2 → 2
  assert.ok(b.commitHold());           // 1, held
  assert.ok(b.commitCarry());          // +2 → 3, new wreck
  assert.ok(b.commitB());              // 5
  assert.equal(b.canUp(), true);
  const before23 = b.marks;
  assert.ok(b.commitUp());
  assert.equal(b.level, 3);
  assert.equal(before23 - b.marks, 4, "UP at level 2 spends exactly 4");
  assert.equal(b.upPrice, 5);
  assert.ok(b.commitCarry());          // +3 → 4
  assert.ok(b.commitHold());           // 3, held
  assert.ok(b.commitCarry());          // +3 → 6, new wreck
  const before34 = b.marks;
  assert.ok(b.commitUp());
  assert.equal(b.level, 4);
  assert.equal(before34 - b.marks, 5, "UP at level 3 spends exactly 5");
  assert.equal(b.upPrice, null, "no next price at the top — null, not a number");
});

// ------------------------------------------------- kill: DOWN and refunds

test("kill: a level can be lost — the wrecked wait takes exactly one, and refunds nothing", () => {
  const b = level2Wrecked();
  const marksBefore = b.marks;
  assert.equal(b.heldA, false, "fixture: the fall must be live");
  assert.ok(b.wait());
  assert.equal(b.level, 1, "the wrecked wait steps the greenhouse down one level");
  assert.equal(b.alive, true);
  assert.equal(b.marks, marksBefore, "DOWN refunds nothing");
});

test("kill: the greenhouse dies from level 1 — and dying refunds nothing, marks still in hand", () => {
  const b = Scale.createBoard(); // level 1, wrecked, 1 mark in hand — reachable, asserted above
  assert.ok(b.wait());
  assert.equal(b.alive, false, "from level 1, down is dead");
  assert.equal(b.level, 0);
  assert.equal(b.stopped, true);
  assert.equal(b.marks, 1, "dead while marks were in hand — nothing refunds, nothing is taken");
  assert.deepEqual(b.litJobs(), [], "fallen, the sitting stops");
  assert.equal(b.wait(), false, "the world's turn is over too");
  assert.equal(b.carryYield, null);
  assert.equal(b.upPrice, null);
});

test("on held ground the wait stands the greenhouse — the world's turn takes nothing it did not announce", () => {
  const b = heldWithMarks4();
  const before = snapshot(b);
  assert.equal(b.heldA, true);
  assert.ok(b.wait());
  assert.deepEqual(snapshot(b), before, "a held wait changes nothing");
});

test("kill: the fall cannot fire without the thin pad showing — sim and board read the same predicate", () => {
  // The sim's fall is gated on the very field the board paints as the thin
  // pad: wait() returns before touching the level whenever the ground holds.
  const waitBody = SIT_SIM.match(/function wait\(\)[\s\S]*?\n  \}/);
  assert.ok(waitBody, "wait() found in sim.js");
  const guard = waitBody[0].indexOf("if (s.heldA) return true;");
  const fall = waitBody[0].indexOf("s.level -= 1;");
  assert.ok(guard >= 0, "wait() stands on held ground");
  assert.ok(fall > guard, "the held-ground guard precedes the fall");
  assert.doesNotMatch(waitBody[0], /marks/, "the world's hand never touches marks — no refund path exists");
  // Board side: the thin pad is painted from the same field, and the thin
  // state has a visible rule.
  assert.match(SIT_HTML, /destA\.classList\.toggle\("thin", !board\.heldA\);/);
  assert.match(SIT_HTML, /#destA\.thin \.fill \{ height: 38%; \}/);
});

// ------------------------------------------------------------ kill: topped

test("kill-adjacent end: topped at 4 the climb is done — sitting stops, nothing refunds back out", () => {
  const b = fresh();
  // 1: c B UP → level 2 broke on wrecked ground; the dying greenhouse still pays
  assert.ok(b.commitCarry()); assert.ok(b.commitB()); assert.ok(b.commitUp());
  assert.equal(b.level, 2); assert.equal(b.marks, 0); assert.equal(b.heldA, false);
  assert.ok(b.litJobs().includes("carry"), "broke on wrecked ground, the carry is lit — not a spectator");
  // 2: climb on: c h c B UP → level 3
  assert.ok(b.commitCarry()); assert.ok(b.commitHold()); assert.ok(b.commitCarry()); assert.ok(b.commitB());
  assert.ok(b.commitUp());
  assert.equal(b.level, 3);
  // 3: c h c UP → level 4
  assert.ok(b.commitCarry()); assert.ok(b.commitHold()); assert.ok(b.commitCarry());
  assert.ok(b.commitUp());
  assert.equal(b.level, 4);
  assert.equal(b.topped, true);
  assert.equal(b.stopped, true);
  assert.deepEqual(b.litJobs(), [], "topped, the sitting stops");
  assert.equal(b.wait(), false);
  assert.equal(b.canUp(), false);
  assert.equal(b.upPrice, null);
  assert.equal(b.carryYield, null);
  assert.equal(b.hearth, "held", "the hearth does not dim");
  assert.equal(b.banked, true, "the bank stays in the stone");
});

// ---------------------------------------------------------- kill: the loop

test("kill: CARRY FOOD pays the level — +1 at 1, +2 at 2 — and every carry thins the pad", () => {
  const b = fresh();
  assert.equal(b.carryYield, 1);
  const m0 = b.marks;
  assert.ok(b.commitCarry());
  assert.equal(b.marks - m0, 1, "CARRY FOOD at level 1 pays exactly +1");
  assert.equal(b.heldA, false, "the carry wrecks the ground");
  const b2 = level2Wrecked();
  assert.equal(b2.carryYield, 2, "the yield rises the moment the greenhouse stands taller");
  const m2 = b2.marks;
  assert.ok(b2.commitCarry());
  assert.equal(b2.marks - m2, 2, "CARRY FOOD at level 2 pays exactly +2");
});

test("kill: B +3 and REPAIR 1 do not move", () => {
  const b = Scale.createBoard(); // 1 mark, wrecked
  const mB = b.marks;
  assert.ok(b.commitB());
  assert.equal(b.marks - mB, 2, "MOSSWAKE spends 1 and pays 3 — the played +3, net +2");
  const mH = b.marks;
  assert.ok(b.commitHold());
  assert.equal(mH - b.marks, 1, "REPAIR spends exactly 1");
  assert.equal(b.heldA, true, "REPAIR mends the ground");
});

test("locked: one B per wreck", () => {
  const b = Scale.createBoard(); // one carry in: a wreck is open, B unused
  assert.ok(b.canB());
  assert.ok(b.commitB());
  assert.equal(b.canB(), false);
  assert.equal(b.commitB(), false);
  assert.ok(!b.litJobs().includes("B"));
  assert.ok(b.commitCarry());
  assert.equal(b.canB(), false, "carrying deeper into the same wreck grants no second B");
  assert.ok(b.commitHold());
  assert.equal(b.canB(), false, "held ground has no wreck to run");
  assert.ok(b.commitCarry());
  assert.equal(b.canB(), true, "a new wreck lights one new B");
});

test("locked: marks >= 1 lights a job", () => {
  const b = Scale.createBoard();
  assert.ok(b.marks >= 1);
  assert.ok(b.litJobs().length >= 1);
  assert.ok(b.commitB());
  assert.ok(b.marks >= 1);
  assert.ok(b.litJobs().length >= 1);
  assert.ok(b.commitHold());
  assert.ok(b.marks >= 1);
  assert.ok(b.litJobs().length >= 1);
  const h = heldWithMarks4();
  assert.ok(h.marks >= 1);
  assert.ok(h.litJobs().length >= 1);
});

test("kill: after a survived wait, UP is not the only lit job", () => {
  const b = heldWithMarks4();
  assert.ok(b.litJobs().includes("up"), "fixture: UP is lit going into the wait");
  assert.ok(b.wait());
  const lit = b.litJobs();
  assert.notDeepEqual(lit, ["up"]);
  assert.ok(lit.includes("carry"), "the carry survives the wait alongside UP");
  assert.ok(lit.includes("up"));
});

// ----------------------------------------------- kill: WARM, scenery, assets

test("kill: WARM does not light as a job — the verb is gone from the board, its work stands as scenery", () => {
  assert.equal(typeof Scale.createBoard().canWarm, "undefined");
  assert.equal(typeof Scale.createBoard().commitWarm, "undefined");
  const b = fresh();
  for (const walk of [() => b.commitCarry(), () => b.commitB(), () => b.commitHold()]) {
    walk();
    assert.ok(!b.litJobs().includes("warm"));
  }
});

test("scale must not read or write the heat sitting's state", () => {
  // Behavioral: the hearth holds and the bank stays through climb, fall and death.
  const climb = level2Wrecked();
  assert.equal(climb.hearth, "held");
  assert.equal(climb.banked, true);
  assert.ok(climb.wait()); // fall to 1
  assert.ok(climb.wait()); // dead
  assert.equal(climb.alive, false);
  assert.equal(climb.hearth, "held", "a dead greenhouse does not dim the hearth");
  assert.equal(climb.banked, true, "a dead greenhouse does not drain the bank");
  // Source-shape: UP's price comes from marks alone.
  const upBody = SIT_SIM.match(/function commitUp\(\)[\s\S]*?\n  \}/);
  assert.ok(upBody, "commitUp() found");
  assert.doesNotMatch(upBody[0], /hearth|banked/, "the bank does not pay for scale");
});

test("kill: exactly one scaling asset — the api surface is pinned", () => {
  const keys = Object.keys(Scale.createBoard()).sort();
  assert.deepEqual(keys, [
    "alive", "banked", "canB", "canCarry", "canHold", "canUp",
    "carryYield", "commitB", "commitCarry", "commitHold", "commitUp",
    "haul", "hearth", "heldA", "level", "litJobs", "marks",
    "stopped", "topped", "upPrice", "wait",
  ]);
  // Board side: the lv width steps hang off one element only.
  for (const m of SIT_HTML.match(/\S+\.lv\d/g) || []) {
    assert.match(m, /^#greenhouse\.lv\d$/, "a second element takes lv steps: " + m);
  }
  assert.equal((SIT_HTML.match(/"lv" \+ board\.level/g) || []).length, 1,
    "exactly one sprite is driven by the level");
});

// --------------------------------------------------------- kill: the board

test("kill: SCALE lives in the HUD, not the train row", () => {
  const pads = SIT_HTML.match(/<div id="pads">([\s\S]*?)<\/div>/);
  assert.ok(pads, "civic #pads row exists");
  assert.match(pads[1], /id="goodsA"/);
  assert.match(pads[1], /id="sendB"/);
  assert.match(pads[1], /id="holdA"/);
  assert.match(pads[1], /id="go"/);
  assert.doesNotMatch(pads[1], /id="up"/, "UP must not ride the train row");
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  assert.match(hud, /id="up"/, "UP lives in the HUD");
  assert.doesNotMatch(SIT_HTML, /id="heat-row"/, "the heat row is gone, not repurposed");
});

test("kill: the HUD gains one line and no more", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 2,
    "the HUD holds the played marks line plus exactly one asset line, found " + children.length);
  const scaleLine = hud.match(/<div id="scale-line">.*/);
  assert.ok(scaleLine, "the one new line is the scale line");
  assert.match(scaleLine[0], /id="pips"/, "the level reads as pips");
  assert.match(scaleLine[0], /id="up"/, "UP carries its price on the one control");
  assert.equal((hud.match(/<button/g) || []).length, 1, "one control in the HUD");
  assert.match(hud, /id="marks-line"/);
});

test("the board's words: canon nouns, played numbers, the yield on the carry's own label", () => {
  assert.match(SIT_HTML, /<title>Dawnspur Halt<\/title>/);
  assert.match(SIT_HTML, /aria-label="Greenhouse District"/);
  assert.match(SIT_HTML, /aria-label="Mosswake Loop"/);
  assert.match(SIT_HTML, />CARRY FOOD \+1</);
  assert.match(SIT_HTML, />MOSSWAKE \+3</);
  assert.match(SIT_HTML, />REPAIR 1</);
  assert.match(SIT_HTML, />UP 3</);
  assert.match(SIT_HTML, /String\(board\.marks\) \+ " marks"/);
  assert.match(SIT_HTML, /"CARRY FOOD \+" \+ board\.carryYield/, "the carry label is the yield meter");
  assert.match(SIT_HTML, /"●"\.repeat\(board\.level\) \+ "○"\.repeat\(4 - board\.level\)/, "pips out of four");
  assert.match(SIT_HTML, /board\.alive \? "lv" \+ board\.level : "dead"/, "the sprite steps with the level; dying removes it");
  assert.match(SIT_HTML, /#greenhouse\.lv2 \{ width: 19%; \}/);
  assert.match(SIT_HTML, /#greenhouse\.lv3 \{ width: 23%; \}/);
  assert.match(SIT_HTML, /#greenhouse\.lv4 \{ width: 27%; \}/);
  assert.match(SIT_HTML, /#greenhouse\.dead \{ display: none; \}/);
});

test("kill: no clock — no ticker, no timer bar, no build timer, no per-tick drain", () => {
  const src = SIT_HTML + "\n" + SIT_SIM;
  for (const re of [/setInterval/, /<progress/i, /baseSeconds/, /\btimer\b/i, /tickLeak/, /tickDie/]) {
    assert.equal(re.test(src), false, "banned clock token " + re);
  }
});

test("banned tokens: the REFUSED table and the standing bans hold", () => {
  const src = SIT_HTML + "\n" + SIT_SIM;
  const banned = [
    /warm/i,
    /furnace/i,
    /\bfuel\b/i,
    /(?<!border-|border)radius/i,
    /\bAir\b/,
    /Foundry/i,
    /attacker/i,
    /core-dim/,
    /core-full/,
    /core-dead/,
    /id="band"/,
    /id="core"/,
    /id="drive"/,
    /CFD-163/,
    /id="step"/,
  ];
  for (const re of banned) {
    assert.equal(re.test(src), false, "banned token " + re);
  }
});

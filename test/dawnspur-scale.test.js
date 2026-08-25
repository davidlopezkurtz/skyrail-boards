"use strict";

// CFD-183 scale sitting, RECUT. The spec is the signed recut beat: the TOP
// section of docs/cfd-183-beat.md (SIGNED — David, 2026-08-25, "signed -
// proceed with the implementer"). Every testable kill line below is a test;
// the REFUSED table is the ban list. The convicted first cut stays durable in
// git at 5fabe7c; these tests grade its replacement.

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

const END_FULL = "The terrace is topped and the ground is full. Whatever weather comes, something is banked to meet it.";
const END_DRAWN = "The terrace is topped on drawn ground. It rides fine in clear weather. The reserve left here is the next sitting's weather bill.";

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
// c = CARRY FOOD, B = MOSSWAKE, t = TEND, U = UP.
function walk(line, b) {
  b = b || fresh();
  for (const ch of line) {
    let ok;
    if (ch === "c") ok = b.commitCarry();
    else if (ch === "B") ok = b.commitB();
    else if (ch === "t") ok = b.commitTend();
    else if (ch === "U") ok = b.commitUp();
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return b;
}
// The beat's own arithmetic, used as fixtures:
//   pure-carry line — 7 carries (3 + 2 + 2 at +1/+2/+3) tops at bare ground.
const PURE_CARRY_TOP = "cccUccUccU";
//   carry-then-Mosswake — level + 2 marks per draw, tops in 3 draws at reserve 1.
const MOSSWAKE_TOP = "cBUcBUcBU";
//   a full-ground top: tend the terrace back to full before the last UP.
const FULL_GROUND_TOP = "cBUcBUcBtttcBtU";
//   full ground with marks in hand and a Mosswake armed — reserve 4, marks 2.
const FULL_WITH_MARKS = "cBctt";
function snapshot(b) {
  return {
    marks: b.marks, level: b.level, reserve: b.reserve, topped: b.topped,
    hearth: b.hearth, banked: b.banked, haul: b.haul,
    carryYield: b.carryYield, upPrice: b.upPrice, endSentence: b.endSentence,
    lit: b.litJobs(),
  };
}
// Deterministic PRNG for the property walks — seeded, so a red run replays.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
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
  const walked = walk("c");
  assert.deepEqual(snapshot(Scale.createBoard()), snapshot(walked));
});

test("the opening: level 1 on full ground, scenery standing, only the carry lit", () => {
  const b = fresh();
  assert.equal(b.level, 1);
  assert.equal(b.reserve, 4, "the terrace opens full");
  assert.equal(b.marks, 0);
  assert.equal(b.topped, false);
  assert.equal(b.banked, true);
  assert.equal(b.hearth, "held");
  assert.equal(b.carryYield, 1);
  assert.equal(b.upPrice, 3);
  assert.equal(b.endSentence, null, "no end-sentence before the top");
  assert.deepEqual(b.litJobs(), ["carry"],
    "full ground with no marks: TEND, MOSSWAKE and UP are all dark; the carry alone is lit");
});

// -------------------------------------- kill: level lost / greenhouse harmed

test("kill: no level is ever lost — level is monotonic under every hand, and no dead state exists", () => {
  // Property walk: 400 seeded random action sequences over every commit and
  // the world's turn. The level never decreases, by any hand, ever.
  const rnd = mulberry32(0xC183);
  for (let run = 0; run < 400; run++) {
    const b = fresh();
    let level = b.level;
    for (let i = 0; i < 40; i++) {
      const act = ["c", "B", "t", "U", "w"][Math.floor(rnd() * 5)];
      if (act === "c") b.commitCarry();
      else if (act === "B") b.commitB();
      else if (act === "t") b.commitTend();
      else if (act === "U") b.commitUp();
      else b.wait();
      assert.ok(b.level >= level, "level fell: " + b.level + " < " + level);
      level = b.level;
    }
  }
  // No alive/dead surface exists to reach.
  assert.equal(typeof fresh().alive, "undefined", "no alive flag — death is not a state this board can hold");
  assert.doesNotMatch(SIT_SIM, /level\s*(-=|--)/, "no down-path exists in the sim source");
  assert.doesNotMatch(SIT_SIM, /alive/, "no alive field in the sim source");
});

test("kill: the greenhouse never shrinks and has no dead state — the sprite only grows", () => {
  // The lv width steps are strictly ascending, hang off one element, and no
  // dead rule exists to render.
  const widths = [];
  const base = SIT_HTML.match(/#greenhouse\s*\{[^}]*width:\s*([\d.]+)%/);
  assert.ok(base, "base greenhouse width found");
  widths.push(parseFloat(base[1]));
  for (const lv of [2, 3, 4]) {
    const m = SIT_HTML.match(new RegExp("#greenhouse\\.lv" + lv + "\\s*\\{\\s*width:\\s*([\\d.]+)%"));
    assert.ok(m, "#greenhouse.lv" + lv + " width step found");
    widths.push(parseFloat(m[1]));
  }
  for (let i = 1; i < widths.length; i++) {
    assert.ok(widths[i] > widths[i - 1], "greenhouse widths must be strictly ascending: " + widths.join(", "));
  }
  assert.doesNotMatch(SIT_HTML, /#greenhouse\.dead/, "no dead sprite rule");
  assert.doesNotMatch(SIT_HTML, /"dead"/, "no dead branch drives the sprite");
  assert.match(SIT_HTML, /ghEl\.className = "lv" \+ board\.level;/, "the sprite is driven by the level alone");
  for (const m of SIT_HTML.match(/\S+\.lv\d/g) || []) {
    assert.match(m, /^#greenhouse\.lv\d$/, "a second element takes lv steps: " + m);
  }
});

// ------------------------------------------------- kill: wall-clock motion

test("kill: nothing moves with wall-clock time — the sim knows no clock at all", () => {
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|Date\.|performance\./,
    "the sim must hold no time instrument");
  // The board never calls the world's turn and holds no idle machinery: the
  // convicted cut's waitT / 1.5s threshold / perpetual paint loop are gone.
  assert.doesNotMatch(SIT_HTML, /board\.wait/, "no caller for the world's turn on the board");
  assert.doesNotMatch(SIT_HTML, /waitT|1500/, "the idle machinery is removed, not disarmed");
  assert.doesNotMatch(SIT_HTML, /setInterval|setTimeout/, "no clock on the board");
  // requestAnimationFrame survives only as the train's move animation inside
  // lerpTo — two call sites, both in the player-action path, no standing loop.
  assert.equal((SIT_HTML.match(/requestAnimationFrame/g) || []).length, 2,
    "rAF appears exactly twice, both inside lerpTo — no perpetual loop");
  assert.equal((SIT_HTML.match(/performance\.now/g) || []).length, 1,
    "performance.now appears exactly once, timing the train's move");
});

test("kill: a real wait moves nothing (node-side; the browser drive re-proves it against the DOM)", async () => {
  const b = walk("cBc"); // mid-state: marks, drawn ground, Mosswake armed
  const before = snapshot(b);
  await new Promise((r) => setTimeout(r, 120));
  assert.deepEqual(snapshot(b), before, "state after 120ms of wall time is byte-identical");
});

// ------------------------------------- kill: the world's turn, honest no-op

test("kill: the world's turn is clear weather — takes nothing and never reports success", () => {
  const states = {
    opening: fresh(),
    "one carry in": walk("c"),
    "bare ground": walk("cccc"),
    "full with marks": walk(FULL_WITH_MARKS),
    "mid-climb": walk("cBU"),
    topped: walk(PURE_CARRY_TOP),
  };
  for (const [name, b] of Object.entries(states)) {
    const before = snapshot(b);
    assert.equal(b.wait(), false,
      name + ": calm must never read as a handled event — wait() returns false");
    assert.deepEqual(snapshot(b), before, name + ": the world's turn takes nothing");
  }
});

// --------------------------------------------------- kill: ranges hold

test("kill: level stays in 1..4 and reserve in 0..4 under every walk — floors and ceilings hold", () => {
  const rnd = mulberry32(0x5EED);
  for (let run = 0; run < 400; run++) {
    const b = fresh();
    for (let i = 0; i < 40; i++) {
      const act = ["c", "B", "t", "U", "w"][Math.floor(rnd() * 5)];
      if (act === "c") b.commitCarry();
      else if (act === "B") b.commitB();
      else if (act === "t") b.commitTend();
      else if (act === "U") b.commitUp();
      else b.wait();
      assert.ok(b.level >= 1 && b.level <= 4, "level out of range: " + b.level);
      assert.ok(b.reserve >= 0 && b.reserve <= 4, "reserve out of range: " + b.reserve);
    }
  }
});

test("the reserve floors at 0 — carries past bare keep paying full and keep the floor", () => {
  const b = walk("cccc");
  assert.equal(b.reserve, 0, "four carries from full is bare");
  const m0 = b.marks;
  assert.ok(b.commitCarry(), "the carry is lit at bare ground");
  assert.equal(b.reserve, 0, "bare is the floor, not a cliff");
  assert.equal(b.marks - m0, 1, "the carry at bare pays exactly the level — full pay");
});

test("the reserve ceilings at 4 — a tend to full lands exactly at 4 and TEND goes dark", () => {
  const b = walk("cBt"); // reserve 4, marks 2
  assert.equal(b.reserve, 4);
  assert.equal(b.canTend(), false, "TEND is dark on full ground");
  const before = snapshot(b);
  assert.equal(b.commitTend(), false, "a refused tend commits nothing");
  assert.deepEqual(snapshot(b), before);
});

// --------------------------------------------- kill: no reserve gauge, ever

test("kill: no reserve number, bar, pip row, meter, or icon — the terrace's green is the only read", () => {
  // The HUD keeps its one line and never says the word.
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  assert.doesNotMatch(hud, /reserve/i, "the HUD never mentions the reserve");
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i, "no gauge element anywhere");
  // board.reserve reaches the DOM in exactly one shape: the ground's own
  // class on destA. No text, no aria, no repeat-count is driven by it.
  assert.equal((SIT_HTML.match(/board\.reserve/g) || []).length, 1,
    "board.reserve is read exactly once on the board");
  assert.match(SIT_HTML, /destA\.classList\.toggle\("rs" \+ i, board\.reserve === i\);/,
    "and that once is the terrace's own look");
  assert.doesNotMatch(SIT_HTML, /repeat\(board\.reserve/, "no pip row for the reserve");
  // The pips that do exist read the level, out of four, and nothing else.
  assert.match(SIT_HTML, /"●"\.repeat\(board\.level\) \+ "○"\.repeat\(4 - board\.level\)/, "pips read the level only");
});

test("the five looks: rs4 lush to rs0 bare on the destA ground itself, steps readable side by side", () => {
  // Each reserve step styles the planting (the .fill) on the terrace: the
  // green pales and the planting recedes, per the beat's own words. Heights
  // strictly descend to bare; the greens are pairwise distinct.
  const looks = [];
  for (const rs of [4, 3, 2, 1, 0]) {
    const m = SIT_HTML.match(new RegExp(
      "#destA\\.rs" + rs + " \\.fill\\s*\\{\\s*height:\\s*([\\d.]+)%;\\s*background:\\s*(#[0-9a-f]{6});"));
    assert.ok(m, "#destA.rs" + rs + " .fill look found");
    looks.push({ rs, height: parseFloat(m[1]), color: m[2] });
  }
  for (let i = 1; i < looks.length; i++) {
    assert.ok(looks[i].height < looks[i - 1].height,
      "the planting recedes each step: rs" + looks[i].rs + " must sit below rs" + looks[i - 1].rs);
  }
  assert.equal(looks[0].height, 100, "full ground reads lush — the planting covers the terrace");
  assert.equal(looks[4].height, 0, "bare ground is unmistakable — the planting is gone");
  assert.equal(new Set(looks.map((l) => l.color)).size >= 4, true,
    "the greens step too — the looks must be tellable side by side");
});

// ------------------------------- kill: carry degraded / low-reserve firing

test("kill: the carry pays full at every reserve and nothing warns — the drawn ground gives no sign", () => {
  const b = fresh();
  for (const expectReserve of [3, 2, 1, 0, 0, 0]) {
    assert.equal(b.canCarry(), true, "the carry is lit at reserve " + b.reserve);
    assert.equal(b.carryYield, b.level, "the yield never degrades");
    const m0 = b.marks;
    assert.ok(b.commitCarry());
    assert.equal(b.marks - m0, b.level, "full pay at every reserve, bare included");
    assert.equal(b.reserve, expectReserve);
  }
  // The API surface is reserve-blind everywhere but the reserve itself: no
  // warning field, no low-state flag, no event fires because the ground is low.
  assert.deepEqual(Object.keys(snapshot(b)), Object.keys(snapshot(fresh())),
    "no extra surface appears at bare ground");
  assert.doesNotMatch(SIT_SIM + SIT_HTML, /warn|alert|storm|danger|\blow\b/i,
    "no warning, no alert, no storm, no tell — this sitting is clear weather");
});

test("kill: a bare terrace is not an ending — the sitting rides on and marks can still be earned", () => {
  const b = walk("cccc");
  assert.equal(b.reserve, 0);
  assert.equal(b.topped, false);
  assert.equal(b.endSentence, null, "no sentence short of the top");
  assert.ok(b.litJobs().includes("carry"), "no deadlock short of the top: the carry is always lit");
  assert.ok(b.litJobs().length >= 1);
});

// ----------------------------------------------------------- kill: TEND

test("kill: TEND earns nothing, spends exactly 1, restores exactly one step, and moves nothing else", () => {
  const b = walk("cc"); // marks 2, reserve 2
  const before = snapshot(b);
  assert.ok(b.commitTend());
  assert.equal(before.marks - b.marks, 1, "TEND spends exactly 1 mark — it never earns");
  assert.equal(b.reserve - before.reserve, 1, "TEND restores exactly one step — never more");
  assert.equal(b.level, before.level, "TEND touches no level");
  assert.equal(b.carryYield, before.carryYield, "TEND pays no yield");
});

test("TEND is lit only below full with a mark in hand — and rides to A like every job", () => {
  // Below full, no marks: dark.
  const noMarks = walk("cBU"); // marks 0, reserve 3
  assert.equal(noMarks.marks, 0);
  assert.ok(noMarks.reserve < 4);
  assert.equal(noMarks.canTend(), false, "no mark, no tend");
  const before = snapshot(noMarks);
  assert.equal(noMarks.commitTend(), false);
  assert.deepEqual(snapshot(noMarks), before, "a refused tend commits nothing");
  // Full ground, marks in hand: dark. (kill: TEND lights on full ground)
  const full = walk(FULL_WITH_MARKS);
  assert.equal(full.reserve, 4);
  assert.ok(full.marks >= 1);
  assert.equal(full.canTend(), false, "full ground has nothing to tend");
  assert.ok(!full.litJobs().includes("tend"));
  // Board side: TEND is a pad on the train row — it rides to A, not a button
  // resolved at the pad. The go handler commits it exactly like the carry.
  const pads = SIT_HTML.match(/<div id="pads">([\s\S]*?)<\/div>/);
  assert.match(pads[1], /id="tendA"/, "TEND rides on the train row");
  assert.match(SIT_HTML, /leaving === "tend"\) board\.commitTend\(\);/, "TEND commits on LEAVE, like every job");
});

// -------------------------------------------------------- kill: MOSSWAKE

test("kill: MOSSWAKE spends 1, pays 3 — the played +3, net +2 — and marks the haul", () => {
  const b = walk("c");
  const m0 = b.marks;
  assert.ok(b.commitB());
  assert.equal(b.marks - m0, 2, "MOSSWAKE spends 1 and pays 3 — net +2");
  assert.equal(b.haul, true);
});

test("locked (adapted): one Mosswake per carry — a carry arms it, using it disarms it until the next carry", () => {
  // The played board's lock was "one B per wreck"; the wreck bit dissolved
  // with the held/thin binary, so the cadence now hangs off the carry itself.
  const b = fresh();
  assert.equal(b.canB(), false, "the opening arms nothing");
  assert.ok(b.commitCarry());
  assert.equal(b.canB(), true, "a carry arms one Mosswake");
  assert.ok(b.commitB());
  assert.equal(b.canB(), false, "used: disarmed");
  assert.equal(b.commitB(), false);
  assert.ok(!b.litJobs().includes("B"));
  assert.ok(b.commitCarry());
  assert.ok(b.commitCarry());
  assert.equal(b.canB(), true, "carries arm one Mosswake, not one each");
  assert.ok(b.commitB());
  assert.equal(b.canB(), false, "two carries did not bank two charges");
  assert.ok(b.commitTend());
  assert.equal(b.canB(), false, "a tend arms nothing");
});

test("kill: MOSSWAKE is dark on full ground, even armed with marks in hand", () => {
  const b = walk(FULL_WITH_MARKS); // armed by the second carry, tended to full
  assert.equal(b.reserve, 4);
  assert.ok(b.marks >= 1);
  assert.equal(b.canB(), false, "full ground: MOSSWAKE is dark");
  const before = snapshot(b);
  assert.equal(b.commitB(), false);
  assert.deepEqual(snapshot(b), before);
});

// ------------------------------------------------------------- kill: UP

test("kill: UP is not free and its price climbs — 3, then 4, then 5, spent exactly, never refunded", () => {
  const b = fresh();
  assert.equal(b.upPrice, 3);
  assert.ok(b.commitCarry());          // 1 mark
  assert.equal(b.canUp(), false, "1 mark must not buy level 2");
  const refused = snapshot(b);
  assert.equal(b.commitUp(), false);
  assert.deepEqual(snapshot(b), refused, "a refused UP must not spend");
  assert.ok(b.commitB());              // 3 marks
  assert.equal(b.canUp(), true);
  assert.ok(b.commitUp());
  assert.equal(b.level, 2);
  assert.equal(b.marks, 0, "UP at level 1 spends exactly 3");
  assert.equal(b.upPrice, 4);
  walk("cBt", b);                      // +2, +2, -1 → 3 marks... climb the purse
  assert.ok(b.commitCarry());          // +2 → 5 marks
  const before23 = b.marks;
  assert.ok(b.commitUp());
  assert.equal(b.level, 3);
  assert.equal(before23 - b.marks, 4, "UP at level 2 spends exactly 4");
  assert.equal(b.upPrice, 5);
  walk("cB", b);                       // +3, +2
  const before34 = b.marks;
  assert.ok(b.commitUp());
  assert.equal(b.level, 4);
  assert.equal(before34 - b.marks, 5, "UP at level 3 spends exactly 5");
  assert.equal(b.upPrice, null, "no next price at the top — null, not a number");
});

test("kill: UP lives in the HUD and never rides the train", () => {
  const pads = SIT_HTML.match(/<div id="pads">([\s\S]*?)<\/div>/);
  assert.ok(pads, "civic #pads row exists");
  assert.match(pads[1], /id="goodsA"/);
  assert.match(pads[1], /id="sendB"/);
  assert.match(pads[1], /id="tendA"/);
  assert.match(pads[1], /id="go"/);
  assert.doesNotMatch(pads[1], /id="up"/, "UP must not ride the train row");
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  assert.match(hud, /id="up"/, "UP lives in the HUD");
  // UP is instant: the commit lands on the tap, no run, no pending state.
  assert.match(SIT_HTML, /tap\(upBtn, \(\) => \{ if \(board\.commitUp\(\)\) paint\(\); \}\);/);
});

// ------------------------------------------------------- kill: refunds

test("kill: nothing refunds — every refused commit changes nothing, and no hand returns marks", () => {
  // Behavioral: refused commits are pure refusals in every probed state.
  const states = {
    opening: fresh(),
    "bare ground": walk("cccc"),
    "full with marks": walk(FULL_WITH_MARKS),
    "no marks mid-climb": walk("cBU"),
    topped: walk(PURE_CARRY_TOP),
  };
  for (const [name, b] of Object.entries(states)) {
    for (const commit of ["commitCarry", "commitB", "commitTend", "commitUp"]) {
      const before = snapshot(b);
      const ok = b[commit]();
      // A legal commit is fine — the walks above grade its exact deltas. A
      // refused one must be a pure refusal: nothing spent, nothing returned.
      if (!ok) assert.deepEqual(snapshot(b), before, name + ": refused " + commit + " must change nothing");
    }
  }
  // No API to sell back, step down, or recover a stake exists at all.
  const b = fresh();
  for (const absent of ["commitDown", "canDown", "sellBack", "refund", "commitWarm", "canWarm"]) {
    assert.equal(typeof b[absent], "undefined", absent + " must not exist");
  }
  assert.doesNotMatch(SIT_SIM, /refund|sell/i);
});

// ------------------------------------------------------------ kill: topped

test("kill: topped at 4 is the one stop — the pure-carry line tops in 7 carries at bare ground", () => {
  // The beat's arithmetic: 3 + 2 + 2 carries at +1/+2/+3 buys 3/4/5.
  const b = fresh();
  let carries = 0;
  for (const ch of PURE_CARRY_TOP) if (ch === "c") carries++;
  assert.equal(carries, 7, "the fixture is the beat's 7-carry line");
  walk(PURE_CARRY_TOP, b);
  assert.equal(b.level, 4);
  assert.equal(b.topped, true);
  assert.equal(b.reserve, 0, "a player who never tends tops out at bare ground");
  assert.equal(b.marks, 1);
  assert.deepEqual(b.litJobs(), [], "all jobs go out at the top");
  assert.equal(b.canCarry(), false);
  assert.equal(b.canTend(), false);
  assert.equal(b.canB(), false);
  assert.equal(b.canUp(), false);
  assert.equal(b.wait(), false);
  assert.equal(b.carryYield, null);
  assert.equal(b.upPrice, null);
  assert.equal(b.hearth, "held", "the hearth does not dim");
  assert.equal(b.banked, true, "the bank stays in the stone");
});

test("kill: the end-sentence reads the ground — drawn ground names the next sitting's weather bill", () => {
  const bare = walk(PURE_CARRY_TOP);
  assert.equal(bare.endSentence, END_DRAWN);
  assert.match(bare.endSentence, /next sitting's weather bill/, "the drawn reading names the bill without firing it");
  // The Mosswake line tops at reserve 1 — drawn, not bare, same sentence.
  const drawn = walk(MOSSWAKE_TOP);
  assert.equal(drawn.topped, true);
  assert.equal(drawn.reserve, 1, "the beat's arithmetic: 3 draws top at reserve 1");
  assert.equal(drawn.endSentence, END_DRAWN);
});

test("kill: topped on full ground gets the full-ground sentence — something is banked to meet the weather", () => {
  const b = walk(FULL_GROUND_TOP);
  assert.equal(b.topped, true);
  assert.equal(b.reserve, 4, "tended back to full before the last UP");
  assert.equal(b.endSentence, END_FULL);
  assert.match(b.endSentence, /banked to meet it/);
  assert.deepEqual(b.litJobs(), []);
});

test("the board shows the end-sentence, from the sim's own words, only at the top", () => {
  assert.match(SIT_HTML, /<div id="end" hidden><\/div>/, "the end element ships hidden");
  assert.match(SIT_HTML, /endEl\.hidden = !board\.topped;/, "shown only at the top");
  assert.match(SIT_HTML, /board\.endSentence/, "the board speaks the sim's sentence, not its own");
  // The sentence lives in the sim in both variants, verbatim.
  assert.ok(SIT_SIM.includes(END_FULL), "the full-ground sentence is the beat's, verbatim");
  assert.ok(SIT_SIM.includes(END_DRAWN), "the drawn-ground sentence is the beat's, verbatim");
});

// ----------------------------------------------- locked: always a lit job

test("locked: marks >= 1 lights a job — and short of the top the carry is always lit regardless", () => {
  const rnd = mulberry32(0xA11);
  for (let run = 0; run < 300; run++) {
    const b = fresh();
    for (let i = 0; i < 30; i++) {
      const act = ["c", "B", "t", "U"][Math.floor(rnd() * 4)];
      if (act === "c") b.commitCarry();
      else if (act === "B") b.commitB();
      else if (act === "t") b.commitTend();
      else b.commitUp();
      if (b.topped) {
        assert.deepEqual(b.litJobs(), [], "topped is the one stop");
        break;
      }
      assert.ok(b.litJobs().includes("carry"), "the carry is always lit short of the top");
      if (b.marks >= 1) assert.ok(b.litJobs().length >= 1, "marks >= 1 lights a job");
    }
  }
});

// ----------------------------------------------- kill: WARM, scenery, assets

test("kill: WARM does not light as a job — the verb is gone from the board, its work stands as scenery", () => {
  assert.equal(typeof fresh().canWarm, "undefined");
  assert.equal(typeof fresh().commitWarm, "undefined");
  const b = walk("cBc");
  for (const job of b.litJobs()) {
    assert.ok(["carry", "B", "tend", "up"].includes(job), "unknown job lit: " + job);
  }
});

test("kill: scale neither reads nor writes the heat sitting's state — bank and hearth are scenery", () => {
  // Behavioral: the hearth holds and the bank stays through every walk probed.
  for (const line of [PURE_CARRY_TOP, MOSSWAKE_TOP, FULL_GROUND_TOP, "cccc"]) {
    const b = walk(line);
    assert.equal(b.hearth, "held", "the hearth does not dim under \"" + line + "\"");
    assert.equal(b.banked, true, "the bank stays in the stone under \"" + line + "\"");
  }
  // Source-shape: no commit path touches them.
  for (const fn of ["commitCarry", "commitB", "commitTend", "commitUp"]) {
    const body = SIT_SIM.match(new RegExp("function " + fn + "\\(\\)[\\s\\S]*?\\n  \\}"));
    assert.ok(body, fn + "() found");
    assert.doesNotMatch(body[0], /hearth|banked/, fn + " must not touch the heat sitting's state");
  }
});

test("kill: exactly one scaling asset — the api surface is pinned", () => {
  const keys = Object.keys(fresh()).sort();
  assert.deepEqual(keys, [
    "banked", "canB", "canCarry", "canTend", "canUp",
    "carryYield", "commitB", "commitCarry", "commitTend", "commitUp",
    "endSentence", "haul", "hearth", "level", "litJobs", "marks",
    "reserve", "topped", "upPrice", "wait",
  ]);
});

// --------------------------------------------------------- kill: the board

test("kill: the HUD keeps its one line and gains nothing — no reserve surface, one control", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 2,
    "the HUD holds the played marks line plus exactly one asset line, found " + children.length);
  const scaleLine = hud.match(/<div id="scale-line">.*/);
  assert.ok(scaleLine, "the one line is the scale line");
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
  assert.match(SIT_HTML, />TEND 1</, "TEND sits where REPAIR sat, priced on its face");
  assert.doesNotMatch(SIT_HTML, /REPAIR/, "REPAIR is recut, not duplicated");
  assert.match(SIT_HTML, />UP 3</);
  assert.match(SIT_HTML, /String\(board\.marks\) \+ " marks"/);
  assert.match(SIT_HTML, /"CARRY FOOD \+" \+ board\.carryYield/, "the carry label is the yield meter");
  assert.match(SIT_HTML, /aria-label="Greenhouse level 1 of 4"/);
});

test("kill: no clock — no ticker, no bar of any kind, no build countdown, no per-tick drain", () => {
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
    /raider/i,
    /stormbird/i,
    /signal.tower/i,
    /core-dim/,
    /core-full/,
    /core-dead/,
    /id="band"/,
    /id="core"/,
    /id="drive"/,
    /CFD-163/,
    /id="step"/,
    /heldA|\bthin\b/,
  ];
  for (const re of banned) {
    assert.equal(re.test(src), false, "banned token " + re);
  }
});

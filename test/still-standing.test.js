"use strict";

// CFD-212 — C14 — Still standing.
// Spec: docs/cfd-212-still-standing-beat.md (SIGNED — David, 2026-09-04;
// implementation released). Sibling /still-standing/. Parent
// /two-ways-from-here/ (CFD-210, PASSED 2026-09-02), re-named at signature
// and confirmed still the last board to pass. Its bytes are pinned below and
// do not move. Not a recut of anything.
//
// One NEW system: THE FORK'S BRANCHES DO NOT END THE SITTING. You choose, you
// keep playing, and the branch you did not take is still there on the board
// while you go on without it.
//
// THE INSTRUMENT CHANGED, and the beat says so. This is the first board in the
// lineage whose sitting has no finite frame bound — a line of repeated paid
// sends does not terminate and marks are unbounded above — so the parent's
// "enumerate notice() at every place at every frame" is no longer executable
// as written. It is replaced, per the beat, by TWO instruments used together:
//
//   1. a declared FRAMES list of representative FINITE lines, each with its
//      complete expected live set, and
//   2. a seeded walk over 400 sittings capped at 60 steps, asserting
//      lives.length >= 1 on every unstopped frame — the dead-screen guard.
//
// MARKS ARE QUOTIENTED, and the beat asked for this call to be stated here
// rather than left implicit: the only thing notice() can observe about marks
// is `marks < stakeOf()` versus `>=`, through canSend(). Everything at or
// above the stake is one class. That is what makes the FRAMES list a sample of
// a finite abstract state space rather than an arbitrary selection —
// {consist home / away} x {fork unopened / open / spent by bank / by a paid
// press-on / by a lost one} x {marks below / at-or-above the stake} x
// {running / ended short / ended spent}.
//
// COVERAGE, MEASURED RATHER THAN CLAIMED. An earlier cut of this comment said
// the list "reaches every reachable cell". It does not, and a test file that
// overstates its own instrument is the defect this project has recorded more
// than once. Measured by exhaustive BFS over DRIVEN action sequences: the list
// reaches 17 of the 19 cells reachable under the four factors above, and 20 of
// 23 under a finer cell. The gap is real and this list is a SAMPLE, not a
// cover. What actually guarantees the corridor is the fuzz below, which drives
// whole sittings rather than enumerating chosen frames — read the two together
// and do not treat this list as exhaustive.
//
// Every frame is reached by DRIVING from the open with a controlled roll,
// never by assigning state. The corridor is graded by enumerating notice() at
// every place, and by liveCanDos() — never by liveCanDo(), which returns the
// FIRST match and cannot see the fork at all.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Board = require("../sit/still-standing/sim.js");
const Parent = require("../sit/two-ways-from-here/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/still-standing/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/still-standing/sim.js"), "utf8");
const PARENT_SIM = fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/sim.js"), "utf8");
const SIM_CODE = SIT_SIM.replace(/\/\/.*$/gm, "");
const PARENT_SIM_CODE = PARENT_SIM.replace(/\/\/.*$/gm, "");
const HTML_CODE = SIT_HTML.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const BOARD = HTML_CODE + "\n" + SIM_CODE;

const OPENING_MARKS = 3;
const MOSS_CHANCE = 0.64;
const MOSS_PERCENT = 64;
const MOSS_PAYS = 14;
const MOSS_STAKE = 2;
const MUSEUM_MARK = 1;

const PLACES = ["halt", "mosswake", "consist", "rustfall"];
const SEND_FACE = "SEND. " + MOSS_PERCENT + ".";
const HOME_FACE = "Home she comes. " + MOSS_PERCENT + ".";
const PRESS_FACE = "ROLL HER OUT. " + MOSS_PERCENT + ".";
const COLLECT_FACE = "Collect.";

// Inherited words, unmoved.
const ARMED_LINE = "The run came home short and the larder covered it.";
const BANKED_LINE = "People remember who showed up.";
const MOSS_LOST_WRITING = "Mosswake. She came home short again.";
const MOSS_LOST_BLOCKED = "Still a neighbor. Nothing to collect.";
const NEIGHBOR_LINE = "Mosswake. A neighbor again.";

// ENDING A — the second STAKED short run. The parent's COLD_END words, whose
// fiction fits this cause exactly: the larder covered one shortfall and could
// not cover another.
const COLD_END = "She came home short again. The larder could not cover it twice.";
const COLD_WHY_MOSS = "The larder could not cover it twice.";
const COLD_WHY_HALT = "The herbs are already up. The larder could not cover it twice.";

// ENDING B — the floor. Its own sentence on every tile: David ruled the two
// endings do not share one, because a player who cannot tell "the wallet
// emptied" from "a rule fired" will report the second.
const SPENT_END = "The consist is home. There is nothing left to put up.";
const SPENT_WHY = "The runs took the stake. What is left will not cover another.";
const SPENT_WHY_MOSS = "There is nothing left to put up for a run.";
const SPENT_WHY_HALT = "The herbs are already up. There is nothing left to put up for a run.";

// The REPAIRED cost line. On the parent it meant "the sitting ends cold"; here
// a lost press-on ends nothing, so the old promise was falsified rather than
// preserved by leaving it in place. David, 2026-09-04, ARGUE item 1: change
// it, and record the change as a repair of an inherited sentence whose
// referent moved rather than as an improvement.
const PRESS_COST = "The larder covered it once. Roll her out and there is nothing left to collect.";
const OLD_PRESS_COST = "The larder covered it once. It will not cover it twice.";

// The forgone branches, each on the tile that offered it.
const FORGONE_PRESS = "She was not rolled out.";

const PIN = {
  rememberIndex: "acbf4304c3cabd22a8d7ff95cd72a5b09aa939416c66805e7f31651f07c78cbd",
  rememberSim: "a3345903c01ea506295c3e1a3c442bf1973b0d551167a2394555579c756d542e",
  larderIndex: "676587bce8b3629ce8f8c64d03f78a722b0479bec53c655413067d2c61f7eb90",
  larderSim: "76c886b928bc2b4758362331b1880ff0703d034781aee3137d5c895a8d4e6811",
  mossIndex: "6c30179c609569c7944e4e812a7a06a2f12ff0cc09c1772088925d9d5e01d1fb",
  mossSim: "f5407bca93deec06ca4944b475e42cd86bd6c75d329db421decebabcbb661679",
  haltIndex: "b5a56a146b548747a5ecfce9b253e56e0bea89f47557328a57205ddfd56ab5ef",
  haltSim: "6eb957e790c90c6702f2b8cc45bb6b9081b6b092816498b32df4e1b2b3dc07b4",
  // The parent. PASSED 2026-09-02, self-pinned in its own test the same day.
  // Copied from test/two-ways-from-here.test.js:206-209, not retyped.
  twoWaysIndex: "d800c8de6bec83dce31dd7513023f7f71f4cac309c52f76c6358a80e3b613910",
  twoWaysSim: "13bb2d43d8650ef814764d928c6aa0f26a74776b2831874a336ff82c9b131858",
};

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}
function gitBlob(p) {
  return execFileSync("git", ["cat-file", "blob", "HEAD:" + p], { cwd: ROOT });
}
function cssOf() {
  return SIT_HTML.slice(0, SIT_HTML.indexOf("</style>"));
}
function cssCodeOf() {
  return HTML_CODE.slice(0, HTML_CODE.indexOf("</style>"));
}
function rule(sel) {
  const esc = sel.split("").map((ch) => (ch === "." || ch === "#" ? "\\" + ch : ch)).join("");
  const m = cssOf().match(new RegExp(esc + "\\s*\\{([^}]*)\\}"));
  assert.ok(m, "CSS rule not found: " + sel);
  return m[1];
}
function box(sel) {
  const r = rule(sel);
  const num = (prop) => {
    const m = r.match(new RegExp(prop + ":\\s*([0-9.]+)%"));
    assert.ok(m, sel + " missing " + prop);
    return Number(m[1]);
  };
  return { left: num("left"), bottom: num("bottom"), width: num("width"), height: num("height") };
}
function overlap(a, b) {
  return a.left < b.left + b.width && b.left < a.left + a.width
    && a.bottom < b.bottom + b.height && b.bottom < a.bottom + a.height;
}
function fnBody(name) {
  const m = SIM_CODE.match(new RegExp("function " + name + "\\(\\) \\{([\\s\\S]*?)\\n  \\}"));
  assert.ok(m, "function " + name + " not found in sim.js");
  return m[1];
}

function makeBoard(opts) {
  const ctl = { next: 0, calls: 0 };
  const o = {
    fresh: true,
    roll: function () { ctl.calls += 1; return ctl.next; },
  };
  if (opts && Number.isInteger(opts.marks)) o.marks = opts.marks;
  return { b: Board.createBoard(o), ctl };
}
function makeParentBoard() {
  const ctl = { next: 0, calls: 0 };
  return { b: Parent.createBoard({ fresh: true, roll: function () { ctl.calls += 1; return ctl.next; } }), ctl };
}

// S send · + home paid · - home short · C Collect (bank) · P press on · . wait
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "S") ok = h.b.commitSend();
    else if (ch === "+") { h.ctl.next = 0; ok = h.b.commitHome(); }
    else if (ch === "-") { h.ctl.next = 1; ok = h.b.commitHome(); }
    else if (ch === "C") ok = h.b.commitCollect();
    else if (ch === "P") ok = h.b.commitPress();
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}

function canDos(b) {
  return b.places().map((p) => b.notice(p)).filter((n) => n && n.canDo);
}
function tags(b) {
  return canDos(b).map((n) => n.place + ":" + n.canDo);
}
function snapshot(b) {
  const out = {};
  for (const k of Object.keys(b)) if (typeof b[k] !== "function") out[k] = b[k];
  return out;
}

// After a stop, every commit is refused and nothing moves. Places still post
// their notices — a stopped board stays readable.
function postStop(h) {
  const before = snapshot(h.b);
  assert.equal(h.b.commitSend(), false);
  assert.equal(h.b.commitHome(), false);
  assert.equal(h.b.commitCollect(), false);
  assert.equal(h.b.commitPress(), false);
  for (const p of PLACES) {
    assert.equal(h.b.postNotice(p), true);
    assert.equal(h.b.commitPosted(), false, "post-stop: " + p + " fired");
  }
  assert.equal(h.b.wait(), false);
  const after = snapshot(h.b);
  delete before.posted;
  delete after.posted;
  assert.deepEqual(after, before, "post-stop: state moved");
  return h;
}

// A SAMPLE, and the header says why it can only be one. Each row is a complete
// finite line with its full expected live set. `stop` names which ending the
// line reaches, so no row can quietly become a different ending.
const FRAMES = [
  { name: "open", line: "", live: ["mosswake:" + SEND_FACE] },
  { name: "sent", line: "S", live: ["consist:" + HOME_FACE] },
  { name: "home-paid", line: "S+", live: ["mosswake:" + SEND_FACE] },
  { name: "paid-then-sent", line: "S+S", live: ["consist:" + HOME_FACE] },
  { name: "home-short-ARMED", line: "S-", live: ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE] },
  { name: "arm-after-a-paid-run", line: "S+S-", live: ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE] },

  // The one new system: all three branches leave the sitting running.
  { name: "BANKED-and-playing", line: "S-C", live: ["mosswake:" + SEND_FACE] },
  { name: "banked-then-sent", line: "S-CS", live: ["consist:" + HOME_FACE] },
  { name: "banked-sent-paid", line: "S-CS+", live: ["mosswake:" + SEND_FACE] },
  { name: "pressing", line: "S-P", live: ["consist:" + HOME_FACE] },
  { name: "PRESS-PAID-and-playing", line: "S-P+", live: ["mosswake:" + SEND_FACE] },
  { name: "press-paid-then-sent", line: "S-P+S", live: ["consist:" + HOME_FACE] },
  { name: "PRESS-LOST-and-playing", line: "S+S-P-", live: ["mosswake:" + SEND_FACE] },
  { name: "press-lost-then-sent", line: "S+S-P-S", live: ["consist:" + HOME_FACE] },
  { name: "press-lost-then-paid", line: "S+S-P-S+", live: ["mosswake:" + SEND_FACE] },
  { name: "banked-late", line: "S+S-C", live: ["mosswake:" + SEND_FACE] },

  // ENDING A — the second STAKED short run, reached from each branch.
  { name: "ENDING-A-after-bank", line: "S-CS-", live: [], stop: "short" },
  { name: "ENDING-A-after-a-paid-press", line: "S-P+S-", live: [], stop: "short" },
  { name: "ENDING-A-after-a-lost-press", line: "S+S-P-S-", live: [], stop: "short" },
  { name: "ENDING-A-late", line: "S+S-CS+S-", live: [], stop: "short" },

  // ENDING B — the floor. Reached where the beat measured it: a lost press-on
  // at the OPENING arm, which leaves 1 mark against a stake of 2.
  { name: "ENDING-B-floor", line: "S-P-", live: [], stop: "spent" },

  { name: "post-stop-A", line: "S-CS-", post: true, live: [], stop: "short" },
  { name: "post-stop-B", line: "S-P-", post: true, live: [], stop: "spent" },
];
function frames() {
  return FRAMES.map((f) => {
    const h = walk(f.line);
    if (f.post) postStop(h);
    return { name: f.name, line: f.line, live: f.live, stop: f.stop, h };
  });
}
function atFork(b) {
  return b.canCollect() && b.canPress();
}

// ---------------------------------------------------------------- guards

// "Thirteen" is boards pinned by an INDEX+SIM PAIR. The table names fifteen distinct
// board directories; /dawnspur/ and /convoy-stop/ carry a public sim only and are
// counted by neither. Stating the denominator so the next increment is not a guess.
test("guard: the thirteen pinned boards (index+sim pairs) are unchanged at HEAD — this board and the parent among them", () => {
  // /still-standing/ PASSED its sit 2026-09-04 — David: "I was able to do runs
  // to mosswake over adn over until then one failed and the larder covered it
  // and then I kept going until there was a nother issue and the larder could
  // not cover it twice at which poiint the instance was over and I could not
  // do anything else." Verdict: "Pass, and land it against outcome 2 as
  // registered." It joins its own pin list at that moment and not before:
  // while a board is being cut, pinning its own bytes is circular, and the
  // sit-equals-public test below cannot see a COORDINATED overwrite of both
  // copies. Self-pinning is part of recording a pass.
  //
  // This is the FIFTH board to need self-pinning on the day it passed. The
  // cause is structural, not forgetfulness: each new board's test pins the
  // PRIOR boards, so the newest passed board is unprotected until a successor
  // exists. The comment this replaces said four boards had needed it; the
  // count moves every time, which is the tell that the hole is in the shape
  // and not in anyone's memory.
  //
  // The parent /two-ways-from-here/ PASSED 2026-09-02. Its four paths are
  // pinned here exactly as its own test pins them — copied, not retyped.
  const pins = {
    "sit/still-standing/sim.js": "6b3b9267d4e43542c3a68c1dad8267db4ef1b97744fd614d49490bd1994d2ea8",
    "public/still-standing/sim.js": "6b3b9267d4e43542c3a68c1dad8267db4ef1b97744fd614d49490bd1994d2ea8",
    "sit/still-standing/index.html": "69ab4662c534ee16fa7dbb82d52bb6edd70ca9607be38ccfe761b2c2b9d4ae40",
    "public/still-standing/index.html": "69ab4662c534ee16fa7dbb82d52bb6edd70ca9607be38ccfe761b2c2b9d4ae40",
    "sit/two-ways-from-here/sim.js": PIN.twoWaysSim,
    "public/two-ways-from-here/sim.js": PIN.twoWaysSim,
    "sit/two-ways-from-here/index.html": PIN.twoWaysIndex,
    "public/two-ways-from-here/index.html": PIN.twoWaysIndex,
    "sit/dice-at-the-places/sim.js": "f64b4309e407f28b54cd228d502971b47355b457afe3337b77e5f6618c186611",
    "public/dice-at-the-places/sim.js": "f64b4309e407f28b54cd228d502971b47355b457afe3337b77e5f6618c186611",
    "sit/dice-at-the-places/index.html": "d97d995173276e286c37156697ca296d31f238774d0e783c00c7a91db125868c",
    "public/dice-at-the-places/index.html": "d97d995173276e286c37156697ca296d31f238774d0e783c00c7a91db125868c",
    "sit/they-remember/sim.js": PIN.rememberSim,
    "public/they-remember/sim.js": PIN.rememberSim,
    "sit/they-remember/index.html": PIN.rememberIndex,
    "public/they-remember/index.html": PIN.rememberIndex,
    "sit/herbs-larder/sim.js": PIN.larderSim,
    "public/herbs-larder/sim.js": PIN.larderSim,
    "sit/herbs-larder/index.html": PIN.larderIndex,
    "public/herbs-larder/index.html": PIN.larderIndex,
    "sit/mosswake-loop/sim.js": PIN.mossSim,
    "public/mosswake-loop/sim.js": PIN.mossSim,
    "sit/mosswake-loop/index.html": PIN.mossIndex,
    "public/mosswake-loop/index.html": PIN.mossIndex,
    "sit/dawnspur-halt/sim.js": PIN.haltSim,
    "public/dawnspur-halt/sim.js": PIN.haltSim,
    "sit/dawnspur-halt/index.html": PIN.haltIndex,
    "public/dawnspur-halt/index.html": PIN.haltIndex,
    "sit/dawnspur-site/sim.js": "e9f81b743d11a7359a0c6c1b8c5629818f5d70c3a3f5f0b96c7484469500306f",
    "public/dawnspur-site/sim.js": "e9f81b743d11a7359a0c6c1b8c5629818f5d70c3a3f5f0b96c7484469500306f",
    "sit/dawnspur-site/index.html": "070a4619af45efa423ac68050c81fa2ca13e95a8eb9316e529d349145fccf3a7",
    "public/dawnspur-site/index.html": "070a4619af45efa423ac68050c81fa2ca13e95a8eb9316e529d349145fccf3a7",
    "sit/dawnspur-line/sim.js": "18b1324f33114a1dd6b5bf4c8905f2facac80286d5470b0c803ba47877040e65",
    "public/dawnspur-line/sim.js": "18b1324f33114a1dd6b5bf4c8905f2facac80286d5470b0c803ba47877040e65",
    "sit/dawnspur-line/index.html": "b6f21db0dd8a2d4ee9373f859859748c5c0778204a3cad6ee95466c338d43f2a",
    "public/dawnspur-line/index.html": "b6f21db0dd8a2d4ee9373f859859748c5c0778204a3cad6ee95466c338d43f2a",
    "sit/dawnspur-dispatch/sim.js": "576ce2b6de31dd70653d90d45d203c15067e41aaa0624bba2f09245b31bfa74d",
    "public/dawnspur-dispatch/sim.js": "576ce2b6de31dd70653d90d45d203c15067e41aaa0624bba2f09245b31bfa74d",
    "sit/dawnspur-dispatch/index.html": "31aead60",
    "public/dawnspur-dispatch/index.html": "31aead60",
    "sit/dawnspur-scale/sim.js": "953368a11dcf0a7f2478e59e4b572ca458a0d404b0dfba78822d04fb306db31c",
    "public/dawnspur-scale/sim.js": "953368a11dcf0a7f2478e59e4b572ca458a0d404b0dfba78822d04fb306db31c",
    "sit/dawnspur-scale/index.html": "5d2f452f",
    "sit/dawnspur-heat/sim.js": "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b",
    "public/dawnspur-heat/sim.js": "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b",
    "sit/dawnspur-heat/index.html": "b5f7e14f",
    "public/dawnspur/sim.js": "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c",
    "public/convoy-stop/sim.js": "5ad814e6eb9f8263be5dd224ae42497de932ec87b767a96399aaa4348a4a146f",
    "sit/dawnspur-storm/sim.js": "f4f17008dcba0c726504f76f250158767e4288a8fa39623e6238de2ad6c91064",
    "public/dawnspur-storm/sim.js": "f4f17008dcba0c726504f76f250158767e4288a8fa39623e6238de2ad6c91064",
    "sit/dawnspur-storm/index.html": "7711f979f8b0e09c1ae00b834497b945599a92f31b4cef849bf9c50e06198682",
    "public/dawnspur-storm/index.html": "7711f979f8b0e09c1ae00b834497b945599a92f31b4cef849bf9c50e06198682",
  };
  for (const [p, want] of Object.entries(pins)) {
    const got = sha256(gitBlob(p));
    if (want.length === 8) {
      assert.equal(got.slice(0, 8), want, p + " moved — the lineage lock is the one rule that never bends");
    } else {
      assert.equal(got, want, p + " moved — the lineage lock is the one rule that never bends");
    }
  }
});

test("this sitting writes no bytes under any pinned board directory — the parent included", () => {
  const dirty = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT }).toString("utf8");
  const lines = dirty.split("\n").filter(Boolean);
  const foreign = lines.filter((l) => {
    const p = l.slice(3).trim();
    return (
      p.startsWith("sit/two-ways-from-here/") ||
      p.startsWith("public/two-ways-from-here/") ||
      p.startsWith("sit/dice-at-the-places/") ||
      p.startsWith("public/dice-at-the-places/") ||
      p.startsWith("sit/they-remember/") ||
      p.startsWith("public/they-remember/") ||
      p.startsWith("sit/herbs-larder/") ||
      p.startsWith("public/herbs-larder/") ||
      p.startsWith("sit/mosswake-loop/") ||
      p.startsWith("public/mosswake-loop/") ||
      p.startsWith("sit/dawnspur-halt/") ||
      p.startsWith("public/dawnspur-halt/") ||
      p.startsWith("sit/dawnspur-site/") ||
      p.startsWith("public/dawnspur-site/") ||
      p.startsWith("sit/dawnspur-storm/") ||
      p.startsWith("public/dawnspur-storm/") ||
      p.startsWith("sit/dawnspur-line/") ||
      p.startsWith("public/dawnspur-line/") ||
      p.startsWith("sit/dawnspur-dispatch/") ||
      p.startsWith("public/dawnspur-dispatch/") ||
      p.startsWith("sit/dawnspur-scale/") ||
      p.startsWith("public/dawnspur-scale/") ||
      p.startsWith("sit/dawnspur-heat/") ||
      p.startsWith("public/dawnspur-heat/") ||
      p.startsWith("public/dawnspur/") ||
      p.startsWith("public/convoy-stop/") ||
      p.startsWith("kills/")
    );
  });
  assert.deepEqual(foreign, [], "foreign board paths dirtied: " + JSON.stringify(foreign));
});

test("kill: the PARENT two-ways-from-here pin files unmoved on disk (d800c8de / 13bb2d43)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/index.html"))), PIN.twoWaysIndex,
    "sit/two-ways-from-here/index.html moved on disk");
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/two-ways-from-here/index.html"))), PIN.twoWaysIndex,
    "public/two-ways-from-here/index.html moved on disk");
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/sim.js"))), PIN.twoWaysSim,
    "sit/two-ways-from-here/sim.js moved on disk");
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/two-ways-from-here/sim.js"))), PIN.twoWaysSim,
    "public/two-ways-from-here/sim.js moved on disk");
  assert.equal(PIN.twoWaysIndex.slice(0, 8), "d800c8de");
  assert.equal(PIN.twoWaysSim.slice(0, 8), "13bb2d43");
});

test("kill: dice-at-the-places pin files unmoved on disk (d97d9951 / f64b4309)", () => {
  const IDX = "d97d995173276e286c37156697ca296d31f238774d0e783c00c7a91db125868c";
  const SIM = "f64b4309e407f28b54cd228d502971b47355b457afe3337b77e5f6618c186611";
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/index.html"))), IDX);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dice-at-the-places/index.html"))), IDX);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/sim.js"))), SIM);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dice-at-the-places/sim.js"))), SIM);
});

test("kill: they-remember pin files unmoved (acbf4304 / a3345903)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/they-remember/index.html"))), PIN.rememberIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/they-remember/index.html"))), PIN.rememberIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/they-remember/sim.js"))), PIN.rememberSim);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/they-remember/sim.js"))), PIN.rememberSim);
  assert.equal(PIN.rememberIndex.slice(0, 8), "acbf4304");
  assert.equal(PIN.rememberSim.slice(0, 8), "a3345903");
});

test("kill: herbs-larder pin files unmoved (676587bc / 76c886b9)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/herbs-larder/index.html"))), PIN.larderIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/herbs-larder/sim.js"))), PIN.larderSim);
  assert.equal(PIN.larderIndex.slice(0, 8), "676587bc");
  assert.equal(PIN.larderSim.slice(0, 8), "76c886b9");
});

test("kill: Mosswake pin files unmoved (6c30179c / f5407bca)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/mosswake-loop/index.html"))), PIN.mossIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/mosswake-loop/sim.js"))), PIN.mossSim);
  assert.equal(PIN.mossIndex.slice(0, 8), "6c30179c");
  assert.equal(PIN.mossSim.slice(0, 8), "f5407bca");
});

test("kill: Halt pin files unmoved (b5a56a14 / 6eb957e7)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/index.html"))), PIN.haltIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js"))), PIN.haltSim);
  assert.equal(PIN.haltIndex.slice(0, 8), "b5a56a14");
  assert.equal(PIN.haltSim.slice(0, 8), "6eb957e7");
});

test("deploy copy public/still-standing is byte-identical to sit/still-standing", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/still-standing")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/still-standing")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/still-standing/" + f)), sha256(raw("sit/still-standing/" + f)),
      "sit/public drift: " + f);
  }
});

test("sit hashes === public hashes for this board", () => {
  const sitIndex = sha256(fs.readFileSync(path.join(ROOT, "sit/still-standing/index.html")));
  const pubIndex = sha256(fs.readFileSync(path.join(ROOT, "public/still-standing/index.html")));
  const sitSim = sha256(fs.readFileSync(path.join(ROOT, "sit/still-standing/sim.js")));
  const pubSim = sha256(fs.readFileSync(path.join(ROOT, "public/still-standing/sim.js")));
  assert.equal(sitIndex, pubIndex, "index.html sit !== public");
  assert.equal(sitSim, pubSim, "sim.js sit !== public");
});

test("MANIFEST.txt records the shipped hashes, and names the boards left standing — the parent among them", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/still-standing/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/still-standing/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of [
    "d800c8de", "13bb2d43",
    "d97d9951", "f64b4309",
    "a3345903", "acbf4304",
    "676587bc", "76c886b9",
    "6c30179c", "f5407bca",
    "b5a56a14", "6eb957e7",
    "070a4619", "e9f81b74",
    "18b1324f", "b6f21db0", "576ce2b6", "31aead60",
    "953368a1", "5d2f452f", "292d6645", "b5f7e14f", "395c18f2", "5ad814e6",
    "f4f17008", "7711f979",
    "9a305653",
  ]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
  assert.match(man, /CFD-212/);
  assert.match(man, /\/two-ways-from-here\/[\s\S]*PASSED/, "the parent is named as PASSED");
});

test("the board ships three files and reaches for nothing off itself — the parent's name is not a global here", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/still-standing")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link |@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /TwoWaysFromHere|DiceAtThePlaces|DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|DawnspurStorm|DawnspurSite|DawnspurHalt|MosswakeLoop|HerbsLarder|TheyRemember|two-ways-from-here|dice-at-the-places|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|dawnspur-storm|dawnspur-site|dawnspur-halt|mosswake-loop|herbs-larder|they-remember|convoy-stop/,
    "no other board's module or path is named outside a comment — the lineage lock");
  assert.match(SIT_SIM, /globalThis\.StillStanding = api/, "the global is this board's own name");
  assert.match(SIT_HTML, /StillStanding\.createBoard\(\{ fresh: true \}\)/, "the page boots its own module");
  assert.match(SIT_SIM, /^\/\/.*CFD-212/m, "the header names the card");
  assert.match(SIT_SIM, /^\/\/.*\/two-ways-from-here\//m, "the header names the parent — in a comment, where the lock allows it");
  assert.match(SIT_HTML, /<title>Still Standing<\/title>/);
});

test("the signed CFD-212 beat is the brief — and the one new system is the part that governs", () => {
  const beat = fs.readFileSync(path.join(ROOT, "docs/cfd-212-still-standing-beat.md"), "utf8");
  assert.match(beat, /SIGNED — David, 2026-09-04/);
  assert.match(beat, /IMPLEMENTATION IS RELEASED/);
  assert.match(beat, /\/still-standing\//);
  assert.match(beat, /the fork's branches do not end the sitting/i);
  assert.match(beat, /Parent: `\/two-ways-from-here\/`/);
  assert.match(beat, /the second staked short run/i);
  assert.match(beat, /SEPARATE SENTENCES/);
  assert.match(beat, /the floor/i);
  assert.match(beat, /EACH BRANCH STAYS WHERE IT WAS[\s\S]{0,8}OFFERED/);
  assert.match(beat, /RULED: CHANGE IT/);
  assert.match(beat, /liveCanDos\(\)/);
  assert.match(beat, /undefined/);
  assert.match(beat, /9a305653/);
  assert.match(beat, /Ask: What happened/);
});

test("no new numbers — the set of numeric literals in sim.js is the parent's set", () => {
  const nums = (code) => new Set(code.match(/(?<![\w.])\d+(?:\.\d+)?(?![\w.])/g) || []);
  const mine = nums(SIM_CODE);
  const theirs = nums(PARENT_SIM_CODE);
  assert.deepEqual([...mine].sort(), [...theirs].sort(),
    "a number entered or left the file: mine " + JSON.stringify([...mine].sort()) +
      " vs parent " + JSON.stringify([...theirs].sort()));
  assert.match(SIM_CODE, /baseRisk: 0\.12,\s*pays: 14,\s*provisions: 2,\s*toll: 0/);
  assert.equal((SIM_CODE.match(/baseRisk:/g) || []).length, 1, "one route. No second route object.");
  assert.doesNotMatch(SIM_CODE, /68|pays: 10|dawnspur/);
});

// ------------------------------------------------------------ the opening

test("kill: opening is the desk float on a finished city; one live SEND at Mosswake; nothing armed, nothing spent, nothing ended", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, OPENING_MARKS);
  assert.equal(b.openingMarks, OPENING_MARKS);
  assert.equal(b.lampLit, true);
  assert.equal(b.haltHolds, true);
  assert.equal(b.foundry, true);
  assert.equal(b.foodOnTerrace, false);
  assert.equal(b.foodInTown, true);
  assert.equal(b.heatStep, 1);
  assert.equal(b.mossDim, true);
  assert.equal(b.mossQuiet, true);
  assert.equal(b.herbsWasting, false);
  assert.equal(b.herbsOnMoss, false);
  assert.equal(b.herbsInLarder, true);
  assert.equal(b.neighborAgain, true);
  assert.equal(b.consistAt, "halt");
  assert.equal(b.haulOnConsist, false);
  assert.equal(b.promiseKept, true);
  assert.equal(b.putUp, true);
  assert.equal(b.collected, false);
  assert.equal(b.remembered, false);
  assert.equal(b.armed, false);
  assert.equal(b.stopped, false);
  assert.equal(b.endedCold, false, "endedCold must be explicitly false at the open — undefined is not false");
  assert.equal(b.endedSpent, false, "the floor's marker must be explicitly false at the open");
  assert.equal(b.larderSpent, false, "the latch must be explicitly false at the open, or a forgotten field ends the sitting at the first short run");
  assert.equal(b.pressLost, false, "the lost-press marker must be explicitly false at the open");
  assert.equal(b.posted, null);
  assert.equal(b.endSentence, null);
  assert.deepEqual(b.places(), ["halt", "mosswake", "consist", "rustfall"]);
  assert.equal(b.canSend(), true);
  assert.equal(b.canHome(), false);
  assert.equal(b.canCollect(), false);
  assert.equal(b.canPress(), false, "the fork is not lit at the open");
  assert.deepEqual(b.liveCanDos(), [{ place: "mosswake", verb: "send", canDo: SEND_FACE }]);
  assert.deepEqual(tags(b), ["mosswake:" + SEND_FACE]);
  assert.deepEqual(b.record, { runsOut: 0, cargoesBanked: 0, runsTurnedBack: 0, marksLost: 0, pressOns: 0 });
  assert.deepEqual(b.map, { left: 42, width: 16 });
});

test("kill: a state field is left undefined rather than initialised — make() aliases the literal with no defaulting", () => {
  const b = makeBoard().b;
  for (const k of Object.keys(b)) {
    if (typeof b[k] === "function") continue;
    assert.notEqual(b[k], undefined, "getter " + k + " is undefined at the open");
  }
  const start = SIM_CODE.indexOf("return make({");
  const lit = SIM_CODE.slice(start, SIM_CODE.indexOf("});", start));
  assert.match(lit, /\bendedCold: false,/);
  assert.match(lit, /\bendedSpent: false,/, "the floor's marker is initialised false in the createBoard literal");
  assert.match(lit, /\blarderSpent: false,/, "the latch is initialised false in the createBoard literal");
  assert.match(lit, /\bpressLost: false,/, "the lost-press marker is initialised false in the createBoard literal");
  assert.match(lit, /\bpressOns: 0,/);
  assert.match(lit, /\barmed: false,/);
  assert.match(lit, /\bstopped: false,/);
  assert.match(lit, /\baway: null,/);
  assert.doesNotMatch(lit, /:\s*undefined/, "no field is initialised to undefined");
  const reads = new Set((SIM_CODE.match(/\bs\.([a-zA-Z]+)\b/g) || []).map((m) => m.slice(2)));
  for (const f of reads) {
    assert.match(lit, new RegExp("\\b" + f + ":"), "sim reads s." + f + " but the literal never initialises it");
  }
});

test("kill: the opening's marks are not settable from the board the thumb reaches", () => {
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*marks/, "the board hands in no balance");
  assert.match(SIT_HTML, /createBoard\(\{ fresh: true \}\)/, "the board opens fresh");
});

test("the board is the parent EXACTLY until the fork resolves — and the one difference is the repaired cost line", () => {
  const shared = ["marks", "armed", "stopped", "collected", "remembered", "consistAt", "haulOnConsist",
    "herbsInLarder", "lampLit", "haltHolds", "posted", "runSentence"];
  for (const line of ["", "S", "S+", "S+S", "S+S+", "S+S-", "S-", "S-P"]) {
    const a = walk(line, makeParentBoard()).b;
    const c = walk(line).b;
    for (const p of PLACES) {
      if (line.endsWith("-") && p === "consist") continue; // the repaired cost line; measured below
      assert.deepEqual(c.notice(p), a.notice(p), "frame " + JSON.stringify(line) + " place " + p + " differs from the parent");
    }
    for (const k of shared) assert.deepEqual(c[k], a[k], "frame " + JSON.stringify(line) + " getter " + k);
    const ar = a.record;
    for (const k of Object.keys(ar)) assert.equal(c.record[k], ar[k], "frame " + JSON.stringify(line) + " record." + k);
  }
  // at the fork: three tiles identical; the consist differs by ONE field
  const a = walk("S-", makeParentBoard()).b;
  const c = walk("S-").b;
  for (const p of ["halt", "mosswake", "rustfall"]) assert.deepEqual(c.notice(p), a.notice(p), p);
  const pc = a.notice("consist");
  const cc = c.notice("consist");
  assert.equal(pc.blocked, OLD_PRESS_COST, "the parent's sentence, unmoved on the parent");
  assert.equal(cc.blocked, PRESS_COST, "the repair");
  for (const k of ["place", "canDo", "verb", "chance", "percent", "inProcess", "writing"]) {
    assert.deepEqual(cc[k], pc[k], "the fork's consist differs from the parent in " + k + ", not only in the cost line");
  }
});

// ------------------- the corridor: one, two at the fork, never three, NEVER ZERO

test("kill: more than one live can-do at the OPEN, or at any frame before the first run comes home", () => {
  for (const line of ["", "S"]) {
    const b = walk(line).b;
    const lives = canDos(b);
    assert.equal(lives.length, 1, "frame \"" + line + "\" has " + lives.length + " live can-dos: " + JSON.stringify(tags(b)));
  }
  assert.deepEqual(tags(makeBoard().b), ["mosswake:" + SEND_FACE], "the open is the parent's open");
  assert.equal(makeBoard().b.notice("consist").canDo, null, "the consist is dark at the open");
});

test("kill: more than two live can-dos at any frame, ever — and more than ONE at any frame after the fork is spent", () => {
  for (const f of frames()) {
    const b = f.h.b;
    const lives = canDos(b);
    assert.ok(lives.length <= 2, f.name + " has " + lives.length + " live can-dos: " + JSON.stringify(tags(b)));
    assert.deepEqual(tags(b), f.live, f.name + " (" + JSON.stringify(f.line) + ") lit the wrong set");
    assert.deepEqual(b.liveCanDos(), lives.map((n) => ({ place: n.place, verb: n.verb, canDo: n.canDo })),
      f.name + ": liveCanDos() disagrees with direct enumeration");
    if (b.collected || b.pressLost || (b.larderSpent && !b.armed)) {
      assert.ok(lives.length <= 1, f.name + ": the fork is spent and " + lives.length + " are lit — " + JSON.stringify(tags(b)));
    }
  }
});

test("KILL / LANDING GATE: a fork-spent state has no live can-do and no stop — a running sitting with a dead screen", () => {
  for (const f of frames()) {
    const b = f.h.b;
    if (b.stopped) continue;
    assert.ok(canDos(b).length >= 1, f.name + ": an unstopped board has NOTHING lit — the dead screen");
    assert.ok(b.liveCanDos().length >= 1, f.name + ": liveCanDos() is empty on an unstopped board");
  }
  // the state the beat measured as permanently dead on the parent: a lost
  // press-on at the OPENING arm leaves 1 mark against a stake of 2.
  const h = walk("S-P-");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE, "the press-on staked nothing, so 1 mark is left");
  assert.ok(h.b.marks < MOSS_STAKE, "no affordable send exists — this is the dead screen");
  assert.equal(h.b.stopped, true, "the floor closes it: the sitting ENDS rather than sitting there with nothing lit");
  assert.equal(h.b.endedSpent, true);
  assert.deepEqual(tags(h.b), []);
});

test("kill: canSend() is true and liveCanDos() is empty, in any state — the exact failure of keeping the words without rewriting the branch", () => {
  for (const f of frames()) {
    const b = f.h.b;
    if (!b.canSend()) continue;
    assert.ok(b.liveCanDos().length >= 1,
      f.name + ": canSend() is true and nothing is lit — Mosswake's notice returns a branch above canSend()");
    assert.equal(b.notice("mosswake").canDo, SEND_FACE,
      f.name + ": canSend() is true but Mosswake's notice does not offer it");
    assert.equal(b.notice("mosswake").verb, "send", f.name);
  }
});

test("kill: liveCanDo() is used to grade the corridor — it is first-match and BLIND to the fork; liveCanDos() sees it", () => {
  const b = walk("S-").b;
  assert.equal(canDos(b).length, 2);
  assert.deepEqual(b.liveCanDo(), { place: "mosswake", verb: "collect", canDo: COLLECT_FACE });
  assert.deepEqual(b.liveCanDos(), [
    { place: "mosswake", verb: "collect", canDo: COLLECT_FACE },
    { place: "consist", verb: "press", canDo: PRESS_FACE },
  ]);
  for (const f of frames()) {
    const many = f.h.b.liveCanDos();
    assert.deepEqual(f.h.b.liveCanDo(), many.length ? many[0] : null, f.name + ": the singular is kept, as the first of the plural");
  }
  const me = fs.readFileSync(__filename, "utf8");
  // The window ran from the corridor block to this test, which left the OPENING
  // test above it outside the pin while it calls the singular. Widened to the
  // whole file minus this test, which is the only place the singular may be
  // named — and the opening test's own singular call is dropped, the deepEqual
  // on liveCanDos() beside it already covering the same ground.
  // Comments are STRIPPED before matching, the way this repo's lineage-lock
  // regexes already do it. A first cut of the widened window went red on a
  // header comment that merely NAMES liveCanDo() while explaining why the
  // corridor is not graded on it — a guard that cannot tell a mention from a
  // call forbids writing down its own reason.
  const graded = me.slice(0, me.indexOf("kill: liveCanDo() is used to grade"))
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
  assert.doesNotMatch(graded, /\bliveCanDo\(\)/, "no test above may grade the corridor through the first-match singular");
});

test("fuzz: 400 sittings under honest dice — never three lit, two only at the fork, NEVER ZERO while running, every lit thing fires", () => {
  function lcg(seed) {
    let x = seed >>> 0;
    return function () { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; };
  }
  const ended = { short: 0, spent: 0, capped: 0 };
  let banked = 0;
  let pressedPaid = 0;
  let pressedLost = 0;
  let playedPastFork = 0;
  let maxLive = 0;
  for (let seed = 1; seed <= 400; seed++) {
    const roll = lcg(seed * 7919);
    const pick = lcg(seed * 104729 + 1);
    const b = Board.createBoard({ fresh: true, roll: roll });
    let steps = 0;
    let forkResolvedAt = -1;
    while (!b.stopped && steps < 60) {
      steps += 1;
      const lives = canDos(b);
      maxLive = Math.max(maxLive, lives.length);
      assert.ok(lives.length <= 2, "seed " + seed + " step " + steps + ": " + JSON.stringify(tags(b)));
      assert.equal(lives.length === 2, atFork(b), "seed " + seed + " step " + steps + ": two lit iff at the fork — " + JSON.stringify(tags(b)));
      assert.ok(lives.length >= 1, "seed " + seed + " step " + steps + ": an unstopped board has NOTHING lit");
      assert.equal(b.notice("halt").canDo, null, "the Halt lit");
      assert.equal(b.notice("rustfall").canDo, null, "Rustfall lit");
      assert.deepEqual(b.liveCanDos(), lives.map((n) => ({ place: n.place, verb: n.verb, canDo: n.canDo })));
      // the dark places do not fire, and firing them moves nothing
      for (const p of PLACES) {
        if (b.notice(p).canDo) continue;
        const before = snapshot(b);
        assert.equal(b.postNotice(p), true);
        assert.equal(b.commitPosted(), false, "seed " + seed + ": dark " + p + " fired");
        const after = snapshot(b);
        delete before.posted;
        delete after.posted;
        assert.deepEqual(after, before, "seed " + seed + ": posting dark " + p + " moved state");
      }
      const choice = lives[Math.floor(pick() * lives.length)];
      const marksBefore = b.marks;
      assert.equal(b.postNotice(choice.place), true);
      assert.equal(b.commitPosted(), true, "seed " + seed + ": lit " + choice.place + " " + choice.canDo + " refused — a dead button");
      if (choice.verb === "press") assert.equal(b.marks, marksBefore, "the press-on is free");
      if (choice.verb === "collect") {
        banked += 1;
        assert.equal(b.stopped, false, "seed " + seed + ": BANKING ENDED THE SITTING — the one new system inverted");
      }
      if (forkResolvedAt < 0 && (b.collected || b.pressLost || (b.larderSpent && !b.armed && b.consistAt === "halt"))) {
        forkResolvedAt = steps;
      }
      // no ending ever fires with a run in the air
      if (b.stopped) assert.equal(b.consistAt, "halt", "seed " + seed + ": the sitting stopped with a run out");
    }
    if (b.pressLost) pressedLost += 1;
    if (b.record.pressOns > 0 && !b.pressLost) pressedPaid += 1;
    if (forkResolvedAt > 0 && steps > forkResolvedAt) playedPastFork += 1;
    if (b.stopped && b.endedCold) ended.short += 1;
    else if (b.stopped && b.endedSpent) ended.spent += 1;
    else if (b.stopped) throw new Error("seed " + seed + ": stopped with no ending marker");
    else ended.capped += 1;
    if (b.stopped) assert.deepEqual(canDos(b), [], "seed " + seed + ": stopped with something lit");
  }
  assert.equal(maxLive, 2, "the fork was reached under honest dice");
  assert.ok(banked > 0, "no sitting banked in 400");
  assert.ok(pressedPaid > 0, "no press-on came home paid in 400");
  assert.ok(pressedLost > 0, "no press-on came home short in 400");
  assert.ok(ended.short > 0, "no sitting reached the second staked short run in 400");
  assert.ok(ended.spent > 0, "the floor never fired in 400 — the dead-screen clause is unreachable");
  assert.ok(playedPastFork > 100, "the sitting rarely outlived the fork: " + playedPastFork + " of 400");
  assert.ok(ended.capped < 20, "too many sittings ran past the 60-step cap: " + ended.capped);
});

// ---------------- THE ONE NEW SYSTEM: the branches do not end the sitting

test("KILL, FIRST TEST TO WRITE: banking ends the sitting — commitCollect sets stopped, or leaves no live can-do afterwards", () => {
  const h = walk("S-");
  assert.equal(h.b.notice("mosswake").canDo, COLLECT_FACE);
  walk("C", h);
  assert.equal(h.b.stopped, false, "BANKING ENDED THE SITTING — the one new system inverted");
  assert.equal(h.b.endedCold, false);
  assert.equal(h.b.endedSpent, false);
  assert.ok(canDos(h.b).length >= 1, "banking left nothing lit");
  assert.deepEqual(tags(h.b), ["mosswake:" + SEND_FACE], "and you keep playing");
  // C12's ending, inherited whole, minus the stop
  assert.equal(h.b.collected, true);
  assert.equal(h.b.remembered, true, "the lamp and the glasshouse brighten");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MUSEUM_MARK);
  assert.equal(h.b.armed, false, "the arm clears so play can continue");
  assert.equal(h.b.notice("mosswake").writing, BANKED_LINE);
  assert.equal(h.b.canCollect(), false, "and Collect. does not come back");
  assert.equal(h.b.commitCollect(), false, "the +1 mark is not credited twice");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MUSEUM_MARK);
  assert.match(SIT_SIM, /s\.marks \+= MUSEUM_MARKS/);
  assert.doesNotMatch(SIM_CODE, /s\.marks\s*=\s*MUSEUM_MARKS/);
  assert.doesNotMatch(fnBody("commitCollect"), /stopped\s*=/, "commitCollect must never write stopped");
});

test("KILL: a short press-on ends the sitting — commitHome sets stopped or endedCold on the press branch", () => {
  const h = walk("S+S-");   // an arm with marks to spare, so the floor is not what is being measured
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS - MOSS_STAKE);
  walk("P-", h);
  assert.equal(h.b.stopped, false, "A SHORT PRESS-ON ENDED THE SITTING — the one new system inverted");
  assert.equal(h.b.endedCold, false, "endedCold is bound to an ENDING and must not be set here");
  assert.equal(h.b.endedSpent, false);
  assert.equal(h.b.pressLost, true, "the marker for a lost press-on, and it is not endedCold");
  assert.equal(h.b.armed, false, "the arm clears so play can continue");
  assert.ok(canDos(h.b).length >= 1, "a lost press-on left nothing lit");
  assert.deepEqual(tags(h.b), ["mosswake:" + SEND_FACE], "and you keep playing");
  // and the ending is gone, and visibly gone
  assert.equal(h.b.collected, false, "no +1");
  assert.equal(h.b.remembered, false, "no remembering — the lamp and the glasshouse do not brighten");
  assert.equal(h.b.canCollect(), false, "the ending is out of reach");
  assert.equal(h.b.commitCollect(), false);
  assert.equal(h.b.notice("mosswake").writing, MOSS_LOST_WRITING);
  assert.equal(h.b.notice("mosswake").blocked, MOSS_LOST_BLOCKED);
  const body = fnBody("commitHome");
  assert.match(body, /if \(run\.press\) \{[\s\S]*?s\.pressLost = true;/, "the press branch sets its own marker");
  const press = body.slice(body.indexOf("if (run.press) {"));
  assert.doesNotMatch(press.slice(0, press.indexOf("} else")), /s\.stopped = true|s\.endedCold = true/,
    "the press branch must not stop the sitting and must not set endedCold");
});

test("KILL: endedCold is set in a state where stopped is false — it is bound to an ending in three notices and in endSentence", () => {
  const lines = ["", "S", "S+", "S-", "S-C", "S-CS", "S-P", "S-P+", "S+S-P-", "S+S-P-S", "S+S-C", "S-P+S"];
  for (const line of lines) {
    const b = walk(line).b;
    assert.equal(b.stopped, false, JSON.stringify(line) + " stopped");
    assert.equal(b.endedCold, false, JSON.stringify(line) + ": endedCold set on a running board");
    assert.equal(b.endedSpent, false, JSON.stringify(line) + ": endedSpent set on a running board");
  }
  for (const f of frames()) {
    if (f.h.b.endedCold || f.h.b.endedSpent) {
      assert.equal(f.h.b.stopped, true, f.name + ": an ending marker without a stop");
    }
  }
  assert.equal((SIT_SIM.match(/s\.endedCold\s*=\s*true/g) || []).length, 1, "endedCold is written true in exactly one place");
  assert.equal((SIT_SIM.match(/s\.endedSpent\s*=\s*true/g) || []).length, 1, "endedSpent is written true in exactly one place");
});

test("the fork resolves and the sitting outlives it — all three branches, driven, and the walk goes on", () => {
  const banked = walk("S-C").b;
  assert.equal(banked.stopped, false);
  assert.deepEqual(tags(banked), ["mosswake:" + SEND_FACE]);
  const paid = walk("S-P+").b;
  assert.equal(paid.stopped, false);
  assert.deepEqual(tags(paid), ["mosswake:" + SEND_FACE]);
  const lost = walk("S+S-P-").b;
  assert.equal(lost.stopped, false);
  assert.deepEqual(tags(lost), ["mosswake:" + SEND_FACE]);
  // and each of them keeps running: two more full runs on every branch
  for (const seedLine of ["S-C", "S-P+", "S+S-P-"]) {
    const h = walk(seedLine);
    walk("S+S+", h);
    assert.equal(h.b.stopped, false, seedLine + ": the sitting did not survive two more runs");
    assert.deepEqual(tags(h.b), ["mosswake:" + SEND_FACE], seedLine);
  }
});

// ------------------------------------------------- the fork opens ONCE

test("KILL: the fork lights twice in one sitting — including at a later arm for a player who pressed on and lost and never banked", () => {
  // the beat's exact worry: canCollect() on the parent tests only
  // stopped/armed/collected/consistAt, so a pressed-and-lost player would see
  // Collect. light again. Driven: after a lost press-on the board plays on for
  // many more runs and the fork never returns.
  const h = walk("S+S-P-");
  assert.equal(h.b.pressLost, true);
  assert.equal(h.b.collected, false, "he never banked");
  for (let i = 0; i < 6; i++) {
    walk("S+", h);
    assert.equal(h.b.canCollect(), false, "Collect. came back after a lost press-on, run " + i);
    assert.equal(h.b.canPress(), false, "the fork came back after a lost press-on, run " + i);
    assert.deepEqual(tags(h.b), ["mosswake:" + SEND_FACE], "run " + i);
  }
  // and the next STAKED short run is the stop, not a second fork
  walk("S-", h);
  assert.equal(h.b.armed, false, "the board armed a second time");
  assert.equal(h.b.stopped, true, "the second staked short run is the stop");
  assert.deepEqual(tags(h.b), []);
  assert.match(fnBody("canCollect"), /s\.pressLost/, "canCollect must be gated, not only canPress");
  assert.match(fnBody("canPress"), /s\.pressLost/);
});

test("KILL: the fork lights twice — after banking, and after a PAID press-on, and after any run of paid sends", () => {
  for (const seedLine of ["S-C", "S-P+"]) {
    const h = walk(seedLine);
    for (let i = 0; i < 5; i++) {
      walk("S+", h);
      assert.equal(h.b.canCollect(), false, seedLine + " run " + i);
      assert.equal(h.b.canPress(), false, seedLine + " run " + i);
    }
    walk("S-", h);
    assert.equal(h.b.stopped, true, seedLine + ": the second staked short run must stop, not re-fork");
    assert.equal(h.b.armed, false, seedLine + ": the board armed a second time");
  }
  assert.equal((SIT_SIM.match(/s\.armed\s*=\s*true/g) || []).length, 1, "armed is written true in exactly one place");
  assert.equal((SIT_SIM.match(/s\.larderSpent\s*=\s*true/g) || []).length, 1, "the latch is written in exactly one place");
});

test("kill: the fork lights before the board arms — at the open, or after a run that came home paid", () => {
  for (const line of ["", "S+", "S+S+", "S+S", "S-C", "S-CS", "S-P+", "S-P+S", "S+S-P-", "S+S-P-S+"]) {
    const b = walk(line).b;
    assert.equal(b.canPress(), false, JSON.stringify(line));
    assert.equal(b.canCollect(), false, JSON.stringify(line));
    assert.notEqual(b.notice("consist").canDo, PRESS_FACE, JSON.stringify(line) + " lit the fork");
    assert.equal(b.commitPress(), false, JSON.stringify(line) + ": commitPress fired unarmed");
    assert.equal(b.commitCollect(), false, JSON.stringify(line) + ": commitCollect fired unarmed");
  }
});

test("kill: the fork never lights — the FIRST staked short run always lights it, after any run of paid sends", () => {
  for (let k = 0; k <= 5; k++) {
    const line = "S+".repeat(k) + "S-";
    const b = walk(line).b;
    assert.equal(b.armed, true, line);
    assert.equal(b.larderSpent, true, line + ": the latch is set when the larder covers");
    assert.equal(b.stopped, false, line + ": the FIRST staked short run does not end the sitting");
    assert.equal(b.canPress(), true, line);
    assert.equal(b.canCollect(), true, line);
    assert.deepEqual(tags(b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE], line);
    assert.equal(b.canSend(), false, line + ": Mosswake's own SEND stays dark at the fork");
  }
});

test("the fork is exactly two, exactly at the arm — Collect. at Mosswake and ROLL HER OUT on the consist", () => {
  let forkFrames = 0;
  for (const f of frames()) {
    const b = f.h.b;
    const n = canDos(b).length;
    if (atFork(b)) {
      forkFrames += 1;
      assert.equal(n, 2, f.name + " is at the fork but lights " + n);
      assert.deepEqual(tags(b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE], f.name);
      assert.equal(b.canSend(), false, f.name);
    } else {
      assert.ok(n <= 1, f.name + " is not at the fork and lights " + n + ": " + JSON.stringify(tags(b)));
      assert.equal(b.canPress(), false, f.name);
    }
  }
  assert.ok(forkFrames >= 2, "the frame list reaches the fork more than once: " + forkFrames);
});

// ------------------------------- THE STOP: the second STAKED short run

test("KILL: the stop is the SECOND STAKED short run — the larder covers exactly one staked shortfall per sitting", () => {
  // first staked short run: covered, arms, the fork opens
  const h = walk("S-");
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.larderSpent, true);
  // resolve the fork so play can continue, then a SECOND staked short run
  walk("C", h);
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.marks, MOSS_STAKE, "banking leaves exactly the stake");
  walk("S", h);
  assert.equal(h.b.marks, 0, "and the send leaves nothing — the frame an eager floor would kill");
  assert.deepEqual(tags(h.b), ["consist:" + HOME_FACE], "with the run still out, Home she comes is live");
  assert.equal(h.b.stopped, false, "THE FLOOR FIRED MID-FLIGHT — it must be evaluated only with nothing in the air");
  walk("-", h);
  assert.equal(h.b.stopped, true, "the second staked short run must end the sitting");
  assert.equal(h.b.endedCold, true, "and it ends with its own marker");
  assert.equal(h.b.endedSpent, false, "not the floor — the two endings do not share a cause");
  assert.deepEqual(tags(h.b), []);
  assert.equal(h.b.notice("consist").writing, COLD_END);
});

test("KILL: a press-on spends the larder — it is unstaked, so there is nothing for the larder to cover", () => {
  // measured on the parent and re-measured here: commitPress writes
  // provisions 0 / toll 0, and commitHome's loss line is
  // marksLost += run.provisions + run.toll.
  assert.match(fnBody("commitPress"), /provisions: 0,\s*toll: 0,\s*press: true,/, "the free run stakes nothing, and says so");
  assert.match(fnBody("commitHome"), /s\.marksLost \+= run\.provisions \+ run\.toll;/, "one marksLost line — a free run adds 0");
  const h = walk("S-");
  assert.equal(h.b.record.marksLost, MOSS_STAKE);
  walk("P-", h);
  assert.equal(h.b.record.marksLost, MOSS_STAKE, "a lost press-on must not add to marksLost — nothing was put up");
  assert.equal(h.b.larderSpent, true, "the latch was set by the STAKED run, not by the press-on");
  assert.equal(h.b.stopped, true, "at the opening arm the FLOOR closes it; the larder is not what did that");
  assert.equal(h.b.endedSpent, true);
  assert.equal(h.b.endedCold, false, "a lost press-on is NOT the second staked shortfall");
  // and with marks to spare, a lost press-on stops nothing at all
  const rich = walk("S+S-P-").b;
  assert.equal(rich.stopped, false);
  assert.equal(rich.record.marksLost, MOSS_STAKE, "two STAKED short runs would be 4; one staked plus one press-on is 2");
  assert.equal(rich.record.pressOns, 1);
  // the press-on cannot spend the larder: after it, one more STAKED short run stops
  const after = walk("S+S-P-S-").b;
  assert.equal(after.stopped, true);
  assert.equal(after.endedCold, true);
  assert.equal(after.record.marksLost, MOSS_STAKE * 2, "and THAT is the second staked shortfall");
});

test("KILL: the stop is unreachable for a player who only banks, only presses on, or is broke at the fork", () => {
  const banker = walk("S-CS-").b;
  assert.equal(banker.stopped, true, "bank at the fork, then a second staked short run: it ends");
  assert.equal(banker.endedCold, true);
  assert.equal(banker.collected, true, "and what he took is still his");
  assert.equal(banker.remembered, true);

  const presser = walk("S-P+S-").b;
  assert.equal(presser.stopped, true, "press on and win, then a second staked short run: it ends");
  assert.equal(presser.endedCold, true);

  const broke = walk("S-P-").b;
  assert.equal(broke.stopped, true, "press on at the OPENING arm and lose: the floor ends it rather than stranding him");
  assert.equal(broke.endedSpent, true);
  assert.equal(broke.marks, OPENING_MARKS - MOSS_STAKE);

  // inherited and honest: a player who never comes home short never stops
  const lucky = walk("S+S+S+S+S+S+").b;
  assert.equal(lucky.stopped, false);
  assert.equal(lucky.larderSpent, false);
  assert.equal(lucky.armed, false);
});

// ---------------------------------------------------------- THE FLOOR

test("KILL: the floor is evaluated EAGERLY rather than only when nothing is in the air — it fires mid-flight on the bank branch", () => {
  // Driven, not asserted: banking leaves 2, stakeOf() is 2, so the very next
  // SEND leaves 0 with the consist AWAY. canSend() is false in that frame and
  // the only live can-do is Home she comes. EVERY bank-branch sitting passes
  // through it.
  const h = walk("S-CS");
  assert.equal(h.b.marks, 0);
  assert.equal(h.b.consistAt, "mosswake", "she is out");
  assert.equal(h.b.canSend(), false, "no affordable send exists in this frame");
  assert.equal(h.b.stopped, false, "AN EAGER FLOOR STOPS THE SITTING WITH A RUN STILL OUT");
  assert.deepEqual(tags(h.b), ["consist:" + HOME_FACE], "and Home she comes is still tappable");
  walk("+", h);
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.marks, MOSS_PAYS);
  // the same frame on the press branch
  const p = walk("S-P");
  assert.equal(p.b.marks, OPENING_MARKS - MOSS_STAKE);
  assert.ok(p.b.marks < MOSS_STAKE);
  assert.equal(p.b.canSend(), false);
  assert.equal(p.b.stopped, false, "an eager floor stops the sitting while the press-on is in the air");
  assert.deepEqual(tags(p.b), ["consist:" + HOME_FACE]);
  // and the guard is in the source: the floor consults the consist and the run
  assert.match(fnBody("closeIfSpent"), /s\.consistAt !== "halt"/, "the floor must require the consist HOME");
  assert.match(fnBody("closeIfSpent"), /s\.away !== null/, "the floor must require nothing in the air");
});

test("KILL: the sitting stops while a run is in the air — no ending fires with consistAt mosswake", () => {
  for (const f of frames()) {
    if (!f.h.b.stopped) continue;
    assert.equal(f.h.b.consistAt, "halt", f.name + ": stopped with the consist away");
  }
  for (const line of ["S", "S+S", "S-P", "S-CS", "S-P+S", "S+S-P-S"]) {
    const b = walk(line).b;
    assert.equal(b.consistAt, "mosswake", line);
    assert.equal(b.stopped, false, line + ": the sitting stopped with a run in the air");
    assert.deepEqual(tags(b), ["consist:" + HOME_FACE], line + ": Home she comes must be the one live can-do");
  }
});

test("the floor closes the dead screen the beat measured, and only that state", () => {
  const h = walk("S-P-");
  assert.equal(h.b.stopped, true);
  assert.equal(h.b.endedSpent, true);
  assert.equal(h.b.consistAt, "halt");
  assert.equal(h.b.pressLost, true, "the ending is gone and the marker says which way");
  assert.equal(h.b.collected, false);
  assert.equal(h.b.remembered, false);
  // the floor does not fire while an affordable send exists
  for (const line of ["S-C", "S-P+", "S+S-P-", "S+S-C", "S-CS+"]) {
    const b = walk(line).b;
    assert.equal(b.stopped, false, line + ": the floor fired with an affordable send available");
    assert.ok(b.marks >= MOSS_STAKE, line);
  }
  // banking never reaches the floor: the +1 always leaves at least the stake
  const banked = walk("S-C").b;
  assert.equal(banked.marks, MOSS_STAKE);
  assert.equal(banked.stopped, false);
  assert.match(fnBody("closeIfSpent"), /s\.marks >= stakeOf\(\)/, "the floor is affordability, not canSend()");
  assert.doesNotMatch(fnBody("closeIfSpent"), /canSend\(\)/, "canSend() is false at the fork too — the floor must not read it");
});

// ------------------------------------------- two endings, two sentences

test("KILL: two endings render the same words — and endSentence is relied on for any word a player sees", () => {
  // BOTH endings are reached from the SAME history — a lost press-on — so the
  // comparison cannot pass for the wrong reason. A first cut compared "S-CS-"
  // against "S-P-", which differ in what the player BANKED as well as in how
  // the sitting ended, and would have gone green over two endings that share
  // every word.
  const short = walk("S+S-P-S-").b;  // ENDING A — the second staked short run
  const spent = walk("S-P-").b;      // ENDING B — the floor
  assert.equal(short.pressLost, true);
  assert.equal(spent.pressLost, true, "same history: pressed on at the arm and lost");
  assert.equal(short.collected, false);
  assert.equal(spent.collected, false);
  assert.equal(short.stopped, true);
  assert.equal(spent.stopped, true);
  assert.equal(short.endedCold, true);
  assert.equal(short.endedSpent, false);
  assert.equal(spent.endedSpent, true);
  assert.equal(spent.endedCold, false);
  // No two endings render the same notice, on any place the page can render.
  // Rustfall is excluded and asserted separately: it is Beat 8 dressing with
  // one notice at every frame, on purpose.
  for (const p of ["halt", "mosswake", "consist"]) {
    const a = short.notice(p);
    const b = spent.notice(p);
    assert.notDeepEqual(a, b, p + ": the two endings render the same notice");
    assert.notEqual(a.blocked, b.blocked, p + ": the two endings share their REASON — a player cannot tell "
      + "whether the wallet emptied or a rule fired");
    assert.equal(a.canDo, null, p);
    assert.equal(b.canDo, null, p);
  }
  // and on the CONSIST — the tile both endings are posted on, because both
  // fire inside commitHome and the consist is the tile the player tapped to
  // get there — they share neither field.
  assert.notEqual(short.notice("consist").writing, spent.notice("consist").writing);
  assert.notEqual(short.notice("consist").blocked, spent.notice("consist").blocked);
  // the same, driven through the posted notice rather than asserted
  const ha = walk("S+S-P-S");
  ha.ctl.next = 1;
  ha.b.postNotice("consist");
  assert.equal(ha.b.commitPosted(), true);
  assert.equal(ha.b.postedNotice().writing, COLD_END, "ENDING A lands on the consist the player tapped");
  const hb = walk("S-P");
  hb.ctl.next = 1;
  hb.b.postNotice("consist");
  assert.equal(hb.b.commitPosted(), true);
  assert.equal(hb.b.postedNotice().writing, SPENT_END, "ENDING B lands on the consist the player tapped");
  assert.notEqual(ha.b.postedNotice().writing, hb.b.postedNotice().writing);
  // the exhaustion ending says what spent the wallet — a consequence, not the
  // board giving up. Kill line, not a polish note.
  assert.equal(spent.notice("consist").writing, SPENT_END);
  assert.equal(spent.notice("consist").blocked, SPENT_WHY);
  assert.equal(spent.notice("mosswake").blocked, SPENT_WHY_MOSS);
  assert.equal(spent.notice("halt").blocked, SPENT_WHY_HALT);
  assert.match(spent.notice("halt").writing, /^The Halt holds/, "R6: the home is never the stake");
  // the second staked shortfall says what the larder could not do
  assert.equal(short.notice("consist").writing, COLD_END);
  assert.equal(short.notice("mosswake").blocked, COLD_WHY_MOSS);
  assert.equal(short.notice("halt").blocked, COLD_WHY_HALT);
  // endSentence is never rendered (measured), and it does not lie either
  assert.equal((SIT_HTML.match(/endSentence/g) || []).length, 0);
  assert.equal(short.endSentence, COLD_END);
  assert.equal(spent.endSentence, SPENT_END);
  assert.notEqual(short.endSentence, spent.endSentence);
  for (const line of ["", "S", "S+", "S-", "S-C", "S-CS", "S-P", "S-P+", "S+S-P-"]) {
    assert.equal(walk(line).b.endSentence, null, JSON.stringify(line) + ": endSentence on a running board");
  }
});

test("kill: nothing else writes stopped — exactly two endings, each stated in one place", () => {
  const writes = SIT_SIM.match(/s\.stopped\s*=\s*true/g) || [];
  assert.equal(writes.length, 2, "exactly two stopped writes: " + writes.length);
  assert.match(fnBody("commitHome"), /s\.larderSpent\)\s*\{[\s\S]*?s\.stopped = true;[\s\S]*?s\.endedCold = true;/,
    "the second staked shortfall, under the latch");
  assert.match(fnBody("closeIfSpent"), /s\.stopped = true;[\s\S]*?s\.endedSpent = true;/, "the floor");
  assert.doesNotMatch(fnBody("commitSend"), /stopped/);
  assert.doesNotMatch(fnBody("commitPress"), /stopped\s*=/);
  assert.doesNotMatch(fnBody("commitCollect"), /stopped\s*=/, "banking does not stop the sitting");
  // three arm clears, each on purpose: bank, paid press-on, lost press-on
  assert.equal((SIT_SIM.match(/s\.armed\s*=\s*false/g) || []).length, 3,
    "three clears: banking, a paid press-on and a lost one — all so play can continue");
});

// ------------------- the forgone branch stays where it was offered

test("KILL: the forgone branch's posted notice is indistinguishable from a place that never offered anything", () => {
  const fresh = makeBoard().b;                 // the fork never opened
  // BANK: the forgone branch is the press-on, and it stays on the CONSIST
  const banked = walk("S-C").b;
  assert.notDeepEqual(banked.notice("consist"), fresh.notice("consist"),
    "after banking, the consist reads exactly like a consist that never offered a press-on");
  assert.equal(banked.notice("consist").blocked, FORGONE_PRESS);
  assert.equal(banked.notice("consist").canDo, null, "not tappable — the fork is spent");
  // PRESS-LOST: the forgone branch is Collect., and it stays at MOSSWAKE
  const lost = walk("S+S-P-").b;
  assert.notDeepEqual(lost.notice("mosswake"), fresh.notice("mosswake"),
    "after a lost press-on, Mosswake reads exactly like a Mosswake that never offered Collect.");
  assert.equal(lost.notice("mosswake").writing, MOSS_LOST_WRITING);
  assert.equal(lost.notice("mosswake").blocked, MOSS_LOST_BLOCKED);
  assert.equal(lost.notice("mosswake").canDo, SEND_FACE, "and it is PAIRED with the live SEND");
  // A PAID press-on forwent NOTHING — the beat says so in as many words — so
  // there is no forgone marker to look for, and the tile is the parent's.
  const won = walk("S-P+").b;
  assert.equal(won.notice("mosswake").writing, NEIGHBOR_LINE);
  assert.equal(won.notice("mosswake").blocked, null);
  // and neither forgone marker is on the Halt, the tile with the most room and
  // the least traffic. David: putting it there would build the null in.
  for (const b of [banked, lost]) {
    assert.deepEqual(b.notice("halt"), fresh.notice("halt"), "a forgone marker was put on the Halt");
    assert.deepEqual(b.notice("rustfall"), fresh.notice("rustfall"), "a forgone marker was put on Rustfall");
  }
});

test("the forgone branch survives the rest of the sitting — it is not wiped by the next run", () => {
  const h = walk("S-C");
  for (let i = 0; i < 4; i++) {
    walk("S+", h);
    assert.equal(h.b.notice("consist").blocked, FORGONE_PRESS, "the forgone press-on was wiped, run " + i);
    assert.equal(h.b.notice("mosswake").writing, BANKED_LINE, "what was taken stopped being visible, run " + i);
    assert.equal(h.b.remembered, true, "the lamp and the glasshouse stay bright");
  }
  const g = walk("S+S-P-");
  for (let i = 0; i < 4; i++) {
    walk("S+", g);
    assert.equal(g.b.notice("mosswake").writing, MOSS_LOST_WRITING, "the lost ending stopped being visible, run " + i);
    assert.equal(g.b.notice("mosswake").blocked, MOSS_LOST_BLOCKED, "run " + i);
    assert.equal(g.b.remembered, false, "no remembering after a lost press-on");
  }
});

test("kill: the walk FORCES both tiles — Mosswake to send and the consist to bring her home, every run", () => {
  // this is the whole distribution mechanism, and the beat says not to assume
  // it is more than it is: the player has to tap the place to read the words.
  const h = walk("S-C");
  assert.equal(h.b.postNotice("mosswake"), true);
  assert.equal(h.b.postedNotice().verb, "send", "to send you tap Mosswake");
  assert.equal(h.b.postedNotice().writing, BANKED_LINE, "and the taken branch is what it says");
  assert.equal(h.b.commitPosted(), true);
  assert.equal(h.b.postNotice("consist"), true);
  assert.equal(h.b.postedNotice().verb, "home", "to bring her home you tap the consist");
  assert.equal(h.b.postedNotice().writing, "The run is at Mosswake.");
  h.ctl.next = 0;
  assert.equal(h.b.commitPosted(), true);
  assert.equal(h.b.postedNotice().blocked, FORGONE_PRESS, "and the forgone press-on is what it says");
  assert.match(SIT_HTML, /board\.postNotice\("mosswake"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("consist"\)/);
});

test("kill: after a short press-on, Collect. is reachable, or the +1 is credited, or the lamp or glasshouse brightens", () => {
  const b = walk("S+S-P-").b;
  assert.equal(b.canCollect(), false);
  assert.equal(b.commitCollect(), false);
  assert.equal(b.collected, false);
  assert.equal(b.remembered, false, "remembered drives #halt.remembered .globe and #mosswake.remembered .glass");
  assert.equal(b.notice("mosswake").canDo, SEND_FACE, "the ending is gone; the send is not");
  assert.notEqual(b.notice("mosswake").writing, BANKED_LINE, "the lost branch must not borrow the banked line");
  assert.equal(b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS - MOSS_STAKE, "no +1");
});

test("protect the load-bearing line — People remember who showed up — after Collect, never after a lost press-on", () => {
  const h = makeBoard();
  assert.notEqual(h.b.notice("mosswake").writing, BANKED_LINE);
  walk("S-", h);
  assert.notEqual(h.b.notice("mosswake").writing, BANKED_LINE);
  walk("C", h);
  assert.equal(h.b.notice("mosswake").writing, BANKED_LINE);
  assert.doesNotMatch(h.b.notice("mosswake").writing, /that's Favor|That's Favor/i);
  const lost = walk("S+S-P-").b;
  for (const p of PLACES) assert.notEqual(lost.notice(p).writing, BANKED_LINE, p + " after a lost press-on");
  const flight = walk("S-P").b;
  assert.notEqual(flight.notice("mosswake").writing, BANKED_LINE);
  const won = walk("S-P+").b;
  assert.notEqual(won.notice("mosswake").writing, BANKED_LINE, "the ending was not spent — nothing to remember");
});

// ---------------------------------------------- the repaired cost line

test("KILL: the press-on's cost is not on the consist tile BEFORE the tap — and the sentence is the REPAIRED one", () => {
  const h = walk("S-");
  const before = h.b.notice("consist");
  assert.equal(before.canDo, PRESS_FACE);
  assert.equal(before.writing, ARMED_LINE);
  assert.equal(before.blocked, PRESS_COST, "the cost, before commitPress");
  assert.equal(h.b.record.pressOns, 0, "nothing has been tapped yet");
  // the REPAIR: the parent's sentence promised the sitting ends cold. Here a
  // lost press-on ends nothing, so leaving it in place would not preserve it —
  // it would quietly falsify it. David, 2026-09-04.
  // SIM_CODE, not SIT_SIM: the old promise must be gone from the code a player
  // can reach, and the header comment must still RECORD the repair. An earlier
  // cut of this assertion read the raw file and went red over the provenance
  // note itself — which would have bought a file that changed the sentence and
  // said nothing about why.
  assert.doesNotMatch(SIM_CODE, /It will not cover it twice\./,
    "the parent's promise is gone from the shipped copy: its referent moved");
  assert.match(SIT_SIM, /It will not cover it twice\./,
    "and the header records what was repaired — a changed sentence with no note is how this project loses decisions");
  assert.match(SIT_SIM, /^\/\/.*REPAIRED, not improved/m, "named as a repair, not an improvement");
  assert.notEqual(PRESS_COST, OLD_PRESS_COST);
  assert.match(PRESS_COST, /^The larder covered it once\./, "the first clause is kept — the larder did cover it");
  assert.match(SIM_CODE, /nothing left to collect/, "and the new clause states what the tap actually spends");
  // and it is literally true from the tap onward, on BOTH outcomes
  const paid = walk("S-P+").b;
  assert.equal(paid.canCollect(), false, "winning takes the ending away");
  const lost = walk("S+S-P-").b;
  assert.equal(lost.canCollect(), false, "losing takes it too");
  const flight = walk("S-P").b;
  assert.equal(flight.canCollect(), false, "and it is gone the moment she is out");
  // the page renders blocked, so the words reach the screen
  assert.match(SIT_HTML, /waitEl\.textContent = n\.blocked \|\| ""/);
  assert.match(SIT_HTML, /nowEl\.textContent = n\.writing/);
  assert.match(SIT_HTML, /doEl\.textContent = n\.canDo/);
});

test("kill: a press-on costs marks — it is free; stakeOf() is waived, not paid", () => {
  const h = walk("S-");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE);
  walk("P", h);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE, "the press-on debited marks");
  assert.equal(h.b.record.runsOut, 2);
  assert.equal(h.b.record.pressOns, 1);
  assert.equal(h.b.record.marksLost, MOSS_STAKE, "nothing new is staked");
  const poor = walk("S-");
  assert.ok(poor.b.marks < MOSS_STAKE, "Mosswake is unaffordable at the opening arm");
  assert.equal(poor.b.canSend(), false);
  assert.equal(poor.b.canPress(), true, "the press-on is not gated on marks");
  assert.doesNotMatch(fnBody("commitPress"), /s\.marks/, "commitPress never touches marks");
  assert.doesNotMatch(fnBody("canPress"), /marks|stakeOf/, "canPress never consults the stake");
  assert.doesNotMatch(fnBody("canPress"), /canSend/, "canPress does not consult canSend");
  assert.match(fnBody("canSend"), /if \(s\.armed\) return false;/, "canSend's armed guard is untouched");
});

test("kill: either branch quotes a number it does not roll — the press-on's chance is Mosswake's own 64", () => {
  const h = walk("S-");
  const arm = h.b.notice("consist");
  assert.equal(arm.chance, MOSS_CHANCE);
  assert.equal(arm.percent, MOSS_PERCENT);
  assert.match(arm.canDo, new RegExp(String(arm.percent)));
  assert.equal(arm.chance, makeBoard().b.notice("mosswake").chance, "the press-on's chance is the SEND's chance");
  walk("P", h);
  assert.equal(h.b.notice("consist").canDo, HOME_FACE);
  h.ctl.next = MOSS_CHANCE;
  assert.equal(h.b.commitHome(), true);
  assert.equal(h.b.pressLost, true, "draw === chance is a miss");
  const h2 = walk("S-P");
  h2.ctl.next = MOSS_CHANCE - 0.0001;
  assert.equal(h2.b.commitHome(), true);
  assert.equal(h2.b.armed, false, "draw just under the chance pays and clears the arm");
  assert.equal(h2.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS);
  assert.equal(h2.b.pressLost, false);
});

test("kill: a paid press-on does not clear the arm — it does: +14, the ending out of reach, back in the paying loop", () => {
  const h = walk("S-P+");
  assert.equal(h.b.armed, false);
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.pressLost, false);
  assert.equal(h.b.collected, false);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS);
  assert.equal(h.b.haulOnConsist, true);
  assert.deepEqual(h.b.record, { runsOut: 2, cargoesBanked: 1, runsTurnedBack: 1, marksLost: MOSS_STAKE, pressOns: 1 });
  assert.equal(h.b.canCollect(), false, "winning takes the ending away");
  assert.equal(h.b.canSend(), true);
  assert.deepEqual(tags(h.b), ["mosswake:" + SEND_FACE]);
  assert.equal(h.b.notice("consist").writing, "The consist is home. The haul is on it.");
  assert.equal(h.b.notice("mosswake").writing, NEIGHBOR_LINE, "nothing was lost, so nothing is said about it");
  assert.equal(h.b.endSentence, null);
});

// -------------------------- inherited: the Halt, Rustfall, R6, wall time

test("kill: the Halt carries a can-do, or a Halt verb appears — it is HOME on this board, at every frame", () => {
  for (const f of frames()) {
    const n = f.h.b.notice("halt");
    assert.equal(n.canDo, null, f.name);
    assert.equal(n.verb, null, f.name);
    assert.equal(n.chance, null, f.name);
    assert.equal(n.percent, null, f.name);
    assert.match(n.writing, /^The Halt holds\./, f.name);
    const b = walk(f.line).b;
    if (f.post) postStop({ b: b });
    assert.equal(b.postNotice("halt"), true, f.name + ": dead jobs stay buttons and still post notices");
    assert.equal(b.commitPosted(), false, f.name + ": the Halt fired");
  }
  assert.match(fnBody("canSend"), /s\.consistAt !== "halt"/, "\"halt\" is where the consist lives");
  assert.match(fnBody("canPress"), /s\.consistAt !== "halt"/);
  assert.match(fnBody("canCollect"), /s\.consistAt !== "halt"/);
  assert.doesNotMatch(SIM_CODE, /verb: "halt"|canDo: "[^"]*Halt/, "no Halt verb, no Halt can-do");
  assert.match(SIT_HTML, /board\.postNotice\("halt"\)/, "and the handler is on the page");
});

test("Rustfall is dark dressing at every frame, the fork included", () => {
  const n = makeBoard().b.notice("rustfall");
  assert.equal(n.canDo, null);
  assert.equal(n.chance, null);
  assert.equal(n.blocked, "Raiders hold the yard road.");
  assert.equal(n.writing, "Rustfall. Dark.");
  for (const f of frames()) {
    const r = f.h.b.notice("rustfall");
    assert.equal(r.canDo, null, f.name + " rustfall lit");
    assert.equal(r.writing, "Rustfall. Dark.", f.name);
  }
  assert.doesNotMatch(SIM_CODE, /rustfall.*send|send.*rustfall/i);
});

test("kill: a failed run costs the home, the lamp, the larder, or Favor already earned — on any branch, and now for the rest of the sitting", () => {
  for (const line of ["S-", "S-C", "S-P+", "S+S-P-", "S-CS-", "S-P-", "S+S-P-S-"]) {
    const b = walk(line).b;
    assert.equal(b.haltHolds, true, line);
    assert.equal(b.lampLit, true, line);
    assert.equal(b.herbsInLarder, true, line);
    assert.equal(b.foundry, true, line);
    assert.equal(b.foodInTown, true, line);
    assert.equal(b.heatStep, 1, line);
    assert.equal(b.promiseKept, true, line);
    assert.equal(b.putUp, true, line);
    assert.equal(b.neighborAgain, true, line + ": Favor already earned is never the stake");
    assert.deepEqual(b.map, { left: 42, width: 16 }, line);
  }
  // R6 under this card: the player has to keep playing with the distinction true
  const h = walk("S-C");
  walk("S+S+S-", h);
  assert.equal(h.b.remembered, true, "what was banked survives every later run, and the ending");
  assert.equal(h.b.collected, true);
});

test("kill: anything moves with wall time — a branch expires, decays, or times out", () => {
  const h = walk("S-");
  const before = snapshot(h.b);
  assert.equal(h.b.wait(), false);
  walk("...", h);
  assert.deepEqual(snapshot(h.b), before, "waiting at the fork moved something");
  assert.deepEqual(tags(h.b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE], "both branches still lit after waiting");
  // and the FORGONE branch does not expire either — this card's own R2/R3/R4 test
  const g = walk("S-C");
  const gb = snapshot(g.b);
  walk(".....", g);
  assert.deepEqual(snapshot(g.b), gb, "waiting beside a forgone branch moved something");
  assert.equal(g.b.notice("consist").blocked, FORGONE_PRESS, "the forgone branch expired");
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\./);
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./);
  assert.doesNotMatch(SIM_CODE, /expire|decay|timeout|timer/i);
});

test("record: the parent's five fields and no sixth — the latch and the short-run count are never exposed as numbers", () => {
  assert.deepEqual(Object.keys(makeBoard().b.record).sort(),
    ["cargoesBanked", "marksLost", "pressOns", "runsOut", "runsTurnedBack"]);
  assert.deepEqual(walk("S-").b.record, { runsOut: 1, cargoesBanked: 0, runsTurnedBack: 1, marksLost: 2, pressOns: 0 });
  assert.deepEqual(walk("S-C").b.record, { runsOut: 1, cargoesBanked: 0, runsTurnedBack: 1, marksLost: 2, pressOns: 0 });
  assert.deepEqual(walk("S-P+").b.record, { runsOut: 2, cargoesBanked: 1, runsTurnedBack: 1, marksLost: 2, pressOns: 1 });
  assert.deepEqual(walk("S+S-P-").b.record, { runsOut: 3, cargoesBanked: 1, runsTurnedBack: 2, marksLost: 2, pressOns: 1 });
  assert.deepEqual(walk("S-CS-").b.record, { runsOut: 2, cargoesBanked: 0, runsTurnedBack: 2, marksLost: 4, pressOns: 0 });
  // the latch and the lost-press marker are BOOLEANS, never counts
  assert.equal(typeof makeBoard().b.larderSpent, "boolean");
  assert.equal(typeof makeBoard().b.pressLost, "boolean");
  assert.doesNotMatch(SIM_CODE, /larderSpent\s*\+=|pressLost\s*\+=|shortRuns|shortCount|larderCount/);
});

test("KILL: any rendering of the larder latch or a short-run count — as a pip, a dot, a number or a tooltip", () => {
  assert.doesNotMatch(HTML_CODE, /larderSpent|pressLost|endedSpent|larder-count|pip/i);
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i);
  assert.doesNotMatch(SIT_HTML, /title="/, "no tooltip on anything");
  // the whole tappable surface is the parent's: four places and the can-do
  const buttons = SIT_HTML.match(/<button\b[^>]*>/g) || [];
  const ids = buttons.map((b) => { const m = b.match(/id="([^"]+)"/); return m ? m[1] : "?"; });
  assert.deepEqual(ids.sort(), ["consist", "halt", "mosswake", "notice-do", "rustfall"],
    "four places plus the notice can-do: " + JSON.stringify(ids));
  // the HUD is still one marks line
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('id="hud"'), SIT_HTML.indexOf('id="strip"'));
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds one child — the marks line");
  assert.doesNotMatch(hud, /pane|bill|food|glass|foundry|heat|favor|herb|larder/i);
  // and no word a player sees carries a count of anything but the quoted chance
  for (const f of frames()) {
    for (const p of PLACES) {
      const n = f.h.b.notice(p);
      for (const s of [n.writing, n.blocked, n.canDo]) {
        if (!s) continue;
        if (n.percent !== null && s === n.canDo) continue;   // the quoted chance
        assert.doesNotMatch(s, /\d/, f.name + " " + p + ": a number reached the copy — " + JSON.stringify(s));
      }
    }
  }
});

// ---------------------------------- notices / commitPosted / the render

test("tapping a place posts its notice — four places, each with a notice, at every frame", () => {
  for (const f of frames()) {
    const b = f.h.b;
    for (const place of b.places()) {
      assert.equal(b.postNotice(place), true);
      const n = b.postedNotice();
      assert.ok(n, f.name + ": " + place + " posted no notice");
      assert.equal(n.place, place);
      assert.ok(n.writing, f.name + ": " + place + " notice has no writing");
      if (!n.canDo) assert.ok(n.blocked || n.inProcess, f.name + ": dead " + place + " posted no blocked/in-process");
    }
  }
  const b = makeBoard().b;
  assert.equal(b.postNotice("span"), false);
  assert.equal(b.postNotice("gap"), false);
});

test("kill: Mosswake's fallthrough says the consist is not home while it IS home", () => {
  // The parent's fallthrough (sim.js:265) reads "The consist is not home." and
  // is UNREACHABLE there. The beat measured it becoming reachable on this
  // board, in a state where the consist IS home — so the sentence is deleted
  // rather than inherited, and every dark-Mosswake-at-home frame carries the
  // ending's own reason instead.
  assert.doesNotMatch(SIM_CODE, /The consist is not home\./,
    "the parent's fallthrough would be a lie in the states this board reaches");
  for (const f of frames()) {
    for (const p of PLACES) {
      const n = f.h.b.notice(p);
      for (const s of [n.writing, n.blocked]) {
        if (s && /consist is not home/.test(s)) {
          assert.equal(f.h.b.consistAt, "mosswake", f.name + " " + p + ": says the consist is away while it is home");
        }
      }
    }
  }
  // and every dark Mosswake with the consist home is a STOPPED board — which
  // is the dead-screen proof restated as a property of the notice
  for (const f of frames()) {
    const b = f.h.b;
    if (b.consistAt !== "halt") continue;
    if (b.notice("mosswake").canDo) continue;
    assert.ok(b.stopped || b.canCollect(),
      f.name + ": Mosswake is dark with the consist home and the sitting still running");
  }
});

test("commitPosted routes every verb, and a dark tile fires nothing", () => {
  const h = walk("S-");
  h.b.postNotice("consist");
  assert.equal(h.b.postedNotice().verb, "press");
  assert.equal(h.b.commitPosted(), true);
  assert.equal(h.b.record.pressOns, 1);
  h.b.postNotice("mosswake");
  assert.equal(h.b.commitPosted(), false, "Collect. is dark while she is out");
  h.b.postNotice("consist");
  h.ctl.next = 0;
  assert.equal(h.b.commitPosted(), true);
  assert.equal(h.b.armed, false);
  const g = walk("S-");
  g.b.postNotice("mosswake");
  assert.equal(g.b.commitPosted(), true);
  assert.equal(g.b.collected, true);
  assert.equal(g.b.stopped, false, "and the sitting continues");
  assert.equal(g.b.postedNotice().writing, BANKED_LINE);
  assert.equal(g.b.postedNotice().canDo, SEND_FACE, "the posted tile pairs the memory with the live send");
  const verbs = new Set((SIM_CODE.match(/verb: "([a-z]+)"/g) || []).map((m) => m.slice(7, -1)));
  assert.deepEqual([...verbs].sort(), ["collect", "home", "press", "send"], "four verbs, the parent's — no new verb");
});

test("the lit affordance: every place button toggles `lit` from notice().canDo, AFTER the consist's className wipe", () => {
  const paint = SIT_HTML.slice(SIT_HTML.indexOf("function paint() {"), SIT_HTML.indexOf("const n = board.postedNotice();"));
  assert.ok(paint.length > 0, "paint() found");
  const wipeLine = 'consistEl.className = board.consistAt === "mosswake" ? "at-mosswake" : "home";';
  const wipe = paint.indexOf(wipeLine);
  assert.ok(wipe > 0, "the wholesale className assignment is still the wipe it was");
  for (const [el, place] of [["haltEl", "halt"], ["mossEl", "mosswake"], ["consistEl", "consist"], ["rustEl", "rustfall"]]) {
    const line = el + '.classList.toggle("lit", board.notice("' + place + '").canDo !== null);';
    const at = paint.indexOf(line);
    assert.ok(at > 0, "paint() is missing: " + line);
    assert.ok(at > wipe, place + ": the lit toggle must come AFTER the consist className wipe");
  }
  assert.equal((paint.match(/\.classList\.toggle\("lit"/g) || []).length, 4, "four places, four toggles");
});

test("kill: the forgone branch is rendered grey, dimmed to scenery, or as a dead button — for the WHOLE sitting now", () => {
  const css = cssCodeOf();
  const litRules = css.match(/(?:^|[\s,}])\.lit\s*\{[^}]*\}/g) || [];
  assert.equal(litRules.length, 1, "exactly one .lit rule: " + JSON.stringify(litRules));
  assert.doesNotMatch(css, /#(?:halt|mosswake|consist|rustfall)\s*\.lit|#(?:halt|mosswake|consist|rustfall)\.lit/,
    "no per-button variant");
  const lit = rule(".lit");
  assert.match(lit, /filter:|box-shadow:/);
  assert.doesNotMatch(lit, /opacity|gray|grey/i, "lit is never a dimming");
  assert.doesNotMatch(css, /:not\(\.lit\)|\.unlit|\.dead\b|\.dim\s*\{|\.dark\s*\{|\.forgone\b|\.spent\b/,
    "no rule dims, greys or marks the unlit — the forgone branch is a place with a reason, not a strike-through");
  assert.doesNotMatch(css, /opacity:\s*0?\.\d|grayscale|filter:\s*gray/);
  assert.doesNotMatch(HTML_CODE, /\.disabled\s*=|setAttribute\("disabled"|disabled="/, "no dead-button treatment");
  assert.doesNotMatch(cssOf(), /@keyframes|animation:|transition:/, "nothing animates on or off");
  for (const sel of ["#halt", "#mosswake", "#consist", "#rustfall"]) {
    assert.match(rule(sel), /background:\s*transparent/, sel + " root is not a filled brick");
    assert.doesNotMatch(rule(sel), /opacity/, sel);
  }
});

test("the notice board grows with its writing — the fork's five lines must not spill off the timber", () => {
  const n = rule("#notice");
  assert.match(n, /min-height:\s*16%/);
  assert.doesNotMatch(n, /(?<!min-)height:\s*16%/);
  assert.doesNotMatch(n, /overflow:\s*hidden/, "the cost must never be clipped");
});

test("kill: places do not overlap; the span and the gap are scenery, not pads", () => {
  const halt = box("#halt");
  const moss = box("#mosswake");
  const rust = box("#rustfall");
  const atHalt = box("#consist.at-halt");
  const atMoss = box("#consist.at-mosswake");
  assert.equal(overlap(halt, moss), false);
  assert.equal(overlap(halt, rust), false);
  assert.equal(overlap(moss, rust), false);
  assert.equal(overlap(halt, atHalt), false);
  assert.equal(overlap(moss, atMoss), false);
  assert.match(rule("#span"), /pointer-events:\s*none/);
  assert.match(rule("#gap"), /pointer-events:\s*none/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="span"|<button[^>]*id="gap"/);
});

test("the diorama is the places — nodes read as places, not grey squares, and the desk does not survive", () => {
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="globe"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="larder"/);
  assert.match(SIT_HTML, /id="mosswake"[^>]*>[\s\S]*class="glass"/);
  assert.match(SIT_HTML, /id="consist"[^>]*>[\s\S]*class="engine"/);
  assert.match(SIT_HTML, /id="rustfall"[^>]*>[\s\S]*class="shed"/);
  assert.doesNotMatch(cssOf(), /#f5f0e6|#f4efe4|#e8e0d0/, "not the beige PWA");
  assert.doesNotMatch(SIT_HTML, /id="cards"|id="ladder"|THE DESK|id="pads"|class="pad"/);
  assert.match(SIT_HTML, /classList\.toggle\("remembered"/, "what was taken stays on the diorama");
  assert.match(SIT_HTML, /aria-label="the Halt"/);
  assert.match(SIT_HTML, /aria-label="Mosswake"/);
  assert.match(SIT_HTML, /aria-label="Rustfall"/);
  assert.match(SIT_HTML, /aria-label="the consist"/);
});

test("kill: no second new system — no new verb, tile, place, number, weather, Favor, crews, currency, tutorial", () => {
  const b = makeBoard().b;
  for (const k of ["commitUp", "commitTend", "commitMuster", "commitMeet", "commitLight", "commitSite",
    "commitLand", "commitCast", "commitStop", "canStop", "commitCarry", "canPutUp", "commitPutUp", "roster", "favor", "cards"]) {
    assert.equal(typeof b[k], "undefined", k + " exists");
  }
  assert.doesNotMatch(SIM_CODE, /commitStop|canStop|commitEnd|canEnd|commitTrigger|canTrigger/,
    "alternative 3 — arming-and-triggering — is REFUSED: it is a new verb");
  assert.doesNotMatch(SIM_CODE, /weather|storm|ranger|trim|stormbird|sera|cairn|crews|league|frontier/i);
  assert.doesNotMatch(HTML_CODE, /weather|storm|Ranger|TRIM|Sera|Cairn|Crews|favor|Favour/i);
  assert.doesNotMatch(SIM_CODE, /exchange|shadow.?price|foodToMarks|marksToFood|netting|upkeep/i);
  assert.doesNotMatch(HTML_CODE, /help|tutorial|plaque|citizen|interior|zoning|cutscene|overlay|Mara/i);
  assert.doesNotMatch(SIT_HTML, /id="help"|class="help"|>\?</);
  assert.doesNotMatch(BOARD, /loopbeat|units.?sink|broker|market|Unity Taste/i);
  assert.equal(typeof b.stores, "undefined");
});

test("hub lists the sibling and does not rewrite other boards' hub copy", () => {
  const hub = fs.readFileSync(path.join(ROOT, "public/index.html"), "utf8");
  assert.match(hub, /href="\/still-standing\/"/);
  assert.match(hub, /Still Standing \(CFD-212\)/);
  assert.match(hub, /href="\/two-ways-from-here\/"/);
  assert.match(hub, /href="\/dice-at-the-places\/"/);
  assert.match(hub, /href="\/they-remember\/"/);
  assert.match(hub, /href="\/herbs-larder\/"/);
  assert.match(hub, /href="\/mosswake-loop\/"/);
  assert.match(hub, /href="\/dawnspur-halt\/"/);
  assert.match(hub, /Two Ways from Here \(CFD-210\)/);
  assert.match(hub, /The dice come to the places\. You tap Mosswake; the tap is the send; the run can come home empty/);
  assert.match(hub, /The larder\. The run feeds the place\. Put them up/);
  assert.match(hub, /The line\. A promise\. One SEND, one run, home she comes/);
  assert.match(hub, /Come home\. The walk\. One live can-do/);
  assert.match(hub, /People remember who showed up/);
});

"use strict";

// CFD-210 — C13 — Two ways from here.
// Spec: docs/cfd-210-beat.md (SIGNED — David, 2026-09-01; re-cut the same
// day after a measurement refuted its own premise: the Halt is HOME on this
// board, not a destination, and the fork moved to bank-or-press-on at the
// arm). One NEW system: the corridor forks once, after commitment. Sibling
// /two-ways-from-here/. Parent /dice-at-the-places/ (CFD-209, PASSED
// 2026-09-01), whose bytes are pinned below and do not move. Not a recut of
// anything. Every Kill line expressible as a test is a test, red-first.
//
// The corridor is graded by enumerating notice() at every place at every
// frame, and by liveCanDos() — never by liveCanDo(), which returns the FIRST
// match and cannot see the fork at all. Every frame is reached by DRIVING
// from the open with a controlled roll, never by assigning state.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Board = require("../sit/two-ways-from-here/sim.js");
const Parent = require("../sit/dice-at-the-places/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/sim.js"), "utf8");
const PARENT_SIM = fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/sim.js"), "utf8");
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
const ARMED_LINE = "The run came home short and the larder covered it.";
const COST_LINE = "The larder covered it once. It will not cover it twice.";
const COLD_LINE = "She came home short again. The larder could not cover it twice.";
const BANKED_LINE = "People remember who showed up.";

const PIN = {
  rememberIndex: "acbf4304c3cabd22a8d7ff95cd72a5b09aa939416c66805e7f31651f07c78cbd",
  rememberSim: "a3345903c01ea506295c3e1a3c442bf1973b0d551167a2394555579c756d542e",
  larderIndex: "676587bce8b3629ce8f8c64d03f78a722b0479bec53c655413067d2c61f7eb90",
  larderSim: "76c886b928bc2b4758362331b1880ff0703d034781aee3137d5c895a8d4e6811",
  mossIndex: "6c30179c609569c7944e4e812a7a06a2f12ff0cc09c1772088925d9d5e01d1fb",
  mossSim: "f5407bca93deec06ca4944b475e42cd86bd6c75d329db421decebabcbb661679",
  haltIndex: "b5a56a146b548747a5ecfce9b253e56e0bea89f47557328a57205ddfd56ab5ef",
  haltSim: "6eb957e790c90c6702f2b8cc45bb6b9081b6b092816498b32df4e1b2b3dc07b4",
  // The parent. PASSED 2026-09-01, self-pinned in its own test the same day.
  diceIndex: "d97d995173276e286c37156697ca296d31f238774d0e783c00c7a91db125868c",
  diceSim: "f64b4309e407f28b54cd228d502971b47355b457afe3337b77e5f6618c186611",
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

// After a stop, every commit is refused and nothing moves. Places still
// post their notices — a stopped board stays readable.
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

const FRAMES = [
  { name: "open", line: "", live: ["mosswake:" + SEND_FACE] },
  { name: "sent", line: "S", live: ["consist:" + HOME_FACE] },
  { name: "home-paid", line: "S+", live: ["mosswake:" + SEND_FACE] },
  { name: "home-short-ARMED", line: "S-", live: ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE] },
  { name: "paid-then-sent", line: "S+S", live: ["consist:" + HOME_FACE] },
  { name: "armed-then-banked", line: "S-C", live: [] },
  { name: "armed-then-pressed", line: "S-P", live: ["consist:" + HOME_FACE] },
  { name: "pressed-paid", line: "S-P+", live: ["mosswake:" + SEND_FACE] },
  { name: "pressed-short-COLD", line: "S-P-", live: [] },
  { name: "pressed-paid-then-sent", line: "S-P+S", live: ["consist:" + HOME_FACE] },
  { name: "pressed-paid-then-short-again-ARMED", line: "S-P+S-", live: ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE] },
  { name: "second-press-paid", line: "S-P+S-P+", live: ["mosswake:" + SEND_FACE] },
  { name: "second-press-COLD", line: "S-P+S-P-", live: [] },
  { name: "second-arm-banked", line: "S-P+S-C", live: [] },
  { name: "post-stop-banked", line: "S-C", post: true, live: [] },
  { name: "post-stop-cold", line: "S-P-", post: true, live: [] },
];
function frames() {
  return FRAMES.map((f) => {
    const h = walk(f.line);
    if (f.post) postStop(h);
    return { name: f.name, line: f.line, live: f.live, h };
  });
}
function atArm(b) {
  return b.armed && !b.collected && !b.stopped && b.consistAt === "halt";
}

// ---------------------------------------------------------------- guards

test("guard: live pins including PASSED they-remember and the eight Seat pins are unchanged at HEAD", () => {
  // /dice-at-the-places/ PASSED its sit 2026-09-01 and is this board's
  // parent. Its four paths are pinned here exactly as its own test pins
  // them — copied, not retyped. /two-ways-from-here/ is NOT pinned: while a
  // board is being cut, pinning its own bytes is circular. It joins on the
  // day it passes, in its successor's test, and not before.
  const pins = {
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
    "sit/dawnspur-heat/sim.js": "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b",
    "public/dawnspur-heat/sim.js": "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b",
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

test("kill: the PARENT dice-at-the-places pin files unmoved on disk (d97d9951 / f64b4309)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/index.html"))), PIN.diceIndex,
    "sit/dice-at-the-places/index.html moved on disk");
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dice-at-the-places/index.html"))), PIN.diceIndex,
    "public/dice-at-the-places/index.html moved on disk");
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/sim.js"))), PIN.diceSim,
    "sit/dice-at-the-places/sim.js moved on disk");
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dice-at-the-places/sim.js"))), PIN.diceSim,
    "public/dice-at-the-places/sim.js moved on disk");
  assert.equal(PIN.diceIndex.slice(0, 8), "d97d9951");
  assert.equal(PIN.diceSim.slice(0, 8), "f64b4309");
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

test("deploy copy public/two-ways-from-here is byte-identical to sit/two-ways-from-here", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/two-ways-from-here")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/two-ways-from-here")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/two-ways-from-here/" + f)), sha256(raw("sit/two-ways-from-here/" + f)),
      "sit/public drift: " + f);
  }
});

test("sit hashes === public hashes for this board", () => {
  const sitIndex = sha256(fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/index.html")));
  const pubIndex = sha256(fs.readFileSync(path.join(ROOT, "public/two-ways-from-here/index.html")));
  const sitSim = sha256(fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/sim.js")));
  const pubSim = sha256(fs.readFileSync(path.join(ROOT, "public/two-ways-from-here/sim.js")));
  assert.equal(sitIndex, pubIndex, "index.html sit !== public");
  assert.equal(sitSim, pubSim, "sim.js sit !== public");
});

test("MANIFEST.txt records the shipped hashes, and names the boards left standing — the parent among them", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/two-ways-from-here/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of [
    "d97d9951", "f64b4309",
    "a3345903", "acbf4304",
    "6e606e5", "676587bc", "76c886b9",
    "510a392", "6c30179c", "f5407bca",
    "66b5507", "b5a56a14", "6eb957e7",
    "070a4619", "e9f81b74", "c59dc101",
    "18b1324f", "b6f21db0", "576ce2b6", "31aead60",
    "953368a1", "5d2f452f", "292d6645", "395c18f2", "5ad814e6",
    "f4f17008", "7711f979", "555ba9a9",
    "9a305653",
  ]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
  assert.match(man, /CFD-210/);
  assert.match(man, /\/dice-at-the-places\/[\s\S]*PASSED/, "the parent is named as PASSED");
});

test("the board ships three files and reaches for nothing off itself — the parent's name is not a global here", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/two-ways-from-here")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link |@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DiceAtThePlaces|DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|DawnspurStorm|DawnspurSite|DawnspurHalt|MosswakeLoop|HerbsLarder|TheyRemember|dice-at-the-places|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|dawnspur-storm|dawnspur-site|dawnspur-halt|mosswake-loop|herbs-larder|they-remember|convoy-stop/,
    "no other board's module or path is named outside a comment — the lineage lock");
  assert.match(SIT_SIM, /globalThis\.TwoWaysFromHere = api/, "the global is this board's own name");
  assert.match(SIT_HTML, /TwoWaysFromHere\.createBoard\(\{ fresh: true \}\)/, "the page boots its own module");
  assert.match(SIT_SIM, /^\/\/.*CFD-210/m, "the header names the card");
  assert.match(SIT_SIM, /^\/\/.*\/dice-at-the-places\//m, "the header names the parent — in a comment, where the lock allows it");
  assert.match(SIT_HTML, /<title>Two Ways from Here<\/title>/);
});

test("the signed CFD-210 beat is the brief — and its re-cut is the part that governs", () => {
  const beat = fs.readFileSync(path.join(ROOT, "docs/cfd-210-beat.md"), "utf8");
  assert.match(beat, /SIGNED — David, 2026-09-01/);
  assert.match(beat, /\/two-ways-from-here\//);
  assert.match(beat, /the corridor forks once, after commitment/i);
  assert.match(beat, /The Halt is NOT a destination on this board/);
  assert.match(beat, /BANK OR PRESS ON/);
  assert.match(beat, /stake waived/i);
  assert.match(beat, /ENDS COLD/);
  assert.match(beat, /Parent: `\/dice-at-the-places\/`/);
  assert.match(beat, /Two lit at the OPEN/);
  assert.match(beat, /Rustfall as a send/);
  assert.match(beat, /Ask: What happened/);
  assert.match(beat, /9a305653/);
  assert.match(beat, /liveCanDo\(\)/);
  assert.match(beat, /undefined !== null/);
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

test("kill: opening is the desk float on a finished city; one live SEND at Mosswake; nothing armed, nothing cold", () => {
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
  assert.equal(b.posted, null);
  assert.equal(b.endSentence, null);
  assert.deepEqual(b.places(), ["halt", "mosswake", "consist", "rustfall"]);
  assert.equal(b.canSend(), true);
  assert.equal(b.canHome(), false);
  assert.equal(b.canCollect(), false);
  assert.equal(b.canPress(), false, "the fork is not lit at the open");
  assert.equal(b.liveCanDo().place, "mosswake");
  assert.equal(b.liveCanDo().verb, "send");
  assert.equal(b.liveCanDo().canDo, SEND_FACE);
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
  assert.match(lit, /\bendedCold: false,/, "endedCold is initialised false in the createBoard literal");
  assert.match(lit, /\bpressOns: 0,/, "pressOns is initialised 0 in the createBoard literal");
  assert.match(lit, /\barmed: false,/);
  assert.match(lit, /\bstopped: false,/);
  assert.match(lit, /\baway: null,/);
  assert.doesNotMatch(lit, /:\s*undefined/, "no field is initialised to undefined");
  // every field the sim reads is in the literal
  const reads = new Set((SIM_CODE.match(/\bs\.([a-zA-Z]+)\b/g) || []).map((m) => m.slice(2)));
  for (const f of reads) {
    assert.match(lit, new RegExp("\\b" + f + ":"), "sim reads s." + f + " but the literal never initialises it");
  }
});

test("kill: the opening's marks are not settable from the board the thumb reaches", () => {
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*marks/, "the board hands in no balance");
  assert.match(SIT_HTML, /createBoard\(\{ fresh: true \}\)/, "the board opens fresh");
});

test("kill: one map — map is the city geometry; rim and gap are not state", () => {
  const b = makeBoard().b;
  assert.deepEqual(b.map, { left: 42, width: 16 });
  assert.equal(typeof b.rim, "undefined");
  assert.equal(typeof b.gap, "undefined");
  assert.doesNotMatch(SIM_CODE, /\brim\b/);
  assert.doesNotMatch(SIM_CODE, /s\.gap|get gap/);
  for (const line of ["S-C", "S-P+", "S-P-"]) {
    assert.deepEqual(walk(line).b.map, { left: 42, width: 16 }, line);
  }
});

test("kill: one consist — consistAt only; the press-on moves the same consist", () => {
  const b = makeBoard().b;
  assert.equal(b.consistAt, "halt");
  assert.equal(typeof b.inbound, "undefined");
  assert.equal(typeof b.landed, "undefined");
  assert.doesNotMatch(SIM_CODE, /inbound|landed|commitLand|canLand/);
  const h = walk("S-");
  assert.equal(h.b.consistAt, "halt");
  walk("P", h);
  assert.equal(h.b.consistAt, "mosswake", "a press-on sends the one consist out");
  walk("+", h);
  assert.equal(h.b.consistAt, "halt");
});

// ---------------------------------------- the corridor: one, then two at the arm, never three

test("kill: more than one live can-do at the OPEN, or at any frame before the first run comes home", () => {
  for (const line of ["", "S"]) {
    const b = walk(line).b;
    const lives = canDos(b);
    assert.equal(lives.length, 1, "frame \"" + line + "\" has " + lives.length + " live can-dos: " + JSON.stringify(tags(b)));
  }
  assert.deepEqual(tags(makeBoard().b), ["mosswake:" + SEND_FACE], "the open is C12's open");
  assert.equal(makeBoard().b.notice("consist").canDo, null, "the consist is dark at the open");
});

test("kill: more than two live can-dos at any frame, ever — enumerate notice() at every place at every frame", () => {
  for (const f of frames()) {
    const lives = canDos(f.h.b);
    assert.ok(lives.length <= 2, f.name + " has " + lives.length + " live can-dos: " + JSON.stringify(tags(f.h.b)));
    assert.deepEqual(tags(f.h.b), f.live, f.name + " (" + JSON.stringify(f.line) + ") lit the wrong set");
    assert.deepEqual(f.h.b.liveCanDos(), lives.map((n) => ({ place: n.place, verb: n.verb, canDo: n.canDo })),
      f.name + ": liveCanDos() disagrees with direct enumeration");
  }
});

test("the fork is exactly two, exactly at the arm — and the two are Collect. at Mosswake and ROLL HER OUT on the consist", () => {
  let armedFrames = 0;
  for (const f of frames()) {
    const b = f.h.b;
    const n = canDos(b).length;
    if (atArm(b)) {
      armedFrames += 1;
      assert.equal(n, 2, f.name + " is armed but lights " + n);
      assert.deepEqual(tags(b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE], f.name);
      assert.equal(b.canCollect(), true, f.name);
      assert.equal(b.canPress(), true, f.name);
      assert.equal(b.canSend(), false, f.name + ": Mosswake's own SEND stays dark at the arm");
    } else {
      assert.ok(n <= 1, f.name + " is not armed and lights " + n + ": " + JSON.stringify(tags(b)));
      assert.equal(b.canPress(), false, f.name);
    }
  }
  assert.ok(armedFrames >= 2, "the frame list reaches the arm more than once: " + armedFrames);
});

test("kill: liveCanDo() is used to grade the corridor — it is first-match and BLIND to the fork; liveCanDos() sees it", () => {
  const b = walk("S-").b;
  assert.equal(canDos(b).length, 2);
  assert.deepEqual(b.liveCanDo(), { place: "mosswake", verb: "collect", canDo: COLLECT_FACE },
    "the singular returns the first match only");
  assert.deepEqual(b.liveCanDos(), [
    { place: "mosswake", verb: "collect", canDo: COLLECT_FACE },
    { place: "consist", verb: "press", canDo: PRESS_FACE },
  ]);
  for (const f of frames()) {
    const many = f.h.b.liveCanDos();
    assert.deepEqual(f.h.b.liveCanDo(), many.length ? many[0] : null, f.name + ": the singular is kept, as the first of the plural");
  }
  // this file's corridor grades never lean on the singular
  const me = fs.readFileSync(__filename, "utf8");
  const graded = me.slice(me.indexOf("kill: more than one live can-do at the OPEN"), me.indexOf("kill: liveCanDo() is used to grade"));
  assert.doesNotMatch(graded, /liveCanDo\(\)/, "the corridor tests above must not call the singular");
});

test("the corridor walks: SEND, Home, then the fork — bank, or press on and Home again", () => {
  const open = makeBoard().b;
  assert.deepEqual(tags(open), ["mosswake:" + SEND_FACE]);
  assert.deepEqual(tags(walk("S").b), ["consist:" + HOME_FACE]);
  assert.deepEqual(tags(walk("S-").b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE]);
  assert.deepEqual(tags(walk("S-C").b), []);
  assert.deepEqual(tags(walk("S-P").b), ["consist:" + HOME_FACE]);
  assert.deepEqual(tags(walk("S-P+").b), ["mosswake:" + SEND_FACE]);
  assert.deepEqual(tags(walk("S-P-").b), []);
});

test("fuzz: 400 sittings under honest dice — never three lit, two only at the arm, every lit thing fires, the dark never do", () => {
  function lcg(seed) {
    let x = seed >>> 0;
    return function () { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; };
  }
  const ended = { banked: 0, cold: 0, capped: 0 };
  let pressedPaid = 0;
  let maxLive = 0;
  for (let seed = 1; seed <= 400; seed++) {
    const roll = lcg(seed * 7919);
    const pick = lcg(seed * 104729 + 1);
    const b = Board.createBoard({ fresh: true, roll: roll });
    let steps = 0;
    let pressInFlight = false;
    while (!b.stopped && steps < 60) {
      steps += 1;
      const lives = canDos(b);
      maxLive = Math.max(maxLive, lives.length);
      assert.ok(lives.length <= 2, "seed " + seed + " step " + steps + ": " + JSON.stringify(tags(b)));
      assert.equal(lives.length === 2, atArm(b), "seed " + seed + " step " + steps + ": two lit iff armed — " + JSON.stringify(tags(b)));
      assert.ok(lives.length >= 1, "seed " + seed + " step " + steps + ": an unstopped board has nothing lit");
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
      // one lit place, chosen at random, fires
      const choice = lives[Math.floor(pick() * lives.length)];
      const wasPress = choice.verb === "press";
      const marksBefore = b.marks;
      assert.equal(b.postNotice(choice.place), true);
      assert.equal(b.commitPosted(), true, "seed " + seed + ": lit " + choice.place + " " + choice.canDo + " refused — a dead button");
      if (wasPress) assert.equal(b.marks, marksBefore, "the press-on is free");
      if (wasPress) pressInFlight = true;
      if (choice.verb === "send") pressInFlight = false;
      if (choice.verb === "home") {
        if (pressInFlight && b.marks === marksBefore + MOSS_PAYS) {
          pressedPaid += 1;
          assert.equal(b.armed, false, "seed " + seed + ": a paid press-on must clear the arm");
        }
        if (pressInFlight && b.marks === marksBefore) assert.equal(b.endedCold, true, "seed " + seed + ": a short press-on must end cold");
        pressInFlight = false;
      }
    }
    if (b.stopped && b.endedCold) ended.cold += 1;
    else if (b.stopped) ended.banked += 1;
    else ended.capped += 1;
    if (b.stopped) assert.deepEqual(canDos(b), [], "seed " + seed + ": stopped with something lit");
  }
  assert.equal(maxLive, 2, "the fork was reached under honest dice");
  assert.ok(ended.cold > 0, "no sitting ended cold in 400 — the cold branch is unreachable under honest dice");
  assert.ok(ended.banked > 0, "no sitting banked in 400");
  assert.ok(pressedPaid > 0, "no press-on ever came home paid in 400");
});

// ------------------------------------------ the one new system: the fork

test("the fork lights when the board arms: ROLL HER OUT. 64. on the consist, Collect. at Mosswake, exactly as it ships", () => {
  const b = walk("S-").b;
  const c = b.notice("consist");
  assert.equal(c.canDo, PRESS_FACE);
  assert.equal(c.verb, "press");
  assert.equal(c.chance, MOSS_CHANCE);
  assert.equal(c.percent, MOSS_PERCENT);
  assert.equal(c.writing, ARMED_LINE, "the writing at the arm is C12's, unchanged");
  assert.equal(c.blocked, COST_LINE, "the cost is on the tile");
  const m = b.notice("mosswake");
  assert.equal(m.canDo, COLLECT_FACE);
  assert.equal(m.verb, "collect");
  assert.equal(m.writing, "Mosswake. A neighbor again.");
  assert.equal(m.inProcess, "They kept something back.");
  assert.equal(m.blocked, null);
  assert.equal(b.notice("halt").canDo, null);
  assert.equal(b.notice("rustfall").canDo, null);
});

test("kill: the fork lights before the board arms — at the open, or after a run that came home paid", () => {
  for (const line of ["", "S+", "S+S+", "S+S", "S-P+", "S-P+S-P+", "S-P+S+"]) {
    const b = walk(line).b;
    assert.equal(b.canPress(), false, JSON.stringify(line));
    assert.notEqual(b.notice("consist").canDo, PRESS_FACE, JSON.stringify(line) + " lit the fork");
    assert.notEqual(b.notice("consist").verb, "press", JSON.stringify(line));
    assert.equal(b.commitPress(), false, JSON.stringify(line) + ": commitPress fired unarmed");
  }
});

test("kill: the fork never lights — every arm lights it, after any run of paid sends", () => {
  for (let k = 0; k <= 5; k++) {
    const line = "S+".repeat(k) + "S-";
    const b = walk(line).b;
    assert.equal(b.armed, true, line);
    assert.equal(b.canPress(), true, line);
    assert.equal(b.notice("consist").canDo, PRESS_FACE, line + ": the consist stays dark at the arm");
    assert.deepEqual(tags(b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE], line);
  }
  const again = walk("S-P+S-").b;
  assert.equal(again.notice("consist").canDo, PRESS_FACE, "the fork lights again at the next short run");
});

test("kill: the press-on's cost is not on the consist tile BEFORE the tap", () => {
  const h = walk("S-");
  const before = h.b.notice("consist");
  assert.equal(before.canDo, PRESS_FACE);
  assert.equal(before.blocked, COST_LINE, "the cost, before commitPress");
  assert.equal(before.writing, ARMED_LINE);
  assert.equal(h.b.record.pressOns, 0, "nothing has been tapped yet");
  // and the page renders blocked, so the words reach the screen
  assert.match(SIT_HTML, /waitEl\.textContent = n\.blocked \|\| ""/);
  assert.match(SIT_HTML, /nowEl\.textContent = n\.writing/);
  assert.match(SIT_HTML, /doEl\.textContent = n\.canDo/);
  assert.match(SIM_CODE, /It will not cover it twice\./);
});

test("kill: a press-on costs marks — it is free; stakeOf() is waived, not paid, and the run stakes nothing", () => {
  const h = walk("S-");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE);
  walk("P", h);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE, "the press-on debited marks");
  assert.equal(h.b.record.runsOut, 2);
  assert.equal(h.b.record.pressOns, 1);
  assert.equal(h.b.record.marksLost, MOSS_STAKE, "nothing new is staked");
  // live at the arm a player actually reaches: marks 1, Mosswake (stake 2)
  // unaffordable — exactly where the fork must still be there. 0 marks is
  // unreachable at any arm from the open (arm marks are 1, 13, 25, ...), so an
  // earlier cut's makeBoard({ marks: 2 }) fixture measured a state no player
  // reaches — the fixture-premise defect this project has recorded four times.
  const poor = walk("S-");
  assert.equal(poor.b.marks, OPENING_MARKS - MOSS_STAKE);
  assert.ok(poor.b.marks < MOSS_STAKE, "Mosswake is unaffordable at the arm");
  assert.equal(poor.b.canSend(), false);
  assert.equal(poor.b.canPress(), true, "the press-on is not gated on marks");
  assert.equal(poor.b.notice("consist").canDo, PRESS_FACE);
  walk("P", poor);
  assert.equal(poor.b.marks, OPENING_MARKS - MOSS_STAKE, "the press-on debited marks");
  assert.doesNotMatch(fnBody("commitPress"), /s\.marks/, "commitPress never touches marks");
  assert.doesNotMatch(fnBody("canPress"), /marks|stakeOf/, "canPress never consults the stake");
  assert.doesNotMatch(fnBody("canPress"), /canSend/, "canPress does not consult canSend");
  assert.match(fnBody("canSend"), /if \(s\.armed\) return false;/, "canSend's armed guard is untouched");
});

test("kill: either branch quotes a number it does not roll — the press-on's chance is Mosswake's own 64, thrown against the exact chance", () => {
  const h = walk("S-");
  const arm = h.b.notice("consist");
  assert.equal(arm.chance, MOSS_CHANCE);
  assert.equal(arm.percent, MOSS_PERCENT);
  assert.match(arm.canDo, new RegExp(String(arm.percent)));
  assert.equal(arm.chance, makeBoard().b.notice("mosswake").chance, "the press-on's chance is the SEND's chance");
  walk("P", h);
  const out = h.b.notice("consist");
  assert.equal(out.canDo, HOME_FACE);
  assert.equal(out.chance, MOSS_CHANCE);
  h.ctl.next = MOSS_CHANCE;
  assert.equal(h.b.commitHome(), true);
  assert.equal(h.b.endedCold, true, "draw === chance is a miss — the cold stop");
  const h2 = walk("S-P");
  h2.ctl.next = MOSS_CHANCE - 0.0001;
  assert.equal(h2.b.commitHome(), true);
  assert.equal(h2.b.armed, false, "draw just under the chance pays and clears the arm");
  assert.equal(h2.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS);
});

test("kill: a paid press-on does not clear the arm — it does: +14, the ending goes out of reach, back in the paying loop", () => {
  const h = walk("S-P+");
  assert.equal(h.b.armed, false, "the arm clears");
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.endedCold, false);
  assert.equal(h.b.collected, false);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS);
  assert.equal(h.b.haulOnConsist, true);
  assert.equal(h.b.consistAt, "halt");
  assert.deepEqual(h.b.record, { runsOut: 2, cargoesBanked: 1, runsTurnedBack: 1, marksLost: MOSS_STAKE, pressOns: 1 });
  assert.equal(h.b.runSentence, "The train brought the Mosswake cargo home.");
  assert.equal(h.b.canCollect(), false, "winning takes the ending away");
  assert.equal(h.b.commitCollect(), false);
  assert.equal(h.b.canPress(), false);
  assert.equal(h.b.canSend(), true);
  assert.deepEqual(tags(h.b), ["mosswake:" + SEND_FACE]);
  assert.equal(h.b.notice("consist").writing, "The consist is home. The haul is on it.");
  assert.equal(h.b.notice("halt").writing, "The Halt holds. Herbs in the larder.");
  assert.equal(h.b.notice("mosswake").canDo, SEND_FACE);
  assert.equal(h.b.endSentence, null);
});

test("kill: a failed press-on does not end the sitting, or ends it with Collect. still reachable, or credits the +1 mark", () => {
  const h = walk("S-P-");
  assert.equal(h.b.stopped, true, "the sitting ends");
  assert.equal(h.b.endedCold, true, "cold");
  assert.equal(h.b.canCollect(), false, "no Collect.");
  assert.equal(h.b.commitCollect(), false);
  assert.equal(h.b.notice("mosswake").canDo, null, "Collect. is not on the tile");
  assert.equal(h.b.notice("mosswake").verb, null);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE, "no +1");
  assert.equal(h.b.collected, false);
  assert.equal(h.b.remembered, false, "no remembering");
  assert.equal(h.b.consistAt, "halt");
  assert.equal(h.b.haulOnConsist, false);
  assert.deepEqual(h.b.record, { runsOut: 2, cargoesBanked: 0, runsTurnedBack: 2, marksLost: MOSS_STAKE, pressOns: 1 });
  for (const p of PLACES) assert.equal(h.b.notice(p).canDo, null, p + " lit after the cold stop");
  assert.deepEqual(h.b.liveCanDos(), []);
  assert.equal(h.b.canSend(), false);
  assert.equal(h.b.canPress(), false);
  assert.equal(h.b.commitPress(), false);
  assert.equal(h.b.commitSend(), false);
});

test("kill: the two endings — banked and cold — render the same words", () => {
  const banked = walk("S-C").b;
  const cold = walk("S-P-").b;
  assert.equal(banked.stopped, true);
  assert.equal(cold.stopped, true);
  assert.equal(banked.endedCold, false);
  assert.equal(cold.endedCold, true);
  // the consist: the tile the cold ending lands on
  assert.equal(cold.notice("consist").writing, COLD_LINE);
  assert.equal(cold.notice("consist").canDo, null);
  assert.equal(banked.notice("consist").writing, "The consist is home. Empty.");
  assert.notEqual(cold.notice("consist").writing, banked.notice("consist").writing);
  // Mosswake: the tile the banked ending lands on
  assert.equal(banked.notice("mosswake").writing, BANKED_LINE);
  assert.notEqual(cold.notice("mosswake").writing, BANKED_LINE, "the cold ending must not borrow the banked line");
  assert.notEqual(cold.notice("mosswake").writing, banked.notice("mosswake").writing);
  assert.equal(cold.notice("mosswake").canDo, null);
  // the Halt does not claim the larder covered a run it could not
  assert.doesNotMatch(cold.notice("halt").writing, /the larder covered it/);
  assert.doesNotMatch(cold.notice("halt").blocked, /covered the short run/);
  assert.match(cold.notice("halt").writing, /The Halt holds/, "R6: the home is never the stake");
  assert.notEqual(cold.notice("halt").writing, banked.notice("halt").writing);
  // and no tile on the cold board carries the banked ending's sentence
  for (const p of PLACES) {
    const n = cold.notice(p);
    assert.notEqual(n.writing, BANKED_LINE, p);
    assert.notEqual(n.blocked, BANKED_LINE, p);
  }
  // endSentence is never rendered (measured: index.html reads it 0 times) — but it must not lie either
  assert.equal((SIT_HTML.match(/endSentence/g) || []).length, 0);
  assert.equal(banked.endSentence, ARMED_LINE);
  assert.equal(cold.endSentence, COLD_LINE);
  assert.notEqual(banked.endSentence, cold.endSentence);
  assert.match(cold.runSentence, /She came home short again/);
});

test("C12's banked ending is inherited whole — Collect. at Mosswake, +1, remembered, People remember who showed up", () => {
  const h = walk("S-");
  assert.equal(h.b.notice("mosswake").canDo, COLLECT_FACE);
  assert.equal(h.b.notice("mosswake").verb, "collect");
  walk("C", h);
  assert.equal(h.b.armed, true);
  assert.equal(h.b.stopped, true);
  assert.equal(h.b.endedCold, false);
  assert.equal(h.b.collected, true);
  assert.equal(h.b.remembered, true);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MUSEUM_MARK);
  assert.equal(h.b.endSentence, ARMED_LINE);
  assert.equal(h.b.notice("mosswake").writing, BANKED_LINE);
  assert.equal(h.b.notice("consist").writing, "The consist is home. Empty.");
  assert.equal(h.b.notice("consist").blocked, "The haul is already up.");
  assert.equal(h.b.notice("halt").writing, "The Halt holds. Herbs in the larder.");
  assert.equal(h.b.canPress(), false, "banking takes the fork with it");
  assert.equal(h.b.commitPress(), false);
  assert.deepEqual(tags(h.b), []);
  assert.match(SIT_SIM, /s\.marks \+= MUSEUM_MARKS/);
  assert.doesNotMatch(SIM_CODE, /s\.marks\s*=\s*MUSEUM_MARKS/);
});

test("the board is C12 exactly until the arm — a player who has sat C12 cannot tell the difference before it", () => {
  const shared = ["marks", "armed", "stopped", "collected", "remembered", "consistAt", "haulOnConsist",
    "herbsInLarder", "lampLit", "haltHolds", "posted", "runSentence", "endSentence"];
  for (const line of ["", "S", "S+", "S+S", "S+S+", "S+S-", "S-C"]) {
    const a = walk(line, makeParentBoard()).b;
    const c = walk(line).b;
    for (const p of PLACES) {
      if (line.endsWith("-") && p === "consist") continue; // the fork; measured below
      assert.deepEqual(c.notice(p), a.notice(p), "frame " + JSON.stringify(line) + " place " + p + " differs from C12");
    }
    for (const k of shared) assert.deepEqual(c[k], a[k], "frame " + JSON.stringify(line) + " getter " + k);
    const ar = a.record;
    const cr = c.record;
    for (const k of Object.keys(ar)) assert.equal(cr[k], ar[k], "frame " + JSON.stringify(line) + " record." + k);
  }
  // at the arm: three tiles identical; the consist differs by the fork alone
  const a = walk("S-", makeParentBoard()).b;
  const c = walk("S-").b;
  for (const p of ["halt", "mosswake", "rustfall"]) assert.deepEqual(c.notice(p), a.notice(p), p);
  const pc = a.notice("consist");
  const cc = c.notice("consist");
  assert.equal(pc.canDo, null);
  assert.equal(cc.canDo, PRESS_FACE);
  assert.equal(cc.writing, pc.writing, "the arm's writing is C12's");
  assert.equal(pc.blocked, "The haul was lost. The larder covered it.");
  assert.equal(cc.blocked, COST_LINE);
});

test("kill: the Halt becomes tappable — it is HOME on this board, by name, at every frame", () => {
  for (const f of frames()) {
    const n = f.h.b.notice("halt");
    assert.equal(n.canDo, null, f.name);
    assert.equal(n.verb, null, f.name);
    assert.equal(n.chance, null, f.name);
    assert.equal(n.percent, null, f.name);
    assert.match(n.writing, /^The Halt holds\./, f.name);
    const b = walk(f.line).b;
    if (f.post) postStop({ b: b });
    assert.equal(b.postNotice("halt"), true);
    assert.equal(b.commitPosted(), false, f.name + ": the Halt fired");
  }
  assert.match(fnBody("canSend"), /s\.consistAt !== "halt"/, "\"halt\" is where the consist lives");
  assert.match(fnBody("canPress"), /s\.consistAt !== "halt"/, "the press-on leaves from home too");
  assert.match(fnBody("canCollect"), /s\.consistAt !== "halt"/);
  assert.doesNotMatch(SIM_CODE, /verb: "halt"|canDo: "[^"]*Halt/, "no Halt verb, no Halt can-do");
});

test("exclusive by construction — winning takes the ending away, losing takes everything, banking takes the run", () => {
  const banked = walk("S-C").b;
  assert.equal(banked.canPress(), false);
  assert.equal(banked.commitPress(), false);
  assert.equal(banked.notice("consist").canDo, null);
  // §10.2 — driven: Collect. goes dark on its own while the press-on is in flight
  const flight = walk("S-P").b;
  assert.equal(flight.consistAt, "mosswake");
  assert.equal(flight.canCollect(), false, "canCollect requires consistAt === \"halt\"");
  assert.equal(flight.commitCollect(), false);
  assert.deepEqual(flight.notice("mosswake"), {
    place: "mosswake", canDo: null, verb: null, chance: null, percent: null,
    inProcess: "The consist is here.", blocked: null, writing: "Mosswake. The run is out.",
  });
  assert.deepEqual(tags(flight), ["consist:" + HOME_FACE], "one lit while she is out — the corridor holds for free");
  assert.equal(flight.armed, true, "the arm is still set while she is out; the return decides it");
  const won = walk("S-P+").b;
  assert.equal(won.canCollect(), false, "winning takes the ending away");
  const lost = walk("S-P-").b;
  assert.equal(lost.canCollect(), false, "losing takes everything");
  assert.equal(lost.canPress(), false);
  assert.equal(lost.canSend(), false);
});

test("kill: a failed run costs the home, the lamp, the larder, or Favor already earned — on either branch", () => {
  for (const line of ["S-", "S-P-", "S-P+S-P-", "S-C"]) {
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
  }
  const cold = walk("S-P-").b;
  assert.equal(cold.remembered, false, "not earned this sitting — not lost, never had");
  assert.equal(cold.marks, OPENING_MARKS - MOSS_STAKE, "the free run lost no marks");
});

test("kill: the stop becomes unreachable for a player who only ever takes one branch", () => {
  const banker = walk("S-C").b;
  assert.equal(banker.stopped, true, "bank every time: ends banked");
  assert.equal(banker.endedCold, false);
  const presser = walk("S-P-").b;
  assert.equal(presser.stopped, true, "press every time: ends cold at the first short press-on");
  assert.equal(presser.endedCold, true);
  const luckyPresser = walk("S-P+S-P+S-P+S-P-").b;
  assert.equal(luckyPresser.stopped, true, "a presser who wins keeps playing and still reaches an ending");
  assert.equal(luckyPresser.endedCold, true);
  assert.equal(luckyPresser.record.pressOns, 4);
  const lateBanker = walk("S-P+S-P+S-C").b;
  assert.equal(lateBanker.stopped, true, "a presser can still bank at a later arm");
  assert.equal(lateBanker.endedCold, false);
  assert.equal(lateBanker.notice("mosswake").writing, BANKED_LINE);
  // inherited from C12: the never-loser never stops, and never sees the fork
  const never = walk("S+S+S+S+").b;
  assert.equal(never.stopped, false);
  assert.equal(never.armed, false);
  assert.equal(never.record.pressOns, 0);
});

test("kill: two stops, each stated — Collect-while-armed banks, a short press-on ends cold; nothing else writes stopped", () => {
  const writes = SIT_SIM.match(/s\.stopped\s*=\s*true/g) || [];
  assert.equal(writes.length, 2, "exactly two stopped writes: " + writes.length);
  assert.match(fnBody("commitCollect"), /if \(s\.armed\) s\.stopped = true;/, "the banked stop, C12's line");
  assert.match(fnBody("commitHome"), /if \(run\.press\) \{[\s\S]*?s\.stopped = true;[\s\S]*?s\.endedCold = true;/, "the cold stop, under the press flag");
  assert.doesNotMatch(fnBody("commitSend"), /stopped/);
  assert.doesNotMatch(fnBody("commitPress"), /stopped\s*=/);
  assert.doesNotMatch(SIM_CODE, /chartered && topped/);
  assert.equal((SIT_SIM.match(/s\.endedCold\s*=\s*true/g) || []).length, 1, "endedCold is written true in exactly one place");
  assert.equal((SIT_SIM.match(/s\.armed\s*=\s*true/g) || []).length, 1, "armed is written true in exactly one place");
  assert.equal((SIT_SIM.match(/s\.armed\s*=\s*false/g) || []).length, 1, "the clear: a boolean assignment, on purpose, once");
  for (const line of ["S", "S+", "S-", "S-P", "S-P+"]) {
    assert.equal(walk(line).b.stopped, false, JSON.stringify(line) + " stopped");
  }
});

test("kill: a failed run refunds, re-rolls, offers a consolation — the first short run does not end the sitting; the cold one does not refund", () => {
  const h = walk("S-");
  assert.equal(h.b.stopped, false, "a failed FIRST run does not end the sitting — it arms");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE, "no refund");
  assert.equal(h.b.canHome(), false, "no re-roll of the same run");
  assert.equal(h.b.commitHome(), false);
  assert.doesNotMatch(h.b.runSentence || "", /consolation|refund|try again|re-roll/i);
  const cold = walk("S-P-").b;
  assert.equal(cold.marks, OPENING_MARKS - MOSS_STAKE, "the cold stop refunds nothing and takes nothing");
  assert.equal(cold.canHome(), false);
  assert.doesNotMatch(SIM_CODE, /refund|consolation|reroll|re-roll/i);
});

test("endSentence tells the truth in both endings and is null everywhere else — the tiles carry the words", () => {
  for (const line of ["", "S", "S+", "S-", "S-P", "S-P+", "S-P+S-"]) {
    assert.equal(walk(line).b.endSentence, null, JSON.stringify(line));
  }
  assert.equal(walk("S-C").b.endSentence, ARMED_LINE);
  assert.equal(walk("S-P-").b.endSentence, COLD_LINE);
  assert.equal(walk("S-P+S-C").b.endSentence, ARMED_LINE);
  assert.equal(walk("S-P+S-P-").b.endSentence, COLD_LINE);
  assert.equal(walk("S-P-").b.notice("consist").writing, COLD_LINE, "the cold sentence is on the consist tile");
});

test("record: pressOns counts press-ons sent; marksLost counts marks actually lost and nothing else", () => {
  assert.deepEqual(walk("S-").b.record, { runsOut: 1, cargoesBanked: 0, runsTurnedBack: 1, marksLost: 2, pressOns: 0 });
  assert.deepEqual(walk("S-P").b.record, { runsOut: 2, cargoesBanked: 0, runsTurnedBack: 1, marksLost: 2, pressOns: 1 });
  assert.deepEqual(walk("S-P+").b.record, { runsOut: 2, cargoesBanked: 1, runsTurnedBack: 1, marksLost: 2, pressOns: 1 });
  assert.deepEqual(walk("S-P-").b.record, { runsOut: 2, cargoesBanked: 0, runsTurnedBack: 2, marksLost: 2, pressOns: 1 });
  assert.deepEqual(walk("S-P+S-P-").b.record, { runsOut: 4, cargoesBanked: 1, runsTurnedBack: 3, marksLost: 4, pressOns: 2 });
  assert.deepEqual(walk("S+S+S-C").b.record, { runsOut: 3, cargoesBanked: 2, runsTurnedBack: 1, marksLost: 2, pressOns: 0 });
  assert.match(fnBody("commitHome"), /s\.marksLost \+= run\.provisions \+ run\.toll;/, "one marksLost line — a free run adds 0");
  assert.match(fnBody("commitPress"), /provisions: 0,\s*toll: 0,\s*press: true,/, "the free run stakes nothing, and says so");
});

test("commitPosted routes press — the consist's posted notice fires the press-on, Mosswake's fires Collect", () => {
  const h = walk("S-");
  h.b.postNotice("consist");
  assert.equal(h.b.postedNotice().verb, "press");
  assert.equal(h.b.commitPosted(), true);
  assert.equal(h.b.consistAt, "mosswake");
  assert.equal(h.b.record.pressOns, 1);
  h.b.postNotice("mosswake");
  assert.equal(h.b.commitPosted(), false, "Collect. is dark while she is out");
  h.b.postNotice("consist");
  assert.equal(h.b.postedNotice().verb, "home");
  h.ctl.next = 1;
  assert.equal(h.b.commitPosted(), true);
  assert.equal(h.b.endedCold, true);
  assert.equal(h.b.postedNotice().writing, COLD_LINE, "the tile the player is looking at says it");
  const g = walk("S-");
  g.b.postNotice("mosswake");
  assert.equal(g.b.commitPosted(), true);
  assert.equal(g.b.stopped, true);
  assert.equal(g.b.endedCold, false);
  assert.equal(g.b.postedNotice().writing, BANKED_LINE);
  assert.match(fnBody("commitPosted"), /if \(n\.verb === "press"\) return commitPress\(\);/);
});

test("kill: anything moves with wall time — a branch expires, decays, or times out", () => {
  const h = walk("S-");
  const before = snapshot(h.b);
  assert.equal(h.b.wait(), false);
  walk("...", h);
  assert.deepEqual(snapshot(h.b), before, "waiting at the fork moved something");
  assert.deepEqual(tags(h.b), ["mosswake:" + COLLECT_FACE, "consist:" + PRESS_FACE], "both branches still lit after waiting");
  const out = walk("S-P");
  assert.equal(out.b.wait(), false);
  assert.equal(out.b.consistAt, "mosswake");
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\./);
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./);
  assert.doesNotMatch(SIM_CODE, /expire|decay|timeout|timer/i);
});

// ------------------------------------------ the render: the lit affordance

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
    assert.ok(at > wipe, place + ": the lit toggle must come AFTER the consist className wipe, or it is silently lost");
  }
  assert.equal((paint.match(/\.classList\.toggle\("lit"/g) || []).length, 4, "four places, four toggles");
  assert.match(SIT_HTML, /const rustEl = document\.getElementById\("rustfall"\);/);
});

test("kill: the unchosen branch is rendered grey, dimmed to scenery, or as a dead button — one .lit rule, identical for every button; the unlit untouched", () => {
  const css = cssCodeOf();
  const litRules = css.match(/(?:^|[\s,}])\.lit\s*\{[^}]*\}/g) || [];
  assert.equal(litRules.length, 1, "exactly one .lit rule: " + JSON.stringify(litRules));
  assert.doesNotMatch(css, /#(?:halt|mosswake|consist|rustfall)\s*\.lit|#(?:halt|mosswake|consist|rustfall)\.lit/,
    "no per-button variant — the two lit places must read as equally available");
  const lit = rule(".lit");
  assert.match(lit, /filter:|box-shadow:/, "the lit state is a visible available-state");
  assert.doesNotMatch(lit, /opacity|gray|grey/i, "lit is never a dimming");
  assert.doesNotMatch(css, /:not\(\.lit\)|\.unlit|\.dead\b|\.dim\s*\{|\.dark\s*\{/, "no rule dims the unlit");
  assert.doesNotMatch(css, /opacity:\s*0?\.\d|grayscale|filter:\s*gray/, "nothing on the strip is faded to scenery");
  assert.doesNotMatch(HTML_CODE, /\.disabled\s*=|setAttribute\("disabled"|disabled="/, "no dead-button treatment");
  for (const sel of ["#halt", "#mosswake", "#consist", "#rustfall"]) {
    assert.match(rule(sel), /background:\s*transparent/, sel + " root is not a filled brick");
    assert.doesNotMatch(rule(sel), /opacity/, sel);
  }
});

test("the notice board grows with its writing — five lines at the fork must not spill off the timber", () => {
  const n = rule("#notice");
  assert.match(n, /min-height:\s*16%/, "min-height, so the cost line at the fork has room");
  assert.doesNotMatch(n, /(?<!min-)height:\s*16%/, "a fixed height would push the cost line off the board");
  assert.doesNotMatch(n, /overflow:\s*hidden/, "the cost must never be clipped");
});

test("kill: no hopping glow, no outline hunt, no animation — the lit state is steady, and it never lands on a dead job", () => {
  assert.doesNotMatch(cssOf(), /@keyframes|animation:/);
  const outlines = cssOf().match(/[^{}]*\{[^}]*outline:[^}]*\}/g) || [];
  assert.deepEqual(outlines, [], "no outline glow: " + JSON.stringify(outlines));
  assert.doesNotMatch(SIT_HTML, /<button[^>]*\bdisabled\b/);
  assert.doesNotMatch(SIT_HTML, /transition:/, "the lit state does not animate on or off");
});

// ------------------------------------------ notices / commitPosted, inherited

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
  assert.equal(b.postNotice("rim"), false);
  assert.equal(b.postNotice("cards"), false);
});

test("commitPosted fires the posted notice's can-do and no other verb", () => {
  const h = makeBoard();
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("halt");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("rustfall");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("consist");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("mosswake");
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.consistAt, "mosswake");
  h.b.postNotice("consist");
  h.ctl.next = 1;
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.armed, true);
  h.b.postNotice("halt");
  assert.equal(h.b.commitPosted(), false, "the Halt does not fire at the fork");
  h.b.postNotice("rustfall");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("mosswake");
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.stopped, true);
});

test("the board paints the posted notice, not a lecture box", () => {
  assert.match(SIT_HTML, /id="notice"/);
  assert.match(SIT_HTML, /id="notice-now"/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIT_HTML, /id="notice-wait"/);
  assert.match(SIT_HTML, /board\.postNotice\("halt"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("mosswake"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("consist"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("rustfall"\)/);
  assert.match(SIT_HTML, /if \(board\.commitPosted\(\)\) paint\(\)/);
  assert.doesNotMatch(HTML_CODE, /Can do:|In process:|Blocked:/);
  assert.doesNotMatch(SIT_HTML, /id="say"|id="end"|id="told"/);
});

test("Halt notice: holds; never SEND; blocked pointing out", () => {
  const h = makeBoard();
  const n = h.b.notice("halt");
  assert.equal(n.canDo, null);
  assert.equal(n.verb, null);
  assert.match(n.writing, /The Halt holds/);
  assert.match(n.blocked, /already up/);
  walk("S-C", h);
  assert.equal(h.b.notice("halt").canDo, null);
});

test("Rustfall is dark dressing at every frame, the fork included — no chance, no send, raiders hold the yard road", () => {
  const n = makeBoard().b.notice("rustfall");
  assert.equal(n.canDo, null);
  assert.equal(n.chance, null);
  assert.equal(n.percent, null);
  assert.equal(n.blocked, "Raiders hold the yard road.");
  assert.equal(n.writing, "Rustfall. Dark.");
  for (const f of frames()) {
    const r = f.h.b.notice("rustfall");
    assert.equal(r.canDo, null, f.name + " rustfall lit");
    assert.equal(r.percent, null);
    assert.equal(r.writing, "Rustfall. Dark.");
  }
  assert.doesNotMatch(SIM_CODE, /rustfall.*send|send.*rustfall/i);
});

// ------------------------------------------ desk deleted / weather / Favor / terrace

test("kill: the desk does not survive", () => {
  assert.doesNotMatch(HTML_CODE, /id="cards"|id="ladder"|THE DESK/);
  assert.doesNotMatch(SIT_HTML, /id="cards"|id="ladder"|THE DESK/);
  assert.doesNotMatch(SIT_HTML, /id="pads"|class="pad"/);
  const b = makeBoard().b;
  assert.equal(typeof b.cards, "undefined");
  assert.equal(typeof b.canMeet, "undefined");
  assert.equal(typeof b.commitMeet, "undefined");
  assert.equal(typeof b.canMuster, "undefined");
  assert.equal(typeof b.commitMuster, "undefined");
  assert.doesNotMatch(SIM_CODE, /\bcards\b|\bcanMeet\b|\bcommitMeet\b|\bcanMuster\b|\bladder\b/);
});

test("kill: weather appears in no form", () => {
  assert.doesNotMatch(SIM_CODE, /weather|storm|sky|ranger|trim|stormbird|cloud-basin|CLOUD BASIN/i);
  assert.doesNotMatch(HTML_CODE, /weather|storm|Ranger|TRIM|stormbird|Cloud Basin/i);
});

test("kill: no Favor meter, bar, number, percentage or tooltip; no lecture", () => {
  assert.doesNotMatch(HTML_CODE, /favor|Favour|FAVOR/i);
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i);
  assert.doesNotMatch(SIT_HTML, /title="[^"]*[Ff]avor/);
  assert.doesNotMatch(BOARD, /that's Favor|That's Favor|that is Favor/i);
  assert.doesNotMatch(BOARD, /tooltip/i);
  assert.equal(typeof makeBoard().b.favor, "undefined");
});

test("kill: no food-to-marks exchange, no shadow price, no single-number netting of two stocks", () => {
  assert.doesNotMatch(SIM_CODE, /exchange|shadow.?price|foodToMarks|marksToFood|netting/i);
  assert.doesNotMatch(SIM_CODE, /food.*marks|marks.*food/);
  assert.equal(typeof makeBoard().b.stores, "undefined");
  assert.equal(typeof makeBoard().b.commitCarry, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitCarry|canCarry|commitUp|canUp|commitTend/);
});

test("kill: no UP, TEND, weather, Ranger, trim, crews, Sera — and no second new system", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitUp, "undefined");
  assert.equal(typeof b.commitTend, "undefined");
  assert.equal(typeof b.commitMuster, "undefined");
  assert.equal(typeof b.roster, "undefined");
  assert.doesNotMatch(SIM_CODE, /sera|cairn|crews|league|frontier|ranger|trim|stormbird/i);
  assert.doesNotMatch(HTML_CODE, /Sera|Cairn|Crews|League|Ranger|TRIM/i);
  const verbs = new Set((SIM_CODE.match(/verb: "([a-z]+)"/g) || []).map((m) => m.slice(7, -1)));
  assert.deepEqual([...verbs].sort(), ["collect", "home", "press", "send"], "four verbs: C12's three and the press-on");
});

test("kill: this board does not copy halt's lamp / SITE / LAND / CAST walk", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitLight, "undefined");
  assert.equal(typeof b.commitSite, "undefined");
  assert.equal(typeof b.commitLand, "undefined");
  assert.equal(typeof b.commitCast, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitLight|commitSite|commitLand|commitCast/);
  assert.doesNotMatch(HTML_CODE, />SITE<|>LAND<|>CAST<|>Light it/);
});

test("kill: Put them up is not a live verb on this board", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.canPutUp, "undefined");
  assert.equal(typeof b.commitPutUp, "undefined");
  assert.equal(b.putUp, true, "already sat, inherited");
  assert.doesNotMatch(SIM_CODE, /canPutUp|commitPutUp/);
  assert.doesNotMatch(HTML_CODE, /Put them up/);
});

test("kill: fuel is not a standing bill", () => {
  assert.doesNotMatch(SIM_CODE, /s\.fuel|commitFuel|canFuel|upkeep/);
  assert.doesNotMatch(HTML_CODE, /upkeep/i);
});

test("kill: no second HUD line", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('id="hud"'), SIT_HTML.indexOf('id="strip"'));
  assert.doesNotMatch(hud, /pane|bill|food|glass|foundry|heat|favor|herb/i, "the HUD says none of it");
  assert.match(hud, /marks-line/, "the HUD is the one marks line");
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds one child — the marks line");
  assert.match(SIT_HTML, /marksLine\.textContent = board\.marks \+ \(board\.marks === 1 \? " mark" : " marks"\)/);
});

test("kill: no lecture, no help, no tutorial mode, no plaque, no Mara VO, no ?", () => {
  assert.doesNotMatch(HTML_CODE, /help|tutorial|plaque|citizen|interior|zoning|cutscene|overlay/i);
  assert.doesNotMatch(SIT_HTML, /id="help"|class="help"|>\?</);
  assert.doesNotMatch(SIM_CODE, /help|tutorial|plaque|citizen|Mara/i);
});

test("kill: no PWA town, LoopBeat, units sink, parts currency, CFD-200", () => {
  assert.doesNotMatch(BOARD, /loopbeat|units.?sink|parts|exchange|broker|sell|market|Unity Taste|convoy-stop/i);
});

// ------------------------------------------ places, not grey bricks

test("kill: places stay buttons — not scenery-as-divs", () => {
  const buttons = SIT_HTML.match(/<button\b[^>]*>/g) || [];
  const ids = buttons.map((b) => {
    const m = b.match(/id="([^"]+)"/);
    return m ? m[1] : "?";
  });
  assert.ok(ids.includes("halt"));
  assert.ok(ids.includes("mosswake"));
  assert.ok(ids.includes("consist"));
  assert.ok(ids.includes("rustfall"));
  assert.ok(ids.includes("notice-do"));
  assert.equal(ids.length, 5, "four places plus the notice can-do: " + JSON.stringify(ids));
  assert.doesNotMatch(SIT_HTML, /function asButton|livePlace|createElement\(live/);
});

test("kill: nodes read as places, not grey squares", () => {
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="globe"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="larder"/);
  assert.match(SIT_HTML, /id="mosswake"[^>]*>[\s\S]*class="glass"/);
  assert.match(SIT_HTML, /id="consist"[^>]*>[\s\S]*class="engine"/);
  assert.match(SIT_HTML, /id="rustfall"[^>]*>[\s\S]*class="shed"/);
  for (const sel of ["#halt", "#mosswake", "#consist", "#rustfall"]) {
    assert.match(rule(sel), /background:\s*transparent/, sel + " root is not a filled brick");
  }
  assert.match(rule("#halt .globe"), /#f09030|#e87828|#ff9020|molten|ember/);
  assert.match(rule("#halt .hall"), /#b05028|#d06028|#a04828/);
  assert.doesNotMatch(cssOf(), /#f5f0e6|#f4efe4|#e8e0d0/, "not the beige PWA");
});

test("kill: SEND is not a strip of pads away from the places", () => {
  assert.doesNotMatch(SIT_HTML, /id="pads"|id="send"|id="home"|class="pad"/);
  assert.doesNotMatch(cssOf(), /button\.pad|#pads\b/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIM_CODE, /SEND\. /);
  assert.match(SIM_CODE, /ROLL HER OUT\. /);
});

test("kill: places do not overlap", () => {
  const halt = box("#halt");
  const moss = box("#mosswake");
  const rust = box("#rustfall");
  const atHalt = box("#consist.at-halt");
  const home = box("#consist.home");
  const atMoss = box("#consist.at-mosswake");
  assert.equal(overlap(halt, moss), false);
  assert.equal(overlap(halt, rust), false);
  assert.equal(overlap(moss, rust), false);
  assert.equal(overlap(halt, atHalt), false);
  assert.equal(overlap(halt, home), false);
  assert.equal(overlap(moss, atHalt), false);
  assert.equal(overlap(moss, atMoss), false);
  assert.equal(overlap(rust, atMoss), false);
});

test("kill: the span and the gap are scenery, not pads", () => {
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="span"/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="gap"/);
  assert.match(SIT_HTML, /id="span"[^>]*aria-hidden="true"/);
  assert.match(SIT_HTML, /id="gap"[^>]*aria-hidden="true"/);
  assert.match(rule("#span"), /pointer-events:\s*none/);
  assert.match(rule("#gap"), /pointer-events:\s*none/);
});

test("kill: Foundry does Heat look, not Air — Halt ground already stepped, map unmoved", () => {
  const h = walk("S-P-");
  assert.equal(h.b.heatStep, 1);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.map.left, 42, "the map did not advance");
  const ground = rule("#halt-ground");
  assert.match(ground, /#5a3820|#e87828|#f09030|soil|ember|molten|warm/);
  const gap = rule("#gap");
  assert.match(gap, /left:\s*42%/, "the map's left is typed once");
  assert.match(gap, /pointer-events:\s*none/, "the map is not a pad");
});

test("after a sit the tells stand on the diorama — on either ending", () => {
  for (const line of ["S-C", "S-P-"]) {
    const h = walk(line);
    assert.equal(h.b.lampLit, true, line);
    assert.equal(h.b.haltHolds, true, line);
    assert.equal(h.b.foundry, true, line);
    assert.equal(h.b.herbsInLarder, true, line);
    assert.equal(h.b.armed, true, line);
    assert.equal(h.b.stopped, true, line);
  }
  assert.equal(walk("S-C").b.remembered, true);
  assert.equal(walk("S-P-").b.remembered, false);
  assert.match(SIT_HTML, /id="halt"/);
  assert.match(SIT_HTML, /id="mosswake"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="rustfall"/);
  assert.match(SIT_HTML, /id="span"/);
  assert.match(SIT_HTML, /classList\.toggle\("hauled"/);
  assert.match(SIT_HTML, /classList\.toggle\("remembered"/);
  assert.match(SIT_HTML, /consistAt === "mosswake"/);
});

test("wanted after a sit: a choice, and a reason — the two branches read differently on the tiles", () => {
  const fork = walk("S-").b;
  assert.equal(fork.notice("mosswake").canDo, COLLECT_FACE);
  assert.equal(fork.notice("consist").canDo, PRESS_FACE);
  assert.equal(fork.notice("consist").blocked, COST_LINE);
  assert.equal(walk("S-C").b.notice("mosswake").writing, BANKED_LINE);
  assert.equal(walk("S-P-").b.notice("consist").writing, COLD_LINE);
  assert.equal(walk("S-P+").b.notice("consist").writing, "The consist is home. The haul is on it.");
});

test("hub lists the sibling and does not rewrite other boards' hub copy", () => {
  const hub = fs.readFileSync(path.join(ROOT, "public/index.html"), "utf8");
  assert.match(hub, /href="\/two-ways-from-here\/"/);
  assert.match(hub, /href="\/dice-at-the-places\/"/);
  assert.match(hub, /href="\/they-remember\/"/);
  assert.match(hub, /href="\/herbs-larder\/"/);
  assert.match(hub, /href="\/mosswake-loop\/"/);
  assert.match(hub, /href="\/dawnspur-halt\/"/);
  assert.match(hub, /The dice come to the places\. You tap Mosswake; the tap is the send; the run can come home empty/);
  assert.match(hub, /The larder\. The run feeds the place\. Put them up/);
  assert.match(hub, /The line\. A promise\. One SEND, one run, home she comes/);
  assert.match(hub, /Come home\. The walk\. One live can-do/);
  assert.match(hub, /People remember who showed up/);
  assert.match(hub, /Two Ways from Here \(CFD-210\)/);
});

test("protect the load-bearing line — People remember who showed up — after Collect, never after a cold stop", () => {
  const LINE = BANKED_LINE;
  const h = makeBoard();
  assert.notEqual(h.b.notice("mosswake").writing, LINE);
  walk("S-", h);
  assert.notEqual(h.b.notice("mosswake").writing, LINE);
  walk("C", h);
  assert.equal(h.b.notice("mosswake").writing, LINE);
  assert.doesNotMatch(h.b.notice("mosswake").writing, /that's Favor|That's Favor/i);
  const cold = walk("S-P-").b;
  for (const p of PLACES) assert.notEqual(cold.notice(p).writing, LINE, p + " after a cold stop");
  const flight = walk("S-P").b;
  assert.notEqual(flight.notice("mosswake").writing, LINE);
  const won = walk("S-P+").b;
  assert.notEqual(won.notice("mosswake").writing, LINE, "the ending was not spent — nothing to remember yet");
});

test("notices name the place — Halt, Mosswake, the consist, Rustfall", () => {
  const b = makeBoard().b;
  assert.match(b.notice("halt").writing, /The Halt holds/);
  assert.equal(b.notice("mosswake").writing, "Mosswake. A neighbor again.");
  assert.match(b.notice("consist").writing, /consist is home/);
  assert.match(b.notice("rustfall").writing, /Rustfall/);
  assert.match(SIT_HTML, /aria-label="the Halt"/);
  assert.match(SIT_HTML, /aria-label="Mosswake"/);
  assert.match(SIT_HTML, /aria-label="Rustfall"/);
  const cold = walk("S-P-").b;
  assert.match(cold.notice("halt").writing, /^The Halt holds/);
  assert.match(cold.notice("mosswake").writing, /^Mosswake\./);
  assert.match(cold.notice("rustfall").writing, /^Rustfall/);
});

test("the diorama is the places, not a beige HUD strip with a desk", () => {
  assert.match(SIT_HTML, /id="halt"/);
  assert.match(SIT_HTML, /id="mosswake"/);
  assert.match(SIT_HTML, /id="span"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="gap"/);
  assert.match(SIT_HTML, /id="notice"/);
  assert.doesNotMatch(SIT_HTML, /id="ladder"|id="cards"|THE DESK/);
});

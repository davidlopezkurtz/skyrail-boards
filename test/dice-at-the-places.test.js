"use strict";

// CFD-209 — C12 — The dice come to the places.
// Spec: docs/cfd-209-beat.md (SIGNED — David, 2026-08-31).
// One NEW system: a tap at a place can fail. Sibling /dice-at-the-places/.
// Not a recut of they-remember, herbs-larder, mosswake, halt, site, storm,
// /dawnspur-line/, or /dawnspur-dispatch/. Every Kill line expressible as
// a test is a test. The player must meet a run that does not work.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Dice = require("../sit/dice-at-the-places/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/sim.js"), "utf8");
const SIM_CODE = SIT_SIM.replace(/\/\/.*$/gm, "");
const HTML_CODE = SIT_HTML.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const BOARD = HTML_CODE + "\n" + SIM_CODE;

const OPENING_MARKS = 3;
const MOSS_CHANCE = 0.64;
const MOSS_PERCENT = 64;
const MOSS_PAYS = 14;
const MOSS_STAKE = 2;

const PIN = {
  rememberIndex: "acbf4304c3cabd22a8d7ff95cd72a5b09aa939416c66805e7f31651f07c78cbd",
  rememberSim: "a3345903c01ea506295c3e1a3c442bf1973b0d551167a2394555579c756d542e",
  larderIndex: "676587bce8b3629ce8f8c64d03f78a722b0479bec53c655413067d2c61f7eb90",
  larderSim: "76c886b928bc2b4758362331b1880ff0703d034781aee3137d5c895a8d4e6811",
  mossIndex: "6c30179c609569c7944e4e812a7a06a2f12ff0cc09c1772088925d9d5e01d1fb",
  mossSim: "f5407bca93deec06ca4944b475e42cd86bd6c75d329db421decebabcbb661679",
  haltIndex: "b5a56a146b548747a5ecfce9b253e56e0bea89f47557328a57205ddfd56ab5ef",
  haltSim: "6eb957e790c90c6702f2b8cc45bb6b9081b6b092816498b32df4e1b2b3dc07b4",
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

function makeBoard(opts) {
  const ctl = { next: 0, calls: 0 };
  const o = {
    fresh: true,
    roll: function () { ctl.calls += 1; return ctl.next; },
  };
  if (opts && Number.isInteger(opts.marks)) o.marks = opts.marks;
  return { b: Dice.createBoard(o), ctl };
}

function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "S") ok = h.b.commitSend();
    else if (ch === "+") { h.ctl.next = 0; ok = h.b.commitHome(); }
    else if (ch === "-") { h.ctl.next = 1; ok = h.b.commitHome(); }
    else if (ch === "C") ok = h.b.commitCollect();
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}

function canDos(b) {
  return b.places().map((p) => b.notice(p)).filter((n) => n && n.canDo);
}

function frames() {
  return [
    { name: "open", h: makeBoard() },
    { name: "sent", h: walk("S") },
    { name: "home-paid", h: walk("S+") },
    { name: "home-short", h: walk("S-") },
    { name: "paid-then-sent", h: walk("S+S") },
    { name: "collected", h: walk("S-C") },
  ];
}

// ---------------------------------------------------------------- guards

test("guard: live pins including PASSED they-remember and the eight Seat pins are unchanged at HEAD", () => {
  const pins = {
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

test("this sitting writes no bytes under any pinned board directory", () => {
  const dirty = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT }).toString("utf8");
  const lines = dirty.split("\n").filter(Boolean);
  const foreign = lines.filter((l) => {
    const p = l.slice(3).trim();
    return (
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

test("deploy copy public/dice-at-the-places is byte-identical to sit/dice-at-the-places", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/dice-at-the-places")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/dice-at-the-places")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/dice-at-the-places/" + f)), sha256(raw("sit/dice-at-the-places/" + f)),
      "sit/public drift: " + f);
  }
});

test("sit hashes === public hashes for this board", () => {
  const sitIndex = sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/index.html")));
  const pubIndex = sha256(fs.readFileSync(path.join(ROOT, "public/dice-at-the-places/index.html")));
  const sitSim = sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/sim.js")));
  const pubSim = sha256(fs.readFileSync(path.join(ROOT, "public/dice-at-the-places/sim.js")));
  assert.equal(sitIndex, pubIndex, "index.html sit !== public");
  assert.equal(sitSim, pubSim, "sim.js sit !== public");
});

test("MANIFEST.txt records the shipped hashes, and names the boards left standing", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dice-at-the-places/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of [
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
});

test("the board ships three files and reaches for nothing off itself", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/dice-at-the-places")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link |@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|DawnspurStorm|DawnspurSite|DawnspurHalt|MosswakeLoop|HerbsLarder|TheyRemember|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|dawnspur-storm|dawnspur-site|dawnspur-halt|mosswake-loop|herbs-larder|they-remember|convoy-stop/,
    "no other board's module or path is named — the lineage lock");
});

test("the signed CFD-209 beat is the brief", () => {
  const beat = fs.readFileSync(path.join(ROOT, "docs/cfd-209-beat.md"), "utf8");
  assert.match(beat, /SIGNED — David, 2026-08-31/);
  assert.match(beat, /\/dice-at-the-places\//);
  assert.match(beat, /a tap at a place can fail/);
  assert.match(beat, /the desk deleted as a surface/i);
  assert.match(beat, /max live can-do = 1/);
  assert.match(beat, /The player must meet a run that does not work/);
  assert.match(beat, /s\.marks = MUSEUM_MARKS/);
  assert.match(beat, /One map/);
  assert.match(beat, /One consist/);
  assert.match(beat, /home but not stowed/);
  assert.match(beat, /Ask: What happened/);
  assert.match(beat, /9a305653/);
  assert.match(beat, /\/they-remember\//);
  assert.match(beat, /Weather/);
  assert.match(beat, /id="cards"/);
});

// ------------------------------------------------------------ the opening

test("kill: opening is the desk float on a finished city; one live SEND at Mosswake", () => {
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
  assert.equal(b.posted, null);
  assert.deepEqual(b.places(), ["halt", "mosswake", "consist", "rustfall"]);
  assert.equal(b.canSend(), true);
  assert.equal(b.canHome(), false);
  assert.equal(b.canCollect(), false);
  assert.equal(b.liveCanDo().place, "mosswake");
  assert.equal(b.liveCanDo().verb, "send");
  assert.equal(b.liveCanDo().canDo, "SEND. " + MOSS_PERCENT + ".");
  assert.deepEqual(canDos(b).map((n) => n.place), ["mosswake"]);
  assert.deepEqual(b.map, { left: 42, width: 16 });
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
  const after = walk("S-C");
  assert.deepEqual(after.b.map, { left: 42, width: 16 });
});

test("kill: one consist — consistAt only; inbound and landed do not exist", () => {
  const b = makeBoard().b;
  assert.equal(b.consistAt, "halt");
  assert.equal(typeof b.inbound, "undefined");
  assert.equal(typeof b.landed, "undefined");
  assert.doesNotMatch(SIM_CODE, /inbound|landed|commitLand|canLand/);
});

test("one consist: SEND writes consistAt to mosswake; home writes it to halt", () => {
  const h = makeBoard();
  assert.equal(h.b.consistAt, "halt");
  walk("S", h);
  assert.equal(h.b.consistAt, "mosswake");
  walk("-", h);
  assert.equal(h.b.consistAt, "halt");
  const paid = walk("S+");
  assert.equal(paid.b.consistAt, "halt");
});

// ------------------------------------------ corridor: max live can-do = 1

test("kill: more than one live can-do in any reachable state — enumerate notice() at every place at every frame", () => {
  for (const frame of frames()) {
    const lives = canDos(frame.h.b);
    assert.ok(lives.length <= 1, frame.name + " has " + lives.length + " live can-dos: " +
      JSON.stringify(lives.map((n) => n.place + ":" + n.canDo)));
    const live = frame.h.b.liveCanDo();
    if (lives.length === 0) {
      assert.equal(live, null, frame.name + " liveCanDo not null when none live");
    } else {
      assert.equal(live.place, lives[0].place);
      assert.equal(live.canDo, lives[0].canDo);
    }
  }
});

test("kill: two or more places are live at once, in any state, for any reason", () => {
  for (const frame of frames()) {
    assert.equal(canDos(frame.h.b).length <= 1, true, frame.name);
  }
});

test("the corridor walks: SEND at Mosswake, then Home on the consist, then Collect after a short run", () => {
  const open = makeBoard().b;
  assert.equal(open.liveCanDo().place, "mosswake");
  assert.equal(open.liveCanDo().verb, "send");
  const sent = walk("S").b;
  assert.equal(sent.liveCanDo().place, "consist");
  assert.equal(sent.liveCanDo().verb, "home");
  const short = walk("S-").b;
  assert.equal(short.liveCanDo().place, "mosswake");
  assert.equal(short.liveCanDo().verb, "collect");
  const done = walk("S-C").b;
  assert.equal(done.liveCanDo(), null);
  assert.deepEqual(canDos(done), []);
});

// ------------------------------------------ the one new system: a tap can fail

test("the chance is on the live face before the tap, and the number shown is the number rolled", () => {
  const h = makeBoard();
  const n = h.b.notice("mosswake");
  assert.equal(n.canDo, "SEND. " + MOSS_PERCENT + ".");
  assert.equal(n.chance, MOSS_CHANCE);
  assert.equal(n.percent, MOSS_PERCENT);
  assert.match(n.canDo, new RegExp(String(n.percent)));
  walk("S", h);
  const home = h.b.notice("consist");
  assert.equal(home.canDo, "Home she comes. " + MOSS_PERCENT + ".");
  assert.equal(home.chance, n.chance);
  assert.equal(home.percent, n.percent);
  h.ctl.next = n.chance;
  assert.equal(h.b.commitHome(), true);
  assert.equal(h.b.haulOnConsist, false, "draw === chance is a miss — rolled against the exact chance, not the percent");
  assert.equal(h.b.armed, true);
});

test("kill: the die is thrown against the EXACT chance, never against the rounded percent", () => {
  const h = makeBoard();
  walk("S", h);
  assert.equal(h.b.notice("consist").chance, MOSS_CHANCE);
  h.ctl.next = MOSS_CHANCE - 0.0001;
  assert.ok(h.b.commitHome());
  assert.equal(h.b.haulOnConsist, true);
  assert.equal(h.b.armed, false);
});

test("a paid run banks the haul on the consist — home but not stowed", () => {
  const h = walk("S+");
  assert.equal(h.b.consistAt, "halt");
  assert.equal(h.b.haulOnConsist, true, "C9 emptied the consist; this board keeps the haul on it");
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS);
  assert.equal(h.b.armed, false);
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.record.cargoesBanked, 1);
  assert.equal(h.b.record.runsTurnedBack, 0);
  assert.match(h.b.notice("consist").writing, /haul is on it/);
  assert.equal(h.b.liveCanDo().verb, "send");
});

test("a short run loses the haul, names it, and does not end the sitting", () => {
  const h = walk("S-");
  assert.equal(h.b.consistAt, "halt");
  assert.equal(h.b.haulOnConsist, false);
  assert.equal(h.b.armed, true);
  assert.equal(h.b.stopped, false, "a failed run does not end the sitting");
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE);
  assert.equal(h.b.herbsInLarder, true, "the larder is never the stake");
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.haltHolds, true);
  assert.equal(h.b.remembered, false);
  assert.equal(h.b.record.runsTurnedBack, 1);
  assert.equal(h.b.record.marksLost, MOSS_STAKE);
  assert.match(h.b.runSentence, /The run came home short and the larder covered it/);
  assert.match(h.b.notice("consist").writing, /The run came home short and the larder covered it/);
  assert.equal(h.b.canSend(), false, "the corridor walks to Collect, not a re-send");
  assert.equal(h.b.canCollect(), true);
});

test("kill: a failed run refunds, re-rolls, offers a consolation, or ends the sitting", () => {
  const h = walk("S-");
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.marks, OPENING_MARKS - MOSS_STAKE, "no refund");
  assert.equal(h.b.canHome(), false, "no re-roll of the same run");
  assert.equal(h.b.commitHome(), false);
  assert.doesNotMatch(h.b.runSentence || "", /consolation|refund|try again|re-roll/i);
  assert.doesNotMatch(SIM_CODE, /refund|consolation|reroll|re-roll/i);
});

test("kill: a failed run costs the home, the lamp, the larder, or Favor already earned", () => {
  const h = walk("S-");
  assert.equal(h.b.haltHolds, true);
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.foodInTown, true);
  walk("C", h);
  assert.equal(h.b.haltHolds, true);
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.remembered, true);
});

// ------------------------------------------ the player must meet a short run

test("THE PLAYER MUST MEET A RUN THAT DOES NOT WORK — a success-only walk never stops", () => {
  const paid = walk("S+");
  assert.equal(paid.b.stopped, false);
  assert.equal(paid.b.armed, false);
  assert.equal(paid.b.canCollect(), false);
  assert.equal(paid.b.liveCanDo().verb, "send");
  const again = walk("S+", paid);
  assert.equal(again.b.stopped, false);
  assert.equal(again.b.record.runsTurnedBack, 0);
  assert.equal(again.b.record.cargoesBanked, 2);
  assert.equal(again.b.canCollect(), false);
});

test("the finishing walk names a short run — Collect fires only when armed", () => {
  const h = walk("S-C");
  assert.equal(h.b.armed, true);
  assert.equal(h.b.stopped, true);
  assert.equal(h.b.collected, true);
  assert.equal(h.b.remembered, true);
  assert.equal(h.b.endSentence, "The run came home short and the larder covered it.");
  assert.equal(h.b.notice("mosswake").writing, "People remember who showed up.");
  assert.equal(h.b.record.runsTurnedBack, 1);
  assert.ok(h.b.record.runsTurnedBack >= 1, "the sitting that stops has lost a haul");
});

test("kill: only the armed stop survives — Collect does not stop an unarmed board", () => {
  const b = makeBoard().b;
  assert.equal(b.canCollect(), false);
  assert.equal(b.commitCollect(), false);
  const paid = walk("S+");
  assert.equal(paid.b.canCollect(), false);
  assert.equal(paid.b.commitCollect(), false);
  assert.equal(paid.b.stopped, false);
});

test("kill: four inherited stops do not fire — only Collect-while-armed writes stopped", () => {
  const send = walk("S");
  assert.equal(send.b.stopped, false, "SEND does not stop");
  const paid = walk("S+");
  assert.equal(paid.b.stopped, false, "a paid home does not stop");
  const short = walk("S-");
  assert.equal(short.b.stopped, false, "a short home does not stop");
  const writes = SIT_SIM.match(/s\.stopped\s*=\s*true/g) || [];
  assert.equal(writes.length, 1, "only one stopped write may survive: " + writes.length);
  assert.match(SIT_SIM, /if \(s\.armed\) s\.stopped = true/);
  assert.doesNotMatch(SIM_CODE, /chartered && topped/);
});

// ------------------------------------------ marks increment, not assignment

test("Collect increments marks — it does not assign them (the they-remember defect)", () => {
  assert.match(SIT_SIM, /s\.marks \+= MUSEUM_MARKS/);
  assert.doesNotMatch(SIM_CODE, /s\.marks\s*=\s*MUSEUM_MARKS/);
  const from3 = walk("S-C");
  assert.equal(from3.b.marks, OPENING_MARKS - MOSS_STAKE + 1, "open=3, stake 2, increment 1 → 2");
  const from7 = walk("S-C", makeBoard({ marks: 7 }));
  assert.equal(from7.b.marks, 7 - MOSS_STAKE + 1, "open=7 should be 6, not assigned to 1");
  assert.notEqual(from7.b.marks, 1);
});

test("the desk float survives a paid run and is not overwritten on Collect", () => {
  const paid = walk("S+");
  assert.equal(paid.b.marks, OPENING_MARKS - MOSS_STAKE + MOSS_PAYS);
  const short = walk("S-");
  walk("C", short);
  assert.ok(short.b.marks !== 1 || OPENING_MARKS - MOSS_STAKE + 1 === 1);
  assert.equal(short.b.marks, OPENING_MARKS - MOSS_STAKE + 1);
});

// ------------------------------------------ notices / commitPosted

test("tapping a place posts its notice — four places, each with a notice", () => {
  const b = makeBoard().b;
  assert.equal(b.postedNotice(), null);
  for (const place of b.places()) {
    assert.equal(b.postNotice(place), true);
    const n = b.postedNotice();
    assert.ok(n, place + " posted no notice");
    assert.equal(n.place, place);
    assert.ok(n.writing, place + " notice has no writing");
  }
  assert.equal(b.postNotice("span"), false);
  assert.equal(b.postNotice("gap"), false);
  assert.equal(b.postNotice("rim"), false);
  assert.equal(b.postNotice("cards"), false);
});

test("dead jobs stay buttons and still post blocked or in-process notices", () => {
  const h = makeBoard();
  for (const place of h.b.places()) {
    assert.equal(h.b.postNotice(place), true);
    const n = h.b.postedNotice();
    assert.ok(n.writing);
    if (place !== "mosswake") {
      assert.equal(n.canDo, null);
      assert.ok(n.blocked || n.inProcess, place + " dead job posted no blocked/in-process");
    }
  }
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

test("Rustfall is dark dressing — no chance, no send, raiders hold the yard road", () => {
  const n = makeBoard().b.notice("rustfall");
  assert.equal(n.canDo, null);
  assert.equal(n.chance, null);
  assert.equal(n.percent, null);
  assert.equal(n.blocked, "Raiders hold the yard road.");
  assert.equal(n.writing, "Rustfall. Dark.");
  for (const frame of frames()) {
    const r = frame.h.b.notice("rustfall");
    assert.equal(r.canDo, null, frame.name + " rustfall lit");
    assert.equal(r.percent, null);
  }
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

test("kill: no UP, TEND, weather, Ranger, trim, crews, Sera", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitUp, "undefined");
  assert.equal(typeof b.commitTend, "undefined");
  assert.equal(typeof b.commitMuster, "undefined");
  assert.equal(typeof b.roster, "undefined");
  assert.doesNotMatch(SIM_CODE, /sera|cairn|crews|league|frontier|ranger|trim|stormbird/i);
  assert.doesNotMatch(HTML_CODE, /Sera|Cairn|Crews|League|Ranger|TRIM/i);
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

test("kill: wait is inert — nothing moves with wall time", () => {
  const h = makeBoard();
  const before = {
    marks: h.b.marks, consistAt: h.b.consistAt, armed: h.b.armed, haulOnConsist: h.b.haulOnConsist,
  };
  assert.equal(h.b.wait(), false);
  walk(".", h);
  assert.equal(h.b.marks, before.marks);
  assert.equal(h.b.consistAt, before.consistAt);
  assert.equal(h.b.armed, before.armed);
  assert.equal(h.b.haulOnConsist, before.haulOnConsist);
  const out = walk("S");
  assert.equal(out.b.wait(), false);
  assert.equal(out.b.consistAt, "mosswake");
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\./);
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./);
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

test("kill: no hopping glow, no outline hunt, no animation", () => {
  assert.doesNotMatch(cssOf(), /@keyframes|animation:/);
  const outlines = cssOf().match(/[^{}]*\{[^}]*outline:[^}]*\}/g) || [];
  assert.deepEqual(outlines, [], "no outline glow: " + JSON.stringify(outlines));
  assert.doesNotMatch(SIT_HTML, /<button[^>]*\bdisabled\b/);
});

test("kill: SEND is not a strip of pads away from the places", () => {
  assert.doesNotMatch(SIT_HTML, /id="pads"|id="send"|id="home"|class="pad"/);
  assert.doesNotMatch(cssOf(), /button\.pad|#pads\b/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIM_CODE, /SEND\. /);
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
  const h = walk("S-C");
  assert.equal(h.b.heatStep, 1);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.map.left, 42, "the map did not advance");
  const ground = rule("#halt-ground");
  assert.match(ground, /#5a3820|#e87828|#f09030|soil|ember|molten|warm/);
  const gap = rule("#gap");
  assert.match(gap, /left:\s*42%/, "the map's left is typed once");
  assert.match(gap, /pointer-events:\s*none/, "the map is not a pad");
});

test("after a sit the tells stand on the diorama", () => {
  const h = walk("S-C");
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.haltHolds, true);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.collected, true);
  assert.equal(h.b.remembered, true);
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.armed, true);
  assert.match(SIT_HTML, /id="halt"/);
  assert.match(SIT_HTML, /id="mosswake"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="rustfall"/);
  assert.match(SIT_HTML, /id="span"/);
  assert.match(SIT_HTML, /classList\.toggle\("hauled"/);
  assert.match(SIT_HTML, /classList\.toggle\("remembered"/);
  assert.match(SIT_HTML, /consistAt === "mosswake"/);
});

test("wanted after a sit: the run came home short and the larder covered it", () => {
  const h = walk("S-C");
  assert.match(h.b.endSentence, /The run came home short and the larder covered it/);
  assert.equal(h.b.notice("mosswake").writing, "People remember who showed up.");
  assert.equal(h.b.herbsInLarder, true, "what absorbed it");
  assert.equal(h.b.record.runsTurnedBack, 1);
});

test("hub lists the sibling and does not rewrite other boards' hub copy", () => {
  const hub = fs.readFileSync(path.join(ROOT, "public/index.html"), "utf8");
  assert.match(hub, /href="\/dice-at-the-places\/"/);
  assert.match(hub, /href="\/they-remember\/"/);
  assert.match(hub, /href="\/herbs-larder\/"/);
  assert.match(hub, /href="\/mosswake-loop\/"/);
  assert.match(hub, /href="\/dawnspur-halt\/"/);
  assert.match(hub, /The larder\. The run feeds the place\. Put them up/);
  assert.match(hub, /The line\. A promise\. One SEND, one run, home she comes/);
  assert.match(hub, /Come home\. The walk\. One live can-do/);
  assert.match(hub, /People remember who showed up/);
});

test("protect the load-bearing line — People remember who showed up — after Collect, not before", () => {
  const LINE = "People remember who showed up.";
  const h = makeBoard();
  assert.notEqual(h.b.notice("mosswake").writing, LINE);
  walk("S-", h);
  assert.notEqual(h.b.notice("mosswake").writing, LINE);
  walk("C", h);
  assert.equal(h.b.notice("mosswake").writing, LINE);
  assert.doesNotMatch(h.b.notice("mosswake").writing, /that's Favor|That's Favor/i);
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

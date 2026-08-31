"use strict";

// CFD-207 — Herbs in the Larder — the run feeds the place.
// Spec: docs/cfd-207-beat.md (SIGNED — David, 2026-08-30, Superheavy named it).
// One NEW system: the larder. One live can-do: Put them up. Sibling
// /herbs-larder/. Not a recut of halt, mosswake, site, storm,
// /dawnspur-line/, or /dawnspur-dispatch/. Every Kill line expressible
// as a test is a test.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Larder = require("../sit/herbs-larder/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/herbs-larder/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/herbs-larder/sim.js"), "utf8");
const SIM_CODE = SIT_SIM.replace(/\/\/.*$/gm, "");
const HTML_CODE = SIT_HTML.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const BOARD = HTML_CODE + "\n" + SIM_CODE;
const HALT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/index.html"), "utf8");
const HALT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js"), "utf8");
const HALT_SIM_CODE = HALT_SIM.replace(/\/\/.*$/gm, "");
const HALT_HTML_CODE = HALT_HTML.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const MOSS_HTML = fs.readFileSync(path.join(ROOT, "sit/mosswake-loop/index.html"), "utf8");
const MOSS_SIM = fs.readFileSync(path.join(ROOT, "sit/mosswake-loop/sim.js"), "utf8");

const OPENING_MARKS = 0;

const PIN = {
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
  const o = { fresh: true };
  if (opts && Number.isInteger(opts.marks)) o.marks = opts.marks;
  return { b: Larder.createBoard(o) };
}
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "P") ok = h.b.commitPutUp();
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}
function canDos(b) {
  return b.places().map((p) => b.notice(p)).filter((n) => n.canDo);
}

// ---------------------------------------------------------------- guards

test("guard: live pins including PASSED mosswake and halt are unchanged at HEAD", () => {
  const pins = {
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

test("kill: Mosswake pin files unmoved (6c30179c / f5407bca)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/mosswake-loop/index.html"))), PIN.mossIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/mosswake-loop/index.html"))), PIN.mossIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/mosswake-loop/sim.js"))), PIN.mossSim);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/mosswake-loop/sim.js"))), PIN.mossSim);
  assert.equal(PIN.mossIndex.slice(0, 8), "6c30179c");
  assert.equal(PIN.mossSim.slice(0, 8), "f5407bca");
  assert.equal(MOSS_HTML, fs.readFileSync(path.join(ROOT, "public/mosswake-loop/index.html"), "utf8"));
  assert.equal(MOSS_SIM, fs.readFileSync(path.join(ROOT, "public/mosswake-loop/sim.js"), "utf8"));
});

test("kill: Halt pin files unmoved (b5a56a14 / 6eb957e7)", () => {
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/index.html"))), PIN.haltIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dawnspur-halt/index.html"))), PIN.haltIndex);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js"))), PIN.haltSim);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "public/dawnspur-halt/sim.js"))), PIN.haltSim);
  assert.equal(PIN.haltIndex.slice(0, 8), "b5a56a14");
  assert.equal(PIN.haltSim.slice(0, 8), "6eb957e7");
});

test("kill: Halt SEND was not bolted onto /dawnspur-halt/", () => {
  assert.doesNotMatch(HALT_SIM_CODE, /commitSend|canSend/);
  assert.doesNotMatch(HALT_HTML_CODE, /\bSEND\b/);
  assert.doesNotMatch(HALT_HTML, /id="send"|data-route/i);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js"))), PIN.haltSim);
  assert.equal(sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/index.html"))), PIN.haltIndex);
});

test("deploy copy public/herbs-larder is byte-identical to sit/herbs-larder", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/herbs-larder")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/herbs-larder")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/herbs-larder/" + f)), sha256(raw("sit/herbs-larder/" + f)),
      "sit/public drift: " + f);
  }
});

test("sit hashes === public hashes for this board", () => {
  const sitIndex = sha256(fs.readFileSync(path.join(ROOT, "sit/herbs-larder/index.html")));
  const pubIndex = sha256(fs.readFileSync(path.join(ROOT, "public/herbs-larder/index.html")));
  const sitSim = sha256(fs.readFileSync(path.join(ROOT, "sit/herbs-larder/sim.js")));
  const pubSim = sha256(fs.readFileSync(path.join(ROOT, "public/herbs-larder/sim.js")));
  assert.equal(sitIndex, pubIndex, "index.html sit !== public");
  assert.equal(sitSim, pubSim, "sim.js sit !== public");
});

test("MANIFEST.txt records the shipped hashes, and names the boards left standing", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/herbs-larder/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/herbs-larder/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of [
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
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/herbs-larder")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link |@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|DawnspurStorm|DawnspurSite|DawnspurHalt|MosswakeLoop|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|dawnspur-storm|dawnspur-site|dawnspur-halt|mosswake-loop|convoy-stop/,
    "no other board's module or path is named — the lineage lock");
});

test("the signed herbs-larder beat is the brief", () => {
  const beat = fs.readFileSync(path.join(ROOT, "docs/cfd-207-beat.md"), "utf8");
  assert.match(beat, /SIGNED — David, 2026-08-30, Superheavy named it/);
  assert.match(beat, /the larder/);
  assert.match(beat, /\/herbs-larder\//);
  assert.match(beat, /Put them up/);
  assert.match(beat, /Ask: What happened/);
  assert.match(beat, /Do not recut/);
  assert.match(beat, /\/dawnspur-halt\//);
  assert.match(beat, /\/mosswake-loop\//);
  assert.match(beat, /\/dawnspur-line\//);
  assert.match(beat, /\/dawnspur-dispatch\//);
  assert.match(beat, /grey square/i);
  assert.match(beat, /Auto SEND/);
  assert.match(beat, /SEND on this board/);
  assert.match(beat, /the reason it matters/);
  assert.match(beat, /Mara VO/);
  assert.match(beat, /Tutorial Script Beat 7/);
  assert.match(beat, /9a305653/);
  assert.match(beat, /a neighbor again/);
  assert.match(beat, /Halt holds/);
  assert.match(beat, /Marks bump as the sit/);
  assert.match(beat, /Do not cite World Bible §12/);
});

// ------------------------------------------------------------ the opening

test("kill: opening is consist home with herbs; only Put them up is live; no SEND", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, OPENING_MARKS);
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
  assert.equal(b.herbsOnConsist, true);
  assert.equal(b.herbsInLarder, false);
  assert.equal(b.neighborAgain, false);
  assert.equal(b.consistAt, "halt");
  assert.equal(b.promiseKept, true);
  assert.equal(b.putUp, false);
  assert.equal(b.stopped, false);
  assert.equal(b.posted, null);
  assert.deepEqual(b.places(), ["halt", "mosswake", "consist"]);
  assert.equal(b.canPutUp(), true);
  assert.equal(typeof b.canSend, "undefined");
  assert.equal(typeof b.commitSend, "undefined");
  assert.equal(typeof b.canHome, "undefined");
  assert.equal(typeof b.commitHome, "undefined");
  assert.equal(b.liveCanDo().place, "consist");
  assert.equal(b.liveCanDo().verb, "putup");
  assert.equal(b.liveCanDo().canDo, "Put them up.");
  assert.deepEqual(canDos(b).map((n) => n.place), ["consist"]);
  assert.equal(b.notice("halt").canDo, null);
  assert.equal(b.notice("mosswake").canDo, null);
  assert.doesNotMatch(SIM_CODE, /\bSEND\b|canSend|commitSend/);
  assert.doesNotMatch(HTML_CODE, /\bSEND\b/);
  assert.deepEqual(b.gap, { left: 42, width: 16 });
});

test("kill: the opening's marks are not settable from the board the thumb reaches", () => {
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*marks/, "the board hands in no balance");
  assert.match(SIT_HTML, /createBoard\(\{ fresh: true \}\)/, "the board opens fresh");
});

// -------------------------------------------------------- the larder

test("the larder: Put them up moves the herbs into Halt; Mosswake is a neighbor again", () => {
  const h = makeBoard();
  assert.equal(h.b.liveCanDo().canDo, "Put them up.");
  assert.equal(h.b.notice("halt").canDo, null);
  assert.equal(h.b.notice("mosswake").canDo, null);
  assert.match(h.b.notice("mosswake").blocked, /herbs already gone/);
  walk("P", h);
  assert.equal(h.b.putUp, true);
  assert.equal(h.b.herbsOnConsist, false);
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.neighborAgain, true);
  assert.equal(h.b.consistAt, "halt");
  assert.equal(h.b.stopped, true);
  assert.deepEqual(canDos(h.b), []);
  assert.equal(h.b.liveCanDo(), null);
  assert.match(h.b.notice("halt").writing, /Herbs in the larder/);
  assert.equal(h.b.notice("mosswake").writing, "Mosswake. A neighbor again.");
});

test("wanted after a sit: the herbs are in the Halt because the line ran, and Mosswake had a neighbor again", () => {
  const h = walk("P");
  assert.equal(h.b.herbsInLarder, true, "the herbs are in the Halt");
  assert.equal(h.b.promiseKept, true, "because the line ran");
  assert.equal(h.b.neighborAgain, true, "Mosswake had a neighbor again");
  assert.equal(h.b.haltHolds, true, "Halt is why they had somewhere to come");
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.herbsOnMoss, false);
  assert.match(h.b.notice("halt").writing, /Herbs in the larder/);
  assert.match(h.b.notice("mosswake").writing, /neighbor again/);
});

test("kill: a second Put them up refuses; no second can-do", () => {
  const h = walk("P");
  assert.equal(h.b.canPutUp(), false);
  assert.equal(h.b.commitPutUp(), false);
  assert.equal(h.b.liveCanDo(), null);
  assert.deepEqual(canDos(h.b), []);
});

test("dead jobs stay buttons and still post blocked or in-process notices", () => {
  const h = makeBoard();
  for (const place of h.b.places()) {
    assert.equal(h.b.postNotice(place), true);
    const n = h.b.postedNotice();
    assert.ok(n.writing);
    if (place !== "consist") {
      assert.equal(n.canDo, null);
      assert.ok(n.blocked || n.inProcess, place + " dead job posted no blocked/in-process");
    }
  }
  walk("P", h);
  for (const place of h.b.places()) {
    assert.equal(h.b.postNotice(place), true);
    assert.equal(h.b.postedNotice().canDo, null);
    assert.ok(h.b.postedNotice().writing);
  }
  assert.doesNotMatch(SIT_HTML, /function asButton|livePlace|createElement\(live/);
  assert.doesNotMatch(SIM_CODE, /livePlace/);
});

// -------------------------------------------------------- notices

test("tapping a place posts its notice — two nodes and the consist, each with a notice", () => {
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
});

test("Halt notice: holds; haul still on the consist; no SEND, no lamp, no SITE", () => {
  const n = makeBoard().b.notice("halt");
  assert.equal(n.writing, "The Halt holds. The haul is still on the consist.");
  assert.equal(n.canDo, null);
  assert.equal(n.verb, null);
  assert.equal(n.inProcess, "The Halt is awake.");
  assert.match(n.blocked, /does not light the lamp/);
  assert.match(n.blocked, /already holds/);
});

test("Mosswake notice walks quiet, then a neighbor again", () => {
  const h = makeBoard();
  const open = h.b.notice("mosswake");
  assert.equal(open.writing, "Mosswake. Quiet.");
  assert.equal(open.canDo, null);
  assert.match(open.blocked, /herbs already gone/);
  walk("P", h);
  const after = h.b.notice("mosswake");
  assert.equal(after.writing, "Mosswake. A neighbor again.");
  assert.equal(after.inProcess, "The run already came home.");
  assert.equal(after.canDo, null);
});

test("consist notice: Put them up, then the haul is up", () => {
  const h = makeBoard();
  const open = h.b.notice("consist");
  assert.equal(open.canDo, "Put them up.");
  assert.equal(open.verb, "putup");
  assert.match(open.writing, /consist is home/);
  assert.match(open.writing, /herbs are on it/);
  walk("P", h);
  const after = h.b.notice("consist");
  assert.equal(after.canDo, null);
  assert.equal(after.inProcess, "Home.");
  assert.equal(after.writing, "The consist is home. The haul is up.");
  assert.match(after.blocked, /place took the haul/);
});

test("commitPosted fires the posted notice's can-do and no other verb", () => {
  const h = makeBoard();
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("halt");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("mosswake");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("consist");
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.putUp, true);
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.stopped, true);
  assert.equal(h.b.commitPosted(), false);
});

test("the board paints the posted notice, not a lecture box", () => {
  assert.match(SIT_HTML, /id="notice"/);
  assert.match(SIT_HTML, /id="notice-now"/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIT_HTML, /id="notice-wait"/);
  assert.match(SIT_HTML, /board\.postNotice\("halt"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("mosswake"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("consist"\)/);
  assert.match(SIT_HTML, /if \(board\.commitPosted\(\)\) paint\(\)/);
  assert.match(SIT_HTML, /postedNotice\(\)/);
  assert.doesNotMatch(HTML_CODE, /Can do:|In process:|Blocked:/);
  assert.doesNotMatch(SIT_HTML, /id="say"|id="end"|id="told"/);
});

// ---------------------------------------------------------- Put them up / no SEND

test("Put them up spends nothing and does not bump marks", () => {
  const h = makeBoard();
  const marks = h.b.marks;
  assert.ok(h.b.commitPutUp());
  assert.equal(h.b.marks, marks);
  assert.equal(h.b.marks, OPENING_MARKS);
  assert.equal(h.b.herbsInLarder, true);
});

test("kill: auto SEND is impossible — this board has no SEND", () => {
  const create = SIT_SIM.match(/function createBoard\([\s\S]*?\n\}/);
  assert.ok(create, "createBoard found");
  assert.doesNotMatch(create[0], /commitSend|sent:\s*true|commitPutUp/, "createBoard does not write the send or the put-up");
  assert.doesNotMatch(SIM_CODE, /canSend|commitSend|\bSEND\b/);
  assert.doesNotMatch(HTML_CODE, /\bSEND\b|Home she comes/);
  assert.equal(typeof makeBoard().b.canSend, "undefined");
  assert.equal(typeof makeBoard().b.commitSend, "undefined");
});

test("kill: Put them up does not auto-fire from createBoard", () => {
  const b = makeBoard().b;
  assert.equal(b.putUp, false);
  assert.equal(b.herbsInLarder, false);
  assert.equal(b.canPutUp(), true);
  assert.equal(b.stopped, false);
});

test("kill: no Cloud Basin, no Halt-route send, no second Mosswake SEND", () => {
  assert.doesNotMatch(SIM_CODE, /cloud-basin|CLOUD|data-route|MUSTERS|muster/i);
  assert.doesNotMatch(HTML_CODE, /Cloud Basin|data-route|THE DESK|id="cards"|id="ladder"/);
  assert.doesNotMatch(SIT_HTML, /id="send"/);
  assert.doesNotMatch(SIM_CODE, /canSend|commitSend|canHome|commitHome/);
});

test("kill: this board does not copy halt's lamp / SITE / LAND / CAST walk", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitLight, "undefined");
  assert.equal(typeof b.commitSite, "undefined");
  assert.equal(typeof b.commitLand, "undefined");
  assert.equal(typeof b.commitCast, "undefined");
  assert.equal(typeof b.canLight, "undefined");
  assert.equal(typeof b.canSite, "undefined");
  assert.equal(typeof b.canLand, "undefined");
  assert.equal(typeof b.canCast, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitLight|commitSite|commitLand|commitCast|canLight|canSite|canLand|canCast/);
  assert.doesNotMatch(HTML_CODE, />SITE<|>LAND<|>CAST<|>Light it/);
});

// ------------------------------------------------ food CARRY / fuel / Favor

test("kill: no food CARRY — herbs are already on the consist", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitCarry, "undefined");
  assert.equal(b.herbsOnConsist, true);
  assert.equal(b.herbsOnMoss, false);
  assert.doesNotMatch(SIM_CODE, /commitCarry|canCarry|CARRY/);
  assert.doesNotMatch(HTML_CODE, /CARRY/);
});

test("kill: no UP, TEND, weather, Ranger, trim", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitUp, "undefined");
  assert.equal(typeof b.commitTend, "undefined");
  assert.equal(typeof b.commitMuster, "undefined");
  assert.doesNotMatch(SIM_CODE, /\bcommitUp\b|\bcommitTend\b|\bcommitMuster\b|\bcanTend\b|\bcanUp\b|\branger\b|\btrim\b|stormbird/i);
  assert.doesNotMatch(HTML_CODE, /\bTEND\b|RANGER|TRIM|stormbird/i);
});

test("kill: fuel is not a standing bill", () => {
  assert.doesNotMatch(SIM_CODE, /s\.fuel|commitFuel|canFuel|upkeep/);
  assert.doesNotMatch(HTML_CODE, /upkeep/i);
});

test("kill: no Favor meter, no new currency, no Marks bump as the sit", () => {
  assert.doesNotMatch(BOARD, /favor|Favour|FAVOR/i);
  assert.doesNotMatch(SIM_CODE, /s\.favor|s\.currency|glass\s*[:=]|s\.glass/);
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i);
  const h = makeBoard();
  assert.equal(h.b.marks, 0);
  walk("P", h);
  assert.equal(h.b.marks, 0);
});

test("kill: no second HUD line, panes are not a HUD line", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('id="hud"'), SIT_HTML.indexOf('id="strip"'));
  assert.doesNotMatch(hud, /pane|bill|food|glass|foundry|heat|favor|herb/i, "the HUD says none of it");
  assert.match(hud, /marks-line/, "the HUD is the one marks line");
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds one child — the marks line");
  assert.match(SIT_HTML, /marksLine\.textContent = board\.marks \+ \(board\.marks === 1 \? " mark" : " marks"\)/);
});

// ------------------------------------------ Foundry is Heat look, not Air+Heat

test("kill: Put them up does not move the gap", () => {
  const h = makeBoard();
  const before = h.b.gap;
  walk("P", h);
  assert.deepEqual(h.b.gap, before);
  assert.deepEqual(h.b.gap, { left: 42, width: 16 });
});

test("kill: Foundry does Heat look, not Air — Halt ground already stepped, rim/gap unmoved", () => {
  const h = walk("P");
  assert.equal(h.b.heatStep, 1);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.gap.left, 42, "the gap did not advance");
  const ground = rule("#halt-ground");
  assert.match(ground, /#5a3820|#e87828|#f09030|soil|ember|molten|warm/, "Halt ground reads as heat-as-terrain");
  const gap = rule("#gap");
  assert.match(gap, /left:\s*42%/, "the gap's left is typed once");
  assert.match(gap, /pointer-events:\s*none/, "the gap is not a pad");
});

test("kill: heat-as-terrain is look, not a write to the heat pin", () => {
  assert.doesNotMatch(BOARD, /dawnspur-heat|commitWarm|canWarm/);
  assert.equal(sha256(gitBlob("public/dawnspur-heat/sim.js")),
    "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
});

// ------------------------------------------ places, not grey bricks

test("kill: two nodes and the consist stay buttons — not scenery-as-divs", () => {
  const buttons = SIT_HTML.match(/<button\b[^>]*>/g) || [];
  const ids = buttons.map((b) => {
    const m = b.match(/id="([^"]+)"/);
    return m ? m[1] : "?";
  });
  assert.ok(ids.includes("halt"));
  assert.ok(ids.includes("mosswake"));
  assert.ok(ids.includes("consist"));
  assert.ok(ids.includes("notice-do"));
  assert.equal(ids.length, 4, "two nodes plus consist plus the notice can-do: " + JSON.stringify(ids));
  assert.doesNotMatch(SIT_HTML, /function asButton|livePlace|createElement\(live/);
});

test("kill: nodes read as places, not grey squares", () => {
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="globe"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="roof"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="glass"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="stack"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="hall"/);
  assert.match(SIT_HTML, /id="halt"[^>]*>[\s\S]*class="larder"/);
  assert.match(SIT_HTML, /id="mosswake"[^>]*>[\s\S]*class="roof"/);
  assert.match(SIT_HTML, /id="mosswake"[^>]*>[\s\S]*class="glass"/);
  assert.match(SIT_HTML, /id="consist"[^>]*>[\s\S]*class="engine"/);
  for (const sel of ["#halt", "#mosswake", "#consist"]) {
    assert.match(rule(sel), /background:\s*transparent/, sel + " root is not a filled brick");
  }
  assert.doesNotMatch(rule("#halt .globe"), /#(4[a-f0-9]{5}|5[a-f0-9]{5}|6[a-f0-9]{5}|7[a-f0-9]{5}|8[a-f0-9]{5}|9[a-f0-9]{5})\b/i);
  assert.match(rule("#halt .globe"), /#f09030|#e87828|#ff9020|molten|ember/);
  assert.match(rule("#halt .hall"), /#b05028|#d06028|#a04828/);
  assert.match(rule("#halt .glass"), /glass|rgba\(140,\s*210,\s*190/);
  assert.match(rule("#mosswake .glass"), /glass|rgba\(80,\s*140,\s*120/);
  assert.match(rule("#consist .engine"), /#5a3020|#e8a040/);
});

test("kill: no hopping glow, no outline hunt, no animation", () => {
  assert.doesNotMatch(cssOf(), /@keyframes|animation:/);
  const outlines = cssOf().match(/[^{}]*\{[^}]*outline:[^}]*\}/g) || [];
  assert.deepEqual(outlines, [], "no outline glow on buildings or pads: " + JSON.stringify(outlines));
  assert.doesNotMatch(SIT_HTML, /<button[^>]*\bdisabled\b/);
});

test("kill: Put them up is not a strip of pads away from the places", () => {
  assert.doesNotMatch(SIT_HTML, /id="pads"|id="send"|id="home"|class="pad"/);
  assert.doesNotMatch(HTML_CODE, />SEND<|>Home she comes<|>Put them up</);
  assert.doesNotMatch(cssOf(), /button\.pad|#pads\b/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIM_CODE, /canDo: "Put them up\."/);
});

test("kill: two nodes and the consist do not overlap", () => {
  const halt = box("#halt");
  const moss = box("#mosswake");
  const atHalt = box("#consist.at-halt");
  const home = box("#consist.home");
  assert.equal(overlap(halt, moss), false);
  assert.equal(overlap(halt, atHalt), false);
  assert.equal(overlap(halt, home), false);
  assert.equal(overlap(moss, atHalt), false);
});

test("kill: the span and the gap are scenery, not pads", () => {
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="span"/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="gap"/);
  assert.match(SIT_HTML, /id="span"[^>]*aria-hidden="true"/);
  assert.match(SIT_HTML, /id="gap"[^>]*aria-hidden="true"/);
  assert.match(rule("#span"), /pointer-events:\s*none/);
  assert.match(rule("#gap"), /pointer-events:\s*none/);
});

test("kill: Warehouse, Signal, Market, hall, second greenhouse are not this work", () => {
  assert.doesNotMatch(HTML_CODE, /WAREHOUSE|SIGNAL|MARKET|LEAGUE|postcard/i);
  assert.doesNotMatch(SIM_CODE, /warehouse|signal|market|league|postcard/);
  assert.doesNotMatch(SIT_HTML, /id="warehouse"|id="signal"|id="market"|id="hall"|id="greenhouse"/);
});

test("kill: no lecture, no help, no tutorial mode, no plaque, no Mara VO, no ?", () => {
  assert.doesNotMatch(HTML_CODE, /help|tutorial|plaque|citizen|interior|zoning|cutscene|overlay/i);
  assert.doesNotMatch(SIT_HTML, /id="help"|class="help"|>\?</);
  assert.doesNotMatch(SIM_CODE, /help|tutorial|plaque|citizen|Mara/i);
  assert.doesNotMatch(HTML_CODE, /the reason it matters/i);
  assert.doesNotMatch(SIM_CODE, /the reason it matters/i);
});

test("after a sit the tells stand on the diorama", () => {
  const h = walk("P");
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.haltHolds, true);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.putUp, true);
  assert.equal(h.b.herbsInLarder, true);
  assert.equal(h.b.neighborAgain, true);
  assert.match(SIT_HTML, /id="halt"/);
  assert.match(SIT_HTML, /id="mosswake"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="span"/);
  assert.match(SIT_HTML, /id="town-herbs"/);
  assert.match(SIT_HTML, /class="larder"/);
  assert.match(SIT_HTML, /id="halt-ground"/);
  assert.match(SIT_HTML, /classList\.toggle\("hauled"/);
  assert.match(SIT_HTML, /classList\.toggle\("in"/);
  assert.match(SIT_HTML, /classList\.toggle\("put-up"/);
  assert.match(SIT_HTML, /consistEl\.className = "home"/);
});

// ------------------------------------------ help / tutorial / PWA / exchange

test("kill: no PWA town, LoopBeat, units sink, parts currency, food-marks exchange, CFD-200", () => {
  assert.doesNotMatch(BOARD, /loopbeat|units.?sink|parts|exchange|broker|sell|market|Unity Taste|convoy-stop/i);
  assert.doesNotMatch(SIM_CODE, /food.*marks|marks.*food/);
});

test("kill: wait is inert — nothing moves with wall time", () => {
  const h = makeBoard();
  const before = {
    marks: h.b.marks, putUp: h.b.putUp, herbsOnConsist: h.b.herbsOnConsist, consistAt: h.b.consistAt,
  };
  assert.equal(h.b.wait(), false);
  walk(".", h);
  assert.equal(h.b.marks, before.marks);
  assert.equal(h.b.putUp, before.putUp);
  assert.equal(h.b.herbsOnConsist, before.herbsOnConsist);
  assert.equal(h.b.consistAt, before.consistAt);
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\./);
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./);
});

test("notices name the place — Halt, Mosswake, the consist", () => {
  const b = makeBoard().b;
  assert.match(b.notice("halt").writing, /The Halt holds/);
  assert.equal(b.notice("mosswake").writing, "Mosswake. Quiet.");
  assert.match(b.notice("consist").writing, /consist is home/);
  assert.match(SIT_HTML, /aria-label="the Halt"/);
  assert.match(SIT_HTML, /aria-label="Mosswake"/);
});

test("the diorama is two nodes and a span, not a beige HUD strip with a desk", () => {
  assert.match(SIT_HTML, /id="halt"/);
  assert.match(SIT_HTML, /id="mosswake"/);
  assert.match(SIT_HTML, /id="span"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="gap"/);
  assert.match(SIT_HTML, /id="notice"/);
  assert.doesNotMatch(SIT_HTML, /id="ladder"|id="cards"|THE DESK/);
  assert.doesNotMatch(cssOf(), /#f5f0e6|#f4efe4|#e8e0d0/, "not the beige PWA");
});

test("hub lists the sibling and does not rewrite other boards' hub copy", () => {
  const hub = fs.readFileSync(path.join(ROOT, "public/index.html"), "utf8");
  assert.match(hub, /href="\/herbs-larder\/"/);
  assert.match(hub, /href="\/mosswake-loop\/"/);
  assert.match(hub, /href="\/dawnspur-halt\/"/);
  assert.match(hub, /The line\. A promise\. One SEND, one run, home she comes/);
  assert.match(hub, /Come home\. The walk\. One live can-do/);
  const haltWriting = fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js"), "utf8");
  assert.match(haltWriting, /The Halt\. Waiting\./);
  assert.match(haltWriting, /Someone's home\. The Halt is awake\./);
  assert.match(haltWriting, /This board does not send/);
});

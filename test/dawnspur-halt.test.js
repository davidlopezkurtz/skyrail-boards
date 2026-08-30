"use strict";

// CFD-205 — Dawnspur Halt — Home. Spec: docs/cfd-205-halt-beat.md (SIGNED —
// David, 2026-08-30, Superheavy named it). Recut the writing. Work notices
// stay. Four buildings stay. Same path. Not a recut of /dawnspur-site/.
// Every Kill line expressible as a test is a test.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Halt = require("../sit/dawnspur-halt/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js"), "utf8");
const SIM_CODE = SIT_SIM.replace(/\/\/.*$/gm, "");
const HTML_CODE = SIT_HTML.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const BOARD = HTML_CODE + "\n" + SIM_CODE;

const SITE_PRICE = 3;
const OPENING_MARKS = 3;

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
  return { b: Halt.createBoard(o) };
}
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "i") ok = h.b.commitLight();
    else if (ch === "S") ok = h.b.commitSite();
    else if (ch === "L") ok = h.b.commitLand();
    else if (ch === "C") ok = h.b.commitCast();
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}

// ---------------------------------------------------------------- guards

test("guard: live pins and the failed site sit are unchanged at HEAD", () => {
  const pins = {
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
    assert.equal(sha256(gitBlob(p)), want, p + " moved — the lineage lock is the one rule that never bends");
  }
});

test("this sitting writes no bytes under any other board directory", () => {
  const dirty = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT }).toString("utf8");
  const lines = dirty.split("\n").filter(Boolean);
  const foreign = lines.filter((l) => {
    const p = l.slice(3).trim();
    return (
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

test("deploy copy public/dawnspur-halt is byte-identical to sit/dawnspur-halt", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/dawnspur-halt")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/dawnspur-halt")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/dawnspur-halt/" + f)), sha256(raw("sit/dawnspur-halt/" + f)),
      "sit/public drift: " + f);
  }
});

test("sit hashes === public hashes for this board", () => {
  const sitIndex = sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/index.html")));
  const pubIndex = sha256(fs.readFileSync(path.join(ROOT, "public/dawnspur-halt/index.html")));
  const sitSim = sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/sim.js")));
  const pubSim = sha256(fs.readFileSync(path.join(ROOT, "public/dawnspur-halt/sim.js")));
  assert.equal(sitIndex, pubIndex, "index.html sit !== public");
  assert.equal(sitSim, pubSim, "sim.js sit !== public");
});

test("MANIFEST.txt records the shipped hashes, and names the boards left standing", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-halt/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of [
    "070a4619", "e9f81b74", "c59dc101",
    "18b1324f", "576ce2b6", "953368a1", "292d6645", "395c18f2", "5ad814e6",
    "f4f17008", "7711f979", "555ba9a9",
    "e44212db", "f1b6292d", "4126dfc0",
  ]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
});

test("the board ships three files and reaches for nothing off itself", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/dawnspur-halt")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link |@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|DawnspurStorm|DawnspurSite|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|dawnspur-storm|dawnspur-site|convoy-stop/,
    "no other board's module or path is named — the lineage lock");
});

test("the signed halt beat is the brief", () => {
  const beat = fs.readFileSync(path.join(ROOT, "docs/cfd-205-halt-beat.md"), "utf8");
  assert.match(beat, /SIGNED — David, 2026-08-30, Superheavy named it/);
  assert.match(beat, /Work notices/);
  assert.match(beat, /Ask: What happened/);
  assert.match(beat, /Do not recut/);
  assert.match(beat, /\/dawnspur-site\//);
  assert.match(beat, /No Halt SEND/);
  assert.match(beat, /grey square/i);
  assert.match(beat, /peer clickables with no notice/i);
  assert.match(beat, /Dawnspur Halt — Home/);
  assert.match(beat, /I could tell these were different buildings/);
  assert.match(beat, /because it was in front of me and I can/);
});

// ------------------------------------------------------------ the opening

test("kill: the opening mints marks 3, food on the glass, inbound run, lamp dark, Foundry unopened", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, OPENING_MARKS);
  assert.equal(b.sitePrice, SITE_PRICE);
  assert.equal(b.lampLit, false);
  assert.equal(b.foodOnTerrace, true);
  assert.equal(b.foodInTown, false);
  assert.equal(b.sited, false);
  assert.equal(b.scaffold, false);
  assert.equal(b.billPosted, false);
  assert.equal(b.bill, 0);
  assert.equal(b.panes, 0);
  assert.equal(b.inbound, true);
  assert.equal(b.landed, false);
  assert.equal(b.foundry, false);
  assert.equal(b.heatStep, 0);
  assert.equal(b.stopped, false);
  assert.equal(b.posted, null);
  assert.deepEqual(b.buildings(), ["lamp", "terrace", "foundry", "consist"]);
  assert.equal(b.canLight(), true);
  assert.equal(b.canSite(), true);
  assert.equal(b.canLand(), false);
  assert.equal(b.canCast(), false);
  assert.deepEqual(b.rim, { left: 78, width: 18 });
});

test("kill: the opening's marks and food are not settable from the board the thumb reaches", () => {
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*marks/, "the board hands in no balance");
  assert.match(SIT_HTML, /createBoard\(\{ fresh: true \}\)/, "the board opens fresh");
});

// -------------------------------------------------------- work notices

test("tapping a building posts its notice — four buildings, each with a notice", () => {
  const b = makeBoard().b;
  assert.equal(b.postedNotice(), null);
  for (const place of b.buildings()) {
    assert.equal(b.postNotice(place), true);
    const n = b.postedNotice();
    assert.ok(n, place + " posted no notice");
    assert.equal(n.place, place);
    assert.ok(n.writing, place + " notice has no writing");
  }
  assert.equal(b.postNotice("anchors"), false);
  assert.equal(b.postNotice("rim"), false);
  assert.equal(b.postNotice("frame"), false);
});

test("lamp notice: The Halt. Waiting. then light it; after, someone's home", () => {
  const b = makeBoard().b;
  const dark = b.notice("lamp");
  assert.equal(dark.writing, "The Halt. Waiting.");
  assert.equal(dark.canDo, "Light it.");
  assert.equal(dark.verb, "light");
  assert.equal(dark.inProcess, null);
  assert.ok(b.commitLight());
  const lit = b.notice("lamp");
  assert.equal(lit.writing, "Someone's home. The Halt is awake.");
  assert.equal(lit.canDo, null);
  assert.equal(lit.inProcess, "Someone's home.");
  assert.equal(b.lampLit, true);
  assert.equal(b.commitLight(), false);
});

test("terrace notice: a station that feeds itself; nothing to do; carry/tend/UP blocked as a held island", () => {
  const n = makeBoard().b.notice("terrace");
  assert.equal(n.canDo, null);
  assert.equal(n.verb, null);
  assert.match(n.inProcess, /Food on the terrace/);
  assert.equal(n.writing, "A station that feeds itself. Food already on the glass.");
  assert.match(n.blocked, /held island is not a fuel bill/);
  assert.match(n.blocked, /Carry/);
  assert.match(n.blocked, /tend/i);
  assert.match(n.blocked, /UP/);
});

test("Foundry notice walks SITE, blocked CAST, then CAST as a line, then The Halt holds", () => {
  const h = makeBoard();
  const open = h.b.notice("foundry");
  assert.equal(open.canDo, "SITE. Three marks.");
  assert.equal(open.verb, "site");
  assert.equal(open.writing, "The work that holds this ground.");
  walk("S", h);
  const sited = h.b.notice("foundry");
  assert.equal(sited.canDo, null);
  assert.match(sited.inProcess, /Scaffold/);
  assert.match(sited.inProcess, /empty/i);
  assert.match(sited.blocked, /CAST/);
  assert.match(sited.blocked, /consist/);
  assert.match(sited.writing, /work that holds this ground/);
  walk("L", h);
  const landed = h.b.notice("foundry");
  assert.equal(landed.verb, "cast");
  assert.match(landed.canDo, /CAST/);
  assert.match(landed.canDo, /Heat step/);
  assert.match(landed.writing, /bill is full/i);
  assert.match(landed.writing, /work that holds this ground/);
  walk("C", h);
  const done = h.b.notice("foundry");
  assert.equal(done.canDo, null);
  assert.equal(done.inProcess, "The Halt holds.");
  assert.match(done.writing, /The Halt holds/);
  assert.match(done.writing, /already reached took the heat/);
});

test("consist notice: loops come home; inbound blocked LAND; after SITE come home; after LAND home, SEND blocked", () => {
  const h = makeBoard();
  const open = h.b.notice("consist");
  assert.equal(open.canDo, null);
  assert.equal(open.inProcess, "Inbound.");
  assert.match(open.writing, /where the loops come home/);
  assert.match(open.blocked, /LAND/);
  assert.match(open.blocked, /No address/);
  walk("S", h);
  const sited = h.b.notice("consist");
  assert.equal(sited.canDo, "Come home.");
  assert.equal(sited.verb, "land");
  assert.equal(sited.writing, "This is where the loops come home.");
  walk("L", h);
  const home = h.b.notice("consist");
  assert.equal(home.inProcess, "Home.");
  assert.match(home.writing, /Home/);
  assert.match(home.writing, /where the loops come home/);
  assert.match(home.blocked, /does not send/);
  assert.equal(home.canDo, null);
});

test("commitPosted fires the posted notice's can-do and no other verb", () => {
  const h = makeBoard();
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("terrace");
  assert.equal(h.b.commitPosted(), false);
  h.b.postNotice("consist");
  assert.equal(h.b.commitPosted(), false, "LAND is blocked until SITE");
  h.b.postNotice("foundry");
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.sited, true);
  assert.equal(h.b.marks, 0);
  h.b.postNotice("consist");
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.landed, true);
  h.b.postNotice("foundry");
  assert.ok(h.b.commitPosted());
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.stopped, true);
});

test("the board paints the posted notice, not a lecture box", () => {
  assert.match(SIT_HTML, /id="notice"/);
  assert.match(SIT_HTML, /id="notice-now"/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIT_HTML, /id="notice-wait"/);
  assert.match(SIT_HTML, /board\.postNotice\("lamp"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("terrace"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("foundry"\)/);
  assert.match(SIT_HTML, /board\.postNotice\("consist"\)/);
  assert.match(SIT_HTML, /if \(board\.commitPosted\(\)\) paint\(\)/);
  assert.match(SIT_HTML, /postedNotice\(\)/);
  assert.doesNotMatch(HTML_CODE, /Can do:|In process:|Blocked:/);
  assert.doesNotMatch(SIT_HTML, /id="say"|id="end"|id="told"/);
});

// -------------------------------------------------------- SITE, LAND, CAST

test("the walked path: light, SITE, LAND, CAST — five tells stand", () => {
  const h = walk("iSLC");
  assert.equal(h.b.lampLit, true, "the lamp they lit");
  assert.equal(h.b.foodOnTerrace, false);
  assert.equal(h.b.foodInTown, true, "the glass that held the food");
  assert.equal(h.b.sited, true, "the Foundry they opened");
  assert.equal(h.b.scaffold, true);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.landed, true, "the train that came home");
  assert.equal(h.b.inbound, false);
  assert.equal(h.b.heatStep, 1, "the ground that took heat");
  assert.equal(h.b.marks, 0);
  assert.equal(h.b.bill, 1);
  assert.equal(h.b.panes, 2);
  assert.equal(h.b.stopped, true);
});

test("SITE opens the work, posts the bill, and spends the float", () => {
  const h = walk("S");
  assert.equal(h.b.marks, 0);
  assert.equal(h.b.sited, true);
  assert.equal(h.b.scaffold, true);
  assert.equal(h.b.billPosted, true);
  assert.equal(h.b.bill, 0, "SITE does not fill the bill");
  assert.equal(h.b.panes, 0);
  assert.equal(h.b.foundry, false);
  assert.equal(h.b.foodOnTerrace, true);
});

test("LAND fills the bill", () => {
  const h = walk("SL");
  assert.equal(h.b.bill, 1);
  assert.equal(h.b.panes, 2);
  assert.equal(h.b.landed, true);
  assert.equal(h.b.inbound, false);
  assert.equal(h.b.foundry, false);
  assert.equal(h.b.foodOnTerrace, true);
});

// ------------------------------------------ kill: bill payable in marks alone

test("kill hardest: SITE cannot complete the bill with marks alone", () => {
  const h = walk("S");
  assert.equal(h.b.canCast(), false);
  assert.equal(h.b.commitCast(), false);
  assert.equal(h.b.foundry, false);
  assert.equal(h.b.stopped, false);
  assert.equal(h.b.bill, 0);
});

test("kill hardest: leftover marks cannot pay the bill or fire CAST", () => {
  const h = makeBoard({ marks: 99 });
  assert.ok(h.b.commitSite());
  assert.equal(h.b.marks, 96);
  assert.equal(h.b.canCast(), false);
  assert.equal(h.b.commitCast(), false);
  assert.equal(h.b.bill, 0);
  assert.equal(h.b.foundry, false);
  assert.equal(h.b.foodInTown, false);
});

test("kill hardest: there is no marks-to-bill path", () => {
  assert.doesNotMatch(SIM_CODE, /s\.bill\s*\+=|s\.bill\s*=\s*s\.marks|marks.*bill|bill.*marks/,
    "marks never write the bill");
  const cast = SIT_SIM.match(/function canCast\(\)[\s\S]*?\n  \}/);
  assert.ok(cast, "canCast found");
  assert.doesNotMatch(cast[0], /marks/, "CAST does not read marks");
});

test("LAND before SITE refuses — a haul with no address does not fill the bill", () => {
  const b = makeBoard().b;
  assert.equal(b.canLand(), false);
  assert.equal(b.commitLand(), false);
  assert.equal(b.bill, 0);
  assert.equal(b.panes, 0);
});

test("CAST before LAND refuses even when food is already on the terrace", () => {
  const h = walk("S");
  assert.equal(h.b.foodOnTerrace, true);
  assert.equal(h.b.canCast(), false);
  assert.equal(h.b.commitCast(), false);
});

// ---------------------------------------------------------- no SEND / Halt send

test("kill: no SEND control on this board", () => {
  assert.equal(typeof makeBoard().b.commitSend, "undefined");
  assert.equal(typeof makeBoard().b.canSend, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitSend|canSend/);
  assert.doesNotMatch(HTML_CODE, /\bSEND\b/);
  assert.doesNotMatch(SIT_HTML, /id="send"|data-route|mosswake|cloud-basin/i);
});

// ------------------------------------------------ food CARRY / UP / TEND / wx

test("kill: no food CARRY — food is already on the glass", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitCarry, "undefined");
  assert.equal(b.foodOnTerrace, true);
  assert.doesNotMatch(SIM_CODE, /commitCarry|canCarry|CARRY/);
  assert.doesNotMatch(HTML_CODE, /CARRY/);
});

test("kill: no UP, TEND, weather, Ranger, trim", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitUp, "undefined");
  assert.equal(typeof b.commitTend, "undefined");
  assert.equal(typeof b.commitMuster, "undefined");
  assert.equal(typeof b.commitMusterRanger, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitUp|commitTend|commitMuster|canTend|canUp|ranger|trim|sky|stormbird/i);
  assert.doesNotMatch(HTML_CODE, /\bUP\b|\bTEND\b|RANGER|TRIM|stormbird/i);
});

test("kill: fuel is not a standing bill", () => {
  assert.doesNotMatch(SIM_CODE, /s\.fuel|commitFuel|canFuel|upkeep/);
  assert.doesNotMatch(HTML_CODE, /upkeep/i);
  assert.match(makeBoard().b.notice("terrace").blocked, /not a fuel bill/,
    "the terrace notice names the refused standing bill as the block");
});

// ------------------------------------------ glass currency / second HUD line

test("kill: no second HUD line, no gauge, panes are look not a HUD line", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('id="hud"'), SIT_HTML.indexOf('id="strip"'));
  assert.doesNotMatch(hud, /pane|bill|food|glass|foundry|heat/i, "the HUD says none of it");
  assert.match(hud, /marks-line/, "the HUD is the one marks line");
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds one child — the marks line");
  assert.doesNotMatch(SIM_CODE, /glass\s*[:=]|s\.glass/, "no glass stock");
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i);
  assert.match(SIT_HTML, /marksLine\.textContent = board\.marks \+ \(board\.marks === 1 \? " mark" : " marks"\)/);
});

// ------------------------------------------ Foundry is Heat, not Air+Heat

test("kill: CAST does not move the rim", () => {
  const h = makeBoard();
  const before = h.b.rim;
  walk("SLC", h);
  assert.deepEqual(h.b.rim, before);
  assert.deepEqual(h.b.rim, { left: 78, width: 18 });
});

test("kill: SITE on the rim is refused", () => {
  const b = makeBoard().b;
  assert.equal(b.canSite("rim"), false);
  assert.equal(b.commitSite("rim"), false);
  assert.equal(b.sited, false);
  assert.equal(b.marks, OPENING_MARKS);
});

test("kill: Foundry does Heat, not Air — one step on already-reached ground", () => {
  const h = walk("SLC");
  assert.equal(h.b.heatStep, 1);
  assert.equal(h.b.rim.left, 78, "the rim did not advance");
  const ground = rule("#ground");
  assert.match(ground, /#5a3820|#e87828|#f09030|soil|ember|molten|warm/, "reached ground reads as heat-as-terrain");
  const rim = rule("#rim");
  assert.match(rim, /left:\s*78%/, "the rim's left is typed once");
  assert.match(rim, /pointer-events:\s*none/, "the rim is not a pad");
});

test("kill: heat-as-terrain is look, not a write to the heat pin", () => {
  assert.doesNotMatch(BOARD, /dawnspur-heat|commitWarm|canWarm/);
  assert.equal(sha256(gitBlob("public/dawnspur-heat/sim.js")),
    "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
});

// ------------------------------------------ buildings, not grey bricks

test("kill: four buildings stay buttons — not scenery-as-divs, not one-live-place", () => {
  const buttons = SIT_HTML.match(/<button\b[^>]*>/g) || [];
  const ids = buttons.map((b) => {
    const m = b.match(/id="([^"]+)"/);
    return m ? m[1] : "?";
  });
  assert.ok(ids.includes("lamp"));
  assert.ok(ids.includes("terrace"));
  assert.ok(ids.includes("foundry"));
  assert.ok(ids.includes("consist"));
  assert.ok(ids.includes("notice-do"));
  assert.equal(ids.length, 5, "four buildings plus the notice can-do: " + JSON.stringify(ids));
  assert.doesNotMatch(SIT_HTML, /function asButton|livePlace|createElement\(live/);
  assert.doesNotMatch(SIM_CODE, /livePlace/);
});

test("kill: buildings read as buildings, not grey squares", () => {
  assert.match(SIT_HTML, /id="lamp"[^>]*>[\s\S]*class="globe"/);
  assert.match(SIT_HTML, /id="terrace"[^>]*>[\s\S]*class="roof"/);
  assert.match(SIT_HTML, /id="terrace"[^>]*>[\s\S]*class="glass"/);
  assert.match(SIT_HTML, /id="foundry"[^>]*>[\s\S]*class="stack"/);
  assert.match(SIT_HTML, /id="foundry"[^>]*>[\s\S]*class="hall"/);
  assert.match(SIT_HTML, /id="consist"[^>]*>[\s\S]*class="engine"/);
  for (const sel of ["#lamp", "#terrace", "#foundry", "#consist"]) {
    assert.match(rule(sel), /background:\s*transparent/, sel + " root is not a filled brick");
  }
  assert.doesNotMatch(rule("#lamp .globe"), /#(4[a-f0-9]{5}|5[a-f0-9]{5}|6[a-f0-9]{5}|7[a-f0-9]{5}|8[a-f0-9]{5}|9[a-f0-9]{5})\b/i);
  assert.match(rule("#lamp.lit .globe"), /#f09030|#e87828|#ff9020|molten|ember/);
  assert.match(rule("#foundry .hall"), /#b05028|#d06028|#a04828/);
  assert.match(rule("#terrace .glass"), /glass|rgba\(140,\s*210,\s*190/);
  assert.match(rule("#consist .engine"), /#5a3020|#e8a040/);
});

test("kill: no hopping glow, no outline hunt, no animation", () => {
  assert.doesNotMatch(cssOf(), /@keyframes|animation:/);
  const outlines = cssOf().match(/[^{}]*\{[^}]*outline:[^}]*\}/g) || [];
  assert.deepEqual(outlines, [], "no outline glow on buildings or pads: " + JSON.stringify(outlines));
  assert.doesNotMatch(SIT_HTML, /<button[^>]*\bdisabled\b/);
});

test("kill: SITE/LAND/CAST are not a strip of pads away from the buildings", () => {
  assert.doesNotMatch(SIT_HTML, /id="pads"|id="site"|id="land"|id="cast"|class="pad"/);
  assert.doesNotMatch(HTML_CODE, />SITE<|>LAND<|>CAST</);
  assert.doesNotMatch(cssOf(), /button\.pad|#pads\b/);
  assert.match(SIT_HTML, /id="notice-do"/);
  assert.match(SIM_CODE, /canDo: "CAST\. One Heat step/);
});

test("kill: CAST is a line on the Foundry notice, not a second grey brick", () => {
  assert.doesNotMatch(SIT_HTML, /id="frame"/);
  const foundry = box("#foundry");
  const lamp = box("#lamp");
  const terrace = box("#terrace");
  const consist = box("#consist.inbound");
  assert.equal(overlap(foundry, lamp), false);
  assert.equal(overlap(foundry, terrace), false);
  assert.equal(overlap(foundry, consist), false);
  assert.equal(overlap(lamp, terrace), false);
  const home = box("#consist.home");
  assert.equal(overlap(home, lamp), false);
  assert.equal(overlap(home, foundry), false);
});

test("kill: Warehouse, Signal, Market, hall, second greenhouse are not this work", () => {
  assert.doesNotMatch(HTML_CODE, /WAREHOUSE|SIGNAL|MARKET|LEAGUE|postcard/i);
  assert.doesNotMatch(SIM_CODE, /warehouse|signal|market|league|postcard/);
  assert.doesNotMatch(SIT_HTML, /id="warehouse"|id="signal"|id="market"|id="hall"|id="greenhouse"/);
  assert.equal((HTML_CODE.match(/greenhouse/gi) || []).length, 1,
    "the terrace is the one glass house; a second greenhouse is not this work");
});

test("kill: horizon ruins and anchor locks are scenery, not ghost pads", () => {
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="hz-/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="rim"/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="lock/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="anchors"/);
  assert.match(SIT_HTML, /id="horizon"[^>]*aria-hidden="true"/);
  assert.match(SIT_HTML, /id="anchors"[^>]*aria-hidden="true"/);
  assert.match(rule("#anchors"), /pointer-events:\s*none/);
  assert.match(rule("#rim"), /pointer-events:\s*none/);
});

test("kill: no lecture, no help, no tutorial mode, no plaque", () => {
  assert.doesNotMatch(HTML_CODE, /help|tutorial|plaque|citizen|interior|zoning|cutscene|overlay/i);
  assert.doesNotMatch(SIT_HTML, /id="help"|class="help"|>\?</);
  assert.doesNotMatch(SIM_CODE, /help|tutorial|plaque|citizen/i);
});

test("kill: auto LAND is still impossible — SITE does not fill the bill", () => {
  const h = walk("S");
  assert.equal(h.b.inbound, true);
  assert.equal(h.b.landed, false);
  assert.equal(h.b.bill, 0);
  assert.equal(h.b.panes, 0);
  assert.equal(h.b.canLand(), true);
  const siteFn = SIT_SIM.match(/function commitSite\([\s\S]*?\n  \}/);
  assert.ok(siteFn, "commitSite found");
  assert.doesNotMatch(siteFn[0], /landed|inbound|s\.bill\s*=|s\.panes/, "SITE does not write the haul");
});

test("after a sit the five tells stand on the diorama", () => {
  const h = walk("iSLC");
  assert.equal(h.b.lampLit, true);
  assert.equal(h.b.foodInTown, true);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.landed, true);
  assert.equal(h.b.heatStep, 1);
  assert.match(SIT_HTML, /id="lamp"/);
  assert.match(SIT_HTML, /id="terrace"/);
  assert.match(SIT_HTML, /id="foundry"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="town-food"/);
  assert.match(SIT_HTML, /id="ground"/);
  assert.match(SIT_HTML, /classList\.toggle\("lit"/);
  assert.match(SIT_HTML, /classList\.toggle\("step"/);
  assert.match(SIT_HTML, /classList\.toggle\("in"/);
  assert.match(SIT_HTML, /board\.inbound \? "inbound" : board\.landed \? "home"/);
});

// ------------------------------------------ help / tutorial / PWA / exchange

test("kill: no PWA town, LoopBeat, units sink, parts currency, food-marks exchange", () => {
  assert.doesNotMatch(BOARD, /loopbeat|units.?sink|parts|exchange|broker|sell|market/i);
  assert.doesNotMatch(SIM_CODE, /food.*marks|marks.*food/);
});

test("kill: wait is inert — nothing moves with wall time", () => {
  const h = makeBoard();
  const before = {
    marks: h.b.marks, bill: h.b.bill, inbound: h.b.inbound, foodOnTerrace: h.b.foodOnTerrace,
    lampLit: h.b.lampLit,
  };
  assert.equal(h.b.wait(), false);
  walk(".", h);
  assert.equal(h.b.marks, before.marks);
  assert.equal(h.b.bill, before.bill);
  assert.equal(h.b.inbound, before.inbound);
  assert.equal(h.b.foodOnTerrace, before.foodOnTerrace);
  assert.equal(h.b.lampLit, before.lampLit);
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\./);
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./);
});

test("SITE, LAND and CAST each refuse a second press", () => {
  const h = walk("S");
  assert.equal(h.b.commitSite(), false);
  walk("L", h);
  assert.equal(h.b.commitLand(), false);
  walk("C", h);
  assert.equal(h.b.commitCast(), false);
});

test("CAST spends terrace food into the town and does not spend marks", () => {
  const h = walk("SL");
  const marks = h.b.marks;
  assert.ok(h.b.commitCast());
  assert.equal(h.b.marks, marks);
  assert.equal(h.b.foodOnTerrace, false);
  assert.equal(h.b.foodInTown, true);
});

test("light costs nothing and does not write Works", () => {
  const h = makeBoard();
  const marks = h.b.marks;
  assert.ok(h.b.commitLight());
  assert.equal(h.b.marks, marks);
  assert.equal(h.b.sited, false);
  assert.equal(h.b.bill, 0);
  assert.equal(h.b.foundry, false);
});

test("notices name the place — Home, not objects in front of you", () => {
  const b = makeBoard().b;
  assert.equal(b.notice("lamp").writing, "The Halt. Waiting.");
  assert.match(b.notice("terrace").writing, /A station that feeds itself/);
  assert.equal(b.notice("foundry").writing, "The work that holds this ground.");
  assert.match(b.notice("consist").writing, /where the loops come home/);
  assert.doesNotMatch(SIT_SIM, /The lamp\. Dark/);
  assert.doesNotMatch(SIT_SIM, /writing: "The ruin\."/);
  assert.doesNotMatch(SIT_SIM, /writing: "Inbound\."/);
  assert.doesNotMatch(SIT_SIM, /The lamp\. Amber/);
  assert.match(SIT_HTML, /aria-label="the Halt"/);
});

test("the diorama is the town, not a beige HUD strip with a desk", () => {
  assert.match(SIT_HTML, /id="lamp"/);
  assert.match(SIT_HTML, /id="terrace"/);
  assert.match(SIT_HTML, /id="foundry"/);
  assert.match(SIT_HTML, /id="consist"/);
  assert.match(SIT_HTML, /id="rim"/);
  assert.match(SIT_HTML, /id="notice"/);
  assert.doesNotMatch(SIT_HTML, /id="ladder"|id="cards"|THE DESK/);
  assert.doesNotMatch(cssOf(), /#f5f0e6|#f4efe4|#e8e0d0/, "not the beige PWA");
});

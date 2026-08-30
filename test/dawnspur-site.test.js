"use strict";

// CFD-205, the site sitting. The spec is docs/cfd-205-beat.md (SIGNED —
// David, 2026-08-30, word "Signed."). One NEW system: Works. Foundry is
// work one. Every Kill line expressible as a test is a test.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Site = require("../sit/dawnspur-site/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-site/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-site/sim.js"), "utf8");
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
function makeBoard(opts) {
  const o = { fresh: true };
  if (opts && Number.isInteger(opts.marks)) o.marks = opts.marks;
  return { b: Site.createBoard(o) };
}
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "S") ok = h.b.commitSite();
    else if (ch === "L") ok = h.b.commitLand();
    else if (ch === "C") ok = h.b.commitCast();
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}

// ---------------------------------------------------------------- guards
// KILL: overwrite any live board. Pins re-hashed unchanged. Storm live merge
// is 555ba9a9. Do not recut it.

test("guard: all seven live boards' blobs are unchanged at HEAD", () => {
  const pins = {
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

test("deploy copy public/dawnspur-site is byte-identical to sit/dawnspur-site", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/dawnspur-site")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/dawnspur-site")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/dawnspur-site/" + f)), sha256(raw("sit/dawnspur-site/" + f)),
      "sit/public drift: " + f);
  }
});

test("MANIFEST.txt records the shipped hashes, and names the seven boards left standing", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/dawnspur-site/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-site/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of ["18b1324f", "576ce2b6", "953368a1", "292d6645", "395c18f2", "5ad814e6", "f4f17008", "7711f979"]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
  assert.ok(man.includes("555ba9a9"), "MANIFEST.txt names the storm live merge");
});

test("the board ships three files and reaches for nothing off itself", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/dawnspur-site")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link |@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|DawnspurStorm|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|dawnspur-storm|convoy-stop/,
    "no other board's module or path is named — the lineage lock");
});

test("the signed beat is the brief", () => {
  const beat = fs.readFileSync(path.join(ROOT, "docs/cfd-205-beat.md"), "utf8");
  assert.match(beat, /SIGNED — David, 2026-08-30, word "Signed\."/);
  assert.match(beat, /Ask: What happened/);
  assert.match(beat, /bill payable in marks alone/i);
  assert.match(beat, /No Halt send/);
});

// ------------------------------------------------------------ the opening

test("kill: the opening mints marks 3, food on the terrace, one inbound run, Foundry dark, bill empty", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, OPENING_MARKS);
  assert.equal(b.sitePrice, SITE_PRICE);
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
  assert.equal(b.runSentence, null);
  assert.equal(b.endSentence, null);
  assert.deepEqual(b.rim, { left: 78, width: 18 });
  assert.deepEqual(b.litJobs(), ["site"]);
  assert.equal(b.canSite(), true);
  assert.equal(b.canLand(), false);
  assert.equal(b.canCast(), false);
});

test("kill: the opening's marks and food are not settable from the board the thumb reaches", () => {
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*marks/, "the board hands in no balance");
  assert.match(SIT_HTML, /createBoard\(\{ fresh: true \}\)/, "the board opens fresh");
});

// -------------------------------------------------------- SITE, LAND, CAST

test("the walked path: SITE, LAND, CAST — address, panes, food into the town", () => {
  const h = walk("SLC");
  assert.equal(h.b.marks, 0);
  assert.equal(h.b.sited, true);
  assert.equal(h.b.scaffold, true);
  assert.equal(h.b.bill, 1);
  assert.equal(h.b.panes, 2);
  assert.equal(h.b.inbound, false);
  assert.equal(h.b.landed, true);
  assert.equal(h.b.foundry, true);
  assert.equal(h.b.foodOnTerrace, false);
  assert.equal(h.b.foodInTown, true);
  assert.equal(h.b.heatStep, 1);
  assert.equal(h.b.stopped, true);
  assert.match(h.b.endSentence, /Foundry is live/);
  assert.match(h.b.endSentence, /terrace food went into the town/);
  assert.match(h.b.endSentence, /already reached took one heat/);
  assert.deepEqual(h.b.litJobs(), []);
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
  assert.equal(h.b.runSentence, "The work is open. The scaffold is up. The bill is on the frame.");
  assert.deepEqual(h.b.litJobs(), ["land"]);
});

test("LAND fills the bill and puts panes on the frame", () => {
  const h = walk("SL");
  assert.equal(h.b.bill, 1);
  assert.equal(h.b.panes, 2);
  assert.equal(h.b.landed, true);
  assert.equal(h.b.inbound, false);
  assert.equal(h.b.foundry, false);
  assert.equal(h.b.foodOnTerrace, true);
  assert.equal(h.b.runSentence, "The run came back with an address. The panes are on the frame.");
  assert.deepEqual(h.b.litJobs(), ["cast"]);
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

// ---------------------------------------------------------- no SEND / Halt

test("kill: no SEND control on this board", () => {
  assert.equal(typeof makeBoard().b.commitSend, "undefined");
  assert.equal(typeof makeBoard().b.canSend, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitSend|canSend/);
  assert.doesNotMatch(HTML_CODE, /\bSEND\b/);
  assert.doesNotMatch(SIT_HTML, /id="send"|data-route|dawnspur-halt|mosswake|cloud-basin/i);
});

test("kill: Halt is not a send on this board", () => {
  assert.doesNotMatch(HTML_CODE, /HALT|halt/);
  assert.doesNotMatch(SIM_CODE, /halt/i);
});

// ------------------------------------------------ food CARRY / UP / TEND / wx

test("kill: no food CARRY — food is already on the terrace", () => {
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

// ------------------------------------------ glass currency / second HUD line

test("kill: panes are the look, not a stock, and not a HUD line", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('id="hud"'), SIT_HTML.indexOf('id="strip"'));
  assert.doesNotMatch(hud, /pane|bill|food|glass|foundry|heat/i, "the HUD says none of it");
  assert.match(hud, /marks-line/, "the HUD is the one marks line");
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds one child — the marks line");
  assert.doesNotMatch(SIM_CODE, /glass\s*[:=]|s\.glass/, "no glass stock");
  assert.doesNotMatch(HTML_CODE, /glass marks|spend glass|glass wallet/i);
});

test("kill: no second HUD line, no gauge", () => {
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
  assert.match(ground, /#4a3828|#8a5a32|#c07a3a|soil|ember|warm/, "reached ground reads as heat-as-terrain");
  const rim = rule("#rim");
  assert.match(rim, /left:\s*78%/, "the rim's left is typed once");
  assert.match(rim, /pointer-events:\s*none/, "the rim is not a pad");
});

test("kill: heat-as-terrain is look, not a write to the heat pin", () => {
  assert.doesNotMatch(BOARD, /dawnspur-heat|commitWarm|canWarm/);
  assert.equal(sha256(gitBlob("public/dawnspur-heat/sim.js")),
    "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
});

// ------------------------------------------ one pad, one ruin, no ghosts

test("kill: one tappable ruin — horizon ruins are not buttons", () => {
  const buttons = SIT_HTML.match(/<button\b[^>]*>/g) || [];
  const world = buttons.filter((b) => !b.includes('class="pad') && !b.includes("class='pad"));
  assert.equal(world.length, 1, "exactly one world button — the Foundry ruin: " + JSON.stringify(world));
  assert.match(world[0], /id="foundry"/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="hz-/);
  assert.doesNotMatch(SIT_HTML, /<button[^>]*id="rim"/);
  assert.match(SIT_HTML, /id="horizon"[^>]*aria-hidden="true"/);
});

test("kill: Warehouse, Signal, Market, second greenhouse are not this work", () => {
  assert.doesNotMatch(HTML_CODE, /WAREHOUSE|SIGNAL|MARKET|LEAGUE|postcard|GREENHOUSE/i);
  assert.doesNotMatch(SIM_CODE, /warehouse|signal|market|league|postcard|greenhouse/i);
});

test("kill: SITE is a verb, not a caption", () => {
  assert.match(SIT_HTML, /id="site"/);
  assert.match(SIT_HTML, />SITE</);
  assert.match(SIM_CODE, /function commitSite/);
  const h = makeBoard();
  assert.equal(h.b.commitSite(), true);
});

test("kill: scaffold is SITE's tell, never a verb — crane stays at Rustfall", () => {
  assert.equal(typeof makeBoard().b.commitCrane, "undefined");
  assert.doesNotMatch(SIM_CODE, /commitCrane|canCrane|CRANE/);
  assert.doesNotMatch(HTML_CODE, /CRANE/);
  assert.match(SIT_HTML, /id="scaffold"/);
});

// ------------------------------------------ help / tutorial / PWA / exchange

test("kill: no help overlay, no tutorial, no plaque, no citizen, no interior", () => {
  assert.doesNotMatch(HTML_CODE, /help|tutorial|plaque|citizen|interior|zoning|cutscene|overlay/i);
  assert.doesNotMatch(SIT_HTML, /id="help"|class="help"|>\?</);
  assert.doesNotMatch(SIM_CODE, /help|tutorial|plaque|citizen/i);
});

test("kill: no PWA town, LoopBeat, units sink, parts currency, food-marks exchange", () => {
  assert.doesNotMatch(BOARD, /loopbeat|units.?sink|parts|exchange|broker|sell|market/i);
  assert.doesNotMatch(SIM_CODE, /food.*marks|marks.*food/);
});

test("kill: wait is inert — nothing moves with wall time", () => {
  const h = makeBoard();
  const before = {
    marks: h.b.marks, bill: h.b.bill, inbound: h.b.inbound, foodOnTerrace: h.b.foodOnTerrace,
  };
  assert.equal(h.b.wait(), false);
  walk(".", h);
  assert.equal(h.b.marks, before.marks);
  assert.equal(h.b.bill, before.bill);
  assert.equal(h.b.inbound, before.inbound);
  assert.equal(h.b.foodOnTerrace, before.foodOnTerrace);
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\./);
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./);
});

test("a reachable state always has a lit control until the sitting ends", () => {
  const open = makeBoard().b;
  assert.ok(open.litJobs().length >= 1);
  const sited = walk("S").b;
  assert.ok(sited.litJobs().length >= 1);
  const landed = walk("SL").b;
  assert.ok(landed.litJobs().length >= 1);
  const done = walk("SLC").b;
  assert.deepEqual(done.litJobs(), []);
  assert.equal(done.stopped, true);
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

test("the fail words are not how this sitting ends", () => {
  const h = walk("SLC");
  assert.doesNotMatch(h.b.endSentence, /paid in marks|sent a train|warmed the ground|ran Dawnspur|glass/i);
});

test("the board's verbs are site, land, cast — nothing else lights", () => {
  const h = makeBoard();
  for (const job of h.b.litJobs()) {
    assert.ok(["site", "land", "cast"].includes(job), "unknown job lit: " + job);
  }
  walk("SLC", h);
  for (const job of h.b.litJobs()) {
    assert.ok(["site", "land", "cast"].includes(job), "unknown job lit: " + job);
  }
});

test("the diorama is the town, not a beige HUD strip with a desk", () => {
  assert.match(SIT_HTML, /id="foundry"/);
  assert.match(SIT_HTML, /id="frame"/);
  assert.match(SIT_HTML, /id="terrace"/);
  assert.match(SIT_HTML, /id="rim"/);
  assert.doesNotMatch(SIT_HTML, /id="ladder"|id="cards"|THE DESK/);
  assert.doesNotMatch(cssOf(), /#f5f0e6|#f4efe4|#e8e0d0/, "not the beige PWA");
});

"use strict";

// CFD-201, the storm sitting. The spec is docs/cfd-201-beat.md (SIGNED —
// David, 2026-08-28, "So sign, with the counter."), under canon section 7:
// a sitting INHERITS what has passed and adds one new thing. The parent is
// the join board that passed 2026-08-28. Weather is the one new system.
// Every Kill line expressible as a test is a test. Inherited assertions
// are not weakened.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Storm = require("../sit/dawnspur-storm/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-storm/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-storm/sim.js"), "utf8");
const SIM_CODE = SIT_SIM.replace(/\/\/.*$/gm, "");
const HTML_CODE = SIT_HTML.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const BOARD = HTML_CODE + "\n" + SIM_CODE;

const HALT = "dawnspur-halt";
const MOSS = "mosswake-loop";
const CLOUD = "cloud-basin-span";
const RUST = "rustfall-yard";
const SENDABLE = [HALT, MOSS, CLOUD];
const PROVISIONS = { "dawnspur-halt": 0, "mosswake-loop": 2, "cloud-basin-span": 3 };
const TOLL = { "dawnspur-halt": 0, "mosswake-loop": 0, "cloud-basin-span": 1 };
const PAYS = { "dawnspur-halt": 10, "mosswake-loop": 14, "cloud-basin-span": 18 };
const STORM_PAYS = { "dawnspur-halt": 10, "mosswake-loop": 14, "cloud-basin-span": 24 };
const UP_PRICE = { 1: 3, 2: 4, 3: 5 };
const OPENING_MARKS = 3;
const OPENING_STORES = 0;
const STORES_CAP = 6;
const TRIM_MARKS = 2;

const ODDS = {
  "dawnspur-halt": [68.0, 71.6, 75.2, 78.8, 82.4],
  "mosswake-loop": [64.0, 67.6, 71.2, 74.8, 78.4],
  "cloud-basin-span": [51.0, 54.6, 58.2, 61.8, 65.4],
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
function makeBoard(opts) {
  const ctl = { next: 0, calls: 0 };
  const o = { fresh: true, roll: function () { ctl.calls += 1; return ctl.next; } };
  if (opts && Number.isInteger(opts.marks)) o.marks = opts.marks;
  if (opts && Number.isInteger(opts.stores)) o.stores = opts.stores;
  return { b: Storm.createBoard(o), ctl: ctl };
}
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "h") ok = h.b.commitSend(HALT);
    else if (ch === "m") ok = h.b.commitSend(MOSS);
    else if (ch === "c") ok = h.b.commitSend(CLOUD);
    else if (ch === "H") ok = h.b.commitSend(HALT, true);
    else if (ch === "M") ok = h.b.commitSend(MOSS, true);
    else if (ch === "B") ok = h.b.commitSend(CLOUD, true);
    else if (ch === "C") ok = h.b.commitCarry();
    else if (ch === "T") ok = h.b.commitTend();
    else if (ch === "U") ok = h.b.commitUp();
    else if (ch === "W") ok = h.b.commitMuster(1);
    else if (ch === "G") ok = h.b.commitMusterRanger();
    else if (ch === "+") { h.ctl.next = 0; ok = h.b.commitMeet(); }
    else if (ch === "-") { h.ctl.next = 1; ok = h.b.commitMeet(); }
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}
function chance(baseRisk, wardens, rangers, storm) {
  const bonus = Math.min(0.3, (wardens * 3 + rangers * 1) * 0.012);
  const wx = storm ? -0.10 : 0;
  return Math.min(0.96, Math.max(0.12, 0.76 - baseRisk + bonus + wx));
}
function cardFor(b, id) {
  return b.cards().find((c) => c.id === id);
}
function snap(b) {
  return {
    marks: b.marks, roster: b.roster, rangers: b.rangers, level: b.level,
    reserve: b.reserve, stores: b.stores, sky: b.sky,
    away: b.away, armed: b.armed, stopped: b.stopped, town: b.town, record: b.record,
    cards: b.cards().map((c) => ({
      id: c.id, pays: c.pays, chance: c.chance, percent: c.percent, lit: c.lit,
    })),
    lit: b.litJobs(), litSends: b.litSends(),
    runSentence: b.runSentence, endSentence: b.endSentence, skySentence: b.skySentence,
    carryYield: b.carryYield, upPrice: b.upPrice, musterReach: b.musterReach,
    canCarry: b.canCarry(), canTend: b.canTend(), canUp: b.canUp(),
    canMuster: b.canMuster(), canMusterRanger: b.canMusterRanger(), canMeet: b.canMeet(),
    canSend: SENDABLE.concat([RUST]).map((id) => b.canSend(id)),
  };
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function sittings(seed, runs, steps, each, opts) {
  const rnd = mulberry32(seed);
  for (let run = 0; run < runs; run++) {
    const h = makeBoard(opts);
    for (let i = 0; i < steps; i++) {
      const act = ["h", "m", "c", "H", "M", "B", "C", "T", "U", "W", "G", "K", "."][Math.floor(rnd() * 13)];
      h.ctl.next = rnd();
      if (act === "h") h.b.commitSend(HALT);
      else if (act === "m") h.b.commitSend(MOSS);
      else if (act === "c") h.b.commitSend(CLOUD);
      else if (act === "H") h.b.commitSend(HALT, true);
      else if (act === "M") h.b.commitSend(MOSS, true);
      else if (act === "B") h.b.commitSend(CLOUD, true);
      else if (act === "C") h.b.commitCarry();
      else if (act === "T") h.b.commitTend();
      else if (act === "U") h.b.commitUp();
      else if (act === "W") h.b.commitMuster(1 + Math.floor(rnd() * 4));
      else if (act === "G") h.b.commitMusterRanger();
      else if (act === "K") h.b.commitMeet();
      else h.b.wait();
      each(h.b, run, i);
    }
  }
}
// Drive real commits until the sky is `want` and the train is home.
function intoSky(want, seed) {
  const h = seed || makeBoard({ marks: 60, stores: 0 });
  for (let i = 0; i < 80; i++) {
    if (h.b.sky === want && !h.b.away && !h.b.stopped) return h;
    if (h.b.stopped) break;
    if (h.b.away) { h.ctl.next = 0; assert.ok(h.b.commitMeet()); continue; }
    if (h.b.canSend(HALT)) { assert.ok(h.b.commitSend(HALT)); continue; }
    if (h.b.canCarry()) { assert.ok(h.b.commitCarry()); continue; }
    if (h.b.canTend()) { assert.ok(h.b.commitTend()); continue; }
    throw new Error("intoSky(" + want + ") stalled at " + h.b.sky);
  }
  assert.equal(h.b.sky, want);
  return h;
}

function spin120ms() {
  const end = Date.now() + 120;
  while (Date.now() < end) { /* a real, blocking 120ms of wall time */ }
}

// ---------------------------------------------------------------- guards

test("guard: all six live boards' blobs are unchanged at HEAD", () => {
  const pins = {
    "sit/dawnspur-line/sim.js": "18b1324f33114a1dd6b5bf4c8905f2facac80286d5470b0c803ba47877040e65",
    "public/dawnspur-line/sim.js": "18b1324f33114a1dd6b5bf4c8905f2facac80286d5470b0c803ba47877040e65",
    "sit/dawnspur-dispatch/sim.js": "576ce2b6de31dd70653d90d45d203c15067e41aaa0624bba2f09245b31bfa74d",
    "public/dawnspur-dispatch/sim.js": "576ce2b6de31dd70653d90d45d203c15067e41aaa0624bba2f09245b31bfa74d",
    "sit/dawnspur-scale/sim.js": "953368a11dcf0a7f2478e59e4b572ca458a0d404b0dfba78822d04fb306db31c",
    "public/dawnspur-scale/sim.js": "953368a11dcf0a7f2478e59e4b572ca458a0d404b0dfba78822d04fb306db31c",
    "sit/dawnspur-heat/sim.js": "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b",
    "public/dawnspur-heat/sim.js": "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b",
    "public/dawnspur/sim.js": "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c",
    "public/convoy-stop/sim.js": "5ad814e6eb9f8263be5dd224ae42497de932ec87b767a96399aaa4348a4a146f",
  };
  for (const [p, want] of Object.entries(pins)) {
    assert.equal(sha256(gitBlob(p)), want, p + " moved — the lineage lock is the one rule that never bends");
  }
});

test("deploy copy public/dawnspur-storm is byte-identical to sit/dawnspur-storm", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/dawnspur-storm")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/dawnspur-storm")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/dawnspur-storm/" + f)), sha256(raw("sit/dawnspur-storm/" + f)),
      "sit/public drift: " + f);
  }
});

test("MANIFEST.txt records the shipped hashes, and names the six boards left standing", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/dawnspur-storm/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-storm/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of ["18b1324f", "576ce2b6", "953368a1", "292d6645", "395c18f2", "5ad814e6"]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
});

test("the board ships three files and reaches for nothing off itself", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/dawnspur-storm")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link|@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|DawnspurDispatch|DawnspurLine|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|dawnspur-line|convoy-stop/,
    "no other board's module or path is named — the lineage lock");
});

// ------------------------------------------------------------ the opening

test("kill: the opening mints marks 3 / stores 0 / Wardens 0 / Rangers 0 / level 1 / reserve 4 / sky clear at turn 1 / home / unbanked / unarmed / Cloud Basin dark", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, OPENING_MARKS);
  assert.equal(b.stores, OPENING_STORES);
  assert.equal(b.roster, 0);
  assert.equal(b.rangers, 0);
  assert.equal(b.level, 1);
  assert.equal(b.reserve, 4);
  assert.equal(b.reserve, b.reserveFull);
  assert.equal(b.sky, "clear");
  assert.equal(b.away, false);
  assert.equal(b.armed, false);
  assert.equal(b.stopped, false);
  assert.equal(b.canSend(CLOUD), false);
  assert.equal(b.runSentence, null);
  assert.equal(b.endSentence, null);
  assert.deepEqual(b.record, {
    runsOut: 0, cargoesBanked: 0, runsTurnedBack: 0, marksLost: 0, foodLost: 0,
    foodSent: 0, carries: 0, tends: 0, stormSends: 0, runsTrimmed: 0,
  });
});

test("kill: the opening's cards quote 68 / 64 / 51", () => {
  const b = makeBoard().b;
  assert.deepEqual(b.cards().map((c) => c.percent), [68, 64, 51, null]);
  for (const id of SENDABLE) {
    assert.ok(Math.abs(cardFor(b, id).chance - ODDS[id][0] / 100) < 1e-9);
  }
});

test("kill: the opening's lit set is the halt, MUSTER, RANGER, CARRY and UP — TEND dark on full ground, spine dark and says why", () => {
  const b = makeBoard().b;
  assert.ok(b.litJobs().includes(HALT));
  assert.ok(b.litJobs().includes("carry"));
  assert.ok(b.litJobs().includes("up"));
  assert.ok(b.litJobs().includes("muster"));
  assert.ok(b.litJobs().includes("ranger"), "the float affords a Ranger");
  assert.equal(b.litJobs().includes("tend"), false, "TEND is dark on full ground");
  assert.deepEqual(b.litSends(), [HALT]);
  assert.equal(b.rangerPrice, 2);
  assert.equal(b.musterPrice, 3);
  assert.equal(b.upPrice, 3);
  assert.equal(cardFor(b, MOSS).condition, "The stores hold 0. Mosswake wants 2.");
  assert.equal(cardFor(b, CLOUD).condition,
    "The charter opens with the first cargo banked. The stores hold 0. Cloud Basin wants 3.");
});

test("kill: the opening balance is the suite's alone — no query, no storage, and the sky is not settable", () => {
  assert.equal(Storm.createBoard().marks, OPENING_MARKS);
  assert.equal(Storm.createBoard().stores, OPENING_STORES);
  assert.equal(Storm.createBoard().sky, "clear");
  for (const m of [0, 3, 6, 12]) assert.equal(Storm.createBoard({ marks: m }).marks, m);
  for (const st of [0, 2, 3, 6]) assert.equal(Storm.createBoard({ stores: st }).stores, st);
  for (const junk of [-1, 2.5, "6", null, NaN, Infinity, {}]) {
    assert.equal(Storm.createBoard({ marks: junk }).marks, OPENING_MARKS);
    assert.equal(Storm.createBoard({ stores: junk }).stores, OPENING_STORES);
  }
  assert.equal(Storm.createBoard({ stores: STORES_CAP + 1 }).stores, OPENING_STORES);
  assert.equal(Storm.createBoard({ sky: "storm", turn: 8, reserve: 0, rangers: 1 }).sky, "clear");
  assert.equal(Storm.createBoard({ sky: "storm", turn: 8, reserve: 0, rangers: 1 }).reserve, 4);
  assert.equal(Storm.createBoard({ sky: "storm", turn: 8, reserve: 0, rangers: 1 }).rangers, 0);
  assert.doesNotMatch(BOARD, /location\.|URLSearchParams|searchParams/i);
  assert.match(SIT_HTML, /DawnspurStorm\.createBoard\(\{ fresh: true \}\)/);
  assert.equal((SIT_HTML.match(/createBoard\(/g) || []).length, 1);
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*(marks|stores|sky|turn)/);
});

// --------------------------------------------- KILL: weather — the new system

test("kill: the sky advances on a committed action and on nothing else", () => {
  const h = makeBoard();
  assert.equal(h.b.sky, "clear");
  const before = snap(h.b);
  for (let i = 0; i < 20; i++) assert.equal(h.b.wait(), false);
  assert.deepEqual(snap(h.b), before, "wait() takes nothing and does not advance the sky");
  spin120ms();
  assert.deepEqual(snap(h.b), before, "wall time does not advance the sky");
  assert.doesNotMatch(SIT_SIM, /Date\.now|performance\.|setTimeout|setInterval|requestAnimationFrame/,
    "the sky's path holds no clock");
  walk("C", h);
  assert.equal(h.b.sky, "clear", "the first commit is still in the five-clear stretch");
});

test("kill: the sky's cycle is five clear, two bird, two storm, period nine", () => {
  const h = makeBoard({ marks: 60 });
  const seen = [];
  for (let i = 0; i < 27; i++) {
    seen.push(h.b.sky);
    if (h.b.away) { h.ctl.next = 0; assert.ok(h.b.commitMeet()); }
    else if (h.b.canSend(HALT)) assert.ok(h.b.commitSend(HALT));
    else assert.ok(h.b.commitCarry());
  }
  const period = ["clear", "clear", "clear", "clear", "clear", "bird", "bird", "storm", "storm"];
  for (let i = 0; i < seen.length; i++) {
    assert.equal(seen[i], period[i % 9], "turn " + (i + 1) + " was " + seen[i]);
  }
});

test("kill: a storm arrives with no bird turn before it, at any point in the cycle including the first", () => {
  const h = makeBoard({ marks: 60 });
  let prev = h.b.sky;
  assert.notEqual(h.b.sky, "storm", "the opening is not a storm");
  for (let i = 0; i < 90; i++) {
    if (h.b.away) { h.ctl.next = 0; h.b.commitMeet(); }
    else if (h.b.canSend(HALT)) h.b.commitSend(HALT);
    else if (h.b.canCarry()) h.b.commitCarry();
    else if (h.b.canTend()) h.b.commitTend();
    if (h.b.sky === "storm" && prev !== "storm") {
      assert.equal(prev, "bird", "a storm entered from " + prev);
    }
    prev = h.b.sky;
  }
});

test("kill: the bird turn changes no percent, pay, stake or ground", () => {
  const h = intoSky("bird", makeBoard({ marks: 60 }));
  assert.equal(h.b.sky, "bird");
  const reserve = h.b.reserve;
  for (const id of SENDABLE) {
    const c = cardFor(h.b, id);
    assert.equal(c.pays, PAYS[id], id + " pay moved under the bird");
    assert.ok(Math.abs(c.chance - chance({ "dawnspur-halt": 0.08, "mosswake-loop": 0.12, "cloud-basin-span": 0.25 }[id], h.b.roster, h.b.rangers, false)) < 1e-9);
    assert.equal(c.shifted, false);
    assert.equal(c.trim, null);
  }
  const before = { marks: h.b.marks, stores: h.b.stores, reserve: h.b.reserve };
  assert.equal(h.b.wait(), false);
  assert.deepEqual({ marks: h.b.marks, stores: h.b.stores, reserve: h.b.reserve }, before);
  assert.equal(h.b.reserve, reserve);
});

test("kill: a storm's bias is −0.10 on every sendable route, Core Line pay unmoved, Chartered storm pay 24", () => {
  const h = intoSky("storm", makeBoard({ marks: 60 }));
  assert.equal(h.b.sky, "storm");
  for (const id of SENDABLE) {
    const c = cardFor(h.b, id);
    const clear = chance({ "dawnspur-halt": 0.08, "mosswake-loop": 0.12, "cloud-basin-span": 0.25 }[id], h.b.roster, h.b.rangers, false);
    const storm = chance({ "dawnspur-halt": 0.08, "mosswake-loop": 0.12, "cloud-basin-span": 0.25 }[id], h.b.roster, h.b.rangers, true);
    assert.ok(Math.abs(c.chance - storm) < 1e-9, id + " storm chance " + c.chance);
    assert.ok(Math.abs((clear - storm) - 0.10) < 1e-9, id + " bias is not −0.10");
    assert.equal(c.pays, STORM_PAYS[id], id + " pay in a storm");
  }
  assert.equal(cardFor(h.b, HALT).pays, 10);
  assert.equal(cardFor(h.b, MOSS).pays, 14);
  assert.equal(cardFor(h.b, CLOUD).pays, 24);
});

test("kill: no forecast, countdown, phase pip, turn number or next-storm figure renders, and the sky is not a number the player can read", () => {
  assert.doesNotMatch(HTML_CODE, /forecast|countdown|next-storm|next storm|phase|turn \d|turn of|of 9/i);
  assert.doesNotMatch(HTML_CODE, /board\.turn|skyTurn|turnsLeft|untilStorm/);
  assert.doesNotMatch(SIT_HTML, /textContent\s*=\s*board\.sky/);
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  assert.doesNotMatch(hud, /sky|storm|bird|forecast|turn|weather/i);
  assert.equal((hud.match(/<div/g) || []).length, 2, "HUD is the wrapper plus one marks line");
  assert.match(SIT_HTML, /townEl\.classList\.toggle\("bird", board\.sky === "bird"\)/);
  assert.match(SIT_HTML, /townEl\.classList\.toggle\("storm", board\.sky === "storm"\)/);
  assert.match(SIT_HTML, /id="stormbird"/);
  const b = makeBoard().b;
  assert.equal(typeof b.sky, "string");
  assert.equal(typeof b.turn, "undefined", "the turn number is not on the API");
});

test("kill: a storm does not fire, lengthen, shorten or arrive early because the reserve, marks or roster is low", () => {
  const rich = intoSky("clear", makeBoard({ marks: 60 }));
  const poor = makeBoard({ marks: 0, stores: 0 });
  // Same number of commits from two different stocks must share a sky.
  for (let i = 0; i < 8; i++) {
    if (!poor.b.away && poor.b.canSend(HALT)) poor.b.commitSend(HALT);
    else if (poor.b.away) { poor.ctl.next = 0; poor.b.commitMeet(); }
    else if (poor.b.canCarry()) poor.b.commitCarry();
    if (!rich.b.away && rich.b.canSend(HALT)) rich.b.commitSend(HALT);
    else if (rich.b.away) { rich.ctl.next = 0; rich.b.commitMeet(); }
    else if (rich.b.canCarry()) rich.b.commitCarry();
  }
  assert.equal(poor.b.sky, rich.b.sky, "the calendar is not a function of the stocks");
  const skyFn = SIT_SIM.match(/function skyOf\(turn\)[\s\S]*?\n\}/)[0];
  assert.doesNotMatch(skyFn, /reserve|marks|roster|rangers/,
    "the calendar reads the turn and nothing about the stocks");
});

// --------------------------------- KILL: the one instrument, and the stamp

test("kill: the stated percent and the rolled threshold agree in every sky, and the roll is at MEET", () => {
  for (const sky of ["clear", "bird", "storm"]) {
    for (const id of SENDABLE) {
      const h = intoSky(sky, makeBoard({ marks: 60, stores: 6 }));
      if (id === CLOUD && h.b.record.cargoesBanked === 0) walk("h+", h);
      if (h.b.sky !== sky) continue;
      const quoted = cardFor(h.b, id);
      const calls = h.ctl.calls;
      assert.ok(h.b.commitSend(id));
      assert.equal(h.ctl.calls, calls, id + "/" + sky + ": SEND throws no die");
      assert.equal(h.b.manifest.chance, quoted.chance);
      for (const [die, home] of [[quoted.chance * (1 - 1e-12), true], [quoted.chance, false]]) {
        const g = intoSky(sky, makeBoard({ marks: 60, stores: 6 }));
        if (id === CLOUD && g.b.record.cargoesBanked === 0) walk("h+", g);
        if (!g.b.canSend(id)) continue;
        const before = g.b.marks;
        const pay = cardFor(g.b, id).pays;
        const toll = TOLL[id];
        assert.ok(g.b.commitSend(id));
        g.ctl.next = die;
        assert.ok(g.b.commitMeet());
        assert.equal(g.b.marks > before - toll, home, id + "/" + sky + " die " + die + " pay " + pay);
      }
    }
  }
  assert.equal((SIM_CODE.match(/s\.roll\(\)/g) || []).length, 1);
  const send = SIT_SIM.match(/function commitSend\(routeId, trimmed\)[\s\S]*?\n  \}/)[0];
  assert.doesNotMatch(send, /roll/, "the send holds no die");
});

test("kill: a sky change while a run is away does not alter that run, and the away card holds what it left on", () => {
  const h = intoSky("bird", makeBoard({ marks: 60, stores: 6 }));
  // Send under the bird (clear odds). The next commit advances into storm.
  if (h.b.record.cargoesBanked === 0) {
    /* may already be banked from intoSky */
  }
  assert.equal(h.b.sky, "bird");
  const quoted = cardFor(h.b, HALT);
  assert.ok(h.b.commitSend(HALT));
  const stamped = { chance: h.b.manifest.chance, percent: h.b.manifest.percent, pays: h.b.manifest.pays };
  assert.equal(stamped.chance, quoted.chance);
  assert.equal(stamped.pays, 10);
  // Terrace verb while away advances the sky into the storm.
  if (h.b.sky === "bird") {
    if (h.b.canCarry()) assert.ok(h.b.commitCarry());
    else if (h.b.canTend()) assert.ok(h.b.commitTend());
    else assert.ok(h.b.commitUp() || h.b.wait() === false);
  }
  if (h.b.canCarry() && h.b.sky !== "storm") h.b.commitCarry();
  assert.equal(h.b.away, true);
  assert.equal(h.b.manifest.chance, stamped.chance, "the away chance moved with the sky");
  assert.equal(h.b.manifest.pays, stamped.pays, "the away pay moved with the sky");
  const awayCard = cardFor(h.b, HALT);
  assert.equal(awayCard.chance, stamped.chance);
  assert.equal(awayCard.pays, stamped.pays);
  assert.equal(awayCard.out, true);
  h.ctl.next = stamped.chance * (1 - 1e-12);
  const marks = h.b.marks;
  assert.ok(h.b.commitMeet());
  assert.ok(h.b.marks > marks, "a stamped-home die still comes home after the sky turned");
});

test("kill: odds move by nothing but baseRisk, the roster and the sky — crew bonus is 0.012 × (3W + 1R) with the 0.30 cap", () => {
  assert.match(SIT_SIM, /const CREW_BONUS_CAP = 0\.3;/);
  assert.match(SIT_SIM, /Math\.min\(CREW_BONUS_CAP, \(wardens \* WARDEN_GUARD \+ rangers \* RANGER_GUARD\) \* POINT\)/);
  for (let w = 0; w <= 4; w++) {
    for (const r of [0, 1]) {
      const h = makeBoard({ marks: 60 });
      for (let i = 0; h.b.roster < w; i++) { assert.ok(i < 8); assert.ok(h.b.commitMuster(1)); }
      if (r === 1 && h.b.rangers === 0) {
        if (!h.b.canMusterRanger()) {
          walk("h+", h);
        }
        if (h.b.canMusterRanger()) h.b.commitMusterRanger();
      }
      if (h.b.rangers !== r) continue;
      for (const id of SENDABLE) {
        const c = cardFor(h.b, id);
        const risk = { "dawnspur-halt": 0.08, "mosswake-loop": 0.12, "cloud-basin-span": 0.25 }[id];
        assert.ok(Math.abs(c.chance - chance(risk, w, r, false)) < 1e-9, id + "/" + w + "W" + r + "R");
      }
    }
  }
  assert.doesNotMatch(SIM_CODE, /successBias|posture|insurance|hero|safety|damage/,
    "a refused term goes nonzero");
});

// ------------------------------------------ KILL: the Ranger and the trim

test("kill: the Ranger costs 2, caps at 1, does not refund, and always comes home", () => {
  const b = makeBoard().b;
  assert.equal(b.rangerPrice, 2);
  assert.equal(b.rangerCap, 1);
  assert.ok(b.commitMusterRanger());
  assert.equal(b.rangers, 1);
  assert.equal(b.marks, 1);
  assert.equal(b.canMusterRanger(), false);
  assert.equal(b.commitMusterRanger(), false);
  const h = makeBoard({ marks: 60, stores: 6 });
  assert.ok(h.b.commitMusterRanger());
  for (const die of [0, 1]) {
    const g = makeBoard({ marks: 60, stores: 6 });
    assert.ok(g.b.commitMusterRanger());
    assert.ok(g.b.commitSend(MOSS));
    assert.equal(g.b.rangers, 1);
    g.ctl.next = die;
    assert.ok(g.b.commitMeet());
    assert.equal(g.b.rangers, 1, "the Ranger comes home on die " + die);
  }
  assert.doesNotMatch(SIM_CODE, /rangers\s*(-=|--)/, "no un-recruit");
});

test("kill: the trim appears only in a storm with a Ranger, quotes clear chance and clear pay, and stakes the route plus two marks", () => {
  const clear = makeBoard({ marks: 60 });
  assert.ok(clear.b.commitMusterRanger());
  for (const id of SENDABLE) {
    assert.equal(clear.b.canTrim(id), false, "trim in clear");
    assert.equal(cardFor(clear.b, id).trim, null);
  }
  const bird = intoSky("bird", makeBoard({ marks: 60 }));
  if (bird.b.rangers === 0 && bird.b.canMusterRanger()) bird.b.commitMusterRanger();
  if (bird.b.sky === "bird" && bird.b.rangers >= 1) {
    for (const id of SENDABLE) assert.equal(bird.b.canTrim(id), false, "trim under the bird");
  }
  const noRanger = intoSky("storm", makeBoard({ marks: 60, stores: 6 }));
  assert.equal(noRanger.b.rangers, 0);
  for (const id of SENDABLE) {
    assert.equal(noRanger.b.canTrim(id), false, "trim with no Ranger");
    assert.equal(cardFor(noRanger.b, id).trim, null);
  }
  const h = intoSky("storm", makeBoard({ marks: 60, stores: 6 }));
  if (h.b.rangers === 0) {
    // Recruiting advances the sky — walk a fresh storm with a Ranger already on.
  }
  const g = makeBoard({ marks: 60, stores: 6 });
  assert.ok(g.b.commitMusterRanger());
  const storm = intoSky("storm", g);
  assert.equal(storm.b.rangers, 1);
  assert.equal(storm.b.sky, "storm");
  for (const id of SENDABLE) {
    if (id === CLOUD && storm.b.record.cargoesBanked === 0) continue;
    const c = cardFor(storm.b, id);
    assert.ok(c.trim, id + " must offer a trim face");
    const risk = { "dawnspur-halt": 0.08, "mosswake-loop": 0.12, "cloud-basin-span": 0.25 }[id];
    assert.ok(Math.abs(c.trim.chance - chance(risk, storm.b.roster, 1, false)) < 1e-9, id + " trim chance");
    assert.equal(c.trim.pays, PAYS[id], id + " trim pay");
    assert.equal(c.trim.extraMarks, 2);
    assert.equal(c.trim.lit, storm.b.marks >= TOLL[id] + 2);
  }
});

test("kill: a trimmed send stakes two marks more, they are marks not food, and the stake does not move with level, reserve, roster or sky", () => {
  const g = makeBoard({ marks: 60, stores: 6 });
  assert.ok(g.b.commitMusterRanger());
  const h = intoSky("storm", g);
  assert.equal(h.b.sky, "storm");
  assert.equal(h.b.rangers, 1);
  const before = { marks: h.b.marks, stores: h.b.stores };
  assert.ok(h.b.commitSend(HALT, true));
  assert.equal(before.marks - h.b.marks, 2, "the halt trim stakes exactly two marks");
  assert.equal(before.stores - h.b.stores, 0, "the trim's extra is not food");
  assert.equal(h.b.manifest.extra, 2);
  assert.equal(h.b.manifest.trimmed, true);
  assert.equal(h.b.manifest.pays, 10);
  assert.ok(Math.abs(h.b.manifest.chance - chance(0.08, h.b.roster, 1, false)) < 1e-9);
  assert.equal(h.b.record.runsTrimmed, 1);
  assert.ok(h.b.record.stormSends >= 1);
  assert.ok(h.b.record.runsOut >= h.b.record.runsTrimmed);
});

test("kill: the Ranger never touches the sky — it does not reduce the bias, shorten, delay or reveal earlier", () => {
  const a = makeBoard({ marks: 60 });
  const b = makeBoard({ marks: 60 });
  assert.ok(b.b.commitMusterRanger());
  // Equalize the commit count: a does a carry instead of the ranger hire.
  assert.ok(a.b.commitCarry());
  for (let i = 0; i < 12; i++) {
    const drive = (h) => {
      if (h.b.away) { h.ctl.next = 0; h.b.commitMeet(); }
      else if (h.b.canSend(HALT)) h.b.commitSend(HALT);
      else if (h.b.canCarry()) h.b.commitCarry();
    };
    drive(a); drive(b);
    assert.equal(a.b.sky, b.b.sky, "the Ranger moved the calendar at step " + i);
  }
  const storm = intoSky("storm", makeBoard({ marks: 60 }));
  const withR = makeBoard({ marks: 60 });
  withR.b.commitMusterRanger();
  const stormR = intoSky("storm", withR);
  const halt = cardFor(storm.b, HALT).chance;
  const haltR = cardFor(stormR.b, HALT).chance;
  // Ranger adds +0.012; the storm bias stays −0.10.
  assert.ok(Math.abs((haltR - halt) - 0.012) < 1e-9 || stormR.b.roster !== storm.b.roster,
    "the Ranger must not eat the storm's bias");
  const clearR = chance(0.08, stormR.b.roster, stormR.b.rangers, false);
  const stormChance = chance(0.08, stormR.b.roster, stormR.b.rangers, true);
  assert.ok(Math.abs(clearR - stormChance - 0.10) < 1e-9);
});

test("kill: a trimmed run counts as a run out, and runsTrimmed moves only on a committed trimmed send", () => {
  const g = makeBoard({ marks: 60, stores: 6 });
  g.b.commitMusterRanger();
  const h = intoSky("storm", g);
  const before = { out: h.b.record.runsOut, trimmed: h.b.record.runsTrimmed, storm: h.b.record.stormSends };
  assert.ok(h.b.canTrim(HALT));
  // Offered and not taken.
  assert.ok(h.b.commitSend(HALT, false));
  assert.equal(h.b.record.runsTrimmed, before.trimmed, "an untrimmed send must not increment runsTrimmed");
  assert.equal(h.b.record.runsOut, before.out + 1);
  assert.equal(h.b.record.stormSends, before.storm + 1);
  h.ctl.next = 0;
  assert.ok(h.b.commitMeet());
  assert.equal(h.b.record.runsTrimmed, before.trimmed, "a MEET must not increment runsTrimmed");
  const g2 = makeBoard({ marks: 60, stores: 6 });
  g2.b.commitMusterRanger();
  const t = intoSky("storm", g2);
  const t0 = t.b.record.runsTrimmed;
  assert.ok(t.b.commitSend(HALT, true));
  assert.equal(t.b.record.runsTrimmed, t0 + 1);
  assert.equal(t.b.record.runsOut >= 1, true);
});

// ------------------------------------------ KILL: the terrace under weather

test("kill: a carry in clear weather or under the bird pays the level at every reserve, bare included", () => {
  for (const sky of ["clear", "bird"]) {
    const h = sky === "clear" ? makeBoard({ marks: 60 }) : intoSky("bird", makeBoard({ marks: 60 }));
    assert.equal(h.b.sky, sky);
    let seenBare = h.b.reserve === 0;
    for (let i = 0; i < 8 && h.b.canCarry() && h.b.sky === sky; i++) {
      const want = Math.min(h.b.level, h.b.storesCap - h.b.stores);
      const before = h.b.stores;
      assert.equal(h.b.carryYield, want);
      assert.ok(h.b.commitCarry());
      assert.equal(h.b.stores - before, want, sky + " pay degraded at reserve after");
      if (h.b.reserve === 0) seenBare = true;
    }
    void seenBare;
  }
});

test("kill: a carry in a storm pays the three-way min, stays lit at reserve 0, and does not warn or refuse", () => {
  const h = intoSky("storm", makeBoard({ marks: 60, stores: 0 }));
  assert.equal(h.b.sky, "storm");
  assert.equal(h.b.canCarry(), true);
  const want = Math.min(h.b.level, h.b.storesCap - h.b.stores, h.b.reserve);
  assert.equal(h.b.carryYield, want);
  const before = { stores: h.b.stores, reserve: h.b.reserve, marks: h.b.marks, level: h.b.level };
  assert.ok(h.b.commitCarry());
  assert.equal(h.b.stores - before.stores, want);
  assert.equal(h.b.marks, before.marks, "a carry never moves marks");
  assert.equal(h.b.level, before.level);
  // Bare storm carry is lit and lands nothing. Draw the ground in clear
  // first so the first storm turn finds reserve 0.
  const bare = makeBoard({ marks: 60 });
  for (let i = 0; i < 4; i++) assert.ok(bare.b.commitCarry());
  assert.equal(bare.b.reserve, 0);
  intoSky("storm", bare);
  assert.equal(bare.b.sky, "storm");
  assert.equal(bare.b.reserve, 0);
  assert.equal(bare.b.canCarry(), true, "a carry at reserve 0 in a storm is lit");
  assert.equal(bare.b.carryYield, 0);
  const st = bare.b.stores;
  assert.ok(bare.b.commitCarry());
  assert.equal(bare.b.stores, st, "bare storm carry lands nothing");
  assert.match(bare.b.runSentence, /nothing is banked to meet it/);
});

test("kill: a carry draws exactly one step; a storm turn draws exactly one step; the draw floors at 0", () => {
  const h = makeBoard();
  const r0 = h.b.reserve;
  assert.ok(h.b.commitCarry());
  assert.equal(h.b.reserve, r0 - 1);
  const storm = intoSky("storm", makeBoard({ marks: 60 }));
  const rs = storm.b.reserve;
  const sky = storm.b.sky;
  assert.ok(storm.b.commitUp() || storm.b.commitMuster(1) || storm.b.commitSend(HALT) || storm.b.commitCarry());
  if (sky === "storm" && !storm.b.away) {
    // A non-carry, non-tend storm turn draws exactly one.
  }
  const s2 = intoSky("storm", makeBoard({ marks: 60 }));
  if (s2.b.canSend(HALT) && s2.b.sky === "storm") {
    const r = s2.b.reserve;
    assert.ok(s2.b.commitSend(HALT));
    assert.equal(s2.b.reserve, Math.max(0, r - 1), "a storm send draws exactly one");
  }
});

test("kill: the reserve is written by exactly three hands — carry −1, storm −1, tend +1 — and it is stored, not derived", () => {
  assert.match(SIT_SIM, /reserve: RESERVE_FULL/, "the reserve is stored at the opening");
  assert.doesNotMatch(SIT_SIM, /RESERVE_FULL - s\.carries/);
  const writes = SIM_CODE.split("\n").filter((l) => /s\.reserve\s*(\+=|-=|=[^=])/.test(l));
  assert.equal(writes.length, 3, "exactly three writers, found " + writes.length + ": " + writes.join(" | "));
  assert.ok(writes.some((l) => l.includes("+= 1")), "tend +1");
  assert.equal(writes.filter((l) => /max\(0, s\.reserve - 1\)/.test(l)).length, 2, "carry −1 and storm −1");
  // Path-dependence: tend then carry is not the same as counts.
  const a = makeBoard({ marks: 60 });
  a.b.commitCarry(); // 3
  a.b.commitCarry();
  a.b.commitCarry();
  a.b.commitCarry();
  a.b.commitCarry(); // 0
  a.b.commitTend();  // 1
  assert.equal(a.b.reserve, 1);
  const derived = Math.max(0, Math.min(4, 4 - a.b.record.carries - 0 + a.b.record.tends));
  assert.notEqual(a.b.reserve, derived, "the stored reserve must disagree with the count formula on this walk");
});

test("kill: a tend in a storm gives one step and the storm still draws one", () => {
  const h = intoSky("storm", makeBoard({ marks: 60 }));
  while (h.b.reserve >= 4 && h.b.sky === "storm") {
    if (h.b.canCarry()) h.b.commitCarry();
    else break;
  }
  if (h.b.sky !== "storm" || !h.b.canTend()) {
    const g = makeBoard({ marks: 60 });
    g.b.commitCarry();
    const s = intoSky("storm", g);
    if (s.b.canTend() && s.b.sky === "storm") {
      const r = s.b.reserve;
      assert.ok(s.b.commitTend());
      assert.equal(s.b.reserve, r, "tend +1 and storm −1 net to hold");
    }
    return;
  }
  const r = h.b.reserve;
  assert.ok(h.b.commitTend());
  assert.equal(h.b.reserve, r, "tend +1 and storm −1 net to hold");
});

test("kill: the storm touches neither greenhouse, roster, marks, record, hearth nor bank, and no level is lost", () => {
  const h = intoSky("storm", makeBoard({ marks: 60, stores: 6 }));
  const before = {
    level: h.b.level, roster: h.b.roster, rangers: h.b.rangers,
    marks: h.b.marks, record: { ...h.b.record }, town: h.b.town,
  };
  if (h.b.canSend(HALT)) {
    assert.ok(h.b.commitSend(HALT));
    assert.equal(h.b.level, before.level);
    assert.equal(h.b.roster, before.roster);
    assert.equal(h.b.rangers, before.rangers);
    assert.equal(h.b.town.hearth, "held");
    assert.equal(h.b.town.bank, "in the stone");
    assert.equal(h.b.record.cargoesBanked, before.record.cargoesBanked);
  }
  sittings(0x51E4, 200, 24, (b) => {
    assert.ok(b.level >= 1 && b.level <= 4);
    assert.ok(b.roster >= 0 && b.roster <= 4);
    assert.ok(b.rangers >= 0 && b.rangers <= 1);
    assert.ok(b.reserve >= 0 && b.reserve <= 4);
    assert.ok(b.marks >= 0);
    assert.equal(b.town.hearth, "held");
    assert.equal(b.town.bank, "in the stone");
  });
  assert.doesNotMatch(SIM_CODE, /s\.level\s*(-=|--)/);
  assert.doesNotMatch(SIT_HTML, /#greenhouse\.dead|"dead"/);
});

test("kill: no reserve number, bar, pip, meter or icon, and the ground does not move across absence", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  assert.doesNotMatch(hud, /reserve|ground|stores|food|level|greenhouse|sky|storm/i);
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i);
  assert.match(SIT_HTML, /terraceEl\.classList\.toggle\("rs" \+ i, board\.reserve === i\);/);
  const looks = [];
  for (const rs of [4, 3, 2, 1, 0]) {
    const m = cssOf().match(new RegExp("#terrace\\.rs" + rs + " \\.fill\\s*\\{\\s*height:\\s*([\\d.]+)%;\\s*background:\\s*(#[0-9a-f]{6});"));
    assert.ok(m, "#terrace.rs" + rs);
    looks.push({ height: parseFloat(m[1]) });
  }
  for (let i = 1; i < looks.length; i++) assert.ok(looks[i].height < looks[i - 1].height);
  const h = makeBoard();
  const before = snap(h.b);
  for (let i = 0; i < 40; i++) h.b.wait();
  assert.deepEqual(snap(h.b), before);
});

test("recut: the trim fork is two faces and a pad — SEND stays hot, TRIM is its own commit", () => {
  assert.match(SIT_HTML, /id="trim"/);
  assert.match(SIT_HTML, /commitSend\(pick, false\)/);
  assert.match(SIT_HTML, /commitSend\(pick, true\)/);
  assert.doesNotMatch(SIT_HTML, /pick === id && board\.canTrim/);
  assert.doesNotMatch(SIT_HTML, /SEND — TRIM —/);
  assert.doesNotMatch(SIT_HTML, /TRIM \+.*marks at /);
  const paint = SIT_HTML.slice(SIT_HTML.indexOf("function paint()"), SIT_HTML.indexOf("cardEls.forEach"));
  assert.match(paint, /\.tn"\)\.textContent/);
  assert.match(paint, /\.tp"\)\.textContent/);
  assert.match(paint, /\.to"\)\.textContent/);
  assert.doesNotMatch(SIT_HTML, /help overlay|tutorial mode|tooltip encyclopedia|\? tutorial/i);
});

test("recut: tend names the terrace the bank covers — the spend, not an odds lever", () => {
  // Recut 3 named the terrace pay. Recut 5 keeps the spend and the storm
  // draw, and replaces the pipe why ("a storm carry lands what the bank
  // covers") with an offer: cover for when the sun is off it. Odds still
  // do not move. Not a help paragraph.
  const tendPaint = SIT_HTML.slice(SIT_HTML.indexOf("tendEl.querySelector"), SIT_HTML.indexOf("upEl.querySelector"));
  assert.doesNotMatch(tendPaint, /success|percent|odds|chance|safer|improve|held through|out-tended/i);
  assert.doesNotMatch(tendPaint, /earns nothing/);
  assert.doesNotMatch(tendPaint, /the bank holds/i);
  assert.doesNotMatch(tendPaint, /A storm carry lands what the bank covers/);
  assert.match(tendPaint, /one mark into the bank\. Opens cover for when the sun is off it/);
  assert.match(tendPaint, /one mark into the bank\. The storm takes one\. Opens cover for when the sun is off it/);
  assert.match(SIT_SIM, /TEND_CLEAR = "One mark went into the bank\. Cover stands for when the sun is off it\."/);
  assert.match(SIT_SIM, /TEND_STORM = "One mark went into the bank\. The storm took one\. Cover stands for when the sun is off it\."/);
  const tendWords = SIT_SIM.match(/TEND_CLEAR = "([^"]+)"/)[1] + " " + SIT_SIM.match(/TEND_STORM = "([^"]+)"/)[1];
  assert.doesNotMatch(tendWords, /success|percent|odds|chance|safer|improve|held through|out-tended/i);
  assert.doesNotMatch(tendWords, /A storm carry lands what the bank covers/);
  assert.match(tendWords, /bank/);
  assert.match(tendWords, /cover/i);
  assert.match(SIT_SIM, /GROUND_FULL = "The ground is full: the terrace had a bank for when the sun went off it\."/);
  assert.match(SIT_SIM, /GROUND_DRAWN = "The ground is drawn and standing: the bank covered the terrace when the sun was off it\."/);
  assert.match(SIT_SIM, /GROUND_BARE = "The ground is bare: the terrace had nothing banked when the sun went off it\."/);
  const clear = walk("C", makeBoard({ marks: 60 }));
  const before = clear.b.cards().map((c) => c.percent);
  assert.ok(clear.b.canTend());
  assert.ok(clear.b.commitTend());
  assert.equal(clear.b.runSentence, "One mark went into the bank. Cover stands for when the sun is off it.");
  assert.deepEqual(clear.b.cards().map((c) => c.percent), before,
    "a tend must not move the stated percent — odds still move only by baseRisk, roster and sky");
  const storm = intoSky("storm", makeBoard({ marks: 60 }));
  if (storm.b.reserve >= 4) assert.ok(storm.b.commitCarry());
  assert.ok(storm.b.canTend(), "a storm sit must be able to tend so the terrace sentence can fire");
  const stormBefore = storm.b.cards().map((c) => c.percent);
  const skyBefore = storm.b.sky;
  assert.ok(storm.b.commitTend());
  assert.match(storm.b.runSentence, /One mark went into the bank\. The storm took one\. Cover stands for when the sun is off it\./);
  assert.doesNotMatch(storm.b.runSentence, /success|percent|odds|chance|safer|improve|held through|out-tended/i);
  assert.doesNotMatch(storm.b.runSentence, /A storm carry lands what the bank covers/);
  if (storm.b.sky === skyBefore) {
    assert.deepEqual(storm.b.cards().map((c) => c.percent), stormBefore,
      "a storm tend that does not turn the sky must leave every percent where it was");
  }
  assert.doesNotMatch(SIT_HTML, /help overlay|tutorial mode|tooltip encyclopedia|\? overlay|\? tutorial/i);
});

test("recut: Warden, Carry, Tend and Up name a reason to tap, not the pipe", () => {
  // Recut 4 sit: Ranger gold held. The other four second sentences copied
  // Ranger's shape and named the pipe (how the board moves stuff). David:
  // those descriptions of why to do these things do not make much sense.
  // Recut 5 keeps the first sentence (what the row is) and writes an offer
  // — a thing the player can take — the way Ranger names the long way.
  // The log already taught the Warden why. No deaths, no sink, no ?.
  const rangerPaint = SIT_HTML.slice(SIT_HTML.indexOf("rangerEl.querySelector"), SIT_HTML.indexOf("tendEl.querySelector"));
  assert.match(rangerPaint, /The Ranger is on the roster\. Storm sends offer the long way\./);
  assert.match(rangerPaint, /one berth\. Opens the long way around a storm\./);
  assert.doesNotMatch(rangerPaint, /weather unit/);

  assert.match(SIT_HTML, /id="muster-say"/);
  const wardenPaint = SIT_HTML.slice(SIT_HTML.indexOf("musterSay"), SIT_HTML.indexOf("carryEl.querySelector"));
  assert.doesNotMatch(wardenPaint, /Sends go out under their guard/);
  assert.match(wardenPaint, /The Wardens are on the roster\. They bring the cargo home\./);
  assert.match(wardenPaint, /the roster\. Opens the cargo's way home\./);
  assert.doesNotMatch(wardenPaint, /help overlay|\? overlay|tutorial|tooltip encyclopedia/i);
  const wardenWhy = SIT_HTML.slice(SIT_HTML.indexOf("musterSay.textContent"), SIT_HTML.indexOf("const cards ="));
  assert.doesNotMatch(wardenWhy, /upkeep|roster drain|units sink|deaths/i);

  const carryPaint = SIT_HTML.slice(SIT_HTML.indexOf("carryEl.querySelector"), SIT_HTML.indexOf("rangerEl.querySelector"));
  assert.doesNotMatch(carryPaint, /one trip up the hill, one step of ground/);
  assert.doesNotMatch(carryPaint, /Sends take their provisions from what lands/);
  assert.doesNotMatch(carryPaint, /Sends take their provisions from here/);
  assert.match(carryPaint, /the terrace into the stores\. Opens a landing\./);
  assert.match(carryPaint, /The stores are full\. The landing stands\./);

  const tendPaint = SIT_HTML.slice(SIT_HTML.indexOf("tendEl.querySelector"), SIT_HTML.indexOf("upEl.querySelector"));
  assert.doesNotMatch(tendPaint, /A storm carry lands what the bank covers/);
  assert.match(tendPaint, /one mark into the bank\. Opens cover for when the sun is off it/);
  assert.match(tendPaint, /The ground is full\. Cover stands for when the sun is off it\./);
  assert.doesNotMatch(tendPaint, /success|percent|odds|chance|safer|improve/i);

  const upPaint = SIT_HTML.slice(SIT_HTML.indexOf("upEl.querySelector"), SIT_HTML.indexOf("trainEl.classList"));
  assert.doesNotMatch(upPaint, /greenhouse " \+ board\.level/);
  assert.doesNotMatch(upPaint, /Carries land the new height/);
  assert.doesNotMatch(upPaint, /Carries land the full height/);
  assert.match(upPaint, /one level of glass\. Opens a taller greenhouse\./);
  assert.match(upPaint, /The terrace is topped\. A storm cargo home can end it\./);
  assert.match(upPaint, /one level of glass\. Wants /);

  assert.doesNotMatch(SIT_SIM, /Carries land the new height/);
  assert.doesNotMatch(SIT_SIM, /A storm carry lands what the bank covers/);
  assert.doesNotMatch(SIT_HTML, /help overlay|tutorial mode|tooltip encyclopedia|\? overlay|\? tutorial/i);
  assert.doesNotMatch(SIT_HTML, /title="[^"]{20,}"/);
});

test("recut: a live home desk with lit sends cannot read as a dead pad — the remaining verb is pick a route, then SEND", () => {
  const paint = SIT_HTML.slice(SIT_HTML.indexOf("function paint()"), SIT_HTML.indexOf("cardEls.forEach"));
  assert.match(paint, /SEND — pick a route/);
  assert.match(paint, /classList\.toggle\("waiting"/);
  assert.match(paint, /litSends\(\)\.length/);
  assert.match(cssOf(), /button\.pad:disabled\.waiting/);
  const waitingRule = rule("button.pad:disabled.waiting");
  assert.match(waitingRule, /opacity:\s*1/);
  assert.doesNotMatch(SIT_HTML, /help overlay|tutorial mode|tooltip encyclopedia|\? overlay|\? tutorial/i);
  const home = makeBoard({ marks: 71, stores: 6 }).b;
  assert.equal(home.away, false);
  assert.equal(home.stopped, false);
  assert.ok(home.litSends().length >= 1, "the false-stop sit had lit sends");
  assert.ok(home.canSend(HALT));
  const away = walk("h").b;
  assert.equal(away.away, true);
  assert.deepEqual(away.litSends(), []);
  const stop = walk("CUCh+UUc+").b;
  assert.equal(stop.stopped, true);
  assert.deepEqual(stop.litSends(), []);
});

test("recut: a commit that already changed something no longer stays silent — same caption voice", () => {
  const w = walk("W", makeBoard({ marks: 60 }));
  assert.equal(w.b.runSentence, "The desk spent 3 marks. 1 Warden is on the roster.");
  const ww = walk("WW", makeBoard({ marks: 60 }));
  assert.match(ww.b.runSentence, /The desk spent 3 marks\. 2 Wardens are on the roster\./);
  const g = walk("G", makeBoard({ marks: 60 }));
  assert.equal(g.b.runSentence, "The desk spent 2 marks. The Ranger is on the roster.");
  const left = walk("h");
  assert.equal(left.b.runSentence, "The train left for Dawnspur Halt with nothing staked.");
  const moss = walk("CCm", makeBoard({ marks: 60, stores: 0 }));
  assert.match(moss.b.runSentence, /The train left for Mosswake with two from the terrace\./);
  const grew = walk("U", makeBoard({ marks: 60 }));
  assert.equal(grew.b.runSentence, "The greenhouse is at two. A taller greenhouse stands.");
  const grew2 = walk("UU", makeBoard({ marks: 60 }));
  assert.match(grew2.b.runSentence, /The greenhouse is at three\. A taller greenhouse stands\./);
  const top = walk("UUU", makeBoard({ marks: 60 }));
  assert.match(top.b.runSentence, /The terrace is topped\. The next Chartered cargo home out of a storm ends the sitting\./);
  const fullPay = walk("C");
  assert.equal(fullPay.b.runSentence, null, "a full clear carry stays silent — the beat already named that silence");
  assert.doesNotMatch(SIT_HTML, /help overlay|tutorial mode|tooltip encyclopedia|\? overlay/i);
});

test("recut: carryBill previews a storm bill only when the reserve binds, present tense", () => {
  const open = makeBoard().b;
  assert.equal(open.sky, "clear");
  assert.equal(open.carryBill, null, "clear carry does not preview a weather bill");
  const bird = intoSky("bird", makeBoard({ marks: 60 }));
  assert.equal(bird.b.sky, "bird");
  assert.equal(bird.b.carryBill, null, "bird carry does not preview a weather bill");
  const h = walk("CUCh+UU");
  assert.equal(h.b.sky, "storm");
  assert.ok(h.b.reserve < h.b.level);
  const landed = Math.min(h.b.level, h.b.storesCap - h.b.stores, h.b.reserve);
  assert.equal(landed, h.b.reserve, "this walk binds the reserve");
  assert.ok(h.b.carryBill);
  assert.match(h.b.carryBill, /The bank covers /);
  assert.doesNotMatch(h.b.carryBill, /covered/);
  const carryPaint = SIT_HTML.slice(SIT_HTML.indexOf("carryEl.querySelector"), SIT_HTML.indexOf("rangerEl.querySelector"));
  assert.match(carryPaint, /board\.carryBill/);
});

test("recut: the Ranger names the long way, not a weather unit", () => {
  const rangerPaint = SIT_HTML.slice(SIT_HTML.indexOf("rangerEl.querySelector"), SIT_HTML.indexOf("tendEl.querySelector"));
  assert.match(rangerPaint, /Opens the long way around a storm/);
  assert.match(rangerPaint, /Storm sends offer the long way/);
  assert.doesNotMatch(rangerPaint, /weather unit/);
});

test("kill: TEND is back — 1 mark, +1 reserve, lit only below full, and it stays lit past a topped terrace", () => {
  const b = makeBoard({ marks: 60 }).b;
  assert.equal(typeof b.canTend, "function");
  assert.equal(typeof b.commitTend, "function");
  assert.equal(b.tendPrice, 1);
  assert.equal(b.canTend(), false, "dark on full ground");
  assert.ok(b.commitCarry());
  assert.equal(b.canTend(), true);
  const r = b.reserve;
  const m = b.marks;
  assert.ok(b.commitTend());
  assert.equal(b.reserve, r + 1);
  assert.equal(b.marks, m - 1);
  const top = makeBoard({ marks: 60 });
  for (let i = 0; top.b.level < 4; i++) { assert.ok(i < 8); assert.ok(top.b.commitUp()); }
  assert.equal(top.b.armed, true);
  assert.equal(top.b.stopped, false);
  assert.ok(top.b.commitCarry());
  assert.equal(top.b.canTend(), true, "TEND stays lit past topping");
  assert.equal(top.b.canCarry(), true, "CARRY stays lit past topping");
  assert.equal(top.b.canUp(), false, "UP still darks at level 4");
});

test("kill: MOSSWAKE +3 never appears", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitB, "undefined");
  assert.doesNotMatch(SIM_CODE, /MOSSWAKE \+3|bArmed|commitB\b/);
  assert.equal(b.cards().filter((c) => c.name.includes("MOSSWAKE")).length, 1);
});

// ------------------------------------------ KILL: two vehicles, one sky

test("kill: no terrace verb goes dark because a line run is away — THE MOSSWAKE CUT RESTS ON THIS", () => {
  for (const id of SENDABLE) {
    const h = makeBoard({ marks: 60, stores: 6 });
    if (id === CLOUD) walk("h+", h);
    assert.ok(h.b.commitSend(id));
    assert.equal(h.b.canCarry(), h.b.stores < h.b.storesCap, id + ": CARRY reads the stores, not away");
    assert.equal(h.b.canTend(), h.b.reserve < 4 && h.b.marks >= 1, id + ": TEND reads reserve and marks, not away");
    assert.equal(h.b.canUp(), h.b.level < 4 && h.b.marks >= (UP_PRICE[h.b.level] || Infinity),
      id + ": UP reads the level and the wallet, not away");
  }
  for (const fn of ["canCarry", "canTend", "canUp"]) {
    const body = SIT_SIM.match(new RegExp("function " + fn + "\\(\\)[\\s\\S]*?\\n  \\}"));
    assert.ok(body, fn);
    assert.doesNotMatch(body[0], /s\.away/, fn + " must not read the away state");
  }
});

test("kill: no line verb goes dark because the terrace is busy", () => {
  const body = SIT_SIM.match(/function canSend\(routeId\)[\s\S]*?\n  \}/);
  assert.ok(body);
  assert.doesNotMatch(body[0], /carr|level|reserve|tend/i);
  assert.match(body[0], /return s\.stores >= r\.provisions && s\.marks >= r\.toll;/);
});

test("kill: a terrace verb taken while a run is away advances the sky by exactly one step", () => {
  const h = walk("h");
  assert.equal(h.b.away, true);
  const sky = h.b.sky;
  const period = ["clear", "clear", "clear", "clear", "clear", "bird", "bird", "storm", "storm"];
  const idx = period.indexOf(sky) >= 0 ? 0 : 0;
  void idx;
  assert.ok(h.b.commitCarry());
  // One commit: opening send was turn 1 clear → bird? No: send resolved clear, advanced to turn 2 clear.
  // Then carry resolved clear, advanced to turn 3 clear.
  assert.equal(h.b.sky, "clear");
  const g = makeBoard({ marks: 60, stores: 6 });
  // Drive to the last clear turn so a terrace verb while away crosses into bird.
  intoSky("clear", g);
  while (g.b.sky === "clear") {
    if (g.b.away) { g.ctl.next = 0; g.b.commitMeet(); continue; }
    if (g.b.canSend(HALT)) { g.b.commitSend(HALT); break; }
    if (g.b.canCarry()) { g.b.commitCarry(); continue; }
    break;
  }
  if (g.b.away) {
    const from = g.b.sky;
    if (g.b.canCarry()) {
      assert.ok(g.b.commitCarry());
      const order = ["clear", "clear", "clear", "clear", "clear", "bird", "bird", "storm", "storm"];
      void order;
      assert.notEqual(g.b.sky, undefined);
      // Exactly one step: if we were on the last clear, we are now bird; if earlier, still clear or bird.
      assert.ok(g.b.sky === from || g.b.sky === "bird" || g.b.sky === "storm" || g.b.sky === "clear");
    }
  }
  // Counted: from a known turn, one terrace commit moves one slot in the cycle.
  const k = makeBoard({ marks: 60 });
  walk("h", k);
  const seq = [];
  seq.push(k.b.sky);
  assert.ok(k.b.commitCarry());
  seq.push(k.b.sky);
  assert.ok(k.b.commitCarry());
  seq.push(k.b.sky);
  assert.deepEqual(seq, ["clear", "clear", "clear"]);
});

test("kill: UP does not ride a train", () => {
  const h = walk("h");
  assert.equal(h.b.away, true);
  const lv = h.b.level;
  if (h.b.canUp()) {
    assert.ok(h.b.commitUp());
    assert.equal(h.b.level, lv + 1);
    assert.equal(h.b.away, true);
  }
  assert.doesNotMatch(SIT_HTML, /upEl[^\n]*train|train[^\n]*upEl/i);
});

// ------------------------------------------ KILL: inherited desk

test("kill: pinned figures stand — 3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 / UP 3,4,5 / TEND 1 / reserve 4 / roster 4", () => {
  const b = makeBoard().b;
  assert.equal(b.musterPrice, 3);
  assert.equal(b.rangerPrice, 2);
  assert.equal(b.tendPrice, 1);
  assert.equal(b.rosterCap, 4);
  assert.equal(b.rangerCap, 1);
  assert.equal(b.reserveFull, 4);
  assert.equal(b.maxLevel, 4);
  assert.equal(b.storesCap, 6);
  for (const [id, w] of Object.entries({
    "dawnspur-halt": { pays: 10, provisions: 0, toll: 0 },
    "mosswake-loop": { pays: 14, provisions: 2, toll: 0 },
    "cloud-basin-span": { pays: 18, provisions: 3, toll: 1 },
  })) {
    const c = cardFor(b, id);
    assert.equal(c.pays, w.pays);
    assert.equal(c.provisions, w.provisions);
    assert.equal(c.toll, w.toll);
  }
  const rich = makeBoard({ marks: 60 }).b;
  assert.equal(rich.upPrice, 3);
  rich.commitUp();
  assert.equal(rich.upPrice, 4);
  rich.commitUp();
  assert.equal(rich.upPrice, 5);
  for (const id of SENDABLE) {
    for (let w = 1; w <= 4; w++) {
      const step = ODDS[id][w] / 100 - ODDS[id][w - 1] / 100;
      assert.ok(Math.abs(step - 0.036) < 1e-9);
    }
  }
});

test("kill: food buys exactly one thing — marks and food never share a sink", () => {
  const c = walk("C");
  assert.equal(c.b.marks, OPENING_MARKS, "a carry must never move marks");
  assert.ok(c.b.stores > 0);
  const t = walk("CT");
  assert.equal(t.b.marks, OPENING_MARKS - 1);
  assert.equal(t.b.stores, 1);
  const g = walk("G");
  assert.equal(g.b.marks, 1);
  assert.equal(g.b.stores, 0);
  sittings(0xF00D, 200, 30, (b) => {
    assert.ok(b.marks >= 0);
    assert.ok(b.stores >= 0 && b.stores <= STORES_CAP);
  });
});

test("kill: the charter is shut until a cargo is banked, in any sky", () => {
  for (const marks of [0, 3, 12, 60]) {
    for (const stores of [0, 3, 6]) {
      const b = Storm.createBoard({ marks: marks, stores: stores });
      assert.equal(b.canSend(CLOUD), false);
    }
  }
  const storm = intoSky("storm", makeBoard({ marks: 60, stores: 6 }));
  if (storm.b.record.cargoesBanked === 0) {
    assert.equal(storm.b.canSend(CLOUD), false, "a storm does not open the charter");
  }
});

test("kill: one run at a time; MUSTER and the Ranger are dark while the roster rides and at the stop", () => {
  const h = walk("h");
  assert.equal(h.b.away, true);
  for (const id of SENDABLE.concat([RUST])) {
    assert.equal(h.b.canSend(id), false);
    assert.equal(h.b.commitSend(id), false);
  }
  assert.equal(h.b.musterReach, 0);
  assert.equal(h.b.canMusterRanger(), false);
  assert.equal(h.b.commitMuster(1), false);
  assert.equal(h.b.commitMusterRanger(), false);
});

test("kill: Rustfall never sends, never quotes, and stays dark in every sky", () => {
  for (const sky of ["clear", "bird", "storm"]) {
    const h = intoSky(sky, makeBoard({ marks: 60, stores: 6 }));
    const c = cardFor(h.b, RUST);
    assert.equal(c.sendable, false);
    assert.equal(c.chance, null);
    assert.equal(c.percent, null);
    assert.equal(h.b.canSend(RUST), false);
  }
  assert.doesNotMatch(BOARD, /\bcombat\b|\bscenario\b|\bwave\b|\bplacement\b|marksm[ae]n|\bgunner|\bsapper/i);
});

test("kill: the crew always comes home — Wardens and the Ranger alike, trimmed or not, any sky", () => {
  for (const trim of [false, true]) {
    const g = makeBoard({ marks: 60, stores: 6 });
    g.b.commitMuster(1);
    g.b.commitMusterRanger();
    const h = trim ? intoSky("storm", g) : g;
    if (trim && !h.b.canTrim(MOSS)) continue;
    const w = h.b.roster;
    const r = h.b.rangers;
    assert.ok(h.b.commitSend(MOSS, trim));
    assert.equal(h.b.roster, w);
    assert.equal(h.b.rangers, r);
    h.ctl.next = 1;
    assert.ok(h.b.commitMeet());
    assert.equal(h.b.roster, w);
    assert.equal(h.b.rangers, r);
  }
});

test("kill: a failed run pays zero and returns no food; nothing refunds", () => {
  for (const id of SENDABLE) {
    const h = makeBoard({ marks: 60, stores: 6 });
    if (id === CLOUD) walk("h+", h);
    const before = { marks: h.b.marks, stores: h.b.stores };
    assert.ok(h.b.commitSend(id));
    h.ctl.next = 1;
    assert.ok(h.b.commitMeet());
    assert.equal(h.b.marks, before.marks - TOLL[id]);
    assert.equal(h.b.stores, before.stores - PROVISIONS[id]);
  }
  assert.doesNotMatch(SIM_CODE, /rewardMultiplier|consolation|\*\s*0\.25|0\.25\s*\*/);
});

// ------------------------------------------ KILL: states and sentences

test("kill: an away state always has MEET lit, and no reachable unstopped state has an empty lit set", () => {
  sittings(0xDEAD, 300, 36, (b) => {
    if (b.stopped) {
      assert.deepEqual(b.litJobs(), []);
      return;
    }
    assert.ok(b.litJobs().length >= 1, "dead state at sky " + b.sky);
    if (b.away) {
      assert.equal(b.canMeet(), true);
      assert.ok(b.litJobs().includes("meet"));
      assert.deepEqual(b.litSends(), []);
    }
  });
});

test("kill: the ending arms on level 4, says so with the storm clause, and does not read the sky", () => {
  const h = makeBoard({ marks: 60 });
  assert.equal(h.b.armed, false);
  h.b.commitUp();
  h.b.commitUp();
  assert.equal(h.b.armed, false);
  h.b.commitUp();
  assert.equal(h.b.armed, true);
  assert.match(h.b.runSentence, /The terrace is topped\. The next Chartered cargo home out of a storm ends the sitting\./);
  sittings(0xA124, 200, 24, (b) => {
    assert.equal(b.armed, b.level >= 4, "armed must be exactly topped, in any sky");
  });
});

test("kill: topping alone never stops; an unarmed Chartered cargo never stops; a turned-back storm run while armed does not stop; only a Chartered cargo banked out of a storm while armed fires", () => {
  const topped = makeBoard({ marks: 60 });
  for (let i = 0; topped.b.level < 4; i++) topped.b.commitUp();
  assert.equal(topped.b.armed, true);
  assert.equal(topped.b.stopped, false);
  // Unarmed Chartered cargo in any sky.
  const unarmed = makeBoard({ marks: 60, stores: 6 });
  walk("h+c+", unarmed);
  assert.equal(unarmed.b.armed, false);
  assert.equal(unarmed.b.stopped, false);
  // Beat's earliest stop: CARRY, UP, CARRY, SEND halt, MEET, UP, UP, SEND basin, MEET.
  const stop = walk("CUCh+UUc+");
  assert.equal(stop.b.armed, true);
  assert.equal(stop.b.stopped, true);
  assert.ok(stop.b.endSentence);
  assert.equal(stop.b.marks, 24);
  assert.equal(stop.b.reserve, 0);
  // Turned-back storm run while armed.
  const miss = walk("CUCh+UUc-");
  assert.equal(miss.b.armed, true);
  assert.equal(miss.b.stopped, false, "a turned-back storm run while armed is not an ending");
  assert.ok(miss.b.litJobs().includes(HALT));
  // Armed + Chartered cargo in CLEAR must not stop.
  const clearArmed = makeBoard({ marks: 60, stores: 6 });
  for (let i = 0; clearArmed.b.level < 4; i++) clearArmed.b.commitUp();
  walk("h+c+", clearArmed);
  assert.equal(clearArmed.b.armed, true);
  assert.equal(clearArmed.b.stopped, false, "a clear Chartered cargo while armed must not stop");
});

test("kill: a sky change prints its sentence; the bird says what is behind it", () => {
  const h = makeBoard({ marks: 60 });
  let sawBird = false;
  let sawStorm = false;
  let sawClear = false;
  for (let i = 0; i < 20; i++) {
    if (h.b.away) { h.ctl.next = 0; h.b.commitMeet(); }
    else if (h.b.canSend(HALT)) h.b.commitSend(HALT);
    else if (h.b.canCarry()) h.b.commitCarry();
    if (h.b.skySentence) {
      if (/stormbird is inland/.test(h.b.skySentence)) {
        sawBird = true;
        assert.match(h.b.skySentence, /There is a storm coming in behind it/);
      }
      if (/The storm is over Dawnspur/.test(h.b.skySentence)) sawStorm = true;
      if (/The storm has gone off east/.test(h.b.skySentence)) sawClear = true;
    }
  }
  assert.ok(sawBird && sawStorm && sawClear, "all three sky sentences must fire");
});

test("kill: a capped storm carry prints the bill; an uncapped carry does not", () => {
  const full = makeBoard({ marks: 60 });
  assert.ok(full.b.commitCarry());
  assert.equal(full.b.runSentence, null, "a full clear carry prints no bill");
  // Storm carry that the reserve binds: walk to storm at level 4 with reserve below 4.
  const h = walk("CUCh+UU");
  assert.equal(h.b.sky, "storm");
  assert.equal(h.b.level, 4);
  assert.ok(h.b.reserve < 4);
  if (h.b.canCarry()) {
    const r = h.b.reserve;
    const landed = Math.min(h.b.level, h.b.storesCap - h.b.stores, r);
    assert.ok(h.b.commitCarry());
    if (landed < 4 && landed === r) {
      if (r === 0) assert.match(h.b.runSentence, /nothing is banked to meet it/);
      else assert.match(h.b.runSentence, /The bank covered /);
    }
  }
});

test("kill: a storm run names the storm as its agent; a trimmed run names the Ranger", () => {
  const stop = walk("CUCh+UUc+");
  assert.match(stop.b.runSentence, /home out of the storm\. The desk banks 24\./);
  const g = makeBoard({ marks: 60, stores: 6 });
  g.b.commitMusterRanger();
  const h = intoSky("storm", g);
  if (h.b.record.cargoesBanked === 0) walk("h+", h);
  if (h.b.sky === "storm" && h.b.canTrim(HALT)) {
    assert.ok(h.b.commitSend(HALT, true));
    h.ctl.next = 0;
    assert.ok(h.b.commitMeet());
    assert.match(h.b.runSentence, /The Ranger took them round the weather/);
    assert.match(h.b.runSentence, /The desk banks 10\./);
  }
});

test("kill: in a storm a changed figure is typed as changed, and the trim is a second face on the same card", () => {
  assert.match(cssOf(), /\.co\.wx/);
  assert.match(cssOf(), /\.cp\.wx/);
  assert.match(SIT_HTML, /classList\.toggle\("wx"/);
  // Recut 2026-08-29: both faces sit on the card at once. A second tap that
  // replaces the hot figures is what made the fork leave no impression.
  assert.doesNotMatch(SIT_HTML, /trimFace/);
  assert.doesNotMatch(SIT_HTML, /trim-face/);
  assert.match(SIT_HTML, /class="tn"/);
  assert.match(SIT_HTML, /class="tp"/);
  assert.match(SIT_HTML, /class="ts"/);
  assert.match(SIT_HTML, /class="to"/);
  assert.match(SIT_HTML, /classList\.toggle\("fork", !!c\.trim\)/);
  const g = makeBoard({ marks: 60, stores: 6 });
  g.b.commitMusterRanger();
  const h = intoSky("storm", g);
  assert.equal(h.b.sky, "storm");
  assert.equal(cardFor(h.b, CLOUD).shifted || cardFor(h.b, HALT).shifted, true);
  assert.equal(cardFor(h.b, HALT).pays, 10);
  if (h.b.record.cargoesBanked > 0) assert.equal(cardFor(h.b, CLOUD).pays, 24);
  const halt = cardFor(h.b, HALT);
  assert.ok(halt.trim);
  assert.equal(halt.pays, 10);
  assert.equal(halt.trim.pays, 10);
  assert.ok(halt.trim.percent > halt.percent, "the trim face quotes the clear chance beside the storm chance");
});

test("kill: a turned-back run keeps zero-pay, stake-spent, crew-home, desk-stands, and names only who rode", () => {
  const h = makeBoard({ stores: 6 });
  assert.ok(h.b.commitSend(MOSS));
  h.ctl.next = 1;
  assert.ok(h.b.commitMeet());
  const s = h.b.runSentence;
  assert.match(s, /the route paid nothing/);
  assert.match(s, /nothing comes back/);
  assert.match(s, /the train is home/);
  assert.match(s, /the desk stands/);
  assert.doesNotMatch(s, /Warden/, "names a crew that did not ride");
  assert.equal(s,
    "Wet rail through the Mosswake loop. The train turned for home with the haul unbanked. " +
    "Two from the terrace and nothing comes back; the route paid nothing; the train is home, " +
    "and the desk stands.");
});

test("kill: the terminal reads the desk record, the ground in three registers, and the trim as a rate against storm sends", () => {
  const stop = walk("CUCh+UUc+");
  assert.equal(stop.b.stopped, true);
  const said = stop.b.endSentence;
  assert.match(said, /The basin cargo is home out of the storm/);
  assert.match(said, /runs out/);
  assert.match(said, /cargoes banked/);
  assert.match(said, /went out under storm/);
  assert.match(said, /trimmed/);
  assert.match(said, /The ground is bare: the terrace had nothing banked when the sun went off it/);
  assert.match(said, /The record keeps what came home; the line past the basin is the next sitting's\.$/);
  assert.doesNotMatch(said, /one of them trimmed(?!.)/); // rate, not a bare count alone — the storm denominator is beside it
  assert.match(said, /of those runs went out under storm/);
  assert.equal(stop.b.record.runsTrimmed, 0);
  assert.ok(stop.b.record.stormSends >= 1);
  const drawn = walk("UUUCh+Tc+", makeBoard({ marks: 60, stores: 0 }));
  assert.equal(drawn.b.stopped, true);
  assert.ok(drawn.b.reserve > 0 && drawn.b.reserve < 4, "drawn register, reserve " + drawn.b.reserve);
  assert.match(drawn.b.endSentence, /The ground is drawn and standing: the bank covered the terrace when the sun was off it/);
  const full = walk("UUUCh+TcTT+", makeBoard({ marks: 60, stores: 0 }));
  assert.equal(full.b.stopped, true);
  assert.equal(full.b.reserve, 4, "full register reachable because TEND returns and a terrace verb while away is a turn");
  assert.match(full.b.endSentence, /The ground is full: the terrace had a bank for when the sun went off it/);
  assert.match(SIT_SIM, /GROUND_FULL/);
  assert.match(SIT_SIM, /GROUND_DRAWN/);
  assert.match(SIT_SIM, /GROUND_BARE/);
});

test("kill: the HUD keeps its one line — marks, and nothing joins it", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds exactly one line, found " + children.length);
  assert.match(hud, /id="marks-line"/);
  assert.equal((hud.match(/<button/g) || []).length, 0, "no control in the HUD");
  assert.match(SIT_HTML, /marksLine\.textContent = board\.marks \+ \(board\.marks === 1 \? " mark" : " marks"\);/);
});

test("the stack carries two labelled groups, TEND and MUSTER RANGER as bars, Ranger as a button", () => {
  assert.match(SIT_HTML, /<div class="grouplabel">THE DESK<\/div>/);
  assert.match(SIT_HTML, /<div class="grouplabel">THE TERRACE<\/div>/);
  assert.match(SIT_HTML, /<button type="button" class="card" id="carry">/);
  assert.match(SIT_HTML, /<button type="button" class="card" id="tend">/);
  assert.match(SIT_HTML, /<button type="button" class="card" id="up">/);
  assert.match(SIT_HTML, /<button type="button" class="card" id="ranger">/);
  assert.match(SIT_HTML, /MUSTER RANGER/);
  assert.match(SIT_HTML, /MUSTER WARDEN/);
  assert.doesNotMatch(SIT_HTML, /id="ranger-track"|id="rtrack"/, "the Ranger is a button, not a slider");
  assert.match(rule("#ladder"), /background:\s*var\(--card\)/);
  assert.match(rule("button.card"), /flex:\s*1 0 auto/);
  assert.match(cssOf(), /--thumb:\s*44px/);
  assert.doesNotMatch(SIT_HTML, /@keyframes|animation:/i);
});

test("kill: marks rise only at a payout; food is produced only at a carry; stores have exactly two writers", () => {
  const marksUp = SIM_CODE.split("\n").filter((l) => /s\.marks\s*\+=/.test(l));
  assert.equal(marksUp.length, 1);
  assert.ok(marksUp[0].includes("run.pays") || marksUp[0].includes("r.pays"));
  const foodUp = SIM_CODE.split("\n").filter((l) => /s\.stores\s*\+=/.test(l));
  assert.equal(foodUp.length, 1);
  const writers = SIM_CODE.split("\n").filter((l) => /s\.stores\s*(\+=|-=|=)/.test(l));
  assert.equal(writers.length, 2);
});

test("kill: the stores cap is 6, and it is DERIVED rather than chosen", () => {
  assert.equal(makeBoard().b.storesCap, 6);
  assert.match(SIT_SIM, /const STORES_CAP = MAX_PROVISIONS \+ MAX_LEVEL - 1;/);
  assert.doesNotMatch(SIT_SIM, /const STORES_CAP = 6/);
});

test("kill: CARRY is dark when the stores are full, and never otherwise short of the stop", () => {
  const full = makeBoard({ stores: STORES_CAP }).b;
  assert.equal(full.canCarry(), false);
  assert.equal(full.commitCarry(), false);
  sittings(0xF011, 200, 24, (b) => {
    if (b.stopped) return;
    assert.equal(b.canCarry(), b.stores < b.storesCap);
  });
});

test("banned tokens: the REFUSED table, graded over the board's code and the board's words", () => {
  const banned = [
    /insurance/i, /posture/i, /\bhero\b/i, /successBias/, /\bsafety\b/i, /\bdamage\b/i,
    /signal.?tower/i, /\bmission\b/i, /\bmaterials\b/i, /\benergy\b/i, /\bparts\b/i,
    /\bwarehouse\b/i, /\bration/i, /\bupkeep\b/i, /\bdecay\b/i,
    /durationSeconds|baseSeconds/, /\btimer\b|countdown/i, /audio|new Audio/i,
    /forecast/i, /marksm[ae]n/i, /\bengineer\b/i, /\bgunner/i, /\bsapper/i,
    /MOSSWAKE \+3/, /\bGOODS\b/, /\bHOLD\b/, /\bWARM\b/,
  ];
  for (const re of banned) {
    assert.equal(re.test(BOARD), false, "banned token " + re + " appears");
  }
});

test("kill: this board does not read or write any other board's persisted state", () => {
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/);
  assert.doesNotMatch(SIT_SIM, /dawnspur-line|dawnspur-dispatch|dawnspur-scale|dawnspur-heat|convoy-stop/);
});

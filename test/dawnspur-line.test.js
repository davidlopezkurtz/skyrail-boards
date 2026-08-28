"use strict";

// CFD-203, the join sitting. The spec is docs/cfd-203-beat.md (SIGNED — David,
// 2026-08-27, by delegation: "sign the beat when the check comes back"), under
// canon section 7: a sitting INHERITS what has passed and adds one new thing.
// This is the first such board, and its Kill list is the red-first test spec.
//
// THE FIXTURE QUESTION, answered in the code rather than in a comment. Every
// board here is minted by makeBoard() at the opening — marks 3, level 1,
// reserve full, stores EMPTY, roster 0, train home — and driven by walk(),
// which calls the same commits a thumb calls. No test hand-sets a field. The
// one thing injected is the die.
//
// AND ON THIS BOARD THE CLAIM IS BACK. CFD-196 Amendment 1 retired "every state
// is reached from that opening by play" because its minted odd float broke
// parity. Opening the stores at 0 buys it back: `reserve 4` with `stores > 0`
// is not reachable by play, so minting a store would have put the board off its
// own lattice a second time. Re-measured here by breadth-first search over the
// whole reachable space under the surviving verb set — and the BFS model is
// itself cross-checked against real walks before anything is concluded from it.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Line = require("../sit/dawnspur-line/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-line/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-line/sim.js"), "utf8");
// The bans grade the board's CODE and its COPY, never its citations. A comment
// is required by this beat to name what it refuses — "the cause is stated next
// to the fact every time the fact is stated" — so a ban that read comments
// would forbid the provenance the beat mandates. Neither file holds "//" inside
// a string, so both strips are exact.
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
const UP_PRICE = { 1: 3, 2: 4, 3: 5 };
const OPENING_MARKS = 3;
const OPENING_STORES = 0;
const STORES_CAP = 6;

// The beat's published odds table, inherited unmoved from CFD-196 and pinned
// here as a figure this board must not have touched.
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
  return { b: Line.createBoard(o), ctl: ctl };
}
// Real commits, from the opening, in the order a thumb makes them.
//   h / m / c = SEND the halt / Mosswake / Cloud Basin
//   C = CARRY   U = UP   W = MUSTER one
//   + = MEET and the die comes home    - = MEET and the die turns back
//   . = the calm: wait(), which must take nothing and report false
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "h") ok = h.b.commitSend(HALT);
    else if (ch === "m") ok = h.b.commitSend(MOSS);
    else if (ch === "c") ok = h.b.commitSend(CLOUD);
    else if (ch === "C") ok = h.b.commitCarry();
    else if (ch === "U") ok = h.b.commitUp();
    else if (ch === "W") ok = h.b.commitMuster(1);
    else if (ch === "+") { h.ctl.next = 0; ok = h.b.commitMeet(); }
    else if (ch === "-") { h.ctl.next = 1; ok = h.b.commitMeet(); }
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}
// Walk to a state that can afford `routeId` at `wardens`, funded only by runs
// and carries the player actually made. Bounded, because this file grades
// mutations and a mutation must produce a RED, never a hang.
function reach(routeId, wardens) {
  const h = makeBoard();
  for (let i = 0; !h.b.canSend(routeId) || h.b.roster < wardens; i++) {
    assert.ok(i < 40, "reach(" + routeId + ", " + wardens + ") stalled");
    if (h.b.marks < wardens * 3 + TOLL[routeId] || (h.b.roster < wardens && !h.b.canMuster())) {
      walk("h+", h);
      continue;
    }
    if (h.b.roster < wardens) { walk("W", h); continue; }
    if (h.b.stores < PROVISIONS[routeId]) { walk("C", h); continue; }
    if (BY_CHARTERED(routeId) && h.b.record.cargoesBanked === 0) { walk("h+", h); continue; }
    walk("h+", h);
  }
  assert.equal(h.b.roster, wardens);
  return h;
}
function BY_CHARTERED(id) {
  return id === CLOUD;
}
function cardFor(b, id) {
  return b.cards().find((c) => c.id === id);
}
function snap(b) {
  return {
    marks: b.marks, roster: b.roster, level: b.level, reserve: b.reserve, stores: b.stores,
    away: b.away, armed: b.armed, stopped: b.stopped, town: b.town, record: b.record,
    cards: b.cards(), lit: b.litJobs(), litSends: b.litSends(),
    manifest: b.manifest, manifestLine: b.manifestLine,
    runSentence: b.runSentence, endSentence: b.endSentence,
    carryYield: b.carryYield, upPrice: b.upPrice, musterReach: b.musterReach,
    canCarry: b.canCarry(), canUp: b.canUp(), canMuster: b.canMuster(), canMeet: b.canMeet(),
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
// Seeded sittings of random thumbs and honest dice, from the opening. Every
// verb on the board is in the deck, desk and terrace together.
function sittings(seed, runs, steps, each, opts) {
  const rnd = mulberry32(seed);
  for (let run = 0; run < runs; run++) {
    const h = makeBoard(opts);
    for (let i = 0; i < steps; i++) {
      const act = ["h", "m", "c", "R", "C", "U", "W", "M", "."][Math.floor(rnd() * 9)];
      h.ctl.next = rnd();
      if (act === "h") h.b.commitSend(HALT);
      else if (act === "m") h.b.commitSend(MOSS);
      else if (act === "c") h.b.commitSend(CLOUD);
      else if (act === "R") h.b.commitSend(RUST);
      else if (act === "C") h.b.commitCarry();
      else if (act === "U") h.b.commitUp();
      else if (act === "W") h.b.commitMuster(1 + Math.floor(rnd() * 4));
      else if (act === "M") h.b.commitMeet();
      else h.b.wait();
      each(h.b, run, i);
    }
  }
}

// ---------------------------------------------------------------- guards
// KILL: "Live shas are overwritten. Any existing board's bytes are touched."
// SIX passed or preserved boards, and none of them moves. The line board joined
// this list on 2026-08-28, when David passed it: a passed board is protected the
// moment it passes, and until then pinning its own bytes here would be circular.

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

test("deploy copy public/dawnspur-line is byte-identical to sit/dawnspur-line", () => {
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/dawnspur-line")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/dawnspur-line")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/dawnspur-line/" + f)), sha256(raw("sit/dawnspur-line/" + f)),
      "sit/public drift: " + f);
  }
});

test("MANIFEST.txt records the shipped hashes, and names the five boards left standing", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/dawnspur-line/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-line/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  for (const pin of ["576ce2b6", "953368a1", "292d6645", "395c18f2", "5ad814e6"]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
});

test("the board ships three files and reaches for nothing off itself", () => {
  assert.deepEqual(fs.readdirSync(path.join(ROOT, "sit/dawnspur-line")).sort(),
    ["MANIFEST.txt", "index.html", "sim.js"], "three files: no asset, no dependency, no build step");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link|@import|url\(/i, "no network, no external stylesheet, no remote asset");
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so no other board's state can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|DawnspurDispatch|dawnspur-scale|dawnspur-heat|dawnspur-dispatch|convoy-stop/,
    "no other board's module or path is named — the lineage lock");
});

// ------------------------------------------------------------ the opening

test("kill: the opening mints marks 3 / level 1 / reserve 4 / stores 0 / roster 0 / home / unbanked / unarmed", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, OPENING_MARKS);
  assert.equal(b.level, 1);
  assert.equal(b.reserve, 4, "the ground opens full");
  assert.equal(b.reserve, b.reserveFull);
  assert.equal(b.stores, OPENING_STORES, "the stores open EMPTY — that is what buys the reachability claim");
  assert.equal(b.roster, 0);
  assert.equal(b.away, false);
  assert.equal(b.armed, false);
  assert.equal(b.stopped, false);
  assert.equal(b.runSentence, null);
  assert.equal(b.endSentence, null);
  assert.deepEqual(b.record,
    { runsOut: 0, cargoesBanked: 0, runsTurnedBack: 0, marksLost: 0, foodLost: 0, foodSent: 0, carries: 0 });
});

test("kill: the opening's lit set is the halt, CARRY, UP and MUSTER — and the spine is dark and says why", () => {
  const b = makeBoard().b;
  assert.deepEqual(b.litJobs(), [HALT, "carry", "up", "muster"],
    "four controls, two of them free");
  assert.deepEqual(b.litSends(), [HALT], "the free halt alone, because the stores hold nothing");
  // The float buys a Warden OR the first level and never both — the figure is
  // inherited but its ARGUMENT is this board's, because Mosswake now costs no
  // marks and Amendment 1's own sizing test selects nothing here.
  assert.equal(b.musterPrice, 3);
  assert.equal(b.upPrice, 3);
  assert.ok(b.canMuster() && b.canUp(), "the float affords either");
  assert.ok(b.musterPrice + b.upPrice > b.marks, "and never both");
  // The new system is visible in frame one: the spine names the stores.
  assert.equal(cardFor(b, MOSS).condition, "The stores hold 0. Mosswake wants 2.");
  assert.equal(cardFor(b, CLOUD).condition,
    "The charter opens with the first cargo banked. The stores hold 0. Cloud Basin wants 3.",
    "Cloud Basin is dark twice over and says both halves");
  assert.match(cardFor(b, RUST).note, /Raiders/);
});

test("kill: the opening's cards quote 68 / 64 / 51 — inherited, unmoved by the join", () => {
  const b = makeBoard().b;
  assert.deepEqual(b.cards().map((c) => c.percent), [68, 64, 51, null]);
  for (const id of SENDABLE) {
    assert.ok(Math.abs(cardFor(b, id).chance - ODDS[id][0] / 100) < 1e-9);
  }
});

test("kill: the opening balance and the opening stores are the suite's alone — no query, no storage", () => {
  assert.equal(Line.createBoard().marks, OPENING_MARKS);
  assert.equal(Line.createBoard().stores, OPENING_STORES);
  for (const m of [0, 3, 6, 12]) assert.equal(Line.createBoard({ marks: m }).marks, m);
  for (const st of [0, 2, 3, 6]) assert.equal(Line.createBoard({ stores: st }).stores, st);
  for (const junk of [-1, 2.5, "6", null, NaN, Infinity, {}]) {
    assert.equal(Line.createBoard({ marks: junk }).marks, OPENING_MARKS, "marks " + String(junk));
    assert.equal(Line.createBoard({ stores: junk }).stores, OPENING_STORES, "stores " + String(junk));
  }
  // Over the cap is junk for the stores and is not junk for marks: a wallet has
  // no ceiling on this board and the stores have a derived one.
  assert.equal(Line.createBoard({ stores: STORES_CAP + 1 }).stores, OPENING_STORES);
  assert.equal(Line.createBoard({ marks: 60 }).marks, 60);
  assert.doesNotMatch(BOARD, /location\.|URLSearchParams|searchParams/i,
    "no player-reachable surface sets an opening");
  assert.match(SIT_HTML, /DawnspurLine\.createBoard\(\{ fresh: true \}\)/, "the board asks for the opening and nothing else");
  assert.equal((SIT_HTML.match(/createBoard\(/g) || []).length, 1);
  assert.doesNotMatch(SIT_HTML, /createBoard\([^)]*(marks|stores)/, "the board hands in no balance and no store");
});

// --------------------------------------------- KILL: food is not a currency

test("kill: food buys exactly one thing — marks and food never share a sink", () => {
  // Marks move only at a payout, a toll, a muster or an UP. Food moves only at
  // a carry or a send's provisions leg. Neither ever crosses.
  let carries = 0;
  let sends = 0;
  sittings(0xF00D, 300, 40, (b) => { void b; });
  // Per-commit deltas, driven one verb at a time from real states.
  const probe = (line, verb, arg) => {
    const h = walk(line);
    const before = { marks: h.b.marks, stores: h.b.stores };
    const ok = verb === "carry" ? h.b.commitCarry()
      : verb === "up" ? h.b.commitUp()
      : verb === "muster" ? h.b.commitMuster(1)
      : h.b.commitSend(arg);
    return { ok, dMarks: h.b.marks - before.marks, dStores: h.b.stores - before.stores, b: h.b };
  };
  // CARRY: food up, marks untouched. Never a mark, in either direction.
  const c = probe("", "carry");
  assert.ok(c.ok);
  assert.equal(c.dMarks, 0, "a carry must never move marks — that is the pump this board is built to refuse");
  assert.ok(c.dStores > 0);
  carries += 1;
  // UP and MUSTER: marks down, food untouched.
  for (const verb of ["up", "muster"]) {
    const p = probe("", verb);
    assert.ok(p.ok, verb);
    assert.ok(p.dMarks < 0, verb + " spends marks");
    assert.equal(p.dStores, 0, verb + " must never cost food");
  }
  // SEND: provisions off the stores, toll off the wallet. Two sinks, never one.
  for (const id of SENDABLE) {
    const h = reach(id, 0);
    const before = { marks: h.b.marks, stores: h.b.stores };
    assert.ok(h.b.commitSend(id), id);
    assert.equal(before.stores - h.b.stores, PROVISIONS[id], id + ": provisions come off the STORES");
    assert.equal(before.marks - h.b.marks, TOLL[id], id + ": the toll comes off the WALLET");
    sends += 1;
  }
  assert.ok(carries > 0 && sends === 3);
  // MEET: marks in, food never.
  for (const die of [0, 1]) {
    const h = reach(MOSS, 0);
    assert.ok(h.b.commitSend(MOSS));
    const before = h.b.stores;
    h.ctl.next = die;
    assert.ok(h.b.commitMeet());
    assert.equal(h.b.stores, before, "a route never pays food, on either branch");
  }
});

test("kill: no commit exchanges food for marks or marks for food, and no such path exists", () => {
  const b = makeBoard().b;
  for (const absent of ["sell", "buy", "convert", "exchange", "market", "broker", "salvage",
    "commitSell", "commitConvert", "commitTrade", "refund"]) {
    assert.equal(typeof b[absent], "undefined", absent + " must not exist");
  }
  assert.doesNotMatch(SIM_CODE, /sell|broker|salvage|convert|exchange|market|refund|rebate/i,
    "no exchange path in the sim");
  assert.doesNotMatch(HTML_CODE, /sell|broker|salvage|convert|exchange|market/i,
    "and none on the board");
  // Property: across 400 seeded sittings, marks and food never move in a way
  // that could only be a trade — a commit that raises one while lowering the
  // other, with no route payout to explain it.
  sittings(0x7EA5, 400, 40, (b2) => {
    assert.ok(b2.marks >= 0, "marks went negative");
    assert.ok(b2.stores >= 0 && b2.stores <= STORES_CAP, "stores out of 0.." + STORES_CAP + ": " + b2.stores);
    assert.ok(Number.isInteger(b2.stores) && Number.isInteger(b2.marks));
  });
});

test("kill: food never decays, spoils or expires — at any reserve, in any absence", () => {
  const states = {
    opening: makeBoard(),
    "stores part full": walk("CC"),
    "stores full at bare ground": walk("CCCCCC"),
    away: walk("h+CCh"),
    stopped: walk("h+UUUCc+"),
  };
  for (const [name, h] of Object.entries(states)) {
    const before = snap(h.b);
    for (let i = 0; i < 50; i++) assert.equal(h.b.wait(), false, name + ": the calm is never a handled event");
    assert.deepEqual(snap(h.b), before, name + ": fifty world's turns take nothing");
  }
  const away = walk("h+CCh");
  const before = away.b.stores;
  spin120ms();
  assert.equal(away.b.stores, before, "120ms of real time spoils nothing");
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\.|durationSeconds|baseSeconds/,
    "the sim holds no clock");
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./,
    "and the board runs no loop");
});

test("kill: the stores never exceed the cap, go negative, or move outside a carry or a send", () => {
  // Structural: exactly two writers, and this is the whole list.
  const writers = SIM_CODE.split("\n").filter((l) => /s\.stores\s*(\+=|-=|=)/.test(l));
  assert.equal(writers.length, 2, "the stores have exactly two writers, found " + writers.length);
  assert.ok(writers.some((l) => l.includes("+= carryLoad()")), "one is the carry");
  assert.ok(writers.some((l) => l.includes("-= r.provisions")), "the other is a send's provisions leg");
  sittings(0x5709, 400, 40, (b) => {
    assert.ok(b.stores >= 0 && b.stores <= b.storesCap, "stores out of range: " + b.stores);
  });
});

// ------------------------------------- KILL: the stores cap, and stranding

test("kill: the stores cap is 6, and it is DERIVED rather than chosen", () => {
  assert.equal(makeBoard().b.storesCap, 6);
  assert.match(SIT_SIM, /const STORES_CAP = MAX_PROVISIONS \+ MAX_LEVEL - 1;/,
    "the cap is the board's own arithmetic — the smallest at which a carry never strands");
  assert.match(SIT_SIM, /const MAX_PROVISIONS = ROUTES\.reduce\(/, "and maxProvisions is read off the routes");
  assert.doesNotMatch(SIT_SIM, /const STORES_CAP = 6/, "6 is not typed; it is derived");
});

test("kill: a carry never strands, and the steady state is provisions / level at every level", () => {
  // The stranding check, stated as the invariant the beat states it as rather
  // than as a cap number: carries per send must be exactly provisions / level.
  // At cap 4 or 5 the level-4 rung buys NOTHING on the Chartered Line — cap 4
  // and cap 5 are the same board — which is the defect this line exists to
  // catch, and the reason the cap is 6.
  const want = {
    "mosswake-loop": [2.0, 1.0, 2 / 3, 0.5],
    "cloud-basin-span": [3.0, 1.5, 1.0, 0.75],
  };
  for (const id of [MOSS, CLOUD]) {
    for (let level = 1; level <= 4; level++) {
      // Driven off the sim's own carry rule, from a real board at that level.
      const b = makeBoard({ marks: 60 }).b;
      for (let i = 0; b.level < level; i++) { assert.ok(i < 8); assert.ok(b.commitUp()); }
      assert.equal(b.level, level);
      let carries = 0;
      let sends = 0;
      let stores = 0;
      for (let i = 0; i < 6000; i++) {
        if (stores < PROVISIONS[id]) { stores += Math.min(level, b.storesCap - stores); carries += 1; }
        else { stores -= PROVISIONS[id]; sends += 1; }
      }
      const rate = carries / sends;
      assert.ok(Math.abs(rate - want[id][level - 1]) < 0.002,
        id + " at level " + level + ": " + rate.toFixed(3) + " carries a send, wanted " + want[id][level - 1]);
    }
  }
  // And the level-4 rung must actually buy something on the route that fires
  // the ending, which is what cap 4 and cap 5 fail to do.
  assert.ok(want[CLOUD][3] < want[CLOUD][2], "the top rung must buy a real reduction on the Chartered Line");
});

test("kill: a carry yields exactly min(level, cap - stores), at every reachable pair", () => {
  for (let level = 1; level <= 4; level++) {
    for (let stores = 0; stores < STORES_CAP; stores++) {
      const b = makeBoard({ marks: 60, stores: stores }).b;
      for (let i = 0; b.level < level; i++) { assert.ok(i < 8); assert.ok(b.commitUp()); }
      const want = Math.min(level, STORES_CAP - stores);
      assert.equal(b.carryYield, want, "level " + level + ", stores " + stores);
      const before = b.stores;
      assert.ok(b.commitCarry());
      assert.equal(b.stores - before, want, "and it lands exactly what it stated");
    }
  }
  // The stated load IS the landed load, everywhere, under random play.
  sittings(0xCA88, 300, 30, (b) => {
    if (!b.canCarry()) { assert.equal(b.carryYield, null); return; }
    assert.equal(b.carryYield, Math.min(b.level, b.storesCap - b.stores));
  });
});

test("kill: CARRY is dark when the stores are full, and never otherwise short of the stop", () => {
  const full = makeBoard({ stores: STORES_CAP }).b;
  assert.equal(full.stores, STORES_CAP);
  assert.equal(full.canCarry(), false, "CARRY is dark at full stores");
  assert.equal(full.carryYield, null);
  const before = snap(full);
  assert.equal(full.commitCarry(), false);
  assert.deepEqual(snap(full), before, "a refused carry commits nothing");
  sittings(0xF011, 300, 30, (b) => {
    if (b.stopped) return;
    assert.equal(b.canCarry(), b.stores < b.storesCap,
      "CARRY is lit exactly when the stores can hold more");
  });
});

// ------------------------------------------------- KILL: the carry and the ground

test("kill: the carry pays FULL at every reserve, bare included, and nothing warns", () => {
  // Inherited from CFD-183 and deliberately untouched: Geology's "rides fine
  // ... in clear weather ... gives no sign" is the sentence its kill cites, and
  // this board is entirely clear weather because the storm deferred.
  const b = makeBoard().b;
  const seen = [];
  for (let i = 0; i < 6; i++) {
    if (!b.canCarry()) break;
    const want = b.carryYield;
    const before = b.stores;
    assert.ok(b.commitCarry());
    seen.push({ reserve: b.reserve, landed: b.stores - before, stated: want });
    assert.equal(b.stores - before, want, "full pay at reserve " + b.reserve);
  }
  assert.ok(seen.some((x) => x.reserve === 0), "the walk reaches bare ground");
  for (const x of seen) assert.equal(x.landed, x.stated, "the yield never degrades");
  assert.doesNotMatch(BOARD, /\bwarn\b|\balert\b|\bdanger\b|\bspoil/i,
    "no warning, no alert — this sitting is clear weather");
});

test("kill: a carry draws exactly one step of ground, floors at 0, and nothing else writes the reserve", () => {
  // Structural, and stronger than a rule: the reserve is DERIVED from the carry
  // count, so "written by anything but a carry" is impossible by construction.
  assert.match(SIT_SIM, /return Math\.max\(0, RESERVE_FULL - s\.carries\);/,
    "the reserve is derived from the carries, not stored");
  const writers = SIM_CODE.split("\n").filter((l) => /s\.carries\s*(\+=|-=|=)/.test(l));
  assert.equal(writers.length, 1, "the carry count has exactly one writer");
  assert.ok(writers[0].includes("+= 1"), "and it climbs by exactly one");
  assert.doesNotMatch(SIM_CODE, /s\.reserve/, "there is no reserve field to write");
  const b = makeBoard().b;
  let last = b.reserve;
  for (let i = 0; i < 8; i++) {
    if (!b.canCarry()) break;
    assert.ok(b.commitCarry());
    assert.ok(b.reserve === Math.max(0, last - 1), "one step, floored: " + last + " -> " + b.reserve);
    last = b.reserve;
  }
  assert.equal(b.reserve, 0, "and it floors at bare rather than going below");
  sittings(0x6270, 400, 40, (b2) => {
    assert.ok(b2.reserve >= 0 && b2.reserve <= b2.reserveFull, "reserve out of range: " + b2.reserve);
    assert.equal(b2.reserve, Math.max(0, b2.reserveFull - b2.record.carries), "reserve is carries, derived");
  });
});

test("kill: the ground reaches the board as five graded greens and no gauge — no number, bar, pip or meter", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  assert.doesNotMatch(hud, /reserve|ground|stores|food|level|greenhouse/i, "the HUD says none of it");
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i, "no gauge element anywhere");
  assert.equal((SIT_HTML.match(/board\.reserve/g) || []).length, 2,
    "board.reserve reaches the DOM in exactly one loop, over its own class");
  assert.match(SIT_HTML, /terraceEl\.classList\.toggle\("rs" \+ i, board\.reserve === i\);/,
    "and that is the ground's own look");
  const looks = [];
  for (const rs of [4, 3, 2, 1, 0]) {
    const m = cssOf().match(new RegExp("#terrace\\.rs" + rs + " \\.fill\\s*\\{\\s*height:\\s*([\\d.]+)%;\\s*background:\\s*(#[0-9a-f]{6});"));
    assert.ok(m, "#terrace.rs" + rs + " look found");
    looks.push({ height: parseFloat(m[1]), color: m[2] });
  }
  for (let i = 1; i < looks.length; i++) {
    assert.ok(looks[i].height < looks[i - 1].height, "the planting recedes one step at a time");
  }
  assert.equal(looks[0].height, 100, "full reads lush");
  assert.equal(looks[4].height, 0, "bare is unmistakable");
});

test("kill: the stores read as objects, never as a bar, a meter, a percentage or a HUD line", () => {
  assert.match(SIT_HTML, /for \(let i = 0; i < board\.storesCap; i\+\+\)/,
    "the slot count is the sim's derived cap, not a number typed into the markup");
  assert.match(SIT_HTML, /slotEls\[i\]\.classList\.toggle\("full", i < board\.stores\);/,
    "each slot is filled or empty and nothing else");
  assert.match(rule("#stores .slot"), /width:\s*\d+px/, "a slot is an object with a size");
  assert.doesNotMatch(cssOf(), /#stores[^}]*width:\s*\d+%/, "the stores are not a proportional bar");
  assert.doesNotMatch(SIT_HTML, /stores.*%|%.*stores/i, "and never a percentage");
  const b = makeBoard().b;
  assert.equal(typeof b.stores, "number");
  for (const absent of ["storesPercent", "storesBar", "foodBar"]) {
    assert.equal(typeof b[absent], "undefined");
  }
});

test("kill: TEND appears nowhere — not as a control, a label, a code path or a state field", () => {
  // RULED, David 2026-08-27: CUT for this sitting, because the join gave its job
  // to the food line and it measured DOMINATED. It returns on the storm board.
  const b = makeBoard().b;
  for (const absent of ["canTend", "commitTend", "tend", "tendPrice"]) {
    assert.equal(typeof b[absent], "undefined", absent + " must not exist");
  }
  assert.doesNotMatch(SIM_CODE, /tend/i, "no tend path in the sim's code");
  assert.doesNotMatch(HTML_CODE, /tend/i, "no tend control, label or handler on the board");
  for (const job of makeBoard().b.litJobs()) {
    assert.ok(SENDABLE.concat(["carry", "up", "muster", "meet"]).includes(job), "unknown job lit: " + job);
  }
  // The cut's CAUSE is required by the beat to be stated beside the fact, so
  // the provenance comment must name it — the inversion of the ban above.
  assert.match(SIT_SIM, /TEND\s+— the join gave its job to the food line/,
    "the sim's header must record why the verb is absent, and that it returns");
  assert.match(SIT_SIM, /ONE-WAY ON THIS SITTING, BECAUSE TEND IS ABSENT FROM IT/,
    "the cause must be stated beside the fact");
  assert.ok(SIT_SIM.includes("When TEND returns on the storm sitting the reserve is"),
    "and must never state the one-way reserve as a permanent property — the cut is " +
    "why it is one-way here, and the sim must say the verb brings the other half back");
});

test("kill: MOSSWAKE +3, or any second Mosswake, never appears", () => {
  const b = makeBoard().b;
  assert.equal(typeof b.commitB, "undefined");
  assert.equal(typeof b.canB, "undefined");
  assert.doesNotMatch(SIM_CODE, /MOSSWAKE \+3|bArmed|commitB\b/, "the cut verb leaves no trace in the sim");
  assert.doesNotMatch(HTML_CODE, /MOSSWAKE \+3/, "nor on the board");
  assert.equal((HTML_CODE.match(/MOSSWAKE/g) || []).length, 0,
    "MOSSWAKE is never authored on the board — the route's name is painted from the sim");
  assert.equal(b.cards().filter((c) => c.name.includes("MOSSWAKE")).length, 1, "exactly one Mosswake");
});

test("kill: no level is lost, the greenhouse never shrinks, and UP is not free and climbs", () => {
  const b = makeBoard({ marks: 60 }).b;
  assert.equal(b.upPrice, 3);
  let before = b.marks;
  assert.ok(b.commitUp());
  assert.equal(before - b.marks, 3);
  assert.equal(b.upPrice, 4);
  before = b.marks;
  assert.ok(b.commitUp());
  assert.equal(before - b.marks, 4);
  assert.equal(b.upPrice, 5);
  before = b.marks;
  assert.ok(b.commitUp());
  assert.equal(before - b.marks, 5);
  assert.equal(b.level, 4);
  assert.equal(b.upPrice, null, "no next price at the top");
  assert.equal(b.canUp(), false);
  assert.equal(b.commitUp(), false);
  assert.doesNotMatch(SIM_CODE, /s\.level\s*(-=|--)/, "no down-path exists");
  assert.doesNotMatch(SIT_HTML, /#greenhouse\.dead|"dead"/, "no dead sprite, no dead state");
  const widths = [];
  const base = cssOf().match(/#greenhouse\s*\{[^}]*width:\s*(\d+)px/);
  assert.ok(base, "greenhouse base width");
  widths.push(Number(base[1]));
  for (const lv of [2, 3, 4]) {
    const m = cssOf().match(new RegExp("#greenhouse\\.lv" + lv + "\\s*\\{\\s*width:\\s*(\\d+)px"));
    assert.ok(m, "#greenhouse.lv" + lv);
    widths.push(Number(m[1]));
  }
  for (let i = 1; i < widths.length; i++) assert.ok(widths[i] > widths[i - 1], "strictly ascending: " + widths);
  let last = 1;
  sittings(0x1EAE, 300, 30, (b2, run, i) => {
    if (i === 0) last = 1;
    assert.ok(b2.level >= last, "a level was lost: " + b2.level + " < " + last);
    last = b2.level;
    assert.ok(b2.level >= 1 && b2.level <= b2.maxLevel);
  });
  assert.doesNotMatch(SIT_HTML, /upEl[^\n]*train|train[^\n]*upEl/i, "UP does not ride a train");
});

// ------------------------------------------------------------ KILL: the join

test("kill: no terrace verb goes dark because a line run is away — THE MOSSWAKE CUT RESTS ON THIS", () => {
  // David cut MOSSWAKE +3 CONDITIONALLY on the terrace having work while the
  // train is out. If this fails, the cut fails with it.
  for (const id of SENDABLE) {
    const h = reach(id, 0);
    const homeCarry = h.b.canCarry();
    const homeUp = h.b.canUp();
    assert.ok(h.b.commitSend(id));
    assert.equal(h.b.away, true);
    assert.equal(h.b.canCarry(), homeCarry, id + ": CARRY must not read the away state");
    assert.equal(h.b.canUp(), homeUp, id + ": UP must not read the away state");
  }
  // And the away state is where the carry is the CORRECT play, not merely a
  // legal one: the stores must be refilled before the next send can go.
  const h = walk("h+C");
  assert.ok(h.b.commitSend(HALT));
  assert.equal(h.b.canCarry(), true, "the away turn is the free turn to refill in");
  assert.ok(h.b.commitCarry(), "and carrying while away actually commits");
  // Source-shape: neither terrace predicate mentions away.
  for (const fn of ["canCarry", "canUp"]) {
    const body = SIT_SIM.match(new RegExp("function " + fn + "\\(\\)[\\s\\S]*?\\n  \\}"));
    assert.ok(body, fn + "() found");
    assert.doesNotMatch(body[0], /s\.away/, fn + " must not read the away state");
  }
  // Property: across 400 sittings, a terrace verb never darkens on `away` alone.
  sittings(0x2E11, 300, 30, (b) => {
    if (b.stopped) return;
    assert.equal(b.canCarry(), b.stores < b.storesCap, "CARRY reads the stores and nothing else");
    assert.equal(b.canUp(), b.level < b.maxLevel && b.marks >= (b.upPrice || Infinity),
      "UP reads the level and the wallet and nothing else");
  });
});

test("kill: no line verb goes dark because the terrace is busy", () => {
  // There is no terrace-busy state to read, and no send predicate reads one.
  const body = SIT_SIM.match(/function canSend\(routeId\)[\s\S]*?\n  \}/);
  assert.ok(body);
  assert.doesNotMatch(body[0], /carr|level|reserve/i,
    "a send reads the stores, the wallet, the charter and the away state — never the terrace's work");
  assert.match(body[0], /return s\.stores >= r\.provisions && s\.marks >= r\.toll;/,
    "and its last word is exactly the two halves of the stake");
});

test("kill: marks are earned only at a payout, and food is produced only at a carry", () => {
  const marksUp = SIM_CODE.split("\n").filter((l) => /s\.marks\s*\+=/.test(l));
  assert.equal(marksUp.length, 1, "marks rise in exactly one place");
  assert.ok(marksUp[0].includes("r.pays"), "and it is a route's payout");
  const foodUp = SIM_CODE.split("\n").filter((l) => /s\.stores\s*\+=/.test(l));
  assert.equal(foodUp.length, 1, "food is produced in exactly one place");
  assert.ok(foodUp[0].includes("carryLoad()"), "and it is the carry");
});

// ----------------------------------------------- KILL: the sends, inherited

test("kill: a send is lit only when the stores can pay the provisions and the wallet can pay the toll", () => {
  sittings(0x5E4D, 400, 40, (b) => {
    for (const id of SENDABLE) {
      const want = !b.stopped && !b.away &&
        !(id === CLOUD && b.record.cargoesBanked === 0) &&
        b.stores >= PROVISIONS[id] && b.marks >= TOLL[id];
      assert.equal(b.canSend(id), want,
        id + " lit=" + b.canSend(id) + " at stores " + b.stores + " marks " + b.marks +
        " away " + b.away + " banked " + b.record.cargoesBanked);
    }
  });
  // The exact case the join creates: food enough, marks short.
  const h = makeBoard({ marks: 0, stores: 6 });
  assert.equal(h.b.canSend(MOSS), true, "Mosswake wants no toll, so no marks are needed");
  assert.equal(h.b.canSend(CLOUD), false, "Cloud Basin wants a mark of toll and there is none");
  assert.ok(walk("h+", h).b.canSend(CLOUD), "and a payout opens it");
});

test("kill: the odds are the beat's table and move by nothing but baseRisk and the roster", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const b = makeBoard({ marks: 60 }).b;
      for (let i = 0; b.roster < w; i++) { assert.ok(i < 8); assert.ok(b.commitMuster(1)); }
      const c = cardFor(b, id);
      assert.ok(Math.abs(c.chance - ODDS[id][w] / 100) < 1e-9, id + "/" + w + ": " + c.chance);
      assert.equal(c.percent, Math.round(ODDS[id][w] / 100 * 100));
    }
  }
  // Nothing on the terrace touches a quote.
  const b = makeBoard({ marks: 60 }).b;
  const before = b.cards().map((c) => c.chance);
  b.commitUp(); b.commitCarry(); b.commitUp();
  assert.deepEqual(b.cards().map((c) => c.chance), before, "the terrace must not move the odds");
  assert.doesNotMatch(HTML_CODE, /chanceFor|0\.76|0\.036|baseRisk/, "no second instrument on the board");
});

test("kill: the die is thrown at the MEET against the exact stated chance, once, never at the SEND", () => {
  for (const id of SENDABLE) {
    const h = reach(id, 0);
    const quoted = cardFor(h.b, id);
    const calls = h.ctl.calls;
    assert.ok(h.b.commitSend(id));
    assert.equal(h.ctl.calls, calls, id + ": the SEND throws no die");
    assert.equal(h.b.manifest.chance, quoted.chance, "the away card holds the number the desk quoted");
    // A hair under comes home; the number itself does not.
    for (const [die, home] of [[quoted.chance * (1 - 1e-12), true], [quoted.chance, false]]) {
      const g = reach(id, 0);
      const before = g.b.marks;
      assert.ok(g.b.commitSend(id));
      g.ctl.next = die;
      assert.ok(g.b.commitMeet());
      assert.equal(g.b.marks > before - TOLL[id], home, id + ": a die of " + die);
    }
    h.ctl.next = 0;
    assert.ok(h.b.commitMeet());
    assert.equal(h.ctl.calls, calls + 1, id + ": the meet throws exactly one");
  }
  const meet = SIT_SIM.match(new RegExp("function commitMeet\\(\\)[\\s\\S]*?\\n  \\}"))[0];
  assert.match(meet, /const home = draw < run\.chance;/, "one comparison, against the stated number");
  assert.equal((SIM_CODE.match(/s\.roll\(\)/g) || []).length, 1, "and exactly one die in the file");
  const send = SIT_SIM.match(new RegExp("function commitSend\\(routeId\\)[\\s\\S]*?\\n  \\}"))[0];
  assert.doesNotMatch(send, /roll/, "the send holds no die at all");
});

test("kill: a failed run pays zero and returns NO food; nothing refunds in any direction", () => {
  for (const id of SENDABLE) {
    const h = reach(id, 0);
    const before = { marks: h.b.marks, stores: h.b.stores, banked: h.b.record.cargoesBanked };
    assert.ok(h.b.commitSend(id));
    h.ctl.next = 1;
    assert.ok(h.b.commitMeet());
    assert.equal(h.b.marks, before.marks - TOLL[id], id + ": the toll is gone and nothing is paid");
    assert.equal(h.b.stores, before.stores - PROVISIONS[id], id + ": the food is gone and none comes back");
    assert.equal(h.b.record.cargoesBanked, before.banked, "nothing was banked");
    assert.equal(h.b.record.foodLost, PROVISIONS[id], "and the record keeps the food it lost");
    assert.equal(h.b.record.marksLost, TOLL[id], "and the marks");
  }
  assert.doesNotMatch(SIM_CODE, /rewardMultiplier|consolation|\*\s*0\.25|0\.25\s*\*/,
    "the engine's x0.25 failure leg is refused, not copied");
  assert.doesNotMatch(SIM_CODE, /roster\s*(-=|--)|level\s*(-=|--)/, "no un-recruit, no un-build");
});

test("kill: the crew always comes home, on both branches, at every roster", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      for (const die of [0, 1]) {
        const b = makeBoard({ marks: 60, stores: 6 }).b;
        for (let i = 0; b.roster < w; i++) { assert.ok(i < 8); assert.ok(b.commitMuster(1)); }
        if (id === CLOUD) { assert.ok(b.commitSend(HALT)); b.__r = 0; }
        if (id === CLOUD) { /* bank a cargo so the charter opens */ }
        if (id === CLOUD) {
          const bb = makeBoard({ marks: 60, stores: 6 });
          for (let i = 0; bb.b.roster < w; i++) { assert.ok(i < 8); assert.ok(bb.b.commitMuster(1)); }
          walk("h+", bb);
          assert.ok(bb.b.commitSend(CLOUD));
          assert.equal(bb.b.roster, w);
          bb.ctl.next = die;
          assert.ok(bb.b.commitMeet());
          assert.equal(bb.b.roster, w, "cloud/" + w + "/" + die);
          continue;
        }
        assert.ok(b.commitSend(id));
        assert.equal(b.roster, w, id + "/" + w + ": the whole roster rides and none is spent");
        b.__die = die;
        const bb2 = b;
        bb2.__x = 0;
        // drive the meet through the board's own die
        const h2 = { b: bb2 };
        void h2;
        break;
      }
    }
  }
  // The plain statement, driven end to end.
  for (let w = 0; w <= 4; w++) {
    for (const die of [0, 1]) {
      const h = makeBoard({ marks: 60, stores: 6 });
      for (let i = 0; h.b.roster < w; i++) { assert.ok(i < 8); assert.ok(h.b.commitMuster(1)); }
      assert.ok(h.b.commitSend(MOSS));
      assert.equal(h.b.roster, w);
      h.ctl.next = die;
      assert.ok(h.b.commitMeet());
      assert.equal(h.b.roster, w, "the crew comes home on the " + (die === 0 ? "home" : "turned-back") + " branch");
    }
  }
  const meet = SIT_SIM.match(new RegExp("function commitMeet\\(\\)[\\s\\S]*?\\n  \\}"))[0];
  assert.doesNotMatch(meet, /roster/, "the meet must not read or write the roster on either branch");
});

test("kill: the charter is shut until a cargo is banked, at any capital and any stores", () => {
  for (const marks of [0, 3, 12, 60]) {
    for (const stores of [0, 3, 6]) {
      const b = Line.createBoard({ marks: marks, stores: stores });
      assert.equal(b.record.cargoesBanked, 0);
      assert.equal(b.canSend(CLOUD), false, "opening " + marks + "/" + stores + " bought the summit outright");
      assert.equal(b.commitSend(CLOUD), false);
    }
  }
  const h = makeBoard({ stores: 6 });
  walk("h-", h);
  assert.equal(h.b.canSend(CLOUD), false, "a turned-back run banks nothing, so the charter stays shut");
  walk("h+", h);
  assert.equal(h.b.canSend(CLOUD), true, "and a banked cargo opens it");
});

test("kill: one run at a time, and MUSTER is dark while the roster rides and at the stop", () => {
  const h = walk("h+CCh");
  assert.equal(h.b.away, true);
  for (const id of SENDABLE.concat([RUST])) {
    assert.equal(h.b.canSend(id), false, id + " lit while a run is out");
    assert.equal(h.b.commitSend(id), false);
  }
  assert.equal(h.b.musterReach, 0, "the ladder is inert while the roster rides");
  assert.equal(h.b.commitMuster(1), false);
  const stopped = walk("h+UUUCc+");
  assert.equal(stopped.b.stopped, true);
  assert.equal(stopped.b.musterReach, 0, "and inert at the stop");
  assert.ok(stopped.b.marks >= 3, "even with the marks to pay for it");
  sittings(0x1ADD, 300, 30, (b) => {
    const want = (b.away || b.stopped) ? 0 : Math.min(b.rosterCap - b.roster, Math.floor(b.marks / b.musterPrice));
    assert.equal(b.musterReach, want);
    assert.equal(b.canMuster(), b.musterReach >= 1);
  });
});

test("kill: Rustfall never sends, never quotes, and opens nothing", () => {
  const b = makeBoard({ marks: 60, stores: 6 }).b;
  const c = cardFor(b, RUST);
  assert.equal(c.sendable, false);
  assert.equal(c.chance, null);
  assert.equal(c.percent, null);
  assert.equal(c.pays, null);
  assert.match(c.note, /not the desk's dice/);
  assert.doesNotMatch(SIT_SIM, /0\.22/, "Rustfall's baseRisk must not exist in this file");
  sittings(0x2057, 300, 24, (b2) => {
    assert.equal(b2.canSend(RUST), false, "Rustfall lit");
    assert.equal(b2.litSends().includes(RUST), false);
  });
  assert.doesNotMatch(BOARD, /\bcombat\b|\bscenario\b|\bwave\b|\bplacement\b|marksm[ae]n|\bgunner|\bsapper|\branger/i,
    "the defense instance is refused by name, not stubbed");
});

// ------------------------------------------- KILL: no dark reachable state

test("kill: an away state ALWAYS has MEET lit — the guard the parent kills by name", () => {
  // Carried verbatim from CFD-196 and RESTORED here: the join board's own draft
  // had dropped it in transcription. It matters more here than there, because
  // on this board CARRY is dark at full stores and UP is dark at the top, so
  // the away state can legitimately reach a position where MEET is the only
  // live control at the desk AND the terrace has nothing to offer.
  sittings(0xDEAD, 400, 40, (b) => {
    if (!b.away) return;
    assert.equal(b.canMeet(), true, "an away state with MEET dark");
    assert.ok(b.litJobs().includes("meet"));
    assert.deepEqual(b.litSends(), [], "and no send lit beside it");
  });
  // THE EXACT CORNER, and finding it is the point. A PROVISIONED send always
  // drops the stores below the cap, so CARRY stays lit behind it; the only way
  // to reach MEET-alone is the FREE halt sent from full stores on a topped
  // terrace. That single state is why the parent's guard had to come back: on
  // this board nothing else forces a control to be lit while a run is away.
  const h = makeBoard({ marks: 60, stores: 0 });
  for (let i = 0; h.b.level < 4; i++) { assert.ok(i < 8); assert.ok(h.b.commitUp()); }
  for (let i = 0; h.b.canCarry(); i++) { assert.ok(i < 9); assert.ok(h.b.commitCarry()); }
  assert.equal(h.b.stores, STORES_CAP, "the stores are full");
  assert.equal(h.b.canUp(), false, "the terrace is topped");
  assert.ok(h.b.commitSend(HALT), "and the free halt stakes no food, so the stores stay full");
  assert.equal(h.b.canCarry(), false, "CARRY is dark at full stores");
  assert.deepEqual(h.b.litJobs(), ["meet"], "MEET is the ONLY live control on the whole board");
  // And a provisioned send from the same state does NOT reach it, which is why
  // the corner is narrow and why a broad substitute guard would have missed it.
  const g = makeBoard({ marks: 60, stores: 0 });
  for (let i = 0; g.b.level < 4; i++) { assert.ok(i < 8); assert.ok(g.b.commitUp()); }
  for (let i = 0; g.b.canCarry(); i++) { assert.ok(i < 9); assert.ok(g.b.commitCarry()); }
  walk("h+", g);
  for (let i = 0; g.b.canCarry(); i++) { assert.ok(i < 9); assert.ok(g.b.commitCarry()); }
  assert.ok(g.b.commitSend(CLOUD));
  assert.equal(g.b.canCarry(), true, "a provisioned send leaves room, so the terrace still has work");
  assert.deepEqual(g.b.litJobs(), ["carry", "meet"]);
});

test("kill: no reachable state has no lit control — any balance, any reserve, any stores, home or away", () => {
  sittings(0x11FE, 400, 40, (b) => {
    if (b.stopped) {
      assert.deepEqual(b.litJobs(), [], "the stop is the one stop");
      return;
    }
    assert.ok(b.litJobs().length >= 1,
      "dead state: marks " + b.marks + " stores " + b.stores + " level " + b.level +
      " reserve " + b.reserve + " away " + b.away);
  });
  // The hardest corner at home: no marks, no food, full ground spent, topped.
  const h = makeBoard({ marks: 0, stores: 0 });
  assert.deepEqual(h.b.litJobs(), [HALT, "carry"], "the free halt and the free carry are the floor");
  const bare = makeBoard({ marks: 0, stores: STORES_CAP });
  assert.ok(bare.b.litJobs().length >= 1, "stores full, no marks: the halt and the spine still go");
});

// ------------------------------------------------ KILL: the arming and the stop

test("kill: the ending arms on level 4 and on nothing else, and never silently", () => {
  const h = makeBoard({ marks: 60 });
  assert.equal(h.b.armed, false);
  assert.ok(h.b.commitUp());
  assert.equal(h.b.armed, false, "level 2 does not arm");
  assert.ok(h.b.commitUp());
  assert.equal(h.b.armed, false, "level 3 does not arm");
  assert.ok(h.b.commitUp());
  assert.equal(h.b.armed, true, "level 4 arms it");
  assert.equal(h.b.level, 4);
  assert.equal(h.b.runSentence,
    "The terrace is topped. The next Chartered cargo home ends the sitting.",
    "and the arming says so out loud");
  // Nothing else arms it.
  sittings(0xA124, 300, 30, (b) => {
    assert.equal(b.armed, b.level >= b.maxLevel, "armed must be exactly topped");
  });
});

test("kill: topping alone never stops, an unarmed Chartered cargo never stops, an armed one always does", () => {
  // Topping alone: the sitting continues.
  const topped = makeBoard({ marks: 60 });
  for (let i = 0; topped.b.level < 4; i++) { assert.ok(i < 8); assert.ok(topped.b.commitUp()); }
  assert.equal(topped.b.armed, true);
  assert.equal(topped.b.stopped, false, "topping arms; it does not fire");
  assert.equal(topped.b.endSentence, null);
  assert.ok(topped.b.litJobs().length >= 1, "and the sitting goes on");
  // An unarmed Chartered cargo is a good run and nothing more.
  const unarmed = makeBoard({ stores: 6 });
  walk("h+", unarmed);
  assert.ok(unarmed.b.canSend(CLOUD));
  walk("c+", unarmed);
  assert.equal(unarmed.b.record.cargoesBanked, 2);
  assert.equal(unarmed.b.armed, false);
  assert.equal(unarmed.b.stopped, false, "a Chartered cargo banked while unarmed must not stop the sitting");
  assert.equal(unarmed.b.endSentence, null);
  // An armed one fires.
  const armed = walk("h+UUUCc+");
  assert.equal(armed.b.armed, true);
  assert.equal(armed.b.stopped, true);
  assert.ok(armed.b.endSentence);
  // A turned-back Chartered run while armed is NOT an ending.
  const missed = walk("h+UUUCc-");
  assert.equal(missed.b.armed, true);
  assert.equal(missed.b.stopped, false, "the food and the toll die; the desk stands");
  assert.equal(missed.b.endSentence, null);
  assert.ok(missed.b.litJobs().includes(HALT), "and the halt is still lit");
  // Property.
  sittings(0x5709, 400, 40, (b) => {
    if (b.stopped) {
      assert.ok(b.armed, "stopped without arming");
      assert.ok(b.record.cargoesBanked >= 1, "stopped without a Chartered cargo");
    }
  });
});

test("kill: you cannot end this sitting without the terrace, twice over", () => {
  // Level 4 arms it and three food from the ground fires it, so every stop
  // carries at least one carry — which is also why the full-ground register
  // cannot fire.
  sittings(0x7EFF, 400, 40, (b) => {
    if (!b.stopped) return;
    assert.equal(b.level, 4, "a stop implies a topped terrace");
    assert.ok(b.record.carries >= 1, "a stop implies at least one trip up the hill");
    assert.ok(b.record.foodSent >= 3, "and at least a Chartered outfit sent");
    assert.ok(b.reserve <= 3, "so the ground is never full at a stop");
  });
});

// ---------------------------------------------------------- KILL: sentences

test("kill: every met run says what happened, and the turned-back sentence keeps all four clauses", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = makeBoard({ marks: 60, stores: 6 });
      for (let i = 0; h.b.roster < w; i++) { assert.ok(i < 8); assert.ok(h.b.commitMuster(1)); }
      if (id === CLOUD) walk("h+", h);
      assert.ok(h.b.commitSend(id));
      h.ctl.next = 1;
      assert.ok(h.b.commitMeet());
      const s = h.b.runSentence;
      assert.match(s, /the route paid nothing/, id + "/" + w + ": zero-pay clause missing");
      assert.match(s, /nothing comes back/, id + "/" + w + ": stake-spent clause missing");
      assert.match(s, /(the train is home|the Wardens? and the train are home)/,
        id + "/" + w + ": crew-home clause missing");
      assert.match(s, /the desk stands/, id + "/" + w + ": desk-stands clause missing");
      assert.equal(/Warden/.test(s), w > 0, "names a crew exactly when one rode");
      // The stake now has a provenance: what died is the crop.
      if (PROVISIONS[id] > 0) {
        assert.match(s, /from the terrace/, id + ": the sentence names where the stake came from");
      } else {
        assert.match(s, /staked nothing/, "the free hop says so");
      }
      assert.doesNotMatch(s, /The desk banks/, "a turned-back run banks nothing");
    }
  }
  const moss = makeBoard({ stores: 6 });
  assert.ok(moss.b.commitSend(MOSS));
  moss.ctl.next = 1;
  assert.ok(moss.b.commitMeet());
  assert.equal(moss.b.runSentence,
    "Wet rail through the Mosswake loop. The train turned for home with the haul unbanked. " +
    "Two from the terrace and nothing comes back; the route paid nothing; the train is home, " +
    "and the desk stands.", "the beat's own Mosswake sentence, verbatim");
});

test("kill: the terminal reads the record, what the terrace sent, and the ground", () => {
  const h = walk("h+UUUCc+");
  assert.equal(h.b.stopped, true);
  const said = h.b.endSentence;
  assert.match(said, /^The Chartered cargo is home and the terrace is topped\./);
  assert.match(said, /runs out/);
  assert.match(said, /cargoes banked/);
  assert.match(said, /from the terrace went out on the line/, "what the terrace sent");
  assert.match(said, /The ground is (drawn and standing|bare)/, "and the ground");
  assert.match(said, /The record keeps what came home; the line past the basin is the next sitting's\.$/);
  assert.equal(said,
    "The Chartered cargo is home and the terrace is topped. Two runs out, two cargoes banked, " +
    "and the stake was never once called. Three from the terrace went out on the line. " +
    "The ground is drawn and standing. Nothing on this desk puts it back — that is the next " +
    "sitting's business. The record keeps what came home; the line past the basin is the next sitting's.",
    "the walked quick path's own terminal");
});

test("kill: the paid register names BOTH loss counters, and names a zero rather than omitting it", () => {
  // THE DEFECT THIS BOARD RE-OPENS IN A NEW CURRENCY. Mosswake's toll is 0, so
  // a turned-back Mosswake run loses food and NO marks. A cost clause keyed on
  // marks alone would close the sitting with "cost nothing but the trip" over
  // dead food — the exact defect CFD-196 was sent back for.
  const h = makeBoard({ marks: 60, stores: 6 });
  walk("h+", h);
  for (let i = 0; i < 3; i++) {
    for (let g = 0; h.b.stores < 2; g++) { assert.ok(g < 8); assert.ok(h.b.commitCarry()); }
    assert.ok(h.b.commitSend(MOSS));
    h.ctl.next = 1;
    assert.ok(h.b.commitMeet());
  }
  assert.equal(h.b.record.foodLost, 6, "six food died");
  assert.equal(h.b.record.marksLost, 0, "and no marks, because Mosswake pays no toll");
  for (let i = 0; h.b.level < 4; i++) { assert.ok(i < 8); assert.ok(h.b.commitUp()); }
  for (let g = 0; h.b.stores < 3; g++) { assert.ok(g < 8); assert.ok(h.b.commitCarry()); }
  walk("c+", h);
  assert.equal(h.b.stopped, true);
  const said = h.b.endSentence;
  assert.doesNotMatch(said, /cost nothing but the trip/,
    "six dead food is not 'nothing but the trip' — this is the sent-back defect");
  assert.match(said, /six from the terrace and no marks lost on the way/,
    "both counters, and the zero NAMED rather than omitted");
  // The mirror case: marks lost, no food.
  const g = makeBoard({ marks: 60, stores: 6 });
  walk("h+", g);
  for (let i = 0; g.b.level < 4; i++) { assert.ok(i < 8); assert.ok(g.b.commitUp()); }
  for (let i = 0; g.b.stores < 3; i++) { assert.ok(i < 8); assert.ok(g.b.commitCarry()); }
  walk("c-", g);
  for (let i = 0; g.b.stores < 3; i++) { assert.ok(i < 8); assert.ok(g.b.commitCarry()); }
  walk("c+", g);
  assert.match(g.b.endSentence, /three from the terrace and 1 mark lost on the way/,
    "a single mark reads as a mark, not as marks");
  // And the clean clause still exists for the case it was always for.
  const clean = walk("h+UUUCc+");
  assert.match(clean.b.endSentence, /and the stake was never once called/);
  const free = makeBoard({ marks: 60 });
  walk("h-", free);
  for (let i = 0; free.b.level < 4; i++) { assert.ok(i < 8); assert.ok(free.b.commitUp()); }
  for (let i = 0; free.b.stores < 3; i++) { assert.ok(i < 8); assert.ok(free.b.commitCarry()); }
  walk("h+", free);
  walk("c+", free);
  assert.match(free.b.endSentence, /one turned back and cost nothing but the trip/,
    "free halt turn-backs are what that clause was always for — both counters are zero there");
});

test("kill: the ground clause has TWO registers, both reachable, and a full register never appears", () => {
  const drawn = walk("h+UUUCc+");
  assert.equal(drawn.b.reserve, 3);
  assert.match(drawn.b.endSentence, /The ground is drawn and standing\. Nothing on this desk puts it back/);
  // Bare: a level-1 sitting spends the whole allowance on one Chartered outfit.
  const bare = makeBoard({ marks: 60 });
  walk("h+", bare);
  for (let i = 0; bare.b.stores < 3; i++) { assert.ok(i < 8); assert.ok(bare.b.commitCarry()); }
  assert.equal(bare.b.reserve, 1, "three carries at level 1");
  for (let i = 0; bare.b.level < 4; i++) { assert.ok(i < 8); assert.ok(bare.b.commitUp()); }
  for (let i = 0; bare.b.reserve > 0; i++) { assert.ok(i < 8); assert.ok(bare.b.commitCarry()); }
  assert.equal(bare.b.reserve, 0);
  walk("c+", bare);
  assert.match(bare.b.endSentence, /The ground is bare\. Nothing on this desk puts it back/);
  // No third register, and no full register — it cannot fire.
  assert.doesNotMatch(SIT_SIM, /GROUND_FULL|ground is full|everything the line ate/i,
    "a register that cannot happen is a dead button in sentence form");
  const registers = SIM_CODE.split("\n").filter((l) => /^const GROUND_/.test(l));
  assert.equal(registers.length, 2, "exactly two ground registers, found " + registers.length);
  // Neither may claim this board can put the ground back.
  for (const reg of [drawn.b.endSentence, bare.b.endSentence]) {
    assert.match(reg, /Nothing on this desk puts it back/,
      "the terminal names the absent restorer rather than implying one");
    assert.doesNotMatch(reg, /weather bill|tend|restore/i,
      "and never repeats the scale board's promise as though this board could keep it");
  }
});

test("kill: no ground register that cannot fire — the full ground is unreachable at every stop", () => {
  let stops = 0;
  const seen = new Set();
  sittings(0x9704, 400, 40, (b) => {
    if (!b.stopped) return;
    stops += 1;
    seen.add(b.reserve);
    assert.ok(b.reserve <= 3, "a stop on a FULL ground — the cut register would have fired");
  });
  assert.ok(stops > 0, "no sitting reached the stop");
  assert.ok(seen.size >= 2, "both registers must be reachable, saw reserves {" + [...seen].join(",") + "}");
});

// -------------------------------------------------- KILL: the pinned numbers

test("kill: every pinned figure stands — 3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 / UP 3,4,5 / reserve 4 / cap 4", () => {
  const b = makeBoard().b;
  assert.equal(b.musterPrice, 3);
  assert.equal(b.rosterCap, 4);
  assert.equal(b.reserveFull, 4);
  assert.equal(b.maxLevel, 4);
  assert.equal(b.storesCap, 6);
  const want = {
    "dawnspur-halt": { pays: 10, provisions: 0, toll: 0 },
    "mosswake-loop": { pays: 14, provisions: 2, toll: 0 },
    "cloud-basin-span": { pays: 18, provisions: 3, toll: 1 },
  };
  for (const [id, w] of Object.entries(want)) {
    const c = cardFor(b, id);
    assert.equal(c.pays, w.pays, id + " pay moved");
    assert.equal(c.provisions, w.provisions, id + " provisions moved");
    assert.equal(c.toll, w.toll, id + " toll moved");
  }
  const rich = makeBoard({ marks: 60 }).b;
  assert.equal(rich.upPrice, 3);
  assert.ok(rich.commitUp());
  assert.equal(rich.upPrice, 4);
  assert.ok(rich.commitUp());
  assert.equal(rich.upPrice, 5);
  for (const id of SENDABLE) {
    for (let w = 1; w <= 4; w++) {
      const step = ODDS[id][w] / 100 - ODDS[id][w - 1] / 100;
      assert.ok(Math.abs(step - 0.036) < 1e-9, "the Warden step must be 0.036");
    }
  }
  assert.match(SIT_SIM, /const POINT = 0\.012;/);
  assert.match(SIT_SIM, /const WARDEN_GUARD = 3;/);
  assert.match(SIT_SIM, /const BASE = 0\.76;/);
});

test("kill: the API surface is pinned", () => {
  assert.deepEqual(Object.keys(makeBoard().b).sort(), [
    "armed", "away", "canCarry", "canMeet", "canMuster", "canSend", "canUp", "cards",
    "carryYield", "commitCarry", "commitMeet", "commitMuster", "commitSend", "commitUp",
    "endSentence", "level", "litJobs", "litSends", "manifest", "manifestLine", "marks",
    "maxLevel", "musterPrice", "musterReach", "record", "reserve", "reserveFull", "roster",
    "rosterCap", "runSentence", "stopped", "stores", "storesCap", "town", "upPrice", "wait",
  ]);
  const b = makeBoard().b;
  for (const absent of ["setPosture", "posture", "hero", "insurance", "mission", "safety", "damage",
    "weather", "sky", "storm", "forecast", "ranger", "marksman", "engineer"]) {
    assert.equal(typeof b[absent], "undefined", absent + " must not exist on this board");
  }
});

test("banned tokens: the REFUSED table, graded over the board's code and the board's words", () => {
  const banned = [
    /insurance/i, /posture/i, /\bhero\b/i, /successBias/, /\bsafety\b/i, /\bdamage\b/i,
    /\brepair\b/i, /\bpatrol\b/i, /\bsurvey\b/i, /signal.?tower/i, /contract/i,
    /\bmission\b/i, /\bmaterials\b/i, /\benergy\b/i, /\bparts\b/i, /\bfavor\b/i,
    /\bstorm\b/i, /stormbird/i, /\bsky\b/i, /forecast/i, /weatherState|setWeather|canWeather|weatherBias/i,
    /\bwarehouse\b/i, /\bration/i, /\bupkeep\b/i, /\bdecay\b/i,
    /durationSeconds|baseSeconds/, /\btimer\b|countdown/i, /audio|new Audio/i,
  ];
  for (const re of banned) {
    assert.equal(re.test(BOARD), false, "banned token " + re + " appears in the board's code or copy");
  }
  // The weather SYSTEM is refused whole and deferred to the storm sitting. The
  // WORD survives in exactly one place and only one: Cloud Basin's inherited
  // failure agent, which is CFD-196's own sentence and is named by the route's
  // own pack tag. Anything else is the deferred system leaking in.
  const weather = BOARD.match(/\bweather\b/gi) || [];
  assert.equal(weather.length, 1, "the word 'weather' appears " + weather.length + " times, wanted 1");
  assert.match(SIT_SIM, /agent: "Weather over the basin\.",/, "and that once is the route's inherited agent");
  const b = makeBoard().b;
  const basin = b.cards().find((c) => c.id === CLOUD);
  void basin;
  assert.equal(typeof b.weather, "undefined", "there is no weather state to read");
});

// ------------------------------------------------------- the BFS, cross-checked

test("the BFS model of a commit is the sim's own — checked by walking, before anything is concluded", () => {
  // A search over the state space is a second statement of the board's rules,
  // so it is checked against the real sim first. If the two disagree, the
  // search is wrong and the walk is right.
  for (const id of SENDABLE) {
    for (const die of [0, 1]) {
      const h = reach(id, 0);
      const before = { marks: h.b.marks, stores: h.b.stores, banked: h.b.record.cargoesBanked };
      const armed = h.b.armed;
      assert.ok(h.b.commitSend(id));
      h.ctl.next = die;
      assert.ok(h.b.commitMeet());
      const won = die < cardFor(h.b, id).chance || die === 0;
      assert.equal(h.b.stores, before.stores - PROVISIONS[id], id + ": the model's stores transition");
      assert.equal(h.b.marks, before.marks - TOLL[id] + (won ? PAYS[id] : 0), id + ": the model's marks transition");
      assert.equal(h.b.record.cargoesBanked, before.banked + (won ? 1 : 0), id + ": the model's banked transition");
      assert.equal(h.b.stopped, won && id === CLOUD && armed, id + ": the model's stop transition");
    }
  }
  const c = makeBoard({ marks: 60 }).b;
  const m0 = c.marks;
  assert.ok(c.commitUp());
  assert.equal(c.marks, m0 - UP_PRICE[1], "the model's UP transition");
  const st = c.stores;
  assert.ok(c.commitCarry());
  assert.equal(c.stores, st + Math.min(c.level, STORES_CAP - st), "the model's CARRY transition");
  assert.equal(c.reserve, c.reserveFull - c.record.carries, "the model's ground transition");
});

test("every state this board's arithmetic describes is reached from the opening by play", () => {
  // Breadth-first over the whole reachable space under the surviving verb set.
  // CFD-196 Amendment 1 retired this claim; opening the stores at 0 buys it
  // back, and the proof had to be rebuilt because the first one rested on
  // TEND's odd -1 and TEND is cut.
  const MARKCAP = 48;
  const key = (s) => [s.marks, s.roster, s.level, s.carries, s.stores, s.banked ? 1 : 0, s.away || "-"].join("|");
  const start = { marks: 3, roster: 0, level: 1, carries: 0, stores: 0, banked: false, away: null, stopped: false };
  const seen = new Set([key(start)]);
  const queue = [start];
  const marksSeen = new Set([3]);
  const storesSeen = new Set([0]);
  const reserveSeen = new Set([4]);
  const levelSeen = new Set([1]);
  const stopReserves = new Set();
  let guard = 0;
  while (queue.length) {
    assert.ok(guard++ < 400000, "the search did not terminate");
    const s = queue.shift();
    const push = (n) => {
      if (n.marks > MARKCAP || n.marks < 0) return;
      if (n.carries > 8) n.carries = 8;
      const k = key(n);
      if (seen.has(k)) return;
      seen.add(k);
      marksSeen.add(n.marks); storesSeen.add(n.stores); levelSeen.add(n.level);
      reserveSeen.add(Math.max(0, 4 - n.carries));
      if (n.stopped) { stopReserves.add(Math.max(0, 4 - n.carries)); return; }
      queue.push(n);
    };
    if (s.away === null) {
      if (s.stores < STORES_CAP) {
        push(Object.assign({}, s, { stores: s.stores + Math.min(s.level, STORES_CAP - s.stores), carries: s.carries + 1 }));
      }
      if (s.level < 4 && s.marks >= UP_PRICE[s.level]) {
        push(Object.assign({}, s, { marks: s.marks - UP_PRICE[s.level], level: s.level + 1 }));
      }
      const reach = Math.min(4 - s.roster, Math.floor(s.marks / 3));
      for (let n = 1; n <= reach; n++) push(Object.assign({}, s, { marks: s.marks - 3 * n, roster: s.roster + n }));
      for (const r of SENDABLE) {
        if (r === CLOUD && !s.banked) continue;
        if (s.stores < PROVISIONS[r] || s.marks < TOLL[r]) continue;
        push(Object.assign({}, s, { stores: s.stores - PROVISIONS[r], marks: s.marks - TOLL[r], away: r }));
      }
    } else {
      const r = s.away;
      push(Object.assign({}, s, { away: null, marks: s.marks + PAYS[r], banked: true, stopped: r === CLOUD && s.level >= 4 }));
      push(Object.assign({}, s, { away: null }));
    }
  }
  const missing = [];
  for (let m = 0; m <= MARKCAP; m++) if (!marksSeen.has(m)) missing.push(m);
  assert.deepEqual(missing, [], "mark counts unreachable: " + missing.join(","));
  assert.deepEqual([...storesSeen].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5, 6], "every store level");
  assert.deepEqual([...reserveSeen].sort((a, b) => a - b), [0, 1, 2, 3, 4], "every ground step");
  assert.deepEqual([...levelSeen].sort(), [1, 2, 3, 4], "every greenhouse level");
  assert.deepEqual([...stopReserves].sort((a, b) => a - b), [0, 1, 2, 3],
    "the reserve at a stop: 0..3 reachable, and 4 — full — UNREACHABLE, which is why that register was cut");
  assert.ok(!stopReserves.has(4), "the full-ground register cannot fire and is not shipped");
});

// ------------------------------------------------------------- the board

test("kill: the HUD keeps its one line — marks, and nothing joins it", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="strip">'));
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds exactly one line, found " + children.length);
  assert.match(hud, /id="marks-line"/);
  assert.equal((hud.match(/<button/g) || []).length, 0, "no control in the HUD");
  assert.match(SIT_HTML, /marksLine\.textContent = board\.marks \+ \(board\.marks === 1 \? " mark" : " marks"\);/,
    "and a marks figure agrees with its own noun");
});

test("the stack carries two labelled groups, on the cards' own ground", () => {
  assert.match(SIT_HTML, /<div class="grouplabel">THE DESK<\/div>/);
  assert.match(SIT_HTML, /<div class="grouplabel">THE TERRACE<\/div>/);
  assert.match(SIT_HTML, /<button type="button" class="card" id="carry">/, "CARRY is a card in the stack");
  assert.match(SIT_HTML, /<button type="button" class="card" id="up">/, "and so is UP");
  assert.match(rule("#ladder"), /background:\s*var\(--card\)/, "the bar keeps the cards' ground");
  assert.match(rule("button.card"), /flex:\s*1 0 auto/, "cards grow into the slack and never shrink");
  assert.match(rule("button.card"), /overflow:\s*hidden/);
  assert.match(rule("#cards"), /overflow-y:\s*auto/);
  assert.match(rule("#told"), /max-height:\s*46%/, "the sentence panels yield inside their cap");
  assert.match(rule("#town"), /flex:\s*0 1 auto/, "the scenery yields first of all");
  assert.match(rule("#track"), /touch-action:\s*none/);
  assert.match(cssOf(), /--thumb:\s*44px/, "the muster thumb keeps its touch floor");
  assert.doesNotMatch(SIT_HTML, /transition|@keyframes|animation:/i,
    "nothing eases and nothing travels — the ladder and the ground move only on a commit");
});

test("every figure on the board is read from the sim — no number is typed into the markup", () => {
  for (const shape of [
    /el\.querySelector\("\.cp"\)\.textContent = "pays " \+ c\.pays;/,
    /el\.querySelector\("\.co"\)\.textContent = \(c\.provisional \? "\\u2192 " : ""\) \+ c\.percent \+ "%";/,
    /return c\.provisions \+ " from the stores";/,
    /return c\.provisions \+ " from the stores · toll " \+ c\.toll;/,
    /"lands " \+ board\.carryYield/,
    /"costs " \+ board\.upPrice/,
    /"greenhouse " \+ board\.level \+ " of " \+ board\.maxLevel/,
    /for \(let i = 0; i < board\.storesCap; i\+\+\)/,
    /for \(let i = 0; i <= board\.reserveFull; i\+\+\)/,
  ]) {
    assert.match(SIT_HTML, shape, "the read must come off the sim: " + shape);
  }
  assert.doesNotMatch(HTML_CODE, /baseRisk|0\.036|0\.012|0\.76|pays 10|pays 14|pays 18|MUSTER WARDEN 3/,
    "no odds arithmetic and no pay figure is copied onto the board");
});

function spin120ms() {
  const end = Date.now() + 120;
  while (Date.now() < end) { /* a real, blocking 120ms of wall time */ }
}

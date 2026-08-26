"use strict";

// CFD-196 dispatch sitting. The spec is docs/cfd-196-beat.md (SIGNED — David,
// 2026-08-26: "signed — go, and rule the seam my way"), under
// docs/mechanisms-recommitted.md §6's canon-check discipline. Every testable
// Kill line below is a test and the REFUSED table is the ban list.
//
// THE FIXTURE QUESTION, answered in the code rather than in a comment: every
// board in this file is minted by makeBoard() at the opening — marks 0,
// roster 0, train home — and driven forward by walk() / reach(), which call
// the same commits a player's thumb calls. No test hand-sets a field. The one
// thing injected is the die: createBoard takes a roll function, because
// honest dice guarantee nothing and the turned-back sentences have to be
// reachable on purpose. The sim never scripts an outcome; the test rolls it.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { execFileSync } = require("node:child_process");
const Dispatch = require("../sit/dawnspur-dispatch/sim.js");

const ROOT = path.join(__dirname, "..");
const SIT_HTML = fs.readFileSync(path.join(ROOT, "sit/dawnspur-dispatch/index.html"), "utf8");
const SIT_SIM = fs.readFileSync(path.join(ROOT, "sit/dawnspur-dispatch/sim.js"), "utf8");
// The board's behaviour and its words, with the provenance comments removed.
// The header comment must be free to CITE the engine terms this board refuses
// (that is the house rule: provenance travels with the number); the ban list
// below grades the code and the copy, which is where a refusal can actually
// leak. The sim holds no "//" inside any string, so this strip is exact.
const SIM_CODE = SIT_SIM.replace(/\/\/.*$/gm, "");
const BOARD = SIT_HTML + "\n" + SIM_CODE;

const HALT = "dawnspur-halt";
const MOSS = "mosswake-loop";
const CLOUD = "cloud-basin-span";
const RUST = "rustfall-yard";
const SENDABLE = [HALT, MOSS, CLOUD];
const STAKE = { "dawnspur-halt": 0, "mosswake-loop": 2, "cloud-basin-span": 4 };
const PAYS = { "dawnspur-halt": 10, "mosswake-loop": 14, "cloud-basin-span": 18 };

// The beat's published odds table, in percent to a tenth, transcribed from
// docs/cfd-196-beat.md — bare / +1 / +2 / +3 / +4 Wardens. This is a PIN, not
// a second implementation: the sim must land on these numbers, and it must
// land on them by its own formula.
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
// A board at the opening, wired to a die the test can steer and count.
function makeBoard() {
  const ctl = { next: 0, calls: 0 };
  const b = Dispatch.createBoard({
    fresh: true,
    roll: function () { ctl.calls += 1; return ctl.next; },
  });
  return { b: b, ctl: ctl };
}
// Real commits, from the opening, in the order a thumb makes them.
//   h / m / c = SEND the halt / Mosswake / Cloud Basin
//   W         = MUSTER WARDEN
//   +         = MEET, and the die comes home (0 is under every chance)
//   -         = MEET, and the die turns back (1 is over every chance)
//   .         = the calm: wait(), which must take nothing and report false
function walk(line, seed) {
  const h = seed || makeBoard();
  for (const ch of line) {
    let ok;
    if (ch === "h") ok = h.b.commitSend(HALT);
    else if (ch === "m") ok = h.b.commitSend(MOSS);
    else if (ch === "c") ok = h.b.commitSend(CLOUD);
    else if (ch === "W") ok = h.b.commitMuster();
    else if (ch === "+") { h.ctl.next = 0; ok = h.b.commitMeet(); }
    else if (ch === "-") { h.ctl.next = 1; ok = h.b.commitMeet(); }
    else if (ch === ".") ok = h.b.wait() === false;
    else throw new Error("bad walk step " + ch);
    assert.ok(ok, "walk step '" + ch + "' refused in \"" + line + "\"");
  }
  return h;
}
// Walk to a real state with `wardens` aboard and the stake for `routeId` in
// hand, funded only by runs the player actually made.
function reach(routeId, wardens) {
  const h = makeBoard();
  const need = wardens * 3 + STAKE[routeId];
  while (h.b.marks < need) walk("h+", h);
  for (let i = 0; i < wardens; i++) assert.ok(h.b.commitMuster(), "muster " + i + " refused");
  assert.equal(h.b.roster, wardens);
  assert.ok(h.b.marks >= STAKE[routeId], "reach() left the stake unaffordable");
  return h;
}
function cardFor(b, id) {
  return b.cards().find(function (c) { return c.id === id; });
}
function snap(b) {
  return {
    marks: b.marks, roster: b.roster, away: b.away, stopped: b.stopped,
    town: b.town, record: b.record, cards: b.cards(), lit: b.litSends(),
    manifest: b.manifest, manifestLine: b.manifestLine,
    runSentence: b.runSentence, endSentence: b.endSentence,
    musterPrice: b.musterPrice, rosterCap: b.rosterCap,
    canMuster: b.canMuster(), canMeet: b.canMeet(),
    canSend: SENDABLE.concat([RUST]).map(function (id) { return b.canSend(id); }),
  };
}
// Seeded PRNG for the property walks — a red run replays exactly.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// 400 seeded sittings of random thumbs and honest dice, from the opening.
function sittings(seed, runs, steps, each) {
  const rnd = mulberry32(seed);
  for (let run = 0; run < runs; run++) {
    const h = makeBoard();
    for (let i = 0; i < steps; i++) {
      const act = ["h", "m", "c", "R", "W", "M", "."][Math.floor(rnd() * 7)];
      h.ctl.next = rnd();
      if (act === "h") h.b.commitSend(HALT);
      else if (act === "m") h.b.commitSend(MOSS);
      else if (act === "c") h.b.commitSend(CLOUD);
      else if (act === "R") h.b.commitSend(RUST);
      else if (act === "W") h.b.commitMuster();
      else if (act === "M") h.b.commitMeet();
      else h.b.wait();
      each(h.b, run, i);
    }
  }
}

// ---------------------------------------------------------------- guards
// KILL: "Live shas are overwritten … Any Dawnspur board or /convoy-stop/ is
// touched." Graded at HEAD's blobs, which is what a deploy actually ships.

test("guard: the live scale sitting's blobs are unchanged (sim 953368a1 still stands)", () => {
  assert.equal(sha256(gitBlob("sit/dawnspur-scale/index.html")), "5d2f452ff6e4c72a0d7432f4462490d9ae2f1d0debb5c7474ba9216751fd65bb");
  assert.equal(sha256(gitBlob("sit/dawnspur-scale/sim.js")), "953368a11dcf0a7f2478e59e4b572ca458a0d404b0dfba78822d04fb306db31c");
  assert.equal(sha256(gitBlob("public/dawnspur-scale/index.html")), "5d2f452ff6e4c72a0d7432f4462490d9ae2f1d0debb5c7474ba9216751fd65bb");
  assert.equal(sha256(gitBlob("public/dawnspur-scale/sim.js")), "953368a11dcf0a7f2478e59e4b572ca458a0d404b0dfba78822d04fb306db31c");
});

test("guard: the live heat sitting's blobs are unchanged (sim 292d6645 still stands)", () => {
  assert.equal(sha256(gitBlob("sit/dawnspur-heat/index.html")), "b5f7e14f4ed82a81e8b5bbc8b07c1e808698ca3a90f0fd9664db2f0d5dbba995");
  assert.equal(sha256(gitBlob("sit/dawnspur-heat/sim.js")), "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
  assert.equal(sha256(gitBlob("public/dawnspur-heat/index.html")), "b5f7e14f4ed82a81e8b5bbc8b07c1e808698ca3a90f0fd9664db2f0d5dbba995");
  assert.equal(sha256(gitBlob("public/dawnspur-heat/sim.js")), "292d66454d826cb22e36570b242f00bd0a0315e4391a764cfbc13d54ed6de06b");
});

test("guard: the preserved kill and the Convoy Stop export are unchanged (395c18f2 / 5ad814e6)", () => {
  assert.equal(sha256(gitBlob("public/dawnspur/index.html")), "bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59");
  assert.equal(sha256(gitBlob("public/dawnspur/sim.js")), "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c");
  assert.equal(sha256(gitBlob("public/convoy-stop/index.html")), "f453b78964aaf9072c47f311036b8309a2a93b302c173a8552f2ea7638916137");
  assert.equal(sha256(gitBlob("public/convoy-stop/sim.js")), "5ad814e6eb9f8263be5dd224ae42497de932ec87b767a96399aaa4348a4a146f");
});

test("deploy copy public/dawnspur-dispatch is byte-identical to sit/dawnspur-dispatch", () => {
  // Raw bytes, no normalization: .gitattributes declares `* -text`, so the
  // checkout IS the shipped bytes and normalizing here would mask a drift.
  const raw = (p) => fs.readFileSync(path.join(ROOT, p));
  const sitFiles = fs.readdirSync(path.join(ROOT, "sit/dawnspur-dispatch")).sort();
  const pubFiles = fs.readdirSync(path.join(ROOT, "public/dawnspur-dispatch")).sort();
  assert.deepEqual(pubFiles, sitFiles, "the two copies must hold the same file list");
  for (const f of sitFiles) {
    assert.equal(sha256(raw("public/dawnspur-dispatch/" + f)), sha256(raw("sit/dawnspur-dispatch/" + f)),
      "sit/public drift: " + f);
  }
});

test("MANIFEST.txt records the shipped hashes, and they match the bytes on disk", () => {
  const man = fs.readFileSync(path.join(ROOT, "sit/dawnspur-dispatch/MANIFEST.txt"), "utf8");
  for (const f of ["index.html", "sim.js"]) {
    const m = man.match(new RegExp(f.replace(".", "\\.") + "\\s+sha256:([0-9a-f]{64})"));
    assert.ok(m, "MANIFEST.txt records a sha256 for " + f);
    assert.equal(m[1], sha256(fs.readFileSync(path.join(ROOT, "sit/dawnspur-dispatch/" + f))),
      "MANIFEST.txt hash for " + f + " does not match the shipped bytes");
  }
  // And it names the boards it must not have touched.
  for (const pin of ["953368a1", "292d6645", "395c18f2", "5ad814e6"]) {
    assert.ok(man.includes(pin), "MANIFEST.txt must record the live sha left standing: " + pin);
  }
});

test("the board ships no assets and reaches for nothing off itself", () => {
  const files = fs.readdirSync(path.join(ROOT, "sit/dawnspur-dispatch")).sort();
  assert.deepEqual(files, ["MANIFEST.txt", "index.html", "sim.js"],
    "the dispatch board is three files: no asset, no dependency, no build step");
  assert.equal((SIT_HTML.match(/<script/g) || []).length, 2, "two scripts: the sim and the board");
  assert.match(SIT_HTML, /<script src="\.\/sim\.js"><\/script>/, "the sim is the only file the board loads");
  assert.doesNotMatch(BOARD, /https?:|<link|@import|url\(/i, "no network, no external stylesheet, no remote asset");
});

// ------------------------------------------------------ the opening, walked

test("fixture: createBoard() with no options is the same opening as {fresh:true}", () => {
  assert.deepEqual(snap(Dispatch.createBoard()), snap(Dispatch.createBoard({ fresh: true })));
});

test("the opening: marks 0, roster 0, train home — and only the halt is lit, because it is the free send", () => {
  const b = makeBoard().b;
  assert.equal(b.marks, 0);
  assert.equal(b.roster, 0);
  assert.equal(b.away, false);
  assert.equal(b.stopped, false);
  assert.equal(b.runSentence, null, "nothing has happened yet, so nothing is said");
  assert.equal(b.endSentence, null, "no ending before the first Chartered cargo");
  assert.deepEqual(b.record, { runsOut: 0, cargoesBanked: 0, runsTurnedBack: 0, marksLost: 0 });
  assert.deepEqual(b.litSends(), [HALT], "the ramp is the ladder: the halt alone, and only because it stakes nothing");
  // And it is NOT a separate gate — the other two are dark for want of marks.
  assert.equal(cardFor(b, MOSS).stake, 2);
  assert.equal(cardFor(b, CLOUD).stake, 4);
  assert.equal(b.marks, 0, "which is exactly the stake the desk cannot pay yet");
  assert.equal(b.canMuster(), false, "3 marks are 3 marks");
  assert.equal(b.canMeet(), false, "nothing is out to meet");
});

test("the stop is never one run: reaching Cloud Basin home paid always takes a banked cargo first", () => {
  // A Chartered send costs 4 and the desk opens at 0, so a run must come home
  // before the summit can leave. This is why the terminal sentence never has
  // to say "One runs out".
  const h = makeBoard();
  assert.equal(h.b.canSend(CLOUD), false, "the summit cannot be the first send");
  walk("h+c+", h);
  assert.equal(h.b.stopped, true);
  assert.equal(h.b.record.runsOut, 2, "the shortest sitting is two runs");
  assert.ok(h.b.record.cargoesBanked >= 2);
});

// ------------------------------------------------- KILL: wall-clock motion
// "Anything on the board moves with wall time. durationSeconds or baseSeconds
// is imported as a clock."

test("kill: no clock anywhere — the sim holds no time instrument and the board runs no loop", () => {
  assert.doesNotMatch(SIT_SIM, /setTimeout|setInterval|performance\.|Date\.|durationSeconds|baseSeconds/,
    "the sim must hold no clock and must not import the engine's seconds as time");
  assert.doesNotMatch(SIT_HTML, /setTimeout|setInterval|requestAnimationFrame|performance\./,
    "no loop, no timer, no animation frame on the board");
  assert.doesNotMatch(SIT_HTML, /board\.wait/, "nothing calls the world's turn on the board");
  assert.doesNotMatch(SIT_HTML, /transition|@keyframes|animation:/i,
    "the away state is a state, not a motion picture — nothing eases, nothing travels");
  assert.doesNotMatch(SIT_HTML, /<progress|<meter/i, "no progress meter, no timer bar");
  // Date. survives in exactly one place: the double-tap gesture guard, which
  // is an input filter, not a world clock.
  const dates = SIT_HTML.match(/Date\.\w+/g) || [];
  assert.deepEqual(dates, ["Date.now"], "Date is read once, and only by the double-tap guard");
  assert.match(SIT_HTML, /if \(now - lastTouch <= 350\) e\.preventDefault\(\);/);
});

test("kill: the away run never sours — real wall time moves nothing, and the calm is not an event", () => {
  const h = walk("h+WWm");
  assert.equal(h.b.away, true, "a run is out with 2 Wardens aboard");
  const before = snap(h.b);
  spin120ms();
  assert.deepEqual(snap(h.b), before, "120ms of real time leaves the away run byte-identical");
  for (let i = 0; i < 50; i++) {
    assert.equal(h.b.wait(), false, "the calm must never read as a handled event");
  }
  assert.deepEqual(snap(h.b), before, "fifty world's turns take nothing from the run");
  assert.equal(h.ctl.calls, 1, "and not one of them threw a die");
  // Met after all that, it is the same run at the same stated chance.
  h.ctl.next = 0;
  assert.ok(h.b.commitMeet());
  assert.equal(h.b.marks, before.marks + PAYS[MOSS]);
});

test("kill: the calm takes nothing in every reachable state, not just the away one", () => {
  const states = {
    opening: makeBoard(),
    "one cargo banked": walk("h+"),
    "turned back, bare": walk("h-"),
    "roster aboard, away": walk("h+WWm"),
    "full roster at home": walk("h+h+WWWW"),
    stopped: walk("h+c+"),
  };
  for (const [name, h] of Object.entries(states)) {
    const before = snap(h.b);
    assert.equal(h.b.wait(), false, name + ": wait() must return false");
    assert.deepEqual(snap(h.b), before, name + ": the world's turn takes nothing");
  }
});

// --------------------------------------- KILL: a failed run pays a fraction
// "A failed run pays any fraction of the route reward. The ×0.25 leg appears."

test("kill: a turned-back run pays ZERO — every route, every roster, exactly minus the stake", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = reach(id, w);
      const before = h.b.marks;
      const banked = h.b.record.cargoesBanked;
      assert.ok(h.b.commitSend(id));
      h.ctl.next = 1;
      assert.ok(h.b.commitMeet());
      assert.equal(h.b.marks, before - STAKE[id],
        id + " at " + w + " Wardens: a turned-back run must cost the stake and pay nothing");
      assert.equal(h.b.record.cargoesBanked, banked, "nothing was banked");
      assert.equal(h.b.record.marksLost, STAKE[id], "the record keeps the stake it lost");
    }
  }
  assert.doesNotMatch(SIM_CODE, /rewardMultiplier|consolation|\*\s*0\.25|0\.25\s*\*/,
    "the engine's ×0.25 failure leg is refused, not copied");
});

test("kill: a home run pays the route in full — 10 / 14 / 18, never scaled by the odds", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = reach(id, w);
      const before = h.b.marks;
      assert.ok(h.b.commitSend(id));
      h.ctl.next = 0;
      assert.ok(h.b.commitMeet());
      assert.equal(h.b.marks, before - STAKE[id] + PAYS[id],
        id + " at " + w + " Wardens: the route pays in full");
    }
  }
});

// --------------------------------------------------------- KILL: refunds
// "A stake, toll, or muster refunds — any branch, any direction."

test("kill: nothing refunds — the stake is gone at the click on both branches, and no hand returns it", () => {
  for (const id of SENDABLE) {
    const home = reach(id, 0);
    const atDesk = home.b.marks;
    assert.ok(home.b.commitSend(id));
    assert.equal(home.b.marks, atDesk - STAKE[id], id + ": the stake is spent at the SEND, not at the meet");
    home.ctl.next = 0;
    assert.ok(home.b.commitMeet());
    assert.equal(home.b.marks, atDesk - STAKE[id] + PAYS[id],
      id + ": a home run pays the route and never gives the stake back on top");
    const back = reach(id, 0);
    const atDesk2 = back.b.marks;
    assert.ok(back.b.commitSend(id));
    back.ctl.next = 1;
    assert.ok(back.b.commitMeet());
    assert.equal(back.b.marks, atDesk2 - STAKE[id], id + ": a turned-back run recovers nothing");
  }
});

test("kill: the muster never refunds, and no API exists to sell a Warden back", () => {
  const h = walk("h+");
  const before = h.b.marks;
  assert.ok(h.b.commitMuster());
  assert.equal(before - h.b.marks, 3, "MUSTER spends exactly 3");
  assert.equal(h.b.roster, 1);
  for (const absent of ["commitDisband", "canDisband", "commitStand", "refund", "sell", "commitInsure", "canInsure"]) {
    assert.equal(typeof h.b[absent], "undefined", absent + " must not exist");
  }
  assert.doesNotMatch(SIM_CODE, /refund|rebate|recover|disband|payout/i);
  // The roster only ever climbs, and only at the player's own muster.
  assert.doesNotMatch(SIM_CODE, /roster\s*(-=|--)/, "no path takes a Warden off the roster");
});

test("kill: every refused commit is a pure refusal — nothing spent, nothing returned, nothing moved", () => {
  const states = {
    opening: makeBoard(),
    "away with a run out": walk("h+m"),
    "broke after a turned-back spine run": walk("h+m-m-m-m-m-"),
    "full roster at home": walk("h+h+WWWW"),
    stopped: walk("h+c+"),
  };
  for (const [name, h] of Object.entries(states)) {
    for (const id of SENDABLE.concat([RUST])) {
      const before = snap(h.b);
      const ok = h.b.commitSend(id);
      if (!ok) assert.deepEqual(snap(h.b), before, name + ": refused send " + id + " must change nothing");
      else assert.notDeepEqual(snap(h.b), before);
      if (ok) break;
    }
    const beforeM = snap(h.b);
    if (!h.b.commitMuster()) assert.deepEqual(snap(h.b), beforeM, name + ": a refused muster must change nothing");
    const beforeMeet = snap(h.b);
    if (!h.b.commitMeet()) assert.deepEqual(snap(h.b), beforeMeet, name + ": a refused meet must change nothing");
  }
});

// ------------------------------------------------------ KILL: the crew home
// "Any crew member fails to come home, on either branch, ever, this sitting."

test("kill: the crew always comes home — the roster is identical across SEND and both MEET branches", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      for (const die of [0, 1]) {
        const h = reach(id, w);
        assert.equal(h.b.roster, w);
        assert.ok(h.b.commitSend(id));
        assert.equal(h.b.roster, w, id + "/" + w + ": the whole roster rides and none of it is spent at the click");
        assert.equal(h.b.manifest.wardens, w, "and the manifest itemizes exactly who went");
        h.ctl.next = die;
        assert.ok(h.b.commitMeet());
        assert.equal(h.b.roster, w,
          id + "/" + w + ": the crew comes home on the " + (die === 0 ? "home" : "turned-back") + " branch");
      }
    }
  }
});

test("kill: across 400 seeded sittings the roster only ever moves at a muster", () => {
  let last = null;
  sittings(0xC196, 400, 30, (b) => {
    if (last !== null) assert.ok(b.roster >= last || b.roster === 0, "the roster fell without a muster");
    last = b.roster;
    assert.ok(b.roster >= 0 && b.roster <= 4, "roster out of 0..4: " + b.roster);
  });
  // Source-shape: no outcome path in commitMeet touches the roster at all.
  const meet = SIT_SIM.match(/function commitMeet\(\)[\s\S]*?\n  \}/);
  assert.ok(meet, "commitMeet() found");
  assert.doesNotMatch(meet[0], /roster/, "the meet must not read or write the roster on either branch");
});

// ------------------------------- KILL: the stated percent and the rolled one
// "The stated percent and the sim's rolled threshold disagree anywhere."

test("kill: the odds are the beat's table, to the number — 3 routes x 5 rosters, derived not authored", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = reach(id, w);
      const c = cardFor(h.b, id);
      const expected = ODDS[id][w] / 100;
      assert.ok(Math.abs(c.chance - expected) < 1e-9,
        id + " at " + w + " Wardens: chance " + c.chance + " is not the beat's " + expected);
      assert.equal(c.percent, Math.round(expected * 100),
        id + " at " + w + " Wardens: the card states the whole percent of its own chance");
    }
  }
});

test("kill: the die is thrown against the EXACT chance, never against the rounded percent", () => {
  // The discriminating probe: where the display's rounding moves the number,
  // roll between the two. The outcome must follow the exact chance. A sim that
  // rolled the percent it prints would answer the other way here.
  let probed = 0;
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const chance = cardFor(reach(id, w).b, id).chance;
      const rounded = Math.round(chance * 100) / 100;
      if (Math.abs(rounded - chance) < 1e-9) continue;
      probed += 1;
      const probe = (chance + rounded) / 2;
      const shouldComeHome = probe < chance;
      const h = reach(id, w);
      const before = h.b.marks;
      assert.ok(h.b.commitSend(id));
      h.ctl.next = probe;
      assert.ok(h.b.commitMeet());
      const cameHome = h.b.marks > before - STAKE[id];
      assert.equal(cameHome, shouldComeHome,
        id + " at " + w + " Wardens: a die of " + probe + " must be read against " + chance + ", not " + rounded);
    }
  }
  assert.ok(probed >= 9, "the probe must actually bite on most of the table, bit on " + probed);
});

test("kill: the threshold is exactly the stated chance — a hair under comes home, the number itself does not", () => {
  // The chance here is the sim's OWN quote, read off the card. That the quote
  // is the beat's number is the previous test's job; this one grades that the
  // die is read against that very number and nothing beside it.
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const chance = cardFor(reach(id, w).b, id).chance;
      for (const [die, home] of [[chance * (1 - 1e-12), true], [chance, false], [chance * (1 + 1e-12), false]]) {
        const h = reach(id, w);
        const before = h.b.marks;
        assert.ok(h.b.commitSend(id));
        h.ctl.next = die;
        assert.ok(h.b.commitMeet());
        assert.equal(h.b.marks > before - STAKE[id], home,
          id + "/" + w + ": a die of " + die + " against " + chance);
      }
    }
  }
  // One comparison, in one place, against the number the card already stated.
  const meet = SIT_SIM.match(new RegExp("function commitMeet\\(\\)[\\s\\S]*?\\n  \\}"))[0];
  assert.match(meet, /const home = draw < run\.chance;/, "the meet reads the run's own stated chance");
  assert.equal((SIM_CODE.match(/s\.roll\(\)/g) || []).length, 1, "and there is exactly one die in the file");
});

test("kill: the away card re-quotes the number it left on — the manifest and the card agree", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = reach(id, w);
      const quoted = cardFor(h.b, id);
      assert.ok(h.b.commitSend(id));
      const out = cardFor(h.b, id);
      assert.equal(out.chance, quoted.chance, "the away card holds the chance the desk quoted");
      assert.equal(out.percent, quoted.percent);
      assert.equal(h.b.manifest.chance, quoted.chance, "and the manifest carries the same one number");
      assert.equal(h.b.manifest.percent, quoted.percent);
      assert.equal(out.out, true, "the sent line is marked");
    }
  }
});

// --------------------------------------------- KILL: odds move by something
// "Odds move by anything but baseRisk and the roster — a posture, hero, event,
// insurance, damage, or safety term goes nonzero."

test("kill: the chance is a pure function of route and roster, and nothing else in a sitting moves it", () => {
  const table = {};
  for (const id of SENDABLE) table[id] = ODDS[id].map((p) => p / 100);
  sittings(0x0DD5, 300, 30, (b) => {
    for (const c of b.cards()) {
      if (!c.sendable) { assert.equal(c.chance, null); continue; }
      if (c.out) continue;
      assert.ok(Math.abs(c.chance - table[c.id][b.roster]) < 1e-9,
        c.id + " quoted " + c.chance + " at roster " + b.roster + " — an unnamed term moved the odds");
    }
  });
});

test("kill: exactly one warden step, and it is 0.036 — the engine's guard 3 at 0.012 a point", () => {
  for (const id of SENDABLE) {
    for (let w = 1; w <= 4; w++) {
      const step = ODDS[id][w] / 100 - ODDS[id][w - 1] / 100;
      assert.ok(Math.abs(step - 0.036) < 1e-9, "the beat's own table must step by 0.036, stepped " + step);
      const bare = reach(id, w - 1);
      const armed = reach(id, w);
      const moved = cardFor(armed.b, id).chance - cardFor(bare.b, id).chance;
      assert.ok(Math.abs(moved - 0.036) < 1e-9, id + ": Warden " + w + " moved the card by " + moved);
    }
  }
  assert.match(SIT_SIM, /const POINT = 0\.012;/, "the point value is the engine's, named");
  assert.match(SIT_SIM, /const WARDEN_GUARD = 3;/, "the guard power is crewTypes[wardens].power.guard");
  assert.match(SIT_SIM, /const BASE = 0\.76;/, "the base is calculateDispatchPreview's own");
});

test("kill: no term this board refuses exists to be set — the API surface is pinned", () => {
  const keys = Object.keys(makeBoard().b).sort();
  assert.deepEqual(keys, [
    "away", "canMeet", "canMuster", "canSend", "cards", "commitMeet", "commitMuster",
    "commitSend", "endSentence", "litSends", "manifest", "manifestLine", "marks",
    "musterPrice", "record", "roster", "rosterCap", "runSentence", "stopped", "town", "wait",
  ]);
  const b = makeBoard().b;
  for (const absent of ["setPosture", "posture", "hero", "insurance", "mission", "setMission", "safety", "damage"]) {
    assert.equal(typeof b[absent], "undefined", absent + " must not exist on this board");
  }
});

test("provenance travels with the number: the sim's header names every engine term it zeroes", () => {
  // The inversion of the ban list below — the ban grades the CODE, the header
  // is required to carry the citation, so the refusals cannot quietly become
  // folklore. If a term is ever un-refused, this is the list to update.
  for (const term of ["calculateDispatchPreview", "heroBonus", "posture.success",
    "event.successBias", "insuranceBonus", "damagePenalty", "routeState.safety",
    "economyConfig.resourceValues", "routeTolls.chartered.flatFee", "ea22c43"]) {
    assert.ok(SIT_SIM.includes(term), "the sim's provenance header must cite " + term);
  }
});

// -------------------------------------------- KILL: the roll's place in time
// "The roll happens at SEND, a run resolves without MEET, or any outcome is
// scripted."

test("kill: no die is thrown at the SEND — the roll is the meet's, once, and only the meet's", () => {
  for (const id of SENDABLE) {
    const h = reach(id, 2);
    const before = h.ctl.calls;
    assert.ok(h.b.commitSend(id));
    assert.equal(h.ctl.calls, before, id + ": the SEND must throw no die");
    h.ctl.next = 0;
    assert.ok(h.b.commitMeet());
    assert.equal(h.ctl.calls, before + 1, id + ": the meet throws exactly one");
  }
  // Musters throw nothing either, and neither does reading the board.
  const h = walk("h+");
  const calls = h.ctl.calls;
  h.b.commitMuster();
  h.b.cards();
  h.b.litSends();
  h.b.wait();
  assert.equal(h.ctl.calls, calls, "reading the desk throws no dice");
  const send = SIT_SIM.match(/function commitSend\(routeId\)[\s\S]*?\n  \}/);
  assert.ok(send, "commitSend() found");
  assert.doesNotMatch(send[0], /roll/, "the send holds no die at all");
});

test("kill: a run cannot resolve without the meet — the away state is held, not ticking", () => {
  const h = walk("h+WWc");
  const before = snap(h.b);
  for (let i = 0; i < 200; i++) { h.b.wait(); h.b.cards(); h.b.litSends(); h.b.canMuster(); }
  spin120ms();
  assert.deepEqual(snap(h.b), before, "two hundred reads and 120ms of real time resolve nothing");
  assert.equal(h.b.record.cargoesBanked, before.record.cargoesBanked);
  assert.equal(h.b.away, true, "the run is still out");
  assert.equal(h.b.canMeet(), true, "and MEET is the one lit verb");
});

test("kill: no outcome is scripted — the FIRST run turns back on a losing die and comes home on a winning one", () => {
  const loser = walk("h-");
  assert.equal(loser.b.record.cargoesBanked, 0, "no forced first success exists");
  assert.equal(loser.b.marks, 0);
  assert.match(loser.b.runSentence, /The train turned for home/);
  const winner = walk("h+h+h+h+h+");
  assert.equal(winner.b.record.cargoesBanked, 5, "and no forced lesson-failure exists either");
  assert.equal(winner.b.record.runsTurnedBack, 0);
  // The meet reads nothing but the die and the run it is meeting.
  const meet = SIT_SIM.match(/function commitMeet\(\)[\s\S]*?\n  \}/)[0];
  assert.doesNotMatch(meet, /runsOut|cargoesBanked\s*[=<>]|Math\.random/,
    "the outcome must not be keyed on which run this is");
});

// ------------------------------------------------------- KILL: Rustfall Yard
// "Rustfall sends, quotes odds, rolls dice, or opens anything. A mini-game or
// its stub appears."

test("kill: Rustfall never sends and never quotes — there is no number on it to quote", () => {
  const b = makeBoard().b;
  const c = cardFor(b, RUST);
  assert.equal(c.sendable, false);
  assert.equal(c.lit, false);
  assert.equal(c.chance, null, "no odds are quoted on contested territory");
  assert.equal(c.percent, null);
  assert.equal(c.pays, null);
  assert.equal(c.stake, null);
  assert.ok(c.note.includes("Raiders"), "the card names the raiders in the board's words");
  assert.match(c.note, /not the desk's dice/, "and says why the desk will not quote it");
  assert.match(c.note, /convoy defense/, "and what it waits for");
  // The risk figure is ABSENT, not suppressed: there is nothing here to leak.
  assert.doesNotMatch(SIT_SIM, /0\.22/, "Rustfall's baseRisk must not exist in this file");
});

test("kill: Rustfall refuses the send in every reachable state, and opens nothing", () => {
  sittings(0x2057, 300, 24, (b) => {
    assert.equal(b.canSend(RUST), false, "Rustfall lit");
    assert.equal(b.litSends().includes(RUST), false, "Rustfall in the lit set");
  });
  const rich = walk("h+h+h+h+");
  assert.ok(rich.b.marks >= 40, "a desk with money still cannot buy this send");
  const before = snap(rich.b);
  assert.equal(rich.b.commitSend(RUST), false);
  const thrown = rich.ctl.calls;
  assert.deepEqual(snap(rich.b), before, "a refused Rustfall send moves nothing at all");
  assert.equal(rich.ctl.calls, thrown, "and throws no die");
  // No instance, no stub, no second screen.
  assert.doesNotMatch(BOARD, /\bcombat\b|\bscenario\b|\bwave\b|\bplacement\b|\btactic|marksm[ae]n|\bgunner|\bsapper|\branger/i,
    "the defense instance is refused by name, not stubbed");
});

// --------------------------------------------------------- KILL: the ranges
// "A second run goes out while one is out. Roster leaves 0..4. Marks go
// negative anywhere."

test("kill: one run at a time — a second send while one is out is refused and changes nothing", () => {
  const h = walk("h+h+WWm");
  assert.equal(h.b.away, true);
  for (const id of SENDABLE.concat([RUST])) {
    const before = snap(h.b);
    assert.equal(h.b.canSend(id), false, id + " lit while a run is out");
    assert.equal(h.b.commitSend(id), false);
    assert.deepEqual(snap(h.b), before);
  }
  assert.deepEqual(h.b.litSends(), [], "no send is lit while the platform is empty");
});

test("kill: marks never go negative and the roster never leaves 0..4 — 400 seeded sittings", () => {
  sittings(0x5EED, 400, 40, (b) => {
    assert.ok(b.marks >= 0, "marks went negative: " + b.marks);
    assert.ok(Number.isInteger(b.marks), "marks left the integers: " + b.marks);
    assert.ok(b.roster >= 0 && b.roster <= 4, "roster out of range: " + b.roster);
  });
});

test("kill: MUSTER goes dark while the roster rides, and dark at the cap", () => {
  const h = walk("h+h+");
  assert.equal(h.b.canMuster(), true, "20 marks at the desk, roster 0");
  assert.ok(h.b.commitSend(HALT));
  assert.equal(h.b.canMuster(), false, "MUSTER must not light while the roster is out on the line");
  const before = snap(h.b);
  assert.equal(h.b.commitMuster(), false);
  assert.deepEqual(snap(h.b), before);
  h.ctl.next = 0;
  assert.ok(h.b.commitMeet());
  assert.equal(h.b.canMuster(), true, "and lights again once the train is met");
  const full = walk("h+h+WWWW");
  assert.equal(full.b.roster, 4);
  assert.equal(full.b.canMuster(), false, "the cap is 4 and the control knows it");
  assert.equal(full.b.commitMuster(), false);
  assert.equal(full.b.roster, 4);
});

// ----------------------------------------------------------- KILL: deadlock
// "A reachable home state has no lit send, or an away state has MEET dark."

test("kill: no reachable home state is dark — the free halt is always lit short of the stop", () => {
  sittings(0xDEAD, 400, 40, (b) => {
    if (b.stopped) return;
    if (b.away) {
      assert.equal(b.canMeet(), true, "an away state must always have MEET lit");
      assert.deepEqual(b.litSends(), [], "and no send lit beside it");
      return;
    }
    assert.ok(b.litSends().includes(HALT),
      "a home state with no lit send: marks " + b.marks + ", roster " + b.roster);
    assert.equal(b.canMeet(), false, "nothing is out to meet");
  });
});

test("kill: broke is not a dead end — the halt stakes nothing, so the desk can always earn its way back", () => {
  const h = walk("h+m-m-m-m-m-");
  assert.equal(h.b.marks, 0, "five turned-back spine runs eat the ten the halt paid");
  assert.equal(h.b.roster, 0);
  assert.equal(h.b.canMuster(), false);
  assert.equal(h.b.canSend(MOSS), false);
  assert.equal(h.b.canSend(CLOUD), false);
  assert.deepEqual(h.b.litSends(), [HALT], "and the floor is still lit");
  assert.equal(h.b.stopped, false, "bare marks is not an ending");
  assert.equal(h.b.endSentence, null);
});

// ------------------------------------------ KILL: the town and other boards
// "Any outcome touches the roster, the town, or another board's state; this
// board reads or writes heat or scale state."

test("kill: no outcome touches the town — the greenhouse, the bank and the hearth stand through everything", () => {
  const opening = makeBoard().b.town;
  assert.deepEqual(opening, { hearth: "held", bank: "in the stone", greenhouse: "stands" });
  assert.ok(Object.isFrozen(opening), "the scenery is not writable state");
  sittings(0x704E, 300, 30, (b) => {
    assert.deepEqual(b.town, opening, "the town moved");
    assert.equal(b.town, opening, "and it is the same standing object, not a fresh reading of someone else's state");
  });
  for (const fn of ["commitMuster", "commitSend", "commitMeet"]) {
    const body = SIT_SIM.match(new RegExp("function " + fn + "\\([\\s\\S]*?\\n  \\}"));
    assert.ok(body, fn + "() found");
    assert.doesNotMatch(body[0], /TOWN|town|hearth|greenhouse/i, fn + " must not touch the town");
  }
});

test("kill: this board neither reads nor writes another board's state", () => {
  assert.doesNotMatch(BOARD, /localStorage|sessionStorage|indexedDB|document\.cookie/i,
    "nothing is persisted, so nothing of another sitting's can be read");
  assert.doesNotMatch(BOARD, /DawnspurScale|DawnspurHeat|dawnspur-scale|dawnspur-heat|convoy-stop/,
    "no other board's module or path is named");
  assert.doesNotMatch(BOARD, /fetch\(|XMLHttpRequest|WebSocket|import\(/,
    "the board reaches for nothing off itself");
});

// ------------------------------------------------------ KILL: the ban list
// "Insurance, postures, heroes, mission choice, contract mechanics, goods
// nouns, or a second currency appears."

test("banned tokens: the REFUSED table, graded over the board's code and the board's words", () => {
  const banned = [
    /insurance/i,
    /posture/i,
    /\bhero\b/i,
    /successBias/,
    /\bsafety\b/i,
    /\bdamage\b/i,
    /\brepair\b/i,
    /\bpatrol\b/i,
    /\bsurvey\b/i,
    /signal.?tower/i,
    /contract/i,
    /\bcharter filing\b/i,
    /\bmission\b/i,
    /\bfood\b/i,
    /\bmaterials\b/i,
    /\benergy\b/i,
    /\bparts\b/i,
    /\bfavor\b/i,
    /\bstorm\b/i,
    /\bupkeep\b/i,
    /\bdecay\b/i,
    /durationSeconds|baseSeconds/,
    /\btimer\b|countdown|\beta\b/i,
    /audio|webkitAudio|new Audio/i,
    /\bwarn\b|\balert\b/i,
  ];
  for (const re of banned) {
    assert.equal(re.test(BOARD), false, "banned token " + re + " appears in the board's code or copy");
  }
});

test("kill: one currency — marks, and nothing else is counted anywhere on the board", () => {
  assert.match(SIT_HTML, /String\(board\.marks\) \+ " marks"/, "the HUD counts marks");
  const b = makeBoard().b;
  assert.equal(typeof b.marks, "number");
  for (const absent of ["heat", "goods", "cargo", "reserve", "favor", "fuel"]) {
    assert.equal(typeof b[absent], "undefined", absent + " must not be a second currency on this board");
  }
});

// ------------------------------------------------------------- KILL: the HUD
// "The HUD grows past the one marks line."

test("kill: the HUD keeps its one line — marks, and nothing joins it", () => {
  const hud = SIT_HTML.slice(SIT_HTML.indexOf('<div id="hud">'), SIT_HTML.indexOf('<div id="desk">'));
  const children = hud.match(/\n {4}<(?:div|span|button|p|section|ul|table)/g) || [];
  assert.equal(children.length, 1, "the HUD holds exactly one line, found " + children.length);
  assert.match(hud, /id="marks-line"/, "and that line is marks");
  assert.equal((hud.match(/<button/g) || []).length, 0, "no control lives in the HUD");
  assert.doesNotMatch(hud, /Warden|roster|of 4|%/i, "the roster and the odds do not join the marks line");
});

test("the MUSTER control wears its own numbers: the price on its face and the roster on its face", () => {
  assert.match(SIT_HTML, /musterLabel\.textContent = "MUSTER WARDEN " \+ board\.musterPrice;/,
    "the price is read off the sim, not typed into the markup");
  assert.match(SIT_HTML, /rosterRead\.textContent = "Wardens " \+ board\.roster \+ " of " \+ board\.rosterCap;/,
    "and so is the roster");
  assert.doesNotMatch(SIT_HTML, /MUSTER WARDEN 3/, "3 is not typed on the board — one instrument, not two");
});

test("the board takes every number off the sim — no figure is typed into the markup", () => {
  for (const shape of [
    /el\.querySelector\("\.cp"\)\.textContent = "pays " \+ c\.pays;/,
    /el\.querySelector\("\.co"\)\.textContent = c\.percent \+ "%";/,
    /return c\.provisions \+ " provisions";/,
    /return c\.provisions \+ " provisions · " \+ c\.toll \+ " Chartered line toll";/,
  ]) {
    assert.match(SIT_HTML, shape, "the card read must come off the sim: " + shape);
  }
  assert.doesNotMatch(SIT_HTML, /baseRisk|0\.036|0\.012|0\.76|pays 10|pays 14|pays 18/,
    "no odds arithmetic and no pay figure is copied onto the board");
  // The four reads, and the civic label on the toll.
  assert.match(SIT_HTML, /class="cn"/);
  assert.match(SIT_HTML, /class="cp"/);
  assert.match(SIT_HTML, /class="cs"/);
  assert.match(SIT_HTML, /class="co"/);
  assert.match(SIT_HTML, /Chartered line toll/, "the toll is labeled as the civic fee it is");
});

test("the board shows the away state as a state: the platform empties and MEET is the one lit verb", () => {
  assert.match(SIT_HTML, /trainEl\.classList\.toggle\("gone", board\.away\);/, "the platform stands empty");
  assert.match(SIT_HTML, /meetBtn\.disabled = !board\.canMeet\(\);/, "MEET lights off the sim's own reading");
  assert.match(SIT_HTML, /el\.classList\.toggle\("out", c\.out\);/, "the sent line is marked");
  assert.match(SIT_HTML, /el\.querySelector\("\.cs"\)\.textContent = c\.manifestLine;/, "and carries the manifest");
  assert.match(SIT_HTML, /#train\.gone \{ display: none; \}/, "gone is a display state, not a journey");
});

// ------------------------------------------------------- KILL: the sentences
// "A run or the sitting ends without its sentence; a failure sentence drops
// zero-pay, stake-spent, crew-home, or home-stands; the terminal sentence does
// not read the record."

test("kill: every met run says what happened, in the board's words", () => {
  sittings(0x5A1D, 300, 30, (b) => {
    if (b.record.runsOut === 0) return;
    if (b.away) return;
    assert.equal(typeof b.runSentence, "string", "a met run with no sentence");
    assert.ok(b.runSentence.length > 40, "a met run with a stub for a sentence");
  });
  // And a run that is still out has not been told yet.
  const out = walk("h+m");
  assert.equal(out.b.runSentence, null, "the away state says nothing about a roll that has not happened");
});

test("kill: the turned-back sentence carries all four clauses, on every route and every stake", () => {
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = reach(id, w);
      assert.ok(h.b.commitSend(id));
      h.ctl.next = 1;
      assert.ok(h.b.commitMeet());
      const s = h.b.runSentence;
      assert.match(s, /the route paid nothing/, id + "/" + w + ": zero-pay clause missing");
      assert.match(s, /nothing comes back/, id + "/" + w + ": stake-spent clause missing");
      assert.match(s, /(the train is home|the Wardens? and the train are home)/,
        id + "/" + w + ": crew-home clause missing");
      assert.match(s, /the desk stands/, id + "/" + w + ": home-stands clause missing");
      if (STAKE[id] > 0) {
        assert.ok(s.includes(STAKE[id] + " marks"), id + ": the sentence names the stake it ate");
      } else {
        assert.match(s, /staked nothing/, "the free hop says so rather than claiming a spend it never made");
      }
      assert.doesNotMatch(s, /\d+ marks banked|The desk banks/, "a turned-back run banks nothing and says so");
    }
  }
});

test("the failure agent is the route's own, named — weather over the basin, the line on the Core Line", () => {
  const basin = reach(CLOUD, 0);
  assert.ok(basin.b.commitSend(CLOUD));
  basin.ctl.next = 1;
  assert.ok(basin.b.commitMeet());
  assert.match(basin.b.runSentence, /^Weather over the basin\./, "the reach route's agent is its own tag");
  const spine = reach(MOSS, 0);
  assert.ok(spine.b.commitSend(MOSS));
  spine.ctl.next = 1;
  assert.ok(spine.b.commitMeet());
  assert.match(spine.b.runSentence, /^Wet rail through the Mosswake loop\./, "the Core Line's agent is the line");
  const halt = walk("h-");
  assert.match(halt.b.runSentence, /^A shear in the near line short of the halt\./);
});

test("the home sentence names who brought it and what the desk banked", () => {
  const bare = walk("h+");
  assert.equal(bare.b.runSentence, "The train brought the Dawnspur Halt cargo home. The desk banks 10.");
  const crewed = walk("h+WWm");
  crewed.ctl.next = 0;
  assert.ok(crewed.b.commitMeet());
  assert.equal(crewed.b.runSentence, "The Wardens brought the Mosswake cargo home. The desk banks 14.",
    "the beat's own sentence, at the beat's own pay");
  const one = walk("h+W");
  assert.ok(one.b.commitSend(HALT));
  one.ctl.next = 0;
  assert.ok(one.b.commitMeet());
  assert.match(one.b.runSentence, /^The Warden brought /, "one Warden is a Warden, not Wardens");
});

test("the manifest is itemized on the away card, in the board's words", () => {
  const h = walk("h+WW");
  assert.ok(h.b.commitSend(MOSS));
  assert.equal(h.b.manifestLine, "2 Wardens ride with the Mosswake provisions.",
    "the beat's own manifest line");
  assert.deepEqual(h.b.manifest, {
    routeId: MOSS, name: "MOSSWAKE LOOP", wardens: 2, provisions: 2, toll: 0, stake: 2,
    chance: h.b.manifest.chance, percent: 71,
  });
  const basin = reach(CLOUD, 2);
  assert.ok(basin.b.commitSend(CLOUD));
  assert.equal(basin.b.manifestLine, "2 Wardens ride with the Cloud Basin provisions and the Chartered toll paid.",
    "the Chartered stake is itemized whole, toll included");
  const bare = makeBoard();
  assert.ok(bare.b.commitSend(HALT));
  assert.equal(bare.b.manifestLine, "No Wardens ride with nothing staked.",
    "the free hop's manifest is honest about being empty");
  const one = walk("h+W");
  assert.ok(one.b.commitSend(HALT));
  assert.equal(one.b.manifestLine, "1 Warden rides with nothing staked.");
});

test("kill: the sitting ends with the ledger read — the clean register", () => {
  const h = walk("h+c+");
  assert.equal(h.b.stopped, true, "the stop is the first Chartered cargo banked");
  assert.deepEqual(h.b.record, { runsOut: 2, cargoesBanked: 2, runsTurnedBack: 0, marksLost: 0 });
  assert.equal(h.b.endSentence,
    "The first Chartered cargo is home. Two runs out, two cargoes banked, and the stake was never once called. " +
    "The line past the basin is the next sitting's.");
  // The run's own sentence still stands beside it.
  assert.equal(h.b.runSentence, "The train brought the Cloud Basin cargo home. The desk banks 18.");
  assert.deepEqual(h.b.litSends(), [], "the stop is the stop: every send goes out");
  assert.equal(h.b.canMuster(), false);
  assert.equal(h.b.canMeet(), false);
  assert.equal(h.b.wait(), false);
});

test("kill: the terminal reads the record — the paid register names the count and the cost, without apology", () => {
  const h = walk("h+m-h+c+");
  assert.deepEqual(h.b.record, { runsOut: 4, cargoesBanked: 3, runsTurnedBack: 1, marksLost: 2 });
  assert.equal(h.b.endSentence,
    "The first Chartered cargo is home. Four runs out, three cargoes banked, one turned back, " +
    "2 marks staked and lost on the way. " +
    "The record keeps what came home; the line past the basin is the next sitting's.");
  assert.doesNotMatch(h.b.endSentence, /sorry|unlucky|unfortunate|but/i, "no apology, no consolation");
  // A longer, dearer sitting reads differently, because it reads the record.
  const dear = walk("h+m-h+m-h+c-h+c+");
  assert.deepEqual(dear.b.record, { runsOut: 8, cargoesBanked: 5, runsTurnedBack: 3, marksLost: 8 });
  assert.equal(dear.b.endSentence,
    "The first Chartered cargo is home. Eight runs out, five cargoes banked, three turned back, " +
    "8 marks staked and lost on the way. " +
    "The record keeps what came home; the line past the basin is the next sitting's.");
});

// REWRITTEN, and it must be read as a correction rather than an addition. The
// test that stood here pinned a defect at its mildest instance — 3 out, 2
// banked, 1 turned back — and called it "the clean register surviving". It did
// not survive. Keying the register on marksLost made the beat's "Clean record"
// reachable over a sitting with ANY number of turned-back free halt runs, and
// the same sentence blamed a weather that never touched a Core Line run. A
// test pinning the gentlest instance of a defect is how the defect ships.
test("kill: a run that turned back is NEVER a clean record, however little it cost", () => {
  // The mild instance the old test blessed.
  const mild = walk("h-h+c+");
  assert.deepEqual(mild.b.record, { runsOut: 3, cargoesBanked: 2, runsTurnedBack: 1, marksLost: 0 });
  assert.doesNotMatch(mild.b.endSentence, /never once called/,
    "one free run turned back — the clean register must not fire");
  assert.equal(mild.b.endSentence,
    "The first Chartered cargo is home. Three runs out, two cargoes banked, one turned back and cost " +
    "nothing but the trip. " +
    "The record keeps what came home; the line past the basin is the next sitting's.");
  // The severe instance, reached in ordinary play: nine free runs turned back.
  const many = makeBoard();
  for (let i = 0; i < 9; i++) walk("h-", many);
  for (let i = 0; i < 3; i++) walk("h+", many);
  walk("c+", many);
  assert.deepEqual(many.b.record, { runsOut: 13, cargoesBanked: 4, runsTurnedBack: 9, marksLost: 0 });
  assert.equal(many.b.endSentence,
    "The first Chartered cargo is home. Thirteen runs out, four cargoes banked, nine turned back and cost " +
    "nothing but the trip. " +
    "The record keeps what came home; the line past the basin is the next sitting's.");
  assert.doesNotMatch(many.b.endSentence, /never once called/);
  // The gap between runs out and cargoes banked is reconciled IN WORDS, not
  // left for the reader to subtract: runsTurnedBack is read, not dropped.
  assert.ok(many.b.endSentence.includes("nine turned back"),
    "the terminal must name the runs that turned back, not merely imply them");
});

test("kill: the clean register fires if and ONLY if every run the player sent came home", () => {
  let clean = 0;
  let paid = 0;
  sittings(0xC1EA, 400, 40, (b) => {
    if (!b.stopped) return;
    const said = b.endSentence;
    if (/never once called/.test(said)) {
      clean += 1;
      assert.equal(b.record.runsTurnedBack, 0, "the clean register fired over a turned-back run: " + said);
      assert.equal(b.record.runsOut, b.record.cargoesBanked, "clean means the counts agree: " + said);
      assert.equal(b.record.marksLost, 0);
    } else {
      paid += 1;
      assert.ok(b.record.runsTurnedBack > 0, "the paid register fired over a spotless record: " + said);
      assert.ok(said.includes(" turned back"), "the paid register must name the turned-back count: " + said);
      if (b.record.marksLost > 0) {
        assert.ok(said.includes(b.record.marksLost + " marks staked and lost"),
          "the paid register must name what was lost: " + said);
      } else {
        assert.ok(said.includes("cost nothing but the trip"), "a zero cost is named, not omitted: " + said);
      }
    }
  });
  assert.ok(clean > 0 && paid > 0, "both registers must be reachable — saw clean " + clean + ", paid " + paid);
});

test("kill: no register blames the weather — the board prints three agents and only one of them is weather", () => {
  // The Core Line's failure agent is the line itself, by the beat's own ruling
  // and by the board's own printed sentences. A terminal that said "lost to
  // the weather" would misread the record on two routes out of three. Struck
  // from BOTH registers, not one: striking it from the paid register alone
  // left it standing in the branch that fires precisely when the turn-backs
  // were free Core Line runs.
  const seen = new Set();
  sittings(0x77EA, 300, 40, (b) => {
    if (!b.stopped) return;
    seen.add(/never once called/.test(b.endSentence) ? "clean" : "paid");
    assert.doesNotMatch(b.endSentence, /weather/i, "the terminal named the weather: " + b.endSentence);
  });
  assert.equal(seen.size, 2, "both registers were exercised, and neither named the weather");
  // The per-run sentence still names weather, and only on the route whose own
  // tag is weather — that is the one place the agent is real.
  const basin = reach(CLOUD, 0);
  assert.ok(basin.b.commitSend(CLOUD));
  basin.ctl.next = 1;
  assert.ok(basin.b.commitMeet());
  assert.match(basin.b.runSentence, /^Weather over the basin\./);
  assert.doesNotMatch(walk("h-").b.runSentence, /weather/i, "the halt's agent is the line, not the weather");
  assert.doesNotMatch(walk("h+m-").b.runSentence, /weather/i, "and so is Mosswake's");
});

test("the ledger's counts stay in the sentence's register past twenty and past a hundred", () => {
  // The floor send is free, always lit and unlimited, so an ordinary sitting
  // runs past twenty. A count that fell back to a numeral would put "21 runs
  // out" beside "nineteen cargoes banked" inside one clause, and would start
  // the sentence with a digit, because cap() cannot capitalise a numeral.
  const past20 = makeBoard();
  for (let i = 0; i < 21; i++) walk("h+", past20);
  walk("h-", past20);
  walk("c+", past20);
  assert.deepEqual(past20.b.record, { runsOut: 23, cargoesBanked: 22, runsTurnedBack: 1, marksLost: 0 });
  assert.equal(past20.b.endSentence,
    "The first Chartered cargo is home. Twenty-three runs out, twenty-two cargoes banked, one turned back " +
    "and cost nothing but the trip. " +
    "The record keeps what came home; the line past the basin is the next sitting's.");
  // Past a hundred, still walked, still spelled.
  const past100 = makeBoard();
  for (let i = 0; i < 100; i++) walk("h+", past100);
  walk("c+", past100);
  assert.deepEqual(past100.b.record, { runsOut: 101, cargoesBanked: 101, runsTurnedBack: 0, marksLost: 0 });
  assert.match(past100.b.endSentence,
    /^The first Chartered cargo is home\. One hundred and one runs out, one hundred and one cargoes banked, /);
  // No digit reaches the counts clause in either sentence. Marks stay figures,
  // which is the beat's own convention.
  for (const said of [past20.b.endSentence, past100.b.endSentence]) {
    const counts = said.slice(0, said.indexOf("The record keeps") + 1 || said.indexOf(" The line past"));
    assert.doesNotMatch(counts, /\d/, "a bare numeral fell into the counts: " + counts);
  }
  // The speller has no ceiling to fall off: the only numeral fallback left in
  // the sim guards a non-integer, which no count can be.
  assert.match(SIT_SIM, /if \(!Number\.isInteger\(n\) \|\| n < 0\) return String\(n\);/,
    "the numeral fallback must guard only the impossible case");
  assert.equal((SIM_CODE.match(/String\(n\)/g) || []).length, 1, "and it is the only one");
  assert.match(SIT_SIM, /" million"/, "the speller carries every magnitude a sitting could reach");
});

test("the turned-back sentence names whoever actually rode, and claims no crew when none did", () => {
  // At roster 0 — which IS the opening, so this is the first turned-back
  // sentence a cold player can meet — the run carried no Wardens, and the
  // sentence must not promise a crew home that never left. The home sentence
  // already takes this care ("The train brought ... home"); the turned-back
  // one takes it now too, and has stopped using "crew" for two different sets
  // of people in one breath.
  const none = walk("h-");
  assert.match(none.b.runSentence, /the train is home, and the desk stands\.$/);
  assert.doesNotMatch(none.b.runSentence, /crew|Warden/i,
    "no crew rode, so the sentence names none: " + none.b.runSentence);
  const one = reach(HALT, 1);
  assert.ok(one.b.commitSend(HALT));
  one.ctl.next = 1;
  assert.ok(one.b.commitMeet());
  assert.match(one.b.runSentence, /the Warden and the train are home, and the desk stands\.$/);
  const some = reach(CLOUD, 2);
  assert.ok(some.b.commitSend(CLOUD));
  some.ctl.next = 1;
  assert.ok(some.b.commitMeet());
  assert.match(some.b.runSentence, /the Wardens and the train are home, and the desk stands\.$/);
  // Graded against the manifest across the whole table.
  for (const id of SENDABLE) {
    for (let w = 0; w <= 4; w++) {
      const h = reach(id, w);
      assert.ok(h.b.commitSend(id));
      h.ctl.next = 1;
      assert.ok(h.b.commitMeet());
      assert.equal(/Warden/.test(h.b.runSentence), w > 0,
        id + "/" + w + ": the sentence names a crew exactly when one rode");
    }
  }
});

test("kill: a turned-back summit run is deliberately NOT an ending — the stake dies and the desk stands", () => {
  const h = walk("h+c-");
  assert.equal(h.b.stopped, false, "the summit turned back is not the stop");
  assert.equal(h.b.endSentence, null, "and it gets no terminal sentence");
  assert.equal(h.b.marks, 6, "the 4-mark stake is gone");
  assert.equal(h.b.record.marksLost, 4);
  assert.ok(h.b.litSends().includes(HALT), "the halt is still lit");
  assert.match(h.b.runSentence, /the desk stands/);
  // And the sitting can still be finished afterwards.
  walk("h+c+", h);
  assert.equal(h.b.stopped, true);
});

test("kill: only the Chartered cargo stops the sitting — a home run on the Core Line never ends it", () => {
  for (const line of ["h+", "h+m+", "h+h+h+m+m+"]) {
    const h = walk(line);
    assert.equal(h.b.stopped, false, "\"" + line + "\" must not end the sitting");
    assert.equal(h.b.endSentence, null);
    assert.ok(h.b.litSends().length >= 1);
  }
  sittings(0x5709, 300, 30, (b) => {
    if (b.stopped) assert.ok(b.record.cargoesBanked >= 2, "the stop implies a banked Chartered cargo after a funded one");
    else assert.equal(b.endSentence, null, "no terminal sentence short of the stop");
  });
});

// ------------------------------------------------------- KILL: the numbers
// "3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 move without this beat moving."

test("kill: the beat's numbers are pinned — muster 3, cap 4, stakes 0 / 2 / 3+1, pays 10 / 14 / 18", () => {
  const b = makeBoard().b;
  assert.equal(b.musterPrice, 3);
  assert.equal(b.rosterCap, 4);
  const want = {
    "dawnspur-halt": { pays: 10, provisions: 0, toll: 0, stake: 0, name: "DAWNSPUR HALT", line: "Core Line" },
    "mosswake-loop": { pays: 14, provisions: 2, toll: 0, stake: 2, name: "MOSSWAKE LOOP", line: "Core Line" },
    "cloud-basin-span": { pays: 18, provisions: 3, toll: 1, stake: 4, name: "CLOUD BASIN SPAN", line: "Chartered Line" },
  };
  for (const [id, w] of Object.entries(want)) {
    const c = cardFor(b, id);
    assert.equal(c.pays, w.pays, id + " pay moved");
    assert.equal(c.provisions, w.provisions, id + " provisions moved");
    assert.equal(c.toll, w.toll, id + " toll moved");
    assert.equal(c.stake, w.stake, id + " stake moved");
    assert.equal(c.name, w.name);
    assert.equal(c.line, w.line);
  }
  // The Core Line's toll is rate-only and rounds to zero at civic scale —
  // stated as a zero rather than silently dropped.
  assert.equal(cardFor(b, HALT).toll, 0);
  assert.equal(cardFor(b, MOSS).toll, 0);
});

test("the four cards are the beat's four, in the beat's order", () => {
  assert.deepEqual(makeBoard().b.cards().map((c) => c.id), [HALT, MOSS, CLOUD, RUST]);
  assert.deepEqual(SIT_HTML.match(/data-route="[a-z-]+"/g), [
    'data-route="dawnspur-halt"', 'data-route="mosswake-loop"',
    'data-route="cloud-basin-span"', 'data-route="rustfall-yard"',
  ]);
});

test("the accessible name is re-labelled per state — the away card, and Rustfall's one line", () => {
  // aria-label overrides content, so a label that never changes is a label
  // that lies. It used to key on c.sendable alone: the away card went on
  // announcing a pay and a stake it no longer offered, and Rustfall's label
  // hid from assistive tech the one line the beat requires that card to carry
  // — the only card whose entire content IS that line. House precedent for
  // re-labelling per state: public/dawnspur-scale/index.html:226.
  assert.match(SIT_HTML, /el\.setAttribute\("aria-label", c\.name \+ "\. No send, no odds\. " \+ c\.note\);/,
    "the dark card's accessible name carries its own line, verbatim");
  assert.match(SIT_HTML, /el\.setAttribute\("aria-label", c\.name \+ ", out\. " \+ c\.manifestLine \+ " " \+ c\.percent \+ " percent home\."\);/,
    "the away card's accessible name is the manifest and the quote it left on");
  assert.match(SIT_HTML, /c\.name \+ ", pays " \+ c\.pays \+ ", stake " \+ c\.stake \+ ", " \+ c\.percent \+ " percent home"/,
    "and a sendable card at home still announces its four reads");
  // Pinned as condition-AND-body: the card's CONTENT also branches on c.out,
  // so a looser match here would go on passing while the label branch was
  // disarmed. Two c.out branches exist and both must be real.
  assert.match(SIT_HTML,
    /\} else if \(c\.out\) \{\s*\n\s*el\.setAttribute\("aria-label", c\.name \+ ", out\. "/,
    "the away label's own branch must test c.out, not something that is always false");
  assert.equal((SIT_HTML.match(/\} else if \(c\.out\) \{/g) || []).length, 2,
    "the away state branches exactly twice: once for what the card shows, once for what it announces");
  // Each branch has something real to say in every state it fires in.
  const b = makeBoard().b;
  const rust = b.cards().find((c) => !c.sendable);
  assert.ok(rust.note.length > 40, "the dark branch has a real line to speak");
  const away = walk("h+WWm").b;
  const out = away.cards().find((c) => c.out);
  assert.ok(out && out.manifestLine && out.percent, "the away branch has a manifest and a percent to speak");
  assert.equal(out.pays, 14, "the pay it would have announced under the old label is no longer what it offers");
  for (const c of b.cards()) assert.equal(!c.sendable || !c.out, true, "the three branches stay exclusive");
});

test("kill: a card's content can never escape its box — the cards yield last, the scenery yields first", () => {
  // MEASURED in a browser, 2026-08-26, before and after. BEFORE: button.card
  // computed overflow:visible and #told was flex-shrink:0, so the sentence
  // panels took height from the only shrinkable region without limit — at
  // 375x556 with the terminal showing, cards fell to 34.7px and their text
  // painted 4.1 / 4.1 / 4.1 / 8.7px BELOW the card box, and the Rustfall line
  // was already 3.3px out with a single panel up. AFTER: spill is -6px at
  // every viewport probed from 280x480 to 412x732, clipping is 0, and card
  // height is a stable 55 / 55 / 55 / 64.
  //
  // What is asserted here is the PRIORITY, not those sizes, because the
  // priority is what makes the escape impossible at any size: the scenery
  // yields first, the sentence panels yield next and scroll inside a cap, and
  // the cards never shrink below their own content at all.
  const css = SIT_HTML.slice(0, SIT_HTML.indexOf("</style>"));
  const rule = (sel) => {
    const esc = sel.split("").map((ch) => (ch === "." || ch === "#" ? "\\" + ch : ch)).join("");
    const m = css.match(new RegExp(esc + "\\s*\\{([^}]*)\\}"));
    assert.ok(m, "CSS rule not found: " + sel);
    return m[1];
  };
  const card = rule("button.card");
  assert.match(card, /overflow:\s*hidden/, "a card's content must not be able to paint outside the card");
  assert.match(card, /flex:\s*0 0 auto/, "a card must not shrink");
  assert.match(card, /min-height:\s*52px/, "and it keeps a floor even so");
  const cards = rule("#cards");
  assert.match(cards, /overflow-y:\s*auto/, "the card region scrolls rather than crushing its cards");
  assert.match(cards, /min-height:\s*0/);
  const told = rule("#told");
  assert.match(told, /flex:\s*0 1 auto/, "the sentence panels yield before the cards do");
  assert.match(told, /max-height:\s*46%/, "and can never take more than their share");
  assert.match(told, /overflow-y:\s*auto/, "they scroll inside that share");
  assert.doesNotMatch(told, /flex-shrink:\s*0/, "the old mechanism: panels that could not yield");
  const town = rule("#town");
  assert.match(town, /flex:\s*0 1 auto/, "the scenery yields first of all");
  assert.match(town, /min-height:\s*26px/);
  assert.match(rule("#strip"), /overflow:\s*hidden/, "and the strip still clips the board itself");
});

function spin120ms() {
  const end = Date.now() + 120;
  // A real, blocking 120ms of wall time. If anything on this board moved with
  // the clock, this is where it would move.
  while (Date.now() < end) { /* spin */ }
}

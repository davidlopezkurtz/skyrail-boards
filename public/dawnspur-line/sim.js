"use strict";

// SKYRAIL Reclamation — CFD-203, the join sitting.
// Spec: docs/cfd-203-beat.md (SIGNED — David, 2026-08-27, by delegation:
// "sign the beat when the check comes back"), under canon section 7 — a
// sitting now INHERITS what has passed and adds one new thing. This is the
// first such board.
//
// INHERITED WHOLE, cited to the beats that passed them:
//   the desk    — /dawnspur-dispatch/ (CFD-196 + Amendments 1 and 2): SEND,
//                 MUSTER, MEET, the three routes and Rustfall dark, honest
//                 dice stamped at the send, the charter condition, the muster
//                 slider with its armed re-quote and both fences, the opening
//                 float of 3, failure pays zero, nothing refunds, the crew
//                 always comes home, the free halt always lit.
//   the terrace — /dawnspur-scale/ (CFD-183): the greenhouse 1..4, UP at
//                 3 / 4 / 5 instant with no way back, the reserve 4 down to 0
//                 floored, drawn one step per carry, paying FULL at every
//                 reserve including bare and giving no sign.
//
// THE ONE NEW SYSTEM IS THE JOIN: a send's provisions come off the terrace.
// Provisions 0 / 2 / 3 do not move; only their unit does, from marks to food.
// The Chartered toll stays 1 and stays MARKS, because a toll is a civic fee
// and R1 names it as one. Not one figure moves.
//
// TWO INHERITED VERBS ARE CUT, both RULED by David 2026-08-27, both for the
// same reason — the join changed what they were for:
//   MOSSWAKE +3 — the join put a ROUTE of that name on this board, so the verb
//                 was redundant. "Cutting redundant is cheaper than renaming
//                 colliding." Its precondition is the two-vehicle claim, which
//                 this file honours: no terrace verb goes dark while a line run
//                 is away.
//   TEND        — the join gave its job to the food line, and its reckoning is
//                 weather, which deferred to the storm sitting. It measured
//                 DOMINATED, not merely inert: TEND-then-CARRY lands identical
//                 stores to CARRY alone, one mark poorer and one turn slower,
//                 and the ground step it buys is read by no rule on this board.
//                 It returns on the storm board with its real job. It appears
//                 nowhere in this file, as a verb, a field or a path.
//
// WHY CARRY CANNOT PAY MARKS — forced by conservation, not chosen. With CARRY
// paying marks and provisions drawn off the ground, TEND-then-CARRY mints
// (level - 1) marks per two turns with the ground unchanged and no ceiling.
// So the terrace pays goods and the line pays money: CARRY yields FOOD.
//
// FOOD IS NOT A CURRENCY, and every clause is a Kill line this file honours:
// food buys exactly one thing (the provisions leg of a send); there is no
// exchange in either direction; food has one source, the carry; food is never
// a HUD figure; food never pays a toll, a muster or an UP. R1 is satisfied
// literally — marks and food never share a sink.

const BASE = 0.76;
const POINT = 0.012;
const WARDEN_GUARD = 3;
const CLAMP_LO = 0.12;
const CLAMP_HI = 0.96;

const MUSTER_PRICE = 3;
const ROSTER_CAP = 4;

// The float, inherited from CFD-196 Amendment 1 — but its ARGUMENT is
// re-derived rather than inherited on faith. Amendment 1 sized it as "a Warden
// (3) or a Mosswake send (2), never both", and Mosswake now costs 0 marks, so
// that test selects nothing here. The new derivation is this board's own:
// MUSTER and UP both cost 3, so 3 is the smallest opening at which the first
// frame contains a paid choice at all, and the exclusivity survives for a new
// reason — both purchases cost exactly the float, so it buys one and never
// two. It breaks at 6, where it buys both.
const OPENING_MARKS = 3;

// Opening stores of 0, and this is what buys back the reachability claim.
// Opening at 2 would light Mosswake in frame one, but `reserve 4` with
// `stores > 0` is NOT reachable by play — every carry draws a step — so a
// minted opening store would put the board off its own lattice. At 0 every
// state is reachable, and the cost is one inherited Kill line re-expressed.
const OPENING_STORES = 0;

const UP_PRICE = { 1: 3, 2: 4, 3: 5 };
const MAX_LEVEL = 4;
const RESERVE_FULL = 4;

const CHARTER_CONDITION = "The charter opens with the first cargo banked.";

const TOWN = Object.freeze({ hearth: "held", bank: "in the stone" });

const ROUTES = [
  {
    id: "dawnspur-halt", name: "DAWNSPUR HALT", line: "Core Line",
    short: "Dawnspur Halt", cargo: "the Dawnspur Halt cargo",
    baseRisk: 0.08, pays: 10, provisions: 0, toll: 0,
    chartered: false, sendable: true,
    agent: "A shear in the near line short of the halt.", note: null,
  },
  {
    id: "mosswake-loop", name: "MOSSWAKE LOOP", line: "Core Line",
    short: "Mosswake", cargo: "the Mosswake cargo",
    baseRisk: 0.12, pays: 14, provisions: 2, toll: 0,
    chartered: false, sendable: true,
    agent: "Wet rail through the Mosswake loop.", note: null,
  },
  {
    id: "cloud-basin-span", name: "CLOUD BASIN SPAN", line: "Chartered Line",
    short: "Cloud Basin", cargo: "the Cloud Basin cargo",
    baseRisk: 0.25, pays: 18, provisions: 3, toll: 1,
    chartered: true, sendable: true,
    agent: "Weather over the basin.", note: null,
  },
  {
    id: "rustfall-yard", name: "RUSTFALL YARD", line: "Chartered Line",
    short: "Rustfall", cargo: null,
    baseRisk: null, pays: null, provisions: null, toll: null,
    chartered: true, sendable: false,
    agent: null,
    note: "Raiders hold the yard road. This one is not the desk's dice; it waits for the convoy defense.",
  },
];

const BY_ID = {};
for (const r of ROUTES) BY_ID[r.id] = r;

// The stores cap is DERIVED, not chosen, and the beat's first draft got this
// wrong by picking 4 on a mirror-anchor that read well and was arithmetically
// false. A carry strands whenever `cap - stores < level`. The player carries
// only when `stores < provisions`, so the largest store before a carry is
// `maxProvisions - 1`, and a carry never strands iff
// `cap >= maxProvisions + maxLevel - 1`. At 4 or 5 the ladder's top rung buys
// NOTHING on the only route that fires the ending — cap 4 and cap 5 are the
// same board — and 6 is the first cap at which the ladder has four rungs.
const MAX_PROVISIONS = ROUTES.reduce(
  (m, r) => (r.sendable && r.provisions > m ? r.provisions : m), 0);
const STORES_CAP = MAX_PROVISIONS + MAX_LEVEL - 1;

const ARM_SENTENCE = "The terrace is topped. The next Chartered cargo home ends the sitting.";
const GROUND_DRAWN = "The ground is drawn and standing. Nothing on this desk puts it back — " +
  "that is the next sitting's business.";
const GROUND_BARE = "The ground is bare. Nothing on this desk puts it back, and what the line ate " +
  "came out of a bank this sitting cannot refill. That is the next sitting's business.";

// The ledger's register spells its counts at any magnitude, because the free
// floor send is unlimited and a table that stopped at twenty would drop a bare
// numeral into a clause of spelled words. Marks stay figures, which is the
// beat's own convention; FOOD is a count of goods and is spelled like runs and
// cargoes — the one inconsistency in the beat's own example sentence, which
// writes the same noun both ways in consecutive clauses, resolved rather than
// reproduced.
const ONES = [
  "no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function tally(n) {
  if (!Number.isInteger(n) || n < 0) return String(n);
  if (n < 20) return ONES[n];
  if (n < 100) {
    const t = TENS[Math.floor(n / 10)];
    const u = n % 10;
    return u === 0 ? t : t + "-" + ONES[u];
  }
  if (n < 1000) {
    const h = ONES[Math.floor(n / 100)] + " hundred";
    const r = n % 100;
    return r === 0 ? h : h + " and " + tally(r);
  }
  if (n < 1000000) {
    const th = tally(Math.floor(n / 1000)) + " thousand";
    const r = n % 1000;
    return r === 0 ? th : th + (r < 100 ? " and " : " ") + tally(r);
  }
  const m = tally(Math.floor(n / 1000000)) + " million";
  const r = n % 1000000;
  return r === 0 ? m : m + (r < 100 ? " and " : " ") + tally(r);
}
// A marks figure agrees with its own noun. Inherited defect, found in the
// running board: the terminal read "1 marks lost on the way", and the parent
// dispatch board has carried the same disagreement in its HUD since it shipped.
function marksPhrase(n) {
  return n + (n === 1 ? " mark" : " marks");
}
function cap(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

// The one instrument, inherited unmoved from CFD-196: the engine's own
// calculateDispatchPreview with every refused term at zero. Every quote and
// every roll comes through here, and the board never computes a percent.
function chanceFor(baseRisk, wardens) {
  const crewBonus = Math.min(0.3, wardens * WARDEN_GUARD * POINT);
  return clamp(BASE - baseRisk + crewBonus, CLAMP_LO, CLAMP_HI);
}
function percentOf(chance) {
  return Math.round(chance * 100);
}

function crewClause(wardens) {
  if (wardens === 0) return "No Wardens ride";
  if (wardens === 1) return "1 Warden rides";
  return wardens + " Wardens ride";
}
// The manifest itemizes something real for the first time on any board: the
// crop the player grew, carried down and loaded.
function stakeClause(route) {
  if (route.provisions === 0 && route.toll === 0) return "with nothing staked";
  if (route.toll === 0) return "with " + tally(route.provisions) + " from the terrace";
  return "with " + tally(route.provisions) + " from the terrace and the Chartered toll paid";
}
function manifestSentence(route, wardens) {
  return crewClause(wardens) + " " + stakeClause(route) + ".";
}

function homeSentence(route, wardens, pays) {
  const who = wardens === 0 ? "The train" : wardens === 1 ? "The Warden" : "The Wardens";
  return who + " brought " + route.cargo + " home. The desk banks " + pays + ".";
}
// All four inherited clauses on a turned-back run — zero pay, stake spent and
// returned in no direction, everyone who actually rode is home, the desk
// stands — with the stake's provenance added: what died is now the crop.
function turnedBackSentence(route, wardens) {
  let spent;
  if (route.provisions === 0 && route.toll === 0) {
    spent = "The free hop staked nothing and nothing comes back;";
  } else if (route.toll === 0) {
    spent = cap(tally(route.provisions)) + " from the terrace and nothing comes back;";
  } else {
    spent = cap(tally(route.provisions)) +
      " from the terrace and the Chartered toll, and nothing comes back;";
  }
  const back = wardens === 0 ? "the train is home"
    : wardens === 1 ? "the Warden and the train are home"
    : "the Wardens and the train are home";
  return route.agent + " The train turned for home with the haul unbanked. " + spent +
    " the route paid nothing; " + back + ", and the desk stands.";
}

// The terminal reads three things: the record, what the terrace sent, and the
// ground. TWO ground registers, both reachable — a `full` register was cut
// because it cannot fire: the stop needs a Chartered outfit of 3 food, the only
// source of food is CARRY, and every CARRY draws a step, so carries >= 1 at
// every stop and the reserve is at most 3 when the sitting ends.
//
// The loss clause carries BOTH counters and names a zero rather than omitting
// it. This is CFD-196's own sent-back defect, re-opened by the join in a new
// currency: Mosswake's toll is 0, so three turned-back Mosswake runs lose six
// food and no marks, and a clause keyed on marks alone would close the sitting
// with "cost nothing but the trip" over six dead food.
function ledgerSentence(rec, reserve) {
  const head = "The Chartered cargo is home and the terrace is topped. " +
    cap(tally(rec.runsOut)) + " runs out, " + tally(rec.cargoesBanked) + " cargoes banked, ";
  let cost;
  if (rec.runsTurnedBack === 0) {
    cost = "and the stake was never once called.";
  } else if (rec.foodLost === 0 && rec.marksLost === 0) {
    cost = tally(rec.runsTurnedBack) + " turned back and cost nothing but the trip.";
  } else {
    const food = rec.foodLost === 0
      ? "nothing from the terrace"
      : tally(rec.foodLost) + " from the terrace";
    const marks = rec.marksLost === 0 ? "no marks" : marksPhrase(rec.marksLost);
    cost = tally(rec.runsTurnedBack) + " turned back, " + food + " and " + marks + " lost on the way.";
  }
  const sent = cap(tally(rec.foodSent)) + " from the terrace went out on the line.";
  const ground = reserve === 0 ? GROUND_BARE : GROUND_DRAWN;
  return head + cost + " " + sent + " " + ground +
    " The record keeps what came home; the line past the basin is the next sitting's.";
}

function make(s) {
  // The reserve is DERIVED, not stored. CARRY is its only writer and the
  // terminal its only reader, so deriving it makes "written by anything but a
  // carry" impossible by construction rather than by discipline.
  //
  // ONE-WAY ON THIS SITTING, BECAUSE TEND IS ABSENT FROM IT. That cause is
  // stated beside the fact every time the fact is stated, because written flat
  // the sentence reads as permanent and hands the storm board a false premise.
  // When TEND returns on the storm sitting the reserve is two-way again and the
  // ground is a real economy.
  function reserve() {
    return Math.max(0, RESERVE_FULL - s.carries);
  }
  function topped() {
    return s.level >= MAX_LEVEL;
  }
  function chartered() {
    return s.cargoesBanked > 0;
  }
  function carryLoad() {
    return Math.min(s.level, STORES_CAP - s.stores);
  }
  // The terrace is worked by a second vehicle — the shuttle off A — and the
  // line train works the routes. So no terrace verb reads `away`: while a run
  // is out, CARRY and UP stand beside MEET. David's MOSSWAKE cut is CONDITIONAL
  // on this, so it is load-bearing rather than decorative.
  function canCarry() {
    return !s.stopped && s.stores < STORES_CAP;
  }
  function canUp() {
    return !s.stopped && !topped() && s.marks >= UP_PRICE[s.level];
  }
  function musterReach() {
    if (s.stopped || s.away !== null) return 0;
    return Math.min(ROSTER_CAP - s.roster, Math.floor(s.marks / MUSTER_PRICE));
  }
  function canMuster() {
    return musterReach() >= 1;
  }
  function canSend(routeId) {
    const r = BY_ID[routeId];
    if (!r || !r.sendable) return false;
    if (s.stopped || s.away !== null) return false;
    if (r.chartered && !chartered()) return false;
    return s.stores >= r.provisions && s.marks >= r.toll;
  }
  function canMeet() {
    return s.away !== null;
  }
  function litSends() {
    return ROUTES.filter((r) => canSend(r.id)).map((r) => r.id);
  }
  // Every live control on the board, desk and terrace together. The away state
  // is in here too: nothing on this board requires a send to be lit while a run
  // is out, so MEET can legitimately be the only desk verb — and the terrace's
  // two stand beside it, which is what the MOSSWAKE cut rests on.
  function litJobs() {
    const out = litSends();
    if (canCarry()) out.push("carry");
    if (canUp()) out.push("up");
    if (canMuster()) out.push("muster");
    if (canMeet()) out.push("meet");
    return out;
  }
  // Why a send is dark, in the board's words, naming BOTH halves when both are
  // short — Cloud Basin at the opening is dark twice over.
  function conditionFor(r) {
    if (!r.sendable || canSend(r.id)) return null;
    const why = [];
    if (r.chartered && !chartered()) why.push(CHARTER_CONDITION);
    if (s.stores < r.provisions) {
      why.push("The stores hold " + s.stores + ". " + r.short + " wants " + r.provisions + ".");
    }
    if (s.marks < r.toll) why.push("The toll wants " + marksPhrase(r.toll) + ".");
    return why.length === 0 ? null : why.join(" ");
  }
  function cards(atRoster) {
    const asked = Number.isInteger(atRoster)
      ? Math.min(ROSTER_CAP, Math.max(0, atRoster))
      : null;
    const provisional = asked !== null && asked !== s.roster;
    const quoteRoster = provisional ? asked : s.roster;
    return ROUTES.map((r) => {
      if (!r.sendable) {
        return {
          id: r.id, name: r.name, line: r.line, sendable: false, lit: false, out: false,
          pays: null, provisions: null, toll: null, chance: null, percent: null,
          note: r.note, condition: null, provisional: false, manifestLine: null,
        };
      }
      const riding = s.away !== null && s.away.routeId === r.id;
      const chance = riding ? s.away.chance : chanceFor(r.baseRisk, quoteRoster);
      return {
        id: r.id, name: r.name, line: r.line, sendable: true, lit: canSend(r.id), out: riding,
        pays: r.pays, provisions: r.provisions, toll: r.toll,
        chance: chance, percent: percentOf(chance),
        note: null,
        condition: conditionFor(r),
        provisional: provisional && !riding,
        manifestLine: riding ? manifestSentence(r, s.away.wardens) : null,
      };
    });
  }
  // CARRY brings food DOWN to the stores instead of marks UP to the wallet. It
  // lands the greenhouse's level capped by what the stores can still hold, and
  // it draws the ground exactly one step. The carry pays FULL at every reserve,
  // bare included, and gives no sign — inherited from CFD-183 and deliberately
  // untouched, because Geology's "rides fine ... in clear weather ... gives no
  // sign" is the sentence CFD-183's kill cites and this board is entirely clear
  // weather.
  function commitCarry() {
    if (!canCarry()) return false;
    s.stores += carryLoad();
    s.carries += 1;
    return true;
  }
  function commitUp() {
    if (!canUp()) return false;
    s.marks -= UP_PRICE[s.level];
    s.level += 1;
    // Topping ARMS the ending and says so out loud, so the arming is never
    // silent. The Chartered cargo is what fires it.
    if (topped()) s.sentence = ARM_SENTENCE;
    return true;
  }
  function commitMuster(count) {
    const n = count === undefined ? 1 : count;
    if (!Number.isInteger(n) || n < 1) return false;
    if (n > musterReach()) return false;
    s.marks -= MUSTER_PRICE * n;
    s.roster += n;
    return true;
  }
  // The provisions come out of the STORES and the toll out of the WALLET. Two
  // sinks, never one, which is R1 honoured literally.
  function commitSend(routeId) {
    if (!canSend(routeId)) return false;
    const r = BY_ID[routeId];
    s.stores -= r.provisions;
    s.marks -= r.toll;
    s.foodSent += r.provisions;
    s.away = {
      routeId: r.id,
      wardens: s.roster,
      provisions: r.provisions,
      toll: r.toll,
      chance: chanceFor(r.baseRisk, s.roster),
    };
    s.runsOut += 1;
    s.sentence = null;
    return true;
  }
  function commitMeet() {
    if (!canMeet()) return false;
    const run = s.away;
    const r = BY_ID[run.routeId];
    const draw = s.roll();
    const home = draw < run.chance;
    s.away = null;
    if (home) {
      s.marks += r.pays;
      s.cargoesBanked += 1;
      s.sentence = homeSentence(r, run.wardens, r.pays);
      // Topping ARMS; a Chartered cargo FIRES. A Chartered cargo banked before
      // the terrace is topped is a good run and nothing more.
      if (r.chartered && topped()) s.stopped = true;
    } else {
      s.runsTurnedBack += 1;
      s.foodLost += run.provisions;
      s.marksLost += run.toll;
      s.sentence = turnedBackSentence(r, run.wardens);
    }
    return true;
  }
  function wait() {
    // The calm, inherited from both parents. It takes nothing on either half —
    // the ground never falls, the food never spoils, the away run never sours —
    // and returns false so no caller can read the calm as a handled event.
    return false;
  }
  function record() {
    return {
      runsOut: s.runsOut,
      cargoesBanked: s.cargoesBanked,
      runsTurnedBack: s.runsTurnedBack,
      marksLost: s.marksLost,
      foodLost: s.foodLost,
      foodSent: s.foodSent,
      carries: s.carries,
    };
  }
  return {
    get marks() { return s.marks; },
    get roster() { return s.roster; },
    get rosterCap() { return ROSTER_CAP; },
    get musterPrice() { return MUSTER_PRICE; },
    get musterReach() { return musterReach(); },
    get level() { return s.level; },
    get maxLevel() { return MAX_LEVEL; },
    get upPrice() { return topped() ? null : UP_PRICE[s.level]; },
    get reserve() { return reserve(); },
    get reserveFull() { return RESERVE_FULL; },
    get stores() { return s.stores; },
    get storesCap() { return STORES_CAP; },
    get carryYield() { return canCarry() ? carryLoad() : null; },
    get away() { return s.away !== null; },
    get armed() { return topped(); },
    get stopped() { return s.stopped; },
    get town() { return TOWN; },
    get manifest() {
      if (s.away === null) return null;
      const r = BY_ID[s.away.routeId];
      return {
        routeId: r.id, name: r.name, wardens: s.away.wardens,
        provisions: s.away.provisions, toll: s.away.toll,
        chance: s.away.chance, percent: percentOf(s.away.chance),
      };
    },
    get manifestLine() {
      if (s.away === null) return null;
      return manifestSentence(BY_ID[s.away.routeId], s.away.wardens);
    },
    get runSentence() { return s.sentence; },
    get endSentence() { return s.stopped ? ledgerSentence(record(), reserve()) : null; },
    get record() { return record(); },
    cards,
    litSends,
    litJobs,
    canSend,
    canMeet,
    canMuster,
    canCarry,
    canUp,
    commitSend,
    commitMeet,
    commitMuster,
    commitCarry,
    commitUp,
    wait,
  };
}

function createBoard(opts) {
  const o = opts || {};
  // The opening, and the only state this file mints: marks 3, greenhouse level
  // 1, reserve full, stores EMPTY, roster 0, train home, nothing banked, the
  // ending not armed. Lit: the free halt, CARRY, UP and MUSTER — four controls,
  // two of them free, and the float buys a Warden OR the first level and never
  // both. The spine is dark and says why, which is the new system visible in
  // frame one: the stores hold nothing and Mosswake wants two.
  //
  // opts.marks and opts.stores are FOR THE SUITE. Nothing a player can reach
  // sets either: this file reads no query string, no storage and no control,
  // and the board hands in nothing.
  const marks = Number.isInteger(o.marks) && o.marks >= 0 ? o.marks : OPENING_MARKS;
  const stores = Number.isInteger(o.stores) && o.stores >= 0 && o.stores <= STORES_CAP
    ? o.stores : OPENING_STORES;
  return make({
    marks: marks,
    stores: stores,
    roster: 0,
    level: 1,
    carries: 0,
    away: null,
    stopped: false,
    sentence: null,
    runsOut: 0,
    cargoesBanked: 0,
    runsTurnedBack: 0,
    marksLost: 0,
    foodLost: 0,
    foodSent: 0,
    roll: typeof o.roll === "function" ? o.roll : Math.random,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.DawnspurLine = api;

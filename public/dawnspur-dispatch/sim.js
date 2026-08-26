"use strict";

// SKYRAIL Reclamation — CFD-196 dispatch sitting.
// Spec: docs/cfd-196-beat.md (SIGNED — David, 2026-08-26: "signed — go, and
// rule the seam my way"), under docs/mechanisms-recommitted.md §6's canon-check
// discipline; §5 is RULED not to bind this loop, in the beat.
//
// The desk opens on the near lines. Pick a route, muster the crew, SEND — and
// the train comes home paid, or it comes home empty. Three routes take a send;
// Rustfall Yard is on the map, carries no odds, and refuses one, because by
// David's ruling contested territory is not a dice question and the desk will
// not quote a number it cannot honestly roll.
//
// PROVENANCE, kept next to the number it produces. The odds are the PWA
// engine's own, at skyrail commit ea22c43, calculateDispatchPreview in
// src/engine.js:
//
//   successChance = clamp(0.76 - routeRisk - damagePenalty + crewBonus
//                         + heroBonus + posture.success + event.successBias
//                         + insuranceBonus, 0.12, 0.96)
//   crewBonus     = min(0.3, preferredPower * 0.012)
//   routeRisk     = clamp(route.baseRisk - routeState.safety, 0.01, 0.9)
//
// Every term this board refuses is zero BY the refusal, so the card's stated
// number is the whole truth: route safety 0 (patrol is off this board, so the
// inner clamp is a no-op at 0.08 / 0.12 / 0.25 and routeRisk is baseRisk),
// train damage 0 (no repair loop), heroBonus 0 (no Hero Lodge), the balanced
// posture's own success term 0 (DISPATCH_POSTURES, src/content.js), route
// event bias 0 (the engine's fifteen ROUTE_EVENTS stay out), insurance 0.
// What is left is what this file computes:
//
//   success = clamp(0.76 - baseRisk + 0.036 * wardens, 0.12, 0.96)
//
// with 0.036 = the Rail Wardens' guard 3 (crewTypes[wardens].power.guard)
// times the engine's 0.012 a point, because the convoy mission prefers guard
// (missions[convoy].preferred). ONE instrument: the percent the card states
// and the threshold the meet rolls against are both chanceFor(), and the
// percent is that same number rounded for display, never a second copy.
//
// Pays 10 / 14 / 18 are the routes' full reward baskets converted at the
// pack's own exchange table (economyConfig.resourceValues: food 1,
// materials 2, energy 2, parts 4) — 66 / 94 / 114 mark-equivalents over the
// one authored number, the civic scale factor 6.5. MUSTER 3 is the Wardens'
// baseCost (food 8 + materials 5 = 18) over that same 6.5. The Chartered
// toll of 1 is routeTolls.chartered.flatFee verbatim; the Core Line's toll is
// rate-only and rounds to zero at this scale, so it is 0 here and said so.
// Provisions 0 / 2 / 3 and the roster cap of 4 are new-play, argued in the
// beat's numbers section, flagged rather than dressed as citations.
//
// The crew is never the stake. The engine returns it home on BOTH branches
// (addCrew on the success leg and the failure leg of resolveDispatch), and
// this board keeps that law: no outcome anywhere in this file touches the
// roster. The stake is the haul committed to the run — provisions and toll,
// spent at the click, refunded in no direction, ever.
//
// Nothing moves with wall time. There is no clock in this file and no clock
// on the board: the run is out exactly as long as the player leaves it out,
// and it never sours. wait() stands, takes nothing, and returns false so a
// caller can never mistake the calm for a handled event. The dice are thrown
// at the MEET, once, against the number the card already stated.

const BASE = 0.76;
const POINT = 0.012;
const WARDEN_GUARD = 3;
const CLAMP_LO = 0.12;
const CLAMP_HI = 0.96;

const MUSTER_PRICE = 3;
const ROSTER_CAP = 4;

const TOWN = Object.freeze({ hearth: "held", bank: "in the stone", greenhouse: "stands" });

// The near lines. Rustfall carries NO risk figure at all: there is nothing
// here to quote, which is stronger than quoting it and hiding it.
const ROUTES = [
  {
    id: "dawnspur-halt",
    name: "DAWNSPUR HALT",
    line: "Core Line",
    short: "Dawnspur Halt",
    cargo: "the Dawnspur Halt cargo",
    baseRisk: 0.08,
    pays: 10,
    provisions: 0,
    toll: 0,
    chartered: false,
    sendable: true,
    agent: "A shear in the near line short of the halt.",
    note: null,
  },
  {
    id: "mosswake-loop",
    name: "MOSSWAKE LOOP",
    line: "Core Line",
    short: "Mosswake",
    cargo: "the Mosswake cargo",
    baseRisk: 0.12,
    pays: 14,
    provisions: 2,
    toll: 0,
    chartered: false,
    sendable: true,
    agent: "Wet rail through the Mosswake loop.",
    note: null,
  },
  {
    id: "cloud-basin-span",
    name: "CLOUD BASIN SPAN",
    line: "Chartered Line",
    short: "Cloud Basin",
    cargo: "the Cloud Basin cargo",
    baseRisk: 0.25,
    pays: 18,
    provisions: 3,
    toll: 1,
    chartered: true,
    sendable: true,
    agent: "Weather over the basin.",
    note: null,
  },
  {
    id: "rustfall-yard",
    name: "RUSTFALL YARD",
    line: "Chartered Line",
    short: "Rustfall",
    cargo: null,
    baseRisk: null,
    pays: null,
    provisions: null,
    toll: null,
    chartered: true,
    sendable: false,
    agent: null,
    note: "Raiders hold the yard road. This one is not the desk's dice; it waits for the convoy defense.",
  },
];

const BY_ID = {};
for (const r of ROUTES) BY_ID[r.id] = r;

// The ledger's register spells its counts. It spells ALL of them: the floor
// send is free, always lit and unlimited, so "runs out" has no small ceiling,
// and a table that stopped at twenty would drop a bare numeral into a clause
// of spelled words the moment an ordinary sitting ran long. Marks stay
// figures, which is the beat's own convention ("4 marks").
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
function cap(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

// The one instrument. Every quote and every roll comes through here.
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
function stakeClause(route) {
  if (route.provisions === 0 && route.toll === 0) return "with nothing staked";
  if (route.toll === 0) return "with the " + route.short + " provisions";
  return "with the " + route.short + " provisions and the Chartered toll paid";
}
function manifestSentence(route, wardens) {
  return crewClause(wardens) + " " + stakeClause(route) + ".";
}

function homeSentence(route, wardens, pays) {
  const who = wardens === 0 ? "The train" : wardens === 1 ? "The Warden" : "The Wardens";
  return who + " brought " + route.cargo + " home. The desk banks " + pays + ".";
}
// The four clauses the beat requires of every turned-back run: the stake is
// spent and comes back in no direction, the route paid zero, everyone who
// rode is home, the desk stands.
//
// The middle clause used to open "The crew turned the train for home", which
// made "crew" mean the train's operating hands there and the Wardens three
// clauses later — and at roster 0, which is the OPENING and so the first
// turned-back sentence a cold player can meet, it promised a crew home that
// never rode. The train turns for home; the return clause names whoever was
// actually aboard, the same care the home sentence already takes.
function turnedBackSentence(route, stake, wardens) {
  let spent;
  if (stake === 0) spent = "The free hop staked nothing and nothing comes back;";
  else if (route.toll === 0) spent = "The provisions are spent — " + stake + " marks — and nothing comes back;";
  else spent = "The provisions and the Chartered toll are spent — " + stake + " marks — and nothing comes back;";
  const back = wardens === 0 ? "the train is home"
    : wardens === 1 ? "the Warden and the train are home"
    : "the Wardens and the train are home";
  return route.agent + " The train turned for home with the haul unbanked. " + spent +
    " the route paid nothing; " + back + ", and the desk stands.";
}
// The terminal reads the record, in the beat's two registers, keyed on
// whether every run the player sent came home. That key is the beat's own
// clean example — "Five runs out, five cargoes banked" is runsOut ===
// cargoesBanked, which is exactly runsTurnedBack === 0.
//
// It is NOT keyed on marksLost. Keying on cost let a sitting with any number
// of turned-back FREE halt runs print "Clean record": thirteen out, four
// banked, nine turned back, and the last sentence of the sitting called it
// clean and blamed a weather that never touched it. The record's three
// shapes — nothing turned back; turn-backs that cost nothing; turn-backs that
// cost marks — are still two registers, because the sentence only ever has
// two things to say: every run came home, or some did not and here is how
// many and what they cost. Naming a zero cost is the paid register reading a
// zero, exactly as the turned-back sentence above already reads one on the
// free hop. runsTurnedBack is read here; it used to be computed and dropped,
// which is what let the gap between runs out and cargoes banked go unsaid.
//
// Neither register names the weather. The board prints three failure agents
// and only Cloud Basin's is weather, so a terminal that blamed weather would
// misread its own record on the two Core Line routes.
function ledgerSentence(rec) {
  const head = "The first Chartered cargo is home. " + cap(tally(rec.runsOut)) + " runs out, " +
    tally(rec.cargoesBanked) + " cargoes banked, ";
  const tail = "the line past the basin is the next sitting's.";
  if (rec.runsTurnedBack === 0) {
    return head + "and the stake was never once called. " + cap(tail);
  }
  const cost = rec.marksLost === 0
    ? tally(rec.runsTurnedBack) + " turned back and cost nothing but the trip."
    : tally(rec.runsTurnedBack) + " turned back, " + rec.marksLost + " marks staked and lost on the way.";
  return head + cost + " The record keeps what came home; " + tail;
}

function make(s) {
  function canMuster() {
    return !s.stopped && s.away === null && s.roster < ROSTER_CAP && s.marks >= MUSTER_PRICE;
  }
  function canSend(routeId) {
    const r = BY_ID[routeId];
    if (!r || !r.sendable) return false;
    if (s.stopped || s.away !== null) return false;
    return s.marks >= r.provisions + r.toll;
  }
  function canMeet() {
    return s.away !== null;
  }
  function litSends() {
    return ROUTES.filter((r) => canSend(r.id)).map((r) => r.id);
  }
  function cards() {
    return ROUTES.map((r) => {
      if (!r.sendable) {
        return {
          id: r.id, name: r.name, line: r.line, sendable: false, lit: false, out: false,
          pays: null, provisions: null, toll: null, stake: null, chance: null, percent: null,
          note: r.note, manifestLine: null,
        };
      }
      const riding = s.away !== null && s.away.routeId === r.id;
      const chance = riding ? s.away.chance : chanceFor(r.baseRisk, s.roster);
      return {
        id: r.id, name: r.name, line: r.line, sendable: true, lit: canSend(r.id), out: riding,
        pays: r.pays, provisions: r.provisions, toll: r.toll, stake: r.provisions + r.toll,
        chance: chance, percent: percentOf(chance),
        note: null,
        manifestLine: riding ? manifestSentence(r, s.away.wardens) : null,
      };
    });
  }
  function commitMuster() {
    if (!canMuster()) return false;
    s.marks -= MUSTER_PRICE;
    s.roster += 1;
    return true;
  }
  function commitSend(routeId) {
    if (!canSend(routeId)) return false;
    const r = BY_ID[routeId];
    const stake = r.provisions + r.toll;
    s.marks -= stake;
    s.away = {
      routeId: r.id,
      wardens: s.roster,
      provisions: r.provisions,
      toll: r.toll,
      stake: stake,
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
    // The world's turn, and the only draw on this board. One call, at the
    // meet, against the number the card stated before the click.
    const draw = s.roll();
    const home = draw < run.chance;
    s.away = null;
    if (home) {
      s.marks += r.pays;
      s.cargoesBanked += 1;
      s.sentence = homeSentence(r, run.wardens, r.pays);
      if (r.chartered) s.stopped = true;
    } else {
      s.runsTurnedBack += 1;
      s.marksLost += run.stake;
      s.sentence = turnedBackSentence(r, run.stake, run.wardens);
    }
    return true;
  }
  function wait() {
    // The calm. It takes nothing, in every state including the away one — the
    // run met in a week is the run met in a breath — and it returns false so
    // no caller can read the calm as a handled event.
    return false;
  }
  function record() {
    return {
      runsOut: s.runsOut,
      cargoesBanked: s.cargoesBanked,
      runsTurnedBack: s.runsTurnedBack,
      marksLost: s.marksLost,
    };
  }
  return {
    get marks() { return s.marks; },
    get roster() { return s.roster; },
    get rosterCap() { return ROSTER_CAP; },
    get musterPrice() { return MUSTER_PRICE; },
    get away() { return s.away !== null; },
    get stopped() { return s.stopped; },
    get town() { return TOWN; },
    get manifest() {
      if (s.away === null) return null;
      const r = BY_ID[s.away.routeId];
      return {
        routeId: r.id,
        name: r.name,
        wardens: s.away.wardens,
        provisions: s.away.provisions,
        toll: s.away.toll,
        stake: s.away.stake,
        chance: s.away.chance,
        percent: percentOf(s.away.chance),
      };
    },
    get manifestLine() {
      if (s.away === null) return null;
      return manifestSentence(BY_ID[s.away.routeId], s.away.wardens);
    },
    get runSentence() { return s.sentence; },
    get endSentence() { return s.stopped ? ledgerSentence(record()) : null; },
    get record() { return record(); },
    cards,
    litSends,
    canMuster,
    canSend,
    canMeet,
    commitMuster,
    commitSend,
    commitMeet,
    wait,
  };
}

function createBoard(opts) {
  const o = opts || {};
  // The opening, and the only state this file ever mints: marks 0, roster 0,
  // train home, nothing out, nothing banked. Only the halt is lit, and only
  // because it is the one free send — no gate stands in front of the others.
  return make({
    marks: 0,
    roster: 0,
    away: null,
    stopped: false,
    sentence: null,
    runsOut: 0,
    cargoesBanked: 0,
    runsTurnedBack: 0,
    marksLost: 0,
    roll: typeof o.roll === "function" ? o.roll : Math.random,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.DawnspurDispatch = api;

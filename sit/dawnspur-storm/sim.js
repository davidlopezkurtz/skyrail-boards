"use strict";

// SKYRAIL Reclamation — CFD-201, the storm sitting.
// Spec: docs/cfd-201-beat.md (SIGNED — David, 2026-08-28, "So sign, with the
// counter."), under canon section 7 — a sitting INHERITS what has passed and
// adds one new thing. The parent is the join board that passed 2026-08-28.
//
// INHERITED WHOLE, cited to the beats that passed them:
//   the desk    — CFD-196 + Amendments 1 and 2: SEND, MUSTER, MEET, the three
//                 routes and Rustfall dark, honest dice stamped at the send,
//                 the charter condition, the muster slider with its armed
//                 re-quote and both fences, the opening float of 3, failure
//                 pays zero, nothing refunds, the crew always comes home,
//                 the free halt always lit.
//   the terrace — CFD-183: the greenhouse 1..4, UP at 3 / 4 / 5 instant with
//                 no way back, the reserve 4 down to 0 floored, TEND 1 mark
//                 +1 step lit below full. CFD-203's join: CARRY writes stores
//                 (food), a send's provisions come off the stores, the
//                 Chartered toll stays 1 mark. MOSSWAKE +3 stays cut (Seam 3).
//   the stop    — CFD-203's arming shape, narrowed: topping ARMS; a Chartered
//                 cargo BANKED out of a storm FIRES it.
//
// THE ONE NEW SYSTEM IS WEATHER. Three sky states, one step per committed
// player action (MUSTER, SEND, MEET, CARRY, TEND, UP). Cycle fixed: five
// clear, two bird, two storm, period nine. wait() still exists, takes
// nothing, returns false, and does not advance the sky. No wall clock. The
// bird is news, not weather. Storm: every sendable route −0.10; Chartered
// pay 18→24; Core Line pay unmoved. Sky advances AFTER the commit resolves;
// a turn resolved under storm then draws the ground one step.
//
// TEND returns because the storm is the reckoning the join deferred it for.
// The reserve is STORED, not derived: with a floor and a cap applied per
// step the value is path-dependent and cannot be recovered from counts.
// Exactly three writers: carry −1, storm −1, tend +1.
//
// The Ranger (2 marks, cap 1) is the weather unit. TRIM is a second send
// on the same card, only in a storm, only with a Ranger: clear chance,
// clear pay, the route's own stake plus two marks. The Ranger never
// touches the sky. runsTrimmed increments only on a committed trimmed
// send and the terminal reports it as a rate against storm sends.
//
// RECUT 2026-08-29, same sitting, from the sit: TRIM did not read as a
// fork (it was a hidden second tap on the card) and TEND was welded to
// success rates (its payoff is the storm carry, and that was silent).
// The fork is now two faces on the card plus a TRIM pad at the send.
// TEND names the bank; CARRY in a storm states the bill before the click
// when the reserve binds. Not a second system.
//
// RECUT 2026-08-29, second sit, still not a pass: TRIM landed (considered
// at each storm send and left). TEND was still welded to the percent —
// "I tended particularly when the storms came in to see if it would
// improve my success chances" — and a live home desk with lit sends
// read as the stop because SEND stays grey until a route is picked.
// TEND now speaks as the ground: what the bank just did, not a hint
// that odds might move. A live SEND pad names the remaining verb
// (pick a route, then SEND) and does not go dead-grey. Muster, Ranger,
// SEND and a non-topping UP print the same caption grammar the sit
// already liked. Not a second system.
//
// FOOD IS NOT A CURRENCY, inherited: food buys exactly one thing (the
// provisions leg of a send); there is no exchange in either direction;
// food has one source, the carry; food is never a HUD figure. R1 holds
// literally — marks and food never share a sink. The trim's extra two
// are MARKS, not food.

const BASE = 0.76;
const POINT = 0.012;
const WARDEN_GUARD = 3;
const RANGER_GUARD = 1;
const CREW_BONUS_CAP = 0.3;
const CLAMP_LO = 0.12;
const CLAMP_HI = 0.96;

const MUSTER_PRICE = 3;
const ROSTER_CAP = 4;
const RANGER_PRICE = 2;
const RANGER_CAP = 1;
const TEND_PRICE = 1;
const TRIM_MARKS = 2;

const OPENING_MARKS = 3;
const OPENING_STORES = 0;

const UP_PRICE = { 1: 3, 2: 4, 3: 5 };
const MAX_LEVEL = 4;
const RESERVE_FULL = 4;

const STORM_BIAS = -0.10;
const STORM_CHARTERED_PAY = 24;

const CHARTER_CONDITION = "The charter opens with the first cargo banked.";

const TOWN = Object.freeze({ hearth: "held", bank: "in the stone" });

const SKY_CLEAR = "clear";
const SKY_BIRD = "bird";
const SKY_STORM = "storm";
// Five clear, two bird, two storm, period nine. Indexed from turn 1.
const SKY_PERIOD = 9;
const SKY_CLEAR_TURNS = 5;
const SKY_BIRD_TURNS = 2;

const SKY_TO_BIRD = "A stormbird is inland over the halt. There is a storm coming in behind it.";
const SKY_TO_STORM = "The storm is over Dawnspur. The sun is off the terrace and the basin road is dark.";
const SKY_TO_CLEAR = "The storm has gone off east. The sun is back on the terrace.";

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

const MAX_PROVISIONS = ROUTES.reduce(
  (m, r) => (r.sendable && r.provisions > m ? r.provisions : m), 0);
const STORES_CAP = MAX_PROVISIONS + MAX_LEVEL - 1;

const ARM_SENTENCE = "The terrace is topped. The next Chartered cargo home out of a storm ends the sitting.";

const GROUND_FULL = "The ground is full: whatever the weather did, something was banked to meet it.";
const GROUND_DRAWN = "The ground is drawn and standing: the bank covered what the storm asked.";
const GROUND_BARE = "The ground is bare: the storm was met with nothing banked.";

const TEND_CLEAR = "The ground came back one step. One mark went into the bank.";
const TEND_STORM = "The ground came back one step. The storm drew one. The bank held.";
const RANGER_SENTENCE = "The desk spent 2 marks. The Ranger is on the roster.";

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
function marksPhrase(n) {
  return n + (n === 1 ? " mark" : " marks");
}
function cap(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function skyOf(turn) {
  const p = ((turn - 1) % SKY_PERIOD + SKY_PERIOD) % SKY_PERIOD;
  if (p < SKY_CLEAR_TURNS) return SKY_CLEAR;
  if (p < SKY_CLEAR_TURNS + SKY_BIRD_TURNS) return SKY_BIRD;
  return SKY_STORM;
}

function weatherBias(sky) {
  return sky === SKY_STORM ? STORM_BIAS : 0;
}

// The one instrument: the engine's calculateDispatchPreview with every
// refused term at zero, plus the sky. Every quote and every roll comes
// through here. The SEND stamps the number; the meet rolls it.
function chanceFor(baseRisk, wardens, rangers, sky) {
  const crewBonus = Math.min(CREW_BONUS_CAP, (wardens * WARDEN_GUARD + rangers * RANGER_GUARD) * POINT);
  return clamp(BASE - baseRisk + crewBonus + weatherBias(sky), CLAMP_LO, CLAMP_HI);
}
function percentOf(chance) {
  return Math.round(chance * 100);
}

function routePays(route, sky, trimmed) {
  if (trimmed) return route.pays;
  if (sky === SKY_STORM && route.chartered) return STORM_CHARTERED_PAY;
  return route.pays;
}

function crewClause(wardens, rangers) {
  const bits = [];
  if (wardens === 1) bits.push("1 Warden");
  else if (wardens > 1) bits.push(wardens + " Wardens");
  if (rangers > 0) bits.push("the Ranger");
  if (bits.length === 0) return "No Wardens ride";
  if (wardens === 0) return "The Ranger rides";
  if (rangers === 0) return (wardens === 1 ? "1 Warden rides" : wardens + " Wardens ride");
  return bits.join(" and ") + " ride";
}
function stakeClause(route, extra) {
  const trimBit = extra > 0 ? " and two marks for the long way" : "";
  if (route.provisions === 0 && route.toll === 0) {
    return extra > 0 ? "with two marks for the long way" : "with nothing staked";
  }
  if (route.toll === 0) return "with " + tally(route.provisions) + " from the terrace" + trimBit;
  return "with " + tally(route.provisions) + " from the terrace and the Chartered toll paid" + trimBit;
}
function manifestSentence(route, wardens, rangers, extra) {
  return crewClause(wardens, rangers) + " " + stakeClause(route, extra) + ".";
}
function leftSentence(route, extra) {
  return "The train left for " + route.short + " " + stakeClause(route, extra) + ".";
}
function rosterSentence(n, roster) {
  const who = roster === 1 ? "1 Warden rides" : roster + " Wardens ride";
  return "The desk spent " + marksPhrase(MUSTER_PRICE * n) + ". " + who + ".";
}
function grewSentence(level, price) {
  return "The greenhouse is at " + tally(level) + ". " + marksPhrase(price) + " went into the glass.";
}

function whoBrought(wardens) {
  return wardens === 0 ? "The train" : wardens === 1 ? "The Warden" : "The Wardens";
}
function homeSentence(route, run) {
  const pay = run.pays;
  const who = whoBrought(run.wardens);
  if (run.trimmed) {
    return "The Ranger took them round the weather. " + who + " brought " + route.cargo +
      " home. The desk banks " + pay + ".";
  }
  if (run.storm) {
    return who + " brought " + route.cargo + " home out of the storm. The desk banks " + pay + ".";
  }
  return who + " brought " + route.cargo + " home. The desk banks " + pay + ".";
}
function turnedBackAgent(route, storm) {
  if (storm && route.id === "cloud-basin-span") return "The storm over the basin.";
  if (storm) return route.agent;
  return route.agent;
}
function crewHomeClause(wardens, rangers) {
  if (wardens === 0 && rangers === 0) return "the train is home";
  if (wardens === 0) return "the Ranger and the train are home";
  if (rangers === 0) {
    return wardens === 1 ? "the Warden and the train are home" : "the Wardens and the train are home";
  }
  return wardens === 1
    ? "the Warden and the Ranger and the train are home"
    : "the Wardens and the Ranger and the train are home";
}
function turnedBackSentence(route, run) {
  let spent;
  const extra = run.extra || 0;
  if (route.provisions === 0 && route.toll === 0 && extra === 0) {
    spent = "The free hop staked nothing and nothing comes back;";
  } else if (route.toll === 0 && extra === 0) {
    spent = cap(tally(route.provisions)) + " from the terrace and nothing comes back;";
  } else if (route.provisions === 0 && extra > 0 && route.toll === 0) {
    spent = "Two marks for the long way and nothing comes back;";
  } else if (route.toll === 0 && extra > 0) {
    spent = cap(tally(route.provisions)) + " from the terrace and two marks for the long way, and nothing comes back;";
  } else if (extra > 0) {
    spent = cap(tally(route.provisions)) +
      " from the terrace and the Chartered toll and two marks for the long way, and nothing comes back;";
  } else {
    spent = cap(tally(route.provisions)) +
      " from the terrace and the Chartered toll, and nothing comes back;";
  }
  return turnedBackAgent(route, run.storm) + " The train turned for home with the haul unbanked. " + spent +
    " the route paid nothing; " + crewHomeClause(run.wardens, run.rangers) + ", and the desk stands.";
}

function trimmedClause(rec) {
  const storms = rec.stormSends;
  const trimmed = rec.runsTrimmed;
  const stormBit = storms === 0
    ? "no run went out under storm"
    : tally(storms) + " of those runs went out under storm";
  const trimBit = trimmed === 0
    ? "none of them trimmed"
    : tally(trimmed) + " of them trimmed";
  return stormBit + ", " + trimBit;
}

function ledgerSentence(rec, reserve) {
  const head = "The basin cargo is home out of the storm. " +
    cap(tally(rec.runsOut)) + " runs out, " + tally(rec.cargoesBanked) + " cargoes banked, ";
  let cost;
  if (rec.runsTurnedBack === 0) {
    cost = "and the stake was never once called";
  } else if (rec.foodLost === 0 && rec.marksLost === 0) {
    cost = tally(rec.runsTurnedBack) + " turned back and cost nothing but the trip";
  } else {
    const food = rec.foodLost === 0
      ? "nothing from the terrace"
      : tally(rec.foodLost) + " from the terrace";
    const marks = rec.marksLost === 0 ? "no marks" : marksPhrase(rec.marksLost);
    cost = tally(rec.runsTurnedBack) + " turned back, " + food + " and " + marks + " lost on the way";
  }
  const rate = trimmedClause(rec);
  const ground = reserve === 0 ? GROUND_BARE
    : reserve >= RESERVE_FULL ? GROUND_FULL
    : GROUND_DRAWN;
  return head + cost + "; " + rate + ". " + ground +
    " The record keeps what came home; the line past the basin is the next sitting's.";
}

function make(s) {
  function sky() {
    return skyOf(s.turn);
  }
  function topped() {
    return s.level >= MAX_LEVEL;
  }
  function chartered() {
    return s.cargoesBanked > 0;
  }
  function storesHeadroom() {
    return STORES_CAP - s.stores;
  }
  // Three-way min in a storm; in clear and under the bird the reserve is
  // not a term — full pay whenever the stores can hold it, bare included.
  function carryLoad() {
    const room = Math.min(s.level, storesHeadroom());
    if (sky() === SKY_STORM) return Math.min(room, s.reserve);
    return room;
  }
  function billWords(landed, done) {
    if (sky() !== SKY_STORM) return null;
    if (landed >= s.level) return null;
    if (s.reserve >= s.level) return null;
    if (landed !== s.reserve) return null;
    if (s.reserve === 0) {
      return done
        ? "The sun is off the terrace and nothing is banked to meet it. The terrace gave nothing."
        : "The sun is off the terrace and nothing is banked to meet it.";
    }
    const verb = done ? "covered" : "covers";
    return "The sun is off the terrace. The bank " + verb + " " + s.reserve + " of the level's " + s.level + ".";
  }
  // No terrace verb reads the away state. David's MOSSWAKE cut rests on this.
  function canCarry() {
    return !s.stopped && s.stores < STORES_CAP;
  }
  function canTend() {
    return !s.stopped && s.reserve < RESERVE_FULL && s.marks >= TEND_PRICE;
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
  function canMusterRanger() {
    if (s.stopped || s.away !== null) return false;
    return s.rangers < RANGER_CAP && s.marks >= RANGER_PRICE;
  }
  function canSend(routeId) {
    const r = BY_ID[routeId];
    if (!r || !r.sendable) return false;
    if (s.stopped || s.away !== null) return false;
    if (r.chartered && !chartered()) return false;
    return s.stores >= r.provisions && s.marks >= r.toll;
  }
  function canTrim(routeId) {
    if (!canSend(routeId)) return false;
    if (sky() !== SKY_STORM || s.rangers < 1) return false;
    const r = BY_ID[routeId];
    return s.marks >= r.toll + TRIM_MARKS;
  }
  function canMeet() {
    return s.away !== null;
  }
  function litSends() {
    return ROUTES.filter((r) => canSend(r.id)).map((r) => r.id);
  }
  function litJobs() {
    const out = litSends();
    if (canMuster()) out.push("muster");
    if (canMusterRanger()) out.push("ranger");
    if (canMeet()) out.push("meet");
    if (canCarry()) out.push("carry");
    if (canTend()) out.push("tend");
    if (canUp()) out.push("up");
    return out;
  }
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
    const now = sky();
    return ROUTES.map((r) => {
      if (!r.sendable) {
        return {
          id: r.id, name: r.name, line: r.line, sendable: false, lit: false, out: false,
          pays: null, provisions: null, toll: null, chance: null, percent: null,
          note: r.note, condition: null, provisional: false, manifestLine: null,
          shifted: false, trim: null,
        };
      }
      const riding = s.away !== null && s.away.routeId === r.id;
      const chance = riding ? s.away.chance : chanceFor(r.baseRisk, quoteRoster, s.rangers, now);
      const pays = riding ? s.away.pays : routePays(r, now, false);
      const clearChance = chanceFor(r.baseRisk, quoteRoster, s.rangers, SKY_CLEAR);
      const shifted = !riding && now === SKY_STORM && (pays !== r.pays || chance !== clearChance);
      const trimOffered = !riding && now === SKY_STORM && s.rangers >= 1;
      const trim = trimOffered ? {
        lit: canTrim(r.id),
        pays: r.pays,
        chance: clearChance,
        percent: percentOf(clearChance),
        extraMarks: TRIM_MARKS,
      } : null;
      return {
        id: r.id, name: r.name, line: r.line, sendable: true, lit: canSend(r.id), out: riding,
        pays: pays, provisions: r.provisions, toll: r.toll,
        chance: chance, percent: percentOf(chance),
        note: null,
        condition: conditionFor(r),
        provisional: provisional && !riding,
        manifestLine: riding ? manifestSentence(r, s.away.wardens, s.away.rangers, s.away.extra) : null,
        shifted: shifted,
        trim: trim,
      };
    });
  }

  function finishTurn(under) {
    // A turn resolved under a storm draws the ground one step at its end.
    // The draw floors at 0 and is the storm's only writer of the reserve.
    if (under === SKY_STORM) {
      s.reserve = Math.max(0, s.reserve - 1);
    }
    const before = skyOf(s.turn);
    s.turn += 1;
    const after = skyOf(s.turn);
    if (after !== before) {
      s.skySentence = after === SKY_BIRD ? SKY_TO_BIRD
        : after === SKY_STORM ? SKY_TO_STORM
        : SKY_TO_CLEAR;
    }
  }

  function commitCarry() {
    if (!canCarry()) return false;
    const under = sky();
    const landed = carryLoad();
    const bill = billWords(landed, true);
    s.stores += landed;
    s.carries += 1;
    s.reserve = Math.max(0, s.reserve - 1);
    s.sentence = bill;
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function commitTend() {
    if (!canTend()) return false;
    const under = sky();
    s.marks -= TEND_PRICE;
    s.reserve += 1;
    s.tends += 1;
    s.sentence = under === SKY_STORM ? TEND_STORM : TEND_CLEAR;
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function commitUp() {
    if (!canUp()) return false;
    const under = sky();
    const price = UP_PRICE[s.level];
    s.marks -= price;
    s.level += 1;
    s.sentence = topped() ? ARM_SENTENCE : grewSentence(s.level, price);
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function commitMuster(count) {
    const n = count === undefined ? 1 : count;
    if (!Number.isInteger(n) || n < 1) return false;
    if (n > musterReach()) return false;
    const under = sky();
    s.marks -= MUSTER_PRICE * n;
    s.roster += n;
    s.sentence = rosterSentence(n, s.roster);
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function commitMusterRanger() {
    if (!canMusterRanger()) return false;
    const under = sky();
    s.marks -= RANGER_PRICE;
    s.rangers += 1;
    s.sentence = RANGER_SENTENCE;
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function commitSend(routeId, trimmed) {
    const wantTrim = trimmed === true;
    if (wantTrim) {
      if (!canTrim(routeId)) return false;
    } else if (!canSend(routeId)) {
      return false;
    }
    const r = BY_ID[routeId];
    const under = sky();
    const extra = wantTrim ? TRIM_MARKS : 0;
    const quoteSky = wantTrim ? SKY_CLEAR : under;
    s.stores -= r.provisions;
    s.marks -= r.toll + extra;
    s.foodSent += r.provisions;
    s.away = {
      routeId: r.id,
      wardens: s.roster,
      rangers: s.rangers,
      provisions: r.provisions,
      toll: r.toll,
      extra: extra,
      chance: chanceFor(r.baseRisk, s.roster, s.rangers, quoteSky),
      pays: routePays(r, under, wantTrim),
      storm: under === SKY_STORM,
      trimmed: wantTrim,
    };
    s.runsOut += 1;
    if (under === SKY_STORM) s.stormSends += 1;
    if (wantTrim) s.runsTrimmed += 1;
    s.sentence = leftSentence(r, extra);
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function commitMeet() {
    if (!canMeet()) return false;
    const under = sky();
    const run = s.away;
    const r = BY_ID[run.routeId];
    const draw = s.roll();
    const home = draw < run.chance;
    s.away = null;
    if (home) {
      s.marks += run.pays;
      s.cargoesBanked += 1;
      s.sentence = homeSentence(r, run);
      // Topping ARMS; a Chartered cargo banked out of a storm FIRES.
      // The storm is stamped at SEND, so a sky change while away cannot
      // arm, disarm, or fire the ending.
      if (r.chartered && topped() && run.storm) s.stopped = true;
    } else {
      s.runsTurnedBack += 1;
      s.foodLost += run.provisions;
      s.marksLost += run.toll + run.extra;
      s.sentence = turnedBackSentence(r, run);
    }
    s.skySentence = null;
    finishTurn(under);
    return true;
  }
  function wait() {
    // The calm. It takes nothing — the ground never falls, the food never
    // spoils, the away run never sours, the sky does not blow over — and
    // returns false so no caller can read the calm as a handled event.
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
      tends: s.tends,
      stormSends: s.stormSends,
      runsTrimmed: s.runsTrimmed,
    };
  }
  function spoken() {
    const bits = [];
    if (s.sentence) bits.push(s.sentence);
    if (s.skySentence) bits.push(s.skySentence);
    return bits.length === 0 ? null : bits.join(" ");
  }
  return {
    get marks() { return s.marks; },
    get roster() { return s.roster; },
    get rosterCap() { return ROSTER_CAP; },
    get musterPrice() { return MUSTER_PRICE; },
    get musterReach() { return musterReach(); },
    get rangers() { return s.rangers; },
    get rangerCap() { return RANGER_CAP; },
    get rangerPrice() { return RANGER_PRICE; },
    get level() { return s.level; },
    get maxLevel() { return MAX_LEVEL; },
    get upPrice() { return topped() ? null : UP_PRICE[s.level]; },
    get tendPrice() { return TEND_PRICE; },
    get reserve() { return s.reserve; },
    get reserveFull() { return RESERVE_FULL; },
    get stores() { return s.stores; },
    get storesCap() { return STORES_CAP; },
    get carryYield() { return canCarry() ? carryLoad() : null; },
    get carryBill() { return canCarry() ? billWords(carryLoad(), false) : null; },
    get sky() { return sky(); },
    get away() { return s.away !== null; },
    get armed() { return topped(); },
    get stopped() { return s.stopped; },
    get town() { return TOWN; },
    get manifest() {
      if (s.away === null) return null;
      const r = BY_ID[s.away.routeId];
      return {
        routeId: r.id, name: r.name, wardens: s.away.wardens, rangers: s.away.rangers,
        provisions: s.away.provisions, toll: s.away.toll, extra: s.away.extra,
        chance: s.away.chance, percent: percentOf(s.away.chance),
        pays: s.away.pays, storm: s.away.storm, trimmed: s.away.trimmed,
      };
    },
    get manifestLine() {
      if (s.away === null) return null;
      return manifestSentence(BY_ID[s.away.routeId], s.away.wardens, s.away.rangers, s.away.extra);
    },
    get runSentence() { return spoken(); },
    get skySentence() { return s.skySentence; },
    get endSentence() { return s.stopped ? ledgerSentence(record(), s.reserve) : null; },
    get record() { return record(); },
    cards,
    litSends,
    litJobs,
    canSend,
    canTrim,
    canMeet,
    canMuster,
    canMusterRanger,
    canCarry,
    canTend,
    canUp,
    commitSend,
    commitMeet,
    commitMuster,
    commitMusterRanger,
    commitCarry,
    commitTend,
    commitUp,
    wait,
  };
}

function createBoard(opts) {
  const o = opts || {};
  // The opening, and the only state this file mints: marks 3, stores 0,
  // Wardens 0, Rangers 0, level 1, reserve 4, sky clear at turn 1, train
  // home, nothing banked, the ending not armed, Cloud Basin dark.
  //
  // opts.marks and opts.stores are FOR THE SUITE. Nothing a player can
  // reach sets either: this file reads no query string, no storage and
  // no control, and the board hands in nothing. The sky is not settable.
  const marks = Number.isInteger(o.marks) && o.marks >= 0 ? o.marks : OPENING_MARKS;
  const stores = Number.isInteger(o.stores) && o.stores >= 0 && o.stores <= STORES_CAP
    ? o.stores : OPENING_STORES;
  return make({
    marks: marks,
    stores: stores,
    roster: 0,
    rangers: 0,
    level: 1,
    reserve: RESERVE_FULL,
    carries: 0,
    tends: 0,
    turn: 1,
    away: null,
    stopped: false,
    sentence: null,
    skySentence: null,
    runsOut: 0,
    cargoesBanked: 0,
    runsTurnedBack: 0,
    marksLost: 0,
    foodLost: 0,
    foodSent: 0,
    stormSends: 0,
    runsTrimmed: 0,
    roll: typeof o.roll === "function" ? o.roll : Math.random,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.DawnspurStorm = api;

"use strict";

// SKYRAIL Reclamation — CFD-209, C12 — The dice come to the places.
// Spec: docs/cfd-209-beat.md (SIGNED — David, 2026-08-31).
// Sibling /dice-at-the-places/. Not a recut of they-remember, herbs-larder,
// mosswake-loop, halt, site, storm, /dawnspur-line/, or /dawnspur-dispatch/.
// Parent: /they-remember/ (CFD-208, PASSED 2026-08-31).
//
// One NEW system: a tap at a place can fail. The desk is deleted as a
// surface. You tap Mosswake; the tap IS the send; the run can come home
// empty. Swap, not stack. The corridor stays max live can-do = 1 in every
// reachable state.
//
// THE PLAYER MUST MEET A RUN THAT DOES NOT WORK. A success-only walk never
// stops. A turned-back run arms; Collect at Mosswake fires. Stated
// explicitly — not the line-board accident `chartered && topped()`.
//
// Seams, the actual work:
//   One map — `map`, city geometry {left:42,width:16}. No `rim`. No `gap`
//   getter beside it.
//   One consist — `consistAt` only. No `inbound` / `landed`.
//   One home-but-not-stowed — `consistAt === "halt" && haulOnConsist`.
//   C9 emptied the consist on home; C10 needed the haul back. This board
//   keeps the haul on the consist when a run comes home paid.
//
// Defect this board must not inherit: they-remember's
// `s.marks = MUSEUM_MARKS` assignment. This board opens on the desk float
// (3). Collect increments.
//
// Inherited, not replayed: Halt holds, foundry, heat step, herbs in the
// larder, Mosswake a neighbor, the promise already kept, Put them up.
// Favor as booleans. Routes' pays / provisions / toll / honest chance.
// Rustfall dark — Beat 8 dressing. Arm-then-trigger stop, stated here.
//
// Refused: weather, a second live can-do, a second new system, a new
// currency, any pin moving, the desk surface, crews, Sera, terrace
// provisions, a Favor meter, Mara VO, `?`, tutorial mode.
//
// Canon (cite, do not recall as a second bible): Bible §5.8 Contracts.
// Supply — a send is a contract with a stated chance, taken to the place.
// Core Loop: earns Favor by helping neighbors and keeping promises. File:
// Skyrail-Reclamation-The-Core-Loop.md. R6 — stakes live in the run, never
// the secured home. R2 / R3 / R4 — nothing moves with wall time. R1 —
// heat is the master resource, marks are money. Bible sha 9a305653.
// Tutorial Beat 8 — Rustfall stays dark — inherited dressing.
//
// The HUD is one marks line. Opening marks 3 — the desk's float.
// wait() exists, takes nothing, returns false.

const OPENING_MARKS = 3;
const MUSEUM_MARKS = 1;

// The one instrument, inherited unmoved from CFD-196: every quote and every
// roll comes through chanceFor(). The board never computes a percent.
const BASE = 0.76;
const POINT = 0.012;
const WARDEN_GUARD = 3;
const CLAMP_LO = 0.12;
const CLAMP_HI = 0.96;

// Mosswake Loop — the route's own stakes, inherited. Roster stays 0
// (crews are refused). Provisions and toll as shipped; paid in marks,
// which is the dispatch denomination, not a food-to-marks exchange and
// not terrace CARRY (refused).
const MOSSWAKE = Object.freeze({
  short: "Mosswake",
  cargo: "the Mosswake cargo",
  baseRisk: 0.12,
  pays: 14,
  provisions: 2,
  toll: 0,
  agent: "Wet rail through the Mosswake loop.",
});

const RUSTFALL_NOTE = "Raiders hold the yard road.";

const PLACES = Object.freeze(["halt", "mosswake", "consist", "rustfall"]);

// One map. City geometry. SEND does not write it. Home does not write it.
const MAP = Object.freeze({ left: 42, width: 16 });

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function chanceFor(baseRisk, wardens) {
  const crewBonus = Math.min(0.3, wardens * WARDEN_GUARD * POINT);
  return clamp(BASE - baseRisk + crewBonus, CLAMP_LO, CLAMP_HI);
}
function percentOf(chance) {
  return Math.round(chance * 100);
}
function stakeOf() {
  return MOSSWAKE.provisions + MOSSWAKE.toll;
}
function mossChance() {
  return chanceFor(MOSSWAKE.baseRisk, 0);
}
function sendFace() {
  return "SEND. " + percentOf(mossChance()) + ".";
}
function homeFace(chance) {
  return "Home she comes. " + percentOf(chance) + ".";
}

function make(state) {
  const s = state;

  function canSend() {
    if (s.stopped) return false;
    if (s.armed) return false;
    if (s.consistAt !== "halt") return false;
    if (s.marks < stakeOf()) return false;
    return true;
  }

  function canHome() {
    if (s.stopped) return false;
    if (s.consistAt !== "mosswake") return false;
    if (s.away === null) return false;
    return true;
  }

  function canCollect() {
    if (s.stopped) return false;
    if (!s.armed) return false;
    if (s.collected) return false;
    if (s.consistAt !== "halt") return false;
    return true;
  }

  function notice(place) {
    if (place === "halt") {
      if (s.armed && !s.collected) {
        return {
          place: "halt",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The place already took the haul.",
          blocked: "The herbs are already up. The larder covered the short run.",
          writing: "The Halt holds. The run came home short and the larder covered it.",
        };
      }
      return {
        place: "halt",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: "The place already took the haul.",
        blocked: "The herbs are already up. Nothing here is yours to take.",
        writing: "The Halt holds. Herbs in the larder.",
      };
    }

    if (place === "mosswake") {
      if (s.consistAt === "mosswake") {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The consist is here.",
          blocked: null,
          writing: "Mosswake. The run is out.",
        };
      }
      if (s.armed && !s.collected) {
        return {
          place: "mosswake",
          canDo: "Collect.",
          verb: "collect",
          chance: null,
          percent: null,
          inProcess: "They kept something back.",
          blocked: null,
          writing: "Mosswake. A neighbor again.",
        };
      }
      if (s.collected) {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The world answered.",
          blocked: null,
          writing: "People remember who showed up.",
        };
      }
      if (canSend()) {
        const chance = mossChance();
        return {
          place: "mosswake",
          canDo: sendFace(),
          verb: "send",
          chance: chance,
          percent: percentOf(chance),
          inProcess: null,
          blocked: null,
          writing: "Mosswake. A neighbor again.",
        };
      }
      return {
        place: "mosswake",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: null,
        blocked: "The consist is not home.",
        writing: "Mosswake. A neighbor again.",
      };
    }

    if (place === "consist") {
      if (s.consistAt === "mosswake" && s.away !== null) {
        return {
          place: "consist",
          canDo: homeFace(s.away.chance),
          verb: "home",
          chance: s.away.chance,
          percent: percentOf(s.away.chance),
          inProcess: "At Mosswake.",
          blocked: null,
          writing: "The run is at Mosswake.",
        };
      }
      if (s.haulOnConsist) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: null,
          writing: "The consist is home. The haul is on it.",
        };
      }
      if (s.armed && !s.collected) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: "The haul was lost. The larder covered it.",
          writing: "The run came home short and the larder covered it.",
        };
      }
      return {
        place: "consist",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: "Home.",
        blocked: "The haul is already up.",
        writing: "The consist is home. Empty.",
      };
    }

    if (place === "rustfall") {
      return {
        place: "rustfall",
        canDo: null,
        verb: null,
        chance: null,
        percent: null,
        inProcess: null,
        blocked: RUSTFALL_NOTE,
        writing: "Rustfall. Dark.",
      };
    }

    return null;
  }

  function postNotice(place) {
    if (PLACES.indexOf(place) < 0) return false;
    s.posted = place;
    return true;
  }

  function postedNotice() {
    if (!s.posted) return null;
    return notice(s.posted);
  }

  function commitSend() {
    if (!canSend()) return false;
    const chance = mossChance();
    s.marks -= stakeOf();
    s.haulOnConsist = false;
    s.consistAt = "mosswake";
    s.away = {
      chance: chance,
      provisions: MOSSWAKE.provisions,
      toll: MOSSWAKE.toll,
    };
    s.runsOut += 1;
    s.sentence = null;
    return true;
  }

  function commitHome() {
    if (!canHome()) return false;
    const run = s.away;
    const draw = s.roll();
    const paid = draw < run.chance;
    s.away = null;
    s.consistAt = "halt";
    if (paid) {
      s.marks += MOSSWAKE.pays;
      s.haulOnConsist = true;
      s.cargoesBanked += 1;
      s.sentence = "The train brought " + MOSSWAKE.cargo + " home.";
    } else {
      s.haulOnConsist = false;
      s.runsTurnedBack += 1;
      s.marksLost += run.provisions + run.toll;
      s.armed = true;
      s.sentence = MOSSWAKE.agent +
        " The run came home short and the larder covered it.";
    }
    return true;
  }

  function commitCollect() {
    if (!canCollect()) return false;
    s.collected = true;
    s.remembered = true;
    // Increment. Not an assignment. they-remember's
    // `s.marks = MUSEUM_MARKS` would destroy the desk float.
    s.marks += MUSEUM_MARKS;
    // The stop, stated explicitly: a turned-back run arms;
    // Collect at Mosswake fires. A successful run never stops
    // the sitting. A turned-back run never stops the sitting.
    if (s.armed) s.stopped = true;
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
    if (n.verb === "send") return commitSend();
    if (n.verb === "home") return commitHome();
    if (n.verb === "collect") return commitCollect();
    return false;
  }

  function wait() {
    return false;
  }

  function places() {
    return PLACES.slice();
  }

  function buildings() {
    return places();
  }

  function liveCanDo() {
    for (let i = 0; i < PLACES.length; i++) {
      const n = notice(PLACES[i]);
      if (n && n.canDo) return { place: n.place, verb: n.verb, canDo: n.canDo };
    }
    return null;
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
    get openingMarks() { return OPENING_MARKS; },
    get lampLit() { return s.lampLit; },
    get haltHolds() { return s.haltHolds; },
    get foundry() { return s.foundry; },
    get foodOnTerrace() { return s.foodOnTerrace; },
    get foodInTown() { return s.foodInTown; },
    get heatStep() { return s.heatStep; },
    get mossDim() { return s.mossDim; },
    get mossQuiet() { return s.mossQuiet; },
    get herbsWasting() { return s.herbsWasting; },
    get herbsOnMoss() { return s.herbsOnMoss; },
    get herbsInLarder() { return s.herbsInLarder; },
    get neighborAgain() { return s.neighborAgain; },
    get consistAt() { return s.consistAt; },
    get haulOnConsist() { return s.haulOnConsist; },
    get promiseKept() { return s.promiseKept; },
    get putUp() { return s.putUp; },
    get collected() { return s.collected; },
    get remembered() { return s.remembered; },
    get armed() { return s.armed; },
    get map() { return { left: s.map.left, width: s.map.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    get runSentence() { return s.sentence; },
    get endSentence() {
      return s.stopped
        ? "The run came home short and the larder covered it."
        : null;
    },
    get record() { return record(); },
    get pays() { return MOSSWAKE.pays; },
    get provisions() { return MOSSWAKE.provisions; },
    get toll() { return MOSSWAKE.toll; },
    canSend,
    canHome,
    canCollect,
    commitSend,
    commitHome,
    commitCollect,
    commitPosted,
    postNotice,
    notice,
    postedNotice,
    wait,
    places,
    buildings,
    liveCanDo,
  };
}

function createBoard(opts) {
  const o = opts || {};
  const marks = Number.isInteger(o.marks) && o.marks >= 0 ? o.marks : OPENING_MARKS;
  return make({
    marks: marks,
    lampLit: true,
    haltHolds: true,
    foundry: true,
    foodOnTerrace: false,
    foodInTown: true,
    heatStep: 1,
    mossDim: true,
    mossQuiet: true,
    herbsWasting: false,
    herbsOnMoss: false,
    herbsInLarder: true,
    neighborAgain: true,
    consistAt: "halt",
    haulOnConsist: false,
    promiseKept: true,
    putUp: true,
    collected: false,
    remembered: false,
    armed: false,
    map: { left: MAP.left, width: MAP.width },
    away: null,
    stopped: false,
    posted: null,
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
if (typeof globalThis !== "undefined") globalThis.DiceAtThePlaces = api;

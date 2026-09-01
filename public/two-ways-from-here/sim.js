"use strict";

// SKYRAIL Reclamation — CFD-210, C13 — Two ways from here.
// Spec: docs/cfd-210-beat.md (SIGNED — David, 2026-09-01, and re-cut the
// same day: the Halt is HOME on this board, not a destination, and the fork
// moved to bank-or-press-on at the arm).
// Sibling /two-ways-from-here/. Not a recut of anything.
// Parent: /dice-at-the-places/ (CFD-209, PASSED 2026-09-01). Its bytes are
// pinned and do not move; this file is the copy that changes.
//
// One NEW system: the corridor forks once, after commitment. One live
// can-do opens the board, exactly as the parent does. When a run comes home
// SHORT and the board arms, a second place lights, and the player chooses:
//   BANK      — Collect. at Mosswake. C12's ending, inherited whole:
//               +1 mark, remembered, the sitting ends banked.
//   PRESS ON  — ROLL HER OUT. 64. on the consist: one more Mosswake run,
//               stakeOf() WAIVED, Mosswake's own chance and pay.
//     paid  -> +14, the ARM CLEARS, Collect. goes out of reach, back in
//              the paying loop until the next short run.
//     short -> the sitting ENDS COLD. No Collect., no +1, no remembering.
//              Rule B (David, 2026-09-01): "Under A, pressing on is never
//              wrong and banking is dominated." The larder covered it once.
//              It will not cover it twice.
// Exclusive by construction, not by fiat: winning takes the ending away and
// losing takes everything. Two live can-dos at the arm and never more; one
// everywhere else. The cost is on the consist tile BEFORE the tap.
//
// No new numbers. 64 / 14 / stake 0 are Mosswake's own, inherited unmoved.
// The arm is no longer a one-way latch: a paid press-on clears it. Two
// stops, each stated: Collect-while-armed (banked) and a short press-on
// (cold). Two endings, two sentences, both on the tiles — endSentence is
// never rendered, so the words live in notice().writing and .blocked.
//
// Inherited, not replayed: everything the parent inherited, and its one
// system — a tap at a place can fail. The desk deleted. Halt holds, herbs
// in the larder, Mosswake a neighbor. Rustfall dark — Beat 8 dressing.
// Opening marks 3 — the desk's float. Collect increments.
//
// Refused: the Halt as a send (it is home here — the name-collision error
// the beat shipped and withdrew), Rustfall as a send (CFD-200 owns it by
// name), a third live can-do, two lit at the OPEN (the measured failure),
// weather, a second new system, a new currency, crews, Sera, a Favor meter,
// a timer or decay on the fork, Mara VO, `?`, tutorial mode, any pin moving.
//
// Canon (cite, do not recall as a second bible): Bible §5.8 Contracts.
// Supply — both branches are promises with a stated chance. Core Loop:
// earns Favor by helping neighbors and keeping promises. File:
// Skyrail-Reclamation-The-Core-Loop.md. R6 — stakes live in the run, never
// the secured home: a cold ending costs this sitting's ending and nothing
// already earned. R2 / R3 / R4 — nothing moves with wall time; the unchosen
// branch never expires. §7.2 — the quick path is banking. §7.5 — the nulls
// are pre-registered in the beat. Bible sha 9a305653.
//
// The HUD is one marks line. wait() exists, takes nothing, returns false.

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
// not terrace CARRY (refused). The press-on rolls THIS route, stake waived.
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

// The fork's words. Copy, not constants — no number enters the file. The
// cost sits on the consist tile BEFORE the tap; the cold ending sits on the
// same tile after it, and on endSentence, which the page never reads.
const PRESS_COST = "The larder covered it once. It will not cover it twice.";
const COLD_END = "She came home short again. The larder could not cover it twice.";

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
function pressFace() {
  return "ROLL HER OUT. " + percentOf(mossChance()) + ".";
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

  // The fork's second branch. It does not consult canSend(): canSend's
  // armed guard is what keeps Mosswake's own SEND dark at the arm, and it
  // stays. No marks test — the stake is waived, so the branch is live at
  // 0 marks, which is exactly where Mosswake is unaffordable.
  function canPress() {
    if (s.stopped) return false;
    if (!s.armed) return false;
    if (s.collected) return false;
    if (s.consistAt !== "halt") return false;
    if (s.away !== null) return false;
    return true;
  }

  function notice(place) {
    if (place === "halt") {
      if (s.endedCold) {
        return {
          place: "halt",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "The place already took the haul.",
          blocked: "The herbs are already up. The larder could not cover it twice.",
          writing: "The Halt holds. She came home short again.",
        };
      }
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
      // Checked first, and it is why the corridor holds through the away
      // leg for free: a press-on in flight darkens Collect. on its own.
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
      if (s.endedCold) {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: null,
          blocked: "Still a neighbor. Nothing to collect.",
          writing: "Mosswake. She came home short again.",
        };
      }
      // The notice calls the gate it lights. C12 tested
      // `s.armed && !s.collected` here, which was the gate's condition
      // while the only stop set `collected`. The cold stop does not, so a
      // duplicated condition would light a Collect. whose commit refuses.
      if (canCollect()) {
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
      if (s.endedCold) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          chance: null,
          percent: null,
          inProcess: "Home.",
          blocked: null,
          writing: COLD_END,
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
      // The fork. The consist is the thing being wagered, and it is the
      // tile that is empty at the arm. The cost is here, before the tap.
      if (canPress()) {
        const chance = mossChance();
        return {
          place: "consist",
          canDo: pressFace(),
          verb: "press",
          chance: chance,
          percent: percentOf(chance),
          inProcess: null,
          blocked: PRESS_COST,
          writing: "The run came home short and the larder covered it.",
        };
      }
      // Unreachable while canPress() is exactly the arm: kept so that a
      // press gated off later prints C12's true sentence, not "already up".
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
      press: false,
    };
    s.runsOut += 1;
    s.sentence = null;
    return true;
  }

  // Like commitSend with the stake WAIVED: no `s.marks -=`. The run object
  // stakes nothing, so the record's marksLost stays honest on a short
  // return (nothing was put up, nothing is lost), and carries `press` so
  // commitHome knows which ending a short return reaches.
  function commitPress() {
    if (!canPress()) return false;
    const chance = mossChance();
    s.haulOnConsist = false;
    s.consistAt = "mosswake";
    s.away = {
      chance: chance,
      provisions: 0,
      toll: 0,
      press: true,
    };
    s.runsOut += 1;
    s.pressOns += 1;
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
      // A paid press-on clears the arm. A boolean clear — an assignment
      // on purpose, beside `+=` lines that are accumulations on purpose.
      // The closing line is no longer true; the ending goes out of reach.
      if (run.press) s.armed = false;
    } else {
      s.haulOnConsist = false;
      s.runsTurnedBack += 1;
      s.marksLost += run.provisions + run.toll;
      if (run.press) {
        // The cold stop, stated: a short press-on ends the sitting with
        // nothing. No Collect., no +1, no remembering. The arm stays as
        // it was; `stopped` is what closes every gate.
        s.stopped = true;
        s.endedCold = true;
        s.sentence = MOSSWAKE.agent + " " + COLD_END;
      } else {
        s.armed = true;
        s.sentence = MOSSWAKE.agent +
          " The run came home short and the larder covered it.";
      }
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
    // The banked stop, stated explicitly: a turned-back run arms;
    // Collect at Mosswake fires. A successful run never stops the
    // sitting. A turned-back run never stops the sitting — unless it
    // was the press-on, which stops cold in commitHome.
    if (s.armed) s.stopped = true;
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
    if (n.verb === "send") return commitSend();
    if (n.verb === "home") return commitHome();
    if (n.verb === "collect") return commitCollect();
    if (n.verb === "press") return commitPress();
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

  // First match. Kept for compatibility; it cannot see a second live
  // can-do, so the corridor is never graded on it.
  function liveCanDo() {
    for (let i = 0; i < PLACES.length; i++) {
      const n = notice(PLACES[i]);
      if (n && n.canDo) return { place: n.place, verb: n.verb, canDo: n.canDo };
    }
    return null;
  }

  // Plural, in PLACES order. The corridor is graded on this and on
  // notice() enumerated directly.
  function liveCanDos() {
    const out = [];
    for (let i = 0; i < PLACES.length; i++) {
      const n = notice(PLACES[i]);
      if (n && n.canDo) out.push({ place: n.place, verb: n.verb, canDo: n.canDo });
    }
    return out;
  }

  function record() {
    return {
      runsOut: s.runsOut,
      cargoesBanked: s.cargoesBanked,
      runsTurnedBack: s.runsTurnedBack,
      marksLost: s.marksLost,
      pressOns: s.pressOns,
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
    get endedCold() { return s.endedCold; },
    get map() { return { left: s.map.left, width: s.map.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    get runSentence() { return s.sentence; },
    get endSentence() {
      if (s.endedCold) return COLD_END;
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
    canPress,
    commitSend,
    commitHome,
    commitCollect,
    commitPress,
    commitPosted,
    postNotice,
    notice,
    postedNotice,
    wait,
    places,
    buildings,
    liveCanDo,
    liveCanDos,
  };
}

function createBoard(opts) {
  const o = opts || {};
  const marks = Number.isInteger(o.marks) && o.marks >= 0 ? o.marks : OPENING_MARKS;
  // Every field the sim reads is initialised here. make() aliases this
  // literal with no clone and no defaulting: a forgotten field is
  // `undefined`, and `undefined !== null` is true.
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
    endedCold: false,
    map: { left: MAP.left, width: MAP.width },
    away: null,
    stopped: false,
    posted: null,
    sentence: null,
    runsOut: 0,
    cargoesBanked: 0,
    runsTurnedBack: 0,
    marksLost: 0,
    pressOns: 0,
    roll: typeof o.roll === "function" ? o.roll : Math.random,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.TwoWaysFromHere = api;

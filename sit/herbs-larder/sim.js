"use strict";

// SKYRAIL Reclamation — CFD-207, Herbs in the Larder — the run feeds the place.
// Spec: docs/cfd-207-beat.md (SIGNED — David, 2026-08-30, Superheavy named it).
// Sibling /herbs-larder/. Not a recut of halt, mosswake, site, storm,
// /dawnspur-line/, or /dawnspur-dispatch/. One NEW system: the larder.
// The place takes the haul. One live can-do: Put them up. Writing is the
// board. Mara shows, not lectures. Tutorial is the same system.
//
// Inherited: Halt is lit and holds (unmoved on /dawnspur-halt/). Mosswake
// is quiet, herbs already gone (unmoved on /mosswake-loop/). Works stays.
// Foundry is work one. Heat not Air. Held island is not a fuel bill.
// Consist arrival already sat on Halt as LAND. The leave already sat on
// Mosswake as SEND — this sitting does not SEND. The promise is already
// kept, inherited, not replayed.
//
// Canon (cite, do not recall as a second bible): Tutorial Script Beat 7.
// Core Loop: nodes and lines. Halt's function here is the larder. Bible
// §1.19 Heat/Air. §5.8 Contracts. Heat not Air. Bible §8. Do not cite
// World Bible §12 as live canon. Bible sha 9a305653. Beat 7: herbs in
// the larder, a neighbor again.
//
// Two nodes and a span. Dawnspur Halt lit (read, not recut). Mosswake
// quiet. The consist is home with the haul. The span is scenery.
//
// Put them up: herbs leave the consist and enter Halt. No route picker,
// no Cloud Basin, no SEND. Costs nothing. Marks do not bump.
//
// The HUD is one marks line. Opening marks 0. wait() exists, takes nothing,
// returns false.

const OPENING_MARKS = 0;
const PLACES = Object.freeze(["halt", "mosswake", "consist"]);

// The gap is a constant. Put them up does not write it.
const GAP = Object.freeze({ left: 42, width: 16 });

function make(state) {
  const s = state;

  function canPutUp() {
    if (s.stopped) return false;
    if (s.putUp) return false;
    if (!s.herbsOnConsist) return false;
    if (s.consistAt !== "halt") return false;
    return true;
  }

  function notice(place) {
    if (place === "halt") {
      if (!s.putUp) {
        return {
          place: "halt",
          canDo: null,
          verb: null,
          inProcess: "The Halt is awake.",
          blocked: "This sitting does not light the lamp. The Halt already holds.",
          writing: "The Halt holds. The haul is still on the consist.",
        };
      }
      return {
        place: "halt",
        canDo: null,
        verb: null,
        inProcess: "The place took the haul.",
        blocked: null,
        writing: "The Halt holds. Herbs in the larder.",
      };
    }

    if (place === "mosswake") {
      if (!s.putUp) {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          inProcess: null,
          blocked: "The herbs already gone.",
          writing: "Mosswake. Quiet.",
        };
      }
      return {
        place: "mosswake",
        canDo: null,
        verb: null,
        inProcess: "The run already came home.",
        blocked: null,
        writing: "Mosswake. A neighbor again.",
      };
    }

    if (place === "consist") {
      if (!s.putUp) {
        return {
          place: "consist",
          canDo: "Put them up.",
          verb: "putup",
          inProcess: "Home.",
          blocked: null,
          writing: "The consist is home. The herbs are on it.",
        };
      }
      return {
        place: "consist",
        canDo: null,
        verb: null,
        inProcess: "Home.",
        blocked: "The place took the haul.",
        writing: "The consist is home. The haul is up.",
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

  function commitPutUp() {
    if (!canPutUp()) return false;
    s.putUp = true;
    s.herbsOnConsist = false;
    s.herbsInLarder = true;
    s.neighborAgain = true;
    s.stopped = true;
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
    if (n.verb === "putup") return commitPutUp();
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
    get herbsOnConsist() { return s.herbsOnConsist; },
    get herbsInLarder() { return s.herbsInLarder; },
    get neighborAgain() { return s.neighborAgain; },
    get consistAt() { return s.consistAt; },
    get promiseKept() { return s.promiseKept; },
    get putUp() { return s.putUp; },
    get gap() { return { left: s.gap.left, width: s.gap.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    canPutUp,
    commitPutUp,
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
  const marks = opts && Number.isInteger(opts.marks) ? opts.marks : OPENING_MARKS;
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
    herbsOnConsist: true,
    herbsInLarder: false,
    neighborAgain: false,
    consistAt: "halt",
    promiseKept: true,
    putUp: false,
    gap: { left: GAP.left, width: GAP.width },
    stopped: false,
    posted: null,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.HerbsLarder = api;

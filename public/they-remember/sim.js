"use strict";

// SKYRAIL Reclamation — CFD-208, They Remember — Favor through the act.
// Spec: docs/cfd-208-beat.md (SIGNED — David, 2026-08-30, Superheavy named it).
// Sibling /they-remember/. Not a recut of halt, mosswake, herbs-larder, site,
// storm, /dawnspur-line/, or /dawnspur-dispatch/. One NEW system: Favor as
// the act. People remember who showed up. One live can-do: Collect.
// Writing is the board. Mara shows, not lectures. Tutorial is the same
// system.
//
// Inherited: Halt is lit and holds (unmoved on /dawnspur-halt/). Mosswake
// is quiet, a neighbor again (unmoved on /mosswake-loop/). Herbs already
// in the larder (unmoved on /herbs-larder/). Works stays. Foundry is work
// one. Heat not Air. Held island is not a fuel bill. Put them up already
// sat on the larder. The leave already sat on Mosswake as SEND — this
// sitting does not SEND. The consist is home and empty. The promise is
// already kept, inherited, not replayed.
//
// Canon (cite, do not recall as a second bible): Tutorial Script Beat 7
// unpaid half. File: Skyrail-Reclamation-Tutorial-Script-Dawnspur-Halt.md.
// Protect: "People remember who showed up." Do not lecture "that's Favor."
// Core Loop: earns Favor by helping neighbors and keeping promises. File:
// Skyrail-Reclamation-The-Core-Loop.md. Bible §5.8 Contracts. Supply.
// Collecting the already-kept Supply, not a new dispatch. Bible §1.19
// Heat/Air. Heat not Air. Bible §8. Do not cite World Bible §12 as live
// canon. Bible sha 9a305653. Beat 8 frontier / Cloud Basin / Sera: not
// this sitting.
//
// Two nodes and a span. Dawnspur Halt lit (read, not recut). Mosswake
// quiet, a neighbor again. The consist is home, empty. The span is
// scenery. Herbs already in the larder.
//
// Collect: the world answers the help. No route picker, no Cloud Basin,
// no SEND, no Put them up. Marks may land on the museum HUD. They are
// not the sit. No Favor number. No Favor bar.
//
// The HUD is one marks line. Opening marks 0. wait() exists, takes nothing,
// returns false.

const OPENING_MARKS = 0;
// Museum only. Not a cited §5.8 Supply basket — that file was not
// reachable this sitting. The sit is the writing.
const MUSEUM_MARKS = 1;
const PLACES = Object.freeze(["halt", "mosswake", "consist"]);

// The gap is a constant. Collect does not write it.
const GAP = Object.freeze({ left: 42, width: 16 });

function make(state) {
  const s = state;

  function canCollect() {
    if (s.stopped) return false;
    if (s.collected) return false;
    if (!s.herbsInLarder) return false;
    if (s.consistAt !== "halt") return false;
    return true;
  }

  function notice(place) {
    if (place === "halt") {
      if (!s.collected) {
        return {
          place: "halt",
          canDo: "Collect.",
          verb: "collect",
          inProcess: "The place already took the haul.",
          blocked: null,
          writing: "The Halt holds. Herbs in the larder.",
        };
      }
      return {
        place: "halt",
        canDo: null,
        verb: null,
        inProcess: "The world answered.",
        blocked: null,
        writing: "People remember who showed up.",
      };
    }

    if (place === "mosswake") {
      if (!s.collected) {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          inProcess: "The run already came home.",
          blocked: "The leave already sat.",
          writing: "Mosswake. A neighbor again.",
        };
      }
      return {
        place: "mosswake",
        canDo: null,
        verb: null,
        inProcess: "A neighbor again.",
        blocked: null,
        writing: "The herbs were never just cargo.",
      };
    }

    if (place === "consist") {
      return {
        place: "consist",
        canDo: null,
        verb: null,
        inProcess: "Home.",
        blocked: "The haul is already up.",
        writing: "The consist is home. Empty.",
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

  function commitCollect() {
    if (!canCollect()) return false;
    s.collected = true;
    s.remembered = true;
    s.marks = MUSEUM_MARKS;
    s.stopped = true;
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
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
    get collected() { return s.collected; },
    get remembered() { return s.remembered; },
    get gap() { return { left: s.gap.left, width: s.gap.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    canCollect,
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
    herbsOnConsist: false,
    herbsInLarder: true,
    neighborAgain: true,
    consistAt: "halt",
    promiseKept: true,
    putUp: true,
    collected: false,
    remembered: false,
    gap: { left: GAP.left, width: GAP.width },
    stopped: false,
    posted: null,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.TheyRemember = api;

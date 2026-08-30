"use strict";

// SKYRAIL Reclamation — CFD-206, Mosswake Loop — the line (a promise).
// Spec: docs/cfd-206-beat.md (SIGNED — David, 2026-08-30, Superheavy named it).
// Sibling /mosswake-loop/. Not a recut of halt, site, storm, /dawnspur-line/,
// or /dawnspur-dispatch/. One NEW system: a promise. One SEND on THIS board.
// One run to Mosswake. Then home she comes. Writing is the board. Mara shows,
// not lectures. Tutorial is the same system.
//
// Inherited: Halt is lit and holds (unmoved on /dawnspur-halt/). Works stays.
// Foundry is work one. Heat not Air. Held island is not a fuel bill. Consist
// arrival already sat on Halt as LAND — this sitting is the leave.
//
// Canon (cite, do not recall as a second bible): Tutorial Beat 5–7. World
// Bible §12 Mosswake Loop. Core Loop: nodes and lines. Geology: a train, a
// glasshouse, and an island riding high are the same act. Bible sha 9a305653.
// Beat 5: the reason it matters is the line. Beat 7: home she comes.
//
// Two nodes and a span. Dawnspur Halt lit (read, not recut). Mosswake dim,
// herbs going to waste. The consist leaves and returns.
//
// SEND: one send, no route picker, no Cloud Basin, no Halt-route send.
// Costs nothing. The herbs are already at Mosswake.
// Home she comes: the return. Not LAND. Not auto. Not a second SEND.
//
// The HUD is one marks line. Opening marks 0. wait() exists, takes nothing,
// returns false.

const OPENING_MARKS = 0;
const PLACES = Object.freeze(["halt", "mosswake", "consist"]);

// The gap is a constant. SEND does not write it. Home does not write it.
const GAP = Object.freeze({ left: 42, width: 16 });

function make(state) {
  const s = state;

  function canSend() {
    if (s.stopped) return false;
    if (s.sent) return false;
    if (s.consistAt !== "halt") return false;
    return true;
  }

  function canHome() {
    if (s.stopped) return false;
    if (!s.sent) return false;
    if (s.homed) return false;
    if (s.consistAt !== "mosswake") return false;
    return true;
  }

  function notice(place) {
    if (place === "halt") {
      return {
        place: "halt",
        canDo: null,
        verb: null,
        inProcess: "The Halt is awake.",
        blocked: "This sitting does not light the lamp. The Halt already holds.",
        writing: "The Halt holds. The loops leave from here.",
      };
    }

    if (place === "mosswake") {
      if (!s.sent) {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          inProcess: null,
          blocked: "No way to move them.",
          writing: "Mosswake. Herbs going to waste.",
        };
      }
      if (!s.homed) {
        return {
          place: "mosswake",
          canDo: null,
          verb: null,
          inProcess: "The consist is here.",
          blocked: null,
          writing: "Mosswake. The herbs can move.",
        };
      }
      return {
        place: "mosswake",
        canDo: null,
        verb: null,
        inProcess: "The run came home.",
        blocked: null,
        writing: "Mosswake. The herbs went home.",
      };
    }

    if (place === "consist") {
      if (!s.sent) {
        return {
          place: "consist",
          canDo: "SEND.",
          verb: "send",
          inProcess: "Home.",
          blocked: null,
          writing: "The consist is home. Mosswake has no way to move the herbs.",
        };
      }
      if (!s.homed) {
        return {
          place: "consist",
          canDo: "Home she comes.",
          verb: "home",
          inProcess: "At Mosswake.",
          blocked: null,
          writing: "The run is at Mosswake.",
        };
      }
      return {
        place: "consist",
        canDo: null,
        verb: null,
        inProcess: "Home.",
        blocked: "One SEND. The promise is kept.",
        writing: "Home she comes.",
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
    s.sent = true;
    s.consistAt = "mosswake";
    s.herbsWasting = false;
    s.herbsOnMoss = false;
    s.herbsOnConsist = true;
    return true;
  }

  function commitHome() {
    if (!canHome()) return false;
    s.homed = true;
    s.consistAt = "halt";
    s.herbsOnConsist = false;
    s.herbsHome = true;
    s.stopped = true;
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
    if (n.verb === "send") return commitSend();
    if (n.verb === "home") return commitHome();
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
    get herbsWasting() { return s.herbsWasting; },
    get herbsOnMoss() { return s.herbsOnMoss; },
    get herbsOnConsist() { return s.herbsOnConsist; },
    get herbsHome() { return s.herbsHome; },
    get consistAt() { return s.consistAt; },
    get sent() { return s.sent; },
    get homed() { return s.homed; },
    get gap() { return { left: s.gap.left, width: s.gap.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    canSend,
    canHome,
    commitSend,
    commitHome,
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
    herbsWasting: true,
    herbsOnMoss: true,
    herbsOnConsist: false,
    herbsHome: false,
    consistAt: "halt",
    sent: false,
    homed: false,
    gap: { left: GAP.left, width: GAP.width },
    stopped: false,
    posted: null,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.MosswakeLoop = api;

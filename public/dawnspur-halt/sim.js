"use strict";

// SKYRAIL Reclamation — CFD-205, Dawnspur Halt — Come home.
// Spec: docs/cfd-205-halt-beat.md (SIGNED — David, 2026-08-30, Superheavy named it).
// Recut of live c1b66ee5 / 7aa764fa / 678075c0. Same path. The walk.
// One NEW system: the walk. One live can-do at a time. Work notices stay.
// Four buildings stay buildings. Home writing that shipped stays.
// Works stays. Foundry is work one. No Halt send. Not a recut of
// /dawnspur-site/. Not a recut of storm. Not a new sibling. Not louder Home copy.
//
// Four buildings. Always buttons. Tapping one posts the station board: can do /
// in process / blocked. Dead jobs still post. Not scenery divs. Not grey squares.
// CAST is a line on the Foundry notice, not a second brick. No Mara VO. No ?.
//
// Beat 0: one tap that matters. Beat 1: first thing we light the lamp.
// Beat 5: the reason it matters is the line — this sitting does not SEND.
// Beat 7: home she comes. Geology: train, glasshouse, island riding high are
// the same act. Heat not Air. Held island is not a fuel bill.
//
// The walk: lamp, then SITE, then Come home, then CAST, then none.
// SITE waits on a station that's awake. CAST waits on the consist.
//
// SITE: marks open the work, scaffold, empty bill. Marks open SITE only.
// LAND: the inherited loop as sat arrives. Arrival, not a send. Dark until SITE.
// CAST: OPEN and CAST are one commit. Bill full and terrace food in → Foundry
// live, food into the town, one Heat step on already-reached ground. The rim
// does not move. R9: Heat is not Air. After CAST: The Halt holds.
//
// Food is already on the glass. There is no carry. The HUD is one marks line.
// wait() exists, takes nothing, returns false.

const SITE_PRICE = 3;
const OPENING_MARKS = 3;
const BILL_NEED = 1;
const PANES_LOOK = 2;
const BUILDINGS = Object.freeze(["lamp", "terrace", "foundry", "consist"]);

// The rim is a constant. CAST does not write it. SITE does not write it.
const RIM = Object.freeze({ left: 78, width: 18 });

function make(state) {
  const s = state;

  function canLight() {
    return !s.lampLit;
  }

  function canSite(target) {
    if (s.stopped) return false;
    if (!s.lampLit) return false;
    if (s.sited) return false;
    if (s.marks < SITE_PRICE) return false;
    if (target === "rim") return false;
    if (target != null && target !== "foundry") return false;
    return true;
  }

  function canLand() {
    if (s.stopped) return false;
    if (!s.sited) return false;
    if (!s.inbound) return false;
    return true;
  }

  function canCast() {
    if (s.stopped) return false;
    if (!s.sited) return false;
    if (s.bill < BILL_NEED) return false;
    if (!s.foodOnTerrace) return false;
    return true;
  }

  function notice(place) {
    if (place === "lamp") {
      if (!s.lampLit) {
        return {
          place: "lamp",
          canDo: "Light it.",
          verb: "light",
          inProcess: null,
          blocked: null,
          writing: "The Halt. Waiting.",
        };
      }
      return {
        place: "lamp",
        canDo: null,
        verb: null,
        inProcess: "Someone's home.",
        blocked: null,
        writing: "Someone's home. The Halt is awake.",
      };
    }

    if (place === "terrace") {
      if (s.foodOnTerrace) {
        return {
          place: "terrace",
          canDo: null,
          verb: null,
          inProcess: "Food on the terrace.",
          blocked: "Carry, tend, UP — a held island is not a fuel bill.",
          writing: "A station that feeds itself. Food already on the glass.",
        };
      }
      return {
        place: "terrace",
        canDo: null,
        verb: null,
        inProcess: "The glass held the food.",
        blocked: "Carry, tend, UP — a held island is not a fuel bill.",
        writing: "A station that feeds itself. The glass held the food.",
      };
    }

    if (place === "foundry") {
      if (!s.sited) {
        if (!s.lampLit) {
          return {
            place: "foundry",
            canDo: null,
            verb: null,
            inProcess: null,
            blocked: "SITE waits. A dark station is waiting.",
            writing: "The work that holds this ground.",
          };
        }
        return {
          place: "foundry",
          canDo: "SITE. Three marks.",
          verb: "site",
          inProcess: null,
          blocked: null,
          writing: "The work that holds this ground.",
        };
      }
      if (!s.landed) {
        return {
          place: "foundry",
          canDo: null,
          verb: null,
          inProcess: "Scaffold up. The bill is empty.",
          blocked: "CAST waits. The haul is still on the consist.",
          writing: "The work that holds this ground. Scaffold. Empty bill.",
        };
      }
      if (!s.foundry) {
        return {
          place: "foundry",
          canDo: "CAST. One Heat step. The rim holds.",
          verb: "cast",
          inProcess: "Scaffold. Bill full.",
          blocked: null,
          writing: "The work that holds this ground. The bill is full. Food is on the terrace.",
        };
      }
      return {
        place: "foundry",
        canDo: null,
        verb: null,
        inProcess: "The Halt holds.",
        blocked: null,
        writing: "The Halt holds. The ground already reached took the heat.",
      };
    }

    if (place === "consist") {
      if (!s.sited) {
        return {
          place: "consist",
          canDo: null,
          verb: null,
          inProcess: "Inbound.",
          blocked: "LAND waits. No address.",
          writing: "This is where the loops come home. Inbound.",
        };
      }
      if (!s.landed) {
        return {
          place: "consist",
          canDo: "Come home.",
          verb: "land",
          inProcess: "Inbound.",
          blocked: null,
          writing: "This is where the loops come home.",
        };
      }
      return {
        place: "consist",
        canDo: null,
        verb: null,
        inProcess: "Home.",
        blocked: "This board does not send.",
        writing: "Home. This is where the loops come home.",
      };
    }

    return null;
  }

  function postNotice(place) {
    if (BUILDINGS.indexOf(place) < 0) return false;
    s.posted = place;
    return true;
  }

  function postedNotice() {
    if (!s.posted) return null;
    return notice(s.posted);
  }

  function commitLight() {
    if (!canLight()) return false;
    s.lampLit = true;
    return true;
  }

  function commitSite(target) {
    if (!canSite(target)) return false;
    s.marks -= SITE_PRICE;
    s.sited = true;
    s.scaffold = true;
    s.billPosted = true;
    return true;
  }

  function commitLand() {
    if (!canLand()) return false;
    s.inbound = false;
    s.landed = true;
    s.bill = BILL_NEED;
    s.panes = PANES_LOOK;
    return true;
  }

  function commitCast() {
    if (!canCast()) return false;
    s.foodOnTerrace = false;
    s.foodInTown = true;
    s.foundry = true;
    s.heatStep = 1;
    s.stopped = true;
    return true;
  }

  function commitPosted() {
    const n = postedNotice();
    if (!n || !n.verb) return false;
    if (n.verb === "light") return commitLight();
    if (n.verb === "site") return commitSite("foundry");
    if (n.verb === "land") return commitLand();
    if (n.verb === "cast") return commitCast();
    return false;
  }

  function wait() {
    return false;
  }

  function buildings() {
    return BUILDINGS.slice();
  }

  function liveCanDo() {
    for (let i = 0; i < BUILDINGS.length; i++) {
      const n = notice(BUILDINGS[i]);
      if (n && n.canDo) return { place: n.place, verb: n.verb, canDo: n.canDo };
    }
    return null;
  }

  return {
    get marks() { return s.marks; },
    get sitePrice() { return SITE_PRICE; },
    get openingMarks() { return OPENING_MARKS; },
    get billNeed() { return BILL_NEED; },
    get panesLook() { return PANES_LOOK; },
    get lampLit() { return s.lampLit; },
    get foodOnTerrace() { return s.foodOnTerrace; },
    get foodInTown() { return s.foodInTown; },
    get sited() { return s.sited; },
    get scaffold() { return s.scaffold; },
    get billPosted() { return s.billPosted; },
    get bill() { return s.bill; },
    get panes() { return s.panes; },
    get inbound() { return s.inbound; },
    get landed() { return s.landed; },
    get foundry() { return s.foundry; },
    get heatStep() { return s.heatStep; },
    get rim() { return { left: s.rim.left, width: s.rim.width }; },
    get stopped() { return s.stopped; },
    get posted() { return s.posted; },
    canLight,
    canSite,
    canLand,
    canCast,
    commitLight,
    commitSite,
    commitLand,
    commitCast,
    commitPosted,
    postNotice,
    notice,
    postedNotice,
    wait,
    buildings,
    liveCanDo,
  };
}

function createBoard(opts) {
  const marks = opts && Number.isInteger(opts.marks) ? opts.marks : OPENING_MARKS;
  return make({
    marks: marks,
    lampLit: false,
    foodOnTerrace: true,
    foodInTown: false,
    sited: false,
    scaffold: false,
    billPosted: false,
    bill: 0,
    panes: 0,
    inbound: true,
    landed: false,
    foundry: false,
    heatStep: 0,
    rim: { left: RIM.left, width: RIM.width },
    stopped: false,
    posted: null,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.DawnspurHalt = api;

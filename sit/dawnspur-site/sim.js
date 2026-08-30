"use strict";

// SKYRAIL Reclamation — CFD-205, the site sitting.
// Spec: docs/cfd-205-beat.md (SIGNED — David, 2026-08-30, word "Signed.").
// One NEW system: Works. Foundry is work one. No Halt send on this board.
//
// SITE: marks open the work, scaffold, bill on the frame. Marks open SITE only.
// LAND: the inherited loop as sat arrives; cargo lands on the frame; the bill
// fills. Arrival, not a send. Dark until SITE — a haul with no address does
// not fill the bill.
// CAST: OPEN and CAST are one commit. Bill full and terrace food in → Foundry
// live, food into the town, one Heat step on already-reached ground. The rim
// does not move. R9: Heat is not Air.
//
// Food is already on the terrace. There is no carry. The HUD is one marks
// line. The bill lives on the frame. Panes are the look, not a stock.
// wait() exists, takes nothing, returns false.

const SITE_PRICE = 3;
const OPENING_MARKS = 3;
const BILL_NEED = 1;
const PANES_LOOK = 2;

// The rim is a constant. CAST does not write it. SITE does not write it.
const RIM = Object.freeze({ left: 78, width: 18 });

const SITE_SENTENCE = "The work is open. The scaffold is up. The bill is on the frame.";
const LAND_SENTENCE = "The run came back with an address. The panes are on the frame.";
const CAST_SENTENCE = "The Foundry is live. The terrace food went into the town. The ground already reached took one heat.";

function make(state) {
  const s = state;

  function canSite(target) {
    if (s.stopped) return false;
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

  function litJobs() {
    const jobs = [];
    if (canSite()) jobs.push("site");
    if (canLand()) jobs.push("land");
    if (canCast()) jobs.push("cast");
    return jobs;
  }

  function commitSite(target) {
    if (!canSite(target)) return false;
    s.marks -= SITE_PRICE;
    s.sited = true;
    s.scaffold = true;
    s.billPosted = true;
    s.runSentence = SITE_SENTENCE;
    return true;
  }

  function commitLand() {
    if (!canLand()) return false;
    s.inbound = false;
    s.landed = true;
    s.bill = BILL_NEED;
    s.panes = PANES_LOOK;
    s.runSentence = LAND_SENTENCE;
    return true;
  }

  function commitCast() {
    if (!canCast()) return false;
    s.foodOnTerrace = false;
    s.foodInTown = true;
    s.foundry = true;
    s.heatStep = 1;
    s.stopped = true;
    s.runSentence = CAST_SENTENCE;
    s.endSentence = CAST_SENTENCE;
    return true;
  }

  function wait() {
    return false;
  }

  return {
    get marks() { return s.marks; },
    get sitePrice() { return SITE_PRICE; },
    get openingMarks() { return OPENING_MARKS; },
    get billNeed() { return BILL_NEED; },
    get panesLook() { return PANES_LOOK; },
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
    get runSentence() { return s.runSentence; },
    get endSentence() { return s.endSentence; },
    canSite,
    canLand,
    canCast,
    commitSite,
    commitLand,
    commitCast,
    wait,
    litJobs,
  };
}

function createBoard(opts) {
  const marks = opts && Number.isInteger(opts.marks) ? opts.marks : OPENING_MARKS;
  return make({
    marks: marks,
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
    runSentence: null,
    endSentence: null,
  });
}

const api = { createBoard };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.DawnspurSite = api;

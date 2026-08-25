"use strict";

// SKYRAIL Reclamation — CFD-183 scale sitting, RECUT.
// Spec: the TOP section of docs/cfd-183-beat.md (SIGNED — David, 2026-08-25,
// "signed - proceed with the implementer"). Pure build plus the triangle's
// tending leg, non-lethal. The greenhouse stands at level 1 on the terrace
// off A, top at 4, and no hand but the player's moves anything: no level is
// ever lost, nothing shrinks, nothing dies, nothing moves with wall time.
// The terrace's ground carries a reserve, 4 down to 0, floored. Every CARRY
// FOOD pays the level (+1..+4) in full at every reserve, bare included — the
// drawn ground rides fine in clear weather and gives no sign — and draws the
// reserve one step. TEND is REPAIR recut into the tending run: it rides to A
// like every job, earns nothing, spends 1 mark, gives the ground back one
// step, and lights only below full. MOSSWAKE +3 as played: costs 1, pays 3,
// lit below full, armed once per carry. UP is the player's hand in the HUD —
// 3, then 4, then 5 marks, instant, spent on the spot with no way back.
// The world's turn is clear weather this sitting: wait() stands, takes
// nothing, and returns false so a caller can never mistake the calm for a
// handled event. No clock calls it. Topped at 4 is the one stop, and the
// end-sentence reads the ground the sitting leaves behind.

let LIVE = { name: "Skyrail Boards", commit: "local" };
if (typeof require === "function") {
  try { LIVE = require("./live-build-info.json"); } catch (e) {}
}

const UP_PRICE = { 1: 3, 2: 4, 3: 5 };
const TOP = 4;
const RESERVE_FULL = 4;

const END_FULL = "The terrace is topped and the ground is full. Whatever weather comes, something is banked to meet it.";
const END_DRAWN = "The terrace is topped on drawn ground. It rides fine in clear weather. The reserve left here is the next sitting's weather bill.";

function make(state) {
  const s = state;

  function topped() { return s.level >= TOP; }

  function canCarry() {
    // Always lit short of the top: at every reserve, bare included, the
    // carry pays full and the ground gives no sign. No deadlock exists short
    // of the top — marks can always be earned toward UP.
    return !topped();
  }
  function canTend() {
    // Lit only below full with a mark in hand. Earns nothing, holds the line.
    return !topped() && s.reserve < RESERVE_FULL && s.marks >= 1;
  }
  function canB() {
    // Off-board ground: lit below full, armed once per carry.
    return !topped() && s.reserve < RESERVE_FULL && s.marks >= 1 && s.bArmed;
  }
  function canUp() {
    return !topped() && s.marks >= UP_PRICE[s.level];
  }
  function litJobs() {
    const jobs = [];
    if (canCarry()) jobs.push("carry");
    if (canB()) jobs.push("B");
    if (canTend()) jobs.push("tend");
    if (canUp()) jobs.push("up");
    return jobs;
  }
  function commitCarry() {
    if (!canCarry()) return false;
    s.marks += s.level;                     // full pay, at every reserve
    s.reserve = Math.max(0, s.reserve - 1); // draws one step, floors at 0
    s.bArmed = true;                        // a carry arms one Mosswake
    return true;
  }
  function commitB() {
    if (!canB()) return false;
    s.marks -= 1;
    s.marks += 3;
    s.bArmed = false;                       // used: dark until the next carry
    s.haul = true;
    return true;
  }
  function commitTend() {
    if (!canTend()) return false;
    s.marks -= 1;                           // spends 1, earns nothing
    s.reserve += 1;                         // gives back exactly one step
    return true;
  }
  function commitUp() {
    if (!canUp()) return false;
    s.marks -= UP_PRICE[s.level];           // spent on the spot, no way back
    s.level += 1;
    return true;
  }
  function wait() {
    // The world's turn: clear weather this sitting. It stands, takes
    // nothing, and returns false — a caller can never mistake the calm for a
    // handled event. The reckoning is the next sitting's.
    return false;
  }
  return {
    get marks() { return s.marks; },
    get level() { return s.level; },
    get reserve() { return s.reserve; },
    get topped() { return topped(); },
    get hearth() { return s.hearth; },
    get banked() { return !!s.banked; },
    get haul() { return !!s.haul; },
    get carryYield() { return canCarry() ? s.level : null; },
    get upPrice() { return topped() ? null : UP_PRICE[s.level]; },
    get endSentence() {
      if (!topped()) return null;
      return s.reserve >= RESERVE_FULL ? END_FULL : END_DRAWN;
    },
    litJobs,
    canCarry,
    canB,
    canTend,
    canUp,
    commitCarry,
    commitB,
    commitTend,
    commitUp,
    wait,
  };
}

function createBoard(opts) {
  if (opts && opts.fresh) {
    // The opening: the greenhouse stands at level 1 on full ground; the
    // keel-fire bank and hearth stand from the heat sitting, scenery only.
    return make({
      marks: 0,
      level: 1,
      reserve: RESERVE_FULL,
      bArmed: false,
      haul: false,
      banked: true,
      hearth: "held",
    });
  }
  // Default: one carry in. Reachable — fresh() + commitCarry() lands exactly
  // here, and the test suite asserts that equivalence.
  return make({
    marks: 1,
    level: 1,
    reserve: 3,
    bArmed: true,
    haul: false,
    banked: true,
    hearth: "held",
  });
}

function buildInfo() {
  return LIVE;
}

const api = { createBoard, buildInfo };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.DawnspurScale = api;

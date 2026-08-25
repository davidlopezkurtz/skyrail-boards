"use strict";

// SKYRAIL Reclamation — CFD-183 scale sitting.
// The heat sitting's step has rooted: the greenhouse stands at level 1 on the
// terrace off A, top at 4. One new verb: SCALE. UP is the player's hand,
// through the HUD — marks price it (3 / 4 / 5), spent on the spot, never
// refunded in any direction. DOWN is the world's hand, at the wait: on held
// ground the greenhouse stands; on wrecked ground it steps down one level;
// from level 1, down is dead. Fallen or topped, the sitting stops.
// The civic loop runs as played: CARRY FOOD pays the level and thins the pad,
// MOSSWAKE +3 once per wreck, REPAIR 1 mends. The keel-fire bank and hearth
// stand from the heat sitting as scenery — scale neither reads nor writes them.

let LIVE = { name: "Skyrail Boards", commit: "local" };
if (typeof require === "function") {
  try { LIVE = require("./live-build-info.json"); } catch (e) {}
}

const UP_PRICE = { 1: 3, 2: 4, 3: 5 };
const TOP = 4;

function make(state) {
  const s = state;

  function dead() { return !s.alive; }
  function topped() { return s.alive && s.level >= TOP; }
  function stopped() { return dead() || topped(); }

  function canCarry() {
    // The greenhouse pays its carry while it stands — wrecked ground included:
    // broke on wrecked ground, one carry buys the repair. The race is the sitting.
    return !stopped();
  }
  function canB() {
    return !stopped() && !s.heldA && s.marks >= 1 && s.bUsed === 0;
  }
  function canHold() {
    return !stopped() && !s.heldA && s.marks >= 1;
  }
  function canUp() {
    if (stopped()) return false;
    return s.level < TOP && s.marks >= UP_PRICE[s.level];
  }
  function litJobs() {
    const jobs = [];
    if (canCarry()) jobs.push("carry");
    if (canB()) jobs.push("B");
    if (canHold()) jobs.push("hold");
    if (canUp()) jobs.push("up");
    return jobs;
  }
  function commitCarry() {
    if (!canCarry()) return false;
    if (s.heldA) s.bUsed = 0; // fresh ground wrecked: a new wreck, one new B
    s.heldA = false;
    s.marks += s.level;
    return true;
  }
  function commitB() {
    if (!canB()) return false;
    s.marks = Math.max(0, s.marks - 1) + 3;
    s.bUsed += 1;
    s.haul = true;
    return true;
  }
  function commitHold() {
    if (!canHold()) return false;
    s.marks -= 1;
    s.heldA = true;
    return true;
  }
  function commitUp() {
    if (!canUp()) return false;
    s.marks -= UP_PRICE[s.level];
    s.level += 1;
    return true;
  }
  function wait() {
    // The world's turn. On held ground the greenhouse stands; on wrecked
    // ground it steps down one level; from level 1, down is dead.
    // Nothing refunds — not a level lost, not a greenhouse fallen.
    if (stopped()) return false;
    if (s.heldA) return true;
    s.level -= 1;
    if (s.level < 1) { s.level = 0; s.alive = false; }
    return true;
  }
  return {
    get marks() { return s.marks; },
    get heldA() { return s.heldA; },
    get level() { return s.level; },
    get alive() { return s.alive; },
    get topped() { return topped(); },
    get stopped() { return stopped(); },
    get hearth() { return s.hearth; },
    get banked() { return !!s.banked; },
    get haul() { return !!s.haul; },
    get carryYield() { return canCarry() ? s.level : null; },
    get upPrice() { return (!stopped() && s.level < TOP) ? UP_PRICE[s.level] : null; },
    litJobs,
    canCarry,
    canB,
    canHold,
    canUp,
    commitCarry,
    commitB,
    commitHold,
    commitUp,
    wait,
  };
}

function createBoard(opts) {
  if (opts && opts.fresh) {
    // The opening: the greenhouse has rooted at level 1 on held ground; the
    // keel-fire bank and hearth stand from the heat sitting, scenery only.
    return make({
      marks: 0,
      heldA: true,
      level: 1,
      alive: true,
      bUsed: 0,
      haul: false,
      banked: true,
      hearth: "held",
    });
  }
  // Default: one carry in. Reachable — fresh() + commitCarry() lands exactly
  // here, and the test suite asserts that equivalence.
  return make({
    marks: 1,
    heldA: false,
    level: 1,
    alive: true,
    bUsed: 0,
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

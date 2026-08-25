"use strict";

// SKYRAIL Reclamation — CFD-176 starve-or-feed.
// Path to first WARM stays GOODS → B → HOLD → WARM.
// After that: charge, leak, feed / strip / wait. HOLD never feeds the core.

let LIVE = { name: "Skyrail Boards", commit: "local" };
if (typeof require === "function") {
  try { LIVE = require("./live-build-info.json"); } catch (e) {}
}

function make(state) {
  const s = state;
  function canGoods() {
    if (s.core === "full" || s.core === "dead" || s.core === "held") return false;
    if (s.core === "dim") return s.heldA;
    return s.phase === "goods" && s.heldA;
  }
  function canB() {
    if (s.core === "full" || s.core === "dead" || s.core === "held") return false;
    if (s.core === "dim") return s.marks >= 1 && s.bUsed === 0;
    return s.phase === "b" && s.marks >= 1 && s.bUsed === 0;
  }
  function canHold() {
    if (s.core === "held" || s.core === "dead") return false;
    if (s.core === "off") return s.phase === "hold" && !s.heldA && s.marks >= 1;
    return !s.heldA && s.marks >= 1;
  }
  function canWarm() {
    if (s.core === "dim") return s.marks >= 1;
    if (s.core === "full" || s.core === "dead" || s.core === "held") return false;
    return s.phase === "warm" && s.heldA && s.marks >= 1;
  }
  function litJobs() {
    const jobs = [];
    if (canGoods()) jobs.push("goods");
    if (canB()) jobs.push("B");
    if (canHold()) jobs.push("hold");
    if (canWarm()) jobs.push("warm");
    return jobs;
  }
  function commitGoods() {
    if (!canGoods()) return false;
    s.heldA = false;
    if (s.core === "dim") {
      s.core = "dead";
      s.marks += 1;
      s.phase = "dead";
      return true;
    }
    s.marks += 1;
    s.phase = "b";
    return true;
  }
  function commitB() {
    if (!canB()) return false;
    s.marks = Math.max(0, s.marks - 1) + 3;
    s.heldA = false;
    s.bUsed += 1;
    s.haul = true;
    if (s.core === "dim") {
      s.core = "dead";
      s.phase = "dead";
      return true;
    }
    s.phase = "hold";
    return true;
  }
  function commitHold() {
    if (!canHold()) return false;
    s.marks -= 1;
    s.heldA = true;
    if (s.core === "off") s.phase = "warm";
    return true;
  }
  function commitWarm() {
    if (!canWarm()) return false;
    s.marks -= 1;
    s.heldA = true;
    if (s.core === "dim") {
      s.core = "held";
      s.phase = "held";
      return true;
    }
    s.core = "full";
    s.phase = "charged";
    return true;
  }
  function tickLeak() {
    if (s.core !== "full") return false;
    s.core = "dim";
    s.phase = "leak";
    return true;
  }
  function tickDie() {
    if (s.core !== "dim") return false;
    s.core = "dead";
    s.phase = "dead";
    return true;
  }
  return {
    get marks() { return s.marks; },
    get heldA() { return s.heldA; },
    get core() { return s.core; },
    get phase() { return s.phase; },
    get haul() { return !!s.haul; },
    get warmed() { return s.core === "full" || s.core === "held"; },
    litJobs,
    canGoods,
    canB,
    canHold,
    canWarm,
    commitGoods,
    commitB,
    commitHold,
    commitWarm,
    tickLeak,
    tickDie,
  };
}

function createBoard(opts) {
  if (opts && opts.fresh) {
    return make({
      marks: 0,
      heldA: true,
      core: "off",
      bUsed: 0,
      phase: "goods",
      haul: false,
    });
  }
  return make({
    marks: 1,
    heldA: false,
    core: "off",
    bUsed: 0,
    phase: "b",
    haul: false,
  });
}

function buildInfo() {
  return LIVE;
}

const api = { createBoard, buildInfo };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.Dawnspur = api;

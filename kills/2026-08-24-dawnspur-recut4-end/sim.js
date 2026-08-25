"use strict";

// SKYRAIL Reclamation — CFD-173 recut 4 board.
// Path: GOODS → B → HOLD → WARM. WARM 1 is the sink. One B per wreck.
// Never LEAVE-only with marks. No pass sentence. No stakes dress.

let LIVE = { name: "Skyrail Boards", commit: "local" };
if (typeof require === "function") {
  try { LIVE = require("./live-build-info.json"); } catch (e) {}
}

function make(state) {
  const s = state;
  function canGoods() {
    return s.phase === "goods" && s.heldA;
  }
  function canB() {
    return s.phase === "b" && s.marks >= 1 && s.bUsed === 0;
  }
  function canHold() {
    return s.phase === "hold" && !s.heldA && s.marks >= 1;
  }
  function canWarm() {
    return s.phase === "warm" && s.heldA && s.marks >= 1 && !s.warmed;
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
    s.phase = "hold";
    return true;
  }
  function commitHold() {
    if (!canHold()) return false;
    s.marks -= 1;
    s.heldA = true;
    s.phase = "warm";
    return true;
  }
  function commitWarm() {
    if (!canWarm()) return false;
    s.marks -= 1;
    s.heldA = true;
    s.warmed = true;
    s.bUsed = 0;
    s.phase = "done";
    if (s.marks >= 1 && s.heldA) s.phase = "goods";
    return true;
  }
  return {
    get marks() { return s.marks; },
    get heldA() { return s.heldA; },
    get warmed() { return s.warmed; },
    get phase() { return s.phase; },
    get haul() { return !!s.haul; },
    litJobs,
    canGoods,
    canB,
    canHold,
    canWarm,
    commitGoods,
    commitB,
    commitHold,
    commitWarm,
  };
}

function createBoard(opts) {
  if (opts && opts.fresh) {
    return make({
      marks: 0,
      heldA: true,
      warmed: false,
      bUsed: 0,
      phase: "goods",
      haul: false,
    });
  }
  // Default: first marks ≥ 1 frame on recut 4 (after GOODS, B is the lit job).
  return make({
    marks: 1,
    heldA: false,
    warmed: false,
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

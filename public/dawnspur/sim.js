"use strict";

// SKYRAIL Reclamation — CFD-176 sitting.
// Path to first WARM stays GOODS → B → HOLD → WARM.
// WARM banks heat in the stone and puts one step on open ground.
// Marks do not pay WARM. After return, wait. The step can go. The bank stays.

let LIVE = { name: "Skyrail Boards", commit: "local" };
if (typeof require === "function") {
  try { LIVE = require("./live-build-info.json"); } catch (e) {}
}

function make(state) {
  const s = state;

  function canGoods() {
    if (s.banked) return false;
    return s.phase === "goods" && s.heldA;
  }
  function canB() {
    if (s.banked) return false;
    return s.phase === "b" && s.marks >= 1 && s.bUsed === 0;
  }
  function canHold() {
    if (s.banked) return false;
    return s.phase === "hold" && !s.heldA && s.marks >= 1;
  }
  function canWarm() {
    if (s.banked) return false;
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
    s.heldA = true;
    s.banked = true;
    s.hearth = "held";
    s.step = "out";
    s.phase = "sent";
    return true;
  }
  function wait() {
    if (!s.banked) return false;
    if (s.step === "out") s.step = "gone";
    s.hearth = "held";
    s.heldA = true;
    s.phase = "sat";
    return true;
  }
  return {
    get marks() { return s.marks; },
    get heldA() { return s.heldA; },
    get banked() { return !!s.banked; },
    get hearth() { return s.hearth; },
    get step() { return s.step; },
    get phase() { return s.phase; },
    get haul() { return !!s.haul; },
    get warmed() { return !!s.banked; },
    litJobs,
    canGoods,
    canB,
    canHold,
    canWarm,
    commitGoods,
    commitB,
    commitHold,
    commitWarm,
    wait,
  };
}

function createBoard(opts) {
  if (opts && opts.fresh) {
    return make({
      marks: 0,
      heldA: true,
      banked: false,
      hearth: "off",
      step: "off",
      bUsed: 0,
      phase: "goods",
      haul: false,
    });
  }
  return make({
    marks: 1,
    heldA: false,
    banked: false,
    hearth: "off",
    step: "off",
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

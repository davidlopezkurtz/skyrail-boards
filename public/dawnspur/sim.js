"use strict";

// SKYRAIL Reclamation — CFD-176 on the CFD-173 recut 4 path.
// First WARM still GOODS → B → HOLD → WARM. Then dest ticks (leak), WARM refills once.
// Live start (do not deploy over): index 35e6f1cd… / sim 1c6655fc…
// No pass sentence. No stakes nouns. No furnace. No field shader.

let LIVE = { name: "Skyrail Boards", commit: "local" };
if (typeof require === "function") {
  try { LIVE = require("./live-build-info.json"); } catch (e) {}
}

function make(state) {
  const s = state;
  function canGoods() {
    return s.phase === "goods" && s.heldA && s.core === "none";
  }
  function canB() {
    return s.phase === "b" && s.marks >= 1 && s.bUsed === 0;
  }
  function canHold() {
    if (s.heldA || s.marks < 1) return false;
    if (s.phase === "hold" && s.core === "none") return true;
    if (s.core !== "none") return true;
    return false;
  }
  function canWarm() {
    if (s.marks < 1) return false;
    if (s.phase === "warm" && s.heldA && s.core === "none") return true;
    if (s.phase === "leak" && s.core === "dim") return true;
    return false;
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
    if (s.core === "none") s.phase = "warm";
    else if (s.core === "dim") s.phase = "leak";
    else s.phase = "charged";
    return true;
  }
  function commitWarm() {
    if (!canWarm()) return false;
    s.marks -= 1;
    s.heldA = true;
    s.warmed = true;
    s.core = "held";
    s.drive = "on";
    if (s.phase === "leak") {
      s.fed = true;
      s.phase = "fed";
    } else {
      s.phase = "charged";
    }
    return true;
  }
  function tick() {
    if (s.core !== "held" || s.fed) return false;
    s.core = "dim";
    s.drive = "fade";
    s.phase = "leak";
    return true;
  }
  return {
    get marks() { return s.marks; },
    get heldA() { return s.heldA; },
    get warmed() { return s.warmed; },
    get phase() { return s.phase; },
    get haul() { return !!s.haul; },
    get core() { return s.core; },
    get drive() { return s.drive; },
    get fed() { return !!s.fed; },
    litJobs,
    canGoods,
    canB,
    canHold,
    canWarm,
    commitGoods,
    commitB,
    commitHold,
    commitWarm,
    tick,
  };
}

function freshState() {
  return {
    marks: 0,
    heldA: true,
    warmed: false,
    bUsed: 0,
    phase: "goods",
    haul: false,
    core: "none",
    drive: "none",
    fed: false,
  };
}

function createBoard(opts) {
  if (opts && opts.fresh) {
    return make(freshState());
  }
  // Default: first marks ≥ 1 frame on recut 4 (after GOODS, B is the lit job).
  return make({
    marks: 1,
    heldA: false,
    warmed: false,
    bUsed: 0,
    phase: "b",
    haul: false,
    core: "none",
    drive: "none",
    fed: false,
  });
}

function buildInfo() {
  return LIVE;
}

const api = { createBoard, buildInfo };
if (typeof module === "object" && module.exports) module.exports = api;
if (typeof globalThis !== "undefined") globalThis.Dawnspur = api;

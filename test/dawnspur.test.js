"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const Dawnspur = require("../public/dawnspur/sim.js");

// Live sit this beat starts from. Do not deploy over it.
const LIVE_INDEX = "35e6f1cd1963d18e79870bfee0afbc08fc6a34340178a03b340b5306cb44b83f";
const LIVE_SIM = "1c6655fc102a9e2d05a68364a18ddf203a697b6875bc21bf7549f3bcbece6328";

function pathToFirstWarm() {
  const b = Dawnspur.createBoard({ fresh: true });
  assert.ok(b.commitGoods());
  assert.ok(b.commitB());
  assert.ok(b.commitHold());
  return b;
}

test("pin live sit", () => {
  assert.equal(LIVE_INDEX.length, 64);
  assert.equal(LIVE_SIM.length, 64);
  assert.equal(typeof Dawnspur.createBoard, "function");
  assert.equal(typeof Dawnspur.buildInfo, "function");
  assert.equal(Dawnspur.buildInfo().name, "Skyrail Boards");
});

test("marks ≥ 1 lights a job", () => {
  const b = Dawnspur.createBoard();
  assert.ok(b.marks >= 1);
  assert.ok(b.litJobs().length >= 1);

  const f = Dawnspur.createBoard({ fresh: true });
  assert.ok(f.commitGoods());
  assert.ok(f.marks >= 1);
  assert.ok(f.litJobs().length >= 1);
  assert.ok(f.commitB());
  assert.ok(f.marks >= 1);
  assert.ok(f.litJobs().length >= 1);
  assert.ok(f.commitHold());
  assert.ok(f.marks >= 1);
  assert.deepEqual(f.litJobs(), ["warm"]);
});

test("one B per wreck", () => {
  const b = Dawnspur.createBoard();
  assert.ok(b.canB());
  assert.ok(b.commitB());
  assert.equal(b.canB(), false);
  assert.equal(b.commitB(), false);
  assert.ok(!b.litJobs().includes("B"));
});

test("GOODS → B → HOLD → WARM lights in order", () => {
  const b = Dawnspur.createBoard({ fresh: true });
  assert.deepEqual(b.litJobs(), ["goods"]);
  assert.ok(b.commitGoods());
  assert.deepEqual(b.litJobs(), ["B"]);
  assert.ok(b.commitB());
  assert.deepEqual(b.litJobs(), ["hold"]);
  assert.ok(b.commitHold());
  assert.deepEqual(b.litJobs(), ["warm"]);
  assert.ok(b.commitWarm());
  assert.equal(b.warmed, true);
  assert.equal(b.heldA, true);
});

test("charge holds a core, leftover GOODS is dead, dest tick leaks, WARM refills", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.marks, 1);
  assert.equal(b.core, "held");
  assert.equal(b.drive, "on");
  assert.equal(b.heldA, true);
  assert.deepEqual(b.litJobs(), []);
  assert.equal(b.canGoods(), false);
  assert.equal(b.canHold(), false);
  assert.equal(b.canWarm(), false);
  assert.equal(b.canB(), false);

  assert.ok(b.tick());
  assert.equal(b.core, "dim");
  assert.equal(b.drive, "fade");
  assert.equal(b.heldA, true);
  assert.deepEqual(b.litJobs(), ["warm"]);
  assert.equal(b.canGoods(), false);
  assert.equal(b.canHold(), false);
  assert.equal(b.canB(), false);

  assert.ok(b.commitWarm());
  assert.equal(b.marks, 0);
  assert.equal(b.core, "held");
  assert.equal(b.drive, "on");
  assert.equal(b.fed, true);
  assert.equal(b.heldA, true);
  assert.deepEqual(b.litJobs(), []);
  assert.equal(b.tick(), false);
  assert.equal(b.core, "held");
  assert.equal(b.drive, "on");
});

test("HOLD does not refill heat; pad thin is not core dim", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.ok(b.tick());
  assert.equal(b.core, "dim");
  assert.equal(b.heldA, true);
  assert.equal(b.canHold(), false);
  assert.equal(b.commitHold(), false);
  assert.equal(b.core, "dim");
  assert.deepEqual(b.litJobs(), ["warm"]);
});

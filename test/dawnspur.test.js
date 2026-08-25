"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const Dawnspur = require("../public/dawnspur/sim.js");

// Live kill this sitting must not overwrite. Do not deploy.
const LIVE_INDEX = "bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59";
const LIVE_SIM = "395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c";

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

test("WARM does not spend a mark", () => {
  const b = pathToFirstWarm();
  const before = b.marks;
  assert.ok(before >= 1);
  assert.ok(b.commitWarm());
  assert.equal(b.marks, before);
});

test("leftover GOODS is not the next lit job", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.canGoods(), false);
  assert.ok(!b.litJobs().includes("goods"));
  assert.ok(b.wait());
  assert.equal(b.canGoods(), false);
  assert.ok(!b.litJobs().includes("goods"));
});

test("dest bank holds after wait; it does not die", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.banked, true);
  assert.equal(b.heldA, true);
  assert.equal(b.hearth, "held");
  assert.equal(b.step, "out");
  assert.ok(b.wait());
  assert.equal(b.banked, true);
  assert.equal(b.heldA, true);
  assert.equal(b.hearth, "held");
  assert.notEqual(b.hearth, "dim");
  assert.ok(b.wait());
  assert.equal(b.banked, true);
  assert.equal(b.hearth, "held");
});

test("HOLD does not refill heat", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.equal(b.canHold(), false);
  assert.equal(b.commitHold(), false);
  assert.equal(b.banked, true);
  assert.ok(b.wait());
  assert.equal(b.canHold(), false);
  assert.equal(b.commitHold(), false);
  assert.equal(b.banked, true);
  assert.equal(b.hearth, "held");
});

test("after wait, WARM is not the only lit job", () => {
  const b = pathToFirstWarm();
  assert.ok(b.commitWarm());
  assert.ok(!b.litJobs().includes("goods"));
  assert.ok(b.wait());
  assert.notDeepEqual(b.litJobs(), ["warm"]);
  assert.equal(b.canWarm(), false);
  assert.equal(b.step, "gone");
});

"use strict";

// CFD-199's standing answer, and CFD-148's complaint answered in advance.
//
// The PWA's equivalent gate shipped without a test, and CFD-148 is on the board
// because of it: "a gate whose whole job is catching silent things can regress
// silently." So the boards checker's decision is a pure function with injected
// dependencies, and every branch is exercised here — including the three that
// the real git and fetch make unreachable, which are exactly the ones a
// currency check gets wrong: not-a-checkout, host-unreachable, and a live sha
// this clone does not contain.
//
// The load-bearing assertion is the one that says UNAVAILABLE exits 1. This
// project's rule is that an unavailable measurement is never a pass, and the
// tempting bug is to treat an unreachable host as "nothing to report".

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { decide } = require("../check-current.js");

const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);

function boards(over) {
  return [
    { id: "dawnspur", liveHash: "1111111111111111", blobHash: "1111111111111111" },
    { id: "dawnspur-dispatch", liveHash: "2222222222222222", blobHash: "2222222222222222" },
    ...(over ? [over] : []),
  ];
}
const ok = (o) => decide(Object.assign({
  liveInfo: { commit: SHA_A, dirty: false },
  expectedSha: SHA_A,
  changedPaths: [],
  boards: boards(),
}, o));

test("current: the host serves the expected sha and every board hash-matches", () => {
  const v = ok({});
  assert.equal(v.ok, true);
  assert.equal(v.reason, "current");
  assert.match(v.lines.join("\n"), /Production is current\./);
});

test("UNAVAILABLE is never a pass: an unreachable host exits 1, not 0", () => {
  const v = ok({ liveInfo: null });
  assert.equal(v.ok, false, "an unreadable build-info must NOT pass");
  assert.equal(v.reason, "host-unavailable");
  assert.match(v.lines.join("\n"), /An unreachable deploy is not a passing deploy/);
});

test("UNAVAILABLE is never a pass: a build-info with no commit field exits 1", () => {
  const v = ok({ liveInfo: { builtAt: "2026-08-26T00:00:00Z" } });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "host-unavailable");
});

test("UNAVAILABLE is never a pass: not a git checkout exits 1", () => {
  const v = ok({ expectedSha: null });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "no-checkout");
});

test("UNAVAILABLE is never a pass: a board whose sim.js could not be fetched exits 1", () => {
  const v = ok({ boards: boards({ id: "convoy-stop", liveHash: null, blobHash: "3333333333333333" }) });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "board-unavailable");
  assert.match(v.lines.join("\n"), /convoy-stop/);
});

test("UNAVAILABLE is never a pass: a live sha this checkout lacks cannot be classified", () => {
  const v = ok({ liveInfo: { commit: SHA_B, dirty: false }, changedPaths: null });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "unknown-live-sha");
  assert.match(v.lines.join("\n"), /does not contain the live commit/);
});

test("bytes are graded before version, and a mismatch names the board and both hashes", () => {
  const v = ok({
    boards: boards({ id: "dawnspur-scale", liveHash: "dead000000000000", blobHash: "beef000000000000" }),
  });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "bytes");
  const out = v.lines.join("\n");
  assert.match(out, /BYTES DIFFER  \/dawnspur-scale\/sim\.js  live dead000000000000  repo beef000000000000/);
  assert.match(out, /A board is not delivered until its bytes hash-match on this host\./);
});

test("bytes beat a matching sha: same commit, different bytes, still a failure", () => {
  // The CFD-199 shape inverted — the version string agreeing proves nothing.
  const v = ok({
    liveInfo: { commit: SHA_A, dirty: false },
    expectedSha: SHA_A,
    boards: boards({ id: "dawnspur-heat", liveHash: "0000000000000000", blobHash: "9999999999999999" }),
  });
  assert.equal(v.ok, false, "a hash mismatch must fail even when the sha matches");
  assert.equal(v.reason, "bytes");
});

test("a dirty production build fails, because kills against it cite a sha that does not describe its bytes", () => {
  const v = ok({ liveInfo: { commit: SHA_A, dirty: true } });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "dirty");
});

test("docs-only drift is a PASS — a gate that is permanently red stops being read", () => {
  const v = ok({
    liveInfo: { commit: SHA_B, dirty: false },
    changedPaths: ["docs/cfd-196-beat.md", "KILLS.md", "test/dawnspur-dispatch.test.js"],
  });
  assert.equal(v.ok, true);
  assert.equal(v.reason, "benign-drift");
  assert.match(v.lines.join("\n"), /None of them touch a shipped path/);
});

test("drift that touches a shipped path FAILS, and prints the deploy command", () => {
  const v = ok({
    liveInfo: { commit: SHA_B, dirty: false },
    changedPaths: ["docs/cfd-196-beat.md", "public/dawnspur-dispatch/sim.js"],
  });
  assert.equal(v.ok, false);
  assert.equal(v.reason, "stale");
  const out = v.lines.join("\n");
  assert.match(out, /public\/dawnspur-dispatch\/sim\.js/);
  assert.match(out, /gh workflow run deploy\.yml --ref main/);
});

test("a long shipped-path list is truncated rather than dumped", () => {
  const many = Array.from({ length: 20 }, (_, i) => `public/b${i}/sim.js`);
  const v = ok({ liveInfo: { commit: SHA_B, dirty: false }, changedPaths: many });
  assert.equal(v.ok, false);
  assert.match(v.lines.join("\n"), /and 8 more/);
});

test("GUARD: every failure reason is distinct, so a red names its own cause", () => {
  const reasons = [
    ok({ expectedSha: null }).reason,
    ok({ liveInfo: null }).reason,
    ok({ liveInfo: { commit: SHA_A, dirty: true } }).reason,
    ok({ boards: boards({ id: "x", liveHash: null, blobHash: "1" }) }).reason,
    ok({ boards: boards({ id: "x", liveHash: "1", blobHash: "2" }) }).reason,
    ok({ liveInfo: { commit: SHA_B, dirty: false }, changedPaths: null }).reason,
    ok({ liveInfo: { commit: SHA_B, dirty: false }, changedPaths: ["public/a/sim.js"] }).reason,
  ];
  assert.equal(new Set(reasons).size, reasons.length, "two failures share a reason: " + reasons.join(", "));
});

"use strict";

// Grades apply-edits.js, whose whole reason for existing is one check that
// per-edit verification cannot make: whether two anchors overlap IN THE FILE.
//
// The bug it was written for, measured 2026-08-28 on a 30-edit set against
// docs/cfd-201-beat.md: every anchor verified unique, individually, and three
// pairs still overlapped. A sequential applier does not crash on that — it
// replaces the outer span, the inner anchor ceases to exist, and the inner edit
// is silently dropped while the run reports success. On this project a beat is a
// test spec, so a silently dropped edit becomes a test that grades the wrong
// thing.
//
// The tests below are ordered cheapest-signal-first: unique-match refusals, then
// the overlap check, then the adjacency case that discriminates a correct overlap
// predicate from a lazy one, then atomicity.

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { applyEdits, countOccurrences, findOverlaps, spansOf } = require("../apply-edits.js");

const edit = (label, anchor, replacement) => ({ label, anchor, replacement });

test("a single anchored edit applies", () => {
  const out = applyEdits("alpha beta gamma", [edit("e", "beta", "BETA")]);
  assert.equal(out, "alpha BETA gamma");
});

test("several disjoint edits all apply, and the later ones are not shifted by the earlier", () => {
  // Replacements of different length than their anchors are the case that breaks
  // a naive left-to-right applier using pre-computed offsets.
  const out = applyEdits("one two three four", [
    edit("a", "one", "1"),
    edit("b", "three", "THREE-IS-LONGER"),
  ]);
  assert.equal(out, "1 two THREE-IS-LONGER four");
});

test("edits apply correctly whatever order they are declared in", () => {
  const src = "one two three four";
  const forward = applyEdits(src, [edit("a", "one", "1"), edit("b", "four", "4")]);
  const backward = applyEdits(src, [edit("b", "four", "4"), edit("a", "one", "1")]);
  assert.equal(forward, backward);
  assert.equal(forward, "1 two three 4");
});

test("an anchor that matches nothing is refused, and the refusal names the edit", () => {
  assert.throws(
    () => applyEdits("alpha beta", [edit("missing-one", "delta", "x")]),
    (err) => err.reason === "no-match" && /missing-one/.test(err.message)
  );
});

test("an anchor that matches twice is refused rather than applied to the first", () => {
  assert.throws(
    () => applyEdits("beta and beta", [edit("dupe", "beta", "x")]),
    (err) => err.reason === "ambiguous" && /matched 2 time/.test(err.message)
  );
});

test("overlapping matches count as two — stepping by one is what sees them", () => {
  assert.equal(countOccurrences("aaaa", "aa"), 3);
  assert.equal(countOccurrences("abcabc", "abc"), 2);
  assert.equal(countOccurrences("abc", "zzz"), 0);
});

// ---- the load-bearing check -------------------------------------------------

test("KILL: one anchor CONTAINING another is refused, naming both", () => {
  // The rederive[13]/rederive[9] shape: a paragraph rewrite whose span swallows a
  // sentence edit inside it. Applied in sequence, the sentence edit vanishes.
  const src = "start OUTER middle INNER end tail";
  assert.throws(
    () =>
      applyEdits(src, [
        edit("outer", "OUTER middle INNER end", "REWRITTEN"),
        edit("inner", "INNER", "inner!"),
      ]),
    (err) => err.reason === "overlap" && /outer/.test(err.message) && /inner/.test(err.message)
  );
});

test("KILL: two anchors sharing a start are refused", () => {
  // The rederive[12]/rederive[17] shape: two edits rewriting the same line, one
  // adding a field and one adding a clause. Both correct, both needed, and the
  // second silently lost.
  const src = "- The opening mints marks 3, Wardens 0, dark.";
  assert.throws(
    () =>
      applyEdits(src, [
        edit("adds-stores", "- The opening mints marks 3,", "- The opening mints marks 3, stores 0,"),
        edit("adds-clause", "- The opening mints marks 3, Wardens 0, dark.", "- ... the ending not armed, dark."),
      ]),
    (err) => err.reason === "overlap"
  );
});

test("GUARD: adjacency is NOT overlap — an edit ending where the next begins still applies", () => {
  // This is the test that discriminates a correct predicate from `<=`. Without
  // it, a lazy implementation refuses legitimate back-to-back edits and the tool
  // becomes something people work around.
  const out = applyEdits("ABCD", [edit("first", "AB", "ab"), edit("second", "CD", "cd")]);
  assert.equal(out, "abcd");
});

test("GUARD: findOverlaps is exact at the boundary in both directions", () => {
  const touching = [{ label: "a", start: 0, end: 5 }, { label: "b", start: 5, end: 9 }];
  assert.equal(findOverlaps(touching).length, 0, "touching spans must not report as overlapping");
  const byOne = [{ label: "a", start: 0, end: 6 }, { label: "b", start: 5, end: 9 }];
  assert.equal(findOverlaps(byOne).length, 1, "one character of true overlap must be caught");
});

test("spansOf reports the half-open span each anchor occupies", () => {
  const spans = spansOf("alpha beta gamma", [edit("e", "beta", "x")]);
  assert.deepEqual(spans[0].start, 6);
  assert.deepEqual(spans[0].end, 10);
});

// ---- refusals that protect the file ----------------------------------------

test("an empty anchor is refused — it matches everywhere", () => {
  assert.throws(() => applyEdits("abc", [edit("blank", "", "x")]), (err) => err.reason === "empty-anchor");
});

test("an empty edit list is refused rather than rewriting the file unchanged", () => {
  assert.throws(() => applyEdits("abc", []), (err) => err.reason === "empty");
});

test("a malformed edit is refused by name", () => {
  assert.throws(
    () => applyEdits("abc", [{ label: "bad", anchor: "a" }]),
    (err) => err.reason === "malformed" && /bad/.test(err.message)
  );
});

test("ATOMIC: a set containing one bad edit writes NOTHING, not the good ones", () => {
  // The property that matters most. A partial write is worse than a refusal,
  // because it leaves a document that looks deliberately inconsistent.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "apply-edits-"));
  const file = path.join(dir, "doc.md");
  const original = "alpha beta gamma";
  fs.writeFileSync(file, original);
  assert.throws(() =>
    applyEdits(fs.readFileSync(file, "utf8"), [
      edit("good", "alpha", "ALPHA"),
      edit("bad", "not-present", "x"),
    ])
  );
  assert.equal(fs.readFileSync(file, "utf8"), original, "the file must be untouched after a refusal");
  fs.rmSync(dir, { recursive: true, force: true });
});

test("BYTES, NOT SHAPES: a retyped em dash does not match a minus sign, and fails loudly", () => {
  // Three anchors failed exactly this way in the run that prompted this tool.
  // Failing loudly at match time is the GOOD case; a tool that normalised these
  // would match something other than what the author wrote.
  const src = "the delta is `pay × 0.10 − 2` and is flat";
  assert.throws(
    () => applyEdits(src, [edit("retyped", "`pay × 0.10 — 2`", "x")]),
    (err) => err.reason === "no-match"
  );
  const ok = applyEdits(src, [edit("copied", "`pay × 0.10 − 2`", "FIXED")]);
  assert.match(ok, /FIXED/);
});

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

// ---- the PAIR checks, added 2026-09-02 --------------------------------------
//
// The second structural blindness, and the tests below are the three shapes that
// landed through it in commit b8d6da3 — 24 edits, every anchor unique, no two
// overlapping, 24 of 24 reported applied, and three of them silently damaging the
// file. The fixtures are small reconstructions of the three, NOT copies of the
// canon file, so they keep grading the shape after that file moves on.
//
//   §7.1  anchor spanned two lines, replacement began at the second, verbatim.
//         David's ruling sentence was DELETED and a line orphaned below.
//   §5.6  replacement began with a verbatim copy of the line ABOVE the anchor,
//         duplicating it, and dropped a quotation.
//   §5.2  a one-line anchor was replaced by text belonging to the FOLLOWING line.
//
// Ordered as the checks run: the misalignment refusals, then the duplicate
// refusal and its escape, then the report that never refuses, then the
// calibration guards, then dry-run parity through the real CLI.

const {
  droppedAnchorLines,
  findNewAdjacentDuplicates,
  buildReport,
  lineContext,
  longestSurvivingRun,
  ECHO_MIN_CHARS,
} = require("../apply-edits.js");

// §7.1, reconstructed. The replacement resumes at the anchor's SECOND line, so
// the first — carrying the ruling — is replaced by nothing.
const RULING_SRC =
  "He conceded the point in the sitting.\n" +
  "Ruled: the provisions join ships and weather defers. The\n" +
  "993-line weather beat is not discarded, held\n" +
  "for the sitting that carries weather.\n";
const RULING_EDIT = edit(
  "S71-M6",
  "Ruled: the provisions join ships and weather defers. The\n993-line weather beat is not discarded, held",
  "993-line weather beat is not discarded, held\nfor a sitting that carries weather. *(993 lines at `d245131`.)*"
);

test("KILL §7.1: a replacement starting at the anchor's SECOND line is refused, and the refusal shows the ruling it would delete", () => {
  // THE ONE THAT COST A RULING. Nothing above this line in the file can see it:
  // the anchor is unique, nothing overlaps, and a sequential applier is happy.
  assert.throws(
    () => applyEdits(RULING_SRC, [RULING_EDIT]),
    (err) =>
      err.reason === "misaligned" &&
      /S71-M6/.test(err.message) &&
      /anchor's own line 2 EXACTLY/.test(err.message) &&
      /Ruled: the provisions join ships and weather defers/.test(err.message)
  );
});

test("KILL §5.6: a replacement opening with a verbatim copy of the line ABOVE the anchor is refused", () => {
  // Applied, this duplicates the item-6 line and drops the quotation the anchor's
  // second line carried. Check 1 sees it at the head; check 2 would see the same
  // damage in the output, and the two are deliberately independent.
  const src =
    "6. The sequencing instrument is the sitting discipline itself\n" +
    "   and has produced three passed sits; stakes default gentle by\n" +
    "   rule: the whole intensity rides the stakes dial.\n";
  assert.throws(
    () =>
      applyEdits(src, [
        edit(
          "s5-M4",
          "   and has produced three passed sits; stakes default gentle by\n   rule: the whole intensity rides the stakes dial.",
          "6. The sequencing instrument is the sitting discipline itself\n   and has produced three passed sits *(wrong on its date: one had)*; stakes default gentle by"
        ),
      ]),
    (err) => err.reason === "misaligned" && /line BEFORE the anchor EXACTLY/.test(err.message)
  );
});

test("KILL §5.2: a one-line anchor replaced by text belonging to the FOLLOWING line is refused", () => {
  // The one the exact-match tiers cannot see: the replacement is not a verbatim
  // copy of the following line, it is an EDIT of it, so only the fuzzy head tier
  // catches it. Measured 48 characters, 69% of the line, on the real edit.
  const src =
    "the haul in transit is at risk (that is (a)) and the in-progress\n" +
    'purchase can suffer (that is (b), "a project left mid-advance can\n' +
    'suffer, though never the holdings already secured" — Two-Games).\n';
  assert.throws(
    () =>
      applyEdits(src, [
        edit(
          "s5-M1",
          'purchase can suffer (that is (b), "a project left mid-advance can',
          'suffer, though never the holdings already secured" — MDB, directive 1.12).\n*(An earlier cut attributed this sentence to Two-Games.)*'
        ),
      ]),
    (err) =>
      err.reason === "misaligned" &&
      /line AFTER the anchor for \d+ chars/.test(err.message) &&
      /purchase can suffer/.test(err.message)
  );
});

test("KILL: the mirror at the TAIL — a replacement ending with a verbatim copy of an earlier anchor line is refused", () => {
  // Byte-identical only. The fuzzy tail tier was built and measured and it refused
  // a legitimate edit at the same score as a real corruption; see the header.
  const src = "alpha line\nbravo line\ncharlie line\n";
  assert.throws(
    () =>
      applyEdits(src, [
        edit("tail-shifted", "bravo line\ncharlie line", "a new opening for the item\nbravo line"),
      ]),
    (err) => err.reason === "misaligned" && /last line/.test(err.message)
  );
});

test("KILL: a NEW adjacent duplicate line is refused even when no anchor line is misaligned", () => {
  // Check 2 earning its own keep. Nothing here is offset against its anchor —
  // the duplicate is made at the SEAM, where the replacement's last line lands
  // beside an identical line the anchor never covered. Check 1 cannot see this.
  // The refusal must also NAME the edit. Attribution asks which replacement
  // covers either half of the pair, because the §5.6 shape makes the first half
  // and leaves the untouched original as the second.
  const src = "alpha\nbravo\ncharlie\ndelta\n";
  assert.throws(
    () => applyEdits(src, [edit("dup-maker", "bravo", "bravo two\ncharlie")]),
    // The label must be one the fallback text CANNOT contain. An earlier cut of
    // this test used the label "seam", which the "(at a seam between edits)"
    // fallback matches, so the assertion passed with attribution broken.
    (err) => err.reason === "new-duplicate" && /"charlie"/.test(err.message) && /dup-maker/.test(err.message)
  );
});

test("findNewAdjacentDuplicates counts by content, so a duplicate the source ALREADY had is not a new one", () => {
  // Otherwise the check fires on every edit near a pre-existing repeat and gets
  // switched off. Blank lines are excluded for the same reason.
  const src = "same\nsame\nmiddle\ntail\n";
  assert.equal(findNewAdjacentDuplicates(src, src, null).length, 0);
  assert.equal(findNewAdjacentDuplicates(src, "same\nsame\nmiddle\nsame\nsame\ntail\n", null).length, 1);
  assert.equal(findNewAdjacentDuplicates("a\n\nb\n", "a\n\n\nb\n", null).length, 0, "blank lines repeat legitimately");
});

test("ESCAPE: a deliberate duplicate applies only when the edit names the exact line, and a different line does not excuse it", () => {
  // The only refusal here with no way to re-express the edit around it, which is
  // why it is the only one with an escape. Naming the line is what stops an
  // escape written for one duplicate from excusing a different accidental one.
  const src = "alpha\nbravo\ncharlie\ndelta\n";
  const base = edit("dup-maker", "bravo", "bravo two\ncharlie");
  const out = applyEdits(src, [{ ...base, allowsDuplicateLine: "charlie" }]);
  assert.equal(out, "alpha\nbravo two\ncharlie\ncharlie\ndelta\n");
  assert.throws(
    () => applyEdits(src, [{ ...base, allowsDuplicateLine: "some other line entirely" }]),
    (err) => err.reason === "new-duplicate"
  );
  assert.throws(
    () => applyEdits(src, [{ ...base, allowsDuplicateLine: true }]),
    (err) => err.reason === "malformed" && /exact line text/.test(err.message)
  );
});

test("ESCAPE: it announces itself, and announces itself louder once it is no longer needed", () => {
  // A self-cancelling marker, per this project's rule about leaving known
  // exceptions in place: an escape nothing needs prints DELETE IT.
  const src = "alpha\nbravo\ncharlie\ndelta\n";
  const used = { ...edit("dup-maker", "bravo", "bravo two\ncharlie"), allowsDuplicateLine: "charlie" };
  assert.match(buildReport([used], applyEdits(src, [used])), /DUPLICATE ESCAPE HONOURED/);
  const stale = { ...edit("plain", "bravo", "bravo two"), allowsDuplicateLine: "charlie" };
  assert.match(buildReport([stale], applyEdits(src, [stale])), /DECLARED BUT UNUSED — delete it/);
});

// ---- check 3: the report that never refuses ---------------------------------

test("REPORT: a legitimate supersession that drops anchor text STILL APPLIES, and is reported", () => {
  // This is why check 3 cannot be an error. Superseding a measured claim deletes
  // the old wording ON PURPOSE, and from here it is indistinguishable from the
  // §7.1 deletion. The tool applies it and puts it in front of the operator.
  const src =
    "## 3. The boards, judged\n\n" +
    "The board carries three levers, counted 2026-08-26.\n" +
    "That count is the pass table's.\n";
  const e = edit(
    "S7-01",
    "The board carries three levers, counted 2026-08-26.",
    "The board carries two levers *(superseded 2026-09-02: an earlier cut said three; driven at HEAD it is two)*."
  );
  const out = applyEdits(src, [e]);
  assert.match(out, /two levers/);
  const dropped = droppedAnchorLines(e);
  assert.equal(dropped.length, 1, "the superseded wording must be reported as dropped");
  assert.match(buildReport([e], out), /DROPPED ANCHOR CONTENT — a report, never a refusal/);
});

test("REPORT: the deleted ruling shows as losing almost every word, which is what separates it from a re-wording", () => {
  // The signal the operator sorts by, and the honest version of it. A
  // supersession re-words and keeps most of the line — the measured canon edits
  // keep 8 to 13 words of 9 to 15. This one keeps ONE, and the one it keeps is
  // the accident that "weather" appears on both sides. The figure is a severity
  // ordering, not a proof, which is why check 3 reports and never refuses.
  const dropped = droppedAnchorLines(RULING_EDIT);
  const ruling = dropped.find((d) => /Ruled:/.test(d.line));
  assert.ok(ruling, "the ruling line must be reported dropped");
  assert.equal(ruling.words, 9);
  assert.equal(ruling.kept, 1, "one word, and only by coincidence of vocabulary");
  assert.match(buildReport([RULING_EDIT], null), /Ruled: the provisions join ships and weather defers/);
});

test("REPORT: a line that loses every word is counted in the heading, so it is read first", () => {
  const e = edit("total", "the storm premium's shape was ruled on that day", "an entirely different sentence");
  assert.equal(droppedAnchorLines(e)[0].kept, 0);
  assert.match(buildReport([e], null), /1 line\(s\) below lost EVERY word/);
});

test("REPORT: re-wrapping is not dropping — a replacement that only re-flows the anchor reports nothing", () => {
  // Without whitespace collapsing this reports every line of every re-wrapped
  // edit, 459 lines over the 298-edit corpus become far more, and the report
  // stops being read — which is the same fate as a gate that is always red.
  const e = edit(
    "rewrap",
    "the cold is the second, pressing the\nwarmed edge and the in-progress project",
    "the cold is the second, pressing\nthe warmed edge and the\nin-progress project"
  );
  assert.deepEqual(droppedAnchorLines(e), []);
  assert.match(buildReport([e], null), /DROPPED ANCHOR CONTENT: none/);
});

test("REPORT: word runs are matched on WORD BOUNDARIES, not substrings", () => {
  // "the" is a substring of "weather". Before the boundary padding the deleted
  // ruling scored "kept 1 of 11 words" on that accident alone.
  assert.equal(longestSurvivingRun("carries weather.", "the"), 0);
  assert.equal(longestSurvivingRun("carries the weather.", "the"), 1);
});

// ---- calibration, pinned so a change to it is a decision and not a drift -----

test("GUARD: a legitimate replacement that repeats a line NON-adjacently still applies", () => {
  // Check 2 grades adjacency, not repetition. A document that says the same
  // sentence in two places is normal and must not be refused.
  const out = applyEdits("one\nrepeated line\ntwo\nthree\n", [
    edit("moves-a-line", "three", "three, amended\nrepeated line"),
  ]);
  assert.equal(out, "one\nrepeated line\ntwo\nthree, amended\nrepeated line\n");
});

test("GUARD: a SHORT accidental prefix shared with a neighbour does not refuse", () => {
  // Every threshold here is a measurement of one corpus, and this is the shape it
  // is protecting: two lines that happen to start with the same few characters.
  // Measured worst true positive 48 chars / 69%; measured worst coincidence of
  // the same family 4 chars / 40%. ECHO_MIN_CHARS sits between them.
  assert.ok(ECHO_MIN_CHARS > 4 && ECHO_MIN_CHARS < 48, "the floor must sit inside the measured gap");
  const src = "   the reserve is drawn 4 to 3 to 2\n   the roster is 0W+1R at the trim\n   tail line\n";
  const out = applyEdits(src, [
    edit("short-echo", "   the reserve is drawn 4 to 3 to 2", "   the roster stands where it stood *(re-measured)*"),
  ]);
  assert.match(out, /roster stands/);
});

test("GUARD: an anchor whose own first line survives is never called misaligned", () => {
  // The conjunctive half of check 1. A replacement that carries its anchor's
  // first line forward is not dropping it, whatever it echoes elsewhere, and
  // this is what makes a deliberate re-ordering of anchor lines legal.
  const src = "alpha line\nbravo line\ncharlie line\n";
  const out = applyEdits(src, [
    edit("reordered", "bravo line\ncharlie line", "charlie line\nbravo line"),
  ]);
  assert.equal(out, "alpha line\ncharlie line\nbravo line\n");
});

test("GUARD: lineContext returns null for an anchor that is not line-aligned", () => {
  // 66 of the 298 corpus edits are mid-line. For those the source-context half of
  // check 1 cannot run at all, because the replacement's first line is not
  // comparable with a whole source line. Stated in the header as a known gap.
  assert.equal(lineContext("alpha bravo\ncharlie\n", "bravo"), null);
  assert.notEqual(lineContext("alpha\nbravo\ncharlie\n", "bravo"), null);
});

// ---- dry-run parity, through the real CLI -----------------------------------

const CLI = path.join(__dirname, "..", "apply-edits.js");

function runCli(source, edits, dryRun) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "apply-edits-cli-"));
  const doc = path.join(dir, "doc.md");
  const set = path.join(dir, "edits.json");
  fs.writeFileSync(doc, source);
  fs.writeFileSync(set, JSON.stringify(edits));
  const args = dryRun ? [CLI, doc, set, "--dry-run"] : [CLI, doc, set];
  const r = require("node:child_process").spawnSync(process.execPath, args, { encoding: "utf8" });
  const after = fs.readFileSync(doc, "utf8");
  fs.rmSync(dir, { recursive: true, force: true });
  return { status: r.status, stdout: r.stdout, stderr: r.stderr, after };
}

test("DRY-RUN PARITY: a dry run and an apply agree on every refusal, and the dry run writes nothing", () => {
  // The promise the flag makes: a clean dry run means the apply will be clean.
  // It is true structurally — one code path computes every check and --dry-run
  // branches only after it — and this is the test that keeps it true.
  const cases = [
    ["misaligned §7.1", RULING_SRC, [RULING_EDIT], "misaligned"],
    ["new duplicate", "alpha\nbravo\ncharlie\ndelta\n", [edit("dup-maker", "bravo", "bravo two\ncharlie")], "new-duplicate"],
    ["overlap", "start OUTER middle INNER end tail", [
      edit("outer", "OUTER middle INNER end", "REWRITTEN"), edit("inner", "INNER", "inner!"),
    ], "overlap"],
    ["no match", "alpha beta", [edit("missing", "delta", "x")], "no-match"],
  ];
  for (const [name, src, edits, reason] of cases) {
    const dry = runCli(src, edits, true);
    const wet = runCli(src, edits, false);
    assert.equal(dry.status, 1, `${name}: dry run must exit 1`);
    assert.equal(wet.status, 1, `${name}: apply must exit 1`);
    assert.match(dry.stderr, new RegExp(`REFUSED \\(${reason}\\)`), `${name}: dry run names the reason`);
    assert.equal(dry.stderr, wet.stderr, `${name}: both paths must give the SAME refusal`);
    assert.equal(dry.after, src, `${name}: a refused dry run writes nothing`);
    assert.equal(wet.after, src, `${name}: a refused apply writes nothing`);
  }
});

test("DRY-RUN PARITY: a clean set exits 0 both ways, prints the same report, and only the apply writes", () => {
  const src = "## 3. The boards, judged\n\nThe board carries three levers, counted 2026-08-26.\n";
  const edits = [edit("S7-01", "three levers, counted 2026-08-26.", "two levers *(superseded 2026-09-02)*.")];
  const dry = runCli(src, edits, true);
  const wet = runCli(src, edits, false);
  assert.equal(dry.status, 0);
  assert.equal(wet.status, 0);
  assert.equal(dry.after, src, "a dry run never writes");
  assert.notEqual(wet.after, src, "an apply does");
  assert.match(dry.stdout, /DROPPED ANCHOR CONTENT/);
  // Compare the report only; the trailing summary line carries a temp path.
  const report = (s) => s.slice(0, s.lastIndexOf("\n", s.length - 2) + 1);
  assert.equal(report(dry.stdout), report(wet.stdout), "the report itself must be identical on both paths");
});

test("REPORT: it prints BEFORE the refusal, so the operator sees the dropped text on a refused run too", () => {
  // The three corruptions were refusable and reportable at the same moment. An
  // operator who only ever sees a refusal learns nothing about the other 21.
  const r = runCli(RULING_SRC, [RULING_EDIT], true);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Ruled: the provisions join ships and weather defers/);
  assert.match(r.stderr, /REFUSED \(misaligned\)/);
});

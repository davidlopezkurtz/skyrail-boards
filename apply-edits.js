"use strict";

// Applies a set of anchored text edits to one file, atomically, or refuses.
//
//   node apply-edits.js <file> <edits.json> [--dry-run]
//
// edits.json is [{ "label": "...", "anchor": "...", "replacement": "..." }, ...].
// Exit 0 when every edit applied. Exit 1 on any refusal, having written nothing.
//
// WHY THIS EXISTS, and it is not the reason you would guess.
//
// On 2026-08-28 a set of thirty edits was applied to docs/cfd-201-beat.md. Every
// anchor had been verified, individually, to match the file exactly once. That
// verification was correct and it was not enough: THREE PAIRS of those anchors
// overlapped in the file — one edit's span containing another's — and applying
// them in sequence silently destroys the inner edit, because after the outer
// replacement its anchor no longer exists.
//
//   rederive[13] [23736-24447] contained rederive[9]  [24014-24191]
//   rederive[12] [33887-33970] shared a start with 17 [33887-34039]
//   rederive[6]  [15937-16107] was co-extensive with the trim's own edit
//
// Per-edit verification cannot see this. It asks "is this anchor unique?" of each
// edit alone, and every answer was yes. The property that matters is a property of
// the SET.
//
// This is the same shape as a defect this project recorded the same week: a check
// that is locally correct and structurally blind. There, canon stated a wrong
// answer in short quotable form while its refutation sat a thousand lines into
// another document; every reader following the documented order met the error
// first. Both failures pass every local test and fail as a system.
//
// THE FAILURE MODE THIS PREVENTS IS SILENT HALF-APPLICATION. A sequential applier
// with per-edit checks does not crash on an overlap — it drops the inner edit and
// reports success. The document is then internally inconsistent in a way that
// looks deliberate, and on this project a document is a test spec: docs/*-beat.md
// Kill lists are transcribed into test/*.test.js red-first. A silently dropped
// edit becomes a test that grades the wrong thing, or a board built to a spec that
// contradicts itself.
//
// TWO THINGS THIS DELIBERATELY DOES NOT DO.
//
// It does not sort or reorder edits. Order is the author's, because an overlap is
// sometimes intended — an edit whose anchor contains a row that a later edit
// rewrites is legitimate if the outer edit preserves that row verbatim. This tool
// refuses the overlap rather than guessing which order was meant; the author
// merges the pair and says so.
//
// It does not normalise whitespace, dashes, or quotes. Anchors must match byte for
// byte, because the alternative is a tool that silently matches something other
// than what the author wrote. Three anchor failures in the run that prompted this
// were retyped em dashes (U+2014) where the file held a minus sign (U+2212), and
// they failed LOUDLY at match time, which is the good case. Extract anchor text
// from the file; never retype it.
//
// ---------------------------------------------------------------------------
// THE SECOND BLINDNESS, MEASURED 2026-09-02: THE PAIR, NOT THE SET.
//
// The same shape recurred one level out, and the checks above did not see it.
// Commit b8d6da3 applied 24 edits to docs/mechanisms-recommitted.md. Every anchor
// matched exactly once; no two overlapped; the tool reported 24 of 24 applied and
// was CORRECT on every question it asks. Three of those edits silently damaged
// the file anyway, because three replacements began part-way through their own
// anchor's span: the leading anchor text was replaced by nothing and the trailing
// text was left behind as an orphan. Uniqueness is a property of an EDIT. Overlap
// is a property of the SET. WHETHER A REPLACEMENT CARRIES ITS ANCHOR'S SPAN
// FORWARD IS A PROPERTY OF THE PAIR, and nothing checked it.
//
//   §7.1  The anchor spanned two lines; the replacement began at the second, byte
//         for byte. David's ruling sentence — "Ruled: the provisions join ships
//         and weather defers." — was DELETED and a line orphaned below it. A
//         ruling is the one thing in that file that may never move. It was gone
//         for six commits, and a human reader found it, not a gate.
//   §5.6  The replacement began with a verbatim copy of the line ABOVE the anchor,
//         duplicating that line, and dropped a quotation.
//   §5.2  A one-line anchor was replaced by text belonging to the FOLLOWING line,
//         deleting a clause and orphaning the original.
//
// Repaired at c32ff52, which also recorded why three earlier readers missed it:
// they graded the CLAIMS against sources and the ANCHORS against the file. Nobody
// diffed the applied result against the text it replaced.
//
// THREE CHECKS NOW, AND WHAT EACH ONE COSTS. All three were calibrated against
// every real edit set on disk at the time of writing — 298 edits across 37 sets
// under C:/tmp/sweep, C:/tmp/sweep/edits-city, C:/tmp/sweepcanon and
// C:/tmp/ledger-repair. Counts below are from that corpus.
//
//  1. MISALIGNED REPLACEMENT (refuses). Compares the replacement's FIRST line
//     against the line it claims to replace — the anchor's first line — and
//     against the three lines a misalignment would land on instead: the anchor's
//     own later lines, the source line before the anchor, and the source line
//     after it. If a wrong candidate matches better than the right one, and the
//     anchor's first line is nowhere in the replacement, the pair is misaligned
//     and the outer line is being dropped in silence. Catches all three of the
//     above — each of which is VERBATIM: the misaligned line is copied byte for
//     byte from the anchor. That is the boundary, and it is narrow. Measured by
//     the orchestrator at landing, three shapes against this check:
//
//       A  replacement opens with the anchor's second line, BYTE FOR BYTE
//          -> REFUSED (exit 1). This is what b8d6da3 did to the §7.1 ruling.
//       B  the same damage, that line lightly REWORDED
//          -> not refused. Check 3 reports it; check 1 cannot see it.
//       C  a real supersession carrying the anchor's first line forward
//          -> applies. No false refusal.
//
//     THE CLAIM THIS HEADER USED TO MAKE IS WITHDRAWN. It said a FOURTH defect
//     of the §7.1 shape sat unlanded at index 15 of
//     C:/tmp/sweepcanon/edits/mechanisms-recommitted.refuter-only.json and that
//     4 of 298 edits fire. Re-measured at landing against that file at three
//     trees — HEAD 201dc3a, b8d6da3 and 238aebe — the set exits 0 every time:
//     check 1 does NOT refuse it. Index 15 is a case B. Its replacement drops
//     the anchor's first line (a real defect, and check 3 prints it) but rewords
//     the second, so the misalignment check never sees it. The row is a REPORT,
//     not a refusal, and the corpus counts below were not re-derived here —
//     they are the authoring session's measurement, carried as its claim.
//  2. NEW ADJACENT DUPLICATE (refuses). If applying creates a pair of adjacent
//     identical non-blank lines that the source did not already have, refuse.
//     Catches §5.6 independently of check 1, and unlike check 1 it grades the
//     OUTPUT, so it also sees a duplicate made at a seam between two edits.
//     Measured cost: 1 of 298 fire, and it is §5.6.
//  3. DROPPED ANCHOR CONTENT (always prints, never refuses). Per edit, the anchor
//     lines whose text does not survive into the replacement. This is the one
//     that generalises; 1 and 2 are the two mechanical signatures it happened to
//     leave. It cannot be an error, because a supersession drops text ON PURPOSE
//     and looks identical from here — but it must be VISIBLE, because the
//     operator reading the output is the only reader who can tell a supersession
//     from a deletion. Measured cost, and it is the real one: 270 of 298 edits
//     drop at least one anchor line, 459 lines in total. This is a report you
//     must actually read, which is why it prints worst-first and says how much of
//     each line was lost.
//
// ONE ESCAPE, ON ONE CHECK, AND THE ARGUMENT FOR WHY IT IS NOT TWO. Check 1 has
// NO override, because it does not need one: an author who genuinely means to
// delete the anchor's leading line shrinks the anchor to the line they are
// changing, which is a smaller and clearer edit that passes every check here. The
// refusal says so. Check 2 gets one, because it grades the OUTPUT and so there is
// no way to re-express the edit around it — a genuinely wanted pair of identical
// adjacent lines refuses however you write it, and a refusal with no remedy is
// the kind of gate people route around rather than read.
// `"allowsDuplicateLine": "<the exact line>"` carries the line byte for byte, so
// an escape written for one duplicate cannot excuse a different accidental one,
// and it prints when honoured. It is used by NONE of the 298 corpus edits, and it
// prints DELETE IT once it stops being needed.
//
// WHY THE TAIL IS EXACT-ONLY, AND IT IS A MEASUREMENT, NOT A PREFERENCE. Check 1
// runs the mirror comparison at the replacement's LAST line, but only as a
// byte-identical whole-line match. The fuzzy form was built, run over the corpus,
// and REFUSED A LEGITIMATE EDIT: cfd-200-beat.json[15] scores 0.400 on a trailing
// coincidence, exactly tying the §5.6 corruption's own tail score of 0.400. A
// tail threshold that catches the defect catches the legitimate edit with it, so
// there is no tail threshold. The head separates cleanly (0.686 worst true
// positive, nothing else above 0.000) and is where the fuzzy tier lives.
//
// WHAT REMAINS UNCHECKED, stated rather than implied.
//
//   - A misalignment whose replacement shares less than half its first line with
//     the neighbour it drifted onto is invisible to check 1. The four measured
//     ones share 0.686 to 1.000; a rewrite that also re-words the first few
//     characters would slip under. Check 3 still prints its dropped line — which
//     is the whole reason check 3 is not optional.
//   - Check 1's source-context half needs a LINE-ALIGNED anchor. 232 of the 298
//     corpus edits are line-aligned; for the other 66 only the anchor-internal
//     comparison runs.
//   - Nothing here reads MEANING. An edit that carries every anchor line forward
//     and states the opposite of what the source says passes all three. The
//     sweep's own answer to that is a second reader, not a tool.
//   - The thresholds in check 1 are calibrated against one project's 298 edits,
//     all produced by one pipeline. They are a measurement of this corpus, not a
//     law about anchored edits.

const fs = require("node:fs");

// Counts occurrences of `needle` in `haystack`, overlapping matches included.
// Overlapping matters: an anchor that appears twice in an overlapping way is still
// ambiguous, and stepping by 1 rather than by needle.length is what sees it.
function countOccurrences(haystack, needle) {
  if (needle === "") return Infinity;
  let n = 0;
  let i = 0;
  for (;;) {
    i = haystack.indexOf(needle, i);
    if (i === -1) return n;
    n += 1;
    i += 1;
  }
}

// Returns [{ label, start, end }], the half-open span each anchor occupies.
function spansOf(source, edits) {
  return edits.map((e, i) => {
    const start = source.indexOf(e.anchor);
    return {
      label: e.label || `edit[${i}]`,
      index: i,
      start,
      end: start + e.anchor.length,
    };
  });
}

// The check that per-edit verification cannot make. Two spans overlap when each
// starts before the other ends. Adjacency is NOT overlap: an edit ending exactly
// where the next begins is fine, and the strict inequalities are what allow it.
function findOverlaps(spans) {
  const sorted = spans.slice().sort((a, b) => a.start - b.start);
  const found = [];
  for (let i = 0; i < sorted.length - 1; i += 1) {
    for (let j = i + 1; j < sorted.length; j += 1) {
      if (sorted[i].start < sorted[j].end && sorted[j].start < sorted[i].end) {
        found.push([sorted[i], sorted[j]]);
      }
    }
  }
  return found;
}

// ---------------------------------------------------------------------------
// THE PAIR CHECKS. Everything below grades one edit's replacement against its own
// anchor, or the applied output against the source it came from.

// The two constants check 1's fuzzy tier turns on, kept together with the
// measurement that set them rather than buried at the call site. Worst measured
// TRUE positive across the 298-edit corpus: 48 characters, ratio 0.686. Worst
// measured coincidence of the same family: 4 characters, ratio 0.400, on the tail
// side — which is exactly why the fuzzy tier does not run on the tail.
const ECHO_MIN_CHARS = 16;
const ECHO_MIN_RATIO = 0.5;

function splitLines(text) {
  return text.split("\n");
}

// Whitespace-collapsed, and ONLY here. The applier itself still matches byte for
// byte; this is a reporting predicate. It has to collapse, because re-wrapping a
// paragraph is the normal shape of these edits: a line-equality test would report
// almost every anchor line as dropped, and a report nobody reads is the failure
// this whole file exists to stop.
function collapseSpace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function commonPrefixLength(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  return i;
}

// Does this anchor line's text survive into the replacement at all? A blank line
// carries no content and so can never be lost.
function isCarriedForward(replacement, line) {
  const needle = collapseSpace(line);
  if (needle === "") return true;
  return collapseSpace(replacement).includes(needle);
}

// The longest run of consecutive words from `line` that DOES appear in
// `replacement`. "kept 0 of 12 words" is the §7.1 shape — a sentence that
// vanished. "kept 9 of 12" is a re-wording, which is what a supersession is.
// Matched on WORD boundaries, by padding both sides with a space. Without the
// padding the deleted ruling sentence scored "kept 1 of 11 words" because "the"
// is a substring of "weather", and a severity figure inflated by accidents is a
// severity figure nobody sorts by.
function longestSurvivingRun(replacement, line) {
  const words = collapseSpace(line).split(" ").filter(Boolean);
  const hay = ` ${collapseSpace(replacement)} `;
  for (let len = words.length; len > 0; len -= 1) {
    for (let i = 0; i + len <= words.length; i += 1) {
      if (hay.includes(` ${words.slice(i, i + len).join(" ")} `)) return len;
    }
  }
  return 0;
}

// CHECK 3, and the one that generalises. Pure, per edit, needs no source: the
// anchor lines whose text does not survive into the replacement, each with how
// much of it did. Never an error — a supersession drops text on purpose and is
// indistinguishable from a deletion at this level, which is the entire reason
// this is printed at a human rather than decided by the tool.
function droppedAnchorLines(edit) {
  const out = [];
  for (const line of splitLines(edit.anchor)) {
    if (collapseSpace(line) === "") continue;
    if (isCarriedForward(edit.replacement, line)) continue;
    const words = collapseSpace(line).split(" ").filter(Boolean);
    out.push({ line, words: words.length, kept: longestSurvivingRun(edit.replacement, line) });
  }
  return out;
}

// Source lines immediately outside a LINE-ALIGNED anchor, or null when the anchor
// starts or ends mid-line — in which case the replacement's first line is not
// comparable with a whole source line and only the anchor-internal half of check
// 1 runs. 232 of the 298 corpus edits are line-aligned.
function lineContext(source, anchor) {
  const start = source.indexOf(anchor);
  if (start < 0) return null;
  const end = start + anchor.length;
  const alignedStart = start === 0 || source[start - 1] === "\n";
  const alignedEnd = end === source.length || source[end] === "\n";
  if (!alignedStart || !alignedEnd) return null;
  const lines = splitLines(source);
  const first = source.slice(0, start).split("\n").length - 1;
  const last = source.slice(0, end).split("\n").length - 1;
  return {
    before: first > 0 ? lines[first - 1] : null,
    after: last < lines.length - 1 ? lines[last + 1] : null,
  };
}

// CHECK 1. The replacement's first line claims to replace the anchor's first
// line. Compare it against that, and against the three lines a misalignment lands
// on instead — the anchor's own later lines, the line before, the line after. If
// a wrong candidate matches BETTER than the right one and the anchor's first line
// is nowhere in the replacement, the leading text is being dropped in silence.
//
// The tail runs the mirror comparison, byte-identical only. See the header: the
// fuzzy tail was built, measured, and refused a legitimate edit at the same score
// as a real corruption, so it is not here.
function findMisalignments(source, edits) {
  const found = [];
  edits.forEach((e, i) => {
    const label = e.label || `edit[${i}]`;
    const aL = splitLines(e.anchor);
    const rL = splitLines(e.replacement);
    const ctx = lineContext(source, e.anchor);

    const wrong = [];
    for (let k = 1; k < aL.length; k += 1) wrong.push([`the anchor's own line ${k + 1}`, aL[k]]);
    if (ctx && ctx.before !== null) wrong.push(["the source line BEFORE the anchor", ctx.before]);
    if (ctx && ctx.after !== null) wrong.push(["the source line AFTER the anchor", ctx.after]);

    // Head: exact tier, then the calibrated majority tier.
    const head = rL[0];
    if (head !== "" && !isCarriedForward(e.replacement, aL[0])) {
      const right = commonPrefixLength(head, aL[0]);
      let best = null;
      for (const [which, text] of wrong) {
        const n = commonPrefixLength(head, text);
        if (!best || n > best.n) best = { which, text, n };
      }
      if (best && best.n > right) {
        const exact = head === best.text;
        const ratio = best.n / Math.max(1, Math.min(head.length, best.text.length));
        if (exact || (best.n >= ECHO_MIN_CHARS && ratio >= ECHO_MIN_RATIO)) {
          found.push({
            label, index: i, side: "first", which: best.which, exact,
            chars: best.n, ratio, dropped: aL[0], candidate: best.text,
          });
        }
      }
    }

    // Tail: byte-identical whole-line only.
    const tail = rL[rL.length - 1];
    const anchorTail = aL[aL.length - 1];
    if (tail !== "" && tail !== anchorTail && !isCarriedForward(e.replacement, anchorTail)) {
      const wrongTail = [];
      for (let k = 0; k < aL.length - 1; k += 1) wrongTail.push([`the anchor's own line ${k + 1}`, aL[k]]);
      if (ctx && ctx.before !== null) wrongTail.push(["the source line BEFORE the anchor", ctx.before]);
      if (ctx && ctx.after !== null) wrongTail.push(["the source line AFTER the anchor", ctx.after]);
      const hit = wrongTail.find(([, text]) => text === tail);
      if (hit) {
        found.push({
          label, index: i, side: "last", which: hit[0], exact: true,
          chars: tail.length, ratio: 1, dropped: anchorTail, candidate: hit[1],
        });
      }
    }
  });
  return found;
}

// Adjacent identical NON-BLANK lines, counted by content. Blank lines repeat
// legitimately everywhere in prose; a repeated sentence does not.
function adjacentDuplicateCounts(text) {
  const counts = new Map();
  const lines = splitLines(text);
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === lines[i - 1] && lines[i].trim() !== "") {
      counts.set(lines[i], (counts.get(lines[i]) || 0) + 1);
    }
  }
  return counts;
}

// Where each replacement lands in the OUTPUT, so a new duplicate can be attributed
// to the edit that made it. Left to right with a running delta; the spans are the
// same ones findOverlaps has already proved disjoint.
function outputPlacements(source, edits) {
  const spans = spansOf(source, edits).slice().sort((a, b) => a.start - b.start);
  let delta = 0;
  return spans.map((s) => {
    const e = edits[s.index];
    const outStart = s.start + delta;
    const outEnd = outStart + e.replacement.length;
    delta += e.replacement.length - e.anchor.length;
    return { label: s.label, index: s.index, outStart, outEnd };
  });
}

// CHECK 2. Grades the OUTPUT, which is what makes it independent of check 1: it
// sees a duplicate however it arose, including at a seam between two edits.
function findNewAdjacentDuplicates(source, output, placements) {
  const was = adjacentDuplicateCounts(source);
  const now = adjacentDuplicateCounts(output);
  const found = [];
  const lines = splitLines(output);
  for (const [line, count] of now) {
    const before = was.get(line) || 0;
    if (count <= before) continue;
    // Attribute the pair by asking which replacement's output span covers EITHER
    // half of it. Either, not the second: the measured §5.6 shape makes the FIRST
    // half — the replacement opens with a copy of the line above its anchor — and
    // the second half is the untouched original, owned by no edit.
    let offset = 0;
    let culprit = null;
    for (let i = 0; i < lines.length; i += 1) {
      if (i > 0 && lines[i] === line && lines[i - 1] === line) {
        const first = offset - line.length - 1;
        const hit = (placements || []).find(
          (p) =>
            (offset < p.outEnd && p.outStart <= offset + line.length) ||
            (first < p.outEnd && p.outStart <= first + line.length)
        );
        if (hit) { culprit = hit.label; break; }
      }
      offset += lines[i].length + 1;
    }
    found.push({ line, was: before, now: count, culprit });
  }
  return found;
}

class ApplyError extends Error {
  constructor(message, reason) {
    super(message);
    this.name = "ApplyError";
    this.reason = reason;
  }
}

// Pure. Returns the edited string, or throws ApplyError having changed nothing.
// Every refusal names its own cause, because a gate that fails without saying
// which edit is a gate someone disables.
function applyEdits(source, edits) {
  if (!Array.isArray(edits)) {
    throw new ApplyError("edits must be an array", "not-an-array");
  }
  if (edits.length === 0) {
    throw new ApplyError("no edits given — refusing rather than writing the file unchanged", "empty");
  }

  edits.forEach((e, i) => {
    const label = e.label || `edit[${i}]`;
    if (typeof e.anchor !== "string" || typeof e.replacement !== "string") {
      throw new ApplyError(`${label}: anchor and replacement must both be strings`, "malformed");
    }
    if (e.anchor === "") {
      throw new ApplyError(`${label}: empty anchor matches everywhere`, "empty-anchor");
    }
    if ("allowsDuplicateLine" in e && typeof e.allowsDuplicateLine !== "string") {
      throw new ApplyError(
        `${label}: allowsDuplicateLine must be the exact line text it excuses, as a string`,
        "malformed"
      );
    }
    const n = countOccurrences(source, e.anchor);
    if (n !== 1) {
      throw new ApplyError(
        `${label}: anchor matched ${n} time(s), needs exactly 1 — nothing written`,
        n === 0 ? "no-match" : "ambiguous"
      );
    }
  });

  const overlaps = findOverlaps(spansOf(source, edits));
  if (overlaps.length > 0) {
    const lines = overlaps.map(
      ([a, b]) =>
        `  ${a.label} [${a.start}-${a.end}] overlaps ${b.label} [${b.start}-${b.end}]`
    );
    throw new ApplyError(
      "overlapping anchors — applying these in sequence would silently drop the " +
        "inner edit. Merge each pair into one edit and say so:\n" +
        lines.join("\n"),
      "overlap"
    );
  }

  // CHECK 1. Before anything is built, because a misaligned pair is an authoring
  // error and the author needs the pair named, not a diff of the result.
  const misaligned = findMisalignments(source, edits);
  if (misaligned.length > 0) {
    const lines = misaligned.map(
      (m) =>
        `  ${m.label}\n` +
        `    the replacement's ${m.side} line matches ${m.which}` +
        (m.exact ? " EXACTLY" : ` for ${m.chars} chars (${(m.ratio * 100).toFixed(0)}% of the line)`) +
        `,\n    better than the anchor line it claims to replace, and that anchor line\n` +
        `    appears nowhere in the replacement:\n` +
        `      anchor line dropped: ${JSON.stringify(m.dropped)}\n` +
        `      replacement matches: ${JSON.stringify(m.candidate)}`
    );
    throw new ApplyError(
      "misaligned replacement — the replacement is offset by a line against its own\n" +
        "anchor, so the outer anchor text would be replaced by nothing and the text it\n" +
        "carried left orphaned. This deleted a ruling sentence on 2026-09-02. There is\n" +
        "no override: SHRINK THE ANCHOR to the lines you are actually changing, which\n" +
        "is a smaller, clearer edit that passes every check here:\n" +
        lines.join("\n"),
      "misaligned"
    );
  }

  // Right to left, so earlier spans keep the offsets verified above.
  const ordered = edits
    .map((e, i) => ({ e, start: source.indexOf(e.anchor) , i }))
    .sort((a, b) => b.start - a.start);

  let out = source;
  for (const { e, start } of ordered) {
    out = out.slice(0, start) + e.replacement + out.slice(start + e.anchor.length);
  }

  // CHECK 2, on the built output — and the only refusal here with no way to
  // re-express the edit around it, which is why it is the only one with an
  // escape. `allowsDuplicateLine` must carry the duplicated line byte for byte,
  // so an escape written for one duplicate cannot excuse a different accidental
  // one. It is honoured from any edit in the set because attribution at a seam is
  // genuinely ambiguous, and an escape that needs you to guess the right edit is
  // an escape that fails when you need it.
  const duplicates = findNewAdjacentDuplicates(source, out, outputPlacements(source, edits))
    .filter((d) => !edits.some((e) => e.allowsDuplicateLine === d.line));
  if (duplicates.length > 0) {
    const lines = duplicates.map(
      (d) =>
        `  ${d.culprit || "(at a seam between edits — no single edit owns it)"}\n` +
        `    now adjacent to an identical copy of itself` +
        (d.was > 0 ? ` (${d.was} such pair(s) in the source, ${d.now} after)` : "") +
        `:\n      ${JSON.stringify(d.line)}`
    );
    throw new ApplyError(
      "new adjacent duplicate line(s) — applying these would put a line directly\n" +
        "beside an identical copy of itself that the source did not have. The measured\n" +
        "cause is a replacement that opens with a verbatim copy of the line ABOVE its\n" +
        "anchor. If the duplicate is genuinely wanted, say so on the edit with\n" +
        `"allowsDuplicateLine": "<the exact line>", which is printed when honoured:\n` +
        lines.join("\n"),
      "new-duplicate"
    );
  }

  return out;
}

// CHECK 3's presentation. The measurement that shaped it: 270 of 298 real edits
// drop at least one anchor line, 459 lines in total, so this had to be readable at
// two dozen edits or it would be scrolled past — which is the same fate as a gate
// that is always red. Hence one line per dropped line, the worst kind counted in
// the heading, and the edits left in the author's own order because this file does
// not reorder anything.
const REPORT_LINE_CAP = 200;

function showLine(line) {
  const trimmed = line.replace(/\s+$/, "");
  if (trimmed.length <= REPORT_LINE_CAP) return trimmed;
  return `${trimmed.slice(0, REPORT_LINE_CAP)}… [+${trimmed.length - REPORT_LINE_CAP} chars]`;
}

function showLabel(label) {
  return label.length > 72 ? `${label.slice(0, 71)}…` : label;
}

// Never throws: it runs beside a refusal as well as beside a success, and a
// report that dies on the malformed edit you are being told about is no report.
function buildReport(edits, output) {
  if (!Array.isArray(edits)) return "";
  const rows = [];
  let clean = 0;
  let vanished = 0;
  edits.forEach((e, i) => {
    if (typeof e.anchor !== "string" || typeof e.replacement !== "string" || e.anchor === "") return;
    const dropped = droppedAnchorLines(e);
    if (dropped.length === 0) { clean += 1; return; }
    vanished += dropped.filter((d) => d.kept === 0).length;
    rows.push({ label: e.label || `edit[${i}]`, index: i, dropped });
  });

  const out = [];
  if (rows.length > 0) {
    out.push(
      `DROPPED ANCHOR CONTENT — a report, never a refusal. ${rows.length} of ${edits.length} edit(s) do not`,
      "carry some of their anchor's text into the replacement. A supersession drops text",
      "on purpose and a misaligned replacement drops it by accident, and the two are",
      "identical from here: the operator is the only reader who can tell them apart."
    );
    if (vanished > 0) {
      out.push(`  ${vanished} line(s) below lost EVERY word. Read those first.`);
    }
    out.push("");
    for (const r of rows) {
      out.push(`  edit[${r.index}] ${showLabel(r.label)}`);
      for (const d of r.dropped) {
        out.push(`    kept ${d.kept} of ${d.words} words | ${showLine(d.line)}`);
      }
    }
    out.push("");
    out.push(`  ${clean} edit(s) carried every anchor line forward.`);
  } else {
    out.push(`DROPPED ANCHOR CONTENT: none — all ${edits.length} edit(s) carry every anchor line forward.`);
  }

  // A declared escape announces itself, and announces itself LOUDER once it stops
  // being needed: an unused one is a self-cancelling marker telling the next
  // author to delete it.
  const escapes = edits.filter((e) => typeof e.allowsDuplicateLine === "string");
  if (escapes.length > 0) {
    out.push("");
    for (const e of escapes) {
      const label = showLabel(e.label || "edit");
      const used = typeof output === "string" && splitLines(output).some(
        (l, i, all) => i > 0 && l === e.allowsDuplicateLine && all[i - 1] === e.allowsDuplicateLine
      );
      out.push(
        `DUPLICATE ESCAPE ${used ? "HONOURED" : "DECLARED BUT UNUSED — delete it"}: ${label}`,
        `    ${showLine(e.allowsDuplicateLine)}`
      );
    }
  }
  return `${out.join("\n")}\n`;
}

function main(argv) {
  const args = argv.filter((a) => a !== "--dry-run");
  const dryRun = argv.includes("--dry-run");
  if (args.length < 2) {
    process.stderr.write("usage: node apply-edits.js <file> <edits.json> [--dry-run]\n");
    return 1;
  }
  const [file, editsPath] = args;
  let source;
  let edits;
  try {
    source = fs.readFileSync(file, "utf8");
  } catch (err) {
    process.stderr.write(`cannot read ${file}: ${err.message}\n`);
    return 1;
  }
  try {
    edits = JSON.parse(fs.readFileSync(editsPath, "utf8"));
  } catch (err) {
    process.stderr.write(`cannot read edits ${editsPath}: ${err.message}\n`);
    return 1;
  }

  // Every check runs here, in one place, and --dry-run branches only AFTER it.
  // That is what makes a clean dry run a promise about the apply: there is no
  // second code path for it to be true on.
  let out = null;
  let refusal = null;
  try {
    out = applyEdits(source, edits);
  } catch (err) {
    refusal = err;
  }
  process.stdout.write(buildReport(edits, out));
  if (refusal) {
    process.stderr.write(`REFUSED (${refusal.reason || "error"}): ${refusal.message}\n`);
    return 1;
  }

  if (dryRun) {
    process.stdout.write(`${edits.length} edit(s) would apply cleanly to ${file}\n`);
    return 0;
  }
  fs.writeFileSync(file, out);
  process.stdout.write(`applied ${edits.length} edit(s) to ${file}\n`);
  return 0;
}

module.exports = {
  applyEdits,
  countOccurrences,
  findOverlaps,
  spansOf,
  ApplyError,
  // the pair checks, exported so each can be graded on its own
  droppedAnchorLines,
  findMisalignments,
  findNewAdjacentDuplicates,
  adjacentDuplicateCounts,
  outputPlacements,
  lineContext,
  longestSurvivingRun,
  buildReport,
  ECHO_MIN_CHARS,
  ECHO_MIN_RATIO,
};

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

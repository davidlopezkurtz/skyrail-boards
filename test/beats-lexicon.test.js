"use strict";

// THE BEAT LEXICON GUARD — the DOCS half of the name-collision guard.
//
// Why. test/lexicon.test.js guards the boards' name surface and says, in its own
// header, what it provably cannot catch: "anything in docs/ — the halt defect was
// a spec sentence, and no source-side guard sees a spec."
// docs/name-collisions-audit-2026-09-01.md §4 rules on it: "And it does not cover
// docs/ ... If only one further thing is done after the guard lands, it should be
// the spec-vs-source sweep of the twelve beat files. That is where the next one
// is." The sweep ran and found nineteen bridges (§6). This is its mechanical
// residue.
//
// The defect class. A beat governs one board; the board sits on one side of the
// desk/city seam; a token means one thing per side. A BRIDGE is a beat sentence
// using a token in the OTHER side's meaning:
//   * cfd-209:396 pre-registered a null in which the player "sends once from the
//     free Halt" — the LINE board's route. On the board that beat governs the
//     Halt is HOME and notice("halt") never lights. It went past a signature and
//     a PASS.
//   * cfd-210:299 priced a press-on at "a 68% shot at 10 more" — the Halt route's
//     chance and pay. The board rolls Mosswake at 64 for 14. It survived two
//     re-cuts, a five-line canon sweep and a signature.
//   * cfd-200:345 and its stake HEADING quoted "3 provisions and the Chartered
//     toll of 1 — 4 marks" on a beat re-based onto the storm board, where
//     provisions come off `s.stores` and only the toll off `s.marks`.
// None of these is visible to any source-side test: the boards are all correct.
//
// ---------------------------------------------------------------------------
// HOW EXEMPTION WORKS HERE, AND WHY IT IS NOT A GRAMMAR
//
// The first cut of this file carried five rules that keyed on the SHAPE of prose:
// a note's opening words, a REFUSED keyword, a heading phrase, an attribution
// keyword. An adversarial review planted eleven live bridges that passed green,
// including one wrapped in `*(This bullet prices the press-on at a 68% shot at 10
// more …)*` — the exact form this file's own failure message used to recommend.
// Prose shape is free to write, so an exemption keyed on it is free to buy.
//
// There is now ONE exemption, and it is evidence:
//
//   SUPERSEDED — the occurrence sits inside a QUOTATION inside an italic
//   parenthetical, AND the same phrase appears nowhere else in that block outside
//   such quotations. That is the difference between MENTIONING a phrase and USING
//   it: a real supersession quotes the old wording and the live text no longer
//   makes the claim. Every landed supersession in this corpus has both halves;
//   none of the planted fakes has either.
//
// Everything else that is not a bridge must be DECLARED by a person in
// test/beats-lexicon-ledger.js, counted and self-cancelling: RECORD_SECTIONS (a
// provenance section, per file, with a ceiling), LIVE_BRIDGES (the beat really
// says it, ruled), DECLARED_OCCURRENCES (a correct use, with a reason). Anything
// undeclared is red.
//
// The cost is real and is stated in the ledger: a new occurrence of a declared
// shape needs a ledger line whether or not it is a bridge. That is the price of
// an exemption nobody can write their way past.
// ---------------------------------------------------------------------------
//
// Test-only. It reads docs/ and sit/*/sim.js and writes nothing.
//
// WHICH TREE IT READS. The corpus directory is `SKYRAIL_BEATS_DIR` if set and
// `<repo>/docs` otherwise — that is how the red-first run is done: the beats at a
// past commit are extracted with `git show <sha>:docs/<file>` into a scratch
// directory and the suite is pointed at it. `sit/` is always this tree's, and
// `sit/` and `public/` are byte-identical across the trees graded here, so the
// derived beat->board map is the same at each. The LINEAGE and the provisions
// UNIT come from test/lexicon-ledger.js, which did NOT exist at 796d9a2 — so a
// run against the pre-sweep corpus is a RETROSPECTIVE grading of the old beats
// against today's declared membership, which is legitimate and is said in those
// words rather than as "only the prose moved".
//
// Determinism: no clock, no timer, no random source; the last test asserts it.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const L = require("./lexicon-ledger.js");   // the SOURCE half: membership and units
const B = require("./beats-lexicon-ledger.js");

const ROOT = path.join(__dirname, "..");
const SIT = path.join(ROOT, "sit");
const BEATS_DIR = process.env.SKYRAIL_BEATS_DIR
  ? path.resolve(process.env.SKYRAIL_BEATS_DIR)
  : path.join(ROOT, "docs");
const NL = String.fromCharCode(10);

const fail = (lines) => lines.join(NL);

// ===========================================================================
// THE DERIVATION. Everything below is measured from the tree; nothing is typed.
// It is fenced here rather than in a third module because it has one consumer,
// unlike lexicon-derive.js which both the ledger's conventions and the test read.
//
// Rules it keeps, the same three the source half keeps:
//   * READ-ONLY, and it never require()s a board — the map comes out of the sim
//     header's text, so a board that throws at require is still mapped.
//   * ONE instrument. Blocks, sentences, headings, notes and quotations are cut
//     ONCE, here, and every shape and every register is graded against that cut.
//   * Prefer null to a plausible answer. A block whose `*(` never closes is not
//     guessed at: parseNotes throws, naming the file and line.
// ===========================================================================

/** LF-normalised text of one corpus file. */
function readBeat(file) {
  return fs.readFileSync(path.join(BEATS_DIR, file), "utf8").replace(/\r\n/g, "\n");
}

/** Offset -> 1-based line number, via one prefix scan per file. */
function lineIndex(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === "\n") starts.push(i + 1);
  return (offset) => {
    let lo = 0, hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  };
}

/**
 * Fenced code blocks are blanked, length-preserving, before anything is graded.
 * A fence is a verbatim quotation of source, not governing prose, and this
 * guard's `pays[:\s]{1,4}10` pattern is literally the sim's own syntax — grading
 * a quoted route object as a prose claim is a category error. Length-preserving
 * so every offset and line number below still names the real file.
 *
 * HTML comments and footnote definitions are deliberately NOT blanked; the
 * reasoning and the measurement are in the ledger's REFUSED_SHAPES.
 */
function blankFences(src) {
  const lines = src.split("\n");
  let inFence = false;
  const out = lines.map((line) => {
    const isFence = /^\s*```/.test(line);
    if (isFence) { inFence = !inFence; return " ".repeat(line.length); }
    return inFence ? " ".repeat(line.length) : line;
  });
  return out.join("\n");
}

/**
 * Blocks: blank-line-separated runs, with offsets — the unit a markdown
 * paragraph, list, table or blockquote actually occupies here. It is what bounds
 * the note scan, so an unclosed `*(` cannot swallow the rest of a file (a
 * whole-file scan measurably did: one span of 30,713 characters).
 */
function blocksOf(src) {
  const out = [];
  const re = /\n[ \t]*\n/g;
  let start = 0, m;
  while ((m = re.exec(src))) {
    out.push({ start, end: m.index, text: src.slice(start, m.index) });
    start = m.index + m[0].length;
  }
  out.push({ start, end: src.length, text: src.slice(start) });
  return out.filter((b) => b.text.trim() !== "");
}

// An italic parenthetical opener. The lookbehind is load-bearing and was found by
// running without it: a BOLD run opening on a bracket — `**(a) is already
// shipped.**` at cfd-201, `**(iii) flips the terrace's rate advantage**` at
// cfd-203 — puts a `*` immediately before a `(`, and a naive `\*\(` reads the
// second asterisk of `**` as the start of a note.
const NOTE_OPEN = "(?<!\\*)\\*\\(";

/**
 * Italic parentheticals, and the QUOTED SPANS inside each. No opener allowlist:
 * the first cut kept one and the review measured its contribution at zero, then
 * bought an exemption by writing an allowlisted opener over a live bridge. What
 * matters is not how a note opens but whether the phrase inside it is QUOTED and
 * absent from the live text — see `supersededBy` below.
 *
 * Straight and curly double quotes both count: the supersession landed at
 * 238aebe is written with curly ones.
 */
function parseNotes(file, src, blocks) {
  const notes = [];
  const lineAt = lineIndex(src);
  for (const block of blocks) {
    const re = new RegExp(NOTE_OPEN + "([\\s\\S]*?)\\)\\*", "g");
    let residue = block.text;
    let m;
    while ((m = re.exec(block.text))) {
      const bodyStart = block.start + m.index + 2;
      const quotes = [];
      const qre = /"[^"]*"|“[^”]*”/g;
      let q;
      while ((q = qre.exec(m[1]))) quotes.push({ start: bodyStart + q.index, end: bodyStart + q.index + q[0].length });
      notes.push({
        start: block.start + m.index,
        end: block.start + m.index + m[0].length,
        body: m[1],
        quotes,
        blockStart: block.start,
      });
      residue = residue.slice(0, m.index) + " ".repeat(m[0].length) + residue.slice(m.index + m[0].length);
    }
    const stray = new RegExp(NOTE_OPEN).exec(residue);
    if (stray) {
      throw new Error(
        `${file}:${lineAt(block.start + stray.index)} — a block opens an italic parenthetical '*(' that ` +
          `never closes with ')*' inside the block. Refused rather than half-read.`,
      );
    }
  }
  return notes;
}

/** Headings, in order. */
function parseHeadings(src) {
  const out = [];
  const re = /^(#{1,6})[ \t]+(.*)$/gm;
  let m;
  while ((m = re.exec(src))) out.push({ offset: m.index, level: m[1].length, text: m[2].trim() });
  return out;
}

function enclosingHeadings(headings, offset) {
  const stack = [];
  for (const h of headings) {
    if (h.offset > offset) break;
    while (stack.length && stack[stack.length - 1].level >= h.level) stack.pop();
    stack.push(h);
  }
  return stack;
}

/**
 * Sentences within a block. Split after `.`, `!` or `?` followed by whitespace,
 * EXCEPT between digits — this corpus is full of `6.80`, `baseRisk 0.08`,
 * `§7.1.4` and `sim.js:74-75`, and splitting inside one would cut a shape in half
 * and hide it.
 *
 * A markdown TABLE ROW is a record, not a clause, and rows are independent:
 * without that split, cfd-203's inheritance table (no terminal punctuation)
 * collapsed into one 3,000-character "sentence" and the co-occurrence shape fired
 * across three unrelated rows. Blockquote lines are NOT split — cfd-200's bridge
 * sentence spans two `>` lines, provisions on the first and the marks total on
 * the second.
 */
function sentencesOf(block) {
  const out = [];
  const t = block.text;
  let start = 0;
  const push = (from, to) => { if (t.slice(from, to).trim() !== "") out.push({ start: block.start + from, end: block.start + to, text: t.slice(from, to) }); };
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === "\n" && t[i + 1] === "|") { push(start, i + 1); start = i + 1; continue; }
    if (c !== "." && c !== "!" && c !== "?") continue;
    if (c === "." && /[0-9]/.test(t[i - 1] || "") && /[0-9]/.test(t[i + 1] || "")) continue;
    let j = i + 1;
    while (j < t.length && /["'`)*\]]/.test(t[j])) j++;
    if (j < t.length && !/\s/.test(t[j])) continue;
    while (j < t.length && /\s/.test(t[j])) j++;
    push(start, j);
    start = j;
    i = j - 1;
  }
  if (start < t.length) push(start, t.length);
  return out;
}

/** One corpus file, cut once. */
function cut(file) {
  const src = blankFences(readBeat(file));
  const blocks = blocksOf(src);
  const sentences = [];
  blocks.forEach((b, i) => sentencesOf(b).forEach((s) => sentences.push(Object.assign({ blockIndex: i }, s))));
  return {
    file, src, blocks, sentences,
    notes: parseNotes(file, src, blocks),
    headings: parseHeadings(src),
    lineAt: lineIndex(src),
  };
}

// --- the beat -> board map, derived where it can be -------------------------

function boardDirs() {
  return fs.readdirSync(SIT, { withFileTypes: true })
    .filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

/**
 * The beat a board's own sim.js header names. Matched by the `Spec:` label, with
 * the path pulled OUT of the line, because the shape of the line varies: eleven
 * read `// Spec: docs/cfd-NNN-beat.md (...)` and dawnspur-scale's reads
 * `// Spec: the TOP section of docs/cfd-183-beat.md (...)`. dawnspur-heat has no
 * such line — its header names an issue, "CFD-176 sitting" — so it derives to
 * null and must be declared.
 */
function derivedBeatOf(board) {
  const src = fs.readFileSync(path.join(SIT, board, "sim.js"), "utf8").replace(/\r\n/g, "\n");
  for (const line of src.split("\n").slice(0, 40)) {
    if (!/^\s*\/\/\s*Spec:/i.test(line)) continue;
    const m = /docs\/([A-Za-z0-9._-]+\.md)/.exec(line);
    if (m) return m[1];
    return { error: `${board}: the Spec: line names no docs/ path — ${line.trim()}` };
  }
  return null;
}

function beatFilesOnTree() {
  return fs.readdirSync(BEATS_DIR).filter((f) => f.endsWith(".md")).sort();
}

function boardMap() {
  const map = {};
  for (const board of boardDirs()) {
    const derived = derivedBeatOf(board);
    const declared = B.BOARD_BEATS_DECLARED[board];
    map[board] = {
      derived: typeof derived === "string" ? derived : null,
      derivedError: derived && derived.error ? derived.error : null,
      declared: declared ? declared.beat : null,
      beat: typeof derived === "string" ? derived : declared ? declared.beat : null,
      how: typeof derived === "string" ? "derived" : declared ? "declared" : "UNKNOWN",
    };
  }
  return map;
}

/**
 * beat file -> { board, lineage, provisionsUnit }. Lineage and unit are READ OUT
 * of test/lexicon-ledger.js — DESK/CITY for the side, ROWS.provisions[board].unit
 * for the food-vs-marks question — never re-declared here. A beat with no board
 * takes both from its declared parent.
 */
function beatMap() {
  const bm = boardMap();
  const lineageOf = {};
  for (const b of L.DESK) lineageOf[b] = "desk";
  for (const b of L.CITY) lineageOf[b] = "city";
  const unitOf = (board) => {
    const row = L.ROWS.provisions && L.ROWS.provisions.boards[board];
    return row ? row.unit : null;
  };
  const out = {};
  for (const board of Object.keys(bm)) {
    const beat = bm[board].beat;
    if (!beat) continue;
    out[beat] = { board, via: bm[board].how, lineage: lineageOf[board] || null, provisionsUnit: unitOf(board) };
  }
  for (const beat of Object.keys(B.BEATS_WITHOUT_BOARD)) {
    const parent = B.BEATS_WITHOUT_BOARD[beat].parent;
    out[beat] = {
      board: null, parent, via: "parent",
      lineage: lineageOf[parent] || null, provisionsUnit: unitOf(parent),
    };
  }
  return out;
}

const BEAT_MAP = beatMap();
const ON_TREE = beatFilesOnTree();
const CORPUS = ON_TREE.filter((f) => BEAT_MAP[f] && !B.NON_BEAT_DOCS[f]);

function appliesTo(side, beat) {
  const e = BEAT_MAP[beat];
  if (!e) return false;
  if (side === "city") return e.lineage === "city";
  if (side === "desk") return e.lineage === "desk";
  if (side === "provisions-as-food") return e.provisionsUnit === "food";
  throw new Error(`unknown side ${JSON.stringify(side)} — declared sides are city / desk / provisions-as-food`);
}

// --- one formatter, used for matching, for evidence and for the printout -----

/**
 * Returns the normalised text and an index map, so a match in the formatted text
 * names a real line in the real file. A guard that prints a line number computed
 * on normalised text prints a line number nobody can open.
 *
 * Line-leading blockquote markers go with the line wrapping: cfd-200's bridge
 * sentence is wrapped inside a `>` quotation, and leaving the markers in makes
 * the shape windows measure markup instead of prose.
 */
function squashWithMap(s) {
  let text = "";
  const map = [];
  let i = 0;
  const atLineStart = (k) => k === 0 || s[k - 1] === "\n";
  while (i < s.length) {
    if (atLineStart(i)) {
      const m = /^[ \t]*>[ \t]?/.exec(s.slice(i));
      if (m && m[0].length) { i += m[0].length; continue; }
    }
    if (/\s/.test(s[i])) {
      const start = i;
      while (i < s.length && /\s/.test(s[i]) && !(atLineStart(i) && /^[ \t]*>/.test(s.slice(i)))) i++;
      if (text.length) { text += " "; map.push(start); }
      continue;
    }
    map.push(i);
    text += s[i];
    i++;
  }
  while (text.endsWith(" ")) { text = text.slice(0, -1); map.pop(); }
  return { text, map };
}

const squash = (s) => squashWithMap(s).text;

// --- matching ---------------------------------------------------------------

/**
 * Every occurrence of one shape in one cut file, before any register is applied.
 * Three graders, and each exists because something evaded the others:
 *   patterns         one sentence
 *   all + anchor     one sentence, OR that sentence and the one after it in the
 *                    same block — the review split the flagship defect at a full
 *                    stop and the first cut went green
 *   headingPatterns  a heading, which is not a sentence and has no neighbours —
 *                    cfd-200's stake heading was missed by the sweep and by the
 *                    first cut for exactly that reason
 */
function occurrencesOf(shape, doc) {
  const hits = [];
  const record = (sentence, phrase, offset) => hits.push({ sentence, phrase, offset });

  if (shape.patterns) {
    for (const sentence of doc.sentences) {
      const { text, map } = squashWithMap(sentence.text);
      for (const re of shape.patterns) {
        const rx = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
        let m;
        while ((m = rx.exec(text))) {
          record(sentence, m[0], sentence.start + map[m.index]);
          if (m.index === rx.lastIndex) rx.lastIndex++;
        }
      }
    }
  }

  if (shape.all) {
    doc.sentences.forEach((sentence, i) => {
      const next = doc.sentences[i + 1] && doc.sentences[i + 1].blockIndex === sentence.blockIndex
        ? doc.sentences[i + 1] : null;
      const spans = next
        ? [{ s: sentence, text: squash(sentence.text) + " " + squash(next.text) }]
        : [];
      spans.unshift({ s: sentence, text: squash(sentence.text) });
      for (const span of spans) {
        if (!shape.all.every((re) => re.test(span.text))) continue;
        const { text, map } = squashWithMap(sentence.text);
        const m = shape.anchor.exec(text);
        // The anchor may live in the successor; report the sentence that carries
        // it, so the line printed is the line the words are on.
        if (m) { record(sentence, m[0], sentence.start + map[m.index]); break; }
        if (next) {
          const n = squashWithMap(next.text);
          const m2 = shape.anchor.exec(n.text);
          if (m2) { record(next, m2[0], next.start + n.map[m2.index]); break; }
        }
      }
    });
  }

  if (shape.headingPatterns) {
    for (const h of doc.headings) {
      for (const re of shape.headingPatterns) {
        const m = re.exec(h.text);
        if (m) {
          const sentence = { start: h.offset, end: h.offset + h.text.length, text: h.text, blockIndex: -1, isHeading: true };
          record(sentence, m[0], h.offset + h.text.indexOf(m[0]));
        }
      }
    }
  }

  // ONE occurrence per shape per sentence, keeping the longest phrase. Three
  // graders over one row will hit the same sentence twice — cfd-210:299 matched
  // both `68% shot at 10` and `68` — and a defect reported twice is a defect
  // counted twice by every register below, which pins BY SENTENCE.
  const best = new Map();
  for (const h of hits) {
    const key = `${h.sentence.start}`;
    const prev = best.get(key);
    if (!prev || h.phrase.length > prev.phrase.length) best.set(key, h);
  }
  return [...best.values()].sort((a, b) => a.offset - b.offset);
}

// --- the one evidence rule, and the three declared registers ----------------

/**
 * THE EVIDENCE RULE. An occurrence is superseded when both halves hold:
 *   (a) it sits inside a QUOTATION inside an italic parenthetical — the phrase is
 *       being mentioned, not used; and
 *   (b) the same phrase appears nowhere else in that block outside such
 *       quotations — the live text no longer makes the claim.
 *
 * Neither half is a prose shape anyone can adopt by accident or on purpose while
 * still asserting the bridge: (a) fails the moment the claim is stated rather
 * than quoted, and (b) fails the moment the live text still says it. The review's
 * `*(This bullet prices the press-on at a 68% shot at 10 more …)*` fails (a); a
 * note that quotes the phrase while the paragraph above still asserts it fails
 * (b), which is also what closes the "one note covers two bridges in a block"
 * hole the review found.
 */
function supersededBy(hit, doc) {
  const note = doc.notes.find((n) => hit.offset >= n.start && hit.offset < n.end);
  if (!note) return { ok: false, why: "the match is not inside any *( ... )* parenthetical in its block" };
  // INTERSECTS a quotation, not "starts inside one": a matched phrase can
  // straddle the opening quote mark. cfd-210's own withdrawal note reads
  // `*(This paragraph first proposed that free send as "the Halt, 68 for 10." …)*`
  // and the shape matches `free send as "the Halt`, which begins one word before
  // the quote opens.
  const hitEnd = hit.offset + hit.phrase.length;
  const quoted = note.quotes.find((q) => hit.offset < q.end && hitEnd > q.start);
  if (!quoted) {
    return {
      ok: false,
      why: "the match IS inside an italic parenthetical, but NOT inside a quotation in it — the note " +
        "states the claim rather than quoting a superseded one. A supersession quotes the wording it " +
        "replaces; this asserts it",
    };
  }
  const block = doc.blocks.find((b) => hit.offset >= b.start && hit.offset < b.end);
  let live = block.text;
  for (const n of doc.notes) {
    if (n.blockStart !== block.start) continue;
    for (const q of n.quotes) {
      const s = q.start - block.start, e = q.end - block.start;
      live = live.slice(0, s) + " ".repeat(e - s) + live.slice(e);
    }
  }
  const phrase = squash(hit.phrase).toLowerCase();
  if (squash(live).toLowerCase().includes(phrase)) {
    return {
      ok: false,
      why: `the note quotes ${JSON.stringify(hit.phrase)}, but the block still says it outside that ` +
        "quotation — a supersession replaces the claim, it does not sit beside it",
    };
  }
  return { ok: true, note: squash(note.body).slice(0, 90) };
}

/** The record sections declared for one file, with their extents. */
function recordSectionsOf(doc) {
  const declared = B.RECORD_SECTIONS.filter((r) => r.file === doc.file);

  const out = [];
  for (const row of declared) {
    const idx = doc.headings.findIndex((h) => h.text === row.heading);
    if (idx < 0) { out.push({ row, missing: true }); continue; }
    // A section runs to THE NEXT HEADING OF ANY LEVEL. Not "the next heading of
    // the same or a shallower level", and not "the next heading that is not
    // itself declared": the review nested a live `#### The numbers as they stand
    // today` under the record `###` and hid a bridge in it, and a run of three
    // adjacent declared sections would otherwise be swallowed whole by the first,
    // whose ceiling would then be counting all three. Every declared section
    // therefore covers exactly its own text and nothing below a subheading.
    const next = doc.headings[idx + 1];
    out.push({ row, start: doc.headings[idx].offset, end: next ? next.offset : doc.src.length });
  }
  return out;
}

/** A declared register row matching this occurrence, by file + shape + sentence. */
function declaredRow(rows, hit, doc, shapeName) {
  return rows.find((r) =>
    r.file === doc.file && r.shape === shapeName &&
    r.sentences.some((s) => squash(hit.sentence.text).includes(s) || s.includes(squash(hit.sentence.text))));
}

/** Every occurrence in the corpus, dispositioned. */
function sweep(shapes) {
  const docs = {};
  const all = [];
  for (const name of Object.keys(shapes)) {
    const shape = shapes[name];
    for (const beat of CORPUS) {
      if (!appliesTo(shape.side, beat)) continue;
      const doc = docs[beat] || (docs[beat] = cut(beat));
      const sections = recordSectionsOf(doc);
      for (const hit of occurrencesOf(shape, doc)) {
        const row = {
          shape: name, beat, line: doc.lineAt(hit.offset), phrase: squash(hit.phrase),
          sentence: squash(hit.sentence.text).slice(0, 150),
          headings: enclosingHeadings(doc.headings, hit.offset).map((h) => h.text),
          tried: [],
        };
        const sup = supersededBy(hit, doc);
        if (sup.ok) { row.by = "SUPERSEDED"; row.note = sup.note; all.push(row); continue; }
        row.tried.push(`SUPERSEDED: ${sup.why}`);

        const inSection = sections.find((s) => !s.missing && hit.offset >= s.start && hit.offset < s.end);
        if (inSection) { row.by = "RECORD_SECTION"; row.section = inSection.row; all.push(row); continue; }
        row.tried.push(
          `RECORD_SECTIONS: no section declared for ${doc.file} encloses it — it sits under ` +
            (row.headings.length ? row.headings.map((h) => JSON.stringify(h)).join(" > ") : "(no heading)"));

        const live = declaredRow(B.LIVE_BRIDGES, hit, doc, name);
        if (live) { row.by = "LIVE_BRIDGE"; row.live = live; all.push(row); continue; }
        row.tried.push("LIVE_BRIDGES: no ruled row names this sentence");

        const dec = declaredRow(B.DECLARED_OCCURRENCES, hit, doc, name);
        if (dec) { row.by = "DECLARED"; row.declared = dec; all.push(row); continue; }
        row.tried.push("DECLARED_OCCURRENCES: no declared row names this sentence");

        row.by = null;
        all.push(row);
      }
    }
  }
  return all;
}

function render(row) {
  return [
    `  ${row.beat}:${row.line}  [${row.shape}]  ${JSON.stringify(row.phrase)}`,
    `      sentence: ${JSON.stringify(row.sentence)}`,
    `      under: ${row.headings.length ? row.headings.join(" > ") : "(no heading)"}`,
    `      what it crosses into: ${B.SHAPES[row.shape].by}`,
    ...row.tried.map((t) => `      not accounted for — ${t}`),
    "      Do one of these, in this order of preference:",
    "        1. CORRECT the live sentence, so the beat stops making the claim.",
    "        2. SUPERSEDE it: replace the live wording, and add an italic parenthetical that QUOTES",
    "           the old wording. This guard checks BOTH — that the phrase is quoted, and that the",
    "           block no longer says it outside that quotation. Wrapping the live claim in a note",
    "           does nothing.",
    "        3. If it is a ruled and deliberately unfixed bridge, add a LIVE_BRIDGES row with the",
    "           ruling; if it is a correct use, add a DECLARED_OCCURRENCES row with the reason.",
    "           Both are counted and pinned by sentence, so they cancel themselves when the text moves.",
    "        Never widen a pattern to make a run pass.",
  ].join(NL);
}

// ===========================================================================
// THE TESTS
// ===========================================================================

test("the corpus is readable: every beat cuts into blocks, sentences, headings and notes, or the file is refused by name", () => {
  const broken = [];
  for (const beat of CORPUS) {
    try { cut(beat); } catch (e) { broken.push(`${beat}: ${e.message}`); }
  }
  assert.deepEqual(broken, [], fail([
    `Corpus files the derivation could not read (SKYRAIL_BEATS_DIR = ${BEATS_DIR}).`,
    "Every later failure on these is a consequence of this one.",
    ...broken.map((x) => "  " + x),
  ]));
});

test("the map is DERIVED where it can be: every board's beat comes out of its own sim.js Spec: line, or is declared by name with a reason", () => {
  const map = boardMap();
  const problems = [];
  for (const board of Object.keys(map)) {
    const m = map[board];
    if (m.derivedError) problems.push(m.derivedError);
    if (m.how === "UNKNOWN") {
      problems.push(
        `${board}: sit/${board}/sim.js names no 'Spec: docs/<file>.md' in its first 40 lines and there ` +
        `is no BOARD_BEATS_DECLARED entry. Add one with the reason — a board whose spec cannot be ` +
        `found is a board whose beat nobody is grading.`);
    }
    if (m.derived && m.declared) {
      problems.push(
        `${board}: derives ${m.derived} from its own header AND carries a BOARD_BEATS_DECLARED entry ` +
        `for ${m.declared}. The declaration has outlived the fact it stood in for — delete it.`);
    }
  }
  assert.deepEqual(problems, [], fail(["Beat map (test/beats-lexicon-ledger.js BOARD_BEATS_DECLARED):", ...problems.map((p) => "  " + p)]));
});

test("every .md on the corpus tree is a beat that governs a board, a beat declared to govern none, or a declared non-beat — and never both", () => {
  const unaccounted = ON_TREE.filter((f) => !BEAT_MAP[f] && !B.NON_BEAT_DOCS[f]);
  // A file in BOTH registers is dropped from CORPUS and graded by nothing. The
  // review injected NON_BEAT_DOCS["cfd-210-beat.md"] and the whole suite stayed
  // green with the guard's own flagship file silenced.
  const both = Object.keys(B.NON_BEAT_DOCS).filter((f) => BEAT_MAP[f]);
  assert.deepEqual(unaccounted, [], fail([
    `Files under ${BEATS_DIR} that nothing accounts for:`,
    ...unaccounted.map((f) => `  ${f} — no board names it as its Spec, it is not in BEATS_WITHOUT_BOARD, ` +
      `and it is not in NON_BEAT_DOCS. Declare which it is.`),
  ]));
  assert.deepEqual(both, [], fail([
    "Files declared NON_BEAT_DOCS that a board also names as its spec:",
    ...both.map((f) => `  ${f} — governs ${BEAT_MAP[f].board || BEAT_MAP[f].parent}, and is silenced by ` +
      `its NON_BEAT_DOCS line. One ledger line must not be able to drop a graded beat.`),
  ]));
});

test("the corpus's sides are read out of the SOURCE ledger, never re-declared: every graded beat resolves to a lineage, and the food beats resolve through ROWS.provisions", () => {
  const problems = [];
  for (const beat of CORPUS) {
    const e = BEAT_MAP[beat];
    if (!e.lineage) {
      problems.push(
        `${beat} -> ${e.board || `(no board; parent ${e.parent})`} is in neither DESK nor CITY in ` +
        `test/lexicon-ledger.js. That file's own test fails first; fix the membership there.`);
    }
  }
  const food = CORPUS.filter((b) => appliesTo("provisions-as-food", b)).sort();
  assert.deepEqual(problems, [], fail(["Side resolution:", ...problems.map((p) => "  " + p)]));
  assert.ok(food.length > 0, fail([
    "No beat on this tree resolves to provisions-as-food, so the provisions shape grades nothing.",
    "Silence grades as failure: either ROWS.provisions stopped declaring a food board, or the map lost",
    "the beats that govern line and storm.",
  ]));
});

test("NO BRIDGE: every occurrence of a declared shape is superseded on evidence, or declared by a person — anything else is a bridge", () => {
  const rows = sweep(B.SHAPES);
  const bridges = rows.filter((r) => !r.by);
  assert.deepEqual(bridges.map((r) => `${r.beat}:${r.line} ${r.shape}`), [], fail([
    `Cross-lineage bridges in the beat corpus (${BEATS_DIR}), ${bridges.length} of them:`,
    "",
    ...bridges.map(render),
    "",
    "Each is a sentence in a beat using a token in the meaning it has on the OTHER side of the",
    "desk/city seam. This is the class that survived a signature (cfd-210), a pass (cfd-209:396) and",
    "two re-cuts (cfd-210:299) — every board involved was correct, and no source-side test saw it.",
  ]));
});

test("RECORD_SECTIONS: every declared provenance section still exists, and none absorbs more occurrences than its declared ceiling", () => {
  const rows = sweep(B.SHAPES);
  const problems = [];
  for (const beat of CORPUS) {
    const doc = cut(beat);
    for (const s of recordSectionsOf(doc)) {
      if (s.missing) {
        problems.push(
          `${beat}: no heading reads ${JSON.stringify(s.row.heading)} any more. A record section that ` +
          `has been renamed or removed no longer exempts anything — re-point the row or delete it, and ` +
          `re-read what it was covering.`);
        continue;
      }
      const mine = rows.filter((r) => r.beat === beat && r.by === "RECORD_SECTION" && r.section === s.row);
      // A section declares WHICH shapes its provenance holds. That is not
      // decoration: without it, deleting the whole `the-halt-routes-own-numbers`
      // row from SHAPES left this suite green, because a shape that no longer
      // exists is a shape no per-shape floor iterates over. The sections that
      // exist because of a shape are the thing that can still name it.
      for (const shapeName of s.row.shapes || []) {
        if (!B.SHAPES[shapeName]) {
          problems.push(
            `${beat} / ${JSON.stringify(s.row.heading)}: declares shape ${JSON.stringify(shapeName)}, ` +
            `which is not in SHAPES. A record section is provenance FOR something; if that shape has ` +
            `been deleted, this section is exempting occurrences of a shape nothing grades.`);
          continue;
        }
        if (!mine.some((r) => r.shape === shapeName)) {
          problems.push(
            `${beat} / ${JSON.stringify(s.row.heading)}: declares shape ${JSON.stringify(shapeName)} ` +
            `and absorbs no occurrence of it. Either the shape stopped reaching this text (re-derive ` +
            `before trusting the green) or the section no longer holds what it says it holds.`);
        }
      }
      const n = mine.length;
      if (n > s.row.ceiling) {
        problems.push(
          `${beat} / ${JSON.stringify(s.row.heading)}: absorbs ${n} occurrences, ceiling ${s.row.ceiling}.` + NL +
          `      A provenance section grew a new cross-lineage claim. Read the new one: if it is record, ` +
          `raise the ceiling ONLY with that reading written down; if it is live, it does not belong here.`);
      }
    }
  }
  assert.deepEqual(problems, [], fail(["RECORD_SECTIONS (test/beats-lexicon-ledger.js):", ...problems.map((p) => "  " + p)]));
});

test("LIVE_BRIDGES and DECLARED_OCCURRENCES: every declared row still matches exactly as many occurrences as it declares — a row cancels itself when the text moves", () => {
  const rows = sweep(B.SHAPES);
  const drift = [];
  const check = (register, label, disposition) => {
    for (const decl of register) {
      if (!B.SHAPES[decl.shape]) { drift.push(`${label} names shape ${JSON.stringify(decl.shape)}, which is not in SHAPES`); continue; }
      if (!CORPUS.includes(decl.file)) continue;
      const found = rows.filter((r) => r.beat === decl.file && r.by === disposition &&
        (disposition === "LIVE_BRIDGE" ? r.live === decl : r.declared === decl));
      if (found.length !== decl.occurrences) {
        drift.push(
          `${label} ${decl.file} [${decl.shape}]: declared ${decl.occurrences}, matched ${found.length}` +
          (found.length ? " at " + found.map((f) => `:${f.line}`).join(", ") : "") + "." + NL +
          (found.length < decl.occurrences
            ? "      FEWER than declared — the row has cancelled itself. If the text was corrected or " +
              "superseded, CLOSE the row and record where it went; do not lower the count to pass."
            : "      MORE than declared — adjudicate the new one before raising the count.") + NL +
          `      On record: ${decl.ruling || decl.why}`);
      }
    }
  };
  check(B.LIVE_BRIDGES, "LIVE_BRIDGES", "LIVE_BRIDGE");
  check(B.DECLARED_OCCURRENCES, "DECLARED_OCCURRENCES", "DECLARED");
  assert.deepEqual(drift, [], fail(["Declared-register drift:", ...drift.map((d) => "  " + d)]));
});

test("every SHAPE still reaches the corpus: a shape that matches nothing grades nothing, and would land green while it rots", () => {
  const rows = sweep(B.SHAPES);
  const dead = Object.keys(B.SHAPES).filter((name) => !rows.some((r) => r.shape === name));
  assert.deepEqual(dead, [], fail([
    "Shapes that matched no occurrence anywhere in the corpus, in any disposition:",
    ...dead.map((n) => `  ${n} — cut from ${(B.SHAPES[n].corpus || []).length} confirmed occurrence(s), ` +
      `and now reaching none of them.`),
    "",
    "Silence grades as failure. Deleting any one shape used to leave this suite green; the corpus",
    "occurrences the shapes were cut from are still there, so a shape that stops matching has been",
    "broken, not vindicated. Re-derive before trusting a green.",
    `  corpus: ${CORPUS.join(", ")}`,
  ]));
});

test("shapes with a zero corpus are pinned at zero — the day a beat writes one, it is adjudicated instead of guessed at", () => {
  const found = [];
  for (const name of Object.keys(B.UNEXERCISED_SHAPES)) {
    const u = B.UNEXERCISED_SHAPES[name];
    for (const beat of CORPUS) {
      if (!appliesTo(u.side, beat)) continue;
      const src = blankFences(readBeat(beat));
      const lineAt = lineIndex(src);
      const rx = new RegExp(u.pattern.source, u.pattern.flags.includes("g") ? u.pattern.flags : u.pattern.flags + "g");
      let m;
      while ((m = rx.exec(src))) {
        found.push(`${name}: ${beat}:${lineAt(m.index)} ${JSON.stringify(m[0])}`);
        if (m.index === rx.lastIndex) rx.lastIndex++;
      }
    }
  }
  assert.deepEqual(found, [], fail([
    "A shape declared UNEXERCISED — pinned at zero because the corpus had no instance to cut a real",
    "pattern from — now has one:",
    ...found.map((f) => "  " + f),
    "",
    "Do not delete the pin and do not widen it. Read the occurrence, decide whether it is a bridge, and",
    "either promote it to a SHAPES row cut from these words, or record here why it is not one.",
  ]));
});

test("every REFUSED shape states what was tried, over WHICH corpus, and what was measured — a refusal with no number is an opinion, and one with the wrong corpus is worse", () => {
  const bad = [];
  for (const name of Object.keys(B.REFUSED_SHAPES)) {
    const r = B.REFUSED_SHAPES[name];
    if (!r.tried) bad.push(`${name}: no 'tried' — say what pattern was refused`);
    if (!r.corpus) {
      bad.push(`${name}: no 'corpus' — the first cut's halt-near-send figure was taken over six of the ` +
        `seven city beats and published as fact. A measurement that does not name its file set cannot ` +
        `be re-run.`);
    }
    if (!r.measured || !/[0-9]/.test(r.measured)) {
      bad.push(`${name}: 'measured' carries no figure. Count the hits and paste the count.`);
    }
  }
  assert.deepEqual(bad, [], fail(["REFUSED_SHAPES rows that cannot be re-run:", ...bad.map((b) => "  " + b)]));
});

test("determinism: this guard's two files read no clock, set no timer and roll no die", () => {
  const files = ["beats-lexicon.test.js", "beats-lexicon-ledger.js"];
  // Assembled from fragments so this file's own text cannot satisfy it.
  const banned = new RegExp("\\b(" + [
    "Date\\." + "now", "new " + "Date", "performance\\." + "now", "Math\\." + "random",
    "set" + "Timeout", "set" + "Interval", "set" + "Immediate", "process\\." + "hrtime",
  ].join("|") + ")\\b");
  for (const f of files) {
    // Whole-line comments only. Stripping to end-of-line on any `//` truncated
    // the ledger's own `/\/dawnspur-dispatch\//` row at the regex, so the scan
    // was one literal away from blinding itself on a line of real code.
    const code = fs.readFileSync(path.join(__dirname, f), "utf8").replace(/^\s*\/\/.*$/gm, "");
    const m = banned.exec(code);
    assert.equal(m ? m[0] : null, null, `test/${f} reaches for ${m && m[0]} — the guard must be deterministic`);
  }
});

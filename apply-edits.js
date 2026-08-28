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

  // Right to left, so earlier spans keep the offsets verified above.
  const ordered = edits
    .map((e, i) => ({ e, start: source.indexOf(e.anchor) , i }))
    .sort((a, b) => b.start - a.start);

  let out = source;
  for (const { e, start } of ordered) {
    out = out.slice(0, start) + e.replacement + out.slice(start + e.anchor.length);
  }
  return out;
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

  let out;
  try {
    out = applyEdits(source, edits);
  } catch (err) {
    process.stderr.write(`REFUSED (${err.reason || "error"}): ${err.message}\n`);
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

module.exports = { applyEdits, countOccurrences, findOverlaps, spansOf, ApplyError };

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

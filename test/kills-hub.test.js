"use strict";

// THE HUB-TO-LEDGER COUPLING — ordered by counsel's ruling on the open decisions
// ledger's entry 7 (docs/decisions-open-2026-09-02.md), 2026-09-09, and landed in
// the same commit as the KILLS.md records it grades.
//
// KILLS.md is the ledger of sittings: every board the hub (public/index.html)
// tags "live — passed its sit" has a PASSED record in KILLS.md that names the
// board's path in backticks, exactly as the hub hrefs it, next to the PASSED
// marker; and every path so keyed is a board the hub tags passed. Both
// directions, so a pass cannot enter one document and not the other.
//
// KEYING, and why it is this shape (the working model that preceded this test
// got it wrong twice): a RECORD is a top-level "- " bullet plus its indented
// continuation lines; a record is a PASSED record if it carries the token
// PASSED; the board it records is a backticked `/path/` within WINDOW
// characters of a PASSED marker. Backticked, because the starve-or-feed record
// says "public/dawnspur/" in prose and a bare-path scan reads that as a claim
// that /dawnspur/ passed (it did not — it is the preserved kill). Windowed,
// because the Mosswake record QUOTES the next beat's do-not-recut pin, which
// names `/mosswake-loop/` a second time; a whole-record scan is satisfied by a
// quotation rather than by the record's own subject line.
//
// Red-first at e226a9f (the parent of the landing commit): KILLS.md there keyed
// no path to a PASSED marker at all, so the reads-something test fails and the
// first direction fails naming all eleven boards. That output is pasted in the
// landing commit's body.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const HUB = fs.readFileSync(path.join(ROOT, "public/index.html"), "utf8");
const KILLS = fs.readFileSync(path.join(ROOT, "KILLS.md"), "utf8");
const WINDOW = 60;

function hubBoards(html) {
  const passed = new Set();
  const all = new Set();
  const tagRe = /<a class="board[^"]*" href="(\/[a-z0-9-]+\/)">\s*<span class="tag">live — passed its sit[^<]*<\/span>/g;
  const boardRe = /<a class="board[^"]*" href="(\/[a-z0-9-]+\/)">/g;
  let m;
  while ((m = tagRe.exec(html))) passed.add(m[1]);
  while ((m = boardRe.exec(html))) all.add(m[1]);
  return { passed, all };
}

function ledgerPassed(md) {
  const records = [];
  let cur = null;
  for (const line of md.split("\n")) {
    if (/^- /.test(line)) { cur = { text: line }; records.push(cur); }
    else if (cur && /^\s+\S/.test(line)) cur.text += "\n" + line;
    else cur = null;
  }
  const keyed = new Map();
  for (const r of records) {
    const flat = r.text.replace(/\s+/g, " ");
    const marks = [];
    const pm = /PASSED/g;
    let mm;
    while ((mm = pm.exec(flat))) marks.push(mm.index);
    if (!marks.length) continue;
    const pr = /`(\/[a-z0-9-]+\/)`/g;
    while ((mm = pr.exec(flat))) {
      const at = mm.index;
      if (marks.some((k) => Math.abs(k - at) <= WINDOW)) keyed.set(mm[1], (keyed.get(mm[1]) || 0) + 1);
    }
  }
  return keyed;
}

const hub = hubBoards(HUB);
const keyed = ledgerPassed(KILLS);

test("the hub tags at least one board passed and KILLS.md keys at least one PASSED path (the instrument reads something)", () => {
  assert.ok(hub.passed.size > 0, "no board on the hub is tagged \"live — passed its sit\" — the tag markup changed; fix the reader, not the ledger");
  assert.ok(keyed.size > 0, "no backticked path sits within " + WINDOW + " characters of a PASSED marker in KILLS.md");
});

test("every board the hub tags passed has a PASSED record in KILLS.md naming its path (entry 7: passes enter the ledger of sittings)", () => {
  const missing = [...hub.passed].filter((p) => !keyed.has(p)).sort();
  assert.deepEqual(missing, [], "hub says passed, KILLS.md has no PASSED record naming the path in backticks within " + WINDOW + " characters of the marker: " + missing.join(", ") + " — add the record with the path as the hub hrefs it; do not retag the hub");
});

test("every path KILLS.md keys to a PASSED marker is a board the hub tags passed (no pass is recorded that the hub does not show)", () => {
  const extra = [...keyed.keys()].filter((p) => !hub.passed.has(p)).sort();
  assert.deepEqual(extra, [], "KILLS.md keys a PASSED record to a path the hub does not tag passed: " + extra.map((p) => p + (hub.all.has(p) ? " (a hub board, tagged something else)" : " (not a hub board)")).join(", "));
});

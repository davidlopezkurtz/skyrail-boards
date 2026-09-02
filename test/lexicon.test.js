"use strict";

// THE LEXICON GUARD — a derived inventory of every board's name surface,
// diffed against a declared ledger of shared names and their meaning per
// lineage. Test-only: it touches no byte under sit/, public/ or docs/.
//
// Why. The boards under sit/, each tested alone, share most of their names, and
// the audit of 2026-09-01 (docs/name-collisions-audit-2026-09-01.md) found the same
// name meaning different things across the desk/city seam in each of its
// findings — `provisions` is food on dawnspur-line and marks on
// dice-at-the-places with the identical numeric row; `commitSend("dawnspur-halt")`
// validates on the desk and DISCARDS the argument in the city, sending to
// Mosswake and returning true; `wait()` is inert on every board but
// dawnspur-heat, where it settles the board after WARM has already ended the
// sitting. Every one of those shipped green, because no test loads two
// boards. Documentation of the same facts has failed repeatedly (sim headers,
// walk DSLs, MANIFESTs, a signed REFUSED row). The one intervention that held
// was mechanical. This is that shape, cross-board.
//
// Shape (the house shape: scripts/lib/plan-facts.mjs + tests/plan-facts.test.mjs,
// src/save-renames.js + its gate, in the parent repo):
//   * ONE derivation — test/lexicon-derive.js — read-only over the boards.
//   * ONE declared ledger — test/lexicon-ledger.js — membership, rows,
//     UNADJUDICATED, walk legends, DOM rows.
//   * Every failure prints DERIVED next to DECLARED and names the row.
//   * Rows are DRIVEN, not just read: the wait mutator is reached through
//     heat's own commits, each asserted true; the armed inversion is reached
//     from the opening on all four boards; the SEND argument-discard is a
//     self-cancelling pin that goes red the day a refusal lands.
//
// What it catches: a shared name acquiring a new board, a changed signature
// (kind / arity / opening / keys), an undeclared board, a unit or debit target
// moving under a numeric name (source pins), a walk legend changing, a DOM
// token moving board. What it provably does NOT catch: a name changing meaning
// on a board it already occupies in a way no declared column expresses, and
// anything in docs/ — the halt defect was a spec sentence, and no source-side
// guard sees a spec.
//
// Determinism: the last test reads this file, the derivation and the ledger
// and refuses any clock, timer or random source. Rolls are injected.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const D = require("./lexicon-derive.js");
const L = require("./lexicon-ledger.js");

const INV = D.inventory();
const SEAM = D.seam(INV, L.DESK, L.CITY);
const NL = String.fromCharCode(10);

const lineageOf = {};
for (const b of L.DESK) lineageOf[b] = "desk";
for (const b of L.CITY) lineageOf[b] = "city";

const rowsOn = (surface) =>
  Object.keys(L.ROWS).filter((name) => L.ROWS[name].surface === surface);

/** Boards a row declares on the EXPORT surface (card-surface entries excluded). */
function exportBoards(row) {
  return Object.keys(row.boards).filter((b) => row.boards[b].surface !== "card").sort();
}

/** Every board's signature of `name`, for a failure message. */
function describe(name) {
  return (SEAM.index[name] || [])
    .map((b) => `      ${b.padEnd(20)} ${D.signature(INV[b].exports[name])}  [${lineageOf[b] || "UNPLACED"}]`)
    .join(NL);
}

function fail(lines) {
  return lines.join(NL);
}

// A probe is a getter name, `name(args)` with comma-separated literal args
// (no dots in an argument), or a dotted path whose FIRST segment is either of
// those and whose later segments are property reads: `record.marksLost`,
// `litJobs().length`.
function probe(b, key) {
  const [head, ...rest] = key.split(".");
  const call = /^(\w+)\((.*)\)$/.exec(head);
  let value;
  if (!call) {
    value = b[head];
  } else {
    const args = call[2].trim() === "" ? [] : call[2].split(",").map((a) => {
      const t = a.trim();
      if (t === "true") return true;
      if (t === "false") return false;
      if (/^-?\d+$/.test(t)) return Number(t);
      return t;
    });
    value = b[call[1]](...args);
  }
  for (const seg of rest) value = value == null ? undefined : value[seg];
  return value;
}

/**
 * Drive a board from its opening through the declared path, asserting every
 * step returned true — the fixture is PROVEN reachable before it is read —
 * then evaluate the expectations in order.
 */
function drive(rowName, board, spec) {
  // `roll` is a number (every draw) or an array consumed in order, the last
  // value repeating — so a path can bank a paid run BEFORE the short one that
  // arms, which is what makes a gate assertion discriminating: at 1 mark
  // canSend() is false for want of the stake whatever `armed` says.
  const queue = Array.isArray(spec.roll) ? spec.roll.slice() : null;
  const extra = spec.roll === null || spec.roll === undefined ? {}
    : { roll: () => (queue ? (queue.length > 1 ? queue.shift() : queue[0]) : spec.roll) };
  const b = D.fresh(board, extra);
  spec.path.forEach(([fn, ...args], i) => {
    assert.equal(
      typeof b[fn], "function",
      `ROWS.${rowName}.boards["${board}"].drives: step ${i} names ${fn}(), which ${board} does not export`,
    );
    const ok = b[fn](...args);
    assert.equal(
      ok, true,
      `ROWS.${rowName}.boards["${board}"].drives: step ${i} ${fn}(${args.map((a) => JSON.stringify(a)).join(", ")}) ` +
        `returned ${JSON.stringify(ok)} — the declared path is no longer reachable from the opening, ` +
        `so nothing after it is a measurement. Re-derive the path before trusting the row.`,
    );
  });
  spec.expect.forEach(([key, want]) => {
    const got = probe(b, key);
    assert.equal(
      got, want,
      `ROWS.${rowName}.boards["${board}"]: after ${spec.path.map((s) => s[0]).join(" > ")}` +
        (extra.roll ? ` (roll ${spec.roll})` : "") + `, ${key} is ${JSON.stringify(got)}; the ledger declares ${JSON.stringify(want)}.` +
        NL + `  Either the board changed (its bytes are pinned — file that) or the row is wrong (edit the row).`,
    );
  });
  return b;
}

// ---------------------------------------------------------------------------

test("every board under sit/ derives — a sim that throws at require, or an object the instrument refuses, is one named red, not a vanished file", () => {
  const broken = Object.keys(INV).filter((b) => INV[b].error).map((b) => `${b}: ${INV[b].error}`);
  assert.deepEqual(broken, [], fail(["Boards the derivation could not read (test/lexicon-derive.js inventory()); every later failure on these boards is a consequence of this one:", ...broken.map((x) => "  " + x)]));
});

test("membership is declared, never inferred: every sit/ board is in exactly one of DESK / CITY, every public-only board is listed out of scope", () => {
  const dirs = D.boardDirs();
  const desk = new Set(L.DESK);
  const city = new Set(L.CITY);
  const pub = D.publicOnlyDirs();
  const problems = {
    undeclared: dirs.filter((d) => !desk.has(d) && !city.has(d)),
    inBothLists: dirs.filter((d) => desk.has(d) && city.has(d)),
    declaredButAbsent: [...L.DESK, ...L.CITY].filter((d) => !dirs.includes(d)),
    publicOnlyUndeclared: pub.filter((d) => !(d in L.PUBLIC_ONLY)),
    publicOnlyStale: Object.keys(L.PUBLIC_ONLY).filter((d) => !pub.includes(d)),
  };
  assert.deepEqual(
    problems,
    { undeclared: [], inBothLists: [], declaredButAbsent: [], publicOnlyUndeclared: [], publicOnlyStale: [] },
    fail([
      "test/lexicon-ledger.js: membership drift.",
      `  sit/ boards:      ${JSON.stringify(dirs)}`,
      `  DESK:             ${JSON.stringify(L.DESK)}`,
      `  CITY:             ${JSON.stringify(L.CITY)}`,
      `  public-only dirs: ${JSON.stringify(pub)}   PUBLIC_ONLY: ${JSON.stringify(Object.keys(L.PUBLIC_ONLY))}`,
      "  A new board declares itself by joining exactly one list; a public-only board by a PUBLIC_ONLY entry with its reason.",
    ]),
  );
});

test("the seam: every name exported on both sides of the desk/city seam has a ledger row, and no row names a token nothing exports", () => {
  const rows = new Set(rowsOn("export"));
  const missing = SEAM.cross.filter((n) => !rows.has(n));
  const orphan = rowsOn("export").filter((n) => !SEAM.index[n]);
  // An unplaced board makes the seam unmeasurable, and an unmeasurable seam
  // is a FAILURE, not an empty intersection.
  assert.deepEqual(
    { missing, orphan, unplaced: SEAM.unplaced },
    { missing: [], orphan: [], unplaced: [] },
    fail([
      `Seam under the declared membership (${L.DESK.length} desk / ${L.CITY.length} city boards): ` +
        `${SEAM.cross.length} names cross — ${SEAM.cross.join(", ")}.`,
      missing.length ? `MISSING ROWS (${missing.length}) — each needs a row in test/lexicon-ledger.js ROWS with kind / arity per board, a meaning per side, pins and an adjudication:` : "",
      ...missing.map((n) => `  ${n}:` + NL + describe(n)),
      orphan.length ? `ORPHAN ROWS — declared but no board exports them: ${orphan.join(", ")}` : "",
      SEAM.unplaced.length ? `UNPLACED BOARDS (see the membership test): ${SEAM.unplaced.join(", ")}` : "",
    ]),
  );
});

test("coverage: every name shared by two or more boards is in exactly one of ROWS / UNADJUDICATED, and every UNADJUDICATED name is still shared within the lineage it is listed under", () => {
  const shared = Object.keys(SEAM.index).filter((n) => SEAM.index[n].length >= 2).sort();
  const rows = new Set(rowsOn("export"));
  const unadj = { desk: new Set(L.UNADJUDICATED.desk), city: new Set(L.UNADJUDICATED.city) };
  const listedIn = (n) => [rows.has(n) ? "ROWS" : null, unadj.desk.has(n) ? "UNADJUDICATED.desk" : null, unadj.city.has(n) ? "UNADJUDICATED.city" : null].filter(Boolean);
  const uncovered = shared.filter((n) => listedIn(n).length === 0);
  const doubled = shared.filter((n) => listedIn(n).length > 1).map((n) => `${n} (${listedIn(n).join(" + ")})`);
  const stale = [];
  for (const side of ["desk", "city"]) {
    for (const n of L.UNADJUDICATED[side]) {
      if (SEAM.cross.includes(n)) stale.push(`${n}: listed UNADJUDICATED.${side} but it now CROSSES the seam — it needs a row`);
      else if (!SEAM.within[side].includes(n)) stale.push(`${n}: listed UNADJUDICATED.${side} but it is not shared by two ${side} boards (boards: ${JSON.stringify(SEAM.index[n] || [])})`);
    }
  }
  assert.deepEqual(
    { uncovered, doubled, stale },
    { uncovered: [], doubled: [], stale: [] },
    fail([
      `${shared.length} names are shared by >=2 boards; ${rows.size} have rows; UNADJUDICATED lists ${unadj.desk.size} desk + ${unadj.city.size} city.`,
      uncovered.length ? `UNCOVERED (${uncovered.length}) — add each to ROWS (if adjudicated) or to UNADJUDICATED.<lineage> (names only):` : "",
      ...uncovered.map((n) => `  ${n.padEnd(18)} on ${SEAM.index[n].join(", ")}`),
      doubled.length ? `DOUBLED — a name is in more than one place: ${doubled.join("; ")}` : "",
      ...stale.map((s) => "  STALE " + s),
    ]),
  );
});

// The audit's findings, each mapped to the row that carries it. A ledger that
// quietly drops one of these is a ledger that forgot why it exists.
const AUDIT_FINDINGS = {
  "§1.1 provisions": ["ROWS", "provisions"],
  "§1.2 canSend": ["ROWS", "canSend"],
  "§1.2 commitSend": ["ROWS", "commitSend"],
  "§1.3 wait": ["ROWS", "wait"],
  "§1.4 halt": ["ROWS", "halt"],
  "§1.5 stopped": ["ROWS", "stopped"],
  "§1.5 commitHome": ["ROWS", "commitHome"],
  "§1.6 home": ["DOM_ROWS", "home"],
  "§1.7 marksLost (inside record)": ["ROWS", "record"],
  "§1.8 carryYield": ["ROWS", "carryYield"],
  "§1.9 marks": ["ROWS", "marks"],
  "§1.10 armed": ["ROWS", "armed"],
  "§1.11 buildings": ["ROWS", "buildings"],
  "§2 the consist (ids)": ["ROWS", "consist"],
  "§2 the consist (DOM train/consist)": ["DOM_ROWS", "train/consist"],
  "C13 delta: lit": ["DOM_ROWS", "lit"],
};

test("the audit's findings each keep a row — the ledger cannot quietly drop one", () => {
  const missing = Object.entries(AUDIT_FINDINGS)
    .filter(([, [table, name]]) => !(name in L[table]))
    .map(([finding, [table, name]]) => `${finding}: expected ${table}["${name}"]`);
  assert.deepEqual(missing, [], fail(["Rows the audit requires are missing from test/lexicon-ledger.js:", ...missing.map((m) => "  " + m)]));
});

// HIGH means MEASURED. A row ranked HIGH or CONTESTED must carry, on every
// board it names, at least one column the test can DRIVE or pin in source —
// drives, sourcePin, discardsArgument, mutates, or (ids rows) where. A HIGH
// row that is only read is a documentation row, and documentation has failed
// at this exact task four times.
test("HIGH means measured: every HIGH / CONTESTED row carries a driven or source-pinned column on every board it names", () => {
  const unmeasured = [];
  for (const name of Object.keys(L.ROWS)) {
    const row = L.ROWS[name];
    if (row.adjudication !== "HIGH" && row.adjudication !== "CONTESTED") continue;
    for (const b of Object.keys(row.boards)) {
      const e = row.boards[b];
      const measured = Array.isArray(e.drives) || e.sourcePin instanceof RegExp || typeof e.discardsArgument === "boolean" ||
        typeof e.mutates === "boolean" || typeof e.where === "string";
      if (!measured) unmeasured.push(`ROWS.${name}.boards["${b}"] (${row.adjudication}) is only read — add drives / sourcePin / discardsArgument / mutates, or lower the adjudication and say why`);
    }
  }
  assert.deepEqual(unmeasured, [], fail(["Rows ranked HIGH or CONTESTED with no measured column:", ...unmeasured.map((u) => "  " + u)]));
});

test("signatures: every export row names exactly the boards that export the token, with the derived kind / arity / opening / keys, and every source pin still matches the sim", () => {
  const drift = [];
  for (const name of rowsOn("export")) {
    const row = L.ROWS[name];
    const declared = exportBoards(row);
    const derived = SEAM.index[name] || [];
    for (const b of derived) if (!declared.includes(b)) drift.push(`${name}: ${b} exports it (${D.signature(INV[b].exports[name])}) but the row does not name it`);
    for (const b of declared) {
      if (!INV[b]) { drift.push(`${name}: the row names ${b}, which is not a board under sit/`); continue; }
      const got = INV[b].exports[name];
      if (!got) { drift.push(`${name}: the row names ${b}, which does not export it`); continue; }
      const want = row.boards[b];
      if (want.kind === "getter" && !("opening" in want) && !("keys" in want) && !("array" in want)) {
        // signature() renders an entry with none of these as `getter=undefined`,
        // which a function-valued getter also renders as — an unintended match.
        drift.push(`${name} on ${b}: a getter entry must declare opening / keys / array`);
        continue;
      }
      if (D.signature(got) !== D.signature(want)) drift.push(`${name} on ${b}: derived ${D.signature(got)} / declared ${D.signature(want)}`);
      if (want.sourcePin && !want.sourcePin.test(D.simCode(b))) drift.push(`${name} on ${b}: sit/${b}/sim.js (comments stripped) no longer matches the source pin ${want.sourcePin}`);
    }
  }
  assert.deepEqual(drift, [], fail(["Export-row signature drift (derived vs declared, test/lexicon-ledger.js ROWS):", ...drift.map((d) => "  " + d)]));
});

test("SEND: the argument is DISCARDED on the arity-0 boards and validated on the others — driven from the opening; self-cancelling the day a city board refuses", () => {
  const can = L.ROWS.canSend.boards;
  const commit = L.ROWS.commitSend.boards;
  assert.deepEqual(Object.keys(can).sort(), Object.keys(commit).sort(), "canSend and commitSend rows must name the same boards");
  for (const board of Object.keys(commit).sort()) {
    const row = commit[board];
    const where = row.moves;
    // (1) "dawnspur-halt" — the one argument that returns true on BOTH lineages, for unrelated reasons.
    const a = D.fresh(board);
    const before = a[where];
    assert.equal(a.commitSend("dawnspur-halt"), true, `${board}: commitSend("dawnspur-halt") from the opening should return true (desk: the free halt route; city: the argument is ignored)`);
    assert.notEqual(a[where], before, `${board}: commitSend("dawnspur-halt") returned true but ${where} did not move`);
    if (where === "consistAt") assert.equal(a.consistAt, "mosswake", `${board}: the city send goes to Mosswake whatever the argument says`);
    // (2) a nonsense id, and (3) no id at all.
    for (const args of [["NONSENSE"], []]) {
      const b = D.fresh(board);
      const label = `commitSend(${args.map((x) => JSON.stringify(x)).join("")})`;
      const canRet = b.canSend(...args);
      const ret = b.commitSend(...args);
      if (row.discardsArgument) {
        assert.equal(canRet, true, `${board}: canSend ledger says discardsArgument:true, but can${label.slice(6)} is false`);
        assert.equal(ret, true, `${board}: ${label} no longer fires — the refusal has landed. Flip discardsArgument to false on the canSend and commitSend rows; this pin has cancelled itself.`);
        assert.equal(b.consistAt, "mosswake", `${board}: ${label} returned true but the consist did not move`);
      } else {
        assert.equal(canRet, false, `${board}: canSend validates its id, so can${label.slice(6)} must be false`);
        assert.equal(ret, false, `${board}: ${label} must be refused on a board that validates its id`);
        assert.equal(b[where], before, `${board}: a refused send must not move ${where}`);
      }
    }
  }
});

test("provisions: the same numeric row is FOOD on line and storm and MARKS on dispatch, dice and two-ways — cards() keys derived, unit and debit line pinned in source", () => {
  const row = L.ROWS.provisions;
  const drift = [];
  const withCards = Object.keys(INV).filter((b) => INV[b].cards !== null).sort();
  const declaredCards = Object.keys(row.boards).filter((b) => row.boards[b].surface === "card").sort();
  for (const b of withCards) if (!declaredCards.includes(b)) drift.push(`${b} has cards() but the provisions row has no card entry for it — keys: ${INV[b].cards[0].keys.join(",")}`);
  for (const b of declaredCards) {
    const want = row.boards[b];
    const card = INV[b].cards && INV[b].cards.find((c) => c.id === want.card);
    if (!card) { drift.push(`${b}: no card with id ${JSON.stringify(want.card)} (cards: ${JSON.stringify((INV[b].cards || []).map((c) => c.id))})`); continue; }
    for (const k of ["pays", "provisions", "toll"]) if (card[k] !== want.values[k]) drift.push(`${b} card ${want.card}: ${k} derived ${card[k]} / declared ${want.values[k]}`);
    if (card.hasStake !== want.stakeKey) drift.push(`${b} card ${want.card}: \`stake\` is ${card.hasStake ? "" : "NOT "}a key of the card; the row declares stakeKey ${want.stakeKey} (keys: ${card.keys.join(",")})`);
    if (!want.sourcePin.test(D.simCode(b))) drift.push(`${b}: sim.js no longer matches the debit pin ${want.sourcePin} (unit ${want.unit}, target ${want.debitTarget})`);
  }
  for (const b of Object.keys(row.boards)) {
    const want = row.boards[b];
    if (want.surface === "card") continue;
    const inv = INV[b];
    for (const k of ["pays", "provisions", "toll"]) {
      const got = inv.exports[k] && inv.exports[k].opening;
      if (got !== want.values[k]) drift.push(`${b}: getter ${k} opens at ${JSON.stringify(got)} / declared ${want.values[k]}`);
    }
    if ("stores" in inv.exports) drift.push(`${b}: exports \`stores\` — the row says provisions are marks here with no food sink`);
  }
  assert.deepEqual(drift, [], fail(["provisions row drift (test/lexicon-ledger.js ROWS.provisions):", ...drift.map((d) => "  " + d)]));
});

test("ids: halt is a route id on the desk, the home position in the city and nothing on dawnspur-halt; consist is a building on halt and a place on the map boards — derived from places() / buildings() / cards() / consistAt", () => {
  const drift = [];
  const bagOf = (b) => {
    const inv = INV[b];
    const bag = new Map(); // id -> where it was seen
    for (const id of inv.placeIds || []) bag.set(id, (bag.get(id) || []).concat("places"));
    for (const id of inv.buildingIds || []) bag.set(id, (bag.get(id) || []).concat("buildings"));
    for (const c of inv.cards || []) bag.set(c.id, (bag.get(c.id) || []).concat("cards"));
    return bag;
  };
  for (const name of rowsOn("ids")) {
    const row = L.ROWS[name];
    for (const b of Object.keys(INV)) {
      const bag = bagOf(b);
      const hits = [...bag.keys()].filter((id) => row.pattern.test(id));
      const want = row.boards[b];
      if (!want) {
        if (hits.length) drift.push(`${name}: ${b} carries id(s) ${JSON.stringify(hits)} (${hits.map((h) => bag.get(h).join("+")).join(", ")}) but the row does not name it`);
        if (INV[b].consistAt !== null && row.pattern.test(INV[b].consistAt)) drift.push(`${name}: ${b} opens with consistAt ${JSON.stringify(INV[b].consistAt)} but the row does not name it`);
        continue;
      }
      if (want.where === "absent") {
        if (hits.length) drift.push(`${name}: ${b} is declared ABSENT but carries ${JSON.stringify(hits)}`);
        continue;
      }
      const seen = bag.get(want.id) || [];
      if (!seen.includes(want.where)) drift.push(`${name}: ${b} declares ${JSON.stringify(want.id)} in ${want.where}; derived ${seen.length ? seen.join("+") : "nothing"} (ids seen: ${JSON.stringify([...bag.keys()])})`);
      const extra = hits.filter((h) => h !== want.id);
      if (extra.length) drift.push(`${name}: ${b} also carries ${JSON.stringify(extra)}, which the row does not declare`);
      if (want.consistAt && INV[b].consistAt !== want.id) drift.push(`${name}: ${b} declares consistAt opens at ${JSON.stringify(want.id)}; derived ${JSON.stringify(INV[b].consistAt)}`);
      if (!want.consistAt && INV[b].consistAt !== null && row.pattern.test(INV[b].consistAt)) drift.push(`${name}: ${b} opens with consistAt ${JSON.stringify(INV[b].consistAt)}, undeclared`);
    }
  }
  assert.deepEqual(drift, [], fail(["ids-surface drift (test/lexicon-ledger.js ROWS.halt / ROWS.consist):", ...drift.map((d) => "  " + d)]));
});

test("buildings: dawnspur-halt's is the real one (structures, no places()); every other carrier is an alias of places()", () => {
  const row = L.ROWS.buildings;
  const drift = [];
  for (const b of Object.keys(row.boards)) {
    const inv = INV[b];
    const want = row.boards[b];
    if (!inv || inv.buildingIds === null) { drift.push(`${b}: no buildings()`); continue; }
    const isAlias = inv.placeIds !== null && JSON.stringify(inv.placeIds) === JSON.stringify(inv.buildingIds);
    if (isAlias !== want.aliasOfPlaces) drift.push(`${b}: buildings() ${JSON.stringify(inv.buildingIds)} vs places() ${JSON.stringify(inv.placeIds)} — derived alias ${isAlias} / declared ${want.aliasOfPlaces}`);
  }
  assert.deepEqual(drift, [], fail(["buildings row drift:", ...drift.map((d) => "  " + d)]));
});

// Driven rows: one test per row that declares drives. Each path starts at
// createBoard({ fresh: true }) with an injected roll and goes through the
// board's own commits, every step asserted true.
for (const name of Object.keys(L.ROWS)) {
  const row = L.ROWS[name];
  const driven = Object.keys(row.boards).filter((b) => Array.isArray(row.boards[b].drives));
  if (driven.length === 0) continue;
  test(`driven: ${name} — ${driven.join(", ")} reached from the opening through their own commits`, () => {
    for (const b of driven) for (const spec of row.boards[b].drives) drive(name, b, spec);
  });
}

// The wait row's negative half, as a STATIC test so it runs whether or not
// any board declares drives. It lived inside the dynamic "driven: wait" test
// first, and a mutation that declared heat inert and dropped its drives went
// GREEN — the test carrying the check was never registered. Every board
// declared inert must return false at the opening, change no primitive
// getter, AND the EXPORTED wait() function must be the bare `return false;`
// every inert board actually has: the opening probe alone is blind to a
// LATENT mutator (heat's reads false at the opening too, behind `banked`),
// so "inert" is also the shape of the exported function — graded on the
// function object via Function.prototype.toString, anchored, comments
// stripped, never on the file: a second `function wait()` after the bare one
// (last declaration wins) and the bare shape kept inside a block comment
// both passed a regex over the file (the critic's m02 / m03). A board
// declared neither way is an error, not a pass.
test("wait: every board declared inert is inert at the opening AND its EXPORTED wait() is the bare `return false;` — a latent mutator cannot hide behind the opening probe, a shadow or a comment", () => {
  const row = L.ROWS.wait;
  assert.ok(row && row.boards, "ROWS.wait is missing — wait crosses the seam and must have a row");
  const bare = /^function wait\(\)\s*\{\s*return false;\s*\}$/;
  const problems = [];
  for (const b of Object.keys(INV)) {
    if (INV[b].error) continue; // a board that did not derive is the first test's red, not a wait finding
    const e = row.boards[b];
    if (!e) { problems.push(`${b}: exports wait() but the row does not name it`); continue; }
    if (typeof e.mutates !== "boolean") { problems.push(`${b}: the row must declare mutates:true (with drives) or mutates:false`); continue; }
    if (e.mutates) {
      if (!Array.isArray(e.drives) || e.drives.length === 0) problems.push(`${b}: declared a mutator (mutates:true) with no drives — the arming path must be driven, not described`);
      continue;
    }
    const board = D.fresh(b);
    const snap = () => JSON.stringify(Object.keys(INV[b].exports).filter((k) => INV[b].exports[k].kind === "getter" && "opening" in INV[b].exports[k]).map((k) => [k, board[k]]));
    const before = snap();
    if (board.wait() !== false) problems.push(`${b}: declared inert but wait() returned true at the opening`);
    if (snap() !== before) problems.push(`${b}: wait() returned false but changed a getter — it is not inert`);
    if (typeof board.wait !== "function") { problems.push(`${b}: declared inert but exports no wait() function`); continue; }
    const exported = D.stripComments(Function.prototype.toString.call(board.wait)).trim();
    if (!bare.test(exported)) problems.push(`${b}: declared inert (mutates:false) but the EXPORTED wait() is not the bare \`return false;\` — it reads: ${exported.replace(/\s+/g, " ").slice(0, 90)} — a latent mutator reads false at the opening, so declare the arming path (drives) instead of trusting the opening probe`);
  }
  assert.deepEqual(problems, [], fail(["wait row (test/lexicon-ledger.js ROWS.wait):", ...problems.map((p) => "  " + p)]));
});

test("walk DSL: every test file's walk() legend is derived and equals the declared one — a copied walk string that changes meaning is at least visible", () => {
  const derived = D.walkInventory();
  const drift = [];
  const files = new Set([...Object.keys(derived), ...Object.keys(L.WALK_LEGENDS)]);
  for (const f of [...files].sort()) {
    const got = derived[f];
    const want = L.WALK_LEGENDS[f];
    if (!got) { drift.push(`${f}: WALK_LEGENDS declares a legend but the file has no walk()`); continue; }
    if (!want) { drift.push(`${f}: has a walk() with no declared legend — derived ${JSON.stringify(got)}`); continue; }
    const letters = new Set([...Object.keys(got), ...Object.keys(want)]);
    for (const ch of [...letters].sort()) {
      if (got[ch] !== want[ch]) drift.push(`${f} "${ch}": derived ${JSON.stringify(got[ch])} / declared ${JSON.stringify(want[ch])}`);
    }
  }
  assert.deepEqual(drift, [], fail([`walk legend drift over ${Object.keys(derived).length} files with a walk() (test/lexicon-ledger.js WALK_LEGENDS):`, ...drift.map((d) => "  " + d)]));
});

test("DOM: lit / home / train-consist — each token's boards per derived set (ids, toggles, className values) equal the declared ones", () => {
  const dom = D.domInventory();
  const drift = [];
  for (const rowName of Object.keys(L.DOM_ROWS)) {
    const row = L.DOM_ROWS[rowName];
    for (const token of Object.keys(row.tokens)) {
      const decl = row.tokens[token];
      for (const set of ["ids", "toggles", "classNames"]) {
        const want = Object.keys(decl[set] || {}).sort();
        const got = Object.keys(dom).filter((b) => dom[b] && dom[b][set].includes(token)).sort();
        if (JSON.stringify(got) !== JSON.stringify(want)) {
          drift.push(`DOM_ROWS["${rowName}"] token "${token}" in ${set}: derived ${JSON.stringify(got)} / declared ${JSON.stringify(want)}`);
        }
      }
    }
  }
  assert.deepEqual(
    drift, [],
    fail([
      "DOM row drift (test/lexicon-ledger.js DOM_ROWS). Derived sets per board:",
      ...Object.keys(dom).map((b) => `  ${b}:` + NL + (dom[b]
        ? `    ids        ${dom[b].ids.join(" ")}` + NL + `    toggles    ${dom[b].toggles.join(" ")}` + NL + `    classNames ${dom[b].classNames.join(" ")}`
        : "    (no index.html — nothing derived)")),
      "Drift:",
      ...drift.map((d) => "  " + d),
    ]),
  );
});

test("pins: every cited test line exists and mentions the token — a locator, not a semantic pin; the meaning is graded by the drives and source pins", () => {
  const cache = {};
  const lines = (file) => (cache[file] = cache[file] || fs.readFileSync(path.join(D.ROOT, file), "utf8").replace(/\r\n/g, "\n").split("\n"));
  const bad = [];
  const check = (owner, token, cite) => {
    const m = /^(test\/[^:]+):(\d+)(?:#(.+))?$/.exec(cite);
    if (!m) { bad.push(`${owner}: cite ${JSON.stringify(cite)} is not test/<file>:<line>[#substring]`); return; }
    const [, file, n, has] = m;
    if (!fs.existsSync(path.join(D.ROOT, file))) { bad.push(`${owner}: ${file} does not exist`); return; }
    const text = lines(file)[Number(n) - 1];
    const needle = has || token;
    if (text === undefined) bad.push(`${owner}: ${file} has no line ${n}`);
    else if (!text.includes(needle)) bad.push(`${owner}: ${file}:${n} does not mention ${JSON.stringify(needle)} — it reads: ${text.trim()}`);
  };
  for (const name of Object.keys(L.ROWS)) {
    for (const b of Object.keys(L.ROWS[name].boards)) {
      for (const cite of L.ROWS[name].boards[b].pins || []) check(`ROWS.${name}.boards["${b}"]`, name, cite);
    }
  }
  assert.deepEqual(bad, [], fail(["Stale pins — re-point the cite, do not delete it:", ...bad.map((x) => "  " + x)]));
});

test("determinism: the guard's own three files read no clock, set no timer and roll no die", () => {
  const files = ["lexicon.test.js", "lexicon-derive.js", "lexicon-ledger.js"];
  // Assembled from fragments so this file's own text cannot satisfy it.
  const banned = new RegExp("\\b(" + [
    "Date\\." + "now", "new " + "Date", "performance\\." + "now", "Math\\." + "random",
    "set" + "Timeout", "set" + "Interval", "set" + "Immediate", "process\\." + "hrtime",
  ].join("|") + ")\\b");
  for (const f of files) {
    const code = fs.readFileSync(path.join(__dirname, f), "utf8").replace(/\/\/.*$/gm, "");
    const m = banned.exec(code);
    assert.equal(m ? m[0] : null, null, `test/${f} reaches for ${m && m[0]} — the guard must be deterministic; inject a roll instead`);
  }
});

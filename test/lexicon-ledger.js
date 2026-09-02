"use strict";

// THE DECLARED LEDGER — the hand-authored half of test/lexicon.test.js.
//
// test/lexicon-derive.js measures every board's name surface; this file says
// what each shared name MEANS, per lineage, and the test diffs the two. It is
// a ledger in the KILLS.md sense: dated, append-only in spirit, every row
// carrying the adjudication it was given and who gave it. Nothing here is a
// measurement — the measurements are in the derivation — but every figure
// here (kind, arity, opening value, key list, card value) was copied from the
// derivation's printout, measured 2026-09-01 at 796d9a2 (docs-only delta to
// landing; every count is re-derived at run time and printed on failure),
// never typed from memory, and the test is what keeps it that way.
//
// HOW TO READ A FAILURE. Every assertion in the test prints DERIVED next to
// DECLARED and names the row to edit. The edit is always here, never in a
// board: every board's bytes under sit/ are pinned evidence (four passed city
// boards by sha in other boards' tests, every board through the hub card in
// test/boards-index.test.js). If this guard can only go green by changing a
// board, the guard is wrong — file that, do not touch the board.
//
// MEMBERSHIP IS DECLARED, NEVER INFERRED. Three sweeps inferred three
// memberships from the sims' headers and the seam count moved 5 / 22 / 31
// with the choice. The lists below are the orchestrator's ruling, 2026-09-01.
// dawnspur-site and dawnspur-halt sit on the city side: halt is the city
// lineage's ancestor (notice / postNotice / liveCanDo is the API every city
// board copies) and site shares most of its names with halt, so placing
// either on the desk side turns their benign twins (sited, scaffold, bill,
// panes, rim ...) into "seam crossings" and buries the real ones — the seam
// test prints the live count under whatever membership is declared. The
// cost of this placement is one row — `litJobs` — which crosses only because
// site carries it beside heat, scale, line and storm.
//
// Every directory under sit/ must be in exactly one list or the suite fails
// naming it: that is how a new board is forced to declare itself.

const DESK = ["dawnspur-heat", "dawnspur-scale", "dawnspur-dispatch", "dawnspur-line", "dawnspur-storm"];
const CITY = [
  "dawnspur-site", "dawnspur-halt", "mosswake-loop", "herbs-larder", "they-remember",
  "dice-at-the-places", "two-ways-from-here",
];

// Live boards under public/ with no sit/ source. This guard cannot load them
// the way the suite loads a board, so they are OUT OF SCOPE by name rather
// than silently skipped — a new public-only directory fails the suite until
// it is listed here with its reason.
const PUBLIC_ONLY = {
  "dawnspur": "The pre-sit/ heat board (a preserved kill, CFD-176). Its sim.js exports createBoard " +
    "and shares most of heat's names; `warmed` and `phase` diverge (§3.6 of " +
    "docs/name-collisions-audit-2026-09-01.md and its verification note). " +
    "Grandfathered by test/boards-index.test.js; not loaded here because it has no sit/ twin and no test of its own.",
  "convoy-stop": "public/convoy-stop/sim.js exports nothing (module.exports keys = []) and prints a " +
    "layout self-test to stdout at require time. It cannot be loaded the way any test loads a board. " +
    "UNDERIVABLE — prefer null to a plausible surface.",
};

// ---------------------------------------------------------------------------
// ROWS. One row per shared name that has been ADJUDICATED. Required for every
// name exported on both sides of the seam; permitted for a name shared within
// one lineage when the audit ranked it (the audit's #5, #8, #11 are
// intra-lineage and would otherwise vanish into UNADJUDICATED).
//
// Row fields
//   surface        "export" (the createBoard() object) | "ids" (place / building
//                  / route ids and the consistAt opening)
//   adjudication   HIGH | MEDIUM | LOW | BENIGN | CONTESTED
//   by             who ruled it: the audit section, or "worker 2026-09-01" —
//                  a worker's read is a read, not a ruling (CLAUDE.md: critics
//                  have no scoring authority), and it says so
//   meaning        one sentence per side
//   boards         per board: the declared signature and any of
//     kind/arity/opening/keys   graded against the derivation with ONE
//                               formatter (lexicon-derive.signature) on both sides
//     surface: "card"           this board carries the name inside cards(), not
//                               at top level — graded by the cards test
//     unit / debitTarget        where the name carries a number
//     sourcePin                 a RegExp the board's sim.js must match once
//                               comments AND the contents of every string,
//                               template and regex literal are removed. It is
//                               EVIDENCE ABOUT THE FILE'S TEXT, NOT ABOUT ITS
//                               BEHAVIOUR: a split statement defeats it, and
//                               before the stripper became a scanner a pinned
//                               line parked in a template satisfied it while
//                               the board paid double (critic 2's n01). Pair
//                               every numeric pin with a drive.
//     inertShape                wait rows only: the RegExp the EXPORTED
//                               function's source must match when a board is
//                               declared inert. Optional; defaults to the bare
//                               `return false;`. A board that is genuinely
//                               inert in another shape declares that shape
//                               here — the opening and getter probes still
//                               apply — rather than being forced to change a
//                               board the lineage rule freezes (critic 2's n06)
//     discardsArgument          SEND rows: a stray argument is ignored and the
//                               send still fires (self-cancelling: goes red the
//                               day a refusal lands)
//     index                     ids rows: the position the id must occupy in
//                               places() / buildings(), so "PLACES[0]" and
//                               "BUILDINGS[3]" are graded, not prose
//     values                    ids rows: the card fields the meaning quotes
//                               (pays / provisions / toll), graded per board
//     list                      buildings rows: the exact list the board must
//                               return
//     drives                    [{ roll, path: [[fn, ...args]], expect: [[probe, value]] }]
//                               driven from createBoard({fresh:true}) through the
//                               board's own commits, EACH asserted true, so the
//                               fixture is proven reachable before it is read.
//                               `roll` is one number for every draw, or an
//                               array consumed in order with the last repeating
//                               fixture is proven reachable before it is read
//     pins                      "test/<file>:<line>" (optionally "#substring") —
//                               the board-local test line that pins this side
//                               today; the guard asserts the line still says so
// ---------------------------------------------------------------------------

const ROWS = {
  // ----- the seam: names exported on both sides under the declared membership -----

  canSend: {
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.2",
    meaning: {
      desk: "canSend(routeId): may THIS route take a send now — the id is validated; an unknown id or no id is false.",
      city: "canSend(): may the one Mosswake send fire now — takes no argument, and anything passed is discarded.",
    },
    boards: {
      "dawnspur-dispatch": { kind: "method", arity: 1, discardsArgument: false, pins: ["test/dawnspur-dispatch.test.js:310"] },
      "dawnspur-line": { kind: "method", arity: 1, discardsArgument: false, pins: ["test/dawnspur-line.test.js:704"] },
      "dawnspur-storm": { kind: "method", arity: 1, discardsArgument: false, pins: ["test/dawnspur-storm.test.js:155"] },
      "dice-at-the-places": { kind: "method", arity: 0, discardsArgument: true, pins: ["test/dice-at-the-places.test.js:341"] },
      "mosswake-loop": { kind: "method", arity: 0, discardsArgument: true, pins: ["test/mosswake-loop.test.js:469"] },
      "two-ways-from-here": { kind: "method", arity: 0, discardsArgument: true, pins: ["test/two-ways-from-here.test.js:458"] },
    },
  },

  commitSend: {
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.2",
    meaning: {
      desk: "commitSend(routeId[, trimmed]): send the train down THAT route; `away` becomes true. Storm's second argument asks for the Ranger's trimmed send.",
      city: "commitSend(): the one Mosswake send; consistAt moves halt -> mosswake. `commitSend(\"dawnspur-halt\")` returns true and sends to MOSSWAKE — the argument is never read.",
    },
    boards: {
      "dawnspur-dispatch": { kind: "method", arity: 1, discardsArgument: false, moves: "away", pins: ["test/dawnspur-dispatch.test.js:336"] },
      "dawnspur-line": { kind: "method", arity: 1, discardsArgument: false, moves: "away", pins: ["test/dawnspur-line.test.js:338"] },
      "dawnspur-storm": { kind: "method", arity: 2, discardsArgument: false, moves: "away", pins: ["test/dawnspur-storm.test.js:155", "test/dawnspur-storm.test.js:75"] },
      "dice-at-the-places": { kind: "method", arity: 0, discardsArgument: true, moves: "consistAt", pins: ["test/dice-at-the-places.test.js:85"] },
      "mosswake-loop": { kind: "method", arity: 0, discardsArgument: true, moves: "consistAt", pins: ["test/mosswake-loop.test.js:470"] },
      "two-ways-from-here": { kind: "method", arity: 0, discardsArgument: true, moves: "consistAt", pins: ["test/two-ways-from-here.test.js:150"] },
    },
  },

  wait: {
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.3",
    meaning: {
      desk: "The world's turn. Inert on scale, dispatch, line and storm (takes nothing, returns false). On dawnspur-heat ALONE it is a mutator, latent behind `banked`, so it reads false at the opening like the others. WARM is what ends the sitting: `banked` darkens every job the instant commitWarm() returns (litJobs() is [] before any wait). After GOODS > B > HOLD > WARM, wait() moves the step out->gone and the phase sent->sat, returns true, and returns true again on every later call; the page fires it from a 1500 ms idle timer once the shuttle is home (index.html:218-220).",
      city: "The world's turn, inert on every city board: takes nothing, returns false, published in each header and walked as `.` in each test.",
    },
    // READ, NOT DERIVED: the page's 1500 ms idle timer named in the desk
    // sentence. This derivation reads sim.js and the DOM token sets, never
    // the page's script, so the timer is a citation into index.html:218-220
    // and not a measurement.
    boards: {
      "dawnspur-heat": {
        kind: "method", arity: 0, mutates: true,
        drives: [{
          roll: null,
          path: [["commitGoods"], ["commitB"], ["commitHold"], ["commitWarm"]],
          // litJobs() is [] BEFORE the first wait(): WARM ended the sitting; wait()
          // settles the board and is re-entrant (true again, nothing moves).
          expect: [["banked", true], ["litJobs().length", 0], ["step", "out"], ["phase", "sent"], ["wait()", true], ["litJobs().length", 0], ["step", "gone"], ["phase", "sat"], ["wait()", true], ["step", "gone"], ["phase", "sat"]],
        }],
        pins: ["test/dawnspur-heat.test.js:158"],
      },
      "dawnspur-scale": { kind: "method", arity: 0, mutates: false, pins: ["test/dawnspur-scale.test.js:229", "test/dawnspur-scale.test.js:199#waitT"] },
      "dawnspur-dispatch": { kind: "method", arity: 0, mutates: false, pins: ["test/dawnspur-dispatch.test.js:98", "test/dawnspur-dispatch.test.js:397#board\\.wait"] },
      "dawnspur-line": { kind: "method", arity: 0, mutates: false, pins: ["test/dawnspur-line.test.js:385"] },
      "dawnspur-storm": { kind: "method", arity: 0, mutates: false, pins: ["test/dawnspur-storm.test.js:299"] },
      "dawnspur-site": { kind: "method", arity: 0, mutates: false, pins: ["test/dawnspur-site.test.js:613"] },
      "dawnspur-halt": { kind: "method", arity: 0, mutates: false, pins: ["test/dawnspur-halt.test.js:68"] },
      "mosswake-loop": { kind: "method", arity: 0, mutates: false, pins: ["test/mosswake-loop.test.js:69"] },
      "herbs-larder": { kind: "method", arity: 0, mutates: false, pins: ["test/herbs-larder.test.js:78"] },
      "they-remember": { kind: "method", arity: 0, mutates: false, pins: ["test/they-remember.test.js:83"] },
      "dice-at-the-places": { kind: "method", arity: 0, mutates: false, pins: ["test/dice-at-the-places.test.js:89"] },
      "two-ways-from-here": { kind: "method", arity: 0, mutates: false, pins: ["test/two-ways-from-here.test.js:158"] },
    },
  },

  marks: {
    surface: "export",
    adjudication: "BENIGN",
    by: "worker 2026-09-01 — the audit's §1.9 (assign-vs-increment on they-remember) is a write-shape defect pinned board-locally on dice and two-ways (the cites are in their pins below, graded); this row does not grade it",
    meaning: {
      desk: "The wallet, in marks: the one HUD figure. Opens on the float (3) on dispatch, line, storm; on 0 on heat and scale (fresh).",
      city: "The wallet, in marks: the one HUD figure. Opens on 3 on halt, site, dice, two-ways; on 0 on mosswake, herbs-larder, they-remember.",
    },
    boards: {
      // No fresh-opening marks assertion exists in test/dawnspur-heat.test.js:
      // :96 asserts >= 1 on the NON-fresh opening (marks 1, phase "b") that no
      // page constructs, and :101 asserts after commitGoods. Unpinned, said so.
      // READ, NOT DERIVED: the non-fresh opening figures in the line above —
      // this derivation only ever opens a board with { fresh: true }.
      "dawnspur-heat": { kind: "getter", opening: 0, unit: "marks", pins: [] },
      "dawnspur-scale": { kind: "getter", opening: 0, unit: "marks", pins: ["test/dawnspur-scale.test.js:131"] },
      "dawnspur-dispatch": { kind: "getter", opening: 3, unit: "marks", pins: ["test/dawnspur-dispatch.test.js:246"] },
      "dawnspur-line": { kind: "getter", opening: 3, unit: "marks", pins: ["test/dawnspur-line.test.js:240"] },
      "dawnspur-storm": { kind: "getter", opening: 3, unit: "marks", pins: ["test/dawnspur-storm.test.js:228"] },
      "dawnspur-site": { kind: "getter", opening: 3, unit: "marks", pins: ["test/dawnspur-site.test.js:193"] },
      "dawnspur-halt": { kind: "getter", opening: 3, unit: "marks", pins: ["test/dawnspur-halt.test.js:202"] },
      "mosswake-loop": { kind: "getter", opening: 0, unit: "marks", pins: ["test/mosswake-loop.test.js:237"] },
      "herbs-larder": { kind: "getter", opening: 0, unit: "marks", pins: ["test/herbs-larder.test.js:272"] },
      "they-remember": { kind: "getter", opening: 0, unit: "marks", pins: ["test/they-remember.test.js:311"] },
      "dice-at-the-places": { kind: "getter", opening: 3, unit: "marks", pins: ["test/dice-at-the-places.test.js:317", "test/dice-at-the-places.test.js:563#does not assign"] },
      "two-ways-from-here": { kind: "getter", opening: 3, unit: "marks", pins: ["test/two-ways-from-here.test.js:432", "test/two-ways-from-here.test.js:865#MUSEUM_MARKS"] },
    },
  },

  stopped: {
    surface: "export",
    adjudication: "HIGH",
    // WHAT IS MEASURED HERE, CLAUSE BY CLAUSE — the previous text said "each
    // sentence in `meaning` is a measurement, not a description", and critic 2
    // falsified four of them with the guard green (n12, n15, n10, n11). The
    // drives below now carry the qualifiers as well as the existence, and the
    // one clause that CANNOT be driven says so instead of claiming it is.
    by: "audit §1.5 (the stopped/commitHome pair). EXISTENCE: every board that carries the flag is driven to its stop from the opening — m13, dispatch's Chartered stop deleted, went green while this row was read-only. QUALIFIERS: dispatch's `chartered`, line's `topped()`, and storm's `run.storm` and `topped()` are each driven by a TWIN — a near-identical path that must NOT stop — so deleting the clause turns a drive red (n14, n12, n13, n15). The `while armed` on dice and two-ways is NOT enforced by the stop line: `canCollect()` refuses an unarmed Collect, so `if (s.armed) s.stopped = true` is unreachable-when-false and deleting the guard changes no reachable behaviour at all — measured, under n10 `commitCollect()` still returns false at the opening and after a paid run. The twin there drives the gate that does enforce the sentence, and the stop line itself is carried by a source pin, which is a text match and not a behaviour. Absent on heat and scale — `while (!board.stopped)` is true forever there and throws nowhere",
    meaning: {
      desk: "The sitting has ended: a Chartered cargo banked (dispatch), banked with the terrace topped (line), banked OUT OF A STORM with the terrace topped (storm).",
      city: "The sitting has ended: CAST (halt, site); Home (mosswake); Put them up (herbs); Collect (they-remember); Collect while armed (dice); Collect while armed OR a cold press-on (two-ways).",
    },
    boards: {
      // The twin here is the first meet: under a stop that drops `r.chartered`
      // the free halt run ends the sitting, and the Cloud send that follows is
      // then refused — the drive fails on its own step assert (n14).
      "dawnspur-dispatch": {
        kind: "getter", opening: false,
        drives: [{ roll: 0, path: [["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitSend", "cloud-basin-span"], ["commitMeet"]], expect: [["stopped", true], ["marks", 27]] }],
        pins: ["test/dawnspur-dispatch.test.js:249"],
      },
      // Twin: the SAME Chartered run one UP short of the top must not stop the
      // sitting. That is `topped()` measured — n12 deleted it and stayed green
      // while only the first drive existed, because its only Chartered run was
      // also its topped one.
      "dawnspur-line": {
        kind: "getter", opening: false,
        drives: [
          { roll: 0, path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitUp"], ["commitCarry"], ["commitSend", "cloud-basin-span"], ["commitMeet"]], expect: [["level", 4], ["stopped", true], ["marks", 18]] },
          { roll: 0, path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitCarry"], ["commitSend", "cloud-basin-span"], ["commitMeet"]], expect: [["level", 3], ["record.cargoesBanked", 2], ["stopped", false], ["marks", 23]] },
        ],
        pins: ["test/dawnspur-line.test.js:248"],
      },
      // The sky is one step per commit, period nine: five clear, two bird, two
      // storm. Six commits before the Chartered send put it at turn 7 (bird);
      // seven put it at turn 8 (storm). Three drives, two of them twins:
      //   A  topped + storm sky   -> stops
      //   B  topped, bird sky     -> does not (the `run.storm` clause)
      //   C  storm sky, level 3   -> does not (the `topped()` clause, n15)
      // C swaps A's second carry for a TEND so the seventh commit still lands
      // on turn 8: a third carry is refused at the stores cap, which would end
      // the drive on its own step assert and measure nothing.
      "dawnspur-storm": {
        kind: "getter", opening: false,
        drives: [
          { roll: 0, path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitUp"], ["commitCarry"], ["commitCarry"], ["commitSend", "cloud-basin-span"], ["commitMeet"]], expect: [["level", 4], ["record.stormSends", 1], ["stopped", true], ["marks", 24]] },
          { roll: 0, path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitUp"], ["commitCarry"], ["commitSend", "cloud-basin-span"], ["commitMeet"]], expect: [["level", 4], ["record.stormSends", 0], ["record.cargoesBanked", 2], ["stopped", false], ["marks", 18]] },
          { roll: 0, path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitCarry"], ["commitCarry"], ["commitTend"], ["commitSend", "cloud-basin-span"], ["commitMeet"]], expect: [["level", 3], ["record.stormSends", 1], ["record.cargoesBanked", 2], ["stopped", false], ["marks", 28]] },
        ],
        pins: ["test/dawnspur-storm.test.js:238"],
      },
      "dawnspur-site": {
        kind: "getter", opening: false,
        drives: [{ roll: null, path: [["commitSite"], ["commitLand"], ["commitCast"]], expect: [["stopped", true]] }],
        pins: ["test/dawnspur-site.test.js:206"],
      },
      "dawnspur-halt": {
        kind: "getter", opening: false,
        drives: [{ roll: null, path: [["commitLight"], ["commitSite"], ["commitLand"], ["commitCast"]], expect: [["stopped", true]] }],
        pins: ["test/dawnspur-halt.test.js:216"],
      },
      "mosswake-loop": {
        kind: "getter", opening: false,
        drives: [{ roll: null, path: [["commitSend"], ["commitHome"]], expect: [["stopped", true]] }],
        pins: ["test/mosswake-loop.test.js:252"],
      },
      "herbs-larder": {
        kind: "getter", opening: false,
        drives: [{ roll: null, path: [["commitPutUp"]], expect: [["stopped", true]] }],
        pins: ["test/herbs-larder.test.js:289"],
      },
      "they-remember": {
        kind: "getter", opening: false,
        drives: [{ roll: null, path: [["commitCollect"]], expect: [["stopped", true], ["marks", 1]] }],
        pins: ["test/they-remember.test.js:330"],
      },
      // Twin: a PAID run leaves the board unarmed, and Collect is then refused
      // — the gate that actually enforces "while armed". The source pin holds
      // the stop line itself, which no drive can reach (see `by`).
      "dice-at-the-places": {
        kind: "getter", opening: false,
        sourcePin: /if \(s\.armed\) s\.stopped = true;/,
        drives: [
          { roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitCollect"]], expect: [["stopped", true]] },
          { roll: 0, path: [["commitSend"], ["commitHome"]], expect: [["marks", 15], ["armed", false], ["canCollect()", false], ["commitCollect()", false], ["stopped", false]] },
        ],
        pins: ["test/dice-at-the-places.test.js:338"],
      },
      "two-ways-from-here": {
        kind: "getter", opening: false,
        sourcePin: /if \(s\.armed\) s\.stopped = true;/,
        drives: [
          { roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitCollect"]], expect: [["stopped", true], ["endedCold", false]] },
          { roll: 0, path: [["commitSend"], ["commitHome"]], expect: [["marks", 15], ["armed", false], ["canCollect()", false], ["commitCollect()", false], ["stopped", false]] },
        ],
        pins: ["test/two-ways-from-here.test.js:453"],
      },
    },
  },
  armed: {
    surface: "export",
    adjudication: "CONTESTED",
    by: "audit §1.10 says REAL_COLLISION / MEDIUM; the armed reviewer (recorded under §1.10 of docs/name-collisions-audit-2026-09-01.md) says BENIGN_SHARED_NAME / LOW. Both readings are recorded below and NOT averaged; the ruling is David's. What is measured, not contested: both sides drive from the opening, and `stopped => armed` holds on every board that carries it",
    readings: {
      audit: "REAL_COLLISION / MEDIUM — on line/storm `armed` is a paid success (three UPs, the terrace topped); on dice/two-ways it is a failure suffered (a short run), written on the losing branch, and it gates canSend OFF and canCollect ON. The LINE side carries no reciprocal pin.",
      reviewer: "BENIGN_SHARED_NAME / LOW — the export answers one question on all four boards (\"is the ending armed, one act from stopped?\"); the world-cause differs, no index.html reads the getter, the line-side meaning is property-pinned (line test :953, storm test :1222), and a cross-lineage carry-over is refuted on the first probe.",
    },
    meaning: {
      desk: "armed === topped(): the greenhouse is at level 4, so the next Chartered cargo home (out of a storm, on storm) ends the sitting. UP has no price once topped (upPrice null — `canUp()` is false at level 4 on any reading, so it is not what the drive asserts); SEND stays lit.",
      city: "armed: the last run came home SHORT and the larder covered it; Collect is one act from the end. Darkens SEND; lights Collect (and, on two-ways, the press-on, which can CLEAR it).",
    },
    boards: {
      "dawnspur-line": {
        kind: "getter", opening: false, armedBy: "topped",
        drives: [{
          roll: 0,
          path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitUp"]],
          expect: [["level", 4], ["armed", true], ["stopped", false], ["upPrice", null], ["canSend(dawnspur-halt)", true]],
        }],
        pins: ["test/dawnspur-line.test.js:953"],
      },
      "dawnspur-storm": {
        kind: "getter", opening: false, armedBy: "topped",
        drives: [{
          roll: 0,
          path: [["commitUp"], ["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitUp"], ["commitUp"]],
          expect: [["level", 4], ["armed", true], ["stopped", false], ["upPrice", null], ["canSend(dawnspur-halt)", true]],
        }],
        pins: ["test/dawnspur-storm.test.js:1222"],
      },
      // A PAID run first (+14), then the short one: the arm lands at 13 marks,
      // so `canSend() false` can only be the armed guard. Measured 2026-09-01:
      // READ, NOT DERIVED (a note about a fixture this row no longer uses):
      // with a single short run from the opening the board holds 1 mark, the
      // stake is 2, and a two-ways with the armed guard deleted from canSend
      // still passed — false for want of the stake. A fixture that asserts
      // its own premise. This path is the corrected one.
      "dice-at-the-places": {
        kind: "getter", opening: false, armedBy: "short-run",
        drives: [{
          roll: [0, 0.99],
          path: [["commitSend"], ["commitHome"], ["commitSend"], ["commitHome"]],
          expect: [["marks", 13], ["armed", true], ["stopped", false], ["canSend()", false], ["canCollect()", true]],
        }],
        pins: ["test/dice-at-the-places.test.js:441"],
      },
      "two-ways-from-here": {
        kind: "getter", opening: false, armedBy: "short-run",
        drives: [{
          roll: [0, 0.99],
          path: [["commitSend"], ["commitHome"], ["commitSend"], ["commitHome"]],
          expect: [["marks", 13], ["armed", true], ["stopped", false], ["canSend()", false], ["canCollect()", true], ["canPress()", true]],
        }],
        pins: ["test/two-ways-from-here.test.js:986#chartered && topped", "test/two-ways-from-here.test.js:767"],
      },
    },
  },

  endSentence: {
    surface: "export",
    adjudication: "BENIGN",
    by: "worker 2026-09-01 — same question on every board (\"the sentence the sitting leaves behind\"), null until stopped; the desk pages render it, the city pages never read it (two-ways header :31-32)",
    meaning: {
      desk: "The ledger's closing sentence, read from the record and the ground; null until stopped (scale: until topped).",
      city: "The closing sentence; null until stopped. Rendered by no city page — the words live on the tiles.",
    },
    boards: {
      "dawnspur-scale": { kind: "getter", opening: null, pins: ["test/dawnspur-scale.test.js:137"] },
      "dawnspur-dispatch": { kind: "getter", opening: null, pins: ["test/dawnspur-dispatch.test.js:251"] },
      "dawnspur-line": { kind: "getter", opening: null, pins: ["test/dawnspur-line.test.js:250"] },
      "dawnspur-storm": { kind: "getter", opening: null, pins: ["test/dawnspur-storm.test.js:241"] },
      "dawnspur-site": { kind: "getter", opening: null, pins: ["test/dawnspur-site.test.js:208"] },
      "dice-at-the-places": { kind: "getter", opening: null, pins: ["test/dice-at-the-places.test.js:532"] },
      "two-ways-from-here": { kind: "getter", opening: null, pins: ["test/two-ways-from-here.test.js:456"] },
    },
  },

  runSentence: {
    surface: "export",
    adjudication: "BENIGN",
    by: "worker 2026-09-01 — the last event's sentence on every board that has one; null at the opening on every carrier",
    meaning: {
      desk: "What the last commit said (a send left, a run came home or turned back, the terrace grew, the sky moved); null before the first.",
      city: "What the last commit said (site: SITE / LAND / CAST; dice, two-ways: the run's home sentence); null before the first.",
    },
    boards: {
      "dawnspur-dispatch": { kind: "getter", opening: null, pins: ["test/dawnspur-dispatch.test.js:250"] },
      "dawnspur-line": { kind: "getter", opening: null, pins: ["test/dawnspur-line.test.js:249"] },
      "dawnspur-storm": { kind: "getter", opening: null, pins: ["test/dawnspur-storm.test.js:240"] },
      "dawnspur-site": { kind: "getter", opening: null, pins: ["test/dawnspur-site.test.js:207"] },
      "dice-at-the-places": { kind: "getter", opening: null, pins: ["test/dice-at-the-places.test.js:481"] },
      "two-ways-from-here": { kind: "getter", opening: null, pins: ["test/two-ways-from-here.test.js:775"] },
    },
  },

  record: {
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.7 — `marksLost` is a key of this object on every board that carries it, and its COMPOSITION splits: toll only (line), toll plus the trim's two marks (storm), the whole stake (dispatch), provisions + toll (dice, two-ways). The discriminator is the ABSENCE of `foodLost`, which the key list below pins. WHAT THE DRIVES MEASURE: the marks-vs-food split — the audit's LINE 0 / DICE 2 — is driven on every board by one short Mosswake run from the opening, and storm's `+ run.extra` by a second, TRIMMED run (critic 2's n04 dropped that clause and left the untrimmed drive green). WHAT THEY CANNOT: dispatch's `stake` is not a different composition at all — `stake` IS `provisions + toll`, measured on all three sendable cards (0/0, 2/2, 4/4) — so no drive can separate the desk wording from the city one, and DISPATCH 2 must not be read as a composition measurement. Each composition is also source-pinned, and a pin is a text match: m09 / m10 / n02 parked the pinned line in a block comment, a string and a template literal, and the pin alone passed until the stripper was made a scanner",
    meaning: {
      desk: "The sitting's tally: runs out, cargoes banked, runs turned back, marks lost — plus food lost / sent and carries on the join boards, and tends / storm sends / trimmed on storm. marksLost counts MARKS only; food losses go to foodLost.",
      city: "The sitting's tally: runs out, cargoes banked, runs turned back, marks lost (+ press-ons on two-ways). marksLost = provisions + toll, because provisions are MARKS here.",
    },
    boards: {
      "dawnspur-dispatch": {
        kind: "getter", keys: ["cargoesBanked", "marksLost", "runsOut", "runsTurnedBack"],
        marksLost: "the whole stake (provisions + toll, both marks)", sourcePin: /s\.marksLost \+= run\.stake;/,
        drives: [{ roll: 0.99, path: [["commitSend", "mosswake-loop"], ["commitMeet"]], expect: [["record.marksLost", 2], ["marks", 1]] }],
        pins: ["test/dawnspur-dispatch.test.js:252"],
      },
      "dawnspur-line": {
        kind: "getter", keys: ["cargoesBanked", "carries", "foodLost", "foodSent", "marksLost", "runsOut", "runsTurnedBack"],
        marksLost: "the toll only; provisions are food and go to foodLost", sourcePin: /s\.marksLost \+= run\.toll;/,
        drives: [{ roll: 0.99, path: [["commitCarry"], ["commitCarry"], ["commitSend", "mosswake-loop"], ["commitMeet"]], expect: [["record.marksLost", 0], ["record.foodLost", 2], ["marks", 3], ["stores", 0]] }],
        pins: ["test/dawnspur-line.test.js:251"],
      },
      // Two drives. The first is the untrimmed short run, which measures the
      // food/marks split. The second is the TRIMMED one, and it is the only
      // path that reaches `+ run.extra`: a Ranger, four carries to put the
      // Chartered send on turn 8's storm sky, then a trim whose two marks are
      // the whole of marksLost because Mosswake's toll is 0. Without it n04
      // (dropping `+ run.extra`) left this drive green on an untrimmed run.
      "dawnspur-storm": {
        kind: "getter", keys: ["cargoesBanked", "carries", "foodLost", "foodSent", "marksLost", "runsOut", "runsTrimmed", "runsTurnedBack", "stormSends", "tends"],
        marksLost: "the toll plus the trim's two marks; provisions are food and go to foodLost", sourcePin: /s\.marksLost \+= run\.toll \+ run\.extra;/,
        drives: [
          { roll: 0.99, path: [["commitCarry"], ["commitCarry"], ["commitSend", "mosswake-loop"], ["commitMeet"]], expect: [["record.marksLost", 0], ["record.foodLost", 2], ["marks", 3], ["stores", 0]] },
          { roll: [0, 0.99], path: [["commitSend", "dawnspur-halt"], ["commitMeet"], ["commitMusterRanger"], ["commitCarry"], ["commitCarry"], ["commitCarry"], ["commitCarry"], ["commitSend", "mosswake-loop", true], ["commitMeet"]], expect: [["record.runsTrimmed", 1], ["record.stormSends", 1], ["record.marksLost", 2], ["record.foodLost", 2], ["marks", 9], ["stores", 2]] },
        ],
        pins: ["test/dawnspur-storm.test.js:242"],
      },
      "dice-at-the-places": {
        kind: "getter", keys: ["cargoesBanked", "marksLost", "runsOut", "runsTurnedBack"],
        marksLost: "provisions + toll, both marks", sourcePin: /s\.marksLost \+= run\.provisions \+ run\.toll;/,
        drives: [{ roll: 0.99, path: [["commitSend"], ["commitHome"]], expect: [["record.marksLost", 2], ["marks", 1]] }],
        pins: ["test/dice-at-the-places.test.js:480"],
      },
      "two-ways-from-here": {
        kind: "getter", keys: ["cargoesBanked", "marksLost", "pressOns", "runsOut", "runsTurnedBack"],
        marksLost: "provisions + toll, both marks; a press-on stakes 0 / 0 so a cold ending adds nothing", sourcePin: /s\.marksLost \+= run\.provisions \+ run\.toll;/,
        drives: [{ roll: 0.99, path: [["commitSend"], ["commitHome"]], expect: [["record.marksLost", 2], ["marks", 1]] }],
        pins: ["test/two-ways-from-here.test.js:467"],
      },
    },
  },

  litJobs: {
    surface: "export",
    adjudication: "BENIGN",
    by: "worker 2026-09-01 — the same question (\"which jobs are lit right now\") answered in each board's own vocabulary; a consumer expecting one board's strings on another breaks loudly, never silently. Crosses the seam only because site is on the city side",
    meaning: {
      desk: "The lit jobs, in the board's own words: goods / B / hold / warm (heat); carry / B / tend / up (scale); route ids + carry / up / muster / meet (line); + ranger / tend (storm).",
      city: "The lit jobs on site: site / land / cast — at most one at a time after Recut 2.",
    },
    boards: {
      "dawnspur-heat": { kind: "method", arity: 0, pins: ["test/dawnspur-heat.test.js:122"] },
      "dawnspur-scale": { kind: "method", arity: 0, pins: ["test/dawnspur-scale.test.js:138"] },
      "dawnspur-line": { kind: "method", arity: 0, pins: ["test/dawnspur-line.test.js:257"] },
      "dawnspur-storm": { kind: "method", arity: 0, pins: ["test/dawnspur-storm.test.js:258"] },
      "dawnspur-site": { kind: "method", arity: 0, pins: ["test/dawnspur-site.test.js:210"] },
    },
  },

  // ----- adjudicated names that do NOT cross the export seam (permitted rows) -----

  provisions: {
    // The audit's #1. As a top-level export it is city-only (dice, two-ways);
    // it crosses the seam ONE LEVEL DOWN, inside cards() on the desk boards,
    // where the same numeric row (pays 14 / provisions 2 / toll 0) is FOOD
    // off the terrace on line and storm and MARKS on dispatch — and the only
    // discriminator is whether `stake` is a key of the card. The debit
    // target is DRIVEN per board (what moves on a Mosswake send) as well as
    // source-pinned, because a pin is a regex and a regex can be satisfied
    // by a comment or a string.
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.1",
    meaning: {
      desk: "Per-run provisions. MARKS on dispatch (merged into `stake`, debited from s.marks); FOOD on line and storm (debited from s.stores; the toll is a separate marks sink — \"Two sinks, never one\").",
      city: "Per-run provisions in MARKS, merged with the toll by stakeOf() and debited from s.marks. `'stores' in board` is false.",
    },
    boards: {
      "dawnspur-dispatch": {
        surface: "card", card: "mosswake-loop", values: { pays: 14, provisions: 2, toll: 0 }, stakeKey: true,
        unit: "marks", debitTarget: "s.marks", sourcePin: /s\.marks -= stake;/,
        drives: [{ roll: 0, path: [["commitSend", "mosswake-loop"]], expect: [["marks", 1]] }],
        pins: ["test/dawnspur-dispatch.test.js:1590"],
      },
      "dawnspur-line": {
        surface: "card", card: "mosswake-loop", values: { pays: 14, provisions: 2, toll: 0 }, stakeKey: false,
        unit: "food", debitTarget: "s.stores", sourcePin: /s\.stores -= r\.provisions;/,
        drives: [{ roll: 0, path: [["commitCarry"], ["commitCarry"], ["commitSend", "mosswake-loop"]], expect: [["marks", 3], ["stores", 0]] }],
        pins: ["test/dawnspur-line.test.js:339", "test/dawnspur-line.test.js:1161"],
      },
      "dawnspur-storm": {
        surface: "card", card: "mosswake-loop", values: { pays: 14, provisions: 2, toll: 0 }, stakeKey: false,
        unit: "food", debitTarget: "s.stores", sourcePin: /s\.stores -= r\.provisions;/,
        drives: [{ roll: 0, path: [["commitCarry"], ["commitCarry"], ["commitSend", "mosswake-loop"]], expect: [["marks", 3], ["stores", 0]] }],
        pins: ["test/dawnspur-storm.test.js:1086"],
      },
      "dice-at-the-places": {
        kind: "getter", opening: 2, values: { pays: 14, provisions: 2, toll: 0 },
        unit: "marks", debitTarget: "s.marks", sourcePin: /s\.marks -= stakeOf\(\);/,
        drives: [{ roll: 0, path: [["commitSend"]], expect: [["marks", 1]] }],
        pins: ["test/dice-at-the-places.test.js:29#MOSS_STAKE"],
      },
      "two-ways-from-here": {
        kind: "getter", opening: 2, values: { pays: 14, provisions: 2, toll: 0 },
        unit: "marks", debitTarget: "s.marks", sourcePin: /s\.marks -= stakeOf\(\);/,
        drives: [{ roll: 0, path: [["commitSend"]], expect: [["marks", 1]] }],
        pins: ["test/two-ways-from-here.test.js:423"],
      },
    },
  },

  commitHome: {
    // The audit's #5. City-only, and the ending inverts across three boards.
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.5",
    meaning: {
      city: "Bring the run home. mosswake: free, deterministic, TERMINAL (sets stopped). dice: rolls the board's only die and NEVER sets stopped — a short run arms, Collect fires. two-ways: rolls; stops on exactly one branch, a short PRESS-ON (cold); a paid press-on clears the arm.",
    },
    boards: {
      "mosswake-loop": {
        kind: "method", arity: 0, stopsOnHome: "always",
        drives: [{ roll: null, path: [["commitSend"], ["commitHome"]], expect: [["consistAt", "halt"], ["stopped", true]] }],
        pins: ["test/mosswake-loop.test.js:290#stopped"],
      },
      "dice-at-the-places": {
        kind: "method", arity: 0, stopsOnHome: "never",
        drives: [
          { roll: 0.99, path: [["commitSend"], ["commitHome"]], expect: [["consistAt", "halt"], ["stopped", false], ["armed", true]] },
          { roll: 0, path: [["commitSend"], ["commitHome"]], expect: [["consistAt", "halt"], ["stopped", false], ["armed", false], ["marks", 15]] },
        ],
        pins: ["test/dice-at-the-places.test.js:473#stopped"],
      },
      "two-ways-from-here": {
        kind: "method", arity: 0, stopsOnHome: "cold press-on only",
        drives: [
          { roll: 0.99, path: [["commitSend"], ["commitHome"]], expect: [["stopped", false], ["armed", true], ["endedCold", false]] },
          // The cold ending adds nothing: a press-on stakes 0 / 0, so marksLost
          // is still the 2 the FIRST short run cost. That sentence used to be
          // prose in `marksLost:`; it is an expectation now.
          { roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitPress"], ["commitHome"]], expect: [["stopped", true], ["endedCold", true], ["collected", false], ["record.marksLost", 2], ["record.pressOns", 1]] },
        ],
        pins: ["test/two-ways-from-here.test.js:757#endedCold"],
      },
    },
  },

  carryYield: {
    // The audit's #8. Desk-only; opens at 1 on every carrier — the only value
    // anyone spot-checks — and pays MARKS on scale, FOOD on line and storm.
    surface: "export",
    adjudication: "HIGH",
    by: "audit §1.8",
    meaning: {
      desk: "What the next CARRY lands. scale: the level, paid in MARKS, full at every reserve. line: min(level, stores headroom), landed as FOOD in the stores. storm: the same, and clamped by the reserve in a storm.",
    },
    boards: {
      // Each board's carry is DRIVEN as well as pinned. Until now this HIGH
      // row's only measured column was a source pin, and no drive in the whole
      // ledger touched dawnspur-scale: critic 2's n01 made the carry pay
      // double, parked the pinned line in a template literal, and the guard
      // stayed green 22/22. A pin is a text match; the unit is the credit.
      "dawnspur-scale": {
        kind: "getter", opening: 1, unit: "marks", debitTarget: "s.marks (credit)", sourcePin: /s\.marks \+= s\.level;/,
        drives: [{ roll: null, path: [["commitCarry"]], expect: [["marks", 1], ["level", 1], ["reserve", 3], ["carryYield", 1]] }],
        pins: ["test/dawnspur-scale.test.js:135"],
      },
      "dawnspur-line": {
        kind: "getter", opening: 1, unit: "food", debitTarget: "s.stores (credit)", sourcePin: /s\.stores \+= carryLoad\(\);/,
        drives: [{ roll: null, path: [["commitCarry"]], expect: [["stores", 1], ["marks", 3], ["reserve", 3], ["carryYield", 1]] }],
        pins: ["test/dawnspur-line.test.js:467"],
      },
      "dawnspur-storm": {
        kind: "getter", opening: 1, unit: "food", debitTarget: "s.stores (credit)", sourcePin: /s\.stores \+= landed;/,
        drives: [{ roll: null, path: [["commitCarry"]], expect: [["stores", 1], ["marks", 3], ["reserve", 3], ["carryYield", 1]] }],
        pins: ["test/dawnspur-storm.test.js:654"],
      },
    },
  },

  buildings: {
    // The audit's #11. City-only under the declared membership: halt's is the
    // real one (structures, no places()); every other carrier aliases places().
    surface: "export",
    adjudication: "MEDIUM",
    by: "audit §1.11 — a dead surface: zero callers in any index.html; every city test walks places()",
    meaning: {
      city: "halt: the four structures (lamp, terrace, foundry, consist), and there is no places(). Every other city board: an alias of places(), the map nodes.",
    },
    boards: {
      // `list` grades the four structures the meaning sentence names, so the
      // one board whose buildings() is real is checked against it rather than
      // described.
      "dawnspur-halt": { kind: "method", arity: 0, aliasOfPlaces: false, list: ["lamp", "terrace", "foundry", "consist"], pins: ["test/dawnspur-halt.test.js:218"] },
      "mosswake-loop": { kind: "method", arity: 0, aliasOfPlaces: true, pins: ["test/mosswake-loop.test.js:76#places()"] },
      "herbs-larder": { kind: "method", arity: 0, aliasOfPlaces: true, pins: [] },
      "they-remember": { kind: "method", arity: 0, aliasOfPlaces: true, pins: [] },
      "dice-at-the-places": { kind: "method", arity: 0, aliasOfPlaces: true, pins: [] },
      "two-ways-from-here": { kind: "method", arity: 0, aliasOfPlaces: true, pins: [] },
    },
  },

  // ----- the ids surface: place / building / route ids and the consistAt opening -----

  halt: {
    // The audit's #4, the seed. Three meanings: a DESTINATION route id on the
    // desk, the HOME position on the city map, and nothing at all on the
    // board named for it.
    surface: "ids",
    pattern: /halt/i,
    adjudication: "HIGH",
    by: "audit §1.4",
    meaning: {
      desk: "\"dawnspur-halt\" is a ROUTE id — the free Core Line hop, baseRisk 0.08, pays 10 — a destination the train is sent TO.",
      city: "\"halt\" is the HOME position: PLACES[0], the consistAt opening, the place every send leaves FROM and every home returns to. On dawnspur-halt itself no id contains the word: BUILDINGS are lamp / terrace / foundry / consist.",
    },
    // `index` and `values` make the sentences above assertions rather than
    // prose: PLACES[0] and the card's pays / provisions / toll are checked by
    // the ids test. READ, NOT DERIVED: "baseRisk 0.08" — `baseRisk` is not a
    // key of cards() on any board, so nothing here can grade it.
    boards: {
      "dawnspur-dispatch": { where: "cards", id: "dawnspur-halt", values: { pays: 10, provisions: 0, toll: 0 }, pins: ["test/dawnspur-dispatch.test.js:49"] },
      "dawnspur-line": { where: "cards", id: "dawnspur-halt", values: { pays: 10, provisions: 0, toll: 0 }, pins: ["test/dawnspur-line.test.js:42"] },
      "dawnspur-storm": { where: "cards", id: "dawnspur-halt", values: { pays: 10, provisions: 0, toll: 0 }, pins: ["test/dawnspur-storm.test.js:25"] },
      "mosswake-loop": { where: "places", id: "halt", index: 0, consistAt: true, pins: [] },
      "herbs-larder": { where: "places", id: "halt", index: 0, consistAt: true, pins: [] },
      "they-remember": { where: "places", id: "halt", index: 0, consistAt: true, pins: [] },
      "dice-at-the-places": { where: "places", id: "halt", index: 0, consistAt: true, pins: ["test/dice-at-the-places.test.js:331"] },
      "two-ways-from-here": { where: "places", id: "halt", index: 0, consistAt: true, pins: [] },
      "dawnspur-halt": { where: "absent", pins: ["test/dawnspur-halt.test.js:218#consist"] },
    },
  },

  consist: {
    // The audit's §2 "the consist itself": a building id on halt, a place id
    // on every city map board, and the DOM id `train` on six pages (see
    // DOM_ROWS). site's livePlace() can return "train" after SITE — a value
    // this opening-state derivation does not see; it is noted, not graded.
    surface: "ids",
    pattern: /^(consist|train)$/,
    adjudication: "LOW",
    by: "worker 2026-09-01 — one object, two names; each board is internally consistent, and the DOM row carries the split that matters",
    meaning: {
      city: "\"consist\" is the train's own tile: BUILDINGS[3] on halt, PLACES[2] on the map boards. No board uses \"train\" as a place id at the opening.",
      desk: "No place ids at all — the desk has routes, not places.",
    },
    boards: {
      "dawnspur-halt": { where: "buildings", id: "consist", index: 3, pins: ["test/dawnspur-halt.test.js:218"] },
      "mosswake-loop": { where: "places", id: "consist", index: 2, pins: [] },
      "herbs-larder": { where: "places", id: "consist", index: 2, pins: [] },
      "they-remember": { where: "places", id: "consist", index: 2, pins: [] },
      "dice-at-the-places": { where: "places", id: "consist", index: 2, pins: [] },
      "two-ways-from-here": { where: "places", id: "consist", index: 2, pins: [] },
    },
  },
};

// ---------------------------------------------------------------------------
// UNADJUDICATED. Names shared by two or more boards WITHIN one lineage that
// no one has ruled on. Names only, per the brief. Every shared name must be
// in exactly one of ROWS / UNADJUDICATED, and every name here must still be
// shared within the lineage it is listed under — a name that starts crossing
// the seam, or stops being shared, goes red here and asks for a row. The
// coverage test prints the live counts (shared / rows / listed) on failure.
// ---------------------------------------------------------------------------

const UNADJUDICATED = {
  desk: [
    "away", "banked", "canB", "canCarry", "canMeet", "canMuster", "canTend", "canUp", "cards",
    "commitB", "commitCarry", "commitMeet", "commitMuster", "commitTend", "commitUp", "haul", "hearth",
    "level", "litSends", "manifest", "manifestLine", "maxLevel", "musterPrice", "musterReach", "reserve",
    "reserveFull", "roster", "rosterCap", "stores", "storesCap", "town", "upPrice",
  ],
  city: [
    "bill", "billNeed", "billPosted", "canCast", "canCollect", "canHome", "canLand", "canSite",
    "collected", "commitCast", "commitCollect", "commitLand", "commitPosted", "commitSite", "consistAt",
    "foodInTown", "foodOnTerrace", "foundry", "gap", "haltHolds", "haulOnConsist", "heatStep",
    "herbsInLarder", "herbsOnConsist", "herbsOnMoss", "herbsWasting", "inbound", "lampLit", "landed",
    "liveCanDo", "map", "mossDim", "mossQuiet", "neighborAgain", "notice", "openingMarks", "panes",
    "panesLook", "pays", "places", "postNotice", "posted", "postedNotice", "promiseKept", "putUp",
    "remembered", "rim", "scaffold", "sitePrice", "sited", "toll",
  ],
};

// ---------------------------------------------------------------------------
// THE WALK DSL. Each board test drives its board with a string of letters and
// its own legend; the letters COLLIDE across files (`S` is commitSite on two
// files and commitSend on three; `C` is carry, cast or collect). Declared
// here exactly as derived, per file, so a copied walk string that changes
// meaning is at least visible. The keys below are exactly the files that
// carry a walk() (the walk test derives the set and fails on any drift);
// dawnspur-heat's test drives its commits directly and has none.
// ---------------------------------------------------------------------------

const WALK_LEGENDS = {
  "dawnspur-dispatch.test.js": {
    "h": "commitSend(HALT)", "m": "commitSend(MOSS)", "c": "commitSend(CLOUD)", "W": "commitMuster()",
    "+": "commitMeet() [roll 0]", "-": "commitMeet() [roll 1]", ".": "wait() === false",
  },
  "dawnspur-halt.test.js": {
    "i": "commitLight()", "S": "commitSite()", "L": "commitLand()", "C": "commitCast()", ".": "wait() === false",
  },
  "dawnspur-line.test.js": {
    "h": "commitSend(HALT)", "m": "commitSend(MOSS)", "c": "commitSend(CLOUD)", "C": "commitCarry()",
    "U": "commitUp()", "W": "commitMuster(1)", "+": "commitMeet() [roll 0]", "-": "commitMeet() [roll 1]",
    ".": "wait() === false",
  },
  "dawnspur-scale.test.js": {
    "c": "commitCarry()", "B": "commitB()", "t": "commitTend()", "U": "commitUp()",
  },
  "dawnspur-site.test.js": {
    "S": "commitSite()", "L": "commitLand()", "C": "commitCast()", ".": "wait() === false",
  },
  "dawnspur-storm.test.js": {
    "h": "commitSend(HALT)", "m": "commitSend(MOSS)", "c": "commitSend(CLOUD)",
    "H": "commitSend(HALT, true)", "M": "commitSend(MOSS, true)", "B": "commitSend(CLOUD, true)",
    "C": "commitCarry()", "T": "commitTend()", "U": "commitUp()", "W": "commitMuster(1)", "G": "commitMusterRanger()",
    "+": "commitMeet() [roll 0]", "-": "commitMeet() [roll 1]", ".": "wait() === false",
  },
  "dice-at-the-places.test.js": {
    "S": "commitSend()", "+": "commitHome() [roll 0]", "-": "commitHome() [roll 1]", "C": "commitCollect()",
    ".": "wait() === false",
  },
  "herbs-larder.test.js": {
    "P": "commitPutUp()", ".": "wait() === false",
  },
  "mosswake-loop.test.js": {
    "S": "commitSend()", "H": "commitHome()", ".": "wait() === false",
  },
  "they-remember.test.js": {
    "C": "commitCollect()", ".": "wait() === false",
  },
  "two-ways-from-here.test.js": {
    "S": "commitSend()", "+": "commitHome() [roll 0]", "-": "commitHome() [roll 1]", "C": "commitCollect()",
    "P": "commitPress()", ".": "wait() === false",
  },
};

// ---------------------------------------------------------------------------
// DOM ROWS. Bounded to the three the brief names. Each token declares, per
// derived set (ids / toggles / classNames), exactly the boards that carry it
// and what it means there; the test prints every board's derived sets on a
// mismatch. The instrument sees `id="..."`, `classList.toggle("...")` and the
// value literals of `.className = ...` — nothing else (see lexicon-derive).
// ---------------------------------------------------------------------------

const DOM_ROWS = {
  lit: {
    adjudication: "MEDIUM",
    by: "C13 delta review (recorded under the heading Delta at 796d9a2 in docs/name-collisions-audit-2026-09-01.md) — the report's #6 shape: a world-state class on one board, an affordance class on another. A `lit` rule copied from two-ways onto halt would light the lamp for a can-do",
    tokens: {
      lit: {
        toggles: {
          "dawnspur-halt": "THE LAMP IS ON — world state (board.lampLit).",
          "two-ways-from-here": "this place has a live can-do right now — affordance (notice(place).canDo !== null).",
        },
      },
      unlit: {
        toggles: {
          "dawnspur-dispatch": "the card or verb is not affordable now — affordance (!c.lit).",
          "dawnspur-line": "the card or verb is not affordable now — affordance.",
          "dawnspur-storm": "the card or verb is not affordable now — affordance.",
        },
      },
    },
  },

  home: {
    adjudication: "HIGH",
    by: "audit §1.6, with the C13 delta's addendum: three DOM shapes",
    tokens: {
      home: {
        ids: {
          "dawnspur-heat": "the home PAD — the element the shuttle returns to; `at === \"home\"` gates every job. No test pins this id.",
          "dawnspur-scale": "the home PAD, as heat. No test pins this id.",
        },
        classNames: {
          "dawnspur-halt": "the consist has LANDED — post-event (inbound -> home | gone).",
          "dawnspur-site": "the train has LANDED — post-event (inbound -> home | gone).",
          "mosswake-loop": "the consist has COME HOME — post-event (board.homed; before that, at-halt).",
          "herbs-larder": "the consist is at the halt from frame one — a position, constant.",
          "they-remember": "the consist is at the halt from frame one — a position, constant.",
          "dice-at-the-places": "the consist is at the halt (consistAt !== \"mosswake\") — a position, from frame one.",
          "two-ways-from-here": "the consist is at the halt (consistAt !== \"mosswake\") — a position, from frame one.",
        },
      },
      "at-halt": {
        classNames: {
          "mosswake-loop": "the consist at the halt BEFORE the send — the live pre-home class. (dice, herbs, they-remember and two-ways carry a dead `#consist.at-halt` CSS rule their scripts never assign; a rule is not in this instrument.)",
        },
      },
    },
  },

  "train/consist": {
    adjudication: "LOW",
    by: "worker 2026-09-01 — audit §2's double-modelled consist: one element, two DOM ids, split desk+site / halt+city",
    tokens: {
      train: {
        // One word per board, the same word the `home` row uses for it: the
        // terrace boards' vehicle is "the shuttle" (heat, scale); the desk's is
        // "the line train"; site's is "the consist" under the desk's id.
        ids: {
          "dawnspur-dispatch": "the line train", "dawnspur-heat": "the shuttle",
          "dawnspur-line": "the line train", "dawnspur-scale": "the shuttle",
          "dawnspur-site": "the consist (site is city-side and uses the desk's id)",
          "dawnspur-storm": "the line train",
        },
      },
      consist: {
        ids: {
          "dawnspur-halt": "the consist element", "dice-at-the-places": "the consist element",
          "herbs-larder": "the consist element", "mosswake-loop": "the consist element",
          "they-remember": "the consist element", "two-ways-from-here": "the consist element",
        },
      },
    },
  },
};

module.exports = { DESK, CITY, PUBLIC_ONLY, ROWS, UNADJUDICATED, WALK_LEGENDS, DOM_ROWS };

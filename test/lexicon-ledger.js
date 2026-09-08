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
  "dice-at-the-places", "two-ways-from-here", "still-standing",
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
      "two-ways-from-here": { kind: "method", arity: 0, discardsArgument: true, pins: ["test/two-ways-from-here.test.js:471"] },
      "still-standing": { kind: "method", arity: 0, discardsArgument: true, pins: [] },
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
      "still-standing": { kind: "method", arity: 0, discardsArgument: true, moves: "consistAt", pins: [] },
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
      "still-standing": { kind: "method", arity: 0, mutates: false, pins: [] },
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
      "two-ways-from-here": { kind: "getter", opening: 3, unit: "marks", pins: ["test/two-ways-from-here.test.js:445", "test/two-ways-from-here.test.js:878#MUSEUM_MARKS"] },
      "still-standing": { kind: "getter", opening: 3, unit: "marks", pins: [] },
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
        pins: ["test/two-ways-from-here.test.js:466"],
      },
      // CFD-212's one new system, in this ledger's own terms: the parent's
      // sourcePin above — `if (s.armed) s.stopped = true;` in commitCollect —
      // is GONE here, and its absence is pinned. Banking, a paid press-on and
      // a lost one all leave the sitting running; what stops it is the SECOND
      // STAKED short run, and a floor for the state where nothing can be sent.
      "still-standing": {
        kind: "getter", opening: false,
        sourcePin: /\} else if \(s\.larderSpent\) \{\s*\n\s*s\.stopped = true;/,
        drives: [
          { roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitCollect"]], expect: [["stopped", false], ["endedCold", false], ["armed", false], ["collected", true], ["marks", 2], ["canSend()", true]] },
          { roll: [0.99, 0.99, 0.99], path: [["commitSend"], ["commitHome"], ["commitCollect"], ["commitSend"], ["commitHome"]], expect: [["stopped", true], ["endedCold", true], ["endedSpent", false]] },
          { roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitPress"], ["commitHome"]], expect: [["stopped", true], ["endedSpent", true], ["endedCold", false], ["pressLost", true]] },
        ],
        pins: [],
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
        pins: ["test/two-ways-from-here.test.js:999#chartered && topped", "test/two-ways-from-here.test.js:780"],
      },
      // Same arming condition, and the arm now CLEARS on every branch of the
      // fork so play can continue. It is set at most once per sitting: the
      // second staked short run stops instead of arming.
      "still-standing": {
        kind: "getter", opening: false, armedBy: "short-run",
        drives: [{
          roll: [0, 0.99],
          path: [["commitSend"], ["commitHome"], ["commitSend"], ["commitHome"]],
          expect: [["marks", 13], ["armed", true], ["stopped", false], ["canSend()", false], ["canCollect()", true], ["canPress()", true], ["larderSpent", true]],
        }],
        pins: [],
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
      "two-ways-from-here": { kind: "getter", opening: null, pins: ["test/two-ways-from-here.test.js:469"] },
      "still-standing": { kind: "getter", opening: null, pins: [] },
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
      "two-ways-from-here": { kind: "getter", opening: null, pins: ["test/two-ways-from-here.test.js:788"] },
      "still-standing": { kind: "getter", opening: null, pins: [] },
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
        pins: ["test/two-ways-from-here.test.js:480"],
      },
      "still-standing": {
        kind: "getter", keys: ["cargoesBanked", "marksLost", "pressOns", "runsOut", "runsTurnedBack"],
        marksLost: "provisions + toll, both marks; a press-on stakes 0 / 0, which is why the stop is the second STAKED short run and a lost press-on adds nothing", sourcePin: /s\.marksLost \+= run\.provisions \+ run\.toll;/,
        drives: [{ roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitPress"], ["commitHome"]], expect: [["record.marksLost", 2], ["record.pressOns", 1], ["marks", 1]] }],
        pins: [],
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
        pins: ["test/two-ways-from-here.test.js:436"],
      },
      "still-standing": {
        kind: "getter", opening: 2, values: { pays: 14, provisions: 2, toll: 0 },
        unit: "marks", debitTarget: "s.marks", sourcePin: /s\.marks -= stakeOf\(\);/,
        drives: [{ roll: 0, path: [["commitSend"]], expect: [["marks", 1]] }],
        pins: [],
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
        pins: ["test/two-ways-from-here.test.js:770#endedCold"],
      },
      // The ending inverts once more. On still-standing commitHome stops on
      // the SECOND STAKED short run (endedCold) and, through the floor it
      // calls, on a lost press-on that leaves nothing to put up (endedSpent).
      // A short press-on with marks to spare stops nothing at all.
      "still-standing": {
        kind: "method", arity: 0, stopsOnHome: "second staked short run, or the floor",
        drives: [
          { roll: 0.99, path: [["commitSend"], ["commitHome"]], expect: [["stopped", false], ["armed", true], ["endedCold", false], ["larderSpent", true]] },
          { roll: [0, 0.99, 0.99], path: [["commitSend"], ["commitHome"], ["commitSend"], ["commitHome"], ["commitPress"], ["commitHome"]], expect: [["stopped", false], ["pressLost", true], ["endedCold", false], ["endedSpent", false], ["marks", 13], ["canSend()", true]] },
          { roll: 0.99, path: [["commitSend"], ["commitHome"], ["commitPress"], ["commitHome"]], expect: [["stopped", true], ["endedSpent", true], ["endedCold", false], ["record.marksLost", 2], ["record.pressOns", 1]] },
        ],
        pins: [],
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
      "still-standing": { kind: "method", arity: 0, aliasOfPlaces: true, pins: [] },
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
      "still-standing": { where: "places", id: "halt", index: 0, consistAt: true, pins: [] },
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
      "still-standing": { where: "places", id: "consist", index: 2, pins: [] },
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
    "bill", "billNeed", "billPosted", "canCast", "canCollect", "canHome", "canLand", "canPress", "canSite",
    "collected", "commitCast", "commitCollect", "commitLand", "commitPosted", "commitPress", "commitSite", "consistAt",
    "foodInTown", "foodOnTerrace", "foundry", "gap", "haltHolds", "haulOnConsist", "heatStep",
    "herbsInLarder", "herbsOnConsist", "herbsOnMoss", "herbsWasting", "inbound", "lampLit", "landed",
    "endedCold", "liveCanDo", "liveCanDos", "map", "mossDim", "mossQuiet", "neighborAgain", "notice", "openingMarks", "panes",
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
  // The parent's alphabet, letter for letter, and on purpose: C14 changes what
  // the letters DO to the sitting, not what they mean. C is still Collect. and
  // P is still the press-on; neither ends the sitting any more.
  "still-standing.test.js": {
    "S": "commitSend()", "+": "commitHome() [roll 0]", "-": "commitHome() [roll 1]", "C": "commitCollect()",
    "P": "commitPress()", ".": "wait() === false",
  },
};

// ---------------------------------------------------------------------------
// DOM ROWS. NO COUNT IS WRITTEN IN THIS COMMENT, deliberately: it read
// "Bounded to the three the brief names" while fourteen rows sat under it,
// one landing later. The loop reads Object.keys; nothing here needs a figure,
// and a typed one goes stale the day it is typed. Each token declares, per
// derived set (ids / toggles / classNames), exactly the boards that carry it
// and what it means there; the test prints every board's derived sets on a
// mismatch. The instrument sees `id="..."`, `classList.toggle("...")` and the
// value literals of `.className = ...` — nothing else (see lexicon-derive).
// ---------------------------------------------------------------------------

// SCENERY PARTS ARE SPLIT BY SELECTOR SHAPE, and that is why three of the
// rows below look narrower than the finding that produced them. For hearth,
// stack, glass and haul the desk gives the part a page-unique id (#hearth)
// and the city a class scoped inside a named building (#foundry .hearth), so
// a rule copied either way matches nothing and reports nothing.
//
// THE SHAPE IS UNIFORM. THE MEANING IS NOT, and this comment used to say it
// was: it read that all four *name the same world object on both lineages*,
// which the rows directly under it refute on three of the four (adversarial
// critic, 2026-09-08). Only `glass` fits — #glass in the desk's #town and
// `.glass` inside the city's #halt / #mosswake are the one glasshouse.
// `hearth` INVERTS: unconditional town scenery on the desk, a state indicator
// hidden until #foundry.live on site. `stack`'s desk half is not a world
// object at all, it is the whole control column. `haul` has THREE referents
// and one of them is herbs. Read the row, not this comment, for what a token
// means on a board; what this comment governs is the SHAPE, which is why the
// four are one comment and not four rows.
//
// The exception is dawnspur-site, a CITY board that takes the DESK shape for
// scaffold / works / hearth / bill — so halt and site, near line-for-line
// mirrors inside ONE lineage, differ by a single `.` versus `#` under an
// identical state-class half (#foundry.sited, #foundry.live), and no seam
// warning can fire. `glass` is the same shape plus a residue: line and storm
// carry a dead `#glass` rule byte-identical to dispatch's while declaring no
// element (superseded by the graded #greenhouse), so re-adding id="glass"
// there would silently reactivate the flat-box geometry. Only the id halves
// can be rows; the class halves are UNGRADED comments inside them until
// deriveDom grows an attrClasses set. (docs/sweep-2026-09-02.md, "The DOM
// namespace sweep — 2026-09-08", finding 18 — classes CLS-5 + ids IDS-5 + the
// classes refuter's M4, built as ONE comment rather than four rows, on that
// refuter's correction that the danger is halt-vs-site and not the seam.)
const DOM_ROWS = {
  lit: {
    adjudication: "MEDIUM",
    by: "C13 delta review (recorded under the heading Delta at 796d9a2 in docs/name-collisions-audit-2026-09-01.md) — the report's #6 shape: a world-state class on one board, an affordance class on another. A `lit` rule copied from two-ways onto halt would light the lamp for a can-do",
    tokens: {
      lit: {
        // UNGRADED, recorded so the next sweep does not re-find it: the Halt's
        // lamp is built from spans under THREE SIMULTANEOUS RENAMES between halt
        // and two-ways — host #lamp -> #halt, parts .post / .arm -> .lamp-post /
        // .lamp-arm, lighting class lit -> remembered. `.globe` alone keeps its
        // name, so a copied `#lamp.lit .globe` looks half-right and matches
        // nothing. Static classes; this instrument cannot see them.
        // (docs/sweep-2026-09-02.md, "The DOM namespace sweep — 2026-09-08",
        // finding 15, refuter-only.)
        //
        // DO NOT extend this row with the spoken word `dark` (finding 22 of the
        // same record). The
        // desk's primary `dark` is the Rustfall card's WORLD-STATE class
        // (`!c.sendable`, a route constant on all three desk pages), which AGREES
        // with the city's "Rustfall. Dark."; the affordance sense is two aria
        // strings on storm alone, and storm-local is not the seam.
        toggles: {
          "dawnspur-halt": "THE LAMP IS ON — world state (board.lampLit).",
          "two-ways-from-here": "this place has a live can-do right now — affordance (notice(place).canDo !== null).",
          "still-standing": "this place has a live can-do right now — affordance (notice(place).canDo !== null). Inherited from two-ways, and it has to hold for the whole sitting rather than one frame: a RESOLVED branch stops being lit and keeps its WORDS.",
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
          "still-standing": "the consist is at the halt (consistAt !== \"mosswake\") — a position, from frame one.",
        },
      },
      "at-halt": {
        classNames: {
          "mosswake-loop": "the consist at the halt BEFORE the send — the live pre-home class. (FIVE boards carry a dead `#consist.at-halt` CSS rule their scripts never assign, not four — dice:300, herbs-larder:271, still-standing:305, they-remember:278, two-ways:302, re-grepped 2026-09-08; still-standing:434 assigns only at-mosswake or home. A rule is not in this instrument, which is why five dead copies of it are prose here and not a row.)",
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
        // On six pages this id is inert scenery bound to nothing. On site it
        // BECOMES A CONTROL, firing commitLand() only after commitSite, because
        // asButton() replaces the <div> with a <button> inside paint(). It is the
        // only id in the corpus whose node is swapped mid-sitting — replaceChild
        // is observed on no other page — so a textual `bindings` set would record
        // it as scenery and be wrong. Ungraded either way: deriveDom reads no
        // handler. (docs/sweep-2026-09-02.md, "The DOM namespace sweep — 2026-09-08",
        // wiring W3, agreed.)
        ids: {
          "dawnspur-halt": "the consist element", "dice-at-the-places": "the consist element",
          "herbs-larder": "the consist element", "mosswake-loop": "the consist element",
          "they-remember": "the consist element", "two-ways-from-here": "the consist element",
          "still-standing": "the consist element",
        },
      },
    },
  },
  // ---------------------------------------------------------------------
  // THE 2026-09-08 DOM NAMESPACE SWEEP — eleven rows, two labelled sets.
  // Recorded in docs/sweep-2026-09-02.md, under the section heading "The DOM
  // namespace sweep — 2026-09-08" — four sweeper/refuter pairs (ids, classes,
  // wiring, text) over all thirteen sit boards. Every board list is
  // re-derived by the loop below and carried ZERO drift at landing; every
  // meaning sentence was re-checked against the board's own index.html or
  // DRIVEN from createBoard({fresh:true}) before landing, and the five that
  // did not survive that check are amended in place and say so.
  //
  // Rows 1-7 are AGREED — the sweeper found it and a refuter confirmed both
  // the fact and the disposition. Rows 8-11 (live, haul, stack, go) are
  // REFUTER-ONLY: found by one reader, and second-read 2026-09-08 by the
  // adversarial critic: board lists and meanings verified by driving; would
  // land. The label stays REFUTER-ONLY — a second read is not a second
  // finder.
  //
  // ONLY THE THREE DERIVED SETS ARE ROWS. deriveDom() reads id="...",
  // classList.toggle("...") and .className = "..." literals and nothing else,
  // and the loop iterates exactly ["ids", "toggles", "classNames"]. A row
  // keyed on any other set — a static class= attribute, classList.add, a CSS
  // selector, an aria-label, a data-* value — WAS silently skipped and passed
  // green as decoration. That is now graded: the test beside the drift loop
  // refuses any set key but those three, by row / token / key. It was proved
  // red-first on the adversarial critic's own probe row, which declared
  // `bindings` and `cssClasses` under a `data-route` token and passed the
  // whole guard green. So where a finding's other half lives outside the
  // instrument it is a comment marked UNGRADED inside the row, and findings
  // living entirely outside it are in the record and not here: a row that
  // cannot go red is not a guard.
  // ---------------------------------------------------------------------
  terrace: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 4 (ids IDS-1 + wiring W5) — AGREED on the fact; sweeper HIGH, refuter MEDIUM; MEDIUM carried because the discriminator is structural (.fill / .food / a <button>) and the city governing sentences about the terrace all read correctly in the city sense. A worker's read, not a ruling",
    tokens: {
      terrace: {
        // Three element KINDS under one id across the seam, and on halt the
        // element is a CONTROL: the only #terrace anything is bound to.
        ids: {
          "dawnspur-line": "a FIVE-STEP LEVEL GAUGE of board.reserve (opens 4; 0..4 all reachable by carrying) — a <div> wrapping <span class=\"fill\">, height from the rs0..rs4 ladder set by classList.toggle(\"rs\" + i, ...), a computed class this instrument cannot see. Not interactive.",
          "dawnspur-storm": "the same five-step reserve gauge as line. Not interactive.",
          "dawnspur-site": "a ONE-BIT food-present marker (board.foodOnTerrace, opens true) — a <div> wrapping <span class=\"food\">, shown by #terrace.has-food. Not interactive; board.postNotice does not exist here.",
          "dawnspur-halt": "an INTERACTIVE PLACE — <button type=\"button\"> bound to postNotice(\"terrace\"), carrying the same has-food bit. The only board with this id where postNotice is a function; notice(\"terrace\").blocked reads \"Carry, tend, UP — a held island is not a fuel bill.\", refusing the desk's verbs by name.",
        },
      },
    },
  },

  platform: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 7 (ids IDS-3) — sweeper and refuter agreed MEDIUM/SILENT; a worker's read, not a ruling",
    tokens: {
      platform: {
        // px on the desk (a surface #stores is positioned against), percent
        // and pointer-events:none on site and halt (scenery), ABSENT on the
        // six map boards, which split the ground into platform-halt /
        // platform-moss. site and halt also carry a distinct #ground (the
        // soil block) the desk does not — four spellings of one fiction.
        ids: {
          "dawnspur-dispatch": "the desk's full-width ground strip inside #town, px (height 14px). Scenery here.",
          "dawnspur-line": "the desk's full-width ground strip, px (height 30px) — LOAD-BEARING: #stores is its next sibling and sits on it (the comment at :159 says so).",
          "dawnspur-storm": "as line — the surface #stores sits on.",
          "dawnspur-site": "the HALT-END ground only — left:0; right:22%; height 14%; percent units; pointer-events:none; aria-hidden. Scenery, beside a separate #ground.",
          "dawnspur-halt": "the HALT-END ground only — right:22%, height 12%; pointer-events:none; aria-hidden. Scenery, beside a separate #ground.",
        },
      },
      "platform-halt": {
        ids: {
          "mosswake-loop": "the halt end of a TWO-ENDED ground; #platform is absent on this board.",
          "herbs-larder": "as mosswake.", "they-remember": "as mosswake.",
          "dice-at-the-places": "as mosswake.", "two-ways-from-here": "as mosswake.",
          "still-standing": "as mosswake (inherited from two-ways; membership derived at c8c4546, meaning not swept).",
        },
      },
      "platform-moss": {
        ids: {
          "mosswake-loop": "the mosswake end of the two-ended ground.",
          "herbs-larder": "as mosswake.", "they-remember": "as mosswake.",
          "dice-at-the-places": "as mosswake.", "two-ways-from-here": "as mosswake.",
          "still-standing": "as mosswake (membership derived, meaning not swept).",
        },
      },
    },
  },

  hearth: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 5 (ids IDS-4, with the refuter's two corrections) — agreed MEDIUM/SILENT; a worker's read, not a ruling",
    tokens: {
      hearth: {
        // The id half, graded. UNGRADED, recorded so it is not re-found: the
        // same word is a static CLASS on halt (`#foundry .hearth`, shown by
        // `#foundry.live .hearth`) and on the six map boards including
        // still-standing (`#halt .hearth`) — site is the ODD BOARD OUT, the
        // only page whose foundry parts (scaffold, works, hearth, bill) are
        // ids rather than classes. Also: dispatch/line/storm have the element
        // and do NOT export the name (a frozen TOWN constant); heat (opens
        // "off") and scale (opens "held") export it and have NO element.
        ids: {
          "dawnspur-dispatch": "unconditional town scenery — an always-visible <div> in #town, painted from frame one. board.hearth is undefined here.",
          "dawnspur-line": "as dispatch.",
          "dawnspur-storm": "as dispatch.",
          "dawnspur-site": "A STATE INDICATOR, not scenery — a <span> INSIDE the #foundry button, display:none until #foundry.live, i.e. until board.foundry (opens false). Hidden at frame one, the opposite of the desk; its visibility IS the claim 'the foundry has been rebuilt'.",
        },
      },
    },
  },

  step: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 3 (classes CLS-2, independently re-found by the ids refuter) — agreed MEDIUM/SILENT; the ledger's `home` shape a third time; a worker's read, not a ruling",
    tokens: {
      step: {
        // An element on one lineage, a state class on the other, and the
        // types invert the failure: board.step is a STRING whose opening
        // "off" is truthy, board.heatStep a NUMBER opening 0, so a handler
        // ported either way fails silently in the ON direction. The city's
        // element for the same fiction is #heat-step, a different id.
        ids: {
          "dawnspur-heat": "the shuttle's STEP — a greenhouse sprite whose states are the classes `out` and `gone`, assigned wholesale (`stepEl.className = ...`) from board.step, a STRING: \"off\" -> (commitWarm) \"out\" -> (wait) \"gone\". DRIVEN 2026-09-08 from createBoard({fresh:true}): commitWarm() is REFUSED until phase is \"warm\", so the reachable path is commitGoods -> commitB -> commitHold -> commitWarm -> wait().",
        },
        toggles: {
          "dawnspur-halt": "the heat-step HAS BEEN BUILT in town — board.heatStep >= 1, a NUMBER opening 0, set to 1 by commitCast(). Carried on #ground; reveals #heat-step.",
          "dawnspur-site": "as halt — the built heat-step (commitCast() sets heatStep 1).",
        },
      },
    },
  },

  dim: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 2 (classes CLS-1) — agreed MEDIUM/SILENT; the refuter moved the damage to the desk side (a live affordance lost) and showed mossDim has no writer on any city board; a worker's read, not a ruling",
    tokens: {
      dim: {
        // STYLED on the desk (#ladder.dim dims #treach/#tarmed/#thumb),
        // UNSTYLED on every city board that applies it — no `.dim` rule on
        // any of the six, and mossDim is an immutable constant `true`, so the
        // class is on at frame one, paints nothing, and never changes.
        toggles: {
          "dawnspur-dispatch": "the MUSTER ladder is OUT OF REACH (musterReach === 0; opens 1) — an affordance, styled.",
          "dawnspur-line": "as dispatch — affordance, styled.",
          "dawnspur-storm": "as dispatch — affordance, styled.",
          "mosswake-loop": "the Mosswake glasshouse sits back as SCENERY (board.mossDim, constant true) — world dressing, no rule on this page; applied at frame one and paints nothing.",
          "herbs-larder": "as mosswake — scenery, no rule, no writer.",
          "they-remember": "as mosswake — scenery, no rule, no writer.",
          "dice-at-the-places": "as mosswake — scenery, no rule, no writer.",
          "two-ways-from-here": "as mosswake — scenery, no rule, no writer.",
          "still-standing": "as mosswake — toggled at :427 from mossDim (opens true), no `.dim` rule, no writer. Verified at c8c4546 by this synthesis; the sweeps predate the board.",
        },
      },
    },
  },

  gone: {
    adjudication: "LOW",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", CLS-4 — agreed, and NOT a numbered finding: the record files it under 'NONE, recorded as results, not findings' (the record's finding 10 is /dawnspur-line/'s spoken 'stake undefined', another surface entirely). One meaning on both lineages; recorded because two of its six sites are UNREACHABLE and the obvious 'fix' to halt is wrong; the refuter enumerated both full state spaces and agreed. A worker's read, not a ruling",
    tokens: {
      gone: {
        toggles: {
          "dawnspur-dispatch": "the line train is AWAY (board.away) — #train.gone { display: none }. LIVE.",
          "dawnspur-line": "as dispatch. LIVE.",
          "dawnspur-storm": "as dispatch. LIVE.",
        },
        classNames: {
          "dawnspur-heat": "the shuttle's step has gone — #step.gone { opacity: 0 }. LIVE.",
          "dawnspur-site": "the train is neither inbound nor landed — UNREACHABLE: commitLand() is the sole writer of both fields and sets inbound=false, landed=true together (board strictly linear, 4 states), so the rule #train.gone is DEAD.",
          "dawnspur-halt": "as site, UNREACHABLE — and this page carries NO .gone rule. RE-DERIVED 2026-09-08 by exhaustive drive from createBoard({fresh:true}) over postNotice(lamp|terrace|foundry|consist) + commitLight/Site/Land/Cast/Posted to depth 9: FIVE world states, strictly linear (that key excludes the posted notice; including it gives 25), and (inbound, landed) reaches only [true,false] and [false,true] — never the [false,false] the gone branch needs. Do not add one: the branch cannot fire; do not delete the branch without re-reading site's identically dead but styled twin.",
        },
      },
    },
  },

  foundry: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 6 (wiring W4) — agreed MEDIUM/SILENT; intra-CITY (halt vs site), permitted the way the ledger permits ranked intra-lineage rows. A worker's read, not a ruling",
    tokens: {
      foundry: {
        // Same id, same tag, same event, two verb CLASSES. UNGRADED half: the
        // binding itself — deriveDom reads no handler. A site->halt copy runs
        // (halt exports commitSite), returns false from the opening (the
        // lamp gates it), mutates nothing, throws nothing: a dead button.
        // halt->site throws (site exports no postNotice). NOT a double bind
        // on site: asButton returns early because :232 is already a <button>.
        ids: {
          "dawnspur-site": "a COMMIT control — tap fires commitSite(\"foundry\") directly; one tap moves the world. Also the host of the id'd parts #scaffold / #works / #hearth (:233-235; the button closes at :236) — but NOT #bill, which sits at :238 inside <div id=\"frame\"> with the two class=\"pane\" spans. Re-read 2026-09-08; the row said #bill was inside the button and it never was.",
          "dawnspur-halt": "a SELECT control — tap fires postNotice(\"foundry\") only; the commit is a second tap on #notice-do -> commitPosted(). Host of the class'd parts .stack / .hall / .mouth / .scaffold / .hearth / .bill (:307-312) AND of the two class=\"pane\" spans #pane-a / #pane-b (:313-314) — which on site are not the foundry's at all: they hang off #frame beside #bill. halt has no #frame.",
        },
      },
    },
  },
  live: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 11, refuter-only (classes refuter; also flagged from the wiring refuter's side) — intra-CITY; two unrelated meanings eleven lines apart in one paint() on site, anti-correlated over its full 4-state space. Read by one refuter and second-read 2026-09-08 by the adversarial critic: board lists and meanings verified by driving; would land; a worker's read, not a ruling",
    tokens: {
      live: {
        toggles: {
          "dawnspur-halt": "WORLD STATE only — the foundry is working (board.foundry); rules #foundry.live .hall/.hearth/.mouth. No selection class on this page.",
          "dawnspur-site": "TWO MEANINGS on one page: on #foundry, WORLD STATE (board.foundry, :294); on #frame, a SELECTION RING (livePlace() === \"frame\", :305) whose declaration is byte-identical to the `on` ring at :127. Opening: foundry selected and NOT working; after CAST: working and NOT selected.",
        },
        classNames: {
          "dawnspur-site": "the same SELECTION RING on #train, appended as \" live\" to trainEl.className when livePlace() === \"train\" (:317-318).",
        },
      },
    },
  },

  haul: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 12, refuter-only (ids refuter) — three meanings across the seam, the third a different cargo; the sim fields haul / haulOnConsist / herbsOnConsist are disjoint so the name guard sees three names and not the one shared DOM token. One reader, and second-read 2026-09-08 by the adversarial critic: board lists and meanings verified by driving; would land; a worker's read, not a ruling",
    tokens: {
      haul: {
        // The id half, graded. UNGRADED: `.haul` is a static CLASS span inside
        // #consist on the six map boards, shown by `#consist.hauled .haul` —
        // toggled from haulOnConsist on dice and two-ways (THE VEHICLE CARRIES
        // A HAUL) and from herbsOnConsist on mosswake, herbs-larder and
        // they-remember (the element named haul denotes HERBS; herbs-larder
        // ships `class="home hauled"` at frame one). still-standing:401 also
        // carries the span; MEASURED 2026-09-08, its driver is haulOnConsist, as
        // on dice and two-ways.
        ids: {
          "dawnspur-heat": "a <span> INSIDE the Mosswake-Loop DESTINATION button #destB, shown by #destB.has-haul (board.haul, a boolean opening false): A HAUL IS WAITING AT THAT DESTINATION.",
          "dawnspur-scale": "as heat.",
        },
      },
    },
  },

  stack: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 13, refuter-only (ids refuter) — a layout container on one lineage, a chimney on the other; MEDIUM on sentence risk (\"the stack\" is a natural beat noun), LOW on copied-rule consequence. Absent from ROWS / UNADJUDICATED / DOM_ROWS because it is not a sim name anywhere. One reader, and second-read 2026-09-08 by the adversarial critic: board lists and meanings verified by driving; would land; a worker's read, not a ruling",
    tokens: {
      stack: {
        // UNGRADED half: `.stack` is a static CLASS — the foundry CHIMNEY,
        // absolutely-positioned building art under `#foundry .stack` on halt
        // and `#halt .stack` on the six map boards (still-standing:373 too).
        ids: {
          "dawnspur-dispatch": "the board's WHOLE CONTROL COLUMN — a flex column (display:flex; flex-direction:column) holding #ladder (itself #lrow1 -> #muster-word / #roster-read / #muster-price, plus the #track slider) AND #cards, the four route cards. UI, not world. The sweep's sentence enumerated only the ladder subtree and omitted #cards, the board's primary control; corrected here after reading dispatch:209-222.",
          "dawnspur-line": "as dispatch, with a THE DESK grouplabel first and the CARRY / UP cards inside #cards.",
          "dawnspur-storm": "as dispatch, with a THE DESK grouplabel, #muster-say inside #ladder, the #ranger card as a direct child of #stack, and CARRY / TEND / UP inside #cards.",
        },
      },
    },
  },

  go: {
    adjudication: "MEDIUM",
    by: "docs/sweep-2026-09-02.md, \"The DOM namespace sweep — 2026-09-08\", finding 14, refuter-only (wiring refuter) — intra-DESK; one id, one event, two disjoint verb dispatchers, and a copied dispatcher chain animates the shuttle with the world unmoved (4 of 4 copy cells: guard passes, no commit, lerpTo entered) — the decorative motion CLAUDE.md forbids. One reader, and second-read 2026-09-08 by the adversarial critic: board lists and meanings verified by driving; would land; a worker's read, not a ruling",
    tokens: {
      go: {
        // UNGRADED half: the dispatch chain and the pad->pick vocabulary that
        // feeds it — #goodsA sets pick \"goods\" on heat and \"carry\" on scale;
        // #destA picks by canWarm/canHold/canGoods on heat and canTend/canCarry
        // on scale. Neither board exports the other's verbs.
        ids: {
          "dawnspur-heat": "the GO control — dispatches on the page-local `pick` in {goods, B, hold, warm} to commitGoods / commitB / commitHold / commitWarm.",
          "dawnspur-scale": "the GO control — dispatches on `pick` in {carry, B, tend} to commitCarry / commitB / commitTend. Same id, same tag, same event, a different verb set; scale has no commitGoods / commitHold / commitWarm.",
        },
      },
    },
  },

};

module.exports = { DESK, CITY, PUBLIC_ONLY, ROWS, UNADJUDICATED, WALK_LEGENDS, DOM_ROWS };

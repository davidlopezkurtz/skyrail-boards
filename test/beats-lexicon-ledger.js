"use strict";

// THE DECLARED LEDGER for test/beats-lexicon.test.js — the DOCS half of the
// name-collision guard, and the sibling of test/lexicon-ledger.js.
//
// test/lexicon.test.js guards the boards' name surface. Its own header says what
// it provably cannot catch: "anything in docs/ — the halt defect was a spec
// sentence, and no source-side guard sees a spec."
// docs/name-collisions-audit-2026-09-01.md §4 says the same and rules on it. The
// sweep of §6 found nineteen bridges by hand with twenty-four agents. This is the
// mechanical residue: it keeps them from coming back.
//
// A BRIDGE is a beat sentence that uses a token in the meaning it has on the
// OTHER side of the desk/city seam — `halt` is a ROUTE you send to on the desk
// and HOME in the city; `provisions` is FOOD off the stores on line and storm and
// MARKS on dispatch and the city boards. Every board involved is correct, so no
// source-side test sees it.
//
// ---------------------------------------------------------------------------
// WHAT CHANGED AT THE FIX PASS, AND WHY — read this before editing anything.
//
// The first cut carried a five-rule EXEMPTION GRAMMAR: a note was a supersession
// if its opening words matched an allowlist; a sentence was a refusal if it held
// REFUSED or "withdrawn"; a section was a record if its heading matched one of
// three phrases; a figure was attributed if the sentence said CFD-196. An
// adversarial review planted eleven live bridges the guard passed GREEN. Three of
// them are the mechanism, not the wording:
//
//   *(This bullet prices the press-on at a 68% shot at 10 more, which is what
//     the board pays today.)*                                        -> green
//   No Halt route as a send target — except that pressing on is a 68% shot at
//     10 more, which is the free Halt's own pay.                     -> green
//   <cfd-210's record heading copied verbatim into cfd-209, live bridge
//     under it>                                                      -> green
//
// The first of those is the shape the guard's OWN FAILURE MESSAGE told authors to
// write. A guard whose escape hatch is documented in its own error text is worse
// than no guard, because it certifies.
//
// The cause was one design error, not five: every exemption keyed on the SHAPE of
// the prose — an opener, a keyword, a heading phrase — and never on EVIDENCE that
// a supersession had happened. Prose shape is free to write. So the grammar is
// gone, and what replaces it is:
//
//   ONE RULE, and it is evidence. An occurrence is SUPERSEDED when the phrase
//   sits inside a QUOTATION inside an italic parenthetical AND the same phrase
//   does not appear anywhere else in that block outside such quotations. That is
//   the difference between MENTIONING a phrase and USING it, and it is exactly
//   what every landed supersession in this corpus does and what none of the
//   planted fakes does. No opener list is needed: the evidence is the quotation
//   plus the absence of the claim from the live text.
//
//   THREE DECLARED REGISTERS, all counted, all self-cancelling. Anything not
//   superseded by that rule must be DECLARED here, by a person, with a reason: a
//   record section (RECORD_SECTIONS), a ruled-and-unfixed bridge (LIVE_BRIDGES),
//   or a legitimate use (DECLARED_OCCURRENCES). Everything else is red.
//
// THE COST, said plainly. Every new occurrence of a declared shape needs a line
// here, whether it is a bridge or not. That is the price of an exemption that
// cannot be bought with prose. Measured: the corpus holds twenty-odd occurrences
// accumulated over ten beats and the project's whole life, and the 86
// supersessions the 2026-09-01 sweep landed added ZERO declared rows, because the
// evidence rule absorbs a real supersession without being told about it. The
// churn is one row when someone writes a new sentence naming the other side's
// meaning — which is the moment a person should look.
//
// WHAT IT STILL CANNOT DO. It sees declared phrase shapes, not meanings. A bridge
// phrased in words no shape covers is invisible, exactly as test/lexicon.test.js
// cannot see a meaning change on a board a token legitimately occupies. It is a
// ratchet on the shapes that have bitten, not a proof.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// THE MAP. Twelve boards; eleven name their spec in their own sim.js header
// (`// Spec: docs/cfd-NNN-beat.md`, and dawnspur-scale's reads "the TOP section
// of docs/cfd-183-beat.md" — the test parses the path out of the line, not the
// line's shape). dawnspur-heat names no path, so it is DECLARED. A board with no
// derivable beat, a beat on the tree that governs nothing, or a declaration that
// has outlived its fact is a named red.
// ---------------------------------------------------------------------------

const BOARD_BEATS_DECLARED = {
  "dawnspur-heat": {
    beat: "cfd-176-beat.md",
    why:
      "sit/dawnspur-heat/sim.js:3 reads 'SKYRAIL Reclamation - CFD-176 sitting' - an issue, not a path. " +
      "docs/cfd-176-beat.md was merged onto main from skyrail-boards#3 on 2026-09-02 with a provenance " +
      "header; its own header says the shipped board's sim.js:3-6 restates its Does line for line. It " +
      "did not exist at 796d9a2, so at that tree this board has no beat in the corpus at all - which is " +
      "why the declaration is by NAME, and why a declared beat absent from the tree is not a red.",
  },
};

const BEATS_WITHOUT_BOARD = {
  "cfd-200-beat.md": {
    parent: "dawnspur-storm",
    why:
      "Rustfall is unbuilt. The beat re-based onto /dawnspur-storm/ and its declared parent is what its " +
      "numbers must answer to - audit §6: 'cfd-200 re-based onto /dawnspur-storm/ and kept pricing its " +
      "stake, its shortest path, its Kill line and its terminal registers in the dispatch board's marks " +
      "purse'. Four HIGH rows came out of exactly that.",
  },
  "cfd-212-still-standing-beat.md": {
    parent: "two-ways-from-here",
    why:
      "/still-standing/ is unbuilt and the beat is NOT SIGNED. Its parent is named provisionally at " +
      "drafting and is re-named at signature per canon §7.1 item 4, so this row is re-checked then. It " +
      "declares two-ways-from-here because every number, tile and sentence in it is answerable to that " +
      "board's mechanics - it prices the press-on as unstaked off commitPress's provisions 0 / toll 0, " +
      "reads the stop out of the mosswake notice's branch order, and quotes that board's own writing. " +
      "The number came from Linear ASSIGNING it, not from reading a ceiling: the issue was created " +
      "and Linear returned CFD-212. An earlier cut of this row said 211, derived by taking the " +
      "highest issue in the SKYRAIL PROJECT - but CFD numbering is TEAM-wide, and CFD-211 was " +
      "already CFDBDevBot Minimum Useful Beta in another project. That is exactly the failure " +
      "CLAUDE.md warns about: prefer null to a plausible number, and never read an issue ceiling " +
      "out of a project when the sequence belongs to the team. Create the issue; let Linear answer.",
  },
};

const NON_BEAT_DOCS = {
  "mechanisms-recommitted.md": {
    why:
      "The canon file. Not a beat, governs no board, and is cited BY beats. Reading it as a beat would " +
      "give it a lineage it does not have. Out of scope by name. (It grew 749 -> 902 lines at b8d6da3, " +
      "24 supersessions; still not a beat.)",
  },
  "name-collisions-audit-2026-09-01.md": {
    why:
      "The audit ledger this guard was built out of. It quotes every bridge in both lineages' meanings " +
      "on purpose - it is the record of the defect, not an instance of it. Out of scope by name. Absent " +
      "at 796d9a2. THIS is the document the volume argument belongs to: measured at e8904de, 40 of its " +
      "1,324 lines match a declared shape - more than the whole beat corpus carries.",
  },

  // Landed 97f3ecd and e8904de, after the fix pass. Both are RECORDS, and the
  // reason is structural rather than volumetric.
  //
  // A beat is GOVERNING TEXT: a board's sim.js names it in a `Spec:` line, it
  // inherits that board's lineage, and every sentence in it is answerable to that
  // board's mechanics - which is what makes "the free Halt" in a beat either
  // right or wrong. These two govern no board, have no lineage, and their
  // sentences are ABOUT other documents' sentences. The question this guard asks
  // has no referent in them. That is the use-versus-mention line the evidence
  // rule draws, applied at the document level instead of per sentence.
  //
  // They are not BEATS_WITHOUT_BOARD either: that register is for a SPEC whose
  // board is unbuilt, and it takes a declared parent whose mechanics its numbers
  // must answer to (cfd-200 -> /dawnspur-storm/). These have no parent and no
  // board coming.
  //
  // THE FLOOD ARGUMENT IS NOT AVAILABLE HERE AND IS NOT CLAIMED. Measured at
  // e8904de over every declared shape: sweep-2026-09-02.md matches on 2 lines of
  // 923, decisions-open-2026-09-02.md on 4 of 1,158. Grading them would not flood
  // anything; it would ask a question with no answer.
  "sweep-2026-09-02.md": {
    why:
      "The 2026-09-02 sweep records - the canon file against its sources, and cfd-176 against " +
      "/dawnspur-heat/, the one gap the 2026-09-01 ledger's §6 acknowledged. A record of sweeps, " +
      "governing no board and holding no lineage; its sentences are about other documents' sentences. " +
      "Measured at e8904de: 2 of its 923 lines match a declared shape, so it is out of scope for what " +
      "it IS, not for how much it quotes.",
  },
  "decisions-open-2026-09-02.md": {
    why:
      "Forty open decisions gathered for David from four records, with rulings written into the entries " +
      "in place as they are made. It governs no board and has no lineage; an entry quoting the cfd-200 " +
      "stake bridge or the cfd-201 halt bridge is CITING a beat's sentence, not making the claim. " +
      "Measured at e8904de: 4 of its 1,158 lines match a declared shape. It is expected to GROW as " +
      "rulings land, and growth costs nothing here - a NON_BEAT_DOCS file is excluded from CORPUS " +
      "entirely, so it contributes zero occurrences and can move no RECORD_SECTIONS ceiling, which " +
      "count only inside declared sections of GRADED beats. Measured, not assumed - see the handoff. " +
      "The declaration is also self-correcting: the 'never both' check means that if a board ever " +
      "names this file as its Spec, it cannot stay silenced.",
  },
};

// ---------------------------------------------------------------------------
// THE SHAPES. One row per phrase shape expressing the OTHER lineage's meaning of
// a token the source ledger adjudicates.
//
//   side             resolved through test/lexicon-ledger.js, never re-typed:
//                    "city" / "desk" by DESK/CITY membership, and
//                    "provisions-as-food" by ROWS.provisions[board].unit
//   corpus           the occurrences the 2026-09-01 sweep confirmed. THE SHAPE IS
//                    CUT FROM THESE; the test does not read the field.
//   patterns         any match is one occurrence, and/or
//   all + anchor     every regex in `all` must hit one sentence, or that sentence
//                    together with the one after it in the same block; `anchor`
//                    locates the reported occurrence, and/or
//   headingPatterns  matched against heading text only
// ---------------------------------------------------------------------------

const SHAPES = {
  "halt-as-a-free-send": {
    side: "city",
    adjudication: "HIGH",
    by: "audit §6 city-half bridges table — 'desk -> city, past a signature and a pass; the CFD-210 class one beat upstream'",
    meaning: {
      desk: "'the free Halt' — dawnspur-halt is a ROUTE object on the line board (sim.js:88-91: baseRisk 0.08, pays 10, provisions 0, toll 0), a destination the train is sent TO for nothing.",
      city: "the Halt is HOME. On dice and two-ways `consistAt === \"halt\"` is the PRECONDITION to send at all, and notice(\"halt\") never lights — there is no send from or to the Halt to be free.",
    },
    corpus: ['cfd-209-beat.md:396 @796d9a2 — "if he sends once from the free Halt and stops"'],
    patterns: [/\bfree\b[^.]{0,25}\bhalt\b/i, /\bhalt\b[^.]{0,25}\bfree\b/i],
  },

  "the-halt-routes-own-numbers": {
    side: "city",
    adjudication: "HIGH",
    by: "audit §6 city-half bridges table (cfd-210:299 HIGH, cfd-210:585 MEDIUM) — 'desk route numbers in city governing text; survived two re-cuts and a sweep'",
    meaning: {
      desk: "68 / pays 10 / baseRisk 0.08 / an expected 6.80 are the dawnspur-halt ROUTE's own figures on the passed line board.",
      city: "the city boards roll Mosswake at 64 for 14 (two-ways sim.js:74-75, :116-118). A city sentence carrying 68, 10 or 6.80 as its own numbers is quoting a board it is not governing.",
    },
    corpus: [
      'cfd-210-beat.md:299 @796d9a2 — "pressing on is a 68% shot at 10 more"',
      'cfd-210-beat.md:585 @796d9a2 — "6.80 against 6.96 is a marks-only reading"',
    ],
    // The window is {0,90}, not {0,45}: the review restored the bridge verbatim
    // and padded it past a 45-character window, and the guard stayed green.
    patterns: [
      /\b68\b[^.]{0,90}\b(10|ten)\b/,
      /\b68-for-10\b/i,
      /\b6\.80\b/,
      /\bpays[:\s`*]{1,4}10\b/i,
      /baseRisk[^.]{0,12}0\.08/,
    ],
    // The same claim split at a full stop — "Pressing on is a 68% shot. The
    // reward is 10 more when it lands." — evaded every pattern above. Graded as
    // an `all` row over a sentence and its successor, it does not.
    all: [/\b68\b/, /\b(10|ten)\b[^.]{0,30}\b(more|pay|pays|reward)\b|\b(more|pay|pays|reward)\b[^.]{0,30}\b(10|ten)\b/i],
    anchor: /\b68\b/,
  },

  "provisions-priced-in-marks": {
    side: "provisions-as-food",
    adjudication: "HIGH",
    by: "audit §6 desk-half bridges table — 'dispatch -> storm, inside DESK'; the audit's own §1.1 collision arriving in the design record",
    meaning: {
      food: "on line and storm the stake is TWO sinks — `s.stores -= r.provisions` and `s.marks -= r.toll`. The line sim's own comment forbids merging them by name: 'Two sinks, never one'.",
      marks: "on dispatch, and on every city board, provisions are MARKS, merged with the toll into one stake off `s.marks`. A sentence that adds provisions to the toll and quotes the sum in marks has imported that board's purse.",
    },
    corpus: [
      'cfd-200-beat.md:345 @796d9a2 — "It stakes **3 provisions and the Chartered toll of 1** — 4 marks"',
      'cfd-200-beat.md:586 @796d9a2 — "The provisions and the Chartered toll are spent — 4 marks"',
      "cfd-200-beat.md:825 @796d9a2 — the stake HEADING, which the 2026-09-01 sweep missed and 238aebe superseded",
    ],
    // The three must co-occur in one sentence, or in a sentence and the one after
    // it: the review split the flagship defect at a full stop and the guard went
    // green. The anchor takes spelled numerals because the review wrote "four
    // marks" and the guard went green. The plural is still load-bearing — "the
    // Chartered toll of 1 mark" is correct and singular, which is why the
    // corrected cfd-200:357 is green with no exemption at all.
    // The lookbehind is a defect this fix pass found in its own first run: `\b18
    // marks\b` matches INSIDE "4.18 marks", because the boundary between "." and
    // "1" is a word boundary. A decimal read as an integer is a false positive
    // with no cure but this.
    all: [/\bprovisions?\b/i, /\btoll\b/i, /(?<![\d.])(\d+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) marks\b/i],
    anchor: /(?<![\d.])(\d+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) marks\b/i,
    // A HEADING is not a sentence and has no neighbours, so no co-occurrence rule
    // reaches one. cfd-200's stake heading summed a two-unit stake into marks and
    // was missed by the sweep, by this guard's first cut, and by the first cut's
    // stated reason for refusing to look. Measured over every heading in every
    // beat: ONE hit at 796d9a2 (cfd-200:825, the bridge itself) and ZERO at
    // 5a5dc34 (superseded at 238aebe). No false positives at either tree.
    headingPatterns: [/(?<![\d.])\d+ marks\b/i],
  },

  "the-home-halt": {
    side: "desk",
    adjudication: "MEDIUM",
    by: "audit §6 desk-half bridges table; ruled NONE by the refuter and the orchestrator — 'the remedy is the lexicon guard, not a parenthetical'",
    meaning: {
      city: "'the home halt' reads the Halt as HOME — the city lineage's meaning, and the PWA pack's own words: skyrail src/content.js:381 files the home under ROUTES with the description 'The home halt, newly awake ...'.",
      desk: "on the desk boards dawnspur-halt is a DESTINATION route (dawnspur-storm/sim.js:135, baseRisk 0.08, pays 10). `home` never enters any desk sim.js at all — no key, no value.",
    },
    corpus: [
      "cfd-201-beat.md:1017 @796d9a2 — quoting routes[dawnspur-halt].description",
      "cfd-201-beat.md:1386 @796d9a2 — the canon-table row, the same quotation",
    ],
    patterns: [/\bhome halt\b/i],
  },
};

// ---------------------------------------------------------------------------
// REGISTER 1 — RECORD SECTIONS. A section of a beat that is provenance: material
// kept and disowned. Declared per FILE, by exact heading text, with a CEILING on
// how many occurrences it may absorb.
//
// Every clause of that sentence is a review finding:
//   * per FILE, because the first cut's heading list was corpus-global and the
//     review copied cfd-210's heading verbatim into cfd-209 and hid a live bridge
//     under it;
//   * a section ENDS at the first heading of any level that is not itself a
//     declared record in the same file, because the review nested a live
//     `#### The numbers as they stand today` under the record `###`;
//   * with a CEILING, because the review appended a live paragraph at the end of
//     a record section and nothing moved. The ceiling is this project's ratchet:
//     it sits at the last measurement, it fails the run when the section absorbs
//     one more, and it is NEVER raised to make a run pass.
// ---------------------------------------------------------------------------

const RECORD_SECTIONS = [
  {
    file: "cfd-210-beat.md",
    heading: "Why NOT the Halt beside Mosswake — the fork this beat first proposed",
    ceiling: 2,
    shapes: ["the-halt-routes-own-numbers"],
    why: "The withdrawn fork, kept and disowned. audit §6: 'six more sit inside cfd-210's :192-272 provenance record, where the withdrawn fork is kept and disowned three times, and are record only'.",
  },
  {
    file: "cfd-210-beat.md",
    heading: "The Halt is NOT a destination on this board — the error this beat shipped",
    ceiling: 4,
    shapes: ["the-halt-routes-own-numbers"],
    why: "The beat naming its own shipped error. This section is the anti-bridge cfd-210 lacked when the defect shipped; it necessarily states the desk meaning in order to disown it.",
  },
  {
    file: "cfd-210-beat.md",
    heading: "Where the Halt's numbers came from, kept as provenance only",
    ceiling: 2,
    shapes: ["the-halt-routes-own-numbers"],
    why: "The EV table and the route figures, labelled 'dead here' at :262 and disowned three times (:254, :262, :348). Record only, per audit §6's city-half bridges table.",
  },
];

// ---------------------------------------------------------------------------
// REGISTER 2 — LIVE BRIDGES. The beat really does assert it, a person ruled it,
// and it is deliberately unfixed. Not an exemption: a PIN. The count must match
// exactly, so a third occurrence is red and a supersession of one is red.
//
// Pinned by file + shape + a prefix of the squashed SENTENCE. The sentence
// survives re-wrapping (the formatter removes line breaks) and changes only when
// the words change, which is exactly when a person should look again. The review
// neutralised one ruled use and planted a fresh one elsewhere, keeping the count
// at 2, and the first cut passed it green; a sentence pin closes that.
// ---------------------------------------------------------------------------

const LIVE_BRIDGES = [
  {
    file: "cfd-201-beat.md",
    shape: "the-home-halt",
    occurrences: 2,
    sentences: [
      "The desperation is the counterparty's, and the pack says who the counterparties are",
      "| Desperation on the Chartered Line only | ON, argued |",
    ],
    ruling:
      "audit §6, desk half: 'the refuter ruled NONE: the words are correct against both the pack and " +
      "sim.js:135, the mechanic is ruled (ANSWERED 2), and the remedy is the lexicon guard, not a " +
      "parenthetical. The orchestrator concurs: the seed is upstream.' Both are verbatim quotations of " +
      "skyrail src/content.js:381, which files the home under ROUTES with a risk figure. THIS ROW IS " +
      "THAT REMEDY. cfd-201:664 ('no counterparty is desperate at your own halt') is the same bridge in " +
      "the same beat with no distinguishing phrase, and is out of reach of any shape this file can " +
      "honestly declare — recorded here so it is not mistaken for a clean sweep.",
  },
  {
    file: "cfd-209-beat.md",
    shape: "halt-as-a-free-send",
    occurrences: 1,
    sentences: ["**Pre-registered null:** if he sends once from the free Halt and stops"],
    ruling:
      "The beat REALLY SAYS IT, on purpose, and that is the ruling. audit §6: 'the synthesis re-worded " +
      "the pre-registered null; the orchestrator refused that form and appended a dated note beneath " +
      "the sentence kept verbatim, because a pre-registration is the one sentence a beat must not " +
      "rewrite after the sit it pre-registered (canon §7.5's whole point). David may strike the note.' " +
      "The first cut of this guard exempted it with a rule (a note below re-quoting the phrase). That " +
      "was the wrong register: an exemption says no claim is being made, and here a claim IS being made " +
      "and is knowingly left standing. As a pin it cancels itself the day the null is rewritten.",
  },
];

// ---------------------------------------------------------------------------
// REGISTER 3 — DECLARED OCCURRENCES. A use that is neither superseded nor
// provenance and is nonetheless correct. One line, by a person, with a reason.
//
// This is where the cost of deleting the grammar lands, and it is deliberate. The
// first cut carried an ATTRIBUTION keyword rule so a figure naming its source was
// exempt automatically; the review then bought the same class of rule with
// ordinary prose. A person writes the row instead. The review's H4 cases — a beat
// teaching the collision in order to forbid it, a beat quoting the audit's own
// bridge row — belong here when someone writes them, at one line each.
// ---------------------------------------------------------------------------

const DECLARED_OCCURRENCES = [
  {
    file: "cfd-203-beat.md",
    shape: "provisions-priced-in-marks",
    occurrences: 1,
    sentences: ["A Cloud Basin retry cost **4 marks** on CFD-196 (3 provisions + 1 toll)"],
    why:
      "'A Cloud Basin retry cost **4 marks** on CFD-196 (3 provisions + 1 toll) and costs **1 mark** " +
      "here (the toll; the food is grown, not bought).' The marks figure names the board it belongs to " +
      "and contrasts it with this board's. Nothing crosses. Declared rather than matched by an " +
      "attribution keyword, because the review bought the keyword form with ordinary prose.",
  },

  // The four rows below are the measured price of widening the provisions shape
  // to a sentence and its successor (the review split the flagship defect at a
  // full stop and went green) and to spelled numerals (it wrote "four marks" and
  // went green). Every one is CORRECT prose in cfd-201 about the two-unit split
  // — which is to say the widening's false-positive cost at 5a5dc34 is four
  // lines, all in one beat, all saying the right thing. They are declared rather
  // than argued away with a contrast-keyword rule, because a contrast keyword is
  // exactly the kind of exemption the review bought with ordinary prose. Each is
  // pinned by sentence, so the day one of them is rewritten into a marks total
  // the row cancels and asks.
  {
    file: "cfd-201-beat.md",
    shape: "provisions-priced-in-marks",
    occurrences: 1,
    sentences: ["A trimmed run's extra **two marks** are that option's own stake"],
    why:
      "'A trimmed run's extra **two marks** are that option's own stake, not a change to the route's; " +
      "they are marks rather than a provision by David's ruling of 2026-08-28.' The sentence exists to " +
      "say that this figure is marks AND NOT a provision. It is the anti-bridge, not the bridge.",
  },
  {
    file: "cfd-201-beat.md",
    shape: "provisions-priced-in-marks",
    occurrences: 1,
    sentences: ["**The provisions are no longer a marks sink at all**"],
    why:
      "'**The provisions are no longer a marks sink at all** — `commitSend` takes them off the stores " +
      "and takes only the toll off the wallet — so a send's stake reads in two units and never one ... " +
      "and the trimmed run stakes two marks more.' The sentence states the split this shape defends.",
  },
  {
    file: "cfd-201-beat.md",
    shape: "provisions-priced-in-marks",
    occurrences: 1,
    sentences: ["The stake is no longer four marks and the sentence no longer says so."],
    why:
      "A sentence whose whole content is that the stake is NOT four marks, inside the note recording " +
      "the join. Matched because the shape cannot read a negation; correct as written.",
  },
  {
    file: "cfd-201-beat.md",
    shape: "provisions-priced-in-marks",
    occurrences: 1,
    sentences: ["is the dispatch parent's Chartered stake, provisions and toll in one purse"],
    why:
      "A landed supersession — *(An earlier cut pointed at the worked line below ... The \"4 marks\" is " +
      "the dispatch parent's Chartered stake, provisions and toll in one purse; on this parent the " +
      "stake is three from the stores and the toll's one mark.)* — that the evidence rule alone cannot " +
      "clear, because the SAME BLOCK's bullet head reads 'A storm with the charter open and 4 marks in " +
      "hand', which is a purse LEVEL on the storm parent and correct. Two different '4 marks' in one " +
      "block: the note quotes the superseded stake sum, the bullet states a reachable purse. The " +
      "evidence rule's second half asks whether the block still says the phrase outside a quotation, " +
      "and here it truthfully does — for a different reason. Declared rather than weakening the rule.",
  },
];

// ---------------------------------------------------------------------------
// SHAPES WITH A ZERO CORPUS, pinned at zero. The brief asked for these; the
// corpus has no instance. Rather than guess a pattern, each is pinned at zero, so
// the day a beat writes one the suite asks for a ruling.
// ---------------------------------------------------------------------------

const UNEXERCISED_SHAPES = {
  "desk-home-pad-in-a-city-beat": {
    side: "city",
    pattern: /\bhome pad\b|id="home"/i,
    why:
      "The audit's §1.6: `home` is a PAD id on heat and scale (`at !== \"home\"` gates every job) and a " +
      "post-event class in the city. Measured over the seven city beats: 0 occurrences at 796d9a2 and " +
      "at 5a5dc34, and no sweep row names one. A pattern would be a guess; the zero is a measurement.",
  },
  "desk-send-arity-in-a-city-beat": {
    side: "city",
    pattern: /commitSend\s*\(\s*["'`]|canSend\s*\(\s*routeId/,
    why:
      "The audit's §1.2, the floor-set collision: canSend/commitSend take a route id on the desk and " +
      "discard the argument in the city. Measured over the seven city beats: 0 at both trees — the " +
      "beats write SEND in prose, never a call with an argument.",
  },
};

// ---------------------------------------------------------------------------
// SHAPES CONSIDERED AND REFUSED. Every row must state what was tried, over WHICH
// CORPUS, and what was measured — the test checks all three, because the review
// found the one number in here that had been taken over the wrong file set.
// ---------------------------------------------------------------------------

const REFUSED_SHAPES = {
  "halt-near-send-or-route": {
    tried: "/\\bHalt\\b[^.]{0,45}(route|send|destination|sent to)/i",
    corpus: "the seven city beats, appliesTo('city') — cfd-205, 205-halt, 206, 207, 208, 209, 210",
    measured:
      "35 line hits at 796d9a2 and 38 at 5a5dc34. THE FIRST CUT PUBLISHED 29 / 32 AND WAS WRONG: it " +
      "was taken over six beats, omitting cfd-205-beat.md (the dawnspur-site beat), which " +
      "test/lexicon-ledger.js places in CITY and which this guard grades with both city shapes. The " +
      "correction makes the refusal STRONGER. All six cfd-205 hits are anti-bridges — ':18 No Halt " +
      "send on this board', ':99 No Halt send', ':146 would force a sixth loop or a Halt send', ':218 " +
      "| Halt send | REFUSED |', ':235 Halt SEND on this board (sixth loop). No SEND control', ':283 | " +
      "No Halt send | ON as a refusal |' — every one naming the desk meaning in order to forbid it. " +
      "Fifteen of the 35 carry REFUSED or 'No Halt' on the line itself; most of the rest are Kill-list " +
      "bullets under a 'Refused:' lead-in, or cfd-210's provenance record. AND THE DECISIVE FIGURE: " +
      "ZERO of the 35 is a material bridge — neither cfd-210:299 nor :585 holds 'Halt' within 45 " +
      "characters of a send word, so this shape would have caught neither of the two defects it was " +
      "proposed for. A shape that fires 35 times, mostly on the anti-bridges the guard must keep " +
      "green, and catches none of the bridges, is not a guard.",
  },
  "dawnspur-halt-as-a-token": {
    tried: "/dawnspur-halt/i",
    corpus: "the seven city beats, appliesTo('city')",
    measured:
      "42 line hits at 796d9a2, 45 at 5a5dc34 — almost all the BOARD's own path, which every city beat " +
      "cites legitimately in its Seat table, its inheritance list and its hash pins. Zero " +
      "discriminating power.",
  },
  "lit-as-an-affordance": {
    tried: "/\\bHalt\\b[^.]{0,12}\\blit\\b|\\blit\\b[^.]{0,12}\\bHalt\\b/i",
    corpus: "the seven city beats, appliesTo('city')",
    measured:
      "6 line hits at both trees, and all six are 'Halt lit and holds' / 'Dawnspur Halt lit' — the LAMP " +
      "sense, correct on /dawnspur-halt/ and correct in every city beat that inherits it. The C13 " +
      "delta's `lit` collision (world state on halt, affordance on two-ways) is real and is a DOM " +
      "class: index.html:145 against index.html:333, guarded on the source side by " +
      "test/lexicon-ledger.js DOM_ROWS.lit. NO BEAT SENTENCE IN THE CORPUS CARRIES IT: both senses are " +
      "written freely and correctly in the beats — 'two lit things', 'three lit places' is the " +
      "affordance sense. No phrase shape separates them. Reported, not shipped.",
  },
  "html-comments-and-footnotes-as-non-prose": {
    tried: "skipping `<!-- ... -->` and `[^name]: ...` footnote definitions the way fenced code is skipped",
    corpus: "all thirteen beats at 796d9a2 and 5a5dc34",
    measured:
      "0 HTML comments and 0 footnote definitions exist in any beat at either tree, so this is a " +
      "forward question with no live instance. REFUSED, against the review's L-3. A fenced block IS " +
      "skipped, because a fence is a verbatim quotation of source and `pays: 10` is literally the sim's " +
      "own syntax; an HTML comment and a footnote definition are the author's own prose in a file this " +
      "project reads as raw markdown and cites by line number, so a bridge written in either is a " +
      "bridge the next reader meets. Under this architecture the remedy for a false positive costs one " +
      "DECLARED_OCCURRENCES line, so that cost is bounded and the cost of skipping them is not.",
  },
};

module.exports = {
  BOARD_BEATS_DECLARED,
  BEATS_WITHOUT_BOARD,
  NON_BEAT_DOCS,
  SHAPES,
  RECORD_SECTIONS,
  LIVE_BRIDGES,
  DECLARED_OCCURRENCES,
  UNEXERCISED_SHAPES,
  REFUSED_SHAPES,
};

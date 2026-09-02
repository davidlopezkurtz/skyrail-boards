# Cross-lineage name collisions — audit ledger, append-only

**Taken 2026-09-01 at `C:\dev\skyrail-boards` HEAD `9618352`** — eleven `sit/` boards, suite
617 / 617 / 0. **Re-verified 2026-09-01 at `796d9a2`** — twelve boards (C13
`/two-ways-from-here/` landed after the audit was taken), suite 694 / 694 / 0, by sixteen
independent read-only reviewers and the orchestrator's own re-runs; the verdicts are
recorded **in place, under each finding**, so a reader meets the correction where the claim
is. Between the two trees the only pre-existing tracked files that moved are
`docs/cfd-210-beat.md` (`90488ff`, hunks after `:270`) and `public/index.html` (+6, the C13
card); this document cites cfd-210 at `:206`–`:263` and `:220-221` only, so **every line
number below is valid at both trees** except where a verification block says otherwise.
Board bytes are pinned evidence and never change; a cited line goes stale only when a
board is recut, and the section citing it is then superseded in place.

Every collision below is invisible to the suite, because each board is self-contained and
tested alone. Supersession is an edit with a forward pointer, never a deletion, and never a
new file. Dated sections; every finding carries a disposition; contested findings are listed
under "do not average these" rather than averaged. Every count is measured and names its
instrument — a count that cannot be re-run is reported as unavailable, never estimated.
Hand-authored; no `Do not hand-edit` marker applies. The original report text is kept
verbatim as the record of what was claimed; the dated blocks beneath each section are what
survived checking. Record: Linear CFD-210 (the seed); the guard and the sweep are §5–§6.

**halt was not the only one. 14 distinct tokens confirmed, 9 of them HIGH.** That is the headline, and I did not want it to be — a clean result would have been cheaper. Measured by me, not quoted: the eleven boards export **126 distinct names, 92 shared by ≥2 boards**. The cross-lineage intersection is **5 / 22 / 31 depending on which lineage membership you use** (narrow 3-vs-3 desk-vs-city / the brief's membership / header-derived membership with `dawnspur-halt` and `dawnspur-site` on the city side). The prior instrument's "exactly three" is wrong under every membership I can construct; the floor is 5, and **`canSend` and `commitSend` are in the floor set** — the two most dangerous names on the surface were excluded by the check that was read as reassurance.

**Verified 2026-09-01 at `796d9a2`, headline figures.** Sixteen independent read-only
reviewers re-derived this document section by section (one refuter per finding, a
mechanical re-derivation of the counts, a C13 delta, two plan critics, one
completeness critic), and the orchestrator re-ran the seven load-bearing corrections
by hand. Verdicts are recorded under each finding below, in place. What the headline
gets wrong:

- **"14 distinct tokens confirmed, 9 of them HIGH" is not derivable from the body.**
  The section headings name **13** tokens in eleven sections, and the eight sections
  tagged HIGH hold **10** of them. After re-verification the reviewers' reads are:
  **HIGH — 3** (`canSend`/`commitSend`, `halt`, `home`); **MEDIUM — 6** (`provisions`,
  `wait`, `stopped`/`commitHome`, `marksLost`, `carryYield`, `marks`); **LOW — 2**
  (`buildings`, and `armed` as a **contested** adjudication — see "do not average
  these" under §5). Every mechanism reproduced; what moved was the damage argument.
- **126 / 92 reproduces exactly** for the eleven boards, under the instrument the
  report did not state: own enumerable keys of the object `createBoard()` returns,
  getters included, module-level `createBoard`/`buildInfo` excluded. At `796d9a2`,
  twelve boards: **130 distinct, 97 shared by ≥2** — C13 adds `canPress`,
  `commitPress`, `endedCold`, `liveCanDos`. With `public/dawnspur/` (no `sit/`
  source) counted: 133.
- **"5 / 22 / 31" is mis-described.** Measured over own keys: **5** is
  `[dispatch, line, storm]` vs `[mosswake-loop, herbs-larder, they-remember]` — with
  `dice-at-the-places` *excluded*; any city triple that includes dice measures **9**
  (adds `armed`, `endSentence`, `record`, `runSentence`). **22** is halt and site on
  the LINE side. **31** is site on the LINE side and halt on the city side. With both
  halt and site on the city side — the membership this document's own sentence
  describes for 31 — the count is **10**. Adding C13 to the city side leaves 22 and 31
  unchanged and moves 5 to 9. The floor over memberships with dispatch/line/storm on
  the LINE side is **3** (a city side holding neither mosswake nor dice); `canSend` and
  `commitSend` cross the seam under every membership that puts mosswake-loop or
  dice-at-the-places on the city side, which is the claim that matters.
- **The prior instrument's "exactly three" was a correct measurement wrongly
  promoted.** `docs/cfd-209-beat.md:138-140` measured one pair, they-remember ∩
  dawnspur-line, and that pair's intersection *is* exactly `marks`, `stopped`, `wait`
  (reproduced). The error was its promotion to a lineage claim at
  `docs/cfd-209-beat.md:27` and `docs/cfd-210-beat.md:228-229`. Note also that
  `stopped` is not universal even within the LINE lineage — dawnspur-heat and
  dawnspur-scale export no `stopped`; only `marks` and `wait` are on all twelve.
- **Line 3's "the brief's `6abe720` is stale"** is itself stale and is superseded by the
  provenance line above.

---

## 1. Confirmed collisions, ranked by damage potential

### 1. `provisions` — same route, same number, the unit silently flips (HIGH)
- **`sit/dawnspur-line/sim.js:409`** `s.stores -= r.provisions;` — provisions is **FOOD**, off the terrace. Toll is a separate marks sink; the comment at :404-405 forbids merging them by name ("Two sinks, never one").
- **`sit/dice-at-the-places/sim.js:92-94, 298`** `stakeOf()` returns `provisions + toll`; `s.marks -= stakeOf();` — provisions is **MARKS**, and the two sinks are merged into one. `('stores' in board) === false` on that board.
- The route is the same route: `baseRisk 0.12, pays 14, provisions 2, toll 0` byte-identical on both, plus `short`, `cargo`, `agent`.
- **Measured inversion at the opening, both boards on 3 marks:** `dawnspur-line.canSend("mosswake-loop") = false` (stores 0, board prints "The stores hold 0. Mosswake wants 2."); `dice.canSend() = true`. At 0 marks it swaps back.
- **Wrong action:** any affordability sentence quoting "Mosswake: pays 14, provisions 2, toll 0" is correct on all four boards and wrong about the player's economy on two. Carried onto dice it specifies a debit against a field that does not exist; carried onto line it charges 4 marks where the truth is 3 stores + 1 mark, and asserts a rule (`marks and food share a sink`) that board was built to make impossible.
- **Why it beats halt for damage:** halt produced a structurally impossible instruction a careful reader could trip over. This produces a plausible number in the wrong currency. Three test files pin the identical numeric row (`dawnspur-dispatch.test.js:1590`, `dawnspur-line.test.js:1161`, `dawnspur-storm.test.js:1086`) and assert nothing about the unit — the suite actively certifies the number as stable while the meaning moved under it. `dawnspur-line` does not export `provisions` at top level at all, which is why the export sweep could not see it.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; reviewer's read HIGH → MEDIUM.** The
mechanism reproduces from both openings (`dawnspur-line:409` debits `s.stores`;
`dice:298` debits `s.marks`, `stakeOf()` at `:92-94`; `('stores' in dice) === false`).
Three load-bearing sentences do not survive:

- **The unit IS pinned per board.** `test/dawnspur-line.test.js:339-340` asserts
  provisions off the STORES and the toll off the WALLET; `test/dawnspur-storm.test.js:1189-1190`
  the same; `test/dawnspur-dispatch.test.js:485` marks − STAKE; `test/dice-at-the-places.test.js:474`
  marks − MOSS_STAKE. The three cited *blocks* (`dispatch:1590`, `line:1161`,
  `storm:1086`) assert only the numbers; each *file* pins its own sink elsewhere.
  What no test asserts is any cross-board relation for `provisions` — dice's suite
  hash-pins line's bytes (`:147-150`), a bytes pin, not a semantic one.
- **"Silently" → declared in a comment, not in the field name.** `dice sim.js:61-64`:
  *"paid in marks, which is the dispatch denomination, not a food-to-marks exchange and
  not terrace CARRY (refused)"*. The marks denomination is **dispatch's**
  (`dispatch:302`, `:362-363`), one of the three files this section cites; the unit runs
  dispatch MARKS → line STORES → storm STORES → dice MARKS → two-ways MARKS. Not a
  line→dice flip.
- **"At 0 marks it swaps back" — REFUTED.** At a minted 0 both boards refuse (line
  because stores is 0; dice because marks < 2), so the inversion collapses to
  agreement. 0 marks is **not reachable on dice from the opening** by its own commits
  (BFS over commitSend/commitHome/commitCollect: minimum reachable marks = 1 — 3, −2,
  +14 keep parity odd; the +1 lands only on the stopping Collect). `createBoard({marks:0})`
  is a suite-only fixture (`dice sim.js:440`). On line it is reachable (one MUSTER),
  and there `canSend('mosswake-loop')` is a function of stores, not marks.
- **"charges 4 marks where the truth is 3 stores + 1 mark"** are Cloud Basin's figures
  (`line:104`), pasted under a Mosswake example. Mosswake is 2 marks vs 2 stores + 0.
  Cloud Basin does not exist on dice (0 matches), so that form cannot be "carried onto
  dice". And the quoted affordability sentence exists in no shipped board — it is
  **banned** in shipped HTML by `test/dawnspur-line.test.js:1362` and
  `test/dawnspur-dispatch.test.js:1026`.
- **Five carriers at HEAD, not four.** `sit/two-ways-from-here/sim.js:75-76` (pays 14,
  provisions 2), `stakeOf` at `:104`, `s.marks -= stakeOf()` at `:385`, and a **waived**
  path with no debit at `:399` — a third meaning on the same field: a stake that can be
  waived. "byte-identical" → value-identical (line `:97` one line; dice `:68-71` one
  field per line).
- **One level down, the split is exposed on every desk board** (completeness critic,
  §3.4 which no sweep had opened): `createBoard({fresh:true}).cards()[1].provisions`
  is `2` on dispatch, line and storm; on dispatch it sits beside `stake: 2` (marks), on
  line/storm beside `condition: "The stores hold 0. Mosswake wants 2."` (food) and
  `lit: false` at the opening while dispatch's is `lit: true`. The discriminator is
  again the *absence* of a key (`stake`) — the §7 `foodLost` shape.

### 2. `canSend` / `commitSend` — the argument is discarded, and the call still mutates and returns true (HIGH)
- **`sit/dawnspur-line/sim.js:310` `function canSend(routeId)` / `:406` `commitSend(routeId)`** — validates the id. Also `dawnspur-dispatch:297/359`, `dawnspur-storm:422/577` (**`commitSend(routeId, trimmed)` — a third arity, arity 2**, which no sweep named).
- **`sit/mosswake-loop/sim.js:38/141`, `sit/dice-at-the-places/sim.js:108/295`** — arity 0, argument never read.
- **Measured by me:** `mosswake.commitSend("dawnspur-halt")` → **`true`**, `consistAt` moves `halt → mosswake`. `dawnspur-line.commitSend()` and `.commitSend("NONSENSE")` → `false`, silently.
- **Wrong action:** a driver or fixture written on the desk contract, pointed at a city board, does not refuse — it sends the consist somewhere it was never asked to and reports success. `"dawnspur-halt"` is the one argument that returns true on **both** lineages, for entirely unrelated reasons. The reverse reads as "nothing is affordable yet" rather than "you called it wrong." Neither throws; a test built on either goes green over the wrong behaviour.

**Verified 2026-09-01 at `796d9a2` — CONFIRMED, HIGH.** All ten line numbers, all three
arities and the storm arity-2 signature reproduce; `mosswake.commitSend("dawnspur-halt")`
→ `true`, `consistAt` halt→mosswake, marks 3→1; `dawnspur-line.commitSend()` and
`.commitSend("NONSENSE")` → `false`, no throw. Corrections and additions:

- **Sixth board.** `sit/two-ways-from-here/sim.js:123` `canSend()` / `:382`
  `commitSend()` — arity 0, every argument form sends from the opening. The arity-0
  list reads mosswake / dice / two-ways.
- **"returns true on both lineages"** → returns true on every desk board *and* every
  city board at the opening; line and storm light only `dawnspur-halt`, dispatch also
  lights `mosswake-loop`, which every city board likewise accepts.
- **The arity-0 is a pinned kill, not drift.** `test/mosswake-loop.test.js:468-470`
  ("SEND takes no route") asserts `canSend.length === 0` and `commitSend.length === 0`.
  Any remediation that adds a route parameter to mosswake goes red there — the pin
  defends the collision.
- **The same shape exists inside the desk lineage.** `commitSend("dawnspur-halt", true)`
  returns `true` and sends *untrimmed* on line and dispatch (state diff identical to the
  arity-1 call); on storm the same call returns `false` with no mutation at the opening
  (`canTrim` needs `SKY_STORM` and rangers ≥ 1, `sim.js:430-435`).
- **A reviewer's added rationale was refuted at source and is not to be cited:** "dice
  exposes both `away` and `consistAt`, so a desk-shaped `assert.ok(b.away)` goes green".
  `grep -n "get away" sit/*/sim.js` hits dispatch `:417`, line `:476`, storm `:683` only;
  on dice, two-ways and mosswake `away` is `undefined` before and after `commitSend`, so
  that post-condition is loud, not green. HIGH rests on what this section says: the
  return value and the unrequested mutation.
- **Constructor analogue.** The option `fresh` is honoured by heat (`:103`), scale
  (`:125`) and `public/dawnspur` (`:123`) and silently ignored by every other board
  (`dispatch:453-476` and `two-ways:581-583` read only `o.marks`, `o.roll`), yet every
  `index.html` in the repo passes `{ fresh: true }`. Argument discarded, call proceeds —
  one level up.
- `public/dawnspur/sim.js` and `public/convoy-stop/sim.js` contain no `canSend`/`commitSend`.

### 3. `wait` — one board of eleven mutates, ends the sitting, and fires itself on a timer (HIGH)
- **`sit/dawnspur-heat/sim.js:72-79`** — the sole mutator: `s.step = "gone"`, `s.hearth = "held"`, `s.heldA = true`, `s.phase = "sat"`, returns **true**. Verified verbatim.
- **All ten others** are a bare `return false;` (dice:357, dispatch:397, halt:256, line:445, scale:91, site:110, storm:637, herbs:144, mosswake:169, they-remember:144). The inert contract is published in **eight headers** and executed as a walk-string DSL (`"." = wait() === false`) in **nine test files**.
- **`sit/dawnspur-heat/index.html:218-220`** calls `board.wait()` from a **1500 ms idle timer** — the exact `waitT` / 1500 machinery that `test/dawnspur-scale.test.js:198-199` and `test/dawnspur-dispatch.test.js:397` assert must be *absent* ("removed, not disarmed").
- **Wrong action:** the divergence is **latent behind `if (!s.banked) return false;`**, so the obvious probe on a fresh heat board returns `false` like the other ten and clears it. It only appears after `commitWarm()`. An auditor idling with `wait()`, or anyone extending the nine-file DSL to heat, drives the board to its terminal state and reads the resulting `true` as a world event that occurred. `test/dawnspur-storm.test.js:143` and `:780` are ignore-the-return shapes already in the tree. Player-facing: on heat, putting the phone down for 1.5 s after WARM ends the sitting unaided.
- This one cannot be fixed by conforming heat — its behaviour is signed and its own tests assert `assert.ok(b.wait())` eight times. It has to be fixed by **renaming**.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; reviewer's read HIGH → MEDIUM** (HIGH is
defensible on the pin count alone, and the reviewer said so). Reproduced: `heat:72-79`
mutator verbatim; the ten bare `return false` (eleven at HEAD — `two-ways:481`);
`heat/index.html:218-220` calling `board.wait()` from the 1500 ms idle machinery. Two of
the four clauses the HIGH rests on are wrong:

- **"ends the sitting" — REFUTED.** `litJobs()` is `[]` the instant `commitWarm()`
  returns, before any `wait()`; every `can*` on heat opens `if (s.banked) return false;`
  (`sim.js:17,21,25,29`). WARM ends the sitting. `wait()` moves `step` out→gone and
  `phase` sent→sat, re-asserting `hearth`/`heldA` already at those values, and is
  re-entrant (a second call returns `true` with no change — an ignore-the-return loop
  over heat reports `true` on every iteration).
- **The player-facing clause is wrong in trigger and effect.** The timer arms only once
  the train is home again (`index.html:218` requires `at === "home"`, set after WARM only
  by the return GO tap at `:272`), and its sole visible effect is `#step.gone` → opacity 0
  (`:84`, .7 s transition at `:81`): the greenhouse sprite fades. `sim.js:6` documents that
  as the design — *"After return, wait. The step can go. The bank stays."* A lineage
  finding, not a player-facing defect.
- **Counts.** Nine headers publish the inert contract at the audit base (dispatch:58,
  halt:30, scale:17-18, site:19, storm:25-26, dice:48, herbs:29-30, mosswake:26-27,
  they-remember:47-48), ten at HEAD (+ two-ways:54); only line and heat lack one. Ten
  test files run the walk-DSL at HEAD. Four of the "bare" returns carry a short
  comment (dispatch:397, line:445, scale:91, storm:637).
- **Line 28.** `test/dawnspur-dispatch.test.js:397` asserts `/board\.wait/` absent —
  the caller, not the `waitT|1500` regex; "removed, not disarmed" is
  `test/dawnspur-scale.test.js:199` alone. Ignore-the-return sites beyond the two cited:
  dispatch:171, :733, :743; line:171; scale:157, :247.
- **"Its behaviour is signed" is stronger than stated.** `sit/dawnspur-heat/sim.js`'s
  sha is pinned in **twelve** test files at HEAD (eleven at the base) plus
  `MANIFEST.txt`; heat's own test pins neither of its files and nothing pins the timer
  behaviourally (no match for `1500|waitT|performance|board.wait|setTimeout|setInterval|requestAnimationFrame`
  in `test/dawnspur-heat.test.js`). "Fixed by renaming" therefore cannot mean renaming
  heat's `wait`; it means the eleven inert boards' `wait`, or an explicit re-pin.
- **Heat is the ORIGIN of the convicted cut.** The identical `waitT`/1500/`loop()`
  machinery and true-returning `wait()` appear first in heat (`4c5e9ec`, 2026-08-25),
  were copied into scale's first cut (`5fabe7c`), and convicted in scale's recut
  (`1aea540`, "the 1.5s idle machinery … REMOVED, not left as inert plumbing"). Every
  later board's "kill: wall-clock" test is written against heat's shape while twelve
  files pin heat's bytes as they are. The repo signs the thing it convicts.
- Reachability is exact: of the 24 orderings of heat's four commits, only
  GOODS > B > HOLD > WARM reaches `banked`; the heat test's `pathToFirstWarm` is that
  path, so its eight `assert.ok(b.wait())` fixtures start from a state a player reaches.

### 4. `halt` — the seed, and it has three meanings, not two (HIGH)
- **Destination:** `sit/dawnspur-line/sim.js:88-90`, `dawnspur-dispatch:97`, `dawnspur-storm:135` — `id: "dawnspur-halt"`, `baseRisk 0.08, pays 10`.
- **Home:** `consistAt !== "halt"` at `dice:111,127`, `herbs-larder:45`, `mosswake-loop:41`, `they-remember:66`.
- **Nothing:** on `sit/dawnspur-halt/sim.js` — the board *named* for it — `BUILDINGS = ["lamp","terrace","foundry","consist"]` (:36). `grep -n halt` over that whole file returns **one line, a comment naming the spec file**. `notice("halt") → null`, `postNotice("halt") → false`.
- Already shipped through a signature (`docs/cfd-210-beat.md:206-263`). **Residual risk is still HIGH:** no test pins the token across lineages, the correction lives in one beat file a reader of cfd-196/201/203 never opens, and `docs/cfd-201-beat.md:1017` calls the *destination* "the home halt" — the design record itself hands the next author the bridge.

**Verified 2026-09-01 at `796d9a2` — PARTIAL, HIGH agreed.** Every cited site reproduces.
Corrections and additions:

- **The home list is five boards at HEAD**, not four: add `two-ways-from-here:126,142,154`
  (`PLACES` at `:89`). `dawnspur-dispatch:97` holds only `id: "dawnspur-halt",`; `baseRisk`
  and `pays` are at `:102-103` — cite `:97-103`.
- **"grep -n halt returns one line" is true only case-sensitively.** No `"halt"` token,
  place id or building exists on `/dawnspur-halt/`, but the capitalised word is the
  board's own name and appears nine times, including player-facing writing at `:82`,
  `:91`, `:161`, `:163` and the module global `DawnspurHalt` at `:335`. "Nothing" invites
  the wrong conclusion; say "no token".
- **The third meaning is this report's own addition.** `docs/cfd-210-beat.md:220-221`
  records "Two boards, one word, two meanings"; the beat does not say three.
- **C13 landed a WITHIN-board pin the audit could not see:** `test/two-ways-from-here.test.js:896-913`
  ("kill: the Halt becomes tappable — it is HOME on this board, by name, at every frame")
  and `:403` (`assert.match(beat, /The Halt is NOT a destination on this board/)`), from
  frames reached by `walk()` from the opening. One board only; the cross-lineage gap
  stands. No `notice("halt") === null` / `postNotice("halt") === false` pin exists
  anywhere, including on `/dawnspur-halt/` itself (pinned only indirectly by `BUILDINGS`
  at `test/dawnspur-halt.test.js:218`). `sit/two-ways-from-here/sim.js:3-6` and `:39-40`
  are the first source lines to name the collision.
- **The bridge originates upstream, and the record carries it twice.**
  `docs/cfd-201-beat.md:1017` *and* `:1386` (the canon-table row) call the destination
  "the home halt" — both are verbatim quotations of the PWA's own route table:
  `skyrail` `src/content.js:381`, inside `ROUTES = [{ id: "dawnspur-halt", … baseRisk: 0.08,
  … description: "The home halt, newly awake, with warm lamps, market gardens, …" }]`,
  identical at `ea22c43` (the commit the boards cite) and at `7bdddc5`. The canonical
  pack files the home under ROUTES with a risk figure. Any future author who imports
  route ids from `content.js` re-derives the bridge — a stronger reason for HIGH than
  the one given above. And `docs/cfd-209-beat.md:396` ("if he sends once from the free
  Halt and stops") carries the same bridge on C13's parent beat — a pre-registered null
  that cannot occur on that board.
- `dice-at-the-places/sim.js:6` (also herbs:5, mosswake:5, they-remember:6) uses "halt"
  a fourth way, as shorthand for the board `/dawnspur-halt/` in a "not a recut of" list —
  comment-only. `test/dice-at-the-places.test.js:290`'s lineage-lock regex forbids
  `DawnspurHalt`/`dawnspur-halt` in dice's bytes — a module/path pin, orthogonal to the
  token. `public/dawnspur/` and `public/convoy-stop/`: zero hits.

### 5. `stopped` + `commitHome` — the ending inverts (HIGH)
- **`sit/mosswake-loop/sim.js:151-159`** `commitHome()` writes `s.consistAt = "halt"` **and `s.stopped = true`** — free, deterministic (`grep -c "roll|chance|risk"` over that file = **0**), terminal.
- **`sit/dice-at-the-places/sim.js:311-332`** `commitHome()` writes the identical `s.consistAt = "halt"`, rolls the board's **only** die (:314), and **never sets `stopped`**. The stop is armed on the *failure* branch (:327) and fired in `commitCollect` (:344).
- The two notices are near-identical: same `verb: "home"`, same `inProcess: "At Mosswake."`, same `writing: "The run is at Mosswake."`; the button face differs only by an appended percent.
- **Measured:** dice under an all-succeed seed runs **50 steps without stopping** (25 cargoes banked); under an all-fail seed it stops in 3. Play well, the sitting never ends.
- **Wrong action, two ways:** (a) "Home ends the sitting," imported onto a joined board, kills it the instant the run comes home so the armed player never reaches Collect — a dead state machine that passes every wording review; (b) "the return cannot fail," imported forward, makes dice's own signed requirement (`sim.js:14`: "THE PLAYER MUST MEET A RUN THAT DOES NOT WORK") unreachable.
- **Companion absence:** `dawnspur-heat` and `dawnspur-scale` export no `stopped` at all (`grep -c stopped` = 0 on both). `while (!board.stopped)` is true forever on three of eleven boards and errors on none.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; reviewer's read MEDIUM as a board defect,
HIGH only as a cross-board harness risk.** Every structural sentence reproduces
(mosswake `commitHome` always stops; dice `commitHome` never sets `stopped`; identical
"home" notice text, face delta exactly `" 64."`). The sentence that carries the HIGH does
not:

- **"Play well, the sitting never ends" is a seeded-die artefact.** The live page calls
  `createBoard({ fresh: true })` (`index.html:388`), so `roll = Math.random`
  (`sim.js:471`); `mossChance()` hard-codes wardens 0 so chance is fixed at 0.64; the
  corridor has at most one live can-do, so the walk is forced and there is no "well".
  Measured over 100,000 live sittings (reproduced by a second reviewer to three
  decimals): stops at step 3 in 36.3 %, mean stop step 6.55, 99.5 % stopped by step 25,
  6 reached 50 steps unstopped (0.64²⁴ ≈ 2.2 × 10⁻⁵). Every all-succeed / all-fail
  figure is a fixture measurement via the `roll` seam, which is reachable only from
  tests.
- **Both "wrong actions" are already red in dice's own suite:** a stop in `commitHome`
  makes the `s.stopped = true` count 2 against `test/dice-at-the-places.test.js:555-556`'s
  exactly-one; removing the failure branch breaks `:527` `walk("S-C")`. The joined board
  that actually landed after the audit (C13) committed neither.
- **Three of twelve, and a third semantics.** C13 exports boolean `stopped`
  (`sim.js:548`, opening `false` at `:611`) and carries the identical home notice
  (`:282-287`, face "Home she comes. N."); its `commitHome` writes `s.stopped = true` at
  `:444` on the short *press-on* branch only, leaves the ordinary short run to arm
  (`:449`), and Collect fires the stop at `:467`. One notice text now fronts always-stop
  (mosswake), never-stop (dice), stop-on-one-branch (two-ways).
- **"Companion absence" is a naming collision, not a missing ending.** dawnspur-scale
  exports `endSentence` (`:107-110`, non-null once topped); dawnspur-heat writes
  `s.phase = "sat"` at `:77`. `while (!board.stopped)` is the wrong instrument on those
  two. `public/dawnspur/sim.js` has no `stopped` either; `public/convoy-stop/sim.js` has
  no `module.exports` and runs a printed layout self-test at `require` time — it cannot
  be loaded the way any test loads a board.
- Strict comparison at `sim.js:315`: a draw of 0.639 pays, 0.64 arms — recorded because
  it was measured, irrelevant to the collision.

### 6. `home` — the mirror of #4 (HIGH)
- **Position value and enabling gate:** `dawnspur-heat/index.html:176,212-215` `at !== "home"` gates every job; `<div id="home">` at :143. Same at `dawnspur-scale/index.html:202,240-242,169`.
- **Verb:** `dice-at-the-places/sim.js:224` `verb: "home"`, `commitHome` at :311. On that board the home *position* is spelled `"halt"`.
- **Wrong action:** "the jobs light only when she is home" ports as `s.consistAt === "home"` — a condition that is never true, so every job goes permanently dead, and the plausible fix is to gate on `index.html:413`'s CSS class, which is presentation.
- The repo already encodes the contradiction in green tests: four city test files forbid `id="home"` (`dice:820`, `herbs-larder:626`, `mosswake-loop:602`, `they-remember:703`) while heat:143 and scale:169 ship exactly that.

**Verified 2026-09-01 at `796d9a2` — PARTIAL, HIGH agreed.** Corrections:

- `index.html:413` is `sit/dice-at-the-places/index.html:413` (`#consist.home`, rule at
  `:301`); the same line is `sit/two-ways-from-here/index.html:426`. Neither heat (291
  lines) nor scale (310) has a line 413.
- **Five** city test files forbid `id="home"` at HEAD (+ `two-ways-from-here:1331`), and
  the regex is a four-token kill of the desk strip/pads UI
  (`id="pads"|id="send"|id="home"|class="pad"`), not a rule about the token `home`.
  "Encodes the contradiction" overstates it to a semantic pin. The shipping side gains
  `public/dawnspur/index.html:141` (gate `:171`, `:213-216`); the *pinned* shipping side is
  scale (`test/dawnspur-scale.test.js:102-111` via `MANIFEST.txt:39`) and dawnspur
  (`test/dawnspur-heat.test.js:40`) — heat:143 is shipped but unpinned.
- The verb is not dice-only: `verb: "home"` also at `sit/mosswake-loop/sim.js:111` and
  `sit/two-ways-from-here/sim.js:282`; dispatch on the verb at dice:352, mosswake:165,
  two-ways:475.
- **The trap is reachable intra-board, not only across the seam.** Dice's own page spells
  the at-halt state `"home"` — `index.html:377` `<button id="consist" class="home">`,
  `:413` assigns `"home"` for every non-mosswake state, and the `#consist.at-halt` rule at
  `:300` (two-ways `:302`) is defined and never assigned. A reader copying the state name
  from a city page's presentation writes `"home"` into a sim gate without ever touching
  the desk lineage. This strengthens HIGH.
- **`homed` is a second wrong action for the same sentence.** `mosswake-loop` has the one
  sim-level field that literally says home — `homed` (`:205` getter, opening `false`) —
  and it is *terminal*, not positional: `commitHome` (`:151-158`) sets `homed`,
  `consistAt = "halt"` and `stopped`, and `canSend` refuses afterwards. Its page
  (`index.html:372`) renders `board.homed ? "home" : "at-halt"`, so on mosswake the `home`
  class means *sitting over*, while on dice/two-ways it means *consist at halt*. A port of
  "she is home" onto `board.homed` kills every job after the first return.
- Three DOM shapes of `home` across the repo (C13 delta, MEDIUM): `id="home"` as a pad
  (heat:143, scale:169, public/dawnspur:141); class `home` on `#consist` meaning "at the
  halt" from frame one (dice:377/413, they-remember:350, herbs:343, C13:389/426); class
  `home` meaning "has come home / landed" (mosswake:372, dawnspur-halt:357
  `board.landed ? "home" : "gone"`, site `#train.home` :200). The class-level split ships
  green because the four tests forbid only the id.
- `home` never enters any desk `sim.js` at all (no key, no value); the asymmetry with
  #4, where `"dawnspur-halt"` is a sim-level route id, is worth stating.

### 7. `marksLost` — the composition splits (HIGH)
`dawnspur-line:441` `s.marksLost += run.toll;` (toll only; provisions go to `foodLost`) vs `dice:326` and `dawnspur-dispatch:392` `+= provisions + toll`. Measured on one turned-back Mosswake run: **LINE 0, DICE 2, DISPATCH 2.** The discriminator exists but is the *absence* of a key (`foodLost`), which survives nothing once the scalar leaves the record and reaches a spec sentence or a ledger row.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; reviewer's read HIGH → MEDIUM.** The three
measured figures (LINE 0, DICE 2, DISPATCH 2) reproduce from the true openings. The
citations and the census do not:

- **`dawnspur-line:441` → `:440`** (`s.marksLost += run.toll;`; `:439` is
  `s.foodLost += run.provisions;`; `:441` is the sentence line). Wrong at the audit's own
  base.
- **`dawnspur-dispatch:392` reads `s.marksLost += run.stake;`**, not `provisions + toll`;
  `stake = r.provisions + r.toll` is computed at `:362` and stored on the run at `:369`.
  The arithmetic is the same; the quoted text is not in the file. The report collapsed the
  composition from memory of the neighbouring board — which is the hazard it describes,
  demonstrated in its own text, and the strongest evidence for keeping the finding.
- **Five sites, three compositions — not three boards, two.** `dawnspur-storm:630`
  `s.marksLost += run.toll + run.extra;` (`extra` is the trim surcharge, `TRIM_MARKS` 2;
  measured 0 untrimmed / 2 trimmed) is a fourth site the report omits; `two-ways:439`
  `+= run.provisions + run.toll` is a fifth (press-on adds 0). Nothing in `docs/` names
  storm's surcharge; a cross-board reader cannot recover that 2 = trim rather than
  2 = provisions.
- **The split is a documented design decision, pinned in both directions.**
  `docs/cfd-203-beat.md:744-760`, `:828`, `:891`, `:1404` state it and name the parent's
  `stake` semantic they depart from; within every board `marksLost` equals the marks
  actually debited on the turned-back run. Reword: *the STAKE's currency splits across
  boards; `marksLost` tracks marks honestly in each.*
- **No consumer crosses boards at HEAD.** No `index.html` reads `record` (three comment
  hits); dice and two-ways read `marksLost` nowhere outside `record()` (their
  `endSentence` is a constant); the only sentences carrying the scalar are each sim's own
  `ledgerSentence`, which name the currency. "Survives nothing once the scalar leaves the
  record" is a hypothetical about a future consumer, not an observed leak; there is also a
  *positive* discriminator (line/storm print food and marks separately and name a zero).
- two-ways pins its composition by regex on the source line
  (`test/two-ways-from-here.test.js:1026`); a "unification" would go red by text match.
  `test/dawnspur-line.test.js:1066` measures from `makeBoard({marks:60, stores:6})`, a
  suite-only opening — the same figures are reachable from the real opening (two CARRYs,
  then Mosswake), so the pin is sound, but cite it as off-opening.

### 8. `carryYield` — marks vs food, full vs clamped (HIGH, intra-lineage but header-invited)
`dawnspur-scale/sim.js:105` returns `s.level` and `commitCarry` pays **marks** (:66). `dawnspur-line:475` returns `carryLoad()` = `min(level, STORES_CAP - stores)` and lands **food** (:383). `dawnspur-storm:383-387` is a third formula (also clamps by reserve). Both open at **1**, which is the only value anyone spot-checks. `dawnspur-line/sim.js:9-19` names `/dawnspur-scale/` as inherited whole and paraphrases "paying FULL at every reserve" — false on the descendant. Aggravator: `dawnspur-scale/index.html:229` prints the marks figure under the label **"CARRY FOOD +N"**.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; reviewer's read HIGH → MEDIUM.** The
mechanism reproduces (one token, two units, three formulas, two label shapes). Two of the
five sentences carry the HIGH and are wrong:

- **Each suite pins its own full formula, not just the opening 1.**
  `test/dawnspur-scale.test.js:313-320` asserts yield == level and marks delta == level at
  reserves 3,2,1,0,0,0; `test/dawnspur-line.test.js:452-468` asserts
  `min(level, cap − stores)` over every level × stores pair plus 300 random sittings;
  `test/dawnspur-storm.test.js:636-669` asserts the clear/bird formula, the storm three-way
  min, and 0 at bare storm. What no test pins is the token's meaning ACROSS boards — the
  only cross-board pins are a byte hash of scale's sim (`line.test:189`) and an assertion
  that line never references `dawnspur-scale` (`:232`).
- **Line's header is not false.** `carryLoad()` (`:290-292`) has no reserve term — level 2
  / stores 4 lands 2 at reserve 0 and at reserve 2 alike — so "paying FULL at every
  reserve" is *true* on the descendant. What is not inherited whole is the unit and the
  stores-cap clamp, and the same header declares both, at `:21-22` ("only their unit does,
  from marks to food") and `:374-376`. The invitation is the phrase "INHERITED WHOLE" at
  `:9/:16` read without the next five lines.
- **Storm's third formula, exactly:** `min(level, cap − stores)` in clear/bird, additionally
  `min(…, reserve)` only when `sky() === SKY_STORM` (`:385`). Reachable from the opening's 3
  marks: carry × 4, MUSTER 1, SEND halt, MEET → storm at reserve 0, `carryYield` 0, carry
  lands 0. `storm.test:667-671` reaches the same state from `makeBoard({marks:60})`; the
  fixture premise holds but cite it as off-opening.
- **Wrong-lineage use fails loudly in both directions**, unlike #2: on scale
  `"stores" in board === false`, so a line-contract "landed into stores" check reads
  `undefined`; on line `commitCarry` leaves marks untouched, so a scale-contract "pays
  marks" check reads 0. Only the opening-1 spot-check is green on all three — the basis for
  MEDIUM.
- The `:229` aggravator stands; the descendants label the same verb "lands N"
  (`line/index.html:434-435`, `storm/index.html:516-517`), both shapes test-pinned on their
  own board (`scale.test:624`, `line.test:1354`). Whether a player reads "+N" as food is a
  design reading, not a measurement. Scale's sim is evidence bytes pinned by the line
  suite (`line.test:189`), so any guard for the token lives on the descendants or in a
  cross-board test.

### 9. `marks` assign-vs-increment (MEDIUM — guarded, not live)
`they-remember/sim.js:132` `s.marks = MUSEUM_MARKS;` (the only write in the repo that discards the prior balance) vs `dice:340` `s.marks += MUSEUM_MARKS;`. Harm is not reachable on the shipped parent (opens at 0, so 0→1). Pinned board-locally by `test/dice-at-the-places.test.js:563`. Becomes HIGH the day a descendant opens on a float and copies line 132; `they-remember`'s own coverage would not catch it (`test:520` is `>=` against an `OPENING_MARKS` of 0).

**Verified 2026-09-01 at `796d9a2` — PARTIAL, MEDIUM agreed.** Mechanism, numbers and lines
hold. Stale: "the day a descendant opens on a float" has arrived and the copy did not
happen — two-ways-from-here opens on `OPENING_MARKS = 3` (`:56`), increments (`:462`), and
pins itself (`test/two-ways-from-here.test.js:864-865`, behavioural `:855`). The hazard is
the *next* descendant copying line 132 without the pin. `:563` is the test header; the
asserting lines are `:564-565` (regex) and `:566-570` (behavioural). The beat is also a
pin: `test/dice-at-the-places.test.js:302` requires `docs/cfd-209-beat.md` to contain the
literal `s.marks = MUSEUM_MARKS`. Two other plain assignments exist (`heat:49`,
`public/dawnspur:57` `s.marks = Math.max(0, s.marks - 1) + 3;`) but read the prior balance
— not the same defect; said so a grep for `s.marks =` is not misread. The discard is
reachable only via `createBoard({marks: N})` (`they-remember:202`), which no `index.html`
passes and no save path exists.

### 10. `armed` (MEDIUM — **and the sweeps disagree on this one**)
`dawnspur-line:477` `get armed() { return topped(); }` — a success the player paid for. `dice:407/327` — a failure suffered, written only on the losing branch; it gates `canSend` **off** and `canCollect` **on**, the exact inverse. One sweep returned `REAL_COLLISION / MEDIUM`, another `BENIGN_SHARED_NAME / LOW`; I did not re-adjudicate. C12 is defended in three places (`test/dice-at-the-places.test.js:526, 555-558, 707` — :558 pins `doesNotMatch(/chartered && topped/)` **by name**), so "ships green" is measurably wrong. The **LINE side has no reciprocal pin**: `dawnspur-storm:684` carries `get armed() { return topped(); }` with nothing warning that the same export means failure two boards over.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; the reviewer adjudicates BENIGN_SHARED_NAME /
LOW, stated as theirs. The completeness critic calls the severity split definitional, not
factual. DO NOT AVERAGE — it is listed under §5 for David.** The facts both sides share:

- The export answers the same question on all four boards that carry it — "is the ending
  armed, one act away from `stopped`?" — and `stopped ⇒ armed` holds on all four
  (`line.test:988` property; `dice sim:344`; two-ways cold stop `:441-446` leaves the arm
  set, `canPress` requires it at `:152`). What differs is the world-cause (line/storm:
  three paid UPs, 12 marks; dice/two-ways: one short run) and what the arm gates.
- **"gates `canSend` off and `canCollect` on, the exact inverse" — strike "the exact
  inverse".** On line/storm `armed` (= `topped()`) gates `canUp` OFF (`line:301`,
  `storm:409`) and SEND stays lit (measured `canSend(HALT) = true` while armed); there is no
  `canCollect` on line or storm. Dice's pair is a different gate on a different verb set.
- **`:558` is not the pin that held.** `:557-558` are by-name regexes on comment-stripped
  text; a mutant writing `s.armed = true` on the PAID branch passes them (replayed on a
  scratch copy by two reviewers independently). The behavioural defences are
  `test/dice-at-the-places.test.js:441`, `:451`, `:472`, `:516`, `:528`; `:707` is the
  genuine by-name defence (forbids `commitUp`/`canUp`). The conclusion — "ships green" is
  wrong — stands; §4's "the one intervention that worked" names the wrong line.
- **"The LINE side has no reciprocal pin" conflates no-cross-reference (true) with
  undefended (false).** Line's meaning is property-pinned at `line.test:953` (300 sittings
  × 30 steps) and `storm.test:1222` (200 × 24); both sims are hash-pinned evidence bytes,
  so a reciprocal note could only ever go in a test file, never in `dawnspur-storm:684`.
  The dice side *does* carry the cross-reference (`dice sim:16`;
  `docs/cfd-209-beat.md:264`). "Two boards over" is not a measured distance — the
  lineages are disjoint; say "in the other lineage".
- **`topped` → `armed` was not a rename.** `armed` is an alias getter *beside* `topped`
  (`line:477`, `storm:684`; `topped` still used 9 and 8 times), and scale carries `bArmed`
  (`:50`). C12 reused a name that was live on three boards; it did not reclaim a retired
  one. The inversion itself stands (§2's mechanism sentence is corrected accordingly).
- **C13 made the arm a toggle.** `two-ways:435` `if (run.press) s.armed = false;` — a paid
  press-on CLEARS the arm; `:448` sets it on the losing non-press branch; pinned at
  `test/two-ways-from-here.test.js:986` (the same `/chartered && topped/` regex),
  `:988-989` (exactly one true-write and one false-write), `:642`, `:761`, `:767`. "Armed is
  a one-way latch" was true of all eleven boards at `9618352` and is false at `796d9a2`.
  Tally: 2 success-armed (line, storm) vs 2 failure-armed (dice, two-ways).
- No `index.html` reads `board.armed` (the only `.armed` hits are a CSS class in
  `public/convoy-stop/index.html`); the getter's readers are four test files' `snap()`
  helpers and `docs/cfd-210-beat.md:20-23`. A THIRD `armed` — HTML-local `let armed = null;`,
  the muster slider's pending Warden count — lives in dispatch/line/storm `index.html`
  (`:258`, `:329`, `:376`), pinned by name at `dispatch.test:1101-1181`; never exported.

### 11. `buildings` (MEDIUM — dead surface)
`dawnspur-halt:36/260` returns structures `["lamp","terrace","foundry","consist"]`; four city boards alias `buildings(){ return places(); }` returning map nodes. `notice()` returns `null` on cross-lineage tokens in both directions — no throw, blank tiles. **Zero live callers** in any `index.html`; every city test walks `places()` instead. Cheapest fix in the whole report: delete the four aliases, and a wrong-lineage call throws instead of returning the wrong list.

**Verified 2026-09-01 at `796d9a2` — PARTIAL; reviewer's read MEDIUM → LOW.** Five alias
boards at HEAD (mosswake:177, herbs:152, they-remember:152, dice:365, two-ways:489), four
at the base. Corrections:

- **Halt's `buildings()` is not dead:** `test/dawnspur-halt.test.js` calls it five times
  (`:218`, `:234`, `:277`, `:287`, `:301`) and `:218` deep-equals the four-structure list.
- **"null in both directions" is three of four:** null for lamp/terrace/foundry (city side)
  and halt/mosswake/rustfall (halt side), but `"consist"` is a token in BOTH lineages and
  `notice("consist")` returns a real object either way — a cross-lineage walk is three
  blank tiles and one real one. No throw on any of the six.
- **Zero callers extends further:** no `index.html` calls `places()` either. Every shipped
  page hardcodes its place ids as DOM buttons and calls `board.postNotice("<literal>")`;
  the only page that calls `board.notice()` directly is two-ways (`:434-437`), with
  literals. The list surface exists for tests only, on every board.
- **The "cheapest fix" cannot land on the boards it names.** Four of the five alias boards
  are hash-pinned passed boards whose bytes the lineage rule forbids changing; the only
  alias deletable under the rules is `two-ways-from-here:489-491` (with the hub card
  re-hashed in the same commit — `test/boards-index.test.js:88-104` pins every card). And
  deleting aliases does nothing for the `notice()`-returns-null path the section names as
  the harm; a wrong-lineage `buildings()` call would throw, `notice()` would not.
- `public/dawnspur/` and `public/convoy-stop/` expose neither `notice()`, `places()` nor
  `buildings()`.

---

## 2. Double-modelled objects — the consist is not the only one

**Yes, four more, all verified by me.** This is the inverse pattern (one thing, several names), and no string- or export-comparison sweep can surface it — it is caught only by reading.

| Real object | Names in use | Verified |
|---|---|---|
| **The board's frozen geometry** | `RIM {left:78,width:18}` (halt:39, site:27) · `GAP {left:42,width:16}` (mosswake:33, herbs:36, they-remember:57) · `MAP {left:42,width:16}` (dice:80) | **Three names, two coordinate sets, identical shape.** `map` is a rename of `gap` with the same numbers. |
| **Cargo on the train** | `s.haul` (heat, scale) · `herbsOnConsist` (mosswake, herbs, they-remember) · `haulOnConsist` (dice) | Three names, one concept. A cross-board query has no single key. |
| **The arrival act** | `verb: "land"` + "Come home." (halt:182) · `verb: "home"` + "Home she comes." (mosswake:111, dice:224) · `meet` / `commitMeet` on the desk boards | The *words* "Come home." are bound to the token `land` on one board and the token `home` on the next. |
| **The consist itself** | place id `"train"` (`dawnspur-site/sim.js:73`) and DOM id `"train"` in **six** `index.html` files, vs `"consist"` as the place id on C8–C12 | The known instance's third name — the sweeps recorded `rim`/`gap` and `land`/`home` as ledgered in `cfd-209-beat.md:352-358`; **`"train"` and `"map"` are not ledgered anywhere.** |

**The mechanism worth naming:** `topped` → `armed` is a rename that *freed a name for reuse*, and `armed` immediately acquired a second, inverted meaning at C12. Renaming without retiring the old token is how this project manufactures collisions. Every row above is a live opportunity for the same.

**Verified 2026-09-01 at `796d9a2` — PARTIAL.** The reviewer's reads: LOW for rows 1, 3, 4
(naming drift between hash-pinned boards with no reachable wrong number or wrong action;
C12's header and the cfd-209 ledger already prescribe the single name C12/C13 use), and
MEDIUM for row 2 for the opposite reason to the one given — the row's own name list is
mis-keyed. Corrections:

- **Row 1** gains `sit/two-ways-from-here/sim.js:92` `const MAP = Object.freeze({ left: 42, width: 16 })`
  (getter `:547`): four boards on {42,16}, `MAP` on two.
- **Row 2 — delete `s.haul` (heat, scale).** It is a permanent latch, not cargo-on-train:
  set once at the first `commitB` (`heat:52`, `scale:76`), never cleared (driven through
  every later commit), marks credited inside `commitB` itself (`heat:49`, `scale:74-75`),
  shown as a badge inside the destination tile `#destB` (`heat/index.html:101/206`,
  `scale:122/235`), not on `#train`. It means "a Mosswake haul has been banked at least
  once". The row should read: `herbsOnConsist` (mosswake:201, herbs:177, they-remember:177)
  · `haulOnConsist` (dice:402, two-ways:540) · C8's *derived* encoding `inbound && !landed`
  (halt:143 "The haul is still on the consist.", halt:286-287, site:127-128). Two names
  plus one derived encoding across C8–C13. A cross-board "cargo" query keyed on the row as
  written returns nothing for C8 and a permanent `true` for heat/scale.
- **Row 3** gains `two-ways:282` `verb: "home"` ("Home she comes. 64.", `:113-114`); and
  `dawnspur-site` has no `verb:` field at all — its arrival act is the job string `"land"`
  (`site:63`) + `commitLand` (`:88`), the same token as halt, so `land` is two boards.
- **Row 4.** The ledger citation is `cfd-209-beat.md:72` and `:350-356` (rim/gap at
  `:350-352`, land/home at `:353-356`; `:358` is the `herbsOnConsist` contradiction).
  **Strike "`map` is not ledgered anywhere":** `map` is the ledger's own prescribed noun
  (`cfd-209:72` "One map, not `rim` and `gap`", `:350-352` "**One map.**"), and
  `dice sim.js:19-20` records the retirement in-file. What is true and narrower: neither
  cfd-209 nor cfd-210 records that C12/C13's `MAP` keeps C9–C11's {42,16} numbers.
  `"train"` unledgered stands (0 hits in `docs/`): six `index.html` under `sit/` plus
  `public/dawnspur/index.html:146`. `dawnspur-site` is not C-numbered (cfd-209:120 numbers
  only C8–C11), so `"train"` at `site:73` sits on an unnumbered board whose same-CFD sibling
  (halt, C8) already says `"consist"`.
- **"`topped` → `armed` is a rename that freed a name" — not a rename** (see #10):
  `armed` is an alias beside a still-used `topped`. And "renaming without retiring" does
  not describe C12's `map` row, which retires both prior names in-file; the old names
  persist only in hash-pinned earlier boards, which by the standing rule cannot change.
- **C12 → C13 is name-stable for all three objects** (`MAP` {42,16}, `haulOnConsist`,
  `verb: "home"`, `"consist"` in `PLACES`). The drift this section describes stopped at
  C12; the "live opportunity" reading is not borne out by the one board landed since.
- `dawnspur-halt/MANIFEST.txt:3` claims lineage "Recut of live c1b66ee5 …", and `c1b66ee5`
  is a merge of a `dawnspur-halt-home` branch, not site — halt and site share `RIM` by
  copy, not by lineage. Read, not verified further.

---

## 3. What the sweeps could not see

Stated as the honest limit. Four sweeps ran — string values, exports, state fields, numeric constants — and their union still leaves these unswept:

1. **`docs/*.md` — the twelve beat specs. This is the single largest gap, and it is where the halt defect actually lived.** Only `cfd-210` was read closely; `cfd-200-beat.md` (1,275 lines, route/EV-heavy) and `mechanisms-recommitted.md` (749 lines) were never read end to end. A spec-vs-source sweep is the mode most likely to find the next halt, and it has not been run.
2. **`index.html` — the DOM namespace.** Control ids, `data-action` attributes, CSS class tokens, label text and the DOM-to-method wiring, across 4,860 lines. Only spot-grepped. There is direct evidence it pays: the `home` finding is half DOM (`id="home"` shipping on two boards that four test files forbid it on), and `test/dawnspur-heat.test.js:76-83` pins `#step.out` / `#step.gone` in markup.
3. **`test/*.test.js` — 617 tests, no shared helper or fixture name audited.** The walk-string DSL was found only because `wait` led to it.
4. **Nested returned objects.** `record`, `manifest`, `notice` and `rim/gap/map` were opened; the **per-card objects from `cards(atRoster)`** on dispatch/line/storm were not. That is where a spec author reads route text, conditions and quoted percentages — treat it as unswept.
5. **Prose constants.** `writing` / `blocked` / `inProcess` copy and the sentence constants were checked only where a string doubled as an id. These boards deliberately reuse sentences, and copy is what a beat author reads first.
6. **Two live boards with no `sit/` source.** `public/dawnspur/` and `public/convoy-stop/` are linked from `public/index.html` and fall outside the eleven. Spot-swept only; one result already: `public/dawnspur/sim.js:15` uses `"held"` as a **core state that blocks every job**, while `hearth: "held"` on scale/dispatch/line/storm is inert town dressing.
7. **Upstream provenance is unreachable from this repo.** The headers claim `BASE`, `POINT`, the guard values, `pays 10/14/18` and the Chartered toll are inherited verbatim from the PWA engine at `skyrail` commit `ea22c43`. Nothing here can check that. Every "inherited verbatim" claim is unverified.
8. **`dawnspur-storm` is the least-covered board** — 48 exports, a sky cycle and a `trim` verb, sampled at the opening only.
9. **Membership itself is contested.** Three sweeps derived three different lineage memberships from the headers, principally over whether `dawnspur-halt` and `dawnspur-site` are LINE boards that adopted the city API or the city lineage's ancestors. The cross-lineage count moves 5 → 22 → 31 with that choice. **Any guard must declare membership explicitly rather than infer it**, or it will grade a different question each time someone reads it.

**Verified 2026-09-01 at `796d9a2` — five of these nine were opened by the reviewers, and
one of them was wrong to be here.**

- **§3.4 `cards(atRoster)` — opened, and it carries §1.1 one level down.** See the
  verification block under #1: `provisions: 2` on every desk card, beside `stake` (marks)
  on dispatch and beside `condition` "The stores hold 0 …" (food) on line/storm. Card
  `lit` = `canSend(r.id)` on all three — the affordance sense that C13's DOM `.lit` uses
  (see the C13 delta).
- **§3.3 `test/*.test.js` — opened; the walk-DSL legends collide.** Top-level names per
  file: `walk` in 12 files, `makeBoard` 11, `snap` 3, `cssOf`/`rule`/`box`/`overlap`/`canDos`
  shared across the city files. The twelve `walk()` bodies reuse letters with no shared
  legend: `S` = `commitSite` (halt, site) vs `commitSend` (dice, mosswake, two-ways);
  `C` = `commitCarry` (line, storm) vs `commitCast` (halt, site) vs `commitCollect` (dice,
  they-remember, two-ways); `H` = trimmed halt send (storm) vs `commitHome` (mosswake);
  `B` = trimmed cloud send (storm) vs `commitB` (scale); `c` = cloud send (dispatch, line,
  storm) vs `commitCarry` (scale); `+`/`−` = seeded `commitMeet` (desk) vs seeded
  `commitHome` (dice, two-ways). Only `.` (`wait() === false`, ten files) and `U` are
  consistent. Each `walk()` throws on an unknown letter but not a reused one, and `S`
  succeeds from the opening under both meanings, so a walk string copied across files runs
  a different verb sequence before its first refusal. Test-only; LOW; a row for any
  lexicon ledger, because the proposed guard enumerates sims, not test DSLs.
- **§3.7 upstream provenance — "Nothing here can check that" is wrong; it checks.**
  `git -C C:\dev\skyrail cat-file -t ea22c43` = commit. Engine at `ea22c43`
  `src/engine.js:1150` `crewBonus = Math.min(0.3, preferredPower * 0.012)`, `:1153`
  `0.76 - routeRisk - damagePenalty + crewBonus …`, `:1148` `clamp(route.baseRisk -
  routeState.safety, 0.01, 0.9)` — BASE 0.76 / POINT 0.012 / min 0.3 verbatim on dispatch
  `:62-63`, line `:52-53`, storm `:92-93`, dice `:55-56`, two-ways `:61-62`. `content.js`
  ROUTES baseRisks: dawnspur-halt 0.08 (`:377`), mosswake-loop 0.12 (`:391`), rustfall-yard
  0.22 (`:405`), cloud-basin-span 0.25 (`:419`) — all match. **Pays 10/14/18 are NOT
  "inherited verbatim" and the dispatch header never says they are** (`sim.js:40-48` says
  *converted*): reward baskets valued at `economy/config.js:47` `resourceValues` then
  ÷ 6.5 — halt {marks 6, food 32, materials 14} = 66, mosswake {8, 18 food, 18 energy, 16
  materials} = 94, cloud {12, 26 energy, 9 parts, 14 food} = 114; 66/94/114 ÷ 6.5 =
  10.15/14.46/17.54 → 10/14/18. Chartered toll 1 = `config.js:67` `chartered: { flatFee: 1 }`
  (core `flatFee: 0`, `:66`). MUSTER 3 = Wardens `baseCost {food 8, materials 5}`
  (`content.js:321`) = 18 ÷ 6.5 = 2.77 → 3. Provisions 0/2/3 are declared new-play in the
  header (`:47-48`). The "home halt" phrase is at `content.js:381` at `ea22c43` too, not
  only at `7bdddc5`.
- **§3.6 the two source-less boards — opened.** `public/dawnspur` exports 17 keys, heat 18,
  14 shared (`marks, heldA, phase, haul, warmed, litJobs, canGoods, canB, canHold, canWarm,
  commitGoods, commitB, commitHold, commitWarm`); heat-only `banked, hearth, step, wait`;
  dawnspur-only `core, tickLeak, tickDie`. Same name, different meaning on two: `warmed` =
  `!!s.banked` on heat (`:88`) vs `core === "full" || core === "held"` on dawnspur (`:107`);
  `phase` takes {goods, b, hold, warm, sent, sat} on heat vs {goods, b, hold, warm, held,
  charged, leak, dead} on dawnspur, so `phase === "held"` is a state on dawnspur while
  `hearth === "held"` is scenery on scale/dispatch/line/storm. The `core === "held"` claim
  confirmed (`:15`, `:20`, `:25` gate every job). `public/convoy-stop/sim.js` exports `[]`
  and prints a layout self-test at `require` time; it cannot be loaded as a board.
- **§3.5 prose constants — swept over every quoted literal ≥ 12 chars in `sit/*/sim.js`:
  clean.** The repeated sentences are all lineage-internal copies ("The run came home short
  and the larder covered it." dice ×4 + two-ways ×5 only; "The consist is home. Empty."
  dice, they-remember, two-ways; "the train is home" desk only). No identical sentence
  crosses the seam with a different meaning. Reported as a result, not omitted.
- **§3.8** storm's 48 exports confirmed; two-ways is also 48 at HEAD, so "least covered"
  is no longer unique on that metric.
- **Not on this list and should have been: `test/boards-index.test.js`.** Its first test
  (`:88-104`, "every hash the index publishes is the hash of the bytes that ship") reads
  every card's published `sim.js`/`index.html` sha8 from `public/index.html` and compares
  it to the shipped blob. **C13 is therefore hash-pinned through the hub card**
  (`public/index.html:30-34`, `d800c8de` / `13bb2d43`) — "pinned by nobody" in the handoff
  and in one plan critic's own census was wrong because the hash lives in the hub, not in a
  test file. A byte change to two-ways goes red there unless the card is re-hashed in the
  same commit. The same file holds the sit≡public byte-identity test for every board and
  the CRLF ratchet.
- **§3.9 membership** — resolved by measurement, see the headline block: 5 / 9 / 22 / 31 /
  10 depending on the choice. Any guard declares it per row.

---

## 4. Recommendation: build the guard

**Verdict: build it. The documented-naming-rule option is not a hypothesis here — it has already been run as an experiment, and it failed.**

The argument against a guard is the usual one: 14 collisions is a small enough number to write down. But look at what this project has already spent on writing it down, and what it bought:

- The inert `wait()` contract is published in **eight source headers** and executed in **nine test files**. One board contradicts it, shipped, signed.
- "No Halt SEND on `/dawnspur-halt/`" appears in **three MANIFEST.txt files** plus a signed **REFUSED** row in `cfd-206-beat.md:180`. People kept arriving at it anyway — that is what four refusals in writing means.
- `dice-at-the-places/sim.js:14-16` and `:62-64` state both the `armed` inversion and the `provisions` denomination in prose, in the file. The halt defect was written **against that same file** and cleared a signature.

Documentation has now failed at this specific task four separate times. The one intervention that worked was `test/dice-at-the-places.test.js:558` — `assert.doesNotMatch(SIM_CODE, /chartered && topped/)` — a mechanical pin naming the collision. It is board-local and one-directional, which is exactly the shape CLAUDE.md's re-aim rule addresses.

There is also a count argument, and it goes the other way from the brief's hope: **92 of 126 exported names are already shared by two or more boards, 31 across the seam.** Fourteen have been adjudicated. The other seventeen cross-lineage names have not, and every new board adds more. This is not a fixed list to write down; it is a growing surface. And the instrument that was supposed to bound it under-reported by 2–6× and was believed.

**What to build, in cost order** *(estimates — I did not implement any of this, and there is no stable instrument for guessing test-authoring effort here)*:

1. **Land today, ~6 lines total, zero design work.** Assert `canSend.length` and `commitSend.length` per board in the existing per-board tests, and make the zero-arity boards **refuse** a non-empty argument rather than ignore it — that alone converts collision #2 from a silent unrequested send into a loud failure. Delete the four dead `buildings()` aliases (#11) at zero behavioural cost.
2. **The standing guard: one derived inventory + one declared ledger.** A `test/lexicon.test.js` that (a) mechanically enumerates every board's exported names with **arity, getter-vs-method, and whether calling it from the opening state mutates**, plus every `PLACES`/`BUILDINGS` member and every `consistAt`-style string value; (b) diffs that inventory against a hand-authored table with **one row per shared token, declaring its meaning per board and the declared lineage membership**; (c) fails, printing both sides, when a token appears on a board not in its row, or when a token's measured signature changes. Estimate: **~120 lines of derivation, ~40 lines of test, plus 14 ledger rows** — the same one-validator/declared-snapshot shape as `plan-facts` and `save-renames` in the parent repo. It is a morning, not a project.
3. **Re-aim, do not delete, the guards that already work.** `:558` fires only for C12; the LINE side (`dawnspur-line:477`, `dawnspur-storm:684`) has no reciprocal pin.

**What the guard cannot do, said plainly so it is not oversold:** it detects a token acquiring a *new* board or a *changed signature*. It cannot detect a token quietly acquiring a new *meaning* on a board it already legitimately occupies — `provisions` flipping marks→food would pass a pure name-and-arity check. That case needs the ledger row to state the unit and the debit target (`s.stores` vs `s.marks`) and the test to grep for it, which is cheap for the fields that carry numbers and not worth attempting for all 92.

**And it does not cover `docs/`.** The halt defect was a *spec* defect; a source-side guard would not have caught it. If only one further thing is done after the guard lands, it should be the **spec-vs-source sweep of the twelve beat files**, not more source sweeping. That is where the next one is.

**Verified 2026-09-01 at `796d9a2` — the recommendation stands; two of its three "land
today" items fall, and its account of what the guard catches was too generous.**

- **"Land today, ~6 lines" — only the test-side half is free.** Asserting
  `canSend.length`/`commitSend.length` per board is test-only and moves no byte. Making
  the zero-arity boards *refuse* an argument, and deleting the alias `buildings()`, are
  source edits to `sit/mosswake-loop`, `sit/herbs-larder`, `sit/they-remember` and
  `sit/dice-at-the-places` — four PASSED boards whose `sim.js` is sha-pinned two to four
  times across other boards' test files and once more through the hub card. The lineage
  rule forbids the change; a plan critic counted 8 to 16 named tests across up to six
  files going red per edit. The only board that can take either today is
  `two-ways-from-here` (built, not yet sat), with its card re-hashed in the same commit.
  The free form is a new cross-board test — `test/send-arity.test.js`, ledgering SEND
  arity for the six exporting boards and pinning the argument-discard as a
  self-cancelling row — which is the first thing the guard lands (§5).
- **What a name + arity + getter/method + mutates-from-opening + place-id + consistAt
  guard would have caught, measured from the opening:** #2 cleanly; #11 with a value
  column; four more (#1, #7, #8, #9) only by what a *declared* row says about unit and
  debit target; and it **misses eight**, including `wait` on heat — the
  mutates-from-opening column reads `false` on all twelve boards, because heat's mutation
  is latent behind `banked`. The ledger therefore needs, per shared token: lineage
  membership (declared, not inferred), unit, debit target (`s.stores` vs `s.marks`), and
  the value at the opening; plus two surfaces this section omits because it enumerates
  sims — the per-card objects from `cards()` and the twelve `walk()` legends; plus an
  UNADJUDICATED list for the other ~83 shared names with a completeness test that fails
  when a shared name is in neither list.
- **"It is a morning, not a project"** — no instrument; reported as null. The
  `plan-facts` / `save-renames` analogy holds for the shape (one derivation module, one
  declared snapshot, red-first) and not for the size of the declared side.
- **"Documentation failed four times" — the count is nine headers, not eight** (ten at
  HEAD), ten walk-DSL files at HEAD, three MANIFESTs plus the REFUSED row at
  `cfd-206-beat.md:180` confirmed, the dice header prose confirmed. **And `:558` is not
  the pin that held** — see #10; the behavioural pins at `dice.test:441/:451/:472` are.
  The argument survives with the correct citation: mechanical, *behavioural* pins have
  held; prose and by-name regexes have not.
- **"And it does not cover `docs/`."** Confirmed by doing it: the spec-vs-source sweep of
  the twelve beats is recorded in §6, and it found bridges no source guard could see.


---

## Delta at `796d9a2` — C13, the board the audit could not see

C13 (`sit/two-ways-from-here/`, `13bb2d43` / `d800c8de`, byte-identical in `public/`, hub
card and MANIFEST agree) landed after this audit was taken and before it was verified. It
carries every one of the tokens above in the dice-at-the-places sense — `provisions` in
MARKS, `canSend`/`commitSend` arity 0 with the argument discarded, `wait` inert, `halt` =
home, verb `home`, `marksLost` = provisions + toll, `marks` incremented, `buildings` a
fifth alias, `MAP` / `haulOnConsist` / `"consist"` — with two documented departures from
its parent: `commitHome` sets `stopped` on one branch (the cold press-on, `:444`;
`test:981` pins two `stopped` writes against dice's one), and `armed` is cleared by a paid
press-on (`:435`), a toggle where dice's was a latch.

Its new vocabulary — `canPress`, `commitPress`, `endedCold`, `liveCanDos`, `pressOns`,
`PRESS_COST`, `COLD_END`, verb `"press"`, "ROLL HER OUT." — collides with nothing on any
other board, `public/dawnspur` and `public/convoy-stop` included (grep, zero hits). `cold`
elsewhere is CSS-comment prose only. `record` on C13 is a five-key object where the desk
boards and dice carry four — a shape change under a shared name, not a meaning change.

**One new cross-board collision, in the DOM, not the exports — MEDIUM.** The CSS class
`lit` means *has a live can-do now* on C13 (`index.html:333` the rule; `:434-437`
`classList.toggle("lit", board.notice(place).canDo !== null)` on all four places) and
means *the lamp is on* on `/dawnspur-halt/` (`index.html:145` `#lamp.lit .globe`, `:351`
`lampEl.classList.toggle("lit", board.lampLit)`). The city headers' prose "Halt is lit and
holds" (herbs:10, mosswake:10, they-remember:13) is the lamp sense; every city board
including C13 exports `lampLit` in the lamp sense (C13 `:527`, opens `true`). On C13
`#halt.lit` is false at EVERY frame — the Halt's `canDo` is always null, and `test:616`
asserts it with the failure message "the Halt lit" in the affordance sense — while "the
Halt is lit" is true in the lineage prose and on halt's DOM. The desk boards' card field
`lit: canSend(r.id)` (dispatch:336, line:364, storm:491) shares C13's sense. Same shape as
#6; invisible to a name-and-arity guard because `lit` is a DOM class.

**LOW:** the retained singular `liveCanDo()` (`:495-501`, first match) beside the new
plural `liveCanDos` (`:505-512`) reports Collect only at the arm and never `press` — the
meaning-drift-on-a-legitimate-board case §4 says the guard cannot see; `test:581` fences
it board-locally. Any cross-board harness that drives `liveCanDo()` (the 100,000-sitting
instrument under #5 does) is right on dice and wrong on C13.

**DOM census.** C13's 30 DOM ids are exactly dice's set; no `id="home"`, no `data-*`
attributes; the only new token is `.lit`. The union of every `assert.doesNotMatch` in the
four city test files (226 found, 217 applicable) hits C13 seven times, and the identical
seven hit its parent — per-board pins on send-less boards and mosswake's `\bUP\b` matching
`put-up`; none C13-introduced. Inherited dead rule `#consist.at-halt` (`:302`, never
assigned); `id="gap"` (`:81`/`:348`) on the DOM while the sim says `MAP` — §2's geometry
split carried forward unchanged. `endSentence` is exported (`:551-556`) and never read by
C13's page, as its header claims; the desk pages render the same-named getter — consumed
on one lineage only, not a meaning split.

**Line drift: none.** `git diff --name-status 9618352 796d9a2` = `docs/cfd-210-beat.md`
(hunks after `:270`), `public/index.html` (+6, the card), and the nine new C13 files.
Every `sit/*`, `test/*` (bar two-ways) and other `docs/*` citation above is byte-identical
between the two trees; the ones found wrong (#7's `:441`, `:392`) were wrong at the audit's
own base.

---

## 5. Dispositions — RULED, David, 2026-09-01

**His words, verbatim:** *"Build the guard, sweep the beats first, land the audit under docs."*

Three instructions, one ordering constraint: the spec-vs-source sweep of the twelve beats
runs and lands before the guard does. This document is the third instruction; §6 is the
first; the guard is the last, and it landed at `84da020`:

### The guard — landed `84da020`, test-only

`test/lexicon.test.js`, `test/lexicon-derive.js`, `test/lexicon-ledger.js` — one derivation of
every board's name surface (exports with kind, arity, opening value and key lists; place ids
and `consistAt`; the per-card objects from `cards()`; the eleven `walk()` legends; a bounded
DOM surface of `id=`, `classList.toggle(` and `.className =` tokens), one declared ledger
(lineage membership DECLARED — the orchestrator's ruling: halt and site on the city side;
one row per name that crosses the seam and per adjudicated intra-lineage finding, meaning
per side, unit and debit target where numeric, source pins, driven paths from the opening
with every step asserted true; `armed` CONTESTED with both readings verbatim), and the
test that diffs them and prints both sides. **22 tests; suite 694 → 716.**
No byte under `sit/`, `public/`, `docs/` or any existing test.

Red-first by the author and by the orchestrator (an empty ledger prints the full derived
list of what to declare). Mutation-verified by the author (eleven), the orchestrator (three,
by hand), and an adversarial critic in its own worktree (nineteen). The critic found two
blockers and two highs: the ledger's `wait` row carried §1.3's REFUTED sentence — "ends the
sitting" — signed into the guard, the exact class it exists to stop; four citations pointed
at scratch files; the inert-`wait` check was a regex over the whole file, fooled by a
shadowing second function or a block comment; a `sourcePin` matched inside a comment or a
string while the measured value disagreed. All fixed in the author's fix pass and re-mutated
red before landing. What it provably does not catch is written in the file: anything in
`docs/`, a meaning change no declared column expresses, and DOM shapes outside the three it
reads. The rulings it carries as declared, not blocked: `armed`; the membership.

### Do not average these

- **`armed` (§1.10).** One reviewer adjudicates BENIGN_SHARED_NAME / LOW — the export
  answers one question ("is the ending armed?") on all four boards that carry it, and
  `stopped ⇒ armed` holds on all four. The report holds REAL_COLLISION / MEDIUM — the
  world-cause and the gated verb set invert. The completeness critic calls the split
  definitional, not factual. The guard's ledger carries the row as CONTESTED with both
  readings and every measured site; nothing downstream may cite a single severity for it
  until David rules.
- **`wait` (§1.3).** The reviewer reads MEDIUM on the report's own grounds (it does not
  end the sitting; the timer's effect is the documented design) and says HIGH is
  defensible if the pin count dominates (twelve test files freeze heat's bytes, so the
  divergence can never be conformed, only renamed on the other eleven). Both readings
  are recorded; the guard pins the mechanism regardless of the label.

### What the "two near-free landings" became

The audit's §4 item 1 proposed three things for "today". Measured (§4's verification
block): asserting SEND arity per board is test-only and free; making the zero-arity boards
refuse an argument, and deleting the alias `buildings()`, are source edits to four PASSED
boards whose bytes are pinned two to four times each and once more through the hub card,
and the lineage rule forbids them. **Disposition:** the arity ledger and the
argument-discard pin land inside the guard as self-cancelling rows; the two source changes
are refused for the passed boards and left to the next board's cut, where they are a
design call for its beat, not a cleanup.

### Defects filed out of this audit, for the record

- **`docs/cfd-201-beat.md:1017` and `:1386`, and `docs/cfd-209-beat.md:396`** carry the
  halt bridge in the design record (§1.4). Superseded in place by the sweep — §6.
- **The bridge's seed is upstream.** `skyrail` `src/content.js:381` (identical at `ea22c43`
  and `7bdddc5`) files the home under `ROUTES` with `id: "dawnspur-halt"`, `baseRisk 0.08`
  and the description "The home halt, …". The boards' desk lineage inherited a *route* to
  the place the city lineage calls home. Recorded here for the PWA repo; not a boards
  change.
- **`KILLS.md:63` cites `docs/cfd-176-beat.md`, which does not exist in this repository**
  (the CFD-176 beat lived on the pre-git host and in a pull request). The ledger's own
  header rule — a kill names its record — is unmet for that line; and **no storm sitting is
  in `KILLS.md` at all** although the storm board was sat five times without a pass
  (`docs/mechanisms-recommitted.md:589-590`, `docs/cfd-209-beat.md:114`). Both are ledger
  gaps, not beat lines; disposition in §6.
- **`test/boards-index.test.js` is the pin the handoff forgot** (§3's verification block).
  Any "not yet pinned" claim about a shipped board is false by construction while the hub
  publishes hashes.

---

## 6. The spec-vs-source sweep of the twelve beats — 2026-09-01

§3.1 said the twelve beat files were the single largest unswept surface and that the
halt defect had lived there. David ruled the sweep first. This section is its record;
the edit sets it produced are landed as dated commits named under *Dispositions*, and
the beat files themselves carry the corrections in place, in the `90488ff` form.

### Ground truth at the sweep

- Boards `C:\dev\skyrail-boards` at `796d9a2`, clean, 694 / 694. PWA `C:\dev\skyrail`
  at `7bdddc5`, read-only reference for provenance claims (`ea22c43` where a beat names it).
- Twelve beat files, 8,296 lines LF: cfd-183 400 · 196 864 · 200 1,275 · 201 1,553 ·
  203 1,582 · 205 291 · 205-halt 293 · 206 237 · 207 264 · 208 528 · 209 420 · 210 589.
- Which board each governs, from the `Spec:` line in each `sit/<board>/sim.js` header:
  183 → `/dawnspur-scale/`; 196 → `/dawnspur-dispatch/`; **200 → none** (Rustfall is
  unbuilt; its declared parent is `/dawnspur-storm/`); 201 → `/dawnspur-storm/`; 203 →
  `/dawnspur-line/`; 205 → `/dawnspur-site/`; 205-halt → `/dawnspur-halt/`; 206 →
  `/mosswake-loop/`; 207 → `/herbs-larder/`; 208 → `/they-remember/`; 209 →
  `/dice-at-the-places/`; 210 → `/two-ways-from-here/`. **`/dawnspur-heat/` cites no
  beat** — its spec is not in this repository — and was not swept.
- Seven tests regex-read a beat and so phrase-protect it: `dawnspur-halt:182` (13
  regexes on cfd-205-halt), `dawnspur-site:178` (8 on cfd-205), `dice-at-the-places:295`
  (15 on cfd-209), `herbs-larder:244` (21 on cfd-207), `mosswake-loop:210` (20 on
  cfd-206), `they-remember:277` and `:836` (39 on cfd-208), `two-ways-from-here:399` (14
  on cfd-210). **No test reads cfd-183, 196, 200, 201 or 203.** The canon file
  `docs/mechanisms-recommitted.md` is read by no test, but it cites cfd-203 **by line
  number** at `:623` and `:694`.
- `KILLS.md` holds kills and standing rules only; passes live in the beats, the commit
  memos and canon §7:240-246. The brief's "kills and passes: KILLS.md" was false for
  passes, and two boards that were sat and did not pass — storm (five sits) and site
  (one) — have no `KILLS.md` line at all.

### Method

One sweeper and one refuter per beat, twenty-four agents, read-only, sharing the live
tree; each drove the governed sim from its opening for every reachable-state claim. Nine
categories: names, numbers, mechanisms, Kill list vs tests, canon citations, Seat/status
claims, cross-lineage token use (the audit's fourteen tokens plus C13's), internal
consistency (the `90488ff` class), and provenance against the PWA. A synthesis then
kept CONFIRMED and PARTIAL rows whose refuter agreed the fix is a factual supersession,
dropped REFUTED rows into a do-not-re-find list, built one anchored edit set per file
(anchors cut from the file by line range, never retyped, refused unless unique), and
graded every test regex against a preview copy. Rows the sweeper missed and only the
refuter proposed went to a separately labelled set and a second reader before landing.

**A process defect of the orchestrator's own, recorded:** the first synthesis received
its input through a script that truncated at 180,000 characters, so it saw only the six
desk beats plus cfd-205 (cut mid-item). The six city beats — the side of the seam the
sweep was aimed at, and where the sweepers reported twelve of the nineteen bridges — were
synthesised in a second pass from the same journal. Nothing was lost; the halves are
recorded separately below because they were measured separately.

### The desk half — cfd-183, 196, 200, 201, 203, 205

| beat | checked | holds | mismatches | uncheckable | rows | refuter missed | C / P / R |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cfd-183 | 97 | 89 | 5 | 3 | 8 | 3 | 7 / 1 / 0 |
| cfd-196 | 196 | 184 | 5 | 7 | 5 | 4 | 5 / 0 / 0 |
| cfd-200 | 69 | 52 | 17 | 48 | 17 | 5 | 14 / 2 / 1 |
| cfd-201 | 236 | 216 | 15 | 5 | 15 | 3 | 14 / 1 / 0 |
| cfd-203 | 74 | 62 | 9 | 3 | 9 | 1 | 8 / 1 / 0 |
| cfd-205 | 117 | 109 | 7 | 1 | 7 | 2+ (truncated) | 6 / 1 / 0 |
| **total** | **789** | **712** | **58** | **67** | **61** | **18+** | **54 / 6 / 1** |

Categories over the 61 rows: STALE 25 · WRONG 15 · INCONSISTENT 10 · UNCHECKABLE 4 ·
UNCITED 4 · UNTESTED_KILL 2 · BRIDGE 1. Severity: HIGH 6 · MEDIUM 15 · LOW 40. Action:
SUPERSEDE 35 · DAVID 7 · NONE 19; the refuter disagreed with the action on four rows
(listed under *do not average*).

**The finding that ranks first is the audit's own class, inside the desk lineage.**
`docs/cfd-200-beat.md` re-based onto `/dawnspur-storm/` and kept pricing its stake,
its shortest path, its Kill line and its terminal registers in the dispatch board's
marks purse — `provisions` and `marksLost` carried across the token with the wrong
board's unit, exactly §1.1 and §1.7 predicted. Four HIGH rows:

- `:345` "It stakes 3 provisions and the Chartered toll of 1 — **4 marks**" — the parent
  debits provisions from `s.stores` and the toll alone from `s.marks`
  (`sit/dawnspur-storm/sim.js:427`, `:588-589`).
- `:1046-1058` the five-row shortest path ends "SEND RUSTFALL, stake 4 | 4" — the parent
  opens at `OPENING_STORES = 0` and refuses a 3-provision send ("The stores hold 0. Cloud
  Basin wants 3.") until three carries land.
- `:1076-1093` the first-sitting sky trace is the dispatch path, and the inference on it
  is inverted: driven on the parent, the send falls at t8 under STORM and the pushes at
  t10–t12 clear. Design paragraphs (`:263-292`) rest on it — **David's call**, not built.
- `:852` "Roster cap 4 total … 55 rosters are legal" counts the Ranger inside a cap the
  parent keeps it outside of (`musterReach` `:411-414`, `canMusterRanger` `:418-421`);
  the space is 70 and every "of 55" is stale. The frontier tables survive by dominance,
  not re-measurement; "10 of 55" cannot be re-derived — the solver is not in the repo.

The rest of the desk half, by severity:

- **HIGH** `cfd-200:593` — the beat "carries the whole storm board" and never mentions
  UP, topping, or the parent's own arming stop (`sim.js:626`), reachable by play and
  ending the sitting before any Rustfall send. Two stops on one board, unreconciled.
  **David's call**; a refuter-only edit flags it.
- **HIGH** `cfd-203:166-170` — "CFD-200's parent moves a third time … re-bases onto
  `/dawnspur-line/`": the sentence canon §7.1.4 withdrew on 2026-08-28 and flagged as
  "still live in CFD-203's Linear description". Live in the beat too, unmarked. Built.
- **HIGH** `cfd-205:9`, `:25-26`, `:284` — "Draft. Do not merge … David sits first." on a
  board merged at `c59dc101` (PR #13), live, and sat 2026-08-30 (stopped, not passed).
  Built across all three lines; the site test's eight regexes match on the result.
- **MEDIUM** `cfd-201:68-75`, `:103` — the Seat still read "Beat only. No implement."
  on a board that shipped (`42e4aa8`), was sat five times, recut five times (three of
  them copy), and stopped without a pass. `:633-646` carried the pre-recut-3 ground
  registers while `test/dawnspur-storm.test.js:817-819` pins recut 3's. `:723-726` asked
  the trim question in the intent form canon §7.4 refuses by name. All built.
- **MEDIUM** `cfd-183:41-43`, `:177` — the heat index pin `cedf765c` was stale at
  signature: `efbed23` moved it to `b5f7e14f` ninety minutes before drafting, and
  `test/dawnspur-scale.test.js:80` grades the moved bytes. Built. **The same stale pin is
  shipped** in `sit/dawnspur-scale/MANIFEST.txt:25` — a passed board's bytes; David's.
- **MEDIUM** `cfd-200` — Inherited-whole omits CFD-203's join, which the storm parent
  carries (`:305-320`); the terminal registers speak one marks figure where the parent
  keeps `foodLost` apart (`:586-609`); TRIM priced at "one provision" where the parent
  charges `TRIM_MARKS` 2 by David's 2026-08-28 ruling (`:994`, `:1246`); the `[WB]`
  "opt-in interception" bullet is Frontier's, not Chartered's (`:1123`); three `[TEETH]`
  attributions are MDB 1.21's (`:1128-1140`). All built.
- **MEDIUM** `cfd-203:763-767` — the example terminal quoted a record the sim cannot
  produce (3 marks lost forces ≥ 9 food lost). Replaced by the shipped terminal, driven
  from the real opening by `h+CCm-CCm-CCCc-CCm+CCm+h+h+h+h+UUUCc+` and re-driven by the
  orchestrator before landing (record `{runsOut 11, cargoesBanked 8, runsTurnedBack 3,
  marksLost 1, foodLost 7}`, sentence byte-identical). `:788-794` the shortest-commit
  table was one short on every row (BFS: 8 / 9 / 10 / 11). `:27` "NOT SIGNED" under a
  SIGNED block and a PASSED sit. Built.
- **LOW**, built where agreed: cfd-196's third register deviation and the roster write's
  dating (`ed7f49d` → `2a3e9dd`); cfd-201's `V` 4.40 → 4.18, the dispatch-parent
  leftover at `:1021-1023`, the Geology-not-R7 attribution, a pointer born dangling at
  `9b8916d`, the resolved ordering collision; cfd-203's non-existent manifest route and
  the heading still reading RECOMMENDED after the refusal.

**Bridges confirmed in the desk half** (every cross-model token use):

| beat:line | token | the beat's meaning | the governed board / parent | class |
| --- | --- | --- | --- | --- |
| cfd-200:345 | `provisions` | a marks debit at SEND ("4 marks") | food off `s.stores`, toll alone off marks (storm `:588`) | dispatch → storm, inside DESK — built |
| cfd-200:586 | `provisions` | marks ("spent — 4 marks") | food "from the terrace" (storm `:655-657`) | dispatch → storm — built |
| cfd-200:994, :995, :1246, :1247 | `provision` | TRIM's price | `TRIM_MARKS` 2 marks, never a provision (storm `:105`, `:433`, `:589`) | pre-ruling draft → storm — built ×2 |
| cfd-200:609, :604 | `marksLost` | provisions + toll in one figure | toll + trim extra only (storm `:630`); provisions go to `foodLost` (`:629`) | dispatch → storm — built |
| cfd-201:1017, :1386 | `halt` | the pack's "home halt" (`content.js:381`) characterising the counterparty | a DESTINATION route, `sim.js:135`, `baseRisk 0.08, pays 10`; no home id on this board | PWA pack → DESK — **not built** |
| cfd-201:664 | `halt` | "no counterparty is desperate at your own halt" | the same destination route | PWA pack → DESK — not built |

On the two cfd-201 halt rows the refuter ruled NONE: the words are correct against both
the pack and `sim.js:135`, the mechanic is ruled (ANSWERED 2), and the remedy is the
lexicon guard, not a parenthetical. The orchestrator concurs: the seed is upstream (§5),
and a note in the beat would fix the symptom in one file. **The cfd-210-class bridge
(city HOME imported as a desk DESTINATION) did not recur in the five desk beats or in
cfd-205**: `halt` is a destination at all sixteen uses in cfd-196, absent from cfd-183
except as the page title, and forbidden in site's sim by test.

**Untested Kill lines, desk half:** scale 21 of 21 graded; dispatch 46 of 46; storm 60 of
62 (`:909` viewport line graded as CSS; `:895` "refunds — any branch" graded partially);
line all; **cfd-200's 48 Kill lines are graded by nothing** — unbuilt board, no solver.

**Refuted at review — do not re-find:** cfd-200 M14 (`src/main.js:300` is the right
citation); cfd-183 M4's "stricter than signed" (the mark gate is specified by reference to
heat `sim.js:22`); cfd-200 M13's ordinal (fifth Kill bullet, not third); M16's location
(`:739-740`); M11's "no hit in The-Teeth.md" (`:73`, `:134`, `:139` restate it); cfd-201
M1's "every one copy" (three were) and "the fifth sit stopped it"; M7's gap algebra (the
storm bias is −0.10 on both, the gap +0.06); the cfd-203 sweeper's "only cfd-205-halt and
cfd-205 are test-read" (five city beats are too).

**Not swept, desk half:** cfd-200's yard, wave tables and every solver figure (unbuilt);
cfd-196's seven-agent pass, browser measurements and issue references; cfd-201's route
reward baskets (delegated to cfd-196's ÷ 6.5 conversion); the scale board's pass DATE
(no marker in this repo — prefer null); `skyrail-stakes.json` (unreachable from both
repos; every number attributed to it matches `src/content.js:53-56`); Linear-recorded
verbatims.

**Do not average these — desk half:** cfd-183 M4 (sweeper DAVID, refuter NONE; both
agree the beat and the board are consistent); cfd-200 M3 (the sky trace — measurement
uncontested, the right to rewrite a trace design paragraphs rest on is); cfd-200 M8 (Seat
pins — line only, or line and the unpassed storm); cfd-201 M9 (the halt bridge — NONE
stands); cfd-205 M2 "failed sit" (cfd-206:28 says failed; canon `:593` says a finding
routed to the right place — the built text states both); canon §7.4 `:604` vs `:623-635`
("two intent questions" vs the blessed TEND text — an inconsistency inside the canon
file, out of scope, recorded).

### Dispositions — desk half

- **Landed `16ac8e5`** — 43 supersessions in six beats (cfd-183 ×2, 196 ×3, 200 ×16,
  201 ×12, 203 ×7, 205 ×3) plus `docs/mechanisms-recommitted.md:623` and `:694`
  re-pointed `:1352` → `:1379`, because cfd-203's seven edits above that line moved the
  quoted sit-question; the quote was read back at the new line before the commit.
  Measured: 694 / 694 after; site test 50 / 50 (eight beat regexes); zero NUL, zero CR;
  no board byte, no pin. Docs-only, no deploy.
- **Refuter-only edits (13) — landed `5d1fdde`** after a second reader reproduced every
  anchor at both trees and re-drove every behavioural claim from the boards' openings:
  seven landed as written, six amended by the reader (cfd-183:56 the unpaid +4 rung;
  cfd-200:739 the Kill numbers re-derived against the parent; cfd-200:1273 open question
  3 re-based on the storm parent's measured trace; cfd-200:75 the narrower Seat pin;
  cfd-201:809 the "warns" Kill line against recut 1's `carryBill`; cfd-201:1318 a path
  that reaches the storm with 13 marks), none dropped. cfd-203's two edits moved the
  canon-cited quote again, `:1379` → `:1386`; both citations re-pointed in the same
  commit. Suite 694 / 694; zero NUL, zero CR; docs-only.
- **David's calls (10):** cfd-183:62 whether the beat states the mark gate; cfd-196
  whether the three register deviations are accepted as the passed record's register;
  cfd-200:1076-1093 the sky trace and the Engineer argument on it; cfd-200:593/:627 carry,
  narrow or refuse the parent's stop; cfd-201:37 the "canon §7 forbids it by name"
  citation; cfd-205:207 hearth "as scenery" vs lit-with-the-Foundry; cfd-205:208
  greenhouse INHERITED-as-scenery vs REFUSED; cfd-205:268 the R-citation for "Foundry is
  work one"; cfd-205:271 the R10 citation for the bill; and the shipped-bytes pair —
  `sit/dawnspur-scale/MANIFEST.txt:25`'s stale heat pin and `public/index.html:79`'s
  "not yet sat" on a passed board — plus whether stopped-not-passed sits and passes
  belong in `KILLS.md`.

### The city half — cfd-205-halt, 206, 207, 208, 209, 210

Synthesised in a second pass from the same journal (the process defect under *Method*).
The city lineage is the side the sweep was aimed at, and it is where the audit's own
class was found in the design record twice more.

| beat | checked | holds | mismatches | uncheckable | rows | refuter missed | C / P / R | refuter agreed the action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cfd-205-halt | 108 | 97 | 9 | 2 | 10 | 4 | 3 / 6 / 1 | 8 of 10 |
| cfd-206 | 96 | 89 | 6 | 1 | 6 | 1 | 5 / 1 / 0 | 6 of 6 |
| cfd-207 | 104 | 96 | 7 | 1 | 8 | 4 | 6 / 2 / 0 | 7 of 8 |
| cfd-208 | 119 | 105 | 12 | 2 | 12 | 3 | 10 / 2 / 0 | 11 of 12 |
| cfd-209 | 54 | 44 | 7 | 3 | 7 | 1 | 6 / 1 / 0 | 7 of 7 |
| cfd-210 | 150 | 129 | 15 | 6 | 15 | 5 | 13 / 2 / 0 | 15 of 15 |
| **total** | **631** | **560** | **56** | **15** | **58** | **18** | **43 / 14 / 1** | **54 of 58** |

Categories over the 58 rows: STALE 16 · INCONSISTENT 12 · UNTESTED_KILL 11 · WRONG 8 ·
BRIDGE 5 · UNCITED 3 · UNCHECKABLE 3. Severity: HIGH 2 · MEDIUM 13 · LOW 43. Action
(refuter): SUPERSEDE 24 · DAVID 3 · NONE 31. The five PARTIALs on cfd-205-halt's Kill
rows are "line refs off, substance holds". Six tests regex-read these beats — **112
regexes in all**, every one graded on a preview copy of each edited file and again on
the tree after landing: 112 / 112.

**The finding that ranks first is the cfd-210 defect, one beat upstream, in a PASSED
beat.** `docs/cfd-209-beat.md:396` pre-registered a null in which the player "sends once
from the free Halt and stops". The free Halt is the line board's route
(`sit/dawnspur-line/sim.js:88-91`, `id: "dawnspur-halt"`, provisions 0, toll 0); on the
dice board the Halt is HOME — `sim.js:111` requires `consistAt === "halt"` to send at
all, and `notice("halt")` never lights (BFS to depth 10 by both readers: 20 states, the
Halt's `canDo` null in every one). The cfd-209 refuter traced the phrase through the
draft (`c118025`), the signature (`173e468`) and the PASS commit (`12ccd3d`); cfd-210's
withdrawn fork at `fdf0744:34-35` ("a free 68 for 10") is the same route one beat
downstream. **The `9618352` defect had an upstream, and it sat in a passed beat.** The
null did not fire in the sit (the PASSED header records a failed run met), so the
correction changes how the next reader reads the null, not the pass.

- **HIGH** `cfd-210:299-300` — the governing Sequencing text still priced the press-on at
  "a 68% shot at 10 more"; the board rolls Mosswake at 64 for 14 (`sim.js:74-75`,
  `:116-118`; driven at the arm: "ROLL HER OUT. 64."). `git show 6abe720:docs/cfd-210-beat.md:226`
  carries the identical sentence, so it survived `9618352` (which moved the fork) and
  `90488ff` (which swept five canon lines). The board is clean (`test:425` forbids
  `/68|pays: 10|dawnspur/` in the sim); only the beat was stale. Built.
- **MEDIUM** `cfd-210:585-586` — "Whether two EV-equal branches are enough
  differentiation. 6.80 against 6.96 … Null 3" was the withdrawn fork's arithmetic,
  byte-identical since the signature, contradicted by the beat's own §7.3 row forty lines
  earlier. Built, dated to the signature.
- **MEDIUM** `cfd-210:263-267` — "`/dawnspur-line/` is not marked PASSED in the Seat
  table … the route could not have been inherited": the pass is recorded at
  `cfd-201:92`, `cfd-203:1527` and canon §7.1 item 4, and the beat's own `:243` says
  "the passed line board". The blank Seat cell was the stale thing, inherited from
  `cfd-209:104` — and the `9618352` memo reasoned from that blank to "could not have been
  inherited" (refuted here; the name collision was always the whole reason). Built; both
  Seat tables now mark the two desk passes with their derivations (host `3588bb4` →
  `18b1324f`; host `663d4fa` → `576ce2b6`, the pins, unchanged).
- **MEDIUM** `cfd-210:519` — "## Three pre-registered nulls" over a four-item list whose
  own `:545` says "All four"; `9618352` added the fourth and left the heading. Built,
  with the half-mechanism note at `:31` (rule B's cold ending *and* the arm clear split
  the pressed-on outcome).
- **MEDIUM** `cfd-210:550` cites canon §7.5 as its rule; **canon §7.5 `:708-720` cites
  the beat as its worked example, and the two register different splits** — canon's
  three-null table vs the beat's four; canon's row 1 is the opposite of the beat's
  `:531-535`. Timing measured: `6a55533` (canon 7.5) 12:43:57, `6abe720` 12:46:28,
  `9618352` (four nulls) 14:14:34; canon untouched since. Built as a canon edit and
  **held for David** — §7.5 is RULED and rows 1–2 are his words.
- **MEDIUM** `cfd-210:228-229` — "compared on their exported names and found to share
  exactly three — marks, stopped, wait": re-measured nine (`Object.getOwnPropertyNames`
  over `createBoard()` — `armed canSend commitSend endSentence marks record runSentence
  stopped wait`; the two SEND names with different arities are in the set the check
  reported absent). Built in the append form: the historical sentence stays, the
  re-measurement follows. This is the same instrument error the headline block above
  corrects.
- **MEDIUM** `cfd-208:144-243` — cut 0 governed a top-down reader for 180 lines before
  the only supersession marker, which pointed backwards; `:159` "Collect lives here — the
  kept Supply is at the Halt" describes the cut-0 sim (`164bd741`), while the shipped sim
  (`a3345903`) blocks the Halt and puts the only verb at Mosswake. A forward pointer now
  heads cut 0 and `:159` is dated to the cut it describes. Built.
- **MEDIUM** `cfd-209:262`, `:284` — "Arm-then-trigger, inherited from CFD-208's ruling 5
  shape": cfd-208 has no numbered rulings; ruling 5 is CFD-201's ("topping the terrace
  arms the ending, a storm cargo triggers it"), shipped and passed on CFD-203 and cited
  by canon §7.2. Built.
- **MEDIUM** `cfd-209:238-241` — "provisions and toll as already shipped" names two
  passed boards in two currencies (line: food; dispatch: marks); this board is marks-only
  with no second stock, so §7.3's unrankable pair cannot exist here. The refuter reads it
  LOW, a clarification — nothing at `:238` is false against the shipped board — and
  accepts it as bridge-removal. Built.
- **MEDIUM, David's** `cfd-205-halt:33-34` — "Draft. Do not merge … David sits first."
  on a board merged at `66b5507` and recorded PASSED by five later Seat tables, **with no
  primary record** — no pass commit, no verbatim in either repo, no `KILLS.md` line;
  first mention `f797300`, 2 h 24 m after the merge. The refuter shows the identical
  discharged gate at `cfd-206:34`, `cfd-207:43`, `cfd-208:50`, all for PASSED boards: the
  corpus convention is that a beat keeps its pre-sit gate and the NEXT beat's Seat
  carries status. Not built; a convention decision across four beats.
- **MEDIUM, David's** — `cfd-206` carries no Canon check section and zero R-rule
  citations on a beat signed five days after §6.1 landed; none of cfd-205-halt, 206, 207,
  208 has one (209 and 210 carry "Canon this sitting"). Whether §6.1 applies
  retroactively is a record decision, not a measurement.
- **MEDIUM, David's** — `KILLS.md` carries nothing for the five city passes (halt
  `66b5507`, mosswake `510a392`, herbs `6e606e5`, they-remember `a525218`, dice
  `12ccd3d`), the they-remember cut-0 kill (`7bcc315`, "I collected herbs." Not a pass),
  the site failure (`c59dc101`) or the storm stop; verbatims are Linear-only. And
  `public/index.html` tags five PASSED boards "live — new sitting, not yet sat" (`:37`,
  `:43`, `:49`, `:55`, `:61`) while the three older rows read "passed its sit" — shipped,
  player-facing bytes in a contended file.
- **LOW**, built where agreed: `cfd-205-halt:113` (a "Blocked:" line that was only ever
  a CSS comment, in all three cuts); `cfd-206:223` ("Rim / gap is a constant" pairs halt's
  `RIM` with this board's `GAP` — built without halt's numbers, which the refuter refused
  as the sweep's own defect class); `cfd-208:497` ("All eight" over a list of seven) and
  `:390` ("the only recut-to-pass", true at `3c22c9a` and false since `a525218` the same
  day); `cfd-209:209` ("Heat not Air" under R1; it is R9) and `:212` (a Beat 8 "title" the
  script does not contain); `cfd-210:63` (Seat "Beat only. Do not implement." after the
  board landed), `:188` (`:161` → `:158`), `:312`/`:587` ("largest board" → largest
  *city* board; storm, line and dispatch are larger by line count), `:334` ("four words"
  for six).

**Bridges confirmed in the city half** (every cross-model token use; the material rows —
six more sit inside cfd-210's `:192-272` provenance record, where the withdrawn fork is
kept and disowned three times, and are record only):

| beat:line | token | the beat's meaning | the governed board | class |
| --- | --- | --- | --- | --- |
| cfd-209:396 | `halt` ("the free Halt") | DESK — a destination sent to for free (`dawnspur-line/sim.js:88-91`; 68 for 10) | CITY — HOME: `consistAt === "halt"` is the precondition to send (`:111`); `notice("halt")` never lights | **desk → city, past a signature and a pass; the CFD-210 class one beat upstream. Note appended.** |
| cfd-210:299 | the route's numbers ("68% shot at 10 more") | DESK — the `dawnspur-halt` route's chance and pay | Mosswake at 64 for 14 (`:74-75`, `:116-118`) | desk route numbers in city governing text; survived two re-cuts and a sweep. Built. |
| cfd-210:585 | "6.80 against 6.96", "EV-equal", "Null 3" | the withdrawn Halt-vs-Mosswake fork's marks arithmetic | bank (+1 and the ending) vs press (64 % of +14 / 36 % cold) — different currencies, §7.3 | desk fork arithmetic in governing text since `fdf0744`. Built. |
| cfd-209:238, :239, :282 | `provisions` ("as already shipped"), "a pair that differs in both stocks" | ambiguous — food off `s.stores` (line) or marks (dispatch); the join's two-stock frame | MARKS — `stakeOf()` off `s.marks`; `stores` undefined; one stock | the audit's #1 in the design record, resolved by the implementer to dispatch's unit. Built as clarification. |
| cfd-206:223 · cfd-207:251 · cfd-208:278 | `rim` ("Rim / gap is a constant") | halt's token for the frozen geometry (`RIM {78,18}`) | no `rim` here; the object is `GAP {42,16}`; `postNotice("rim")` false | a cross-board alias inside CITY (halt is CITY by declared membership), one template line in three beats and three test titles. **206 built; 207/208 held — see do not average.** |
| cfd-205-halt:209, :139, :274 | "Opening float of 3 — INHERITED as the SITE price — CFD-196 Amendment 1" | the dispatch board's minted float | `SITE_PRICE 3 = OPENING_MARKS 3` — the same meaning, David-chosen | the one number that crosses the seam by the same route with **no meaning shift**; not the class. NONE. |

Two anti-bridges, named so nobody re-finds them: `cfd-206:112` "No Halt route as a send
target" and `:210` "a Halt-route send" name the DESK meaning in order to refuse it — the
shape cfd-210 lacked. `:210` is graded by arity only (`test:469-470`), and the desk-shaped
call `commitSend("dawnspur-halt")` still returns `true` on that PASSED board and sends
to Mosswake (§1.2); a guard asserting `false` would be red against pinned bytes.

**Untested Kill lines, city half:** halt 30 of 35 (the five ungraded are sit-reads,
"louder" copy, a lecture shape, "Mara VO", and "New sibling"); mosswake 15 of 16 and
herbs 14 of 16 (process gates — merge, deploy, `workflow_dispatch` — that no test grades;
herbs-larder's red-first is unverifiable from the record: board, tests and beat landed in
one commit); they-remember **not measured** (two Kill lists, neither reader counted
them; the test *implements* the lines rather than transcribing them); dice 16 of 16;
two-ways 27 of 27.

**Refuted at review — do not re-find:** `cfd-205-halt:286` "David sits first. Ask: What
happened." as stale — it is the sit-protocol closer of every beat in `docs/`, PASSED
boards included; every cfd-205-halt Kill-row line reference (substance holds, lines were
off); "nothing enumerates `sit/` or `public/`" (`boards-index.test.js:78-80` does); the
cfd-206 draft that wrote halt's `78 / 18` into the mosswake beat; cfd-207 M1 as a BRIDGE
(no lineage crossed, no number rides on the word); "the 'eight' is cfd-209's count"
(`3c22c9a` precedes cfd-209's first commit; the origin of "eight" is null); the two
inverted readings of `9a305653` — **settled by measurement**: it is the sha256 of the
weekend-worldbuilding Master Design Bible `.md` (`9a3056535902c677…`), git blob
`a9f0abf4`; no beat or MANIFEST says which kind of hash it is; the brief's "storm
`canSend` arity 2" (storm's `canSend(routeId)` is arity 1; only `commitSend` is 2).

**Not swept, city half:** Linear is unreachable — David's verbatims for the halt,
mosswake and herbs passes, the C10 "Herbs placed" beyond one commit body, cfd-210's "C5"
label; the live host was not fetched; they-remember's two Kill lists were not counted;
`cfd-210:455`'s "the storm stopped, it did not pass" is UNCHECKABLE until `KILLS.md`
carries the storm; `cfd-210:168` "stake 0, all three inherited unmoved" (the parent's
stake is 2 — 0 is this board's waiver; David's signed "No new numbers" wording, mirrored
in `sim.js:28`); provenance against the PWA resolved as cited with the exceptions built
above (the Core Loop file exists only under `weekend-worldbuilding-2026-06-29/source/`).

**Do not average these — city half:** cfd-205-halt's discharged gate (sweeper SUPERSEDE,
refuter NONE; a convention across four beats); the `rim` template alias (206's refuter
SUPERSEDE for its file, 207's refuter "all three or none", 208's pair silent — two refuters
opposite on a cross-file question neither was asked; **206 landed on its own refuter's
ruling, 207/208 held**); cfd-208:103 (a dated true statement inside the superseded cut-0
record — NONE stands; the refuter's optional note is refuter-only); cfd-209 M2's kind
(BRIDGE vs clarification — built, droppable); the Seat-table scope (city-scoped by intent
or not — both desk passes marked in both tables, so the two Seats agree); **cfd-209:396
as built vs the PASSED-beat constraint** — the synthesis re-worded the pre-registered null;
the orchestrator refused that form and appended a dated note beneath the sentence kept
verbatim, because a pre-registration is the one sentence a beat must not rewrite after
the sit it pre-registered (canon §7.5's whole point); David may strike the note.

### Dispositions — city half

- **Landed `5ad4c6f`** — 25 supersessions in five beats (cfd-205-halt ×1, 206 ×1, 208 ×4,
  209 ×7 — the null kept verbatim with the note appended — 210 ×12). Every anchor unique
  at the landing tree (one widened pre-emptively: cfd-208's `## Does` is a substring of
  `### Does`). Measured on the tree: the six beat-reading tests 53 / 48 / 49 / 60 / 62 / 77,
  all green; suite 694 / 694; zero NUL, zero CR; no board byte, no pin. Docs-only.
- **Held for David:** the canon §7.5 edit (`mechanisms-recommitted.cfd-210-M4`, built,
  dry-run clean at the landing tree — his rule, his rows); the two conditional `rim`
  edits (cfd-207:251, cfd-208:278).
- **Refuter-only edits (6) — five landed `fecdb0b`, one dropped** after the same second
  reader re-counted every anchor at three trees and graded the three beat-reading tests'
  regexes on previews (39 / 15 / 14, all green): cfd-208:469 (the Favor-meter refusal
  sourced to a "Beat 7 kill list" that does not exist), cfd-209:193 (the stated chance is
  CFD-196's rule, not Bible §5.8's), cfd-210:294 and :307 ("did both and stopped" was set
  in quotation marks as if quoted from a ledger; `KILLS.md:28` reads "Two opening can-dos;
  he stopped"), cfd-210:381 (the page also renders the `canDo` face). Dropped: the optional
  note at cfd-208:419 — a true note on a true, dated line inside the superseded cut-0
  record. Suite 694 / 694; docs-only. **The sweep's edit sets are closed: 86 supersessions
  across eleven beat files and the canon file, every one refuter-agreed or second-read.**
- **David's calls (15), in the synthesis's order:** cfd-205-halt:33-34 the discharged gate
  (leave; status lives in the next Seat); cfd-205-halt:203-206 "inherited" for
  Works/SITE/LAND/CAST that never passed (rename the cell "kept by signature");
  cfd-205-halt:65-66 "Home writing landed. The walk did not." as a sit finding (it is a
  ruling; say so); cfd-207:92 "inherited, not replayed" (note only); cfd-207:75 "tap to
  collect" (stands; cfd-208 records the split); cfd-208:452 "Mosswake is where the light
  is" (bytes govern; figurative); **cfd-209:396 the appended note — confirm it reads as
  his**; cfd-209:104-105 / cfd-210:80-81 the desk PASSED markers (landed in both tables;
  strike both or neither); **canon §7.5's three-null table vs the beat's four — must see
  before it lands**; cfd-210:168 "stake 0" (leave); `KILLS.md`'s five missing passes, two
  missing kills and the storm stop (ledger them, or rule the ledger kills-only);
  `public/index.html:37-61` five PASSED boards tagged "not yet sat" (a hub commit);
  cfd-206:60 "World Bible §12" as canon, ruled LEGACY 33 minutes after the merge and
  regex-pinned (appended parenthetical or leave); no Canon check section on 205-halt,
  206, 207, 208 (retroactive or not); the `rim` alias in 207/208 (206 alone, or all three).

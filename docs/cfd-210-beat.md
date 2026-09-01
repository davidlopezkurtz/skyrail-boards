# CFD-210 — C13 — Two ways from here

The first choice in the game. Sibling `/two-ways-from-here/`. Not a recut of
anything.

## SIGNED — David, 2026-09-01.

His word: *"Sign it."*

**IMPLEMENTATION IS HELD FOR ONE EXCHANGE, and the reason is a measurement David
asked for and got.** He signed with a caveat: *"0.16 apart is a very tight fork,
and the third null is the one I'd expect… The stake asymmetry, free versus two, is
the only real difference and it only bites when you're short. Worth checking the
opening float makes that live rather than academic."*

**Checked. The asymmetry is live, and it makes the designed fork academic anyway.**
Driven against the shipped parent:

```
SHORT  (after a failed run)   marks 1   armed TRUE
         LIVE: mosswake "Collect."
         dark: halt, consist, rustfall
RICH   (after a good run)     marks 15  armed false
         LIVE: mosswake "SEND. 64."
```

**Mosswake costs 2 and the float is 3, so a failed run leaves 1 — Mosswake is
unaffordable exactly when the stake asymmetry would matter.** The Halt-versus-
Mosswake weigh therefore only ever occurs in the RICH regime, where the two are
**0.16 marks apart**. The fork this beat designs is EV-equal by construction at the
only moment it can occur, which is null 3 arrived at on paper.

**And the measurement found a better fork sitting in the short regime.** After a
failure the board arms and offers `Collect.` — the ending. A free send *there* is
**bank what you have, or roll her out once more**: exclusive branches, real stakes,
at the moment the board already treats as decisive.

*(This paragraph first proposed that free send as "the Halt, 68 for 10." A second
measurement refuted it — the Halt is HOME on this board, not a destination. See
"The Halt is NOT a destination on this board" below. The fork survived the
refutation; only its route and its tile changed.)*

**RULED, David, 2026-09-01: the fork MOVES.** *"Bank-or-press-on beside
`Collect.` is the better fork and the measurement makes it not a preference."*

**And he named the reason that matters more than affordability.** *"Bank versus
press-on is exclusive by construction, where Halt-versus-Mosswake in the rich
regime is only exclusive because the board says so. A player with 15 marks can see
no reason not to do both eventually, so the weigh is imposed rather than felt.
Ending the run or risking it for 10 more is a decision the player already knows
they're making."*

That distinction — **exclusive by construction against exclusive by fiat** — is the
one to carry forward. A fork the board merely forbids you from having twice is not
a choice; it is a queue with a gate on it.

**Implementation is released.** The beat below is written to the moved fork.

---

## Seat

Beat only. Do not implement. Do not merge. Do not `workflow_dispatch`.

Do not touch any existing board directory — **nor the `sit/` copy of any board
that has one, nor any other board directory present at HEAD.** The enumeration is
a courtesy; the catch-all is the rule.

**Pins, re-measured at `12ccd3d`:**

| board | sim | index |
| --- | --- | --- |
| `/dice-at-the-places/` **PASSED** | `f64b4309` | `d97d9951` |
| `/they-remember/` **PASSED** | `a3345903` | `acbf4304` |
| `/herbs-larder/` **PASSED** | `76c886b9` | `676587bc` |
| `/mosswake-loop/` **PASSED** | `f5407bca` | `6c30179c` |
| `/dawnspur-halt/` **PASSED** | `6eb957e7` | `b5a56a14` |
| `/dawnspur-site/` | `e9f81b74` | `070a4619` |
| `/dawnspur-storm/` | `f4f17008` | `7711f979` |
| `/dawnspur-line/` | `18b1324f` | `b6f21db0` |
| `/dawnspur-dispatch/` | `576ce2b6` | `31aead60` |

**Parent: `/dice-at-the-places/`** — CFD-209, PASSED 2026-09-01. Named at
signature per §7.1 item 4, not assumed at drafting.

---

## The question this board exists to answer

**Is the single-file corridor load-bearing, or was it incidental to five boards
that passed for other reasons?**

Every board passed since the city started offers **exactly one live can-do in
every reachable state** — measured by enumerating `notice()` at every frame, not
through `liveCanDo()`, which returns first-only. The one board that **failed**
offered two.

| board | max live can-do | outcome |
| --- | --- | --- |
| `/dawnspur-halt/` pre-walk | **2** | **failed** — *"Lit the lamp and started the foundry"*, then stopped |
| `/dawnspur-halt/` the walk | 1 | PASSED |
| `/mosswake-loop/` · `/herbs-larder/` · `/they-remember/` · `/dice-at-the-places/` | 1 | PASSED |

Five boards consistent, one clean counterexample in the same lineage — **but n=1
within-board, and nothing in the repo settles whether those passes were of the
writing or of the corridor.** This board is the instrument.

**`KILLS.md` narrows it, and the narrowing is the whole card.** The failing sit:

> *"'Lit the lamp and started the foundry.' **Two OPENING can-dos; he stopped.**
> Glass, consist-home, CAST-heat never became play."*

**The two lit things were at the OPEN.** What is measured to fail is *opening on
a choice*. **Breaking the corridor later — after the player has committed — has
never been tested.** So the question is not *should it break* but **where can it
break.**

---

## THE ONE NEW SYSTEM: the corridor forks once, after commitment

**One live can-do opens the board, exactly as five passed boards do. When a run
comes home SHORT and the board arms, a second place lights — and the player must
choose between them.**

*(This sentence read "after the first run comes home, a second place lights, and
the order is the player's" until 2026-09-01. That was wrong twice over: it lit the
fork after a PAID run, which this beat's own Kill list forbids, and "the order is
the player's" describes a queue, which is the exact thing David refused. Corrected
rather than left, because the heading sentence is what an implementer reads first.)*

Not two at the open. That is the measured failure and it stays refused by name.

### The fork is BANK OR PRESS ON, and it lives on the CONSIST

**RULED, David, 2026-09-01 — outcome B.** *"Bank and the sitting ends with
something, press on and it might end with nothing."*

**Today:** a run comes home short → the board arms → `Collect.` at Mosswake is the
only thing lit → tapping it ends the sitting.

**This board:** a run comes home short → the board arms → `Collect.` lights at
Mosswake **exactly as it ships**, and **the consist lights too**: *ROLL HER OUT.
64.* — one more Mosswake run, **stake waived.**

| | 64% | 36% |
| --- | --- | --- |
| **Press on** | +14 marks, **the arm clears**, back in the paying loop | **the sitting ENDS COLD** — no `Collect.`, no +1, no remembering |
| **Bank** | `Collect.` — +1 mark, the sitting ends with the neighbour's gift | — |

**A failed press-on ends the sitting with nothing.** That is rule B and it is what
makes this a wager rather than a button with a delay in front of it. David: *"Under
A, pressing on is never wrong and banking is dominated. That's not a fork, it's a
button with a delay in front of it."*

**The fiction carries the rule, and that is why it is not arbitrary.** *"The larder
covered it once and cannot twice"* is a **reason, not a rule** — a player who loses
can say why rather than feeling punished. That sentence must be on the consist tile
**before** the tap, not after.

**Exclusive in the sharpest available currency: the run itself.** Not exclusive
because the board forbids a second helping — exclusive because winning takes the
ending away and losing takes everything.

#### The numbers, and they are Mosswake's

There is **no second route**. The press-on is a Mosswake run with `stakeOf()`
waived: **64 for 14, stake 0**, all three inherited unmoved from the shipped parent.
Nothing is invented, nothing is balanced, no new constant enters the file.

#### Where it lives, and why it cannot live anywhere else

**Measured on the shipped parent — three facts that fix the location:**

1. **`Collect.` renders at MOSSWAKE, not at the Halt.** `notice("mosswake")`,
   `sit/dice-at-the-places/sim.js:170`: `if (s.armed && !s.collected)` returns
   `canDo: "Collect."`
2. **`notice()` returns ONE `canDo` per place.** The Mosswake tile is therefore
   full at the arm. A second can-do must be on a different tile.
3. **The consist tile is empty at the arm** — `sim.js:244` returns `canDo: null`
   with blocked text *"The haul was lost. The larder covered it."*

So the consist is the only tile available, and it is also the **right** one: the
consist is the thing you are wagering. You are not tapping an abstraction; you are
rolling her out again.

**And the corridor holds through the away leg for free.** `notice("mosswake")`
tests `s.consistAt === "mosswake"` **first** (`sim.js:161`), so once she is out
`Collect.` goes dark on its own and only *"Home she comes. 64."* is live. Two lit
at the arm, one lit while she is out, and nothing needed to be added to achieve it.

### Why NOT the Halt beside Mosswake — the fork this beat first proposed

Recorded because it was measured and refused rather than merely reconsidered.

The Halt is a canonical route — `baseRisk 0.08`, pays 10, provisions 0 — which at
roster 0 is **68 against Mosswake's 64**, for 10 against 14, at a stake of 0
against 2. Expected marks **6.80 against 6.96: 0.16 apart.**

**It dies on regime, not on tightness.** Mosswake costs 2 and the opening float is
3, so a failed run leaves 1 and **Mosswake is unaffordable exactly when the stake
asymmetry would bite.** The weigh could therefore only ever occur in the rich
regime, where the two branches are EV-equal — **a null reachable on paper, which
is the cheapest kind to find.**

### The Halt is NOT a destination on this board — the error this beat shipped

**This is the most important thing in the document for the next author, and it
survived a signature.**

Until 2026-09-01 this beat specified the fork as *"the Dawnspur Halt lights as a
free send, 68 for 10."* **It cannot be built.** On `/dice-at-the-places/` the
string `"halt"` is **where the consist lives** — `canSend()` requires
`s.consistAt === "halt"`, meaning she is home — and `notice("halt")` returns
`canDo: null` on **both** of its branches (`sim.js:132`–`:155`). The Halt has
never been tappable. "Send her to the Halt" means sending her where she already is.

**The 68-for-10 numbers are real, and they belong to a different board.**
`sit/dawnspur-line/sim.js:88` defines a route object `id: "dawnspur-halt"`,
`baseRisk 0.08`, `pays 10` — where the Halt is a **destination**. Two boards, one
word, two meanings: **home** in one model, **a place you send to** in the other.

**A route's numbers were imported across a name collision between two lineages.**
The prior instance of this class was the double-modelled consist at the C8→C9 seam.
That makes twice. David, 2026-09-01: *"the name collision finding is the more
valuable half of this message."*

**Why the earlier check did not catch it.** The two models were compared on their
**exported names** and found to share exactly three — `marks`, `stopped`, `wait`.
`"halt"` is not an export. It is a **string value** and a **place id**, so the
instrument could not see it. *The small number was read as reassurance when it was
only the measure of a narrow instrument.*

An audit of the remaining name-spaces is open as a separate piece of work.

### Where the Halt's numbers came from, kept as provenance only

`/dice-at-the-places/` ships **one** route. Mosswake: `baseRisk 0.12`, pays 14,
stake 2. Its stated chance is **64**, measured live.

The Halt is already a place on that board — dark, with a world reason: *"The herbs
are already up. Nothing here is yours to take."* And it is already a **canonical
route** on the passed line board: `dawnspur-halt`, `baseRisk 0.08`, **pays 10,
provisions 0, toll 0.**

Under the board's own `chanceFor(baseRisk, wardens)` at roster 0 — `BASE −
baseRisk` — that is **68**.

| | chance | pays | stake | expected marks |
| --- | --- | --- | --- | --- |
| **Dawnspur Halt** | 68 | 10 | **0** | **6.80** |
| **Mosswake Loop** | 64 | 14 | 2 | **6.96** |

**This table is PROVENANCE, not the fork, and neither row is what this board
builds.** It is kept because both numbers were measured and one of them was acted
on wrongly, and the next author needs to see what was refused.

**The Mosswake row is the live one.** The press-on is a Mosswake run with the stake
waived — **64 for 14, stake 0** — so the only number this board uses is one the
shipped parent already rolls.

**The Dawnspur Halt row is dead here.** Its numbers are real but they belong to
`sit/dawnspur-line/sim.js:88`, where the Halt is a destination. `/dawnspur-line/`
is **not marked PASSED** in the Seat table above — an earlier draft of this beat
called it "the passed line board," which is a second unverified claim in the same
sentence as the first. Under §7 an unpassed system does not travel, so the route
could not have been inherited even if the word had meant the same thing.

**§7.2's quick path is BANKING**, and it is honest by construction: `Collect.`
alone is the whole of C12's ending, available the instant the board arms, and a
player who never presses on has a complete sitting.

### Why the Halt and not Rustfall

Rustfall is on the board and dark — *"Raiders hold the yard road."* It is the
obvious second route and **it is refused here by name.** CFD-200 owns it: *"C5 —
the contested tier: **Rustfall takes a send, and placement decides it, not
dice**."* Lighting Rustfall as a dice-send would build the thing that card exists
to build, and would have to be undone when it lands. It stays dark, as Beat 8
dressing, exactly as it arrives.

---

## THE SEQUENCING ARGUMENT, settled — this was the beat author's first job

When this card was named, the open question was whether to build it **on C12** or
to isolate choice on a **small passed board**, which would be cheaper. The naming
recorded that argument as unresolved and owed here.

**It builds on C12, and the reason is not §7 compliance — it is that the small
board would guarantee the null.**

On a board without dice, two lit things are **two taps**. Taking both costs
nothing, so a player takes both — which is precisely the pre-walk Halt result,
*"did both and stopped."* A small board would reproduce that failure by
construction and teach nothing about choice.

**The fork only becomes a decision because pressing on can lose you something.**
Banking takes the ending you have earned; pressing on is a 68% shot at 10 more
that, *if it succeeds*, puts the ending back out of reach. **That cost exists only
because the board has dice and an arm condition** — without them, a second lit
thing is just a second tap and the player takes both. C12 is the only board that
has them.

**This is what the small-board version could never have had**, and it is the
argument's whole point: on a board without dice there is nothing to wager, so
"did both and stopped" is guaranteed by construction.

So: cumulative, parent `/dice-at-the-places/`, per §7 and §7.1.4 — and for a
reason that would hold even if §7 permitted otherwise.

**The cost is honestly stated:** C12 was the largest board the project has
attempted, and this is C12 plus a branch. If the implementation runs much longer
than the boards before it, **that is information and it should be reported rather
than pushed through.**

---

## Canon this sitting

Bible sha `9a305653`. File + section where reached; do not invent.

**Bible §5.8 Contracts. Supply.** Two contracts, each with its own stated chance.
Both are Supply already kept; neither is a new dispatch.

**Core Loop, What the loop pays out** — *"it earns Favor by helping neighbors and
keeping promises."* Both branches are promises. Neither is the wrong one to keep.

**R6 — stakes live in the run and the in-progress, never the secured home.** A
failed run on either branch costs the haul committed and never the home, the
lamp, the larder, or Favor already earned.

**R2 / R3 / R4** — no upkeep, no decay, nothing moves with wall time. The
unchosen branch does not rot, expire, or become unavailable through waiting. **A
timer on a fork would be a decay clock wearing a decision's clothes.**

**§7.2** — the quick path must exist and be honest. The Halt is it: free, safer,
lower-paying, and never a trap.

**§7.3** — publish the columns, never a synthesised total. The two branches differ
in chance, pay and stake; **the beat's own EV table is a marks-only reading and
must be presented as such.**

---

## Does

**The board opens exactly as `/dice-at-the-places/` does.** One live can-do, at
Mosswake. The Halt dark with its world reason, the consist dark, Rustfall dark.
This is inherited whole and unchanged, and a player who has sat C12 should not be
able to tell the difference at the open.

**The fork lights when the board arms — that is, when a run comes home short.**
Until then the board is C12 exactly: one live can-do, no choice, and a player who
has sat C12 cannot tell the difference.

**At the arm there are two live can-dos and never more.** `Collect.` at Mosswake
exactly as it ships, and **the consist**: *ROLL HER OUT. 64.* — a free Mosswake
run. The player picks.

**The press-on's cost must be on the tile before the tap.** *The larder covered it
once. It will not cover it twice.* A player who taps it without knowing what a
failure does has not made a choice, and that is a Kill line rather than a polish
note.

**A paid press-on clears the arm.** +14 marks, `Collect.` goes out of reach, and
the board returns to its single-file paying loop until the next short run.

**A FAILED press-on ends the sitting cold.** No `Collect.`, no +1 mark, no
remembering. This is the whole wager and it is the one place C12's machinery moves.

**The ending text must distinguish the two ways a sitting can end**, and it cannot
do so through `endSentence`. **Measured: `index.html` never reads it** — grep
count of `endSentence`, `runSentence`, `inProcess` and `stopped` in
`sit/dice-at-the-places/index.html` is **0** for each. The page renders
`notice().writing` and `notice().blocked` and nothing else. **Every word this
board needs a player to see goes in those two fields**, or it is dead text.

**Each branch is its own wager.** The stated number is the rolled number, per the
dispatch board's own rule — *"not quote a number it cannot honestly roll."*

**The stop still requires a failed run.** Inherited from C12 — the board cannot arm
without one, so the corridor routes every player through the wager. This board adds
a second way to reach the stop and removes none.

**No third route.** No Rustfall. No weather. No new currency. No crews.

---

## Sees

Station-town diorama, not a beige HUD. Two lit places is the most the screen ever
shows. One 440px column, no scroll, no camera.

**The unchosen branch must remain legible as a thing you could still do** — not
greyed, not dimmed to scenery. This is the single most likely visual failure: a
fork rendered as one bright option and one dead one is not a fork.

---

## Ends

**NOT inherited unchanged, and this is the one place the beat moves C12's
machinery.** C12 arms on a failed run and `canCollect()` requires `armed`. This
board keeps both **and adds a clear**: a press-on that comes home paid sets
`armed` false again.

So the arm is no longer a one-way latch. State the full condition explicitly:

| event | arm | stop | why |
| --- | --- | --- | --- |
| run comes home short | **set** | no | C12, unchanged |
| `Collect.` tapped while armed | — | **STOP, banked** | C12, unchanged |
| press-on comes home paid | **cleared** | no | the closing line is no longer true; back in the loop |
| press-on comes home short | — | **STOP, COLD** | rule B — the larder cannot cover twice |

**There are now TWO endings and they must not share a sentence.** C12's
`endSentence` getter hardcodes *"The run came home short and the larder covered
it."* — true of a banked ending, **false of a cold one**. And it is never rendered
anyway (see Does). The two endings are distinguished in
`notice().writing`/`blocked` or they are not distinguished at all.

**Termination is probabilistic and always was** — C12 cannot end without a failed
run either. This board does not weaken it: under B, pressing on is **also** a way
to reach an ending, so a presser terminates *faster*, not slower.

**Confirm by driving the board** that a player who presses on every time reaches an
ending, that a player who banks every time reaches an ending, and that the two
endings read differently on screen.

---

## On this sitting

| System | This sitting | From |
| --- | --- | --- |
| **The corridor forks once, after commitment** | **ON** — the one new system | new |
| **The consist lights as a free Mosswake run AT THE ARM** | **ON** — the fork's second branch | Mosswake's own numbers, stake waived |
| **A paid press-on clears the arm** | **ON** — the ending goes out of reach | new |
| **A failed press-on ends the sitting cold** | **ON** — rule B; what makes it a wager | new |
| **The Halt as a send** | **REFUSED** — it is HOME on this board, not a destination | measured 2026-09-01 |
| A tap at a place can fail | **INHERITED** | CFD-209, PASSED |
| One live can-do at the open | **INHERITED** — and it stays one | CFD-205, PASSED |
| The desk deleted as a surface | **INHERITED** | CFD-209 |
| The stop requires a failed run | **INHERITED** | CFD-209 |
| Rustfall dark | **INHERITED** — Beat 8 dressing | CFD-203 |
| **Two lit at the OPEN** | **REFUSED** — the measured failure | CFD-205 kill |
| **Rustfall as a send** | **REFUSED** — CFD-200 owns it, by name | CFD-200 |
| Weather | **REFUSED** — the storm stopped, it did not pass | §7 |
| A third route, crews, a Favor number, a new currency | **REFUSED** | inherited kills |

---

## Kill

Every line a test. Red-first.

- **More than one live can-do at the OPEN**, or at any frame before the first run
  comes home. Enumerate `notice()` across every place at every frame; do not grade
  through a first-match helper.
- **More than two live can-dos at any frame, ever.**
- The fork lights before the board arms — at the open, or after a run that came
  home paid.
- The fork never lights: a sitting exists in which the board arms and the consist
  stays dark.
- `Collect.` moves off Mosswake, or changes its text, or stops ending the sitting.
  **C12's banked ending is inherited whole; touching it is a recut, not this board.**
- A paid press-on does not clear the arm.
- **A failed press-on does not end the sitting**, or ends it with `Collect.` still
  reachable, or credits the +1 mark.
- The two endings — banked and cold — render the same words.
- The press-on's cost is not on the consist tile **before** the tap.
- A press-on costs marks. It is free; `stakeOf()` is waived, not paid.
- Either branch quotes a number it does not roll, or the press-on's chance differs
  from Mosswake's own 64.
- **The Halt becomes tappable.** It is home on this board. Kill line, by name.
- `liveCanDo()` is used to grade the corridor. It returns the FIRST match
  (`sim.js:369`) and cannot see a second live can-do at all.
- A failed run costs the home, the lamp, the larder, or Favor already earned.
- The stop becomes unreachable for a player who only ever takes one branch.
- A state field is left `undefined` rather than initialised. `make()` aliases the
  state literal with no defaulting, so `undefined !== null` is **true** and a
  forgotten field lights the fork at the open.
- The unchosen branch is rendered grey, dimmed to scenery, or as a dead button.
- Anything moves with wall time; a branch expires, decays, or times out.
- Rustfall becomes sendable. Weather appears. A third route appears.
- A Favor meter, bar, number or tooltip. Mara VO. `?`. Tutorial mode.
- A food-to-marks exchange rate or any single-number netting of two stocks.
- Grey squares, scenery-divs, the beige PWA palette, a fourth file in the board
  directory.
- **Any pin moves.** Nine boards, listed in the Seat, re-verified at signature.
- `sit/` and `public/` copies differ.

---

## Wanted after one sit

**A sit that names a choice and why he made it.** Not which button he pressed —
what he weighed. Something in the register of the passed sits:

> *"I took the free run first because it cost nothing."*
> *"I stopped there — I'd have had to earn the ending again."*

The sitting has landed if the fork produced **a reason**, and the reason is his
rather than the board's.

**The second of those two is the one to hope for** and it is the finding this
lineage has reached for twice: it names the branch he did not take. Per §7.5 and
the sit-question rule below, **it counts only if it arrives unprompted.**

---

## Three pre-registered nulls, and each routes somewhere different

**None of these is a failure. Each is an answer, and they do not mean the same
thing.**

**David pre-registered the first two himself, 2026-09-01, before the sit, and the
wording is his** — a sitting that ends cold and a sitting that ends banked are
**not distinguishable in any completion count**, which is §7.5's whole point.

1. **Ended cold after pressing on.** *"That's the branch working, and the sit
   question is whether the player can name the trade without being asked."*
   Routes to: the fork is live — go to what the next fork should be.
2. **Banked immediately, never pressed.** *"Ambiguous between 'the wager was
   correctly frightening' and 'the press-on wasn't legible as an option.' Those
   route differently, and the tell is whether the consist tile read as a thing you
   could do."* **The tell is legibility, not the count** — so the sit must recover
   whether he SAW the consist as tappable.
3. **Pressed on, won, and kept playing.** The arm cleared and the sitting continued.
   Reachable at 64% and it needs a meaning: the wager was taken and paid, but the
   ending it risked was never actually spent, so the sit shows the fork FIRING
   without showing what it COSTS. Routes to whether one sitting can even answer
   this, or whether the cold branch has to be met to count.
4. **Did it once and cannot say why.** A coin-flip dressed as a choice. Routes to
   **differentiation** — 64-for-14 against banking is not a weigh he can
   articulate, and the next question is what would make it one.

**Note what none of these is: a completion count.** All four log as "the sitting
ended." Per §7.5, if a split can be resolved by a counter it was not worth
registering — and this one cannot be.

**None of these is a failure and they do not mean the same thing.** Pre-registering
the split is what stops a single observed outcome being rationalised into whichever
story is nearest — canon **§7.5**.

---

## What the sit must report

David sits first. **Ask: What happened.**

Per canon §7.4: **ask what he did, and whether he can name what it bought. Never
ask what he was trying to do** — refused on this project with its evidence
recorded.

**One thing to listen for — and DO NOT ASK FOR IT.** David's correction,
2026-09-01: *"Asking 'what didn't you do' produces an answer whether or not the
option was ever live, same failure mode as the intent question §7.4 refuses. Ask
what happened, and count it only if the unchosen branch appears on its own."*

So: **ask what happened. Nothing else.** His C12 sit opened on capability —
*"I could send Mosswake runs, which I did"* — where the four city passes before it
opened on the act. A fork is where *could* and *did* come apart, and if the
unchosen branch appears **unprompted**, that is the finding this lineage has twice
reached for and never had.

**If it has to be asked for, it does not count.** A prompted answer here is
indistinguishable from a manufactured one, which is the exact defect that makes
the intent question refused.

---

## What is not measured

- **Whether the corridor is load-bearing.** That is what this card is for.
- **Whether a mid-sitting fork behaves like an opening fork.** The two have never
  been separated; that separation is the card's whole design.
- **Whether two EV-equal branches are enough differentiation.** 6.80 against 6.96
  is a marks-only reading. Null 3 exists because the honest answer may be no.
- **The cost of building it.** C12 was the largest board attempted and this is
  C12 plus a branch. No base rate. Report it if it runs long.
- **Whether the answer generalises past Dawnspur.**

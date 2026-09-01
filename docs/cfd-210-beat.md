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
failure the board arms and offers `Collect.` — the ending. A free Halt send there
is **bank what you have, or take a free 68 for 10 more**: exclusive branches, real
stakes, and it exists precisely at the moment the board already treats as decisive.

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

**One live can-do opens the board, exactly as five passed boards do. After the
first run comes home, a second place lights, and the order is the player's.**

Not two at the open. That is the measured failure and it stays refused by name.

### The fork is BANK OR PRESS ON, and the mechanic is already half-built

**Measured on the shipped parent, and it is why this location works:**
`canSend()` returns false `if (s.armed)`. **Arming currently removes the send.**
That is what forces the short regime to a single option and it is the exact line
this board relaxes.

**Today:** a run comes home short → the board arms → `Collect.` is the only thing
lit → the sitting ends.

**This board:** a run comes home short → the board arms → **`Collect.` lights AND
the Halt lights, free.** Bank the ending you have earned, or take one more run at
**68 for 10** first.

**And pressing on risks the ending itself.** A successful press-on **clears the
arm**, because the board's own closing sentence is *"the run came home short and
the larder covered it"* — and if your last run came home paid, that sentence is no
longer true. So you are back in the rich loop and must come home short again to
earn an ending.

That is what makes it a wager rather than free upside:

| | you keep | you risk |
| --- | --- | --- |
| **Bank** | the ending, now, with what you have | the 10 you did not go for |
| **Press on** | a 68% shot at 10 more | the ending — a win puts it back out of reach |

**Exclusive by construction**, not by the board forbidding a second helping. You
cannot both bank this ending and go for the run, because winning the run is what
takes the ending away.

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

### Why the Halt is the second send, and where its numbers come from

*(This heading and the next were transposed in the first draft — this section is
about the Halt, the next is about Rustfall. Corrected rather than left to confuse
the implementer.)*

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

**Nothing new is invented for this board.** Both rows are inherited numbers from
passed boards, which is why the fork costs no balancing work.

**The table is here as provenance, not as the fork** — those two are 0.16 apart
and the section below records why that is fatal. **The Halt's row is what matters:
free, and 68 for 10.** That is what a press-on costs and pays.

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

**At the arm there are two live can-dos and never more.** `Collect.` as it ships
today, and the Halt as a free send with its chance and pay on its face before the
tap. The player picks.

**A successful press-on clears the arm.** The ending goes back out of reach and the
board returns to its single-file loop until the next short run. **A failed
press-on costs nothing** — the Halt stakes 0 — and the arm survives, so `Collect.`
is still there. That asymmetry is the whole wager and it must be legible before
the tap, not discovered after it.

**Each branch is its own wager.** The stated number is the rolled number, per the
dispatch board's own rule — *"not quote a number it cannot honestly roll."* A
failed run on either costs its stake and nothing else.

**The stop is unchanged and still requires a failed run.** Inherited from C12,
where the board cannot arm without one — the corridor routes through the wager,
and that survives the fork.

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

| event | arm | why |
| --- | --- | --- |
| run comes home short | **set** | C12, unchanged |
| press-on comes home paid | **cleared** | new — the closing line is no longer true |
| press-on comes home short | **stays set** | the ending is still there; the wager cost nothing |

**Termination is probabilistic and always was** — C12 cannot end without a failed
run either. This board does not weaken that; it lets a player *choose* to defer it.
**Confirm by driving the board that a player who presses on repeatedly still
reaches an ending**, and that the ending's text still reads true when they do.

---

## On this sitting

| System | This sitting | From |
| --- | --- | --- |
| **The corridor forks once, after commitment** | **ON** — the one new system | new |
| **The Halt lights as a free send AT THE ARM** | **ON** — the fork's second branch | CFD-196 route, inherited numbers |
| **A paid press-on clears the arm** | **ON** — what makes it a wager | new |
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
- The fork never lights: a sitting exists in which the board arms and the Halt
  stays dark.
- A successful press-on does not clear the arm, or a failed one does.
- `Collect.` becomes unreachable after a failed press-on.
- The press-on's cost — that winning takes the ending away — is not legible before
  the tap.
- Either branch quotes a number it does not roll.
- The Halt's chance or pay differ from its canonical route values without the beat
  saying why.
- A failed run costs the home, the lamp, the larder, or Favor already earned.
- The stop becomes unreachable for a player who only ever takes one branch.
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

1. **He banks immediately, every time, without remarking on it.** The press-on
   was never a live option to him. That says the corridor is load-bearing
   **wherever** it breaks, C12's shape becomes permanent, and the question closes.
2. **He presses on and never mentions the ending he passed up.** The fork is real
   but only one branch is visible as a branch. That routes to *what makes a
   forgone option legible*, not to a recut of this board.
3. **He does it once and cannot say why.** The decision happened but had no
   content — a coin-flip dressed as a choice. That routes to **differentiation**:
   68-for-10 against banking is not a weigh he can articulate, and the next
   question is what would make it one.

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

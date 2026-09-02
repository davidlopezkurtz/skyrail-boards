# CFD-209 — C12 — The dice come to the places

The first board where the city and the loop are one object. Sibling
`/dice-at-the-places/`. Not a recut of anything.

## PASSED — David, 2026-09-01. (Signed 2026-08-31.)

**The sit, verbatim:**

> *"I could send Mosswake runs, which I did, then the run came home short and the
> larder covered it."*

**Pass.** He named the act and what it bought — canon §7.4's question form
answered without being asked it — and the sentence is the beat's own *Wanted*
almost word for word.

**The acceptance condition was met in play, not just in test.** He hit a failed
run. The board cannot arm without one, so the corridor routed him *through* the
wager rather than around it — which is what this beat asked for and what a green
Kill list alone could not have shown.

**`/dice-at-the-places/` is a PASSED board and does not get overwritten.** Bytes
pinned at index `d97d9951` / sim `f64b4309`, self-pinned in
`test/dice-at-the-places.test.js` on the day it passed and mutation-verified
(616/1, naming the path).

**The city and the loop are one object.** Two lineages that shared exactly three
exported names now share a board.

**One observation carried forward, not a finding.** The sit opens on capability —
*"I could send Mosswake runs"* — where the four city passes open on the act
itself. n=1, and the second half of the sentence is the act and the payoff
exactly as wanted. It is recorded because *available* versus *done* is the
distinction this lineage has twice turned on, and **CFD-210 is the card that can
actually test it.**

---

## SIGNED — David, 2026-08-31.

His word: *"signed"*.

**Cursor implements. Superheavy reviews the PR. Superheavy does not implement and
does not merge. The orchestrator lands. David sits first after live.**

### What the signature covers, so the implementer does not infer scope

**Covered:** the one new system — a tap at a place can fail — the corridor at max
live can-do = 1, the desk deleted as a surface, and everything in the Kill list.

**NOT covered:** a second live can-do anywhere, weather in any form, a second new
system of any kind, a new currency, or any pin moving. **If the implementation
needs one of those, it stops and says so rather than proceeding.**

### The acceptance condition, because the Kill list can pass while the board fails

**The player must meet a run that does not work.** If a sitting can be walked
end to end without ever losing a haul, the dice did not arrive and the board has
failed whatever the tests say. The corridor must route *through* the wager, not
around it.

### Two things to fix rather than inherit

1. **`s.marks = MUSEUM_MARKS` is an assignment.** See the defect section below.
   This board opens with the desk's float; write it as an increment.
2. **Four boards each set `stopped`.** Only one may survive, and it must be the
   armed one. State the stop's condition explicitly; do not inherit the accident
   described under *Ends*.

### Where the work actually is

**The seams, not the verbs.** One map, not `rim` and `gap`. One consist, not
`inbound`/`landed` beside `consistAt`. One representation of *home but not
stowed*. Those three are the C8→C10 mismatches measured below and they are the
bulk of the job.

---

## Seat

**SIGNED 2026-08-31 — this line was "Beat only. Do not implement" before the
signature and is corrected here, because the Seat is the first thing an
implementer reads.** Cursor implements on a branch. Superheavy reviews the PR.
**Superheavy does not implement and does not merge.** The orchestrator lands.
Do not `workflow_dispatch`. Do not deploy by hand — CI deploys a green main.

Do not touch `public/dawnspur`, `public/dawnspur-heat`, `public/dawnspur-scale`,
`public/dawnspur-dispatch`, `public/dawnspur-line`, `public/dawnspur-storm`,
`public/dawnspur-site`, `public/dawnspur-halt`, `public/mosswake-loop`,
`public/herbs-larder`, `public/they-remember`, `public/convoy-stop` — **nor the
`sit/` copy of any board that has one, nor any other board directory present at
HEAD.** The enumeration is a courtesy; the catch-all is the rule.

**Pins, re-measured at `a525218`, `git show HEAD:sit/<b>/sim.js | sha256sum`:**

| board | sim | index |
| --- | --- | --- |
| `/they-remember/` **PASSED** | `a3345903` | `acbf4304` |
| `/herbs-larder/` **PASSED** | `76c886b9` | `676587bc` |
| `/mosswake-loop/` **PASSED** | `f5407bca` | `6c30179c` |
| `/dawnspur-halt/` **PASSED** | `6eb957e7` | `b5a56a14` |
| `/dawnspur-site/` | `e9f81b74` | `070a4619` |
| `/dawnspur-storm/` | `f4f17008` | `7711f979` |
| `/dawnspur-line/` **PASSED** | `18b1324f` | `b6f21db0` |
| `/dawnspur-dispatch/` **PASSED** | `576ce2b6` | `31aead60` |

*(Earlier cuts of this table marked only the four city passes. `/dawnspur-line/`
PASSED 2026-08-28 at host `3588bb4` — `docs/cfd-203-beat.md:1511`, `:1549` — and
`/dawnspur-dispatch/` PASSED 2026-08-26 at host `663d4fa` —
`docs/cfd-196-beat.md:835-838`; `git show <host>:sit/<b>/sim.js | sha256sum` gives
`18b1324f` and `576ce2b6`, the pins above, unchanged at HEAD. The rows this beat
inherits from them under §7 require those passes.)*

All eight stand. **Parent: `/they-remember/`** — CFD-208, PASSED 2026-08-31.
Named at signature per §7.1 item 4, not assumed at drafting.

---

## Why this board, in David's own sequence

2026-08-29, stopping `/dawnspur-storm/` after five recuts and no pass:

> *"Mechanically it all worked nicely… It's definitely time for the city. I think
> we have a good loop buildout and need the spine to attach it to."*

The city was built to give the loop a spine. It now exists, with four consecutive
passes: C8 halt, C9 mosswake, C10 herbs-larder, C11 they-remember.

**This is the attachment.** David, 2026-08-31, ruling the reading:

> *"'The spine now exists' was an argument for the storm having context, not for
> the storm being the next board. Attach the loop first, then the storm has a
> place to happen."*

---

## THE ONE NEW SYSTEM: a tap at a place can fail

**The mechanism, plainly. On every passed city board, tapping a lit thing
works.** Light it, SITE, CAST, Come home, SEND, Home she comes, Put them up,
Collect — eight taps across four boards, and **all eight always succeed.** On the
desk boards a send is a wager: a stated percent, honest dice, a run that can turn
back and pay nothing.

Those are two different objects wearing one town. Measured: `they-remember` and
`dawnspur-line` share **exactly three exported names** — `marks`, `stopped`,
`wait`. The place model is `places / notice / postNotice / commitPosted`; the desk
model is `cards / canSend / commitSend / commitMeet`. Nothing else is shared.

**The join is not a state merge. It is those two objects becoming one.** The desk
is deleted as a surface. You tap Mosswake, **the tap is the send**, and the run
can come home empty.

That is §7.1's **swap, not stack**: the connection replaces the desk rather than
sitting beside it.

**What is new is the dice arriving at a place — not "SEND from a place."** SEND at
a place with no desk already passed on C9 (`mosswake-loop` ships
`consist:send "SEND."`). Proposing that as the new system would be zero new
systems wearing new nouns.

---

## THE CORRIDOR IS KEPT, AND IT IS A DESIGN POSITION

**Max live can-do = 1, in every reachable state. This is not a caution. It is the
shape of the board.** David, 2026-08-31:

> *"Opening on three lit places and choosing is not one new system, it's two. The
> desk-into-place merge is the swap §7.1 asks for. Adding simultaneous choice on
> top of it means a failed sit can't be attributed, which is the exact bind that
> held CFD-201's signature. If the join fails at three lit, you won't know whether
> the merge failed or the corridor did."*

The evidence, measured by enumerating `notice()` across every place at every frame
rather than through `liveCanDo()`, which returns first-only:

| board | max live can-do | outcome |
| --- | --- | --- |
| `/dawnspur-halt/` pre-walk | **2** | **failed** — *"Lit the lamp and started the foundry"*, then stopped |
| `/dawnspur-halt/` the walk | **1** | **PASSED** — all four acts |
| `/mosswake-loop/` | **1** | PASSED |
| `/herbs-larder/` | **1** | PASSED |
| `/they-remember/` | **1** | PASSED |

Four boards consistent, one clean counterexample in the same lineage.

**So the decision on this board is never "which place."** It is what the world
answers when you tap the one live thing. The corridor walks you; the dice decide.

**Whether the corridor should ever break is its own card**, ruled by David and
deferred by name. It is not this sitting and must not be smuggled in.

---

## Canon this sitting

Bible sha `9a305653`. File + section where reached; do not invent.

**Bible §5.8 Contracts. Supply.** A send is a Supply contract; §5.8 names the
contract types and says nothing about chance — the stated chance is the dispatch
board's own rule, *"not quote a number it cannot honestly roll"*
(`dawnspur-dispatch/sim.js:12`, CFD-196, PASSED). This board takes that to the place
rather than to a desk. *(An earlier cut read "A send is a contract with a stated
chance" under the §5.8 citation; the chance is CFD-196's, not the bible's.)*

**Core Loop, What the loop pays out** (`Skyrail-Reclamation-The-Core-Loop.md`):
*"it earns Favor by helping neighbors and keeping promises."* A promise that can be
broken is what makes keeping it worth anything — this is the first board on which
the promise can fail.

**R6 — stakes live in the run and the in-progress, never the secured home.** A
failed run costs the haul committed and never the home or the record. This board's
failure mode is fail-forward by construction; the larder, the lamp and the Favor
already earned are never the stake.

**R2 / R3 / R4** — no upkeep, no decay, nothing moves with wall time. A failed run
costs what was committed to it and nothing accrues afterwards.

**R1** — heat is the master resource, marks are money, never the same sink. **R9**
— Heat not Air. *(An earlier cut filed "Heat not Air" under R1; it is R9, directive
1.19.)*

**Tutorial Beat 8 — "A taste of the frontier (gentle)"
(`Skyrail-Reclamation-Tutorial-Script-Dawnspur-Halt.md`:193) — Rustfall stays dark.**
Beat 8's player action is *"None required"* *(an earlier cut quoted "Rustfall stays
dark" as the beat's title; that is this lineage's gloss — the script names Rustfall
Yard only at :240, after the tutorial)*, so it is not a sitting and never will be.
`dawnspur-line/sim.js:112` carries Rustfall as `chartered: true, sendable: false`,
*"Raiders hold the yard road."* That is Mara's *"people who'd rather take a railcar
than fill one"* rendered as a route that refuses. **It arrives here inherited, as
dressing, costing none of this sitting's one new system.** Sera Cairn and crews stay
parked behind CFD-200/CFD-201.

---

## Does

**One live can-do at a time, always.** The corridor from `/dawnspur-halt/`'s
passing recut, inherited whole. Places that are not live post a notice with a world
reason — blocked or in-process — and remain readable. Not grey squares. Not
scenery-divs.

**The tap at a place carries a stated chance, on its face, before the tap.** One
instrument: the number shown is the number rolled. Honest dice, per the dispatch
board's own rule — *"not quote a number it cannot honestly roll."*

**The run can come home empty.** On a failure the haul committed is lost, the place
says so in its own writing, and the corridor continues. **No re-roll, no refund, no
consolation.** The sitting does not end on a failure — the world keeps going, which
is R6's fail-forward read.

**The stakes are the route's own**, inherited: provisions 2 and toll 0, paid in
marks — the dispatch board's denomination (CFD-196), not food off the terrace
(CFD-203's join, refused below). No new currency, and no second stock: there is no
food here to exchange, so no food-to-marks rate can exist. *(An earlier cut read
"provisions and toll as already shipped" and cited canon §7.3's unrankable pair;
"as shipped" names two boards that debit provisions from different stocks —
`s.stores` on the line, `s.marks` on dispatch — and §7.3's property needs two
stocks where this board carries marks only.)*

**Marks**: the opening float is the desk's, not the museum's zero. **See the defect
note below — this board must not inherit `they-remember`'s marks assignment.**

**No weather.** The storm **stopped**; it did not pass. Under §7 a system travels
only if it passed a sit, so weather is not inheritable here and importing it would
be a second new system.

---

## Sees

Station-town diorama, not a beige HUD. The places are the screen; there is no desk,
no card list, no ladder, no strip of pads. The live place carries its can-do and its
chance. One 440px column, no scroll, no camera.

---

## Ends

Arm-then-trigger, inherited from CFD-201's ruling 5 shape — *"topping the terrace
arms the ending, a storm cargo triggers it"* — as shipped and passed on the line
board (CFD-203) and cited by canon §7.2. *(An earlier cut attributed the ruling to
CFD-208; `/they-remember/`'s stop is a single act, `commitCollect` → `stopped`, and
its beat carries no ruling 5.)*
trap the author must not walk into:** on the line board
`if (r.chartered && topped()) s.stopped = true` is the only stop, and
`cloud-basin-span` is the **only** route that is both `chartered` and `sendable` —
Rustfall is chartered and unsendable. So the stop currently hangs on one route, and
that route is EV-dominated. **Do not "fix" that on the EV table**; state the stop's
condition explicitly on this board rather than inheriting an accident.

---

## On this sitting

| System | This sitting | From |
| --- | --- | --- |
| **A tap at a place can fail — the dice come to the places** | **ON** — the one new system | new |
| **The desk deleted as a surface** | **ON** — the swap, not a stack | §7.1 |
| Max live can-do = 1, every reachable state | **INHERITED** — the corridor, and a design position | CFD-205 halt, PASSED |
| notice / blocked / writing grammar | **INHERITED** | all four passes |
| The four acts as finished state | **INHERITED, not replayed** | C8–C11 |
| Favor as booleans, no meter | **INHERITED** | CFD-208 |
| Routes: pays, provisions, toll, honest chance | **INHERITED** | CFD-196 / CFD-203 |
| Rustfall dark — Beat 8 dressing | **INHERITED** | CFD-203 |
| Arm-then-trigger stop | **INHERITED**, stated explicitly here | CFD-201 ruling 5 / CFD-203, via §7.2 *(was "CFD-208")* |
| Weather | **REFUSED** — the storm stopped, it did not pass; importing it is a second new system | §7 |
| Simultaneous lit places | **REFUSED** — its own card, ruled by David 2026-08-31 | §7 |
| A Favor meter, bar, number or new currency | **REFUSED** | Beat 7 kill list |
| Provisions off the terrace | **REFUSED** — CFD-203's passed system; zero new systems wearing new nouns | CFD-203 |
| Crews, Sera, the frontier as play | **REFUSED** — parked behind CFD-200/201 | Beat 8 |

---

## Kill

Every line a test. Red-first.

- **More than one live can-do in any reachable state.** Enumerate `notice()` across
  every place at every frame; do not grade through a first-match helper.
- A tap at a live place cannot fail, or fails without the chance being stated on its
  face before the tap.
- The number shown and the number rolled differ.
- A failed run refunds, re-rolls, offers a consolation, or ends the sitting.
- A failed run costs the home, the lamp, the larder, or Favor already earned.
- The desk survives: `id="cards"`, `id="ladder"`, `THE DESK`, or a strip of pads
  away from the places.
- Weather appears in any form.
- Two or more places are live at once, in any state, for any reason.
- A Favor meter, bar, number, percentage or tooltip. Any lecture. Mara VO. `?`.
  Tutorial mode. A help overlay.
- A food-to-marks exchange rate, a shadow price, or any single-number netting of
  two stocks.
- Anything moves with wall time. `wait()` returns anything but false.
- Grey squares. Scenery-divs. The beige PWA palette.
- Reading or writing another board's persisted state.
- A fourth file in the board directory.
- **Any pin moves** — the eight in the Seat, re-verified at signature.
- `sit/` and `public/` copies differ.

---

## A defect this board must not inherit

`sit/they-remember/sim.js:132` is `s.marks = MUSEUM_MARKS;` — an **assignment**,
not an increment. Measured:

```
open=0 -> 1   (correct today)
open=3 -> 1   (should be 4)
open=7 -> 1   (should be 8)
```

It is invisible because every place board opens at 0 marks. **This board opens with
the desk's float, so the assignment would silently destroy marks while passing every
test.** `/they-remember/` is a PASSED board and its bytes do not move; the fix
belongs here, in this board's own code, as an increment.

**Also:** four boards each set `stopped`. Only one may survive on a joined board,
and it must be the armed one.

---

## The seams, measured — this is the actual work

Driven end-to-end at `a525218`, each board's getters snapped at its `stopped` and
diffed against the successor's boot.

**C8 → C9 is the expensive seam** — 6 match / 3 mismatch / 11 dropped / 10 added.
Two are structural rather than bookkeeping:

- **The map is modelled twice.** `rim {left:78,width:18}` on C8 against
  `gap {left:42,width:16}` on C9–C11. Never co-present, never reconciled. **One
  map.**
- **The consist is modelled twice.** C8 uses `inbound`/`landed` with verb `land`
  ("Come home."); C9–C11 use the `consistAt` string with verb `home` ("Home she
  comes."). Same act, two field sets, two verbs, different preconditions. **One
  consist.**

**C9 → C10 carries one true value contradiction.** `herbsOnConsist: false → true`.
C9 ends by renaming the fact and emptying the consist; C10 needs the haul back on
the consist to have anything to put up. **Pick one representation of *home but not
stowed*.**

**C10 → C11 is clean** — only `posted`/`stopped` reset.

---

## Wanted after one sit

**A sit that names a run that did not work, and what carried it.** The register of
*"The herbs went home."* Something in the shape of:

> *"The run came home short and the larder covered it."*

The sitting has landed if he names the failure as part of the world rather than as
a fault, and can say what absorbed it.

---

## Fail

He never meets a failed run — the corridor walked him past the dice. Two places lit
at once. A refund or a re-roll. A run that fails and ends the sitting. The desk
surviving in any form. A stated chance that is not the rolled chance. Weather. A
Favor number. Mara VO, `?`, tutorial mode. Grey squares.

---

## What the sit must report

David sits first. **Ask: What happened.**

Per canon §7.4: **ask what he did, and whether he can name what it bought. Never
ask what he was trying to do** — that form is refused on this project with its
evidence recorded.

**Pre-registered null:** if he sends once from the free Halt and stops, the places
are still scenery and the desk was doing the work all along. **That is a finding,
not a failure**, and it routes to a smaller board rather than a recut.

*(Recorded 2026-09-01, after the sit, and the sentence above is left as it was pre-registered: "the free Halt" is the line board's route — `dawnspur-halt`, provisions 0, toll 0, on `/dawnspur-line/` — and on this board the Halt is HOME: `canSend()` requires `consistAt === "halt"` and `notice("halt")` never lights, so the null as written describes a send the board cannot make. The only send here is Mosswake, at a stake of two; read the null as "sends Mosswake once, brings her home, and stops". The sit met a failed run, so the null did not fire. This is the name collision the cfd-210 re-cut found one beat downstream, recorded here at its upstream.)*

**If it fails, §7.4 binds:** the next recut may not be the same KIND as the one that
failed, and if the only remaining move is another writing recut, the finding goes to
a new beat.

---

## What is not measured

- **Whether this passes.** A sitting, not an arithmetic.
- **Whether the four passes were passes of the writing or of the corridor.**
  Max-live-can-do is 1 in every reachable state of every passed city board and 2 in
  the one that failed, but that is n=1 within-board. This board holds the corridor
  fixed precisely so the question stays answerable later, on its own card.
- **Whether a joined board fits the shipped constraints** — one 440px column,
  `overflow: hidden`, no scroll, no camera. `dawnspur-line/sim.js` is 549 lines
  against the place boards' 227–335; **this is the largest board the project has
  attempted and there is no base rate for its cost.**
- **The EV ordering above roster 1.** Not re-derived here and not signed.
- **Whether a fresh sibling carrying weather over the city is forbidden.** The pins
  forbid recutting `/dawnspur-storm/`; they do not obviously forbid a new board.
  Unresolved, and not this sitting either way.

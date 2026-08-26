# CFD-200 — the Rustfall sitting (the contested tier)

The multi-loop architecture's third loop, and the promise `/dawnspur-dispatch/`
makes on its own face and cannot keep. The RUSTFALL YARD card is live right
now, dark, refusing a send, and saying so in the board's words:

> "Raiders hold the yard road. This one is not the desk's dice; it waits for
> the convoy defense."

This beat is the game that card is waiting for. Drafted under
`docs/mechanisms-recommitted.md` §6's canon-check discipline, from David's
2026-08-26 dice ruling and his 2026-08-26 seam. Card: CFD-200.

**NOT SIGNED.** Awaiting PM citation review, then David.

---

## The finding that changes the brief

The commission says the tuned combat engine "cannot be ported as-is" because
`advanceCombatIncident(state, incidentId, deltaMs, commands)` is time-driven.
**Measured, that is half true, and the wrong half is the load-bearing one.**

Three facts, from the source:

1. **Nothing in the shipped game ever advances an incident on wall time.**
   `src/tick.js` runs `ticker.tick(state, now)` every 1000 ms; that path calls
   `advanceTime`, which advances dispatches, production and training and calls
   `releaseUnattendedCombatIncident` — and **never** touches
   `incident.tacticalTimeMs`. The only writer is a human pressing a button:
   `src/main.js:1103` renders `data-action="advance-incident" data-ms="20000"`,
   handled at `src/main.js:300`. The incident already moves once per press.

2. **`deltaMs` is a scalar, not a clock.** Inside `advanceCombatIncident` it
   becomes `seconds = tickMs / 1000` and appears as a leading multiplier on
   exactly five expressions (`damage`, `clearRate`, `captureRate`,
   `repairRate`, `drain`) plus one accumulator (`tacticalTimeMs` against
   `scenario.durationMs`). It gates no command, arms no cooldown, and drives
   no enemy: **there is no enemy AI, no spawn schedule and no wave** in that
   engine. Hostiles are a static composition contributing one scalar,
   `getRemainingHostilePressure`, whose health only ever falls.

3. **The turn shape is already in the signature and is passed by nobody.**
   `advanceCombatIncident(state, incidentId, deltaMs, commands)` applies
   `commands` *before* the tick resolves — orders, then resolution. Every
   caller in the repository omits it and it defaults to `[]`.

So the clock is a **unit label on a turn that already exists**, and the shipped
step is 20000 ms against a 180000 ms budget: **nine presses**. The engine is
not a real-time simulation that must be rebuilt turn-driven. It is a
turn-driven engine wearing millisecond units.

**That is not a licence to port it.** Three parts of it are genuinely
convicted and this beat refuses all three by name: the `health` / `maxHealth`
fields on every group (canon refuses health bars, §Canon check), the wall-clock
stand-down trigger (R4), and `tacticalTimeMs` as a budget the player can run
out. What transfers is the arithmetic that never had a clock in it — the
order multiplier, the coverage ratios, the objective structure, and the
outcome grading.

**The commission's premise that a replacement had to be invented is refused.
What the beat replaces is the unit.**

---

## Seat

Beat only. No implement. No deploy. No merge. Do not touch `public/dawnspur`,
`public/dawnspur-heat`, `public/dawnspur-scale`, `public/dawnspur-dispatch`,
or `public/convoy-stop`. Do not `workflow_dispatch`.

**Pins are the live boards, never `main`.** CFD-196 pinned "boards main at
`1aea540`" and it was stale before signature; the thing the Kill line protects
is the shipped bytes. Re-measured at authoring, `git show HEAD:public/<p>/sim.js
| sha256sum`, at boards `83b2ac1`:

| board | sim sha256 (first 8) |
| --- | --- |
| `/dawnspur-dispatch/` | `576ce2b6` |
| `/dawnspur-scale/` | `953368a1` |
| `/dawnspur-heat/` | `292d6645` |
| `/dawnspur/` (the preserved kill) | `395c18f2` |
| `/convoy-stop/` | `5ad814e6` |

All five stand. `/dawnspur-dispatch/` **PASSED** its sit 2026-08-26 and is now
a passed board: it does not get overwritten.

**The new board lands at `/dawnspur-rustfall/`.** Argued, because two other
names were available and both are worse:

- It is still Dawnspur's board. The desk is the same Switchyard desk, the
  multi-loop architecture is loops on one town, and the sibling that this
  board's whole existence answers is `/dawnspur-dispatch/`. Keeping the town's
  name keeps the lineage readable in the index.
- **Not `/convoy-defense/`.** The Convoy Stop lineage contributes its
  *grammar* here, exactly as CFD-196 promised, and its grammar is not its
  name. Taking the name would imply this is a recut of `/convoy-stop/`, which
  it is not: that board is preserved, real, and untouched.
- **Not `/dawnspur-dispatch-2/`.** The sitting is not a second dispatch
  sitting. The dispatch loop is carried unchanged; the system being sat is the
  yard.

**The board carries the whole dispatch desk, and that is not a second system.**
David's seam requires it: assets assigned to a send become the assets in the
instance, so the send and the instance must be on one board. And the tier only
means anything against its alternative — "roll the dice at Cloud Basin, or go
and play Rustfall" is the ruling's EXCEPT clause rendered, and with the dice
routes removed the exception has nothing to be an exception to. Everything
carried from `/dawnspur-dispatch/` is carried **unchanged and Kill-listed as
unchanged**. One system is added: the yard.

David sits first. Ask: What happened.

---

## Does

The desk opens exactly as `/dawnspur-dispatch/` closed. Three routes take a
send and roll honest dice at stated odds. The fourth now takes a send and
rolls nothing.

### At the desk — carried, unchanged

- **DAWNSPUR HALT** (0.08, pays 10, stakes 0), **MOSSWAKE LOOP** (0.12, pays
  14, stakes 2), **CLOUD BASIN SPAN** (0.25, pays 18, stakes 3+1). Odds
  through `chanceFor(baseRisk, guard)`, one instrument, the percent stated
  before the click. The charter condition holds: a Chartered Line send needs a
  cargo banked first. The halt is free and always lit, so no reachable state
  deadlocks.
- **The opening float is 3 marks**, roster 0, train home. Unchanged.
- **SEND commits, MEET resolves.** The stake is spent at the click and
  refunds in no direction. Nothing sours: a run met in a week is the run met
  in a breath.
- **Nothing moves with wall time, anywhere, in any state.** `wait()` stands,
  takes nothing, and returns false.

### The muster grows by exactly two crew types

The passed board ships Wardens only and refuses the other three **by name**,
"each named to the instrument it waits for." This is that instrument, and it
takes the two David's seam names and leaves the third.

| Crew | Marks | From the pack | What it is on the yard |
| --- | --- | --- | --- |
| **Rail Warden** | 3 | `power.guard` 3 · "Durable guards … Protect cargo and absorb danger on convoy runs." | **Stands on a car. Turns every raider that comes at that car.** |
| **Gunner** | 5 | `power.fire` 4 · "Ranged support … Defend railcars and punish exposed raiders." | **Stands on a car. Turns one raider per push, at that car or either neighbour.** |
| **Sapper** | 6 | `power.repair` 4 · "Combat engineers … Repair tracks, disarm traps, and stabilize damaged spans." | **Stands on no car. Throws a switch and lays a siding — one reroute, one hold, per push.** |
| Ranger | *(2)* | `power.scout` 3 · "Reveal ambushes …" | **REFUSED this sitting.** Nothing on this board is hidden, so there is nothing to reveal. Its price is recorded so the sitting that hides something does not re-derive it. |

The roster still caps at **4 total**, still never leaves, still refunds
nothing, and **the whole roster still rides every send**. That last law is
what makes the seam real rather than declared: the crew you paid for at the
desk is the crew standing on the cars.

### RUSTFALL YARD takes a send, and quotes no odds

It stakes **3 provisions and the Chartered toll of 1** — 4 marks, spent at
the click like any other. It needs the charter, like any other Chartered Line
route. And where the other three cards carry a percentage, this one carries
its manifest and its waves, because there is no percentage to state: **by
David's ruling this route's outcome is not a dice question, and this board
throws no die on it, ever.**

### The yard — the one new system

MEET on Rustfall does not roll. It opens the yard.

**The Sunlark is standing in the yard under the ore cranes, loading salvage,
and the Tollmen are working their way in along the yard road.** Every push
loads one more car and brings one more wave. Nothing else moves anything.

**The load is three cars, and they load heaviest first:**

| Push | Car loads | Worth |
| --- | --- | --- |
| 1 | the ore car | **14** |
| 2 | the parts car | **7** |
| 3 | the strongbox | **2** |

**The waves are fixed, named, and stated before you place.** No RNG touches
the yard.

| Push | Who | Shape |
| --- | --- | --- |
| 1 | **Raider Scouts** | one, at the ore car |
| 2 | **Boarders** | two, both at the richest car aboard — *concentration* |
| 3 | **Scrap Gunners** | three, one at each car aboard — *dispersion* |

**A push is three beats, in this order, and the middle one is the whole
game:**

1. **The board says where the wave will land**, before a finger moves. Which
   car, and how many. No hidden state, no fog, no surprise.
2. **You place.** Every crew member is re-assigned freely: a Warden or a
   Gunner onto any car, the Sapper's switch and siding onto any car. Nothing
   persists from the last push.
3. **You press PUSH.** The car loads, the wave arrives, and it resolves
   against what you placed. Then the board says what happened, in words.

**Resolution, in full — there is no other rule:**

- A raider at a car with a **Warden** on it is turned. A Warden turns every
  raider at its own car and no raider anywhere else.
- A raider at a car within a **Gunner's** reach — its own car or either
  neighbour — is turned, **one per push per Gunner**.
- The **Sapper's switch** moves one raider from the car it is on to an
  adjacent car, before anything resolves. The **Sapper's siding** holds one
  raider where it stands for one push; it arrives on the next push instead,
  and a raider held through the last push never arrives at all.
- **A raider nobody turned takes its car.** The car and its worth are gone
  from the train. That car only.

That is the whole instrument. **Wardens beat concentration, Gunners beat
dispersion, and the Sapper changes which one you are facing.** No health, no
damage, no hit points, no rolls, no timers, no reflex. Placement decides it,
which is what David ruled it would be.

### PULL OUT, and why it is the point

After every push, two verbs are lit: **PUSH** and **PULL OUT**.

PULL OUT ends the run immediately and brings home whatever is still on the
train. It is always lit, it always works, it never costs anything beyond the
stake already spent, and it is never the wrong answer — it is a *price*, not
a penalty.

The curve it prices, at a clean run:

| You pull out after | You bank | Against a wave of |
| --- | --- | --- |
| push 1 | **14** | 1 raider survived |
| push 2 | **21** | 2 more |
| push 3 (the run ends there) | **23** | 3 more |

Rising risk against shrinking gain: the ore is most of the yard and the
strongbox is a rounding error. **The push-or-retreat call is the sitting's
core decision, and it is a real one at every step**, which is why the cars
load heaviest first — see The numbers.

### What comes home

- **Full run.** All three pushed, nothing taken: the desk banks 23.
- **Partial.** Pulled out loaded, or ran through and lost cars: the desk
  banks what survived.
- **Empty.** Everything taken, or pulled out before anything survived: the
  route pays zero, the stake is spent and comes back in no direction, **the
  crew and the train are home**, and the desk stands.

**The crew and the train always come home. Every branch, every sitting.** No
crew is ever hurt, lost or spent, and the Sunlark is never lost. The home is
never touched.

---

## Sees

The desk exactly as it stands today: the marks line, the muster bar in the
grey card stack above the routes, the route cards. The muster bar now takes a
**type as well as a count** — its arrangement is the implementer's business
under this spec, but Amendment 2's law holds: it is a peer of the routes, on
the card ground, in the stack, and it wears its own price at full contrast
whether or not it can be paid. The HUD keeps its one line: marks.

The Rustfall card is no longer dark and no longer alone. It is a route card
like the others with **one difference the player can see**: where the other
three carry a percentage, it carries its own sentence about why it does not.
No odds are quoted on it in any state. It states its stake and its manifest,
like any card.

**The yard fits one screen and does not scroll.** Three cars in a column, the
crew standing on them, the yard road running in. The wave to come is drawn on
the cars it will hit — a count on a car, before you place — and that mark is
the entire threat forecast, the same job `/convoy-stop/`'s lit tick marks do
today. Size and count carry the information; nothing is a bar and nothing
fills.

The crew read by where they stand, not by a stat block. A Gunner's reach is
drawn as reach. The Sapper's switch and siding sit on the cars they act on.
A car that has been taken is a gap in the train and stays a gap.

**Two verbs are lit under the yard: PUSH and PULL OUT.** Both always, until
the run ends. Nothing else is a control.

**Nothing on this board animates, eases, transitions, or changes on any
schedule but a player's own press.** No `setTimeout`, no `setInterval`, no
`requestAnimationFrame`, no `performance.now`, no `transition`, no
`@keyframes`. `/convoy-stop/` carries a `requestAnimationFrame` loop, a
`.car` transition and a `lingerPulse` keyframe animation. **This board
inherits that lineage's grammar and refuses its clock**, which is a deliberate
break and is recorded as one.

The town behind the desk stands as scenery and the board may name it in
words, per Amendment 1's ruling 2. It reads and writes no other board's state.

---

## Ends

Every push ends in a sentence and so does the run and so does the sitting, in
the board's words.

**A push held, the shape of it:**
> *"The Scouts came at the ore car and the Warden turned them. The parts car
> is on. Two cars aboard, worth 21."*

**A push that cost a car, the shape of it:**
> *"The Boarders came at the ore car two abreast and only one was answered.
> The ore is off the train and on the yard road. One car aboard, worth 7."*

**Pulled out loaded, the shape of it:**
> *"The crew pulled the Sunlark off the yard road with the ore aboard. The
> desk banks 14. What is still on the cranes stays on the cranes; the
> Wardens and the train are home, and the desk stands."*

**Home empty, the shape of it** — carrying all four clauses CFD-196 requires
of a run that paid nothing:
> *"Rustfall kept everything it had. The provisions and the Chartered toll
> are spent — 4 marks — and nothing comes back; the route paid nothing; the
> Wardens, the Sapper and the train are home, and the desk stands."*

The empty sentence names whoever actually rode, exactly as the passed board
learned to: a run with no crew aboard promises no crew home.

**The stop is the first Rustfall run off the yard road**, loaded or empty.
The system this sitting exists to sit has then been played once, end to end,
and David has an answer to *what happened* either way. A turned-back dice run
is not an ending, a banked Cloud Basin cargo is not an ending, and bare marks
is not an ending — for the same reason as before: the floor send is free and
always lit.

At the stop the board reads its own ledger, in two registers keyed the way
the passed board learned to key them — on whether anything was lost, not on
what it cost:

- **Clean:** *"The Sunlark is off Rustfall with the whole yard aboard. Four
  runs out, four cargoes banked, three cars off the cranes and not one taken.
  The dormant crane at the far end is the next sitting's."*
- **Paid:** *"The Sunlark is off Rustfall. Six runs out, four cargoes banked,
  two turned back, one car taken on the yard road and 8 marks staked and lost
  along the way. The record keeps what came home; the dormant crane at the
  far end is the next sitting's."*

The terminal must read the record — runs out, cargoes banked, runs turned
back, cars off the cranes, cars taken, marks lost — and the paid register
names the losses without apology and without warning.

---

## On this sitting

| System | This sitting |
| --- | --- |
| The dispatch desk, the three dice routes, honest dice at stated odds | **ON, carried unchanged** — no number moves, no rule moves |
| The opening float 3, the charter condition, the muster bar, the roster's laws | **ON, carried unchanged** |
| Rustfall takes a send | **ON** — the ruling's EXCEPT clause, delivered; the promise on the live card, kept |
| Rustfall quotes odds | **REFUSED** — its outcome is not a dice question; the desk states no number it cannot honestly roll |
| Any die thrown inside the yard | **REFUSED** — placement decides it; `roll()` is never called on the yard road |
| The yard: place, push, resolve | **ON** — the one new system; the turn is a player's press and nothing else |
| PULL OUT at any push | **ON** — the push-or-retreat call, and the conflict layer's clean concede |
| The load as three cars, 14 / 7 / 2 | **ON** — derived leg by leg from the route's own basket |
| Cars taken individually, never the train | **ON** — the gradient; a bad push costs a car, not the run |
| Gunners (5) and Sappers (6) join the muster | **ON** — David's seam by name: the marksman and the engineer |
| Rangers | **REFUSED** — nothing on this board is hidden; a reveal with nothing to reveal is a dead control |
| Health, hit points, damage, any bar that fills or empties | **REFUSED** — a raider is turned or it is not; canon refuses health bars beside the building game |
| Wall time, in any form, anywhere | **REFUSED** — no clock, no rAF, no transition, no animation; the yard holds its position across any gap |
| The engine's `tacticalTimeMs` budget and its 9-press ceiling | **REFUSED** — a budget the player runs out is a clock with the units filed off; the run ends when the player ends it |
| `standDownCombatIncident`'s **scoring** | **ON, in substance** — it scores through the same result builder and invents no outcome; that is what PULL OUT does |
| `standDownCombatIncident`'s **trigger** | **REFUSED** — 180 seconds of real idle is a decay clock; the player's hand replaces it |
| The `cargoIntegrity` gradient (what survived comes home) | **ON** — a distinct leg from the consolation, see The numbers |
| The engine's `rewardMultiplier × 0.25` failure leg | **REFUSED** — CFD-145; a run that comes home empty pays zero |
| Insurance | **REFUSED** — recovered stakes are not payouts; the naked stake teaches first |
| Heroes and `HERO_COMBAT_ABILITIES` | **REFUSED** — the Hero Lodge sitting owns them |
| Missions beyond convoy, including `raid` | **REFUSED** — the mission is getting the load home, not striking a camp |
| Postures, route events, safety accrual, train damage | **REFUSED, unchanged** — every one of them zero by its refusal |
| The Tollmen's toll, paid in cargo (jettison / cut a car loose) | **REFUSED, named** — canon-backed and deliberately held back; see Author's argued alternatives |
| The dormant Standfast crane at Rustfall | **REFUSED, named** — the yard's other half; its own sitting |
| Goods as nouns | **ON at the manifest only, flagged** — cars are named for what they carry and priced in marks; there is one currency |
| Crew hurt, lost, spent, or left behind | **REFUSED** — the crew always comes home, both branches, the engine's own law |
| The train lost (canon's fourth rung) | **REFUSED, named** — the stakes dial defaults gentle; the rung is real and this is not its sitting |
| Signal tower / discovery, contract mechanics, a second currency, the storm at the town | **REFUSED, unchanged** |
| Reading or writing another board's state | **REFUSED, unchanged** — the standing lineage lock |
| End-sentences, per push, per run, and terminal | **ON** — `/convoy-stop/` prints no sentence at all; this board departs from that deliberately |

---

## Kill

Every line expressible as a test.

**The clock, and the lineage's convicted class**

- Anything on the board moves, changes, eases or resolves on any schedule but
  a player's own press. `setTimeout`, `setInterval`, `requestAnimationFrame`,
  `performance.now`, `Date.now` in the sim, `transition`, `animation` or
  `@keyframes` appears anywhere in the shipped board.
- `deltaMs`, `durationSeconds`, `durationMs`, `tacticalTimeMs`, `baseSeconds`
  or `seconds` is imported, stored, or computed as elapsed time.
- The yard's state depends in any way on when the player returns to it. Two
  identical sequences of presses, one taken in a breath and one across a
  week, produce different state.
- A run, a push, or a wave resolves without a press.
- Any push budget, wave ceiling, or run limit ends a run that the player did
  not end. PULL OUT is dark in any state where the run is live.

**Dice, and the ruling**

- `roll()` is called anywhere on the yard road, in any branch, ever.
- Rustfall quotes a percentage, a chance, a risk, or any odds figure, in any
  state, on the card or in the yard.
- A wave's size, its named group, or the cars it lands on differs between two
  runs at the same push with the same cars aboard.
- Any outcome inside the yard is scripted, forced, or nudged — a forced first
  hold, a forced first loss.

**Resolution**

- A raider at a car with a Warden on it takes that car.
- A Gunner turns more than one raider in a push, or turns a raider more than
  one car from where it stands.
- The Sapper's switch or siding acts more than once per push, or persists
  into the next push without being placed again.
- A raider held past the last push still takes a car.
- A raider that nobody turned does not take its car, or takes more than its
  own car.
- Any hit-point, health, damage, strength or integrity value is stored,
  decremented, or rendered anywhere on the board.
- Any bar, meter, gauge or fill represents world state on this board.
- A placement is refused for a reason the board did not state before the
  press.

**Stakes and pay**

- A run that comes home empty pays anything. Any fraction of any route
  reward appears on any failure branch.
- A stake, toll, or muster refunds — any branch, any direction.
- Marks go negative anywhere. The roster leaves 0..4, or moves anywhere but
  at a muster. A `roster -=`, sell-back, disband or rebate path appears.
- Any crew member fails to come home, on any branch. The Sunlark is lost.
  The train, the roster, the town or another board's state is touched by any
  outcome.
- A car's worth is anything but 14, 7 and 2, or the three do not sum to 23.
- `3 / 5 / 6 / 2 / 4 / 3+1 / 10 / 14 / 18 / 0.036` move without this beat
  moving.

**Reachability and solvability**

- A wave table ships that has not been proven beatable offline from every car
  state it can be reached in. *(`/convoy-stop/` shipped an impossible stop-2
  table and it is in `KILLS.md`; that lineage's answer was a headless solver
  replaying the same math. Inherit the practice.)*
- A reachable home state has no lit send. A reachable yard state has neither
  PUSH nor PULL OUT lit.
- Rustfall sends while `cargoesBanked === 0`, at any capital.
- A second run goes out while one is out.

**Words**

- A push, a run, or the sitting ends without its sentence.
- An empty run's sentence drops zero-pay, stake-spent, crew-home, or
  desk-stands; or it names crew that did not ride.
- The terminal does not read the record, or a register calls a run clean when
  a car was taken.
- The board says a raider was killed, or that any person died.

**The lineage**

- Live shas are overwritten: dispatch `576ce2b6`, scale `953368a1`, heat
  `292d6645`, kill `395c18f2`, convoy-stop `5ad814e6`. Any existing board is
  touched.
- Any number or rule carried from `/dawnspur-dispatch/` differs from the
  passed board's.
- This board reads or writes heat, scale or dispatch state.
- The HUD grows past the one marks line.

---

## The numbers, and where each one comes from

**The civic scale factor 6.5 is inherited, not re-authored.** CFD-196 chose it
as its one authored number and every figure below that converts a pack
quantity into marks goes through it, so this board and the passed board share
one exchange rate.

### The load — fully derived, and it checks against itself

`routes[rustfall-yard].rewards` = `{ marks: 12, materials: 45, parts: 12 }`,
converted at `economyConfig.resourceValues` (`marks` 1, `materials` 2,
`parts` 4), over 6.5:

| Leg | Equivalents | ÷ 6.5 | Car | Marks |
| --- | --- | --- | --- | --- |
| `materials` 45 | 90 | 13.846 | the ore car | **14** |
| `parts` 12 | 48 | 7.385 | the parts car | **7** |
| `marks` 12 | 12 | 1.846 | the strongbox | **2** |
| **whole basket** | **150** | **23.077** | | **23** |

The three legs round to 14 + 7 + 2 = **23**, and the whole basket converts to
**23**. The leg-wise and basket-wise conversions agree, which is the check
that says the split is a reading of the pack rather than a decoration on it.
For comparison at the same scale: halt 66 → 10, Mosswake 94 → 14, Cloud Basin
114 → 18. **Rustfall's 23 is the richest basket on the near map**, which is
why it is worth defending and why the yard is the tier's natural first site.

The cars are named for what they carry — the route's own description supplies
them: *"Old sidings, **ore cranes**, and dormant machinery make useful
**salvage** and useful ambushes."* Their worth is stated in marks. **There is
one currency.**

**The loading order is the one authored decision in the load, and it is
argued, not asserted.** Heaviest first, and the reason is not fiction, it is
the shape of the decision:

- Ore first (14 / 21 / 23) puts the biggest commitment on the board at push
  one and makes every later placement the question *do I hold the ore or the
  new car*. That question is live at all three pushes.
- Ore last (2 / 9 / 23) makes pushes one and two meaningless — you are
  guarding 2 marks and then 9, and the only rational line is to push to the
  end. **The push-or-retreat call would be fake**, and it is the sitting's
  core decision.

The fiction agrees without being asked to: the ore cranes are already
standing, and a crew loads what it came for first.

### The stake — 4 marks, by the passed board's own published method

- **Toll 1** — `routeTolls.chartered.flatFee`, verbatim.
  `routes[rustfall-yard].zone` is `"Chartered Line"`, so Rustfall carries the
  same civic toll Cloud Basin does, labelled the same way.
- **Provisions 3** — CFD-196's method, applied to a new route:
  `routes[rustfall-yard].durationSeconds` 110 ÷ `routes[mosswake-loop]`'s 75,
  times Mosswake's authored seed of 2, is 2.93 → **3**. The away-cost the
  board refuses as time, re-expressed as the stake. **New-play by
  inheritance** — the seed is authored and stays flagged.

### The crew — every price derived, none authored

`crewTypes[*].baseCost` through `economyConfig.resourceValues`, over 6.5:

| Crew | baseCost | Equivalents | ÷ 6.5 | Marks |
| --- | --- | --- | --- | --- |
| Rangers | food 7, energy 3 | 13 | 2.000 | *(2 — refused this sitting)* |
| **Wardens** | food 8, materials 5 | 18 | 2.769 | **3** *(unchanged, shipped)* |
| **Gunners** | food 9, materials 7, parts 2 | 31 | 4.769 | **5** |
| **Sappers** | food 8, materials 8, parts 3 | 36 | 5.538 | **6** |

The Warden's 3 reproduces the shipped board's muster price exactly, which is
the check that the method is the same method. **Roster cap 4 is unchanged and
remains new-play by inheritance**, Kill-listed by CFD-196 and not moved here.

### The waves — two independent derivations agreeing on three

`COMBAT_SCENARIOS[rustfall-security-charter]` — the tuned scenario for this
exact route, `routeId: "rustfall-yard"`, `missionIds` including `"convoy"` —
carries **exactly three** `hostileGroups`. `/convoy-stop/` carries **exactly
three** waves per stop (`WAVE_SPAWNS[stop]`, `wave` 0..2). Two lineages, one
number: **three pushes.**

The groups' names and strengths are verbatim from that scenario, and the
strengths order the waves:

| Push | `hostileGroups` entry | `strength` |
| --- | --- | --- |
| 1 | `raider-scouts-a`, "Raider Scouts" | 18 |
| 2 | `boarders`, "Boarders" | 20 |
| 3 | `scrap-gunners`, "Scrap Gunners" | 24 |

**Said plainly: the strengths do one job here, and that is the ordering.** A
board with no health has nothing else to spend a strength value on, and
inventing a use for it would be a number wearing a citation. It is stated
rather than quietly dropped.

**The wave shapes are new-play and the names argued them.** Boarders board —
they come at a car together, which is concentration. Scrap Gunners are ranged
support — they come at everything at once, which is dispersion. Scouts come
first and alone, which is what scouts do. **Counts 1 / 2 / 3 are new-play**,
argued from the return-window doctrine: a convoy that has loaded more has more
to lose, so the pressure rises with the haul.

### The two verbs' reach — derived from the lineage

`/convoy-stop/` sets `GUN_ACROSS = 1.28` against a cell height, so a gun
reaches its own lane **and one either side**; `MORTAR_ACROSS = 0.72` reaches
its own lane only. That ±1 is the Gunner's reach here, unchanged. **One shot
per push is new-play**, argued from `GUN_CD = 280` being a real per-shot
cooldown in that lineage while the placed pieces that hold ground carry none.

The Sapper's two pieces are David's seam, verbatim — *"an engineer, a wall
and an obstacle."* The **switch** is `/convoy-stop/`'s wall (`divertRow` /
`applyWalls`: redirect, never block, never damage, once per hunter). The
**siding** is its spike (`SPIKE_SLOW`: slow, never kill). Its lineage
taxonomy in full is **slow / kill / redirect**, and this board takes two of
the three and refuses the third by refusing killing outright.

### The counterfactual dice line — stated here, never on the board

Had Rustfall rolled, it would have quoted `0.76 − 0.22` = **54.0%** bare,
rising 3.6 points per Warden to 68.4% at four. **This is the number the desk
refuses to state**, and it belongs in the beat because it is the tier's
calibration:

- Dice would have paid 23 × 0.540 = **12.4 marks** in expectation at a bare
  roster, 23 × 0.684 = **15.7** at four Wardens; less the 4-mark stake either
  way.
- Bringing home the ore car alone (**14**) roughly matches what the dice
  would have paid at a bare roster.
- Bringing home ore and parts (**21**) beats it by two-thirds.
- Losing the ore puts the run under the dice line, whatever else survives.

**That is the tier justifying its own existence**: a player who places well
beats the dice, a player who places badly does worse than a coin the desk
would have flipped for them, and the difference is decisions. If the shipped
tuning does not produce that, the tuning is wrong, and this paragraph is the
test.

### The failure gradient, and why it is not the consolation CFD-145 killed

These are **two different legs in the engine's own code**, and the passed
board refused one of them without touching the other:

- `applyCombatResultToDispatch`: `routeReward = scaleResources(route.rewards,
  success ? mission.rewardMultiplier : mission.rewardMultiplier * 0.25)`.
  **This is the consolation.** It pays you for losing. CFD-145 killed it, the
  passed board refuses it, and this board refuses it: **a run that comes home
  empty pays zero.**
- `buildCombatResult`: `cargoIntegrity`, feeding `cargoLost = floor(cargo ×
  (1 − integrity))`. **This is the gradient.** It does not pay you for
  losing; it says how much of what you were carrying survived.

On this board the second leg is the whole pay: the cars that come home are
the pay, and the cars taken are gone. There is no separate route reward to
pay a fraction of, so CFD-145's rule is satisfied at the strongest reading —
**a Rustfall run that loses every car banks nothing at all.**

### The fixture question, asked at design time and answered

**Every state in this beat's arithmetic is reachable from the opening by
play**, and the shortest path to the yard is exact:

| | marks | roster | banked |
| --- | --- | --- | --- |
| opening | 3 | 0 | 0 |
| DAWNSPUR HALT, free, always lit, home paid at 68% | 13 | 0 | 1 → charter opens |
| MUSTER WARDEN | 10 | 1 | 1 |
| MUSTER SAPPER | 4 | 2 | 1 |
| SEND RUSTFALL, stake 4 | **0** | 2 | 1 |

**One prior run.** And that crew — one Warden and one Sapper, 9 marks — is a
crew that can run the yard clean: the Warden holds the concentrated wave at
push 2, and at push 3 the Sapper's siding removes one raider from the run
while its switch folds a second onto the Warden's car. Three Wardens (also 9
marks) solve push 3 a different way and lose push 2's economy. **Two distinct
clean lines at the same price is the tuning target**, and it is what the
offline solvability gate must prove before the tables ship.

Reaching 0 marks with a run out is not a deadlock: the halt is free and
always lit, which is the passed board's floor rule doing its job across a
board it was not written for.

**The claim CFD-196 retired is re-made here deliberately, on new arithmetic,
and measured rather than argued.** Amendment 1 retired "every state is reached
from that opening by play" because every delta on that board but the muster
was even, so from the minted odd float marks and roster were locked into
matching parity and pairs like *4 marks, roster 0* could never occur.

**Rustfall is what re-opens the lattice, and it is the odd car values that do
it.** The yard can send a run home with 7, 9, 21 or 23 marks — odd numbers
that the dice routes' 10 / 14 / 18 against stakes of 0 / 2 / 4 could never
produce. Measured by exhaustive search over this board's own transition rules,
both outcome branches allowed, marks bounded at 80: **all 35 crew
compositions within the cap of 4 are reachable, all 35 can reach a Rustfall
send, and every marks value from 0 upward is reachable at roster 0** — the
even ones included, which is precisely what the old lattice forbade. The move
that breaks the parity class is a single Rustfall run: open 3, halt home paid
for 13, send Rustfall for 9, come off the yard road with the parts car alone
for **16** — an even balance at roster 0, which no sequence of dice runs and
musters could have produced. Everything below it follows from there.

Without Rustfall in the loop the old lattice would still be closed, which is
worth saying plainly: **the new system is what makes the claim true again, and
if the yard's car values ever move to even numbers this paragraph goes back to
being false.**

---

## Canon check

Per `docs/mechanisms-recommitted.md` §6.1: every mechanism turned ON or
REFUSED, and the rule or source line it rests on. Rows mirror **On this
sitting**, in order. Sources: `[LOOP]` The Core Loop, `[ECON]` How the Economy
Works, `[TEETH]` The Teeth, `[2G]` The Two Games, `[CONF]` How Conflict Works,
`[WILD]` The Wild and the Legend, `[WB]` World Bible v0.1, `[MDB]` Master
Design Bible — all under `C:\dev\skyrail\docs\lore\`.

| Row | ON / REFUSED | Rests on |
| --- | --- | --- |
| The dispatch desk and its dice routes, carried | ON | RULED — David 2026-08-26: honest dice for standard runs; the passed CFD-196 beat in full, unamended |
| Rustfall takes a send | ON | RULED — David 2026-08-26, the EXCEPT clause: "a send into particularly contested territory known to have raiders may lead to the convoy defense game". `[WB]` puts interception exactly on this line class: Chartered routes are "Partly restored or contested routes … **opt-in interception risk** in later builds", against the trunk where "**no player banditry permitted**" |
| Rustfall quotes no odds; no die on the yard | REFUSED | The same ruling: contested territory "is not a dice roll purely as it depends on the players' decisions on placement and tactics". `[ECON]`'s legibility rule — a stated number the board could not honestly roll is the obfuscated conversion by other means. And the lineage's own law: `/convoy-stop/`, "Fixed every run. **No RNG.**" |
| The yard as placement, not battle | ON | `[WB]`, the governing sentence: "If a designer is unsure whether a mission is too combat-heavy, the answer is to make it **an escort, a repair, or a survey with a threat in it, rather than a battle**." `[WB]` again: "Combat is route security, not conquest … **Fighting exists to protect logistics, not to replace them.**" `[CONF]`, the touch toolkit: "The grammar is **decisions, not execution** … A player **places autonomous units and positions** rather than steering and aiming … the fight fits one screen with no scrolling to see it" |
| A turn is a player's press; no wall time anywhere | ON | R4 — "No decay clocks, no upkeep tax, and no alerts"; R8 — a quiet stone is never a session meter. And canon names this model itself: `[LOOP]`, "**A turn-based or tick-on-action model is the live alternative**, and the choice should be tested against how a session actually feels on a phone" — listed under its own **Open calls to playtest**. The boards are that playtest. **Weakness named:** the corpus carries no verbatim refusal of reflex or twitch input anywhere; that refusal rests on `[CONF]`'s "decisions, not execution" plus this repository's own convicted-timer class, and is an extension, not a quote |
| `tacticalTimeMs` as a budget | REFUSED | R4. A budget the player can run out is a clock with its units filed off, and the engine's own `isCombatPrimaryComplete` makes running it out *count as clearing the raiders* — an outcome no press produced |
| `standDownCombatIncident`'s scoring kept, its trigger refused | ON / REFUSED | Measured: it "scores through the identical `buildCombatResult` … invents no outcome and applies no penalty or bonus", and its log line already says the right thing — "The crew stood down and **brought the train in**." Its trigger is `now >= lastOrderedAt + durationMs`, 180 seconds of real idle, which R4 refuses without exception. PULL OUT is the same exit under the player's hand |
| PULL OUT, and the push-or-retreat call | ON | `[TEETH]`, verbatim: "Full success is the haul brought home. **Partial success is turning back early with some of it.** Graceful failure is escaping with nothing but the craft … which makes **the push-or-retreat call the core decision of the whole mode**." And the anti-spiral: "a decided loss never becomes a long doomed grind" — `[MDB]` 1.20 names the verb for this layer, "**a clean concede** and a swing objective" |
| The return as the risk window (pressure rises with the haul) | ON | `[TEETH]`: "**the return trip is where the risk lives** … Coming home, a player carries the haul and has the most to lose, so the hazard peaks on the way back" |
| The load as three cars, graded; cars taken individually | ON | `[TEETH]`, "Failure is a gradient, not a state"; and **CFD-196's own signed text assigns that doctrine to this tier by name**: "that doctrine governs the active tier, where the player is on the line making the read, and **it is exactly what the defense instance's placement-and-tactics resolution will be**." R6 — the haul committed is what dies |
| The `× 0.25` consolation leg | REFUSED | CFD-145, decided: failed runs pay zero route reward. A distinct code leg from the gradient — see The numbers |
| Health, hit points, damage, any filling bar | REFUSED | `[CONF]`, refused by name: "**A separate combat mode with health bars standing beside the building game.** Conflict is the thermal-and-logistics sim, not a thing next to it." `[MDB]` 1.12: non-cold adversaries are engaged "through this same thermal-and-logistics grammar **rather than through a separate combat system**." `[ECON]`: the ground reports itself "**without a gauge**" |
| The convoy itself as the thing under siege | ON | `[CONF]`, the prescription in the same breath as the refusal, verbatim and in the source's own order: "**The thing under siege is the thing a player was already optimizing**, which is the lesson the logistics-defense games teach most clearly: when **the supply chain itself is what gets attacked and defended**, the routing and throughput problems already in play become the combat, and nothing has to be grafted on." |
| Wardens hold a car; Gunners reach ±1; Sappers reroute and hold | ON | `crewTypes[*]` verbatim: Wardens "**absorb danger on convoy runs**", Gunners "Defend railcars and **punish exposed raiders**", Sappers "**Combat engineers**". `[WB]` corroborates each: "Rail Wardens. **Durable guards who protect** stations, convoys, workers, and cargo"; "Gunners. **Ranged support** who defend railcars"; "Sappers. Combat engineers who repair track under pressure". Reach ±1 from `/convoy-stop/`'s `GUN_ACROSS` 1.28 |
| Reroute as a first-class resolution | ON | `[WB]` twice, and both at this route class: "**The Tollman's Demand** … Pay, fight through, **reroute**, or (outlaw path) cut a deal"; "**The Dormant Crane** … Repair it, **reroute** it, or disable it." A switchyard is made of switches. **Weakness named:** David's seam says "a wall and an obstacle", and the corpus has **no** support for player-placed walls, barricades, chokepoints or terrain-as-tactics — "obstacle" appears once and means broken track a sapper *repairs*. The redirect and the hold rest on **David's ruling and `/convoy-stop/`'s shipped grammar**, not on the corpus, and are flagged as such |
| Rangers | REFUSED | `crewTypes[rangers].description` — "**Reveal ambushes**." Nothing on this board is hidden: every wave states its size and its cars before a finger moves. A control with nothing to do is the dead-button conviction this house already carries. Its price is recorded, not spent |
| Raiders as the pressure at Rustfall | ON | `routes[rustfall-yard].tags` — `"raiders"`; the tuned `COMBAT_SCENARIOS[rustfall-security-charter]`, "Line Incident: Rustfall Ambush", route-gated to this route and mission-gated to include `convoy`; `[WB]` — "Raider crews (the Tollmen and similar). Intercept unguarded convoys … Demand tolls, attempt to take cargo. **The reason escorts and wardens matter.**" And the live board's own shipped card. **Weakness named, twice:** `[MDB]` 1.21 is a locked directive reading "**The cold is the only hazard, in five forms**", and raiders are not among them; and `[WILD]`'s stand-in doctrine that supplies NPC attackers — "**a defense wants attackers** … a stand-in raider reading as a Cinderborn outlaw" — is written for the contested deep, while Rustfall is a near-map Chartered route. The reconciliation this beat takes is `[MDB]` 1.12's own: raiders are **pressure on the routing problem**, engaged through the logistics grammar, never a hazard class of their own. That is what the yard is |
| Raiders are turned, never killed; nobody dies | ON | `[WB]` — "The world should never tip into a **war fantasy**"; "Framed as **rivalry and risk, not war**"; "Outlaws read by silhouette and salvage, **not by cartoon villainy**". `[CONF]` — the reclaim-preferred economy, "a costly last resort". `[MDB]` 1.12 — "never cruelty". The failure ceiling in `[MDB]` 1.21 is the haul and the craft, never a person |
| Crew always home; the Sunlark never lost | ON | `resolveDispatch` — `addCrew(next, dispatch.crew)` on **both** branches, the engine's own law, kept by the passed board. `[WB]`, from the hero who owns convoy defense: "**Stay in formation. We bring everyone home.**" (Sera Cairn, whose entry reads "Lends her name to patrol and **convoy-defense systems**") |
| The train lost — canon's fourth rung | REFUSED, named | `[TEETH]` — "Catastrophic failure is crossing the Mark and losing the craft itself", and "craft-loss costs the instance and the haul, **never the capability**". It is a real rung and it is available. `[LOOP]` says why not now: stakes ride the dial, "**defaulting gentle** and turned up only by a player who reaches for it." One system per sitting |
| The stake as provisions and toll | ON | R6 — "A run that fails costs the haul committed to it and never the home"; R2 untouched — no standing bill, cost only at the player's own click. R1 — the toll is civic and labelled, "the route toll" |
| The Tollmen's toll paid in cargo (cut a car loose) | REFUSED, named | Fully canon-backed and deliberately held: `[WB]`'s "**Pay**, fight through, reroute, or cut a deal", `[TEETH]`'s "**jettison weight**" as a named counterplay, `[CONF]`'s humane-raiding "**partial loss rather than full loot**". Refused because a verb that resolves a wave *without a placement* is the one thing that could hollow out the tier's first outing, which exists to establish that placement decides the run |
| Heroes | REFUSED | `buildings[hero-lodge]` is off this board and owns them. Measured, and worth the next author knowing: `applyHeroAbility` permanently parks the hero on order type `"hero-ability"`, which matches no command, dropping it to the 0.55 baseline for the rest of the incident; and one of the five heroes contributes literally zero combat power |
| `missions[raid]`, the Bandit Camp Raid | REFUSED | `missions[convoy].rewardMultiplier` = 1 is the mission that leaves `route.rewards` untouched, and the mission here is getting the load home. `[MDB]` 1.20 splits them by name — "offense as the raid and **defense as the stand**" — and this is the stand |
| Postures, route events, safety accrual, train damage, insurance, discovery, contracts | REFUSED, unchanged | Carried verbatim from the passed beat's rows; every one zero by its own refusal |
| Goods as nouns, at the manifest only | ON, flagged | The passed board's standing refusal held marks as the stand-in. This board names three cars for what they carry because the manifest is the stake and a nameless stake cannot be argued about, and prices every one of them in **marks**. Conversion by `economyConfig.resourceValues`, the pack's own table. **This is the closest the lineage has come to the line, and it is flagged rather than slipped** |
| The dormant Standfast crane | REFUSED, named | `[WB]`'s own hook for this yard: "reclaim the yard, secure a parts supply, and **contend with a dormant maintenance crane**" — "Repair it, reroute it, or disable it. **Orin prefers reclaiming it.**" `[CONF]` 1.9's reclaim-preferred economy makes it a whole system, not a wave. One per sitting |
| The storm at the town | REFUSED, unchanged | §5 SIGNED — the reckoning is the scale lineage's; §5's own question sentence scopes itself to "the scale sitting", and CFD-196's RULED seam settled that it does not bind this loop |
| Reading or writing another board's state | REFUSED, unchanged | Amendment 1's ruling 2 freed the fiction and not the state; the standing lineage lock stands |
| End-sentences at every terminal | ON | The process rule from the broken sit, and a deliberate departure: `/convoy-stop/` prints **zero sentences** — a lost car returns the player silently to the chooser. This board says what happened |

---

## Author's argued alternatives

The house records rejected roads. Four were close, and one of them is the
commission's own framing.

**1. Port the combat engine, replacing the clock with a turn counter.** The
commission asks for this and it is the road I spent longest on. Rejected on
the engine's own text: strip the clock and what is left is `health` /
`maxHealth` on every group, a `hostilePressure` scalar that only falls, four
objectives with `progress` numbers between 0 and 100, and a `cargoIntegrity`
formula that mixes two percentages. **That is a health-bar game**, which
`[CONF]` refuses by name in the same paragraph that prescribes the
alternative. The engine also has no enemy — no AI, no schedule, no wave — so
a turn-driven port would be a player pressing a button to watch four numbers
move, with no opponent and nothing to place. What survives the transfer is
the *shape* (orders then resolution), the *ordering* (three hostile groups,
by strength), the *names* (Raider Scouts, Boarders, Scrap Gunners), the
*gradient* (`cargoIntegrity` as a distinct leg from the consolation), and the
*stand-down's scoring*. All five are taken. The arithmetic is left where it
is.

**2. Rustfall as a wave-defense board in `/convoy-stop/`'s image — five lanes,
a spike, a gun, a mortar, a wall, and three waves that play themselves out.**
The nearest thing to a finished design already exists and it is real. Rejected
on two counts, one of them fatal. The fatal one is the clock: that board is a
`requestAnimationFrame` loop on `performance.now` deltas, and its only untimed
phase is `quiet`. Its tactics come from continuous space and millisecond
cooldowns, and both of those *are* the clock; take them out and the placement
puzzle it was tuned around collapses into arithmetic. The second is scope:
five lanes and four piece types against three cars and three crew is a bigger
board than a first sitting on a new tier should be. What is taken is exactly
what survives the clock — the phase order (say the threat, place, lock,
resolve), the threat forecast drawn on the lanes it will hit, fixed tables
with no RNG, the slow/kill/redirect taxonomy, and the offline solvability
practice that its `sim.js` invented after an impossible table shipped.

**3. Rangers in, and the wave's shape hidden until they are aboard.** This is
the design that makes reach genuinely valuable — commit blind to the
distribution, and buy the information with a Ranger. It is tempting,
`recommendedCrew` for this very scenario is `["wardens", "rangers",
"gunners"]`, and `ROUTE_EVENTS[raider-scouts]` names them at this very
route: *"Wardens and Rangers matter on exposed Rustfall sidings."* Rejected
for this sitting on three grounds. It is a second system — concealment — and
one per sitting. It puts a control on the board whose whole value is removing
a difficulty the beat just added, which is a circular sale. And measured, the
`recommendedCrew` field is **display-only**: it feeds `matchingCrew` into
`manualAdvantage`, and `manualAdvantage` has **no consumer anywhere in the
repository** — so it is unconsumed content, not tuning, and it does not
outrank a ruling. Named, priced at 2, and left for the sitting that hides
something. **This is the sharpest disagreement between the pack and David's
seam and it is an open question below, not a decision I am confident in.**

**4. Cut a car loose — pay the Tollmen their toll.** `[WB]` names Pay first
among four resolutions, `[TEETH]` names "jettison weight" as counterplay, and
`[CONF]`'s humane-raiding toolkit is partial loss rather than full loot. It
would also put the stakes dial in the player's own hand at every push, which
`[LOOP]` explicitly wants. Rejected for this sitting alone, and only because
of what this sitting is: it is the tier's first outing and its whole job is to
establish that **placement decides the run.** A verb that resolves a wave
without any placement is the one addition that could make the first sit
answer *what happened* with "I paid them." It is the strongest candidate for
the sitting after this one, and it needs no new derivation when it comes.

**A cousin rejection with the same shape: escalating raider grades — Scouts
answerable by anyone, Boarders only by a Warden, Scrap Gunners only by a
Gunner.** It reads well, the names support it, and it would give
`strength` 18 / 20 / 24 a mechanical job. Rejected because it forces the
roster instead of rewarding it: a run without a Gunner would be unwinnable at
push 3 regardless of how well it was placed, which is the doomed grind
`[TEETH]`'s anti-spiral exists to prevent. The flat rule — any body turns any
raider, the difference is reach and capacity — keeps every crew a real answer
to some shape. The grade escalation is the obvious knob if the shipped tuning
comes back too easy, and it is named here so it is not re-invented.

---

## Open questions for David

Five, each answerable in a sentence.

1. **Rangers.** The pack names them at Rustfall twice; your seam named a
   marksman and an engineer and not a scout. I shipped your seam and refused
   the Ranger because nothing here is hidden. In, out, or next sitting?

2. **Cutting a car loose.** The Tollmen want a toll and canon lists paying it
   first among four outs. I held it back so this sitting proves placement
   decides the run. Hold it, or ship it now?

3. **The loading order.** Heaviest first — ore 14, parts 7, strongbox 2 — so
   the biggest commitment is on the board from push one and the push-or-retreat
   call is live at every step. Lightest first makes the early pushes
   meaningless. Right call?

4. **The stop.** The sitting ends on the first Rustfall run off the yard road,
   loaded **or empty** — so even a bad first run is a complete sitting you can
   answer *what happened* about. Or should an empty run let you try again
   before the sitting ends?

5. **The crane.** `[WB]` says the thing that actually holds Rustfall is a
   dormant Standfast maintenance crane, and that Orin prefers reclaiming it.
   The live card says raiders. I shipped the raiders because the card is
   already in your hands. Does the crane get its own sitting, or does it
   belong in this one?

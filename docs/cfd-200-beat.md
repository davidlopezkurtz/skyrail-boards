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

### THE PARENT — resolved 2026-08-27, David's ruling, and it was a live fork

This beat was drafted as a cumulative board carrying **the dispatch desk
only** — no weather, no terrace — because canon §7 landed after it was
commissioned. CFD-201's beat then landed a cumulative board carrying **the
dispatch desk AND the scale terrace AND weather**, and §7 sequences CFD-201
first.

**Two beats therefore claimed different parents, which is a lineage fork —
the exact isolation §7 was written to end.** Left alone it would have produced
two incompatible cumulative branches: one town with weather and a terrace,
another with neither, both calling themselves the next board.

**Ruling: this board re-bases onto the storm board.** Its parent is
CFD-201's `/dawnspur-storm/`, not `/dawnspur-dispatch/`. Concretely:

- **Everything CFD-201 lands is INHERITED here**, not re-derived and not
  re-argued: the terrace and its reserve, the sky cycle and its stormbird
  tell, the storm's pay and chance deltas, the Ranger and its trim, and every
  price CFD-201 fixes. This beat's `On this sitting` table needs an
  **INHERITED** column, and each inherited row cites the beat that passed it.
- **The one NEW system here is still the yard** — Rustfall taking a send and
  resolving by placement. That is unchanged, and §7's kept half still binds:
  one new system per sitting.
- **The sky is live in the yard.** A Rustfall send made under a storm is made
  under the storm's terms, and the beat must say what that means for a route
  that quotes no percentage. This is new work created by the re-base and it is
  not optional — a board that inherits weather and then ignores it in its own
  new system is two games again.
- **If CFD-201 does not pass its sit**, this beat re-bases onto whatever did
  pass. The parent is the last passed board, always, and it is named at
  signature rather than assumed at drafting.

**The new board lands at `/dawnspur-rustfall/`.** Argued, because three other
names were available and all three are worse:

- It is still Dawnspur's board. One town, one sky, one desk, one terrace — that
  is CFD-201's fiction join and this board inherits it whole. Keeping the
  town's name keeps the lineage readable in the index.
- **Not `/convoy-defense/`.** The Convoy Stop lineage contributes its *grammar*
  here, exactly as CFD-196 promised, and its grammar is not its name. Taking
  the name would imply this is a recut of `/convoy-stop/`, which it is not:
  that board is preserved, real, and untouched.
- **Not `/dawnspur-storm-2/`.** The sitting is not a second weather sitting.
  Weather is inherited entire; the system being sat is the yard.
- **Not `/dawnspur-dispatch-2/`.** The desk is now two boards back.

**The board carries the whole storm board, and that is not a second system.**
§7's dropped half is what licenses it, and David's seam requires the desk
specifically: assets assigned to a send become the assets in the instance, so
the send and the instance must be on one board. The tier also only means
anything against its alternative — "roll the dice at Cloud Basin, or go and
play Rustfall" is the ruling's EXCEPT clause rendered, and with the dice routes
removed the exception has nothing to be an exception to. Everything inherited
is carried **unchanged and Kill-listed as unchanged**. One system is added: the
yard.

David sits first. Ask: What happened.

---

## What the panel measured, and what moved

A nine-agent adversarial panel with an exhaustive solver read the first draft.
The design stood; four numbers and one rule did not. Recorded here rather than
silently corrected, because three of the five were the author's own and the
project's standing failure is confident unmeasured claims.

**Every figure in this section was re-derived by this author** with an
independent solver over the revised rules — optimal placement enumerated at
every node, PULL OUT live at every node, all 55 legal rosters, both skies.

1. **The stated defence of heaviest-first was false; the ordering was right.**
   The draft claimed the push-or-retreat call was "a real one at every step."
   Measured, at push 3 it is live at one step of three. **The ordering survives
   for a different and better reason** — see The numbers.
2. **The Marksman was dead at any price**, because reach only pays under
   uncertainty and every wave was forecast. **RULED by David, 2026-08-27: "fix
   the marksman with the adjacent wave."** Shipped, measured, and the inverse
   checked so the Rail Warden did not die in its place.
3. **The gradient paid a zero-crew run.** With David's damage tiers a wrecked
   car stayed aboard and soaked the next wave, so *being hit made you safer* and
   the muster became optional. Fixed, and the fix is one clause.
4. **Wave 3's shape was self-contradictory** once a car was lost. Closed.
5. **The beat contradicted itself on what the Rustfall card publishes.**
   Resolved, with the reason stated.

Two further things moved that the panel did not raise and the re-base did:
**the Ranger is no longer refused** — CFD-201 lands it, so it arrives inherited
— and **the Engineer stopped being a placer of walls and became a repairer**,
because David's own damage ruling created the job its pack entry already
described.

---

## Does

The board opens exactly as `/dawnspur-storm/` closed: one town, one sky, the
terrace above and the switchyard desk below. Three routes take a send and roll
honest dice at a stated percent that carries the weather. The fourth now takes
a send and rolls nothing.

### Inherited whole, and not re-argued

From **CFD-196** (passed): the three sendable routes at 0.08 / 0.12 / 0.25
paying 10 / 14 / 18 against stakes of 0 / 2 / 3+1; the charter condition; the
opening float of 3; SEND commits and MEET resolves; the muster slider on the
card ground; a failed run pays zero; nothing refunds in any direction; the crew
always comes home on both branches; the whole roster rides every send; the
roster caps at 4 and never leaves.

From **CFD-201**: the sky — **five clear, two bird, two storm, period nine**,
advancing one step per committed player action and by nothing else; the storm's
−10 points on every route that rolls and the Chartered Line's desperation pay
of 24; the terrace, its reserve, `min(level, reserve)` under a storm and the
one-step draw per stormy turn; **the Ranger at 2 marks, cap 1, the weather
unit**, and TRIM, its storm send.

**Nothing in either list moves.** Every figure above is Kill-listed as
unchanged.

### The muster grows by exactly two crew types

CFD-201 reserves both by name and prices both: *"Marksman | `gunners` | fire 4 |
REFUSED — CFD-200's, priced 5"* and *"Engineer | `sappers` | repair 4 | REFUSED
— CFD-200's, priced 6."* This is that sitting, and the prices are the ones
already published.

The board speaks David's names; the numbers section cites the pack's ids.

| Ships as | pack id | Marks | What it does on the yard road |
| --- | --- | --- | --- |
| **Rail Warden** | `wardens` | 3 | Stands on a car. **Turns three raiders a push, at that car only.** |
| **Ranger** | `rangers` | 2, cap 1 | Stands on a car. **Turns one raider a push, at that car only** — and in a storm, sees what the weather is covering. |
| **Marksman** | `gunners` | 5 | Stands on a car. **Turns two raiders a push, at that car or either neighbour.** |
| **Engineer** | `sappers` | 6 | Stands on no car. **Repairs one tier of damage a push**, anywhere on the train. |

**Rail Wardens beat concentration. Marksmen beat spread and reach across a
coupling. The Ranger reads weather. The Engineer undoes what could not be
prevented.** Four crew, four jobs, no two interchangeable — and the arithmetic
that says so is in The numbers, not asserted here.

### RUSTFALL YARD takes a send, and quotes no odds

It stakes **3 provisions and the Chartered toll of 1** — 4 marks, spent at the
click like any other, refunded in no direction. It needs the charter, like any
other Chartered Line route. Where the other three cards carry a percentage that
moves with the sky, this one carries its stake and its manifest and one
sentence about why it carries no number: **by David's ruling this route's
outcome is not a dice question, and this board throws no die on it, ever.**

**Rustfall's pay does not rise in a storm**, and that is a deliberate departure
from its sibling Chartered route — argued in The numbers, because it is the one
place this board declines to apply an inherited rule.

### The yard — the one new system

MEET on Rustfall does not roll. It opens the yard.

**The Sunlark stands in the yard under the ore cranes, loading salvage, and the
Tollmen work their way in along the yard road.** Every push loads one more car
and brings one more wave. Nothing else moves anything.

**The load is three cars, and they load heaviest first:**

| Push | Car | Intact | Slightly | Very | Completely |
| --- | --- | --- | --- | --- | --- |
| 1 | the ore car | **14** | 9 | 4 | 0 |
| 2 | the parts car | **7** | 4 | 2 | 0 |
| 3 | the strongbox | **2** | 1 | 0 | 0 |

**A car is damaged, not taken** — David's ruling, 2026-08-27: *"A damaged car
should be able to be slightly, very, or completely damaged, with its resources
reducing in parallel."* Three tiers below intact, worth scaling with damage,
and a car stays on the train at every tier. A completely damaged car is worth
nothing and is still coupled.

**The waves are fixed, named, and stated before you place.** No die is thrown
in the yard, in any branch, ever.

| Push | Who | Raiders | Shape |
| --- | --- | --- | --- |
| 1 | **Raider Scouts** | 3 | all on the richest car — *concentration* |
| 2 | **Boarders** | 2 | one each across an adjacent pair — *the coupling* |
| 3 | **Scrap Gunners** | 4 | one to each car, the surplus onto the richest — *spread* |

**Targeting is one rule for all three pushes, and it has no holes.** Raiders are
assigned one at a time to the car of **greatest current worth**; a raider is
never assigned to a car worth nothing; ties break toward the car nearest the
engine. Push 2's pair is the adjacent pair of live cars worth most between
them; if no two live cars are adjacent, its two raiders concentrate like push
1's. Push 3 assigns to distinct live cars while distinct live cars exist and
spills the remainder onto the richest.

**A push is three beats, in this order, and the middle one is the whole game:**

1. **The board says where the wave will land**, before a finger moves. Which
   cars, and how many on each. No hidden state, no fog, no surprise — except
   what a storm covers, below.
2. **You place.** Every crew member is re-assigned freely; nothing persists
   from the last push.
3. **You press PUSH.** The car loads, the wave arrives, and it resolves against
   what you placed. Then the board says what happened, in words.

**Resolution, in full — there is no other rule:**

- A raider at a car within a crew member's reach is **turned**, while that crew
  member has a turn left this push: a Rail Warden has three and reaches its own
  car; a Marksman has two and reaches its own car or either neighbour; a Ranger
  has one and reaches its own car.
- **A raider nobody turned damages its car by one tier.** That car only. Three
  unanswered raiders on the same car in the same push take it from intact to
  nothing.
- **The Engineer then repairs one tier**, on whichever car the repair is worth
  most. It turns no raider and stands on no car.
- Under a **storm**, one raider a push cannot be turned at all — the weather
  covers it — and the storm damages the richest car aboard by one tier at the
  end of the push. **A Ranger aboard cancels the cover**, because reading what
  the weather hides is the Ranger's own job. It does not stop the damage.

No health, no hit points, no rolls, no timers, no reflex. **Placement decides
it**, which is what David ruled it would be.

### PULL OUT, and why it is the point

After every push, two verbs are lit: **PUSH** and **PULL OUT**.

PULL OUT ends the run immediately and brings home whatever is still on the
train, at whatever condition it is in. It is always lit, it always works, and
it is never a penalty — it is a price.

Measured — what the desk banks if you pull out after push *k*, in clear
weather, at three frontier rosters:

| You pull out after | Rail Warden (3) | Ranger + Warden (5) | Ranger + 2 Wardens (8) |
| --- | --- | --- | --- |
| push 1 | 14 | 14 | 14 |
| push 2 | **18** | **21** | 21 |
| push 3 (the run ends there) | 16 | 21 | **23** |

**Read the bottom row.** A lone Rail Warden that pushes for the strongbox comes
home with *less* than one that stopped — 16 against 18, because the third wave
is four raiders and one Warden holds one car. A Ranger and a Warden are
indifferent. Only eight marks of crew turn the third push into a gain. **That is
the push-or-retreat call: the same button is correct, neutral and wrong across
three rosters, and which one you are is something you decided at the desk.**

**PULL OUT is the strictly correct verb for 10 of the 55 legal rosters.** Rising
raider counts against shrinking marginal cargo: the ore is most of the yard and
the strongbox is a rounding error.

### What comes home

- **Full run.** All three pushed, nothing damaged: the desk banks 23.
- **Partial.** Pulled out, or ran through with damage: the desk banks what the
  cars are worth.
- **Empty.** Every car completely damaged: the route pays zero, the stake is
  spent and comes back in no direction, **the crew and the train are home**,
  and the desk stands.

**The crew and the train always come home. Every branch, every sitting.** No
crew is ever hurt, lost or spent, and the Sunlark is never lost. The home is
never touched. Neither is the terrace: nothing that happens in the yard reaches
the ground, the level, or the reserve.

---

## Sees

The town as `/dawnspur-storm/` left it: the sky's own line, the terrace and its
five graded looks, the marks line, the muster bar in the grey card stack, the
route cards. The muster bar now takes **a type as well as a count** — its
arrangement is the implementer's business, but Amendment 2's law holds: it is a
peer of the routes, on the card ground, in the stack, wearing its price at full
contrast whether or not it can be paid. The HUD keeps its one line: marks.

**No gauge, anywhere.** CFD-201 quotes the prohibition and it binds here too: a
trained instrument-bird "is how a player knows the weather is turning **with no
readout on the screen**." The ground keeps its graded looks. **A car's condition
is drawn the same way — as a look and a word, intact or slightly or very or
completely damaged — and never as a bar that empties.**

The Rustfall card is no longer dark and no longer alone. It is a route card
like the others with one difference the player can see: where the other three
carry a percentage, it carries its own sentence about why it does not. **It
publishes its stake and its manifest and nothing else.** The wave forecast lives
in the yard, not on the card — the desk cannot see the yard road, the forecast
is only useful where it is used, and a card carrying three wave rows would be
structurally unlike its three siblings for no gain.

**The yard fits one screen and does not scroll.** Three cars in a column, the
crew standing on them, the yard road running in. The wave to come is drawn on
the cars it will hit — a count on a car, before you place — which is the same
job `/convoy-stop/`'s lit tick marks already do. Size, count and condition
carry the information.

The crew read by where they stand. A Marksman's reach is drawn as reach. The
Engineer stands with the train rather than on a car, because it works on the
cars rather than the road.

**Under a storm the yard says so**, and it says which raider the weather is
covering only if a Ranger is aboard. Without one, the forecast shows the wave's
count and the board tells the player plainly that one of them cannot be
answered — the uncertainty is *stated*, never concealed.

**Two verbs are lit under the yard: PUSH and PULL OUT.** Both always, until the
run ends. Nothing else is a control.

**Nothing on this board animates, eases, transitions, or changes on any
schedule but a player's own press.** No `setTimeout`, no `setInterval`, no
`requestAnimationFrame`, no `performance.now`, no `transition`, no
`@keyframes`. `/convoy-stop/` carries a `requestAnimationFrame` loop, a `.car`
transition and a `lingerPulse` keyframe animation. **This board inherits that
lineage's grammar and refuses its clock**, which is a deliberate break and is
recorded as one.

---

## Ends

Every push ends in a sentence and so does the run and so does the sitting, in
the board's words.

**A push held:**
> *"Three Scouts came at the ore car and the Warden turned all three. The parts
> car is on. Two cars aboard, worth 21."*

**A push that cost condition:**
> *"The Boarders came across the coupling and only the ore was answered. The
> parts car is slightly damaged. Two cars aboard, worth 18."*

**The storm working:**
> *"The weather covered one of them and nobody saw it come. The ore car is
> slightly damaged, and the rain has been at it besides. Two cars aboard, worth
> 16."*

**The Engineer working:**
> *"The Engineer got the parts car's coupling back under it. Two cars aboard,
> worth 21."*

**Pulled out loaded:**
> *"The crew pulled the Sunlark off the yard road with the ore and the parts
> aboard. The desk banks 21. What is still on the cranes stays on the cranes;
> the Wardens and the train are home, and the desk stands."*

**Home empty** — carrying all four clauses CFD-196 requires of a run that paid
nothing:
> *"Rustfall kept everything it had. The provisions and the Chartered toll are
> spent — 4 marks — and nothing comes back; the route paid nothing; the
> Wardens, the Engineer and the train are home, and the desk stands."*

The empty sentence names whoever actually rode, exactly as the passed board
learned to: a run with no crew aboard promises no crew home.

**The stop is the first Rustfall run off the yard road**, loaded or empty. The
system this sitting exists to sit has then been played once, end to end, and
David has an answer to *what happened* either way.

At the stop the board reads its own ledger, in two registers keyed on whether
anything was lost:

- **Clean:** *"The Sunlark is off Rustfall with the whole yard aboard. Five runs
  out, five cargoes banked, three cars off the cranes and not a scratch on
  them. The dormant crane at the far end is the next sitting's."*
- **Paid:** *"The Sunlark is off Rustfall. Seven runs out, four cargoes banked,
  two turned back, the ore car very damaged and the strongbox gone, and 8 marks
  staked and lost along the way. The record keeps what came home; the dormant
  crane at the far end is the next sitting's."*

The terminal must read the record — runs out, cargoes banked, runs turned back,
cars off the cranes, their condition, marks lost — and the paid register names
the losses without apology and without warning.

---

## On this sitting

**INHERITED** rows cite the beat that passed the system; they are carried and
not re-argued, per §7.

| System | INHERITED / NEW | This sitting |
| --- | --- | --- |
| The dispatch desk, three dice routes, honest dice at stated odds | INHERITED — CFD-196 (passed) | **ON, unchanged** — no number moves |
| Opening float 3, charter condition, muster bar, the roster's laws | INHERITED — CFD-196 (passed) | **ON, unchanged** |
| The sky: five clear, two bird, two storm, one step per committed action | INHERITED — CFD-201 | **ON, unchanged** — and a PUSH is a committed action |
| The storm's −10 on routes that roll; the Chartered desperation pay of 24 | INHERITED — CFD-201 | **ON, unchanged** on the three rolling routes |
| The terrace, its reserve, `min(level, reserve)`, the stormy draw | INHERITED — CFD-201 | **ON, unchanged** — the yard neither reads nor writes it |
| Rail Warden at 3, cap 4 total, permanent, never spent | INHERITED — CFD-196 (passed) | **ON, unchanged** |
| Ranger at 2, cap 1, the weather unit; TRIM on the rolling routes | INHERITED — CFD-201 | **ON, unchanged** — and it gains a yard job |
| Rustfall takes a send | NEW | **ON** — the ruling's EXCEPT clause, delivered |
| Rustfall quotes odds; any die in the yard | NEW | **REFUSED** — placement decides it |
| Rustfall's pay rises in a storm | NEW | **REFUSED, argued** — the one inherited rule this board declines, and the reason is measured |
| The yard: place, push, resolve | NEW | **ON** — the one new system |
| PULL OUT at any push | NEW | **ON** — the push-or-retreat call; correct for 10 of 55 rosters, measured |
| Three cars at 14 / 7 / 2, heaviest first | NEW | **ON** — derived leg by leg from the route's own basket |
| Damage in three tiers, worth scaling, the car stays coupled | NEW | **ON** — RULED, David 2026-08-27 |
| Marksman at 5: two turns a push, reach across a coupling | NEW | **ON** — RULED, David 2026-08-27, "fix the marksman with the adjacent wave" |
| Engineer at 6: repairs one tier a push | NEW | **ON** — `power.repair` 4; the job David's damage ruling created |
| The storm in the yard: one raider covered, one tier drawn, a Ranger sees | NEW | **ON** — the sky live in the new system, per the re-base |
| Health, hit points, or any bar that fills or empties | NEW | **REFUSED** — a car's condition is the load's condition, in words and looks |
| Wall time, in any form | INHERITED refusal — CFD-196, CFD-201 | **REFUSED** — no clock, no rAF, no transition |
| `tacticalTimeMs` as a budget | NEW | **REFUSED** — a budget the player runs out is a clock with the units filed off |
| `standDownCombatIncident`'s scoring / its trigger | NEW | **ON in substance / REFUSED** — PULL OUT is the same exit under the player's hand |
| The engine's `rewardMultiplier × 0.25` failure leg | INHERITED refusal — CFD-196 (passed) | **REFUSED** — CFD-145 |
| Insurance, postures, route events, safety accrual, train damage | INHERITED refusal — CFD-196 (passed) | **REFUSED, unchanged** |
| Heroes, `HERO_COMBAT_ABILITIES` | INHERITED refusal — CFD-196, CFD-201 | **REFUSED** — the Hero Lodge sitting owns them |
| Missions beyond convoy, including `raid` | NEW | **REFUSED** — the mission is getting the load home, not striking a camp |
| The Tollmen's toll paid in cargo (cut a car loose) | NEW | **REFUSED, named** — canon-backed and deliberately held back |
| The dormant Standfast crane | NEW | **REFUSED, named** — the yard's other half; its own sitting |
| Goods as nouns | INHERITED refusal, relaxed at the manifest | **ON at the manifest only, flagged** — cars named for what they carry, priced in marks; one currency |
| Crew hurt, lost, spent; the Sunlark lost | INHERITED — CFD-196 (passed) | **REFUSED** — the crew always comes home, both branches |
| The train lost — canon's fourth rung | NEW | **REFUSED, named** — the stakes dial defaults gentle |
| Signal tower, discovery, contracts, a second currency | INHERITED refusal — CFD-196, CFD-201 | **REFUSED, unchanged** |
| Reading or writing a *passed* board's persisted state | INHERITED — CFD-196 Amendment 1 | **REFUSED, unchanged** — the lineage lock |
| End-sentences, per push, per run, and terminal | INHERITED — CFD-196 (passed) | **ON** — and `/convoy-stop/` prints none, which this board departs from deliberately |

---

## Kill

Every line expressible as a test.

**The clock**

- Anything moves, changes, eases or resolves on any schedule but a player's own
  press. `setTimeout`, `setInterval`, `requestAnimationFrame`,
  `performance.now`, `Date.now` in the sim, `transition`, `animation` or
  `@keyframes` appears anywhere in the shipped board.
- `deltaMs`, `durationSeconds`, `durationMs`, `tacticalTimeMs` or `baseSeconds`
  is imported, stored, or computed as elapsed time.
- The yard's state depends in any way on when the player returns to it. Two
  identical sequences of presses, one taken in a breath and one across a week,
  produce different state.
- A push, a wave, or the sky advances without a committed player action.
- Any push budget or run limit ends a run the player did not end. PULL OUT is
  dark in any state where the run is live.

**Dice, and the ruling**

- `roll()` is called anywhere on the yard road, in any branch, ever.
- Rustfall quotes a percentage, chance, risk, or any odds figure, in any state,
  on the card or in the yard.
- A wave's size, its named group, or the cars it lands on differs between two
  runs at the same push with the same cars in the same condition and the same
  sky.
- Any outcome inside the yard is scripted, forced, or nudged.

**Resolution**

- A Rail Warden turns more than three raiders in a push, or turns one anywhere
  but its own car. A Marksman turns more than two, or one more than one car
  from where it stands. A Ranger turns more than one, or one anywhere but its
  own car. An Engineer turns any raider at all.
- The Engineer repairs more than one tier a push, or repairs a car that is
  intact, or repairs before the wave has resolved.
- A raider nobody turned fails to damage its car, or damages more than one
  tier, or damages a car other than its own.
- A raider is assigned to a car worth nothing, or to any car that is not of
  greatest current worth under the stated rule.
- Push 2's raiders land on cars that are not adjacent while two live cars are
  adjacent.
- Push 3 leaves a live car untargeted while another live car carries two.
- Any hit-point or health value is stored or decremented for any raider or any
  crew member. Any bar, meter, gauge or fill represents world state anywhere on
  the board.
- A car's worth at a tier is anything but `floor(full × (3 − tier) / 3)`.
- A completely damaged car leaves the train, or is targeted, or is repaired
  from nothing by more than one tier a push.

**The sky in the yard**

- A storm covers more or fewer than one raider a push, or covers any while a
  Ranger is aboard.
- A storm damages more or fewer than one car a tier a push, or damages anything
  but the richest car aboard, or is cancelled by a Ranger.
- Rustfall's cars are worth more in a storm than in clear weather.
- The sky fails to advance on a PUSH or a PULL OUT.
- The yard reads or writes the terrace, the reserve, or the level.

**Stakes and pay**

- A run that comes home with every car completely damaged pays anything.
- A stake, toll, or muster refunds — any branch, any direction.
- Marks go negative. The roster leaves 0..4, or holds more than one Ranger, or
  moves anywhere but at a muster. A `roster -=`, sell-back or rebate appears.
- Any crew member fails to come home, on any branch. The Sunlark is lost. The
  town, the terrace or another board's state is touched by any yard outcome.
- Three cars do not sum to 23 intact.
- `3 / 2 / 5 / 6 / 4 / 3+1 / 10 / 14 / 18 / 24 / 0.036 / −0.10` move without
  this beat or its parents moving.

**Reachability and solvability**

- A wave table ships that has not been proven beatable offline from every car
  state and every sky it can be reached in. *(`/convoy-stop/` shipped an
  impossible stop-2 table and it is in `KILLS.md`; that lineage answered it with
  a headless solver replaying the same math. Inherit the practice.)*
- A crewless Rustfall run banks more than its 4-mark stake, in any sky.
- Any of the four crew types is never the strictly correct purchase in any
  reachable roster and sky.
- A reachable home state has no lit send. A reachable yard state has neither
  PUSH nor PULL OUT lit.
- Rustfall sends while `cargoesBanked === 0`, at any capital.
- A second run goes out while one is out.

**Words**

- A push, a run, or the sitting ends without its sentence.
- An empty run's sentence drops zero-pay, stake-spent, crew-home, or
  desk-stands; or it names crew that did not ride.
- The terminal does not read the record, or calls a run clean when a car came
  home damaged.
- The board says a raider was killed, or that any person died.

**The lineage**

- Live shas are overwritten: dispatch `576ce2b6`, scale `953368a1`, heat
  `292d6645`, kill `395c18f2`, convoy-stop `5ad814e6`, and whatever
  `/dawnspur-storm/` ships at. Any existing board is touched.
- Any inherited number or rule differs from the beat that passed it.
- The HUD grows past the one marks line.

---

## The numbers, and where each one comes from

**The civic scale factor 6.5 is inherited twice over**, from CFD-196 and through
CFD-201. Every figure that converts a pack quantity into marks goes through it,
so this board and both parents share one exchange rate.

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
**23**. The leg-wise and basket-wise conversions agree, which is the check that
says the split is a reading of the pack rather than a decoration on it. At the
same scale: halt 66 → 10, Mosswake 94 → 14, Cloud Basin 114 → 18. **Rustfall's
150 is the richest basket on the near map**, ahead of Cloud Basin's 114.

The cars are named from the route's own description: *"Old sidings, **ore
cranes**, and dormant machinery make useful **salvage** and useful ambushes."*
Their worth is stated in marks. **There is one currency.**

**Damage tiers, derived from David's ruling through the engine's own rounding.**
He ruled three tiers "with its resources reducing in parallel", so worth falls
in equal thirds: `worth = floor(full × (3 − tier) / 3)`. The `floor` is not
chosen — it is `buildCombatResult`'s own `cargoLost = floor(cargo × (1 −
integrity))`, the tuned instrument's rounding, kept. **Said plainly: the
strongbox cannot express three distinct tiers** — at 2 marks it reads 2, 1, 0, 0
— and that is a consequence of the pack's own leg sizes, not a rounding choice.
Stated rather than hidden.

**The loading order is heaviest first, and the draft's defence of it was false.**
The draft claimed the push-or-retreat call was "a real one at every step."
Measured at push 3 with a Rail Warden and an Engineer, only a small minority of
placements gain ground and most lose it — the call is live at one step of three,
not three. **The ordering survives on a different and stronger measurement**:
the outcome multiset is identical under both orderings, because the load order
changes only where the bank sits, but **PULL OUT is strictly correct for 10 of
55 rosters heaviest-first and for none of them lightest-first.** Ore-last makes
the first two pushes worth 2 and 9 against a 23-mark finish, so the only
rational line is to push to the end and the sitting's core decision never fires.
**The cars load heaviest first so that PULL OUT is ever the correct verb.**

### The stake — 4 marks, by the passed board's own published method

- **Toll 1** — `routeTolls.chartered.flatFee`, verbatim.
  `routes[rustfall-yard].zone` is `"Chartered Line"`.
- **Provisions 3** — CFD-196's method applied to a new route:
  `routes[rustfall-yard].durationSeconds` 110 ÷ `routes[mosswake-loop]`'s 75,
  times Mosswake's authored seed of 2, is 2.93 → **3**. **New-play by
  inheritance** — the seed is authored and stays flagged.

### The crew — every price derived, none authored

`crewTypes[*].baseCost` through `economyConfig.resourceValues`, over 6.5:

| Ships as | pack id | baseCost | Equivalents | ÷ 6.5 | Marks |
| --- | --- | --- | --- | --- | --- |
| Ranger | `rangers` | food 7, energy 3 | 13 | 2.000 | **2** — INHERITED, CFD-201 |
| Rail Warden | `wardens` | food 8, materials 5 | 18 | 2.769 | **3** — INHERITED, CFD-196 |
| Marksman | `gunners` | food 9, materials 7, parts 2 | 31 | 4.769 | **5** — as CFD-201 published it |
| Engineer | `sappers` | food 8, materials 8, parts 3 | 36 | 5.538 | **6** — as CFD-201 published it |

The Rail Warden's 3 reproduces the shipped board's muster price exactly, which
is the check that the method is the method. **The Marksman's 5 does not move**,
and the ruling did not ask it to: the fix was the wave, not the price. At 5
against the Warden's 3, the measured ladder below shows it earning its two extra
marks at exactly one rung, which is what a correctly-priced second option looks
like.

**Roster cap 4 total** (CFD-196) and **Ranger cap 1** (CFD-201), both inherited,
both unchanged. 55 rosters are legal.

### Capacity and reach — two derived, one measured, all stated as what they are

| | Reach | Turns a push | Where it comes from |
| --- | --- | --- | --- |
| Rail Warden | own car | **3** | `crewTypes[wardens].power.guard` = 3 — the one place a pack power value maps cleanly |
| Ranger | own car | **1** | `crewTypes[rangers].power.guard` = 1, the same mapping |
| Marksman | own car ±1 | **2** | reach from `/convoy-stop/`'s `GUN_ACROSS` 1.28 against a cell (own lane and one either side, against `MORTAR_ACROSS` 0.72 for own-lane-only). **The 2 is new-play, flagged, and set by measurement** |
| Engineer | the train | **0 raiders, 1 tier repaired** | `crewTypes[sappers]` — "Combat engineers … **stabilize damaged spans**", `power.repair` 4 |

**The Marksman's capacity is the one number here set by a solver rather than a
citation, and the honest reason is that the citations do not scale.** `fire` 4
against `guard` 3 orders the two crew; it does not say how many raiders a turn
buys. Capacity 1 made the Marksman dead — that is the panel's finding, and this
author reproduced it. Capacity 3 makes the Rail Warden the budget option and the
Marksman the answer to everything — measured, and refused as moving the dead
button rather than removing it. **2 is the value at which both are correct
purchases**, and the arithmetic is below.

### The waves — two derived from rulings, one new-play

| Push | Group | `strength` | Raiders | Where the count comes from |
| --- | --- | --- | --- | --- |
| 1 | `raider-scouts-a`, "Raider Scouts" | 18 | **3** | **Derived from David's damage ruling**: three tiers means three unanswered raiders take a car from intact to nothing. Any smaller first wave leaves a crewless run profitable — measured — and an optional muster dissolves the seam this sitting exists to build |
| 2 | `boarders`, "Boarders" | 20 | **2** | **RULED, David 2026-08-27**: "fix the marksman with the adjacent wave" — two raiders, two adjacent cars |
| 3 | `scrap-gunners`, "Scrap Gunners" | 24 | **4** | **New-play, flagged.** 4 is the smallest count no two bodies can answer when it spreads across three cars, which is what makes push 3 the summit rather than a formality |

Group names and strengths are verbatim from
`COMBAT_SCENARIOS[rustfall-security-charter]` — the tuned scenario for this
exact route, `routeId: "rustfall-yard"`, `missionIds` including `"convoy"`.
**Said plainly: the strengths do one job, and that is the ordering.** A board
with no health has nothing else to spend a strength value on, and inventing a
use for it would be a number wearing a citation.

**The shapes are argued from the names, and the names came first.** Scouts probe
the prize in force. **Boarders board across the coupling between two cars** —
which is why the adjacent pair is theirs and not an arbitrary slot for the
ruling. Scrap Gunners are ranged support and rake the whole train from the
sidings.

**Why push 2 and not push 1 or 3 for the adjacent wave.** Push 1 has one car
aboard, so adjacency is undefined there. Push 3's four raiders spread across
three cars, which is a different question and already the Marksman's other half.
Push 2 is the only push that always has exactly two cars aboard, so **the
adjacent wave fires on every single run**, not in a corner a good player never
enters. That was the requirement, and it is satisfied structurally rather than
by tuning.

### The zero-crew hole, and the one clause that closes it

The panel measured that under David's damage tiers a crewless run banked 7
against a 4-mark stake, because **a wrecked ore car stayed aboard and soaked the
next wave — being hit made you safer.** The fix is one clause, and it is stronger
than "target the richest undamaged car":

> **Raiders are assigned to the car of greatest CURRENT worth, and never to a
> car worth nothing.**

Current worth, not original worth, so a wrecked car is not the richest and soaks
nothing. Never a car worth nothing, so a wreck is not a decoy either. That
single rule also closes push 3's hole — "one at each car aboard" was undefined
once a car was lost, and "distinct live cars while they exist, spill onto the
richest" is total.

**Measured after the clause, with all three wave-table changes in place at once:
a crewless run banks 2 against a 4-mark stake in clear weather and 0 in a storm.
Net −2 and −4. The muster is not optional.**

### The measured ladder, and both crew live

Exhaustive over all 55 legal rosters, optimal placement enumerated at every
node, PULL OUT live at every node.

**Clear-weather frontier** (cheapest roster reaching each bank):

| Roster | Marks of crew | Banks |
| --- | --- | --- |
| none | 0 | 2 |
| Ranger | 2 | 8 |
| Rail Warden | 3 | 18 |
| Ranger + Warden | 5 | 21 |
| **Marksman + Ranger** | **7** | **22** |
| Ranger + 2 Wardens | 8 | **23 — the whole yard** |

**Storm frontier**: none 0 · Ranger 2 · Warden 4 · Ranger+Warden 11 ·
**Engineer**+Warden 13 · Engineer+Ranger+Warden 21 · Engineer+Marksman+Ranger 22
· Engineer+Ranger+2 Wardens 23.

**Both crew are correct purchases, measured in both directions:**

- Swap every Marksman for a Rail Warden — same headcount, 2 marks cheaper — and
  the bank **falls in 4 rosters** in clear weather and **2 more** in a storm,
  rising in 1. The panel's original finding was 20 of 20 with zero
  counterexamples; there are now six.
- Swap one Rail Warden for a Marksman — 2 marks dearer — and the bank **falls in
  1 roster** and rises in 3. **The Warden is not dominated**: it holds three
  frontier rungs (18 at 3, 21 at 5, 23 at 8) and the Marksman holds one (22 at
  7). The dead button was removed, not moved.
- **The Engineer never reaches the clear-weather frontier and holds four rungs
  of the storm frontier.** That is not a dead control, it is a conditional one:
  repair is worthless when crew *prevents* the damage and decisive when the
  weather causes damage no placement can prevent. **The Engineer is the storm
  crew**, and it is the counterplay to weather that CFD-201 asked for and is not
  immunity — it is a race the storm can still win.

### The storm in the yard, and the one inherited rule this board declines

CFD-201's storm does two things to a route that rolls: **−10 points of chance**
and, on the Chartered Line, **+6 marks of desperation pay.** Rustfall is
Chartered and rolls nothing, so both need translating and only one of them
survives.

**The difficulty translates, in the yard's own currency, in the shape CFD-201
already uses.** On the terrace, "every turn spent under a storm draws the ground
one step." In the yard, every push under a storm **draws the richest car one
tier** — the same cadence on the same clock, applied to the load instead of the
ground. And **one raider a push cannot be turned**, because weather is cover:
`ROUTE_EVENTS[fog-bank]` — "Cloud Fog Bank … **Scouts** reduce ambush odds and
route confusion" — and `ROUTE_EVENTS[raider-scouts]`, at this very route:
"Wardens and **Rangers** matter on exposed Rustfall sidings."

**A Ranger aboard cancels the cover and not the damage**, which is what keeps it
from being the immunity CFD-201 names as a trap. `crewTypes[rangers]` — the
first two words of its description are "**Reveal ambushes**", the one job this
beat's first draft refused it for want of anything hidden. The storm hides
something. The refusal is withdrawn on its own terms.

**The pay does not translate, and this is the one place this board declines an
inherited rule.** CFD-201 sized 24 against Cloud Basin's own break-even and
measured that a flat premium across all routes made the free halt the best
business in a storm. At Rustfall the objection is sharper and structural: **the
route's difficulty and the route's pay are the same quantity.** The storm eats
the load; a premium per car would pay the player more for each of the cars the
storm is taking. That is CFD-201's own named trap — *risk-up plus reward-up can
cancel to nothing, a wash dressed as drama* — in its purest form, because here
the two levers act on one number rather than two. Cloud Basin can carry both
because its chance and its pay are separate quantities. **Rustfall cannot, so it
carries one. Flagged as a deviation, with its reason, rather than slipped.**

**A consequence, named rather than discovered.** Because Rustfall has no storm
premium to forfeit, TRIM at Rustfall would cost one provision and buy the whole
sky, where on Cloud Basin it costs a provision *and* the 6-mark premium. **TRIM
therefore does not offer at Rustfall**, and the Ranger's yard job above is what
it does instead. That asymmetry is real and it is open question 2.

### The counterfactual dice line — stated here, never on the board

Had Rustfall rolled, it would have quoted `0.76 − 0.22` = **54.0%** bare in
clear weather, 3.6 points per Rail Warden to 68.4% at four, and **44.0%** under
a storm. That is the number the desk refuses to state, and it belongs in the
beat as the tier's calibration:

- Dice would have paid 23 × 0.540 = **12.4 marks** in expectation at a bare
  roster, less the 4-mark stake.
- A crewless yard run banks **2**. Playing the yard badly is far worse than the
  coin the desk would have flipped.
- One Rail Warden banks **18**; a Ranger and a Warden bank **21**; eight marks of
  crew bank the whole **23**.

**That is the tier justifying its own existence**, and it is a sharper
justification than the first draft's: the spread between playing badly and
playing well is 2 to 23, where the dice tier at the same route would have paid a
fixed 12.4 in expectation regardless of anything the player did. If the shipped
tuning does not reproduce this table, the tuning is wrong, and this paragraph is
the test.

### The failure gradient, and why it is not the consolation CFD-145 killed

Two different legs in the engine's own code, and the passed board refused one
without touching the other:

- `applyCombatResultToDispatch`: `routeReward = scaleResources(route.rewards,
  success ? mission.rewardMultiplier : mission.rewardMultiplier * 0.25)`. **The
  consolation.** It pays you for losing. CFD-145 killed it; this board refuses
  it.
- `buildCombatResult`: `cargoIntegrity`, feeding `cargoLost = floor(cargo × (1 −
  integrity))`. **The gradient.** It says how much of what you carried survived.

On this board the second leg is the whole pay. There is no separate route reward
to pay a fraction of, so **a Rustfall run whose every car comes home completely
damaged banks nothing at all** — CFD-145 satisfied at its strongest reading,
while David's three tiers live in the leg that was always meant to carry them.
`[MDB]` 1.21 is the positive citation: *"Failure is a gradient rather than a
state."*

### The fixture question, asked at design time and answered

**Every state in this beat's arithmetic is reachable from the opening by play.**
Measured by exhaustive search over this board's transition rules, both outcome
branches allowed: **all 55 legal rosters are reachable, all 55 can reach a
Rustfall send, and every marks value from 0 upward is reachable at roster 0.**

The shortest path to the yard, exact:

| | marks | roster | banked |
| --- | --- | --- | --- |
| opening | 3 | — | 0 |
| DAWNSPUR HALT, free, always lit, home paid | 13 | — | 1 → charter opens |
| MUSTER RANGER | 11 | R | 1 |
| MUSTER RAIL WARDEN | 8 | R W | 1 |
| SEND RUSTFALL, stake 4 | **4** | R W | 1 |

**One prior run**, and that crew banks 21 of the yard's 23 in clear weather.
Reaching 4 marks with a run out is not a deadlock: the halt is free and always
lit.

**The parity claim CFD-196 retired is re-made here, on new arithmetic.**
Amendment 1 retired "every state is reached from that opening by play" because
every delta on that board but the muster was even, locking marks and roster into
matching parity. **Rustfall re-opens the lattice, and it is the odd car worths
that do it** — the yard sends a run home at 21, 9, 7 or 23, odd numbers the dice
routes' 10 / 14 / 18 against stakes of 0 / 2 / 4 can never produce. Without the
yard the old lattice would still be closed: **the new system is what makes the
claim true again, and if the car worths ever move to even numbers this paragraph
goes back to being false.**

**One thing the sitting may not exercise, named rather than discovered.** The
Engineer is the storm crew and the sitting stops on the first Rustfall run. A
player who reaches the yard in clear weather may play it entirely in clear
weather and never need an Engineer. **That is a property of the sitting, not a
defect in the control**, and it is what open question 3 asks about.

---

## Canon check

Per `docs/mechanisms-recommitted.md` §6.1: every mechanism turned ON or REFUSED,
and the rule or source line it rests on. **Inherited systems are cited to the
beat that passed them**, per §7. Sources: `[LOOP]` The Core Loop, `[ECON]` How
the Economy Works, `[TEETH]` The Teeth, `[CONF]` How Conflict Works, `[WILD]`
The Wild and the Legend, `[WB]` World Bible v0.1, `[MDB]` Master Design Bible —
all under `C:\dev\skyrail\docs\lore\`.

| Row | ON / REFUSED | Rests on |
| --- | --- | --- |
| The desk, the dice routes, the float, the charter, the roster's laws | ON, INHERITED | `docs/cfd-196-beat.md` and its two amendments — **passed**, David 2026-08-26 |
| The sky, the storm's deltas, the terrace, the Ranger, TRIM | ON, INHERITED | `docs/cfd-201-beat.md` — the parent; §7's dropped half licenses carrying them without re-argument |
| A cumulative board at all | ON | §7, RULED — David 2026-08-26: "yes draft the amendment, and make the next board cumulative" |
| Rustfall takes a send | ON, NEW | RULED — David 2026-08-26, the EXCEPT clause. `[WB]` puts interception on this line class by name: Chartered routes carry "**opt-in interception risk** in later builds", against the trunk where "**no player banditry permitted**" |
| Rustfall quotes no odds; no die in the yard | REFUSED | The same ruling — contested territory "is not a dice roll purely as it depends on the players' decisions on placement and tactics". `[ECON]`'s legibility rule. And the lineage's own law: `/convoy-stop/`, "Fixed every run. **No RNG.**" |
| The yard as placement, not battle | ON, NEW | `[WB]`, the governing sentence: "the answer is to make it **an escort, a repair, or a survey with a threat in it, rather than a battle**"; "**Fighting exists to protect logistics, not to replace them.**" `[CONF]`: "The grammar is **decisions, not execution** … A player **places autonomous units and positions** … the fight fits one screen" |
| A turn is a player's press | ON | R4; R8. And `[LOOP]` names the model itself: "**A turn-based or tick-on-action model is the live alternative**, and the choice should be tested against how a session actually feels on a phone" — under its own Open calls to playtest. **Weakness named:** the corpus carries no verbatim refusal of reflex input; that rests on `[CONF]`'s "decisions, not execution" plus this repository's convicted-timer class, and is an extension |
| Damage in three tiers, worth scaling | ON, NEW | **RULED — David, 2026-08-27**, verbatim: "A damaged car should be able to be slightly, very, or completely damaged, with its resources reducing in parallel." Canon's own model by name: `[MDB]` 1.21, "**Failure is a gradient rather than a state**"; `[TEETH]`, "Full success is the haul brought home. **Partial success is turning back early with some of it**" |
| A car stays coupled at every tier; the train is never lost | ON | `[TEETH]`, verbatim: "**losing a craft costs the instance and the haul but never the capability**" — and this sitting refuses even the instance, one rung short of what canon allows |
| Health or hit points on any raider or crew; any bar that fills | REFUSED | `[CONF]` refuses "**a second game with health bars bolted beside the building game**" and prescribes the alternative in the same breath. **The kill line is narrowed from the first draft, which was stricter than its own source**: a car's condition is the *load's* condition, and the load is the supply chain, which is exactly what canon says the combat should be. `[ECON]`: the ground reports itself "**without a gauge**" — so condition ships as a look and a word, never a meter |
| The convoy itself as the thing under siege | ON | `[CONF]`, verbatim and in the source's own order: "**The thing under siege is the thing a player was already optimizing**, which is the lesson the logistics-defense games teach most clearly: when **the supply chain itself is what gets attacked and defended**, the routing and throughput problems already in play become the combat, and nothing has to be grafted on." |
| PULL OUT, and the push-or-retreat call | ON, NEW | `[TEETH]`: "which makes **the push-or-retreat call the core decision of the whole mode**"; the anti-spiral, "a decided loss never becomes a long doomed grind"; `[MDB]` 1.20 names the verb for this layer — "**a clean concede** and a swing objective" |
| The return as the risk window | ON | `[TEETH]`: "**the return trip is where the risk lives** … Coming home, a player carries the haul and has the most to lose" |
| Rail Warden holds a car; Marksman reaches across a coupling; Ranger reads; Engineer repairs | ON | `crewTypes[*]` verbatim — Wardens "**absorb danger on convoy runs**", Gunners "Defend railcars and **punish exposed raiders**", Rangers "**Reveal ambushes**", Sappers "**Combat engineers … stabilize damaged spans**". Reach from `/convoy-stop/`'s `GUN_ACROSS` 1.28. **Capacity 2 for the Marksman is measured, not cited, and says so** |
| The crew names on the board's face | ON | RULED — David 2026-08-27, carried by `docs/cfd-201-beat.md`'s named ruling: Rail Warden, Ranger, Marksman, Engineer, with pack ids in the numbers |
| The adjacent wave | ON, NEW | **RULED — David, 2026-08-27**: "fix the marksman with the adjacent wave." The shape is argued from the group's own name — Boarders board, and a coupling is what they board across |
| The Engineer as repairer rather than wall-builder | ON, NEW | `crewTypes[sappers]`, `power.repair` 4, "stabilize damaged spans" — and David's own 2026-08-27 damage ruling is what created the job. **This supersedes his 2026-08-26 seam's "a wall and an obstacle"**, which the first draft already flagged as resting on the ruling alone: `[WB]`'s only "obstacle" is broken track a sapper *repairs*, and the corpus has no player-placed walls or barricades anywhere. Measured besides: as a placer of two pieces the Engineer was never the correct purchase in 64 configurations. **Named for David, not assumed** |
| The storm live in the yard | ON, NEW | The re-base requires it. Its cadence is CFD-201's own — "every turn spent under a storm draws the ground one step" — applied to the load. Its cover is `ROUTE_EVENTS[fog-bank]` ("**Scouts** reduce ambush odds and route confusion") and `ROUTE_EVENTS[raider-scouts]` ("Wardens and **Rangers** matter on exposed Rustfall sidings") |
| Rustfall's pay rising in a storm | REFUSED, argued | CFD-201's own named trap — risk-up plus reward-up cancelling to a wash — is unavoidable here because the route's difficulty and its pay are one quantity. **The one inherited rule this board declines, flagged** |
| Raiders as the pressure at Rustfall | ON | `routes[rustfall-yard].tags` — `"raiders"`; `COMBAT_SCENARIOS[rustfall-security-charter]`, route- and mission-gated to include `convoy`; `[WB]` — "Raider crews (the Tollmen and similar) … Demand tolls, attempt to take cargo. **The reason escorts and wardens matter.**" **Weakness named, twice:** `[MDB]` 1.21 is locked as "**The cold is the only hazard, in five forms**" and raiders are not among them; and `[WILD]`'s stand-in doctrine that supplies NPC attackers — "**a defense wants attackers** … a stand-in raider reading as a Cinderborn outlaw" — is written for the contested deep, while Rustfall is a near-map Chartered route. The reconciliation is `[MDB]` 1.12's own: raiders are **pressure on the routing problem**, engaged through the logistics grammar, never a hazard class of their own |
| Raiders are turned, never killed | ON | `[WB]` — "The world should never tip into a **war fantasy**"; "Framed as **rivalry and risk, not war**". `[MDB]` 1.12 — "never cruelty" |
| Crew always home; the Sunlark never lost | ON, INHERITED | `resolveDispatch` — `addCrew` on **both** branches, kept by the passed board. `[WB]`, from the hero who owns convoy defense: "**Stay in formation. We bring everyone home.**" |
| The Tollmen's toll paid in cargo | REFUSED, named | Canon-backed and deliberately held: `[WB]`'s "**Pay**, fight through, reroute, or cut a deal", `[TEETH]`'s "**jettison weight**", `[CONF]`'s "**partial loss rather than full loot**". A verb that resolves a wave without a placement would hollow out the tier's first outing |
| `missions[raid]` | REFUSED | `missions[convoy].rewardMultiplier` = 1 leaves `route.rewards` untouched, and the mission is getting the load home. `[MDB]` 1.20 splits them by name — "offense as the raid and **defense as the stand**" |
| Heroes; postures; events; safety; damage loop; insurance; discovery; contracts | REFUSED, INHERITED | Carried from both parents; every term zero by its own refusal |
| Goods as nouns, at the manifest only | ON, flagged | Cars are named for what they carry because the manifest is now the stake and a nameless stake cannot be argued about; every one is priced in **marks**. Conversion by `economyConfig.resourceValues`. **The closest this lineage has come to the line, flagged rather than slipped** |
| The dormant Standfast crane | REFUSED, named | `[WB]`'s own hook for this yard: "reclaim the yard, secure a parts supply, and **contend with a dormant maintenance crane**" — "Repair it, reroute it, or disable it. **Orin prefers reclaiming it.**" `[CONF]` 1.9's reclaim-preferred economy makes it a whole system |
| End-sentences at every terminal | ON | The process rule from the broken sit, and a deliberate departure: `/convoy-stop/` prints **zero sentences** — a lost car returns the player silently to the chooser |

---

## Author's argued alternatives

**1. Port the combat engine, replacing the clock with a turn counter.** Rejected
on the engine's own text: strip the clock and what is left is `health` /
`maxHealth` on every group, a pressure scalar that only falls, four 0–100
progress objectives — a health-bar game, which `[CONF]` refuses in the same
paragraph that prescribes the alternative. The engine also has **no enemy**: no
AI, no schedule, no wave. What survives the transfer is taken: the shape (orders
then resolution), the ordering (three hostile groups, by strength), the names,
the gradient as a leg distinct from the consolation, and the stand-down's
scoring.

**2. Rustfall as a wave-defense board in `/convoy-stop/`'s image.** Rejected on
the clock — that board is a `requestAnimationFrame` loop whose tactics *are*
continuous space and millisecond cooldowns — and on scope. Taken from it: the
phase order, the threat forecast drawn on the lanes it will hit, fixed tables
with no RNG, the slow/kill/redirect taxonomy, and the offline solvability
practice its `sim.js` invented after an impossible table shipped.

**3. The adjacent-wave fix, taken and corrected.** The proposal put to David was
"two raiders on two ADJACENT cars, where one Marksman does what two Wardens
would." **The shape is right and ships. The stated mechanism did not work as
drafted**, and this is recorded because the ruling was made on it: under the
first draft's rules a Marksman turned *one* raider a push, so two raiders on two
adjacent cars would have cost it a car exactly as a Warden would, and the wave
shape alone would have changed nothing. **The wave shape and the capacity change
are one fix, not two**, and neither works without the other — the shape gives
reach something to reach for, the capacity lets it arrive. Both are in, and the
measurement above is what says the pair works.

**4. Fixing the Marksman by price instead of by wave.** Considered and rejected
before the ruling closed it: at capacity 1 the Marksman is dominated by the
Warden at *every* price down to 1 mark, because reach buys nothing under a full
forecast. **A dead control is not a pricing problem.** Recorded because it is the
obvious first move and it is measurably wrong.

**5. Hiding the wave forecast to make reach pay.** The clean way to make reach
valuable is uncertainty, and hiding the distribution would do it in one line.
Rejected: it is a second new system (concealment), it fights `[ECON]`'s
legibility rule and `[TEETH]`'s two-reads requirement, and it would put a control
on the board — the Ranger — whose whole value is removing a difficulty the beat
had just added. **The storm supplies the only concealment on this board, it
arrives inherited, and it is bounded to one raider a push.**

**6. Escalating raider grades — Scouts answerable by anyone, Boarders only by a
Warden, Scrap Gunners only by a Marksman.** It would give `strength` 18 / 20 / 24
a mechanical job. Rejected because it forces the roster instead of rewarding it:
a run without a Marksman would be unwinnable at push 3 regardless of placement,
which is the doomed grind `[TEETH]`'s anti-spiral exists to prevent. Named so it
is not re-invented — it is the obvious knob if the shipped tuning comes back too
easy.

**7. Cut a car loose — pay the Tollmen their toll.** `[WB]` names Pay first among
four resolutions, `[TEETH]` names "jettison weight", `[CONF]`'s humane-raiding
toolkit is partial loss rather than full loot, and it would put the stakes dial
in the player's own hand at every push. Rejected for this sitting alone: it is
the tier's first outing and its job is to establish that **placement decides the
run.** A verb that resolves a wave without any placement could make the first sit
answer *what happened* with "I paid them." Strongest candidate for the sitting
after this one, and it needs no new derivation.

**8. TRIM offered at Rustfall.** Rejected on arithmetic: with no storm premium at
Rustfall to forfeit, TRIM would cost one provision and buy the whole sky, where
on Cloud Basin it costs a provision and six marks. That is the effective immunity
CFD-201 names as the weather unit's trap. The Ranger's yard job — seeing what the
weather covers, not stopping what it does — is the same idea at the right price.

---

## Open questions for David

Four, each answerable in a sentence.

1. **The Engineer's job changed.** Your 2026-08-26 seam said "an engineer, a wall
   and an obstacle." Your 2026-08-27 damage ruling created a better job for it —
   repair — which is what its pack entry always said it did, and measured, the
   wall-and-obstacle version was never worth buying in 64 configurations. I
   shipped repair. Right call, or do you want the wall back?

2. **The storm does not raise Rustfall's pay**, where it raises Cloud Basin's
   from 18 to 24. The reason is that at Rustfall the difficulty and the pay are
   the same quantity, so paying more per car while the storm eats the cars is the
   wash you were already warned about. Accept the asymmetry?

3. **The Engineer is the storm crew and the sitting stops on the first Rustfall
   run** — so a player who reaches the yard in clear weather may never need one.
   Leave it, or should the stop be the first Rustfall run *in a storm*?

4. **The stop, unchanged from the first draft.** First Rustfall run off the yard
   road, loaded or empty, so even a bad first run is a complete sitting. Or
   should an empty run let you try again before the sitting ends?

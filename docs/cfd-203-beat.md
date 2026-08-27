# CFD-203 — the join sitting (provisions off the terrace)

The first cumulative board, re-aimed. `/dawnspur-dispatch/`'s desk and
`/dawnspur-scale/`'s terrace on one town, with **the connection between them as
the single new system**: a send eats what the ground grew.

**RULED — David, 2026-08-27**, overturning the PM's deferral and this author's own
rejection. `docs/mechanisms-recommitted.md` §7.1, verbatim:

> "3 (provisions off the terrace) is the one that matters and I think the
> deferral is wrong. Everything else here is tuning a board where two economies
> share a purse. This is the item that makes them one game. … Note what the
> analysis admits: it's a better game than what ships. If the sitting's purpose is
> to test whether the two loops combine, shipping without the thing that combines
> them tests the wrong question. **I'd swap it in for weather rather than stacking
> it on top.**"

He chose **SWAP**, not stack. So §7's kept half is untouched — one new system, and
it is the join. **Weather defers whole** to the storm sitting, with
`docs/cfd-201-beat.md` held as that sitting's beat and three of its rulings
travelling with it (§7.1.3).

Card: CFD-203. **NOT SIGNED.** Awaiting PM citation review, then David.

---

## What this beat inherits from CFD-201, and does not re-derive

Four things in the 993-line weather beat were **join** properties, not weather
properties. They carry, cited to that beat, and are re-measured here rather than
re-argued:

1. **The fiction join.** One town: the terrace above, the switchyard desk below.
   That was CFD-201's answer to §7's cost 2 and it is unchanged — it never had
   anything to do with the sky.
2. **Two vehicles.** The line train works the routes and can be in one place; the
   terrace shuttle works the ground off A and is the town's own hands. Cited to
   `buildings[switchyard].description` — *"Dispatches trains, **adds scheduling
   capacity**, and keeps cargo moving."* **This is now load-bearing for a second
   reason** and is re-verified in Does below.
3. **The wallet finding.** One Mosswake cargo pays 14 and the whole greenhouse
   ladder costs 12, so on a joined board marks stop being the binding constraint
   and **turns become it**. CFD-201 used that to price TEND honestly; this board
   is built on it.
4. **Seam 2.** CFD-183's `!topped()` guard on CARRY and TEND was its *terminal*
   rule, not a carry rule, and re-attaches to whatever the new board's stop is.

---

## Seat

Beat only. No implement. No deploy. No merge. Do not touch `public/dawnspur`,
`public/dawnspur-heat`, `public/dawnspur-scale`, `public/dawnspur-dispatch`, or
`public/convoy-stop`. Do not `workflow_dispatch`.

Pins are the live boards, never `main`. Re-measured at authoring,
`git show HEAD:public/<p>/sim.js | sha256sum`, at boards `d245131`:

| board | sim sha256 (first 8) | index sha256 (first 8) |
| --- | --- | --- |
| `/dawnspur-dispatch/` | `576ce2b6` | `31aead60` |
| `/dawnspur-scale/` | `953368a1` | `5d2f452f` |
| `/dawnspur-heat/` | `292d6645` | — |
| `/dawnspur/` (the preserved kill) | `395c18f2` | — |
| `/convoy-stop/` | `5ad814e6` | — |

**The new board lands at `/dawnspur-line/`.** Argued: it is Dawnspur's board, and
the system being sat is not a place or a hazard but the **line between the ground
and the train** — what the terrace grows going out on the rail. Not
`/dawnspur-storm/`: that path belongs to CFD-201's beat and must stay unclaimed,
because CFD-200 has already re-based onto it once and a name used twice is the
lineage fork this project just closed. Not `/dawnspur-join/`: the board is the
town, not the commit.

**CFD-200's parent moves a third time**, and §7.1.4 already records the general
rule — *the parent is the last passed board, named at signature rather than
assumed at drafting*. Its Seat says `/dawnspur-storm/`; it re-bases onto
`/dawnspur-line/`, and the terrace, its reserve and the greenhouse arrive there
without weather. Flagged for the PM, not for David.

David sits first. Ask: What happened.

---

## Named rulings that travel

**The stop — David, 2026-08-27, ruling 5 minus its storm clause.**

> "Topping the terrace arms the ending, a storm cargo triggers it. That kills the
> accidental-ending risk and makes the terrace pay off on its own terms without
> the builder skipping the point."

With weather deferred the trigger is **a Chartered cargo home**. Topping the
terrace **arms**; the Chartered cargo **fires**. §7.2 records this arming shape as
what makes sitting length opt-in, so it is canon now and not one board's choice.

**MOSSWAKE +3 is CUT** — David, 2026-08-27: *"cutting redundant is cheaper than
renaming colliding."* The precondition he attached is the two-vehicle claim, and
it is verified below rather than assumed.

**Sitting length — §7.2.** Longer is legitimate when the player opted in, and a
quick path must exist and be **honest**: if the short route is a worse deal than
the long one, the player did not opt in, they were priced in. Measured in The
numbers, and it passes in the strongest direction — the short route is the
*better* deal.

**Crew names.** Rail Warden / Ranger / Marksman / Engineer on the face, pack ids in
the provenance. Only the Rail Warden musters this sitting.

---

## The design, derived — and the second half of it is forced

### The conversion is not a conversion

Today the stake is stated in two nouns and paid in one. CFD-196's own text:
*"Provisions 3, and the Chartered line toll of 1 on top
(`routeTolls.chartered.flatFee`), labeled as the civic fee it is."* Provisions and
the toll were always different things; both came off the marks line because there
was nothing else to take them from.

**So the number was always right and only the unit was wrong.** Provisions 0 / 2 /
3 stay 0 / 2 / 3 and are now denominated in food off the terrace. The toll stays 1
and stays marks, because a toll is a civic fee and R1 names it as one. **Not one
figure moves**, and the standing Kill line — `3 / 2 / 3+1 / 10 / 14 / 18 / 0.036`
do not move — is honoured literally.

### The carry can no longer pay marks, and that is arithmetic, not taste

The obvious cheaper design is to leave CARRY exactly as it shipped — paying marks
by the level — and have a send draw its provisions straight off the reserve. One
quantity, no new stock, minimal diff. **It mints money from nothing and it is
measured:**

```
TEND   -1 mark, +1 ground step        (CFD-183, unchanged)
CARRY  +level marks, -1 ground step   (CFD-183, unchanged)
-----------------------------------------------------------
net    +(level - 1) marks per 2 turns, ground unchanged, repeatable forever

  level 1: +0    level 2: +1    level 3: +2    level 4: +3
```

Unbounded above level 1, with no sink and no ceiling. This is the exact class of
defect the house already carries a standing warning about — a function that mints
currency from nothing and passes the whole suite green — and it is why
`tests/economy-conservation.test.mjs` exists in the parent repository.

CFD-183 was safe from it because on that board tending bought nothing operational:
the carry pays full at every reserve, so a step of ground was never worth a mark.
**The moment provisions come off the ground, a step of ground becomes worth
marks, and the pump opens.**

**Therefore: the terrace pays goods and the line pays money.** CARRY yields food,
not marks. That is not a second decision layered on the first — it is the first
decision's only consistent completion, and it is R10 said plainly: *"A load can be
profit, **goods moved for marks**"* is the route; the terrace is the ground that
makes the goods.

### The reserve and the food are two quantities, one substance, two places

This is the sharpest question in the brief and it has a clean answer.

**The reserve is the crop standing on the terrace** — 0 to 4, five graded greens,
no gauge, unchanged from CFD-183 in every respect. **Food is the crop brought down
and standing in the stores at the desk.** The carry is the only move between them,
and **the greenhouse level is the multiplier: one step of ground becomes `level`
food.**

Not one quantity, for two measured reasons:

- If the reserve *is* the food, the carry has nothing to do and the pump above
  opens.
- If the reserve *is* the food, TEND buys provisions directly for marks at 1 mark
  a unit, which re-collapses the wallet the join exists to un-collapse, and the
  greenhouse level multiplies nothing — UP would have no reach past its own
  yield figure.

Not a second currency, and each clause is a Kill line:

1. Food buys exactly one thing: the provisions leg of a send.
2. There is no exchange in either direction — no sell, no market, no broker, no
   conversion control, and no single commit that trades food for marks.
3. Food has one source: the carry.
4. Food is never a HUD figure beside marks; it is read as the stores on the
   platform.
5. Food never pays a toll, a muster, an UP or a tend.

R1 is satisfied *literally*, in its own words — **never the same sink.** Marks and
food do not share one sink anywhere on the board.

### The level-1 identity, which is the whole citation

At greenhouse level 1, one step of ground yields one food, and TEND restores one
step for one mark. `economyConfig.resourceValues.food` is **1** — the pack's own
statement that one food is one mark-equivalent. Three inherited numbers, from two
different beats, agree:

| route | ground steps per run | marks to put the ground back | passed board's marks price |
| --- | --- | --- | --- |
| Dawnspur Halt | 0.00 | 0.00 | **0** |
| Mosswake Loop | 2.00 | 2.00 | **2** |
| Cloud Basin Span | 3.00 | 3 + 1 toll = 4.00 | **4** |

**At greenhouse level 1 this board is economically identical to the passed board.**
Nothing was re-priced; the unit moved and the price stayed. That is the anchor, and
it is measured rather than designed — CFD-183 carried the level-1 yield of +1 from
play, and `resourceValues.food = 1` is the identity element of the table CFD-196
converted through.

And the ladder is what buys the discount:

| | L1 | L2 | L3 | L4 |
| --- | --- | --- | --- | --- |
| Mosswake — ground steps per run | 2.00 | 1.00 | 0.67 | **0.50** |
| Cloud Basin — ground steps per run | 3.00 | 1.50 | 1.00 | **0.75** |
| Cloud Basin — marks if fully tended back | 4.00 | 2.50 | 2.00 | **1.75** |

**At level 1 a Chartered run costs three-quarters of your ground. At level 4 it
costs a quarter. That is what the greenhouse is for**, and it is the first time
UP's price has bought anything that reaches the desk.

---

## Does

**One town, two halves that now need each other.** The terrace grows the food; the
food provisions the sends; the sends pay the marks; the marks build the terrace and
muster the crew. Neither half closes on its own: **marks come only off the line,
and provisions come only off the ground.**

### The desk

Inherited whole from `/dawnspur-dispatch/` and its two amendments: three sendable
routes and Rustfall dark; the muster slider on the card ground with its armed
re-quote and both fences; the charter condition; SEND commits and MEET resolves;
honest dice at the stated percent, stamped at the send; a failed run pays zero;
nothing refunds in any direction; the crew always comes home on both branches; the
whole roster rides every send; the free halt always lit.

Exactly one thing changes, and it is the sitting:

- **A send's provisions come out of the stores, not the wallet.** Halt 0, Mosswake
  2, Cloud Basin 3. The Chartered toll of 1 stays marks and stays labeled as the
  civic fee it is. A send is lit only when the stores can pay its provisions and
  the wallet can pay its toll.
- **A run that turns back loses the food.** The haul committed to the run is now,
  for the first time on any board, the crop the player grew, carried down and
  loaded. R6 is unchanged and the loss finally has a history.

Odds, pays, stakes, the charter, the roster and the dice are untouched. The cards
still quote 68 / 64 / 51 at a bare roster.

### The terrace

Inherited whole from `/dawnspur-scale/`: the greenhouse at level 1, top at 4; UP at
3, then 4, then 5 marks, instant, no way back; TEND spends 1 mark, earns nothing,
gives the ground back one step, lit only below full; the reserve 4 down to 0,
floored, drawn one step per carry, **paying full at every reserve, bare included,
and giving no sign**.

Exactly one thing changes, and it is forced:

- **CARRY brings food down to the stores instead of marks up to the wallet.** It
  lands the greenhouse's level, capped by what the stores can still hold, and it
  draws the ground one step. The carry's own label states the load it will actually
  land — CFD-183's rule that the button label is the meter, doing the work of a
  cap warning.

**The stores hold 4.** CARRY is dark when they are full, in the same grammar TEND
already uses for full ground.

### What the ground does not do this sitting, deliberately

**The reserve gates nothing.** The carry pays full at bare ground, exactly as it
shipped, so the ground never stops the player and TEND has no operational job on
this board. That is not an oversight and it is not fixable here:

- Giving the reserve a gate means changing CFD-183's kill — *"Carrying at low or
  bare reserve pays less, stops, warns, or alerts"* — which rests on Geology's
  *"rides fine for years on a falling reserve, in clear weather, and gives no
  sign."*
- The reckoning that scopes that sentence is the storm's, and §7.1.2 is explicit
  that `/dawnspur-scale/`'s weather promise *"now waits a second sitting"* and
  *"the join board must not contradict it."* Spending the storm's stake early —
  for the second time in three beats — is exactly the drift the amendment was
  written to stop.

So **TEND keeps precisely the job it had on the board that passed**: it holds the
line against a bill one sitting further out, and the terminal sentence reads the
ground it was left on. What changes is the pressure on it: **this board draws the
ground far harder than CFD-183 did**, because every provisioned send is paid for in
carries, so the weather bill handed forward is substantially larger than the scale
sitting's. That is the join working across sittings rather than inside one.

It is named as this board's known thin spot, and it is open question 2.

### Two vehicles, and the condition on the MOSSWAKE cut

The line train works the routes and can be in exactly one place. The terrace
shuttle works the ground off A. **While a line run is away, the terrace is lit** —
CARRY, TEND and UP stand beside MEET, so the away state has four live controls and
not one. The claim is not decorative here: David cut MOSSWAKE +3 *conditionally* on
the terrace having work while the train is out.

**Verified, and it is stronger on this board than it was on CFD-201's**: carrying
while a run is away is not merely available, it is the correct play, because the
stores must be refilled before the next send can go and the away turn is the only
free turn to do it in. **If the two-vehicle reading is refused, the MOSSWAKE cut
fails with it** and the beat says so rather than letting the cut stand on a claim
that has been withdrawn.

### The opening

Marks 3, greenhouse level 1, reserve 4 (full), **stores 0**, roster 0, train home,
nothing banked, the ending not armed.

Lit: **SEND DAWNSPUR HALT** (free, always), **CARRY** (free), **UP** (3), **MUSTER
WARDEN** (3). Dark, each naming its reason in the board's words: Mosswake (the
stores hold nothing and it wants 2), Cloud Basin (twice over — no charter, and the
stores hold nothing), TEND (the ground is full), Rustfall (raiders, in every
state).

Four controls, two of them free, and the float buys a Warden *or* the first
level and never both — Amendment 1's own test of the opening, still passing.
**The first frame's question is the board's whole thesis**: the spine wants two
from the stores and the stores are empty, so go up the hill or take the free hop.

### The stop

**Topping the terrace arms the ending. The next Chartered cargo home fires it.**

- Level 4 prints its own sentence when it lands, so the arming is never silent.
- A Chartered cargo banked before the terrace is topped is a good run and nothing
  more; the sitting continues.
- A turned-back Chartered run while armed is not an ending: the food and the toll
  die, the desk stands, the halt is still lit.

**You cannot end this sitting without the terrace, twice over**: level 4 arms it,
and three food from the ground fires it. That is the join being load-bearing for
the ending rather than decorative beside it.

Nothing moves with wall time, on either half. `wait()` stands, takes nothing, and
returns false, so calm can never read as a handled event — inherited from both
parents, unchanged.

---

## Sees

**The HUD keeps one line: marks. Nothing joins it.** That is inherited from the
dispatch board verbatim and it is the constraint that shapes everything below.

**The stores are four slots on the desk's own platform, filled or empty.** Physical
goods where goods sit, not a meter: no bar, no percentage, no numeral in the HUD.
They must be *countable exactly*, because a send needs an exact quantity and the
ground's five graded greens cannot answer "do I have three?" — so the read is
discrete objects and the distinction from a gauge is the one CFD-183 already drew.
Precedent for the reading is Amendment 1's own canon check on the muster ladder:
the ladder reports *"the player's own pending intent and the roster … no world
state is metered, and no hand but the player's moves it."* The stores are the
player's own crop, put there by the player's own carries.

**The terrace keeps its five graded greens and gains nothing.** Full lush down to
bare soil, no number and no bar, unchanged. The greenhouse grows at each level and
never shrinks. The level is read on the greenhouse, not in the HUD — which is how
Amendment 2's ruling settles the collision the join would otherwise have, since
CFD-183 put UP and its pips in a HUD the dispatch board keeps to one line.

**One stack, one grammar, two groups**, each labelled in the board's words, on the
cards' own ground per Amendment 2:

- **THE DESK** — MUSTER WARDEN (the slider, unchanged), the three sends, Rustfall
  dark.
- **THE TERRACE** — CARRY, TEND, UP.

Each sendable card states what it always stated, with the provisions leg re-worded
to the unit it now costs: *"3 from the stores · toll 1 · pays 18 · 51%."* A send
the stores cannot pay is dark and says which half is short. CARRY's face carries
the load it will land, so a carry into a nearly-full store reads as the smaller
number before it is pressed.

The away state is a state, not a motion picture, unchanged: platform empty, the
sent line marked, MEET the one lit verb at the desk — and the terrace's three verbs
lit beside it. The manifest now itemizes something real: *"2 Wardens ride with 3
from the terrace."*

Layout priority under pressure is inherited and still binds: scenery first, then
the sentence panels inside their cap, then the cards, which never shrink below
their own content and never hold vertical space they do not fill, at any viewport
from 280x480 to 412x732.

---

## Ends

Every commit that the join changes ends in a sentence.

**The arming, said out loud:**

> *"The terrace is topped. The next Chartered cargo home ends the sitting."*

**A send the stores cannot pay**, on the card rather than as an event: *"The stores
hold 1. Mosswake wants 2."*

**The run sentences** keep their inherited shapes and all four clauses on a
turned-back run — zero pay, stake spent and returned in no direction, everyone who
actually rode is home, the desk stands. What changes is that the stake now has a
provenance:

- *"The Wardens brought the Cloud Basin cargo home. The desk banks 18."*
- *"Wet rail through the Mosswake loop. The train turned for home with the haul
  unbanked. Two from the terrace and nothing comes back; the route paid nothing;
  the Wardens and the train are home, and the desk stands."*
- *"A shear in the near line short of the halt. The train turned for home with the
  haul unbanked. The free hop staked nothing and nothing comes back; the route paid
  nothing; the train is home, and the desk stands."*

**The terminal reads three things**: the desk's record, in the inherited two
registers keyed on `runsTurnedBack`; what the terrace put on the line; and the
ground it was left on.

> *"The Chartered cargo is home and the terrace is topped. Eleven runs out, eight
> cargoes banked, three turned back, 3 marks staked and lost on the way. **Fourteen
> from the terrace went out on the line.** The ground is bare: the reserve left
> here is still the weather's bill. The record keeps what came home; the line past
> the basin is the next sitting's."*

Ground registers, three, because the ground has three things to say:

- Full: *"The ground is full: everything the line ate was put back."*
- Drawn: *"The ground is drawn and standing."*
- Bare: *"The ground is bare: the reserve left here is still the weather's bill."*

The bare register carries `/dawnspur-scale/`'s outstanding promise forward without
firing it, which is what §7.1.2 requires of this board.

---

## On this sitting

**INHERITED** means it passed a sit and travels under §7 unchanged, cited to the
beat that passed it. **ON** means this sitting turns it on. **REFUSED** means it
does not exist here, and why.

| System | This sitting | From |
| --- | --- | --- |
| **Provisions drawn off the terrace as food** | **ON** — the single new system | new; RULED §7.1 |
| **CARRY pays food, not marks** | **ON** — forced by the pump, not chosen | new |
| **The greenhouse level as the ground-to-food multiplier** | **ON** | new |
| **The stores: 4 slots at the desk, CARRY dark at full** | **ON** | new |
| **A turned-back run loses the food** | **ON** — R6's haul, with a provenance | new |
| **Topping arms the ending; a Chartered cargo fires it** | **ON** | RULED, David 2026-08-27; §7.2 |
| The dispatch loop: pick, muster, send, meet | INHERITED | CFD-196, passed |
| Honest dice, one instrument, stamped at SEND | INHERITED | CFD-196, passed |
| baseRisks 0.08 / 0.12 / 0.25; pays 10 / 14 / 18; provisions 0 / 2 / 3; toll 1; 0.036 a Warden | INHERITED, **unmoved** | CFD-196, passed |
| The Chartered toll, in marks, labeled civic | INHERITED | CFD-196, passed; R1 |
| Rustfall on the map, dark, no odds | INHERITED | CFD-196, passed |
| Rail Wardens: 3 marks, cap 4, permanent, whole roster rides, always come home | INHERITED | CFD-196, passed |
| The muster slider, armed re-quote, both fences | INHERITED | CFD-196 Amendment 2, passed |
| The charter condition | INHERITED | CFD-196 Amendment 1, passed |
| The opening float of 3 marks | INHERITED | CFD-196 Amendment 1, passed |
| Failure pays zero; crew and train home; home untouched | INHERITED | CFD-196, passed; CFD-145; R6 |
| The away run never sours | INHERITED | CFD-196, passed; R4 |
| The free halt, always lit, no reachable state dark | INHERITED | CFD-196, passed; §7.2's quick path |
| Greenhouse levels 1..4; UP 3 / 4 / 5, instant, no way back | INHERITED | CFD-183, passed |
| The reserve 4..0, drawn one per carry, five graded greens, no gauge | INHERITED | CFD-183, passed |
| Full carry yield at every reserve, bare included, no sign | INHERITED, **untouched** | CFD-183, passed |
| TEND: 1 mark, earns nothing, one step back, lit below full | INHERITED — with its payoff one sitting out, named | CFD-183, passed |
| CARRY / TEND lit past a topped terrace | re-expressed (Seam 2, CFD-201) | CFD-183, passed |
| `wait()` inert, returning false | INHERITED | both parents |
| Keel-fire bank, hearth | INHERITED as scenery; every heat verb REFUSED | CFD-176, passed |
| MOSSWAKE +3 | **REFUSED** — CUT, David 2026-08-27; precondition verified in Does | CFD-183, passed |
| **Weather, the sky, the storm, the stormbird** | **REFUSED, whole** — swapped out by §7.1; `docs/cfd-201-beat.md` is the storm sitting's beat | — |
| The Ranger and the trim | **REFUSED** — §7.1.3: its ruling travels with the storm | — |
| Marksman / Engineer | REFUSED — CFD-200's, priced 5 and 6 | — |
| The defense instance, the yard | REFUSED — CFD-200's whole subject | — |
| Materials, energy, parts, favor as nouns | **REFUSED** — the standing refusal is lifted for **one** noun, food, and only at the provisions leg | both parents |
| Routes paying food | **REFUSED** — a route that paid food would make the terrace optional and the join decorative | — |
| Crew rations, or any second food sink | REFUSED — a second sink is a second system, and it is what would make food a currency | — |
| Selling, converting, or brokering food | REFUSED — one commit trading food for marks is the Kill line that keeps food from being money | R1 |
| A warehouse, or any store-cap purchase | REFUSED — `buildings[warehouse]` is off this board; its sitting owns the caps | — |
| Insurance, postures, heroes, missions beyond convoy, safety accrual, train damage, route events | REFUSED, unchanged | CFD-196 |
| Refund, sell-back, un-recruit, recovered stake as payout | REFUSED | CFD-145 |
| Anything moving with wall time | REFUSED | R4, R8 |
| Reading or writing another board's persisted state | REFUSED — the lineage lock | §7 |
| HUD | INHERITED — one line, marks | both parents |
| End-sentences, per-commit and terminal | INHERITED and extended — the terminal reads desk, terrace and ground | both parents |

---

## Kill

Every line testable, red-first. Interaction lines are marked, because §7's cost 4
says attribution weakens on a cumulative board and the Kill list is the mitigation.

**Food, and the wall between it and money**

- Food is spent on anything but the provisions leg of a send.
- Any single commit exchanges food for marks or marks for food. A sell, market,
  broker, convert, or salvage path appears.
- A send's provisions are paid in marks; or the Chartered toll is paid in food.
- A muster, an UP, or a tend costs food.
- Any route pays food; the terrace pays marks.
- Food decays, spoils, expires, or changes on any schedule, at any reserve, in any
  absence.
- The stores exceed 4, go negative, or change outside a carry or a send.
- The stores render as a bar, a meter, a percentage, or a HUD line.
- The HUD grows past the one marks line.

**The carry, and the ground**

- *(interaction)* A carry yields anything but the greenhouse level, capped by what
  the stores can still hold.
- The carry's stated load is anything but what the carry lands.
- CARRY is lit when the stores are full.
- A carry draws anything but exactly one step of ground, or draws below 0.
- *(interaction)* **A carry pays less, stops, warns, or alerts at low or bare
  reserve.** The reserve caps, gates, or changes any carry's yield.
- A reserve number, bar, pip row, meter or icon appears anywhere.
- The ground moves without a commit — across a reload, a blur, or any absence.
- A level is lost. The greenhouse shrinks, dies, or shows a dead state.
- TEND earns marks or food, restores more than one step, or lights on full ground.
- UP is free, its price does not climb, or UP rides a train.

**The sends**

- A send is lit when the stores cannot pay its provisions or the wallet cannot pay
  its toll.
- The stated percent and the rolled threshold disagree anywhere. The roll happens
  at SEND. A run resolves without MEET. Any outcome is scripted.
- Odds move by anything but baseRisk and the roster.
- A failed run pays any fraction of the route reward, or returns any food.
- A stake, toll, muster, tend or level refunds, in any branch, any direction.
- Any crew member fails to come home on either branch.
- `canSend("cloud-basin-span")` returns true while `cargoesBanked === 0`.
- A second line run goes out while one is out.
- Rustfall sends, quotes odds, rolls dice, or opens anything.
- MUSTER lights while the roster rides, or the slider is interactive while away or
  stopped.

**The join itself**

- *(interaction)* Any terrace verb goes dark because a line run is away. **This is
  the condition the MOSSWAKE cut rests on.**
- *(interaction)* A line verb goes dark because the terrace is busy.
- MOSSWAKE +3, or any second Mosswake, appears.
- Marks are earned anywhere but a route's payout. Food is produced anywhere but a
  carry.

**States, sentences, and the stop**

- A reachable state has no lit control. *(The standing unpause assertion, satisfied
  more strongly here: the free halt and the carry are lit at every balance and
  every reserve.)*
- The opening mints anything but marks 3 / level 1 / reserve 4 / stores 0 / roster
  0 / train home / nothing banked / not armed; or the opening's lit set is anything
  but the halt, CARRY, UP and MUSTER; or the opening's cards quote anything but
  68 / 64 / 51.
- The opening balance or opening stores are settable from anything a player can
  reach. The suite may set them; the board may not.
- The ending arms on anything but the greenhouse reaching level 4, or arms without
  its sentence.
- The sitting stops on a Chartered cargo banked while unarmed, or fails to stop on
  one banked while armed, or stops on topping alone.
- `3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 / UP 3 / 4 / 5 / TEND 1 / reserve depth 4 /
  roster cap 4` move.
- A run or the sitting ends without its sentence; a turned-back sentence drops
  zero-pay, stake-spent, crew-home or desk-stands, or names a crew that did not
  ride; the terminal does not read the record, what the terrace sent, and the
  ground, in three ground registers.
- Any weather, sky, storm, stormbird, or forecast appears. A Ranger, Marksman or
  Engineer is musterable.
- Live shas are overwritten (`576ce2b6`, `953368a1`, `292d6645`, `395c18f2`,
  `5ad814e6`). Any existing board's bytes are touched. This board reads or writes
  any other board's persisted state.

---

## The numbers, and where each one comes from

### Cited

- **Provisions 0 / 2 / 3 and the toll of 1.** `docs/cfd-196-beat.md`, passed —
  provisions new-play there and flagged there, the toll verbatim from
  `routeTolls.chartered.flatFee`. **Neither figure moves; only the provisions
  leg's unit does.**
- **`economyConfig.resourceValues.food` = 1.** The pack's own exchange table, and
  the identity element of it. One food is one mark-equivalent, which is what makes
  the level-1 board price-identical to the passed board.
- **The greenhouse's product is food.** `buildings[greenhouse]` — *"Produces food
  and medicine from restored sunlit terraces"*, `production: { food: 18 }`,
  `unlocks: ["food production"]`.
- **The greenhouse has no store of its own.** `buildings[greenhouse]` carries no
  `storage` field, unlike `central-station`, `switchyard`, `warehouse` and
  `waterworks`. So the stores are the desk's, not the terrace's, which is where
  Sees puts them.
- **Overflow going to waste is the pack's own rule, and it names its owner.**
  `buildings[warehouse].description` — *"Tend before you spend: raises storage
  caps, and **keeps returning cargo from going to waste**."* The Warehouse is off
  this board, so this town's stores are the platform's own and small.
- **Everything else inherited.** baseRisks, the success formula, pays 10 / 14 / 18,
  MUSTER 3, UP 3 / 4 / 5, TEND 1, the carry's +1..+4, reserve depth 4, roster cap
  4 — all provenanced in `docs/cfd-196-beat.md` and `docs/cfd-183-beat.md`, all
  unmoved.

### New-play, flagged

- **The stores cap of 4.** No civic-scale figure supports 4: `BASE_STORAGE.food` is
  **120**, which over the civic scale factor 6.5 is 18.5 — a cap for a town that
  has a Warehouse, which this one does not. Reported as the honest null and argued
  instead, on the same mirror-anchor CFD-183 used for the reserve's own depth
  (*"depth 4 mirrors maxLevel 4, so the ground can be drawn as far as the
  greenhouse can climb"*): **stores 4 = reserve depth 4 = maxLevel 4**, so one
  carry from a topped greenhouse exactly fills the stores, and at level 1 filling
  them costs the entire ground. David plays it before it is canon.
- **The opening stores of 0.** Argued below under the fixture question, where it
  earns something the float could not.

### The impurity, disclosed rather than hidden

Three inherited marks figures were derived from resource baskets that **contain
food**: the route pays (Cloud Basin's basket includes food 14), MUSTER 3
(`crewTypes[wardens].baseCost` includes food 8), and UP's cost basis. This sitting
lifts food out of **one** place only — the provisions leg — and leaves those three
as marks. **So the board double-counts food at the margin**, and it is named here
rather than discovered later. It resolves when goods-as-nouns lands whole, which is
its own sitting. The alternative — re-deriving all three — moves inherited numbers
that a standing Kill line freezes.

### §7.2's honesty test, measured

*"If the board's short route is a worse deal than the long one, the player did not
opt in; they were priced in."* Marks per turn, the free halt against the terrace
lines, at every roster:

| roster | halt (free) | terrace at L1 | L2 | L3 | L4 |
| --- | --- | --- | --- | --- | --- |
| bare | **3.400** | 2.240 | 2.987 | 3.360 | 3.584 |
| 2 Wardens | **3.760** | 2.492 | 3.323 | 3.738 | 3.987 |
| 4 Wardens | **4.120** | 2.744 | 3.659 | 4.116 | 4.390 |

*(Terrace line = one carry, then Mosswake sends off it, spare food banked; the
halt line = send and meet, nothing staked.)*

**The quick path is the better deal at every roster up to greenhouse level 3, and
is beaten only at level 4** — by 5.4% bare, 6.0% at two Wardens, 6.6% at four. So
§7.2 passes in the strongest direction available: nobody is priced into the long
sitting, and the terrace's investment breaks even exactly where the ending arms.
The long sitting's payoff is the sitting — more runs, a full roster, a held ground
and a better closing sentence — which is what "a diversity of sits" asks for.

**Said plainly, because it is the risk:** halt-spam followed by three UPs is the
fastest line to the stop, and a player who takes it sees one carry and no tend.
That is §7.2 working as written, and it is open question 3.

### The quick path, walked

Every step is a lit control in the state before it:

```
opening                                   marks 3  level 1  reserve 4  stores 0
t1  SEND DAWNSPUR HALT   (0 provisions)   marks 3
t2  MEET, home paid      (+10, charter)   marks 13
t3  UP                   (-3)             marks 10  level 2
t4  UP                   (-4)             marks 6   level 3
t5  UP                   (-5)             marks 1   level 4   ** ARMED **
t6  CARRY                (+4, ground -1)  marks 1   reserve 3  stores 4
t7  SEND CLOUD BASIN     (3 stores, 1 toll) marks 0            stores 1
t8  MEET, home paid      (+18)            marks 18             ** STOP **
```

**Eight turns.** The exact line requires two wins at 68.0% and 51.0% — **34.7%** —
and both routes remain available on failure, so the quick path is short but not
cheap. The long path is unbounded by the player's own choice, which is the whole
point of the arming stop.

### The fixture question, asked and answered

*Is every state this beat's arithmetic describes reachable from the opening by
play?*

**Yes, and the opening stores of 0 is why.** CFD-196 Amendment 1 retired that claim
because the minted odd float broke parity; CFD-201 restored it because its carry
minted odd marks. **On this board the carry no longer mints marks**, so the claim
had to be re-earned, and it is earned by refusing to mint anything else:

- Opening with **stores 2** would light Mosswake at frame one and preserve
  CFD-196's inherited lit-set Kill line exactly. It was rejected: `reserve 4` with
  `stores > 0` **is not reachable by play**, because every carry draws a step, so
  a minted opening store would put the board off its own lattice for the second
  time in three beats.
- With stores 0, every state is reachable. Marks: from the float of 3, TEND's odd
  −1 (available after one carry) reaches 2, 1 and 0, and the routes' +10 / +14 /
  +18 reach upward from any of them, so every non-negative mark count is reachable
  at any roster. Stores 0..4: carries. Reserve 0..4: carries and tends. Level
  1..4: UP. Reserve 0 at level 4, stores full at reserve 0, the armed state, the
  stop: all reached in the walked path above or by extending it.
- **The cost is one inherited Kill line re-expressed**: the opening's lit set was
  `["dawnspur-halt", "mosswake-loop"]` and is now the halt, CARRY, UP and MUSTER.
  That line was written for a board with no stores; a joined board whose new system
  is visible in frame one is not the defect it was protecting against. Re-expressed
  in the Kill list above, not deleted.

### Sitting length

**Estimate, with no instrument, so it is flagged as one.** The quick path is 8
turns and lands in 12 to 15 with ordinary dice. A player who musters, runs the
spine, tends the ground and tops out will land between 25 and 40 commits. **The
range is the design**, per §7.2: the arming stop is what puts the choice in the
player's hands, and the free halt is what keeps the short end honest.

---

## Canon check

Per §6.1: every mechanism ON, INHERITED or REFUSED, with the rule or source line it
rests on. Inherited rows cite the beat that passed them, per §7.

| Row | State | Rests on |
| --- | --- | --- |
| The join as the one new system | ON | §7.1 RULED — David 2026-08-27, verbatim: "This is the item that makes them one game … I'd swap it in for weather rather than stacking it on top." §7's KEPT half untouched: one new system, and it is this one |
| Provisions as food off the terrace | ON | R10 — "A load can be **profit, goods moved for marks**"; `buildings[greenhouse]` — "Produces food … from restored sunlit terraces", `production: { food: 18 }`; `routes[*].rewards` are goods baskets, not marks, so goods-as-cargo is the pack's own shape |
| The provisions figures unmoved | ON | CFD-196's own split — "Provisions 3, and the Chartered line toll of 1 on top … labeled as the civic fee it is". The nouns were always separate; only the payment was joint |
| The toll stays marks | ON | R1 — marks' sinks are civic and labeled, and the list names "**the route toll**" verbatim; `routeTolls.chartered.flatFee` = 1 |
| CARRY pays food, not marks | ON, **forced** | Measured: TEND then CARRY mints `level − 1` marks per two turns with the ground unchanged, unbounded above level 1. R1's structural half — marks and food never share a sink — is what closes it |
| Food is not a currency | ON, five testable clauses | R1 — "Marks are money"; Economy's legibility rule — "no premium-currency maze and **no obfuscated conversion**". A stock with one source, one sink and no exchange is not a medium of exchange |
| The greenhouse level as the multiplier | ON | `getProductionPerMinute` — production = base × level, the engine's linear rule, which CFD-183 already carried to civic scale as +1..+4. The level was always the rate; this board gives the rate a destination |
| The level-1 identity | ON, measured | `economyConfig.resourceValues.food` = 1; CFD-183's TEND at 1 mark a step; CFD-183's level-1 yield of 1. Three inherited numbers from two beats agreeing, not designed |
| The stores at the desk | ON | `buildings[greenhouse]` has no `storage`; `buildings[central-station]` and `buildings[switchyard]` do. Goods are stored where the town stores goods |
| The stores read as objects, not a gauge | ON | Economy — the planting "tells a keeper the state of their ground **without a gauge**"; and CFD-196 Amendment 1's own reading of that sentence — it governs "how the *world* reports hidden state", not the player's own property. Precedent: the muster ladder, passed |
| Stores cap 4, CARRY dark at full | ON, new-play | `buildings[warehouse].description` — the pack's own overflow rule, "keeps returning cargo from going to waste", with the Warehouse named as its owner and off this board. Mirror-anchor from CFD-183's own reserve depth |
| A turned-back run loses the food | ON | R6 — "A run that fails costs **the haul committed to it** and never the home or the permanent record"; CFD-145 — failed runs pay zero, recovered stakes are not payouts |
| Full carry yield at every reserve, untouched | INHERITED, deliberately | CFD-183, passed; Geology — "rides fine for years on a falling reserve, **in clear weather**, and gives no sign". §7.1.2 — the join board "must not contradict" the outstanding weather promise |
| TEND, with its payoff one sitting out | INHERITED, named | R10 — "tending, heat and liftstone carried to a node whose reserve is falling, **which earns nothing but holds the line**"; §5.2 SIGNED — the reckoning is the storm's; §7.1.2 — that promise now waits a second sitting |
| The reserve, unchanged in every respect | INHERITED | CFD-183, passed; R10/MDB — "a visible reserve health that over-extraction lowers and that tending runs … raise" |
| No level lost, nothing dies, no decay | INHERITED as a refusal held | R3 — "tended ground does not decay"; R4 — "No decay clocks, no upkeep tax, and no alerts"; CFD-183's convictions carried whole |
| Absence protected without exception | ON as a refusal held | R4 — nothing on either half moves without a commit; food never spoils, the ground never falls, `wait()` returns false |
| Two vehicles | ON, argued, and the MOSSWAKE cut rests on it | `buildings[switchyard].description` — "Dispatches trains, **adds scheduling capacity**, and keeps cargo moving". R10's three claims stay on the shuttle where CFD-183 put them |
| MOSSWAKE +3 cut | REFUSED | RULED — David 2026-08-27, "cutting redundant is cheaper than renaming colliding"; precondition verified in Does |
| Topping arms, the cargo fires | ON | RULED — David 2026-08-27, ruling 5, minus its storm clause; §7.2 — "Arming-and-triggering … is the shape that gives a builder their payoff without ending the sitting under a player who came for the run" |
| The free halt as the honest quick path | INHERITED | CFD-196, passed; §7.2 — "The floor send being free and always lit is the shape this already takes." Measured: the quick path is the *better* deal to level 3 |
| Weather, whole | REFUSED | §7.1 — swapped out for the join. §7.1.1 records the cost: §5 is not overturned, and "next sitting" now means the sitting after this one. `docs/cfd-201-beat.md` is held, not discarded |
| The Ranger | REFUSED | §7.1.3 — the Ranger's trim is one of the three rulings that travel with the storm, "ruled, recorded, and not re-opened when weather returns" |
| Marksman / Engineer / the yard | REFUSED | `docs/cfd-200-beat.md` holds them; `missions[*].preferred` puts fire and repair off this board; a hire with no job is dead UI |
| Materials, energy, parts as nouns | REFUSED | The standing refusal from both parents, lifted for one noun only. CFD-183's own words for the pattern: the cost basis "waits, named, until a sitting is about it" — and this sitting is about exactly one of them |
| Routes paying food | REFUSED, argued | A route that paid food would make the terrace optional and the join decorative, which is the failure §7.1 exists to prevent. Marks stand in for every other leg, flagged, per both parents |
| Crew rations / a second food sink | REFUSED | A second sink is what turns a stock into a currency (R1), and it is a second new system (§7, KEPT) |
| The Warehouse and store-cap purchases | REFUSED | `buildings[warehouse]` — its own sitting; one new system |
| Marks-as-heat, heat anywhere | REFUSED | R1 — "marks never **are** the heat"; the keel-fire bank and the hearth are scenery on both parents and neither is read nor written here |
| Anything on wall time | REFUSED | R4, R8; `wait()` inert on both halves, inherited |
| The lineage lock | ON | §7 — never overwrite a passed or killed board; a new sibling path, and both parents stand |

---

## Author's argued alternatives

**1. The send draws its provisions straight off the reserve — one quantity, no
stores, minimal diff.** The cheapest possible implementation of the ruling and the
first thing tried. **Rejected on measured arithmetic, not taste:** with CARRY still
paying marks, TEND then CARRY mints `level − 1` marks per two turns with the ground
unchanged and no ceiling — +1 at level 2, +3 at level 4, forever. The pump is
shown in full in The design above and is the reason CARRY had to change units. The
collision is recorded because the brief asked for collisions to be shown rather
than routed around, and because this is the one place where the "minimal diff"
instinct is actively wrong.

**2. Food is the reserve — the five graded greens are the larder.** Attractive: no
new stock, no new read, and the fiction is natural. **Rejected twice over.** It
opens the same pump. And it makes TEND a provisions shop at one mark a unit, which
re-collapses the wallet this board exists to un-collapse and leaves the greenhouse
level multiplying nothing — UP would buy a bigger carry figure with nowhere to
spend it. The ground and the stores are two states of one substance with the carry
between them, and the level is the rate; that is what gives UP a reach past its own
label for the first time.

**3. Open with 2 in the stores, so Mosswake is lit at frame one.** It would have
preserved CFD-196's inherited opening lit-set exactly. **Rejected:** `reserve 4`
with `stores > 0` is not reachable by play, so it mints an off-lattice state for
the second time in three beats, and CFD-201's hard-won restoration of "every state
is reached by play" would have to be retired again. Opening at 0 costs one
re-expressed Kill line and buys the reachability claim outright — and it makes the
new system visible in frame one, with the spine dark and saying why.

**4. Give the reserve a gate this sitting — a carry that cannot draw ground that
is not there.** The single change that would give TEND an operational job and make
the ground's five greens matter to the player's hands rather than only to the
closing sentence. **Rejected, and this is the beat's most uncomfortable
rejection.** It requires re-scoping CFD-183's kill — "carrying at low or bare
reserve pays less, **stops**, warns, or alerts" — whose citation is Geology's "gives
no sign", and the sentence that scopes it is the storm's reckoning. CFD-201 already
scoped that kill once, for weather; scoping it a second time, for a different
system, in the same week, is the drift this project convicts by name. §7.1.2 is
explicit that this board must not contradict the outstanding promise. **The gate is
the storm sitting's to fire, and it will fire harder because this board draws the
ground far faster than CFD-183 did.**

**5. Re-derive the route pays, MUSTER and UP with their food legs removed.** The
only way to make the marks figures pure once food is a real noun. **Rejected on the
standing Kill line** — `10 / 14 / 18` and `3` do not move — and because a board
that re-prices four things while introducing one has stopped being attributable.
The double-count is disclosed in The numbers instead, and it resolves when
goods-as-nouns lands whole.

---

## Open questions for David

1. **The stores cap of 4.** New-play, argued from the mirror-anchor. Bigger makes
   carrying rarer and batchier; smaller makes a Chartered run cost the whole store.
2. **TEND has no operational job this sitting** — its payoff is the weather bill,
   one sitting out. Keep it (my recommendation, and §7.1.2 requires the reserve to
   stay untouched), or cut it the way MOSSWAKE was cut and bring it back with the
   storm?
3. **Halt-spam then three UPs is the fastest line to the stop**, and a player who
   takes it sees one carry and no tend. That is §7.2 working as written. Is it what
   you want, or should the arming cost more than 12 marks?
4. **The terminal now reads three things** — the desk's record, what the terrace
   sent, and the ground. Is the third clause worth the length, or does the ground
   read better folded into the second?
5. **Food is called "the stores" on the board and `food` in the provenance.** Right
   word, or should the board say food?

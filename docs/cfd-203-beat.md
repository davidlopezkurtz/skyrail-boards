# CFD-203 — the join sitting (provisions off the terrace)

The first cumulative board, re-aimed. `/dawnspur-dispatch/`'s desk and
`/dawnspur-scale/`'s terrace on one town, with **the connection between them as
the single new system**: a send eats what the terrace grew, and the terrace is
worked by hand, one trip at a time. *(The first draft said "what the ground grew".
That sentence stops being true after four presses and the correction is worked in
full under* What the ground does and does not do *— it is this beat's most
important section.)*

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


---

## SIGNED — David, 2026-08-27, by delegation

**"sign the beat when the check comes back."**

Recorded as a **delegated** signature rather than an assumed one. David ruled
every open question on this board across five rounds — the join over weather
(canon §7.1), the stop's arm-and-trigger shape, the MOSSWAKE cut, the crew
names, the TEND cut, and the reserve kept as a one-way allowance — and
authorised the PM to sign once the last reachability check reported. The stated
boundary was: sign if the check is clean or resolves cleanly; **do not** sign if
it surfaces a new defect, a reachability hole, or a design question the rulings
do not already cover. It resolved cleanly.

### What the check found, and it was not what the PM predicted

The PM's caveat was that the terminal's ground clause would become a constant
and that this board would hand the storm a bare ground every time. **Both were
wrong, and the author refuted them with a breadth-first search over the
reachable state space rather than sampled paths.**

Reserve at the stop is `max(0, 4 − carries)`. The stop needs a Chartered outfit
of 3 food, the only source of food is CARRY, and every CARRY draws a step — so
**carries ≥ 1 at every stop, and the reserve can never be full when the sitting
ends.** Re-derived independently by the PM:

| reserve at the stop | reachable | best by level |
| --- | --- | --- |
| 4 — full | **UNREACHABLE at every level** | — |
| 3 / 2 / 1 / 0 | all reachable by ordinary play | best is 3 |

**Correction, 2026-08-27, the PM's labelling error, caught by the implementer.**
An earlier version of this table carried a column reading *"L1 → 1, L2 → 2,
L3 → 3, L4 → 3"* as reserve-at-the-stop **by level**. That reads as four
stop-levels and there is only one: **topping arms the ending, so every stop
happens at level 4.** Verified in the shipped sim — a Chartered cargo banked
below level 4 does not stop the sitting. The figures were "best reserve if the
Chartered outfit was *gathered* at that level", which is a different index. The
material claims are unchanged and all hold: **full is unreachable, 0–3 are all
reachable, and the best reserve at any stop is 3.**

**So the dead register was `full`, at the opposite end from where the PM looked**
— *"everything the line ate was put back"*, a sentence that cannot fire. It is
cut. **Two registers ship, both reachable**, and the surviving clause reads how
many trips up the hill the sitting took: the quick path stops drawn at 3, a
spine-heavy or level-1 sitting stops bare.

A Kill line now makes any unfireable register a kill in its own right. That is
the second dead register this beat has had to remove, and the pattern is the
one David ruled on directly: **a register that cannot happen is a dead button in
sentence form.**

### One cost of the TEND ruling that nobody priced, now priced

The cut removes the instrument that realised the level-1 identity. That claim
rested on three legs — `resourceValues.food = 1`, CFD-183's level-1 carry yield
of 1, and **CFD-183's TEND at 1 mark a step.** With the third gone there is no
way on this board to turn a ground step back into a mark, so the claim weakens
from a **board measurement** to a **pack citation**: the quantities still match
and the pack still values one food at one mark, but the on-board conversion
returns with the verb. The honest form now ships — at level 1 a send costs the
same quantity it always cost, and that quantity costs **turns** rather than
marks.

A second proof had to be rebuilt for the same reason: the reachability argument
rested on TEND's odd −1. Re-measured by BFS under the surviving verb set —
every mark count 0 to 60 reachable, none missing. **The claim survives; its
proof was replaced rather than left standing.**

### Verified at signature

Every published figure re-derived independently by the PM against the revised
beat, because a document amended four times is where a stale cell survives and
an implementer treats every figure as spec:

- Cloud Basin carries per send, cap 6: **3.000 / 1.500 / 1.000 / 0.750**; at cap
  4 or 5, **1.000** at level 4 — caps 4 and 5 are the same board.
- The cap is **derived, not chosen**: `maxProvisions + maxLevel − 1` = 6, the
  smallest cap at which a carry never strands.
- Turns per Chartered send: **5.000 / 3.500 / 3.000 / 2.750**, and turns saved
  per mark **0.500 / 0.125 / 0.050** — the last rung is ten times less efficient
  than the first, and the beat says so rather than calling it a discount.
- TEND appears on no live surface; the `full` register appears nowhere.
- Zero NUL bytes, zero CR.

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
5. Food never pays a toll, a muster or an UP.

R1 is satisfied *literally*, in its own words — **never the same sink.** Marks and
food do not share one sink anywhere on the board.

### The level-1 identity, which is the whole citation

At greenhouse level 1, one step of ground yields one food, and on the board that
passed, TEND restored one step for one mark — **that third leg is cut this sitting,
and the paragraph after this table prices what its absence costs the claim.** `economyConfig.resourceValues.food` is **1** — the pack's own
statement that one food is one mark-equivalent. Three inherited numbers, from two
different beats, agree:

| route | ground steps per run | marks to put the ground back | passed board's marks price |
| --- | --- | --- | --- |
| Dawnspur Halt | 0.00 | 0.00 | **0** |
| Mosswake Loop | 2.00 | 2.00 | **2** |
| Cloud Basin Span | 3.00 | 3 + 1 toll = 4.00 | **4** |

**At greenhouse level 1 the quantities are identical to the passed board.** Nothing
was re-priced; the unit moved and the price stayed. CFD-183 carried the level-1
yield of +1 from play, and `resourceValues.food = 1` is the identity element of the
table CFD-196 converted through, so the pack values one food at one mark.

**But the TEND cut takes away the instrument that realised it, and that is a cost of
the ruling nobody priced — so it is priced here.** The third column above reads
"marks to put the ground back", and with TEND gone **there is no way on this board
to turn a ground step back into a mark.** The identity therefore weakens from a
*board measurement* to a *pack citation*: the exchange rate is still the pack's own
(`resourceValues.food = 1`), and the quantities still match (2 provisions is 2
provisions), but the on-board conversion that made the equality operational is one
sitting away with the verb. **The honest form of the claim, and the one this beat
now makes:** at level 1 a send costs the same *quantity* it always cost, and that
quantity costs **turns** rather than marks — which is the same correction the
premise section makes, arriving a second time from a different direction. The third
column is kept as the arithmetic that will be true again on the storm board, and is
labelled as such rather than deleted.

And the ladder is what buys the discount — **but only at a stores cap of 6, and the
first draft of this beat got this table wrong.**

| carries (= ground steps) per send | L1 | L2 | L3 | L4 |
| --- | --- | --- | --- | --- |
| Mosswake, cap 6 | 2.000 | 1.000 | 0.667 | **0.500** |
| Cloud Basin, cap 6 | 3.000 | 1.500 | 1.000 | **0.750** |
| Cloud Basin, **cap 4 or 5** | 3.000 | 1.500 | 1.000 | **1.000** |

**The stranding, which is the defect and now has a Kill line.** A carry lands
`min(level, cap − stores)`. A Chartered send takes 3 of a 4-slot store and leaves
1 standing, and **no send costs 1**, so at level 4 the stores are never re-entered
at 0 and every carry lands 3 instead of 4. The level-4 rung then buys **nothing at
all** on the only route that fires the ending: L3 and L4 are both 1.000. The first
draft published 0.750 by dividing 3 by 4 and ignoring the leftover, and built a
headline on the cell.

**The cap is therefore not a feel knob. It is the parameter that decides whether
the top of the ladder exists**, and its minimum is derivable rather than chosen —
see The numbers. Cap 4 and cap 5 are the same board; cap 6 is the first cap at
which a carry never strands.

**What the rung actually buys, in the denominator that binds.** Ground steps are
the wrong unit, because a step of ground is only worth a mark if something can turn
it back into one, and **TEND is cut this sitting** (see Does), so nothing can. The
unit that binds is **turns per
Chartered send** — two for the send and the meet, plus the carries:

| | L1 | L2 | L3 | L4 |
| --- | --- | --- | --- | --- |
| turns per Chartered send (cap 6) | 5.000 | 3.500 | 3.000 | **2.750** |
| the rung's price | — | 3 marks | 4 marks | 5 marks |
| turns saved per mark | — | **0.500** | **0.125** | **0.050** |

**The ladder is steeply diminishing even when it is not broken: the last rung is
ten times less efficient than the first, and the ending arms on buying it.** That
is not a defect to fix — it is what the arming was ruled to do (*"makes the terrace
pay off on its own terms"*). The last rung is bought for the ending as much as for
the rate, and the beat says so rather than dressing 0.050 turns a mark as a
discount. **At cap 4 it is a defect**, because the rung then buys the ending and
literally nothing else.

---

## Does

**One town, two halves that now need each other.** The terrace grows the food; the
food provisions the sends; the sends pay the marks; the marks build the terrace and
muster the crew. Neither half closes on its own: **marks come only off the line,
and provisions come only off the terrace.**

**Said precisely, because the first draft of this beat said it wrong.** The
recurring price of a provisioned send is **a trip up the hill** — a carry, which is
a turn. It is *not* the ground's condition: the reserve is a four-step opening
allowance that the carry draws and the carry does not need, because the carry pays
full at bare. A first draft of this section said *"a send eats what the ground
grew"*, and that sentence stops being true after four presses. What is true, and
never stops being true, is that **a send eats what the terrace grew, and the
terrace is worked by hand, one trip at a time.** The ground's own condition is
carried out of the sitting, not spent inside it — see *What the ground does and
does not do*, which is now this beat's most important section.

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

Inherited from `/dawnspur-scale/`: the greenhouse at level 1, top at 4; UP at 3,
then 4, then 5 marks, instant, no way back; the reserve 4 down to 0, floored, drawn
one step per carry, **paying full at every reserve, bare included, and giving no
sign**.

**TEND is CUT this sitting — RULED, David, 2026-08-27**, and his reasoning is the
part that generalises:

> "**Cut TEND for this sitting.** The full-ground arming is elegant and it's your
> own debt-collector idea realised. But look at what it costs. It flips the
> terrace's rate advantage at level 4, meaning **the ladder the ending requires you
> to climb becomes worse than not climbing it.** It risks a tail of eight or nine
> consecutive tends, which is **the tedium the sitting's ambition is supposed to buy
> you out of, not into.** And it does all that to keep a verb alive on a board that
> structurally cannot give it a job, because the reckoning it exists for went to
> the next sitting."

> "**The reserve's teeth were always weather. TEND is the tooth.** Building a
> synthetic collector so a weather verb has something to do on a weatherless board
> is engineering around a scheduling decision, and it leaves you with a mechanic
> tuned to a constraint that will change the moment the storm board lands."

Shipping it dominated was ruled out in the same breath — *"a dominated button
teaches players a wrong lesson and then you have to un-teach it two sittings
later"* — so the choice was cut-or-amend, and the cut is cheap and reversible:
**TEND returns on the storm board with its real job.**

### The pattern, recorded as a pattern rather than as two incidents

**This is the second inherited verb dropped, and both went for the same reason:
the join changed what they were for.**

| verb | why it was dropped | where it goes |
| --- | --- | --- |
| MOSSWAKE +3 | the join put a *route* of that name on the same board; the verb was redundant, and *"cutting redundant is cheaper than renaming colliding"* | nowhere — the route is the better Mosswake |
| TEND | the join gave its job to the food line; its reckoning is weather, and weather went to the next sitting | back, on the storm board, with the reckoning that makes it real |

A cumulative board does not only add. **It re-asks what every inherited verb was
for, and some of them answer "nothing, here."** That is the audit discipline
working, not a defect in the join, and the next cumulative beat should expect to
drop one too.

Exactly one thing changes about what remains, and it is forced:

- **CARRY brings food down to the stores instead of marks up to the wallet.** It
  lands the greenhouse's level, capped by what the stores can still hold, and it
  draws the ground one step. The carry's own label states the load it will actually
  land — CFD-183's rule that the button label is the meter, doing the work of a
  cap warning.

**The stores hold 6**, and 6 is derived rather than chosen: it is the smallest cap
at which a carry never strands, `maxProvisions + maxLevel − 1 = 3 + 4 − 1`. Below
it the ladder's top rung buys nothing on the Chartered Line. CARRY is dark when the
stores are full — the same grammar the cut TEND used for full ground, which is now
the only place that grammar appears.

### What the ground does and does not do — the section the rest of the beat rests on

**The reserve is a one-time allowance of four steps, not a recurring price.** The
carry pays full at bare and the reserve floors at 0, both inherited and both
untouched, so a level-1 player exhausts the ground inside one Chartered run and
plays the rest of the sitting on a **free, unbounded food faucet**. Nothing on the
board says so, and a first draft of this beat's own framing — *"a send eats what
the ground grew"* — stops being true after four presses.

**That is the honest finding, and it is stated before the defence of it**, because
the board's first four turns otherwise teach a model that is false from the fifth
turn on.

#### The bind, and the three shapes that were tried against it

For the ground to be a *recurring* price, running it out has to cost something.
Something can only cost when some action's yield or availability depends on the
reserve. That is a small, closed space, and every cell of it was worked:

**Shape 1 — the carry is unavailable at bare (gated, not priced).** Yield stays
flat, nothing pays less, the ground permits rather than prices. **REFUSED on the
letter.** `docs/cfd-183-beat.md` reads verbatim: *"Carrying at low or bare reserve
pays less, **stops**, warns, or alerts."* "Stops" is in the kill. Whatever fiction
is wrapped round it — an empty larder rather than a refusal — the mechanic named is
the mechanic killed. Recorded because it is the shape a later reader will
re-propose.

**Shape 2a — the SEND reads the reserve: a send is unavailable at bare.** A send is
not a carry, so the kill's letter does not reach it, and the pressure lands where
this board says the join puts it. **It works mechanically**: carries per send are
`P/L`, so in steady state tends per send are `P/L` too, which makes the ground
recurringly costly at exactly `P/L` marks a send — permanently equal to the passed
board's provisions price at level 1. It also un-dominates TEND outright, because at
reserve 1 a carry darkens the next send and a tend is the only way through.
**REFUSED on the spirit, and the spirit here is not a resemblance argument.** The
kill's citation is Geology: *"A drawn-down island rides fine for years on a falling
reserve, **in clear weather**, and gives no sign. **The reckoning comes only when a
cold stretch arrives.**"* A send that will not go because the ground is empty is a
sign, and it is a reckoning arriving with no cold stretch. **The scope words cut
against it rather than for it**: "in clear weather" is the condition under which
the ground must give no sign, and this board is *entirely* clear weather, because
the storm was deferred. And CFD-183's own published gloss of that citation is a
behaviour rule in terms — *"'gives no sign' governs behavior — nothing fails,
slows, dims, warns, or alerts at any reserve"* — which a dark send violates
head-on.

**Shape 2b — the SEND reads the reserve: a send at bare costs one extra
provision.** Nothing goes dark, nothing pays less, nothing warns; the ground
**prices** rather than fails, and "costs more" is not among the verbs in the kill
or in CFD-183's gloss. **This one survives both the letter and the spirit.** It
fails on arithmetic, measured:

```
pay the surcharge   = S food per send = S/L carries = S/L turns
avoid it (tend)     = P/L marks + P/L turns per send

Cloud, level 4:  surcharge 1 -> pay 0.250 turns vs avoid 0.932  -> PAY
                 surcharge 2 -> pay 0.500          vs avoid 0.932  -> PAY
                 surcharge 3 -> pay 0.750          vs avoid 0.932  -> PAY
                 surcharge 4 -> pay 1.000          vs avoid 0.932  -> avoid
```

The surcharge is cheaper to pay than to avoid at every size below 4 — so the ground
stays an allowance, TEND stays dominated, and the mechanic buys nothing. To make it
bite, provisions on the Chartered Line must go 3 to 7 at bare ground, which is a
cliff rather than a surcharge and fails the spirit after all. **Refused on the
model, not by resemblance.**

**Shape 2c — a graded surcharge that rises as the ground falls.** It works, and it
is a *larger* scoping of the same kill than 2a: the world reporting its condition
through a number that moves is precisely what the five-greens rule exists to
prevent, and it rewrites one of the four reads CFD-196 requires on every card.
Refused.

#### The structural fact underneath, which is not a drafting flaw

**The reserve's teeth were always weather.** §5.2 is SIGNED — *"the storm is the
next sitting's reckoning"* — and §7.1.2 records that the swap David made
deliberately means *"next sitting"* now lands one further out, with
`/dawnspur-scale/`'s promise *"not broken, only outstanding"*, and this board
required *"not to contradict it."*

So **this board inherits a reserve whose reckoning is not available to it.** That is
the price of the swap, recorded here rather than left for a reader to find. The
ground is a four-step allowance because the thing that would make it a price is one
sitting away.

#### The reserve is one-way ON THIS SITTING, because TEND is absent from it

**RULED — David, 2026-08-27: keep the reserve, and name it a one-way allowance.**

**The cause is stated next to the fact every time the fact is stated, and this
paragraph is why.** The reserve is one-way *here* because **TEND is cut**, and TEND
is cut because its reckoning went to the storm board. It is not a property of the
reserve. **When TEND returns on the storm sitting the reserve is two-way again and
the ground is a real economy**, drawn by carries and by the storm and restored by
tending. Written flat — "the reserve is a one-way allowance" — the sentence reads as
permanent and hands the storm board a false premise, so it is not written flat
anywhere in this beat.

What that means concretely, this sitting only:

```
writers : CARRY only, -1 per carry, floored at 0
readers : the terminal's ground clause only
       => reserve = max(0, 4 - carries).  Derived, not state.
```

**And the emptiness predates the cut.** With TEND on the board its only operational
reader was *its own lit condition* — a quantity whose only reader is its own writer
was already inert. Cutting TEND did not make the reserve empty; it removed the last
thing disguising that it was. Said plainly because the alternative is a later reader
concluding the cut caused it.

#### The storm handoff, which closes rather than staying open

It was raised as an open consequence — if this board always ends bare, does it hand
the storm sitting a pre-decided ground and contradict `/dawnspur-scale/`'s promise?
**It closes, and the reason is the lineage rule this project already has: a
cumulative board inherits SYSTEMS, not end-states.**

Measured, not assumed: `docs/cfd-201-beat.md`'s own Kill list reads *"The opening
mints anything but marks 3, Wardens 0, Rangers 0, level 1, **reserve 4**, sky clear
at turn 1"* — **the storm board mints a full ground at its opening**, exactly as
this board mints its 3-mark float, and every board's Kill list refuses reading
another board's persisted state. There is no number crossing the boundary.

So CFD-183's *"the reserve left here is the next sitting's weather bill"* is **not
contradicted. It is suspended for one sitting and honoured on the board that has
weather** — which is what §7.1.2 means by *"not broken, only outstanding."* The
handoff is narrative, and what it hands forward is a system, not a state.

**The residual risk is pedagogical, not mechanical**, and it is the one worth
guarding: a player who watches the ground fall and nothing happen could learn that
the ground is scenery, and the storm board would then have to un-teach it — the
same shape as David's objection to a dominated button. The guard is a sentence, not
a mechanic: **the terminal names the missing restorer rather than implying one**,
and that is why the closing register below says *nothing on this desk puts it back*
instead of repeating the scale board's promise as though this board could keep it.

#### What the join actually is, once the arithmetic is right

The join is real, recurring and permanent without the ground being a price at all:

- **Marks come only off the line; provisions come only off the terrace.** Neither
  ever switches off.
- **Every provisioned send costs at least one trip up the hill**, and trips are
  turns, which is this board's binding constraint.
- **The greenhouse level is trips-per-send**, so UP reaches the desk for the first
  time.
- **The terrace cannot bootstrap itself**: UP is funded by marks, marks come only
  from the line, and the float pays for exactly one rung.

None of that touches the reserve. **So the join's premise does not require CFD-183's
kill to be scoped, and this beat does not ask David to spend that decision.** What
the deferral costs is not the join — it is TEND.

### Two vehicles, and the condition on the MOSSWAKE cut

The line train works the routes and can be in exactly one place. The terrace
shuttle works the ground off A. **While a line run is away, the terrace is lit** —
CARRY and UP stand beside MEET, so the away state has three live controls and not
one. The claim is not decorative here: David cut MOSSWAKE +3 *conditionally* on
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
stores hold nothing), Rustfall (raiders, in every state).

Four controls, two of them free, and the float buys a Warden *or* the first level
and never both. **Amendment 1's own sizing test is void here and the float is
re-derived rather than inherited on faith.** That test was *"a Warden (3) or a
Mosswake send (2), never both"* — and **Mosswake now costs 0 marks**, so 3, 4 and 5
satisfy it identically and it selects nothing. The float's new derivation is its
own: MUSTER and UP both cost 3, so **3 is the smallest opening at which the first
frame contains a paid choice at all, and the exclusivity survives for a new reason
— both purchases cost exactly the float, so it buys one and never two.** It breaks
at 6, where it buys both. The figure does not move; its argument does, and the old
one is retired rather than left standing.

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

**The stores are six slots on the desk's own platform, filled or empty.** Physical
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
- **THE TERRACE** — CARRY, UP.

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

**The record splits with the stake, and the first draft did not say so.** The
parent's sim keeps one scalar — `stake = r.provisions + r.toll`, then
`s.marksLost += run.stake` — and its terminal keys the cost clause on
`marksLost === 0`. **Mosswake's toll is 0.** So on the join board, three
turned-back Mosswake runs lose **6 food and 0 marks**, and an unchanged terminal
closes the sitting with *"three turned back and cost nothing but the trip"* over
six dead food and six ground steps.

**That is the exact defect CFD-196 was sent back for**, convicted in a standing
comment in its own sim, fixed, sat and passed. The join re-opened it in a different
currency, and the first draft of this beat reported terrace food only as *gross
dispatched* — food lost was reported nowhere.

**So the record carries two loss counters, and both are read.** `marksLost` keeps
its name and its meaning (tolls only, on this board). `foodLost` is new and counts
the provisions that went out and did not come back. The clean register is unchanged
and still keys on `runsTurnedBack === 0`. The paid register names **both**, naming
a zero rather than omitting it — the same move CFD-196 made when it was sent back:

> *"The Chartered cargo is home and the terrace is topped. Eleven runs out, eight
> cargoes banked, three turned back, **6 from the terrace and 3 marks lost on the
> way.** **Fourteen from the terrace went out on the line.** The ground is bare:
> nothing on this desk puts it back, and that is the next sitting's business. The
> record keeps what came home; the line past the basin is the next sitting's."*

A sitting whose only turn-backs were free halt runs still reads *"three turned back
and cost nothing but the trip"* — because there both counters are zero, which is
what that clause was always for.

**Ground registers: TWO, not three, and the third was cut because it cannot fire.**

- Drawn: *"The ground is drawn and standing. Nothing on this desk puts it back —
  that is the next sitting's business."*
- Bare: *"The ground is bare. Nothing on this desk puts it back, and what the line
  ate came out of a bank this sitting cannot refill. That is the next sitting's
  business."*

**The check, run rather than assumed, over the full reachable state space.** The
first draft published three registers including *"The ground is full: everything the
line ate was put back."* **It can never fire**, and the proof is structural rather
than statistical: the stop requires a Chartered cargo, a Chartered outfit is 3 food,
the only source of food is CARRY, and every CARRY draws a step. So **carries >= 1 at
every stop, and the reserve at every stop is at most 3.**

| reserve at the stop | reachable? | shortest |
| --- | --- | --- |
| 4 — full | **UNREACHABLE, at every level** | — |
| 3 — drawn | yes | ~7 commits |
| 2 — drawn | yes | ~8 commits |
| 1 — drawn | yes | ~9 commits |
| 0 — bare | yes | ~10 commits |

**A register that cannot happen is a dead button in sentence form**, and this beat
has already had to fix one clause that reported a constant as a variable. It is cut.

**What the surviving two-way split actually distinguishes**, said so the reader
knows it is a real read and not decoration: the reserve at the stop is
`max(0, 4 − carries)`, so the clause reads **how many trips up the hill the sitting
took**, saturating at four. The quick path (one carry, at level 3 or 4) stops at
**3 — drawn**. A spine-heavy sitting, or any sitting run at level 1 where a Chartered
outfit costs three carries, stops at **0 — bare**. Best possible by level: 1 at
level 1, 2 at level 2, 3 at levels 3 and 4. So the split reads *speed-run against
worked-terrace*, and both halves are ordinary play rather than edge cases.

**Neither register repeats `/dawnspur-scale/`'s promise as though this board could
keep it.** Both name the absent restorer instead. The promise is suspended for one
sitting and honoured on the board that has weather, per §7.1.2, and the sentence
that would have carried it forward would have been a promise this board cannot
fund.

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
| **The stores: 6 slots at the desk, CARRY dark at full** | **ON** — 6 derived as the smallest non-stranding cap | new |
| **The record splits: `marksLost` and `foodLost`, both read at the terminal** | **ON** — CFD-196's own sent-back defect, re-opened by the join in a new currency | new |
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
| **TEND** | **REFUSED — CUT**, RULED David 2026-08-27; the join gave its job to the food line and its reckoning is weather's. Returns on the storm board | CFD-183, passed |
| **The reserve, one-way this sitting because TEND is absent** | **ON as an inherited display** — `max(0, 4 − carries)`; derived, not state; two-way again when TEND returns | CFD-183, passed |
| CARRY lit past a topped terrace | re-expressed (Seam 2, CFD-201) | CFD-183, passed |
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
- A muster or an UP costs food.
- Any route pays food; the terrace pays marks.
- Food decays, spoils, expires, or changes on any schedule, at any reserve, in any
  absence.
- The stores exceed 6, go negative, or change outside a carry or a send.
- The stores cap is anything but 6, or a carry strands at any reachable level and
  store level. *(The cap's floor is `maxProvisions + maxLevel − 1`; at 4 or 5 the
  ladder's top rung buys nothing on the Chartered Line, which is the defect this
  line exists to catch.)*
- **Food lost on a turned-back run is not counted, or is counted as marks.** The
  record carries `marksLost` and `foodLost` separately.
- **The terminal's paid register omits either loss counter, or omits a zero.** A
  sitting that lost food and no marks reads "cost nothing but the trip".
- The stores render as a bar, a meter, a percentage, or a HUD line.
- The HUD grows past the one marks line.

**The carry, and the ground**

- *(interaction)* A carry yields anything but the greenhouse level, capped by what
  the stores can still hold.
- *(interaction)* Steady-state carries per send are anything but `provisions /
  level` at any reachable level — which is the stranding check, stated as an
  invariant rather than as a cap number.
- The carry's stated load is anything but what the carry lands.
- CARRY is lit when the stores are full.
- A carry draws anything but exactly one step of ground, or draws below 0.
- *(interaction)* **A carry pays less, stops, warns, or alerts at low or bare
  reserve.** The reserve caps, gates, or changes any carry's yield.
- A reserve number, bar, pip row, meter or icon appears anywhere.
- The ground moves without a commit — across a reload, a blur, or any absence.
- A level is lost. The greenhouse shrinks, dies, or shows a dead state.
- **TEND appears** — as a control, a label, a code path, or a state field. It is cut
  this sitting and returns on the storm board.
- **The reserve is written by anything but a carry**, or a carry draws anything but
  exactly one step, or the draw does not floor at 0. *(With TEND cut, CARRY is the
  reserve's only writer and the terminal is its only reader.)*
- **The terminal offers a ground register that cannot fire** — in particular a full
  register, which is unreachable at every stop because a Chartered outfit costs at
  least one carry.
- **The terminal's ground clause states or implies that this board can put the
  ground back.**
- UP is free, its price does not climb, or UP rides a train.

**The sends**

- A send is lit when the stores cannot pay its provisions or the wallet cannot pay
  its toll.
- The stated percent and the rolled threshold disagree anywhere. The roll happens
  at SEND. A run resolves without MEET. Any outcome is scripted.
- Odds move by anything but baseRisk and the roster.
- A failed run pays any fraction of the route reward, or returns any food.
- A stake, toll, muster or level refunds, in any branch, any direction.
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

- **A reachable home state has no lit send, or an away state has MEET dark.**
  *(Carried verbatim from `docs/cfd-196-beat.md`. It was lost in transcription from
  the parent's Kill list into the first draft of this one — not argued away, simply
  dropped — and the substitute that replaced it named "every balance and every
  reserve", which are the two dimensions the counterexample does not live on.
  Measured in the parent sim: `canSend` returns false for every route while a run
  is away, and `musterReach()` returns 0 while away. On this board CARRY is dark at
  full stores, UP is dark at level 4 or with the price unpaid, and TEND does not
  exist. **So the away state can
  reach a position where MEET is the only live control, and nothing else on this
  board requires it to be lit.** The free halt is a floor at home and is not a floor
  while away.)*
- A reachable state has no lit control — **at any balance, any reserve, any stores
  level, and in the away state as well as at home.** The stronger line is kept
  beside the parent's, not instead of it.
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
- `3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 / UP 3 / 4 / 5 / reserve depth 4 / roster cap
  4` move. *(`TEND 1` leaves this list with the verb, and returns with it.)*
- A run or the sitting ends without its sentence; a turned-back sentence drops
  zero-pay, stake-spent, crew-home or desk-stands, or names a crew that did not
  ride; the terminal does not read the record, what the terrace sent, and the
  ground, in **two** ground registers — drawn and bare. A third register, or any
  register that cannot fire at a reachable stop, is itself a kill.
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
  MUSTER 3, UP 3 / 4 / 5, the carry's +1..+4, reserve depth 4, roster cap 4 — all
  provenanced in `docs/cfd-196-beat.md` and `docs/cfd-183-beat.md`, all unmoved.
  `TEND 1` is not on this board at all; it is unmoved in the sense that it was cut
  rather than re-priced, and it returns at 1 with the storm.

### New-play, flagged

- **The stores cap of 6 — derived, and the first draft's 4 was wrong.** No
  civic-scale figure supports any particular cap: `BASE_STORAGE.food` is **120**,
  which over the civic scale factor 6.5 is 18.5, and that is a cap for a town with
  a Warehouse, which this one does not have
  (`buildings[warehouse].description` — *"raises storage caps, and keeps returning
  cargo from going to waste"*). So the pack's figure is reported as the honest null
  and **the cap is derived from the board's own arithmetic instead**:

  > A carry strands whenever `cap − stores < level`. The player carries only when
  > `stores < provisions`, so the largest store before a carry is `provisions − 1`,
  > and a carry never strands iff
  > **`cap >= maxProvisions + maxLevel − 1 = 3 + 4 − 1 = 6`.**

  Verified by sweep: caps 4 and 5 give Cloud Basin 1.000 carries per send at level
  4 — identical to level 3, so the top rung buys nothing — and caps 6, 7 and 8 all
  give 0.750. **Cap 4 and cap 5 are the same board. Cap 6 is the smallest board on
  which the ladder has four rungs.** The first draft chose 4 on a mirror-anchor
  (stores 4 = reserve 4 = maxLevel 4) that reads well and is arithmetically wrong.
  Six is still countable at a glance, and it is exactly two Chartered outfits.
- **The opening stores of 0.** Argued below under the fixture question, where it
  earns something the float could not.

### What the join moved without a numeral moving

Two inherited prices changed in real terms while their figures stood still. Both
are recorded because a price that moves unrecorded is how a board drifts.

**MUSTER's opportunity cost, measured in both denominations.** A Cloud Basin retry
cost **4 marks** on CFD-196 (3 provisions + 1 toll) and costs **1 mark** here (the
toll; the food is grown, not bought). A 3-mark Warden therefore costs the
equivalent of **0.75 retries there and 3.00 retries here — four times dearer** in
marks. **The audit's figure is right and its framing overstates**, so both
denominations are published: measured in *turns*, a retry got **dearer**, not
cheaper — 2 turns on CFD-196 against 2.75 here at level 4, because a retry now
needs its carry. And the Warden's own payback is **unchanged**: +0.036 on an
18-mark route is +0.648 expected marks a send either way, so 3 marks buys back in
4.63 Chartered sends on both boards. What moved is the *alternative* use of three
marks, and it moved toward retrying. **The consequence is that Amendment 2's
central question — "buy odds, or send now" — is answered "send now" more often on
this board than on its parent**, and the sit should be read with that in mind.

**The Chartered stake fell from 4 marks to 1.** Same cause, and it is why the free
halt's dominance over the summit narrowed. It is not a re-pricing: 3 and 1 both
stand, and one of them is now denominated in food.

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
halt line = send and meet, nothing staked. **This table is cap-6 arithmetic and
survives the stranding correction unchanged**, because Mosswake at 2 provisions
never strands above cap 5 — the error was confined to the Chartered spine. At cap
4 the Cloud Basin column would flatten at level 3, which is the defect the cap
derivation exists to prevent.)*

**The quick path is the better deal at every roster up to greenhouse level 3, and
is beaten only at level 4** — by 5.4% bare, 6.0% at two Wardens, 6.6% at four. So
§7.2 passes in the strongest direction available: nobody is priced into the long
sitting, and the terrace's investment breaks even exactly where the ending arms.
The long sitting's payoff is the sitting — more runs, a full roster, a held ground
and a better closing sentence — which is what "a diversity of sits" asks for.

**Said plainly, because it is the risk:** halt-spam followed by three UPs is the
fastest line to the stop, and a player who takes it sees exactly one carry. That is
§7.2 working as written, and it is open question 3.

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
- With stores 0, every state is reachable — **and this had to be re-checked, because
  the first draft's proof rested on TEND's odd −1 and TEND is now cut.** Re-measured
  by breadth-first search over the whole reachable space under the surviving verb
  set (CARRY, UP, MUSTER, the three sends and MEET, both dice branches):
  **every mark count from 0 to 60 is reachable, with none missing** — 0 from the
  float by a single UP or muster, and 1 and 2 by way of the Chartered toll's odd −1
  once the charter is open. The claim survives; its proof does not, and the old one
  is replaced rather than left standing. Stores 0..6: carries. Reserve 4 down to 0:
  carries alone, and **not upward — that is the one-way property, and it is why the
  full ground is unreachable at any stop.** Level
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
spine and tops out will land between 25 and 40 commits. **The
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
| The level-1 identity | ON, **weakened by the TEND cut and said so** | `economyConfig.resourceValues.food` = 1 and CFD-183's level-1 yield of 1 still agree, so the pack values a carry's step at a mark. The third leg — CFD-183's TEND at 1 mark a step — is cut, so the board no longer carries the instrument that realises the exchange. Pack citation, not board measurement, until TEND returns |
| The stores at the desk | ON | `buildings[greenhouse]` has no `storage`; `buildings[central-station]` and `buildings[switchyard]` do. Goods are stored where the town stores goods |
| The stores read as objects, not a gauge | ON | Economy — the planting "tells a keeper the state of their ground **without a gauge**"; and CFD-196 Amendment 1's own reading of that sentence — it governs "how the *world* reports hidden state", not the player's own property. Precedent: the muster ladder, passed |
| Stores cap 6, CARRY dark at full | ON, new-play, **derived** | `buildings[warehouse].description` — the pack's own overflow rule, "keeps returning cargo from going to waste", with the Warehouse named as its owner and off this board. The figure is not a mirror-anchor but the board's own arithmetic: `maxProvisions + maxLevel − 1`, the smallest cap at which a carry never strands. The first draft's mirror-anchor of 4 read well and was wrong |
| The record's two loss counters | ON | CFD-196's own correction, re-applied in a new currency: the terminal must reconcile in words the gap between what went out and what came home, and must name a zero rather than omit it |
| The ground as a one-time allowance rather than a price | ON, argued at length | R3 — "tended ground does not decay"; Geology — "rides fine … **in clear weather** … gives no sign"; CFD-183's own gloss — "nothing fails, slows, dims, warns, or alerts at any reserve"; §5.2 SIGNED and §7.1.2 — the reserve's reckoning is the storm's and is not available to this board. Three candidate mechanisms were worked and refused: on the kill's letter, on its cited sentence, and on the model |
| TEND | **REFUSED — CUT** | RULED — David 2026-08-27, superseding his own earlier "keep it for one sitting": "**Cut TEND for this sitting** … it does all that to keep a verb alive on a board that structurally cannot give it a job, because the reckoning it exists for went to the next sitting." Shipping it dominated ruled out in the same breath. R10's tending leg is not abandoned — it returns on the storm board with the reckoning that makes it real |
| The full-ground arming amendment | **REFUSED** | RULED — David 2026-08-27, recommended by this beat and refused with reasons: it flips the terrace's rate advantage at level 4 so "the ladder the ending requires you to climb becomes worse than not climbing it", it risks a tail of eight or nine consecutive tends, and it is "engineering around a scheduling decision" |
| The reserve, kept and named one-way for this sitting | ON | RULED — David 2026-08-27: keep it, name it a one-way allowance. R3 — "tended ground does not decay", and nothing decays here; R4 — nothing moves in absence. The cause is named beside the fact throughout: one-way **because TEND is absent**, two-way again when it returns |
| The storm handoff | closed, not open | The lineage rule — a cumulative board inherits **systems, not end-states**. `docs/cfd-201-beat.md`'s Kill list mints **reserve 4** at its own opening, and every board refuses reading another board's persisted state. §7.1.2's promise is suspended for one sitting, not contradicted |
| A turned-back run loses the food | ON | R6 — "A run that fails costs **the haul committed to it** and never the home or the permanent record"; CFD-145 — failed runs pay zero, recovered stakes are not payouts |
| Full carry yield at every reserve, untouched | INHERITED, deliberately | CFD-183, passed; Geology — "rides fine for years on a falling reserve, **in clear weather**, and gives no sign". §7.1.2 — the join board "must not contradict" the outstanding weather promise |
| R10's tending leg, off the board for one sitting | REFUSED, named, dated | R10 — "tending … **earns nothing but holds the line**" is a real claim and this board cannot honour it, because there is nothing to hold the line against; §5.2 SIGNED and §7.1.2 put the reckoning on the storm board. The leg returns there rather than being abandoned |
| The reserve, unchanged in range and read | INHERITED, **with its restoring half absent this sitting** | CFD-183, passed; R10/MDB — "a visible reserve health that over-extraction lowers **and that tending runs … raise**". The lowering half is on this board; the raising half is cut with TEND and returns with it. Named, because half of a cited mechanism is not the mechanism |
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

1. **The stores cap is 6, and it is not a feel knob — it is the parameter that
   decides whether the ladder's fourth rung exists.** At 4 or 5, UP 3 to 4 costs 5
   marks and buys **nothing** on the route that fires the ending, while the arming
   requires it. At 6 it buys 25% and 0.050 turns a mark. The question is therefore
   not "how big" but: **is 5 marks for 0.050 turns a mark plus the ending the price
   you want on the last rung?** If not, the lever is the rung's price or the
   arming, not the cap.
2. ~~TEND~~ **RULED and closed, 2026-08-27: cut.** What remains open is its
   consequence: the reserve now falls and nothing puts it back, and the sit's real
   question is whether that reads as **unfinished business** or as **scenery**. The
   terminal's two registers are written to make it the former; the sitting is the
   test.
3. **Halt-spam then three UPs is the fastest line to the stop**, and a player who
   takes it sees exactly one carry — and stops on a **drawn** ground at reserve 3,
   which is the best ending the board allows. That is §7.2 working as written. Is it
   what you want, or should the arming cost more than 12 marks?
4. **The terminal reads three things and the ground clause now has two registers,
   not three** — the full register was cut because it cannot fire at any stop. Is
   the ground clause worth its length at two registers, or does it fold into the
   terrace clause?
5. **Food is called "the stores" on the board and `food` in the provenance.** Right
   word, or should the board say food?

---

## TEND, re-framed — David, 2026-08-27, and this supersedes open question 2

The beat calls TEND-with-no-operational-job a thin spot. **David's reading is
that it is a finding, and a stronger one than the beat treats it as.** Recorded
in his words because the reframe is the useful part:

> "'No operational job this sitting' is a stronger finding than it's being
> treated as. TEND is the verb the whole macro was built around: profit now
> versus hold the line, the sentence that passed twice, 'I left A too long.' If
> the join board leaves it inert, that's not a thin spot in the beat. It's a
> signal that **the join changed what tending is for**, and nobody has
> re-derived it."

### The structural cause, which is not a scoping accident

> "Before the join, TEND was the only thing standing between you and losing
> ground, so it competed with income directly. After the join, sends eat food,
> food comes off the terrace, and the terrace's whole output is now consumed by
> dispatch. The ground's condition still matters, but **the pressure on it now
> runs through provisioning rather than through neglect.** TEND didn't lose its
> job because of a scoping accident. **It lost it because the join gave its job
> to the food line.**"

### The real question, which is not the one this beat asked

Not *"does TEND keep its seat with no job."* It is:

> "**whether TEND and the food economy are the same mechanic wearing two
> names.** If food is drawn off the ground and TEND restores the ground, then
> every send is already a slow TEND-debt and TEND is the repayment. That's a
> coherent design and it's better than bolting a new job on. But if they're
> separate, you now have two systems both governing ground condition, which is
> the sort of thing that reads fine in a spec and plays as mush."

Under audit as of 2026-08-27, with arithmetic, alongside every other inherited
verb — see the next section.

### The immediate decision — RULED

> "Don't re-scope CFD-183's kill. The instinct to flag rather than fudge is
> right, and scoping the same kill twice in a week for two different reasons is
> exactly the drift pattern. **Keeping TEND on the board with no job for one
> sitting is honest and cheap; the sit will tell you whether players reach for
> it.**"

**SUPERSEDED IN PLACE, 2026-08-27, same day.** The full six-verb audit reported
after this ruling was given, and the word it produced was *dominated* rather than
*inert*. David's own later standard — *"a dominated button teaches players a wrong
lesson and then you have to un-teach it two sittings later"* — retires the ruling
above, and **the verb is CUT**. The text stays as the record of what was asked and
answered, because the reasoning in it is why the cut is cheap: the sit was to tell
us whether players reach for TEND, and the audit answered the question before the
sit could, by showing there is nothing for them to reach for.

### What the sit must report, and this is new work

> "Ask the sitting to report **whether anyone tended at all, and why.** If
> nobody touches it, that's the answer. If they tend and can't say what it
> bought them, TEND has become a habit carried from a board that no longer
> exists, and it should either be cut or merged into the food line before
> Rustfall."

**SUPERSEDED by the cut** — there is no TEND to reach for, so the three-way split
cannot be asked this sitting. **The question travels to the storm board**, where the
verb returns with a reckoning behind it, and it is the right question there: if
players still cannot say what a tend bought them on a board where the storm draws
the ground, the verb is wrong rather than merely early.

**What the sit is asked instead, and it is the cut's own test:** whether the ground
falling with nothing to put it back reads as *unfinished business* or as *scenery*.
That is the one risk the cut carries, it is the risk the terminal's two registers
are written to answer, and it is answerable in the sitting's own words.

---

## Every inherited verb is audited against the join, before the sitting

David, same day:

> "the CARRY-can't-pay-marks finding is the same shape. The join forced it,
> nobody chose it, and it fell out of conservation. **Two verbs changed meaning
> because the economies merged.** That's a sign the join is doing real work, and
> also a reason to **check every other inherited verb against it before the
> sitting, not after.**"

Two verbs changed meaning without anyone deciding they should — CARRY (cannot
pay marks, forced by conservation) and TEND (job taken by the food line). Both
were found by following where a cost comes from and where its output goes, on a
board whose economy just split in two: **the terrace pays goods, the line pays
money.**

A fan-out audit runs one seat per inherited verb — SEND, MUSTER, MEET, CARRY,
TEND, UP — asking of each: what did the passing beat say it was for, what does
it do here, did its *meaning* change, what funds it and what does it fund now,
is it the food line wearing another name, and does it break a rule or a parent
Kill line it satisfied on its own board.

**This beat is not signed until that audit reports.** Two known findings out of
six verbs is a high enough rate that the remaining four are not assumed safe.

### The audit reported, 2026-08-27 — six seats, and every verb moved

| verb | did its meaning move? | broken in the draft? |
| --- | --- | --- |
| **CARRY** | **Yes** — pays goods, not money; forced by conservation | **Yes** — the stranded-store arithmetic, fixed above; a Kill line now covers it |
| **TEND** | **Yes** — the join gave its job to the food line | **Yes**, and terminally: "no operational job" was too soft, **dominated** was the true word, and the outcome is that the verb is **CUT** for this sitting |
| **UP** | **Yes** — funded by the line rather than by the terrace's own carries; the greenhouse no longer bootstraps | Shares CARRY's arithmetic error; fixed with it |
| **MEET** | **Yes** — it is now the *only* way marks enter the board | **Yes** — the parent's "an away state has MEET dark" was lost in transcription; restored above |
| **SEND** | **Yes** — its stake splits across two currencies, and its failure record with it | **Yes** — `marksLost` reported the wrong currency; fixed above |
| **MUSTER** | **Yes** — its opportunity cost is four times dearer in marks and slightly cheaper in turns | No defect. The only verb that moved without breaking |

**Six verbs, six movements, four defects.** David predicted MEET specifically,
before the audit ran, on the grounds that it has the least stated purpose and is
therefore inherited on faith. He was right, and the guard was **lost in
transcription rather than argued away** — that is recorded as the failure mode,
because a guard that is argued away leaves an argument behind and a guard that is
dropped leaves nothing.

---

## TEND is dominated — the finding that produced the cut

The beat called it *"no operational job."* The audit's word is **dominated**, and
it is stronger and it is right. In every state where both are lit:

```
TEND then CARRY :  marks -1, reserve unchanged, stores +min(L, 6-S), 2 turns
CARRY alone     :  marks  0, reserve -1 (floors), stores +min(L, 6-S), 1 turn
```

**Identical stores at every level, one mark poorer, one turn slower** — and the one
thing the mark and the turn buy, a step of ground, is read by no rule on this
board. Not by the carry (full yield at bare), not by any send, not by the arming,
not by the muster. It is read by three closing sentences.

**This beat does not pass through the reading that the TEND-then-CARRY bundle is a
marks-to-food shop** — the thing argued alternative 2 was rejected for. Drop the
TEND and the food is identical; the mark buys only the ground step. It is not a
shop, it is a purchase of something nothing reads.

**Why it matters more than inertness.** David, 2026-08-27: *an inert verb can sit
for a sitting; a dominated one is a trap that teaches players the wrong thing.*
A player who reaches for TEND because the macro taught them to is being charged a
mark and a turn for nothing, and the board never tells them.

**It un-dominates for free the moment weather lands.** The storm sitting's carry
cap, `min(level, reserve)` under a storm, is exactly the collector David's
"slow TEND-debt" needs, and it is already drafted and held at
`docs/cfd-201-beat.md`. So the question is only what to do for **one** sitting.

### The one mechanism that un-dominates TEND without touching any kill — RECOMMENDED, and it needs David's ruling because it amends his own

**The ending arms on a topped terrace *and* a full ground.** Nothing else changes.

- It touches **no** kill. Carry yield never varies and the carry never stops
  (Shape 1 untouched). No send reads the reserve (Shape 2 untouched). The board
  describes the ground at a terminal, which is what CFD-183's own terminal does.
- **It is David's own framing, with the missing piece supplied.** He wrote that
  *"every send is already a slow TEND-debt and TEND is the repayment"* and the
  beat's answer was that the debt has no collector. **The arming condition is the
  collector.** Every step drawn must be put back before the bow is taken, so in the
  long run tends equal carries and the ground costs exactly `P/L` marks a send —
  which is, permanently, the passed board's provisions price at level 1.
- **It un-dominates TEND outright**, because there is a state in which TEND is the
  only path to the ending.

**What it costs, measured, and it is not nothing.** The terrace's rate advantage at
the top of the ladder *is* the ground it does not pay back:

| marks per turn, 4 Wardens | halt | L1 | L2 | L3 | L4 |
| --- | --- | --- | --- | --- | --- |
| Mosswake, ground free (as drafted) | 4.120 | 2.744 | 3.659 | 4.116 | **4.390** |
| Mosswake, ground repaid (armed on full) | 4.120 | 1.496 | 2.494 | 3.093 | **3.492** |

**Free, the spine out-earns the free halt at level 4 by 6.6%. Repaid, it loses to
it at every level.** The same flip holds at 0 and 2 Wardens. So the amendment buys
a live TEND and sells the spine's only rate advantage, and the terrace is then run
because the stop requires it rather than because it pays. §7.2 still passes either
way — it requires the short path not to be *worse*, and it is not — but these are
two different boards.

**Second cost, flagged rather than discovered:** on a long sitting the debt is one
tend per carry, so a forty-turn sitting can end in eight or nine consecutive
tends. That is a tidy-up phase, and it may read as tedium rather than as payoff.

**RULED — David, 2026-08-27: (ii). Cut TEND.** The recommendation above was (iii)
and it was refused with reasons, which are recorded in Does and are better than the
recommendation was:

- **(iii) flips the terrace's rate advantage at level 4**, so *"the ladder the ending
  requires you to climb becomes worse than not climbing it."* The beat published
  that flip as a cost and treated it as acceptable; the ruling reads it as
  disqualifying, and on inspection it is — the arming *requires* the climb, so a
  climb that is worse than not climbing is a board arguing with itself.
- **The tedium tail** — eight or nine consecutive tends — is *"the tedium the
  sitting's ambition is supposed to buy you out of, not into."* §7.2 makes length
  opt-in; it does not license length spent on a tidy-up phase.
- **And the general form, which belongs in every future beat:** *"Building a
  synthetic collector so a weather verb has something to do on a weatherless board
  is engineering around a scheduling decision, and it leaves you with a mechanic
  tuned to a constraint that will change the moment the storm board lands."*

**Shipping dominated was ruled out in the same breath**, so the choice was never
cut-or-ship — it was cut-or-amend, and the cut wins because it is **cheap and
reversible**: TEND returns on the storm board with its real job, and nothing about
it has to be re-derived.

| | TEND | the spine at L4 | ending cost | verdict |
| --- | --- | --- | --- | --- |
| (i) ship dominated | a trap | out-earns the halt | none | **REFUSED** — teaches a wrong lesson |
| **(ii) cut TEND** | absent, returns with the storm | out-earns the halt | none | **RULED IN** |
| (iii) arm on a full ground | required | **loses to the halt** | a tail of 8–9 tends | **REFUSED** — the two costs above |

---

## The sit — PLAYED TO CONCLUSION, David, 2026-08-27. VERDICT OUTSTANDING.

**No verdict was given and none is inferred.** His words were *"board played to
its conclusion"* — a statement of fact, not a pass. This board is **not** a
passed board, does not carry a passed board's protections, and must not be
recorded as one. When the verdict comes it goes here.

Sat on the durable host at **`3588bb4`**, `/dawnspur-line/` sim `18b1324f`.

The record it ended on, verbatim from the board:

> "The Chartered cargo is home and the terrace is topped. **Five runs out, four
> cargoes banked, one turned back and cost nothing but the trip. Three from the
> terrace went out on the line. The ground is drawn and standing. Nothing on
> this desk puts it back — that is the next sitting's business.** The record
> keeps what came home; the line past the basin is the next sitting's."

**Every mechanism this beat was revised four times to get right is visible in
that one sentence**, which is the only claim being made about it here:

- **Both loss counters, with a zero named rather than omitted** — *"one turned
  back and cost nothing but the trip"* is the free halt turning back, the
  zero-cost register firing correctly. The single-scalar version would have said
  the same words over dead food; this one has earned them.
- **The food that went out is reported** — *"Three from the terrace went out on
  the line."* On the first draft it was reported nowhere.
- **The one-way ground carries its cause** — *"The ground is drawn and standing.
  Nothing on this desk puts it back — that is the next sitting's business."*
  The fact and the reason in one breath, so the storm board cannot inherit a
  false premise.
- **The arm-and-trigger stop** — *"The Chartered cargo is home **and** the
  terrace is topped."* Topping armed it; the cargo fired it.
- **A drawn ground at the stop, not a bare one**, which the reachability check
  said was the common case and the dead `full` register said was impossible.

At the end of the sitting the terrace's two verbs are both dark and say why —
CARRY *"The stores are full."*, UP *"The terrace is topped."* — and the desk
still quotes 82 / 78 / 65 at a full roster.

**What the sit does not yet tell us** is anything the PM may report as a
finding. That waits on David's own words.

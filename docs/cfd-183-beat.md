# CFD-183 — the scale sitting, recut

Recut of the superseded beat below, drafted from `docs/mechanisms-recommitted.md` §5
(**SIGNED** — David, 2026-08-25) under §6's canon-check discipline. The superseded
beat's convictions stand: no world's-hand DOWN, no level-1 death, no session
meter. Its survivors carry forward: marks-priced UP 3/4/5, the ladder 1..4,
yield +1..+4, the HUD as the build surface, the DOWN-button refusal, the CFD-145
no-refund rule. Card: CFD-183.

**SIGNED — David, 2026-08-25: "signed - proceed with the implementer."** The
implementer builds from this text; the kill list is the red-first test spec;
the recut ships at `/dawnspur-scale/`, replacing the convicted board (whose
bytes stay durable in git at `5fabe7c` and in its immutable deployment).

## Named reading — "gives no sign" against the visible reserve

Geology: a drawn-down island "rides fine for years on a falling reserve, in
clear weather, and gives no sign." MDB (R10): "Each region carries a visible
reserve health that over-extraction lowers." Economy: "the planting tells a
keeper the state of their ground without a gauge." This beat reads the three as
two channels, not a contradiction: **"gives no sign" governs behavior** —
nothing fails, slows, dims, warns, or alerts at any reserve — and **the visible
reserve governs the look** — the planting, read passively by a keeper who
looks. The signed §5.1 already commits to this weld (the reserve draws down
"visibly" and "gives no sign" sit in the same paragraph); this section names
the seam rather than assuming it silently. If the ruling goes the other way —
"gives no sign" covers the look too — then no visible reserve can exist in
clear weather and §5.1 reopens. A record, not a blocker; David rules.

## Seat

Beat only. No implement. No deploy. No merge. Do not recut the lights or the
heat sitting. Do not touch `public/dawnspur`, `public/dawnspur-heat`,
`public/dawnspur-scale`, `public/convoy-stop`, or live board bytes. Do not
`workflow_dispatch`.

Pins, normalized to sha256 at PM review (the author quoted git blob ids —
both instruments verified to agree on the same bytes): the scale board being
recut, at `main` (`5fabe7c`): index `d6d5e262…`, sim `8f13c683…`. Live
re-measured at review: `/dawnspur-scale/sim.js` serves `8f13c683…` and the
host stamps `5fabe7c`, dirty false. Standing pins: `/dawnspur-heat/` index
`b5f7e14f` / sim `292d6645` / greenhouse `7fdf7468` (the heat board as CFD-175's
`efbed23` left it; `test/dawnspur-scale.test.js:80-84` grades these bytes); the
preserved kill at `/dawnspur/` index `bdde9b50` / sim `395c18f2`. *(An earlier cut
read "build `c887359` / index `cedf765c`"; that was the heat index before
`efbed23`, already superseded when this beat was drafted.)*

David sits first. Ask: What happened.

## Does

The greenhouse stands. Level 1, top at 4, on the terrace off A
(`townExpansions[production-terrace]`; `buildings[greenhouse].maxLevel`). The
sitting is pure build plus the triangle's tending leg, non-lethal, per signed
§5.

Three claims on the one train, and a purchase in the HUD:

- **CARRY FOOD** — the profit leg, as played: pays marks by the level (+1, +2,
  +3; the ladder's +4 is never paid, because topped at 4 is the stop and the
  carry goes dark with it — *an earlier cut read "+1, +2, +3, +4"; the level-4
  figure is the engine rule's, unreachable on this board*) and **draws the terrace's reserve down one step**. The ground the
  greenhouse feeds on is the ground the carrying draws.
- **TEND** — REPAIR recut into the tending run. It rides to A like every job on
  this board, **earns nothing**, spends 1 mark, and gives the ground back one
  step. Lit only while the terrace is below full and a mark is in hand.
- **MOSSWAKE +3** — as played: costs 1, pays 3, off-board ground. Lit only
  while the terrace is below full, armed once per carry.
- **UP** — the player's hand, in the HUD, never on the train: spends marks —
  3, then 4, then 5 — and raises the greenhouse one level, instantly. No
  refund in any direction.

The reserve runs 4 down to 0 and floors there. At every reserve, including
bare, the carry pays full and nothing warns — the drawn ground rides fine in
clear weather. **Nothing dies. No level is ever lost. No hand but the player's
moves anything.** The world's turn is clear weather this sitting: it stands,
takes nothing, and its return value says so — a caller can never mistake the
calm for a handled event. No clock calls it; nothing on this board moves with
wall time. The sim never surfaces a level outside 1..4 or a reserve outside
0..4.

The drawn-down reserve is not reckoned this sitting. It is the state the
sitting leaves behind — the reserve you leave is the next sitting's weather
bill.

## Sees

**The terrace's green is the reserve.** Full ground reads lush; each carry
pales and recedes the planting one step; each tend gives a step back; bare
ground is unmistakable at phone glance. Five looks, and the ground's own look
is the only read — no number, no bar, no pip row, no icon, no frame around it,
and the board never warns. The old held/thin binary dissolves into this graded
green: the pad now means exactly one thing, the ground — it no longer stands
in for heat or for a wreck bit (the collapse table's pad row, un-collapsed).
The exact per-step art is the implementer's business under this spec; full and
bare must be unmistakable, the steps between must be readable side by side.

The greenhouse grows at each level and never shrinks, never dies — the dead
and shrinking states are unreachable. The HUD keeps its one line and gains
nothing: pips out of four and UP's price on the one control. The carry's own
label carries the yield — CARRY FOOD +1 becomes +2 the moment the greenhouse
stands taller. TEND sits where REPAIR sat, priced on its face. The bank stays
in the stone. The hearth does not dim. Neither moves for any verb here.

## Ends

They climbed, and nothing could be taken from them — what moved under the
climb was the ground. Every carry drew it, every tend gave back, and the
choice between them was the sitting: output now against holding the line, in
the one currency the climb is priced in.

**Topped at 4 is the one stop.** All jobs go out and the board says what
happened, in its own words, reading the ground it was left on:

- Topped on full ground: *"The terrace is topped and the ground is full.
  Whatever weather comes, something is banked to meet it."*
- Topped on drawn ground: *"The terrace is topped on drawn ground. It rides
  fine in clear weather. The reserve left here is the next sitting's weather
  bill."*

The words may move in register, not in content: the sentence must read the
reserve, and the drawn reading must name the bill without firing it. **A bare
terrace is deliberately not an ending** — stopping there would be a reckoning,
and the reckoning is the storm's, next sitting. No deadlock exists short of
the top: the carry is always lit, so marks can always be earned toward UP.

## On this sitting

| System | This sitting |
| --- | --- |
| Scale / UP | **ON** — the player's hand only, through the HUD, marks-priced 3/4/5; instant; no refund |
| Greenhouse District | **ON** — the one asset, levels 1..4, rooted on the terrace off A; grows, never shrinks, never dies |
| Yield per level | **ON** — the carry pays the level, +1..+4; the button label is the meter |
| The visible reserve | **ON** — 4 steps and a floor; drawn one step per carry, restored one step per tend; read only in the terrace's green |
| CARRY FOOD | **ON** — the profit leg; pays full at every reserve, bare included |
| TEND | **ON** — the tending run, REPAIR recut: rides to A, earns nothing, spends 1 mark, restores one step; lit below full |
| MOSSWAKE +3 | **ON** as played — costs 1, pays 3; lit below full, armed once per carry |
| The world's turn | **ON** as clear weather — stands, takes nothing, reports honestly; no clock calls it |
| End-sentence at topped | **ON** — the board reads the ground it was left on; the drawn reading names the weather bill without firing it |
| Heat / keel-fire bank, hearth | **ON** as standing state from the heat sitting — scenery; scale neither reads nor writes them |
| Marks | civic money **ON**; UP's price **ON**; TEND's stand-in price **ON** (flagged); **REFUSED** as a refund in any direction |
| The storm / any reckoning | **REFUSED** — next sitting's; nothing fires because the reserve is low |
| Storm-tell (stormbird, signal tower) | **REFUSED** — the tell is the storm sitting's opening, not this one's |
| World's-hand DOWN / level loss | **REFUSED** — convicted in the supersession; no level is ever taken |
| Greenhouse death | **REFUSED** — convicted; the home is never the stake |
| Idle meter / any clock | **REFUSED** — nothing moves with wall time; `baseSeconds` 25 stays unimported |
| DOWN button | **REFUSED** — waits, named; the superseded beat's argument stands |
| Refund / sell-back | **REFUSED** — CFD-145: recovered stakes are not payouts |
| Reserve as gauge / number / bar / pips | **REFUSED** — the planting is the read |
| Carry degraded at low reserve | **REFUSED** — the drawn ground rides fine and gives no sign |
| Fuel clock / per-tick drain / ticker / build timer | **REFUSED** — standing |
| WARM as a job | **REFUSED** — its work stands; re-lighting it is a second verb |
| Materials / energy as nouns | **REFUSED** — standing; marks stand in, flagged |
| Waterworks / sunspire | **REFUSED** — the terrace's named siblings stay off |
| A second scaling asset | **REFUSED** — the direction's plural honored serially |
| Air | **REFUSED** — standing; this sitting climbs ground already reached |
| Attacker / raiders | **REFUSED** — the regulator is the cold, not a bandit |
| Furnace word / radius / CFD-163 field | **REFUSED** — standing |

## Kill

- A level is lost — any level, by any hand, ever, this sitting.
- The greenhouse shrinks, dies, or shows a dead state.
- Anything on the board changes with wall-clock time.
- The world's turn returns success without acting, or acts at all this sitting.
- A level outside 1..4 or a reserve outside 0..4 surfaces anywhere.
- A reserve number, bar, pip row, meter, or icon appears — anywhere, HUD included.
- Carrying at low or bare reserve pays less, stops, warns, or alerts.
- Anything fires because the reserve is low. A storm or storm-tell appears.
- TEND earns marks, pays yield, or restores more than one step. A carry draws more than one.
- TEND or MOSSWAKE lights on full ground.
- UP is free, its price does not climb, or UP rides the train.
- Anything refunds — a level, a tend, a mark, in any direction.
- Topped is not a stop, or a terminal state ends without its sentence, or the sentence does not read the reserve.
- A fuel clock, per-tick drain, timer bar, or build timer appears.
- The bank pays for anything, anything drains the bank, or the hearth dims.
- WARM lights as a job.
- B +3, TEND 1, UP 3/4/5, or +1..+4 move. CARRY FOOD at level 1 pays other than +1.
- The HUD grows past one asset line.
- Furnace word, radius, CFD-163 field, Air, a second scaling asset, or an attacker appear.
- 173 lights are recut. The heat sitting is touched.
- Live shas are overwritten (heat index `b5f7e14f` / sim `292d6645` / greenhouse `7fdf7468`; kill `bdde9b50` / `395c18f2`). *(An earlier cut read "`c887359` / `cedf765c` / `292d6645`"; `cedf765c` was the heat index before CFD-175's `efbed23`, superseded before this beat was signed.)*

## The numbers, and where each one comes from

- **maxLevel 4; baseCost materials 35 + energy 8; production food 18;
  baseSeconds 25** — `buildings[greenhouse]` in `skyrail-stakes.json`.
  `baseSeconds` stays unimported: the board has no clock (carried refusal).
- **UP 3 / 4 / 5** — carried from the signed superseded beat. Ratio source:
  the engine's upgrade multipliers `1 + level × 0.55` → 1.55 / 2.10 / 2.65
  (`getBuildingUpgradeCost`, `src/engine.js`), scaled to the smallest civic
  integers. Marks as the unit is the ruled stand-in for materials + energy
  (David's signature: "marks pricing UP is fine").
- **+1 / +2 / +3 / +4** — the engine's linear rule, production = base × level
  (`getProductionPerMinute`, `src/engine.js`), carried to civic scale. Level 1
  pays +1: the played number, untouched.
- **B +3, cost 1** — the played numbers. They do not move.
- **TEND 1** — REPAIR's played price, carried onto the tending run. The number
  is not new; its meaning is, and is **flagged new-play**: the mark stands in
  for the tending load (R10's "heat and liftstone") exactly as marks stand in
  for UP's materials + energy, until a sitting is about those nouns.
- **Reserve depth 4, one step per carry, one step per tend** — **new-play, all
  of it.** No reserve depth exists in the stakes JSON or the engine; per the
  house rule that is reported as the honest null, not derived from thin air
  and dressed as a measurement. The anchor is argued, not sourced: depth 4
  mirrors `maxLevel` 4, so the ground can be drawn as far as the greenhouse
  can climb; and the arithmetic lands where the beat needs it —
  - the minimum pure-carry climb is 7 carries (3 + 2 + 2 at +1/+2/+3), so a
    player who never tends tops out **at bare ground**, the exact state the
    storm sitting wants to inherit;
  - the carry-then-Mosswake line yields level + 2 marks per draw, topping in
    3 draws **at reserve 1** — drawn, not bare;
  - the sustaining rhythm — carry, then tend — nets level − 1 marks with the
    ground held, so holding the line has margin from level 2 up and **zero
    margin at level 1**, on purpose: at the bottom of the ladder you cannot
    both climb and hold.
  David plays these before they are canon; any survivor flows back to the
  pack per its standing rule.

## Canon check

Per `docs/mechanisms-recommitted.md` §6.1: every mechanism this beat turns ON
or REFUSES, and the rule or source line it rests on. Rows mirror **On this
sitting**, in order.

| Row | ON / REFUSED | Rests on |
| --- | --- | --- |
| Scale / UP, marks-priced, HUD | ON | R1 — marks "sink into the civic fees and tariffs and insurance and into buildout" (Core Loop); David's signature on the superseded beat ("marks pricing UP is fine"); §3's survivor list |
| Greenhouse ladder 1..4 | ON | §3: "the level ladder itself, the yield-per-level read, the HUD as the build surface" survive canon |
| Yield per level +1..+4 | ON | §3 survivor; unit values from the engine's linear production rule (source named in The numbers) |
| The visible reserve | ON | R10/MDB — "Each region carries a visible reserve health that over-extraction lowers and that tending runs … raise"; §5.1 SIGNED |
| Reserve read through the ground's look | ON | Economy — "the planting tells a keeper the state of their ground without a gauge"; Named reading above |
| CARRY as the profit leg | ON | R10 — "A load can be profit, goods moved for marks" |
| Carry draws the reserve | ON | R10/MDB — "over-extraction lowers"; §5.1 — "repeated carries draw the reserve down, visibly" |
| TEND as a run on the train | ON | R10 — "tending, heat and liftstone carried to a node whose reserve is falling, which earns nothing but holds the line"; §5.1 — "tending (the reserve run)" as one of "three claims on the same train" |
| TEND earns nothing | ON | R10 — "earns nothing but holds the line" |
| TEND's 1-mark price | ON, flagged | Stand-in for R10's load, parallel to UP's ruled stand-in; canon's own marks-adjacent instrument raises reserve too — "upkeep contracts raise" (MDB, in R10) |
| MOSSWAKE +3 | ON | Played number, standing; profit leg on off-board ground (R10); gate carried from the played board's cadence |
| World's turn as clear weather | ON | R6/Geology — "A drawn-down island rides fine for years on a falling reserve"; §5 — no deaths this sitting |
| World's turn reports honestly | ON | Carried bug-fix spec line from the broken sit: no true-returning no-ops |
| Levels and reserve never out of range | ON | Carried bug-fix spec line from the broken sit |
| End-sentence at topped | ON | The process rule from the broken sit: terminal states say what happened in the board's words; the deferred tell is licensed by §5.2 — "The storm is the NEXT sitting: the reckoning" — and named in this beat's own words at Does ("the reserve you leave is the next sitting's weather bill"). *(An earlier cut attributed that clause to §5; it is this beat's own line, which canon §7.1 later quotes from the board.)* |
| Bank and hearth as standing scenery | ON | R8 — the bank-in-the-stone stands as played (§3); R4 — the hearth is spared, "never touching the hearth" |
| The storm / any reckoning | REFUSED | §5.2 SIGNED — "The storm is the NEXT sitting: the reckoning"; R6/Geology — "The reckoning comes only when a cold stretch arrives" |
| Storm-tell (stormbird, signal tower) | REFUSED | §5.3 — the tell precedes the event, so it belongs to the sitting that carries the event |
| World's-hand DOWN / level loss | REFUSED | R3 — "tended ground does not decay"; R4 — "No decay clocks, no upkeep tax, and no alerts"; the supersession conviction |
| Greenhouse death | REFUSED | R6 — "never the home"; R3/R4; conviction |
| Idle meter / any clock | REFUSED | R4 — "No decay clocks"; R8 — "A quiet stone is never a session meter" |
| DOWN button | REFUSED | Superseded beat's argument stands: with CFD-145's no-refund, no state gives a reason to press it; a control nobody presses is dead UI. Waits, named; David rules |
| Refund / sell-back | REFUSED | CFD-145 — recovered stakes are not payouts |
| Reserve as gauge / number / bar / pips | REFUSED | Economy — "without a gauge" |
| Carry degraded / warned at low reserve | REFUSED | Geology — "rides fine … and gives no sign"; R4 — "no alerts" |
| Fuel clock / drain / ticker / build timer | REFUSED | R7 — "never needs the fire to stay up"; R2 — upkeep "refused by name"; standing kills |
| WARM as a job | REFUSED | §3 — the heat sitting stands as played; re-lighting is a second verb, and one system per sitting is the discipline (§5.6) |
| Materials / energy as nouns | REFUSED | Standing refusal; marks stand in, flagged (ruled at the superseded beat's signature) |
| Waterworks / sunspire | REFUSED | Standing — `townExpansions[production-terrace].buildings` names them; they stay off |
| A second scaling asset | REFUSED | Standing — the direction's plural honored serially, one asset per ground |
| Air | REFUSED | R9 — "no build that does both"; this sitting climbs ground already reached |
| Attacker / raiders | REFUSED | §5.4 — “This is a soft sink, and it earns its place as drama and texture rather than as the economy’s regulator. The regulator is the cold.” (Economy `:47`, under the heading “Raiding and loss are a soft sink, not the regulator”) *(an earlier cut opened the quotation “Raiding and loss are a soft sink …”, which is the heading with “, not the regulator” dropped, spliced onto the body — the same splice corrected in the canon at §5 on 2026-09-02)* |
| Furnace word / radius / CFD-163 field | REFUSED | Standing kills, carried |
| Marks-as-heat (anywhere) | REFUSED | R1 — "marks never are the heat"; the bank neither pays nor is paid |

## Author's argued alternatives

The house records rejected roads. Three were close.

**1. TEND as the REPAIR button — a mark spent at the pad, no run.** The
smallest diff from the played board, and rejected on canon's own words: R10
makes tending a *load*, one of three claims on the same train, and signed §5.1
names it "the reserve run." A button-tend spends money but not the trip, so
the felt choice — "output now against holding the line" — never touches the
train, and the triangle stays collapsed one leg short: profit and tending
would compete for marks but not for the one thing this board has exactly one
of. The phone-board objection dissolves on inspection: the played board's
REPAIR already rides — pick, LEAVE, the train runs to A and back — so
tending-as-a-run costs the implementer a rename and a regrade, not a new
grammar. The one-train constraint is not a reason to shrink tending to a
button; it is the reason tending works: one train is what makes a tending run
*cost* a carry.

**2. TEND free — the trip is the whole price.** The purest R10 reading:
"earns nothing" is the canonical cost, and canon prices the load in cargo this
board does not carry. Rejected for this board, narrowly: with marks the only
noun, a free tend prices holding the line at zero on the one ledger the player
watches, and the allocation goes numb exactly where the beat exists to make it
felt — tend-whenever-idle becomes strictly dominant reflex, not a choice. The
1-mark price keeps REPAIR's played number on the board, stands in for the
tending load the way marks already stand in for UP's cost basis (both
flagged), and has a canon cousin in the marks-adjacent "upkeep contracts" that
raise reserve (MDB). If David reads the mark as smelling of an upkeep bill —
R2's territory — the free tend is the fallback, and only the flag changes.

**3. A reckoning floor — carry chokes, or the sitting stops, at bare
ground.** Rejected outright. Any behavior change at low reserve is a
reckoning, and §5.2 places the reckoning in the next sitting, delivered by
the canonical agent: "The reckoning comes only when a cold stretch arrives
and there is nothing banked to meet it" (Geology). A choked carry is also a
sign, and the drawn island "gives no sign." This sitting's consequence is a
*state*, not an event — carried out of the sitting in the ground's look and
named once, in the end-sentence, as the next sitting's weather bill.

---
---
# The scale sitting — first-cut beat

> **SUPERSEDED IN PLACE, 2026-08-25, same day it was signed.** David's sit broke
> on the sitting this beat specified, and his direction to recommit to the
> source docs produced `docs/mechanisms-recommitted.md`, which convicts this
> beat's core: DOWN-as-the-world's-hand on held ground is the upkeep treadmill
> the economy doc refuses by name ("tended ground does not decay"), applied to
> the home the teeth never reach, on the session meter the geology doc says a
> quiet stone is not. What survives: marks-priced UP, the level ladder, the
> yield-per-level read, the HUD line. The recut beat follows David's answer to
> the recommitment doc's one open question. This text stays as the record.

**SIGNED — David, 2026-08-25: "the beat is approved, marks pricing UP is fine."**
Card: CFD-183. The open question below is RULED by that signature: "WARM spends
a mark" means heat is not money; a building level is a purchase, and marks
price UP. The question's text stands as the record of what was asked.

## Named open question — RULED at signature, kept as record

The nearest kill line is **"WARM spends a mark"** (killed 2026-08-24). This beat prices SCALE UP in marks. I read that kill as *heat is not money* — a hauled load must never be a purchase — and a building level as a purchase in every cut of this game: the rough build system David names in the direction priced every level, and the stakes JSON prices this one (`buildings[greenhouse].baseCost`: materials 35, energy 8). Marks stand in only because materials and energy have not reached a board. If the kill instead means *no new verb spends marks*, then UP has no price this sitting, and a free climb with rising yield is a money pump — I would rather this beat be refused than cut that. **Rule on the reading, not the number** — the numbers are flagged as new-play below either way.

## Seat

Beat only. No implement. No deploy. No merge. 176 stays Done. Do not recut the lights. Do not touch `public/dawnspur`, `public/dawnspur-heat`, `public/convoy-stop`, or live board bytes. Do not `workflow_dispatch`.

Live (do not overwrite): https://boards.skyrailreclamation.com/dawnspur-heat/ build `c887359` / index `cedf765c` / sim `292d6645` / greenhouse `7fdf7468`. The preserved kill at `/dawnspur/` stays index `bdde9b50` / sim `395c18f2`. (Pins re-quoted at orchestrator review 2026-08-25 — the draft's author measured before the nouns and greenhouse landings; sim unchanged across both.)

David sits first. Ask: What happened.

## Does

The greenhouse stands. The step that went out in the heat sitting has rooted on the terrace off A — Greenhouse District, level 1, top at 4 (`buildings[greenhouse].maxLevel`). The loop runs as played: CARRY FOOD, MOSSWAKE +3, REPAIR 1. One new verb: SCALE. It lives in the HUD, not on the train. UP spends marks and raises the greenhouse one level — 3, then 4, then 5 (new-play numbers; see The numbers). The carry pays by the level: +1, +2, +3, +4. Every carry thins the pad, as played — the ground the greenhouse feeds on is the ground the carrying wrecks. The wait is the world's turn: on held ground the greenhouse stands; on wrecked ground it steps DOWN one level. From level 1, down is dead. Nothing refunds — not a level lost, not a greenhouse fallen. DOWN is real and it is the world's hand; a DOWN button is refused this sitting, argued in the appendix.

## Sees

The greenhouse grows at each level and shrinks at each fall — the sprite is the read, and its per-level cuts are CFD-175's business, not this beat's. The HUD gains one line and no more: the greenhouse's level as pips out of four, and UP's price on the one control. The carry's own label carries the yield — CARRY FOOD +1 becomes CARRY FOOD +2 the moment the greenhouse stands taller. No ticker. No timer bar. No resource panel. The pad shows thin before any wait can take a level — the fall never fires unannounced. The bank stays in the stone. The hearth does not dim. Neither moves for this verb.

## Ends

They scaled the terrace. Levels were bought and could always be lost. A wrecked wait took one back; at level 1 it took the greenhouse — dead while marks were in hand and the climb was unfinished. That is the standing sentence answered on this board: **what can die is the greenhouse and every level in it; what stays at stake when it dies is the marks sunk, the levels unclimbed, and the carry still lit.** Broke on wrecked ground, the player is not a spectator: the dying greenhouse still pays its carry, and one carry buys the repair — the race is the sitting. At 4 the climb is done. Fallen or topped, sitting stops.

## On this sitting

| System | This sitting |
| --- | --- |
| Scale | **ON** — the one verb; two directions, two hands. UP is the player's, through the HUD. DOWN is the world's, at the wait |
| Greenhouse District | **ON** — the one asset (`buildings[greenhouse]`; "Produces food and medicine from restored sunlit terraces"); rooted at level 1 on the terrace off A (`townExpansions[production-terrace]`) |
| Yield per level | **ON** — the carry pays the level; the button label is the meter |
| Marks | civic money **ON**; **ON** as UP's price (new-play, flagged); **REFUSED** as a refund in any direction |
| Wreck / thin pad vs HOLD | **ON** as played — and now consequential: wrecked ground at the wait is the only thing that scales DOWN |
| The wait | **ON** as played — the world's turn; the only hand that takes a level |
| Heat / keel-fire bank | **ON** as standing state — the bank holds, the hearth holds; **REFUSED** as scale's battery, **REFUSED** as anything scale can drain |
| WARM | **REFUSED** as a job — its work stands; re-lighting it is a second verb |
| DOWN button | **REFUSED** this sitting — argued in the appendix; David rules |
| Refund / sell-back | **REFUSED** — a level lost pays zero, per the decided CFD-145 rule that recovered stakes are not payouts |
| Materials / energy as nouns | **REFUSED** this sitting — the JSON's cost basis, named and waiting; marks stand in, flagged |
| Waterworks / sunspire | **REFUSED** — the terrace's named siblings (`townExpansions[production-terrace].buildings`) stay off |
| A second scaling asset | **REFUSED** — the direction's plural is honored serially, one asset per ground |
| Production ticker / build timer / resource panel | **REFUSED** — the HUD gains one line; the board has no clock, so `baseSeconds` 25 is not imported and UP lands instantly (deviation flagged) |
| Fuel clock / per-tick drain | **REFUSED** — standing |
| Furnace word / radius / CFD-163 field | **REFUSED** — standing |
| Air | **REFUSED** — standing; opens new ground, and this sitting climbs ground already reached |
| Attacker | **REFUSED** — standing |

## Kill

- UP is free, or its price does not climb.
- DOWN refunds anything.
- A level cannot be lost. The climb is a bank.
- The greenhouse cannot die from level 1.
- The fall fires without the thin pad showing first.
- A fuel clock, per-tick drain, timer bar, or build timer appears.
- The bank pays for scale, scale drains the bank, or the hearth dims.
- WARM lights as a job.
- B +3 or REPAIR 1 move. CARRY FOOD at level 1 pays other than +1.
- SCALE rides the train.
- A second scaling asset appears.
- After a survived wait, UP is the only lit job.
- The HUD grows past one asset line.
- Furnace word, radius, CFD-163 field, Air, or an attacker appear.
- 173 lights are recut.
- Live shas are overwritten (`c887359` / `cedf765c` / `292d6645`; kill `bdde9b50` / `395c18f2`).

## The numbers, and where each one comes from

- **maxLevel 4; production food 18; baseCost materials 35 + energy 8; baseSeconds 25** — `buildings[greenhouse]` in `skyrail-stakes.json`.
- **The per-level curve is not in the JSON.** The pack's README claims per-level production; the JSON carries base values only. The curve lives in the engine: production = base × level (`getProductionPerMinute`), upgrade cost = baseCost × (1 + 0.55 × level) (`getBuildingUpgradeCost`), both `src/engine.js`. Said plainly per the stop rule: the JSON lacks the curve, so I took the engine's rather than invent one.
- **+1 / +2 / +3 / +4 per level** — the engine's linear production rule carried to civic scale. Level 1 pays +1: the civic number as played, untouched.
- **UP at 3 / 4 / 5 marks** — the engine's cost multipliers for 1→2 / 2→3 / 3→4 are 1.55 / 2.10 / 2.65; scaled to the smallest civic integers that is 3 : 4.06 : 5.13. The *ratio* is the pack's two months of tuning; the *unit* is a deviation — marks in place of materials + energy — and the *anchor* (first price 3, one Mosswake haul) is mine. All three are new-play numbers: David plays them before they are canon, and any survivor flows back to the pack per its standing rule.
- **B +3 and REPAIR 1 do not move.**

---

## Author's argued alternatives

The house records rejected roads. Three were close.

**1. SCALE as a dispatch — the train hauls the build load, the way WARM hauled heat.** Rejected on the direction's own words: the scaling happens *"through the HUD."* It also re-cuts WARM's shape under a new noun, and the sitting's actual sentence is that the town grows a second surface — the train stays the dispatch economy, the HUD becomes the build surface, exactly the split the rough build system had. The cost of this road not taken: SCALE is the first verb that does not ride the train, and that break in the board's grammar is deliberate.

**2. A DOWN button.** David — you said up *and* down, so here is the argument to your face rather than a silent cut. DOWN exists this sitting and it is real: the world steps the greenhouse down at every wrecked wait, and from level 1 it kills. What I refused is the *button*. With no refund — and refunds are refused above — a DOWN button only destroys what you paid for, and there is no state this sitting where pressing it beats repairing or carrying. A control nobody has a reason to press ships as dead UI, and this project has already shipped one dead button and paid for it. I also considered the harsher cut that gives the button a job: the world's answer takes the *whole* greenhouse in one wrecked wait, and the button is the controlled retreat that saves the rest. Rejected too — it conflates one wrecked pad with the whole climb, and one 1.5-second wait becoming catastrophic is a rage cut, not a stakes cut. If you want the button anyway, name what pressing it buys, and it goes in the next beat with a price.

**3. Yield as idle production — food accruing per minute, per the JSON's 18/min.** Rejected. Per-minute production is the PWA engine's instrument; this board has no tick, and an accruing number is decorative motion with a HUD tax. The carry is the yield read — the player *does* the production number instead of watching it. Same verdict for importing materials and energy now: two new nouns plus their carry logistics to price one verb is a second system smuggled inside the first, so the JSON's cost basis waits, named, until a sitting is about it.

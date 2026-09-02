# CFD-201 — the storm sitting (the first cumulative board)

The multi-loop architecture's fourth loop, and the first board that **inherits**.
`docs/mechanisms-recommitted.md` §7 (RULED — David, 2026-08-26: *"yes draft the
amendment, and make the next board cumulative"*) drops "one system TOTAL on the
board" and keeps "one NEW system per sitting". This board is `/dawnspur-dispatch/`'s
desk and `/dawnspur-scale/`'s terrace on one town under one sky, with **weather as
the single new system**. Drafted under §6's canon-check discipline. Card: CFD-201.

## SIGNED — David, 2026-08-28

His words: *"So sign, with the counter."*

**Signature was HELD earlier the same day and then released, and the reason it was
released is not the reason it was held.** He held because the trim's take-up rate
had no instrument, and the trim is this board's newest priced decision:

> *"Signing a beat whose newest mechanic is unmeasurable means the sit is testing
> the trim and the storm at once, and you won't be able to attribute a bad result.
> If a storm sim is cheap, it's cheaper than an ambiguous sitting."*

**The sim was then measured and found IMPOSSIBLE, not expensive.** The trim costs
marks and buys reliability on a stake denominated in food. Any solver needs a total
order over outcomes, and canon §7.3 forbids a marks-per-food exchange by name — so
**whatever rate a solver assumed would be its answer.** The instrument would report
its own premise. The marks-EV solver that *can* be written was run and returns
"never trim", which is a designed property of the price rather than a finding.

**So the hold's stated route was closed rather than satisfied, and the attribution
it was protecting is bought another way.** `runsTrimmed`, specified in *Ends*, is
under ten shipped lines against a denominator that already exists, and it records
what a player *did* where a solver could only ever have produced what a player
*should*. David: *"That's better than the thing I asked for."*

**Three refusals travel with the signature and are not to be re-opened:**

1. **No stripped trim probe.** Canon §7 forbids it by name, his own dispatch
   sitting measured it (*"the sitting was thin"*), and mechanically two marks with
   no competing sink is *free* — the exact cell the pricing ruling was issued
   against. It would return "players don't pay for chance" as a near-guaranteed
   null. *"Cheap instruments that answer the wrong question are worse than no
   instrument."*
2. **No storm-lite board.** Dropping `min(level, reserve)` removes the only place
   the reserve has teeth, and the storm becomes free money on the Chartered line.
3. **No exchange rate to rescue a comparison.** Canon §7.3, and the guard there.

**What the signature does NOT settle**, carried to the sit card rather than buried:
the counter tells you whether you paid, never whether two marks is the right price.

Card: CFD-201.

The sitting exists to make two sentences that are already live on a passed board
mean different things. `sit/dawnspur-scale/sim.js:31-32`, shipped, said to a
player who had never seen weather:

> "The terrace is topped and the ground is full. **Whatever weather comes,
> something is banked to meet it.**"
> "The terrace is topped on drawn ground. It rides fine in clear weather. **The
> reserve left here is the next sitting's weather bill.**"

This is that sitting. A drawn ground has to cost something when the weather
comes, or the scale board was lying.

---

## Seat

The drafting seat was beat only — no implement, no deploy, no merge. The board
has since shipped at `/dawnspur-storm/` (`42e4aa8`, 2026-08-28; sim `f4f17008`,
index `7711f979`, both in `sit/dawnspur-storm/MANIFEST.txt`) and David sat it
five times, 2026-08-28 to 2026-08-29 local, each sit answered by a recut —
five recuts, three of them copy, each recorded in the MANIFEST and the sim's
header — and it stopped after five recuts and no pass: *"Mechanically it all
worked nicely… It's definitely time for the city."* The stop is recorded at
canon §7.4 and `docs/cfd-209-beat.md`; `KILLS.md`, the ledger of record, carries
no storm line. The board stands at that sha, unpassed, and is not to be recut
for *"why more glass"*. *(An earlier cut read "Beat only. No implement. No
deploy. No merge."; true on the day of signature, record now.)* The do-not-touch
list still binds. Do not touch `public/dawnspur`,
`public/dawnspur-heat`, `public/dawnspur-scale`, `public/dawnspur-dispatch`,
`public/dawnspur-line`, or `public/convoy-stop` — **nor the `sit/` copy of any
board that has one, nor any other board directory present at HEAD.** The
enumeration is a courtesy; the catch-all is the rule. This list said five when
`git ls-tree -r --name-only HEAD public/` already returned six, and it named only
`public/` while the lineage lock in `test/dawnspur-line.test.js` pins `sit/` and
`public/` alike. Do not `workflow_dispatch`.

**Pins are the live boards, never `main`** (CFD-200's correction of CFD-196's
stale `main` pin stands). Re-measured, `git show HEAD:public/<p>/sim.js
| sha256sum`, at boards `7f58c8f`. The five rows recorded at `ccd5384` all
re-measure **unchanged**; `/dawnspur-line/` is the added row, and it did not exist
in the tree at that stamp:

| board | sim sha256 (first 8) | index sha256 (first 8) |
| --- | --- | --- |
| `/dawnspur-line/` | `18b1324f` | `b6f21db0` |
| `/dawnspur-dispatch/` | `576ce2b6` | `31aead60` |
| `/dawnspur-scale/` | `953368a1` | `5d2f452f` |
| `/dawnspur-heat/` | `292d6645` | — |
| `/dawnspur/` (the preserved kill) | `395c18f2` | — |
| `/convoy-stop/` | `5ad814e6` | — |

All six stand. `/dawnspur-line/` **PASSED** its sit on 2026-08-28 and is this
board's parent; `/dawnspur-dispatch/` and `/dawnspur-scale/` passed theirs before
it. None gets overwritten.

**The new board lands at `/dawnspur-storm/`.** Argued: it is Dawnspur's board —
the cumulative rule makes the town the unit, not the loop — and the new system is
the storm. Not `/dawnspur-weather/`: weather is the category, the storm is the
thing being sat, and `/dawnspur-storm/` is what a kill line can name. Not
`/dawnspur-scale-2/` or `/dawnspur-dispatch-2/`: this is neither loop's second
sitting. `/dawnspur-rustfall/` is CFD-200's and is not touched.

David sat it five times. Ask: What happened. *(An earlier cut read "David sits
first."; the sits happened — see the Seat.)*

---

## Named ruling — the crew names

**RULED — David, 2026-08-27**, confirming his own 2026-08-27 terms:

> "On the note on 1 agreed that is a preferrable naming convention so let's keep
> what I said previously (it has just been a while since discussing them while we
> rebuilt the game)"

The set is **Rail Warden, Ranger (exploration), Marksman (ranged combat/defense),
Engineer (train operations and upgrades)**. The board speaks David's names; the
provenance cites the pack's ids. That is the move the dispatch board already
makes — canon nouns on the face, pack ids in the numbers section.

| ships as | pack id | pack's power | this sitting |
| --- | --- | --- | --- |
| Rail Warden | `wardens` | guard 3 | **INHERITED** — 3 marks, cap 4, unchanged |
| **Ranger** | `rangers` | scout 3, guard 1 | **ON** — 2 marks, cap 1, the weather unit |
| Marksman | `gunners` | fire 4 | **REFUSED** — CFD-200's, priced 5, not spent here |
| Engineer | `sappers` | repair 4 | **REFUSED** — CFD-200's, priced 6, not spent here |

The Ranger is the weather unit and David's own parenthetical is the argument for
it: **exploration.** The pack agrees five separate ways, and every one of them is
a scout reading air rather than a guard absorbing it —
`crewTypes[rangers].description` ("Reveal ambushes, **patrol risky routes**, and
improve survey odds"); `ROUTE_EVENTS[fog-bank]` ("Cloud Fog Bank" — "**Scouts**
reduce ambush odds and route confusion"); `ROUTE_EVENTS[gust-window]` ("**Scouts**
and conductors can **time** a faster Windreef crossing"); the weather route's own
second tag (`routes[cloud-basin-span].tags`: `["weather", "survey"]` — the weather
route is the survey route, and rangers "improve survey odds"); and the corpus's
instrument-birds, whose competencies are listed as "**reading current and
weather**, route-reading, signal relay" and whose whole point is that "a trained
one is how a player knows the weather is turning **with no readout on the
screen**" (Creature-Bond).

That last clause is load-bearing beyond the crew question and is quoted again in
Sees: **canon forbids the weather gauge by name.**

---

## Three seams the join opens, named rather than assumed

A cumulative board reaches into passed boards' rules whether the author admits it
or not. Three places, all three flagged, none welded. §6 forbids the weld.

### Seam 1 — the carry's yield, and the scale board's own kill line

`docs/cfd-183-beat.md` Kill: *"Carrying at low or bare reserve pays less, stops,
warns, or alerts."* That line is why the scale board pays the level in full at
every reserve, bare included.

**This sitting turns that line conditional: it binds in clear weather and it does
not bind in a storm.** In a storm the carry pays `min(level, reserve)`.

It is not a reversal, because the kill's own citation is scoped in the source it
came from. Geology: "A drawn-down island rides fine for years on a falling
reserve, **in clear weather**, and gives no sign. **The reckoning comes only when
a cold stretch arrives and there is nothing banked to meet it.**" The scale beat
took the first sentence and made a rule of it. This beat takes the second, which
is the same sentence's other half and is what §5.2 SIGNED already promised to this
sitting. Signed §5, verbatim: *"the storm is the next sitting's reckoning."*

**If this is wrong, the whole board is wrong**, because it is the only place the
reserve has teeth. Without it the storm draws a number that never bites and the
terrace's whole half of the sitting is decoration. Named for review, and named
first.

### Seam 2 — CARRY and TEND light past a topped terrace

The scale board's `canCarry()` is `!topped()` and `canTend()` carries the same
guard. That was not a rule about carrying; it was the terminal rule — *topped at
4 is the one stop*, so at the stop all jobs go out.

On this board topping does not stop the sitting; it **arms** it, and a Chartered
cargo home out of a storm fires it (RULED — David 2026-08-27, ruling 5; canon
§7.2). So the guard re-attaches to **this board's** stop: CARRY and TEND are lit
until the sitting stops — which is now strictly *after* topping, never at it, so
the re-attached guard has real work to do rather than none. UP still goes dark at
level 4, because at level 4 there is nothing to buy — that guard is about the
ladder and it stays.

Re-expressed, not moved. A topped greenhouse that cannot be carried from is a
level-4 asset that produces nothing, which is the opposite of what the ladder is
for.

### Seam 3 — MOSSWAKE +3 is dropped, and it is the first inherited system refused

The scale board ships `MOSSWAKE +3` (costs 1, pays 3, armed once per carry). The
dispatch board ships `SEND — MOSSWAKE LOOP` (baseRisk 0.12, pays 14). **On one
board the name collides**, and one of the two is a route with stated odds and a
committed stake while the other is a free +2 with a per-carry lock.

The route wins. The scale board's B verb is **REFUSED** on this board, by name,
for the collision — not for its mechanics, which were fine. **The collision is why
a choice had to be made; it is not the whole ground the cut was granted on, and
this Seam must say so.** David's ruled words are *"cutting redundant is cheaper
than renaming colliding"* (2026-08-27, ruling 1 below), and the precondition he
attached is the two-vehicle claim: the terrace must have work while the train is
out. `/dawnspur-line/` verified that condition in shipped code rather than
assuming it — `canCarry()` reads no `away` — and Kill-listed it there under *The
join itself*. This board inherits the cut and its condition together. Break the
two-vehicle claim and the cut falls, whatever the collision argument says. §7 says a sitting
*inherits what has passed*; it does not say a join may not resolve a collision the
join itself creates. This is the first time an inherited system has been dropped
and it should be read as a precedent being set, not a detail.

The alternative — rename it — was rejected: renaming a shipped verb is also a
change to an inherited system, and it buys a second Mosswake that pays 3 next to
one that pays 14. **David overrules this in one sentence if he wants the verb
back under a new name.**

---

## Two things in the commission this beat refuses

### The Signal Tower does not ship, and its citation is a weld

The commission says: *"`buildings[signal-tower]` exists in the stakes pack
(`C:\dev\skyrail\src\content.js:114`) — the storm-tell has a canon building
waiting to own it."*

The line number is right; the inference is not. Measured, `content.js:114-121`:

```
id: "signal-tower", name: "Signal Tower", district: "Rail",
description: "Reveals damaged routes and improves safety on known lines.",
unlocks: ["route discovery"],
```

**The building's own text says nothing about weather.** It reveals damaged routes
and raises safety on known lines. The weather-tell quote the commission pairs with
it — *"Light it and we can see the weather coming before it hits the convoys"* —
is verbatim (`Skyrail-Reclamation-Content-Build-Cinderbelt-Windward.md:101`) and
belongs to **the Updraft Relay**, a Lio Glass hero beat at the Cinderbelt frontier
edge, not to the Signal Tower building at Dawnspur. Welding them would put a
weather claim into a building whose own description is about damaged track.

Three further reasons it stays off, any one of which would be enough:

1. **The tell must be free.** §5.3 SIGNED makes the storm fair *because* it is
   telegraphed. A tell you buy is a storm that is unfair until you buy it.
2. **It is a second new system.** A building with a level ladder, a price, and
   `unlocks: ["route discovery"]` is a whole surface, and route discovery is
   already a standing refusal on the dispatch board (`discoveredAtSignalLevel`).
3. **Canon already supplies a tell that costs nothing and is not a building.**
   The stormbird. Bestiary, verbatim: *"to see a stormbird inland is to know a
   storm is coming in behind it"*, under the world-wide principle "creatures as
   instruments … stormbirds precede storms".

**REFUSED, argued.** The relay's sitting can have it, and the Ranger's lead-time
alternative in the argued section is the same idea bought a cheaper way.

### Stake (a) does not become a new loss rule, and saying it would be dishonest

§5.2 SIGNED promises that *"haul and in-progress stakes arrive inside the storm"*,
naming (a) haul in transit at risk and (b) the in-progress purchase suffering.

**(a) is already shipped.** The dispatch board's stake is the haul committed to
the run — provisions and toll, spent at the click, paid back in no direction, lost
whole on a turned-back run. §5 wrote (a) as a stake the scale lineage did not yet
have, because on the scale board it had no canonical agent (§5.4). The dispatch
loop then landed it early under David's own 2026-08-26 direction and ruling. So
what the storm does to (a) on this board is **make it bite** — the turned-back
rate on a Chartered send rises from 34.6% to 44.6% at a full roster — not invent a
second loss.

**The alternative was considered and refused by name**: a storm that arrives while
a run is away and lowers the number the meet rolls against. That is the dispatch
board's first Kill line — *"The stated percent and the sim's rolled threshold
disagree anywhere"* — and it would make the storm a second instrument behind the
card. **The sky is stamped onto the run at the SEND and the meet rolls what the
card said.** The haul is at risk because the player put it into weather they could
see, which is the passive tier's whole shape: the read happens at the desk.

**(b) is refused this sitting**, and named. This board's only in-progress object is
an UP, which lands instantly on the passed board; making it take a run to deliver
is a change to an inherited system in service of a stake §5 already routes through
the reserve. The reserve **is** this board's (b): the project left mid-advance is
the ground left mid-tended, and the storm is what finds it.

---

## Does

**One town, one sky.** The terrace stands above the town on the ground off A; the
switchyard desk stands below it. The same weather is on both. That is the fiction
join, and it is the only join the board needs to make: everything else was already
Dawnspur.

Two vehicles, and the board says so. The line train works the routes and can be in
exactly one place. The terrace shuttle works the ground off A — the carry, the
tending run, the delivered level — and is the town's own hands. `buildings[switchyard]`
is the licence: *"Dispatches trains, **adds scheduling capacity**, and keeps cargo
moving."* So the terrace does not go dark because a run is out, and R10's three
claims stay where CFD-183 put them: on the shuttle.

### The sky

Three states, and the sky is the world's own turn.

- **CLEAR.** The board as both parents shipped it. Every published number stands
  bit-identical.
- **STORMBIRD INLAND** — the tell. **Odds and pays are exactly clear's.** The bird
  is news, not weather. It says, in the board's words, that a storm is coming in
  behind it.
- **STORM.** Every sendable route's stated chance falls by 10 points. The Chartered
  Line's pay rises 18 to 24 — the desperate counterparty. The Core Line's pay does
  not move. The terrace pays `min(level, reserve)`, and the ground is drawn one
  step for every turn spent under the storm.

**The sky advances one step per committed player action, and by nothing else.**
MUSTER, SEND, MEET, CARRY, TEND and UP are each one turn. Nothing moves with wall
time; nothing moves while the player is away; nothing moves because a number is
low. The cycle is fixed and repeating: **five clear, two bird, two storm**, period
nine.

**`wait()` still stands, takes nothing, and returns false**, and on this board that
matters more than on either parent. There is no pass. The storm does not blow over
because you waited; it blows over because you did something, and choosing what is
the sitting. Calm can never read as a handled event, and now it cannot read as a
free turn either.

Order within a turn: **the commit resolves against the sky as it stands, then the
sky advances; a turn resolved under a storm draws the ground one step at its end.**
So a carry taken in a storm draws two — one for the carry, one for the storm — and
a tend taken in a storm gives one and loses one, which is why you cannot out-tend a
storm and can only hold through it.

### The desk

Inherited whole from `/dawnspur-dispatch/` and its two amendments: three sendable
routes and Rustfall dark; the muster slider on the card ground; the charter
condition; SEND commits and MEET resolves; honest dice at the stated percent; a
failed run pays zero; nothing refunds in any direction; the crew always comes home
on both branches; the roster rides every send.

What weather adds, and only this:

- **The stated percent carries the sky.** `success = clamp(0.76 − baseRisk + 0.012 ×
  (3 × Wardens + 1 × Rangers) + weather, 0.12, 0.96)`, weather 0 in clear and under
  the bird, −0.10 in a storm. One instrument still: the number on the card and the
  number the meet rolls against are the same number, and the SEND stamps it.
- **The Chartered Line pays 24 in a storm.** Stated on the card before the click,
  next to the fallen percent. The Core Line pays 10 and 14 in every sky.
- **TRIM — a Ranger's send.** With a Ranger on the roster, every route in a storm
  offers a second send: the crew takes the long way round the weather. **A trimmed
  run is quoted at the clear-weather chance, pays the clear-weather rate, and
  stakes two marks more** for the days the long way adds. Without a Ranger, the
  storm send is the only send.

**Stakes do not move, and after the join they are read in two units.** 0m 0f /
0m 2f / 1m 3f in every sky — the Chartered toll off the wallet, the provisions
off the terrace, verbatim from the passed board. A trimmed run's extra **two
marks** are that option's own stake, not a change to the route's; they are marks
rather than a provision by David's ruling of 2026-08-28, and the derivation is
under *New-play, flagged*.

### The terrace

Inherited whole from `/dawnspur-scale/`: the greenhouse at level 1, top at 4; UP at
3, then 4, then 5 marks, instant, no way back; CARRY pays the level; TEND spends 1
mark, earns nothing, gives the ground back one step, lit only below full; the
reserve 4 down to 0, floored, read only in the ground's five graded looks. No
gauge, no number, no bar, no pip row.

What weather adds, and only this:

- **In a storm the terrace gives what the bank can cover: `min(level, reserve)`.**
  In clear weather and under the bird it pays the level in full at every reserve,
  bare included, and gives no sign — unchanged.
- **Every turn spent under a storm draws the ground one step**, on top of whatever
  the turn's own action drew. The draw floors at 0 and touches nothing else: not
  the level, not the greenhouse, not marks, not the roster, not the record.

Nothing dies. No level is ever lost. The greenhouse never shrinks. R6's home is
never the stake.

### The wallet

One line, marks, and after the join it has exactly **one** faucet. Faucets: the
routes (+10 / +14 / +18, and +24 at the basin in a storm) — **and nothing else.**
The carry mints no marks on this lineage:
`grep -n "s\.marks *+=" public/dawnspur-line/sim.js` returns one line,
`s.marks += r.pays`, and CARRY writes `s.stores` (`sim.js:383`). Sinks: MUSTER 3 a
Warden and 2 a Ranger, the **Chartered toll, 1**, TEND 1, UP 3 / 4 / 5. **The
provisions are no longer a marks sink at all** — `commitSend` takes them off the
stores (`s.stores -= r.provisions`) and takes only the toll off the wallet — so a
send's stake reads in two units and never one: **0m 0f at the halt, 0m 2f at
Mosswake, 1m 3f at the basin**, and the trimmed run stakes two marks more.

**The terrace grows the second stock: CARRY yields FOOD, +1 to +4, capped by what
the stores can still hold.**

 **Heat is not on this board and is not a
currency here**: the keel-fire bank and the hearth stand as scenery from the heat
sitting exactly as they do on both parents, and nothing on this board reads or
writes either. R1 holds because the collision it forbids never occurs.

**The reconciliation is that marks stop being the binding constraint and turns
become it.** A single Mosswake cargo pays 14 and the whole greenhouse ladder costs
12, so on this board the climb is not a marks problem. It is a turns problem: three
levels are three turns, four steps of reserve are four turns, and there are seven
workable turns between one storm and the next. **TEND's price is 1 mark on its face
and one TURN in fact — one turn, not one run**, and the beat's earlier figure
charged it a run. "Eight to nine expected marks" is the *whole-run* EV of the best
clear send under the parent that took the stake in marks (Mosswake 8.98 at 4
Wardens, 9.14 at 4W+1R), and a send is SEND **plus** MEET. One TEND buys one turn,
so the rate that prices it is marks per turn, not marks per run.

Re-derived under the join, where a stake is food and only the Chartered toll is
marks, and charging every run the carry-turns that grew its food — n food at
greenhouse level L costs n/L carry-turns — the best send per turn is:

| roster | greenhouse 1-3 | greenhouse 4 |
| --- | --- | --- |
| bare | **Dawnspur Halt 3.40** | **Mosswake 3.58** |
| 4W | **Dawnspur Halt 4.12** | **Mosswake 4.39** |
| 4W, 1R | **Dawnspur Halt 4.18** | **Mosswake 4.46** |

**So one TEND forgoes between 3.40 and 4.46 expected marks, not eight to nine —
overstated 2.0 to 2.7 times, and almost the whole of that is the commit count.**
The food charge itself very nearly vanishes, and the reason is the part worth
writing down: **the player's answer to a food charge is to run the route with no
food in it.** Mosswake stakes 2 food and the Halt stakes none, so below level 4 the
Halt is the better turn even though it is the worse run, and Mosswake takes the
lead back only at level 4, by 0.18 to 0.28 a turn. With that substitution allowed,
charging the food costs the rate about a fifth at level 4 and about a quarter below
it. Forcing Mosswake at every level — charging the food and not letting the player
answer it — reads as a full half at level 1, and that is the figure this paragraph
would have published had the substitution gone unchecked.

**The argument survives at about half the published magnitude and its shape does
not change**: turns are the binding constraint, and TEND's face price is still not
its price. Cost 2 of §7, answered without moving a single inherited price.

Named as the join's known weakness, because it is one: **the terrace transacts in
ones and fours and the desk transacts in tens and twenties.** The strongest fix —
provisions drawn off the terrace instead of the wallet, so the ground feeds the
runs — is argued and rejected below, and it is open question 3.

---

## Sees

One town under one sky, on one phone screen.

**The sky is the light on the board, and there is no forecast anywhere.** Clear is
the board as it stands. Under the bird the light is the same and there is a
stormbird on the board, inland, over the halt. In the storm the light goes off the
terrace and the basin road darkens. **No counter, no countdown, no phase pip, no
next-storm figure, no meter of any kind.** The citation is exact and it is canon's
own sentence about this: a trained instrument-bird "is how a player knows the
weather is turning **with no readout on the screen**". The sky is read the way the
reserve is read, in the world, and for the same reason.

**The ground keeps its five graded greens and gains nothing.** Full lush down to
bare soil, no number and no bar, unchanged from the passed board. In a storm the
ground is what tells you what the carry will pay, which is the first time the
five looks have been predictive rather than descriptive — and it is still the
planting doing it, not a gauge.

**The stack is one grammar, and Amendment 2's ruling settles the HUD collision the
join would otherwise have.** The scale board put UP and its pips in the HUD; the
dispatch board's HUD is "one line, marks. Nothing else joins it." Amendment 2
ruled — David, 2026-08-26, verbatim: *"the slider action should have been part o
the grey bars not a green one at the top"* — that controls live in the card stack
on the cards' own ground. So the terrace's verbs are bars in the stack like every
other verb, the greenhouse's level is read on the greenhouse (it grows), and the
HUD keeps its one marks line. Nothing joins it.

Two groups in one stack, each labelled in the board's words: **the desk** (MUSTER
WARDEN, MUSTER RANGER, the three sends, Rustfall dark) and **the terrace** (CARRY,
TEND, UP). MUSTER RANGER is one bar in the same grammar with a single berth, not a
slider — a track with one stop is a button, and the cap is 1.

Each sendable card carries what it always carried plus what the sky did: name,
pay, stake, and the stated percent. **In a storm a changed figure is typed as
changed** — the basin's 24 and every fallen percent — so a player can see which
numbers the weather is holding. The armed re-quote and both its fences survive
Amendment 1 unchanged: a provisional percent is typed apart and dies with the
gesture that showed it, on every path out, in the same frame.

**The trim is a second face on the same card, and only in a storm, and only with a
Ranger — and its commit is a TRIM pad beside SEND.** It states its own three
figures — clear percent, clear pay, and two marks — so the fork is read without
arithmetic. *(An earlier cut had the trim as a second tap on the card that
replaced the hot figures; recut 1, `7fb5aeb`, 2026-08-29, after the first sit,
made it two faces at once plus a `#trim` pad, because a replacing tap left no
impression of a fork. `test/dawnspur-storm.test.js:784` grades it.)* It never appears in clear weather and
never appears without the Ranger.

The away state is a state, not a motion picture, unchanged: platform empty, the
sent line marked, the manifest itemized, and the away card holding the number and
the pay it left on even after the sky turns. MEET is the one lit verb at the desk;
the terrace's verbs stay lit beside it.

Rustfall is unmistakably not one of them, unchanged: dark, odds-less, its one line
naming raiders and the defense the desk cannot roll dice for — in every sky.

Layout priority under pressure is inherited and still binds: scenery first, then
the sentence panels inside their cap, then the cards, which never shrink below
their own content and never hold vertical space they do not fill, at any viewport
from 280x480 to 412x732. **This board has more bars than either parent and that
pressure is real**; the stack may scroll, and the exact arrangement is the
implementer's business under these measured constraints, as CFD-196 delegated it.

---

## Ends

Every commit the weather changes ends in a sentence, and so does the sitting.

**The sky's own three sentences**, printed once each, when the sky turns:

- To the bird: *"A stormbird is inland over the halt. There is a storm coming in
  behind it."*
- To the storm: *"The storm is over Dawnspur. The sun is off the terrace and the
  basin road is dark."*
- To clear: *"The storm has gone off east. The sun is back on the terrace."*

**The bill, said out loud when it is presented.** A carry the storm caps gets a
sentence; a carry that pays full does not, in any sky. **The trigger is the storm's
cap and only the storm's cap**, because on the join parent the carry is already
capped for a second, unrelated reason: `carryLoad()` is
`Math.min(level, storesCap − stores)`, with the cap **derived** rather than chosen —
`maxProvisions + maxLevel − 1` = 6 — so a level-4 carry pays +3 at stores 3, +2 at
stores 4 and +1 at stores 5 **in clear weather**. Measured across every level and
every stores value on the shipped parent, and the binding state is reached by play:
with the ladder bought and climbed first, a single carry stands at level 4, stores 4,
**reserve 3** — the headroom binds where the reserve does not.

So the carry is a **three-way** min — `min(level, storesCap − stores, reserve)` — and
`min(level, reserve)` as written elsewhere in this beat is **shorthand for that third
term**, never a licence to overflow the stores. The inherited *"pays the level in
full at every reserve, bare included"* is the same shorthand: it means full **whenever
the stores can hold it**, which is what the parent has always done. Both readings bind
the Kill list, which is otherwise red on the parent's own correct behaviour.

The bill sentence names the bank, so firing it on a carry that is short only because
the stores are nearly full would disclose the reserve **in clear weather** — which is
exactly what the inherited *"gives no sign"* forbids. The bill fires when the reserve
is the binding term, and never otherwise.

- Capped with something banked: *"The sun is off the terrace. The bank covered 2
  of the level's 4."*
- Capped bare: *"The sun is off the terrace and nothing is banked to meet it. The
  terrace gave nothing."*

That second sentence is what this sitting was commissioned to produce. It is the
scale board's END_DRAWN promise — *"the reserve left here is the next sitting's
weather bill"* — presented as a bill.

**The run sentences** keep their inherited shapes and clauses. A turned-back run
still carries all four: zero pay, stake spent and returned in no direction,
everyone who actually rode is home, the desk stands. A storm run names the storm
as its agent; a trimmed run names the Ranger.

- *"The Wardens brought the Cloud Basin cargo home out of the storm. The desk
  banks 24."*
- *"The storm over the basin. The train turned for home with the haul unbanked.
  Three from the terrace and the Chartered toll, and nothing comes back; the route
  paid nothing; the Wardens and the train are home, and the desk stands."*
  (The spent-clause is the join parent's own, printed verbatim by
  `public/dawnspur-line/sim.js` `turnedBackSentence` at provisions 3 and toll 1.
  The stake is no longer four marks and the sentence no longer says so. Its
  siblings, also printed by the shipped parent: Mosswake — *"Two from the terrace
  and nothing comes back"*; the halt — *"The free hop staked nothing and nothing
  comes back"*.)
- *"The Ranger took them round the weather. The Wardens brought the Cloud Basin
  cargo home. The desk banks 18."*

**The arming, said out loud.** CFD-203's sentence, carried from a passed board with
its one clause added:

> *"The terrace is topped. The next Chartered cargo home out of a storm ends the
> sitting."*

**Topping the terrace arms the ending. The next Chartered cargo banked out of a
storm fires it.** That is RULED — David, 2026-08-27, ruling 5 — recorded in canon
§7.2 and already shipped on `/dawnspur-line/`, which passed. This board inherits the
shape whole and narrows the trigger by one clause: there the cargo need only come
home; here it must come home *out of a storm*.

- **Level 4 prints its own sentence when it lands, so the arming is never silent.**
- A Chartered cargo banked before the terrace is topped is a good run and nothing
  more, in any sky; the sitting continues.
- A turned-back storm run while armed is not an ending — the stake dies, the desk
  stands, the halt is still lit, the storm comes back in nine turns.
- Topping the terrace on its own never stops the sitting. It arms it, and CARRY and
  TEND stay lit past it under Seam 2.

**You cannot end this sitting without the terrace, and you cannot end it without the
weather.** The ladder arms it and the storm fires it: bank a cargo to open the
charter, climb to level 4, hold the basin's stake, be standing there when the
weather turns, and take the desperate offer at 41 to 57 percent — **41.0 at the earliest
ending**, because every nine-turn line to the stop is measured to end at a bare
roster. That is the whole
sitting in one condition, and ruling 5 is what puts the ladder inside it — *"that
kills the accidental-ending risk and makes the terrace pay off on its own terms
without the builder skipping the point."*

At the stop the board reads its own ledger in **two clauses**: the desk's record,
inherited, keyed on `runsTurnedBack` exactly as CFD-196 was sent back to fix; and
**the ground it was left on**, which is the scale board's two end-sentences
re-pointed at a storm that actually happened.

**`runsTrimmed` ships, and it is the instrument this beat was signed on.** David
held signature on 2026-08-28 because the trim's take-up rate had no instrument, and
then ruled that a storm sim **cannot supply one**: the trim costs marks and buys
reliability on a stake denominated in food, so any solver needs a marks-per-food
rate, and canon §7.3 forbids one by name. **Whatever rate a solver assumed would BE
its answer.** The counter answers the question the solver could not, because it
records what a player did rather than what a player should do.

It is nearly free. `commitSend` must already distinguish a trimmed run — different
chance, different pay rate, two more marks staked, its own Ranger sentence — so only
the counter is new: one field in the state block, one increment beside `runsOut`,
one line in `record()`, one clause in `ledgerSentence` using the existing helpers.

**It reads as a RATE and never as a count, and the denominator already exists**:
trimmed sends are a strict subset of storm sends, and the closing sentence already
reports storm sends. *"Two of those runs went out under storm, one of them trimmed"*
is the reading, in the player's own hand, at the stop.

**Its limit is stated wherever it is read.** The counter says whether the player
paid. It never says whether two marks is the right price — see *What the sit must
report*, which carries that sentence to the card so the first rate that comes back
is not read as a verdict on the number.

- *"The basin cargo is home out of the storm. Nine runs out, six cargoes banked,
  three turned back, five from the terrace and 1 mark lost on the way; two of
  those runs went out under storm, **one of them trimmed**. **The ground is bare:
  the terrace had nothing banked when the sun went off it.** The record keeps
  what came home; the line past the basin is the next sitting's."* *(An earlier
  cut read "the storm was met with nothing banked"; recut 3, `7b5a38e`,
  2026-08-30, after the third sit.)*
  (Two counters, not one, and the loss clause's shape is the join parent's own
  `ledgerSentence`. A marks-only clause is a defect this lineage already found
  and fixed: Mosswake's toll is 0, so three turned-back Mosswake runs lose six
  food and no marks, and the sitting would close saying they *"cost nothing but
  the trip"*. The instance above is one halt, one Mosswake and one basin turned
  back: 0+2+3 food and 0+0+1 marks. "five" and "1 mark" is the shipped mix —
  `tally` spells the food, `marksPhrase` prints the digit so the noun agrees.)
- Ground full: *"**The ground is full: the terrace had a bank for when the sun
  went off it.**"*
- Ground drawn: *"**The ground is drawn and standing: the bank covered the
  terrace when the sun was off it.**"*
  *(An earlier cut read "whatever the weather did, something was banked to meet
  it" and "the bank covered what the storm asked"; recut 3, `7b5a38e`,
  2026-08-30, put the bill's own nouns — bank, terrace, sun off — into all three
  registers because TEND still read as a weather tactic, and
  `test/dawnspur-storm.test.js:817-819` pins the shipped strings.)*

Three ground registers — full, drawn, bare — because the ground has three things to
say and five looks to say them in. The sentence must read both halves: what the
desk did, and what ground the town is standing on when the sitting stops.

---

## On this sitting

**INHERITED** means it passed a sit and travels under §7 unchanged. **ON** means
this sitting turns it on. **REFUSED** means it does not exist here and why.

| System | This sitting | From |
| --- | --- | --- |
| **Weather: clear / stormbird / storm, one step per commit** | **ON** — the single new system | new |
| **The storm's −10 on every sendable route** | **ON** | new |
| **The Chartered Line's desperation pay, 18 to 24 in a storm** | **ON** | new |
| **The Core Line's pay unmoved in a storm** | **ON** — no counterparty is desperate at your own halt | new |
| **The terrace pays min(level, reserve) in a storm** | **ON** — Seam 1 | new |
| **The storm draws the ground one step per storm turn** | **ON** | new |
| **The Ranger, 2 marks, cap 1** | **ON** — the weather unit | new |
| **TRIM — the Ranger's second send, clear odds, clear pay, stake plus two marks** | **ON** | new |
| The fixed nine-turn cycle, five clear / two bird / two storm | **ON** | new |
| **Topping arms the ending; a Chartered cargo fires it** | **INHERITED and narrowed** — here the cargo must be banked **out of a storm** | CFD-203, passed; RULED David 2026-08-27, ruling 5; §7.2 |
| The dispatch loop: pick, muster, send, meet | **INHERITED** | CFD-196, passed |
| Honest dice, one instrument, the percent stamped at SEND | **INHERITED** | CFD-196, passed |
| Halt / Mosswake / Cloud Basin at 0.08 / 0.12 / 0.25, pays 10 / 14 / 18, stakes 0 / 2 / 3+1 | **INHERITED**, unmoved | CFD-196, passed |
| Rustfall on the map, dark, no odds, in every sky | **INHERITED** | CFD-196, passed |
| Rail Wardens: 3 marks, cap 4, permanent, the whole roster rides | **INHERITED** | CFD-196, passed |
| The muster slider on the card ground, armed re-quote and both fences | **INHERITED** | CFD-196 Amendment 2, passed |
| The charter condition | **INHERITED** | CFD-196 Amendment 1, passed |
| The opening float of 3 marks | **INHERITED** | CFD-196 Amendment 1, passed |
| Failure pays zero; crew and train home; home untouched | **INHERITED** | CFD-196, passed; CFD-145; R6 |
| The away run never sours | **INHERITED** | CFD-196, passed; R4 |
| Greenhouse levels 1..4, UP 3 / 4 / 5, instant, no way back | **INHERITED** | CFD-183, passed |
| CARRY pays the level, +1..+4 | **INHERITED** | CFD-183, passed |
| Full pay at every reserve **in clear weather**, no sign | **INHERITED** | CFD-183, passed |
| TEND: 1 mark, earns nothing, one step back, lit below full | **INHERITED** | CFD-183, passed |
| The reserve 4..0, read only in the ground's five looks | **INHERITED** | CFD-183, passed |
| CARRY / TEND lit past a topped terrace | **re-expressed** — Seam 2 | CFD-183, passed |
| MOSSWAKE +3 | **REFUSED** — Seam 3, the name collides with the route | CFD-183, passed |
| Keel-fire bank, hearth | **INHERITED as scenery**; every heat verb **REFUSED** | CFD-176, passed |
| GOODS / B / HOLD / WARM | **REFUSED** — the heat board's phase lock is R10-convicted (§3); folding it in would re-litigate a collapse and add heat as a second sink | CFD-176, passed |
| `wait()` inert, returning false | **INHERITED**, and load-bearing — there is no pass | both parents |
| Marksman / Engineer | **REFUSED** — CFD-200's, priced 5 and 6, not spent here | — |
| The defense instance, the yard, placement, lanes | **REFUSED** — CFD-200's whole subject | — |
| Signal Tower / route discovery / a bought tell | **REFUSED**, argued above | — |
| A storm that changes a number after the click | **REFUSED** by name — the dispatch board's first Kill line | — |
| Weather that moves on wall time | **REFUSED** — R4, R8 | — |
| A forecast meter, counter, countdown, or phase pip | **REFUSED** — canon's "no readout on the screen" | — |
| The storm touching a level, the greenhouse, the roster, marks, or the record | **REFUSED** — R3, R4, R6 | — |
| A storm summoned by a low reserve | **REFUSED** — that is an alarm; R4, and CFD-183's "anything fires because the reserve is low" | — |
| Fuel, burning, heat as a lever against the storm | **REFUSED** — canon's second lever, but heat is not on this board and adding it is a second currency (R1) and a second system | — |
| Insurance, postures, heroes, missions beyond convoy, safety accrual, train damage | **REFUSED**, unchanged | CFD-196 |
| Route events as a hidden bias | **REFUSED**, unchanged — the storm is `storm-pulse`'s number **named on the card**, never an unasked-for term | CFD-196 |
| Goods as nouns | **REFUSED** standing — marks stand in, flagged | both parents |
| Refund, sell-back, un-recruit, recovered stake as payout | **REFUSED** | CFD-145 |
| A second currency | **REFUSED** — one marks line | R1 |
| Reading or writing another board's persisted state | **REFUSED** — the lineage lock | — |
| HUD | **INHERITED** — one line, marks | both parents |
| End-sentences, per-commit and terminal | **INHERITED and extended** — the terminal now reads the desk and the ground | both parents |
| **`runsTrimmed`, reported as a rate against storm sends** | **ON** — the instrument this beat is signed on, replacing a sim that cannot exist (§7.3) | new |

---

## What the sit must report

Two questions travel to this card, and one caveat travels with them.

**The TEND question, inherited from CFD-203 and owed since the cut.** David:
*"Ask the sitting to report whether anyone tended at all, and why. If nobody
touches it, that's the answer. If they tend and can't say what it bought them,
TEND has become a habit carried from a board that no longer exists."* It was
superseded there because the join cut TEND; the verb returns here with a reckoning
behind it, so this is the sitting that can ask it.

**The trim question.** *Did you trim, and what did it buy you?* — what they did,
and whether they can name what it bought (canon §7.4). `runsTrimmed` records the
sends that were trimmed; the sitting supplies whether the price was legible.
*(An earlier cut asked "At which storm send did you consider the trim and not
take it?" — the intent form canon §7.4, RULED 2026-08-31, refuses, naming this
section as where it was tried; its one intent answer on record was a
confabulated mechanism.)*

**THE CAVEAT, WRITTEN HERE BECAUSE THIS IS WHERE THE READING IS TAKEN.** David,
2026-08-28, ruling on the counter:

> *"The counter tells you whether you paid, never whether two is the right price.
> That limit should be written where the reading is taken, or the first rate that
> comes back will get read as a verdict on the number."*

So: a low rate does **not** establish that two marks is too dear, and a high rate
does not establish that it is cheap. A sitting with few storm sends reports a rate
whose denominator is too small to read at all, and no rate separates *"I did not
trim because the price is wrong"* from *"no storm send ever mattered to me."* The
sit-card question above closes most of that gap and not all of it. **What the
counter changes is that the ambiguity arrives with a number attached instead of a
recollection** — which is an improvement, and is not a measurement of the price.

---

## Kill

Every line expressible as a test. Red-first. The interaction lines are marked,
because §7's cost 4 says attribution weakens on a cumulative board and the Kill
list is the mitigation.

**Weather — the new system**

- The sky advances on anything but a committed player action. A timer, an
  interval, a transition, an animation frame, or `Date.now()` appears anywhere in
  the sky's path.
- `wait()` advances the sky, or returns anything but false, in any state.
- The sky's cycle is anything but five clear, two bird, two storm, period nine.
- A storm arrives with no bird turn before it, at any point in the cycle including
  the first.
- The bird turn changes any percent, any pay, any stake, or the ground.
- A storm's bias on a sendable route is anything but −0.10, or differs between
  routes.
- The Core Line's pay moves in any sky. The Chartered Line's storm pay is anything
  but 24.
- A forecast counter, countdown, phase indicator, turn number, or next-storm figure
  renders anywhere, HUD included.
- The sky is stored or displayed as a number the player can read off the board.
- A storm fires, lengthens, shortens, or arrives early because the reserve is low,
  the marks are low, or the roster is small.

**The one instrument, and the stamp**

- The stated percent and the rolled threshold disagree anywhere, in any sky.
- *(interaction)* A sky change while a run is away alters that run's chance, its
  pay, its stake, or its outcome.
- *(interaction)* The away card re-quotes after a sky change instead of holding
  what it left on.
- The roll happens at SEND, or a run resolves without MEET, or any outcome is
  scripted.
- Odds move by anything but baseRisk, the roster, and the sky. A posture, hero,
  route event, insurance, damage, or safety term goes nonzero.
- The crew bonus is anything but `0.012 × (3 × Wardens + 1 × Rangers)`, or its
  0.30 cap is dropped.

**The Ranger and the trim**

- The Ranger's price is anything but 2, or its cap anything but 1.
- A second Ranger is recruitable, or the Ranger refunds, un-recruits, or fails to
  come home on either branch.
- The trim appears in clear weather, under the bird, or with no Ranger on the
  roster.
- A trimmed run is quoted at anything but the clear-weather chance, pays anything
  but the clear-weather rate, or stakes anything but the route's own stake plus
  two marks.
- The trim's extra stake is denominated in food, or moves with the greenhouse
  level, the reserve, the roster or the sky.
- The Ranger reduces the storm's bias, shortens the storm, delays it, or reveals
  it earlier. **The Ranger never touches the sky.**
- A trimmed run counts as anything other than a run out for the record.

**The terrace under weather**

- *(interaction)* A carry in clear weather or under the bird pays anything but the
  level, at any reserve, bare included.
- *(interaction)* A carry in a storm pays anything but
  `min(level, storesCap − stores, reserve)` — the three-way min, per the
  shorthand's own definition above. `min(level, reserve)` alone is a licence to
  overflow the stores and is not what this kills.
- A carry in a storm is darkened or refused; a carry at reserve 0 in a storm is
  not lit. *(An earlier cut also killed a storm carry that "warns". This beat's
  own Ends presents the bill — "said out loud when it is presented" — and recut
  1, `7fb5aeb`, 2026-08-29, put it on the card before the click when the reserve
  binds — `carryBill`, `test/dawnspur-storm.test.js:935` — because the cap was
  silent until after the tap. A stated bill is not a warning-away: the carry
  stays lit and lands exactly what the card says, `carryBill` and the commit
  reading the same `carryLoad()`.)*
- The ground is drawn by anything but a carry, a storm turn, or both on the same
  turn; or a storm turn draws more or less than one step; or the draw does not
  floor at 0.
- **A carry draws anything but exactly one step of ground.** *(The storm turn's
  step is pinned in the line above and the tend's in the tend line below; the
  carry's own step is pinned nowhere. `docs/cfd-203-beat.md:906`.)*
- **The reserve is written by anything but a carry, a storm turn, or a tend** —
  exactly three writers, −1, −1 and +1, one step each, and no fourth.
  *(Re-worded rather than copied, and the re-wording is forced.
  `docs/cfd-203-beat.md:914` reads "written by anything but a carry" and was true
  **by construction** there: the reserve is derived, `Math.max(0, RESERVE_FULL -
  s.carries)`, with no field to write, which is what
  `test/dawnspur-line.test.js:508-516` asserts. Reinstating TEND forces a stored
  reserve: with a floor at 0 and a cap at full applied per step, the value is
  path-dependent and cannot be recovered from counts — measured, `max(0, min(4,
  4 − carries − storms + tends))` disagrees with the stepwise walk on **274 of the
  729** orderings of length six, the first of them in order being carry ×5 then a
  tend: walk 1, derived 0. The disagreement starts at length two — a tend then a
  carry, walk 3 against derived 4 — because the cap saturates as well as the
  floor. A guard that was free on the parent has to be paid for here.)*
- *(interaction)* A tend in a storm gives anything but one step, or the storm's
  draw is skipped on a tend turn.
- The storm touches a greenhouse level, the greenhouse's look, the roster, marks,
  the record, the hearth, or the bank.
- **A level is lost — any level, by any hand, ever, this sitting. The greenhouse
  shrinks, dies, or shows a dead state.** *(Carried whole from
  `docs/cfd-183-beat.md:157-158` and `docs/cfd-203-beat.md:911`. The line above
  guards the **storm** as the agent and says nothing about any other hand; the
  range line under *Inherited* allows 1..4 and cannot see a level going 3 to 2.
  R6's home is never the stake, and this is the board that introduces the first
  system whose whole job is to take something away, which is where "by any hand"
  stops being ceremony.)*
- A reserve number, bar, pip row, meter or icon appears anywhere.
- The ground moves while no commit has been made — including across a reload, a
  blur, or any absence.

**The join — two vehicles, one sky**

- *(interaction)* **Any terrace verb — CARRY, TEND or UP — goes dark because a
  line run is away, in any sky.** No terrace predicate reads the away state.
  **This is the condition David's MOSSWAKE cut was granted on** — ruling 1,
  2026-08-27, whose recorded condition reads *"Conditioned on the terrace having
  work while the train is out"*; David's own words there are *"Cutting redundant
  is cheaper than renaming colliding."* `docs/cfd-203-beat.md`:942 verified the
  condition rather than assuming it (`test/dawnspur-line.test.js`:644, whose
  source-shape assertion is that neither `canCarry` nor `canUp` contains
  `s.away` — TEND has no parent test because `/dawnspur-line/` has no TEND, so
  that third verb is this board's extension). If this line fails, the cut fails
  with it and MOSSWAKE +3 comes back.
- *(interaction)* A line verb goes dark because the terrace is busy, in any sky.
  There is no terrace-busy state to read, and no send predicate reads one.
  (`docs/cfd-203-beat.md`:944; `test/dawnspur-line.test.js`:677.)
- *(interaction)* **A terrace verb taken while a run is away does not advance the
  sky, or advances it by anything but one step.** *(This clause has no parent —
  on `/dawnspur-line/` there was no sky. The two vehicles are independent in what
  they may do and identical in what they cost, which is a turn, and a turn is
  what the storm is priced in.)*

**Inherited, and unmoved**

- `3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 / 0.08 / 0.12 / 0.25` move.
- `UP 3 / 4 / 5`, `TEND 1`, `+1..+4`, reserve depth 4, roster cap 4 move.
- **UP rides a train.** *(The two-vehicle clause of `docs/cfd-183-beat.md`:167 and
  `docs/cfd-203-beat.md`:922. **Only this clause is restored, deliberately**: an UP
  whose published price is 0, or does not climb, already moves the figures pinned on
  the line above. This one does not, because the price can stay 3 / 4 / 5 while the
  delivery quietly waits on the line train — a vehicle question, not a price
  question. It is §5's own refusal in guard form, "making it take a run to deliver
  is a change to an inherited system", and it pins what the passed parent already
  records as load-bearing at `sim.js`:294 — "no terrace verb reads `away`: while a
  run is out, CARRY and UP stand beside MEET" — which is what David's MOSSWAKE cut
  rests on. It costs more here than on either parent: with a sky that advances one
  step per commit, an UP that rode the train would spend storm turns as well as
  marks.)*
- The opening mints anything but marks 3, stores 0, Wardens 0, Rangers 0, level 1,
  reserve 4, sky clear at turn 1, train home, nothing banked, the ending not
  armed, Cloud Basin dark.
- The opening's cards quote anything but 68 / 64 / 51.
- The opening balance is settable from anything a player can reach. The suite may
  set it; the board may not.
- `canSend("cloud-basin-span")` returns true while `cargoesBanked === 0`, in any
  sky, at any capital.
- A second line run goes out while one is out. Marks go negative. The roster leaves
  0..4 Wardens or 0..1 Rangers. A level leaves 1..4 or a reserve leaves 0..4.
- A stake, toll, muster, tend, or level refunds — any branch, any direction.
- **Any crew member fails to come home, on either branch, ever, this sitting —
  Wardens and the Ranger alike, in any sky, on a trimmed run as on a straight
  one.** *(Carried from `docs/cfd-196-beat.md`:297 and `docs/cfd-203-beat.md`:933,
  where it covers the whole roster. This beat's draft guards the Ranger alone,
  at the Ranger line above, on the board that raises the Chartered turned-back
  rate from 34.6% to 44.6% at four Wardens — the beat's own figure at line 208.
  R6: the home is never the stake, and neither is the crew.)*
- A failed run pays any fraction of the route reward. The `× 0.25` leg appears.
- Rustfall sends, quotes odds, rolls dice, or opens anything, in any sky. A
  mini-game or its stub appears.
- MUSTER lights while the roster rides. The muster slider is interactive while away
  or stopped.
- The HUD grows past the one marks line.
- The card list holds vertical space it does not fill, or content escapes its box,
  at any viewport from 280x480 to 412x732, in any sky and any state.

**States and sentences**

- **A reachable home state has no lit send, or an away state has MEET dark — in
  any sky.** *(Carried from `docs/cfd-196-beat.md`:307 through
  `docs/cfd-203-beat.md`:951, where it was restored after being dropped once in
  transcription. **This is its second loss.** This beat's draft replaced it with
  the broad line below, and the broad line cannot see the bug this one names.
  Measured on the passed parent by exhaustive replay from the real opening —
  every action path, the shipped sim's own predicates and commits, state keyed on
  marks|stores|roster|level|reserve|banked|awayRoute|stopped: of 13,106 reachable
  away states at a marks ceiling of 20, **12,443 — 94.94% — already have a
  non-MEET control lit**, so the broad line would miss a MEET-dark bug in all of
  them; the share stays between 92.96% and 95.23% across every ceiling from 8 to
  24. Across the whole lattice, home and away, **no reachable unstopped state has
  an empty lit set at all** — DAWNSPUR HALT stakes nothing, so a send is lit in
  every unstopped home state by construction. The 663 states the broad line does
  reach are **not** the single shape the parent's own test comment claims: all
  663 sit at full stores, but they run over all three routes (halt 254, Mosswake
  219, Cloud Basin 190) and all four levels (462 topped, **201 not**), because
  `canCarry()` does not read `away` — the two-vehicle claim — so the player
  carries the stores back to the cap while the run is out. MUSTER, CARRY, CARRY,
  SEND MOSSWAKE, then six CARRYs, from the real opening with nothing set by the
  suite, reaches a level-1 untopped away state whose `litJobs()` is exactly
  `["meet"]`. The one shape the parent's suite pins is
  `test/dawnspur-line.test.js`:882; its comment naming the free halt on a topped
  terrace as the only route in is wrong, and is filed separately. **What this
  board does to that corner is UNAVAILABLE**, and is not asserted here: Seam 2
  re-attaches the scale board's `!topped()` guard, which the line parent has
  already dropped, and says nothing about the stores cap the line parent carries
  — and there is no sim to measure. The broad line is kept beside this one, never
  instead of it.)*
- A reachable state has no lit control. *(The standing unpause assertion, and it is
  stronger here: the free halt send is lit in every sky at every balance.)*
- The ending arms on anything but the greenhouse reaching level 4, or arms without
  its sentence.
- *(interaction)* The arming reads the sky: the terrace arms in one sky and not
  another, or a sky change arms or disarms it.
- The sitting stops on a Chartered cargo banked out of a storm while unarmed, or
  fails to stop on one banked out of a storm while armed, or stops on topping
  alone.
- The sitting stops on anything but a Chartered cargo banked out of a storm with
  the terrace topped. A turned-back storm run while armed stops the sitting.
- A sky change happens without its sentence. The bird arrives without saying what
  is behind it.
- A capped carry happens without its sentence, or an uncapped carry prints one.
- A turned-back run drops zero-pay, stake-spent, crew-home, or desk-stands; or
  names a crew that did not ride.
- The terminal sentence does not read the desk's record, or does not read the
  ground, or reads the ground in fewer than three registers.
- The terminal sentence does not report how many storm sends were trimmed, or
  reports that count without the storm-send denominator beside it. A bare count is
  not a rate and cannot be read.
- `runsTrimmed` counts anything but a committed trimmed send: it moves on an
  untrimmed send, on a trim that was offered and not taken, or on a MEET.
- Live shas are overwritten (`18b1324f`, `576ce2b6`, `953368a1`, `292d6645`,
  `395c18f2`, `5ad814e6`). Any existing board's bytes are touched — the `sit/`
  copy as well as the `public/` one, which is how `test/dawnspur-line.test.js`
  grades it.
- This board reads or writes any other board's persisted state. *(Naming the town
  in copy is permitted — CFD-196 Amendment 1, ruling 2. Touching another board's
  state is not.)*

---

## The numbers, and where each one comes from

Every figure below is cited to the pack or flagged **new-play**. A number with no
provenance is refused at review, and none is dressed as a citation it does not
have.

### Cited verbatim

- **The storm's −0.10.** `ROUTE_EVENTS[storm-pulse].successBias`, `src/content.js`,
  verbatim: *"Storm Pressure Rising — Pressure climbing. Stormwild routes bite
  harder, and **nobody runs them who did not choose to.**"* The magnitude is the
  pack's own tuned storm number, and its effect text is a sentence about choosing,
  which is what this beat builds.
- **The Ranger's 2 marks.** `crewTypes[rangers].baseCost` (food 7, energy 3) through
  `economyConfig.resourceValues` (food 1, energy 2) = 13 mark-equivalents, over the
  civic scale factor 6.5 = **2.000**. Exact, no rounding. The same derivation
  CFD-200 recorded and explicitly banked for "the sitting that hides something";
  this is that sitting.
- **The Ranger's +0.012 a head.** `crewTypes[rangers].power.guard` = 1, times the
  engine's 0.012 a point (`calculateDispatchPreview`, `src/engine.js`). The convoy
  mission prefers guard alone (`missions[convoy].preferred`), so a Ranger's scout 3
  scores nothing at the desk and its guard 1 scores 1.2 points. **That is the
  measured reason the Ranger needed a job the odds formula does not give it**, and
  the trim is that job.
- **The Marksman's 5 and the Engineer's 6.** `crewTypes[gunners].baseCost` (food 9,
  materials 7, parts 2) = 31 over 6.5 = 4.769; `crewTypes[sappers].baseCost` (food
  8, materials 8, parts 3) = 36 over 6.5 = 5.538. Recorded, not spent — CFD-200's.
- **Everything inherited.** baseRisks 0.08 / 0.12 / 0.25, the formula, pays 10 / 14
  / 18, stakes 0 / 2 / 3+1, MUSTER 3, `routeTolls.chartered.flatFee` 1, UP 3 / 4 /
  5, TEND 1, yields +1..+4. All unmoved, all already provenanced in
  `docs/cfd-196-beat.md` and `docs/cfd-183-beat.md`.

### Argued, not authored

- **Clear weather's bias is 0, and `ROUTE_EVENTS[clear-skies]`' +0.08 is refused by
  name.** Clear must be the identity or the inherited published odds row (68 / 64 /
  51) does not survive the join, which is an inherited Kill line and also the only
  baseline the storm can be read against. A board where the good weather is also a
  bonus has no neutral.
- **The Core Line's pay does not rise in a storm.** The desperation is the
  counterparty's, and the pack says who the counterparties are:
  `routes[dawnspur-halt]` is "the home halt … warm lamps, market gardens" and
  `routes[mosswake-loop]` is "an overgrown food loop"; `routes[cloud-basin-span]` is
  "a misted basin span where condensers hang out over the dark below, and crews
  re-trim sagging supports". Nobody at your own halt is desperate. A flat premium
  across all three would make the **free** send the best business in a storm — 10 ×
  0.724 = 7.24 rising to 9.41 at a 13-mark pay, a free send out-earning its own
  clear-weather 8.24 and closing to within 1.6 of Mosswake's clear 10.98, for a
  stake of nothing. Measured, and refused. *(An earlier cut read "above every
  clear-weather send on the board"; that was true under the dispatch parent's
  marks stakes (Mosswake 8.98, Cloud 7.77 at 4W) and is not under the join's food
  stakes (10.98, 10.77); a 13-mark storm halt trails clear Mosswake at every
  roster.)*

### New-play, flagged

- **The cycle: five clear, two bird, two storm, period nine.** No weather cadence
  exists in the pack or the engine; reported as the honest null rather than derived
  from nothing. The anchors are argued: **two storm turns** because the reserve's
  depth is 4 and a two-step bill lets a full ground survive one storm with margin
  and two storms without, which is the same mirror-the-ladder anchor CFD-183 used
  for depth 4 itself; **two bird turns** because one turn of warning buys one tend
  and two buys a preparation (tend twice, or muster, or bank a cargo to open the
  charter); **five clear** so the workable stretch between storms is seven turns —
  one more than a full four-step re-tend plus two carries costs. David plays these
  before they are canon; survivors flow back per the standing rule.
- **The Chartered storm pay of 24.** Argued from the board's own break-even, below.
- **The trimmed run's extra stake, 2 MARKS — and marks rather than a provision.**
  RULED by David 2026-08-28: the trim's cost must not fall as the greenhouse rises,
  because *"a trim that goes free at level 4 stops being a decision, and it stops
  being one exactly for the player who has invested most in the board."* His
  practical note asked for a cost that rises with level rather than a provision
  count that jumps 1 to 2 to 3. **Measured against the shipped join board that
  cannot be done with food, and the reason is stronger than lumpiness.** A carry is
  one turn and yields `level` food, so a provision costs `V / level` marks, where
  `V` is the board's marks-per-turn clock taken off the free halt — the one send
  with no stake and no toll, hence the only non-circular anchor. `V` runs 3.46 at
  0W+1R to 4.18 at 4W+1R — the halt's own per-turn row in the table above — so a
  provision is worth 3.46 to 4.18 marks at level 1 and 0.87 to 1.05 at level 4.
  *(An earlier cut read "4.40" and "0.90 to 1.10"; 0.836 × 10 over the
  send-plus-meet's two turns is 4.18, the figure the same sentence's next clause
  and the table already used.)* **The trim's entire payoff is `pay × 0.10`: 1.00 on the
  halt, 1.40 on Mosswake.** One provision — the smallest food stake there is —
  costs two and a half to four times the whole payoff at level 1. So the food lever
  has no live setting at the bottom of the ladder: at 0 the trim is a free
  storm-eraser on the Core Line, which is trap 2; at 1 it is already dead at level 1
  (net 2.46 to 3.18 against a payoff of 1.00 — it costs two and a half to three
  times what it returns) and free at level 4; and holding it flat needs `level`
  provisions, which is flat at 3.46 to 4.18 gross and dead at every rung. **A mark is worth a mark at every
  level**, which is what makes it the only instrument on this board whose grain fits
  inside a 1.00-to-1.40-mark decision — turns and reserve steps are level-invariant
  too and are three to five times too big, and drawing the ground is separately a
  Kill line. **2 is the only whole mark that is neither free nor dead**, by the same
  argument that sized the Chartered storm pay at 24, and measured against the trim's
  OWN payoff at every step: at 1 the trim is level with the halt and 0.40 ahead on
  Mosswake at every level, which is the exact cell the ruling was issued against; at
  3 the halt trim costs 2.00 net against that same 1.00 payoff, twice what it
  returns; at 2 it costs 1.00 on the halt and 0.60 on Mosswake, at every level and
  every roster. That the Ranger also costs 2 is a coincidence and is **not** the
  derivation.

  **The yardstick is the trim's own payoff deliberately, and an earlier draft of this
  paragraph got it wrong in a way worth recording.** It measured deadness against the
  Cloud Basin's "never the EV play" band — but that band is **a function of the
  trim's price**: 1.73 to 2.60 at a one-mark trim, 2.73 to 3.60 at two. Using it to
  CHOOSE the trim's price is circular, and it silently re-answers itself every time
  the price moves. The payoff is `pay × 0.10` whatever the stake, so it is fixed,
  and it is the only yardstick here that can settle the question rather than restate
  it.

  **This resolves a contradiction the beat has carried since it was drafted, and it
  is a repair rather than a change of mind.** Two lines disagreed about the unit:
  the class flag above called the extra stake *a provision*, which the join made
  food, while Fork B's own table read *"1 mark staked instead of 0."* Measured under
  food, **that published table is correct at no level** — the halt delta is 2.46 to
  3.18 against the player at level 1 and roughly zero at level 4, never the 0.00 it
  printed. So the ambiguity is not being decided by preference; the food reading has
  no level at which the published figures hold, and the marks reading is the one
  that can be made true.

  **The fiction is the crew's, not a tollman's, and the distinction is load-bearing.**
  Neither Core Line route grows a toll: both ship `toll: 0`, and the parent justifies
  the Chartered toll's unit as *"a toll is a civic fee"* — there is no tollman on
  your own free halt, and inventing one is the weld this house convicts. Marks
  already pay crew on this lineage without being civic: MUSTER is a wage, 3 a Warden
  and 2 a Ranger. **The long road is paid work.** The crew is paid for the days it
  adds, the pay goes out with them, and like every stake on this board it comes back
  in no direction — no new entity, no third party, and the causation runs from the
  road outward rather than from the player's pantry inward. If the naming is refused
  at the sit, the fallback is *"for the crew's time the long way spends"*: same
  fiction, no invented unit.
- **The Ranger's cap of 1.** The trim is a capability, not a quantity; a second
  Ranger does nothing, and a control with nothing to do is this house's dead-button
  conviction. It is also half the answer to trap 2: **there is no second Ranger to
  buy.**

### Trap 1, answered with arithmetic — and answered twice, differently

The commission's warning, reproduced and reproduced correctly: at a full roster,
Cloud Basin clear is 65.4% × 18 − 1 = **10.77** expected marks, and a 10-point storm
needs the pay to reach **21.2** to hold that flat. Measured here at 21.2491 by the
same arithmetic; the commission's figure checks out.

**The break-even column is the one thing the currency change does not touch, and
saying so stops the next reader re-deriving it.** The stake sits on both sides of
`18 · p_clear = pay · p_storm` and cancels, in marks or in food, so every
break-even figure below is unmoved by the re-base onto the line parent. What moved
is the EV columns: the basin's marks stake fell from 4 to 1, so **every basin EV
below is 3.00 higher than the same figure at the dispatch parent's 4-mark stake,
and every margin is unchanged.** The 3 provisions are still spent — they are not
marks, so they do not appear in a marks EV, and R1 forbids pricing them into one.

**Fork A — run the basin hot, or wait for clear. The pay lands deliberately ABOVE
break-even, and it is argued as reward.**

Break-even is remarkably flat across the roster, because both chances move by the
same 0.10:

| roster | clear % | storm % | break-even pay | at 24, storm EV | clear EV | margin |
| --- | --- | --- | --- | --- | --- | --- |
| bare (0W, 0R) | 51.0 | 41.0 | 22.39 | 8.84 | 8.18 | **+0.66** |
| 0W, 1R | 52.2 | 42.2 | 22.27 | 9.13 | 8.40 | **+0.73** |
| 2W, 0R | 58.2 | 48.2 | 21.73 | 10.57 | 9.48 | **+1.09** |
| 4W, 0R | 65.4 | 55.4 | 21.25 | 12.30 | 10.77 | **+1.52** |
| 4W, 1R | 66.6 | 56.6 | 21.18 | 12.58 | 10.99 | **+1.60** |

**Every EV in this table is marks only, and every row also stakes 3 food.** The
basin's food stake is identical in both skies, so it cancels out of the margin the
same way the toll does — but it is not zero, and it is not netted here, because
this board has no exchange rate to net it with.

**24 is the smallest whole mark that clears break-even at every reachable roster by
more than a rounding step.** 22 fails outright at the bare roster (22 < 22.39). 23
clears everywhere but by +0.25 expected marks at the bare roster, which is a wash
inside the noise and is exactly the failure the commission names. 24 clears by
+0.66 to +1.60.

**Why above and not flat:** a storm run is the same money at strictly worse
variance — the chance of eating the whole stake rises from 34.6% to 44.6% at a full
roster. A player offered identical expectation at higher variance has been offered
a worse bet, so an EV-flat premium is a refusal dressed as an offer, and the
sitting would correctly teach the player to never engage with the new system. The
margin is what buys the variance, and it is published rather than felt.

**What the margin produces, said plainly: in a storm the ladder inverts.** Measured
at every roster, storm EV against clear EV:

| | clear best | storm best |
| --- | --- | --- |
| bare | Mosswake 8.96 (2f) | Cloud Basin 8.84 (3f) — *not inverted, by 0.12* |
| 0W, 1R | Mosswake 9.128 (2f) | Cloud Basin 9.128 (3f) — **the exact crossover** |
| 2W | Mosswake 9.97 (2f) | **Cloud Basin 10.57** (3f) |
| 4W | Mosswake 10.98 (2f) | **Cloud Basin 12.30** (3f) |
| 4W, 1R | Mosswake 11.14 (2f) | **Cloud Basin 12.58** (3f) |

**The join moves the inversion DOWN the roster, and lands it on an exact tie.**
The basin's marks stake fell 3 and Mosswake's fell 2, so the basin gains exactly
+1.00 against Mosswake at every roster. At 0W+1R the two are equal to the digit —
`0.652 × 14 = 9.128` and `0.422 × 24 − 1 = 9.128`. Below that Mosswake still wins;
at and above 2W the summit wins, where on the marks-stake parent it took 4
Wardens. **The food column is carried, not netted**: the summit's edge is bought
with one more food than the spine, and this board prices food in turns, not marks.

**The tie row is named here rather than left for a reader to find — and the
2026-08-28 ruling BREAKS it, which is recorded here because the tie was this
table's sharpest published claim.** 0W+1R is the only crossover-candidate roster
with a Ranger on it, so the trim is live. **Before the ruling** a trimmed Mosswake
paid `0.652 × 14 = 9.128` marks and staked 2+1 = 3 food, against a hot basin run
at `0.422 × 24 − 1 = 9.128` marks and 3 food: the same marks and the same food,
at 65.2% instead of 42.2%, so the summit was matched on both stocks and beaten on
variance.

**Under the ruling the trim stakes two marks instead of a provision, and the row
is no longer a tie.** Re-derived:

| at 0W+1R | marks EV | food staked |
| --- | --- | --- |
| trimmed Mosswake | **7.128** | 2 |
| hot Cloud Basin | **9.128** | 3 |

The summit leads by **exactly 2.000 marks** — the trim's whole new stake — and
trails by **one food**. **Those do not net, and this beat may not pretend they do:**
the join board forbids an exchange in either direction by name, so the crossover row
is now genuinely incommensurable rather than flat. **This is not a gap in the
analysis — it is canon §7.3**, the recorded price of the no-exchange rule: on a
joined board any two options differing in both currencies are unrankable, and the
more the game joins the more such pairs there are. Read it there before trying to
fill this in. The variance argument still
applies to the marks column and no longer settles the row on its own.

**What survives:** the summit stops losing here rather than starting to win, because
"winning" would need a food price the board refuses to publish. **What changes:** the
old sentence *"2W is the first roster at which the storm run is the best business"*
is withdrawn — on marks alone the summit is ahead from 0W+1R up, and the claim
below should be read as a marks claim from 0W+1R rather than an outright one from
2W. Whether a player trades one food for two marks at that rung is a sit question,
not an arithmetic one.

The storm costs exactly **−1.00** on the halt and **−1.40** on Mosswake at every
roster (`pay × 0.10`), and pays the basin **+0.66 to +1.60**. So the storm is the
only condition under which the summit is the best business on the board — which
answers, without re-pricing anything, the oddity CFD-196 recorded and shipped
anyway: *"the spine out-earns the summit even fully crewed … the summit is run
because it is the stop, not because it is the best business."*

**And it is not free money, because the desk is not the whole board.** Every turn
spent under the storm draws the ground a step whatever the player does with it. The
storm is one offer and one bill: *the desk can be paid; the ground is always
billed.*

**Fork B — hot or trimmed, with a Ranger. The pay lands deliberately AT or barely
above EV-neutral, and it is argued as variance**, which is the commission's own
sanctioned second answer.

Trim delta (trimmed EV minus hot EV) on the Core Line is `pay × 0.10 − 2` and is
therefore **roster-independent — and, since the ruling of 2026-08-28,
level-independent too**:

| route | trim delta | what it is |
| --- | --- | --- |
| Dawnspur Halt | **−1.00** | 10 points safer, bought for one expected mark |
| Mosswake Loop | **−0.60** | better money and 10 points safer, bought for 0.60 |
| Cloud Basin | **−2.73 to −3.60** | forfeits the desperation; never the EV play |

That is a real fork and it is not an EV fork: **trim the spine, run the summit
hot** is the tactic, and on the spine the trim is priced insurance — ten points
off the failure chance for 0.60 to 1.00 expected marks, the same price at every
rung of the greenhouse. A player who is one mark from a stake they cannot afford to lose trims;
a player who wants the money runs hot. That is the commission's "a same-EV,
higher-variance run is a real decision for a player who needs marks now", taken
deliberately and named as variance rather than smuggled in as reward.

### Trap 2, answered — the Ranger cannot make weather stop mattering

Four independent reasons, each testable:

1. **The Ranger never touches the sky.** It does not shorten the storm, delay it,
   reveal it earlier, or reduce its bias. It is a Kill line.
2. **The trim is a decision at every send, not a purchase that ends.** It costs two
   marks and forfeits the desperation, so its answer is different on every
   route and different again depending on whether the player can afford to lose the
   stake — and, since the ruling of 2026-08-28, it costs the same at every rung of
   the greenhouse, so no amount of building buys the question away. Buying the Ranger changes what the question is; it does not remove it.
3. **It is strictly wrong at the summit.** The route the sitting stops on is the one
   route where trimming is the worse play by 2.73 to 3.60 expected marks. The
   Ranger cannot buy the player out of the storm run that ends the sitting.
4. **It does not touch the ground at all.** The storm's other half — the draw and
   the capped carry — is untouched by any roster. **Weather cannot be bought off,
   because half of it is not at the desk.**

And there is nothing to escalate: cap 1, and no second unit on this board answers
weather.

### The reachability check, asked and answered

*Does every state this beat's arithmetic describes start from the opening and get
reached by play?*

**Yes, and this board restores a claim its parent had to retire.** CFD-196
Amendment 1 retired *"every state in this beat's arithmetic is reached from that
opening by play"* because the minted odd float of 3 broke parity with an all-even
delta lattice (pays 10 / 14 / 18, stakes 0 / 2 / 4, muster 3). **The claim is
re-assertable on this board, but not for the reason the draft gave, and the wrong
reason is recorded rather than deleted because it is the exact shape of error this
house keeps making.** The draft said *"CARRY at level 1 mints +1"*. That was true of
`/dawnspur-scale/`, whose carry is literally `s.marks += s.level`, and it is false of
the board this beat now inherits from: on `/dawnspur-line/` CARRY writes `s.stores`,
and the only `s.marks +=` in the whole file is `s.marks += r.pays`. The carry cannot
break a parity in a currency it no longer touches. The draft was not careless; it was
correct against a parent that has been replaced, which is what a re-base costs.

**What breaks the parity is the odd marks SINKS — and there are three of them, no one
of which is the cause.** Measured by ablation over a breadth search of the re-based
storm model (a harness, not a shipped file, because the board is not written yet)
rather than argued:

- **MUSTER's 3, the Chartered toll's 1 and TEND's 1 are each individually
  sufficient.** Remove any two of the three — and flatten UP to an all-even 4 / 4 / 4
  as well — and every marks count from 0 to 30 is still reached. **None of them is
  necessary**, so no single one may be named as the cause.
- **UP's 3 / 4 / 5 alone is not sufficient.** Bounded to three purchases for the whole
  sitting, it leaves 2, 4, 7, 8, 9, 12, 18 and 22 unreachable.
- **With every odd sink removed the lattice collapses to 3 / 13 / 17 / 23 / 27**,
  which is the parity the claim was retired for, and is the control that says the
  ablation is measuring what it claims to measure.
- **With the board as it stands, every marks count from 0 to 30 is reached, none
  missing, the deepest first-reach at 8 turns.** Twenty-six turns was the search
  horizon; eight is the figure.

The lattice is dense, the retired claim is re-asserted, and its cause is the sink side
rather than the faucet side.

**Two attributions travel with that, because getting them wrong is how the first
mechanism went wrong.** TEND is **not** the join's: `/dawnspur-line/` CUT it, RULED by
David 2026-08-27, and says so in terms — *"It appears nowhere in this file, as a verb,
a field or a path"* — which is why that board's reserve is one-way. TEND's 1 is
CFD-183's, and it is **this** board that puts it back. The Chartered toll of 1 is
CFD-196's, kept by the join unmoved rather than created by it.

**Flagged, not fixed here.** The same search run against `/dawnspur-dispatch/`'s own
wallet — where muster 3 is already an odd sink — also reaches 0 to 30 with none
missing. So the sentence above, that CFD-196 Amendment 1 retired the claim against an
*"all-even delta lattice"* whose own parenthetical lists muster 3, may rest on a
premise that was never true. That is a different sentence and a separate edit.

Checked individually:

- **Reserve 0** — four carries from the opening. Reachable.
- **Reserve 0 at level 4** — carries pay full in clear weather at every reserve, so
  the 12 marks for the ladder are earnable at any ground. Reachable.
- **A storm with the charter open and 4 marks in hand** — SEND Dawnspur Halt (t1),
  MEET (t2, +10, 13 marks, the charter open), then five carries to t7; t8 is the
  storm with 13 marks, five in the stores and the charter open, so the Chartered
  send is lit under it. Reachable. *(An earlier cut pointed at the worked line
  below, which reaches the storm with 1 mark, not 4. The "4 marks" is the dispatch
  parent's Chartered stake, provisions and toll in one purse; on this parent the
  stake is three from the stores and the toll's one mark.)*
- **The stop** — reachable on the first cycle, and the draft's line was not. The
  published path's second step is refused by the join parent: after one level-1
  CARRY the stores hold 1 and `commitSend("mosswake-loop")` **returns false**, the
  board printing its own reason — *"The stores hold 1. Mosswake wants 2."* Replaced
  with a line found by exhaustive search and then **replayed commit-by-commit on
  `public/dawnspur-line/sim.js`, every call returning true and `stopped` turning
  true at t9** *(the parent has no weather, so that replay grades the nine commits'
  legality and the stop, not the storm figures: on the parent the same line ends at
  18 marks with the reserve at 2, and the 24 and the bare ground below are this
  board's storm pay and storm draw)*: CARRY (t1, +1f), UP to 2 (t2, −3),
  CARRY (t3, +2f, stores 3), **SEND Dawnspur Halt (t4, free)**, MEET (t5, win, +10,
  charter opens), UP to 3 (t6, bird, −4), UP to 4 (t7, bird, −5, **the terrace tops
  and the ending arms**), **SEND Cloud Basin (t8, storm, −3f −1m)**, MEET (t9,
  storm). Nine turns, ends at 24 marks on bare ground — two carries and two storm
  turns draw the reserve 4 to 0. Every step is a lit control at that state.
- **Nine turns is the floor, and the roll at it is 41.0 percent, not 55.4.** The
  meet cannot land before t9 under any reading, because a send committed under the
  storm is earliest at t8. Under the ruled stop — topping ARMS, the qualifying cargo
  TRIGGERS (ANSWERED 5, canon §7.2, and what the parent ships at
  `sim.js` `commitMeet`) — an exhaustive search of every nine-turn line finds
  **one** roster at the stop: **bare, 0W 0R**. The ladder costs 12 marks and four
  Wardens cost 12 marks, and one cycle's income funds one of them. So the earliest
  stop is taken at the bare basin storm chance, **41.0%**, and the crewed 55.4% is a
  second-cycle figure. *(Measured: 4 Wardens becomes reachable at a nine-turn stop
  only if topping is NOT required to arm; Ends and ANSWERED 5 agree that it is,
  so the crewed 55.4% is a second-cycle figure. An earlier cut pointed at "the
  flagged contradiction between Ends and ANSWERED 5", which no longer exists in
  this file — the pointer was written at `9b8916d`, the same commit that rewrote
  Ends to the arming shape, so it never had a live target.)*
- **A capped carry at reserve 0 in a storm** — the path above stops at t9, and a
  stopped board carries nothing; take the same line to t7 and CARRY at t8 and t9
  instead of sending: the first lands 2 and leaves the ground bare, the second
  lands nothing and prints the bare sentence. Reachable. *(An earlier cut read
  "the path above ends bare in a storm; one more carry prints the sentence";
  `canCarry()` is false at the stop.)*
- **The clamp** — the reachable range is 41.0% (Cloud, storm, bare) to 83.6% (halt,
  clear, 4W+1R). The engine's 0.12 / 0.96 clamp is carried anyway, engine-faithful,
  and never binds.

### What has no instrument, and is reported as an estimate

**Sitting length.** §7's cost 3 asks for it and there is no instrument, so this is
an *estimate* with its basis stated, not a measurement. David's passing dispatch
sitting was ten runs, which is at least twenty commits plus musters. This board adds
the terrace's three verbs and a stop that requires a storm. **Estimate: 30 to 45
commits, and a sitting materially longer than either parent's — call it two to three
times the dispatch sitting.** If that is too long, the cheapest cut is the cycle
period (nine to seven), which brings the first storm forward by two turns and costs
one line.

---

## Canon check

Per `docs/mechanisms-recommitted.md` §6.1: every mechanism turned ON, INHERITED or
REFUSED, and the rule or source line it rests on. **An inherited system is cited to
the beat that passed it**, per §7. Rows mirror **On this sitting**.

| Row | State | Rests on |
| --- | --- | --- |
| Weather as the single new system | ON | §7, RULED — David 2026-08-26: the amendment, and CFD-201 named in it as "the first cumulative board" with "weather as the single new system". David 2026-08-26 direction, verbatim: "weather will push success potential down obviously but maybe the counterparty will be more deperate so better rewards" |
| The storm as the reckoning | ON | §5.2 **SIGNED** — "The storm is the NEXT sitting: the reckoning"; R6/Geology — "The reckoning comes only when a cold stretch arrives and there is nothing banked to meet it"; "a storm … is the one thing in the world that can kill an island in an afternoon" |
| The storm on the line | ON | Core Loop, verbatim (`The-Core-Loop.md:29`): "storms **can foul a line, threaten the cargo on it**, and throw off the timing of everything downstream" |
| The storm's −0.10 | ON | `ROUTE_EVENTS[storm-pulse].successBias`, the pack's own tuned storm figure; its effect text — "nobody runs them who did not choose to" — is a choice sentence, which is what the mechanic renders |
| The storm on the terrace, and only the terrace | ON | Geology — a storm "steals its sun and chills its keel at once", and "a keel can lose in an afternoon of storm the warmth it banked over weeks". The terrace is a **solar** terrace: "it falls, last, plain and free, on the terraces, where with the warmth it grows the food" |
| The capped carry, `min(level, reserve)` | ON, **Seam 1**, argued | Geology — "The reckoning comes only when a cold stretch arrives and **there is nothing banked to meet it**"; §5.2 SIGNED. Scoping argued in Seam 1; the scale board's kill re-expressed rather than deleted |
| Full pay at every reserve in clear weather | INHERITED | `docs/cfd-183-beat.md`, passed 2026-08-25; Geology — "rides fine for years on a falling reserve, **in clear weather**, and gives no sign" |
| The storm's one-step draw | ON | Geology — the storm chills the keel and spends the bank; R10/MDB — the reserve is the thing "over-extraction lowers and that tending runs … raise" |
| The draw never touches a level, the greenhouse, marks, the roster, or the record | ON as a refusal held | R6 — "never the home or the permanent record"; R3 — "tended ground does not decay"; CFD-183's convictions, carried whole |
| Nothing moves in absence; no clock anywhere | ON as a refusal held | R4 — "No decay clocks, no upkeep tax, and no alerts"; R8 — "a quiet stone is never a session meter". The sky moves only on a commit, so an absent player's world is frozen without exception |
| The bird is not an alert | ON, argued | R4's "no alerts" is about a game nagging an absent player (Laying-Up: "a small daily debt collector"). A bird on the board while the player is playing is the world, and §5.3 SIGNED **requires** the tell |
| The stormbird as the tell | ON | Bestiary, verbatim: "to see a stormbird inland is to know a storm is coming in behind it", under the locked world-wide principle "creatures as instruments … stormbirds precede storms"; §5.3 SIGNED — "The tell precedes the event" |
| No forecast readout of any kind | ON as a refusal | Creature-Bond, verbatim: a trained instrument-bird "is how a player knows the weather is turning **with no readout on the screen**". Economy — the planting "tells a keeper the state of their ground **without a gauge**" |
| The desperation pay | ON, new-play, flagged | David 2026-08-26 direction, verbatim: "maybe the counterparty will be more deperate so better rewards". No premium figure exists in the pack; reported as the honest null and argued from break-even |
| Desperation on the Chartered Line only | ON, argued | `routes[*].description` — the halt is "the home halt … warm lamps, market gardens"; the basin is where "condensers hang out over the dark below, and crews re-trim sagging supports". Measured refusal of the flat premium in The numbers |
| Marks as the pay, goods as nouns refused | INHERITED | `docs/cfd-196-beat.md`, passed; conversion by `economyConfig.resourceValues`, the pack's own table |
| The Ranger as the weather unit | ON | David 2026-08-27 RULED — "ranger (**exploration**)"; `crewTypes[rangers].description` — "Reveal ambushes, patrol risky routes, and improve survey odds"; `ROUTE_EVENTS[fog-bank]`, `ROUTE_EVENTS[gust-window]` — both weather events answered by **scouts**; `routes[cloud-basin-span].tags` — `["weather", "survey"]`; Creature-Bond's instrument-birds, whose competencies are "reading current and weather, route-reading" |
| TRIM as the Ranger's job | ON | `ROUTE_EVENTS[gust-window]`, verbatim: "Scouts and conductors can **time** a faster Windreef crossing"; `routes[windreef-span].description` — "fast dispatches depend on **reading the crossdrafts**"; `ROUTE_EVENTS[fog-bank]` — scouts "reduce … route confusion". **Reroute is a first-class canon resolution**: World Bible, "The Tollman's Demand … Pay, fight through, **reroute**"; "The Dormant Crane … Repair it, **reroute** it, or disable it" |
| The trim as counterplay rather than immunity | ON | Geology, the keeper's craft, verbatim: "A keeper meeting a hard stretch has **more than one way to hold a keel**, and the craft is **in the balance between them**". §5.3 — "the counterplay … always exists" |
| The Ranger's guard 1 in the formula | ON | `crewTypes[rangers].power.guard` = 1 × the engine's 0.012; `missions[convoy].preferred` = `["guard"]`. Inside the dispatch board's own "odds move by baseRisk and the roster" |
| The Ranger cap of 1 | ON, new-play | The dead-button conviction, this house's own; and half the answer to the commission's trap 2 |
| Marksman / Engineer | REFUSED | `missions[*].preferred` — fire and repair are off this board; `docs/cfd-200-beat.md` holds them, priced 5 and 6. A hire with no job is dead UI |
| The defense instance | REFUSED | David 2026-08-26's EXCEPT clause; CFD-200's whole subject; one NEW system per sitting (§7, KEPT) |
| Signal Tower / a bought tell | REFUSED, argued | `buildings[signal-tower].description` is about damaged track, not weather; the weather quote belongs to the Updraft Relay hero beat (`Content-Build-Cinderbelt-Windward.md:101`). §5.3 — the storm is fair **because** telegraphed, so the tell cannot be a purchase |
| Fuel / burning against the storm | REFUSED, and it is canon's own second lever | Geology names it exactly — fire is lit at "a storm that has stolen the sun for days" — and Geology protects it — *"Burning is a cost paid at the turns, not a thing kept burning"* (`Geology-and-Weather.md:43`) — while R7 says the same in the Core Loop's words, "a cost of pushing and weathering rather than the standing fuel bill" *(an earlier cut attributed the Geology sentence to R7)*
| One wallet, marks only | ON | R1 — "Heat is the master resource. Marks are money. Never the same sink." Heat never appears; the bank and hearth are scenery, read and written by nothing |
| Turns, not marks, as the binding constraint | ON, argued | R10 — "The felt choice is output now against holding the line"; the allocation is real only if the claims compete for something scarce, and on a joined board marks are not it |
| Two vehicles: the line train and the terrace shuttle | ON, argued | `buildings[switchyard].description` — "Dispatches trains, **adds scheduling capacity**, and keeps cargo moving". R10's three claims stay on the shuttle, where CFD-183 put them |
| The desk, whole | INHERITED | `docs/cfd-196-beat.md` and its two amendments, passed 2026-08-26 |
| The terrace, whole | INHERITED | `docs/cfd-183-beat.md`, passed 2026-08-25 |
| Topping arms, the qualifying cargo fires | INHERITED, narrowed | RULED — David 2026-08-27, ruling 5, verbatim: *"Topping the terrace arms the ending, a storm cargo triggers it. That kills the accidental-ending risk and makes the terrace pay off on its own terms without the builder skipping the point."* Shipped and passed on the join board — `docs/cfd-203-beat.md`, passed 2026-08-28; `public/dawnspur-line/sim.js`, `if (r.chartered && topped()) s.stopped = true;`, with the arming spoken aloud rather than silent. Canon §7.2 cites ruling 5 by number as "the shape that gives a builder their payoff without ending the sitting under a player who came for the run". **Narrowed here**: the join board took the ruling *minus* its storm clause, so its trigger is any Chartered cargo home; the storm clause is ruling 5's own and returns — a Chartered cargo home **out of a storm** |
| CARRY / TEND past topped | re-expressed, **Seam 2** | CFD-183's guard was its terminal rule; this board's terminal is different. Named, not silently moved |
| MOSSWAKE +3 | REFUSED, **Seam 3** | The join creates the name collision and the join resolves it. Flagged as the first inherited system dropped, and reversible in one sentence |
| Heat's verbs | REFUSED | §3 — the heat board's phase lock collapsed R10's triangle and "stands as played" only as a harness step; re-lighting it here would re-litigate a convicted collapse and add heat as a sink (R1) |
| Stakes default gentle | ON | Core Loop — "the whole intensity rides the stakes dial … **defaulting gentle and turned up only by a player who reaches for it**". The storm's dial is the player's: the free halt is lit in every sky, the trim exists, and the ground can be banked in advance |
| Failure pays zero; recovered stakes are not payouts | INHERITED | CFD-145 (decided); R6 |
| Scripted or rigged outcomes | REFUSED | "honest dice … fair transparent" — David 2026-08-26 RULED; Economy's legibility rule |
| The lineage lock | ON | §7, "What does NOT change" — never overwrite a passed or killed board; every cumulative sitting ships at a new sibling path |

---

## Author's argued alternatives

The house records rejected roads. Five were close, and the first two are the ones
the PM should push back on if any.

**1. Provisions drawn off the terrace instead of the wallet.** The strongest fix
for the join's one real weakness — the terrace transacting in ones and fours beside
a desk transacting in tens and twenties. The terrace grows food; provisions are
food; a send would eat what the ground grew, and the two loops would be one economy
rather than two economies sharing a purse. It is a better *game* than what ships
here, and it is the shape the pack itself has (`routes[*].rewards` are baskets, not
marks). **Rejected on two grounds and only two:** it changes an inherited system —
the stake is paid in marks on a board that passed a sit — and it introduces
provisions as a second stock, which is a second currency by another name (R1's
neighbourhood) and a second new system (§7's KEPT half). **It is open question 3,
and if David wants it, it is the next sitting, not an amendment to this one.**

**2. The Ranger buys lead time instead of the trim.** The purest canon reading:
"forward sensing for the company … a trained one is how a player knows the weather
is turning with no readout on the screen." The cycle would stop being fixed, the
bird would come one turn out without a Ranger and three turns out with one, and the
Ranger would never touch a number at all — which is the cleanest possible answer to
trap 2. **Rejected on two measured grounds.** First, a variable calendar is a hidden
number on a board whose entire ruling is that the player is told the number, and the
tell must be reliable ("to see a stormbird inland is **to know**"); a probabilistic
tell is a lie in canon's own terms. Second, and more decisively: lead time is bought
once and then requires no further thought, which is **precisely the toll shape the
commission warns against** — the trim is a decision at every storm send and lead
time is a decision at none. It is the better citation and the worse mechanic.
Recorded because it is one sentence to swap.

**3. UP goes dark in a storm — you do not raise a terrace in a gale.** This was in
the draft and was cut. It would have given §5's stake (b) a home (the in-progress
suspended, never destroyed, R6-clean) and made the pre-storm turns more valuable.
Cut for one reason: it is the fifth face of a system that already has four, and the
citation is the weakest of the five (nothing in the corpus says building stops in
weather; it is inference from "a project left mid-advance can suffer"). One system
per sitting is the discipline that survived §7's amendment, and a system with four
faces is already at the edge of it. If the sit says the storm is too soft at the
terrace, this is the first thing to add and it costs one guard.

**4. A random sky — the storm rolls, like the runs do.** Rejected. Honest dice is
the board's ruling for **outcomes**, where the player has committed and the world
answers. The calendar is not an outcome; it is the ground the player plans on, and a
random calendar makes preparation a gamble rather than a craft. It would also make
the tell the only information in the game the player cannot verify, on a board whose
whole claim is that the stated number is the whole truth. The fixed cycle is
published in this beat and readable on the board as the bird; the player who counts
is rewarded for counting, which is the "reading the cold" the Teeth asks for, moved
to the tier where reading happens.

**5. The storm draws marks, or a level, or the roster.** Rejected outright, three
times over. R6 — "a run that fails costs the haul committed to it and never the home
or the permanent record". R3 — "tended ground does not decay". CFD-183's own
conviction, which is the reason that board was recut at all: DOWN-as-the-world's-hand
on held ground is the treadmill canon refuses by name. **The storm draws the bank
and nothing else, and the bank is the one thing on this board that was always the
world's to draw** — that is what a reserve is.

---

## ANSWERED — David, 2026-08-27

All six were ruled. **Do not re-open them when this sitting comes back up.**
Recorded here because the file carried them unanswered and a deferred beat is
exactly where decided questions get re-litigated.

**Weather is deferred, not cancelled.** Canon §7.1: the join board (CFD-203,
`/dawnspur-line/`) ships first, because *"if the sitting's purpose is to test
whether the two loops combine, shipping without the thing that combines them
tests the wrong question."* This beat's own rejected alternative 1 became that
board. §5 stays signed; "the next sitting's reckoning" now means the sitting
after the join.

1. **MOSSWAKE +3 — CUT.** *"Cutting redundant is cheaper than renaming
   colliding."* Conditioned on the terrace having work while the train is out,
   which the two-vehicle claim supplies — and CFD-203 verified rather than
   assumed it, and states that if the reading is refused the cut fails with it.
2. **The Chartered storm pay is 24** — and the recorded reason is **the ladder
   inversion**, not noticeability: it retires for free the oddity CFD-196
   shipped, that the spine out-earns the summit even fully crewed. *"The
   formulaic-storm-play worry is small and testable: if 'always run the summit
   in a storm' turns out to be correct every time, that's a tuning fix later,
   not a reason to ship a difference nobody can feel."*
3. **Provisions off the terrace — SHIPPED, and it took this beat's place.**
   See CFD-203 and canon §7.1.
4. **The Ranger's job is the TRIM.** *"Lead time is a buy-once power-up that
   erodes the thing it's attached to. Trim costs every time and is wrong at the
   summit, so it can't buy you out of the ending."* And a note that travels:
   the Ranger **could be given lead time later as a separate unit rather than
   bending this one**.
5. **The stop: topping the terrace ARMS the ending, the qualifying cargo
   TRIGGERS it.** *"That kills the accidental-ending risk and makes the terrace
   pay off on its own terms without the builder skipping the point."* Recorded
   in canon §7.2 as the shape that makes sitting length opt-in. On the join
   board the trigger is a Chartered cargo home; here it is a Chartered cargo
   home **out of a storm**.
6. **Sitting length — ruled and now canon §7.2.** *"There can be a diversity of
   sits. Standard loops are quick but more challenging ones that are opted into
   can be longer."* "Sits get longer" is retired from §7's cost list.

**One thing this beat must re-examine when it comes back up**, flagged by
CFD-203's author: with weather deferred, TEND's only payoff on the join board
is the closing sentence — so **the storm sitting inherits a much larger bill
than CFD-183 handed it**, because the join board draws the ground far harder.
Re-measure the reserve's arithmetic against the board that actually passes
before this beat is signed.

---

## Open questions for David — ANSWERED ABOVE, kept for the record

Each answerable in a sentence.

1. **Seam 3 — MOSSWAKE +3 is dropped because its name collides with the Mosswake
   route.** Dropped, renamed and kept, or kept as-is and the collision lived with?
2. **The Chartered storm pay of 24.** 23 is the smallest that clears break-even
   everywhere; 24 buys a real margin. One mark, one line.
3. **Provisions off the terrace** (argued alternative 1) — the fix that would make
   the two loops one economy. Next sitting, or never?
4. **The Ranger's job: the trim, or the lead time?** Both are cited; the trim is a
   decision every storm and the lead time is a decision once.
5. **The stop is a Chartered cargo home out of a storm.** Too narrow — should
   topping the terrace also stop the sitting?
6. **Sitting length.** The estimate is two to three times the dispatch sitting. If
   that is too long, the cycle drops nine to seven and the first storm comes two
   turns sooner.

---

## For the PM, not for David

**CFD-200's draft and this beat collide on ordering.** §7 says CFD-200 "follows
rather than leads — by then the town has weather." But `docs/cfd-200-beat.md` as
drafted is itself a cumulative board that carries **the dispatch desk only** and
says so in terms: *"The board carries the whole dispatch desk … Everything carried
from `/dawnspur-dispatch/` is carried unchanged and Kill-listed as unchanged."* It
has no weather and no terrace. If CFD-201 lands first, CFD-200 must be re-based onto
the storm board or the lineage forks into two incompatible cumulative branches — the
exact isolation §7 was written to end. **Flagged before either is signed.** The
cheap fix is one paragraph in CFD-200's Seat naming its base as `/dawnspur-storm/`.
*(Resolved: `docs/cfd-200-beat.md` names `/dawnspur-storm/` as its base and
refuses the re-base by name, and canon §7.1 item 4, corrected 2026-08-28, records
the re-base as withdrawn. Kept as record of the collision this section found
first.)*

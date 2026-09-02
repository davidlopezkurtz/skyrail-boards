# The mechanisms, recommitted

2026-08-25. Triggered by David, after the scale sitting's sit ("it broke"): *"we
need to look to the build bible and lore materials to get a refined /
recommitted understanding of the mechanisms here. This was explained quite
plainly. The source docs are not vague about this."* He was right on every row.
Method: the orchestrator read How-the-Economy-Works and The-Core-Loop in full;
nine parallel readers extracted verbatim-quoted doctrine from Fuel-Heresy,
Laying-Up, Venturing-Gameplay-Preliminary-Lock, Venturing-and-Building,
Geology-and-Weather, The-Two-Games, Pushing-the-Cold-Back, the Master Design
Bible, and World-Bible-v0.1 (all under the PWA repo's `docs/lore/`). Every rule
below carries its quote. David signs this doc before any recut implements it.

## 1. The rules, cited

**R1 — Heat is the master resource. Marks are money. Never the same sink.**
"Heat does three jobs: it warms an island's keel … it drives the trains, and it
is the thing the cold pulls away." (Core Loop) Marks' sinks are civic and
labeled: "the station tariff … the route toll … the charter filing fee … the
insurance premium … the broker's cut." (Economy; World Bible carries the
in-world tooltips.) Marks may *pay for* work — they "sink into the civic fees
and tariffs and insurance **and into buildout**" (Core Loop) — but marks never
*are* the heat.

**R2 — The antagonist is the sink. Upkeep is refused by name.**
"The usual invention is upkeep: fuel that burns, parts that wear, a base that
decays, a standing bill the player logs in to pay… This game does not have to
invent the sink, because the world already is one." (Economy)

**R3 — Holding is cheap to free. Tended ground does not decay.**
"Holding is cheap to free, because tended ground does not decay and an absent
player loses nothing… A treadmill makes the player run to stay in place,
refilling and repairing and re-paying to hold a line that erodes the moment
they stop. This game refuses that." (Economy)

**R4 — Absence is protected without exception. Abandonment is months, gradual,
recoverable, bones kept, hearth spared.**
"No decay clocks, no upkeep tax, and no alerts… Only sustained total
abandonment, far past any ordinary gap … ever cools a holding, gradually and
recoverably and never touching the hearth." (Core Loop) "The moment a holding
starts to rot the instant a player looks away, the game has turned its own cozy
promise into a small daily debt collector." (Laying-Up) The lay-up is
automatic: "The world lays a holding up on its own when a player steps away."
(Laying-Up)

**R5 — The threshold split, and the ratchet.**
"Below the line warmth is dynamic and tended and loseable. Above it warmth is
self-feeding and permanent." (Pushing-the-Cold-Back) Crossing locks ground
"into the light, permanently, and the global Reclamation record ticks up and
never falls." (Core Loop) The hearth's mercy is physics: "it is the first and
smallest thing to cross its own self-sustaining threshold." (Pushing)

**R6 — Stakes live in the run and the in-progress, never the secured home.**
"A run that fails costs the haul committed to it and never the home or the
permanent record, so loss is fail-forward." (Core Loop) "The cold presses the
edge of what a player has warmed. A project left mid-advance can suffer, though
the holdings already secured never do." (Two-Games) And the drawn-down
reserve's reckoning is weather, not a timer: "A drawn-down island rides fine
for years on a falling reserve … The reckoning comes only when a cold stretch
arrives and there is nothing banked to meet it." (Geology) "A storm … is the
one thing in the world that can kill an island in an afternoon." (Geology)

**R7 — Fuel is inflection, not a standing bill.**
"A held, warm island never needs the fire to stay up, which is what keeps
burning a cost of pushing and weathering rather than the standing fuel bill the
economy refuses." (Core Loop) The standing fire is the Burner's game: "The
respectable high islands burn fuel themselves … rationed and quiet." (Fuel
Heresy)

**R8 — The three locked terms, and what a quiet stone means.**
"Hold three distinct terms: liftstone (material), keel stone (apparatus), and
keel-fire (warmth)." (World Bible, resolved — the
`weekend-worldbuilding-2026-06-29/source/` cut at
`Skyrail-Reclamation-World-Bible-v0.1.md:464`; the top-level
`.extracted.md:462` is the earlier, unresolved cut and carries no resolution)
*(An earlier cut read "Three distinct terms hold:"; the source sentence is the
imperative "Hold three distinct terms:", and the inverted wording appears nowhere
in the corpus. The three terms and their glosses are unchanged.)* "A cold stone is quiet, and a
quiet stone is a falling one" (Geology) — and the falling in question is the
Quiet's mechanism, abandonment at world scale: "A great many people, over a
long time, simply stopped filling the bank, and the bill came due all at once."
(Geology) A quiet stone is never a session meter.

**R9 — Heat ≠ Air ≠ Growth (directive 1.19).**
"Heat that warms the ground already reached against Air that opens new ground,
with no build that does both." (MDB) "Reach is a job warmth cannot buy."
(Pushing) Growth is the green third lane that lowers the bar.

**R10 — Every load is one of three claims. The triangle is felt allocation,
not four exclusive buttons.**
"A load can be profit, goods moved for marks. It can be tending, heat and
liftstone carried to a node whose reserve is falling, which earns nothing but
holds the line. Or it can be buildout, materials and heat carried out to extend
the network." (Core Loop) The pressure instrument: "Each region carries a
visible reserve health that over-extraction lowers and that tending runs … and
upkeep contracts raise. The felt choice is output now against holding the
line." (MDB)

## 2. David's collapse table, verified

Every row of his 2026-08-25 reading checks out against the sources:

| His row | Verdict | Rule |
| --- | --- | --- |
| Marks: civic money → also the WARM spend | TRUE collapse | R1 |
| Goods: profit cargo → the leftover click after WARM | TRUE collapse | R10 |
| Heat/keel-fire: banked warmth → dest-quad glow, then dead | TRUE collapse | R6, R8 |
| Pad held/thin: wreck vs HOLD → also stood in for heat and ground | TRUE collapse | R8, R10 |
| Fuel: inflection/heresy → what 176 wanted as leak/refill | TRUE, and the leak/refill was killed for exactly this | R7 |
| Ground field (CFD-163): parked; dest square did the sentence | TRUE | R8 |
| Heat vs Air: WARM as ground step that is also a dest job | TRUE collapse | R9 |
| Profit/tend/buildout → GOODS/HOLD/B/WARM phase lock | TRUE — the deepest one | R10 |

## 3. The boards, judged

- **The scale sitting's convicted first cut (CFD-183, build `5fabe7c` — index
  `d6d5e262` / sim `8f13c683`, killed 2026-08-25, `KILLS.md`'s 2026-08-25 scale entry) violates R3, R4,
  R6 and R8-as-session-meter** *(an earlier cut read "The scale sitting
  (`/dawnspur-scale/`, CFD-183)"; since `1aea540` that path has served the recut,
  which passed its sit and which §7's pass table lists among the passed boards)*: decay-on-idle at a held greenhouse is the refused
  treadmill, applied to the home, on a 1.5-second meter. The beat's DOWN-as-
  the-world's-hand is anti-canon on held ground. What survives canon: marks
  pricing UP (R1's marks-pay-for-work-and-buildout), the level ladder itself,
  the yield-per-level read, the HUD as the build surface.
- **The heat sitting (`/dawnspur-heat/`, passed)** collapsed the triangle into
  a phase lock (R10) but was sat and passed as a harness step; it stands as
  played. Its bank-in-the-stone and step-onto-ground survive R8/R9 readings.
- **David's 19:34 stakes sentence** ("has to be able to die while something is
  still at stake") is satisfied by canon at the RUN and the IN-PROGRESS (R6) —
  it never required mortal buildings, and the sources say the home is never
  the stake.

## 4. What the scale recut must be

Derivation, not yet a beat. The next beat draft follows David's signature on
this document. *(Written 17:18, before the 17:34 signature. The beat followed the
same day — `docs/cfd-183-beat.md`, drafted from §5, signed by David, shipped at
`1aea540`, passed its sit; this section is the record of the derivation, not an
open task.)*

1. **The world's hand comes off held ground.** No level is ever taken by
   idling. The greenhouse, once stood, is a secured holding (R3, R4).
2. **UP stays**: marks-priced (R1, ruled by David 2026-08-25), level ladder,
   yield-per-level, HUD pips — all canon-clean.
3. **DOWN, if it exists this sitting, is the player's hand** (David's original
   direction: "scaled up and down … through the HUD") — and with no refund
   (CFD-145's rule), a voluntary DOWN needs a reason to press before it ships;
   otherwise DOWN waits, named.
4. **Stakes relocate to a canon site.** The candidates, each with its rule:
   (a) the RUN — a carry that can be lost in transit (fail-forward: the haul
   dies, never the greenhouse; R6); (b) the IN-PROGRESS — an UP purchase that
   takes a run to deliver and can suffer before it lands (R6's project left
   mid-advance); (c) the RESERVE — over-extraction draws down a visible
   reserve; the reckoning arrives with a STORM, an event, not a timer (R6,
   R10 — this also un-collapses profit-vs-tending into a felt choice).
5. **The end-sentence rule stands regardless**: every terminal state says what
   happened, in the board's words.

## 5. The question, and the PM's evidence-based proposal — **SIGNED**

**SIGNED — David, 2026-08-25: "section 5 is signed."** The staged answer below
is the ruling: the scale recut ships pure build plus the visible reserve and
the tending run, no deaths; the storm is the next sitting's reckoning; haul
and in-progress stakes arrive inside the storm. The recut beat drafts from
this section under §6's canon-check discipline.

Which canon stake does the scale sitting carry first — the run (a), the
in-progress purchase (b), the reserve-and-storm (c), or none this sitting?

**Proposed answer: (d) now, (c) next — and (a) and (b) arrive INSIDE the storm
sitting as what a storm does, never as standalone mechanics.** The evidence:

1. **The scale recut ships pure build, plus the tending leg in its non-lethal
   canon form: the visible reserve.** "Each region carries a visible reserve
   health that over-extraction lowers and that tending runs … raise. The felt
   choice is output now against holding the line." (MDB) On the board: repeated
   carries draw the reserve down, visibly; a tending run — earns nothing,
   restores reserve — is the counterplay. Nothing dies, because canonically
   nothing does in clear weather: "A drawn-down island rides fine for years on
   a falling reserve, in clear weather, and gives no sign." (Geology) The
   sitting gets a real felt choice with deferred consequence — canon's exact
   shape — and David's deepest collapse row (the triangle) starts uncollapsing:
   profit (carry), buildout (UP), tending (the reserve run) become three claims
   on the same train.
2. **The storm is the NEXT sitting: the reckoning.** "The reckoning comes only
   when a cold stretch arrives and there is nothing banked to meet it."
   (Geology) A storm "steals its sun and chills its keel at once" (Geology) and
   "can foul a line, threaten the cargo on it" (Core Loop) — so when the storm
   lands, the haul in transit is at risk (that is (a)) and the in-progress
   purchase can suffer (that is (b), "a project left mid-advance can suffer,
   though never the holdings already secured" — MDB, directive 1.12). *(An earlier
   cut attributed this sentence to Two-Games. The wording is verbatim from
   `Skyrail-Reclamation-Master-Design-Bible.md:41` and appears nowhere in
   `The-Two-Games.md`; Two-Games:39 states the same rule in different words — "A
   project left mid-advance can suffer, though the holdings already secured never
   do" — which is what R6 above quotes.)* Loss stays
   fail-forward by rule: "costs the haul committed to it and never the home."
3. **The storm is fair by canon — it is telegraphed.** "To see a stormbird
   inland is to know a storm is coming in behind it" (Bestiary; "creatures as
   instruments" is a world-wide principle) and the signal-relay beat:
   "Light it and we can see the weather coming before it hits the convoys.
   That's the difference between a hard run and a lost one." (Cinderbelt
   build — and Signal Tower is one of the twelve canon buildings in the stakes
   pack, so the board's storm-tell has a building waiting to own it.) The tell
   precedes the event; the counterplay (tend the reserve beforehand, hold the
   train home during) always exists.
4. **Why not (a) alone, first:** "This is a soft sink, and it earns its place as
   drama and texture rather than as the economy's regulator. The regulator is the
   cold." (Economy, under the heading "Raiding and loss are a soft sink, not the
   regulator") *(An earlier cut opened the quotation "Raiding and loss are a soft
   sink, and it earns…", splicing the section heading at
   `How-the-Economy-Works.md:45` onto the body sentence at `:47` as one
   continuous quote; no line of the corpus carries the joined wording. Substance
   unchanged.)*
   Haul-loss without the weather system
   is drama with no canonical agent — an RNG tax on a one-train board.
5. **Why not (b) alone, first:** the in-progress needs a pressor, and canon's
   pressor is the cold and its weather ("The cold is the second, pressing the
   warmed edge and the in-progress project and the deep frontier …" — Core Loop)
   *(An earlier cut read "The cold presses … the in-progress project" while a
   player plays — Two-Games; that ellipsis spanned `The-Two-Games.md:39` and
   `:37` in reverse order and no line carries the joined wording.
   `The-Core-Loop.md:79` carries the claim in one sentence.)*. Without the storm, (b) has no
   agent either.
6. **The sequencing instrument is the sitting discipline itself** — one system
   per sitting has produced three passed sits *(a dated count, not a ruling, and
   it was wrong on its date: at the signature, 2026-08-25 17:34:58 (`7081028`),
   exactly one sit had passed — `/dawnspur-heat/`, recorded in the PWA at
   `c29090a` 13:36:36 as "the first sitting to survive a sit". The scale first
   cut had been killed that afternoon (`KILLS.md`'s 2026-08-25 scale entry, build
   `5fabe7c`) and
   its recut landed at 18:16:07 (`1aea540`); `/dawnspur-dispatch/` passed
   2026-08-26 (`83b2ac1`). Three is the count §7's pass table tabulates and it
   has been overtaken since — read the tabulation, not this number. The discipline
   this item invokes is itself amended by §7's "one NEW NAMED system" sentence.)*; and stakes default gentle by
   rule: "the whole intensity rides the stakes dial … defaulting gentle and
   turned up only by a player who reaches for it." (Core Loop)

David's standing sentence — able to die while something is at stake — is then
satisfied one sitting later, by the canonical agent, announced in advance,
with tending as the counterplay. That is cozy-with-teeth as the sources wrote
it.

## 6. How this stays read (the process fix)

The failure this document corrects was not a missing source — the corpus sat in
`docs/lore/` the whole time. It was a pipeline that never consulted it, caught
only by David pushing back. The fix is structural, effective immediately:

1. **Every beat carries a Canon check section.** Each mechanism the beat turns
   ON or REFUSES cites the rule above (R1–R10) or the source line it rests on.
   A beat with an uncited mechanism is refused at PM review — before David
   ever sees it.
2. **The PM's landing protocol gains a step**: spot-verify the beat's citations
   against the sources themselves, the same way worker hashes are re-measured.
3. **This document is first-read for every beat author and implementer brief**,
   listed explicitly in the brief, alongside the exemplar beat.
4. Supersession stays by edit: when a rule here is refined, this file changes
   in place with the date and the reason, never a second file.

---

## 7. The sitting discipline, amended — one NEW system, on a board that keeps what passed

**RULED — David, 2026-08-26.** His observation, verbatim:

> "I thiunk we are running into the one mechanism per sitting limitation when a
> lot of these things become more interesting when there are multiple levers
> beign pulled at once"

And his ruling, the same day: *"yes draft the amendment, and make the next board
cumulative."*

### The rule was never literally true, and the measurement says so

Counted 2026-08-26 across the three boards that have passed a sit: *(Superseded
2026-09-02: this is the 2026-08-26 count and stands as that measurement — at
`d7cd1ab` heat, scale and dispatch were the only passed boards in the tree. Six
more have passed since and are not in the table: `/dawnspur-line/`, PASSED
2026-08-28 (`7f58c8f`); `/dawnspur-halt/`, `/mosswake-loop/` and
`/herbs-larder/`, whose passes the repository records only as "PASSED sit; live
merge" against `66b5507`, `510a392` and `6e606e5` — no pass date is written
down for those three, and the merge date is not one; `/they-remember/`, PASSED
2026-08-31 (`a525218`); `/dice-at-the-places/`, PASSED 2026-09-01
(`12ccd3d`). Their lever counts are not re-measured in this table. This table is
not a pass ledger; the standing list is `docs/cfd-210-beat.md:78-86`.)*

| board | player verbs | state fields |
| --- | --- | --- |
| `/dawnspur-heat/` | 4 — GOODS / B / HOLD / WARM | 8 |
| `/dawnspur-scale/` | 4 — CARRY / MOSSWAKE / TEND / UP | 7 |
| `/dawnspur-dispatch/` | 3 — SEND / MUSTER / MEET | 10 |

*(Superseded 2026-09-02: an earlier cut read 4 / 7 / 8 in the state-field column
and named no instrument. The two instruments that reproduce the scale row's 7 —
the keys of the object `createBoard({fresh:true})` hands to `make()`, and the
distinct `s.<field>` names the file references — agree on all three and give
heat 8 (`sit/dawnspur-heat/sim.js:104-113`), scale 7 (`:128-136`) and dispatch
10 (`sit/dawnspur-dispatch/sim.js:465-476`). All three sims are byte-identical
between this count and HEAD, so nothing drifted. The verb column, which is what
the argument below uses, reproduces exactly on the boards' `commit*` and
`can*` sets.)*

Every passed board carries three or four levers. **"One mechanism per sitting"
has always meant one NEW NAMED system, and the boards have quietly been
multi-lever from the first one that survived.** Writing the rule as if it meant
one lever was a description that never matched the practice, and it has now
started constraining the design rather than the risk.

### David's own sittings are the evidence for the change

On the dispatch board, 2026-08-26:

- **Sitting 1**, one lever engaged (SEND only — the muster was never found):
  three runs, all won, and the sitting was thin.
- **Sitting 2**, two levers engaged: *"got more of a fleshed out experience with
  this."* *(Note 2026-09-02: the quoted sentence has no copy in either repository,
  and the commit that landed it (`d7cd1ab`) transcribes the same sitting in its
  own body as "a more fleshed out experience with this" — one of the two is not
  verbatim. The lever count does not reconcile either: driven from
  `createBoard({fresh:true})`, a sent run never resolves under `wait()` and
  only `commitMeet()` throws the die and pays
  (`sit/dawnspur-dispatch/sim.js:376-396`), so every banked run is a SEND and a
  MEET and the count here can only mean levers chosen between — leaving MUSTER as
  the second. `docs/cfd-196-beat.md:871-872` says "Three sittings failed to find
  a 34px control in the header slot; the fourth used it to a full roster." Which
  lever it was is not recorded here. Sitting 3 (`2a3e9dd`,
  `docs/cfd-196-beat.md:730`) is not listed.)*
- **Sitting 4**, all levers, real losses: *"I think this worked well overall"* —
  the pass.

Same board, same day, same player. The only variable was **how many levers were
in play**. *(Superseded 2026-09-02: same day and same player; not the same board.
Sittings 1–2 were on `ed7f49d`, sitting 3 on `2a3e9dd` (Amendment 1: the
3-mark float, the charter condition, the muster ladder), sitting 4 on `663d4fa`
(Amendment 2: the control moved into the card stack).
`docs/cfd-196-beat.md:871-874` attributes the muster being found to Amendment 2's
placement, so lever-count was not the only variable. The direction of the evidence
stands; its strength is overstated here.)* That is the clearest measurement this project has that lever-count is
the thing, and it argues against the rule as written.

### What was actually constraining, which is not lever-count

**Isolation.** Each board starts from nothing and carries only its own systems.
The heat board's chain does not exist on the scale board; the scale board's
reserve does not exist on the dispatch board. Four boards, four disjoint
experiments, and **nothing accumulates.**

That is why the storm's lineage question (CFD-201) was awkward to answer: it
asked which single board weather lands on, when weather is interesting precisely
because it touches the reserve *and* the run *and* what was mustered. And it is
why a weather-capable unit is boring on a board with one route and no ground,
and interesting on a board with three routes, a drawn ground, and a haul out.

It also pulls against David's own multi-loop direction of 2026-08-26: *"a set of
loops that for purposes of building should each be separate and when taken
together end up greater than the sum of their parts."* **A sitting that contains
exactly one part cannot demonstrate greater-than-the-sum.**

### The amended rule

The old rule did two jobs. One still earns its keep; one does not.

**KEPT — one NEW system per sitting.** This is the attribution discipline: when
a sit goes badly, the newest lever is the suspect. It is cheap, and it is why
three designs died within two days in August rather than slowly. A sitting that
introduces two new systems and fails tells you nothing about either.

**DROPPED — one system TOTAL on the board.** A new sitting **inherits what has
already passed** and adds one thing. Levers compound; the board grows; a bad sit
still points at the new lever because it is the only new thing on it.

A system is "inherited" only if it **passed a sit**. A killed system does not
travel — the preserved kill at `/dawnspur/` stays exactly where it is, and its
mechanics stay dead.

### What it costs, recorded rather than discovered

1. **Sits get longer**, and a board stops being something shippable in an
   afternoon. That is the price of the thing being a game rather than a probe.
   *(The first clause is retired as a cost by §7.2 — RULED, David,
   2026-08-27: a longer sitting the player opted into is a property to design, not
   a price to pay. The authoring cost in the rest of this item is not retired and
   stands; the item is left in place as the cost as first recorded.)*
2. **The fiction has to join.** The desk and the terrace are currently different
   places. A cumulative board makes Dawnspur one town with a desk *and* a
   terrace — which is what the game is, but it is a decision that has been
   deferred until now and cannot be deferred any further. *(Discharged 2026-08-28,
   recorded here 2026-09-02: `/dawnspur-line/` (CFD-203, shipped `3588bb4`
   2026-08-27, PASSED 2026-08-28 at `7f58c8f`) put the desk and the terrace on
   one town; §7.1 records why the join, and not a mechanic, was the one new
   system.)*
3. **The economies have to reconcile.** The scale board spends marks on UP and
   TEND; the dispatch board spends marks on MUSTER and stakes. One wallet, more
   claims on it. *(Discharged 2026-08-27, recorded here 2026-09-02: reconciled on
   `/dawnspur-line/` by the no-exchange rule — provisions became food off the
   terrace and marks stayed the desk's (`public/dawnspur-line/sim.js:47`); §7.3
   records the consequence, that cross-currency pairs are unrankable.)* R1 still binds: heat is the master resource, marks are money,
   never the same sink.
4. **Attribution weakens at the margin.** Only one lever is new, but it now sits
   among several, and an interaction defect is harder to place than an isolated
   one. The mitigation is the one already in use: the Kill list is written as
   tests, so an interaction that breaks a standing rule goes red by name.

### What does NOT change

- **The lineage lock.** Never overwrite a passed or killed board. Every
  cumulative sitting ships at a new sibling path, and the boards it inherits
  from stay live and untouched at their own paths.
- **Nothing moves with wall time.** R4 and R8, unchanged.
- **The canon check.** §6.1 binds every beat, cumulative or not: every mechanism
  turned ON or REFUSED cites its rule or source line. An inherited system is
  cited to the beat that passed it.
- **Kill-list-as-tests, red-first.** Unchanged, and more important than before,
  because it is what keeps attribution honest as boards grow.
- **David's sit is the gate.** Unchanged.

### The first cumulative board

**CFD-201, the storm sitting**, reframed by this ruling: `/dawnspur-dispatch/`'s
loop and `/dawnspur-scale/`'s ground on one town, with **weather as the single
new system**. *(Superseded 2026-08-27 by §7.1, recorded here 2026-09-02: the first
cumulative board became `/dawnspur-line/` (CFD-203) with the provisions join as
its one new system, PASSED 2026-08-28. CFD-201 then shipped as `/dawnspur-storm/`
on the line parent (`42e4aa8`, 2026-08-28) carrying weather as its one new
system; it was sat five times and stopped without a pass
(`docs/cfd-201-beat.md:68-76`). The paragraphs below are the 2026-08-26 framing
and stand as record.)*

This dissolves CFD-201's open lineage question rather than answering it — the
storm does not have to choose a board, because the board now has both. It is
also the case that most needs the amendment: weather's whole interest is that it
lowers the odds on a run, draws against a ground that can be tended in advance,
and creates a reason to muster something that was not worth mustering in clear
weather. David's own direction, 2026-08-26: *"weather will push success
potential down obviously but maybe the counterparty will be more deperate so
better rewards. Maybe a kind of unit that is good at navigating weatehr will be
something the player can invest in."*

Two traps carried forward into that beat, both recorded on CFD-201: **risk-up
plus reward-up can cancel to nothing** (measured: at a full roster a storm
costing 10 points of success on Cloud Basin holds expected marks flat if the pay
rises 18 → 21.2, and the sitting becomes a wash dressed as drama), and **a
weather unit can make weather stop mattering** if investment buys effective
immunity rather than changing how weather is met.

CFD-200, the convoy defense instance, follows rather than leads — by then the
town has weather, and a contested run has more to work with.

### 7.1 The join beats the mechanic — RULED, David, 2026-08-27

When a cumulative board's one-new-system choice lies between **a mechanic** and
**the connection that joins the boards it inherits**, the connection wins.

**His argument, verbatim, and it overturned the PM's deferral:**

> "3 (provisions off the terrace) is the one that matters and I think the
> deferral is wrong. Everything else here is tuning a board where two economies
> share a purse. This is the item that makes them one game. The stated reason
> for cutting it is discipline, one new thing per sitting, and that rule has
> been serving you well. But it was written to stop scope creep, not to block
> the connection that makes a joined board worth joining. Note what the
> analysis admits: it's a better game than what ships. If the sitting's purpose
> is to test whether the two loops combine, shipping without the thing that
> combines them tests the wrong question. I'd swap it in for weather rather
> than stacking it on top."

**Why this is a rule and not one decision.** §7 dropped isolation so that levers
could compound. A cumulative board that inherits two loops and adds a mechanic
*beside* them has not tested compounding — it has tested a mechanic, on a bigger
board. The first cumulative sitting's whole job is to find out whether the loops
are greater than the sum, and **a board that ships without the thing joining
them answers a different question than the one it was convened to ask.**

**The discipline is preserved exactly, not bent.** He chose SWAP over STACK:
the join replaces the mechanic as the one new system. §7's kept half is
untouched — one new system per sitting, and attribution survives, because the
join is the only new thing on the board.

**The concrete instance.** CFD-201 was drafted with **weather** as its one new
system and **provisions drawn off the terrace** argued and deferred as
alternative 1, on the ground that it changed an inherited system and would be a
second new thing. The beat's own text conceded it was *"a better game than what
ships here."* Ruled: **the provisions join ships and weather defers.** The
993-line weather beat is not discarded — it is the storm sitting's beat, held
for the sitting that carries weather. *(993 lines at `d245131`; the beat has
since been re-derived against the join board at `9b8916d` and is longer. Status
at HEAD: the sitting it was held for has happened — the board shipped at
`/dawnspur-storm/` (`42e4aa8`, 2026-08-28), was sat five times and stopped
without a pass, canon §7.4. "Held" describes 2026-08-27, not now.)*

**What deferring weather costs, recorded rather than discovered.**

1. **§5 is SIGNED and says the storm is the next sitting's reckoning.** This
   defers a signed commitment. §5 is not overturned — the storm still carries
   the haul and in-progress stakes when it arrives — but "next sitting" now
   means the sitting after the join.
2. **`/dawnspur-scale/`'s terminal sentence promises weather** — *"The reserve
   left here is the next sitting's weather bill."* That promise now waits a
   second sitting. It is not broken, only outstanding, and the join board must
   not contradict it.
3. **Three of David's six CFD-201 rulings are storm rulings and travel with the
   storm**: the Chartered storm pay of 24, the Ranger's trim, and the stop's
   storm-narrowed form — topping ARMS, a Chartered cargo home *out of a storm*
   fires. They are ruled, recorded, and not re-opened when weather returns. *(An
   earlier cut named the third "the storm premium's shape", as did this ruling's
   commit body at `d245131`; no ruling of that name is among the six recorded at
   `docs/cfd-201-beat.md:1527-1565`, and "premium" in that beat is the
   desperation pay — the Chartered pay itself, already first in this list. The
   board that shipped names the three it carries:
   `sit/dawnspur-storm/sim.js:27-28` the Chartered pay 18→24, `:36-40` the
   Ranger and TRIM, `:20-21` "CFD-203's arming shape, narrowed". Of the six, 1
   and 3 shipped on the join board and 6 became canon §7.2.)*
4. **CFD-200's parent does NOT change. The general rule stands; this item's
   application of it was wrong and is withdrawn — CORRECTED 2026-08-28.** The rule
   the fork taught is right and is kept: **the parent is the last passed board,
   named at signature rather than assumed at drafting.** What was wrong was
   applying it here, to an unsigned beat, on the drafting date.

   As written this item said CFD-200 "re-bases onto the join board instead." It
   was filed the same way in CFD-203's Linear description **at the same minute**
   (canon `d245131`, 2026-08-27T17:47:00Z; CFD-203 created 17:47:37Z) — one claim
   written twice, not two sources. `docs/cfd-200-beat.md` refuted it three and a
   half hours later (`f4c7b8b`, 21:18:32Z), holding §7.1 in hand and citing it.
   **That refutation is the later decision and it governs.** Its Seat still names
   `/dawnspur-storm/` and should. Three reasons, the third structural:

   - **Named at signature.** CFD-200 is unsigned and third in a three-board queue
     — line, storm, rustfall. It signs *after* the storm sitting, so the last
     passed board at its signature is the storm board. Re-basing it today is
     precisely "assumed at drafting," which this item's own clause forbids.
   - **Insertion is not displacement.** §7.1 deferred weather; it did not cancel
     it, and says so in terms — the storm beat is "held for the sitting that
     carries weather." A board inserted *before* the storm does not become the
     parent of the storm's child.
   - **§7's kept half forbids the re-base.** CFD-200's one new system is the yard,
     and every word of its Engineer answer runs on *inherited* weather: the storm
     covering a raider, the storm drawing a tier, the stormbird arriving mid-run
     with PULL OUT lit. On the join board CFD-200 would have to originate weather
     itself, making weather a **second** new system on its board. §7.1 states it
     leaves §7's kept half untouched; as written, this item broke it.

   **The line board passing on 2026-08-28 does not reopen this.** That pass fixes
   **CFD-201's** parent, which is what it was for. It moves nothing for CFD-200.

   **The live conditional, so the rule is not lost with the error.** If the storm
   board is killed rather than passed, CFD-200 re-bases onto whatever did pass —
   which would then be the join board. `docs/cfd-200-beat.md` already carries that
   contingency; this item did not, which is why it read as a ruling rather than a
   guess.

   **Raised and refused four times, and the two counts on record are not a
   disagreement.** `docs/cfd-200-beat.md` says *three* because it was written at
   `f4c7b8b` and counts what had happened by then: CFD-203's author twice on
   2026-08-27, and CFD-200's own author once. **The fourth is this correction** —
   the same re-base was reached for again on 2026-08-28, off this very item, and
   that raise is recorded nowhere but here.

   It recurs because canon is read first and this item said the wrong thing in
   quotable form while the refutation sat in another document, unread by anyone
   who stopped at canon. *(An earlier cut read "a thousand lines into another
   document"; the refuting paragraph was at `docs/cfd-200-beat.md:128` when this
   was written — the Seat section of a 1,275-line file — and is at `:132` at
   HEAD. The distance was wrong; the reading-order mechanism was not.)*
   **Withdrawing it here fixed one of three copies:** the same sentence — *"the
   parent is the last passed board, named at signature rather than assumed at
   drafting"*, applied there to CFD-200 — is live in CFD-203's Linear description
   (not checkable from this repository), and a third copy sat unmarked in
   `docs/cfd-203-beat.md` from `3618d76` (2026-08-27T18:03:26Z) until the
   2026-09-01 sweep superseded it at `16ac8e5` (`:176-185` at HEAD). *(An
   earlier cut read "fixes one of two copies" and named only the Linear
   description. The in-repo copy it missed is the second of the two 2026-08-27
   raises this item counts just above, and missing it is why that copy governed unmarked
   for four days.)* Do not re-open this from any of them. If you still disagree, the
   argument to beat is in `docs/cfd-200-beat.md`, the paragraph beginning *"This
   beat's parent is still `/dawnspur-storm/`, and that is not a leftover."*

### 7.2 Sitting length follows the sitting's ambition — RULED, David, 2026-08-27

> "There can be a diversity of sits. Standard loops are quick but more
> challenging ones that are opted into can be longer to allow for more developed
> gameplay experience."

A board is not too long because it is longer than the last one. **A longer
sitting is legitimate when the player opted into it** — the length has to be
chosen by the player's own ambition rather than imposed on someone who wanted a
quick loop.

Two things follow, and both are testable:

- **A quick path must exist and must be honest.** If the board's short route is
  a worse deal than the long one, the player did not opt in; they were priced
  in. The floor send being free and always lit is the shape this already takes
  on the dispatch board.
- **The stop is what makes length opt-in.** A sitting the player can end when
  they choose is one they chose the length of. Arming-and-triggering (§7.2's
  companion in CFD-201 ruling 5 — topping the terrace *arms* the ending, the
  qualifying cargo *triggers* it) is the shape that gives a builder their payoff
  without ending the sitting under a player who came for the run.

This retires "sits get longer" as a cost in §7's list. It is a property to
design, not a price to pay.

### 7.3 A joined board has unrankable options, and that is the price of the no-exchange rule — RULED, David, 2026-08-28

**The rule this is a consequence of.** The join board makes provisions food and
forbids conversion by name — `public/dawnspur-line/sim.js`: *"food buys exactly one
thing … there is no exchange in either direction."* That rule is what stops the
terrace becoming a second wallet, and it is kept.

**Its unavoidable consequence: any two options that differ in BOTH currencies
cannot be ranked.** With no exchange rate there is no shadow price, so "two marks
better and one food worse" has no sum. It is not a close call to be resolved with
more arithmetic — it is a comparison the board has deliberately given up the
ability to make.

**The worked instance, measured 2026-08-28** (`docs/cfd-201-beat.md`, the
ladder-inversion tables under *Trap 1, answered with arithmetic — and answered
twice, differently*, which follow the line *"in a storm the ladder inverts"*).
*(An earlier cut read "the ladder-inversion appendix"; the beat has no section of
that name — the passage sits inside Trap 1.)* At the 0W+1R roster, after the trim
was re-priced to two marks:

| at 0W+1R | marks EV | food staked |
| --- | --- | --- |
| trimmed Mosswake | 7.128 | 2 |
| hot Cloud Basin | 9.128 | 3 |

The summit leads by exactly 2.000 marks and trails by one food. That row had
previously been published as an **exact tie on both stocks**, which was the table's
sharpest claim; the re-pricing broke it, and the honest replacement is not a new
winner but **no ranking at all**. The sentence *"2W is the first roster at which the
storm run is the best business"* was withdrawn rather than repaired.

**This is a PROPERTY, not a defect, and it must be stated rather than rediscovered
per row.** David: *"the join's own no-exchange rule guarantees this recurs. Any two
options differing in both currencies are incomparable, and the more the board joins,
the more such pairs exist. That's not a defect, it's the price of the rule … A future
reader hitting an unranked pair will assume something is missing."*

**It gets worse as the game gets better, which is the part to internalise.** Every
future join adds a stock, and every added stock multiplies the pairs that differ in
more than one of them. A board with one currency ranks everything; the joined board
ranks less; a board that joins again ranks less still. **The count of unrankable
pairs is a measure of how joined the game is, not of how broken the analysis is.**

**What this obliges an author to do:**

- **Publish the columns, never a synthesised total.** A single number for a
  cross-currency comparison is a shadow price smuggled in, and the board forbids it.
  Two columns and a stated "these do not net" is the honest form.
- **Say the row is unranked, out loud, at the row.** Silence reads as an omission and
  the next reader will try to fill it.
- **Do not resolve it with a design change by reflex.** An unranked pair is a real
  decision handed to the player — the whole point of two stocks is that the player
  weighs them with something the board cannot. Re-pricing to force a ranking is
  removing a decision, and §7.1 is on record that the join is worth its costs.
- **A sit can rank what arithmetic cannot.** "Whether a player trades one food for two
  marks at that rung" is a sit question. Put it on the card rather than in the table.

**The guard against the wrong fix.** If a future beat proposes a food-to-marks
exchange rate, a shadow price, or any single-number netting of the two stocks, it is
proposing to undo the join's one new system, and it must be argued as that rather
than landed as a tuning convenience.

### 7.4 A recut may not be the same KIND as the one that just failed — WRITTEN DOWN 2026-08-31, in use since 2026-08-29

**This rule was already running. It produced the first of the two recuts-to-pass
it has yet produced — `/dawnspur-halt/` at `923002d` (2026-08-30), with
`/they-remember/` the second at `a525218` (2026-08-31, ninety minutes after
this section was written) — it terminated two boards, and it was written down
nowhere** — it survived as four ad-hoc refusals in Linear comments. That is the
condition this file exists to end. *(An earlier cut read "It produced the only
recut-to-pass in the corpus". It was stale within ninety minutes on the narrow
reading and was already false on the plain one when written: §7's own pass
table lists `/dawnspur-heat/` and `/dawnspur-scale/` among the passed
boards, and both are recuts of killed cuts — `KILLS.md`'s 2026-08-24 starve-or-feed
entry and `1aea540`.
`docs/cfd-208-beat.md:401-403` has superseded its own copy of the same
sentence.)*

**The rule.** When a sit fails, name what KIND the last recut was — **writing**,
**act**, **affordance**, or **structure**. The next recut must be a *different*
kind. When the only remaining move is the same kind again, **stop recutting** and
route the finding to a new beat or a sibling path.

**Why kind and not count.** A recut budget rations the wrong thing. Boards are
small and recuts are cheap; what is scarce is David's sitting. Two recuts of the
same kind consume two sittings to learn one thing. The rule below spends a sitting
only on a question the last one did not already answer.

#### The evidence, measured 2026-08-31

**`/dawnspur-halt/` is the clean experiment, because a writing recut and an act
recut were tried in sequence on one board.** Sits in order, from CFD-205, across
its two paths:

1. grey-square random clicks — **fail**, on `/dawnspur-site/`, the path stopped
   below (that board was sat at least twice: "random clickables" is its recut 1,
   `docs/cfd-205-beat.md:8`, `:52`, and the stop is recut 2, `:28`)
2. buildings and feed without why — **fail**, `/dawnspur-halt/` cut 0 (merge
   `e44212db`; `KILLS.md`'s 2026-08-30 Halt buildings entry)
3. *"Lit the lamp and started the foundry."* — **fail**, `/dawnspur-halt/`'s
   writing recut `b23006d` (merge `c1b66ee5`; `KILLS.md`'s 2026-08-30 Halt Home-sit
   entry); he did the
   two opening can-dos and stopped

*(An earlier cut read "because both kinds were tried in sequence on one board"
and listed all three sits under `/dawnspur-halt/`. The rule above names four kinds;
the two this board tried are **writing** (the Home-sit entry's *"Recut: writing on the
existing work notices"*) and **act** (the
`923002d` recut named below). The first sit was the site's — `docs/cfd-205-halt-beat.md:217`,
"recut-2 fail; grey-square UI stays on `/dawnspur-site/`", and the halt's own
manifest, `sit/dawnspur-halt/MANIFEST.txt:9`, reads "Not a recut of
/dawnspur-site/". The argument is unchanged: the two kinds tried in sequence on
one board are `b23006d` and `923002d`.)*

The PM then refused the obvious next move by name — *"Superheavy names a recut that
is **not** louder Home labels"*, and *"PM already refused a louder Home recut"* —
and the recut that shipped changed the **act**: `923002d`, whose source header reads
`// One NEW system: the walk.` and which adds `if (!s.lampLit) return false;` and a
`liveCanDo()` gate, one live can-do at a time.

**That recut passed.** David: *"Lit the lantern and tended home and provided
resources."* The PM's own reading of the pass is the rule in one line:

> **"Place is what he did, not a slogan."**

**Two boards were stopped by the same rule rather than recut further.**
`/dawnspur-site/` ended on *"no further grey-square recut"*. `/dawnspur-storm/`
stopped at five with *"do not recut `/dawnspur-storm/` for 'why more glass' — that
is the city sitting"*, and David's own redirect: *"It's definitely time for the
city. I think we have a good loop buildout and need the spine to attach it to."*
**Neither was a failure of the board. Both were findings routed to the right
place.**

#### What this rule is NOT, and these were tested and refused on 2026-08-31

- **Not a recut cap.** A two-recut cap was proposed and measured: it would bind in
  **one case out of six**, permits `/dawnspur-halt/` with zero margin, and on the
  one board where it would have bound the named cause was the missing city, which
  no cap can fix. Near-vacuous. Refused.
- **Not "ask the player what they were trying to do."** Also proposed, also
  refused, and this one is actively dangerous: it was **already tried** on
  `docs/cfd-201-beat.md`, whose *"What the sit must report"* asked, as signed at
  `30ff642`, *"At which storm send did you consider the trim and not take it?"* —
  beside the TEND question quoted below. *(An earlier cut read "asks two intent
  questions"; the second of the two is the CFD-203 TEND question this section
  holds up below as the shape that is **not** an intent question, and
  the trim question was recut into that shape at `16ac8e5`, 2026-09-01, so at
  HEAD that card asks none in the intent form.)* The one intent answer on record is a **confabulated mechanism** —
  *"I noticed it degrade and started to see a connection between fully tended land
  and success rates"* — a link that does not exist on that board, where TEND
  restores the reserve and route odds move with sky and roster. **An intent answer
  is a player theory, not a measurement.** Acting on it would have sent the team to
  fix nothing.

  **And the failure is structural, not a bad sitting.** David, 2026-08-31:
  *"Players narrate causes, and the narration is confabulated in exactly the cases
  where you most want the truth."* That is the whole objection. A player who
  understood the board would not need asking; a player who did not will supply a
  cause anyway, because supplying causes is what people do with their own
  behaviour. **So the question returns its worst answer precisely when the board is
  most broken** — which is the only time anyone would think to ask it. It is not
  that the answer is unreliable. It is that it is unreliable in a direction that
  reads as insight.

  **The shape that DOES work is already in the corpus, and it is the near-miss
  worth studying.** `docs/cfd-203-beat.md:1386` asks:

  > *"Ask the sitting to report **whether anyone tended at all, and why.** If
  > nobody touches it, that's the answer. If they tend and can't say what it
  > bought them, TEND has become a habit carried from a board that no longer
  > exists, and it should either be cut or merged into the food line before
  > Rustfall."*

  *(An earlier cut stopped the quotation at "exists." and set "can't say what it
  bought them" in bold; the source at `docs/cfd-203-beat.md:1386-1390` has
  neither, and §7.5's third outcome — "cut it, or merge it into the food line" —
  routes on the clause that was cut. §7.5's worked example 1 calls this
  quotation "in full"; with this correction it is.)*

  That looks like an intent question and is not one. It asks **what they did** — a
  fact the board can check — and then whether they can **name what it bought**,
  which tests whether the mechanism is legible without asking them to explain it.
  Crucially, **it pre-registers what each answer means**, including the null: *"if
  nobody touches it, that's the answer."* An intent question has no such structure;
  whatever comes back sounds like a finding.

  **The rule, then: ask what they did, and whether they can name what it bought.
  Never ask what they were trying to do.** The first two are observations with a
  stated reading. The third invites a theory and this project has already acted on
  one.
- **Not a claim that writing recuts are wrong.** Three storm recuts were pure copy
  **because David asked for copy, verbatim, three sits running**. A copy recut
  answering a copy complaint is the rule working. The failure is a copy recut
  answering a complaint the copy cannot reach.

#### The trap this rule is aimed at, named so it is recognisable

**A sit verdict about the act reads exactly like a request for better words.**
*"The descriptions of why to do these things do not make much sense"* is a sentence
about captions on its face and about stakes underneath. The caption is also the
nearest editable surface. So the default move is always the writing, and a board
can absorb several sittings without the question moving.

**The tell is that the sit keeps arriving in the same shape.** When the third sit
restates the second, the next recut is the wrong kind by definition — whatever kind
the last one was.

#### What an author owes when proposing a recut

One line, before the beat: **what kind the last recut was, what kind this one is,
and what would make it the last.** If those are the same kind, the recut does not
ship and the finding goes to a new beat.

Related: §7 (one new system per sitting), §7.2 (the stop is what makes length
opt-in), and `KILLS.md`, where every recut decision and its shas are recorded.

### 7.5 Pre-register what each outcome means — including the null — before the sit. RULED, David, 2026-09-01

**The rule.** Before a board is sat, write down the outcomes it can produce and
what each one would mean. **Including the outcome where nothing happens.** A sit
that arrives without that split gets read against whichever story is nearest, and
the nearest story is the one the author already believed.

**Why it is canon and not a habit: it was rediscovered twice, in different shapes,
from different seats, five days apart** — David's TEND question on 2026-08-27
(`f02cbc7`), the orchestrator's three nulls on CFD-210 on 2026-09-01. David:
*"Two independent rediscoveries in different shapes is enough evidence, and the
value is specifically that it forces the split before you have a result to
rationalise."*

**§7.4 got here first and filed it as a detail.** It cites the TEND question as
the worked example of a question that *looks* like an intent question and is not,
and it does say — in a subordinate clause — that the question *"pre-registers what
each answer means, including the null."* So the observation was made and then used
as support for a different rule. §7.5 promotes it: **the pre-registration is not a property that made one good question good, it
is the requirement.**

**The value is the timing, not the writing.** Anyone can classify an outcome after
seeing it. The split is only worth something while it is still cheap to be wrong
about — which is before the sitting, when nobody is defending anything.

#### Worked example 1 — CFD-203, the TEND question

Quoted in full at **§7.4** and at `docs/cfd-203-beat.md:1386`. Not re-quoted here:
it is one passage, and a second copy in an adjacent section is how a document
starts disagreeing with itself. Its three outcomes, written before the sit:

| outcome | what it means | where it routes |
| --- | --- | --- |
| nobody tends | *"that's the answer"* — the verb is dead | cut it |
| they tend and name what it bought | the verb is live | keep it |
| they tend and cannot say what it bought | a habit from a board that no longer exists | cut it, or merge it into the food line |

**Note the middle and the third look identical in a usage count.** Both are "TEND
was used." Only the pre-registered split separates a live verb from a reflex, and
**a counter can never make that distinction at all.**

#### Worked example 2 — CFD-210, the three nulls

The same insight in a different shape. Three ways a fork can produce no decision:

| outcome | what it means | where it routes |
| --- | --- | --- |
| banks immediately, without remarking | the branch was never live to him | the corridor is load-bearing; close the question |
| presses on, never mentions what he passed up | the fork is real, one branch invisible | what makes a forgone option legible |
| does it once, cannot say why | a coin-flip dressed as a choice | differentiation |

**All three would be logged as "the player used the fork."** They mean three
different things and route to three different places. Without the split, the first
sit produces whichever reading the author was already carrying.

#### What this obliges

- **Write the outcomes and their meanings into the beat, before signature.** Not
  as a prediction of which will happen — as a commitment to how each will be read.
- **Include the null, always, and say what it would mean.** *"Nobody touched it"*
  is a result. This project has twice found the null to be the most informative
  outcome available, and an unregistered null gets reported as "inconclusive."
- **Say where each outcome routes.** An outcome with no destination will be argued
  about instead of acted on.
- **A result you cannot map onto the registered split is a finding in itself** —
  it means the board could do something the beat did not anticipate, which is
  worth more than a clean confirmation.

#### What it is not

**Not a prediction.** Registering three outcomes is not a claim about which will
occur, and a beat that argues for one of them has defeated the purpose.

**Not a substitute for the sit.** The split says what an outcome would mean; only
the sitting says which happened. §7.4's question form still binds — **ask what
they did, and whether they can name what it bought.**

**Not a licence to count.** Two of the TEND outcomes are the same number and
different findings. If a split can be resolved by a counter, it was not a split
worth registering — and if it cannot, the counter is not the instrument.

Related: §7.4 (the sit's question form, and the refused one), and CFD-203 and
CFD-210, which carry the worked examples above.

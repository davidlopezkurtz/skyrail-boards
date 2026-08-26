# CFD-196 — the dispatch sitting

The multi-loop architecture's second loop, drafted from David's 2026-08-26
direction ("the core loops are just a few clicks that you do when they are
available … select the mission, confirm the number and type of troops, and off
they go, to either success or failure") under `docs/mechanisms-recommitted.md`
§6's canon-check discipline. The board is that loop in Skyrail's nouns: pick a
route, muster the crew, send — and the train comes home paid, or it comes home
empty. Card: CFD-196.

**SIGNED — David, 2026-08-26: "signed — go, and rule the seam my way."** The
seam below is ruled with that signature. Implementation proceeds from this
document; the Kill list is the red-first test spec.

## At landing — what shipped, and where it departs from this document

Recorded by the PM at landing, so the differences are read rather than
discovered. Two are deviations from signed example sentences and are DAVID'S
to accept or reverse at the sit; the third is this document going stale.

1. **Neither terminal register names the weather.** The signed example reads
   "lost to the weather on the way"; the board ships "lost on the way", and
   the clean register ships "the stake was never once called" in place of
   "the weather never once called the stake". Cause: the seam ruling below
   makes the Core Line's failure agent the line, not weather, and the board
   prints three per-run agents of which only Cloud Basin's is weather. A
   terminal blaming weather would misread its own record, which this beat
   kills. Per-run sentences still name weather, and only on Cloud Basin.

2. **The paid register carries a fourth figure — the turned-back count.**
   The Ends section requires three (runs out, cargoes banked, stakes lost).
   The fourth exists because keying the registers on COST let the register
   this beat calls "Clean record" fire over thirteen runs out against four
   banked with nine turned back — reproduced at review, and pinned as
   intended by the implementer's own first test. The registers now key on
   `runsTurnedBack === 0`, and the count is what reconciles the gap in words
   instead of leaving the reader to subtract. A zero-cost sitting reads
   "nine turned back and cost nothing but the trip" — the paid register
   reading a zero, the same move the turned-back sentence already makes on
   the free hop. Still two registers.

3. **The Seat's pin "boards main at 1aea540" is stale and was not gradeable
   as written.** Two commits landed after signature — `b39714c` (this
   signature) and `e46fd7a` (CFD-197). What that Kill line protects is the
   live boards, and those were graded directly instead: scale `953368a1`,
   heat `292d6645`, the preserved kill `395c18f2`, convoy-stop `5ad814e6`,
   all standing, verified live after deploy.

## Named ruling — dice for standard runs, the instance for contested ones

The beat's biggest question — how failure resolves — was RULED by David,
2026-08-26, while this beat was in draft. His words, verbatim:

> "on the base risk question, I think that honest dice is the answer EXCEPT
> for instances where there is, in fact, an instance or a game that determines
> the outcome of a route. E.g., a send into particularly contested territory
> known to have raiders may lead to the convoy defense game, which is not a
> dice roll purely as it depends on the players' decisions on placement and
> tactics and such. But for standard runs, fair transparent dice rolls with
> stated statistics (X% chance of success given current configuration, which
> can change with more or less of XYZ asset applied to the send) makes the
> most sense."

This beat implements the ruling, both halves. **Standard runs are honest dice
at the engine's tuned instrument, with the percentage stated on the card
before the send and moved by the crew aboard.** **Contested routes do not roll
dice**: the one raider route on this board is visible and refuses the send by
name, reserved for the sitting that brings the defense instance (the
CFD-179 / Convoy Wall lineage). The instance is not implemented, specced, or
stubbed here.

The ruling also resolves the standing dice-vs-read tension along canon's own
seam. The Teeth: "Failure is a gradient, not a state … set by how well a
player reads the cold and when they turn back" — that doctrine governs the
**active** tier, where the player is on the line making the read, and it is
exactly what the defense instance's placement-and-tactics resolution will be.
The dispatch loop is the **passive** send: the player's read happens at the
desk — which route, how many Wardens — and the crew makes the line-read in the
player's stead. Dice with stated odds are that tier's honest instrument, and
the odds moving with the crew is the read made legible. The two tiers are
David's EXCEPT clause, rendered.

**One seam named for PM review.** The signed `mechanisms-recommitted.md` §5
sequences the *scale lineage's* stakes: haul-in-transit loss arrives inside
the storm sitting, because on that board haul-loss had no canonical agent.
This board is a different loop with its own commission — David's 2026-08-26
direction and ruling post-date §5 and ask for success-or-failure dispatch now
— and its dice routes name their own agents from the JSON's tags: weather and
the line itself (`routes[cloud-basin-span].tags`: "weather"), never a storm at
the town and never raiders-by-dice. The storm sitting keeps its seat on the
scale lineage untouched.

**RULED — David, 2026-08-26: §5 does not bind this loop; the stake stands
whole.** The ground is §5's own test rather than its conclusion. §5 refused
haul-loss-first because it would be "drama with no canonical agent" (§5.4),
and refused the in-progress stake because "the in-progress needs a pressor"
(§5.5): storm-first was the answer for a board that had no agent to hand, and
§5's question sentence scopes itself to "the scale sitting". This board's
routes carry their agents in the pack's own tags, so it passes §5's test
rather than dodging it.

Recorded with its soft spot named, because a ruling that hides its weak half
is the welding §6 forbids: the tag argument is strongest at Cloud Basin
(`tags`: "weather") and weakest on the two Core Line routes, whose agent —
the line's own condition — is read from their descriptions and `ROUTE_EVENTS`
rather than named by a tag. The ruling takes the safe routes' 0.08 / 0.12 as
the line itself, and the stake on them stands.

## Seat

Beat only. No implement. No deploy. No merge. Do not touch `public/dawnspur`,
`public/dawnspur-heat`, `public/dawnspur-scale`, `public/convoy-stop`, or live
board bytes. Do not `workflow_dispatch`.

Pins, re-measured at authoring: boards `main` at `1aea540`. Live shas to
leave standing: `/dawnspur-scale/` sim `953368a1`, `/dawnspur-heat/` sim
`292d6645`, the preserved kill at `/dawnspur/` sim `395c18f2`. (Measured
note: the heat sim's working-tree copy hashes differently under CRLF
checkout; the pin is the blob and the live bytes, per the LF rule. Do not
"fix" the working tree.)

**The new board lands at `/dawnspur-dispatch/`.** It is Dawnspur's board, not
Convoy Stop's: the desk is the town's own Switchyard — "Dispatches trains,
adds scheduling capacity, and keeps cargo moving"
(`buildings[switchyard].description`; `unlocks`: "train dispatch") — and the
multi-loop architecture is loops on one town, so the dispatch loop sits beside
heat and scale under the town's name. The Convoy Stop lineage is not orphaned:
its wave-defense grammar — placement, lanes, tactics — is the defense
*instance's* grammar, and that lineage inherits it when the contested tier
ships. The preserved export at `/convoy-stop/` stays untouched until then.

David sits first. Ask: What happened.

## Does

The switchyard desk opens on the near lines. Three routes take a send; a
fourth is on the map and refuses one.

- **SEND — DAWNSPUR HALT** (`routes[dawnspur-halt]`, Core Line, baseRisk
  0.08): the lamplit hop. No provisions, no toll — the stake is nothing and
  the pay is smallest. **Always lit at home.** This is the board's floor: no
  reachable state deadlocks, because this send never goes dark.
- **SEND — MOSSWAKE LOOP** (`routes[mosswake-loop]`, Core Line, baseRisk
  0.12): the spine. Provisions 2. The herb run the town's first charter was
  written about.
- **SEND — CLOUD BASIN SPAN** (`routes[cloud-basin-span]`, Chartered Line,
  baseRisk 0.25): the reach. Provisions 3, and the Chartered line toll of 1
  on top (`routeTolls.chartered.flatFee`), labeled as the civic fee it is.
  Its failure agent is named by its own tags: weather.
- **RUSTFALL YARD** (`routes[rustfall-yard]`, tags "raiders") — **on the map,
  visibly other, and it does not send.** No odds are quoted on it, because
  quoting odds there would be a lie: by David's ruling its outcome is not a
  dice question. The card says so in the board's words and waits for the
  defense instance.

**MUSTER WARDEN** — 3 marks, +1 Rail Warden (`crewTypes[wardens]`, "Durable
guards … protect cargo and absorb danger on convoy runs"), permanent, cap 4.
The roster is not spent by anything, ever: the engine's own dispatch
resolution returns the crew home on success **and** on failure
(`addCrew(next, dispatch.crew)`, both branches — `resolveDispatch`,
`src/engine.js`), and this board keeps that law. The whole roster rides every
send, itemized on the card — the manifest is a real object, because David has
already said what it becomes at the next tier: "assets assigned to the send
become the assets available in the defense instance" (two marksmen, two guns;
an engineer, a wall and an obstacle). This sitting displays the manifest;
inheritance belongs to the instance sitting.

**Every send states its statistics before the click**: X% chance of success,
computed by the engine's own formula and moved by the roster — success =
0.76 − baseRisk + 0.036 per Warden aboard (convoy prefers guard,
`missions[convoy].preferred`; Wardens carry guard 3,
`crewTypes[wardens].power.guard`; ×0.012 per point,
`calculateDispatchPreview`, `src/engine.js`). The number on the card and the
number the sim rolls against are the same number — one instrument, no second
copy. Muster a Warden and every card's quote moves while you watch.

**SEND commits.** The stake — provisions and toll — is spent at the click,
win or lose, and never refunds. The train and the whole roster go out; the
platform stands empty; the board holds the away state. Nothing moves with
wall time: the run is out exactly as long as the player leaves it out, and it
never sours — met in a breath or met in a week, the run is the same run
(R4's protection, applied to the in-progress). The roll has not happened yet.

**MEET THE TRAIN resolves.** The meet is this board's world's-turn: the dice
are thrown at the meet, once, against the stated chance.

- **Success**: the route pays in full — +10 / +14 / +18 marks by route — and
  the board says what came home.
- **Failure**: the route pays **zero** (CFD-145, decided: failed runs pay
  zero route reward). The provisions are spent, the toll stays paid, the
  cargo never banked — and the crew and the train come home whole. The home
  is never touched. That is the whole cost: the haul committed to the run,
  never more (R6, fail-forward).

Mission is convoy, locked (`missions[convoy]`, rewardMultiplier 1 — the one
mission that leaves `route.rewards` untouched). No posture, no hero, no
insurance, no safety accrual — every one of those is a term in the engine's
formula, and every one is zero here by the refusals below, so the stated
number is the whole truth. The sim never surfaces marks below 0, a roster
outside 0..4, or a second run while one is out.

## Sees

The desk, and the near lines small — map or cards is the implementer's
business under this spec. Each sendable route carries exactly four reads at
phone glance: its name, what it pays, what it stakes (provisions and toll,
labeled with their civic names), and its stated percentage — live to the
roster, re-quoting the moment a Warden is mustered. The Rustfall card is
unmistakably not one of them: dark, odds-less, its one line naming raiders
and the defense the desk cannot roll dice for.

The MUSTER control wears its own numbers: price 3 on its face, roster on its
face. The HUD keeps one line: marks. Nothing else joins it.

The away state is a state, not a motion picture: platform empty, the sent
line marked, the manifest itemized on the away card — "2 Wardens ride with
the Cloud Basin provisions" — and MEET the one lit verb. No timer bar, no
creeping train, no progress meter; an away train that visibly travels on wall
time is the convicted class, and every animation needs a world function this
board does not have.

The town behind the desk — greenhouse, bank, hearth — stands as scenery from
the sittings that built it. This board neither reads nor writes any of it.

## Ends

Every run ends in a sentence, in the board's words.

- Home paid, the shape of it: *"The Wardens brought the Mosswake cargo home.
  The desk banks 14."*
- Turned back, the shape of it: *"Weather over the basin. The crew turned the
  train for home with the haul unbanked. The provisions are spent; the route
  paid nothing; crew and train are home, and the desk stands."* The failure
  sentence always carries all four: zero pay, stake spent, crew home, home
  untouched. The words may move in register, not in content.

**The stop is the first Chartered cargo banked: Cloud Basin home paid.** The
floor teaches, the spine earns, the summit ends the sitting. A turned-back
summit run is deliberately not an ending — the stake dies, the desk stands,
the halt is still lit, and the record holds. Bare marks is not an ending
either, for the same reason: the floor send is free and always lit.

At the stop, the board reads its own ledger, two registers:

- Clean record: *"The first Chartered cargo is home. Five runs out, five
  cargoes banked, and the weather never once called the stake. The line past
  the basin is the next sitting's."*
- Paid record: *"The first Chartered cargo is home. Seven runs out, five
  cargoes banked, 4 marks staked and lost to the weather on the way. The
  record keeps what came home; the line past the basin is the next
  sitting's."*

The sentence must read the record — runs out, cargoes banked, stakes lost —
and the paid register names the losses without apology and without warning.

## On this sitting

| System | This sitting |
| --- | --- |
| The dispatch loop (pick, muster, send, meet) | **ON** — the direction's few-click loop in the board's nouns |
| Honest dice, stated odds | **ON** — RULED, David 2026-08-26; the card's percent and the sim's roll are one number |
| Dawnspur Halt / Mosswake Loop / Cloud Basin Span | **ON** — baseRisk 0.08 / 0.12 / 0.25, pays 10 / 14 / 18, stakes 0 / 2 / 3+1 |
| Rustfall Yard | **ON** as a visible card; **REFUSED** as a send — contested territory does not roll dice; waits for the defense instance |
| The defense instance / any mini-game | **REFUSED** by name — the ruling's EXCEPT clause names it; CFD-179's Convoy Wall lineage inherits it; not stubbed here |
| Wardens: durable roster, muster 3, cap 4 | **ON** — the crew always comes home, both branches, the engine's own law |
| The manifest, itemized on the send | **ON** as display — the instance will inherit it (David's two-marksmen-two-guns intent); inheritance **REFUSED** this sitting |
| Rangers / Gunners / Sappers | **REFUSED** — their preferred missions are off this board; they arrive with survey, patrol, and the instance |
| Provisions as the stake | **ON** — the haul committed to the run; a cost of pushing, never a standing bill |
| The Chartered line toll | **ON** — 1 mark, verbatim, labeled civic; Core Line's rate rounds to zero at civic scale, noted |
| SEND commits / MEET resolves | **ON** — the meet is the world's turn; the roll is the meet's, never the send's |
| No wall clock | **ON** as a refusal held — durationSeconds stays unimported as time; its cost lands in the provisions |
| The away run never sours | **ON** — absence protected; met in a week, the same run |
| Failure pays zero; crew and train home; home untouched | **ON** — CFD-145 + R6, in every failure sentence |
| The engine's ×0.25 failure consolation | **REFUSED** — the un-implemented remnant CFD-145 already overruled |
| Insurance | **REFUSED** — recovered stakes are not payouts; the naked stake teaches first; the tiers wait, named |
| Postures | **REFUSED** — balanced locked, its term 0 by the content's own table |
| Route events | **REFUSED** — the engine's fifteen event biases stay out; one quoted number is the whole truth |
| Heroes | **REFUSED** — the direction's "accompanying heroes" wait for the Hero Lodge sitting |
| Missions beyond convoy | **REFUSED** — patrol waits with safety, survey with the signal tower, repair with damage, raid with the instance |
| Route safety accrual | **REFUSED** — patrol's business; safety = 0 in the formula, stated |
| Train damage / repair loop | **REFUSED** — its sink exists in the config and waits for its own sitting |
| Goods as nouns (food, materials, energy, parts) | **REFUSED** standing — marks stand in, flagged, conversion cited |
| Signal tower / route discovery | **REFUSED** — the near map is pre-surveyed this sitting, deviation flagged |
| Contract mechanics | **REFUSED** — the Market Hall's surface; the first-run charter's text seeded the spine's voice only |
| Scripted or rigged outcomes | **REFUSED** — "honest dice" is the ruling's own word; no forced first success, no forced lesson-failure |
| Marks | civic money **ON**; **REFUSED** as refund in any direction |
| The storm / any reckoning at the town | **REFUSED** — the scale lineage's storm sitting keeps its seat; this board's weather lives inside route odds only |
| HUD | **ON** — one line, marks; roster and price live on the muster control |
| End-sentences, per-run and terminal | **ON** — the terminal reads the record; the failure sentence carries its four clauses |

## Kill

- Anything on the board moves with wall time. durationSeconds or baseSeconds
  is imported as a clock.
- A failed run pays any fraction of the route reward. The ×0.25 leg appears.
- A stake, toll, or muster refunds — any branch, any direction.
- Any crew member fails to come home, on either branch, ever, this sitting.
- The stated percent and the sim's rolled threshold disagree anywhere.
- Odds move by anything but baseRisk and the roster — a posture, hero, event,
  insurance, damage, or safety term goes nonzero.
- The roll happens at SEND, a run resolves without MEET, or any outcome is
  scripted.
- Rustfall sends, quotes odds, rolls dice, or opens anything. A mini-game or
  its stub appears.
- A second run goes out while one is out. Roster leaves 0..4. Marks go
  negative anywhere.
- A reachable home state has no lit send, or an away state has MEET dark.
- Any outcome touches the roster, the town, or another board's state; this
  board reads or writes heat or scale state.
- Insurance, postures, heroes, mission choice, contract mechanics, goods
  nouns, or a second currency appears.
- The HUD grows past the one marks line.
- A run or the sitting ends without its sentence; a failure sentence drops
  zero-pay, stake-spent, crew-home, or home-stands; the terminal sentence
  does not read the record.
- MUSTER lights while the roster rides. 3 / 2 / 3+1 / 10 / 14 / 18 / 0.036
  move without this beat moving.
- Live shas are overwritten (main `1aea540`; scale `953368a1`; heat
  `292d6645`; kill `395c18f2`). Any Dawnspur board or `/convoy-stop/` is
  touched.

## The numbers, and where each one comes from

- **baseRisk 0.08 / 0.12 / 0.25** — `routes[dawnspur-halt | mosswake-loop |
  cloud-basin-span].baseRisk`, verbatim. The instrument's tuned side.
- **The success formula** — `calculateDispatchPreview`, `src/engine.js`:
  success = clamp(0.76 − routeRisk − damagePenalty + crewBonus + heroBonus +
  posture.success + event.successBias + insuranceBonus, 0.12, 0.96), with
  crewBonus = min(0.3, preferredPower × 0.012). Every term this board refuses
  is zero by its refusal — safety 0 (no patrols), damage 0 (no repair loop),
  hero 0, balanced posture 0 (`DISPATCH_POSTURES`, `src/content.js`), event 0,
  insurance 0 — so the board's formula is the engine's with the refusals
  substituted: **success = 0.76 − baseRisk + 0.036 × Wardens**, clamp kept.
  The sitting's reachable range is 51.0%–82.4%; the clamp is carried anyway,
  engine-faithful. Display rounds to whole percent; the sim rolls the exact
  value; one number, one validator.
- **The odds table** (bare / +1 / +2 / +3 / +4 Wardens): halt 68.0 / 71.6 /
  75.2 / 78.8 / 82.4; Mosswake 64.0 / 67.6 / 71.2 / 74.8 / 78.4; Cloud Basin
  51.0 / 54.6 / 58.2 / 61.8 / 65.4. Derived, not authored.
- **The engine's failure leg is refused, not copied.** `resolveDispatch` at
  this tree still pays a failed run `rewardMultiplier × 0.25` — PLAN.md
  records CFD-145 as "decided, not yet implemented." The decided rule wins:
  zero. The crew leg is kept: `addCrew(next, dispatch.crew)` runs on both
  branches, so the crew coming home is the engine's law, not this beat's
  mercy.
- **Pays 10 / 14 / 18** — the routes' full reward baskets converted at the
  pack's own exchange table (`economyConfig.resourceValues`: food 1,
  materials 2, energy 2, parts 4): halt 66, Mosswake 94, Cloud Basin 114
  mark-equivalents; ÷6.5 → 10.15 / 14.46 / 17.54 → 10 / 14 / 18. Marks stand
  in for the goods legs exactly as they stand in on the scale board, flagged;
  the goods nouns wait, named.
- **The civic scale factor 6.5 is the one authored number**, chosen so the
  board's durable purchase lands at 3 — MUSTER 3 from Wardens' baseCost
  (food 8 + materials 5 = 18 equivalents ÷ 6.5 → 2.77 → 3), the same civic
  seat the scale board's first UP took. Everything scaled shares this one
  factor.
- **Provisions 0 / 2 / 3 — new-play, the honest null.** No per-run outfitting
  cost exists in the JSON or the engine (the engine prices the run's cost in
  wall time, which this board refuses). The anchor is argued: Mosswake 2 is
  the authored seed; Cloud Basin 3 follows the durations the board refused as
  time (120 : 75 → 3.2 → 3 — the away-cost re-expressed as the stake); the
  halt's 0 is deliberate floor-pricing so no reachable state deadlocks. David
  plays these before they are canon; survivors flow back to the pack per its
  standing rule.
- **Toll 1** — `routeTolls.chartered.flatFee`, verbatim, already civic-scale.
  Core Line's toll is rate-only (0.01, flatFee 0) and rounds to zero at this
  scale (0.01 × 14 = 0.14 → 0); stated rather than silently dropped.
- **Roster cap 4 — new-play.** The engine caps crewBonus at 0.3 (≈8 Wardens);
  4 keeps the muster a one-control line and the odds ceiling at 82.4%, inside
  the engine's clamp with room. Flagged.
- **What the arithmetic produces**, said plainly: expected marks per send —
  halt 6.8 free (8.2 at full roster); Mosswake 6.96 bare, 8.98 at full
  roster; Cloud Basin 5.18 bare, 7.77 at full roster. The spine out-earns
  the summit even fully crewed — that is the JSON's own shape at civic scale
  (the PWA pays its risk ladder in goods-mix and unlocks, not marks
  expectation), and the summit is run because it is the stop, not because it
  is the best business. A Warden's 3 marks buy +3.6 points on every later
  send (+0.50 expected marks per spine send) — the roster pays back across a
  sitting and, more to the point, buys down the chance of eating the stake.
- **Failure's reachability is the suite's, not the script's.** At typical
  paths the sitting shows at least one turned-back run with high probability,
  but honest dice guarantee nothing; the sim takes an injectable roll so the
  failure sentences are test-reachable. No outcome is ever scripted.
- **Opening state**: marks 0, roster 0, train home. Only the halt is lit —
  the ramp is the ladder. Every state in this beat's arithmetic is reached
  from that opening by play (the fixture question, answered).

## Canon check

Per `docs/mechanisms-recommitted.md` §6.1: every mechanism turned ON or
REFUSED, and the rule or source line it rests on. Rows mirror **On this
sitting**, in order.

| Row | ON / REFUSED | Rests on |
| --- | --- | --- |
| The dispatch loop | ON | David 2026-08-26 direction, verbatim ("select the mission … confirm the number and type of troops … off they go, to either success or failure"); R10 — "A load can be profit, goods moved for marks" |
| Honest dice, stated odds | ON | RULED — David 2026-08-26, quoted in full above; Economy — "The economy is readable without a spreadsheet … no obfuscated conversion"; the PWA's own played display (`successChance` as a percent, `src/main.js`) |
| The three dice routes | ON | `routes[*]` id+field throughout; the reach route's failure agent named by its own tags ("weather") — Economy: "The regulator is the cold" |
| Rustfall as the contested card | ON as card / REFUSED as send | The ruling's EXCEPT clause — contested territory "is not a dice roll purely"; Economy — "Raiding and loss are a soft sink … drama and texture rather than as the economy's regulator" |
| The defense instance | REFUSED | The ruling names it as its own game; one system per sitting (§5.6's discipline); CFD-179 lineage holds the seat |
| Durable Wardens, crew always home | ON | `resolveDispatch` — `addCrew` on both branches (the engine's law); The Teeth's gradient kept off the passive tier: nothing here is "catastrophic", the crew is never the stake |
| The manifest as a real object | ON as display | David 2026-08-26 — assets on the send become assets in the instance ("two marksmen, two guns"); inheritance refused this sitting per the same ruling's tier split |
| Rangers / Gunners / Sappers | REFUSED | `missions[*].preferred` — their preferred work (scout, fire, repair) is off this board; a hire with no job is dead UI (the house's own dead-button conviction) |
| Provisions as the stake | ON | R6 — "A run that fails costs the haul committed to it and never the home"; R7's shape — "a cost of pushing and weathering rather than the standing fuel bill"; R2 not violated — no standing bill, no decay, cost only at the player's own click |
| The Chartered toll | ON | R1 — marks' sinks are civic and labeled: "the route toll"; `routeTolls.chartered.flatFee` verbatim |
| SEND commits / MEET resolves; no clock | ON | R4 — "No decay clocks … no alerts"; R8 — a quiet stone is never a session meter; the convicted timer class stays convicted; the world moves at the meet, when the player looks |
| The away run never sours | ON | R4 — "Absence is protected without exception"; the in-progress is held, not eroded — the stake is only ever spent by the roll, never by the calendar |
| Failure pays zero, home untouched | ON | CFD-145 (decided) — "failed runs pay zero route reward; recovered stakes and insurance are not payouts"; R6 — fail-forward, "never the home or the permanent record" |
| The ×0.25 consolation leg | REFUSED | CFD-145 overrules it; PLAN.md §4 records it as the un-implemented remnant |
| Insurance | REFUSED | CFD-145 — recovery is not a payout; Core Loop — stakes "defaulting gentle and turned up only by a player who reaches for it": the dial arrives as a choice, later, not as a default layer now |
| Postures | REFUSED | `DISPATCH_POSTURES` — balanced carries success 0; a locked dial with no term is honestly absent, not silently zero |
| Route events | REFUSED | `ROUTE_EVENTS` (`src/content.js`) — fifteen entries carrying successBias −0.10..+0.08; an unasked-for bias would make the card's stated percent a second instrument, against the ruling's "fair transparent" and Economy's legibility rule. Named here because it is the sixth zeroed term in the formula and the only one that had no row |
| Heroes | REFUSED | The direction names them; the Hero Lodge (`buildings[hero-lodge]`) is off this board; its sitting owns them |
| Missions beyond convoy | REFUSED | `missions[convoy].rewardMultiplier` = 1 — the one mission leaving `route.rewards` untouched; each other mission is named to the instrument it waits for |
| Safety accrual | REFUSED | `routeRisk = baseRisk − routeState.safety` — safety is patrol's earned state; unearned, it is 0, stated |
| Train damage | REFUSED | `resolveDispatch`'s damage leg and `repairSink` (`economyConfig.sinkAccounts`) wait for their own sitting; one system per sitting |
| Goods as nouns | REFUSED | Standing refusal, carried from the scale beat; marks stand in, flagged; conversion by `economyConfig.resourceValues` — the pack's own table, not an invented rate |
| Signal tower / discovery | REFUSED | `routes[cloud-basin-span].discoveredAtSignalLevel` 1 — opened without the tower this sitting, a staging deviation flagged, not hidden; the tower's sitting owns discovery |
| Contract mechanics | REFUSED | One loop per board; `contracts[first-run]` lends the spine its voice ("Bring the first herb shipment home from Mosswake") and none of its mechanics |
| Scripted outcomes | REFUSED | "honest dice … fair transparent" — the ruling's words; Economy's legibility rule — a rigged roll is the obfuscated conversion by other means |
| Marks as refund | REFUSED | CFD-145 — recovered stakes are not payouts |
| Storm at the town | REFUSED | §5.2 SIGNED — the reckoning is the scale lineage's next sitting; this board's weather lives inside route odds and touches no holding |
| HUD one line | ON | The house discipline, carried from the heat and scale boards |
| End-sentences | ON | The process rule from the broken sit: every terminal state says what happened, in the board's words; the terminal reads the record |

## Author's argued alternatives

The house records rejected roads. Three were close.

**1. The crew as the stake — mustered per send, consumed by failure.** The
first draft of this beat. Rejected on the engine's own text: `resolveDispatch`
returns the crew on both branches — in the tuned instrument the crew is a
durable asset and the *haul* is what dies, which is also R6's exact noun ("the
haul committed to it"). Per-send crews also break the tuning's economics: a
Warden's +3.6 points only earns its cost because it repeats. And it answers
the dignity question by dissolving it — no crew is ever lost on the dice
tier, so the failure sentence never has to bury anyone. Crew jeopardy, if it
ever exists, belongs to the contested tier, where the player's own tactics
answer for it.

**2. Pays taken verbatim from `rewards.marks` (6 / 8 / 12), goods legs
dropped.** The cleanest possible citation and rejected on arithmetic: the
tuning lives in the goods. With the goods legs dropped, the free halt run
(marks 6) out-earns a staked Mosswake send in expectation, the ladder
inverts, and the loop the board exists to sit — stake against pay — never
fires. The conversion through `economyConfig.resourceValues` keeps every step
inside the pack's own tables and preserves the ladder the two months of
tuning actually built. The one number the pack does not supply is the civic
scale factor, and it is flagged as the authored anchor.

**3. Bookmaker's odds — "1 in 8" on the cards instead of percentages.** The
civic register argues for it; the ruling's own words end it: "stated
statistics (X% chance of success given current configuration)" — and the PWA
already shipped percent display, so the fraction would be a second instrument
where one exists. Rejected. A cousin rejection with the same shape: inflating
Cloud Basin's pay so the summit out-earns the spine. The JSON's ladder pays
risk in goods-mix and unlocks, not marks expectation; dressing the summit as
the best business would be a deviation taken for feel and disguised as
tuning. The summit is the stop, and that is enough reason to run it.

---

# Amendment 1 — the opening float, the charter condition, and the muster ladder

**RULED — David, 2026-08-26.** All five open questions answered; his answers are
recorded verbatim in "The rulings" below and are folded into every section.
Design measured by a seven-agent pass (three lenses, three refuters, one
synthesis) at `ed7f49d`; sixteen published claims were discarded on
re-measurement, five of them the PM's own.

**Origin.** David's two sittings of the shipped board, 2026-08-26, and his
direction after the second: *"I think that we hsould have resources above 0
marks 0 wardens and then the task maybe has a slider which can slide up to the
max number of wardens you can afford to recruit and then clicking on it is
confirming that you recruit that many."*

## The measured cause this amendment answers

Sitting 1 reconstructs exactly on the shipped sim — halt / Mosswake / Cloud,
all won, ending at 36 marks — and at David's second and third decisions the
desk held **10** and **22** marks with `canMuster()` **true**: a full-contrast,
maximally affordable control, walked past twice. The
`#muster:disabled { opacity: .3 }` rule covers only the first of three misses.
What is common to all three is size: `#muster` is `min-height: 34px` against
`button.card` 52px and `button.pad` 76px — the only control on the board under
the 44px touch floor.

**The affordability change is David's ask; the size change is the measured fix,
and they are not the same change.** Both ship here, and the amendment says so
rather than letting the float take credit for the control.

## Does — what changes

- **The desk opens with 3 marks.** Lit at the opening: `dawnspur-halt` and
  `mosswake-loop`. Cloud Basin is dark — its stake is 4. `canMuster()` is true,
  reach 1. The cards quote **68 / 64 / 51**, the beat's published bare row,
  unchanged.
- **The Chartered Line carries a charter condition.** Cloud Basin takes a send
  only once the desk has banked a cargo. It stays on the map, keeps its card,
  keeps its percent, and names its condition in the board's words. This is the
  shipped board's own law promoted from a price to a rule: at 0 and at 3 marks
  it never binds and the arithmetic is bit-identical to today's.
- **MUSTER becomes a ladder of four berths and takes a count.** Berth *k* means
  *roster = k*. Filled berths are the record; reachable berths are what the
  marks can reach; the rest are dark. One press-and-release recruits up to the
  berth chosen, at 3 marks each, with the total stated on the control's face
  before the commit. Price per Warden, cap, permanence and the crew's law are
  unchanged.
- **The route cards re-quote live while a berth is armed** (ruled). See Sees for
  the constraint that keeps this from becoming a second instrument.
- **The roster still never leaves. Nothing refunds. Nothing un-recruits.** The
  ladder's left edge is the past.

## Sees

The ladder is a 68px block on the desk's own furniture ground (`--strip` with a
`--card-edge` ring, deliberately not the card ground) between the marks line and
the routes, because it is what converts one into the other. Row 1 carries
`MUSTER` and the roster on the left and the price on the right, **always at full
contrast, whether or not it can be paid** — a control that fades when it cannot
be used reads as chrome; a control that shows you the price you cannot yet pay
reads as an instruction. Row 2 carries four 44px berths: held berths in the
board's held-green, reachable berths in the pad's resting ground, the rest in
the unlit card's treatment. While a finger is down, the berths under it take the
pad's bright primary fill and the price figure is **replaced** by the total —
never joined by it. That fill exists only while the finger is down.

**The armed re-quote, and the rule that makes it safe.** While a berth is armed
the route cards show the chance for the armed roster, so David's signed sentence
— "every card's quote moves while you watch" — is literally true during the
drag. Two constraints, both testable, because a conditional percent sits one
step from the Kill line about stated-versus-rolled:

1. **The armed percent dies with the gesture that showed it.** Release
   elsewhere, `pointercancel`, or any path that does not commit returns every
   card to the committed roster's percent in the same frame. No armed percent
   survives the finger lifting.
2. **It is typed differently from a committed percent** — the board must make it
   visibly provisional, so a player can never read a conditional number as the
   number the die will be thrown against. At rest and while away, every card
   shows only `chanceFor(baseRisk, roster)`.

While the roster rides and at the stop, the whole block dims to the unlit
treatment with the held berths still green underneath, so the away state reads
*these four rode*. The HUD keeps its one line: marks.

## The numbers, and where each one comes from

- **Opening float 3 — new-play, flagged, not dressed as a citation**, in the
  same class as provisions 0/2/3 and the roster cap 4. Argued: 3 is the largest
  opening at which the first frame is a fork rather than a list — a Warden (3)
  *or* a Mosswake send (2), never both. At 6 the player affords 5 of 6 and buys
  both.
- **The float is a named constant and the suite drives every level.** David:
  "we can test it at each different level if wanted so we can see what it is
  like to play when at zero or later when there is a baseline amount of assets
  floating around, but if we pick one 3 works." `createBoard({ marks: n })`
  takes an opening balance for the suite, 3 is the shipped default, and the
  P(stop) table below is asserted at 0, 3, 6 and 12 so a future change of mind
  costs one number and no re-analysis. **No player-facing surface sets it.**
- **Measured effect of the float, exact DP over this board's own transition
  rules, optimal play, musters free:** P(stop within *k* runs) moves from
  0.00 / 39.58 / 64.34 / 77.83 / 86.17 (shipped) to
  **0.00 / 44.25 / 69.41 / 82.21 / 89.25**. The whole cost is +4.67 points on
  the two-run stop.
- **The charter condition costs nothing here and everything where it is
  needed.** With it in force the rows above are unchanged at 0 and 3 marks; a
  one-run stop is 0.00% at 3, 6, 12, 16 and 24 marks, by construction. Without
  it, an opening of 4 gives a **51.0%** one-click sitting, and an opening of 16
  under a full ladder gives **65.4%** — muster x4 costs 12 and leaves exactly
  the Chartered stake.
- **The float is minted, and 3 / 0 is not reachable by play.** Every delta on
  this board but the muster is even (pays 10 / 14 / 18, stakes 0 / 2 / 4), so
  marks and roster share parity from a 0/0 opening. **This amendment therefore
  retires the signed line "Every state in this beat's arithmetic is reached from
  that opening by play."** No sentence, lit-set or percent becomes unreachable —
  thresholds do not read parity — but the claim as written is no longer true and
  is not quietly kept.
- **The ladder's range comes from the float, never from the price.**
  3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 do not move.
- **`musterReach = min(rosterCap - roster, floor(marks / musterPrice))`, and 0
  while away or stopped.** It lives on the sim; the markup never computes
  affordability. The pinned API key list moves **21 -> 22**.
- **The PM's two withdrawn figures, recorded because they were published.**
  "The stop is reachable in two runs with no muster, 34.7%" was the best
  *no-muster* line, not the best line: halt win -> muster x2 -> Cloud at 58%
  gives **39.58%**, so mustering shortens the sitting rather than lengthening
  it. And "3 marks is the only value that lights muster while keeping Cloud
  Basin unaffordable" is true arithmetic and a bad safety argument, because 3
  also lights Mosswake — the signed opening sentence "Only the halt is lit" is
  already false at 2 marks. The charter condition, not the float's size, is what
  makes the opening safe.

## The rulings

David, 2026-08-26, verbatim, in the order asked:

1. *"we can test it at each different level if wanted so we can see what it is
   like to play when at zxero or later when there is a baseline amount of assets
   floating around, but if we pick one 3 works"* — **float 3**, with the suite
   driving every level.
2. *"I do not care if we read the town I kind of think that rule is stupid"* —
   see the split below.
3. *"in"* — **the charter condition ships.**
4. *"while on the berth I think makes the most sense when thinking about a drag
   with your thumb"* — **live re-quote while armed**, under the two constraints
   in Sees.
5. *"no"* — **no opening Warden.**

### Ruling 2, split — and the half the PM is keeping until told otherwise

The question asked was about the float's *fiction*: whether the board may say
where 3 marks came from. David's answer removes that restriction, and the signed
sentence it came from is retired for copy:

> ~~"The town behind the desk — greenhouse, bank, hearth — stands as scenery
> from the sittings that built it. This board neither reads nor writes any of
> it."~~ — retired as a **copy** rule, David 2026-08-26.

**The board may now name the town in its words.** The float can be the bank's
advance, the hearth's float, the desk's own till — that is a sentence, and
sentences are cheap.

**The PM is NOT retiring the other half, and flags it rather than assuming.**
That sentence was doing two jobs, and only one of them was about fiction. The
other is cross-board **state**: this board reading or writing the heat or scale
boards' persisted state. That is what the Kill line "this board reads or writes
heat or scale state" protects, and what stops a live board that has passed a sit
from being disturbed by a sibling — the standing lineage lock. Until David says
otherwise in those words, **the state isolation stands and only the fiction is
freed.** If he meant both, it is one sentence to say so and this paragraph is
what he is overruling.

## Canon check

Per `docs/mechanisms-recommitted.md` section 6.1: every mechanism this amendment
turns ON or REFUSES, and the rule or source line it rests on.

| Row | ON / REFUSED | Rests on |
| --- | --- | --- |
| The opening float, 3 marks | ON | Tutorial Script, Beat 4 — "only the three resources the player has touched are active", Marks among the three with its own tooltip ("Coin. Pays tolls, fees, and wages"), two beats before the first dispatch. **Weakness named:** "touched" does not prove a nonzero balance, so the float is **new-play, flagged**. R1 untouched — a float is an initial condition, not a faucet, and no sink is shared with heat. |
| Naming the town as the float's source | **ON** | David 2026-08-26, ruling 2: "I do not care if we read the town I kind of think that rule is stupid." The beat's scenery sentence is retired for copy. |
| Reading or writing another board's persisted state | **REFUSED, unchanged** | This beat's Kill list, verbatim: "this board reads or writes heat or scale state"; and the standing lineage lock — never overwrite a passed or killed board. Ruling 2 frees the fiction, not the state. Flagged for David in "Ruling 2, split". |
| Opening Wardens (roster >= 1) | **REFUSED** | David 2026-08-26, ruling 5: "no". Corroborated: Tutorial Script Beat 8 defers its one warden by name — "that's a conversation for when your line's a little longer", designer note "seeds hero recruitment as post-tutorial content". Measured: `s.roster += 1` is the only write to the roster, so a granted Warden deletes this beat's published bare odds row (68.0 / 64.0 / 51.0) from play permanently, and turns 24 of 63 tests red. |
| The charter condition on the Chartered Line | ON | David 2026-08-26, ruling 3: "in". R1 — marks' sinks are civic and labeled, and the list names "the charter filing fee" verbatim; the Chartered Line is the one line here already carrying the civic toll. A charter's own precondition is a **service record**, not a survey. And it is the shipped board's own law promoted: `test/dawnspur-dispatch.test.js`, "the stop is never one run: reaching Cloud Basin home paid always takes a banked cargo first." |
| Signal tower / route discovery | REFUSED, unchanged | `routes[cloud-basin-span].discoveredAtSignalLevel` 1 — the near map stays pre-surveyed, the deviation stays flagged. The route is on the map from frame one, quotes its percent throughout, and names its condition; nothing here is discovered. |
| Quantity confirmed before the commit | ON | David 2026-08-26 direction, verbatim: "select the mission, **confirm the number and type of troops**, and off they go" — the shipped +1 tap has no quantity-confirm step at all. And this amendment's origin: "clicking on it is confirming that you recruit that many." **Not cited to R10**: R10 is "Every load is one of three claims" — profit, tending, buildout — and governs what a train carries, not a spending menu. |
| The ladder as a bar — the convicted gauge? | ON, argued | The scale board's ban (`docs/cfd-183-beat.md`) is scoped by its own citation — Economy: the planting "tells a keeper the state of their ground **without a gauge**", a sentence about how the *world* reports hidden state. The ladder reports the player's own pending intent and the roster, which this beat's Sees already puts on the control's face ("price 3 on its face, roster on its face"). No world state is metered, and no hand but the player's moves it. *Claimed player-slider precedent in locked docs is withdrawn — the two citations are a difficulty setting and a session preference, neither a board control.* |
| Live re-quote while a berth is armed | ON | David 2026-08-26, ruling 4: "while on the berth I think makes the most sense when thinking about a drag with your thumb." Held to this beat's Does — "Muster a Warden and every card's quote moves while you watch" — and fenced by the two Sees constraints, because a conditional percent sits one step from the Kill line "The stated percent and the sim's rolled threshold disagree anywhere." |
| Refund / un-recruit / sell-back | REFUSED | This beat's Kill list, verbatim: "A stake, toll, or muster refunds — any branch, any direction." The ladder is absolute; filled berths are the record, not positions on a track; no leftward commit exists and `roster -=` stays absent from the file. |
| The 34px control | REFUSED | Presentation is delegated by this beat ("map or cards is the implementer's business under this spec"), and the measured cause of the sit-1 miss lives there: 34px against a 52px card and a 76px pad, the only control under the 44px touch floor. |
| Re-pricing MUSTER or the Cloud Basin stake to widen the ladder | REFUSED | This beat's Kill list, verbatim: "3 / 2 / 3+1 / 10 / 14 / 18 / 0.036 move without this beat moving." An amendment moves the *opening*, never the prices. |
| The HUD | ON, unchanged | One line, marks. The ladder's price, roster and armed total live on the ladder's own face, which this beat's Sees already sanctions. |
| Wall time, motion, animation | REFUSED, unchanged | R4 and R8; the board carries no `transition`, `animation`, `@keyframes`, `setTimeout` or `setInterval`, and the ladder adds none. |
| Everything else in the signed **On this sitting** table | unchanged | No row above touches insurance, postures, heroes, events, missions, goods nouns, Rustfall, the instance, the storm, or another board's state. |

## Kill — the new behaviour

Every line testable, red-first.

- `canSend("cloud-basin-span")` returns true while `record.cargoesBanked === 0`,
  in any state, at any capital.
- The sitting stops in one run: `stopped === true` with `record.runsOut === 1`.
- The opening mints anything but marks 3 / roster 0 / train home, or the
  opening's lit set is anything but `["dawnspur-halt", "mosswake-loop"]`.
- The opening's cards quote anything but 68 / 64 / 51.
- The opening balance is settable from anything a player can reach — a query
  string, a control, storage. The suite may set it; the board may not.
- `commitMuster(n)` commits a partial count, or commits at all when
  `n > musterReach`; marks go negative; the roster passes 4 or moves anywhere
  but at a muster.
- `musterReach` is nonzero while a run is out or after the stop; the ladder is
  interactive in either state.
- A `roster -=` or `roster--` appears anywhere in the sim; a sell-back, disband,
  refund or rebate path appears.
- Any berth beyond the roster renders as filled, or a filled berth renders as
  un-filled at any point in the gesture.
- A muster commits without its total having been stated on the control's face
  first.
- Any figure on the ladder is typed into the markup rather than read from
  `board.musterPrice`, `board.roster`, `board.rosterCap` or `board.musterReach`.
- An armed percent survives the gesture that showed it — after any
  non-committing release or `pointercancel`, any card still quotes a roster that
  was never committed.
- An armed percent is typed the same as a committed one, so a provisional number
  can be read as the number the die is thrown against.
- At rest or while away, any card's stated percent is anything but
  `chanceFor(baseRisk, roster)`.
- A reachable home state has no lit send.
- The HUD grows past the one marks line.
- This board reads or writes heat or scale state. (Naming the town in copy is
  now permitted; touching another board's state is not.)
- The ladder animates, eases, or changes on any schedule but a player's own
  input.
- `3 / 2 / 3+1 / 10 / 14 / 18 / 0.036` move.
- Live shas are overwritten; any Dawnspur board or `/convoy-stop/` is touched.

## What goes stale in the signed body above

- **"Opening state: marks 0, roster 0, train home. Only the halt is lit — the
  ramp is the ladder."** The float makes it marks 3, and both Core Line routes
  lit. The ramp survives as the charter condition, which is a rule rather than a
  price.
- **"Every state in this beat's arithmetic is reached from that opening by
  play."** Retired — see the parity note above.
- **The scenery sentence's copy half** — retired by ruling 2; the state half
  stands.

---

# Amendment 2 — the ladder becomes a slider, and moves in with the grey bars

**RULED — David, 2026-08-26**, on sitting 3 of the amended board (`2a3e9dd`,
sat via the immutable deployment while CFD-199 blocks promotion):

> *"an actual slider would be better than 4 squares, but this worked ok. I also
> think that the slider action should have been part o the grey bars not a
> green one at the top"*

Presentation only. **Not one mechanic moves.** Price 3, cap 4, permanence,
all-or-nothing commit, `musterReach`, the armed re-quote and its two fences,
commit-on-release and slide-off-to-cancel all survive Amendment 1 unchanged.

## The PM's miss, recorded because it was avoidable

This is the third time the control's placement has been decided, and the first
two agreed with the third. The rendered ballot of 2026-08-26 offered four
treatments and recommended **B — card grammar, pinned above the route list,
sharing the routes' visual family** — on the argument that the turn's real
question is *buy odds or send now*, so the control belongs among the things it
competes with. Amendment 1 then specified the opposite in terms: *"a 68px block
on the desk's own furniture ground (`--strip` with a `--card-edge` ring,
**deliberately not the card ground**) between the marks line and the routes."*

**The PM approved that without noticing it overrode the ballot's own
recommendation, and never put placement to David as one of the five questions**
— even after naming placement as the whole finding. David then arrived at B
unprompted, from play. The design was right in the ballot and was lost in the
amendment; that is a review failure, not a design failure.

## Does — what changes

- **The control moves into the card stack and takes the cards' ground.**
  `--card` with a `--card-edge` inset ring, the same grammar as a route bar,
  pinned directly above the routes so it never scrolls away. It stops being a
  separate green block above the scenery. The `--strip` furniture ground and the
  header slot are retired.
- **The four berths become one slider.** A single track with a thumb, snapping
  to integers 0..`rosterCap`, because the roster is an integer and a position
  between two Wardens means nothing. Drag the thumb to the count you want; the
  total states itself on the bar's face; release commits. Slide back to the
  roster's own position, or off the bar, to commit nothing.
- **The track's filled length is the roster; the reachable length is what the
  marks can reach; the rest is dark.** The same three readings Amendment 1's
  berths carried, expressed as lengths rather than as cells.
- **The dead space below the cards closes.** `#cards` takes the slack while its
  children do not grow, so on a tall viewport the stack sits against a large
  void — visible in every one of David's three sittings. The card list stops
  claiming space it does not fill; the sentence panels take it.

## The one judgment the PM is making, flagged for reversal

**Green survives as the filled length inside the grey bar.** David's objection
was to "a green one at the top" — a separate green block in the header slot —
and green is already this board's *held* colour (the away card's ring, the end
panel's ring). So the bar's ground becomes grey and the filled portion stays
green, which is the board's existing vocabulary for *this is held*.

**If he meant green should go entirely, it is one token and this paragraph is
what he is overruling.**

## Sees

One bar in the stack, above the routes, on the card ground. Its face carries
`MUSTER`, the roster, and the price at rest — at full contrast whether or not
it can be paid, unchanged from Amendment 1, because the price is the
instruction. While a finger is down the price figure is **replaced** by the
total, never joined by it, and the route cards below re-quote provisionally in
their own typing. The thumb is at least 44px on its shortest axis.

The bar reads as a peer of the routes because it is one: the turn's question is
*buy odds, or send now*, and both halves of it now sit in one stack, in one
grammar, with the price on the same line as the payouts it competes against.

## Canon check

Only rows this amendment moves. Every other row of Amendment 1's table stands.

| Row | ON / REFUSED | Rests on |
| --- | --- | --- |
| The control on the card ground, in the stack | ON | David 2026-08-26, verbatim: "the slider action should have been part o the grey bars not a green one at the top". Corroborated by the PM's own ballot recommendation of the same placement, and by the signed beat delegating presentation: "map or cards is the implementer's business under this spec". |
| A continuous track in place of four cells | ON | David 2026-08-26, verbatim: "an actual slider would be better than 4 squares". Snapping to integers rests on the roster being an integer — Amendment 1's Kill line "the roster never leaves 0..4" and "commits a partial count" both stand. |
| The slider as the convicted gauge | ON, argued, unchanged from Amendment 1 | The scale board's ban is scoped by its own citation — Economy: the planting "tells a keeper the state of their ground **without a gauge**", a sentence about how the *world* reports hidden state. A track the player drags reports the player's own pending intent, and no hand but theirs moves it. A slider is not less defensible than the berths were; it is the same argument with a different shape. |
| Green as the filled length | ON, PM judgment, flagged | Green is the board's existing *held* colour. David objected to a green block in the header slot, not demonstrably to green. Reversible in one token. |
| The `--strip` furniture ground and the header slot | REFUSED | Retired by this ruling. |
| Every mechanic | unchanged | Amendment 1 stands in full. This amendment moves no number and no rule. |

## Kill — what changes, and what is re-expressed

Amendment 1's Kill list stands, with the berth lines re-expressed for a track.
These replace them; everything else in that list is unchanged and still binds.

- The control renders anywhere but in the card stack, or on any ground but the
  cards' — a header slot, the strip's furniture ground, or its own block above
  the scenery.
- The filled length shows anything but the committed roster, at any point in
  the gesture, including mid-drag.
- The thumb comes to rest between two integers, or a commit lands a non-integer
  count.
- The reachable length shows anything but `musterReach` beyond the roster.
- The thumb's shortest axis is under 44px.
- A drag back to the roster's own position, or off the bar, commits anything.
- The total is not stated on the bar's face before the commit, or joins the
  price rather than replacing it.
- Any figure on the bar is typed into the markup rather than read from
  `board.musterPrice`, `board.roster`, `board.rosterCap` or
  `board.musterReach`.
- The card list holds vertical space it does not fill, at any viewport from
  280x480 to 412x732, in any state.
- The slider animates, eases, or moves on any schedule but a player's own
  input.

## What goes stale in Amendment 1

- **"The ladder is a 68px block on the desk's own furniture ground (`--strip`
  with a `--card-edge` ring, deliberately not the card ground) between the marks
  line and the routes."** Retired — the card ground, in the stack, is the
  ruling.
- **"Row 2 carries four 44px berths."** Retired — one track, integer-snapped.
- Amendment 1's berth-rendering Kill line is replaced by the filled-length line
  above.

---

# The sit — PASSED, David, 2026-08-26

**"I think this worked well overall."** Fourth sitting, on the durable host at
`663d4fa`.

The record it ended on, verbatim from the board:

> The first Chartered cargo is home. **Ten runs out, seven cargoes banked,
> three turned back, 4 marks staked and lost on the way.** The record keeps
> what came home; the line past the basin is the next sitting's.

Ten runs, three of them lost, 67 marks, the roster full. That sentence is the
one this board was sent back for: the register keyed on `runsTurnedBack`
reconciles the gap between ten out and seven banked **in words**, and the paid
register names the loss without apology. The first cut would have called this
sitting *clean*.

What the sitting demonstrates, in the order it was found:

- **The muster is noticed.** Three sittings failed to find a 34px control in
  the header slot; the fourth used it to a full roster. The fix was the
  container, not the affordability — Amendment 2's placement, which the
  original ballot had recommended and Amendment 1 overrode.
- **The charter condition held.** Cloud Basin was earned, not bought — the
  one-run sitting stayed impossible.
- **Failure is legible and survivable.** Three turned back, 4 marks gone, the
  desk still standing, the sitting still worth finishing.

The lineage: `/dawnspur-dispatch/` is now a **passed** board. It does not get
overwritten. The next sitting on this loop ships at a sibling path.

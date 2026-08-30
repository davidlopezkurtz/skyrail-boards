# CFD-205 — Dawnspur Halt (Work notices)

The town the loops leave from. Sibling path `/dawnspur-halt/`. Not a recut of
`/dawnspur-site/`. Card: CFD-205.

**SIGNED — David, 2026-08-30, Superheavy named it.** One NEW system: Work
notices. Works stays. Foundry is work one. GameDesigner is off this job.
Draft PR. Do not merge until SuperheavyReview PASS. David sits first.
**Ask: What happened.**

---

## Seat

One NEW system: **Work notices.** Each building is a building. Tapping a
building posts a station work notice: what it can do now / what is in process /
what is possible but blocked, and the block is a world reason already visible
on the diorama. Writing is the board. Not a lecture. Not a help overlay. Not a
tutorial mode.

Sibling path: `/dawnspur-halt/` (both `sit/dawnspur-halt/` and
`public/dawnspur-halt/`, byte-identical). Do not recut `/dawnspur-site/`
(failed sit; live `c59dc101`, index `070a4619`, sim `e9f81b74`). Do not
reopen the city first-cut as a loop. Do not touch any other board directory
except the index row that lists boards.

Draft. Do not merge. Do not deploy. Do not `workflow_dispatch`. David sits
first.

Pins are the live boards, never `main`. Re-measured at authoring against
`c59dc101` (site live merge). Do not recut it.

| board | sim | index |
| --- | --- | --- |
| `/dawnspur-site/` | `e9f81b74` | `070a4619` |
| `/dawnspur-line/` | `18b1324f` | `b6f21db0` |
| `/dawnspur-dispatch/` | `576ce2b6` | `31aead60` |
| `/dawnspur-scale/` | `953368a1` | `5d2f452f` |
| `/dawnspur-heat/` | `292d6645` | — |
| `/dawnspur/` | `395c18f2` | — |
| `/convoy-stop/` | `5ad814e6` | — |
| `/dawnspur-storm/` | `f4f17008` | `7711f979` |

Storm live merge is `555ba9a9`. Do not recut it.

---

## The signed beat — Work notices

Sit evidence (the miss): Recut 2 sat as grey squares. Closed. No further
grey-square recut. `/dawnspur-site/` stays. This sitting is four clickable
buildings and the station board they post.

One NEW system: Work notices. Peer clickables without a notice is the miss
this sitting kills. SITE / LAND / CAST as a strip away from the buildings
leaves. CAST is a line on the Foundry notice, not a second grey brick.

- **The lamp** (Tutorial Beat 0–1). Can do: light it, no cost. After: awake.
  Written: the lamp, dark then amber.
- **The greenhouse terrace.** Food already on the glass (no CARRY). Can do:
  nothing this sitting. In process: food on the terrace. Blocked: carry /
  tend / UP — a held island is not a fuel bill.
- **The Foundry.** Work one. Heat not Air. Opening: can do SITE (marks 3).
  After SITE: in process scaffold, empty bill; blocked CAST because the haul
  is still on the consist. After LAND: can do CAST (bill + terrace food, one
  commit, one Heat step, rim refuses). After CAST: hearth live.
- **The inbound consist.** Arrival not SEND. Opening: in process inbound;
  blocked LAND — no address. After SITE: can do come home. After LAND: home.
  Blocked SEND: this board does not send.

Anchor locks are scenery. Blocked: waiting on new ground. Not ghost pads.

Works stays. Foundry is work one. No Halt SEND.

**Wanted after a sit:** lamp they lit, glass that held the food, Foundry they
opened, train that came home, ground that took heat.

**Fail:** grey brick; glow hunt; lecture; named pads; paid in marks (except
SITE costing marks 3 as named); sent a train; help icon; tutorial mode.

---

## Does

**Light:** the lamp, no cost. Dark then amber. Awake.

**SITE:** marks open the work only. Scaffold up. Bill posts empty. SITE costs
3 (inherited float). HUD one marks line.

**LAND:** arrival of the already-inbound run (not SEND, not a sixth loop).
Cargo lands because the work now has an address. The bill fills. LAND is
blocked until SITE: a haul with no address does not fill the bill. After
SITE the consist notice can do come home.

**CAST:** a line on the Foundry notice, not a second brick. Lit only when the
bill is full **and** the terrace still holds its food. Fires: Foundry live,
terrace food into the town, one Heat step on already-reached ground. The rim
does not move.

Heat-as-terrain is the look. No Halt send. No CARRY. Food already on the
glass.

The paying run is not a send verb on this board. If the board must show a
returning run, it is **arrival**, not SEND.

**Look:** station-town diorama, not the beige PWA HUD. The HUD is museum.
Bright molten, never grime. Buildings must read as buildings (lamp, glass
terrace, foundry, consist), not grey squares.

**Start state is new-play:** enough marks to SITE, food already on the
terrace, a paying run that can land hauls without this board owning SEND,
the lamp dark.

---

## Sees

One HUD line: marks. Museum. The bill lives on the Foundry after SITE. Food
lives on the glass, then in the town. The four buildings stay buildings.
Tapping one posts the station board. Anchor locks are silhouettes. The rim
is the cold edge and is not a pad. Heat-as-terrain is the reached ground's
colour. The scaffold is SITE's tell.

No job row. No named pads. No lecture boxes (`#say` / `#end`). No help
overlay, no `?`, no tutorial mode, no plaque, no citizen, no interior, no
zoning, no cutscene. No second HUD.

---

## Ends

The board does not lecture. After a sit the five tells stand: the lamp they
lit, the glass that held the food, the Foundry they opened, the train that
came home, the ground that took heat.

Ask: What happened.

---

## On this sitting

| System | This sitting | From |
| --- | --- | --- |
| **Work notices** | **ON** — the single new system | new; SIGNED |
| **Works — SITE, address, bill** | **ON** — Foundry is work one | inherited from the site sitting's sim, not its UI |
| **Foundry as work one** | **ON** | new |
| **LAND as arrival, not SEND** | **ON** | the loop as sat |
| **CAST = OPEN: bill full + terrace food → Foundry, food in, Heat step** | **ON** | inherited Works |
| **The lamp, dark then amber** | **ON** | Tutorial Beat 0–1; new on this sibling |
| Marks, one HUD line | INHERITED | CFD-196 / every later board |
| Opening float of 3 | INHERITED as the SITE price | CFD-196 Amendment 1 |
| Terrace food already in | INHERITED as a fixture, not a CARRY | CFD-203's food noun; CARRY refused |
| Heat-as-terrain look on reached ground | **ON as look**, new-play | R9; not a write to the heat pin |
| One live place / scenery-as-divs | **REFUSED** | recut-2 fail; grey-square UI stays on `/dawnspur-site/` |
| Job row / named pads / lecture boxes | **REFUSED** | signed |
| Switchyard / desk / SEND / MUSTER / MEET | **REFUSED** | the loop owns them |
| Halt send | **REFUSED** — sixth loop | signed |
| CARRY / UP / TEND / weather / Ranger / trim | **REFUSED** | signed |
| Warehouse, Signal, Market/League, postcard hall | **REFUSED** as this work | signed |
| Units sink | **REFUSED** | loop leftover |
| Glass currency, parts, food-marks exchange | **REFUSED** | signed; R1 |
| PWA town, LoopBeat, help, tutorial mode, plaques | **REFUSED** | signed |
| Reading or writing another board's persisted state | **REFUSED** | lineage lock |
| Recut of `/dawnspur-site/` | **REFUSED** | failed sit; pin |

---

## Kill

Every line testable, red-first.

- Grey squares / grey brick.
- Peer clickables with no notice.
- Hopping glow.
- SITE / LAND / CAST as a strip of buttons away from the buildings.
- CAST as a second grey brick.
- `#say` / `#end`.
- Help overlay / `?` / tutorial mode / plaques.
- Second HUD.
- Named pads.
- Lecture.
- Bill payable in marks alone (killed hardest). SITE plus leftover marks
  cannot CAST. There is no marks-to-bill path.
- Ghost pads / second tappable ruin.
- Halt SEND on this board (sixth loop). No SEND control, no `commitSend`.
- Food CARRY on this board (food already on the glass).
- UP / TEND / weather / Ranger / trim.
- Fuel as a standing bill.
- Glass currency or a second HUD line.
- Foundry doing Air+Heat.
- Write to `/dawnspur-heat/` or any live pin.
- Heat step past the rim. Rim refuses SITE and does not move.
- Warehouse / Signal / Market / hall / second greenhouse as this work.
- Recut `/dawnspur-site/`.
- Recut storm.
- Overwrite any live board.
- Units sink.
- Beige PWA HUD.
- Auto LAND.

---

## The numbers, new-play, flagged

- **SITE 3.** The inherited float. Enough to SITE; nothing left.
- **Opening marks 3, food on the terrace, one inbound paying run, lamp dark.**
- **Bill need 1.** One inbound haul fills it.
- **Light costs nothing.**
- **CAST costs no marks.** It spends terrace food and writes the Foundry,
  the town food, and one Heat step on reached ground.
- **Rim position is a constant.** CAST does not write it.

---

## Sit

David sits first. **Ask: What happened.**

Wanted: they can point at the lamp they lit, the glass that held the food,
the Foundry they opened, the train that came home, the ground that took heat.

Fail: grey brick; glow hunt; lecture; named pads; paid in marks; sent a
train; help icon; tutorial mode.

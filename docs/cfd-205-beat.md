# CFD-205 — Dawnspur as a place (Works; Foundry is work one)

The town the loops leave from. Every sitting since the rebuild has been a
loop leaving Dawnspur. This sitting is the spine those loops attach to:
**Works**. Foundry is work one. Sibling path `/dawnspur-site/`. Card: CFD-205.

**SIGNED — David, 2026-08-30, word "Signed."** Recut 1 — Three places
(Superheavy). Draft PR. Do not merge until SuperheavyReview PASS. David sits
first. **Ask: What happened.** GameDesigner is off this job.

---

## Seat

One NEW system: **Works**. Foundry is work one. No Halt send on this board.

Sibling path: `/dawnspur-site/` (both `sit/dawnspur-site/` and
`public/dawnspur-site/`, byte-identical). Recut of the live first ship
(`450b3d94`, index `f3695633`, sim `e9999eed`). Do not reopen the city
first-cut. Do not touch `/dawnspur-storm/` or any other board directory
except the index row that lists boards (hash digits only if that file
lists them).

Draft. Do not merge. Do not deploy. Do not `workflow_dispatch`. David sits
first.

Pins are the live boards, never `main`. Re-measured at authoring against
`555ba9a9` (storm live merge). Do not recut it.

| board | sim | index |
| --- | --- | --- |
| `/dawnspur-line/` | `18b1324f` | `b6f21db0` |
| `/dawnspur-dispatch/` | `576ce2b6` | `31aead60` |
| `/dawnspur-scale/` | `953368a1` | `5d2f452f` |
| `/dawnspur-heat/` | `292d6645` | — |
| `/dawnspur/` | `395c18f2` | — |
| `/convoy-stop/` | `5ad814e6` | — |
| `/dawnspur-storm/` | `f4f17008` | `7711f979` |

---

## The signed recut — Three places

One NEW change: the SITE/LAND/CAST strip and the lecture boxes leave.
Three commits stay as three places.

- **SITE** is the Foundry ruin (then inert).
- **LAND** is the inbound consist (arrival, not SEND; dark until SITE).
- **CAST** is the posted frame, not the ruin a second time. Frame leaves
  the ruin's hitbox.

Auto-land still killed (marks would equal the haul).

**Wanted after a sit:** the player can point at the ruin they opened, the
train that came home, the bill they spent, the food that went in, the
ground that took heat.

**Fail:** named pads; a lecture; the same ruin twice; paid in marks; sent
a train.

Works stays. Foundry is work one.

---

## Does

**SITE:** marks open the work only. Scaffold up. Bill posts on the frame.
SITE costs 3 (inherited float). HUD one marks line. After SITE the ruin
is not a second job.

**LAND:** arrival of the already-inbound run (not SEND, not a sixth loop).
Cargo lands on the frame. Bill = hauls addressed to this site. LAND dark
until SITE.

**OPEN+CAST = one commit:** bill full + terrace food in then Foundry live,
food into the town, one Heat step on already-reached ground. Rim refuses
SITE and does not move. CAST is the posted frame — tapping the Foundry a
second time is the strip with one button.

Heat-as-terrain is the look. No Halt send. No CARRY. Food already on
terrace.

The paying run is not a send verb on this board. A live loop as sat (its
own sibling) is how hauls exist; this sitting receives the landing. If
the board must show a returning run, it is **arrival**, not SEND.

**Look:** station-town diorama, not the beige PWA HUD. The HUD is museum.
Heat-as-terrain is the ground's look on already-reached ground, new-play,
not a heat-map recut.

**Start state is new-play:** enough marks to SITE, food already on the
terrace, a paying run that can land hauls without this board owning SEND.

### The three places

1. **SITE — the Foundry ruin.** 3 marks, the inherited float. Opens the
   Foundry work on the one warm pad. Scaffold goes up. The bill posts on
   the frame, empty. Marks do this and only this. The rim refuses SITE.
   Horizon ruins are not pads. After SITE the ruin is inert.
2. **LAND — the inbound consist.** Arrival. The inbound run (already out;
   the loop as sat) ends in the diorama. Cargo lands on the frame because
   the work now has an address. The bill fills. Panes appear as the look
   of that haul, not as a stock. LAND is dark until SITE: a haul with no
   address does not fill the bill. The consist is tappable when live.
3. **CAST — the posted frame.** OPEN and CAST are one commit. Lit only
   when the bill is full **and** the terrace still holds its food. Fires:
   Foundry live, terrace food into the town, one Heat step on
   already-reached ground. The rim does not move. The sitting ends. The
   frame's hitbox is not the ruin's.

SITE cannot complete the bill. Leftover marks cannot complete the bill.
There is no marks-to-bill path, no glass wallet, and no second HUD line.

### Why LAND is a verb

The run is already inbound at the opening. Showing it as arrival is the
honest form of "the loop as sat lands here." Automatic landing on SITE
would make marks and the haul the same commit, and the hardest kill —
bill payable in marks alone — would be untestable. SITE writes the
address; LAND writes the haul; CAST spends the food and opens the
Foundry.

### Why the bill is one inbound haul

This board does not own SEND. A bill that needed a second outbound run
would force a sixth loop or a Halt send. One paying run, already out,
fills the bill. Two panes are the look of that haul, not a count the
player spends.

### Why SITE costs 3

The inherited opening float is 3. SITE at 3 is the smallest opening at
which the first frame contains a paid choice, and after it the wallet is
empty, so the bill's remaining price cannot be mistaken for marks. The
figure does not move; it is the float doing the job Amendment 1 sized it
for: one paid opening, never two.

### Why the frame leaves the ruin

CAST is the bill. Tapping the Foundry a second time is the strip with one
button. The frame leaves the ruin's hitbox so SITE and CAST are not the
same brick.

---

## Sees

One HUD line: marks. Museum. The bill lives on the frame. Food lives on
the terrace, then in the town. Panes are objects on the frame. The
Foundry is the one tappable ruin, then inert. The inbound consist is
LAND. The posted frame is CAST. Horizon ruins are silhouettes. The rim
is the cold edge and is not a pad. Heat-as-terrain is the reached
ground's colour. The scaffold is SITE's tell.

No job row. No named pads. No lecture boxes (`#say` / `#end`). No help
overlay, no `?`, no tutorial, no plaque, no citizen, no interior, no
zoning, no cutscene.

---

## Ends

The board does not lecture. After a sit the five tells stand: the ruin
they opened, the train that came home, the bill they spent, the food that
went in, the ground that took heat.

The sim still records the sitting's sentences (not painted):

**SITE:** *"The work is open. The scaffold is up. The bill is on the frame."*

**LAND:** *"The run came back with an address. The panes are on the frame."*

**CAST (terminal):** *"The Foundry is live. The terrace food went into the
town. The ground already reached took one heat."*

Ask: What happened.

---

## On this sitting

| System | This sitting | From |
| --- | --- | --- |
| **Works — SITE, address, bill on the frame** | **ON** — the single new system | new; SIGNED |
| **Foundry as work one** | **ON** | new |
| **Three places (ruin / consist / frame)** | **ON** — the recut | SIGNED recut 1 |
| **LAND as arrival, not SEND** | **ON** | new; the loop as sat |
| **CAST = OPEN: bill full + terrace food → Foundry, food in, Heat step** | **ON** | new |
| Marks, one HUD line | INHERITED | CFD-196 / every later board |
| Opening float of 3 | INHERITED as the SITE price | CFD-196 Amendment 1 |
| Terrace food already in | INHERITED as a fixture, not a CARRY | CFD-203's food noun; CARRY refused |
| Heat-as-terrain look on reached ground | **ON as look**, new-play | R9; not a write to the heat pin |
| Keel-fire / hearth as scenery | INHERITED as scenery | CFD-176 |
| Greenhouse as a standing terrace job | INHERITED as scenery; not a second greenhouse and not UP | CFD-183 |
| Job row / named pads / lecture boxes | **REFUSED** | signed recut 1 |
| Switchyard / desk / SEND / MUSTER / MEET | **REFUSED** | the loop owns them |
| Halt send | **REFUSED** — sixth loop | signed |
| CARRY / UP / TEND / weather / Ranger / trim | **REFUSED** | signed |
| Warehouse, Signal, Market/League, postcard hall | **REFUSED** as this work; horizon only if visible | signed |
| Crane | **REFUSED** — stays at Rustfall; scaffold is not a verb | CFD-202 |
| Glass currency, parts, units sink, food-marks exchange | **REFUSED** | signed; R1 |
| PWA town, LoopBeat, help, tutorial, plaques, citizens | **REFUSED** | signed |
| Reading or writing another board's persisted state | **REFUSED** | lineage lock |

---

## Kill

Every line testable, red-first.

- Bill payable in marks alone (killed hardest). SITE plus leftover marks
  cannot CAST. There is no marks-to-bill path.
- Ghost pads / second tappable ruin.
- Halt SEND on this board (sixth loop). No SEND control, no `commitSend`.
- Food CARRY on this board (food already on the terrace).
- UP / TEND / weather / Ranger / trim.
- Glass currency or a second HUD line (bill lives on the frame).
- Foundry doing Air+Heat.
- Write to `/dawnspur-heat/` or any live pin.
- Heat step past the rim. Rim refuses SITE and does not move.
- Warehouse / Signal / Market / second greenhouse as this work.
- SITE as a named pad (SITE is the ruin).
- Help overlay, `?`, tutorial, plaques, citizens, interiors, zoning, cutscenes.
- PWA town, LoopBeat, units sink, parts as currency, food-marks exchange.
- Overwrite any live board.
- Job row / named pads.
- Lecture boxes / tutorial / help overlay.
- CAST-on-same-ruin (ruin hitbox must not also be CAST).
- Dead inbound (consist must be tappable for LAND when live).
- Auto LAND.

---

## The numbers, new-play, flagged

- **SITE 3.** The inherited float. Enough to SITE; nothing left.
- **Opening marks 3, food on the terrace, one inbound paying run.**
- **Bill need 1.** One inbound haul fills it. Two panes are the look.
- **CAST costs no marks.** It spends terrace food and writes the Foundry,
  the town food, and one Heat step on reached ground.
- **Rim position is a constant.** CAST does not write it.

---

## Canon check

| Row | State | Rests on |
| --- | --- | --- |
| Works as the one new system | ON | §7 KEPT — one new system; SIGNED David 2026-08-30 |
| Foundry is work one | ON | buildings exist because they do jobs; Foundry is Heat (food into already-reached ground) |
| Three places, not a strip | ON | signed recut 1 — Superheavy; David 2026-08-30 |
| Marks open SITE only | ON | R1 — marks pay for buildout, they are not heat and they are not the bill |
| Bill = addressed hauls | ON | R10 — a load can be buildout; the loop as sat is how the haul exists |
| Panes are look, not stock | ON | R1 — no second currency; no glass wallet |
| OPEN+CAST one commit | ON | one new system; Foundry live + food in + Heat step are one job |
| Heat step on reached ground, not past the rim | ON | R9 — Heat ≠ Air; Foundry does Heat, not Air+Heat |
| Heat-as-terrain is look | ON, new-play | not a write to the heat pin |
| No Halt send | ON as a refusal | a city board that sends is a sixth loop |
| Food already on the terrace | ON as a fixture | CARRY is a loop verb; this sitting receives |
| Lineage lock | ON | §7 — sibling path; pins unmoved |

---

## Sit

David sits first. **Ask: What happened.**

Wanted: they can point at the ruin they opened, the train that came home,
the bill they spent, the food that went in, the ground that took heat.

Fail: named pads; a lecture; the same ruin twice; paid in marks; sent a
train.

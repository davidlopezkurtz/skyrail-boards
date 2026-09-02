# Open decisions — 2026-09-02

**Forty decisions waiting on David, gathered from four records and ranked by what each
one blocks.** Assembled 2026-09-02 from 78 raw call-instances across ten lists: the
name-collision ledger's §5 and §6 dispositions and its two do-not-average blocks; the
canon sweep's and the CFD-176 sweep's David lists in `docs/sweep-2026-09-02.md`; and
the `KILLS.md` pass proposal. Six calls were overtaken by commits on 2026-09-02 and are
in their own section rather than the list.

**This document is where a ruling attaches.** When David rules, the ruling is written
into the entry in place, dated, with a pointer to the commit that carries it out — the
same discipline the other records use. Nothing here is a defect report; the defects are
recorded and mostly corrected in the documents this list draws from. These are the
questions measurement cannot answer.

**A recommendation in an entry is the orchestrator's read, never a ruling.** Where the
evidence genuinely does not decide, the entry says so instead of manufacturing a
preference.

**Verified by the orchestrator before landing:** the citation-drift claims in entries 35
and 36, the six-discharged-gates claim in entry 9 (measured at HEAD: twelve beat files
carry a pre-sit gate phrase, and no test pins any of them), and the two entries the
2026-09-02 citation repair closed. Entries whose evidence moved during the day carry the
tree they were measured at.

---

# Decisions waiting on David — Skyrail boards, measured at `97f3ecd`, re-verified at `c32ff52`

**40 decisions.** Eight block work — a cut, a signature, a built-and-held edit, or a
landing that is drafted and ready. The rest split into eleven that publish something
measurably wrong to whoever reads the file next, fifteen convention-and-register calls
where measurement genuinely does not decide, and six record corrections that need no
ruling at all.

**78 raw call-instances** were collected from ten lists across four documents;
deduplicated to **40 entries**. The heavy collisions were the ones expected — `armed`,
the lineage membership, the KILLS completeness question, the canon-check retroactivity
question and the `rim` alias — plus one that was not: the **discharged Seat gate**,
raised once in the audit and once in the CFD-176 sweep, which measurement widens from
one beat to six.

**The single most consequential is #1: what CFD-200's parent is now.** Canon's own
contingency clause has already fired, and it fires at a board that never passed. CFD-200
cannot be signed until that is answered, and the board's whole inherited economy hangs
off the answer — which is also why #2 and #3 are the same board.

**Line numbers.** Every citation below was re-derived at `97f3ecd` by me. The underlying
files moved hard on 2026-09-02: `docs/mechanisms-recommitted.md` went 749 to 902 lines
at `b8d6da3`, `KILLS.md` went 67 to 119 at `b95a9c9`, and `docs/cfd-200-beat.md` is 1,352
lines against the 1,275 the sweep measured. **Every line number in the sweep's own
"David's calls" list is stale** — thirteen of fourteen. The drift table is entry 39.

**Context.** `/two-ways-from-here/` (CFD-210) is the one board the hub still marks
*"live — new sitting, not yet sat"* (`public/index.html:31`) and the one that kept
*"David sits first."* through `079b2bd`. A sit there is an action, not a decision, so it
is not numbered below — but most of Tier 3 is waiting behind it.

---

# Tier 1 — Blocks a cut, a signature, or a built edit (8)

## 1. CFD-200's parent, after the storm stopped unpassed

**Question.** Pick one: is CFD-200's parent (a) `/dawnspur-storm/` as written, (b)
`/dice-at-the-places/` — the last board that actually passed, in the other lineage, or
(c) `/dawnspur-line/`, the join board canon's contingency names? And does "the last passed
board" reach across the desk/city seam at all?

**What the document says.** `docs/mechanisms-recommitted.md:530`: *"passed board at its
signature is the storm board. Re-basing it today is"* — the full clause at `:527-531`
reads *"CFD-200 is unsigned and third in a three-board queue — line, storm, rustfall. It
signs after the storm sitting, so the last passed board at its signature is the storm
board."* And `:547`: *"board is killed rather than passed, CFD-200 re-bases onto whatever
did pass —"* continuing at `:548` to *"which would then be the join board."*

**What source says.** The storm was sat five times and **stopped without a pass and
without a kill** — `KILLS.md:68-69` (*"five sits, five recuts, stopped without a pass"*),
canon `:590` in the sweep's numbering. The beat's own trigger is different from canon's:
`docs/cfd-200-beat.md:121-123` fires on *"If CFD-201 does not pass its sit"* — which has
happened — while canon's fires only on *killed rather than passed*, which has not.
`test/lexicon-ledger.js:37-41` puts `/dice-at-the-places/` in the **city** list and the
storm in the **desk** list, so (b) crosses the seam.

**Blocked.** CFD-200's signature. Canon's own §7.1.4 rule at `:516-517` is *"the parent is
the last passed board, named at signature rather than assumed at drafting"* — the naming
cannot happen.

**Orchestrator's read.** *(a) with an explicit exception recorded* — the storm's five
sittings are what CFD-200 actually inherits mechanically, and re-basing onto a city board
would import a lineage whose API the desk does not share; but the evidence does not decide
whether an unpassed board may be a parent under §7's own rule, and that half is genuinely
yours.

**Cost of getting it wrong.** CFD-200 inherits the wrong board's economy — the exact
defect class the 2026-09-01 sweep found four HIGH rows of in this beat already.

---

## 2. CFD-200's first-sitting sky trace, and the Engineer argument resting on it

**Question.** Yes or no: rewrite the trace table at `docs/cfd-200-beat.md:1139-1149` to the
measured sequence, and re-argue the three design paragraphs that rest on it?

**What the document says.** `docs/cfd-200-beat.md:1145-1149` traces turn 5 SEND under
clear, pushes at turns 7, 8, 9 with `| 8 | **STORM** |` and `| 9 | **STORM** |`, then
`:1151-1152` concludes: *"Two of the three pushes land under a storm, and the bird is on
the board for two turns before the first of them."*

**What source says.** `docs/name-collisions-audit-2026-09-01.md:935-937`: *"the
first-sitting sky trace is the dispatch path, and the inference on it is inverted: driven
on the parent, the send falls at t8 under STORM and the pushes at t10–t12 clear. Design
paragraphs (`:263-292`) rest on it — **David's call**, not built."* Those paragraphs are
`docs/cfd-200-beat.md:246-295` at HEAD, where the Engineer is priced at 6 and justified as
*"Prevention"* against exactly this storm exposure. **The audit's cite `:1076-1093` is
stale — that range is the CFD-145 consolation/gradient passage, and was already the wrong
range at `44a456a`, the tree the disposition was written on.** Corrected here.

**Blocked.** CFD-200's cut. The Engineer is the board's one genuinely new job.

**Orchestrator's read.** *Rewrite the trace, then re-argue.* The measurement is
uncontested by both readers; what the audit protected was your right to rewrite a trace
that design paragraphs stand on, not the number. If the corrected trace puts the storm
before the yard opens, the Engineer's whole "warning first" framing changes and that is
worth knowing before the cut, not after.

**Cost of getting it wrong.** A board ships whose central new job was priced against a
weather sequence the engine does not produce.

---

## 3. CFD-200's two stops, unreconciled on one board

**Question.** Pick one: does CFD-200 **carry**, **narrow**, or **refuse** the storm
parent's own arming stop?

**What the document says.** `docs/cfd-200-beat.md:592-594` gives the Engineer terminal
register (*"The Engineer got the parts car's coupling back under it. Two cars aboard,
worth 21."*) and `:625-630` the clean and paid registers — the beat's terminal vocabulary,
none of which mentions UP or topping.

**What source says.** `docs/name-collisions-audit-2026-09-01.md:945-948`, graded **HIGH**:
*"the beat 'carries the whole storm board' and never mentions UP, topping, or the parent's
own arming stop (`sim.js:626`), reachable by play and ending the sitting before any
Rustfall send. Two stops on one board, unreconciled. **David's call**; a refuter-only edit
flags it."*

**Blocked.** The cut. A board with two live stops and no ruling on which governs is not
implementable.

**Orchestrator's read.** *Narrow it* — the parent's arming stop is a terrace-topping
ending that has nothing to do with the yard, and carrying it whole gives a player a way to
end the sitting before the board's own subject appears; but which of narrow-or-refuse is
right is a design call, not a measurement.

**Cost of getting it wrong.** A player ends the first sitting before ever reaching
Rustfall, and the board never gets sat on its own subject.

---

## 4. Canon §7.5's worked example 2 — three nulls, and two lines wrong on day one

**Question.** Three parts, one bundle: (a) does the ruled table at `:865-869` become
**four** outcomes to match the beat, (b) is `:863`'s *"no decision"* framing struck, and
(c) is `:871`'s *"All three would be logged"* replaced with the beat's *"All four log as
'the sitting ended.'"*?

**What the document says.** `docs/mechanisms-recommitted.md:861` *"#### Worked example 2 —
CFD-210, the three nulls"*; `:863` *"The same insight in a different shape. Three ways a
fork can produce no decision:"*; `:871` *"**All three would be logged as \"the player used
the fork.\"**"*

**What source says.** `docs/cfd-210-beat.md:548-578` registers **four** outcomes, the
first two in your own words, since `9618352`. And the shipped board separates them with a
counter: `docs/sweep-2026-09-02.md:588-594` — *"driven from `createBoard()`, banking gives
`pressOns: 0` and either press-on gives `1`, and the suite asserts it at
`test/two-ways-from-here.test.js:1019` and `:976`"* — so **§7.5's own third prohibition —
`docs/mechanisms-recommitted.md:897-899` at HEAD, which the sweep cited as `:744-746`**
(*"If a split can be resolved by a counter, it was not a split worth registering — and if
it cannot, the counter is not the instrument."*) — convicts the section's own worked
example.

**Blocked.** `C:\tmp\sweep\edits-city\mechanisms-recommitted.cfd-210-M4.DAVID.json` — built
and dry-run clean, held since 2026-09-01. `docs/sweep-2026-09-02.md:666-669` rules out its
minimal alternative: *"They are David's calls 12 and 13 above and must travel in the same
bundle."*

**Orchestrator's read.** *All three, as one edit* — and take the two corrections the sweep
recorded with it (`docs/sweep-2026-09-02.md:658-664`): the held file's *"no completion
count separates"* opening is **false on the shipped board** and must be replaced by the
beat's own line, or you land a new false statement while fixing a stale one.

**Cost of getting it wrong.** The canon section that governs how every future beat
pre-registers its outcomes keeps a worked example that fails its own test.

---

## 5. §7.4's status word — RULED or WRITTEN DOWN?

**Question.** Yes or no: did you rule §7.4 on 2026-08-31?

**What the document says.** `docs/mechanisms-recommitted.md:666`: *"### 7.4 A recut may not
be the same KIND as the one that just failed — **WRITTEN DOWN 2026-08-31**, in use since
2026-08-29"*.

**What source says.** `docs/cfd-201-beat.md:750`, landed 2026-09-01, says **RULED
2026-08-31**. Twelve other cites give §7.4 no status word at all
(`docs/sweep-2026-09-02.md:562-565`).

**Blocked.** Acceptance of the §7.4 supersessions this wave landed. Per the sweep at
`:564-565`: *"If yes the heading is the stale thing and every §7.4 supersession in this
sweep becomes his to accept; if no, the beat line is the edit."*

**Orchestrator's read.** *No strong read.* This is a fact about what you did, not a
judgement — the repository holds one witness on each side and neither is better evidence
than your memory.

**Cost of getting it wrong.** Either a batch of landed canon edits is unratified, or a
beat publishes a ruling that was never made.

---

## 6. Canon `:12`'s doc-wide signing undertaking

**Question.** Pick one: is the undertaking discharged by §5's signature plus the ruled §7
sections, or do §§1–4 still need signing before the next recut?

**What the document says.** `docs/mechanisms-recommitted.md:12`: *"below carries its quote.
David signs this doc before any recut implements it."* (This is the one canon cite in the
sweep's David list whose line number did **not** move.)

**What source says.** §5 was signed at `:161` (*"SIGNED — David, 2026-08-25: 'section 5 is
signed.'"*) and §§7.1/7.2/7.3/7.5 are ruled in their headings (`:450`, `:578`, `:604`,
`:820`). §§1–4 carry no signature — and the recuts the sentence gated have already shipped
(`KILLS.md`'s 2026-08-30 halt entries).

**Blocked.** The next recut, under this document's own gate.

**Orchestrator's read.** *Rule it discharged in a dated note; do not rewrite the
sentence.* The sweep's own warning at `:532-533` is right — *"Rewriting it to match events
would convert a promise he made into a description of a promise partly kept."*

**Cost of getting it wrong.** Either the next recut proceeds under a gate nobody honoured,
or a promise is quietly edited into a description.

---

## 7. `KILLS.md`'s scope — kills only, or the ledger of sittings?

**Question.** Yes or no: do the five passes get ledger entries?

**What the document says.** `KILLS.md:1-3`: *"# Kills ledger — append-only / Every kill
records: date, board, build sha (from /build-info.json at the time of the sit), what the
player did, the recut decision."* And `C:\tmp\kills-proposal\KILLS-proposal.md:173-176`:
*"`KILLS.md` holds kills and standing rules. Passes live in the beats, the commit memos
and canon §7. Adding them makes this the ledger of sittings rather than the ledger of
kills; refusing them keeps one document with one job and leaves five passes with **no
single place they can be looked up**."*

**What source says.** Three canon claims assert or rely on a ledger completeness that does
not exist — the sweep's `s7.4-M6` charged that canon's *"`KILLS.md`, where every recut
decision and its shas are recorded"* over-claims
(`docs/sweep-2026-09-02.md:469-475`). **Partially overtaken:** the two missing kills and
the storm stop landed at `b95a9c9` and are in the file now (`KILLS.md:26`, `:55`, `:68`).
What remains is the five passes, drafted, measured and ready at
`C:\tmp\kills-proposal\KILLS-proposal.md:180-211` — dice, they-remember cut 1, herbs,
mosswake, and the halt walk.

**Blocked.** Those five entries. The proposal is explicit: *"they are **not** in
`edits.json`, which appends entries 1–3 only."*

**Orchestrator's read.** *Yes, and rename the heading.* The residual at
`docs/sweep-2026-09-02.md:477-480` — four pre-host entries carrying recut decisions with
no shas — means the file already fails its own header; if it is becoming the ledger of
sittings, say so in the heading rather than leaving canon citing a completeness the file
never had.

**Cost of getting it wrong.** Five passes stay findable only on Linear, and three canon
sentences stay untrue.

---

## 8. Canon §5's SIGNED stake (b), unmet on the board convened to meet it

**Question.** Pick one: is §5's in-progress stake (b) still **owed** by a later sitting,
**discharged** by the storm's stop, or **superseded**?

**What the document says.** `docs/mechanisms-recommitted.md:495-496`: *"defers a signed
commitment. §5 is not overturned — the storm still carries the haul and in-progress stakes
when it arrives"*. (Sweep cited this as `:401`; corrected here.)

**What source says.** `docs/sweep-2026-09-02.md:538-544`: the storm arrived and carried
stake (a) only — *"UP is instant on that board (`sit/dawnspur-storm/sim.js:15-16`), the
file holds no in-progress or suspended state at all (`grep` returns zero), and the
mechanic that would have housed §5's stake (b) was cut before signature by a paragraph
that names §5's stake (b) as what it was cutting (`cfd-201:1497-1505`)."*

**Blocked.** Nothing mechanically — but §5 is SIGNED, and a signed commitment half-met is
the thing that cannot be resolved by anyone else.

**Orchestrator's read.** *Discharged, recorded as such* — the cut was made deliberately
and named what it was cutting; carrying (b) forward as an open debt would put an
obligation on a sitting nobody has scoped. But this is your signature, and the evidence
does not decide it.

**Cost of getting it wrong.** A signed canon commitment silently expires, or a future
sitting inherits a stake nobody planned.

---

# Tier 2 — Publishes something measurably wrong to a reader (11)

## 9. The discharged Seat gates — six beats still forbid merging boards that are live and passed

**Question.** Yes or no: supersede the discharged Seat prohibitions on every beat that
carries them, in the form already landed on `cfd-176:11`?

**What the document says.** `docs/cfd-205-halt-beat.md:33-34`: *"Draft. Do not merge. Do not
deploy. Do not `workflow_dispatch`. David sits first."* — governing `/dawnspur-halt/`,
which the hub marks *"live — passed its sit"* (`public/index.html:61`).

**What source says.** Measured across `docs/` at HEAD, **six beat files** carry live
prohibitions on boards that shipped and passed:
`cfd-183:32` and `:327`, `cfd-196:125`, `cfd-205-halt:9` and `:33-34`, `cfd-206:9` and
`:34`, `cfd-207:13` and `:43`, `cfd-208:14` and `:50`. Three others were already
superseded by the sweeps (`cfd-201:80`, `cfd-203:153`, `cfd-205:10`/`:31`), one landed on
2026-09-02 (`cfd-176:11`, at `b232440`), and `cfd-200:68` is legitimately still beat-only.
**No test pins any of these lines** — `grep -rn "David sits first|Do not merge|No
implement|Beat only" test/` returns nothing — so the fix is docs-only and free.

**Raised as.** `docs/name-collisions-audit-2026-09-01.md:1253-1254` (one beat) and
`docs/sweep-2026-09-02.md:866-874` (one beat, flagged as a precedent split and *"held
behind his word"*). **The hold did not hold** — `cfd-176:11` landed at `b232440` anyway,
so the split is now live in the tree with one side superseded and five not.

**Blocked.** Nothing mechanically. But a worker reading `cfd-206` today is instructed not
to merge a board that merged eight days ago.

**Orchestrator's read.** *Supersede all six, in `cfd-176:11`'s form.* One instance already
landed; leaving five means the convention now depends on which beat a worker opens.

**Cost of getting it wrong.** A worker refuses a landing they were supposed to make, or
treats every Seat block as decorative — including `cfd-200:68`, the one that is real.

---

## 10. `kills/README.md`'s fetch-verify caveat is unconditional and measurably false

**Question.** Yes or no: correct the caveat to say the beacon injection is Accept-header
conditional, and record the working method?

**What the document says.** `kills/README.md:35-39`: *"Fetch-verify caveat, measured
2026-08-25: the durable host injects the Cloudflare Insights beacon into HTML (+359 bytes
on /dawnspur/ — 12024 live vs 11665 deployed), so a live fetch of index.html will NOT
hash-match these captures."*

**What source says.** `docs/sweep-2026-09-02.md:790-799`, reproduced by both readers and by
the orchestrator: *"a plain fetch of `https://boards.skyrailreclamation.com/dawnspur/`
returns **200, 11,665 bytes, sha256 `bdde9b50331ac89d…97ac59`** — exactly beat `:13`, the
HEAD blob, `test:40` and `kills/README.md:31`. With `Accept: text/html` it returns
**12,024 / `540c9ee2…`** … The injection is triggered by the **Accept header, not the
User-Agent**."* And the conclusion: *"it removes a standing excuse: to hash-match archived
HTML at the durable host, fetch without an `Accept: text/html` header."*

**Blocked.** Nothing — but the caveat is why the CFD-176 sweeper stopped at the sim half,
and it will stop the next one.

**Orchestrator's read.** *Correct it.* This one is not a judgement: the README states a
false unconditional and the true conditional is measured, reproduced twice, and cheaper
than the workaround the README recommends.

**Cost of getting it wrong.** Every future archive verification skips the HTML half on a
false premise.

---

## 11. The stale heat index pin `cedf765c` still ships, in four places

**Question.** Yes or no: re-pin the heat index in the shipped MANIFEST of a passed board,
and supersede the two remaining stale copies in `cfd-183`?

**What the document says.** `sit/dawnspur-scale/MANIFEST.txt:25`: *"live /dawnspur-heat/
build c887359 / index cedf765c / sim 292d6645 / greenhouse 7fdf7468"*.

**What source says.** Measured at HEAD: `sha256sum sit/dawnspur-heat/index.html` is
`b5f7e14f4ed82a81…bba995`, and `sit/dawnspur-heat/MANIFEST.txt:19` records exactly that.
`cedf765c` was the heat index at `c887359` and was superseded by `efbed23`. **The stale
value survives in four files**, not the one the audit named:
`sit/dawnspur-scale/MANIFEST.txt:25`, `public/dawnspur-scale/MANIFEST.txt:25` (so it is
served), and `docs/cfd-183-beat.md:329` and `:385` — both **unsuperseded**, while the same
pin at `:45` and `:182` in the same file *does* carry supersession notes from the
2026-09-01 sweep.

**Raised as.** `docs/name-collisions-audit-2026-09-01.md:960-963` — *"**The same stale pin
is shipped** in `sit/dawnspur-scale/MANIFEST.txt:25` — a passed board's bytes; David's."*
The audit named one of four sites.

**Blocked.** Nothing. The two `docs/` copies are free; the two MANIFEST copies are `sit/`
and `public/` bytes on a passed board, which the lineage rule protects.

**Orchestrator's read.** *Supersede the two `docs/` copies now; leave the MANIFEST bytes
and record why.* A MANIFEST that misdescribes what it pins is worse than a docs typo, but
editing a passed board's shipped bytes to fix a comment is exactly the trade the lineage
rule exists to refuse.

**Cost of getting it wrong.** A future fetch-verify of `/dawnspur-heat/` fails against a
pin that was never right, and is read as the board having drifted.

---

## 12. Canon grades `/dawnspur-heat/`'s WARM two ways, eleven lines apart

**Question.** Pick one: is the heat board's WARM a **TRUE R9 collapse** (`:105`), or does
it **survive R8/R9** (`:117-118`)?

**What the document says.** Two lines in one file. `docs/mechanisms-recommitted.md:105`:
*"| Heat vs Air: WARM as ground step that is also a dest job | TRUE collapse | R9 |"*.
`:117-118`: *"Its bank-in-the-stone and step-onto-ground survive R8/R9 readings."*

**What source says.** `docs/sweep-2026-09-02.md:875-881`: *"the beat's own `:19` has one
WARM doing both things R9 forbids. **This is not resolvable by measurement and must not be
averaged.**"* R9 itself is at `:84-85` at HEAD (the sweep cited `:78-81`): *"**R9 — Heat ≠
Air ≠ Growth (directive 1.19).** 'Heat that warms the ground already reached against Air
that opens new ground …'"*

**Blocked.** The canon-check retroactivity call (#25) — the sweep flags that adding *"Heat
vs Air — R9"* as a citation on `cfd-176` would silently pick `:118` over `:105`.

**Orchestrator's read.** *No read.* This is a canon self-contradiction on a board that has
already passed and stands as played; measurement confirms both readings describe the same
bytes and cannot choose between them. It is a judgement about what R9 means.

**Cost of getting it wrong.** Every later board inherits the wrong reading of R9, and the
one board it was adjudicated on is the precedent.

---

## 13. Canon `:106`'s phase-lock order is not the order the board enforces

**Question.** Yes or no: correct canon `:106` to the enforced order?

**What the document says.** `docs/mechanisms-recommitted.md:106` writes the lock as
`GOODS/HOLD/B/WARM`.

**What source says.** The board enforces `GOODS → B → HOLD → WARM`
(`sit/dawnspur-heat/sim.js:4`), and BFS over all 24 orderings of the four commits reaches
`banked` in **exactly 1** — that one (`docs/sweep-2026-09-02.md:745-746`). The sweep's
ruling at `:882-886`: *"**The slip is canon's, not the beat's**, and out of this sweep's
glob."*

**Blocked.** Nothing directly, but it is the reason `cfd-176:39` was routed to you rather
than superseded.

**Orchestrator's read.** *Correct it.* Two letters, uncontested by both readers, driven
over the full ordering space.

**Cost of getting it wrong.** A beat gets superseded to match canon's typo.

---

## 14. `armed` — REAL_COLLISION / MEDIUM, or BENIGN_SHARED_NAME / LOW?

**Question.** Pick one severity.

**What the document says.** `docs/name-collisions-audit-2026-09-01.md:799-805`: *"One
reviewer adjudicates BENIGN_SHARED_NAME / LOW … The report holds REAL_COLLISION / MEDIUM …
The guard's ledger carries the row as CONTESTED with both readings and every measured
site; **nothing downstream may cite a single severity for it until David rules.**"*

**What source says.** `test/lexicon-ledger.js:322-328` carries it CONTESTED at HEAD, with
both readings verbatim and the note *"the ruling is David's"*. What is measured and
uncontested (`:325`): *"both sides drive from the opening, and `stopped => armed` holds on
every board that carries it"*. (**This row moved from `:260` to `:322` at `919b6be`,
mid-task** — see the closing note.) The split is 2 success-armed (line, storm) vs 2
failure-armed (dice, two-ways) — `docs/name-collisions-audit-2026-09-01.md:469`.

**Raised in.** Audit §1.10 (`:431-474`), §5 do-not-average (`:799-805`), and the guard's
ledger (`test/lexicon-ledger.js:322-328`). One call, three places.

**Blocked.** Any downstream citation of a single severity — the ledger says so in terms.
The completeness critic calls the split *definitional, not factual*
(`docs/name-collisions-audit-2026-09-01.md:802-803`).

**Orchestrator's read.** *LOW.* The export answers one question on all four boards and the
world-cause differing is what a shared abstraction looks like; but the critic is right
that this is definitional, so a MEDIUM ruling is equally defensible and I would not argue
with it.

**Cost of getting it wrong.** MEDIUM triggers a rename campaign across four boards whose
bytes are hash-pinned; LOW leaves a real inversion undefended on the line side.

---

## 15. §7.2's "honest" test — not EV-dominated, or free-and-always-lit?

**Question.** Pick one: what does *"honest"* test?

**What the document says.** `docs/mechanisms-recommitted.md:591-594`, under §7.2 (**RULED**,
`:578`): *"**A quick path must exist and must be honest.** If the board's short route is a
worse deal than the long one, the player did not opt in; they were priced in. The floor
send being free and always lit is the shape this already takes on the dispatch board."*

**What source says.** `docs/sweep-2026-09-02.md:555-561`: free-and-always-lit is confirmed
by driving, *"but net marks per send put the free halt behind Mosswake at every roster (0W
6.800 vs 6.960 … 4W 8.240 vs 8.976), while `cfd-203:1238` applies §7.2's test **as EV** and
passes the line board on it."* And: *"(§7.3 four lines later forbids the single-number
netting an EV-only test performs.)"* — §7.3 is at `:604`.

**Blocked.** Any future board's §7.2 self-check; two beats currently apply two different
tests.

**Orchestrator's read.** *Free, always available, never locking* — because §7.3, four
lines later, forbids the single-number netting the EV reading requires, so the EV reading
makes the two ruled sections contradict. But §7.2 is yours and this is a rule
interpretation.

**Cost of getting it wrong.** Every board's quick-path check is graded by whichever test
its author happened to read.

---

## 16. The CFD-176 beat's Sees and Does describe a board that does not exist — four sentences

**Question.** For each of four sentences: supersede as measured, or accept as authorial
ellipsis? One ruling shape covers all four.

**What the document says and what source says**, all re-derived at HEAD from
`C:\tmp\sweep176\results.json` and the shipped board:

| beat | the sentence | measured |
| --- | --- | --- |
| `cfd-176:23` | *"A stays held."* — the first sentence of Sees | `heldA` is **false in 2 of the 6 reachable states**, and both sit on the only path to WARM; `index.html:201` renders `destA` as `thin` there. The beat's own `:37` keeps held/thin ON and calls it *"visible as a held slab"*, so the thinning is intended and on screen. |
| `cfd-176:19` | *"After return, wait."* — stated as an imperative to the player | The player has **no control that waits**. `index.html:218-220` fires `board.wait()` from a 1500 ms idle timer inside `paint()`; none of the six tap bindings at `:253-273` reaches it. **This board is the origin of the timer convicted at audit §1.3.** |
| `cfd-176:27` | *"The outward step is what could die."* | `sim.js:74` sets `step = "gone"` unconditionally inside `wait()`. Replayed over every reachable banked state: **step can never remain `out`.** The stake was asserted, not modelled. |
| `cfd-176:19` | *"One dispatch."* | The path to WARM is **four** mandatory out-and-back trips; exactly 1 of 24 orderings reaches `banked`. |

**Blocked.** Nothing — `/dawnspur-heat/` is passed and stands as played, and **no test
reads this beat** (`grep -rl 'cfd-176-beat' test/` returns zero files), so every
supersession here is free of a regex re-grade.

**Orchestrator's read.** *Supersede `:23` and `:27`; leave `:19`'s two as ellipsis.* The
first two are measurably false about what a player sees and what can die — the third row
in particular is a stake the beat promised and the board never modelled. The two `:19`
readings are recoverable from the surrounding sentences and are the ellipsis class the
audit already routed to you at its `:1258`.

**Cost of getting it wrong.** The record of a passed board describes a stake it never
carried — and it is the only board whose pass has no `KILLS.md` line and no verbatim in
this repository.

---

## 17. `cfd-206:60` cites World Bible §12 as canon, and a test pins the citation

**Question.** Pick one: append a dated parenthetical, or leave it?

**What the document says.** `docs/cfd-206-beat.md:60`: *"World Bible §12 Mosswake Loop. Core
Loop: nodes and lines. Geology:"*.

**What source says.** Measured at HEAD: `test/mosswake-loop.test.js:226` asserts
`assert.match(beat, /World Bible §12/)` against `docs/cfd-206-beat.md` — **so removing the
citation goes red.** Two later beats carry the opposite instruction, also pinned:
`test/herbs-larder.test.js:265` and `test/they-remember.test.js:300` both assert
`/Do not cite World Bible §12/`. The audit records the §12 source was ruled LEGACY 33
minutes after the merge (`docs/name-collisions-audit-2026-09-01.md:1265-1266`).

**Blocked.** Nothing. The parenthetical form keeps all three regexes green; a removal does
not.

**Orchestrator's read.** *Append the parenthetical.* It is the only edit that fixes the
reader's problem without touching a test, and the measurement above is why.

**Cost of getting it wrong.** A beat keeps citing a superseded bible as canon, or the
suite goes red for a docs edit.

---

## 18. Canon `:752`'s confabulated mechanism — which question produced it?

**Question.** Pick one: did the **TEND** question or the **trim** question produce the
confabulated answer §7.4 cites?

**What the document says.** `docs/mechanisms-recommitted.md:751-754`: *"The one intent
answer on record is a **confabulated mechanism** — 'I noticed it degrade and started to see
a connection between fully tended land and success rates' — a link that does not exist on
that board."*

**What source says.** `docs/sweep-2026-09-02.md:569-575`: Linear-only; *"the closest in-repo
record (`sit/dawnspur-storm/sim.js:52-53`, second sit) is a **different** sentence with the
same content, and it too is an answer about **why he tended** — while the intent trim
question got a clean factual answer (`sim.js:49-50`, 'TRIM landed (considered at each storm
send and left)')."* And the stake: *"If the TEND question did, then the shape §7.4 calls
'the one that DOES work' produced the one confabulated answer it cites as the reason to
refuse intent questions — and §7.5 (RULED) rests on that reading at `:681-686`."* That
§7.5 passage is `docs/mechanisms-recommitted.md:834` at HEAD — *"**§7.4 got here first and
filed it as a detail.** It cites the TEND question as"* — the sweep's `:681-686` is stale.

**Blocked.** Nothing mechanically, but two ruled sections rest on the answer.

**Orchestrator's read.** *No read — this is a Linear lookup, not a judgement.* The repo
evidence points at the TEND question and that is the uncomfortable answer, but the
repository does not hold the sit and I will not guess it.

**Cost of getting it wrong.** §7.4's central argument for refusing intent questions is
built on an answer produced by the question it blesses.

---

## 19. `cfd-183` does not state the mark gate

**Question.** Yes or no: does the beat state the mark gate explicitly, or does
specification-by-reference stand?

**What the document says.** `docs/cfd-183-beat.md:59-62`, the CARRY FOOD bullet: *"the
profit leg, as played: pays marks by the level (+1, +2, +3; the ladder's +4 is never paid,
because topped at 4 is the stop and the carry goes dark with it …)"* — no mark gate stated.
`:238` states the gate only as *"gate carried from the played board's cadence"*.

**What source says.** `docs/name-collisions-audit-2026-09-01.md:1007-1008`, under *refuted at
review*: *"cfd-183 M4's 'stricter than signed' (the mark gate is specified by reference to
heat `sim.js:22`)"*, and `:1021-1022` puts it in do-not-average — *"sweeper DAVID, refuter
NONE; both agree the beat and the board are consistent."*

**Blocked.** Nothing. The board passed; both readers agree it is consistent.

**Orchestrator's read.** *Leave it.* Both readers measured the beat and the board as
consistent; the only question is register, and the reference is unambiguous.

**Cost of getting it wrong.** A future reader re-derives a gate that was already specified.

---

# Tier 3 — Convention and register; measurement does not decide these (15)

## 20. The Canon check section — retroactive on the seven beats that lack one?

**Question.** Yes or no: do beats written before the convention get a Canon check section
added retroactively?

**What the audit says.** `docs/name-collisions-audit-2026-09-01.md:1266-1267`: *"no Canon
check section on 205-halt, 206, 207, 208 (retroactive or not)"*. The CFD-176 sweep raised
the same thing independently as row `M6`, UNCITED, action DAVID — *"the whole beat: no
Canon check section, zero R-rule citations"*.

**What source says.** Measured at HEAD, `grep -c 'Canon check' docs/cfd-*.md`: **seven**
beats lack one, not four — `cfd-176`, `cfd-205-halt`, `cfd-206`, `cfd-207`, `cfd-208`,
`cfd-209`, `cfd-210`. Six have one (`183`, `196`, `200` ×2, `201`, `203`, `205`). **The
audit's list of four is short by three.** Corrected here.

**Blocked.** Nothing. But note the coupling: if you add a citation to `cfd-176`, entry #12
must be ruled first — the sweep warns that citing *"Heat vs Air — R9"* silently picks canon
`:118` over `:105`.

**Orchestrator's read.** *Not retroactive.* Seven files of back-fill on boards that already
passed, adding citations nobody used at the time, is archaeology; the convention going
forward is the value.

**Cost of getting it wrong.** Either seven beats of invented provenance, or a canon-check
discipline that only half the corpus obeys.

---

## 21. The `rim` alias note — 206 alone, or all three?

**Question.** Pick one: does the `rim` disambiguation note go on `cfd-207` and `cfd-208`
too, or stay on `cfd-206` only?

**What the document says.** `docs/cfd-206-beat.md:224-226` carries it: *"rim — `rim` is
`/dawnspur-halt/`'s own constant and is not read here. SEND does … constant"; the rim is
halt's, and this board carries only the gap.)*"

**What source says.** Measured at HEAD: `cfd-207:251` reads *"**Rim / gap is a constant.**
Put them up does not write it."* and `cfd-208:288` reads *"**Rim / gap is a constant.**
Collect does not write it."* — **neither carries the note.** The audit's cite
`cfd-208:278` has drifted to `:288`; corrected here. Both edits are built and held:
`docs/name-collisions-audit-2026-09-01.md:1240-1242`, *"the two conditional `rim` edits"*.

**Blocked.** Two built edits, held since 2026-09-01.

**Orchestrator's read.** *All three.* The note exists because the word means two things
across the seam; carrying it on one of three sites is the half-fix that leaves the other
two readers wrong.

**Cost of getting it wrong.** Two beats keep an ambiguous constant that the third
explicitly disambiguates.

---

## 22. `cfd-205`'s INHERITED-as-scenery rows — hearth and greenhouse

**Question.** Two picks: is the hearth **"as scenery"** or **lit-with-the-Foundry**, and is
the greenhouse **INHERITED as scenery** or **REFUSED**?

**What the document says.** `docs/cfd-205-beat.md:214`: *"| Keel-fire / hearth as scenery |
INHERITED as scenery | CFD-176 |"*. `:215`: *"| Greenhouse as a standing terrace job |
INHERITED as scenery; not a second greenhouse and not UP | CFD-183 |"*. **The audit cited
these as `:207` and `:208`; both have drifted by seven lines.** Corrected here.

**Blocked.** Nothing; `/dawnspur-site/` was stopped, not recut.

**Orchestrator's read.** *Leave both as INHERITED-as-scenery.* The distinction between
"inherited but inert" and "refused" is a register call on a stopped board, and the current
wording is at least internally consistent with `cfd-176`'s and `cfd-183`'s.

**Cost of getting it wrong.** A later board inherits a row it should have refused, or
refuses one it could have kept.

---

## 23. `cfd-205`'s two R-citations

**Question.** Two picks: is the R-citation for *"Foundry is work one"* right, and is R10
the right rule for the bill?

**What the document says.** `docs/cfd-205-beat.md:275`: *"| Foundry is work one | ON |
buildings exist because they do jobs; Foundry is Heat (food into already-reached ground)
|"*. `:278`: *"| Bill = addressed hauls | ON | R10 — a load can be buildout; the loop as
sat is how the haul exists |"*. **The audit cited these as `:268` and `:271`; both have
drifted by seven lines.** Corrected here.

**Blocked.** Nothing.

**Orchestrator's read.** *No strong read.* Both are rule-mapping judgements inside a Canon
check table on a stopped board; the underlying mechanics are not in dispute.

**Cost of getting it wrong.** A wrong rule citation propagates into every beat that
inherits the row.

---

## 24. `cfd-205-halt`'s "inherited" cells for systems that never passed

**Question.** Yes or no: rename the cell from *"inherited"* to *"kept by signature"* for
Works/SITE/LAND/CAST?

**What the document says.** `docs/cfd-205-halt-beat.md:207` *"| **Works — SITE, address,
bill** | **ON** — Foundry is work one | inherited; SITE/LAND/CAST sim kept |"*, `:209`
*"| **LAND as arrival, not SEND** | **ON** | inherited |"*, `:210` *"| **CAST = OPEN: bill
full + terrace food → Foundry, food in, Heat step** | **ON** | inherited Works |"*. **The
audit cited `:203-206`, which at HEAD is the table header and the first two rows.**
Corrected here: the rows are `:207`, `:209`, `:210`.

**What source says.** Those systems came from `/dawnspur-site/`, which was **sat and not
passed** (`KILLS.md:55-66`; hub `public/index.html:67`, *"live — sat 2026-08-30, not
passed"*), so "inherited" claims a lineage from a board that never earned one.

**Blocked.** Nothing.

**Orchestrator's read.** *Rename them.* "Inherited" in this corpus means "carried from a
passed board"; these were kept by your signature over a board that failed, which is a
different and more interesting fact.

**Cost of getting it wrong.** The corpus loses the distinction between what passed and what
was kept anyway.

---

## 25. `cfd-205-halt:65-66` — a sit finding, or a ruling?

**Question.** Yes or no: relabel it as a ruling?

**What the document says.** `docs/cfd-205-halt-beat.md:65-66`: *"Buildings-as-buildings,
feed, lamp and Foundry as actions, and Home writing landed. The walk did not. Recut so
only one action is live at a"*.

**What source says.** The audit's disposition, `docs/name-collisions-audit-2026-09-01.md:1256-1257`:
*"'Home writing landed. The walk did not.' as a sit finding (it is a ruling; say so)"*.
`KILLS.md:41-45` records the sit verbatim as *"Lit the lamp and started the foundry."* —
the walk sentence is not in it.

**Blocked.** Nothing.

**Orchestrator's read.** *Say so.* The distinction between what the player did and what you
concluded is the one this project keeps losing, and the verbatim is right there to
separate them.

**Cost of getting it wrong.** A ruling reads as an observation and gets re-litigated.

---

## 26. `cfd-209`'s appended pre-registration note — does it read as yours?

**Question.** Yes or no: does the note stand as written, or do you strike it?

**What the document says.** `docs/cfd-209-beat.md:423` (the audit cited `:396`; **drifted by
27 lines**, corrected here) — a dated parenthetical opening *"(Recorded 2026-09-01, after
the sit, and the sentence above is left as it was pre-registered: 'the free Halt' is the
line board's route …"* and closing *"This is the name collision the cfd-210 re-cut found
one beat downstream, recorded here at its upstream.)"* The pre-registered sentence it sits
under is at `:395`: *"The run came home short and the larder covered it."*

**What source says.** `docs/name-collisions-audit-2026-09-01.md:1228-1231`: *"the synthesis
re-worded the pre-registered null; the orchestrator refused that form and appended a dated
note beneath the sentence kept verbatim, because a pre-registration is the one sentence a
beat must not rewrite after the sit it pre-registered (canon §7.5's whole point); **David
may strike the note.**"*

**Blocked.** Nothing; it is already landed at `5ad4c6f`.

**Orchestrator's read.** *Leave it.* The refusal to rewrite the pre-registration was
right — it is exactly what §7.5 protects — and the note carries the correction without
touching the sentence.

**Cost of getting it wrong.** A note in your voice that you did not write, on a ruled
pre-registration.

---

## 27. The desk PASSED markers in the inherited-board tables

**Question.** Yes or no: strike them from both tables, or keep both?

**What the document says.** `docs/cfd-209-beat.md:104-105` and `docs/cfd-210-beat.md:85-86`
(the audit cited `cfd-210:80-81`; **drifted by five lines**, corrected here) both carry
*"| `/dawnspur-line/` **PASSED** | `18b1324f` | `b6f21db0` |"* and *"|
`/dawnspur-dispatch/` **PASSED** | `576ce2b6` | `31aead60` |"*, each table followed by a
parenthetical explaining that earlier cuts marked only the four city passes.

**What source says.** The audit's own instruction: *"the desk PASSED markers (landed in
both tables; strike both or neither)"*
(`docs/name-collisions-audit-2026-09-01.md:1259-1261`).

**Blocked.** Nothing.

**Orchestrator's read.** *Keep both.* The tables claim to list what the board inherits, and
the §7 rows genuinely require those two passes — the parentheticals at `:107-112` and
`:88` already say so with the shas re-derived.

**Cost of getting it wrong.** Two city beats claim a desk inheritance they cannot support,
or drop one they can.

---

## 28. `cfd-196`'s three register deviations

**Question.** Yes or no: are the three deviations accepted as the passed record's register?

**What the document says.** `docs/cfd-196-beat.md:23-42` records them itself: *"1. **Neither
terminal register names the weather.**"*; *"2. **The paid register carries a fourth figure
— the turned-back count.**"*; and the third, *"the registers now key on"* cost rather than
the implementer's first test.

**What source says.** `docs/name-collisions-audit-2026-09-01.md:977-978` records the third
as **built** — *"cfd-196's third register deviation and the roster write's dating
(`ed7f49d` → `2a3e9dd`)"* — leaving the acceptance question for the pair.

**Blocked.** Nothing; the board passed 2026-08-26.

**Orchestrator's read.** *Accept them.* The board passed with those registers; the beat now
records the deviations against the signed example rather than hiding them, which is the
correct shape for a passed record.

**Cost of getting it wrong.** A passed board's record disagrees with the board.

---

## 29. `cfd-176:19` and `:41` — the two ellipsis readings

**Question.** Two picks: does *"GOODS / B / HOLD are not on the same row"* get corrected,
and does *"does not die unless fed"* get scoped?

**What source says.** `docs/sweep-2026-09-02.md:887-894`: *"Sweeper SUPERSEDE, refuter DAVID
on both. Both are ellipsis/scope readings, not measured errors: the board facts are
confirmed either way … **Not built.**"* With one measured caution: *"`#pads` holds **four**
buttons, not three — `index.html:157` `id=\"go\"` / LEAVE is on the civic row too … so a
replacement naming only GOODS / B / HOLD would need superseding again the first time
someone counted the row."*

**Blocked.** Nothing.

**Orchestrator's read.** *Leave both.* The board facts hold on either reading and the
sweep's own caution shows the "fix" introduces a new error; this is the ellipsis class you
already ruled DAVID once.

**Cost of getting it wrong.** A supersession that itself needs superseding.

---

## 30. `wait` — MEDIUM or HIGH?

**Question.** Pick one severity.

**What the document says.** `docs/name-collisions-audit-2026-09-01.md:806-810`: *"The reviewer
reads MEDIUM on the report's own grounds (it does not end the sitting; the timer's effect
is the documented design) and says HIGH is defensible if the pin count dominates (twelve
test files freeze heat's bytes, so the divergence can never be conformed, only renamed on
the other eleven). Both readings are recorded; the guard pins the mechanism regardless of
the label."*

**Blocked.** Nothing — explicitly. The guard pins the mechanism either way.

**Orchestrator's read.** *MEDIUM.* The reviewer refuted the REFUTED sentence the HIGH rested
on, and the pin-count argument is about how hard it is to fix, not how bad it is. Note the
mechanism's origin is now measured: `/dawnspur-heat/` is the board the timer comes from
(entry #16, row two).

**Cost of getting it wrong.** A label, only — this is the cheapest call on the list.

---

## 31. The lineage membership declaration

**Question.** Yes or no: confirm the orchestrator's 2026-09-01 ruling that `dawnspur-site`
and `dawnspur-halt` sit on the **city** side?

**What the document says.** `test/lexicon-ledger.js:22-32`: *"MEMBERSHIP IS DECLARED, NEVER
INFERRED. Three sweeps inferred three memberships from the sims' headers and the seam count
moved 5 / 22 / 31 with the choice. The lists below are the orchestrator's ruling,
2026-09-01."* And the reasoning: *"halt is the city lineage's ancestor … The cost of this
placement is one row — `litJobs` — which crosses only because site carries it beside heat,
scale, line and storm."*

**What source says.** `docs/name-collisions-audit-2026-09-01.md:795`: *"The rulings it carries
as **declared, not blocked**: `armed`; the membership."*

**Blocked.** Nothing — declared, not blocked, and the guard is green at HEAD.

**Orchestrator's read.** *Confirm it.* The seam count moving 5/22/31 with the choice is
exactly why it must be declared rather than inferred, and the stated cost of one crossing
row is the smallest of the three options.

**Cost of getting it wrong.** The name-collision guard's seam count grades the wrong
surface, and real crossings get buried among benign twins.

---

## 32. Canon §5's `(d)` gloss (optional)

**Question.** Pick one: does *"(d)"* mean *"none of the three stakes"*, or *"the reserve
without the storm"*?

**What the document says.** `docs/mechanisms-recommitted.md:170` (the sweep cited `:158`;
**drifted by 12 lines**): *"**Proposed answer: (d) now, (c) next — and (a) and (b) arrive
INSIDE the storm sitting as what a storm does, never as standalone mechanics.**"* The
question above it at `:167-168` letters only three options.

**What source says.** `docs/sweep-2026-09-02.md:534-537`: *"the question at `:155-156`
letters only three options and '(d)' has no antecedent in the file; the shipped recut
carries the reserve, so '(d)' cannot mean 'none'. … One line; §5 is SIGNED, so glossing it
is his."*

**Blocked.** Nothing. Marked optional by the sweep itself.

**Orchestrator's read.** *"The reserve without the storm"* — the shipped recut carries the
reserve, which rules out "none"; but it is a signed section and the gloss is yours.

**Cost of getting it wrong.** One line of a SIGNED section stays unreadable.

---

## 33. `KILLS.md` ordering (conditional on #7)

**Question.** If the passes land: descending (newest first), or appended oldest-last?

**What the document says.** `C:\tmp\kills-proposal\KILLS-proposal.md:49-53`: *"`KILLS.md`'s
two sections disagree about order: the pre-host section runs oldest-first, the hosted era
runs newest-first … If you want it appended oldest-last instead, say so and the anchors
change, not the text."*

**What source says.** **Effectively settled for the kills by events** — `b95a9c9` landed
the three new entries descending, and `KILLS.md` at HEAD runs 2026-08-31, 08-30, 08-30,
08-30, 08-28/29, 08-25, 08-24, 08-24. Only the passes are still open.

**Blocked.** Only the pass anchors, and only if #7 is yes.

**Orchestrator's read.** *Descending.* Already the hosted era's observed order and now
reinforced by a landing.

**Cost of getting it wrong.** Re-cut anchors; no substantive loss.

---

## 34. Five note-only calls, each with a default already proposed

Grouped because each is a one-line register call, the record already states the
recommendation, and none blocks anything. All five line numbers re-derived at HEAD.

| call | at HEAD | what the record proposes |
| --- | --- | --- |
| `cfd-207:92` *"can-do: Put them up. Consist is already home with the herbs"* — "inherited, not replayed" | `docs/cfd-207-beat.md:92` | note only (audit `:1257`) |
| `cfd-207:75` *"Player action: tap to collect."* | `docs/cfd-207-beat.md:75` | stands; `cfd-208` records the split (audit `:1257-1258`) |
| `cfd-208` *"Mosswake is where the light is"* | `docs/cfd-208-beat.md:464` — **audit cited `:452`, drifted by 12** | bytes govern; figurative (audit `:1258-1259`) |
| `cfd-210` *"64 for 14, stake 0"* | `docs/cfd-210-beat.md:177` and `:274` — **audit cited `:168`; two occurrences, not one** | leave (audit `:1262`) |
| `cfd-201:37` *"Canon §7 forbids it by name"* | `docs/cfd-201-beat.md:37` | the citation itself is the question (audit `:1050-1051`) |

**Blocked.** Nothing, for any of the five.

**Orchestrator's read.** *Take the record's default on all five.* Each was reached by two
readers and none of the five changes a measured number.

**Cost of getting it wrong.** Register drift in beats that are already passed and pinned.

---

# Tier 4 — Record corrections; nothing is blocked (6)

## 35. The sweep's fourteen canon line cites are all stale

**Nothing is blocked; this is a record correction.** `docs/sweep-2026-09-02.md:523-600` asks
you to rule on canon lines that moved when its own agreed edit set landed at `b8d6da3`
(749 to 902 lines). The mapping, re-derived at HEAD:

| sweep cites | at HEAD | sweep cites | at HEAD |
| --- | --- | --- | --- |
| `:12` | `:12` (unmoved) | `:598` | `:740` |
| `:158` | `:170` | `:606` | `:752` |
| `:401` | `:495` | `:641` | `:795` |
| `:427` | `:530` | `:708-720` | `:861-873` |
| `:444` | `:547` | `:710` | `:863` |
| `:481` | `:593` | `:718` | `:871` |
| `:551` | `:666` | `:724` | `:877` |

The sweep's own *Overtaken at review* section (`:482-488`) de-lined six `KILLS.md` cites
for exactly this reason and closed with *"That was luck the first time and a rule the
second"* — and then published fourteen canon line cites into a file its own edit set was
about to grow by 153 lines.

**Orchestrator's read.** *Re-point them in place, in the sweep record.* The correction is
mechanical and the record is append-only, so a dated correction block beneath the list is
the form.

**Cost of getting it wrong.** Fourteen decisions get ruled against the wrong lines.

---

## 36. The audit's beat cites have drifted too

**Nothing is blocked; this is a record correction.** Corrections carried inline above:
`cfd-200:1076-1093` → `:1139-1156` **and wrong at its own tree**; `cfd-205:207/:208` →
`:214/:215`; `cfd-205:268/:271` → `:275/:278`; `cfd-205-halt:203-206` → `:207/:209/:210`;
`cfd-208:452` → `:464`; `cfd-209:396` → `:423`; `cfd-210:80-81` → `:85-86`; `cfd-210:168` →
`:177` and `:274`; `cfd-208:278` (rim) → `:288`; `cfd-201:1017/:1386` (halt bridge) →
`:1052/:1442`; `KILLS.md:63` → `:114`.

---

## 37. The audit's §5 says the `cfd-201` halt bridge was superseded. It was not.

**Nothing is blocked; this is a record correction.**
`docs/name-collisions-audit-2026-09-01.md:825-826` reads: *"**`docs/cfd-201-beat.md:1017` and
`:1386`, and `docs/cfd-209-beat.md:396`** carry the halt bridge in the design record
(§1.4). Superseded in place by the sweep — §6."* Measured at HEAD: `cfd-209`'s **was**
superseded (`:423`), but `cfd-201`'s two are at `:1052` and `:1442` with **no supersession
marker** — and §6 of the same document says so at `:991-996`: *"PWA pack → DESK — **not
built**"*, with the refuter ruling NONE and the orchestrator concurring. §5 and §6 of one
document disagree about one fact.

**Orchestrator's read.** *Correct §5 to match §6.* §6 is the measured half.

---

## 38. The audit still records `/dawnspur-heat/` as never swept

**Nothing is blocked; this is a record correction.**
`docs/name-collisions-audit-2026-09-01.md:864-865`: *"**`/dawnspur-heat/` cites no beat** —
its spec is not in this repository — and was not swept."* The "was not swept" half is false
since `97f3ecd`. The "cites no beat" half is still true — `sit/dawnspur-heat/sim.js` has no
`Spec:` line, verified. The CFD-176 sweep filed this itself (`docs/sweep-2026-09-02.md:920-923`)
and did not build it, as out of glob.

---

## 39. The CFD-176 record promises a David list it does not contain

**Nothing is blocked; this is a record correction — but read it, because ten calls are
sitting behind it.** `docs/sweep-2026-09-02.md:916-917`: *"**David's calls: nine on the
beat, two filings out of glob.** Listed separately, one line each."* **There is no such
list** — not in the landed document (923 lines, checked end to end) and not in the session
scratch it came from (`C:\tmp\sweep176\record.md`, 243 lines, same sentence, same absence).
The nine are recoverable only from `C:\tmp\sweep176\results.json`, and are the ones I have
reconstructed as entries #12, #13, #16, #20 and #29 above, plus the Seat precedent split
folded into #9.

**Orchestrator's read.** *Append the list to the record, from `results.json`.* A record
that names a count and omits the enumeration is the drift mechanism this project already
documents.

---

## 40. Two low-severity canon figures, and one upstream filing

**Nothing is blocked; these are record corrections.**

- **`docs/mechanisms-recommitted.md:740`** (sweep cited `:598`) — *"**one case out of six**,
  permits `/dawnspur-halt/` with zero margin"*. The sweep: *"the six sequences are
  enumerated nowhere and cannot be reconstructed; the two claims beside it reproduce · Name
  the six, or mark the figure unreproducible. **Do not let a reconstruction stand in.**"*
  My read: *mark it unreproducible* — prefer null to a plausible number.
- **`docs/mechanisms-recommitted.md:795`** (sweep cited `:641`) — *"**because David asked for
  copy, verbatim, three sits running**"*. The sweep: two of three in-repo verbatims support
  it; the fourth sit's is you naming copy that worked. A Linear lookup, not a judgement.
  My read: *narrow to two of three unless Linear says otherwise.*
- **The halt bridge's seed is upstream and is not a boards change.** Verified at HEAD of
  `C:\dev\skyrail` (`840dbd0`): `src/content.js:381` files the home under `ROUTES` as
  *"The home halt, newly awake, with warm lamps, market gardens, and the first working
  platform."* — the desk lineage inherited a **route** to the place the city lineage calls
  home. Recorded at `docs/name-collisions-audit-2026-09-01.md:827-831`. My read: *file it on
  the PWA side and leave the boards alone*; a note in one beat fixes the symptom in one
  file.

---

# Overtaken by events — do not rule on these

Ten commits landed on 2026-09-02 (`git log --oneline 796d9a2..HEAD`, dated). Six calls in
the source lists were ruled, landed, or made moot by them.

| call, as written | where it was raised | what happened |
| --- | --- | --- |
| **The hub tags.** *"`public/index.html:37-61` five PASSED boards tagged 'not yet sat' (a hub commit)"* | audit `:1264` | **Ruled and landed at `079b2bd`.** Measured at HEAD: `:37`, `:43`, `:49`, `:55`, `:61` all read *"live — passed its sit"*; `:67` reads *"sat 2026-08-30, not passed"*; `:73` *"sat five times, stopped without a pass"*. Only `:31` (`/two-ways-from-here/`) still says *"not yet sat"*, correctly. |
| **`public/index.html:79`'s "not yet sat" on a passed board** — half of the desk half's "shipped-bytes pair" | audit `:1054-1055` | Same commit. `:79` now reads *"live — passed its sit 2026-08-28"*. **The other half of that pair — the stale MANIFEST pin — is still open as entry #11.** |
| **The two missing kills and the storm stop** — *"`KILLS.md`'s five missing passes, two missing kills and the storm stop"* | audit `:1262-1263`, sweep `:602-605`, KILLS proposal | **Landed at `b95a9c9`.** `KILLS.md` at HEAD carries they-remember cut 0 (`:26`), the site fail (`:55`) and the storm's five (`:68`), 119 lines and ten `Recut:` lines. **The five passes are still open as entry #7.** |
| **`KILLS.md:63` cites a beat that did not exist on main** | audit `:832-836` | **Resolved at `758a249`** — the beat merged from PR #3 with a provenance header at `f3f6222`; the cite resolves and now sits at `KILLS.md:114`. The audit already carries the supersession. |
| **Canon `s7.4-M6`** — the *"where every recut decision and its shas are recorded"* over-claim | sweep `:469-475` | **Withdrawn at review** by the sweep itself, because `b95a9c9` discharged most of it mid-run. The residual (four pre-host entries with no shas) folds into entry #7. |
| **Canon §7.4's `:604` vs `:623-635` self-inconsistency** — *"two intent questions"* vs the blessed TEND text | audit `:1026-1028`, recorded as out of scope | **Resolved at `b8d6da3`.** At HEAD `:745-751` names the trim question as signed at `30ff642`, identifies the second as the CFD-203 TEND question, and records that the trim question was recut into that shape at `16ac8e5` — *"so at HEAD that card asks none in the intent form."* |

**One partial reversal worth knowing.** The CFD-176 sweep asked you to hold the
`cfd-176:11` Seat supersession *"behind his word if he wants the convention uniform"*
(`docs/sweep-2026-09-02.md:873-874`). It landed anyway at `b232440`. That is why entry #9
is now *"make it uniform"* rather than *"should the first one land"* — the precedent is
already set in the tree, and five beats are on the other side of it.

---

# Measurement provenance, and one thing that moved under me

Every quotation and every line number above was re-derived by me from the working tree,
not copied from a record. Read-only throughout: `git show`, `git log`, `grep`, `awk` and
`sha256sum` only; no write to either repository, no git write, no server, no browser, no
deploy. Scratch under `C:\tmp\decisions\`.

**HEAD moved twice mid-task.** I began at `97f3ecd` and finished re-verifying at
**`c32ff52`**. Two commits landed underneath me:

- **`919b6be`** — *"test(lexicon): the guard's second fix pass … 22 to 23 tests, 716 to
  717"* — 336 lines across `test/lexicon-derive.js`, `test/lexicon-ledger.js` and
  `test/lexicon.test.js`.
- **`c32ff52`** — *"docs(canon): repair three corruptions `b8d6da3` introduced — a RULED
  sentence was deleted, a clause dropped, a line duplicated."*

**What I re-verified at `c32ff52`, after the moves:** all fourteen canon line numbers used
in entries #4, #5, #6, #8, #15, #18, #32 and #35 still resolve to the same lines, and
`docs/mechanisms-recommitted.md` is 902 lines before and after. **What I corrected:** the
`armed` ledger row (entry #14) moved from `:260-266` to `:322-328`.

**One thing `c32ff52` says that bears on the list.** The canon edit set that landed
`b8d6da3` — the 24 supersessions the sweep built — **introduced three corruptions,
including the deletion of a RULED sentence.** That is not a decision waiting on you, but
it is the second time in two days that a correction pass has damaged the file it was
correcting, and entries #5 and #35 both ask you to ratify things that set landed.

**Stale in the audit, and worth a line when it is next touched:**
`docs/name-collisions-audit-2026-09-01.md:782` publishes *"**22 tests; suite 694 → 716.**"*
The guard is 23 tests and the suite is 717 as of `919b6be`.

**If more than a few hours pass before this is ruled on, re-derive the canon line numbers
before quoting them.** That file has moved 153 lines in one day and was edited three times
while this list was being written.

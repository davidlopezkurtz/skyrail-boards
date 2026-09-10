# Open decisions — 2026-09-02

**Forty-six decisions waiting on David — forty gathered from four records on 2026-09-02
and ranked by what each one blocks, and six added 2026-09-08.** Assembled 2026-09-02 from 78 raw call-instances across ten lists: the
name-collision ledger's §5 and §6 dispositions and its two do-not-average blocks; the
canon sweep's and the CFD-176 sweep's David lists in `docs/sweep-2026-09-02.md`; and
the `KILLS.md` pass proposal. Six calls were overtaken by commits on 2026-09-02 and are
in their own section rather than the list. *(2026-09-08: entry 41 added — the next card's
scope, which canon §7.6 says is owed before a cut; entries 42–46 added the same day from the DOM
namespace sweep's David list. Forty-six entries, forty-five open.)*

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

## Read this first — the open decisions in plain terms (2026-09-09)

Every open entry below now opens with an **In plain terms** block: the question in one
sentence, the options with what each costs, the orchestrator's read marked as such, what
stays blocked if it is not decided, and how much deciding costs. Each block was written
from the entry and checked twice against it by independent reviewers; where an entry itself
does not say enough, the block says so under *What the entry does not say*.

- Nine of the forty-five actually hold up work: the next card cannot be cut (41), CFD-200
  cannot be signed or cut (1, 2, 3), the next recut is held by your own signing promise (6),
  this wave's rulebook edits are unratified (5), and two landings wait on a word (7 with 33,
  and 21).
- Seventeen more are documents saying something false right now — the rulebook grades the
  heat board two opposite ways (12), a live board says "undefined" to screen-reader players
  (42), six beats forbid merging boards that already passed (9). Nothing is blocked by them,
  but each is a wrong sentence a future board can inherit.
- The remaining nineteen are labels, conventions and record corrections; nothing happens if
  they wait, and most are a one-word yes.
- If you decide nothing: no new board gets cut, CFD-200 stays unsigned, the next recut runs
  under a gate nobody honoured, and every later board takes whichever reading of the
  heat-vs-air rule its author opens first.
- Start with 41 and 1 — the two design calls the rest hang off — then 5, 6 and 7, which are
  three yes/no's and unblock the rulebook edits, the next recut and five ledger entries in
  about a minute.
- Several numbers are one question: 7 and 33 (passes in the kills ledger), 16 and 29
  (heat-beat sentences), 24 and 25 (halt-walk beat labels), 36 to 38 (the name audit).
- Card 20 must not be answered before 12 — adding a citation to the heat beat would
  silently pick a side of the contradiction for you.
- The orchestrator offers a read on most cards and the card marks it as such; on 5, 12 and
  the last part of 41 it offers none — those are yours alone.

**Decide first** (deciding it unblocks work): 41, 1, 3, 2, 6, 5, 7, 33, 21.
**Publishing something wrong today** (a document says something false until it is decided): 12, 42, 15, 9, 46, 8, 13, 18, 16, 29, 10, 11, 17, 24, 25, 26, 40.
**Can wait** (convention, register, record): 35, 20, 22, 23, 43, 44, 45, 31, 14, 30, 19, 27, 28, 34, 32, 36, 37, 38, 39.
**One decision wearing several numbers:** 7 and 33; 16 and 29; 24 and 25; 36 and 37 and 38.

---
# Decisions waiting on David — Skyrail boards, measured at `97f3ecd`, re-verified at `c32ff52`; entry 41 at `c8c4546`

**45 open, 1 closed.** *(Entries 41–46 added 2026-09-08. Entry 4 RULED and carried out 2026-09-03
at `20bf043`; it took the sweep's calls 12 and 13 with it.)* **Eight** block work — a cut, a signature, a built-and-held edit, or a
landing that is drafted and ready. The rest split into thirteen that publish something
measurably wrong to whoever reads the file next, eighteen convention-and-register calls
where measurement genuinely does not decide, and six record corrections that need no
ruling at all.

**78 raw call-instances** were collected from ten lists across four documents;
deduplicated to **40 entries** *(46 with entries 41–46, added 2026-09-08)*. The heavy collisions were the ones expected — `armed`,
the lineage membership, the KILLS completeness question, the canon-check retroactivity
question and the `rim` alias — plus one that was not: the **discharged Seat gate**,
raised once in the audit and once in the CFD-176 sweep, which measurement widens from
one beat to six.

**The single most consequential is #1: what CFD-200's parent is now.** CFD-200's own
re-base trigger has fired — canon's, which fires only on a kill, has not *(corrected 2026-09-09
from entry 1's own body; this read "Canon's own contingency clause has already fired")* — and it
fires at a board that never passed. CFD-200 cannot be signed until that is answered, and the board's whole inherited economy hangs
off the answer — which is also why #2 and #3 are the same board.

**Line numbers.** Every citation below was re-derived at `97f3ecd` by me *(entries 41–46's at
`c8c4546` and `925d23a`, 2026-09-08)*. The underlying
files moved hard on 2026-09-02: `docs/mechanisms-recommitted.md` went 749 to 902 lines
at `b8d6da3`, `KILLS.md` went 67 to 119 at `b95a9c9`, and `docs/cfd-200-beat.md` is 1,352
lines against the 1,275 the sweep measured. **Every line number in the sweep's own
"David's calls" list is stale** — thirteen of fourteen. The drift table is entry 39.

**Context.** `/two-ways-from-here/` (CFD-210) passed its sit on 2026-09-02 (`c1c41df`), and at
`c8c4546` the hub marks it *"live — passed its sit 2026-09-02"* (`public/index.html:37`); no
board is marked not-yet-sat *(superseded 2026-09-08 — this read "the one board the hub still
marks 'live — new sitting, not yet sat' (`public/index.html:31`) and the one that kept 'David
sits first.' through `079b2bd`", true at `97f3ecd`)*. The sit was an action, not a decision, so
it was not numbered below — but most of Tier 3 was waiting behind it.

---

# Tier 1 — Blocks a cut, a signature, or a built edit (9; **8 open**, entry 4 closed 2026-09-03, entry 41 added 2026-09-08)

## 1. CFD-200's parent, after the storm stopped unpassed

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Is CFD-200's parent (a) the storm board, as its beat already says, (b) the last board
anywhere that actually passed its sit — Dice at the Places when this question was written,
a city board — or (c) Dawnspur Line, the join board the rulebook names as its fallback —
and may "the last passed board" be a board from the other lineage at all?

- *Why:* The rulebook says a board's parent is the last passed board, named when the beat
  is signed, and CFD-200 was written to sign after the storm board passed; but the storm was
  sat five times and stopped, neither passed nor killed. CFD-200's own beat says to re-base
  if the storm does not pass (which has happened), while the rulebook says to re-base only if
  the storm is killed (which has not), so the two texts point different ways and the parent
  cannot be named.
- *Options:*
  a. **(a) The storm board, as written** — CFD-200 keeps inheriting the storm's five sittings
     — its weather, its economy — exactly as its beat assumes. *Costs:* Its parent is a board
     that never passed, so the rulebook's own "last passed board" rule needs an explicit
     exception written down.
  b. **(b) The last board that actually passed — Dice at the Places when this was written** —
     The parent is the most recent board anywhere that truly passed its sit. That was Dice at
     the Places when the entry was measured; two more city boards (Two Ways from Here, Still
     Standing) have passed since, so under this reading the parent is whichever city board
     passed last. *Costs:* That board is in the city lineage; a desk board would inherit an
     economy and interface the desk does not share, and the rule would be read as crossing the
     desk/city seam.
  c. **(c) Dawnspur Line, the join board** — Take the rulebook's own fallback: both the
     rulebook and the beat say CFD-200 re-bases onto "whatever did pass", and the rulebook adds
     that this would be the join board. Dawnspur Line is the last desk board that passed
     (2026-08-28), so this is the fallback read within the desk rather than across the seam.
     *Costs:* The rulebook's fallback fires on a kill, and the storm was stopped, not killed;
     only CFD-200's beat's looser trigger — "if the storm does not pass" — has fired. Choosing
     (c) means letting the beat's wording rather than the rulebook's govern, or ruling that a
     stop counts as a kill.
- *The orchestrator's read, not a ruling:* The orchestrator's read is (a) with an explicit
  exception recorded: the storm's five sittings are what CFD-200 actually inherits, and
  re-basing onto a city board would import a lineage the desk does not share. *Yours:*
  Whether a board that never passed may be a parent under the rulebook's own rule, and
  whether "the last passed board" reaches across the desk/city seam at all.
- *If undecided:* CFD-200 cannot be signed. If the wrong parent is chosen it inherits the
  wrong board's economy — the same class of defect the 2026-09-01 sweep already found four
  serious cases of in this beat.
- *What the entry does not say:* Three things the entry does not settle. The ledger's own
  summary says the rulebook's fallback clause "has already fired", while this entry's body
  says only the beat's trigger (not passed) has fired and the rulebook's (killed) has not;
  the card follows the entry's body. The entry names Dice at the Places as "the last board
  that actually passed", which was true when it was measured but is not now — the ledger's
  context records Two Ways from Here passing 2026-09-02 and the hub marks Still Standing
  passed 2026-09-04, both city — so option (b) is really a rule ("whichever board passed
  last") rather than a named board. And both texts send the fallback to "whatever did pass"
  without saying whether that is counted across both lineages or within the desk — which is
  why (b) and (c) are the same fallback read two ways, and the seam half of the question
  decides between them.

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
without a kill** — KILLS.md's 2026-08-28/29 Dawnspur Storm entry (*"five sits, five recuts, stopped without a pass"*),
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Yes or no: rewrite the turn-by-turn sky trace in CFD-200's beat to the sequence the game
actually produces, and re-argue the three design paragraphs that price the Engineer on it?

- *Why:* The beat's trace has the player send to Rustfall on turn 5 under a clear sky, with
  two of the three pushes landing under a storm, and the Engineer — the board's one genuinely
  new job — is priced at 6 marks as repair, on the argument that repair can only earn its
  price under the storm, so the job stands on the storm meeting the convoy in the yard. When
  the same path is driven on the parent board, the send falls on turn 8 under the storm and
  the pushes on turns 10 to 12 are clear, so the argument is upside down.
- *Options:*
  a. **Yes — rewrite the trace, then re-argue** — The table is replaced with the measured
     sequence and the Engineer paragraphs are argued again from it. *Costs:* The Engineer's
     "warning first" framing may change, and the cut waits until that work is done.
  b. **No — leave it as written** — The beat keeps its trace and the argument standing on it.
     *Costs:* The board ships with its central new job priced against a weather sequence the
     game does not produce.
- *The orchestrator's read, not a ruling:* The orchestrator's read is rewrite, then
  re-argue — nobody disputes the measurement, and if the corrected trace puts the storm
  before the yard opens, that is worth knowing before the cut rather than after. *Yours:* The
  trace is yours to rewrite because design paragraphs stand on it; what is protected is your
  right to change that argument, not the number.
- *If undecided:* CFD-200's cut stays blocked. Left as is, a board ships whose central new
  job was priced against weather the game does not produce.

**Question.** Yes or no: rewrite the trace table at `docs/cfd-200-beat.md:1139-1149` to the
measured sequence, and re-argue the three design paragraphs that rest on it?

**What the document says.** `docs/cfd-200-beat.md:1145-1149` traces turn 5 SEND under
clear, pushes at turns 7, 8, 9 with `| 8 | **STORM** |` and `| 9 | **STORM** |`, then
`:1151-1152` concludes: *"Two of the three pushes land under a storm, and the bird is on
the board for two turns before the first of them."*

**What source says.** `docs/name-collisions-audit-2026-09-01.md:943-945`: *"the
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Does CFD-200 carry, narrow, or refuse the storm parent's own ending — the one that arms
once the terrace is topped and fires when a chartered cargo comes home out of a storm?

- *Why:* CFD-200's beat says it carries the whole storm board, and its own end-sentences
  are all about the yard and the Engineer; it never mentions the terrace, topping, or the
  storm board's ending. That ending is reachable in play and would close the sitting before
  the player ever sends to Rustfall, so the board has two live endings and no ruling on which
  governs.
- *Options:*
  a. **Carry** — The storm's topping ending stays live on CFD-200 exactly as inherited.
     *Costs:* A player can end the sitting before the board's own subject ever appears.
  b. **Narrow** — The inherited ending is kept but confined so it cannot fire before the yard
     is in play. *Costs:* A design edit to an inherited ending the beat never mentions, and the
     entry does not say what the narrowed form is.
  c. **Refuse** — CFD-200 drops the parent's ending and keeps only its own. *Costs:* The
     board no longer carries the storm board whole, as its beat currently claims.
- *The orchestrator's read, not a ruling:* The orchestrator's read is narrow it — the
  topping ending has nothing to do with the yard, and carrying it whole hands the player a
  way out before Rustfall — but narrow-versus-refuse is a design call, not a measurement.
  *Yours:* Which of narrow or refuse is right.
- *If undecided:* The cut stays blocked — a board with two live endings and no ruling on
  which governs is not implementable. If wrong, a player ends the first sitting before
  reaching Rustfall and the board is never sat on its own subject.
- *What the entry does not say:* The entry frames "narrow" as an option but does not
  describe what the narrowed ending would be.

**Question.** Pick one: does CFD-200 **carry**, **narrow**, or **refuse** the storm
parent's own arming stop?

**What the document says.** `docs/cfd-200-beat.md:592-594` gives the Engineer terminal
register (*"The Engineer got the parts car's coupling back under it. Two cars aboard,
worth 21."*) and `:625-630` the clean and paid registers — the beat's terminal vocabulary,
none of which mentions UP or topping.

**What source says.** `docs/name-collisions-audit-2026-09-01.md:953-956`, graded **HIGH**:
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

**RULED — David, 2026-09-03. All three parts, as one edit, and calls 12 and 13 with
them.** *"Clear §7.5 first, in the same pass. Canon is first-read for every beat
author, and shipping a new beat whose authority document contains an example that
fails its own rule means whoever reads it next either applies the rule wrong or
discovers the contradiction and trusts the section less. Both are worse than one
ruling now. This is the canon-ordering finding again: the error sits early in the
reading order and the correction sits in a beat nobody reaches."*

**Carried out at `20bf043`.** The held file was NOT landed as built: its own opening
carried the *"no completion count separates"* claim the sweep measured false, so the
beat's narrower line — *"All four log as 'the sitting ended.'"* — was used instead.
The section now states `pressOns` outright and shows it **resolves none of the
split**, so the counter demonstrates the third prohibition rather than convicting
the example. One precision defect in the fix's own first draft was caught before
landing (`pressOns` is non-zero, not 1 — a repeat presser reaches 4). A closing
paragraph recording how the example RESOLVED was added beyond the ruling and
flagged as strikeable. **CLOSED.**

---

## 5. §7.4's status word — RULED or WRITTEN DOWN?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Yes or no: did you rule canon §7.4 — a recut may not be the same kind as the one that just
failed — on 2026-08-31?

- *Why:* The rulebook's own heading calls §7.4 "written down 2026-08-31, in use since
  2026-08-29", while the storm beat, landed a day later, says "ruled 2026-08-31"; twelve
  other places cite it with no status word at all. Which is true is a fact about what you
  did, and only you hold it.
- *Options:*
  a. **Yes, I ruled it** — The rulebook heading is the stale text, and every change to §7.4
     that this wave's sweep landed becomes yours to accept. *Costs:* A batch of already-landed
     rulebook edits needs your ratification.
  b. **No, it was only written down** — The storm beat's line is the thing to edit. *Costs:*
     Until it is edited, a beat publishes a ruling that was never made.
- *The orchestrator's read, not a ruling:* The orchestrator has no strong read — the
  repository holds one witness on each side, and neither is better evidence than your memory.
  *Yours:* All of it: whether you ruled it that day.
- *If undecided:* Acceptance of the §7.4 changes landed this wave stays open — either those
  rulebook edits sit unratified, or a beat keeps claiming a ruling that was never made.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Is the rulebook's opening promise — "David signs this doc before any recut implements it" —
discharged by your signature on §5 plus the ruled §7 sections, or do sections 1 to 4 still
need signing before the next recut?

- *Why:* Section 5 was signed on 2026-08-25 and §§7.1, 7.2, 7.3 and 7.5 carry rulings in
  their headings, but sections 1 to 4 have no signature. The recuts that sentence was meant
  to gate have already shipped — the halt entries of 2026-08-30 — so the promise has been
  partly kept and partly bypassed.
- *Options:*
  a. **Discharged** — Your signature on §5 plus the rulings already in the §7 headings count
     as having kept that sentence's promise. *Costs:* Sections 1 to 4 are never signed as such.
  b. **Still owed** — Sections 1 to 4 get read and signed before the next recut. *Costs:* The
     next recut waits on that reading and signature.
- *The orchestrator's read, not a ruling:* The orchestrator's read is rule it discharged in
  a dated note and do not rewrite the sentence — rewriting it to match events would turn a
  promise you made into a description of a promise partly kept. *Yours:* Whether the promise
  as you made it is met by what has been signed so far.
- *If undecided:* The next recut proceeds under a gate nobody honoured, or the promise gets
  quietly edited into a description of events.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Yes or no: do the five boards that passed their sits — Dice at the Places, They Remember
cut 1, Herbs Larder, Mosswake Loop, and the Dawnspur Halt walk — get entries in the kills
ledger?

- *Why:* The ledger's header says it records kills; the passes live scattered across beats,
  commit memos and the rulebook, with no single place to look them up, and three rulebook
  sentences claim or lean on the ledger being complete, which it is not. The two missing
  kills and the storm's stop have since been added; the five pass entries are drafted,
  measured and ready, but deliberately left out until you say.
- *Options:*
  a. **Yes** — The five passes are added to the ledger alongside the kills (where in the file
     they go is a separate question, #33), and the file becomes the ledger of sittings. *Costs:*
     The file stops being one document with one job — it records sittings, not just kills.
  b. **No** — The ledger keeps one job — kills only. *Costs:* The five passes stay findable
     only on Linear, and the three rulebook sentences stay untrue.
- *The orchestrator's read, not a ruling:* The orchestrator's read is yes, and rename the
  heading — four pre-hosting entries already carry recut decisions with no build hash, so the
  file already fails its own header, and if it is becoming the ledger of sittings the heading
  should say so. *Yours:* The scope call itself: one document with one job, or one place
  where every sitting can be looked up.
- *If undecided:* The five drafted entries stay unlanded; the passes remain findable only
  on Linear and three rulebook sentences stay untrue.

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
the storm stop landed at `b95a9c9` and are in the file now (KILLS.md's
they-remember cut 0, dawnspur-site and dawnspur-storm entries, by date and board rather than by line).
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Is §5's stake (b) — an UP purchase that takes a run to deliver and can suffer before it
lands — still owed by a later sitting, discharged by the storm's stop, or superseded?

- *Why:* You signed §5 on 2026-08-25, and it says both the haul stake and the in-progress
  stake arrive inside the storm sitting. The storm arrived and carried only the haul: UP on
  that board is instant, the board holds no in-progress state at all, and the mechanic that
  would have housed stake (b) — UP going dark in a storm — was cut before signature by a
  paragraph that names stake (b) as what it was cutting.
- *Options:*
  a. **Owed** — A later sitting still has to carry an in-progress stake. *Costs:* An
     obligation lands on a sitting nobody has scoped.
  b. **Discharged** — The deliberate cut settles the commitment, and that is written down.
     *Costs:* A signed commitment is closed without ever having been met.
  c. **Superseded** — Something later replaces the §5 commitment rather than meeting or
     closing it. *Costs:* The signed section needs a forward pointer to whatever replaces it —
     and the entry does not say what that would be.
- *The orchestrator's read, not a ruling:* The orchestrator's read is discharged and
  recorded as such — the cut was deliberate and named what it was cutting, and carrying (b)
  forward as a debt would put an obligation on a sitting nobody has scoped. *Yours:* It is
  your signature, and the evidence does not decide what a signed commitment half-met becomes.
- *If undecided:* Nothing is blocked mechanically, but a signed rulebook commitment either
  silently expires or a future sitting inherits a stake nobody planned.
- *What the entry does not say:* The entry lists "superseded" as a third option but does
  not say what would supersede the commitment.

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

## 41. The next card's SCOPE — four questions, written before it is cut

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a design call.)*
Before the next card is cut, four things: which scope it tests — (a) whether forgone
options carry weight at all, (b) whether this lineage's forgone options (one tap at 64%,
inside a two-branch fork) carry weight, or (c) whether a branch priced 8.96 against
banking's +1 does; whether your "rather than a fourth fork" forbids only repeating the
question or also the fork shape itself; where the line sits between a branch that keeps
costing and a decay clock, and whether that line is yours to draw now or the beat's to
argue; and whether the next beat may end by recording that (b) has no board in this
lineage, rather than cutting one anyway.

- *Why:* Three cards have reached for the could-and-did read and none got it; the Still
  Standing sit found forgone options carried no weight in that sitting, and the rulebook's
  new §7.6 forbids a fourth board at the same question and says the next card must write down
  which question it answers before it is cut. The outcome the beat had written down in
  advance routed to a new question — whether a branch has to keep costing something to stay
  real — while the same beat refuses any timer, decay or expiry on a forgone branch and kills
  anything that moves with wall time, so what shape the next card may take is not settled.
- *Options:*
  a. **1(a) — do forgone options carry weight at all** — The card tests the general claim.
     *Costs:* The rulebook's own text says the narrow question — these forgone options, one tap,
     64%, in a two-branch fork — is what any board in this lineage can actually put under test.
     The orchestrator reads that as making (a) the "different shape" your own sentence routes
     to, not a board here.
  b. **1(b) — do THIS lineage's forgone options carry weight** — The card tests this fork:
     one tap at 64%, two branches. *Costs:* The beat lists, under what it did not measure,
     whether the forgone branch's words ever landed at all — they are seen only on a tap of that
     place. The orchestrator reads that as exposure owed before weight can be claimed.
  c. **1(c) — does a branch priced 8.96 against +1 carry weight** — The card tests the price.
     *Costs:* In the orchestrator's read, this is (b) with the price moved — a second variable
     introduced before the first is measured.
  d. **2 — "fourth fork" is the same prohibition in fewer words** — Your sentence and the
     rulebook's "fourth board" forbid the same thing: repeating the question. *Costs:* A fork
     shape stays available if it asks a different question.
  e. **2 — "fourth fork" adds a ban on the geometry** — Forks themselves are forbidden on the
     next card. *Costs:* A keeps-costing shape would have to attach its cost to something other
     than a fork's forgone branch, and whether such a shape exists is not something the record
     settles.
  f. **3 — the line is wall time versus player action** — A cost the player's own sends put
     up (stakes live in the run) is allowed; one that arrives while they are away (tended ground
     does not decay) is not. *Costs:* The beat has never argued that boundary against the four
     rules — no upkeep, no decay, stakes live in the run, fuel is not a standing bill — by name.
     A keeps-costing shape cut without that argument is a decay clock under a new name, which
     the beat has already refused.
  g. **3 — the line is somewhere else** — You draw a different boundary. *Costs:* The entry
     describes no other line; you would be drawing one the record has not marked.
  h. **3 — yours to draw now, or the beat's to argue** — Either you rule the boundary here,
     or the next beat must make the argument itself. *Costs:* Ruling now decides a design
     boundary before the beat exists; leaving it to the beat makes the cut wait on that
     argument.
  i. **4 — yes, a rendered refusal is acceptable** — If no keeps-costing shape clears the
     rules, the next beat may end by recording that (b) has no board in this lineage. *Costs:*
     No card is cut for that question here.
  j. **4 — no, cut a card regardless** — The next beat must produce a board. *Costs:* In the
     orchestrator's read, a card cut to avoid recording a refusal is read against the wrong
     question.
- *The orchestrator's read, not a ruling:* The orchestrator's read: scope (b), with the
  confound — did the forgone branch's words ever land — as the first thing the beat must
  show; your "fourth fork" is the same prohibition in fewer words; the line is wall time
  versus player action, but the beat must argue it against the four rules by name before a
  tile is placed; and ask for the refusal, because a card cut to avoid recording one is read
  against the wrong question. *Yours:* Whether the general question (a) is a board at all or
  only the accumulation of cards; whether (b) is the scope, or whether to leave forgone
  options and test something else; whether your sentence meant the question or the geometry;
  whether the line described is the one you meant; and the refusal question entirely.
- *If undecided:* The next card cannot be cut — it is nobody's until the scope is written
  down. If wrong: a card that measures the narrow thing and reports the general one, or a
  keeps-costing shape that is a decay clock under a new name, which the beat has already
  refused.

*(Added 2026-09-08 at `d107078`, citations re-derived at `c8c4546`. Numbered by arrival, placed
by tier: it blocks a cut. Every cite names its file: beat is `docs/cfd-212-still-standing-beat.md`,
canon is `docs/mechanisms-recommitted.md`, sim is `sit/still-standing/sim.js`.)*

**Question.** Four parts, one ruling.

1. **Scope.** Does the next card test **(a)** *whether forgone options carry weight at all*,
   **(b)** *whether THIS lineage's forgone options — one tap at 64%, inside a two-branch fork —
   carry weight*, or **(c)** *whether a branch priced 8.96 against banking's +1 does*?
2. **Does your "fourth fork" carry geometry?** Canon §7.6 forbids repeating the QUESTION and
   routes it to a different SHAPE; it says *"a fourth board"* (canon `:1003`), not a fork. Your
   sentence at beat `:201-204` ends *"rather than a fourth fork."* Is that the same prohibition in
   fewer words, or an added one on the board's geometry? Under the geometric reading a
   keeps-costing shape would have to attach its cost to something other than a fork's forgone
   branch, and whether such a shape exists is not something the record settles.
3. **Where is the line between a branch that keeps costing and a decay clock?** The outcome
   that fired was pre-registered to route to *"Whether a branch has to keep costing something
   to stay real"* (beat `:1197`, whole below). The same beat refuses a timer, decay or expiry on
   the forgone branch (beat `:1064`) and kills anything that moves with wall time (beat
   `:1141-1142`). Is the line *wall time versus player action* — a cost the player's own sends
   put up (R6) rather than one that arrives while they are away (R3) — and is it yours to draw
   here or the beat's to argue?
4. **Is a rendered refusal an acceptable outcome?** If no *keeps costing* shape clears R2, R3
   and R7, may the next beat end by recording that (b) has no board in this lineage, rather
   than by cutting one anyway? Asked, not taken.

**What the document says.** Canon §7.6, canon `:1018-1024`, whole:

> *"So the routing owes a scope, not just a question. Do forgone options carry weight? is a
> general claim; do THESE forgone options — one tap, 64%, inside a two-branch fork — carry
> weight? is what any board in this lineage can actually put under test. Write which one the
> next card is answering, before it is cut. A board that measures the narrow thing and reports
> the general one is the failure §7.5 exists to prevent, arriving one level up: not a sit read
> against the wrong split, but a whole card read against the wrong question."*

Its obligations, canon `:1002-1006`, whole:

> *"When the obstruction moves and the read does not, say so in the record and stop. Do not
> cut a fourth board at the same question. §7.4 already forbids repeating the KIND of a failed
> recut; this forbids repeating the QUESTION across cards. Route the underlying question to a
> different shape. The read was an instrument for something; that something survives the
> instrument's retirement."*

Canon `:969`: *"It is not a count, and phrasing it as a count would be the mistake."* The trap,
your words at canon `:1013-1016`, whole: *"we don't know whether the read never fires because
forgone options are weightless, or because this lineage's forgone options are one tap at 64%.
Those want different boards, and the temptation on the next card will be to answer the first
question with a board that can only answer the second."*

The beat. Your three scopes, beat `:133-135`, whole:

> *"it says forgone options didn't carry weight in this sitting. It doesn't yet say whether
> that's a property of forgone options generally, or of this fork, or of a fork whose branches
> were 8.96 against banking. One sit, one player, one fork."*

Your stopping sentence, beat `:201-204`, whole: *"Three cards have now reached for could-and-did
and none have gotten it. That's enough to stop reaching. The question it routes to, whether
forgone options carry weight at all, is a different question and should get a different shape
rather than a fourth fork."* Outcome 2's row, beat `:1197`, whole:

> *"He plays on and never mentions it, because it stopped mattering. David's words above. |
> Not the same as not noticing. A forgone option that is fully visible and simply irrelevant is
> a finding about whether forgone options carry weight at all. | A different question, and
> explicitly NOT a fourth attempt at this read. Whether a branch has to keep costing something
> to stay real — a new card, not a recut."*

So the row's own middle column reads outcome 2 as a finding about **(a)**, and its destination
is a fourth thing — a design question about what would make a forgone branch weigh — not any of
the three scopes. The refused row at beat `:1064` reads, as a row: **A timer, decay or expiry on
the forgone branch** | **REFUSED** — a decay clock wearing a decision's clothes | R2 / R3 / R4.
The kill line, beat `:1141-1142`, whole: *"Anything moves with wall time. A branch expires,
decays, or times out. `wait()` returns anything but false."* The confound, under *What is not
measured*, beat `:1324-1326`, whole: *"Whether the forgone branch's words land at all, since they
are seen only on a tap of that place and the walk is what distributes them. No board in this
lineage has tried to make a notice carry a past-tense fact for the length of a sitting."* And
beat `:1268`: *"Do not read outcome 2 off that line."* — the lose-at-the-opening-arm line,
registered NOT EXERCISED and a RE-SIT CONDITION at beat `:1264-1267`.

On dates: the beat's `:199-213` landed at `685bf3f` (2026-09-04) and canon §7.6 at `5eadc7a`
(2026-09-08), from the rulings of 2026-09-04. That canon is the later *text* is measured; that
it is the later *ruling* is my inference from §7.6 quoting your reasoning about the count
(canon `:969-973`).

**What source says.** Driven at `c8c4546` — sim through `createBoard` with forced dice, the
harness of `test/still-standing.test.js:165-201`; `S` send, `+` home paid, `-` home short, `C`
bank, `P` press on. The last column is the forgone marker the board posts, `notice().blocked`,
on the consist and on Mosswake:

| line | `stopped` | `endedCold` | `pressLost` | `endedSpent` | marks | live | forgone marker |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `S-C` — bank | false | false | false | false | 2 | `mosswake:SEND. 64.` | consist: *She was not rolled out.* |
| `S-CS+` — bank, then play on | false | false | false | false | 14 | `mosswake:SEND. 64.` | consist: *She was not rolled out.* |
| `S-P+` — press on, paid | false | false | false | false | 15 | `mosswake:SEND. 64.` | none |
| `S+S-P-` — press on, lost, after a paid run | false | false | true | false | 13 | `mosswake:SEND. 64.` | mosswake: *Still a neighbor. Nothing to collect.* |
| `S+S-P-S+` — and play on | false | false | true | false | 25 | `mosswake:SEND. 64.` | mosswake: *Still a neighbor. Nothing to collect.* |
| `S-P-` — press on, lost, at the OPENING arm | true | false | true | true | 1 | none | consist: *The runs took the stake. What is left will not cover another.* · mosswake: *There is nothing left to put up for a run.* |
| `S-CS-` / `S-P+S-` — second staked short run | true | true | false | false | 0 / 13 | none | mosswake: *The larder could not cover it twice.* |

So on C14 neither branch of the fork ends the sitting; the only stop at the fork is the
opening-arm floor, `endedSpent`, which is why beat `:1264-1269` registers that line as not
exercised. **Both costing branches leave a forgone marker standing through play** — the bank
on the consist, the lost press-on on Mosswake (sim `:165`, `MOSS_NOTHING`) — and the paid
press-on leaves none, because nothing was forgone (beat `:373-376`). The sim's own header says
so, sim `:24-26`, whole: *"short -> THE SITTING CONTINUES, and the ending is visibly gone. No
+1, no remembering, no brightening. The forgone Collect. stays at Mosswake. NOT endedCold — that
is bound to an ending."* The press-on is unstaked: `commitPress` writes `provisions: 0, toll: 0`
at sim `:580-581` (beat `:978` cites `:410-411`, which is the `endedSpent` notice — the pointer
is stale, the claim is not). A stake is 2 marks put up on every staked send (sim `:118-119`,
`:184`), returned only by a paid run — recurring, and priced by the player's action, not by
time. Exposure to a forgone branch is *"by the walk, not by the render"* (beat `:482-483`): its
words are seen on a tap of that place and nowhere else (beat `:474-475`). On the parent, for
contrast, `S-P-` ends cold and `S-C` stops — the obstruction §7.6's table records C14 removing
(canon `:986-991`).

The rules part 3 runs into. **R2**, canon `:25-28`: *"The antagonist is the sink. Upkeep is
refused by name. "The usual invention is upkeep: fuel that burns, parts that wear, a base that
decays, a standing bill the player logs in to pay… This game does not have to invent the sink,
because the world already is one." (Economy)"* **R3**, canon `:30-34`: *"Holding is cheap to free.
Tended ground does not decay. "Holding is cheap to free, because tended ground does not decay
and an absent player loses nothing… A treadmill makes the player run to stay in place,
refilling and repairing and re-paying to hold a line that erodes the moment they stop. This
game refuses that." (Economy)"* **R6**, canon `:53`: *"Stakes live in the run and the in-progress,
never the secured home."* **R7**, canon `:63`: *"Fuel is inflection, not a standing bill."*

**Blocked.** The next card. The handoff,
`C:\dev\skyrail\docs\handoff\2026-08-02-orchestrator-kickoff.md:275-276`: *"Nobody's until the
scope above is written down. Do not cut a fourth fork."* — the handoff's *fourth fork* (there
and at its `:188`) is the orchestrator restating beat `:204`, not a second ruling. *(The Linear
MCP is unauthorised in the session that wrote this, so the card's issue number is asked for at
cut time, never derived.)*

**Orchestrator's read.** Mine, part by part, with the half that is yours named each time.

- **(1).** (a) is not a scope any board *in this lineage* can test — canon `:1020` in those
  words — so a card scoped to (a) is the *different shape* your `:201-204` routes to, not a
  board in this line. That much the evidence decides; whether that shape is a board at all, or
  the accumulation of cards, is yours. (c) is (b) with the price moved — a real variable, and a
  second one before the first is measured; not first. (b) is what a board here can test. Beat
  `:1197`'s destination is a design answer to *what would make (b) true*, and the confound at
  beat `:1324-1326` says (b) has not yet been tested here at all — if the forgone branch's
  words never landed, the next card owes exposure before it owes weight. I would write (b) as
  the scope and the confound as the first thing the beat has to show. The evidence does not
  decide that against *leave forgone options and test something else*; yours.
- **(2).** Canon is the later text and says *board* where the beat says *fork*; I read your
  sentence as the same prohibition in fewer words. That is a reading of your sentence, and it
  is yours to confirm or deny.
- **(3).** The record draws its line on wall time (beat `:1141-1142`, `:1064`) and on the home
  (R6); the beat has never argued that boundary against R2, R3, R6 and R7 by name, and must,
  before a tile is placed. Whether the line I have described is the one you meant is yours.
- **(4).** Yours entirely. I would ask for it, because a card cut to avoid recording a refusal
  is a card read against the wrong question.

**Cost of getting it wrong.** A card that measures (b) and reports (a) is the failure canon
names at `:1021-1024`, one level up. A *keeps costing* shape cut without the R2/R3/R6/R7
argument is a decay clock with a new name, and the beat has refused one. Under the geometric
reading of part 2 a fork is forbidden outright; under the other, only the question is. What
the record makes binding on the next beat regardless: the obstruction named in the routing
column (canon `:999-1001`); the null registered and what it would mean (canon `:910-912`);
§7.4's positive form — ask what he did, and whether he can name what it bought (canon `:666`,
beat `:1289-1290`); and a manifest that records bytes, not its own status (canon §7.7, handoff
`:205-206`). Two things this beat adds and I would carry: a NOT-EXERCISED / re-sit registration
of the kind at beat `:1264-1267`, and the confound at beat `:1324-1326` answered before weight
is claimed.

---

# Tier 2 — Publishes something measurably wrong to a reader (13; entries 42 and 46 added 2026-09-08)

## 9. The discharged Seat gates — six beats still forbid merging boards that are live and passed

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Do you want the "Draft. Do not merge. Do not deploy. David sits first." lines retired on
all six beats whose boards are already live and passed, in the same form the heat beat's
line was retired in on 2 September?

- *Why:* Each of these beats was written with a hold line telling the worker not to ship
  until you had sat the board. Six of those boards (the halt, and the boards for CFD-183,
  196, 206, 207 and 208) have since shipped and passed, but their beats still carry the hold
  as if it were live; three other beats already had theirs retired by earlier sweeps, and the
  heat beat's was retired on 2 September, so the tree now does it one way in some files and
  another way in others.
- *Options:*
  a. **Yes — retire all six, in the heat beat's form** — Each hold line is rewritten to say
     what is true now, and the old words are kept beside it in a short note marked as true on
     the day of signature and now record only. The one hold that is still real — the CFD-200
     beat, which has no board cut at all yet — is left alone. *Costs:* Docs-only and free: no
     test reads any of these lines. Six small edits.
  b. **No — leave them; status lives in the next Seat** — The hold lines stay as written.
     This is the reading the 1 September audit left open as your call for the halt beat, with
     the note "leave; status lives in the next Seat"; the heat beat's line was retired the other
     way before you ruled. *Costs:* A worker who opens the CFD-206 beat today is told not to
     merge a board that merged eight days ago, and which convention applies depends on which
     beat they happen to open.
- *The orchestrator's read, not a ruling:* The orchestrator's read: retire all six in the
  heat beat's form, because one is already done and leaving five means the rule depends on
  which file a worker opens. *Yours:* Whether a hold line that has been overtaken should be
  retired in place, or whether a beat's hold is permanent text and its discharge belongs only
  in the next Seat.
- *If undecided:* Nothing is mechanically blocked. But a worker either refuses a landing
  they were supposed to make, or learns to treat every hold line as decorative — including
  the CFD-200 beat's, which is the one that is still real.

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

**Raised as.** `docs/name-collisions-audit-2026-09-01.md:1261-1262` (one beat) and
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Do you want the kills README's fetch-verify note corrected to say the beacon is only
injected when the fetch asks for HTML, and to record the fetch that does hash-match?

- *Why:* The README currently says the live host always injects a small analytics beacon
  into HTML pages, so a live fetch of an archived board's index page will never match the
  stored hash, and tells verifiers to use the deployment's own preview address instead. That
  was measured on 25 August, but a later measurement (reproduced by two readers and the
  orchestrator) found the injection only happens when the request carries an Accept:
  text/html header — a plain fetch returns the exact stored bytes and hash.
- *Options:*
  a. **Yes — correct the note and record the working method** — The README says the injection
     is conditional on the Accept header, and tells the next verifier to fetch without Accept:
     text/html to hash-match archived HTML directly at the live host. *Costs:* One docs edit.
     The measured fact replaces a measured-but-superseded one.
  b. **No — leave the note as written** — The README keeps its unconditional claim and its
     workaround. *Costs:* The claim is measurably false today, and the workaround is more work
     than the method that actually matches.
- *The orchestrator's read, not a ruling:* The orchestrator's read: correct it — this is
  not a judgement call, the README states something false and the true version is measured,
  reproduced twice, and cheaper. *Yours:* Only the yes; the entry does not name a design
  half.
- *If undecided:* Nothing is blocked, but this note is why the sweep that re-verified the
  heat board's archive stopped after checking only the sim file and skipped the HTML half,
  and it will stop the next one for the same false reason.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Do you want the out-of-date heat-index hash fixed everywhere it appears — including inside
the shipped manifest of the passed scale board — or only in the two beat copies?

- *Why:* The scale board's manifest records the live heat board's index hash, but the value
  it holds is the heat index as it stood between the two greenhouse commits — the second one
  changed the index page again and this line was never updated; the heat board's own manifest
  has the correct current value. The same stale value sits in two places in the scale beat
  with no note, while two other mentions in that same beat already carry a note saying it was
  replaced; the audit only noticed one of the four sites.
- *Options:*
  a. **Yes — fix all four** — Re-pin the hash in the scale board's manifest (both the
     archived and the served copy) and add notes to the two unmarked beat mentions. *Costs:* The
     manifest is part of a passed board's bytes; editing it breaks the lineage rule that a
     passed board's bytes are frozen.
  b. **The orchestrator's split — fix the two beat copies now, leave the manifest and record
     why** — The two beat mentions get the same note their neighbours already have; the scale
     manifest keeps its stale line, with a note elsewhere explaining that it is known wrong and
     left because the board passed as those bytes. *Costs:* A shipped manifest keeps
     misdescribing what it pins, which the orchestrator's own read admits is worse than a beat
     typo.
  c. **No — leave all four** — Nothing changes. *Costs:* Two free docs fixes go unmade and
     the manifest stays wrong.
- *The orchestrator's read, not a ruling:* The orchestrator's read: fix the two beat copies
  now and leave the manifest bytes with a recorded reason, because editing a passed board's
  shipped bytes to fix a comment is exactly the trade the lineage rule exists to refuse.
  *Yours:* Whether the frozen-bytes rule for a passed board covers its manifest's comment
  lines, when the comment is known to be wrong.
- *If undecided:* Nothing is blocked. But a future check of the live heat board against the
  scale manifest will fail against a value that was already out of date before the scale beat
  was signed, and be read as the heat board having drifted.

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

**Raised as.** `docs/name-collisions-audit-2026-09-01.md:968-971` — *"**The same stale pin
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a design call.)*
Is the heat board's WARM a true breach of the rule that heat and air must be separate
systems (as your own collapse table in canon says), or does it survive that rule (as
canon's judgement of the board, a few lines later, says)?

- *Why:* Canon carries your 25 August collapse table, verified, and one row convicts "WARM
  as a ground step that is also a destination job" as a true collapse of rule R9 (heat that
  warms ground already reached must not also be the thing that opens new ground). Canon's
  judgement of the same board, in the next section, says its bank-in-the-stone and
  step-onto-ground survive R8/R9; the heat beat sides with the second reading while its own
  description has one WARM doing both things R9 forbids, so the same bytes are graded both
  ways in one file.
- *Options:*
  a. **A true R9 collapse** — The collapse-table row stands; canon's later sentence about
     surviving R8/R9 is corrected. The board still stands as played and passed — this is about
     what the precedent means, not about recutting. *Costs:* Every later board reads R9 the
     strict way: one act may not both warm reached ground and put a step on new ground.
  b. **Survives R8/R9** — The judgement sentence stands; the collapse-table row is corrected
     or qualified. The heat beat's own reading is confirmed. *Costs:* Every later board reads R9
     the looser way, with the heat board as the precedent for what is allowed.
- *The orchestrator's read, not a ruling:* The orchestrator's read: none — both readings
  describe the same bytes, measurement cannot choose between them, and this is a judgement
  about what R9 means. *Yours:* All of it: what R9 forbids, adjudicated on the one board it
  has been applied to.
- *If undecided:* Every later board inherits whichever reading of R9 its author happens to
  open first, and the heat board is the precedent either way. It also holds up the question
  of adding canon-check sections to older beats: writing "Heat vs Air — R9" as a citation on
  the heat beat would silently pick the survives reading over the collapse row.
- *What the entry does not say:* The entry says this blocks "#25"; the ledger's canon-check
  retroactivity question is entry 20, and entry 25 is about a different beat. The description
  matches entry 20.

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

**Blocked.** The canon-check retroactivity call (#20 *— corrected 2026-09-09; this read "#25", which is a different beat*) — the sweep flags that adding *"Heat
vs Air — R9"* as a citation on `cfd-176` would silently pick `:118` over `:105`.

**Orchestrator's read.** *No read.* This is a canon self-contradiction on a board that has
already passed and stands as played; measurement confirms both readings describe the same
bytes and cannot choose between them. It is a judgement about what R9 means.

**Cost of getting it wrong.** Every later board inherits the wrong reading of R9, and the
one board it was adjudicated on is the precedent.

---

## 13. Canon `:106`'s phase-lock order is not the order the board enforces

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Do you want canon's phase-lock order corrected from GOODS / HOLD / B / WARM to GOODS, then
B, then HOLD, then WARM, which is what the heat board actually enforces?

- *Why:* Canon's collapse table writes the heat board's phase lock in one order; the
  board's own source states and enforces a different one, and driving all 24 possible
  orderings of the four commits reaches the banked state in exactly one — the board's. Both
  readers agreed the slip is canon's, not the beat's, and it was outside the sweep's scope to
  fix.
- *Options:*
  a. **Yes — correct canon's order** — Two letters swap in the canon table so it matches the
     enforced order. *Costs:* One docs edit; nothing else moves.
  b. **No — leave it** — Canon keeps the wrong order; any beat citing that row must quote
     canon's order as canon's and flag it, or cite the neighbouring judgement (which says only
     "a phase lock") and leave the row out. *Costs:* Every future citation carries a flag, and
     the heat beat's own row on the four-button phase lock stays routed to you instead of being
     closed.
- *The orchestrator's read, not a ruling:* The orchestrator's read: correct it — two
  letters, uncontested by both readers, checked over the full ordering space. *Yours:* Only
  the yes; the entry does not name a design half.
- *If undecided:* Nothing directly, but the heat beat's phase-lock row stays open on your
  desk, and the risk is that a beat gets rewritten to match canon's typo.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a design call.)*
Is the shared export name "armed" a real collision that should be treated as MEDIUM, or a
benign shared name that is LOW?

- *Why:* All four boards that carry "armed" use it to answer the same question — is the
  ending one act from stopping — and on all four a stopped board is always an armed one. But
  on the desk boards (line, storm) it is a success the player paid for (three paid UPs),
  while on the city boards (dice, two-ways) it is a failure suffered (one short run) and it
  gates a different set of verbs. The audit holds it at MEDIUM, its reviewer ruled LOW, a
  third reader called the split a matter of definition rather than fact, and the name ledger
  carries it as contested with both readings until you rule.
- *Options:*
  a. **REAL_COLLISION / MEDIUM** — One name for two different world-causes is a collision
     that must be resolved by renaming. *Costs:* A rename campaign across four boards whose
     bytes are frozen by hash.
  b. **BENIGN_SHARED_NAME / LOW** — The same abstraction ("ending is armed") with a different
     cause per lineage is fine to share; it is recorded, not renamed. *Costs:* The line side
     keeps a real meaning inversion with nothing defending it.
- *The orchestrator's read, not a ruling:* The orchestrator's read: LOW, because the export
  answers one question on all four boards and a differing world-cause is what a shared
  abstraction looks like — but the split is definitional and a MEDIUM ruling is equally
  defensible. *Yours:* Whether "same question, different cause" counts as one name or two in
  this game's vocabulary.
- *If undecided:* Nothing downstream may cite a single severity for "armed" — the ledger
  says so in terms — so every document that touches it must carry both readings until you
  rule.

**Question.** Pick one severity.

**What the document says.** `docs/name-collisions-audit-2026-09-01.md:803-809`: *"One
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
(`docs/name-collisions-audit-2026-09-01.md:806-807`).

**Orchestrator's read.** *LOW.* The export answers one question on all four boards and the
world-cause differing is what a shared abstraction looks like; but the critic is right
that this is definitional, so a MEDIUM ruling is equally defensible and I would not argue
with it.

**Cost of getting it wrong.** MEDIUM triggers a rename campaign across four boards whose
bytes are hash-pinned; LOW leaves a real inversion undefended on the line side.

---

## 15. §7.2's "honest" test — not EV-dominated, or free-and-always-lit?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Your rule says every board must offer a quick path that is honest — does "honest" mean the
quick path is free, always available and never locks you out, or does it mean the quick
path is not a worse deal in marks than the long one?

- *Why:* Your own rule gives the dispatch board's free, always-lit floor send as the
  example of an honest quick path, but the line board's beat passes its quick path on a
  different test — average marks per send — and a fresh measurement on that test puts the
  free Halt send behind Mosswake at every roster size. The section of canon right after this
  one says two options that differ in both marks and food cannot be reduced to one number, so
  the marks-comparison reading makes two of your rulings contradict each other.
- *Options:*
  a. **Free, always available, never locking** — "Honest" is about access: the short route
     costs nothing, is always lit, and never traps the player. A board passes if such a route
     exists, regardless of whether it pays less. *Costs:* The line board's beat, which passed
     its quick path on the marks comparison, is then graded on the wrong test and its self-check
     has to be re-read.
  b. **Not a worse deal in marks** — "Honest" is about payoff: the short route must not lose
     to the long route on average marks per send. *Costs:* On this reading the free Halt send
     already fails on every roster, and the reading needs a single-number comparison that your
     next ruling forbids — so two ruled sections would disagree.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as free, always
  available, never locking, because the neighbouring ruling forbids the single-number netting
  the marks-comparison needs. *Yours:* The rule is yours, and which of the two things
  "honest" was meant to test is a reading only its author can give.
- *If undecided:* Two beats keep applying two different tests, and every future board's
  quick-path check is graded by whichever one its author happened to read.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
For each of four sentences in the heat board's beat — "A stays held", "After return, wait",
"The outward step is what could die", and "One dispatch" — do you rewrite the sentence to
match the board as it plays, or accept it as your own shorthand and leave it?

- *Why:* Driving the shipped board shows each sentence is off: A is thin, not held, in two
  of the six states the board can reach, and both of those sit on the only path to WARM (the
  beat itself keeps thinning on and calls it visible, so it is on purpose); there is no
  control that waits — the wait fires from a timer after a pause; the step is set to "gone"
  every time without exception, so it can never survive; and reaching WARM takes four
  out-and-back trips, not one. The board passed and stands as played, so this is about
  whether its record tells the truth.
- *Options:*
  a. **Rewrite as measured** — Each sentence gets a dated correction stating what the board
     actually does; the beat then matches the board you sat. *Costs:* The record admits that a
     stake the beat promised — the step that could die — was never modelled. When the entry was
     written no test read this beat; since then a guard that checks beat sentences for words
     borrowed from the other lineage has started reading it, so a correction has to be run
     through the suite rather than assumed to leave it green.
  b. **Accept as shorthand** — The sentences stay, read as compressed authorial phrasing that
     the surrounding sentences are enough to decode. *Costs:* The beat keeps saying a player
     sees a held slab and a step that can die, when neither is so.
- *The orchestrator's read, not a ruling:* The orchestrator would rewrite "A stays held"
  and "The outward step is what could die", which are plainly false about what a player sees
  and what can die, and leave "After return, wait" and "One dispatch" as shorthand
  recoverable from their neighbours. *Yours:* Whether your own compressed phrasing counts as
  shorthand or as a wrong claim is an author's call; one ruling shape can settle all four.
- *If undecided:* The record of a passed board goes on describing a stake it never carried
  — and this is the only passed board with no kill-ledger line and none of your own sit words
  in this repository, so here the beat is all there is.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
The Mosswake Loop beat tells readers to cite World Bible §12 as canon; that bible was ruled
legacy 33 minutes after the beat merged, and a test fails if the citation is removed — do
you append a dated note saying §12 is retired, or leave the line as it is?

- *Why:* Two later beats carry the opposite instruction, "Do not cite World Bible §12", and
  each of those is pinned by its own test, so the three beats now disagree about what is
  canon. Deleting the citation from the Mosswake beat turns its test red; adding a note after
  it keeps all three tests green.
- *Options:*
  a. **Append a dated note** — The citation stays in place with a bracketed, dated line after
     it recording that §12 was ruled legacy and is superseded. *Costs:* A docs edit and nothing
     else; the three tests stay green.
  b. **Leave it** — The beat keeps instructing readers to cite §12 as canon. *Costs:* A
     reader of that beat is sent to a bible you retired, and it contradicts the two later beats.
- *The orchestrator's read, not a ruling:* The orchestrator would append the note — it is
  the only edit that fixes the reader's problem without touching a test. *Yours:* The entry
  names nothing as yours beyond the choice itself: whether a beat's canon list may carry a
  dated correction after the fact, or stays exactly as it was when the beat merged, is a
  convention only you set.
- *If undecided:* Either a beat keeps citing a superseded bible as canon, or someone
  deletes the line and the test suite goes red for a documentation edit.

**Question.** Pick one: append a dated parenthetical, or leave it?

**What the document says.** `docs/cfd-206-beat.md:60`: *"World Bible §12 Mosswake Loop. Core
Loop: nodes and lines. Geology:"*.

**What source says.** Measured at HEAD: `test/mosswake-loop.test.js:226` asserts
`assert.match(beat, /World Bible §12/)` against `docs/cfd-206-beat.md` — **so removing the
citation goes red.** Two later beats carry the opposite instruction, also pinned:
`test/herbs-larder.test.js:265` and `test/they-remember.test.js:300` both assert
`/Do not cite World Bible §12/`. The audit records the §12 source was ruled LEGACY 33
minutes after the merge (`docs/name-collisions-audit-2026-09-01.md:1273-1274`).

**Blocked.** Nothing. The parenthetical form keeps all three regexes green; a removal does
not.

**Orchestrator's read.** *Append the parenthetical.* It is the only edit that fixes the
reader's problem without touching a test, and the measurement above is why.

**Cost of getting it wrong.** A beat keeps citing a superseded bible as canon, or the
suite goes red for a docs edit.

---

## 18. Canon `:752`'s confabulated mechanism — which question produced it?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Canon quotes one player answer — "I noticed it degrade and started to see a connection
between fully tended land and success rates" — as a made-up mechanism and the reason to
refuse asking players what they intended; did that answer come from the TEND question or
from the trim question?

- *Why:* The sit that produced the answer is recorded only in Linear, not in this
  repository. The closest thing on file, from the storm board's second sit, is a different
  sentence with the same content, and it too is you explaining why you tended, while the trim
  question got a plain factual answer. If the TEND question produced the quoted answer, then
  the very question shape canon holds up as the one that works is the one that produced the
  answer canon cites against intent questions — and the later pre-registration ruling rests
  on that reading.
- *Options:*
  a. **The TEND question** — Canon's blessed question produced its own counter-example; the
     argument in that section rests on the very question it praises, and so does the
     pre-registration ruling built on it. *Costs:* Two canon sections rest on that answer — the
     one that quotes it and the pre-registration ruling built on it — and the uncomfortable fact
     goes into the record.
  b. **The trim question** — The refused question produced the made-up answer, as canon
     currently implies; the sections stand as written. *Costs:* None to the text, but it has to
     be true — the repo's own trace points the other way.
- *The orchestrator's read, not a ruling:* The orchestrator gives no read: this is a lookup
  of what actually happened in a sit the repository does not hold, and the in-repo trace
  pointing at TEND is not a substitute for that record. *Yours:* Only you sat that board and
  only Linear holds the transcript, so which question you were answering is yours to state.
- *If undecided:* Canon's central case for refusing intent questions may be built on an
  answer produced by the question it blesses, and nobody can say either way.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
The scale board's beat describes the Mosswake carry — pays +1, +2, +3 by level — but never
states the marks condition under which that send is allowed (on the heat board's rule, the
send lights only with a mark in hand), saying only that the gate is "carried from the
played board's cadence", which both people who checked it read as the heat board's rule; do
you want the gate written out in the beat, or does specifying it by reference stand?

- *Why:* Both people who checked it agree the beat and the board are consistent — the gate
  exists in the code and the beat's reference to it is unambiguous. The only question is
  whether a beat may specify a rule by reference rather than in words.
- *Options:*
  a. **State it explicitly** — The beat gains a sentence spelling out when the Mosswake carry
     may be sent. *Costs:* An edit to a passed board's beat for a rule that is already
     unambiguous by reference.
  b. **Leave the reference** — "Gate carried from the played board's cadence" stands as the
     specification. *Costs:* A future reader has to open the heat board's code to learn the
     gate.
- *The orchestrator's read, not a ruling:* The orchestrator would leave it — both readers
  measured the beat and board as consistent, and the reference points at exactly one place.
  *Yours:* Whether beats in this project may specify by reference is a register rule only you
  set.
- *If undecided:* A future reader of the beat re-derives a gate that was already specified
  — nothing is blocked and the board passed.

**Question.** Yes or no: does the beat state the mark gate explicitly, or does
specification-by-reference stand?

**What the document says.** `docs/cfd-183-beat.md:59-62`, the CARRY FOOD bullet: *"the
profit leg, as played: pays marks by the level (+1, +2, +3; the ladder's +4 is never paid,
because topped at 4 is the stop and the carry goes dark with it …)"* — no mark gate stated.
`:238` states the gate only as *"gate carried from the played board's cadence"*.

**What source says.** `docs/name-collisions-audit-2026-09-01.md:1015-1016`, under *refuted at
review*: *"cfd-183 M4's 'stricter than signed' (the mark gate is specified by reference to
heat `sim.js:22`)"*, and `:1021-1022` puts it in do-not-average — *"sweeper DAVID, refuter
NONE; both agree the beat and the board are consistent."*

**Blocked.** Nothing. The board passed; both readers agree it is consistent.

**Orchestrator's read.** *Leave it.* Both readers measured the beat and the board as
consistent; the only question is register, and the reference is unambiguous.

**Cost of getting it wrong.** A future reader re-derives a gate that was already specified.

---

## 42. `/dawnspur-line/` speaks "stake undefined" to screen-reader players — fix a passed, pinned board, or record it?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a design call.)*
The line board passed and its bytes are frozen by a pin, but every sendable card that is
not already out has a spoken label reading the literal word "undefined" where the stake
should be — three of four cards at the opening, two of four with a send out (a card whose
send is away says "No Wardens ride with nothing staked" instead) — so do you fix the one
line and re-pin the board, or leave the passed bytes alone and record the defect?

- *Why:* The label is built from a field the line board's cards do not have — their stake
  is food, and the visible card uses a different field for it — so screen-reader players hear
  "undefined" while sighted players see the right text. Fixing it means editing a passed
  board and re-hashing its hub card and everything under it, and you have not yet made a rule
  for when a passed board's bytes may be moved.
- *Options:*
  a. **Fix it and re-pin** — One line in the board's page is corrected, and the hub card and
     every descendant pin are re-hashed and recut. *Costs:* The first re-pin of a passed board,
     done before any written rule says when re-pins are allowed; nothing about a pin is cheap —
     every hash under the hub card moves.
  b. **Leave the bytes, record the defect** — The passed board is untouched; the defect goes
     into the record as known and shipped. *Costs:* A passed board says "undefined" to every
     screen-reader player, indefinitely, on the one lineage whose whole economy is the stake.
- *The orchestrator's read, not a ruling:* The orchestrator would fix it and treat the
  re-pin as the price of the fix, since a label no sighted sit ever saw is not evidence any
  pass rested on. *Yours:* Whether spoken accessibility text is inside or outside what a pass
  froze is a rule you have not yet made, and it is yours to make.
- *If undecided:* Nothing is blocked — the board is live and passed — but every
  screen-reader player keeps hearing "undefined" on the sendable cards, and the project still
  has no rule for when a pinned board's bytes may be touched.

*(Added 2026-09-08 from the DOM namespace sweep, call 1 — `docs/sweep-2026-09-02.md:1636`;
finding 10 at `:1290`. Numbered by arrival, placed by tier: it publishes something measurably
wrong to a reader.)*

**Question.** `/dawnspur-line/` passed and is hash-pinned (hub card and descendants). Every
sendable card's `aria-label` on it that is not *out* reads the literal word `undefined` where
the stake should be — three of four cards at the opening, two of four with a send in the air;
the *out* branch of the template says "No Wardens ride with nothing staked" instead
(`index.html:413-420`, driven at review). Is a one-line fix to a passed board's `index.html` —
re-hashing and recutting the pins — owed, or are the passed bytes left alone and the defect
recorded?

**What the document says.** The record, `docs/sweep-2026-09-02.md:1636-1641`: `index.html:419`
reads `c.stake`; line's cards carry no `stake` key — its stake is food and the visible card
uses `stakeText` — so the label is built from `undefined`. Reproduced by the synthesis and by
the sweep's wiring pair. The ledger's standing rule is that a guard never forces a board edit;
the record says in the same breath that this is not a guard, it is a shipped accessibility
defect.

**What source says.** `sit/dawnspur-line/index.html:419` (the `aria-label` template) and
`sit/dawnspur-line/sim.js` (no `stake:` on a line card; `stakeText` is the rendered form).

**Blocked.** Nothing. The board is live and passed; the defect reaches only players using a
screen reader, and reaches all of them.

**Orchestrator's read.** *Fix it, and treat the re-pin as the price of the fix rather than a
reason not to.* A pinned board is pinned so a sit's evidence is not rewritten under it; a
label no sighted sit ever saw is not evidence any sit rested on. But the pin census
(`boards-pin-census`) says no board's bytes are "near-free" to move — the hub card and every
descendant re-hash — and whether a11y text is inside or outside what a pass froze is a rule
you have not made yet. Yours.

**Cost of getting it wrong.** Left: a passed board says "undefined" to every screen-reader
player, indefinitely, on the one lineage whose economy is the stake. Fixed carelessly: the
first re-pin of a passed board without a written rule for when re-pins are allowed.

---

## 46. The rendered name of the Halt — a destination on the desk, home in the city, both on the storm — re-voice three passed card faces, or carry it as a declared row once a labels instrument exists?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a design call.)*
On the desk boards "DAWNSPUR HALT" is a destination card you send a train to; on the city
boards "the Halt" is home — seven boards' spoken labels name it so, and it is the place
every send leaves from; three boards' pages (heat, scale and halt) are even titled
"Dawnspur Halt"; and the storm board shows both senses in one line — do you re-voice the
three passed desk boards' card faces so the name stops meaning two things, or leave the
name and carry the split as a declared row once the test guard can grade rendered words?

- *Why:* Every word is correct on its own board, so the confusion only appears to someone
  who reads across the two lineages. The guard that catches name collisions reads only
  element ids, toggles and class names today; a reader-facing label like this cannot be
  graded until a labels-and-sentences instrument is built, which is why the finding sits as a
  paragraph in a record rather than as a test.
- *Options:*
  a. **Re-voice the desk card faces** — The three passed desk boards are edited so the
     destination card no longer reads as the same place the city calls home. *Costs:* A large
     edit — three passed boards changed — to remove a word that is correct on each of them on
     its own board.
  b. **Carry it as a declared row once a labels instrument exists** — The name stays; the
     split is recorded as a known two-meaning row, gradeable only after the guard learns to read
     rendered labels and sentences. *Costs:* Until that instrument lands, the finding is a
     record entry and nothing more, and no test goes red for it.
- *The orchestrator's read, not a ruling:* The orchestrator would build the labels
  instrument first — test-only work that makes the split gradeable — and decide the voice
  afterwards, rather than editing three passed boards now. *Yours:* Whether a desk card face
  should ever say anything other than the place's real name is a design call about how the
  world speaks, and it is yours.
- *If undecided:* The one finding both reviewers rated most serious stays a paragraph in a
  record, and the next board that names the Halt in a label picks whichever sense its author
  happens to hold.

*(Added 2026-09-08 from the DOM namespace sweep, call 5 — `docs/sweep-2026-09-02.md:1667`;
finding 1, the sweep's only agreed HIGH, at `:1129`. Placed in Tier 2: it publishes one name
with two meanings to every reader of the pages.)*

**Question.** `<title>Dawnspur Halt</title>` heads heat, scale and halt; `DAWNSPUR HALT` is a
destination card face on dispatch, line and storm; *the Halt* is HOME in seven city
`aria-label`s (still-standing included); the storm renders both senses in one line. This is
the audit's #4 (`halt` as a route on the desk and home in the city) one layer out, in the
words a player reads. Is the desk's card face to be re-voiced — a board edit on three passed
boards — or is the split carried as a declared row once a `labels` / `sentences` deriver
exists in the guard?

**What the document says.** Finding 1 at `:1129`; the instrument-extensions bullet under
*Dispositions* ranks a `labels` deriver sixth and says that until it lands "finding 1 is a
record entry and nothing more." `ROWS.halt` (HIGH) grades ids only.

**What source says.** The `<title>` elements, the desk boards' card-face text, and the city
boards' `aria-label` attributes named above, all at `0ffd1aa`.

**Blocked.** A guard row for the sweep's one HIGH: the test loop's set list is hard-coded to
ids / toggles / classNames, so a `labels` row cannot go red today and is not built.

**Orchestrator's read.** *Build the instrument before deciding the voice.* A re-voicing of
three passed desk boards to remove a word that is correct on each of them, on its own board,
is a large edit to settle a cross-lineage confusion; a `labels` deriver plus the hard-coded
set list widened is test-only work and makes the split gradeable, after which the row carries
the two meanings the way `home` does. Whether the desk's card face should ever say something
other than the place's name is a design call, and yours.

**Cost of getting it wrong.** The one HIGH the sweep found stays a paragraph in a record, and
the next board that names the Halt in a label does so in whichever sense its author happens to
hold.

---

# Tier 3 — Convention and register; measurement does not decide these (18; entries 43–45 added 2026-09-08)

## 20. The Canon check section — retroactive on the seven beats that lack one?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Do the seven beats that have no Canon check section get one added after the fact, or does
the rule that every beat cites the rulebook bind only beats written from now on?

- *Why:* The rulebook says every beat must carry a Canon check section citing which of its
  ten rules, or which source line, each mechanism rests on, and a beat with an uncited
  mechanism is refused at review before you see it. Seven beats have no such section (the
  heat board's beat, the halt board's Come-home beat, the Mosswake, Herbs-in-the-larder and
  They-remember beats, the dice beat and the Two-ways-from-here beat); six do, so today the
  corpus obeys the rule about half the time.
- *Options:*
  a. **Retroactive** — Someone writes a Canon check section into each of the seven beats,
     citing rules for mechanisms that were designed and played without those citations. *Costs:*
     Seven files of invented provenance on boards that already passed, and one trap: adding a
     heat citation to the heat board's beat silently picks one side of a rulebook contradiction
     about how that board grades WARM (open decision 12), which you have not ruled on yet.
  b. **Not retroactive** — The seven beats stay as they are; the citation rule binds only
     beats written from here forward. *Costs:* A canon-check discipline that only half the
     corpus obeys, so a reader cannot rely on finding one.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as not retroactive:
  back-filling citations nobody used at the time is archaeology, and the value is the
  convention going forward. *Yours:* Whether the rulebook rule is a going-forward convention
  or a corpus-wide requirement is yours; the heat-board sweep lists it as an action for you.
- *If undecided:* Nothing is blocked. The seven beats simply stay uncited, and if anyone
  adds a citation to the heat board's beat before you rule on decision 12, they pick a side
  of that contradiction for you.
- *What the entry does not say:* The entry frames these as beats written before the
  citation rule, but by first-commit date only the heat board's beat is as old as the rule
  (both 2026-08-25); the other six were first committed 2026-08-30 to 2026-09-01, after it,
  and the entry does not say why they were written without the section. The repo today also
  holds a newer beat (Still standing, cfd-212) with none, which the entry predates.

**Question.** Yes or no: do beats written before the convention get a Canon check section
added retroactively?

**What the audit says.** `docs/name-collisions-audit-2026-09-01.md:1274-1275`: *"no Canon
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Does the note explaining that the rim is the halt board's own constant and is not read on
the three sibling boards go on the Herbs-in-the-larder (Put them up) and They-remember
(Collect) beats too, or stay only on the Mosswake (Send) beat?

- *Why:* The word rim means two things across the seam between the halt board and its three
  sibling boards. The Mosswake beat already carries a note disambiguating it, while the other
  two beats still say only that the rim/gap is a constant the action does not write, with no
  note.
- *Options:*
  a. **All three** — Carry the same disambiguation note on the Herbs-in-the-larder and
     They-remember beats as well; those two edits are already written and waiting. *Costs:*
     Landing the two edits that are already built; the entry names nothing beyond that.
  b. **Mosswake beat only** — Leave the note where it is; the other two beats keep their
     one-line constant statement. *Costs:* Two beats keep an ambiguous constant that the third
     beat explicitly disambiguates, and a reader of either is left wrong.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as all three: the note
  exists because the word is ambiguous across the seam, and fixing one of three sites is the
  half-fix that leaves two readers wrong. *Yours:* Whether the two sibling beats need the
  note at all, or whether the Mosswake beat's is enough, is the register call the entry
  leaves to you.
- *If undecided:* Two built edits stay on hold, as they have since the start of September,
  and the two beats stay ambiguous.

**Question.** Pick one: does the `rim` disambiguation note go on `cfd-207` and `cfd-208`
too, or stay on `cfd-206` only?

**What the document says.** `docs/cfd-206-beat.md:224-226` carries it: *"rim — `rim` is
`/dawnspur-halt/`'s own constant and is not read here. SEND does … constant"; the rim is
halt's, and this board carries only the gap.)*"

**What source says.** Measured at HEAD: `cfd-207:251` reads *"**Rim / gap is a constant.**
Put them up does not write it."* and `cfd-208:288` reads *"**Rim / gap is a constant.**
Collect does not write it."* — **neither carries the note.** The audit's cite
`cfd-208:278` has drifted to `:288`; corrected here. Both edits are built and held:
`docs/name-collisions-audit-2026-09-01.md:1248-1250`, *"the two conditional `rim` edits"*.

**Blocked.** Two built edits, held since 2026-09-01.

**Orchestrator's read.** *All three.* The note exists because the word means two things
across the seam; carrying it on one of three sites is the half-fix that leaves the other
two readers wrong.

**Cost of getting it wrong.** Two beats keep an ambiguous constant that the third
explicitly disambiguates.

---

## 22. `cfd-205`'s INHERITED-as-scenery rows — hearth and greenhouse

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
On the stopped site beat, is the keel-fire hearth inherited as scenery or lit together with
the Foundry, and is the greenhouse inherited as scenery or refused outright?

- *Why:* The site beat's inheritance table lists the hearth as inherited scenery from the
  heat board and the greenhouse as inherited scenery from the scale board, explicitly not a
  second greenhouse and not a build-up. The site board was sat and stopped rather than recut,
  so nothing is waiting on these rows today.
- *Options:*
  a. **Hearth as scenery** — The hearth stays an inert inherited fixture, as the row reads
     now. *Costs:* The entry names one cost for the whole pair of picks, not one per side: a
     later board inherits a row it should have refused, or refuses one it could have kept.
  b. **Hearth lit with the Foundry** — The hearth becomes part of the live work when the
     Foundry starts, not decoration. *Costs:* The entry names one cost for the whole pair of
     picks, not one per side: a later board inherits a row it should have refused, or refuses
     one it could have kept.
  c. **Greenhouse inherited as scenery** — The greenhouse stays a standing terrace job that
     is present but not played and not built up, as the row reads now. *Costs:* If this is the
     wrong call, a later board inherits a row it should have refused.
  d. **Greenhouse refused** — The row is struck as refused, so no later board can carry it
     from here. *Costs:* If this is the wrong call, a later board refuses a row it could have
     kept.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as leave both as
  inherited scenery: inert-versus-refused is a register call on a stopped board, and the
  present wording is at least consistent with what the heat and scale beats say. *Yours:* The
  entry says the distinction is a register call on a stopped board, and what a later board
  should be allowed to inherit is yours.
- *If undecided:* Nothing is blocked; the site board was stopped, not recut. The risk is a
  later board inheriting a row it should have refused, or refusing one it could have kept.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: read one table first.)*
In the site beat's Canon check table, is the reason given for Foundry-is-work-one the right
basis, and is the loads-are-one-of-three-claims rule the right rule to cite for the
bill-is-addressed-hauls row?

- *Why:* The site beat's Canon check maps each mechanism to a rulebook rule. The Foundry
  row rests on a prose reason (buildings exist because they do jobs; the Foundry is Heat put
  into ground already reached) rather than a numbered rule, and the bill row cites the rule
  that every load is profit, tending, or buildout.
- *Options:*
  a. **Foundry citation right** — The Foundry row stands on its prose reason as written.
     *Costs:* If it is in fact wrong and left standing, it propagates into every beat that
     inherits the row.
  b. **Foundry citation wrong** — You name the rule or source the row should rest on instead,
     and the row is rewritten to it. *Costs:* None named by the entry.
  c. **Bill row: the three-claims rule is right** — The bill-as-addressed-hauls row keeps its
     citation. *Costs:* If it is in fact wrong and left standing, it propagates into every beat
     that inherits the row.
  d. **Bill row: a different rule** — You name which rule the bill actually rests on, and the
     row is rewritten to it. *Costs:* None named by the entry.
- *The orchestrator's read, not a ruling:* The orchestrator has no strong read: both are
  rule-mapping judgements inside a table on a stopped board, and the underlying mechanics are
  not in dispute. *Yours:* Which rulebook rule a mechanism rests on is a design judgement;
  the entry offers no strong read and leaves both picks to you.
- *If undecided:* Nothing is blocked. A wrong rule citation propagates into every beat that
  inherits the row.
- *What the entry does not say:* The entry asks whether the Foundry row's rule citation is
  right, but that row cites no numbered rule at all, only a prose reason; the entry does not
  say whether the question is 'is the prose reason sound' or 'which rule should be cited'.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
In the halt-walk beat's systems table, do the rows for Works, SITE, LAND and CAST get
relabelled from inherited to kept by signature?

- *Why:* Those systems came from the site board, which was sat and stopped and never
  passed. In this corpus inherited means carried from a passed board, so the label claims a
  lineage the site board never earned; what actually happened is that you signed to keep them
  over a board that failed.
- *Options:*
  a. **Yes, rename** — The cells read kept by signature, recording that these systems survive
     because you kept them, not because a board passed. *Costs:* A small edit to the halt-walk
     beat's table.
  b. **No, keep inherited** — The cells stay as written. *Costs:* The corpus loses the
     distinction between what passed and what was kept anyway.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as rename them:
  kept-by-signature is a different and more interesting fact than inherited, and the current
  word claims a pass that did not happen. *Yours:* Whether your signature over a failed board
  counts as inheritance is a naming call only you can make, since the signature was yours.
- *If undecided:* Nothing is blocked; the halt-walk beat keeps a label that says a lineage
  came from a board that never passed.

**Question.** Yes or no: rename the cell from *"inherited"* to *"kept by signature"* for
Works/SITE/LAND/CAST?

**What the document says.** `docs/cfd-205-halt-beat.md:207` *"| **Works — SITE, address,
bill** | **ON** — Foundry is work one | inherited; SITE/LAND/CAST sim kept |"*, `:209`
*"| **LAND as arrival, not SEND** | **ON** | inherited |"*, `:210` *"| **CAST = OPEN: bill
full + terrace food → Foundry, food in, Heat step** | **ON** | inherited Works |"*. **The
audit cited `:203-206`, which at HEAD is the table header and the first two rows.**
Corrected here: the rows are `:207`, `:209`, `:210`.

**What source says.** Those systems came from `/dawnspur-site/`, which was **sat and not
passed** (KILLS.md's 2026-08-30 Dawnspur Site entry; hub `public/index.html:67`, *"live — sat 2026-08-30, not
passed"*), so "inherited" claims a lineage from a board that never earned one.

**Blocked.** Nothing.

**Orchestrator's read.** *Rename them.* "Inherited" in this corpus means "carried from a
passed board"; these were kept by your signature over a board that failed, which is a
different and more interesting fact.

**Cost of getting it wrong.** The corpus loses the distinction between what passed and what
was kept anyway.

---

## 25. `cfd-205-halt:65-66` — a sit finding, or a ruling?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Does the sentence in the halt board's Come-home beat saying that buildings, feed, lamp,
Foundry and Home writing landed but the walk did not get relabelled as your ruling rather
than presented as something the sit found?

- *Why:* Your verbatim report from that sit was that you lit the lamp and started the
  foundry; it says nothing about the walk. The record's own review reads the
  walk-did-not-land sentence as a ruling, not a finding, but the beat presents it in the same
  breath as the sit's findings.
- *Options:*
  a. **Yes, label it a ruling** — The beat says plainly that the walk-did-not-land sentence
     is your conclusion, separate from what you did in the sit. *Costs:* None named by the
     entry.
  b. **No, leave it** — The sentence stays reading as a sit finding. *Costs:* A ruling reads
     as an observation and gets re-litigated.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as say so: separating
  what the player did from what you concluded is the distinction this project keeps losing,
  and your verbatim is right there to separate them. *Yours:* Whether that sentence is your
  ruling is something only you can confirm, since you are the one who concluded it.
- *If undecided:* Nothing is blocked; the sentence stays open to being reargued as if it
  were an observation.

**Question.** Yes or no: relabel it as a ruling?

**What the document says.** `docs/cfd-205-halt-beat.md:65-66`: *"Buildings-as-buildings,
feed, lamp and Foundry as actions, and Home writing landed. The walk did not. Recut so
only one action is live at a"*.

**What source says.** The audit's disposition, `docs/name-collisions-audit-2026-09-01.md:1264-1265`:
*"'Home writing landed. The walk did not.' as a sit finding (it is a ruling; say so)"*.
KILLS.md's 2026-08-30 Dawnspur Halt Home-sit entry records the sit verbatim as *"Lit the lamp and started the foundry."* —
the walk sentence is not in it.

**Blocked.** Nothing.

**Orchestrator's read.** *Say so.* The distinction between what the player did and what you
concluded is the one this project keeps losing, and the verbatim is right there to
separate them.

**Cost of getting it wrong.** A ruling reads as an observation and gets re-litigated.

---

## 26. `cfd-209`'s appended pre-registration note — does it read as yours?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Does the dated note appended under the dice beat's pre-registered null sentence stand as
written, or do you strike it?

- *Why:* Before the sit, the beat pre-registered a null outcome — if you send once from the
  free Halt and stop, the places are still scenery and the desk was doing the work all along
  — but the free Halt is the line board's route, and on the dice board the Halt is Home, so
  the null as written describes a send the board cannot make. After the sit the write-up
  wanted to reword that sentence; the orchestrator refused, on the reading that the
  rulebook's pre-registration rule exists so that sentence is never rewritten after the sit
  it predicted, left it verbatim, and appended a dated note beneath it explaining the naming
  collision (which the Two-ways-from-here board found one beat downstream) and recording that
  the sit met a failed run, so the null did not fire. The note is in the beat in your voice,
  and you did not write it.
- *Options:*
  a. **Leave the note** — The pre-registered sentence stays verbatim and the dated note
     beneath it carries the correction. *Costs:* A note in your voice that you did not write
     sits under a ruled pre-registration.
  b. **Strike the note** — The note is removed; the pre-registered sentence stays verbatim
     with no explanation of the collision beside it. *Costs:* None named by the entry.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as leave it: refusing
  to rewrite the pre-registration was right, and the note carries the correction without
  touching the sentence. *Yours:* Whether a note in your voice that you did not write may
  stand is yours; the record explicitly reserves that you may strike it.
- *If undecided:* Nothing is blocked; the note is already landed. It stays in your voice
  until you say otherwise.

**Question.** Yes or no: does the note stand as written, or do you strike it?

**What the document says.** `docs/cfd-209-beat.md:423` (the audit cited `:396`; **drifted by
27 lines**, corrected here) — a dated parenthetical opening *"(Recorded 2026-09-01, after
the sit, and the sentence above is left as it was pre-registered: 'the free Halt' is the
line board's route …"* and closing *"This is the name collision the cfd-210 re-cut found
one beat downstream, recorded here at its upstream.)"* The pre-registered sentence it sits
under is at `:395`: *"The run came home short and the larder covered it."*

**What source says.** `docs/name-collisions-audit-2026-09-01.md:1236-1239`: *"the synthesis
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
In the inherited-board tables of the dice beat and the Two-ways-from-here beat, do the two
desk boards (the line board and the dispatch board) keep their PASSED markers, or are both
struck?

- *Why:* Earlier cuts of those tables marked only the four city passes; the current cuts
  also mark the two desk boards as PASSED, each with a note beneath explaining that the
  passes were real and dated. The record's own instruction is that the two tables must match:
  strike the desk markers from both or keep them in both.
- *Options:*
  a. **Keep both** — Both beats continue to list the line and dispatch boards as passed
     inheritances, with the explanatory notes. *Costs:* If the desk passes do not in fact
     support the rows, two city beats claim a desk inheritance they cannot support.
  b. **Strike both** — Both beats drop the desk PASSED markers and list only the four city
     passes. *Costs:* If the desk passes do support the rows, two city beats drop an inheritance
     they can support.
- *The orchestrator's read, not a ruling:* The orchestrator reads it as keep both: the
  tables claim to list what the board inherits, the rows these beats inherit under the
  rulebook's cumulative-board rule genuinely require those two desk passes, and the notes
  beneath already say so. *Yours:* Strike-or-keep is yours; the entry gives its read and
  stops there, and the underlying call is whether two city beats should show a desk
  inheritance on their face.
- *If undecided:* Nothing is blocked. The risk is two city beats claiming a desk
  inheritance they cannot support, or dropping one they can.

**Question.** Yes or no: strike them from both tables, or keep both?

**What the document says.** `docs/cfd-209-beat.md:104-105` and `docs/cfd-210-beat.md:85-86`
(the audit cited `cfd-210:80-81`; **drifted by five lines**, corrected here) both carry
*"| `/dawnspur-line/` **PASSED** | `18b1324f` | `b6f21db0` |"* and *"|
`/dawnspur-dispatch/` **PASSED** | `576ce2b6` | `31aead60` |"*, each table followed by a
parenthetical explaining that earlier cuts marked only the four city passes.

**What source says.** The audit's own instruction: *"the desk PASSED markers (landed in
both tables; strike both or neither)"*
(`docs/name-collisions-audit-2026-09-01.md:1267-1269`).

**Blocked.** Nothing.

**Orchestrator's read.** *Keep both.* The tables claim to list what the board inherits, and
the §7 rows genuinely require those two passes — the parentheticals at `:107-112` and
`:88` already say so with the shas re-derived.

**Cost of getting it wrong.** Two city beats claim a desk inheritance they cannot support,
or drop one they can.

---

## 28. `cfd-196`'s three register deviations

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Do you accept, as the settled record of the dispatch board, the three places where its
end-of-run sentences departed from the example sentences you signed: (1) neither closing
sentence blames the weather ("lost on the way" rather than "lost to the weather on the
way"), because on this board only one route's failures are weather; (2) the paid closing
sentence carries a fourth number, the turned-back count, beside runs out, cargoes banked
and stakes lost; (3) the turned-back sentence names whoever actually rode, never "the
crew"?

- *Why:* When the board was built its closing sentences came out different from the signed
  examples, and the beat records the three differences openly rather than hiding them. The
  board passed on 2026-08-26 with those sentences, so the question is whether the beat's
  record of the departures is accepted as the passed board's settled wording.
- *Options:*
  a. **Accept** — The beat's record of the three departures becomes the passed board's
     register; the signed example stays as the history it departed from. *Costs:* Nothing
     further to build; the board passed with these sentences.
  b. **Reverse** — The departures are not accepted; the beat says they are yours to accept or
     reverse, and reversing means the board's sentences go back to the signed wording. *Costs:*
     The entry does not price a reversal. Its one stated cost, either way, is a passed board
     whose record disagrees with the board.
- *The orchestrator's read, not a ruling:* Orchestrator's read: accept them — the board
  passed with those sentences, and a record that lists its departures against the signed
  example is the right shape for a passed board. *Yours:* Whether the departures are accepted
  or reversed: the beat itself says these are David's to accept or reverse at the sit.
- *If undecided:* Nothing is blocked. What stays wrong is that a passed board's record
  disagrees with the board.
- *What the entry does not say:* The entry names the third departure as "the registers now
  key on cost rather than the implementer's first test", but the beat at HEAD counts its own
  three as items 1, 2 and 4 — weather, the fourth figure, and the turned-back sentence naming
  whoever rode — with the cost keying folded into item 2 as its cause. This card carries the
  beat's three.

**Question.** Yes or no: are the three deviations accepted as the passed record's register?

**What the document says.** `docs/cfd-196-beat.md:23-42` records them itself: *"1. **Neither
terminal register names the weather.**"*; *"2. **The paid register carries a fourth figure
— the turned-back count.**"*; and the third, *"the registers now key on"* cost rather than
the implementer's first test.

**What source says.** `docs/name-collisions-audit-2026-09-01.md:985-986` records the third
as **built** — *"cfd-196's third register deviation and the roster write's dating
(`ed7f49d` → `2a3e9dd`)"* — leaving the acceptance question for the pair.

**Blocked.** Nothing; the board passed 2026-08-26.

**Orchestrator's read.** *Accept them.* The board passed with those registers; the beat now
records the deviations against the signed example rather than hiding them, which is the
correct shape for a passed record.

**Cost of getting it wrong.** A passed board's record disagrees with the board.

---

## 29. `cfd-176:19` and `:41` — the two ellipsis readings

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Two picks on the heat board's beat: should the sentence "GOODS / B / HOLD are not on the
same row" be corrected, and should "dest A's core does not die unless fed" be given a
qualifier saying when it holds?

- *Why:* Both are readings of a short sentence, not measured errors — the board's facts are
  confirmed either way. The one measured caution is that the button row on the board actually
  holds four buttons (LEAVE is on it too), so a correction that names only GOODS / B / HOLD
  would itself need correcting the first time someone counted the row.
- *Options:*
  a. **Sentence 1 — correct it** — Rewrite the row sentence to match the board. *Costs:* A
     rewrite naming only GOODS / B / HOLD would need correcting again the first time someone
     counted the row, because LEAVE is on it too.
  b. **Sentence 1 — leave it** — Keep the sentence as it stands, read as the author's
     shorthand. *Costs:* None named by the entry; the board's facts are confirmed on either
     reading.
  c. **Sentence 2 — scope it** — Add a qualifier saying under what conditions the core does
     not die unless fed. *Costs:* An edit to a passed board's beat; the entry does not say what
     the qualifier would be, and its one priced risk is a correction that itself needs
     correcting.
  d. **Sentence 2 — leave it** — Keep the sentence unscoped, read as the author's shorthand.
     *Costs:* None named by the entry; the board's facts are confirmed on either reading.
- *The orchestrator's read, not a ruling:* Orchestrator's read: leave both — the board
  facts hold on either reading, the sweep's own caution shows the fix introduces a new error,
  and this is the same kind of shorthand-reading question you already ruled once was yours to
  make. *Yours:* Both readings — the sweep marked both as David's to decide, not the sweep's
  to assume.
- *If undecided:* Nothing is blocked. The risk is a correction that itself needs
  correcting.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Every board has a function called wait; on eleven boards it does nothing, on the heat board
it marks the greenhouse step gone and fires by itself 1.5 seconds after the train is home —
is that a MEDIUM problem or a HIGH one?

- *Why:* The audit first called it HIGH, partly on the claim that it ends the sitting; the
  reviewer found that claim wrong (the WARM step already ends the sitting, and the timer's
  only visible effect is the greenhouse sprite fading, which the board documents as its
  design). The reviewer still allowed HIGH is defensible because heat's bytes are frozen by
  twelve test files, so the difference can never be brought into line, only renamed on the
  other eleven.
- *Options:*
  a. **MEDIUM** — It does not end the sitting and the timer's effect is the documented
     design. *Costs:* The label understates how hard it is to ever fix — twelve frozen files.
  b. **HIGH** — The freeze count dominates: the divergence can never be conformed, only
     renamed elsewhere. *Costs:* The label rests on how hard it is to fix, not on how much harm
     it does.
- *The orchestrator's read, not a ruling:* Orchestrator's read: MEDIUM — the sentence HIGH
  rested on was shown wrong, and the freeze-count argument is about difficulty, not harm.
  *Yours:* The label only. The entry says the guard pins the behaviour regardless of which
  word is chosen.
- *If undecided:* Nothing — explicitly. The guard already pins the mechanism either way;
  the entry calls this the cheapest call on the list.

**Question.** Pick one severity.

**What the document says.** `docs/name-collisions-audit-2026-09-01.md:838-843` *(an earlier cut cited `:806-810`, which is the guard’s own description and never held these words)*: *"The reviewer
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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Yes or no: confirm the orchestrator's 2026-09-01 ruling that dawnspur-site and
dawnspur-halt belong to the city lineage, not the desk, for the purpose of the
name-crossing check?

- *Why:* The check counts names shared between the two lineages, and which boards belong to
  which lineage changed that count from 5 to 22 to 31 across three attempts to infer it from
  the boards' own headers — so the membership is now written down as a ruling rather than
  guessed. Halt is the ancestor every city board copies its interface from, and site shares
  most of its names with halt, so putting either on the desk side would turn their harmless
  look-alike names into "crossings" and bury the real ones.
- *Options:*
  a. **Yes — city side** — Site and halt stay declared as city boards. *Costs:* One name,
     litJobs, counts as a crossing, only because site carries it alongside four desk boards
     (heat, scale, line and storm).
  b. **No — desk side** — One or both move to the desk list. *Costs:* Their look-alike names
     with the city boards (sited, scaffold, bill, panes, rim and more) read as crossings and
     bury the real ones.
- *The orchestrator's read, not a ruling:* Orchestrator's read: confirm it — the count
  moving 5/22/31 with the choice is exactly why it must be declared, and one crossing name is
  the smallest cost of the placements tried. *Yours:* The confirmation. The ruling was the
  orchestrator's; the audit carries it as declared, not blocked.
- *If undecided:* Nothing is blocked and the check is green today. If the placement is
  wrong, the crossing count grades the wrong surface and real crossings hide among harmless
  twins.

**Question.** Yes or no: confirm the orchestrator's 2026-09-01 ruling that `dawnspur-site`
and `dawnspur-halt` sit on the **city** side?

**What the document says.** `test/lexicon-ledger.js:22-32`: *"MEMBERSHIP IS DECLARED, NEVER
INFERRED. Three sweeps inferred three memberships from the sims' headers and the seam count
moved 5 / 22 / 31 with the choice. The lists below are the orchestrator's ruling,
2026-09-01."* And the reasoning: *"halt is the city lineage's ancestor … The cost of this
placement is one row — `litJobs` — which crosses only because site carries it beside heat,
scale, line and storm."*

**What source says.** `docs/name-collisions-audit-2026-09-01.md:799`: *"The rulings it carries
as **declared, not blocked**: `armed`; the membership."*

**Blocked.** Nothing — declared, not blocked, and the guard is green at HEAD.

**Orchestrator's read.** *Confirm it.* The seam count moving 5/22/31 with the choice is
exactly why it must be declared rather than inferred, and the stated cost of one crossing
row is the smallest of the three options.

**Cost of getting it wrong.** The name-collision guard's seam count grades the wrong
surface, and real crossings get buried among benign twins.

---

## 32. Canon §5's `(d)` gloss (optional)

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
In the signed section 5 of the rulebook, the answer reads "(d) now, (c) next" but the
question above it letters only three choices — (a) the run, (b) the in-progress purchase,
(c) the reserve-and-storm — and then adds "or none this sitting" without a letter; does
"(d)" mean "none of the three stakes" or "the reserve without the storm"?

- *Why:* A reader cannot resolve "(d)" from the file, because no choice carries that
  letter; the nearest candidate, the unlettered "none this sitting", conflicts with the scale
  recut that shipped, which carries the reserve. The section is signed, so adding the
  one-line gloss is yours; the sweep marked the item optional.
- *Options:*
  a. **"None of the three stakes"** — The scale sitting carries no stake at all — the
     question's unlettered fourth choice. *Costs:* One line added to a signed section, and it
     contradicts the shipped scale recut, which carries the reserve.
  b. **"The reserve without the storm"** — The scale sitting carries the visible reserve,
     with the storm deferred to the next sitting. *Costs:* One line added to a signed section.
- *The orchestrator's read, not a ruling:* Orchestrator's read: "the reserve without the
  storm" — the shipped recut carries the reserve, which rules out "none"; but the section is
  signed and the gloss is David's. *Yours:* The gloss itself, because section 5 is signed.
- *If undecided:* Nothing is blocked. One line of a signed section stays unreadable.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
If, under decision 7, the five passed sittings get entries in the kills ledger, should they
run newest-first or be appended oldest-last?

- *Why:* The ledger's two sections disagree with each other: the pre-host section runs
  oldest-first and the hosted era runs newest-first. The three new kill entries have since
  landed newest-first, so for kills the order is settled by events and only the passes' order
  is still open.
- *Options:*
  a. **Newest first** — The pass entries follow the hosted era's existing order. *Costs:*
     None named; matches what the file already does.
  b. **Oldest last** — The pass entries are appended in date order. *Costs:* The anchors
     change, not the text.
- *The orchestrator's read, not a ruling:* Orchestrator's read: newest first — already the
  hosted era's observed order, and now reinforced by a landing. *Yours:* The order — and only
  if you answer yes to decision 7.
- *If undecided:* Only the pass entries' anchors, and only if decision 7 is yes. Getting it
  wrong means re-cutting anchors; no substantive loss.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: read one table first.)*
Do you take the record's proposed default on each of five one-line wording points in passed
beats, or does any of them need a different answer?

- *Why:* Each is a wording call that two readers have already looked at, none changes a
  measured number, and none blocks anything, so they are grouped to be cleared in one pass.
  The beats they sit in are already passed and frozen.
- *Options:*
  a. **Herbs beat: "Put them up. Consist is already home with the herbs"** — Treat
     "inherited, not replayed" as a note only — no rewrite. *Costs:* Note only; nothing measured
     changes.
  b. **Herbs beat: "Player action: tap to collect."** — The sentence stands; the later
     they-remember beat records the split. *Costs:* Note only; nothing measured changes.
  c. **They-remember beat: "Mosswake is where the light is"** — Read as figurative; the
     board's actual bytes govern what is lit. *Costs:* Note only; nothing measured changes.
  d. **Two-ways beat: "64 for 14, stake 0"** — Leave it. It appears twice in the beat, not
     once. *Costs:* Note only; nothing measured changes.
  e. **Storm beat: "Canon §7 forbids it by name"** — The record lists this citation itself as
     the point for you and proposes no default for it — the entry's words are "the citation
     itself is the question". *Costs:* Note only; but see below — no default is stated for this
     row.
- *The orchestrator's read, not a ruling:* Orchestrator's read: take the record's default
  on all five — each was reached by two readers and none changes a measured number. *Yours:*
  Each of the five wording calls, since the beats are passed and the words are yours.
- *If undecided:* Nothing is blocked for any of the five. What stays wrong is wording drift
  in beats that are already passed and frozen.
- *What the entry does not say:* The entry says each of the five has a default already
  proposed, but for the fifth ("Canon §7 forbids it by name") the record's proposal reads
  "the citation itself is the question", which is a question rather than a default, and the
  entry does not say what about the citation is in question. The card cannot say what taking
  "the default" means for that row.

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

## 43. The desk voice in three passed city sims — pinned evidence to leave, or a re-voicing owed before a fourth board inherits it?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Three passed city boards carry the sentence "The train brought the Mosswake cargo home." —
desk voice, never shown to a player, quoted in no document — and one board's test freezes
it word for word; is that dead prose to leave alone as passed evidence, or is a re-voicing
owed before a fourth city board copies it?

- *Why:* Nothing renders the sentence and no document quotes it; the next city board, if it
  is cut by copying the last passed one, would inherit it a fourth time, and the site board
  carries three more unrendered desk-voiced sentences of its own. A rule forbidding the
  sentence would be red on three passed boards today and could only go green by editing three
  boards and one test.
- *Options:*
  a. **Leave it as pinned evidence** — The three boards and the test stay as they are.
     *Costs:* The next city board inherits the sentence a fourth time, and the first city board
     to actually show its run sentence shows the desk's voice.
  b. **Re-voice before the fourth board** — Rewrite the sentence in the city's voice on the
     three boards and update the test that freezes it. *Costs:* Edits to three passed, frozen
     boards plus the one test that freezes the sentence.
  c. **Middle path (the orchestrator's): leave the three, forbid the fourth** — The three
     passed boards keep the sentence; a rule forbids it only on boards that pass after today.
     *Costs:* That scoping is a convention David would be setting, which is why it is listed
     rather than built.
- *The orchestrator's read, not a ruling:* Orchestrator's read: leave the three and forbid
  the fourth — a rule that is red on passed bytes is the permanently-red gate the project
  warns of, while a rule scoped to boards passing after today ratchets. *Yours:* The scoping
  convention — whether a rule may apply only to boards that pass from now on.
- *If undecided:* Nothing today. The next city board, if cut by copying the last passed
  one, inherits the line.

*(Added 2026-09-08 from the DOM namespace sweep, call 2 — `docs/sweep-2026-09-02.md:1642`.
Convention: no player sees it.)*

**Question.** `"The train brought the Mosswake cargo home."` sits in `sit/dice-at-the-places/sim.js:322`,
`sit/two-ways-from-here/sim.js:431` and `sit/still-standing/sim.js:601`, and `dawnspur-site`
carries three unrendered `*_SENTENCE` constants — all desk-voiced, none rendered, quoted in no
document, and pinned verbatim by one passed board's test
(`test/two-ways-from-here.test.js:788`, `assert.equal(h.b.runSentence, "The train brought the
Mosswake cargo home.")`). Is dead desk prose in a passed board's sim evidence to leave as
pinned, or a re-voicing owed before the next city board inherits it a fourth time?

**What the document says.** The record, `:1642-1650` *(its "unquoted everywhere" is superseded
in place: unquoted in every document, and pinned by two-ways' test)*. `ROWS.runSentence` /
`endSentence` are BENIGN on the *read* question because nothing renders them. A `doesNotMatch`
guard against the sentence would be red on three passed boards today and could only go green by
editing them — three sims and one test.

**What source says.** The three `sim.js` lines above, `test/two-ways-from-here.test.js:788`, and
`sit/dawnspur-site/sim.js`'s `*_SENTENCE` constants.

**Blocked.** Nothing today. The next city board, if it is cut by copying the last passed one,
inherits the line.

**Orchestrator's read.** *Leave the three; forbid the fourth.* A guard that is red on passed
bytes is the permanently-red gate CLAUDE.md warns of twice; a guard scoped to boards that
pass after today is a ratchet. That scoping is a convention you would be setting, so it is
listed rather than built.

**Cost of getting it wrong.** A fourth city board ships the desk's sentence in its sim, and the
first time a city board renders its run sentence it renders the wrong lineage's voice.

---

## 44. `quiet` / `holds` / `neighbor` / `dim` on the city boards — dead wiring, or unwritten art?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a design call.)*
City boards switch four visual states — dim, quiet, holds, neighbor — on the Mosswake and
Halt buildings, no page has a drawing rule for any of the four, and on 23 of the 24
board-and-state pairs nothing ever turns the state on; do you delete the switches as dead
wiring, or write the missing art rules?

- *Why:* The one state that does get set (the herbs board's "neighbor again") lives on the
  one map board that does not switch neighbor at all, so nothing in the tree connects a state
  that moves to a switch that shows it. Against that, six boards carry the switches and the
  dice board has art-direction comments naming the states, which says someone meant them.
- *Options:*
  a. **Delete the switches (dead wiring)** — Remove the four state toggles from the city
     boards. *Costs:* Touches passed boards; if the states were art waiting for its rules, this
     deletes that art direction.
  b. **Write the rules (unwritten art)** — Write the drawing rules for the four states so the
     switches show something. *Costs:* Touches passed boards; if the switches were dead wiring,
     they are kept and every future city board copies them because they look like a convention.
- *The orchestrator's read, not a ruling:* Orchestrator's read: closer to dead wiring than
  the record presented it — the only evidence for planned art was a state that moves, and
  measured, that state never reaches a switch — but six boards' worth of switches and the
  dice comments say someone meant them. *Yours:* The remedy; the two are opposite and both
  touch passed boards. Not urgent — nothing renders differently under either reading today.
- *If undecided:* Nothing is blocked; the dim state is already guarded so its board list
  cannot drift silently. Getting it wrong means either deleting art direction that was
  waiting for its rules, or carrying dead switches into every future city board because they
  look like a convention.

*(Added 2026-09-08 from the DOM namespace sweep, call 3 — `docs/sweep-2026-09-02.md:1651`;
finding 19 at `:1379`, finding 2 (`dim`) at the record's finding 2. Convention: opposite
remedies, no measurement decides.)*

**Question.** City boards toggle four classes on `#mosswake` and `#halt` that no page styles —
`dim` on six, `quiet` on five, `holds` on five, `neighbor` on four — and on 23 of the 24
board/flag pairs nothing ever writes the flag. The one writer, `herbs-larder`'s
`neighborAgain` (`sim.js:132`), is on the one map board that does not toggle `neighbor` at
all: the only flag that moves reaches no class on any page. `dice-at-the-places` carries
art-direction comments naming the states. Delete the toggles (dead wiring), or write the rules
(unwritten art)?

**What the document says.** The record, `:1651-1660` and finding 19 at `:1379` *(its "six
boards … 19 of 20 pairs" is superseded in place with the per-token counts above, measured at
`0ffd1aa` by the review)*. The readers did not disagree; the sweeper declined to guess and the
refuter supplied the discriminator — which, re-measured, is that the single moving flag never
reaches a toggle.

**What source says.** `classList.toggle("quiet" | "holds" | "neighbor" | "dim", …)` in
`sit/*/index.html` per the counts above; no `.quiet` / `.holds` / `.neighbor` / `.dim` selector
on any city page; `sit/herbs-larder/sim.js:132` and no `toggle("neighbor"` in
`sit/herbs-larder/index.html`.

**Blocked.** Nothing. `dim` is now a guard row (landed with the sweep) so the toggle's board
list cannot drift silently either way.

**Orchestrator's read.** *Closer to dead wiring than the record presented it.* The record's one
piece of evidence for planned art was a flag that moves; measured, that flag is written on a
board with no toggle for it and toggled on boards that never write it, so nothing in the tree
connects the two halves. Against that, six boards' worth of toggles and dice's art-direction
comments say someone meant them. The remedies are opposite and both touch passed boards; yours,
and not urgent — nothing renders differently under either reading today.

**Cost of getting it wrong.** Deleting art direction that was waiting for its rules; or
carrying dead toggles into every future city board because they look like a convention.

---

## 45. `dawnspur-site`'s odd shape — a convention future city boards must avoid, or an accepted one-off?

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
The site board builds its scenery (scaffold, works, hearth, bill) as page-wide unique ids
and uses three of the desk's ids (train, hearth, platform), where the halt board and every
map board use classes inside a named building — is site's shape a convention future city
boards must not copy, or an accepted one-off?

- *Why:* Site was the first city board and its shape predates the pattern the map boards
  later settled on; it passed on 2026-08-30 and is frozen, so a future author may copy it
  because it is the passed ancestor. A comment now sits above the DOM rows in the name check,
  and the answer decides whether that comment is a warning or a rule.
- *Options:*
  a. **Convention to avoid (a rule)** — Future city boards must use the map boards' way —
     classes inside a named building — and not copy site. *Costs:* None named by the entry.
  b. **Accepted one-off** — Site's shape is accepted as its own, and the comment says so.
     *Costs:* If not said plainly, a future board copies site as the passed ancestor and the
     id-versus-class split widens by one board.
- *The orchestrator's read, not a ruling:* Orchestrator's read: a one-off, and say so in
  the comment — site's shape predates the map boards' pattern and nothing in a sit turned on
  it; but "the map boards' way is the rule" is a rule about future boards, and those are
  David's. *Yours:* Rules about future boards.
- *If undecided:* Nothing today; the next city board's author reads the comment either way.
  The risk is a future board copying site and the id-versus-class split widening by one
  board.

*(Added 2026-09-08 from the DOM namespace sweep, call 4 — `docs/sweep-2026-09-02.md:1661`.
Convention.)*

**Question.** `dawnspur-site` is the one CITY board whose scenery parts (`scaffold`, `works`,
`hearth`, `bill`) are page-unique ids, where `dawnspur-halt` and every map board scope
classes inside a named building; it is also the one city board carrying `train`, `hearth` and
`platform` under the desk's ids. It passed (2026-08-30, recut 2) and is pinned. Is its shape
an ancestor convention every future city board must not copy, or an accepted one-off?

**What the document says.** The record, `:1661-1666`, and its *SCENERY PARTS* comment now
above `DOM_ROWS` in `test/lexicon-ledger.js`. The answer decides whether that comment is a
warning or a rule.

**What source says.** `sit/dawnspur-site/index.html` (ids) against `sit/dawnspur-halt/index.html`
and the six map boards (classes inside a building).

**Blocked.** Nothing. The next city board's author reads the comment either way.

**Orchestrator's read.** *One-off, and say so in the comment.* Site was the first city board
and its shape predates the convention the map boards settled; nothing in a sit turned on it.
But "the map boards' way is the rule" is a rule about future boards, and those are yours.

**Cost of getting it wrong.** A future city board copies site because it is a passed ancestor,
and the id-versus-class split that the `hearth` row now grades widens by one board.

---

# Tier 4 — Record corrections; nothing is blocked (6)

## 35. The sweep's fourteen canon line cites are all stale

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
The review record that lists fourteen rulebook questions for you cites each by a line
number, and all but one now point at the wrong sentence — may the record get a dated
correction block underneath, re-pointing the list to where each sentence sits now?

- *Why:* The same review that listed the questions also agreed an edit set that, once
  landed, grew the rulebook from 749 to 902 lines, so every line number but one now lands on
  the wrong sentence. The review had already caught this exact trap for the kills ledger
  earlier in the same record and called it a rule the second time, then published fourteen
  line cites into a file its own edit set was about to grow.
- *Options:*
  a. **Re-point them in place** — Add a dated correction block beneath the list in the review
     record, mapping each old line number to where the sentence sits now; the original list
     stays, because the record is append-only. *Costs:* A mechanical edit to one document;
     nothing else moves.
- *The orchestrator's read, not a ruling:* Orchestrator's read: re-point them in place with
  a dated correction block beneath the list, since the fix is mechanical and the record is
  append-only. *Yours:* The entry does not assign you a half — the ledger's own heading says
  these six corrections need no ruling; at most it wants your yes to the form.
- *If undecided:* Nothing is blocked, but the fourteen decisions get ruled from a list in
  which thirteen of the fourteen lines are wrong, whenever someone works from the review
  record rather than this ledger, which carries the corrected mapping.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
The entry records that eleven line references in the name-collision audit (into the beats
for CFD-200, 205, 205-halt, 208, 209, 210 and 201, and into the kills ledger) pointed at
different lines when the ledger was measured, and states the corrected numbers — but it
asks you nothing and does not say whether the audit itself should be edited.

- *Why:* The beats and the kills ledger grew after the audit was written, so the audit's
  line references no longer landed where they did. One of them, the CFD-200 reference, was
  wrong even on the day it was written, not merely stale.
- *Options:*
  a. **None framed by the entry** — The entry carries the corrected line numbers inside this
     ledger and proposes no action on the audit. *Costs:* None named.
- *The orchestrator's read, not a ruling:* The entry gives no orchestrator's read; it is a
  note that the corrected numbers are already carried in this ledger. *Yours:* Nothing — the
  entry assigns you no half, and the ledger's heading says these corrections need no ruling.
- *If undecided:* Nothing is blocked and the entry names no cost.
- *What the entry does not say:* The entry lists corrections without a question, so I could
  not tell whether it wants the audit edited or only wants you to know. Checker's own
  observation, not the entry's: opening the audit at the current tree, its citations were
  re-derived and re-pointed later on the day the ledger was measured, and these references
  now show the corrected numbers there — so this entry may already be overtaken; the entry
  does not say so.

**Nothing is blocked; this is a record correction.** Corrections carried inline above:
`cfd-200:1076-1093` → `:1139-1156` **and wrong at its own tree**; `cfd-205:207/:208` →
`:214/:215`; `cfd-205:268/:271` → `:275/:278`; `cfd-205-halt:203-206` → `:207/:209/:210`;
`cfd-208:452` → `:464`; `cfd-209:396` → `:423`; `cfd-210:80-81` → `:85-86`; `cfd-210:168` →
`:177` and `:274`; `cfd-208:278` (rim) → `:288`; `cfd-201:1017/:1386` (halt bridge) →
`:1052/:1442`; the KILLS.md cite formerly published as `:63` and then as `:114` names the 2026-08-24 starve-or-feed entry — de-lined 2026-09-09 per entry 33, and not to be republished as a line number.

---

## 37. The audit's §5 says the `cfd-201` halt bridge was superseded. It was not.

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
May the earlier section of the name-collision audit be corrected to agree with its later
section, which measured that the two 'home halt' lines in the CFD-201 desk beat were never
rewritten?

- *Why:* The audit's earlier section says the CFD-201 beat's two halt-bridge lines (the
  desk lineage describing its counterparty as the 'home halt', the place the city lineage
  calls home) and the CFD-209 beat's one were all rewritten in place by the review; measured
  at the current tree, only the CFD-209 line was. The audit's later section already says the
  CFD-201 ones were 'not built', with the checking reviewer and the orchestrator agreeing —
  so one document states one fact two ways.
- *Options:*
  a. **Correct the earlier section to match the later one** — Edit the audit's earlier claim
     so it says the CFD-209 line was rewritten and the CFD-201 lines were not, matching the
     section that measured it. *Costs:* A one-sentence edit to a record; nothing else moves.
- *The orchestrator's read, not a ruling:* Orchestrator's read: correct the earlier section
  to match the later one, because the later one is the measured half. *Yours:* The entry does
  not assign you a half; the ledger's heading says record corrections need no ruling.
- *If undecided:* Nothing is blocked; the audit keeps saying in one place that the desk
  board's halt lines were rewritten and in another that they were not.

**Nothing is blocked; this is a record correction.**
`docs/name-collisions-audit-2026-09-01.md:833-834` reads: *"**`docs/cfd-201-beat.md:1017` and
`:1386`, and `docs/cfd-209-beat.md:396`** carry the halt bridge in the design record
(§1.4). Superseded in place by the sweep — §6."* Measured at HEAD: `cfd-209`'s **was**
superseded (`:423`), but `cfd-201`'s two are at `:1052` and `:1442` with **no supersession
marker** — and §6 of the same document says so at `:991-996`: *"PWA pack → DESK — **not
built**"*, with the refuter ruling NONE and the orchestrator concurring. §5 and §6 of one
document disagree about one fact.

**Orchestrator's read.** *Correct §5 to match §6.* §6 is the measured half.

---

## 38. The audit still records `/dawnspur-heat/` as never swept

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
Should the name-collision audit's sentence saying the heat board 'was not swept' be
corrected now that it has been, while keeping the still-true half that the board's code
names no beat?

- *Why:* The audit was written before the CFD-176 review ran against the heat board, so
  'was not swept' was true then and has been false since that review landed. The other half
  of the sentence — the heat board's code carries no line pointing at a beat — is still true,
  so only that half survives as written.
- *Options:*
  a. **Correct the 'was not swept' half** — Change the audit's sentence so it records that
     the heat board has now been reviewed, leaving the 'names no beat' half as it is. *Costs:* A
     one-line edit; the CFD-176 review filed this correction but did not make it, because the
     audit was outside the files it was allowed to touch.
- *The orchestrator's read, not a ruling:* The entry gives no orchestrator's read beyond
  the measurement; the correction is filed and unbuilt. *Yours:* Nothing is assigned to you;
  the ledger's heading says these need no ruling.
- *If undecided:* Nothing is blocked; the audit keeps recording the heat board as never
  reviewed, which has been false since the review landed.

**Nothing is blocked; this is a record correction.**
`docs/name-collisions-audit-2026-09-01.md:872-873`: *"**`/dawnspur-heat/` cites no beat** —
its spec is not in this repository — and was not swept."* The "was not swept" half is false
since `97f3ecd`. The "cites no beat" half is still true — `sit/dawnspur-heat/sim.js` has no
`Spec:` line, verified. The CFD-176 sweep filed this itself (`docs/sweep-2026-09-02.md:920-923`)
and did not build it, as out of glob.

---

## 39. The CFD-176 record promises a David list it does not contain

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: a yes/no.)*
May the missing list — the nine calls for you that the CFD-176 review record says it lists
'separately, one line each' — be appended to that record from the review's saved results
file?

- *Why:* The record states 'David's calls: nine on the beat, two filings out of glob.
  Listed separately, one line each', and there is no such list anywhere in the landed
  document or in the scratch draft it came from. The nine survive only in the review's
  results file, and the orchestrator has already rebuilt them as entries 12, 13, 16, 20 and
  29 of this ledger, plus one folded into entry 9.
- *Options:*
  a. **Append the list to the record from the results file** — Add the nine calls, one line
     each, to the CFD-176 review record so its count and its enumeration agree. *Costs:* A
     docs-only append; the calls themselves are already in front of you as other entries.
- *The orchestrator's read, not a ruling:* Orchestrator's read: append the list from the
  results file, because a record that names a count and omits the enumeration is the drift
  mechanism this project already documents. *Yours:* The entry assigns you no half to rule
  here — it asks you to read it because the calls behind it are the ones you are ruling on in
  entries 9, 12, 13, 16, 20 and 29.
- *If undecided:* Nothing is blocked; the record keeps promising a list it does not
  contain, and anyone reading it instead of this ledger cannot find the nine calls.
- *What the entry does not say:* The entry says 'ten calls are sitting behind it' while the
  promised list is nine on the beat plus two filings; the entry does not reconcile the two
  counts.

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

**In plain terms.** *(2026-09-09, from a plain-language pass checked twice against this entry; effort: pick one of two or three.)*
Three small corrections: should the rulebook's 'one case out of six' be marked
unreproducible or the six cases named; should 'three sits running' narrow to two of three
unless your Linear sit note for the storm's fourth sit shows a copy request; and should the
origin of the halt bridge (the desk beat calling its destination 'the home halt', the place
the city lineage calls home) be filed against the game's own code rather than patched with
a note in a beat?

- *Why:* Two sentences in the rulebook rest on figures the review could not reproduce: the
  recut-cap sentence counts 'one case out of six' from six sequences written down nowhere,
  and the copy-recut sentence says you asked for copy 'three sits running' when, of your own
  words the storm board's file quotes from the three sits behind those copy recuts — the
  third, fourth and fifth — only the third and fifth ask for copy (the fourth is you naming
  copy that worked). Separately, the desk beat's 'home halt' wording turns out to come from
  the game's own content file, which files the home halt as a route — so the desk lineage
  inherited a route to the place the city lineage calls home, and the seed of that is
  upstream, not in the boards.
- *Options:*
  a. **Name the six sequences** — Someone enumerates the six recut sequences the rulebook
     counted, so 'one case out of six' becomes checkable. *Costs:* The review says the six
     cannot be reconstructed and warns not to let a reconstruction stand in, so this may not be
     doable honestly.
  b. **Mark 'one case out of six' unreproducible** — Leave the sentence but mark the figure
     as one nobody can re-derive. *Costs:* The rulebook carries a figure flagged as unverifiable
     rather than a number.
  c. **Keep 'three sits running' if Linear shows a copy request** — You check the storm's
     fourth sit's Linear note; if it asks for copy, the sentence stands as written. *Costs:* A
     Linear lookup by you; nothing changes.
  d. **Narrow to 'two of three' if Linear does not** — The rulebook sentence narrows to what
     the in-repo sit record supports. *Costs:* A one-phrase edit to the rulebook.
  e. **File the halt-bridge seed on the PWA side and leave the boards alone** — Record the
     issue against the game's content file, where the home halt is filed as a route, and change
     no board or beat. *Costs:* An issue filed in the game's repo; the boards keep the inherited
     wording.
  f. **Add a note in one beat** — Explain the halt-bridge wording inside a single beat.
     *Costs:* Fixes the symptom in one file only; the seed stays upstream.
- *The orchestrator's read, not a ruling:* Orchestrator's read: mark the figure
  unreproducible (prefer a null to a plausible number), narrow to two of three unless Linear
  says otherwise, and file the halt-bridge seed on the PWA side. *Yours:* The Linear lookup
  is yours — the entry calls the copy-request question a Linear lookup, not a judgement, and
  only your sit notes can settle it; the other two the entry does not assign to you
  explicitly.
- *If undecided:* Nothing is blocked; the rulebook keeps a figure nobody can reproduce and
  a 'three sits' that may be two, and the halt-bridge origin stays unfiled in the game repo.

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
  home. Recorded at `docs/name-collisions-audit-2026-09-01.md:835-839`. My read: *file it on
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
| **`KILLS.md:63` cites a beat that did not exist on main** | audit `:832-836` | **Resolved at `758a249`** — the beat merged from PR #3 with a provenance header at `f3f6222`; the cite resolves and now names the ledger's 2026-08-24 starve-or-feed entry — de-lined 2026-09-09 per entry 33, since that entry's own line number moves with every hosted-era insert. The audit already carries the supersession. |
| **Canon `s7.4-M6`** — the *"where every recut decision and its shas are recorded"* over-claim | sweep `:469-475` | **Withdrawn at review** by the sweep itself, because `b95a9c9` discharged most of it mid-run. The residual (four pre-host entries with no shas) folds into entry #7. |
| **Canon §7.4's `:604` vs `:623-635` self-inconsistency** — *"two intent questions"* vs the blessed TEND text | audit `:1026-1028`, recorded as out of scope | **Resolved at `b8d6da3`.** At HEAD `:745-751` names the trim question as signed at `30ff642`, identifies the second as the CFD-203 TEND question, and records that the trim question was recut into that shape at `16ac8e5` — *"so at HEAD that card asks none in the intent form."* |

**One partial reversal worth knowing.** The CFD-176 sweep asked you to hold the
`cfd-176:11` Seat supersession *"behind his word if he wants the convention uniform"*
(`docs/sweep-2026-09-02.md:873-874`). It landed anyway at `b232440`. That is why entry #9
is now *"make it uniform"* rather than *"should the first one land"* — the precedent is
already set in the tree, and five beats are on the other side of it.

---

# Measurement provenance, and one thing that moved under me

Every quotation and every line number above — entries 41–46's excepted, which were derived at
`c8c4546` and `925d23a` on 2026-09-08 with scratch under `C:\tmp\scope\` and `C:\tmp\domsweep\`
— was re-derived by me from the
working tree, not copied from a record. Read-only throughout: `git show`, `git log`, `grep`, `awk` and
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
`docs/name-collisions-audit-2026-09-01.md:786` publishes *"**22 tests; suite 694 → 716.**"*
The guard is 23 tests and the suite is 717 as of `919b6be`.

**If more than a few hours pass before this is ruled on, re-derive the canon line numbers
before quoting them.** That file has moved 153 lines in one day and was edited three times
while this list was being written.

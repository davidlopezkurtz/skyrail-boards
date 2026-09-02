# Kills ledger — append-only
Every kill records: date, board, build sha (from /build-info.json at the time of the sit),
what the player did, the recut decision. A kill without a sha is a story, not a kill.
Supersession is an edit with a forward pointer, never a deletion.

## Inherited from the pre-host era (no shas — the hosts died; specs on Linear CFD-166)
- 2026-08-23 · Dawnspur · B farm: gain outran the sink (marks 28, B+3 lit, WARM dim).
  Recut: one B per wreck — a missing lock, not a wrong number.
- 2026-08-23 · Dawnspur · HOLD–GOODS closed circle: B and WARM never lit.
  Recut: HOLD locked after first GOODS; board must light GOODS → B → HOLD → WARM.
- 2026-08-24 · Dawnspur · LEAVE-only dead end: marks 2, all jobs dark.
  Recut: invariant — if marks ≥ 1, at least one job is lit. (First unpause assertion.)
- 2026-08-2x · Convoy · wall after the first stop-2 table was impossible.
  Recut: Wall — one dirt bar per lock, hunter diverts middle.

## Standing rules carried from the review (2026-08-24, locked)
- First unpause commits, before any new verb: assert marks ≥ 1 lights a job; assert one B per wreck.
- Persisted-key rule: never delete a persisted key on a rename — leave a mirror the old build refuses.
- Schema rule: a change must never turn a refused action into an accepted one.
- ~~The pass is a cold player describing strip-to-warm in any words. David plays first (design check).~~
  **RETIRED 2026-08-25, David's word** ("the cold player pass is pointless at this point"):
  David's sit is the gate. The stranger prohibition lifts with it; no gate in front of the
  boards for now. Recorded on CFD-176; PLAN §4a carries the same edit.

## Hosted era (boards.skyrailreclamation.com — hashes are content sha256s; see kills/README.md)
- 2026-08-31 · They Remember · cut 0 · merge `7bcc315` (PR #19, 2026-08-31
  02:01Z) / index `acbf4304` / sim `164bd741`; Pages deployment id not in repo.
  David's sit, verbatim: "I collected herbs." Not a pass. Collect landed; the
  herbs stayed cargo. Every verb on the board sat at the Halt — the player's own
  house — so the reward came out of his own larder and nothing in the doing
  pointed at Mosswake, the neighbour who was helped. Recut: cut 1, an ACT recut
  under canon §7.4 — the one live can-do moves off the Halt to Mosswake; same
  path, same button ("Collect."). Refused, both measured: a reachability fix and
  a writing recut. Signed `0d67fd6`; implemented `ef87a12`, merged `7b58a18`;
  PASSED at `a525218`, 2026-08-31 — index `acbf4304` **unmoved**, sim
  `a3345903`, so the index hash does not distinguish the kill from the pass.
  Sit recorded at `docs/cfd-208-beat.md:346-350`; same verbatim in commit body
  `3c22c9a`. Record: Linear CFD-208.

- 2026-08-30 · Dawnspur Halt · Home sit · merge `c1b66ee5` / index `7aa764fa` /
  sim `678075c0`. David's sit, verbatim: "Lit the lamp and started the
  foundry." Two opening can-dos; he stopped. Glass, consist-home, CAST-heat
  never became play. Recut: the walk — one live can-do at a time. Same path.
  Dead jobs stay buttons and still post notices. Not louder Home copy. Not
  scenery-divs. Record: Linear CFD-205.

- 2026-08-30 · Dawnspur Halt · merge `e44212db` / index `f1b6292d` / sim
  `4126dfc0`. David's sit, verbatim: "I could tell these were different
  buildings and I could tell that I could feed them resources. Still not
  totally clear why I want to go they other than it begin right in front of
  me and I can." Buildings-as-buildings and feed landed. Place did not.
  Recut: writing on the existing work notices — Dawnspur Halt — Home. Same
  path. Do not recut buildings-and-feed away. Record: Linear CFD-205.

- 2026-08-30 · Dawnspur Site · recut 2, one live place · merge `c59dc101`
  (PR #13, 2026-08-30 16:35Z) / index `070a4619` / sim `e9f81b74`; Pages
  deployment id not in repo. David's sit: (verbatim on Linear CFD-205; not in
  repo). Sat 2026-08-30, not passed. Canon §7.4's evidence table records the
  sit as "grey-square random clicks — **fail**"
  (`docs/mechanisms-recommitted.md:572`). No recut: the board was stopped
  rather than recut, on "no further grey-square recut"
  (`docs/mechanisms-recommitted.md:589`; `docs/cfd-205-beat.md:9-11` and
  `:28-33`) — a finding routed to the Halt, not a failure of the board. That
  stop phrase is quoted in both places and attributed to no speaker. Do not
  recut this path; the pins stand and five later beats carry it as a failed
  sit (`docs/cfd-206-beat.md:28`). Record: Linear CFD-205.

- 2026-08-28/29 · Dawnspur Storm · five sits, five recuts, stopped without a
  pass · `/dawnspur-storm/`; Pages deployment ids not in repo. The cuts, each
  measured `git show <commit>:sit/dawnspur-storm/<file> | sha256sum`: cut 0
  `42e4aa8` / index `3321ca54` / sim `a1430c3c`; recut 1 `7fb5aeb` / index
  `d32720d9` / sim `75004603` — **both reached main in one merge, `eb92050`,
  2026-08-29 16:52Z, so no deploy of main ever served cut 0's bytes**; recut 2
  `7231c72` / index `b117d7db` / sim `904dab9b` (merge `f0a676d`); recut 3
  `7b5a38e` / index `4f7d5cd9` / sim `34325f0a` (merge `b964407`); recut 4
  `5d243a5` / index `2fc47ab6` / sim `53239355` (merge `ff6580e`); recut 5
  `299c950` / index `7711f979` / sim `f4f17008` (merge `555ba9a`) — where the
  board stands at HEAD, and recut 5 was never sat. `docs/cfd-201-beat.md:69-70`
  attributes recut 5's two hashes to `42e4aa8`; measured, they are `299c950`'s.
  David's five sits: (verbatim on Linear CFD-201; not in repo — the findings
  survive only as paraphrase in the five recut commit bodies, and `299c950`
  alone attributes words to him, unquoted in its source: "those descriptions of
  why to do these things do not make much sense"). The stop, verbatim,
  2026-08-29: "Mechanically it all worked nicely… It's definitely time for the
  city. I think we have a good loop buildout and need the spine to attach it
  to." (`docs/cfd-209-beat.md:121-124`; from "It's" on also at
  `docs/mechanisms-recommitted.md:591-592`). No recut: stopped at five on "do
  not recut `/dawnspur-storm/` for 'why more glass' — that is the city
  sitting" (`docs/mechanisms-recommitted.md:590-591`, attributed to no
  speaker) — a finding routed to the city, not a failure of the board (canon
  §7.4, `:588-594`). Record: Linear CFD-201.

- 2026-08-25 · Dawnspur scale sitting · build `5fabe7c` / index `d6d5e262` / sim
  `8f13c683` (bytes durable in git and deployment `c2e92c0a` — no byte archive
  needed, unlike the pre-git kills above). David's sit, verbatim: "it broke
  needs ta review." Reproduced: CARRY → idle 1.5s → the greenhouse died and the
  board went dark — decay-on-idle at the home, the treadmill canon refuses.
  Recut: the canon recommitment (`docs/mechanisms-recommitted.md`, David's
  collapse table verified 8/8, §5 signed) and the canon-checked recut beat
  (`docs/cfd-183-beat.md`, signed) — pure build + visible reserve + tending
  run, no deaths; the storm is the next sitting's reckoning.
- 2026-08-24 · Dawnspur · recut-4 end · index `35e6f1cd` / sim `1c6655fc` (Pages
  deployment 89417f1e; the build-info `commit` field carries sha256(sim.js)).
  David's sit, night: GOODS → B → HOLD → WARM, then leftover GOODS was the lit job
  (1 mark, dest A glowing, WARM dead, LEAVE still there) — "The same place as
  before." Not a spoken pass. Recut: the starve-or-feed beat — WARM charges
  something that can starve (feed / strip / wait).
  Bytes: kills/2026-08-24-dawnspur-recut4-end/. Record: Linear CFD-176.
- 2026-08-24 · Dawnspur · starve-or-feed first cut · index `bdde9b50` / sim
  `395c18f2` (Pages deployment 3b96c0ef, builtAt 22:09Z; STILL LIVE as the
  preserved kill — CFD-176 forbids overwriting it until the PM quotes a new sha
  and David sits). David's sit, 22:20Z: "Works mechanically. Feels pointless.
  Eventually nothing runs and there are no options. Kill." Starve-or-feed not
  visible. Recut: the signed CFD-176 beat (skyrail-boards#3,
  docs/cfd-176-beat.md) — heat banks in the stone at dest A; the outward step is
  what can die. Bytes: kills/2026-08-24-dawnspur-starve-or-feed/. Record: Linear CFD-176.
  2026-08-25, David's word: the kill bytes were absorbed byte-exact into
  public/dawnspur/, so deploys no longer threaten the preserved kill; the next
  sitting ships at a sibling path until David rules /dawnspur/ replaced.

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

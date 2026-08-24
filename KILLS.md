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
- The pass is a cold player describing strip-to-warm in any words. David plays first (design check).

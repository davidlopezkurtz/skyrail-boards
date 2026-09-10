# Killed-build byte archive

Do not hand-edit. Each directory is a byte-exact capture of a killed board,
fetched 2026-08-25 by the orchestrator from the immutable Cloudflare Pages
deployment named in its table, after the kill was recorded on Linear CFD-176.
`public/**` pushes clobber the live host (deploy.yml's path filter), which is
why kill evidence lives HERE and never under `public/`.

Provenance note on the `commit` field of the archived build-info.json files:
the CloudflareBot deploys of 2026-08-24 stamped `commit` with the sha256 of the
build's own `sim.js`, not a git sha — measured, not assumed: in both archives
sha256(sim.js) equals the build-info `commit` byte-for-byte. At capture time
neither build's bytes existed at any commit on any branch; these captures were
the only durable copy (storage doctrine, 2026-08-25). Later the same day, with
David's word, the starve-or-feed files were absorbed byte-exact into
`public/dawnspur/` so a `public/**` deploy is a no-op for the preserved kill —
this archive remains the provenance record.

## 2026-08-24-dawnspur-recut4-end — Pages deployment 89417f1e

| file | bytes | sha256 |
| --- | --- | --- |
| index.html | 10211 | 35e6f1cd1963d18e79870bfee0afbc08fc6a34340178a03b340b5306cb44b83f |
| sim.js | 2633 | 1c6655fc102a9e2d05a68364a18ddf203a697b6875bc21bf7549f3bcbece6328 |
| build-info.json | 165 | b382cef2b4e20bd09e9bcbbba8e6b519801c8407b7c99d8ef3a574d5f9307aa9 |

## 2026-08-24-dawnspur-starve-or-feed — Pages deployment 3b96c0ef (LIVE as the preserved kill)

| file | bytes | sha256 |
| --- | --- | --- |
| index.html | 11665 | bdde9b50331ac89d92b25d788e491d8ab24da710d9b598e392c1f686a697ac59 |
| sim.js | 3673 | 395c18f28d5e04b524b6e70fd9c8445802a0d038bf9f8d2694e28c8ccc2d320c |
| build-info.json | 165 | d0eca4ab49d61875b7c737d83ff8beffdc71f1b89490faaae44faee4d7992a0f |

Fetch-verify caveat *(measured-then, 2026-08-25 — corrected below,
2026-09-09)*: the durable host injects the Cloudflare Insights beacon into
HTML (+359 bytes on /dawnspur/ — 12024 live vs 11665 deployed), so a live
fetch of index.html will NOT hash-match these captures. Verify HTML against
the deployment's own *.skyrail-boards.pages.dev URL; sim.js and
build-info.json are served uninjected on both hosts.

*(SUPERSEDED, ruled by counsel on David's instruction, 2026-09-09 — council
entry 10: the injection above is not unconditional. It fires on a request
carrying an `Accept: text/html` header — measured 2026-09-02 (the sweep's
"Refuted at review — do not re-find" section in `docs/sweep-2026-09-02.md`,
found by text rather than by line) and re-measured by four independent
fetches on 2026-09-09, all agreeing. A PLAIN fetch (no `Accept: text/html`)
returns the archived bytes and hash-matches this file's `index.html` row
above exactly — 11,665 bytes, sha256 `bdde9b50…97ac59` — and THAT plain
fetch, not the pages.dev workaround, is the verification method for this
archive. The *.skyrail-boards.pages.dev route above remains valid as a
second route, for the day Cloudflare changes its trigger. The injected size
is NOT stable — it read one value on 2026-08-25 and 2026-09-02 and a larger
one on 2026-09-09 — and every reading came from ONE machine on ONE network
path, so no injected byte count and no delta is published in this correction,
including a re-statement of the +359 above. Prefer null to a plausible number.)*

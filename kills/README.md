# Killed-build byte archive

Do not hand-edit. Each directory is a byte-exact capture of a killed board,
fetched 2026-08-25 by the orchestrator from the immutable Cloudflare Pages
deployment named in its table, after the kill was recorded on Linear CFD-176.
`public/**` pushes clobber the live host (deploy.yml's path filter), which is
why kill evidence lives HERE and never under `public/`.

Provenance note on the `commit` field of the archived build-info.json files:
the CloudflareBot deploys of 2026-08-24 stamped `commit` with the sha256 of the
build's own `sim.js`, not a git sha — measured, not assumed: in both archives
sha256(sim.js) equals the build-info `commit` byte-for-byte. Neither build's
bytes exist at any commit on any branch of this repository; these captures are
the only durable copy (storage doctrine, 2026-08-25).

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

Fetch-verify caveat, measured 2026-08-25: the durable host injects the
Cloudflare Insights beacon into HTML (+359 bytes on /dawnspur/ — 12024 live vs
11665 deployed), so a live fetch of index.html will NOT hash-match these
captures. Verify HTML against the deployment's own *.skyrail-boards.pages.dev
URL; sim.js and build-info.json are served uninjected on both hosts.

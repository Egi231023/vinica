# Personal wine passport

The personal cellar now contains a ten-estate passport. Opening a winery chapter records its first-opened date in the existing `nv.cellar.v1` browser state. Opening more leaves from the same estate does not duplicate or change its stamp. The record describes chapters opened, not real-world visits or completion of reading.

Old cellar data without `visits` retains saved wines, later lists, notes and basket contents. Invalid visit structures are ignored. The passport is a browsing feature and does not grant membership or purchase access.

The notebook download exports versioned JSON containing visits, saved wines, later lists and tasting notes. It excludes the basket. The interface states the browser-local storage limitation; this is a downloadable copy, not a cloud backup or account sync.

Verification: first-opened tracking, deduplication across winery leaves, reload persistence, a ten-stamp grid, notebook download content and mobile width are checked in browser QA. The main smoke workflow also checks a recorded stamp and the download.

# Pages release flow

The `github-pages` environment permits only `claude/north-vine-wine-club-skgsjw`. The Pages workflow now runs on pushes to that branch. Feature branches continue to run CI; merging a reviewed and passing PR into the permitted branch triggers publication. Environment protection rules remain in place.

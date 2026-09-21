# Find your first bottle

A three-question editorial guide at `/chapter/first-bottle`, linked from the introduction and collection and included in the book’s reading order. Questions cover occasion, style and exploration preference. It returns up to three catalogue entries with matching explanations and save-to-cellar actions. No external recommendation service or new tasting claims are introduced.

Matching gives the chosen style the greatest weight. Occasion and familiar grape preferences provide smaller bonuses. Selection then favours a mix of producers and, when requested, provinces or grape varieties. Ties use the stable wine slug. Archived or discontinued entries are excluded; current producer listings receive a small preference over unconfirmed availability. Dated producer availability is shown separately from North & Vine’s unavailable ordering service.

Answers remain component-local and can be revisited with Back or Change my answers. They are not retained across reloads. Saved wines use the existing cellar storage. Empty or small catalogues do not duplicate entries.

`node --experimental-strip-types scripts/check-wine-guide.mjs` checks all 36 answer combinations, style matching, deterministic ordering, unique suggestions, archive exclusion and empty/small catalogues. The CI smoke walkthrough checks the three-step interface, three explained results and answer editing. Local browser QA also covers disabled progression without an answer, back navigation, saving, radio keyboard controls, and a 390px mobile viewport.

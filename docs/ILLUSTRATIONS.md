# Watercolor plates

Five original AI-created illustrations were generated with the built-in image-generation tool on 2026-09-21 for this book, in a watercolor-and-sepia-ink style. They are not physically hand-painted works, photographs, commissioned artist originals, or exact views of the named estates.

The western, eastern and Atlantic scenes are imagined regional moods. Multiple producer chapters intentionally share a regional plate; a caption identifies every scene as imagined. The botanical and cellar studies are editorial illustrations. Existing product photographs, bottle drawings, labels, catalogue facts and membership logic are unchanged.

## Assets and placement

| Stem in `public/art/` | Placement |
| --- | --- |
| western-vineyard | Opening page and British Columbia producer chapters |
| eastern-vineyard | Our Story, Ontario and Québec producer chapters |
| atlantic-vineyard | Producer index and Nova Scotia producer chapters |
| vine-study | Contents and collection notes |
| cellar-study | Trust and personal cellar |

Each stem has 480, 960 and 1536 px WebP variants. Full compositions retain their original 3:2 ratio. `BookArtwork` uses responsive sources, reserves layout space, loads only the opening image eagerly and prefixes paths for GitHub Pages. White margins blend into the existing paper with CSS multiply; no destructive background removal or generated product labels are used.

Exact generation briefs are retained in `docs/illustration-prompts.json`. Source PNGs were converted to WebP with Sharp (quality 86, effort 6); the 1536 px variants retain the generated dimensions and are the reusable high-resolution project assets.

## Verification

See the pull request for the build and browser verification results. These are editorial assets only; no photography permissions or supplier agreements are implied.

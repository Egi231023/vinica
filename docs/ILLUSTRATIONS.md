# North & Vine Atelier

The book contains 23 AI-created digital illustrations in watercolor and sepia-ink style: five imagined landscapes/studies and an additional 18 works created on 2026-09-21. North & Vine Atelier is a fictional editorial studio signature, not a real artist or a claim of physical hand painting. The enlarged artwork dialog explains the process and links the visual reference for each estate image.

## Art direction and placement

Ten individual reference-led illustrations now distinguish the ten winery chapters. They also appear in producer cellars and the interactive atlas. These are artistic interpretations, not documentary photographs, exact architectural records or proof of an estate visit. Tawse is a study of hands holding a bottle; Lightfoot & Wolfville is an interior; L’Orpailleur is a harvest scene. No invented Indigenous symbols were added to the Nk’Mip terrace scene.

Eight editorial studies cover Trust membership, vine roots, oak, harvest, frost, red and white sensory themes, and sparkling glassware. Roots and the membership notebook include imagined background scenery and must not be described as Canadian estate views. Fruit images are visual metaphors; the factual wine profile remains in the sourced tasting notes. The ice study appears beside dessert wines as an editorial winter motif, not proof of their production method.

The earlier western landscape remains on the opening spread, the eastern landscape in Our Story, the Atlantic landscape in the producer index, the vine study in Contents, and the imagined cellar in Your Cellar.

## Sources and assets

`atelier-reference-record.json` records source pages and research image URLs. Reference photos were inspected before generation and are not shipped in the repository. This provenance record does not assert a license from their photographers or an endorsement by a winery. The illustrations do not change product-photo licensing status: all 31 wine records still use the existing bottle silhouettes until actual product assets are obtained.

Each asset has 480, 960 and 1536 px WebP variants in `public/art`. The 18 new PNGs were resized/encoded with Sharp at quality 83, keeping the complete 3:2 composition. `BookArtwork` supplies responsive sizes, descriptive alternative text, lazy loading and an accessible native dialog for the larger plate. The first plate on estate pages and the opening page loads eagerly. The dialog supports Escape, focus restoration and keyboard isolation from book page turning. No image generation dependency runs in production.

## Reader experience

The opening and Trust spreads use shorter editorial copy. Collection results appear six per shelf with filter-aware pagination. Sources and unanswered interview questions are expandable. The map offers visual estate previews. Static membership and ordering remain unavailable; saved bottles and notes remain browser-local. No supplier agreements, pricing or commercial capabilities were invented.

## Validation

The production static export generates 75 pages and passes type checking and the content audit. Browser checks cover image loading, desktop/mobile overflow, art-dialog open/close, keyboard isolation, catalogue pagination and filtering. See the pull request for final verification status.

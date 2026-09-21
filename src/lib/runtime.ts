/**
 * Which build is this?
 *
 * The book has two shapes. The real service runs on a Node server, where
 * membership is verified server-side and a trial order is recorded by a Server
 * Action. GitHub Pages serves static files only, so neither of those can exist
 * there.
 *
 * Rather than water the real app down to what a static host allows, the static
 * build is a declared *reading preview*: the whole book, the map, the ten
 * producers, the collection and your own cellar all work, and everything that
 * genuinely needs a server says so on the page instead of pretending.
 *
 * `NEXT_PUBLIC_` so the same answer is available on both sides of the boundary.
 */
export const IS_STATIC_PREVIEW = process.env.NEXT_PUBLIC_NV_STATIC_PREVIEW === '1';

/** One sentence, used wherever a server-only affordance is stood down. */
export const STATIC_PREVIEW_NOTE =
  'This is the static reading preview on GitHub Pages. Membership is verified on a server, and there is no server here — so joining, the basket and ordering are switched off rather than faked. Everything else in the book works.';

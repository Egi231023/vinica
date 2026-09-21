# Decisions worth recording

Judgement calls made while building, and the reasoning, so they can be argued
with rather than reverse-engineered.

## The book is the architecture, not a skin

The spread, gutter, running head and folio are the layout system; chapters and
producer leaves are routes; page-turning is routing. The alternative — a normal
site with a paper background — was rejected because the brief asked for the book
to determine composition and navigation, and because the honest-provenance idea
only reads properly in a book's own furniture: footnotes, marginalia, tipped-in
leaves, an errata page.

## Three leaves per producer, not one long page

Each producer runs to three spreads — the place and its people, the chronicle,
the wines — at `/winery/[slug]`, `/winery/[slug]/chronicle`,
`/winery/[slug]/cellar`. It keeps each spread a readable length, gives every
part its own URL, and lets the corner-turn walk through a producer the way you
would read one.

## The turning leaf is an animation, not a DOM snapshot

On navigation a blank paper-coloured leaf rotates over the spine while the newly
exposed page settles. It is not a 3D flip of the previous page's rendered
content — that would need a DOM snapshot on every route change, for an effect
seen mostly edge-on. This is the honest description of what the animation does.

## Pins are clustered rather than nudged

Mission Hill and CedarCreek are 0.35 px apart at continental scale, Benjamin
Bridge and Lightfoot & Wolfville 0.5 px. Separating them visually would mean
drawing them somewhere they are not. Markers within 14 px are grouped into one
mark that opens into its members, each with its own coordinates shown. Labels
are laid out with a collision pass at build time.

## Two golds

`--gold-leaf` (#a8894c) is decoration — rules, hairlines, the ornament, borders.
`--gold` (#80652c) is text, darkened to 4.6:1 on paper. The leaf tone measures
2.8:1, which is a beautiful colour and an unreadable one, and chapter numbers,
dates and folios are real text.

## Bottles are drawn, and say so

See `PHOTOGRAPHY.md`. Briefly: we hold no licensed photography, and generating
imitations of real labels would infringe the producers and destroy the
credibility of every sourced sentence on the page.

## The loading skeleton is scoped, not global

A `loading.tsx` opens a streaming response, which commits a 200 status before a
page can call `notFound()`. With a root-level skeleton, `/wine/nope` returned
200. The skeleton now lives only under segments that cannot 404
(`/chapter`, `/cellar`, `/basket`), and the winery and wine routes return real
404s.

## Trial ordering is reachable on purpose

No wine is contracted, so a strict reading would hide the order button
everywhere and make the trial checkout unreachable — defeating the point of
having one. A member in trial mode can add any wine to the trial basket, with
the *Not contracted* fact stated on the wine page, in the basket line, and in
the order confirmation. It is a rehearsal, labelled as one at every step.

## The order store is anchored on globalThis

Server Actions and page renders are bundled into separate module graphs, so a
module-level `Map` gave each its own copy and an order recorded by the action
was invisible to the cellar page listing it. A database makes this disappear.

## Fonts come from npm, not a CDN

EB Garamond and Cormorant Garamond are installed as packages and self-hosted.
No third-party font request at runtime, no layout shift waiting on Google, and
the build works in a network-restricted environment.

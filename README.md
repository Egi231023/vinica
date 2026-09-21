# North & Vine

A Canadian wine club, experienced as a book.

Ten Canadian wineries in one volume, one **Trust** membership across all of them,
and a rule the whole codebase is built around: *every factual claim carries a
source and the date we checked it, and every gap is shown as a gap.*

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # map → content audit → next build
npm run audit:content
npm run build:preview  # the static reading preview, into out/
npm run smoke          # end-to-end, against a running build
```

## Two builds

| | `npm run build` | `npm run build:preview` |
|---|---|---|
| Runs on | a Node server | any static host (GitHub Pages) |
| The book, map, producers, collection, cellar | ✅ | ✅ |
| Membership, basket, trial ordering | ✅ | switched off, and says so |

The preview exists so the book can be read from a link. It is not a reduced
version of the design — every page, chapter and wine is there. What it cannot
have is a server, and membership is verified on a server by design, so the
preview stands those affordances down and explains why rather than faking them.
`scripts/build-static-preview.mjs` swaps the two Server Action modules for the
stubs beside them for the duration of that build, and restores them afterwards.

## What this is

The site is a book. Not a site with a paper texture — the book determines the
composition, the navigation and the way content is found:

- a bound **cover** that opens itself, briefly, skippably, once per session;
- **spreads** of two leaves with a gutter, running heads, page edges and real
  folios; one comfortable page at a time on a phone;
- **turning**: the corner of the paper, arrow keys, swipe, the table of contents,
  and permanent ribbons on the fore-edge;
- every chapter, producer and wine at its own URL, with a working Back button
  and a reload that lands where you were.

## The rules the code enforces

`npm run audit:content` fails the build if any of these is broken:

| Rule | Where |
|---|---|
| A `fact` must cite at least one source | `scripts/audit-content.mjs` |
| Every cited source id must exist, and every source must be cited | same |
| Every source carries a verification date and method | same |
| No wine may claim a photograph it does not have | same |
| A wine may only be orderable if its producer is a contracted partner | same |
| Pins must be inside Canada and carry a source for the location | same |

Three further rules live in the type system (`src/lib/types.ts`): a statement is
a `fact`, an `interpretation`, a `recommendation` or `unverified`, and is
rendered differently in each case; a vintage is a number, `NV`, or
`unspecified` — never inferred; availability at the producer, availability from
North & Vine, and price are three separate fields that cannot be conflated.

## Commerce

`src/config/business.ts` holds every commercial parameter, and all of them are
`null`. The membership fee, whether bottles are included, shipping, member
pricing, minimum term and cancellation are unconfirmed, and the UI renders an
honest “not yet set” for each rather than a placeholder number.

`COMMERCE_MODE` is `'trial'`. In trial mode a member can walk the whole ordering
flow — join, basket, place an order, see it in their cellar — and every screen
says plainly that nothing is charged and nothing ships. `commerceIsLive()`
refuses to return true until every term is confirmed, and `src/lib/session.ts`
throws if live mode is set without a session secret.

Membership is verified **on the server**, from a signed HTTP-only cookie, on
every order. Hiding buttons is a courtesy; the gate is in
`src/server/actions/orders.ts`.

## Layout

```
src/
  app/            routes — one per chapter, producer leaf and wine
  server/actions/ Server Actions: membership, orders (+ static stubs)
  components/     the book (stage, spread, cover, ribbons) and the content parts
    book/
  config/         business.ts — every unconfirmed commercial parameter
  data/           sources, wineries, wines, chapters + generated map geometry
  lib/            types, session, orders, cellar
scripts/
  build-map.mjs       projects Natural Earth geometry + winery pins
  audit-content.mjs   enforces the provenance rules
docs/
  VERIFICATION.md     how each fact was checked, and the re-check queue
  PHOTOGRAPHY.md      why bottles are drawn, and how to replace them
  OPEN-QUESTIONS.md   what we need from the business and from producers
```

## The map

`scripts/build-map.mjs` projects Natural Earth country outlines and the ten
winery coordinates through the *same* Lambert conformal conic projection, at
build time, so a pin cannot drift from its coordinates. Four Okanagan estates
fall within a pixel of each other at continental scale, so markers that close
are grouped rather than nudged apart, and labels are laid out with a collision
pass. The 280 kB of coastline renders in a server component; the client ships
6 kB of markers.

## Environment

| Variable | Purpose |
|---|---|
| `NV_SESSION_SECRET` | HMAC key for the membership cookie. Required before `COMMERCE_MODE` may be `'live'`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `sitemap.xml` and `robots.txt`. |

Typefaces (EB Garamond, Cormorant Garamond) are self-hosted from npm — no
third-party font requests at runtime.

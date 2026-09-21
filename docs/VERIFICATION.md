# How the facts in this book were checked

## The standard

Every statement that reaches a reader is one of four things, and is typed as
such in `src/lib/types.ts`:

- **fact** — checkable against a cited source. Must carry at least one source
  id, or the content audit fails the build.
- **interpretation** — our reading of the facts. Rendered with an *Our reading*
  mark so nobody mistakes it for the winery's claim.
- **recommendation** — serving, pairing, drinking window. A judgement, marked as
  advice.
- **unverified** — written but unsourced. Never published as fact; it becomes an
  open question on the producer's page instead.

Each source records its publisher, title, URL, kind (producer / editorial /
official), the date it was checked, and **how** it was checked.

## A limitation we are not hiding

Every source in this build carries `method: 'search-snippet'`.

The environment this book was built in could not fetch third-party sites
directly — outbound HTTPS was restricted by network policy, and every attempt to
open a producer's own pages was refused. Facts were therefore confirmed through
search-engine retrieval of the cited pages rather than by reading the pages
themselves.

That is weaker than a direct read, in two specific ways:

1. A search summary can conflate two nearby statements on a page.
2. A page may have changed since the index was built, so "checked on" is the
   date we confirmed the claim, not necessarily the date the page said it.

So the book labels every such citation **indirect**, in every source list, on
every page. It is visible to readers, not buried here.

Two known consequences already in the text:

- Mission Hill's Avery Trophy is dated 1994 for the 1992 Chardonnay, from a
  secondary source. The competition's own result sheet has not been seen. This
  is listed as an open question on that producer's page.
- Closson Chase is recorded as founded 1998 with a first commercial vintage in
  2004; sources describe the estate as a pioneer "since 1998" and the ten-case
  vintage as 2004. The distinction between planting and founding has not been
  confirmed with the producer.

## The re-check queue

In priority order, once direct access to the web is available:

1. Re-read all 12 producer sites and upgrade `method` to `'page'` for every
   claim that survives; delete any that does not.
2. Confirm every wine's vintage, volume and alcohol against the producer's own
   product page, and fill the 14 `unspecified` vintages or remove those wines.
3. Obtain primary sources for all awards — competition result pages, not press
   summaries.
4. Verify each address against the producer's own contact page and upgrade
   coordinate `precision` from `approx` to `exact` where a street address is
   published.
5. Transcribe the full public wine list for each producer and change each
   winery's `catalogue.status` from `sample` to `partial` or
   `complete-as-published`, with `publishedCount` recorded.

## Coverage at the last audit

Run `npm run audit:content` for current figures. At the time of writing:

- 10 producers, 31 wines, 63 sources — all 63 verified indirectly.
- 72 sourced facts and 18 marked interpretations across the producer chapters.
- 14 wines with an unconfirmed vintage, printed as gaps.
- 2 producers (Lightfoot & Wolfville, L'Orpailleur) with no wine yet verified to
  the book's standard; their shelves are shown empty rather than filled with
  half-facts.
- 0 wines with a licensed photograph. See `PHOTOGRAPHY.md`.

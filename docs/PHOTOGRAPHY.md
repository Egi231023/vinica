# Photography

## Where we stand

**No rights-cleared photograph of any bottle in this book has been obtained.**
All 31 wines carry `photo.status: 'missing'`.

## What we did instead, and what we refused to do

We refused to generate images of the producers' labels. An AI-made imitation of
a real wine label is two problems at once: it infringes the producer's artwork
and trade dress, and it puts a fabricated object in a book whose entire claim is
that it does not fabricate. A convincing fake label would undermine every
sourced sentence around it.

So every bottle is **drawn** (`src/components/Bottle.tsx`): the correct
silhouette for its bottle shape (Bordeaux, Burgundy, Alsace, sparkling, 375 ml
dessert), the right glass colour for its wine type, and a plain plate set in
North & Vine's own lettering carrying the producer's initials and the vintage.
It is recognisably our drawing and could not be mistaken for a photograph of
their label. Every wine page says so under the bottle.

## How a real photograph replaces a drawing

It is a data change, not a code change. In `src/data/wines.ts`:

```ts
photo: {
  status: 'licensed',
  src: '/photos/tawse-quarry-road-unoaked-chardonnay-2024.png',
  credit: 'Photograph courtesy of Tawse Estate Winery.',
  on: '2026-10-04',
}
```

`Bottle.tsx` uses the photograph whenever `status === 'licensed'` and `src` is
set. The content audit fails the build if a wine claims a licensed photograph
without a file or without a credit.

## Requirements for supplied images

- Bottle photographed square-on, label level, no perspective distortion.
- Cut out precisely to a transparent background, retaining the true silhouette,
  shoulder line, capsule and label proportions. No reshaping, no relighting that
  changes the glass colour.
- The vintage on the bottle must be the vintage in the data. Never substitute
  one vintage's photograph for another — if we hold a 2022 image and list a 2024
  wine, the wine keeps `status: 'missing'`.
- At least 1600 px on the long edge, PNG with alpha; served as AVIF/WebP.
- Written permission recorded in the tracking table below before publication.

## The request

Sent to each producer's marketing or media contact:

> Subject: Image permission request — North & Vine
>
> Hello,
>
> I'm writing from North & Vine, a Canadian wine service in development. We're
> building an editorial guide to ten Canadian producers, and you are one of
> them. The write-up is independent — there is no commercial relationship
> between us, and the page says so.
>
> We would like permission to use your product or press photography of your
> bottles alongside the write-up, with a credit line of your choosing. If you
> have a media kit or press area, a link is enough.
>
> Two things we will not do: we will not alter your labels, and we will not
> generate images of them. Where we have no photograph, the page shows a drawn
> bottle and says a photograph is missing.
>
> We would also welcome corrections to anything we have written about you, and
> we have a short list of questions we would like to put to your winemaker —
> they are published on your page, openly marked as unanswered.
>
> With thanks,
> North & Vine

## Tracking

| Producer | Contact found | Request sent | Reply | Permission | Images received |
|---|---|---|---|---|---|
| Tawse Estate Winery | — | — | — | — | — |
| Inniskillin | — | — | — | — | — |
| Closson Chase Vineyards | — | — | — | — | — |
| Mission Hill Family Estate | — | — | — | — | — |
| CedarCreek Estate Winery | — | — | — | — | — |
| Nk'Mip Cellars | — | — | — | — | — |
| Clos du Soleil Winery | — | — | — | — | — |
| Benjamin Bridge | — | — | — | — | — |
| Lightfoot & Wolfville Vineyards | — | — | — | — | — |
| Vignoble de l'Orpailleur | — | — | — | — | — |

Nothing in this table is filled in, because no request has been sent: the build
environment had no outbound email and no direct web access. This is the first
task for whoever picks the project up.

## Beyond bottles

The chapters also want original photography of place — vineyards, cellars,
people. None has been commissioned. Landscape imagery is easier to license than
bottle shots and would change how the producer chapters read; it is the second
photography task after bottles.

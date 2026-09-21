# Current authorization and implementation — 2026-09-21

The project owner explicitly confirmed that all ten wineries cooperate and permit original bottle photography on this website, including background removal. This is owner-reported authorization, not an independently inspected licence. It supersedes the earlier publication hold below. No private agreement or personal data is committed. Image metadata uses `authorized` / `owner-confirmed`, not `licensed`.

Twenty-one original producer/distributor assets are displayed on 23 catalogue entries. NV Brut matches the non-vintage product; the other 22 entries visibly label their image as a packaging reference. Each new reference identifies the producer release and the catalogue vintage, or says that the catalogue vintage is unconfirmed. Catalogue vintages and descriptions have not been changed to match images. The remaining eight entries retain silhouettes pending suitable assets.

Original labels and geometry are preserved. Assets are resized and encoded as WebP; existing alpha is retained. White studio backgrounds blend with the paper using CSS, rather than inventing or repainting labels. These are not all transparent cutout files. Provenance is recorded in `src/data/bottle-photos.ts`. The catalogue, winery shelves, guide and personal cellar share the same image metadata.

Additional sourcing: the second batch adds 11 original assets to 12 entries across Tawse, Mission Hill, Clos du Soleil, CedarCreek and Benjamin Bridge. The first four producers expose public Commerce7 storefront product feeds; their tenant identifiers were read from the official websites. Benjamin Bridge publishes its Shopify product feed. Product and original asset URLs are recorded per entry. CedarCreek uses the producer's second product image, which contains the bottle and award badge without the vineyard backdrop. Producer-supplied award badges are preserved and refer to the depicted release, not an older catalogue vintage.

The 2024 Compendium image was rejected because its label identifies Columbia Valley, while our catalogue describes an Okanagan wine. The 2024 Quarry Road Chardonnay photograph is only a packaging reference for the 2014 oaked Chardonnay entry; it is not assigned to the separate unoaked wine. No magnum or gift-set images replace standard bottles.

Remaining silhouettes: Tawse Quarry Road Unoaked Chardonnay 2024, Quarry Road Riesling 2019, Grower's Blend Pinot Gris, Sketches Chardonnay; Closson Chase South Clos Pinot Noir 2023; Mission Hill Compendium; CedarCreek Platinum Block 2 Pinot Noir 2014 and Aspect Block 3 Riesling 2020.

## Historical research record (superseded permission status)

# Photography

## Where we stand

**No rights-cleared photograph of any bottle in this book has been obtained.**
All 31 wines carry `photo.status: 'missing'`.

## Current presentation

Product photographs must depict the actual bottle accurately. Generated label imitations cannot establish packaging or vintage accuracy and should not replace the original assets.

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

Draft for a producer’s marketing or media contact — not sent:

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


## Research update — 2026-09-21

Three original Inniskillin bottle images were located in the official MMD distributor materials archive, downloaded for internal inspection and visually checked. The images show Vidal, Vidal Gold and Sparkling Vidal; no vintage is visible. They are linked as current packaging references on four corresponding wine pages, not displayed as licensed photographs of the catalogued vintages.

- Archive: https://mmdusa.net/portfolio/inniskillin/materials/bottle-shot
- Vidal: https://mmdusa.b-cdn.net/assets/uploads/materials/bottle/Inniskillin-Vidal-6189-1708124433.jpg
- Gold: https://mmdusa.b-cdn.net/assets/uploads/materials/bottle/Inniskillin-Vidal-Gold-6188-1708124377.jpg
- Sparkling: https://mmdusa.b-cdn.net/assets/uploads/materials/bottle/Inniskillin-Vidal-sparkling-hi-res-6185-1708124143.jpg
- Published terms checked: https://www.iubenda.com/terms-and-conditions/75761844 — no permission for this commercial republication was established. Obtain written clearance before hosting copies under this project’s image policy.
- Clos du Soleil’s trade hub and sales/media page were also checked: https://www.closdusoleil.ca/trade/ and https://www.closdusoleil.ca/sales-media/ . These provide a route to request assets; no cleared bottle pack was obtained.
- Tawse, Closson Chase, Benjamin Bridge and Nk’Mip public sites were inspected. Product listings or on-site images alone were not treated as a reuse license.

No permission requests have been sent. Product-photo statuses remain unchanged. Next request: obtain the correct vintage assets and an explicit web-use grant, then replace silhouettes through the existing photo metadata path.

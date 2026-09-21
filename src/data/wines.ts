import type { Wine } from '@/lib/types';
import { WINERIES_BY_SLUG } from './wineries.ts';

const ON_NIAGARA: Wine['region'] = {
  appellation: 'Niagara Peninsula',
  province: 'ON',
  provinceName: 'Ontario',
};
const ON_NOTL = WINERIES_BY_SLUG['inniskillin'].region;
const ON_PEC = WINERIES_BY_SLUG['closson-chase'].region;
const BC_OK = WINERIES_BY_SLUG['mission-hill'].region;
const BC_SIM = WINERIES_BY_SLUG['clos-du-soleil'].region;
const NS_GASP = WINERIES_BY_SLUG['benjamin-bridge'].region;

/** Nothing is contracted yet, so every wine carries the same honest answer. */
const NOT_CONTRACTED = 'not-contracted' as const;
const CHECKED = '2026-09-21';

/** No rights-cleared photography has been obtained yet. See docs/PHOTOGRAPHY.md. */
const NO_PHOTO = { status: 'missing' as const };

export const WINES: Wine[] = [
  // ───────────────────────────── Tawse
  {
    slug: 'tawse-quarry-road-unoaked-chardonnay-2024',
    winerySlug: 'tawse',
    name: 'Quarry Road Vineyard Unoaked Chardonnay',
    vintage: 2024,
    colour: 'white',
    grapes: [{ variety: 'Chardonnay', share: 100 }],
    region: { appellation: 'Vinemount Ridge', parent: 'Niagara Peninsula', province: 'ON', provinceName: 'Ontario' },
    vineyard: 'Quarry Road',
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'Honeydew and citrus zest on the nose, with a subtle note of cherry blossom.',
          kind: 'fact',
          sources: ['tawse-quarry-road-unoaked'],
        },
        {
          text: 'Farmed organically, fermented in stainless steel to keep the site legible, with a portion through malolactic fermentation for texture.',
          kind: 'fact',
          sources: ['tawse-quarry-road-unoaked'],
        },
      ],
      structure: { body: 2, acidity: 4, sweetness: 1 },
    },
    serving: [
      { text: 'Serve cool rather than cold — around 10–12 °C — so the texture is not flattened.', kind: 'recommendation', sources: ['tawse-quarry-road-unoaked'] },
    ],
    pairing: [
      { text: 'Suits shellfish, cured trout and young goat’s cheese; the unoaked style leaves room for delicate food.', kind: 'recommendation', sources: ['tawse-quarry-road-unoaked'] },
    ],
    story: [
      {
        text: 'Quarry Road is bottled both with and without oak. Tasted beside the barrel-raised version it is the cleanest way to hear what the vineyard sounds like on its own.',
        kind: 'interpretation',
        sources: ['tawse-quarry-road-unoaked', 'saq-tawse-quarry-chardonnay'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['tawse-quarry-road-unoaked'] },
    sources: ['tawse-quarry-road-unoaked', 'wco-tawse-quarry-2023'],
  },
  {
    slug: 'tawse-quarry-road-chardonnay-2014',
    winerySlug: 'tawse',
    name: 'Quarry Road Chardonnay',
    vintage: 2014,
    colour: 'white',
    grapes: [{ variety: 'Chardonnay', share: 100 }],
    region: { appellation: 'Vinemount Ridge', parent: 'Niagara Peninsula', province: 'ON', provinceName: 'Ontario' },
    vineyard: 'Quarry Road',
    abv: 13,
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'Estate bottled, VQA Vinemount Ridge, 13% alcohol.',
          kind: 'fact',
          sources: ['saq-tawse-quarry-chardonnay'],
        },
        {
          text: 'The Quarry Road parcels give fine, sleek Chardonnay with marked minerality and a well-judged oak frame, around yellow apple and pear.',
          kind: 'fact',
          sources: ['saq-tawse-quarry-chardonnay'],
        },
      ],
      structure: { body: 3, acidity: 4, sweetness: 1 },
    },
    story: [
      {
        text: 'The barrel-raised counterpart to the unoaked bottling from the same vineyard.',
        kind: 'interpretation',
        sources: ['saq-tawse-quarry-chardonnay', 'tawse-quarry-road-unoaked'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'archive', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['saq-tawse-quarry-chardonnay'] },
    sources: ['saq-tawse-quarry-chardonnay'],
  },
  {
    slug: 'tawse-quarry-road-pinot-noir',
    winerySlug: 'tawse',
    name: 'Quarry Road Pinot Noir',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [{ variety: 'Pinot Noir', share: 100 }],
    region: { appellation: 'Vinemount Ridge', parent: 'Niagara Peninsula', province: 'ON', provinceName: 'Ontario' },
    vineyard: 'Quarry Road',
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'A medley of freshly picked berries on the nose — raspberry, strawberry, cherry and cranberry.',
          kind: 'fact',
          sources: ['bishops-tawse-quarry-pinot'],
        },
        { text: 'Twelve months in French oak, 20% of it new.', kind: 'fact', sources: ['bishops-tawse-quarry-pinot'] },
      ],
      structure: { body: 3, acidity: 4, tannin: 3, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['bishops-tawse-quarry-pinot'] },
    sources: ['bishops-tawse-quarry-pinot'],
  },
  {
    slug: 'tawse-quarry-road-riesling-2019',
    winerySlug: 'tawse',
    name: 'Quarry Road Riesling',
    vintage: 2019,
    colour: 'white',
    grapes: [{ variety: 'Riesling', share: 100 }],
    region: { appellation: 'Vinemount Ridge', parent: 'Niagara Peninsula', province: 'ON', provinceName: 'Ontario' },
    vineyard: 'Quarry Road',
    bottle: 'alsace',
    profile: {
      notes: [
        {
          text: 'Lime and wet stone on the nose with honeysuckle, grapefruit, apple and a floral lift; the palate pulls between sweet and tart citrus over severe acidity.',
          kind: 'fact',
          sources: ['winesinniagara-tawse'],
        },
      ],
      structure: { body: 2, acidity: 5, sweetness: 2 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'archive', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winesinniagara-tawse'] },
    sources: ['winesinniagara-tawse'],
  },
  {
    slug: 'tawse-growers-blend-pinot-gris',
    winerySlug: 'tawse',
    name: 'Growers Blend Pinot Gris',
    vintage: 'unspecified',
    colour: 'white',
    grapes: [{ variety: 'Pinot Gris', share: 100 }],
    region: ON_NIAGARA,
    bottle: 'alsace',
    profile: {
      notes: [
        {
          text: 'A light copper colour, with mature apple, melon, summer peach and Asian pear.',
          kind: 'fact',
          sources: ['winesinniagara-tawse'],
        },
        { text: 'Made from fruit sourced across selected Niagara vineyards rather than a single site.', kind: 'fact', sources: ['winesinniagara-tawse'] },
      ],
      structure: { body: 3, acidity: 3, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winesinniagara-tawse'] },
    sources: ['winesinniagara-tawse'],
  },
  {
    slug: 'tawse-sketches-chardonnay',
    winerySlug: 'tawse',
    name: 'Sketches Chardonnay',
    vintage: 'unspecified',
    colour: 'white',
    grapes: [{ variety: 'Chardonnay', share: 100 }],
    region: ON_NIAGARA,
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'A second-label Chardonnay blending purchased and estate fruit, barrel fermented and barrel aged, through full malolactic fermentation.',
          kind: 'fact',
          sources: ['winesinniagara-tawse'],
        },
      ],
      structure: { body: 3, acidity: 3, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winesinniagara-tawse'] },
    sources: ['winesinniagara-tawse'],
  },

  // ───────────────────────────── Inniskillin
  {
    slug: 'inniskillin-vidal-icewine-2019',
    winerySlug: 'inniskillin',
    name: 'Vidal Icewine',
    vintage: 2019,
    colour: 'dessert',
    grapes: [{ variety: 'Vidal', share: 100 }],
    region: ON_NOTL,
    volumeMl: 375,
    abv: 9.5,
    bottle: 'dessert-375',
    profile: {
      notes: [
        { text: 'Released at roughly 250 g/L residual sugar and 9.5% alcohol.', kind: 'fact', sources: ['winecom-inniskillin-gold'] },
      ],
      structure: { body: 4, acidity: 4, sweetness: 5 },
    },
    serving: [
      { text: 'Serve well chilled, around 8 °C, in a small glass; a 375 ml bottle pours ten or more servings.', kind: 'recommendation', sources: ['winecom-inniskillin-gold'] },
    ],
    story: [
      {
        text: 'The grapes are picked and pressed while frozen on the vine. Everything about the wine — the concentration, the low alcohol, the price — follows from that one decision to wait.',
        kind: 'interpretation',
        sources: ['wikipedia-inniskillin'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winecom-inniskillin-gold'] },
    sources: ['winecom-inniskillin-gold'],
  },
  {
    slug: 'inniskillin-gold-vidal-icewine-2019',
    winerySlug: 'inniskillin',
    name: 'Gold Vidal Icewine',
    vintage: 2019,
    colour: 'dessert',
    grapes: [{ variety: 'Vidal', share: 100 }],
    region: ON_NOTL,
    volumeMl: 375,
    abv: 10,
    bottle: 'dessert-375',
    profile: {
      notes: [
        { text: 'Roughly 272 g/L residual sugar at 10% alcohol.', kind: 'fact', sources: ['winecom-inniskillin-gold'] },
        { text: 'Bright, zingy citrus over softer, rounder stone fruit.', kind: 'fact', sources: ['winecom-inniskillin-gold'] },
      ],
      structure: { body: 5, acidity: 4, sweetness: 5 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winecom-inniskillin-gold'] },
    sources: ['winecom-inniskillin-gold'],
  },
  {
    slug: 'inniskillin-sparkling-vidal-icewine-2018',
    winerySlug: 'inniskillin',
    name: 'Sparkling Vidal Icewine',
    vintage: 2018,
    colour: 'dessert',
    grapes: [{ variety: 'Vidal', share: 100 }],
    region: ON_NOTL,
    volumeMl: 375,
    abv: 9.5,
    bottle: 'sparkling',
    profile: {
      notes: [
        { text: '241 g/L residual sugar at 9.5% alcohol.', kind: 'fact', sources: ['inniskillin-sparkling-icewine'] },
        {
          text: 'Exotic fruit, peach, orange and honey on the nose; citrus, mango, lychee and pineapple on the palate, carried by crisp acidity and a lively bead.',
          kind: 'fact',
          sources: ['inniskillin-sparkling-icewine'],
        },
      ],
      structure: { body: 4, acidity: 4, sweetness: 5 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['inniskillin-sparkling-icewine'] },
    sources: ['inniskillin-sparkling-icewine'],
  },
  {
    slug: 'inniskillin-vidal-icewine-2023',
    winerySlug: 'inniskillin',
    name: 'Vidal Icewine',
    vintage: 2023,
    colour: 'dessert',
    grapes: [{ variety: 'Vidal', share: 100 }],
    region: ON_NOTL,
    volumeMl: 375,
    bottle: 'dessert-375',
    profile: {
      notes: [
        {
          text: 'Tropical aromatics of mango and orange; peach, nectarine and citrus on the palate against crisp, bright acidity.',
          kind: 'fact',
          sources: ['allendale-inniskillin-2023'],
        },
      ],
      structure: { body: 4, acidity: 4, sweetness: 5 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['allendale-inniskillin-2023'] },
    sources: ['allendale-inniskillin-2023'],
  },

  // ───────────────────────────── Closson Chase
  {
    slug: 'closson-chase-south-clos-pinot-noir-2023',
    winerySlug: 'closson-chase',
    name: 'South Clos Pinot Noir',
    vintage: 2023,
    colour: 'red',
    grapes: [{ variety: 'Pinot Noir', share: 100 }],
    region: ON_PEC,
    vineyard: 'South Clos',
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'An expressive nose of black fruit with dark cocoa and roasted coffee, lifted by violet and spice; supple and smooth on the palate, red fruit at the core.',
          kind: 'fact',
          sources: ['mywinecanada-closson-southclos', 'winealign-closson-sixpack'],
        },
      ],
      structure: { body: 3, acidity: 4, tannin: 3, sweetness: 1 },
    },
    story: [
      {
        text: 'South Clos is the more generous of the estate’s two blocks; Churchside, a short walk away, gives a savoury, earthier wine from the same grape.',
        kind: 'fact',
        sources: ['winealign-closson-sixpack'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['mywinecanada-closson-southclos'] },
    sources: ['mywinecanada-closson-southclos', 'winealign-closson-sixpack'],
  },
  {
    slug: 'closson-chase-churchside-pinot-noir',
    winerySlug: 'closson-chase',
    name: 'Churchside Pinot Noir',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [{ variety: 'Pinot Noir', share: 100 }],
    region: ON_PEC,
    vineyard: 'Churchside',
    abv: 12.5,
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'Savoury and earthy, with darker fruit and a woodsier, swarthier spice than the South Clos bottling.',
          kind: 'fact',
          sources: ['winealign-closson-sixpack'],
        },
        { text: 'One vintage reviewed showed light to medium body, almost silky, at 12.5% alcohol.', kind: 'fact', sources: ['winealign-closson-sixpack'] },
      ],
      structure: { body: 2, acidity: 4, tannin: 2, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winealign-closson-sixpack'] },
    sources: ['winealign-closson-sixpack'],
  },
  {
    slug: 'closson-chase-south-clos-chardonnay',
    winerySlug: 'closson-chase',
    name: 'South Clos Chardonnay',
    vintage: 'unspecified',
    colour: 'white',
    grapes: [{ variety: 'Chardonnay', share: 100 }],
    region: ON_PEC,
    vineyard: 'South Clos',
    bottle: 'burgundy',
    profile: {
      notes: [
        { text: 'The most detailed and precise of the estate’s Chardonnays, and the deepest.', kind: 'fact', sources: ['winealign-closson-sixpack'] },
      ],
      structure: { body: 3, acidity: 4, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winealign-closson-sixpack'] },
    sources: ['winealign-closson-sixpack'],
  },

  // ───────────────────────────── Mission Hill
  {
    slug: 'mission-hill-oculus-2020',
    winerySlug: 'mission-hill',
    name: 'Oculus',
    vintage: 2020,
    colour: 'red',
    grapes: [
      { variety: 'Merlot' },
      { variety: 'Cabernet Sauvignon' },
      { variety: 'Cabernet Franc' },
      { variety: 'Petit Verdot' },
    ],
    region: BC_OK,
    bottle: 'bordeaux',
    profile: {
      notes: [
        {
          text: 'Refreshing red fruit against rich dark fruit, with well-managed tannins.',
          kind: 'fact',
          sources: ['gismondi-oculus-2020'],
        },
        { text: 'Nineteen months in French oak, then two years in bottle before release.', kind: 'fact', sources: ['missionhill-wines'] },
      ],
      structure: { body: 4, acidity: 3, tannin: 4, sweetness: 1 },
    },
    serving: [
      { text: 'Decant an hour ahead; serve at 16–18 °C.', kind: 'recommendation', sources: ['gismondi-oculus-2020'] },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['missionhill-wines'] },
    sources: ['missionhill-wines', 'gismondi-oculus-2020'],
  },
  {
    slug: 'mission-hill-oculus-2016',
    winerySlug: 'mission-hill',
    name: 'Oculus',
    vintage: 2016,
    colour: 'red',
    grapes: [
      { variety: 'Merlot' },
      { variety: 'Cabernet Sauvignon' },
      { variety: 'Cabernet Franc' },
      { variety: 'Petit Verdot' },
    ],
    region: BC_OK,
    bottle: 'bordeaux',
    profile: {
      notes: [{ text: 'Entered and recorded in the International Wine & Spirit Competition results.', kind: 'fact', sources: ['iwsc-oculus-2016'] }],
      structure: { body: 4, acidity: 3, tannin: 4, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'archive', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['iwsc-oculus-2016'] },
    sources: ['iwsc-oculus-2016'],
  },
  {
    slug: 'mission-hill-perpetua-2022',
    winerySlug: 'mission-hill',
    name: 'Perpetua',
    vintage: 2022,
    colour: 'white',
    grapes: [{ variety: 'Chardonnay', share: 100 }],
    region: BC_OK,
    abv: 13,
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'Assembled from parcels raised in steel, oak and concrete egg; 13% alcohol, from Dijon clones at Border Vista Vineyards (72%) and Naramata Ranch (28%).',
          kind: 'fact',
          sources: ['missionhill-wines'],
        },
      ],
      structure: { body: 3, acidity: 4, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['missionhill-wines'] },
    sources: ['missionhill-wines'],
  },
  {
    slug: 'mission-hill-quatrain',
    winerySlug: 'mission-hill',
    name: 'Quatrain',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [
      { variety: 'Syrah' },
      { variety: 'Merlot' },
      { variety: 'Cabernet Franc' },
      { variety: 'Cabernet Sauvignon' },
    ],
    region: BC_OK,
    bottle: 'bordeaux',
    profile: {
      notes: [
        { text: 'Eighteen months in French barrels; a big, bold, meaty red.', kind: 'fact', sources: ['missionhill-wines'] },
      ],
      structure: { body: 5, acidity: 3, tannin: 4, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['missionhill-wines'] },
    sources: ['missionhill-wines'],
  },
  {
    slug: 'mission-hill-compendium',
    winerySlug: 'mission-hill',
    name: 'Compendium',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [{ variety: 'Bordeaux varieties' }],
    region: BC_OK,
    bottle: 'bordeaux',
    profile: {
      notes: [
        {
          text: 'Part of the Legacy Collection, made from hand-harvested, hand-sorted fruit with extended barrel age and 24 months in bottle before release.',
          kind: 'fact',
          sources: ['missionhill-wines'],
        },
      ],
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['missionhill-wines'] },
    sources: ['missionhill-wines'],
  },

  // ───────────────────────────── CedarCreek
  {
    slug: 'cedarcreek-platinum-block-2-pinot-noir-2014',
    winerySlug: 'cedarcreek',
    name: 'Platinum Block 2 Pinot Noir',
    vintage: 2014,
    colour: 'red',
    grapes: [{ variety: 'Pinot Noir', share: 100 }],
    region: BC_OK,
    vineyard: 'Home Block, Block 2',
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'Opens floral — rose petal and violet — then turns to dark cherry, brambly raspberry, clove, barrel spice and mineral.',
          kind: 'fact',
          sources: ['winesinniagara-cedarcreek-pinot', 'winealign-cedarcreek-block2-2014'],
        },
        {
          text: 'Wild fermented in concrete, twelve months in French oak, bottled unfined and unfiltered.',
          kind: 'fact',
          sources: ['winesinniagara-cedarcreek-pinot'],
        },
      ],
      structure: { body: 3, acidity: 4, tannin: 3, sweetness: 1 },
    },
    story: [
      {
        text: 'Block 2 sits on the lower slopes of the Home Block, on clay left behind by glacial Lake Penticton — a lake that drained before the valley had a name.',
        kind: 'fact',
        sources: ['winesinniagara-cedarcreek-pinot'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'archive', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['winealign-cedarcreek-block2-2014'] },
    sources: ['winealign-cedarcreek-block2-2014', 'winesinniagara-cedarcreek-pinot'],
  },
  {
    slug: 'cedarcreek-aspect-block-3-riesling-2020',
    winerySlug: 'cedarcreek',
    name: 'Aspect Collection Block 3 Riesling',
    vintage: 2020,
    colour: 'white',
    grapes: [{ variety: 'Riesling', share: 100 }],
    region: BC_OK,
    vineyard: 'Block 3',
    bottle: 'alsace',
    profile: {
      notes: [
        { text: 'Awarded a gold medal in WineAlign judging.', kind: 'fact', sources: ['cedarcreek-wines'] },
      ],
      structure: { body: 2, acidity: 5, sweetness: 2 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['cedarcreek-wines'] },
    sources: ['cedarcreek-wines'],
  },
  {
    slug: 'cedarcreek-aspect-block-2-pinot-noir',
    winerySlug: 'cedarcreek',
    name: 'Aspect Collection Block 2 Pinot Noir',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [{ variety: 'Pinot Noir', share: 100 }],
    region: BC_OK,
    vineyard: 'Home Block, Block 2',
    bottle: 'burgundy',
    profile: {
      notes: [
        {
          text: 'A single-block wine from the Aspect Collection, chosen for the extra hours of sunlight the block’s orientation gives it.',
          kind: 'fact',
          sources: ['cedarcreek-wines'],
        },
      ],
      structure: { body: 3, acidity: 4, tannin: 3, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['cedarcreek-wines'] },
    sources: ['cedarcreek-wines'],
  },

  // ───────────────────────────── Nk'Mip
  {
    slug: 'nkmip-qwam-qwmt-riesling',
    winerySlug: 'nkmip',
    name: 'Qwam Qwmt Riesling',
    vintage: 'unspecified',
    colour: 'white',
    grapes: [{ variety: 'Riesling', share: 100 }],
    region: BC_OK,
    bottle: 'alsace',
    profile: {
      notes: [
        {
          text: 'Bright, focused and limey, with good acidity and a little pith; quite dry, with texture.',
          kind: 'fact',
          sources: ['wineanorak-nkmip'],
        },
      ],
      structure: { body: 2, acidity: 5, sweetness: 1 },
    },
    story: [
      {
        text: 'Qwam Qwmt — kw-em kw-empt — means “achieving excellence” in the Okanagan language, and names the reserve tier drawn largely from the oldest parts of the Nk’Mip vineyards.',
        kind: 'fact',
        sources: ['wineanorak-nkmip'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['nkmip-wines'] },
    sources: ['wineanorak-nkmip', 'nkmip-wines'],
  },
  {
    slug: 'nkmip-merriym-white',
    winerySlug: 'nkmip',
    name: 'White Mer’r’iym',
    vintage: 'unspecified',
    colour: 'white',
    grapes: [{ variety: 'Blend — varieties not verified' }],
    region: BC_OK,
    bottle: 'bordeaux',
    profile: {
      notes: [
        {
          text: 'Pineapple and passion fruit, crisp; smoky grapefruit with bright acidity and a crystalline citrus edge that balances depth against freshness.',
          kind: 'fact',
          sources: ['wineanorak-nkmip'],
        },
      ],
      structure: { body: 3, acidity: 4, sweetness: 1 },
    },
    story: [
      {
        text: 'Mer’r’iym — mur’-eem — is the Okanagan word for “marriage”, which is what a blend is.',
        kind: 'fact',
        sources: ['wineanorak-nkmip'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['nkmip-wines'] },
    sources: ['wineanorak-nkmip', 'nkmip-wines'],
  },

  // ───────────────────────────── Clos du Soleil
  {
    slug: 'clos-du-soleil-signature',
    winerySlug: 'clos-du-soleil',
    name: 'Signature',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [
      { variety: 'Merlot' },
      { variety: 'Cabernet Sauvignon' },
      { variety: 'Cabernet Franc' },
      { variety: 'Malbec' },
      { variety: 'Petit Verdot' },
    ],
    region: BC_SIM,
    bottle: 'bordeaux',
    profile: {
      notes: [
        { text: 'The estate’s flagship red, built from classic Bordeaux grapes.', kind: 'fact', sources: ['closdusoleil-site', 'bcgov-closdusoleil'] },
      ],
      structure: { body: 4, acidity: 3, tannin: 4, sweetness: 1 },
    },
    story: [
      {
        text: 'All five Bordeaux reds grow in the Estate Vineyard, so the blend is decided in the cellar each year rather than bought in.',
        kind: 'interpretation',
        sources: ['closdusoleil-vineyards'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['closdusoleil-site'] },
    sources: ['closdusoleil-site', 'closdusoleil-vineyards', 'bcgov-closdusoleil'],
  },
  {
    slug: 'clos-du-soleil-capella',
    winerySlug: 'clos-du-soleil',
    name: 'Capella',
    vintage: 'unspecified',
    colour: 'white',
    grapes: [{ variety: 'Sauvignon Blanc' }, { variety: 'Sémillon' }],
    region: BC_SIM,
    bottle: 'bordeaux',
    profile: {
      notes: [
        { text: 'The estate’s white blend, built from classic Bordeaux white grapes.', kind: 'fact', sources: ['closdusoleil-site', 'bcgov-closdusoleil'] },
      ],
      structure: { body: 3, acidity: 4, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['closdusoleil-site'] },
    sources: ['closdusoleil-site', 'bcgov-closdusoleil'],
  },
  {
    slug: 'clos-du-soleil-estate-reserve',
    winerySlug: 'clos-du-soleil',
    name: 'Estate Reserve',
    vintage: 'unspecified',
    colour: 'red',
    grapes: [{ variety: 'Bordeaux varieties, Estate Vineyard' }],
    region: BC_SIM,
    bottle: 'bordeaux',
    profile: {
      notes: [
        { text: 'Made from the Estate Vineyard, where all five Bordeaux reds are planted.', kind: 'fact', sources: ['closdusoleil-vineyards'] },
      ],
    },
    photo: NO_PHOTO,
    availability: { producer: 'unknown', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['closdusoleil-vineyards'] },
    sources: ['closdusoleil-vineyards'],
  },

  // ───────────────────────────── Benjamin Bridge
  {
    slug: 'benjamin-bridge-nv-brut',
    winerySlug: 'benjamin-bridge',
    name: 'NV Brut',
    fullName: 'Benjamin Bridge NV Brut Méthode Classique',
    vintage: 'NV',
    colour: 'sparkling',
    grapes: [{ variety: 'Chardonnay' }, { variety: 'Pinot Noir' }],
    region: NS_GASP,
    abv: 12,
    bottle: 'sparkling',
    profile: {
      notes: [
        { text: 'Smoke and lemon rind, with a strong undertow of sea minerals; 12% alcohol.', kind: 'fact', sources: ['wineanorak-benjaminbridge', 'benjaminbridge-nv-brut'] },
      ],
      structure: { body: 2, acidity: 5, sweetness: 1 },
    },
    serving: [
      { text: 'Serve at 8–10 °C in a white-wine glass rather than a flute; the aromatics need the room.', kind: 'recommendation', sources: ['benjaminbridge-nv-brut'] },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['benjaminbridge-nv-brut'] },
    sources: ['benjaminbridge-nv-brut', 'wineanorak-benjaminbridge'],
  },
  {
    slug: 'benjamin-bridge-brut-reserve-2008',
    winerySlug: 'benjamin-bridge',
    name: 'Brut Reserve',
    vintage: 2008,
    colour: 'sparkling',
    grapes: [
      { variety: 'Chardonnay', share: 60 },
      { variety: 'Pinot Noir', share: 40 },
    ],
    region: NS_GASP,
    bottle: 'sparkling',
    profile: {
      notes: [
        {
          text: '60% Chardonnay and 40% Pinot Noir, from yields of 0.8 kg per vine, with a dry extract twice the level of Dom Pérignon.',
          kind: 'fact',
          sources: ['wineanorak-benjaminbridge'],
        },
      ],
      structure: { body: 3, acidity: 5, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'archive', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['wineanorak-benjaminbridge'] },
    sources: ['wineanorak-benjaminbridge'],
  },
  {
    slug: 'benjamin-bridge-blanc-de-noirs-2004',
    winerySlug: 'benjamin-bridge',
    name: 'Blanc de Noirs',
    vintage: 2004,
    colour: 'sparkling',
    grapes: [{ variety: 'Pinot Noir' }],
    region: NS_GASP,
    bottle: 'sparkling',
    profile: {
      notes: [
        {
          text: 'Shown blind in Toronto against 2004 Cristal and a 2005 grower Champagne; most of those present placed it ahead of both.',
          kind: 'fact',
          sources: ['wineanorak-benjaminbridge'],
        },
      ],
      structure: { body: 3, acidity: 5, sweetness: 1 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'archive', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['wineanorak-benjaminbridge'] },
    sources: ['wineanorak-benjaminbridge'],
  },
  {
    slug: 'benjamin-bridge-tidal-bay-2025',
    winerySlug: 'benjamin-bridge',
    name: 'Tidal Bay',
    vintage: 2025,
    colour: 'white',
    grapes: [{ variety: 'Blend to the Tidal Bay appellation standard' }],
    region: NS_GASP,
    bottle: 'alsace',
    profile: {
      notes: [
        {
          text: 'Tidal Bay is a fresh, crisp, off-dry still white made to Nova Scotia’s appellation standard, with a bright aromatic signature.',
          kind: 'fact',
          sources: ['wgns-tidalbay', 'benjaminbridge-tidalbay'],
        },
      ],
      structure: { body: 2, acidity: 5, sweetness: 2 },
    },
    story: [
      {
        text: 'Tidal Bay, launched in June 2012, was Nova Scotia’s first appellation — a style defined by a region rather than by a producer.',
        kind: 'fact',
        sources: ['wgns-tidalbay'],
      },
    ],
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['benjaminbridge-tidalbay'] },
    sources: ['benjaminbridge-tidalbay', 'wgns-tidalbay'],
  },
  {
    slug: 'benjamin-bridge-nova-7',
    winerySlug: 'benjamin-bridge',
    name: 'Nova 7',
    vintage: 'unspecified',
    colour: 'sparkling',
    grapes: [{ variety: 'Aromatic varieties — not verified' }],
    region: NS_GASP,
    bottle: 'sparkling',
    profile: {
      notes: [
        {
          text: 'The first Nova Scotia wine listed in Ontario and made available across Canada.',
          kind: 'fact',
          sources: ['wineanorak-benjaminbridge'],
        },
      ],
      structure: { body: 2, acidity: 4, sweetness: 3 },
    },
    photo: NO_PHOTO,
    availability: { producer: 'current', northAndVine: NOT_CONTRACTED, checkedAt: CHECKED, sources: ['wineanorak-benjaminbridge'] },
    sources: ['wineanorak-benjaminbridge'],
  },
];

export const WINES_BY_SLUG: Record<string, Wine> = Object.fromEntries(WINES.map((w) => [w.slug, w]));

export function getWine(slug: string): Wine | undefined {
  return WINES_BY_SLUG[slug];
}

export function winesForWinery(winerySlug: string): Wine[] {
  return WINES.filter((w) => w.winerySlug === winerySlug);
}

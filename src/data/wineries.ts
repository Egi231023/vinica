import type { Winery } from '@/lib/types';

/**
 * The ten producers of the book.
 *
 * This is an editorial selection, not a ranking. The criteria are stated on each
 * page and in the chapter introduction; no producer here has a commercial
 * relationship with North & Vine, and every `relationship` field says so.
 */
export const WINERIES: Winery[] = [
  // ─────────────────────────────────────────────── 1. Tawse
  {
    slug: 'tawse',
    name: 'Tawse Estate Winery',
    shortName: 'Tawse',
    founded: { year: 2001, sources: ['decanter-tawse', 'tawse-heritage'] },
    settlement: 'Vineland, Ontario',
    region: {
      appellation: 'Niagara Escarpment',
      parent: 'Niagara Peninsula',
      province: 'ON',
      provinceName: 'Ontario',
    },
    coordinates: { lat: 43.1323, lon: -79.3975, precision: 'approx', sources: ['tawse-site', 'wco-tawse'] },
    website: 'https://tawsewinery.ca/',
    standfirst:
      'A winery dug into the Escarpment in six gravity-fed levels, farming organically and biodynamically for Pinot Noir and Chardonnay.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'Certified organic and biodynamic farming across the estate vineyards.',
        'A single-vineyard programme that lets one grape show several sites.',
        'A building designed around the wine rather than the visitor.',
      ],
    },
    place: [
      {
        text: 'The winery stands on Cherry Avenue in Vineland, built into the Niagara Escarpment on six gravity-flow levels so that fruit and wine move down through the building rather than being pumped.',
        kind: 'fact',
        sources: ['winesinniagara-tawse', 'decanter-tawse'],
      },
      {
        text: 'Geothermal energy heats and cools the cellars, and a constructed wetland treats the winery’s process water.',
        kind: 'fact',
        sources: ['winesinniagara-tawse'],
      },
      {
        text: 'Gravity flow is a slow, expensive way to build a winery, and it only pays back in the glass — in whole clusters that arrive at the press unbruised. It is a useful signal of what a producer is optimising for.',
        kind: 'interpretation',
        sources: ['winesinniagara-tawse'],
      },
    ],
    people: [
      {
        text: 'Tawse was founded by Moray Tawse, a Toronto financier whose attachment to Burgundy led him to buy vineyard land in Niagara — and, later, in Burgundy itself.',
        kind: 'fact',
        sources: ['decanter-tawse', 'tawse-heritage'],
      },
      {
        text: 'Paul Pender arrived in 2005 for a winemaking internship, having previously worked as a carpenter, took over as winemaker the following year and began converting the vineyards to organic viticulture.',
        kind: 'fact',
        sources: ['decanter-tawse', 'winesinniagara-tawse'],
      },
    ],
    soilAndClimate: [
      {
        text: 'The estate vineyards sit on the Niagara Escarpment, a limestone-cored ridge that shelters the benchland below it and gives the sub-appellations their character.',
        kind: 'fact',
        sources: ['wco-tawse', 'tawse-site'],
      },
      {
        text: 'The Quarry Road vineyard lies in the Vinemount Ridge sub-appellation, higher and cooler than the lakeside benches, and its wines are labelled to that appellation rather than to the wider peninsula.',
        kind: 'fact',
        sources: ['saq-tawse-quarry-chardonnay', 'wco-tawse-quarry-2023'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'The focus is Burgundian: Pinot Noir and Chardonnay, bottled as single-vineyard wines — Quarry Road among them — alongside estate and blended tiers.',
        kind: 'fact',
        sources: ['decanter-tawse'],
      },
      {
        text: 'Tawse farms its estate vineyards using organic and biodynamic practices and carries Ecocert organic certification on wines made from estate fruit.',
        kind: 'fact',
        sources: ['winesinniagara-tawse', 'saq-tawse-quarry-chardonnay'],
      },
      {
        text: 'The Quarry Road Unoaked Chardonnay is fermented in stainless steel, with a portion going through malolactic fermentation for texture while the fruit stays unmasked by wood.',
        kind: 'fact',
        sources: ['tawse-quarry-road-unoaked'],
      },
    ],
    curiosities: [
      {
        text: 'Because Quarry Road is bottled both oaked and unoaked from the same site, the two wines make an unusually clean experiment: one variable, one vineyard, two glasses.',
        kind: 'interpretation',
        sources: ['tawse-quarry-road-unoaked', 'saq-tawse-quarry-chardonnay'],
      },
      {
        text: 'The winemaker who converted the estate to organics came to wine from carpentry — a reminder that Canadian wine is young enough that many of its best cellars are run by people on a second career.',
        kind: 'interpretation',
        sources: ['decanter-tawse'],
      },
    ],
    timeline: [
      {
        year: 2001,
        label: 'Moray Tawse founds the estate',
        detail: {
          text: 'Tawse is founded by Moray Tawse in the Niagara Peninsula.',
          kind: 'fact',
          sources: ['decanter-tawse'],
        },
      },
      {
        year: 2005,
        label: 'The gravity-flow winery opens',
        detail: {
          text: 'The winery building on Cherry Avenue in Vineland opens, built into the Escarpment over six gravity-flow levels.',
          kind: 'fact',
          sources: ['winesinniagara-tawse'],
        },
      },
      {
        year: 2006,
        label: 'Paul Pender takes over; organic conversion begins',
        detail: {
          text: 'Paul Pender replaces the outgoing winemaker and begins converting the vineyards to organic viticulture.',
          kind: 'fact',
          sources: ['decanter-tawse', 'winesinniagara-tawse'],
        },
      },
      {
        year: 2010,
        label: 'Canadian Winery of the Year',
        detail: {
          text: 'Tawse is named Canadian Winery of the Year — the first of four such titles.',
          kind: 'fact',
          sources: ['tawse-heritage'],
        },
      },
      {
        year: 2016,
        label: 'A fourth Winery of the Year title',
        detail: {
          text: 'Tawse is named Canadian Winery of the Year for the fourth time, after 2010, 2011 and 2012.',
          kind: 'fact',
          sources: ['tawse-heritage'],
        },
      },
    ],
    awards: [
      { year: 2010, title: 'Canadian Winery of the Year', awardedBy: 'Canadian Wine Awards', subject: 'Tawse Winery', sources: ['tawse-heritage'] },
      { year: 2011, title: 'Canadian Winery of the Year', awardedBy: 'Canadian Wine Awards', subject: 'Tawse Winery', sources: ['tawse-heritage'] },
      { year: 2012, title: 'Canadian Winery of the Year', awardedBy: 'Canadian Wine Awards', subject: 'Tawse Winery', sources: ['tawse-heritage'] },
      { year: 2016, title: 'Canadian Winery of the Year', awardedBy: 'Canadian Wine Awards', subject: 'Tawse Winery', sources: ['tawse-heritage'] },
    ],
    openQuestions: [
      {
        topic: 'Biodynamic certification',
        question:
          'Which vineyards and which bottlings currently carry Demeter biodynamic certification, as distinct from Ecocert organic certification, and from which vintage?',
        unlocks: 'A precise certification line per wine instead of the general statement we publish today.',
      },
      {
        topic: 'Quarry Road',
        question:
          'What is the planting history of Quarry Road — year planted, clones, rootstock, row orientation — and why was Vinemount Ridge chosen for Chardonnay and Riesling?',
        unlocks: 'A proper single-vineyard page rather than an appellation note.',
      },
      {
        topic: 'The wetland',
        question:
          'How much process water does the constructed wetland treat in a vintage, and what happens to it afterwards?',
        unlocks: 'A verifiable sustainability figure in place of a general claim.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'A verified sample of the current range. The full public list has not yet been transcribed wine by wine; the producer’s own shop is the authority.',
      sources: ['tawse-site'],
    },
    accent: { ink: '#5d1128', wash: '#f3e8dd' },
  },

  // ─────────────────────────────────────────────── 2. Inniskillin
  {
    slug: 'inniskillin',
    name: 'Inniskillin',
    shortName: 'Inniskillin',
    founded: { year: 1975, sources: ['wikipedia-inniskillin', 'brock-inniskillin'] },
    settlement: 'Niagara-on-the-Lake, Ontario',
    region: {
      appellation: 'Niagara-on-the-Lake',
      parent: 'Niagara Peninsula',
      province: 'ON',
      provinceName: 'Ontario',
    },
    coordinates: { lat: 43.1962, lon: -79.0625, precision: 'approx', sources: ['inniskillin-visit'] },
    website: 'https://www.inniskillin.com/',
    standfirst:
      'The winery that reopened Ontario winemaking in 1975, and then taught the world that Canada could make great icewine.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'Historically decisive: the first Ontario winery licence in nearly half a century.',
        'A documented role in establishing icewine as a Canadian category.',
        'A style no other country makes as consistently at this scale.',
      ],
    },
    place: [
      {
        text: 'The Niagara estate is at 1499 Line 3 in Niagara-on-the-Lake, on the Brae Burn property near the Niagara Parkway.',
        kind: 'fact',
        sources: ['inniskillin-visit'],
      },
      {
        text: 'Niagara-on-the-Lake sits between Lake Ontario and the Escarpment; the lake moderates winter and stretches autumn, which is what makes a reliable January harvest possible at all.',
        kind: 'interpretation',
        sources: ['wikipedia-inniskillin'],
      },
    ],
    people: [
      {
        text: 'Inniskillin was founded by Donald Ziraldo, of Ziraldo Nurseries, and Karl Kaiser, a schoolteacher and chemist who became its winemaker.',
        kind: 'fact',
        sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
      },
      {
        text: 'The licence the LCBO granted the winery in 1975 was the first issued in Ontario since 1929.',
        kind: 'fact',
        sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
      },
    ],
    soilAndClimate: [
      {
        text: 'Icewine requires grapes to be picked and pressed while naturally frozen on the vine, which ties the harvest to a sustained deep freeze rather than to a calendar date.',
        kind: 'fact',
        sources: ['wikipedia-inniskillin'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'Inniskillin produced its first commercial icewine in 1984, from Vidal grapes grown on the Brae Burn estate.',
        kind: 'fact',
        sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
      },
      {
        text: 'Concentration is extreme by design: the 2019 Vidal Icewine was released at roughly 250 g/L residual sugar and 9.5% alcohol, the Gold Vidal at roughly 272 g/L and 10%.',
        kind: 'fact',
        sources: ['winecom-inniskillin-gold'],
      },
    ],
    curiosities: [
      {
        text: 'The 1989 Vidal Icewine won the Grand Prix d’Honneur at Vinexpo in Bordeaux in 1991 — the moment the category stopped being a curiosity abroad.',
        kind: 'fact',
        sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
      },
      {
        text: 'A sparkling icewine is a genuinely awkward wine to make: the base is already syrupy, so the bubble has to be carried by something with almost no fermentable sugar left to give.',
        kind: 'interpretation',
        sources: ['inniskillin-sparkling-icewine'],
      },
    ],
    timeline: [
      {
        year: 1975,
        label: 'Ontario’s first winery licence since 1929',
        detail: {
          text: 'Ziraldo and Kaiser found Inniskillin Wines Inc. in Niagara-on-the-Lake; the LCBO licence is the first granted in Ontario since 1929.',
          kind: 'fact',
          sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
        },
      },
      {
        year: 1984,
        label: 'First commercial icewine',
        detail: {
          text: 'The first commercial Inniskillin icewine is made from Vidal grapes on the Brae Burn estate.',
          kind: 'fact',
          sources: ['wikipedia-inniskillin'],
        },
      },
      {
        year: 1991,
        label: 'Grand Prix d’Honneur, Vinexpo Bordeaux',
        detail: {
          text: 'The 1989 Vidal Icewine takes the Grand Prix d’Honneur at Vinexpo in Bordeaux.',
          kind: 'fact',
          sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
        },
      },
    ],
    awards: [
      {
        year: 1991,
        title: 'Grand Prix d’Honneur',
        awardedBy: 'Vinexpo, Bordeaux',
        subject: '1989 Vidal Icewine',
        sources: ['wikipedia-inniskillin', 'brock-inniskillin'],
      },
    ],
    openQuestions: [
      {
        topic: 'Harvest logistics',
        question:
          'What temperature threshold and duration trigger the icewine pick, who makes the call, and how many nights does a typical harvest take?',
        unlocks: 'A documented harvest account instead of the general description of the method.',
      },
      {
        topic: 'Current range',
        question: 'Which icewines and table wines are on the current list, with residual sugar and alcohol per cuvée?',
        unlocks: 'A complete catalogue page rather than the verified sample we publish now.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Icewines verified from producer and retail listings. The full range, including table wines, is not yet transcribed.',
      sources: ['inniskillin-story'],
    },
    accent: { ink: '#6b3410', wash: '#f6ece0' },
  },

  // ─────────────────────────────────────────────── 3. Closson Chase
  {
    slug: 'closson-chase',
    name: 'Closson Chase Vineyards',
    shortName: 'Closson Chase',
    founded: { year: 1998, sources: ['closson-about', 'visitthecounty-closson'] },
    settlement: 'Hillier, Prince Edward County, Ontario',
    region: {
      appellation: 'Prince Edward County',
      province: 'ON',
      provinceName: 'Ontario',
    },
    coordinates: { lat: 43.9725, lon: -77.3385, precision: 'approx', sources: ['visitthecounty-closson'] },
    website: 'https://www.clossonchase.com/',
    standfirst:
      'A purple barn at the corner of Closson and Chase roads, and two limestone blocks that argue with each other in the glass.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'An early planting in Prince Edward County, on limestone that behaves unlike Niagara.',
        'Two named single blocks bottled separately from the same estate.',
        'A tight range: Chardonnay and Pinot Noir, done properly.',
      ],
    },
    place: [
      {
        text: 'The winery is in Hillier, Prince Edward County, at the corner of Closson and Chase roads — which is where the name comes from.',
        kind: 'fact',
        sources: ['closson-about', 'visitthecounty-closson'],
      },
      {
        text: 'A century-old dairy barn, originally owned by the Closson family, was renovated to hold the first winemaking facility and tasting room; painted purple, it is the landmark people navigate by.',
        kind: 'fact',
        sources: ['closson-about', 'visitthecounty-closson'],
      },
    ],
    people: [
      {
        text: 'The wines are made by Keith Tyers.',
        kind: 'fact',
        sources: ['visitthecounty-closson'],
      },
    ],
    soilAndClimate: [
      {
        text: 'The vineyards sit on the limestone-rich soils of Hillier, with more than 35 acres planted to Chardonnay, Pinot Noir and Pinot Gris.',
        kind: 'fact',
        sources: ['closson-about', 'closson-terroir'],
      },
      {
        text: 'The estate holds roughly 15 acres at Churchside and 15 at South Clos.',
        kind: 'fact',
        sources: ['closson-terroir', 'winealign-closson-sixpack'],
      },
      {
        text: 'Prince Edward County winters hard enough that vines are commonly buried under earth each autumn. That labour is the hidden cost behind every County bottle.',
        kind: 'interpretation',
        sources: ['visitthecounty-closson'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'Churchside gives a more savoury, earthy Pinot Noir with darker fruit and woodsier spice; South Clos is the more supple and generous of the two.',
        kind: 'fact',
        sources: ['winealign-closson-sixpack'],
      },
      {
        text: 'The Closson Chase Vineyard bottlings blend the two sites to show the estate as a whole, rather than either block on its own.',
        kind: 'fact',
        sources: ['winealign-closson-sixpack'],
      },
    ],
    curiosities: [
      {
        text: 'The first commercial vintage, in 2004, came to ten cases.',
        kind: 'fact',
        sources: ['closson-about'],
      },
      {
        text: 'Two blocks a few hundred metres apart producing recognisably different Pinot Noir is the strongest argument a young region can make for itself. It is worth tasting them side by side rather than apart.',
        kind: 'interpretation',
        sources: ['winealign-closson-sixpack'],
      },
    ],
    timeline: [
      {
        year: 1998,
        label: 'First vines at Hillier',
        detail: {
          text: 'Closson Chase begins as one of the pioneers of Prince Edward County wine production.',
          kind: 'fact',
          sources: ['closson-about'],
        },
      },
      {
        year: 2004,
        label: 'Ten cases',
        detail: {
          text: 'The first commercial vintage of Closson Chase Vineyards totals ten cases.',
          kind: 'fact',
          sources: ['closson-about'],
        },
      },
    ],
    awards: [],
    openQuestions: [
      {
        topic: 'The two blocks',
        question:
          'What differs physically between Churchside and South Clos — depth to limestone, aspect, clone, planting year — that produces the difference tasters describe?',
        unlocks: 'A cross-section drawing of the estate instead of a tasting generalisation.',
      },
      {
        topic: 'Winter burial',
        question: 'Are the vines hilled over each winter, and what does that cost per acre in labour?',
        unlocks: 'An honest account of what County viticulture actually demands.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Flagship Chardonnay and Pinot Noir verified. Vintage-by-vintage data for the current list is not yet transcribed.',
      sources: ['closson-press-kit'],
    },
    accent: { ink: '#4a2456', wash: '#f1eaf1' },
  },

  // ─────────────────────────────────────────────── 4. Mission Hill
  {
    slug: 'mission-hill',
    name: 'Mission Hill Family Estate',
    shortName: 'Mission Hill',
    founded: { year: 1981, sources: ['wikipedia-missionhill'] },
    settlement: 'West Kelowna, British Columbia',
    region: {
      appellation: 'Okanagan Valley',
      province: 'BC',
      provinceName: 'British Columbia',
    },
    coordinates: { lat: 49.8494, lon: -119.5663, precision: 'exact', sources: ['wikipedia-missionhill', 'missionhill-site'] },
    website: 'https://www.missionhillwinery.com/',
    standfirst:
      'A hilltop estate above Okanagan Lake whose 1992 Chardonnay changed how the world argued about Canadian wine.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'A documented turning point for Canadian wine’s international standing.',
        'Vineyard holdings across every Okanagan sub-region, which makes its range a map in itself.',
        'Architecture built as a public argument about ambition.',
      ],
    },
    place: [
      {
        text: 'The estate stands at 1730 Mission Hill Road in West Kelowna, on a hill above Okanagan Lake.',
        kind: 'fact',
        sources: ['wikipedia-missionhill', 'missionhill-site'],
      },
      {
        text: 'Architect Tom Kundig designed the estate buildings; construction began in 1997 and took five years.',
        kind: 'fact',
        sources: ['wikipedia-missionhill'],
      },
      {
        text: 'An 85-foot bell tower carries four bells cast at a French foundry.',
        kind: 'fact',
        sources: ['wikipedia-missionhill'],
      },
    ],
    people: [
      {
        text: 'Anthony von Mandl bought the abandoned Mission Hill estate in 1981 and founded the winery.',
        kind: 'fact',
        sources: ['wikipedia-missionhill'],
      },
    ],
    soilAndClimate: [
      {
        text: 'The estate farms vineyards across all five Okanagan sub-regions.',
        kind: 'fact',
        sources: ['missionhill-site', 'winebc-missionhill'],
      },
      {
        text: 'Farming across every sub-region of a valley 250 km long is less about scale than about optionality: the same variety can be picked in three different climates and blended.',
        kind: 'interpretation',
        sources: ['missionhill-site'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'The Legacy Collection — Oculus, Quatrain, Compendium, Perpetua and Prospectus — is made from hand-harvested, hand-sorted fruit, given extended barrel age and then 24 months in bottle before release.',
        kind: 'fact',
        sources: ['missionhill-wines'],
      },
      {
        text: 'Oculus is a Bordeaux blend of Merlot, Cabernet Sauvignon, Cabernet Franc and Petit Verdot, aged 19 months in French oak and two years in bottle.',
        kind: 'fact',
        sources: ['missionhill-wines'],
      },
      {
        text: 'Perpetua, the estate’s top Chardonnay, is assembled from parcels raised in steel, oak and concrete egg.',
        kind: 'fact',
        sources: ['missionhill-wines'],
      },
    ],
    curiosities: [
      {
        text: 'Mission Hill’s 1992 Grand Reserve Barrel Select Chardonnay won the Avery Trophy at the International Wine & Spirit Competition, an award widely credited with establishing Canadian wine’s international credibility.',
        kind: 'fact',
        sources: ['wikipedia-missionhill'],
      },
    ],
    timeline: [
      {
        year: 1981,
        label: 'Von Mandl buys the hill',
        detail: {
          text: 'Anthony von Mandl purchases the abandoned Mission Hill estate.',
          kind: 'fact',
          sources: ['wikipedia-missionhill'],
        },
      },
      {
        year: 1994,
        label: 'The Avery Trophy',
        detail: {
          text: 'The 1992 Grand Reserve Barrel Select Chardonnay wins the Avery Trophy at the International Wine & Spirit Competition.',
          kind: 'fact',
          sources: ['wikipedia-missionhill'],
        },
      },
      {
        year: 1997,
        label: 'Kundig’s buildings begin',
        detail: {
          text: 'Construction of the Tom Kundig-designed estate begins; it takes five years.',
          kind: 'fact',
          sources: ['wikipedia-missionhill'],
        },
      },
    ],
    awards: [
      {
        year: 1994,
        title: 'Avery Trophy',
        awardedBy: 'International Wine & Spirit Competition',
        subject: '1992 Grand Reserve Barrel Select Chardonnay',
        sources: ['wikipedia-missionhill'],
      },
      {
        year: 2016,
        title: 'Listed result for Oculus 2016',
        awardedBy: 'International Wine & Spirit Competition',
        subject: 'Oculus 2016',
        sources: ['iwsc-oculus-2016'],
      },
    ],
    openQuestions: [
      {
        topic: 'The Avery Trophy',
        question:
          'What was the exact competition year, class and citation for the 1992 Chardonnay’s Avery Trophy, and is the original result sheet available?',
        unlocks: 'A primary-source citation in place of a secondary one for the most important claim on this page.',
      },
      {
        topic: 'Vineyard map',
        question: 'Which named vineyards feed which Legacy wines, and in what proportion, by vintage?',
        unlocks: 'A sub-region map of the range instead of a general statement about the valley.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Legacy Collection verified from the producer’s own pages. Tiers below Legacy are not yet transcribed.',
      sources: ['missionhill-wines'],
    },
    accent: { ink: '#7a4a12', wash: '#f7efe2' },
  },

  // ─────────────────────────────────────────────── 5. CedarCreek
  {
    slug: 'cedarcreek',
    name: 'CedarCreek Estate Winery',
    shortName: 'CedarCreek',
    founded: { year: 1986, sources: ['cedarcreek-site'] },
    settlement: 'Kelowna, British Columbia',
    region: {
      appellation: 'Okanagan Valley',
      province: 'BC',
      provinceName: 'British Columbia',
    },
    coordinates: { lat: 49.8268, lon: -119.4753, precision: 'exact', sources: ['cedarcreek-site'] },
    website: 'https://www.cedarcreek.bc.ca/',
    standfirst:
      'Fifty acres on the east shore of Okanagan Lake, farmed organically, bottled block by block.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'Certified organic across the vineyards, achieved recently and documented.',
        'Single-block bottlings that make the estate legible parcel by parcel.',
        'Independently recognised as Canadian Winery of the Year in 2022.',
      ],
    },
    place: [
      {
        text: 'CedarCreek occupies a 50-acre property at 5445 Lakeshore Road on the shore of Okanagan Lake in Kelowna.',
        kind: 'fact',
        sources: ['cedarcreek-site'],
      },
      {
        text: 'Block 2 sits on the lower slopes of the Home Block vineyard, on clay soils laid down as post-glacial sediment from Lake Penticton.',
        kind: 'fact',
        sources: ['winesinniagara-cedarcreek-pinot'],
      },
    ],
    people: [
      {
        text: 'Taylor Whelan is the winemaker.',
        kind: 'fact',
        sources: ['cedarcreek-site', 'kelownanow-cedarcreek-organic'],
      },
    ],
    soilAndClimate: [
      {
        text: 'The estate began Ecocert certification in 2017; the winery and Home Block vineyard were certified in 2019, and the vineyards were certified organic as of July 2021.',
        kind: 'fact',
        sources: ['kelownanow-cedarcreek-organic'],
      },
      {
        text: 'A lake shore is a thermal flywheel: it slows the vineyard’s response to both heat spikes and frost. On a 50-acre site that difference is measurable block to block.',
        kind: 'interpretation',
        sources: ['winesinniagara-cedarcreek-pinot'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'The Aspect Collection bottles individual vineyard blocks chosen for the extra hours of sunlight their orientation gives them.',
        kind: 'fact',
        sources: ['cedarcreek-wines'],
      },
      {
        text: 'The Block 2 Pinot Noir is wild-fermented in concrete, aged twelve months in French oak, and bottled unfined and unfiltered.',
        kind: 'fact',
        sources: ['winesinniagara-cedarcreek-pinot'],
      },
    ],
    curiosities: [
      {
        text: 'CedarCreek was named Canadian Winery of the Year in 2022.',
        kind: 'fact',
        sources: ['winealign-woty-2022', 'cedarcreek-woty'],
      },
      {
        text: 'The clay under Block 2 is sediment from a lake that no longer exists — glacial Lake Penticton drained thousands of years ago and left the valley its soils.',
        kind: 'fact',
        sources: ['winesinniagara-cedarcreek-pinot'],
      },
    ],
    timeline: [
      {
        year: 1986,
        label: 'The estate is established',
        detail: {
          text: 'CedarCreek Estate Winery is established in Kelowna.',
          kind: 'fact',
          sources: ['cedarcreek-site'],
        },
      },
      {
        year: 2017,
        label: 'Organic conversion begins',
        detail: {
          text: 'CedarCreek begins the Ecocert organic certification process.',
          kind: 'fact',
          sources: ['kelownanow-cedarcreek-organic'],
        },
      },
      {
        year: 2021,
        label: 'Vineyards certified organic',
        detail: {
          text: 'As of July 2021 CedarCreek’s vineyards are certified organic.',
          kind: 'fact',
          sources: ['kelownanow-cedarcreek-organic'],
        },
      },
      {
        year: 2022,
        label: 'Canadian Winery of the Year',
        detail: {
          text: 'CedarCreek is named Winery of the Year.',
          kind: 'fact',
          sources: ['winealign-woty-2022'],
        },
      },
    ],
    awards: [
      {
        year: 2022,
        title: 'Winery of the Year',
        awardedBy: 'WineAlign / National Wine Awards of Canada',
        subject: 'CedarCreek Estate Winery',
        sources: ['winealign-woty-2022', 'cedarcreek-woty'],
      },
    ],
    openQuestions: [
      {
        topic: 'Block map',
        question: 'How many named blocks are bottled separately, and what distinguishes each — soil, aspect, clone, planting year?',
        unlocks: 'A block-by-block plan of the Home Block vineyard.',
      },
      {
        topic: 'Amphora and concrete',
        question: 'Which vessels are in use for which wines, and what was the reasoning behind each choice?',
        unlocks: 'A cellar page with real detail rather than a general description.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Aspect Collection wines verified. The wider current list is not yet transcribed.',
      sources: ['cedarcreek-wines'],
    },
    accent: { ink: '#2f4a2c', wash: '#eaf0e6' },
  },

  // ─────────────────────────────────────────────── 6. Nk'Mip
  {
    slug: 'nkmip',
    name: 'Nk’Mip Cellars',
    shortName: 'Nk’Mip',
    founded: { year: 2002, sources: ['nationalobserver-nkmip', 'indigenousbc-nkmip'] },
    settlement: 'Osoyoos, British Columbia',
    region: {
      appellation: 'Okanagan Valley',
      province: 'BC',
      provinceName: 'British Columbia',
    },
    coordinates: { lat: 49.0362, lon: -119.4432, precision: 'approx', sources: ['indigenousbc-nkmip'] },
    website: 'https://www.nkmipcellars.com/',
    standfirst:
      'North America’s first Indigenous-owned winery, on Osoyoos Indian Band land at the northern tip of the Sonoran Desert.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'A first in North America, owned and led by the community whose land it stands on.',
        'A distinct desert climate that gives the Okanagan its warmest wines.',
        'A range named in the nsyilxcən language, with meanings that are part of the wine.',
      ],
    },
    place: [
      {
        text: 'The winery stands at the northern tip of the Sonoran Desert, on the territory of the Osoyoos Indian Band.',
        kind: 'fact',
        sources: ['nationalobserver-nkmip', 'indigenousbc-nkmip', 'nkmip-winery'],
      },
      {
        text: 'In the Okanagan language, Nk’Mip — pronounced inn-kah-MEEP — means “bottomland”, and names the southernmost end of what were the band’s winter hunting grounds.',
        kind: 'fact',
        sources: ['nationalobserver-nkmip'],
      },
    ],
    people: [
      {
        text: 'Nk’Mip Cellars opened in 2002 as the first Indigenous-owned winery in North America, a partnership between the Osoyoos Indian Band, which holds 51 per cent, and Arterra Wines Canada.',
        kind: 'fact',
        sources: ['nationalobserver-nkmip', 'indigenousbc-nkmip', 'nkmip-about'],
      },
      {
        text: 'Justin Hall, a member of the Osoyoos Indian Band, is the winemaker.',
        kind: 'fact',
        sources: ['pellicle-nkmip'],
      },
    ],
    soilAndClimate: [
      {
        text: 'Osoyoos is the hottest, driest corner of the Okanagan, which is why Bordeaux reds ripen here in a country better known for Riesling.',
        kind: 'interpretation',
        sources: ['indigenousbc-nkmip', 'wineanorak-nkmip'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'Qwam Qwmt — pronounced kw-em kw-empt — translates as “achieving excellence”, and is the name of the reserve tier, drawn largely from the oldest parts of the Nk’Mip vineyards.',
        kind: 'fact',
        sources: ['wineanorak-nkmip', 'nkmip-wines'],
      },
      {
        text: 'Mer’r’iym — pronounced mur’-eem — is the Okanagan word for “marriage”, and names the estate’s red and white blends.',
        kind: 'fact',
        sources: ['wineanorak-nkmip'],
      },
    ],
    curiosities: [
      {
        text: 'Since 2014 the brand has won more than fifty regional, national and international awards, and was named Canadian Winery of the Year in the 2016–17 InterVin International Wine Awards.',
        kind: 'fact',
        sources: ['nationalobserver-nkmip'],
      },
      {
        text: 'Naming the blends “marriage” and the reserve tier “achieving excellence” puts the language on the shelf in front of the customer. It is the clearest example in this book of a label doing more than identifying a wine.',
        kind: 'interpretation',
        sources: ['wineanorak-nkmip'],
      },
    ],
    timeline: [
      {
        year: 2002,
        label: 'The winery opens',
        detail: {
          text: 'Nk’Mip Cellars opens as the first Indigenous-owned winery in North America.',
          kind: 'fact',
          sources: ['nationalobserver-nkmip'],
        },
      },
      {
        year: 2016,
        label: 'Canadian Winery of the Year',
        detail: {
          text: 'Nk’Mip is named Canadian Winery of the Year in the 2016–17 InterVin International Wine Awards.',
          kind: 'fact',
          sources: ['nationalobserver-nkmip'],
        },
      },
    ],
    awards: [
      {
        year: 2016,
        title: 'Canadian Winery of the Year',
        awardedBy: 'InterVin International Wine Awards (2016–17)',
        subject: 'Nk’Mip Cellars',
        sources: ['nationalobserver-nkmip'],
      },
    ],
    openQuestions: [
      {
        topic: 'Language and naming',
        question:
          'Who at the band approves the nsyilxcən names on the labels, and how should each be written and pronounced in our own materials?',
        unlocks: 'Correct orthography and pronunciation throughout the book, approved by the community.',
      },
      {
        topic: 'Vineyards',
        question: 'Which blocks make up the oldest parts of the Nk’Mip vineyards, and when were they planted?',
        unlocks: 'A dated vineyard history rather than a general reference to old plantings.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Tier structure and flagship wines verified. Vintage-level data for the current list is not yet transcribed.',
      sources: ['nkmip-wines'],
    },
    accent: { ink: '#8a3a17', wash: '#f8ece2' },
  },

  // ─────────────────────────────────────────────── 7. Clos du Soleil
  {
    slug: 'clos-du-soleil',
    name: 'Clos du Soleil Winery',
    shortName: 'Clos du Soleil',
    founded: { year: 2006, sources: ['gismondi-closdusoleil-20', 'similkameenvalley-closdusoleil'] },
    settlement: 'Keremeos, British Columbia',
    region: {
      appellation: 'Similkameen Valley',
      province: 'BC',
      provinceName: 'British Columbia',
    },
    coordinates: { lat: 49.2036, lon: -119.7742, precision: 'approx', sources: ['similkameenvalley-closdusoleil'] },
    website: 'https://www.closdusoleil.ca/',
    standfirst:
      'A certified-organic estate on the Similkameen’s Middle Bench, making Bordeaux varieties in a valley of wind and rock.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'The Similkameen is the Okanagan’s quieter neighbour and belongs on any honest map of British Columbia.',
        'Certified organic, with all five Bordeaux reds planted on the estate.',
        'A small range with a clear house style rather than a wide catalogue.',
      ],
    },
    place: [
      {
        text: 'Clos du Soleil was established in 2006 at Keremeos, on the Middle Bench of the Similkameen Valley.',
        kind: 'fact',
        sources: ['gismondi-closdusoleil-20', 'similkameenvalley-closdusoleil'],
      },
    ],
    people: [
      {
        text: 'Michael Clark is the winemaker, farming with both organic and biodynamic practices.',
        kind: 'fact',
        sources: ['closdusoleil-site', 'bcgov-closdusoleil'],
      },
    ],
    soilAndClimate: [
      {
        text: 'The estate is certified organic.',
        kind: 'fact',
        sources: ['closdusoleil-vineyards', 'bcgov-closdusoleil'],
      },
      {
        text: 'The Similkameen is a narrow valley running between mountain walls, and the wind that funnels through it is part of why organic farming is practical here at all.',
        kind: 'interpretation',
        sources: ['closdusoleil-vineyards'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'All five Bordeaux red varieties — Merlot, Cabernet Sauvignon, Cabernet Franc, Malbec and Petit Verdot — are grown in the Estate Vineyard.',
        kind: 'fact',
        sources: ['closdusoleil-vineyards'],
      },
      {
        text: 'Signature is the flagship red and Capella the white blend, both built from classic Bordeaux grapes.',
        kind: 'fact',
        sources: ['closdusoleil-site', 'bcgov-closdusoleil'],
      },
    ],
    curiosities: [
      {
        text: 'Planting all five Bordeaux reds on one small estate is a deliberate constraint: it means the blend is decided in the cellar each year rather than bought in.',
        kind: 'interpretation',
        sources: ['closdusoleil-vineyards'],
      },
    ],
    timeline: [
      {
        year: 2006,
        label: 'Founded on the Middle Bench',
        detail: {
          text: 'Clos du Soleil is established at Keremeos in the Similkameen Valley; the first yield follows in the same year.',
          kind: 'fact',
          sources: ['gismondi-closdusoleil-20', 'bcgov-closdusoleil'],
        },
      },
    ],
    awards: [],
    openQuestions: [
      {
        topic: 'Certification',
        question: 'Which body certifies the estate organic, from which vintage, and are any blocks farmed biodynamically under certification?',
        unlocks: 'A precise certification line rather than the general statement we publish.',
      },
      {
        topic: 'Signature',
        question: 'What is the blend of Signature by vintage, and how much does it move year to year?',
        unlocks: 'A vintage table for the flagship wine.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Flagship wines verified. Vintage-level detail for the current list is not yet transcribed.',
      sources: ['closdusoleil-site'],
    },
    accent: { ink: '#3f4a6b', wash: '#eaedf4' },
  },

  // ─────────────────────────────────────────────── 8. Benjamin Bridge
  {
    slug: 'benjamin-bridge',
    name: 'Benjamin Bridge',
    shortName: 'Benjamin Bridge',
    founded: { year: 1999, sources: ['wgns-benjaminbridge'] },
    settlement: 'Gaspereau, Nova Scotia',
    region: {
      appellation: 'Gaspereau Valley',
      parent: 'Annapolis Valley',
      province: 'NS',
      provinceName: 'Nova Scotia',
    },
    coordinates: { lat: 45.0704, lon: -64.3182, precision: 'approx', sources: ['wgns-benjaminbridge'] },
    website: 'https://benjaminbridge.com/',
    standfirst:
      'Traditional-method sparkling wine from the Gaspereau Valley, made on Champenois advice in a climate that rewards patience.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'Nova Scotia is the least-known serious wine region in Canada and belongs in the book.',
        'A traditional-method programme built deliberately, with Champagne expertise.',
        'A producer of Tidal Bay, Canada’s only regional appellation wine of its kind.',
      ],
    },
    place: [
      {
        text: 'The vineyards lie in the Gaspereau Valley near the Bay of Fundy, at 1966 White Rock Road.',
        kind: 'fact',
        sources: ['wgns-benjaminbridge', 'benjaminbridge-site'],
      },
      {
        text: 'The Bay of Fundy has the largest tidal range on earth, and the cold water it moves is the reason a valley this far north holds acidity the way it does.',
        kind: 'interpretation',
        sources: ['wgns-benjaminbridge', 'wgns-tidalbay'],
      },
    ],
    people: [
      {
        text: 'Benjamin Bridge was founded in 1999 by Gerry McConnell and his late wife Dara Gordon.',
        kind: 'fact',
        sources: ['wgns-benjaminbridge'],
      },
      {
        text: 'Jean-Benoit Deslauriers is head winemaker; the sparkling programme was set up with the Champagne oenologist Raphaël Brisbois, formerly chef de cave at Piper-Heidsieck.',
        kind: 'fact',
        sources: ['wgns-benjaminbridge', 'wineanorak-benjaminbridge'],
      },
    ],
    soilAndClimate: [
      {
        text: 'Tidal Bay, launched in June 2012, is Nova Scotia’s first appellation — a fresh, crisp, off-dry white made to a defined regional standard.',
        kind: 'fact',
        sources: ['wgns-tidalbay'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'The house makes Méthode Classique sparkling wines; the Brut Reserve 2008 was 60% Chardonnay and 40% Pinot Noir, from yields of 0.8 kg per vine.',
        kind: 'fact',
        sources: ['wineanorak-benjaminbridge'],
      },
      {
        text: 'Nova 7 became the first Nova Scotia wine listed in Ontario and available across Canada.',
        kind: 'fact',
        sources: ['wineanorak-benjaminbridge'],
      },
    ],
    curiosities: [
      {
        text: 'In a blind tasting in Toronto, the 2004 Blanc de Noirs was shown against 2004 Cristal and a 2005 grower Champagne; most of those present ranked the Nova Scotian wine ahead of the Champagnes.',
        kind: 'fact',
        sources: ['wineanorak-benjaminbridge'],
      },
      {
        text: 'Yields of 0.8 kg per vine are low even by Champagne’s standards. In a marginal climate that is not an aesthetic choice so much as an admission of what the vineyard will give.',
        kind: 'interpretation',
        sources: ['wineanorak-benjaminbridge'],
      },
    ],
    timeline: [
      {
        year: 1999,
        label: 'Founded in the Gaspereau Valley',
        detail: {
          text: 'Gerry McConnell and Dara Gordon found Benjamin Bridge.',
          kind: 'fact',
          sources: ['wgns-benjaminbridge'],
        },
      },
      {
        year: 2012,
        label: 'Tidal Bay is launched',
        detail: {
          text: 'Tidal Bay, Nova Scotia’s first appellation, is officially launched in June 2012.',
          kind: 'fact',
          sources: ['wgns-tidalbay'],
        },
      },
    ],
    awards: [],
    openQuestions: [
      {
        topic: 'Disgorgement',
        question: 'What are the current lees-ageing times and disgorgement dates per cuvée, and is disgorgement date printed on the bottle?',
        unlocks: 'A proper technical panel for each sparkling wine.',
      },
      {
        topic: 'Tidal Bay',
        question: 'What is the blend of the current Tidal Bay, and what does the appellation standard actually require?',
        unlocks: 'An explanation of the appellation that readers can check for themselves.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Sparkling flagships and Tidal Bay verified. The full current list is not yet transcribed.',
      sources: ['benjaminbridge-productinfo'],
    },
    accent: { ink: '#24505c', wash: '#e6eef0' },
  },

  // ─────────────────────────────────────────────── 9. Lightfoot & Wolfville
  {
    slug: 'lightfoot-wolfville',
    name: 'Lightfoot & Wolfville Vineyards',
    shortName: 'Lightfoot & Wolfville',
    founded: { year: 2009, sources: ['lightfoot-about', 'nuvo-lightfoot'] },
    settlement: 'Wolfville, Nova Scotia',
    region: {
      appellation: 'Annapolis Valley',
      province: 'NS',
      provinceName: 'Nova Scotia',
    },
    coordinates: { lat: 45.0861, lon: -64.4041, precision: 'approx', sources: ['tasteofns-lightfoot'] },
    website: 'https://lightfootandwolfville.com/',
    standfirst:
      'Eight generations of farming in the Annapolis Valley, and the first Demeter-certified biodynamic winery in Nova Scotia.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'Certified organic and Demeter biodynamic — rare anywhere in Canada.',
        'A farm with a documented multi-generation history, not a recent purchase.',
        'Cool-climate sparkling, Chardonnay and Pinot Noir from a region few readers will know.',
      ],
    },
    place: [
      {
        text: 'The farm lies in the Annapolis Valley between the town of Wolfville and the UNESCO World Heritage site of Grand-Pré.',
        kind: 'fact',
        sources: ['lightfoot-about', 'tasteofns-lightfoot'],
      },
    ],
    people: [
      {
        text: 'The winery is owned and run by the Lightfoot family, who have farmed in the Annapolis Valley for eight generations.',
        kind: 'fact',
        sources: ['lightfoot-about'],
      },
      {
        text: 'The estate vineyards were planted in 2009, on land the family had already farmed for three generations.',
        kind: 'fact',
        sources: ['nuvo-lightfoot', 'lightfoot-about'],
      },
    ],
    soilAndClimate: [
      {
        text: 'The farm is certified organic by Ecocert Canada and certified biodynamic by Demeter Canada — the first winery in Nova Scotia to hold the biodynamic certification.',
        kind: 'fact',
        sources: ['lightfoot-about', 'tasteofns-lightfoot'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'The range centres on traditional-method sparkling wines, aromatic whites, and classically made Chardonnay and Pinot Noir; the wines are vegan.',
        kind: 'fact',
        sources: ['lightfoot-site', 'tasteofns-lightfoot'],
      },
    ],
    curiosities: [
      {
        text: 'The winery’s farm-to-table restaurant was named a Best Destination Restaurant by Canada’s 100 Best in 2023.',
        kind: 'fact',
        sources: ['tasteofns-lightfoot'],
      },
      {
        text: 'Planting vines on ground your family has farmed for three generations changes the arithmetic. The land is not an acquisition to be recouped, which is one reason a slow certification like Demeter is even thinkable here.',
        kind: 'interpretation',
        sources: ['nuvo-lightfoot'],
      },
    ],
    timeline: [
      {
        year: 2009,
        label: 'The vineyards are planted',
        detail: {
          text: 'Estate vineyards are planted on family farmland in the Annapolis Valley.',
          kind: 'fact',
          sources: ['nuvo-lightfoot'],
        },
      },
      {
        year: 2023,
        label: 'Restaurant recognised',
        detail: {
          text: 'The on-site farm-to-table restaurant is named a Best Destination Restaurant by Canada’s 100 Best.',
          kind: 'fact',
          sources: ['tasteofns-lightfoot'],
        },
      },
    ],
    awards: [
      {
        year: 2023,
        title: 'Best Destination Restaurant',
        awardedBy: 'Canada’s 100 Best',
        subject: 'Lightfoot & Wolfville restaurant',
        sources: ['tasteofns-lightfoot'],
      },
    ],
    openQuestions: [
      {
        topic: 'Biodynamic practice',
        question: 'Which preparations are made on the farm, and what changed in the vineyard after certification?',
        unlocks: 'A concrete account of biodynamics here instead of a certification badge.',
      },
      {
        topic: 'Eight generations',
        question: 'What did the farm grow before vines, and when did the family arrive in the valley?',
        unlocks: 'A dated family timeline instead of a round number.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'Range described at category level; individual cuvées are not yet transcribed with vintage data.',
      sources: ['lightfoot-site'],
    },
    accent: { ink: '#3d5230', wash: '#edf0e7' },
  },

  // ─────────────────────────────────────────────── 10. L'Orpailleur
  {
    slug: 'orpailleur',
    name: 'Vignoble de l’Orpailleur',
    shortName: 'L’Orpailleur',
    founded: { year: 1982, sources: ['orpailleur-histoire', 'routedesvins-orpailleur'] },
    settlement: 'Dunham, Québec',
    region: {
      appellation: 'Brome-Missisquoi',
      parent: 'Eastern Townships',
      province: 'QC',
      provinceName: 'Québec',
    },
    coordinates: { lat: 45.1283, lon: -72.8073, precision: 'approx', sources: ['orpailleur-visiter', 'easterntownships-orpailleur'] },
    website: 'https://orpailleur.ca/en',
    standfirst:
      'The vineyard that proved Québec could grow wine at all, named by a poet after a panner of gold.',
    selection: {
      relationship: 'editorial',
      reasons: [
        'The founding estate of modern Québec viticulture, planted in 1982.',
        'A region with a genuinely different grape story from Ontario or British Columbia.',
        'A documented origin, including how the estate got its name.',
      ],
    },
    place: [
      {
        text: 'The vineyard is at Dunham, in the Brome-Missisquoi part of Québec’s Eastern Townships.',
        kind: 'fact',
        sources: ['easterntownships-orpailleur', 'orpailleur-visiter'],
      },
      {
        text: 'The estate operates as an ÉCONOMUSÉE du vigneron — a designation for working producers that open their craft to the public.',
        kind: 'fact',
        sources: ['routedesvins-orpailleur', 'easterntownships-orpailleur'],
      },
    ],
    people: [
      {
        text: 'Four founders planted the first vines in 1982: Charles-Henri de Coussergues, Pierre Rodrigue, Frank Furtado and Hervé Durand — two French, two Québécois.',
        kind: 'fact',
        sources: ['orpailleur-histoire'],
      },
    ],
    soilAndClimate: [
      {
        text: 'Dunham is described by the estate as the cradle of Québec viticulture.',
        kind: 'fact',
        sources: ['orpailleur-histoire'],
      },
      {
        text: 'Québec winters are the hard constraint here; the grape choices and the vineyard practices follow from them rather than from fashion.',
        kind: 'interpretation',
        sources: ['orpailleur-histoire'],
      },
    ],
    grapesAndMaking: [
      {
        text: 'The first release was a dry, fruity white — 15,000 bottles.',
        kind: 'fact',
        sources: ['orpailleur-histoire'],
      },
    ],
    curiosities: [
      {
        text: 'The name was given by Gilles Vigneault, the Québécois poet and songwriter: an orpailleur is a panner of gold, someone who works a river patiently for what it will give.',
        kind: 'fact',
        sources: ['orpailleur-histoire'],
      },
      {
        text: 'It is a precise metaphor for planting vines in Québec in 1982 — patient work against a landscape that was not obviously going to yield.',
        kind: 'interpretation',
        sources: ['orpailleur-histoire'],
      },
    ],
    timeline: [
      {
        year: 1982,
        label: 'First vines at Dunham',
        detail: {
          text: 'Four founders plant the first vines at Dunham.',
          kind: 'fact',
          sources: ['orpailleur-histoire'],
        },
      },
    ],
    awards: [],
    openQuestions: [
      {
        topic: 'Varieties',
        question: 'Which varieties are planted today — hybrids and vinifera — and how has the mix changed since 1982?',
        unlocks: 'A planting history that shows how Québec viticulture actually developed.',
      },
      {
        topic: 'The name',
        question: 'What exactly did Gilles Vigneault say when he proposed the name, and in what year?',
        unlocks: 'A quotation and a date for the best story in this chapter.',
      },
    ],
    catalogue: {
      status: 'sample',
      checkedAt: '2026-09-21',
      note: 'History verified; the current wine list has not yet been transcribed with vintage and technical data.',
      sources: ['orpailleur-site'],
    },
    accent: { ink: '#6a5410', wash: '#f4f0df' },
  },
];

export const WINERIES_BY_SLUG: Record<string, Winery> = Object.fromEntries(
  WINERIES.map((w) => [w.slug, w]),
);

export function getWinery(slug: string): Winery | undefined {
  return WINERIES_BY_SLUG[slug];
}

/**
 * Generates the atlas spread's geometry at build time.
 *
 * The map has to be a real map: land outlines come from Natural Earth via
 * world-atlas, and winery pins are projected with the same projection as the
 * coastline, so a pin cannot drift away from its coordinates. Projecting here
 * rather than in the browser keeps d3-geo out of the client bundle entirely.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { geoConicConformal, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const WIDTH = 1000;
const HEIGHT = 720;

const world = JSON.parse(readFileSync(require.resolve('world-atlas/countries-50m.json'), 'utf8'));
const countries = feature(world, world.objects.countries);

const NORTH_AMERICA = new Set(['Canada', 'United States of America', 'Mexico', 'Greenland']);
const naFeatures = countries.features.filter((f) => NORTH_AMERICA.has(f.properties.name));
const canada = naFeatures.find((f) => f.properties.name === 'Canada');

// A Lambert conformal conic centred on Canada — the projection Canadian atlases
// actually use, and the reason the country reads as a fan rather than a smear.
const projection = geoConicConformal()
  .parallels([49, 77])
  .rotate([96, 0])
  .center([0, 52]);

// Fit to Canada, not to the continent: the United States, Mexico and Greenland
// stay on the page as context and run off its edges, which is what "North
// America, with Canada at the centre" actually looks like on paper.
projection.fitExtent(
  [
    [56, 54],
    [WIDTH - 56, HEIGHT - 76],
  ],
  canada,
);

// One decimal of SVG precision is well under a printed hair's width at this
// scale and cuts the generated geometry by more than half.
const path = geoPath(projection).digits(1);

// Read straight from the content file so the map can never disagree with the
// book. Node strips the types; wineries.ts has no runtime imports.
const { WINERIES } = await import('../src/data/wineries.ts');

const pins = WINERIES.map((w) => {
  const xy = projection([w.coordinates.lon, w.coordinates.lat]);
  if (!xy) throw new Error(`Could not project ${w.slug} — coordinates fall outside the map extent.`);
  return {
    slug: w.slug,
    name: w.name,
    shortName: w.shortName,
    settlement: w.settlement,
    region: w.region.appellation,
    province: w.region.province,
    precision: w.coordinates.precision,
    lat: w.coordinates.lat,
    lon: w.coordinates.lon,
    x: round(xy[0]),
    y: round(xy[1]),
  };
});

function round(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Pins closer together than the eye can separate are grouped. Four Okanagan
 * wineries land within a single pixel of each other at continental scale, so
 * the alternative to clustering is lying about where they are.
 */
const CLUSTER_RADIUS = 14;
const clusters = [];
for (const pin of pins) {
  const home = clusters.find(
    (c) => Math.hypot(c.x - pin.x, c.y - pin.y) < CLUSTER_RADIUS,
  );
  if (home) {
    home.members.push(pin);
    home.x = round(home.members.reduce((s, p) => s + p.x, 0) / home.members.length);
    home.y = round(home.members.reduce((s, p) => s + p.y, 0) / home.members.length);
  } else {
    clusters.push({ x: pin.x, y: pin.y, members: [pin] });
  }
}

for (const c of clusters) {
  c.id = c.members.map((m) => m.slug).join('+');
  c.label = c.members.length === 1 ? c.members[0].shortName : labelForGroup(c.members);
  // Put the label on whichever side has more room, so leader lines never cross
  // the country's own name or run off the page.
  c.side = c.x > WIDTH * 0.6 ? 'left' : 'right';
}

/**
 * Lay the labels out so none sits on top of another.
 *
 * Eastern Canada puts four markers inside 120 px, and their labels collided
 * badly. Each label starts at its preferred offset and is pushed further out
 * until its box is clear of every label already placed. Leader lines are drawn
 * to wherever the label ends up, so the mark still points at the real position.
 */
const LABEL_HEIGHT = 17;
const CHAR_WIDTH = 7.4;
const placed = [];

// Place the crowded east first: it has the least room to give.
const ordered = [...clusters].sort((a, b) => b.x - a.x);

for (const c of ordered) {
  const width = c.label.length * CHAR_WIDTH;
  const dir = c.side === 'left' ? -1 : 1;

  let best = null;
  // Try progressively further from the mark: out, then up, then down.
  for (const [dx, dy] of candidateOffsets()) {
    const lx = c.x + dir * dx;
    const ly = c.y + dy;
    const box = {
      x1: c.side === 'left' ? lx - width : lx,
      x2: c.side === 'left' ? lx : lx + width,
      y1: ly - LABEL_HEIGHT,
      y2: ly + 4,
    };
    if (box.x1 < 6 || box.x2 > WIDTH - 6 || box.y1 < 6 || box.y2 > HEIGHT - 6) continue;
    if (placed.some((p) => overlaps(p, box))) continue;
    best = { lx, ly, box };
    break;
  }
  // Nothing clear anywhere: keep the preferred spot rather than drop the label.
  if (!best) {
    const lx = c.x + dir * 34;
    const ly = c.y - 22;
    best = {
      lx,
      ly,
      box: {
        x1: c.side === 'left' ? lx - width : lx,
        x2: c.side === 'left' ? lx : lx + width,
        y1: ly - LABEL_HEIGHT,
        y2: ly + 4,
      },
    };
  }
  placed.push(best.box);
  c.labelX = round(best.lx);
  c.labelY = round(best.ly);
}

function* candidateOffsets() {
  for (const dx of [34, 52, 74, 100, 130]) {
    for (const dy of [-22, -40, 6, -58, 26, -76, 46]) {
      yield [dx, dy];
    }
  }
}

function overlaps(a, b) {
  return !(a.x2 < b.x1 - 4 || a.x1 > b.x2 + 4 || a.y2 < b.y1 - 2 || a.y1 > b.y2 + 2);
}

function labelForGroup(members) {
  const regions = [...new Set(members.map((m) => m.region))];
  if (regions.length === 1) return regions[0];
  const provinces = [...new Set(members.map((m) => m.province))];
  return provinces.length === 1 ? `${provinces[0]} — ${members.length} estates` : `${members.length} estates`;
}

/* Split in two so the heavy coastline never reaches the client bundle: the
   geometry is rendered on the server, and only the pins are shipped as JS. */
const geometry = {
  width: WIDTH,
  height: HEIGHT,
  land: naFeatures.map((f) => ({
    name: f.properties.name,
    focus: f.properties.name === 'Canada',
    d: path(f),
  })),
  graticule: path(geoGraticule10()),
  // Provincial detail is out of scope for a 50m country dataset; the book says
  // so rather than drawing borders it cannot source.
};

const markers = {
  width: WIDTH,
  height: HEIGHT,
  projection: 'Lambert conformal conic, standard parallels 49°N / 77°N, central meridian 96°W',
  attribution: 'Country outlines: Natural Earth (public domain), via world-atlas.',
  pins,
  clusters,
};

mkdirSync(new URL('../src/data/generated/', import.meta.url), { recursive: true });
writeFileSync(new URL('../src/data/generated/map-geometry.json', import.meta.url), JSON.stringify(geometry));
writeFileSync(new URL('../src/data/generated/map-markers.json', import.meta.url), JSON.stringify(markers));
console.log(
  `map geometry: ${geometry.land.length} shapes, ${Math.round(JSON.stringify(geometry).length / 1024)} kB · markers: ${pins.length} pins in ${clusters.length} groups, ${Math.round(JSON.stringify(markers).length / 1024)} kB`,
);

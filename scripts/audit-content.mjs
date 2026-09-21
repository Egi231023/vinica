/**
 * Content audit.
 *
 * The rules of the book, enforced rather than promised:
 *   1. Every `fact` must cite at least one source.
 *   2. Every source id referenced must exist.
 *   3. Every source in the bibliography must be used by something.
 *   4. Every source must carry a verification date and a method.
 *   5. No wine may claim a photograph it does not have.
 *   6. A wine marked orderable must have a supply agreement recorded.
 *   7. Coordinates must be inside Canada's bounding box and carry a source.
 *
 * Run with `npm run audit:content`. A failure is a build failure.
 */
import process from 'node:process';

const { WINERIES } = await import('../src/data/wineries.ts');
const { WINES } = await import('../src/data/wines.ts');
const { ALL_SOURCES, SOURCES } = await import('../src/data/sources.ts');

const problems = [];
const used = new Set();

function fail(where, message) {
  problems.push(`${where}: ${message}`);
}

function checkClaims(where, claims) {
  for (const [i, claim] of (claims ?? []).entries()) {
    const at = `${where}[${i}]`;
    if (!claim.text?.trim()) fail(at, 'empty claim text');
    if (claim.kind === 'fact' && (!claim.sources || claim.sources.length === 0)) {
      fail(at, `a fact with no source: "${claim.text.slice(0, 60)}…"`);
    }
    for (const id of claim.sources ?? []) {
      used.add(id);
      if (!SOURCES[id]) fail(at, `unknown source id "${id}"`);
    }
  }
}

function checkSourceIds(where, ids) {
  for (const id of ids ?? []) {
    used.add(id);
    if (!SOURCES[id]) fail(where, `unknown source id "${id}"`);
  }
}

/* Canada's bounding box, generously drawn. A pin outside it is a typo. */
const CANADA_BOX = { minLat: 41.6, maxLat: 83.2, minLon: -141.1, maxLon: -52.5 };

for (const winery of WINERIES) {
  const w = `winery/${winery.slug}`;
  checkClaims(`${w}.place`, winery.place);
  checkClaims(`${w}.people`, winery.people);
  checkClaims(`${w}.soilAndClimate`, winery.soilAndClimate);
  checkClaims(`${w}.grapesAndMaking`, winery.grapesAndMaking);
  checkClaims(`${w}.curiosities`, winery.curiosities);
  checkClaims(
    `${w}.timeline`,
    winery.timeline.map((entry) => entry.detail),
  );

  for (const award of winery.awards) {
    checkSourceIds(`${w}.awards[${award.year}]`, award.sources);
    if (!award.sources?.length) fail(`${w}.awards[${award.year}]`, 'an award with no source');
  }

  checkSourceIds(`${w}.coordinates`, winery.coordinates.sources);
  checkSourceIds(`${w}.catalogue`, winery.catalogue.sources);
  if (winery.founded) checkSourceIds(`${w}.founded`, winery.founded.sources);

  const { lat, lon } = winery.coordinates;
  if (
    lat < CANADA_BOX.minLat ||
    lat > CANADA_BOX.maxLat ||
    lon < CANADA_BOX.minLon ||
    lon > CANADA_BOX.maxLon
  ) {
    fail(`${w}.coordinates`, `(${lat}, ${lon}) falls outside Canada`);
  }
  if (!winery.coordinates.sources?.length) {
    fail(`${w}.coordinates`, 'a pin placed with no source for the location');
  }

  if (winery.selection.relationship === 'partner') {
    fail(
      `${w}.selection`,
      'marked as a signed partner. No supply agreements exist; this must be evidenced before it ships.',
    );
  }
}

const slugs = new Set();
for (const wine of WINES) {
  const w = `wine/${wine.slug}`;
  if (slugs.has(wine.slug)) fail(w, 'duplicate wine slug');
  slugs.add(wine.slug);

  if (!WINERIES.some((winery) => winery.slug === wine.winerySlug)) {
    fail(w, `references unknown winery "${wine.winerySlug}"`);
  }

  checkClaims(`${w}.notes`, wine.profile.notes);
  checkClaims(`${w}.serving`, wine.serving);
  checkClaims(`${w}.pairing`, wine.pairing);
  checkClaims(`${w}.story`, wine.story);
  checkSourceIds(`${w}.sources`, wine.sources);
  checkSourceIds(`${w}.availability`, wine.availability.sources);
  if (wine.producerPriceCad) checkSourceIds(`${w}.price`, wine.producerPriceCad.sources);

  if (!wine.sources?.length) fail(w, 'a wine with no sources at all');

  if (wine.photo.status === 'licensed' && !wine.photo.src) {
    fail(w, 'claims a licensed photograph but has no file');
  }
  if (wine.photo.status === 'licensed' && !wine.photo.credit) {
    fail(w, 'a licensed photograph with no credit');
  }

  if (wine.availability.northAndVine === 'orderable') {
    const winery = WINERIES.find((x) => x.slug === wine.winerySlug);
    if (winery?.selection.relationship !== 'partner') {
      fail(w, 'marked orderable, but its producer is not a contracted partner');
    }
  }

  if (typeof wine.vintage === 'number' && (wine.vintage < 1960 || wine.vintage > 2030)) {
    fail(w, `implausible vintage ${wine.vintage}`);
  }
}

for (const source of ALL_SOURCES) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.verifiedAt ?? '')) {
    fail(`source/${source.id}`, 'missing or malformed verification date');
  }
  if (!source.method) fail(`source/${source.id}`, 'missing verification method');
  if (!/^https:\/\//.test(source.url ?? '')) fail(`source/${source.id}`, 'source url is not https');
}

const orphans = ALL_SOURCES.filter((source) => !used.has(source.id));
for (const orphan of orphans) {
  fail(`source/${orphan.id}`, 'in the bibliography but cited by nothing');
}

/* ── Report ─────────────────────────────────────────────────────────────── */

const facts = [];
for (const winery of WINERIES) {
  facts.push(
    ...winery.place,
    ...winery.people,
    ...winery.soilAndClimate,
    ...winery.grapesAndMaking,
    ...winery.curiosities,
  );
}
const factCount = facts.filter((c) => c.kind === 'fact').length;
const interpretationCount = facts.filter((c) => c.kind === 'interpretation').length;
const indirect = ALL_SOURCES.filter((s) => s.method === 'search-snippet').length;
const missingPhotos = WINES.filter((w) => w.photo.status !== 'licensed').length;
const unspecified = WINES.filter((w) => w.vintage === 'unspecified').length;
const noWines = WINERIES.filter((w) => !WINES.some((x) => x.winerySlug === w.slug));

console.log('North & Vine — content audit');
console.log('─'.repeat(60));
console.log(`  wineries              ${WINERIES.length}`);
console.log(`  wines                 ${WINES.length}`);
console.log(`  sources               ${ALL_SOURCES.length} (${indirect} verified indirectly)`);
console.log(`  chapter statements    ${factCount} facts, ${interpretationCount} interpretations`);
console.log(`  wines without a photo ${missingPhotos}`);
console.log(`  vintages unconfirmed  ${unspecified}`);
console.log(`  producers with no verified wine  ${noWines.length}${noWines.length ? ` (${noWines.map((w) => w.shortName).join(', ')})` : ''}`);
console.log('─'.repeat(60));

if (problems.length > 0) {
  console.error(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  process.exit(1);
}

console.log('✓ every fact carries a source, and every source is used.\n');

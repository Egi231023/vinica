/**
 * End-to-end smoke test.
 *
 * Walks the journey the book promises — cover, contents, map, a producer, a
 * wine, membership, a trial order, the cellar — and asserts the things that
 * have actually broken during development: 404 statuses, the membership gate,
 * URL-backed filters, and the order store.
 *
 * Usage:  npm run build && npx next start -p 3300 &   then   node scripts/smoke.mjs
 *         (override the origin with BASE=http://…)
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://127.0.0.1:3300';
const failures = [];
let checks = 0;

function check(name, condition, detail = '') {
  checks += 1;
  if (condition) console.log(`  ✓ ${name}`);
  else {
    console.log(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`);
    failures.push(name);
  }
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? undefined,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(error.message));

console.log('\nStatus codes');
for (const [path, expected] of [
  ['/', 200],
  ['/chapter/map', 200],
  ['/winery/tawse', 200],
  ['/winery/tawse/cellar', 200],
  ['/wine/tawse-quarry-road-unoaked-chardonnay-2024', 200],
  ['/wine/nope', 404],
  ['/winery/nope', 404],
]) {
  const response = await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
  check(`${path} → ${expected}`, response?.status() === expected, `got ${response?.status()}`);
}

console.log('\nThe book opens and turns');
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
check('cover plays', (await page.locator('.cover-stage').count()) === 1);
await page.waitForTimeout(2600);
check('cover clears itself', (await page.locator('.cover-stage').count()) === 0);
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(900);
check('arrow key turns the page', new URL(page.url()).pathname === '/chapter/our-story');
await page.locator('.corner-turn--next').click();
await page.waitForTimeout(900);
check('page corner turns', new URL(page.url()).pathname === '/chapter/trust');
await page.goBack();
await page.waitForTimeout(700);
check('back button works', new URL(page.url()).pathname === '/chapter/our-story');

console.log('\nContents, map and collection');
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.click('text=The Map of Wineries');
await page.waitForTimeout(900);
check('contents entry opens its chapter', new URL(page.url()).pathname === '/chapter/map');
await page.reload({ waitUntil: 'networkidle' });
check('reload lands in place', new URL(page.url()).pathname === '/chapter/map');
await page.click('.atlas__chip >> nth=0');
await page.waitForTimeout(500);
check('a map marker opens its estates', (await page.locator('.atlas__entry').count()) > 0);

await page.goto(BASE + '/chapter/collection', { waitUntil: 'networkidle' });
const total = await page.locator('.collection__grid > li').count();
await page.fill('input[type=search]', 'riesling');
await page.waitForTimeout(1200);
const found = await page.locator('.collection__grid > li').count();
check('search narrows the collection', found > 0 && found < total, `${found} of ${total}`);
check('search is in the URL', page.url().includes('q=riesling'));
await page.fill('input[type=search]', 'zzzzzz');
await page.waitForTimeout(1100);
check('empty result has a state', (await page.locator('.empty-state').count()) > 0);

console.log('\nThe cellar and the membership gate');
await page.goto(BASE + '/wine/tawse-quarry-road-unoaked-chardonnay-2024', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
check('ordering is hidden when logged out', (await page.locator('text=/Add (a bottle|to the trial)/').count()) === 0);
await page.click('text=Save to your cellar');
await page.waitForTimeout(400);
await page.goto(BASE + '/cellar', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
check('a saved bottle reaches the cellar', (await page.locator('.collection__grid > li').count()) > 0);

await page.goto(BASE + '/chapter/trust', { waitUntil: 'networkidle' });
await page.click('text=Start a trial membership');
await page.waitForTimeout(1300);
check('age confirmation is required', (await page.locator('.notice--bad').count()) === 1);
await page.check('input[name=age]');
await page.click('text=Start a trial membership');
await page.waitForTimeout(1600);
check('trial membership starts', (await page.locator('.notice--good').count()) > 0);

await page.goto(BASE + '/wine/benjamin-bridge-nv-brut', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
check('ordering appears for a member', (await page.locator('text=/Add (a bottle|to the trial)/').count()) === 1);
await page.click('text=/Add (a bottle|to the trial)/');
await page.waitForTimeout(500);
await page.goto(BASE + '/basket', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
check('the basket holds the bottle', (await page.locator('.basket__line').count()) === 1);
await page.click('text=Place a trial order');
await page.waitForTimeout(2200);
const confirmation = await page.locator('.notice--good').first().innerText();
check('a trial order is recorded', /NV-TRIAL-/.test(confirmation));
check('the confirmation says nothing was charged', /no payment was taken/i.test(confirmation));
await page.goto(BASE + '/cellar', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
check('the order reaches the order history', (await page.locator('.note-list li').count()) > 0);

console.log('\nConsole');
check('no page errors anywhere', pageErrors.length === 0, pageErrors.slice(0, 2).join(' | '));

await browser.close();

console.log(`\n${checks - failures.length}/${checks} passed`);
if (failures.length) {
  console.error(`\nFailed: ${failures.join(', ')}\n`);
  process.exit(1);
}
console.log('');

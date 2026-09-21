import type { Chapter } from '@/lib/types';
import { WINERIES } from './wineries';

/**
 * The table of contents is the navigation, not decoration. Page numbers are
 * real: each chapter occupies a known range, and winery chapters are numbered
 * inside chapter four.
 */
export const CHAPTERS: Chapter[] = [
  { slug: 'our-story', number: 1, title: 'Our Story', subtitle: 'Why North & Vine exists', page: 9, href: '/chapter/our-story' },
  { slug: 'trust', number: 2, title: 'Trust Membership', subtitle: 'What the key opens', page: 17, href: '/chapter/trust' },
  { slug: 'map', number: 3, title: 'The Map of Wineries', subtitle: 'Ten places, plotted', page: 25, href: '/chapter/map' },
  { slug: 'wineries', number: 4, title: 'Ten Wineries, Ten Stories', subtitle: 'The producers of this book', page: 33, href: '/chapter/wineries' },
  { slug: 'collection', number: 5, title: 'The Collection', subtitle: 'Every wine we have verified', page: 121, href: '/chapter/collection' },
  { slug: 'cellar', number: 6, title: 'Your Cellar', subtitle: 'What you keep', page: 161, href: '/cellar' },
];

export const CHAPTERS_BY_SLUG: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.slug, c]),
);

/**
 * Winery chapters sit inside chapter four. Each runs to three spreads — the
 * place and its people, the chronicle, and the wines — over eight pages.
 */
const WINERY_CHAPTER_START = 34;
const PAGES_PER_WINERY = 8;

export function wineryPage(slug: string): number {
  const index = WINERIES.findIndex((w) => w.slug === slug);
  return index < 0 ? WINERY_CHAPTER_START : WINERY_CHAPTER_START + index * PAGES_PER_WINERY;
}

/** The book's reading order, used by the corner turn and the arrow keys. */
export function readingOrder(): { href: string; label: string; page: number }[] {
  const spine: { href: string; label: string; page: number }[] = [
    { href: '/', label: 'Frontispiece', page: 1 },
    { href: '/chapter/our-story', label: 'Our Story', page: 9 },
    { href: '/chapter/trust', label: 'Trust Membership', page: 17 },
    { href: '/chapter/map', label: 'The Map of Wineries', page: 25 },
    { href: '/chapter/wineries', label: 'Ten Wineries, Ten Stories', page: 33 },
  ];
  for (const w of WINERIES) {
    const first = wineryPage(w.slug);
    spine.push({ href: `/winery/${w.slug}`, label: w.shortName, page: first });
    spine.push({ href: `/winery/${w.slug}/chronicle`, label: `${w.shortName}: Chronicle`, page: first + 2 });
    spine.push({ href: `/winery/${w.slug}/cellar`, label: `${w.shortName}: The wines`, page: first + 4 });
  }
  spine.push({ href: '/chapter/collection', label: 'The Collection', page: 121 });
  spine.push({ href: '/chapter/first-bottle', label: 'Find your first bottle', page: 123 });
  spine.push({ href: '/cellar', label: 'Your Cellar', page: 161 });
  return spine;
}

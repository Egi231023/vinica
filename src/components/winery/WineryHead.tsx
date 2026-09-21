import Link from 'next/link';
import type { Winery } from '@/lib/types';
import { wineryPage } from '@/data/chapters';

/** The masthead that opens every winery leaf, so a reader arriving by deep link
 *  always knows whose chapter they are in and where else it goes. */
export function WineryHead({ winery, leaf }: { winery: Winery; leaf: 'place' | 'chronicle' | 'cellar' }) {
  const leaves = [
    { key: 'place', label: 'The place', href: `/winery/${winery.slug}` },
    { key: 'chronicle', label: 'Chronicle', href: `/winery/${winery.slug}/chronicle` },
    { key: 'cellar', label: 'The wines', href: `/winery/${winery.slug}/cellar` },
  ] as const;

  return (
    <header className="winery-head">
      <p className="chapter-number" style={{ color: winery.accent.ink }}>
        Chapter IV · {String(wineryPage(winery.slug)).padStart(2, '0')}
      </p>
      <h1 className="chapter-title" style={{ color: winery.accent.ink }}>
        {winery.name}
      </h1>
      <p className="winery-head__where">
        {winery.settlement} · {winery.region.appellation}
        {winery.region.parent ? `, ${winery.region.parent}` : ''}
        {winery.founded ? ` · founded ${winery.founded.year}` : ''}
      </p>
      <nav className="leaf-nav" aria-label="Leaves in this chapter">
        {leaves.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="leaf-nav__item"
            aria-current={item.key === leaf ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

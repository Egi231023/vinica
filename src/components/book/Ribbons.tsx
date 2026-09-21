'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCellar } from '@/lib/cellar';

/** Text bookmarks stay visible: readers never need to discover a hover menu. */
export function Ribbons() {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const { saved, cartCount, ready } = useCellar();
  const items = [
    { href: '/chapter/first-bottle', label: 'Find a wine' },
    { href: '/chapter/collection', label: 'Collection', prefix: '/wine/' },
    { href: '/chapter/wineries', label: 'Wineries', prefix: '/winery/' },
    { href: '/chapter/map', label: 'Map' },
    { href: '/chapter/trust', label: 'Trust membership' },
    { href: '/cellar', label: 'Your cellar', count: ready ? saved.length : 0 },
  ];
  return <header className="book-header">
    <div className="book-header__identity">
      <Link href="/" className="book-header__brand" aria-label="North and Vine — home and contents">North <em>&amp;</em> Vine</Link>
      <Link href="/basket" className="book-header__basket" aria-current={pathname === '/basket' ? 'page' : undefined}>Basket{ready && cartCount ? ` (${cartCount})` : ''}</Link>
    </div>
    <nav className="book-nav" aria-label="Main navigation">
      {items.map(item => <Link key={item.href} href={item.href}
        aria-current={pathname === item.href || (item.prefix && pathname.startsWith(item.prefix)) ? 'page' : undefined}>
        {item.label}{item.count ? <span className="book-nav__count">{item.count}<span className="visually-hidden"> saved wines</span></span> : null}
      </Link>)}
    </nav>
  </header>;
}

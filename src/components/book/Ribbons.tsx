'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCellar } from '@/lib/cellar';

/**
 * The fore-edge bookmarks.
 *
 * They sit quietly against the edge of the page and slide out on hover, so the
 * four things a reader needs constantly — the contents, the wines, their own
 * cellar, and the basket — are never more than one move away. Buying a bottle
 * does not require reading the book from the beginning.
 */
export function Ribbons() {
  const pathname = usePathname();
  const { saved, cartCount, ready } = useCellar();

  const items = [
    { href: '/', label: 'Contents', mark: '❧' },
    { href: '/chapter/collection', label: 'Collection', mark: '⌘' },
    { href: '/cellar', label: 'Cellar', mark: '◈', count: ready ? saved.length : 0 },
    { href: '/basket', label: 'Basket', mark: '⛃', count: ready ? cartCount : 0 },
  ];

  return (
    <nav className="ribbons" aria-label="Bookmarks">
      {items.map((item) => {
        const current = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="ribbon"
            aria-current={current ? 'page' : undefined}
          >
            <span className="ribbon__icon" aria-hidden="true">
              {item.mark}
            </span>
            <span>{item.label}</span>
            {item.count ? (
              <span className="ribbon__count">
                {item.count}
                <span className="visually-hidden"> items</span>
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

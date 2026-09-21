import Link from 'next/link';
import type { Wine, Winery } from '@/lib/types';
import { Bottle, initialsFor } from '@/components/Bottle';

/**
 * Bottles standing on a shelf, as objects on the page rather than cards in a grid.
 */
export function WineShelf({ wines, wineriesBySlug }: { wines: Wine[]; wineriesBySlug: Record<string, Winery> }) {
  if (wines.length === 0) {
    return (
      <p className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">
          ⌀
        </span>
        Nothing on this shelf yet.
      </p>
    );
  }

  return (
    <div className="shelf">
      {wines.map((wine) => {
        const winery = wineriesBySlug[wine.winerySlug];
        return (
          <Link className="bottle-link" href={`/wine/${wine.slug}`} key={wine.slug}>
            <Bottle
              shape={wine.bottle}
              colour={wine.colour}
              producerInitials={initialsFor(winery?.name ?? wine.name)}
              vintage={typeof wine.vintage === 'number' ? String(wine.vintage) : undefined}
              photo={wine.photo}
              height={158}
            />
            <span className="bottle-link__name">{wine.name}</span>
            <span className="bottle-link__vintage">{vintageLabel(wine.vintage)}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function vintageLabel(vintage: Wine['vintage']): string {
  if (vintage === 'NV') return 'Non-vintage';
  if (vintage === 'unspecified') return 'Vintage unconfirmed';
  return String(vintage);
}

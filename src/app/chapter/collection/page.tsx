import { BookArtwork } from '@/components/BookArtwork';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Spread } from '@/components/book/Spread';
import { Collection, type CollectionEntry } from '@/components/Collection';
import { WINES } from '@/data/wines';
import { WINERIES, WINERIES_BY_SLUG } from '@/data/wineries';
import { initialsFor } from '@/components/Bottle';
import { vintageLabel } from '@/components/WineShelf';
import { ALL_SOURCES } from '@/data/sources';

export const metadata: Metadata = {
  title: 'The Collection',
  description:
    'Every wine we have verified across the ten producers, searchable and filterable — with what we do not yet know shown as gaps.',
};

function toEntries(): CollectionEntry[] {
  return WINES.map((wine) => {
    const winery = WINERIES_BY_SLUG[wine.winerySlug];
    const grapes = wine.grapes.map((g) => g.variety);
    const label = vintageLabel(wine.vintage);
    const haystack = [
      wine.name,
      wine.fullName ?? '',
      winery?.name ?? '',
      winery?.settlement ?? '',
      wine.region.appellation,
      wine.region.provinceName,
      wine.vineyard ?? '',
      label,
      ...grapes,
      ...wine.profile.notes.map((note) => note.text),
      ...(wine.pairing ?? []).map((note) => note.text),
    ]
      .join(' ')
      .toLowerCase();

    return {
      slug: wine.slug,
      name: wine.name,
      vintageLabel: label,
      vintageSort: typeof wine.vintage === 'number' ? wine.vintage : 0,
      colour: wine.colour,
      bottle: wine.bottle,
      winerySlug: wine.winerySlug,
      wineryName: winery?.name ?? 'Unknown producer',
      initials: initialsFor(winery?.name ?? wine.name),
      province: wine.region.province,
      provinceName: wine.region.provinceName,
      appellation: wine.region.appellation,
      grapes,
      availability: wine.availability.producer,
      hasPhoto: wine.photo.status === 'licensed',
      haystack,
    };
  });
}

export default function CollectionChapter() {
  const entries = toEntries();
  const missingPhotos = entries.filter((e) => !e.hasPhoto).length;
  const withoutWines = WINERIES.filter((w) => !WINES.some((wine) => wine.winerySlug === w.slug));
  const indirect = ALL_SOURCES.filter((s) => s.method === 'search-snippet').length;

  return (
    <Spread
      leftHead="Chapter V · The Collection"
      rightHead="A taste for discovery"
      leftPage={121}
      rightPage={122}
      left={
        <>
          <p className="chapter-number">Chapter V</p>
          <h1 className="chapter-title">The Collection</h1>
          <p className="chapter-standfirst">
            Every wine we have verified. Search it, or narrow it — the filters stay in the address
            bar, so a shelf you like is a link you can keep.
          </p>
          <Suspense fallback={<Loading />}>
            <Collection entries={entries} />
          </Suspense>
        </>
      }
      right={<Caveats missingPhotos={missingPhotos} withoutWines={withoutWines} indirect={indirect} total={entries.length} />}
    />
  );
}

function Loading() {
  return (
    <div className="loading-lines" aria-label="Loading the collection">
      <span style={{ width: '70%' }} />
      <span style={{ width: '90%' }} />
      <span style={{ width: '55%' }} />
    </div>
  );
}

function Caveats({
  missingPhotos,
  withoutWines,
  indirect,
  total,
}: {
  missingPhotos: number;
  withoutWines: { slug: string; name: string }[];
  indirect: number;
  total: number;
}) {
  return <>
    <p className="chapter-number">Notes from the tasting table</p>
    <h2 className="chapter-title">Follow your curiosity.</h2>
    <p className="chapter-standfirst">A grape you know. A place you don’t. There is more than one way into this book.</p>
    <BookArtwork name="red-aromas" />
    <nav className="discovery-links" aria-label="Explore wine styles">
      <Link href="/chapter/collection?colour=red"><span>I</span> A study in red <span>→</span></Link>
      <Link href="/chapter/collection?colour=white"><span>II</span> Into the light <span>→</span></Link>
      <Link href="/chapter/collection?colour=sparkling"><span>III</span> A little celebration <span>→</span></Link>
      <Link href="/chapter/map"><span>IV</span> Let the map decide <span>→</span></Link>
    </nav>
    <p className="marginal">The fruit studies are editorial illustrations, not ingredient lists. Each wine has its own sourced tasting notes.</p>
    <details className="editorial-details">
      <summary>About this collection · {total} wines</summary>
      <p>{missingPhotos} wines currently use illustrated silhouettes while product photography is being arranged.</p>
      <p>This is a growing selection, not every wine from every producer. Unconfirmed vintages are marked on their pages.</p>
      <p>North &amp; Vine is not taking wine orders. Producer prices and availability do not represent our stock.</p>
      {withoutWines.length > 0 && <p>Still to catalogue: {withoutWines.map(w => w.name).join(', ')}.</p>}
      <p>{indirect} source records were checked indirectly and are labelled in the references.</p>
    </details>
  </>;
}

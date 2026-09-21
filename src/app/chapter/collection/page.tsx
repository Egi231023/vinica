import { BookArtwork } from '@/components/BookArtwork';
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
      rightHead="What the collection does not yet hold"
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
  return (
    <>
      <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
        What is missing
      </h2>
      <p className="chapter-standfirst">
        A catalogue is only as honest as its list of holes. Here is ours.
      </p>

      <h3 className="section-title">Photography</h3>
      <div className="prose" style={{ fontSize: 'var(--step--1)' }}>
        <p>
          {missingPhotos} of {total} wines have no rights-cleared photograph. Rather than generate
          convincing imitations of other people&rsquo;s labels — which would be both dishonest and
          an infringement — every bottle in this book is <em>drawn</em>: the correct silhouette for
          its shape, the right glass colour, and a plate set in our own lettering. It is
          recognisably our drawing, not a picture of their label.
        </p>
        <p>
          The fix is not a rendering technique. It is asking each producer for their product or
          press imagery, with permission in writing. The request letter and the tracking list are
          in <code>docs/PHOTOGRAPHY.md</code>.
        </p>
      </div>

      <BookArtwork name="vine-study" compact />

      <h3 className="section-title">Producers with no verified wines</h3>
      {withoutWines.length === 0 ? (
        <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-soft)' }}>
          None — every producer has at least one verified wine.
        </p>
      ) : (
        <ul className="plain-list">
          {withoutWines.map((winery) => (
            <li key={winery.slug}>{winery.name}</li>
          ))}
        </ul>
      )}

      <h3 className="section-title">Vintages</h3>
      <p className="prose" style={{ fontSize: 'var(--step--1)' }}>
        Where a source named a wine but not a vintage, the wine reads{' '}
        <em>Vintage unconfirmed</em>. We do not carry a vintage across from another bottling to fill
        the space, because two vintages of the same wine are not the same wine.
      </p>

      <h3 className="section-title">Prices and stock</h3>
      <p className="prose" style={{ fontSize: 'var(--step--1)' }}>
        No wine in this collection can be shipped by North &amp; Vine today. There are no supply
        agreements, no stock, and no selling prices. Where a producer&rsquo;s own list price is
        known we print it as theirs.
      </p>

      <p className="gap-note">
        <strong>How the sources were checked:</strong> {indirect} of the citations in this book were
        confirmed through search retrieval of the cited page rather than a direct read, because the
        environment this was built in could not reach those sites. They are labelled{' '}
        <span className="tag tag--unverified">indirect</span> wherever they appear.
      </p>
    </>
  );
}

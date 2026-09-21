import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Spread } from '@/components/book/Spread';
import { WineryHead } from '@/components/winery/WineryHead';
import { WineShelf } from '@/components/WineShelf';
import { Footnotes, SourceIndex } from '@/components/Provenance';
import { WINERIES, WINERIES_BY_SLUG, getWinery } from '@/data/wineries';
import { winesForWinery } from '@/data/wines';
import { wineryPage } from '@/data/chapters';

export function generateStaticParams() {
  return WINERIES.map((winery) => ({ slug: winery.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const winery = getWinery(slug);
  return winery ? { title: `${winery.name} — the wines` } : { title: 'Not in this book' };
}

const COVERAGE_LABEL = {
  'complete-as-published': 'Complete, as published',
  partial: 'Partial',
  sample: 'A verified sample',
} as const;

export default async function WineryCellar({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const winery = getWinery(slug);
  if (!winery) notFound();

  const page = wineryPage(winery.slug) + 4;
  const wines = winesForWinery(winery.slug);

  const current = wines.filter((w) => w.availability.producer === 'current');
  const archive = wines.filter((w) => w.availability.producer === 'archive');
  const unknown = wines.filter((w) => w.availability.producer === 'unknown');

  const index = new SourceIndex();
  index.add(winery.catalogue.sources);
  for (const wine of wines) index.add(wine.sources);

  return (
    <Spread
      leftHead={`${winery.shortName} · The wines`}
      rightHead={`${winery.shortName} · What we can and cannot supply`}
      leftPage={page}
      rightPage={page + 1}
      left={
        <>
          <WineryHead winery={winery} leaf="cellar" />

          {wines.length === 0 ? (
            <p className="gap-note">
              <strong>Not yet known:</strong> we have not verified a single wine from this producer
              to the standard the rest of the book uses — name, vintage, varieties, region and a
              sourced tasting note. Rather than fill the shelf with half-facts, we have left it
              empty and listed this producer first in the transcription queue.
            </p>
          ) : (
            <>
              {current.length > 0 && (
                <>
                  <h3 className="section-title">On the producer&rsquo;s current list</h3>
                  <WineShelf wines={current} wineriesBySlug={WINERIES_BY_SLUG} />
                </>
              )}
              {unknown.length > 0 && (
                <>
                  <h3 className="section-title">Listed, availability unconfirmed</h3>
                  <WineShelf wines={unknown} wineriesBySlug={WINERIES_BY_SLUG} />
                </>
              )}
              {archive.length > 0 && (
                <>
                  <h3 className="section-title">Archive — documented, not for sale</h3>
                  <WineShelf wines={archive} wineriesBySlug={WINERIES_BY_SLUG} />
                </>
              )}
            </>
          )}
        </>
      }
      right={
        <>
          <h3 className="section-title">How complete this shelf is</h3>
          <dl className="ledger">
            <div>
              <dt>Coverage</dt>
              <dd>{COVERAGE_LABEL[winery.catalogue.status]}</dd>
            </div>
            <div>
              <dt>Wines verified</dt>
              <dd>{wines.length}</dd>
            </div>
            {winery.catalogue.publishedCount != null && (
              <div>
                <dt>Listed by the producer</dt>
                <dd>{winery.catalogue.publishedCount} at last check</dd>
              </div>
            )}
            <div>
              <dt>Last checked</dt>
              <dd>{winery.catalogue.checkedAt}</dd>
            </div>
          </dl>
          <p className="prose" style={{ fontSize: 'var(--step--1)', color: 'var(--ink-soft)' }}>
            {winery.catalogue.note}
          </p>

          <hr className="rule-ornament" />

          <h3 className="section-title">Three different questions</h3>
          <div className="prose" style={{ fontSize: 'var(--step--1)' }}>
            <p>
              <strong>Is it on the producer&rsquo;s list?</strong> That is what the headings on the
              facing page mean, and it is checked against their own pages and listings.
            </p>
            <p>
              <strong>Can North &amp; Vine ship it to you?</strong> Separately: no. No supply
              agreement exists with any producer in this book, so every wine here reads{' '}
              <span className="tag tag--gap">Not contracted</span>. Availability at the winery is
              not stock with us.
            </p>
            <p>
              <strong>What does it cost?</strong> Where we know a producer&rsquo;s own list price we
              print it as theirs. It is not our selling price, and we have not set one.
            </p>
          </div>

          <Footnotes index={index} title="Sources for this shelf" />
        </>
      }
    />
  );
}

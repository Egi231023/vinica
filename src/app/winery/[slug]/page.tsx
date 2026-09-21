import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Spread } from '@/components/book/Spread';
import { WineryHead } from '@/components/winery/WineryHead';
import { ClaimList, Footnotes, buildSourceIndex } from '@/components/Provenance';
import { WINERIES, getWinery } from '@/data/wineries';
import { wineryPage } from '@/data/chapters';

export function generateStaticParams() {
  return WINERIES.map((winery) => ({ slug: winery.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const winery = getWinery(slug);
  if (!winery) return { title: 'Not in this book' };
  return {
    title: winery.name,
    description: winery.standfirst,
  };
}

export default async function WineryPlace({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const winery = getWinery(slug);
  if (!winery) notFound();

  const page = wineryPage(winery.slug);
  const index = buildSourceIndex(winery.place, winery.people, winery.soilAndClimate, winery.grapesAndMaking);

  return (
    <Spread
      leftHead={`${winery.shortName} · The place and its people`}
      rightHead={`${winery.shortName} · Soil, climate and making`}
      leftPage={page}
      rightPage={page + 1}
      left={
        <>
          <WineryHead winery={winery} leaf="place" />

          <p className="chapter-standfirst">{winery.standfirst}</p>

          <h3 className="section-title">Why this producer is in the book</h3>
          <ul className="plain-list">
            {winery.selection.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
          <p style={{ margin: '0 0 1.2rem' }}>
            <span className="tag tag--interpretation">
              {winery.selection.relationship === 'partner' ? 'Signed partner' : 'Editorial selection'}
            </span>{' '}
            <span style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
              {winery.selection.relationship === 'partner'
                ? 'A supply agreement is in place; this page is a commercial relationship as well as an editorial one.'
                : 'No commercial relationship exists between North & Vine and this producer.'}
            </span>
          </p>

          <hr className="rule-ornament" />

          <h3 className="section-title">The place and the land</h3>
          <ClaimList claims={winery.place} index={index} />

          <h3 className="section-title">The people</h3>
          <ClaimList claims={winery.people} index={index} />
        </>
      }
      right={
        <>
          <h3 className="section-title">Soil and climate</h3>
          <ClaimList claims={winery.soilAndClimate} index={index} />

          <h3 className="section-title">Grapes and making</h3>
          <ClaimList claims={winery.grapesAndMaking} index={index} />

          <p className="marginal">
            <a className="booklink" href={winery.website} target="_blank" rel="noopener noreferrer">
              {new URL(winery.website).hostname.replace(/^www\./, '')}
            </a>{' '}
            — the producer&rsquo;s own site. We link it rather than reproduce it.
          </p>

          <Footnotes index={index} />
        </>
      }
    />
  );
}

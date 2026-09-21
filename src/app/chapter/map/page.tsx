import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { AtlasMap } from '@/components/AtlasMap';
import { MapPlate } from '@/components/MapPlate';
import { WINERIES } from '@/data/wineries';
import { buildSourceIndex, Footnotes } from '@/components/Provenance';

export const metadata: Metadata = {
  title: 'The Map of Wineries',
  description:
    'Ten Canadian wineries plotted from their published locations, on a Lambert conformal conic projection centred on Canada.',
};

export default function MapChapter() {
  /* One verified line per producer, for the marker panel. */
  const facts: Record<string, string> = Object.fromEntries(
    WINERIES.map((winery) => [winery.slug, winery.curiosities[0]?.text ?? winery.standfirst]),
  );

  const index = buildSourceIndex(...WINERIES.map((w) => w.curiosities.slice(0, 1)));

  return (
    <Spread
      leftHead="Chapter III · The Map of Wineries"
      rightHead="The ten, by province"
      leftPage={25}
      rightPage={26}
      left={
        <>
          <p className="chapter-number">Chapter III</p>
          <h1 className="chapter-title">The Map</h1>
          <p className="chapter-standfirst">
            North America, with Canada at the centre of the page — as an atlas would set it.
          </p>
          <AtlasMap facts={facts} plate={<MapPlate />} />
        </>
      }
      right={<Index index={index} />}
    />
  );
}

function Index({ index }: { index: ReturnType<typeof buildSourceIndex> }) {
  const byProvince = new Map<string, typeof WINERIES>();
  for (const winery of WINERIES) {
    const key = winery.region.provinceName;
    byProvince.set(key, [...(byProvince.get(key) ?? []), winery]);
  }

  return (
    <>
      <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
        The ten, in text
      </h2>
      <p className="chapter-standfirst">
        The same ten estates, readable without the map — and reachable without a mouse.
      </p>

      {[...byProvince.entries()].map(([province, wineries]) => (
        <section key={province}>
          <h3 className="section-title">{province}</h3>
          <ul className="plain-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
            {wineries.map((winery) => (
              <li key={winery.slug} style={{ marginBottom: '0.7rem' }}>
                <Link className="booklink" href={`/winery/${winery.slug}`}>
                  {winery.name}
                </Link>
                <br />
                <span style={{ color: 'var(--ink-faint)' }}>
                  {winery.settlement} · {winery.region.appellation}
                  {winery.region.parent ? `, ${winery.region.parent}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="marginal">
        Pin positions come from each producer&rsquo;s published address or the settlement it sits
        in, and are marked accordingly. None is placed by eye. Where a pin says &ldquo;located to
        the settlement&rdquo;, we hold the town but not a surveyed point.
      </p>

      <Footnotes index={index} title="Sources for the notes on this map" />
    </>
  );
}

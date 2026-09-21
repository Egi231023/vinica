import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { WINERIES } from '@/data/wineries';
import { winesForWinery } from '@/data/wines';
import { wineryPage } from '@/data/chapters';

export const metadata: Metadata = {
  title: 'Ten Wineries, Ten Stories',
  description:
    'The ten producers of this book, why each was chosen, and how complete our record of each one is.',
};

export default function WineriesChapter() {
  return (
    <Spread
      leftHead="Chapter IV · Ten Wineries, Ten Stories"
      rightHead="The producers"
      leftPage={33}
      rightPage={34}
      left={<Preamble />}
      right={<Roster />}
    />
  );
}

function Preamble() {
  return (
    <>
      <p className="chapter-number">Chapter IV</p>
      <h1 className="chapter-title">Ten Wineries, Ten Stories</h1>
      <p className="chapter-standfirst">
        Chosen, not ranked. Here is exactly what that means.
      </p>

      <div className="prose">
        <p className="dropcap">
          There is no method by which anyone could honestly name Canada&rsquo;s ten best wineries,
          and we are not pretending to have one. What follows is a selection: ten producers we
          think are worth a chapter, for reasons we set out on each of their pages.
        </p>
        <p>What we were looking for:</p>
      </div>

      <ul className="plain-list">
        <li>
          <strong>Quality we can point at</strong> — independently awarded, or documented by people
          who taste for a living.
        </li>
        <li>
          <strong>A story with evidence behind it</strong> — a founding, a decision, a certification,
          something that happened and can be checked.
        </li>
        <li>
          <strong>Regional spread</strong> — Ontario, British Columbia, Nova Scotia and Québec, and
          sub-regions within them, because Canada is not one wine country.
        </li>
        <li>
          <strong>A range we can describe</strong> — enough published detail to write about the wines
          rather than the brand.
        </li>
        <li>
          <strong>Producers we would want to work with</strong> — which is a judgement, and ours.
        </li>
      </ul>

      <hr className="rule-ornament" />

      <p className="gap-note">
        <strong>Editorial, not commercial.</strong> Every producer here is marked{' '}
        <span className="tag tag--interpretation">Editorial selection</span>. None has a supply
        agreement with North &amp; Vine. Nothing in this chapter is sponsored, and no producer has
        seen these pages before you.
      </p>
    </>
  );
}

function Roster() {
  return (
    <>
      <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
        The producers
      </h2>
      <p className="chapter-standfirst">Each opens a chapter of its own.</p>

      <ol className="roster">
        {WINERIES.map((winery, i) => {
          const wines = winesForWinery(winery.slug);
          return (
            <li className="roster__item" key={winery.slug}>
              <Link className="roster__link" href={`/winery/${winery.slug}`}>
                <span
                  className="roster__seal"
                  style={{ background: winery.accent.wash, color: winery.accent.ink }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="roster__body">
                  <span className="roster__name">{winery.name}</span>
                  <span className="roster__meta">
                    {winery.settlement} · {winery.region.appellation}
                    {winery.founded ? ` · founded ${winery.founded.year}` : ''}
                  </span>
                  <span className="roster__stand">{winery.standfirst}</span>
                  <span className="roster__tags">
                    <span className="tag tag--interpretation">Editorial selection</span>
                    {wines.length > 0 ? (
                      <span className="tag tag--fact">
                        {wines.length} wine{wines.length === 1 ? '' : 's'} verified
                      </span>
                    ) : (
                      <span className="tag tag--gap">No wines verified yet</span>
                    )}
                  </span>
                </span>
                <span className="roster__folio">{wineryPage(winery.slug)}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}

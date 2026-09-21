import { BookArtwork } from '@/components/BookArtwork';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { CHAPTERS } from '@/data/chapters';
import { WINERIES } from '@/data/wineries';
import { WINES } from '@/data/wines';
import { ContinueReading } from '@/components/ContinueReading';

export default function Frontispiece() {
  return (
    <Spread
      leftHead="Why we exist"
      rightHead="Contents"
      leftPage={1}
      rightPage={2}
      left={<Introduction />}
      right={<Contents />}
    />
  );
}

function Introduction() {
  return <>
    <p className="chapter-number">North &amp; Vine · The first edition</p>
    <h1 className="chapter-title">Good wine.<br /><em>A wider world.</em></h1>
    <p className="chapter-standfirst">Ten Canadian wineries. One curious spirit.</p>
    <BookArtwork name="western-vineyard" priority />
    <div className="prose lede">
      <p className="dropcap">We love wine for what it opens: a place, a story, a conversation.
        North &amp; Vine brings remarkable Canadian producers into one book, so your next discovery
        can begin far beyond a single vineyard.</p>
      <p><strong>Trust</strong> is the membership we are building around that idea.
        More choice across producers, thoughtful service, and a cellar that remembers your taste.</p>
    </div>
    <p className="signature">For the love of wine. — North &amp; Vine</p>
    <div className="editorial-actions">
      <Link className="btn" href="/chapter/trust">Discover Trust →</Link>
      <Link className="booklink" href="/chapter/map">Find your first vineyard</Link>
    </div>
    <p className="marginal">{WINERIES.length} selected producers · {WINES.length} documented wines.
      This is our reading edition; paid membership and deliveries are not yet open.</p>
  </>;
}

function Contents() {
  return (
    <>
      <p className="chapter-number">The book</p>
      <h2 className="chapter-title">Contents</h2>
      <p className="chapter-standfirst">Six chapters. Every line below opens.</p>

      <ol className="contents">
        {CHAPTERS.map((chapter) => (
          <li className="contents__item" key={chapter.slug}>
            <Link className="contents__link" href={chapter.href}>
              <span className="contents__num" aria-hidden="true">
                {romanise(chapter.number)}
              </span>
              <span>
                <span className="contents__title">
                  {chapter.title}
                  <span aria-hidden="true" />
                </span>
                <span className="contents__sub">{chapter.subtitle}</span>
              </span>
              <span className="contents__folio">{chapter.page}</span>
            </Link>
          </li>
        ))}
      </ol>

      <hr className="rule-ornament" />

      <BookArtwork name="vine-study" compact />

      <ContinueReading />

      <p className="marginal">
        Turn pages with the corner of the paper, the arrow keys, or a swipe. The ribbons on the
        edge keep the contents, collection, cellar and basket within reach.
      </p>
    </>
  );
}

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
function romanise(n: number): string {
  return NUMERALS[n - 1] ?? String(n);
}

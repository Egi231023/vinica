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
    <p className="intro-promise">Discover wines across Canadian producers, find a bottle for your taste, and keep your favourites in your own cellar.</p>
    <div className="editorial-actions intro-actions">
      <Link className="btn" href="/chapter/first-bottle">Find my first bottle →</Link>
      <Link className="booklink" href="/chapter/collection">Browse all wines</Link>
    </div>
    <div className="intro-art"><BookArtwork name="western-vineyard" priority /></div>
    <p className="intro-membership"><strong>One membership. A wider choice.</strong> Trust is the club we are building for people who love wine and thoughtful service. <Link className="booklink" href="/chapter/trust">Meet Trust →</Link></p>
    <p className="marginal">{WINERIES.length} selected producers · {WINES.length} documented wines.
      This is our reading edition; paid membership and deliveries are not yet open.</p>
  </>;
}

function Contents() {
  return (
    <>
      <p className="chapter-number">The book</p>
      <h2 className="chapter-title">Contents</h2>
      <p className="chapter-standfirst">Choose a chapter, or use the menu above at any time.</p>

      <ol className="contents contents--clear">
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

      <ContinueReading />

      <p className="marginal">
        Read in order using Next page below, or jump straight to any chapter. You can also use arrow keys or swipe.
      </p>
    </>
  );
}

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
function romanise(n: number): string {
  return NUMERALS[n - 1] ?? String(n);
}

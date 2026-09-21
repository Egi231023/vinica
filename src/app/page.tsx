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
      leftPage={6}
      rightPage={7}
      left={<Introduction />}
      right={<Contents />}
    />
  );
}

function Introduction() {
  return (
    <>
      <p className="chapter-number">North &amp; Vine</p>
      <h1 className="chapter-title">A book, and a way of buying wine</h1>

      <div className="prose lede">
        <p className="dropcap">
          We started North &amp; Vine because of a small, ordinary frustration. Canada makes wine
          worth caring about, and the usual way to buy it is one estate at a time — one club, one
          list, one shipment, repeated for every producer you come to like.
        </p>
        <p>
          So we built the thing we wanted instead: ten Canadian wineries, chosen by us, gathered
          into one book and one membership. You read about a place, you choose a bottle, and you
          deal with one service rather than ten.
        </p>
      </div>

      <hr className="rule-ornament" />

      <div className="prose">
        <p>
          The book is the point, not the packaging. Each of the ten producers has a chapter — the
          land, the people, the soil, the varieties, and the details that make a vineyard somewhere
          rather than anywhere. We went looking for those details in press archives, regional
          bodies and the producers&rsquo; own words.
        </p>
        <p>
          Every factual statement in here carries a source and the date we checked it. Where we
          have an opinion, it is marked as ours. Where we do not know something, the page says so
          rather than guessing, and lists the question we would put to the winemaker. You will find
          a fair number of those. We would rather show you the gaps than paper over them.
        </p>
        <p>
          <strong>Trust</strong> is the membership. One membership, ten cellars, a person who knows
          your taste, and a cellar of your own that remembers what you liked. The terms and the
          price are still being settled, and until they are, this book does not quote a number or
          promise a saving. What you can do today is read, save bottles, and walk a trial order
          from end to end — clearly marked as a trial, with nothing charged and nothing shipped.
        </p>
      </div>

      <p className="signature">— North &amp; Vine</p>

      <p className="marginal">
        {WINERIES.length} producers &middot; {WINES.length} wines verified so far &middot;
        every claim dated. Read how we check things in{' '}
        <Link className="booklink" href="/chapter/our-story">
          Our Story
        </Link>
        .
      </p>
    </>
  );
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

      <ContinueReading />

      <p className="marginal">
        Turn pages with the corner of the paper, the arrow keys, or a swipe. The ribbons on the
        edge hold the contents, the collection, your cellar and your basket — you never have to
        read the book to buy from it.
      </p>
    </>
  );
}

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
function romanise(n: number): string {
  return NUMERALS[n - 1] ?? String(n);
}

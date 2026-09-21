import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { CHAPTERS } from '@/data/chapters';

export default function NotFound() {
  return (
    <Spread
      leftHead="A page that is not in this book"
      rightHead="Contents"
      leftPage={0}
      rightPage={0}
      left={
        <>
          <p className="chapter-number">Errata</p>
          <h1 className="chapter-title">This page is not in the book</h1>
          <div className="prose">
            <p className="dropcap">
              Either the page was never bound in, or it has moved since you last looked. Neither is
              your fault.
            </p>
            <p>
              The contents on the facing page will take you anywhere in the book. If you arrived
              here from a link of ours, we would like to know.
            </p>
          </div>
          <p className="prose">
            <Link className="btn" href="/">
              Back to the frontispiece
            </Link>
          </p>
        </>
      }
      right={
        <>
          <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
            Contents
          </h2>
          <ol className="contents">
            {CHAPTERS.map((chapter) => (
              <li className="contents__item" key={chapter.slug}>
                <Link className="contents__link" href={chapter.href}>
                  <span className="contents__num" aria-hidden="true">
                    {chapter.number}
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
        </>
      }
    />
  );
}

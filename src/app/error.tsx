'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BookError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('North & Vine — page failed to render', error);
  }, [error]);

  return (
    <div className="spread paper-surface">
      <div className="spine" aria-hidden="true" />
      <section className="page page--left paper-surface">
        <p className="running-head">
          <span>Something went wrong</span>
          <span className="running-head__rule" aria-hidden="true" />
          <span aria-hidden="true">North &amp; Vine</span>
        </p>
        <p className="chapter-number">Errata</p>
        <h1 className="chapter-title">A page failed to set</h1>
        <div className="prose">
          <p className="dropcap">
            Something on our side went wrong while putting this page together. It is not something
            you did, and nothing in your cellar has been affected.
          </p>
          {error.digest && (
            <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
              Reference: <code>{error.digest}</code>
            </p>
          )}
        </div>
        <p className="prose" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn--solid" type="button" onClick={reset}>
            Try the page again
          </button>
          <Link className="btn" href="/">
            Back to the frontispiece
          </Link>
        </p>
      </section>
      <section className="page page--right paper-surface">
        <p className="running-head">
          <span>What still works</span>
          <span className="running-head__rule" aria-hidden="true" />
          <span aria-hidden="true">North &amp; Vine</span>
        </p>
        <div className="prose">
          <p>
            The rest of the book is unaffected. You can go back to{' '}
            <Link className="booklink" href="/chapter/collection">
              the collection
            </Link>
            , the{' '}
            <Link className="booklink" href="/chapter/map">
              map
            </Link>
            , or{' '}
            <Link className="booklink" href="/cellar">
              your cellar
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

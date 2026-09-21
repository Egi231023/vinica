'use client';
import { useId, useRef } from 'react';
import { ARTWORK, type ArtworkName } from '@/data/artwork';
export type { ArtworkName } from '@/data/artwork';

export function BookArtwork({ name, compact = false, priority = false }: {
  name: ArtworkName; compact?: boolean; priority?: boolean;
}) {
  const art = ARTWORK[name];
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const base = process.env.NEXT_PUBLIC_NV_ASSET_BASE_PATH ?? '';
  const src = `${base}/art/${name}`;
  return (
    <figure className={`book-art${compact ? ' book-art--compact' : ''}`}>
      <button type="button" className="book-art__open" aria-label={`View artwork: ${art.caption}`} onClick={() => dialog.current?.showModal()}>
        <img className="book-art__image" src={`${src}-960.webp`}
          srcSet={`${src}-480.webp 480w, ${src}-960.webp 960w, ${src}-1536.webp 1536w`}
          sizes={compact ? '(max-width: 760px) 80vw, 320px' : '(max-width: 760px) 85vw, 600px'}
          width={1536} height={1024} alt={art.alt} loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
        <span className="book-art__zoom" aria-hidden="true">View the plate ↗</span>
      </button>
      <figcaption className="book-art__caption">
        <span>{art.caption}</span><span className="book-art__credit">North &amp; Vine · Art direction: Eugen Chrenko</span>
      </figcaption>
      <dialog ref={dialog} className="art-dialog" aria-labelledby={titleId} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="art-dialog__sheet">
          <button type="button" className="art-dialog__close" onClick={() => dialog.current?.close()} autoFocus aria-label="Close artwork">Close ×</button>
          <img src={`${src}-1536.webp`} width={1536} height={1024} alt={art.alt} loading="lazy" />
          <p className="chapter-number">North &amp; Vine</p>
          <h2 id={titleId}>{art.caption}</h2>
          <p>Art direction: Eugen Chrenko · The North &amp; Vine collection.</p>
          <p>{'note' in art ? art.note : 'An imagined editorial illustration, not a portrait of a specific estate.'}</p>
          {'source' in art && art.source && <a className="booklink" href={art.source} target="_blank" rel="noopener noreferrer">Visual reference ↗</a>}
        </div>
      </dialog>
    </figure>
  );
}

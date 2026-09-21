'use client';

import Link from 'next/link';
import { useCellar } from '@/lib/cellar';
import { Bottle } from '@/components/Bottle';
import type { BasketWine } from '@/components/Basket';
import type { BottleShape, WineColour, Photo } from '@/lib/types';

export interface CellarWine extends BasketWine {
  colour: WineColour;
  bottle: BottleShape;
  initials: string;
  vintageNumeric?: string;
  photo: Photo;
}

export function CellarShelves({ catalogue }: { catalogue: Record<string, CellarWine> }) {
  const { saved, later, notes, ready, toggleSaved, toggleLater } = useCellar();

  if (!ready) {
    return (
      <div className="loading-lines" aria-label="Opening your cellar">
        <span style={{ width: '75%' }} />
        <span style={{ width: '55%' }} />
        <span style={{ width: '85%' }} />
      </div>
    );
  }

  return (
    <>
      <h3 className="section-title">Saved bottles</h3>
      <Rack
        slugs={saved}
        catalogue={catalogue}
        emptyText="Nothing saved yet. Every wine in the book has a “Save to your cellar” button."
        onRemove={toggleSaved}
      />

      <h3 className="section-title">For later</h3>
      <Rack
        slugs={later}
        catalogue={catalogue}
        emptyText="Your list for later is empty."
        onRemove={toggleLater}
      />

      <h3 className="section-title">Your tasting notes</h3>
      {notes.length === 0 ? (
        <p className="empty-state">
          <span className="empty-state__mark" aria-hidden="true">
            ✎
          </span>
          No notes written yet. You can write one on any wine&rsquo;s page.
        </p>
      ) : (
        <ul className="note-list">
          {notes.map((note) => {
            const wine = catalogue[note.wineSlug];
            return (
              <li key={`${note.wineSlug}-${note.on}`}>
                <p className="note-list__meta">
                  {new Date(note.on).toLocaleDateString('en-CA')}
                  {note.rating ? ` · ${'✦'.repeat(note.rating)}` : ''}
                </p>
                {wine && (
                  <p style={{ margin: '0 0 0.25rem' }}>
                    <Link className="booklink" href={`/wine/${note.wineSlug}`}>
                      {wine.name}
                    </Link>{' '}
                    <span style={{ color: 'var(--ink-faint)', fontSize: 'var(--step--1)' }}>
                      {wine.wineryName}
                    </span>
                  </p>
                )}
                <p className="note-list__text">{note.text}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function Rack({
  slugs,
  catalogue,
  emptyText,
  onRemove,
}: {
  slugs: string[];
  catalogue: Record<string, CellarWine>;
  emptyText: string;
  onRemove: (slug: string) => void;
}) {
  const wines = slugs.map((slug) => catalogue[slug]).filter(Boolean);

  if (wines.length === 0) {
    return (
      <p className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">
          ⌀
        </span>
        {emptyText}
      </p>
    );
  }

  return (
    <ul className="collection__grid" style={{ marginBottom: '1.4rem' }}>
      {wines.map((wine) => (
        <li key={wine.slug}>
          <Link className="bottle-link" href={`/wine/${wine.slug}`}>
            <Bottle
              shape={wine.bottle}
              colour={wine.colour}
              producerInitials={wine.initials}
              vintage={wine.vintageNumeric}
              photo={wine.photo}
              height={132}
            />
            <span className="bottle-link__name">{wine.name}</span>
            <span className="bottle-link__vintage">{wine.vintageLabel}</span>
          </Link>
          <button
            type="button"
            className="btn btn--quiet"
            style={{ display: 'block', margin: '0 auto', fontSize: '0.62rem' }}
            onClick={() => onRemove(wine.slug)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

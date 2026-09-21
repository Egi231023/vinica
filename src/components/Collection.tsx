'use client';

import { useMemo, useState, useEffect, useDeferredValue } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bottle } from '@/components/Bottle';
import type { BottleShape, WineColour } from '@/lib/types';

/**
 * The collection: every verified wine, searchable.
 *
 * Filters live in the URL, so a filtered shelf can be linked, bookmarked and
 * reached with the Back button — the same rule the rest of the book follows.
 */

export interface CollectionEntry {
  slug: string;
  name: string;
  vintageLabel: string;
  vintageSort: number;
  colour: WineColour;
  bottle: BottleShape;
  winerySlug: string;
  wineryName: string;
  initials: string;
  province: string;
  provinceName: string;
  appellation: string;
  grapes: string[];
  availability: 'current' | 'archive' | 'unknown';
  hasPhoto: boolean;
  /** Everything a search should look inside, lower-cased once at build time. */
  haystack: string;
}

const COLOURS: { key: WineColour; label: string }[] = [
  { key: 'red', label: 'Red' },
  { key: 'white', label: 'White' },
  { key: 'rose', label: 'Rosé' },
  { key: 'sparkling', label: 'Sparkling' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'orange', label: 'Orange' },
];

const AVAILABILITY: { key: CollectionEntry['availability']; label: string }[] = [
  { key: 'current', label: 'On the producer’s list' },
  { key: 'unknown', label: 'Availability unconfirmed' },
  { key: 'archive', label: 'Archive' },
];

export function Collection({ entries }: { entries: CollectionEntry[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState(() => params.get('q') ?? '');
  const deferredQuery = useDeferredValue(query);
  const [shelf, setShelf] = useState(1);
  useEffect(() => { setShelf(1); }, [params.toString(), deferredQuery]);
  useEffect(() => { setQuery(params.get('q') ?? ''); }, [params.get('q')]);

  const colour = params.get('colour');
  const province = params.get('province');
  const winery = params.get('winery');
  const availability = params.get('availability');
  const grape = params.get('grape');

  /* Keep the text query in the URL, but only once typing settles. */
  useEffect(() => {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (deferredQuery) next.set('q', deferredQuery);
    else next.delete('q');
    const target = next.toString();
    if (target !== params.toString()) {
      router.replace(target ? `/chapter/collection?${target}` : '/chapter/collection', {
        scroll: false,
      });
    }
    // `params` is a new object each render; comparing strings above is the guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery]);

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(Array.from(params.entries()));
    if (value) next.set(key, value);
    else next.delete(key);
    const target = next.toString();
    router.replace(target ? `/chapter/collection?${target}` : '/chapter/collection', { scroll: false });
  }

  const provinces = useMemo(
    () =>
      [...new Map(entries.map((e) => [e.province, e.provinceName])).entries()].sort((a, b) =>
        a[1].localeCompare(b[1]),
      ),
    [entries],
  );
  const wineries = useMemo(
    () =>
      [...new Map(entries.map((e) => [e.winerySlug, e.wineryName])).entries()].sort((a, b) =>
        a[1].localeCompare(b[1]),
      ),
    [entries],
  );
  const grapes = useMemo(
    () => [...new Set(entries.flatMap((e) => e.grapes))].sort((a, b) => a.localeCompare(b)),
    [entries],
  );

  const results = useMemo(() => {
    const terms = deferredQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return entries
      .filter((entry) => {
        if (colour && entry.colour !== colour) return false;
        if (province && entry.province !== province) return false;
        if (winery && entry.winerySlug !== winery) return false;
        if (availability && entry.availability !== availability) return false;
        if (grape && !entry.grapes.includes(grape)) return false;
        return terms.every((term) => entry.haystack.includes(term));
      })
      .sort(
        (a, b) =>
          a.wineryName.localeCompare(b.wineryName) ||
          a.name.localeCompare(b.name) ||
          b.vintageSort - a.vintageSort,
      );
  }, [entries, deferredQuery, colour, province, winery, availability, grape]);

  const pageCount = Math.max(1, Math.ceil(results.length / 6));
  const currentShelf = Math.min(shelf, pageCount);
  const visibleResults = results.slice((currentShelf - 1) * 6, currentShelf * 6);
  const activeFilters = [colour, province, winery, availability, grape].filter(Boolean).length;

  return (
    <div className="collection">
      <div className="collection__controls">
        <label className="field" style={{ marginBottom: '0.7rem' }}>
          <span className="field__label">Search the collection</span>
          <input
            className="field__input"
            type="search"
            value={query}
            placeholder="A grape, a producer, a place, a flavour…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="filter-row" role="group" aria-label="Filter by colour">
          {COLOURS.map((item) => {
            const count = entries.filter((e) => e.colour === item.key).length;
            if (count === 0) return null;
            return (
              <button
                key={item.key}
                type="button"
                className="atlas__chip"
                aria-pressed={colour === item.key}
                onClick={() => setParam('colour', colour === item.key ? null : item.key)}
              >
                {item.label} <span aria-hidden="true">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="filter-selects">
          <label className="field">
            <span className="field__label">Province</span>
            <select
              className="field__select"
              value={province ?? ''}
              onChange={(event) => setParam('province', event.target.value || null)}
            >
              <option value="">All provinces</option>
              {provinces.map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Producer</span>
            <select
              className="field__select"
              value={winery ?? ''}
              onChange={(event) => setParam('winery', event.target.value || null)}
            >
              <option value="">All ten</option>
              {wineries.map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Grape</span>
            <select
              className="field__select"
              value={grape ?? ''}
              onChange={(event) => setParam('grape', event.target.value || null)}
            >
              <option value="">Any grape</option>
              {grapes.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Availability</span>
            <select
              className="field__select"
              value={availability ?? ''}
              onChange={(event) => setParam('availability', event.target.value || null)}
            >
              <option value="">Any</option>
              {AVAILABILITY.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="collection__count" role="status">
          {results.length} of {entries.length} wines
          {activeFilters > 0 && (
            <>
              {' · '}
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => router.replace('/chapter/collection', { scroll: false })}
              >
                Clear filters
              </button>
            </>
          )}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="empty-state">
          <span className="empty-state__mark" aria-hidden="true">
            ⌀
          </span>
          Nothing here matches that. The collection holds {entries.length} verified wines — try a
          broader search, or clear the filters.
        </p>
      ) : (
        <ul className="collection__grid">
          {visibleResults.map((entry) => (
            <li key={entry.slug}>
              <Link className="bottle-link" href={`/wine/${entry.slug}`}>
                <Bottle
                  shape={entry.bottle}
                  colour={entry.colour}
                  producerInitials={entry.initials}
                  vintage={entry.vintageSort > 0 ? entry.vintageLabel : undefined}
                  height={150}
                />
                <span className="bottle-link__name">
                  <strong style={{ display: 'block', color: 'var(--bordeaux-deep)', fontWeight: 400 }}>
                    {entry.name}
                  </strong>
                  {entry.wineryName}
                </span>
                <span className="bottle-link__vintage">{entry.vintageLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {pageCount > 1 && <nav className="shelf-pagination" aria-label="Collection shelves">
        <button className="btn btn--quiet" type="button" disabled={currentShelf === 1} onClick={() => setShelf(currentShelf - 1)}>← Previous</button>
        <span role="status">Shelf {currentShelf} of {pageCount}</span>
        <button className="btn btn--quiet" type="button" disabled={currentShelf === pageCount} onClick={() => setShelf(currentShelf + 1)}>Next →</button>
      </nav>}
    </div>
  );
}

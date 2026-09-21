'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCellar } from '@/lib/cellar';

/**
 * What a reader can do with a bottle.
 *
 * Saving and shelving are always available — they are the reader's own notes.
 * Ordering appears only for a member, and even then the server decides whether
 * an order may complete. Nothing here pretends stock exists.
 */
export function WineActions({
  slug,
  name,
  contracted,
  trialMode,
}: {
  slug: string;
  name: string;
  contracted: boolean;
  /** True while no payment provider is configured. Lets a member walk the
   *  ordering flow end to end on a wine we are not yet contracted to supply —
   *  labelled as a rehearsal at every step, never as a purchase. */
  trialMode: boolean;
}) {
  const { isSaved, isLater, toggleSaved, toggleLater, setCartQuantity, cart, memberStatus, ready } =
    useCellar();
  const [justAdded, setJustAdded] = useState(false);

  if (!ready) {
    return (
      <div className="loading-lines" aria-label="Loading your cellar">
        <span style={{ width: '60%' }} />
      </div>
    );
  }

  const inCart = cart[slug] ?? 0;
  const isMember = memberStatus === 'trial' || memberStatus === 'active';

  return (
    <div className="wine-actions">
      <div className="wine-actions__row">
        <button
          type="button"
          className={isSaved(slug) ? 'btn btn--solid' : 'btn'}
          aria-pressed={isSaved(slug)}
          onClick={() => toggleSaved(slug)}
        >
          {isSaved(slug) ? 'Saved to your cellar' : 'Save to your cellar'}
        </button>
        <button
          type="button"
          className="btn btn--quiet"
          aria-pressed={isLater(slug)}
          onClick={() => toggleLater(slug)}
        >
          {isLater(slug) ? 'On your list for later' : 'For later'}
        </button>
      </div>

      {!contracted && (
        <p className="notice">
          <strong>Not yet available from North &amp; Vine.</strong> We have no supply agreement with
          this producer, so we cannot ship this wine. It is in the book because it is worth knowing
          about, not because it is in a warehouse.
        </p>
      )}

      {!isMember ? (
        <p className="notice">
          Ordering is what <Link className="booklink" href="/chapter/trust">Trust membership</Link>{' '}
          unlocks. A trial membership takes no payment details.
        </p>
      ) : (
        <div className="wine-actions__row">
          <button
            type="button"
            className="btn btn--solid"
            onClick={() => {
              setCartQuantity(slug, inCart + 1);
              setJustAdded(true);
            }}
          >
            {contracted ? 'Add a bottle to your order' : 'Add to the trial basket'}
          </button>
          {inCart > 0 && (
            <span style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
              {inCart} in your basket ·{' '}
              <Link className="booklink" href="/basket">
                view
              </Link>
            </span>
          )}
        </div>
      )}

      {justAdded && (
        <p className="notice notice--good" role="status">
          {name} added to the {trialMode ? 'trial ' : ''}basket.
          {trialMode
            ? ' This is a rehearsal of the ordering flow: nothing is reserved, nothing is charged, and nothing will ship.'
            : ''}
        </p>
      )}
    </div>
  );
}

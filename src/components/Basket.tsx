'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useCellar } from '@/lib/cellar';
import { placeOrder, type OrderResult } from '@/app/actions/orders';

export interface BasketWine {
  slug: string;
  name: string;
  wineryName: string;
  vintageLabel: string;
  contracted: boolean;
}

export function Basket({ catalogue }: { catalogue: Record<string, BasketWine> }) {
  const { cart, setCartQuantity, emptyCart, memberStatus, ready } = useCellar();
  const [result, formAction] = useActionState<OrderResult | null, FormData>(placeOrder, null);

  if (!ready) {
    return (
      <div className="loading-lines" aria-label="Loading your basket">
        <span style={{ width: '80%' }} />
        <span style={{ width: '60%' }} />
      </div>
    );
  }

  const lines = Object.entries(cart)
    .map(([slug, bottles]) => ({ wine: catalogue[slug], bottles, slug }))
    .filter((line) => line.wine);

  const bottles = lines.reduce((sum, line) => sum + line.bottles, 0);

  if (result?.ok) {
    return (
      <>
        <p className="notice notice--good" role="status">
          <strong>Trial order {result.reference}.</strong> {result.message}
        </p>
        <p className="prose" style={{ fontSize: 'var(--step--1)' }}>
          Trial orders are held in memory on the server and are not kept after a restart. That is
          deliberate: there is no order system to keep them in yet, and we would rather say so than
          imply one exists.
        </p>
        <button className="btn" type="button" onClick={emptyCart}>
          Empty the basket
        </button>
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <p className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">
          ⌀
        </span>
        Your basket is empty.{' '}
        <Link className="booklink" href="/chapter/collection">
          Look through the collection
        </Link>
        .
      </p>
    );
  }

  return (
    <>
      <ul className="basket">
        {lines.map((line) => (
          <li className="basket__line" key={line.slug}>
            <span className="basket__what">
              <Link className="booklink" href={`/wine/${line.slug}`}>
                {line.wine.name}
              </Link>
              <span className="basket__meta">
                {line.wine.wineryName} · {line.wine.vintageLabel}
              </span>
              {!line.wine.contracted && (
                <span className="tag tag--gap">Not contracted — trial only</span>
              )}
            </span>
            <span className="basket__qty">
              <label>
                <span className="visually-hidden">Bottles of {line.wine.name}</span>
                <input
                  className="field__input"
                  type="number"
                  min={0}
                  max={24}
                  value={line.bottles}
                  onChange={(event) => setCartQuantity(line.slug, Number(event.target.value))}
                />
              </label>
              <button
                type="button"
                className="btn btn--quiet"
                onClick={() => setCartQuantity(line.slug, 0)}
              >
                Remove
              </button>
            </span>
          </li>
        ))}
      </ul>

      <p className="collection__count">
        {bottles} bottle{bottles === 1 ? '' : 's'} · no price, because none has been set
      </p>

      {result && !result.ok && (
        <p className="notice notice--bad" role="alert">
          {result.message}
        </p>
      )}

      {memberStatus === 'none' || memberStatus === 'lapsed' ? (
        <p className="notice">
          Ordering is what Trust membership unlocks.{' '}
          <Link className="booklink" href="/chapter/trust">
            Start a trial membership
          </Link>{' '}
          — it takes no payment details.
        </p>
      ) : (
        <form action={formAction}>
          <input type="hidden" name="lines" value={JSON.stringify(cart)} />
          <p className="notice">
            <strong>This is a trial checkout.</strong> There is no payment step, because no price,
            terms or payment provider have been settled, and no supply agreements exist. Submitting
            records a trial order and nothing else.
          </p>
          <Submit />
        </form>
      )}
    </>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--solid" type="submit" disabled={pending}>
      {pending ? 'Recording…' : 'Place a trial order'}
    </button>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { Basket, type BasketWine } from '@/components/Basket';
import { WINES } from '@/data/wines';
import { WINERIES_BY_SLUG } from '@/data/wineries';
import { vintageLabel } from '@/components/WineShelf';
import { readSession } from '@/lib/session';
import { COMMERCE_MODE } from '@/config/business';

export const metadata: Metadata = {
  title: 'The Basket',
  description: 'A trial checkout: no payment, no shipment, and an explanation of why.',
};

export default async function BasketPage() {
  const session = await readSession();

  const catalogue: Record<string, BasketWine> = Object.fromEntries(
    WINES.map((wine) => [
      wine.slug,
      {
        slug: wine.slug,
        name: wine.name,
        wineryName: WINERIES_BY_SLUG[wine.winerySlug]?.name ?? 'Unknown producer',
        vintageLabel: vintageLabel(wine.vintage),
        contracted: wine.availability.northAndVine === 'orderable',
      },
    ]),
  );

  return (
    <Spread
      leftHead="The Basket"
      rightHead="What happens when you order"
      leftPage={178}
      rightPage={179}
      left={
        <>
          <p className="chapter-number">Trial mode</p>
          <h1 className="chapter-title">Your basket</h1>
          <p className="chapter-standfirst">
            Nothing here is charged, reserved, or shipped — and the page says so at every step
            rather than at the end.
          </p>
          <Basket catalogue={catalogue} />
        </>
      }
      right={
        <>
          <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
            Why there is no price
          </h2>
          <div className="prose" style={{ fontSize: 'var(--step--1)' }}>
            <p>
              Three things have to be true before North &amp; Vine can take money, and none of them
              is true yet.
            </p>
            <p>
              <strong>Terms.</strong> The membership fee, what it includes, and the cancellation
              terms are not settled. We will not invent them to make a page look finished.
            </p>
            <p>
              <strong>Supply.</strong> No producer in this book has a supply agreement with us. A
              wine being on a winery&rsquo;s list is not stock in our warehouse.
            </p>
            <p>
              <strong>Licensing and payment.</strong> Shipping wine between Canadian provinces is
              regulated province by province, and we have not settled which we can serve. No payment
              provider is configured.
            </p>
          </div>

          <h3 className="section-title">How the gate actually works</h3>
          <div className="prose" style={{ fontSize: 'var(--step--1)' }}>
            <p>
              Membership is a signed, HTTP-only cookie, verified on the server on every order.
              Hiding the order button is a courtesy for the reader; the check that stops an order
              is in <code>src/lib/session.ts</code> and <code>src/server/actions/orders.ts</code>, and
              runs whatever the browser sends.
            </p>
            <p>
              The current mode is <code>{COMMERCE_MODE}</code>, and your session reads{' '}
              <code>{session.status}</code>. Switching to live requires every membership term in{' '}
              <code>src/config/business.ts</code> to be confirmed, and a payment provider to exist.
              The code refuses to go live otherwise — that is a guard, not a comment.
            </p>
          </div>

          <p className="marginal">
            Reading rather than buying?{' '}
            <Link className="booklink" href="/chapter/collection">
              The collection
            </Link>{' '}
            and{' '}
            <Link className="booklink" href="/cellar">
              your cellar
            </Link>{' '}
            work without any of this.
          </p>
        </>
      }
    />
  );
}

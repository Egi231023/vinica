import { WinePassport } from '@/components/WinePassport';
import { WINERIES } from '@/data/wineries';
import { BookArtwork } from '@/components/BookArtwork';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { CellarShelves, type CellarWine } from '@/components/CellarShelves';
import { TrustJoin } from '@/components/TrustJoin';
import { WINES } from '@/data/wines';
import { WINERIES_BY_SLUG } from '@/data/wineries';
import { initialsFor } from '@/components/Bottle';
import { vintageLabel } from '@/components/WineShelf';
import { readSession } from '@/lib/session';
import { ordersFor } from '@/lib/orders';

export const metadata: Metadata = {
  title: 'Your Cellar',
  description: 'Saved bottles, your list for later, your own tasting notes, and your membership.',
};

export default async function CellarPage() {
  const session = await readSession();
  const orders = ordersFor(session);

  const catalogue: Record<string, CellarWine> = Object.fromEntries(
    WINES.map((wine) => [
      wine.slug,
      {
        slug: wine.slug,
        name: wine.name,
        wineryName: WINERIES_BY_SLUG[wine.winerySlug]?.name ?? 'Unknown producer',
        vintageLabel: vintageLabel(wine.vintage),
        vintageNumeric: typeof wine.vintage === 'number' ? String(wine.vintage) : undefined,
        contracted: wine.availability.northAndVine === 'orderable',
        colour: wine.colour,
        photo: wine.photo,
        bottle: wine.bottle,
        initials: initialsFor(WINERIES_BY_SLUG[wine.winerySlug]?.name ?? wine.name),
      },
    ]),
  );

  return (
    <Spread
      leftHead="Chapter VI · Your Cellar"
      rightHead="Your personal wine passport"
      leftPage={161}
      rightPage={162}
      left={
        <>
          <p className="chapter-number">Chapter VI</p>
          <h1 className="chapter-title">Your Cellar</h1>
          <p className="chapter-standfirst">
            What you keep: the bottles you liked, the ones you meant to try, and what you thought
            of them.
          </p>
          <BookArtwork name="cellar-study" />
          <CellarShelves catalogue={catalogue} />
        </>
      }
      right={
        <>
          <WinePassport estates={WINERIES.map(w => ({ slug: w.slug, name: w.shortName, province: w.region.province, ink: w.accent.ink }))} />
          <details className="editorial-details"><summary>Membership, orders and storage</summary>
          <h3 className="section-title">Where this is kept</h3>
          <p className="gap-note">
            Your saved bottles and tasting notes stay in this browser. They do not sync to another
            device, and clearing browser data removes them.
          </p>

          <BookArtwork name="trust-passport" compact />
          <h3 className="section-title">Membership</h3>
          <TrustJoin status={session.status} />

          <h3 className="section-title">Order history</h3>
          {orders.length === 0 ? (
            <p className="empty-state">
              <span className="empty-state__mark" aria-hidden="true">
                ⌀
              </span>
              No orders yet. A{' '}
              <Link className="booklink" href="/basket">
                trial order
              </Link>{' '}
              will show here — clearly marked as a trial.
            </p>
          ) : (
            <ul className="note-list">
              {orders.map((order) => (
                <li key={order.reference}>
                  <p className="note-list__meta">
                    {order.reference} · {new Date(order.placedAt).toLocaleString('en-CA')} ·{' '}
                    <span className="tag tag--gap">Trial</span>
                  </p>
                  <ul className="plain-list" style={{ marginBottom: 0 }}>
                    {order.lines.map((line) => (
                      <li key={line.wineSlug}>
                        {line.bottles} × {line.wineName} — {line.wineryName}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
          <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
            Trial orders are held in memory on the server and do not survive a restart. Nothing was
            charged and nothing will ship.
          </p>
          </details>
        </>
      }
    />
  );
}

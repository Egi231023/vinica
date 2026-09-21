import { BookArtwork } from '@/components/BookArtwork';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { MEMBERSHIP, TRUST_PILLARS, COMMERCE_MODE } from '@/config/business';
import { readSession } from '@/lib/session';
import { TrustJoin } from '@/components/TrustJoin';

export const metadata: Metadata = {
  title: 'Trust Membership',
  description:
    'What a Trust membership does, what it costs — and what has not been decided yet. No invented prices, no invented benefits.',
};

export default async function TrustChapter() {
  const session = await readSession();

  return (
    <Spread
      leftHead="Chapter II · Trust Membership"
      rightHead="Your invitation"
      leftPage={17}
      rightPage={18}
      left={<WhatTrustIs />}
      right={<Terms status={session.status} />}
    />
  );
}

function WhatTrustIs() {
  return (
    <>
      <p className="chapter-number">Chapter II</p>
      <h1 className="chapter-title">Trust</h1>
      <p className="chapter-standfirst">A wider choice. A more personal way to discover.</p>

      <BookArtwork name="trust-passport" />

      <div className="prose">
        <p className="dropcap">
          Trust is our planned membership for exploring wine across selected Canadian producers.
          The idea is simple: one relationship, a broader selection, and thoughtful help choosing
          what belongs on your table. We care as much about the service as the bottle.
        </p>
      </div>

      <div className="pillars">
        {TRUST_PILLARS.map((pillar) => (
          <section className="pillar" key={pillar.key}>
            <h3 className="pillar__title">{pillar.title}</h3>
            <p className="pillar__body">{pillar.body}</p>
          </section>
        ))}
      </div>


    </>
  );
}

function Terms({ status }: { status: string }) {
  const terms: { label: string; value: string | null; note: string }[] = [
    { label: 'Membership fee', value: MEMBERSHIP.priceCad?.value != null ? `CA$${MEMBERSHIP.priceCad.value}` : null, note: 'In Canadian dollars, excluding tax.' },
    { label: 'Billed', value: MEMBERSHIP.billingPeriod?.value ?? null, note: 'Monthly or annually.' },
    { label: 'Bottles included', value: MEMBERSHIP.bottlesIncluded?.value != null ? String(MEMBERSHIP.bottlesIncluded.value) : null, note: 'Whether the fee includes wine at all is undecided.' },
    { label: 'Shipping', value: MEMBERSHIP.shippingIncluded?.value === true ? 'Included' : MEMBERSHIP.shippingIncluded?.value === false ? 'Charged separately' : null, note: 'Depends on which provinces we are licensed to ship to.' },
    { label: 'Member pricing', value: MEMBERSHIP.memberDiscount?.value != null ? `${Math.round(MEMBERSHIP.memberDiscount.value * 100)}% off list` : null, note: 'A flat discount and per-wine pricing are both still on the table.' },
    { label: 'Minimum term', value: MEMBERSHIP.minimumTerm?.value != null ? String(MEMBERSHIP.minimumTerm.value) : null, note: 'In billing periods.' },
    { label: 'Cancellation', value: MEMBERSHIP.cancellation?.value ?? null, note: 'In plain language, on this page, before you pay.' },
  ];

  return (
    <>
      <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
        Your invitation
      </h2>
      <p className="chapter-standfirst">
        Explore the book now. Pricing, bottle allowances and delivery terms will be confirmed before paid membership opens.
      </p>

      <details className="editorial-details"><summary>Membership terms in preparation</summary>
      <dl className="ledger">
        {terms.map((term) => (
          <div key={term.label}>
            <dt>{term.label}</dt>
            <dd>
              {term.value ? (
                term.value
              ) : (
                <>
                  <span className="tag tag--gap">Not yet set</span>{' '}
                  <span style={{ color: 'var(--ink-faint)' }}>{term.note}</span>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl></details>

      <BookArtwork name="sparkling-study" compact />
      <p className="prose">Start with a place that intrigues you. Save a bottle. Leave a tasting note.
        Your own discoveries are the beginning of your cellar.</p>
      <hr className="rule-ornament" />

      <h3 className="section-title">
        {COMMERCE_MODE === 'trial' ? 'Trial membership' : 'Membership'}
      </h3>
      <TrustJoin status={status} />

      <p className="marginal">Explore <Link className="booklink" href="/chapter/collection">the collection</Link> or return to <Link className="booklink" href="/cellar">your cellar</Link>.</p>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { MEMBERSHIP, TRUST_PILLARS, OPEN_BUSINESS_QUESTIONS, COMMERCE_MODE } from '@/config/business';
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
      rightHead="Terms, and what is not settled"
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
      <p className="chapter-standfirst">One membership. Ten cellars. A person who knows yours.</p>

      <div className="prose">
        <p className="dropcap">
          Trust is a paid membership, and it is the thing that lets you buy. That is the whole
          model: the membership is the relationship, and the wine follows from it. You are not
          buying access to a discount table. You are buying a way of being looked after across ten
          producers instead of one.
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

      <hr className="rule-ornament" />

      <div className="prose">
        <p>
          Those four are commitments about how the service behaves, and they hold whatever the
          price turns out to be. You will notice there is no number on this page, and no claim
          about saving money. That is deliberate: see the facing page.
        </p>
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
        What we have not decided
      </h2>
      <p className="chapter-standfirst">
        An empty line below is an honest empty line, not a placeholder for marketing.
      </p>

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
      </dl>

      <p className="gap-note">
        <strong>On the comparison you may have heard:</strong> the idea behind North &amp; Vine
        started from a frustration — paying a set sum for three bottles from a single estate, when
        what you wanted was choice. That is the motivation, not a verified price comparison, and we
        will not publish it as one or promise to beat anyone&rsquo;s price. Confirmed prices, when
        they exist, will be in Canadian dollars.
      </p>

      <h3 className="section-title">Still open on our side</h3>
      <ul className="plain-list">
        {OPEN_BUSINESS_QUESTIONS.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>

      <hr className="rule-ornament" />

      <h3 className="section-title">
        {COMMERCE_MODE === 'trial' ? 'Trial membership' : 'Membership'}
      </h3>
      <TrustJoin status={status} />

      <p className="marginal">
        Membership is checked on the server, not in the browser. Hiding a button is a courtesy;
        the gate that actually stops an order lives in{' '}
        <code>src/lib/session.ts</code>. You can read how the trial order works in{' '}
        <Link className="booklink" href="/basket">
          the basket
        </Link>
        .
      </p>
    </>
  );
}

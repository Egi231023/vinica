/**
 * Commercial parameters — the single place where money, membership terms and
 * fulfilment live.
 *
 * Everything here is `null` until the business confirms it. The UI is built to
 * render an honest "not yet confirmed" state for every null, so nothing in the
 * design depends on a number we invented. Fill these in and the pages that use
 * them switch from placeholder to real copy with no redesign.
 */

export type Confirmed<T> = { value: T; confirmedOn: string } | null;

export interface MembershipTerms {
  /** Trust membership fee, in CAD, excluding tax. */
  priceCad: Confirmed<number>;
  /** 'monthly' | 'annual' — the billing period the fee buys. */
  billingPeriod: Confirmed<'monthly' | 'annual'>;
  /** Bottles included in the fee, if any. Undecided at time of writing. */
  bottlesIncluded: Confirmed<number>;
  /** Whether shipping is included. Undecided. */
  shippingIncluded: Confirmed<boolean>;
  /** Member discount off list price, as a fraction (0.1 = 10%). Undecided. */
  memberDiscount: Confirmed<number>;
  /** Minimum commitment in billing periods. */
  minimumTerm: Confirmed<number>;
  /** Cancellation terms, in plain language. */
  cancellation: Confirmed<string>;
}

export const MEMBERSHIP: MembershipTerms = {
  priceCad: null,
  billingPeriod: null,
  bottlesIncluded: null,
  shippingIncluded: null,
  memberDiscount: null,
  minimumTerm: null,
  cancellation: null,
};

/**
 * What a Trust membership does, structurally, independent of price.
 * These are design commitments, not marketing promises, and they are the only
 * membership claims the site is allowed to make today.
 */
export const TRUST_PILLARS = [
  {
    key: 'access',
    title: 'One membership, ten cellars',
    body:
      'Trust is the key that opens buying across every producer in the book. You are not tied to one estate’s list, and you do not manage ten separate accounts.',
  },
  {
    key: 'care',
    title: 'A person, not a queue',
    body:
      'Membership includes someone who knows the book and knows your cellar, and who will tell you when a wine is not right for you.',
  },
  {
    key: 'provenance',
    title: 'Sourced, or said to be missing',
    body:
      'Every fact in this book carries a source and the date we checked it. Where we do not know something, the page says so instead of guessing.',
  },
  {
    key: 'cellar',
    title: 'A cellar that remembers',
    body:
      'Your saved wines, tasting notes and order history stay with you, and the book reopens where you left it.',
  },
] as const;

/**
 * Operating mode.
 *
 * 'trial' — no payment provider is configured and no money moves. Checkout runs
 *           end to end against a recorded trial order and says so at every step.
 * 'live'  — requires MEMBERSHIP terms to be confirmed and a payment provider
 *           wired into src/lib/payments.ts. Guarded in code, not just in copy.
 */
export const COMMERCE_MODE: 'trial' | 'live' = 'trial';

/** Every term above must be confirmed before `live` is permitted. */
export function membershipTermsAreComplete(terms: MembershipTerms = MEMBERSHIP): boolean {
  return Object.values(terms).every((t) => t !== null);
}

export function commerceIsLive(): boolean {
  return COMMERCE_MODE === 'live' && membershipTermsAreComplete();
}

/** Provinces North & Vine can ship to. Interprovincial wine shipping in Canada
 *  is regulated per province; this list stays empty until licensing is settled. */
export const SHIPPING_PROVINCES: Confirmed<ProvinceList> = null;
type ProvinceList = string[];

/** Legal drinking age varies by province (18 in AB/MB/QC, 19 elsewhere). */
export const AGE_GATE = {
  enabled: true,
  minimumAgeByProvince: { AB: 18, MB: 18, QC: 18 } as Record<string, number>,
  defaultMinimumAge: 19,
};

/** Open commercial questions, surfaced in the UI and in docs/OPEN-QUESTIONS.md. */
export const OPEN_BUSINESS_QUESTIONS = [
  'Trust membership fee and billing period (CAD).',
  'Whether the fee includes bottles, and how many.',
  'Whether shipping is included, and to which provinces.',
  'Member pricing: fixed discount, or per-wine negotiated pricing.',
  'Minimum term and cancellation terms.',
  'Which of the ten producers have signed supply agreements.',
  'Licensing route for interprovincial shipping, and the provinces it covers.',
  'Payment provider and tax handling (GST/HST/PST by province).',
] as const;

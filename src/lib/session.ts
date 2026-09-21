import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';
import { COMMERCE_MODE, commerceIsLive } from '@/config/business';
import { IS_STATIC_PREVIEW } from './runtime';

/**
 * Membership state lives on the server.
 *
 * The rule this file exists to enforce: whether someone may buy wine is decided
 * here, from a signed cookie, and never from anything the browser can set. The
 * UI hides buttons as a courtesy; this is what actually stops an order.
 */

const COOKIE = 'nv_member';
const MAX_AGE = 60 * 60 * 24 * 30;

/**
 * In a deployment this must be a real secret. Locally we fall back to a fixed
 * development key so the flow works out of the box — and say so loudly if
 * anyone tries to run live commerce without setting it.
 */
function secret(): string {
  const value = process.env.NV_SESSION_SECRET;
  if (value && value.length >= 16) return value;
  if (commerceIsLive()) {
    throw new Error(
      'NV_SESSION_SECRET must be set to at least 16 characters before COMMERCE_MODE may be "live".',
    );
  }
  return 'north-and-vine-development-key-not-for-production';
}

export interface MemberSession {
  id: string;
  /** Membership state as the server understands it. */
  status: 'none' | 'trial' | 'active' | 'lapsed';
  /** ISO date the trial membership was started. */
  since?: string;
  email?: string;
}

const EMPTY: MemberSession = { id: 'anonymous', status: 'none' };

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function encode(session: MemberSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function decode(raw: string | undefined): MemberSession {
  if (!raw) return EMPTY;
  const dot = raw.lastIndexOf('.');
  if (dot <= 0) return EMPTY;
  const payload = raw.slice(0, dot);
  const given = raw.slice(dot + 1);
  const expected = sign(payload);
  // Constant-time compare; a length mismatch is already a failure.
  if (given.length !== expected.length) return EMPTY;
  if (!timingSafeEqual(Buffer.from(given), Buffer.from(expected))) return EMPTY;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as MemberSession;
    if (!parsed || typeof parsed.status !== 'string') return EMPTY;
    return parsed;
  } catch {
    return EMPTY;
  }
}

export async function readSession(): Promise<MemberSession> {
  /* The static reading preview has no request and no cookie jar. Reading one
     would also force every page to render on demand, which a static export
     cannot do. Nobody is a member there, and the pages say so. */
  if (IS_STATIC_PREVIEW) return EMPTY;
  const jar = await cookies();
  return decode(jar.get(COOKIE)?.value);
}

export async function writeSession(session: MemberSession): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, encode(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function startTrialMembership(email?: string): MemberSession {
  return {
    id: randomUUID(),
    status: 'trial',
    since: new Date().toISOString().slice(0, 10),
    email,
  };
}

/**
 * The single gate. Returns why an order may not proceed, or null if it may.
 *
 * In trial mode no order may ever complete as a real purchase — the caller is
 * responsible for recording it as a trial order and saying so to the customer.
 */
export function orderBlockedReason(session: MemberSession): string | null {
  if (!commerceIsLive()) {
    return COMMERCE_MODE === 'live'
      ? 'Commerce is configured as live but the membership terms are not confirmed. No order can be taken.'
      : 'North & Vine is in trial mode. No payment is taken and no wine is shipped.';
  }
  if (session.status !== 'active') {
    return 'An active Trust membership is required to order.';
  }
  return null;
}

/** Whether the buy affordances should be shown at all. */
export function canSeeOrdering(session: MemberSession): boolean {
  return session.status === 'trial' || session.status === 'active';
}

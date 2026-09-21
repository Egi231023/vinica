import { randomUUID } from 'node:crypto';
import type { MemberSession } from './session';

/**
 * Trial orders.
 *
 * These are recorded so the checkout has a real server-side outcome rather than
 * a congratulatory screen. The store is in-process and therefore does not
 * survive a restart — which is correct for a trial, and stated plainly to the
 * customer rather than hidden. A real implementation replaces this module with
 * a database and a payment provider; nothing else needs to change.
 */

export interface TrialOrderLine {
  wineSlug: string;
  wineName: string;
  wineryName: string;
  bottles: number;
}

export interface TrialOrder {
  reference: string;
  placedAt: string;
  memberId: string;
  lines: TrialOrderLine[];
  /** Always true in this build. There is no code path that charges anyone. */
  trial: true;
}

/**
 * Anchored on globalThis deliberately.
 *
 * Server Actions and page renders are bundled into separate module graphs, so a
 * plain module-level Map gives each of them its own copy and an order recorded
 * by the action is invisible to the page that lists it. It also survives a hot
 * reload in development. A database makes this disappear.
 */
const STORE = Symbol.for('north-and-vine.trial-orders');
type Store = { orders: Map<string, TrialOrder[]> };
const globalStore = globalThis as unknown as Record<symbol, Store | undefined>;
globalStore[STORE] ??= { orders: new Map<string, TrialOrder[]>() };
const ORDERS = globalStore[STORE]!.orders;

export function recordTrialOrder(session: MemberSession, lines: TrialOrderLine[]): TrialOrder {
  const order: TrialOrder = {
    reference: `NV-TRIAL-${randomUUID().slice(0, 8).toUpperCase()}`,
    placedAt: new Date().toISOString(),
    memberId: session.id,
    lines,
    trial: true,
  };
  ORDERS.set(session.id, [order, ...(ORDERS.get(session.id) ?? [])]);
  return order;
}

export function ordersFor(session: MemberSession): TrialOrder[] {
  return ORDERS.get(session.id) ?? [];
}

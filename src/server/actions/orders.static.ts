/**
 * Stand-in for the ordering Server Action in the static reading preview.
 * See `membership.static.ts`.
 */
import { STATIC_PREVIEW_NOTE } from '@/lib/runtime';

export interface OrderResult {
  ok: boolean;
  message: string;
  reference?: string;
  trial?: boolean;
}

export async function placeOrder(): Promise<OrderResult> {
  return { ok: false, message: STATIC_PREVIEW_NOTE };
}

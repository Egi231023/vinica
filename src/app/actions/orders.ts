'use server';

import { readSession, orderBlockedReason } from '@/lib/session';
import { recordTrialOrder, type TrialOrderLine } from '@/lib/orders';
import { getWine } from '@/data/wines';
import { WINERIES_BY_SLUG } from '@/data/wineries';
import { commerceIsLive } from '@/config/business';

export interface OrderResult {
  ok: boolean;
  message: string;
  reference?: string;
  trial?: boolean;
}

/**
 * Placing an order.
 *
 * Every rule that matters is checked here, on the server: membership, whether
 * commerce is live at all, and whether we are actually contracted to supply
 * each wine. The browser can send anything it likes; it cannot get past this.
 */
export async function placeOrder(_previous: OrderResult | null, formData: FormData): Promise<OrderResult> {
  const session = await readSession();

  const blocked = orderBlockedReason(session);
  const isTrial = !commerceIsLive();

  /* A live deployment with an unmet condition stops here. In trial mode the
     block is not an error — it is the point — so we carry on and record a
     trial order instead. */
  if (blocked && !isTrial) {
    return { ok: false, message: blocked };
  }
  if (isTrial && session.status !== 'trial' && session.status !== 'active') {
    return {
      ok: false,
      message: 'Start a trial membership first — ordering is what membership unlocks.',
    };
  }

  const raw = formData.get('lines');
  let parsed: Record<string, number>;
  try {
    parsed = JSON.parse(typeof raw === 'string' ? raw : '{}');
  } catch {
    return { ok: false, message: 'We could not read that basket. Please try again.' };
  }

  const lines: TrialOrderLine[] = [];
  for (const [slug, bottles] of Object.entries(parsed)) {
    const wine = getWine(slug);
    if (!wine) return { ok: false, message: `We no longer list one of these wines (${slug}).` };
    if (!Number.isInteger(bottles) || bottles < 1 || bottles > 24) {
      return { ok: false, message: 'Bottle quantities must be between 1 and 24.' };
    }
    /* The supply check. In trial mode nothing is contracted, and the trial
       order is explicit that nothing will ship. */
    if (!isTrial && wine.availability.northAndVine !== 'orderable') {
      return { ok: false, message: `${wine.name} is not available from North & Vine.` };
    }
    lines.push({
      wineSlug: slug,
      wineName: wine.name,
      wineryName: WINERIES_BY_SLUG[wine.winerySlug]?.name ?? 'Unknown producer',
      bottles,
    });
  }

  if (lines.length === 0) {
    return { ok: false, message: 'Your basket is empty.' };
  }

  const order = recordTrialOrder(session, lines);

  return {
    ok: true,
    trial: true,
    reference: order.reference,
    message:
      'Recorded as a trial order. No payment was taken, no payment details were asked for, and no wine will be shipped. This is what the flow will look like once terms and supply are settled.',
  };
}

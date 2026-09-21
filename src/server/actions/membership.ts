'use server';

import { revalidatePath } from 'next/cache';
import {
  clearSession,
  readSession,
  startTrialMembership,
  writeSession,
} from '@/lib/session';
import { commerceIsLive } from '@/config/business';

export interface ActionResult {
  ok: boolean;
  message: string;
}

/**
 * Starts a trial membership.
 *
 * This deliberately does not take payment, does not promise a price, and does
 * not grant anything that costs us money. It exists so the membership gate can
 * be exercised end to end — and so the gate itself is real server state rather
 * than a hidden button.
 */
export async function startTrial(_previous: ActionResult | null, formData: FormData): Promise<ActionResult> {
  if (commerceIsLive()) {
    return {
      ok: false,
      message:
        'Live commerce is enabled; trial memberships are disabled. Membership must be purchased.',
    };
  }

  const rawEmail = formData.get('email');
  const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, message: 'That does not look like an email address. Leave it blank to skip.' };
  }

  const confirmedAge = formData.get('age') === 'on';
  if (!confirmedAge) {
    return { ok: false, message: 'Please confirm you are of legal drinking age in your province.' };
  }

  await writeSession(startTrialMembership(email || undefined));
  revalidatePath('/', 'layout');
  return {
    ok: true,
    message:
      'Trial membership started. Nothing has been charged and no payment details were taken. You can end it at any time.',
  };
}

export async function endTrial(): Promise<void> {
  await clearSession();
  revalidatePath('/', 'layout');
}

export async function currentStatus() {
  const session = await readSession();
  return session.status;
}

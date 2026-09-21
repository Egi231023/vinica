/**
 * Stand-ins for the membership Server Actions, used only in the static reading
 * preview. `next.config.ts` aliases the real module to this one when
 * NV_STATIC_PREVIEW is set, so no Server Action exists in that build's graph.
 *
 * They deliberately do nothing and say why, rather than simulating a
 * membership the preview could not honour.
 */
import { STATIC_PREVIEW_NOTE } from '@/lib/runtime';

export interface ActionResult {
  ok: boolean;
  message: string;
}

export async function startTrial(): Promise<ActionResult> {
  return { ok: false, message: STATIC_PREVIEW_NOTE };
}

export async function endTrial(): Promise<void> {
  /* nothing to end: no session can exist in this build */
}

export async function currentStatus(): Promise<'none'> {
  return 'none';
}

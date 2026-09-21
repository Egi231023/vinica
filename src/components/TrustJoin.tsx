'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { startTrial, endTrial, type ActionResult } from '@/server/actions/membership';
import { IS_STATIC_PREVIEW, STATIC_PREVIEW_NOTE } from '@/lib/runtime';

/**
 * Joining, in trial mode.
 *
 * No card field, no price, no promise. The form exists so the membership gate
 * can be exercised honestly: you can hold a membership, see what it unlocks,
 * and give it up again.
 */
export function TrustJoin({ status }: { status: string }) {
  const [result, formAction] = useActionState<ActionResult | null, FormData>(startTrial, null);

  if (IS_STATIC_PREVIEW) {
    return (
      <p className="notice">
        <strong>Membership is switched off here.</strong> {STATIC_PREVIEW_NOTE}
      </p>
    );
  }

  if (status === 'trial' || status === 'active') {
    return (
      <>
        <p className="notice notice--good">
          {status === 'trial'
            ? 'You are holding a trial membership. Ordering is unlocked in trial mode: nothing is charged, nothing ships.'
            : 'Your Trust membership is active.'}
        </p>
        <form action={endTrial}>
          <button className="btn btn--quiet" type="submit">
            End trial membership
          </button>
        </form>
      </>
    );
  }

  return (
    <form action={formAction}>
      <p className="notice">
        Trial membership takes no payment details and costs nothing. It exists so you can see how
        the service behaves before its terms are set.
      </p>

      <label className="field">
        <span className="field__label">Email — optional</span>
        <input
          className="field__input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>

      <label className="checkbox">
        <input type="checkbox" name="age" />
        <span>
          I am of legal drinking age in my province — 19, or 18 in Alberta, Manitoba and Québec.
        </span>
      </label>

      {result && (
        <p className={`notice ${result.ok ? 'notice--good' : 'notice--bad'}`} role="status">
          {result.message}
        </p>
      )}

      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn--solid" type="submit" disabled={pending}>
      {pending ? 'One moment…' : 'Start a trial membership'}
    </button>
  );
}

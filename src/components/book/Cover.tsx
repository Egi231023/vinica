'use client';

import { useEffect, useState } from 'react';

/**
 * The cover, and the book opening itself.
 *
 * Rules the brief sets, and this component keeps:
 *  - short, and skippable at any moment;
 *  - never shown twice in a session, so a reader coming back is not made to wait;
 *  - fully bypassed when the reader has asked for reduced motion.
 */
const SEEN_KEY = 'nv.cover.seen';

export function Cover() {
  const [state, setState] = useState<'pending' | 'playing' | 'skipped' | 'done'>('pending');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      // Private browsing, or storage blocked. Play it; no harm done.
    }
    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seen || reduced) {
      setState('done');
      return;
    }
    setState('playing');
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* not essential */
    }
    const timer = setTimeout(() => setState('done'), 2150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state !== 'playing') return;
    const skip = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') setState('skipped');
    };
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [state]);

  useEffect(() => {
    if (state !== 'skipped') return;
    const timer = setTimeout(() => setState('done'), 260);
    return () => clearTimeout(timer);
  }, [state]);

  if (state === 'pending' || state === 'done') return null;

  return (
    <div
      className="cover-stage"
      data-skipped={state === 'skipped'}
      role="presentation"
      onClick={() => setState('skipped')}
    >
      <div className="cover">
        <div className="cover__plate">
          <p className="cover__mark">
            North
            <span className="cover__amp">&amp;</span>
            Vine
          </p>
          <p className="cover__sub">Ten Canadian estates</p>
        </div>
      </div>
      <button
        type="button"
        className="cover__skip"
        onClick={(event) => {
          event.stopPropagation();
          setState('skipped');
        }}
      >
        Open the book
      </button>
    </div>
  );
}

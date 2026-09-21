'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const SEEN_KEY = 'nv.cover.seen';

export function Cover() {
  const pathname = usePathname();
  const [state, setState] = useState<'checking' | 'playing' | 'done'>('checking');
  const skipButton = useRef<HTMLButtonElement>(null);
  const visible = pathname === '/' && state !== 'done';

  useEffect(() => {
    if (pathname !== '/') { setState('done'); return; }
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '2'; } catch { /* optional storage */ }
    if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('done');
      return;
    }
    try { sessionStorage.setItem(SEEN_KEY, '2'); } catch { /* optional storage */ }
    setState('playing');
    // A fallback only: the fade's animationend normally completes the opening.
    const timer = setTimeout(() => setState('done'), 2900);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;
    const content = document.getElementById('site-content');
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    if (content) content.inert = true;
    document.body.style.overflow = 'hidden';
    skipButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setState('done'); }
      if (event.key === 'Tab') { event.preventDefault(); skipButton.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      if (content) content.inert = false;
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [visible]);

  if (!visible) return null;
  return <>
    <noscript><style>{'.cover-stage{display:none!important}'}</style></noscript>
    <div className="cover-stage" data-state={state} role="dialog" aria-modal="true" aria-label="Opening North and Vine"
      onAnimationEnd={event => {
        if (event.target === event.currentTarget && event.animationName === 'opening-reveal') setState('done');
      }}>
      <div className="opening-book" aria-hidden="true">
        <div className="opening-paper opening-paper--left"><span>North &amp; Vine</span><p>For the love<br /><em>of wine.</em></p><small>The first edition</small></div>
        <div className="opening-paper opening-paper--right"><span>A Canadian wine book</span><p>Good wine.<br /><em>A wider world.</em></p><small>Ten wineries. One curious spirit.</small></div>
        <div className="opening-leaf">
          <div className="opening-front"><div className="opening-plate"><span className="opening-ornament">❧</span><p>North<br /><em>&amp;</em><br />Vine</p><small>Ten Canadian estates</small></div></div>
          <div className="opening-back"><span>North &amp; Vine</span><p>For the love<br /><em>of wine.</em></p><small>The first edition</small></div>
        </div>
      </div>
      <button ref={skipButton} type="button" className="cover__skip" onClick={() => setState('done')}>Skip opening →</button>
    </div>
  </>;
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { readingOrder } from '@/data/chapters';

/**
 * The book as an object you can handle.
 *
 * Four ways through it, all mapped to the same two moves:
 *   - the labelled previous / next controls,
 *   - arrow keys and Page Up/Down,
 *   - a swipe on touch devices,
 *   - and the table of contents, which is a real index, not a decoration.
 *
 * Navigation is ordinary routing underneath, so every page has its own URL, the
 * browser's Back button works, and a reload lands where the reader was.
 */

const SPINE = readingOrder();

function neighbours(pathname: string) {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  const index = SPINE.findIndex((entry) => entry.href === cleanPath);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? SPINE[index - 1] : null,
    next: index < SPINE.length - 1 ? SPINE[index + 1] : null,
  };
}

const LAST_PAGE_KEY = 'nv.book.lastPage';

export function BookStage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [turning, setTurning] = useState<'forward' | 'back' | null>(null);
  const previousPath = useRef(pathname);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const { prev, next } = neighbours(pathname);

  /* Remember where the reader stopped, so the book can offer to reopen there. */
  useEffect(() => {
    if (pathname === '/') return;
    try {
      localStorage.setItem(LAST_PAGE_KEY, pathname);
    } catch {
      /* storage may be unavailable; the book simply will not remember */
    }
  }, [pathname]);

  /* Play the turn when the route actually changes, in the direction travelled. */
  useEffect(() => {
    if (previousPath.current === pathname) return;
    const from = SPINE.findIndex((e) => e.href === previousPath.current);
    const to = SPINE.findIndex((e) => e.href === pathname);
    previousPath.current = pathname;

    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || from < 0 || to < 0) return;

    setTurning(to > from ? 'forward' : 'back');
    const timer = setTimeout(() => setTurning(null), 640);
    return () => clearTimeout(timer);
  }, [pathname]);

  const go = useCallback(
    (href: string | null | undefined) => {
      if (!href) return;
      router.push(href);
    },
    [router],
  );

  /* Keys, but never while someone is typing. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (document.querySelector('dialog[open], .cover-stage')) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'SUMMARY', 'LABEL'].includes(target.tagName))
      ) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        if (next) {
          event.preventDefault();
          go(next.href);
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        if (prev) {
          event.preventDefault();
          go(prev.href);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, next, prev]);

  const onTouchStart = (event: React.TouchEvent) => {
    if (document.querySelector('dialog[open], .cover-stage') || (event.target as HTMLElement).closest('button, input, select, textarea, a, summary')) { touchStart.current = null; return; }
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    /* A page turn is horizontal and decisive; anything else is a scroll. */
    if (Math.abs(dx) < 64 || Math.abs(dx) < Math.abs(dy) * 1.8) return;
    go(dx < 0 ? next?.href : prev?.href);
  };

  return (
    <div
      className="book"
      data-turning={turning ?? undefined}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}

      {(prev || next) && <nav className="book-pager" aria-label="Page navigation">
        {prev ? <button type="button" onClick={() => go(prev.href)}>← <span>Previous page<small>{prev.label}</small></span></button> : <span />}
        {next && <button type="button" onClick={() => go(next.href)}><span>Next page<small>{next.label}</small></span> →</button>}
      </nav>}

      {turning && (
        <div
          className={`turning-leaf turning-leaf--${turning} paper-surface`}
          aria-hidden="true"
        />
      )}

    </div>
  );
}

export { LAST_PAGE_KEY };

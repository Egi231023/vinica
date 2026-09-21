'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { readingOrder } from '@/data/chapters';
import { LAST_PAGE_KEY } from '@/components/book/BookStage';

/**
 * The book remembers where it was put down.
 *
 * Only offered when there is somewhere to go back to — no empty promise, and
 * no bookmark on a first visit.
 */
export function ContinueReading() {
  const [resume, setResume] = useState<{ href: string; label: string } | null>(null);

  useEffect(() => {
    let last: string | null = null;
    try {
      last = localStorage.getItem(LAST_PAGE_KEY);
    } catch {
      return;
    }
    if (!last || last === '/') return;
    const entry = readingOrder().find((e) => e.href === last);
    setResume(entry ? { href: entry.href, label: entry.label } : { href: last, label: 'where you left off' });
  }, []);

  if (!resume) return null;

  return (
    <p className="prose">
      <Link className="btn" href={resume.href}>
        Continue reading — {resume.label}
      </Link>
    </p>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCellar } from '@/lib/cellar';

export interface PassportEstate { slug: string; name: string; province: string; ink: string; }

export function VisitRecorder({ slugs }: { slugs: string[] }) {
  const pathname = usePathname();
  const { ready, visit } = useCellar();
  useEffect(() => {
    if (!ready) return;
    const slug = pathname.match(/^\/winery\/([^/]+)(?:\/|$)/)?.[1];
    if (slug && slugs.includes(slug)) visit(slug);
  }, [pathname, ready, slugs, visit]);
  return null;
}

export function WinePassport({ estates }: { estates: PassportEstate[] }) {
  const { visits, ready, saved, later, notes } = useCellar();
  const [downloadStatus, setDownloadStatus] = useState('');
  const opened = estates.filter(estate => visits[estate.slug]);
  const next = estates.find(estate => !visits[estate.slug]);
  function download() {
    const data = { edition: 'North & Vine personal notebook', version: 1, exportedAt: new Date().toISOString(), visits, saved, later, notes };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = 'north-and-vine-notebook.json';
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloadStatus('Your notebook download is ready. Keep it somewhere safe.');
  }
  return <section className="wine-passport" aria-labelledby="passport-title">
    <p className="chapter-number">Your personal atlas</p>
    <h2 id="passport-title" className="chapter-title">A passport for curiosity.</h2>
    <p className="prose">Every winery chapter you open leaves a dated stamp here. A small record of where the book has taken you.</p>
    {!ready ? <p role="status">Opening your passport…</p> : <>
      <p className="passport-progress"><strong>{opened.length}</strong> of {estates.length} chapters opened <span>· {saved.length} saved wines · {notes.length} tasting notes</span></p>
      <div className="passport-grid">
        {estates.map((estate, i) => <Link key={estate.slug} href={`/winery/${estate.slug}`} className="passport-stamp" data-visited={Boolean(visits[estate.slug])} style={{ '--stamp-ink': estate.ink } as React.CSSProperties} aria-label={`${estate.name}: ${visits[estate.slug] ? `opened ${visits[estate.slug]}` : 'not yet opened'}`}>
          <span className="passport-stamp__province">{estate.province}</span>
          <span className="passport-stamp__mark" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="passport-stamp__name">{estate.name}</span>
          <span className="passport-stamp__date">{visits[estate.slug] || 'Your next discovery'}</span>
        </Link>)}
      </div>
      <p className="passport-next">{next ? <Link className="booklink" href={`/winery/${next.slug}`}>Continue the journey: {next.name} →</Link> : 'All ten chapters opened. The next discovery might be a bottle you overlooked.'}</p>
      <button type="button" className="btn" onClick={download}>Download your notebook ↓</button>
      <p className="marginal">Stamps record chapters opened in this book, not visits to the wineries. Your passport and notes stay in this browser. Download a copy before clearing browser data.</p>
      <p className="marginal" role="status">{downloadStatus}</p>
    </>}
  </section>;
}

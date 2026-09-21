import { BookArtwork } from '@/components/BookArtwork';
import { craftArtwork } from '@/data/artwork';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Spread } from '@/components/book/Spread';
import { WineryHead } from '@/components/winery/WineryHead';
import { ClaimText, ClaimList, Footnotes, buildSourceIndex } from '@/components/Provenance';
import { WINERIES, getWinery } from '@/data/wineries';
import { wineryPage } from '@/data/chapters';
import { getSources } from '@/data/sources';

export function generateStaticParams() {
  return WINERIES.map((winery) => ({ slug: winery.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const winery = getWinery(slug);
  return winery ? { title: `${winery.name} — Chronicle` } : { title: 'Not in this book' };
}

export default async function WineryChronicle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const winery = getWinery(slug);
  if (!winery) notFound();

  const page = wineryPage(winery.slug) + 2;
  const index = buildSourceIndex(
    winery.timeline.map((entry) => entry.detail),
    winery.curiosities,
  );

  return (
    <Spread
      leftHead={`${winery.shortName} · Chronicle`}
      rightHead={`${winery.shortName} · Curiosities and open questions`}
      leftPage={page}
      rightPage={page + 1}
      left={
        <>
          <WineryHead winery={winery} leaf="chronicle" />

          <h3 className="section-title">What happened, and when</h3>
          {winery.timeline.length > 0 ? (
            <ol className="chronology">
              {winery.timeline.map((entry) => (
                <li className="chronology__entry" key={`${entry.year}-${entry.label}`}>
                  <span className="chronology__year">{entry.date ?? entry.year}</span>
                  <span>
                    <span className="chronology__label">{entry.label}</span>
                    <span className="chronology__detail">
                      <ClaimText claim={entry.detail} index={index} />
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="empty-state">
              <span className="empty-state__mark" aria-hidden="true">
                ✧
              </span>
              We have not yet established a dated chronology for this estate.
            </p>
          )}

          <h3 className="section-title">Awards we could verify</h3>
          {winery.awards.length > 0 ? (
            <ul className="awards">
              {winery.awards.map((award) => (
                <li key={`${award.year}-${award.title}`}>
                  <span className="chronology__year">{award.year}</span>
                  <span>
                    <b>{award.title}</b> — {award.awardedBy}
                    <br />
                    <span style={{ color: 'var(--ink-faint)' }}>{award.subject}</span>
                    <br />
                    <span style={{ fontSize: '0.9em', color: 'var(--ink-faint)' }}>
                      {getSources(award.sources)
                        .map((source) => source.publisher)
                        .join('; ')}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="gap-note">
              <strong>Not yet known:</strong> we have not verified any award for this producer. An
              absence here means we have not checked or could not confirm — not that none exists.
            </p>
          )}
        </>
      }
      right={
        <>
          <BookArtwork name={craftArtwork(winery.slug)} />
          <h3 className="section-title">Things worth knowing</h3>
          <ClaimList claims={winery.curiosities} index={index} />

          <details className="tipped-in editorial-details">
            <summary>Inside the notebook · questions for the winemaker</summary>
            <h4 className="tipped-in__title">Tipped in: what we would ask</h4>
            <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-soft)', marginTop: 0 }}>
              These are unanswered. We have not spoken to this producer, and nothing below is
              presented as fact or as an inside story.
            </p>
            <ol>
              {winery.openQuestions.map((question) => (
                <li key={question.question}>
                  <strong>{question.topic}.</strong>
                  <span className="q">“{question.question}”</span>
                  <span className="unlocks">Would let us publish: {question.unlocks}</span>
                </li>
              ))}
            </ol>
          </details>

          <Footnotes index={index} />
        </>
      }
    />
  );
}

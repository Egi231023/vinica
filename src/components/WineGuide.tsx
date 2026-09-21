'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Bottle } from '@/components/Bottle';
import { useCellar } from '@/lib/cellar';
import { recommendWines, type GuideAnswers, type GuideWine } from '@/lib/wine-guide';

const QUESTIONS = [
  { key: 'occasion', title: 'What is the moment?', options: [
    ['table', 'Around the table', 'A bottle to explore alongside food.'],
    ['celebration', 'Something to celebrate', 'A toast, a gathering, a little occasion.'],
    ['quiet', 'A quiet evening', 'Time to slow down and notice the glass.'],
  ] },
  { key: 'taste', title: 'Which direction feels like you?', options: [
    ['fresh', 'Fresh & bright', 'Lighter whites and sparkling styles.'],
    ['rounded', 'Round & textured', 'White wines with a little more body.'],
    ['red', 'The red-wine chapter', 'Explore the reds in this book.'],
    ['sweet', 'A sweeter ending', 'Dessert wines and sweeter profiles.'],
  ] },
  { key: 'curiosity', title: 'How shall we explore?', options: [
    ['classic', 'Start with familiar grapes', 'Give classic varieties a little extra weight.'],
    ['regional', 'Take me across regions', 'Look for a spread of Canadian provinces.'],
    ['explore', 'Let the grapes lead', 'Look for more variety among the grapes.'],
  ] },
] as const;

export function WineGuide({ wines, producers }: { wines: GuideWine[]; producers: Record<string, { name: string; initials: string }> }) {
  const [answers, setAnswers] = useState<Partial<GuideAnswers>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const { ready, isSaved, toggleSaved } = useCellar();
  const question = QUESTIONS[step];
  const selected = answers[question.key];
  function focusHeading() { requestAnimationFrame(() => heading.current?.focus()); }
  function restart() { setDone(false); setStep(0); focusHeading(); }
  if (done) {
    const picks = recommendWines(wines, answers as GuideAnswers);
    return <section id="guide-start" className="wine-guide" aria-label="Your wine discoveries">
      <h2 ref={heading} tabIndex={-1} className="chapter-title">Three paths into the book.</h2>
      <p className="guide-summary">{QUESTIONS.map(q => q.options.find(o => o[0] === answers[q.key])?.[1]).join(' · ')}</p>
      <p className="marginal">Our editorial suggestions from this catalogue, not a promise of taste or stock. Open a wine to read its tasting notes and sources.</p>
      <ol className="guide-results">{picks.map(({ wine, reasons }, i) => <li key={wine.slug} className="guide-result">
        <Bottle shape={wine.bottle} colour={wine.colour} producerInitials={producers[wine.winerySlug]?.initials ?? ''} photo={wine.photo} height={130} />
        <div><p className="chapter-number">Discovery {i + 1} · {wine.region.provinceName}</p>
          <h3><Link className="booklink" href={`/wine/${wine.slug}`}>{wine.name}</Link></h3>
          <p className="guide-meta">{producers[wine.winerySlug]?.name} · {wine.vintage === 'unspecified' ? 'Vintage unconfirmed' : wine.vintage === 'NV' ? 'Non-vintage' : wine.vintage}</p>
          <ul>{reasons.slice(0, 3).map(reason => <li key={reason}>{reason}</li>)}</ul>
          <p className="guide-meta">{wine.availability.producer === 'current' ? 'Listed by the producer' : 'Producer availability unconfirmed'} · checked {wine.availability.checkedAt}</p>
          <button className="btn btn--quiet" type="button" disabled={!ready} aria-pressed={ready && isSaved(wine.slug)} onClick={() => toggleSaved(wine.slug)}>{ready && isSaved(wine.slug) ? 'Saved to your cellar' : 'Save to your cellar'}</button>
        </div>
      </li>)}</ol>
      {picks.length === 0 && <p>No suitable catalogue entries are available yet. Please explore the collection.</p>}
      <div className="editorial-actions"><button type="button" className="btn" onClick={restart}>Change my answers</button><Link className="booklink" href="/cellar">Open my cellar →</Link></div>
      <p className="marginal">Membership and wine orders are not open. These suggestions help you explore and save.</p>
    </section>;
  }
  return <section id="guide-start" className="wine-guide" aria-label="Find your first bottle">
    <p className="chapter-number">A conversation in three questions · {step + 1} / 3</p>
    <div className="guide-progress" aria-hidden="true">{QUESTIONS.map((q, i) => <span key={q.key} data-complete={i <= step} />)}</div>
    <h2 ref={heading} tabIndex={-1} className="chapter-title">{question.title}</h2>
    <form onSubmit={event => { event.preventDefault(); if (!selected) return; if (step === 2) setDone(true); else setStep(step + 1); focusHeading(); }}>
      <fieldset className="guide-options"><legend className="visually-hidden">{question.title}</legend>
        {question.options.map(([value, label, description]) => <label key={value} className="guide-option" data-selected={selected === value}>
          <input type="radio" name={question.key} value={value} checked={selected === value} onChange={() => setAnswers({ ...answers, [question.key]: value })} required />
          <span><strong>{label}</strong><small>{description}</small></span>
        </label>)}
      </fieldset>
      <div className="editorial-actions">{step > 0 && <button type="button" className="btn btn--quiet" onClick={() => { setStep(step - 1); focusHeading(); }}>← Back</button>}
        <button className="btn" type="submit" disabled={!selected}>{step === 2 ? 'Discover my three wines →' : 'Continue →'}</button>
      </div>
    </form>
    <p className="marginal">No account needed. Your answers stay on this page and can be changed at any time.</p>
  </section>;
}

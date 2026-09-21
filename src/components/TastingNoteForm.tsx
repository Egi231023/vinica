'use client';

import { useState } from 'react';
import { useCellar } from '@/lib/cellar';

/** The reader's own tasting note, kept in their browser and nowhere else. */
export function TastingNoteForm({ wineSlug }: { wineSlug: string }) {
  const { notes, addNote, removeNote, ready } = useCellar();
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const mine = notes.filter((note) => note.wineSlug === wineSlug);

  if (!ready) return null;

  return (
    <section className="tasting-notes">
      <h3 className="section-title">Your tasting notes</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const trimmed = text.trim();
          if (!trimmed) return;
          addNote({
            wineSlug,
            on: new Date().toISOString(),
            text: trimmed,
            rating: rating ? (Number(rating) as 1 | 2 | 3 | 4 | 5) : undefined,
          });
          setText('');
          setRating('');
        }}
      >
        <label className="field">
          <span className="field__label">What did you make of it?</span>
          <textarea
            className="field__textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Drunk on a Tuesday with roast chicken. More acid than I expected…"
          />
        </label>
        <label className="field">
          <span className="field__label">Your mark — optional</span>
          <select
            className="field__select"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="">No mark</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {'✦'.repeat(n)}
              </option>
            ))}
          </select>
        </label>
        <button className="btn" type="submit" disabled={!text.trim()}>
          Write it down
        </button>
      </form>

      {mine.length === 0 ? (
        <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)', marginTop: '1rem' }}>
          Nothing written yet. Notes stay in this browser — they are not sent to us, and they will
          not follow you to another device.
        </p>
      ) : (
        <ul className="note-list">
          {mine.map((note) => (
            <li key={note.on}>
              <p className="note-list__meta">
                {new Date(note.on).toLocaleDateString('en-CA')}
                {note.rating ? ` · ${'✦'.repeat(note.rating)}` : ''}
                <button
                  type="button"
                  className="btn btn--quiet"
                  onClick={() => removeNote(note.wineSlug, note.on)}
                >
                  Remove
                </button>
              </p>
              <p className="note-list__text">{note.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

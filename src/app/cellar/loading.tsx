/**
 * The skeleton of a spread, so a slow page still looks like paper.
 *
 * Scoped to segments that cannot 404. A loading boundary opens a streaming
 * response, which commits a 200 before the page can call notFound() — so the
 * winery and wine routes deliberately have none, and keep their real status.
 */
export default function Loading() {
  return (
    <div className="spread paper-surface" aria-busy="true" aria-label="Turning the page">
      <div className="spine" aria-hidden="true" />
      {(['left', 'right'] as const).map((side) => (
        <section className={`page page--${side} paper-surface`} key={side}>
          <p className="running-head">
            <span>Turning the page…</span>
            <span className="running-head__rule" aria-hidden="true" />
            <span aria-hidden="true">North &amp; Vine</span>
          </p>
          <div className="loading-lines">
            <span style={{ width: '42%', height: '1.8rem', marginBottom: '1.2rem' }} />
            <span style={{ width: '88%' }} />
            <span style={{ width: '94%' }} />
            <span style={{ width: '76%' }} />
            <span style={{ width: '90%' }} />
            <span style={{ width: '54%' }} />
          </div>
        </section>
      ))}
    </div>
  );
}

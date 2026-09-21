import type { ReactNode } from 'react';

/**
 * Two leaves and a gutter.
 *
 * On a narrow screen the two pages become one continuous read rather than a
 * shrunken spread — the same content, set for a phone instead of for paper.
 */
export function Spread({
  left,
  right,
  leftHead,
  rightHead,
  leftPage,
  rightPage,
}: {
  left: ReactNode;
  right: ReactNode;
  leftHead: string;
  rightHead: string;
  leftPage: number;
  rightPage: number;
}) {
  return (
    <div className="spread paper-surface">
      <div className="spine" aria-hidden="true" />

      <section className="page page--left paper-surface" aria-label={leftHead}>
        <RunningHead text={leftHead} />
        <div id="page-content" className="page__body">
          {left}
        </div>
        <span className="folio" aria-hidden="true">
          {leftPage}
        </span>
      </section>

      <section className="page page--right paper-surface" aria-label={rightHead}>
        <RunningHead text={rightHead} />
        <div className="page__body">{right}</div>
        <span className="folio" aria-hidden="true">
          {rightPage}
        </span>
      </section>
    </div>
  );
}

function RunningHead({ text }: { text: string }) {
  return (
    <p className="running-head">
      <span>{text}</span>
      <span className="running-head__rule" aria-hidden="true" />
      <span aria-hidden="true">North &amp; Vine</span>
    </p>
  );
}

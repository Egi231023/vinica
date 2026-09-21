import type { Claim, ClaimKind, Source } from '@/lib/types';
import { getSources } from '@/data/sources';

/**
 * How a sourced claim reaches the page.
 *
 * A fact carries a superscript that leads to a numbered note at the foot of the
 * page, exactly as it would in a printed book. An interpretation is marked as
 * ours. A recommendation is marked as advice. Nothing arrives unattributed.
 */

export class SourceIndex {
  private order: string[] = [];

  add(ids: readonly string[]): number[] {
    return ids.map((id) => {
      let position = this.order.indexOf(id);
      if (position < 0) {
        this.order.push(id);
        position = this.order.length - 1;
      }
      return position + 1;
    });
  }

  get ids(): string[] {
    return this.order;
  }

  get sources(): Source[] {
    return getSources(this.order);
  }

  get size(): number {
    return this.order.length;
  }
}

/** Builds the index up front, so note numbers never depend on render order. */
export function buildSourceIndex(...groups: (Claim[] | undefined)[]): SourceIndex {
  const index = new SourceIndex();
  for (const group of groups) {
    for (const claim of group ?? []) index.add(claim.sources);
  }
  return index;
}

const KIND_LABEL: Record<ClaimKind, string | null> = {
  fact: null,
  interpretation: 'Our reading',
  recommendation: 'Advice',
  unverified: 'Unverified',
};

export function ClaimText({ claim, index }: { claim: Claim; index: SourceIndex }) {
  const marks = index.add(claim.sources);
  const label = KIND_LABEL[claim.kind];

  return (
    <>
      <span className={`claim claim--${claim.kind}`}>{claim.text}</span>
      {label && (
        <>
          {' '}
          <span className={`tag tag--${claim.kind}`}>{label}</span>
        </>
      )}
      {marks.length > 0 && (
        <sup className="claim-mark">
          <span className="visually-hidden">Sources </span>
          {marks.join(',')}
        </sup>
      )}
    </>
  );
}

export function ClaimList({ claims, index }: { claims: Claim[]; index: SourceIndex }) {
  if (claims.length === 0) return null;
  return (
    <div className="prose">
      {claims.map((claim, i) => (
        <p key={i}>
          <ClaimText claim={claim} index={index} />
        </p>
      ))}
    </div>
  );
}

const KIND_SUFFIX: Record<Source['kind'], string> = {
  producer: 'the producer',
  editorial: 'press',
  official: 'official',
};

export function Footnotes({ index, title = 'Sources' }: { index: SourceIndex; title?: string }) {
  const sources = index.sources;
  if (sources.length === 0) return null;

  return (
    <details className="footnotes editorial-details">
      <summary>{title} · {sources.length} references</summary>
      <ol className="sources-list">
        {sources.map((source, i) => (
          <li key={source.id} id={`source-${source.id}`}>
            {i + 1}.{' '}
            <a href={source.url} target="_blank" rel="noopener noreferrer nofollow">
              {source.publisher}, “{source.title}”
            </a>{' '}
            — {KIND_SUFFIX[source.kind]}; checked {source.verifiedAt}
            {source.method === 'search-snippet' && (
              <>
                {' '}
                <span className="tag tag--unverified" title="Confirmed through search retrieval of this page rather than a direct read">
                  indirect
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}

/** A hole in the record, drawn as a hole. */
export function Gap({ what, why }: { what: string; why?: string }) {
  return (
    <p className="gap-note">
      <strong>Not yet known:</strong> {what}
      {why ? ` ${why}` : ''}
    </p>
  );
}

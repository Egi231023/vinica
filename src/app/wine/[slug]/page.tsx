import { BOTTLE_REFERENCES } from '@/data/bottle-references';
import { BookArtwork } from '@/components/BookArtwork';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Spread } from '@/components/book/Spread';
import { Bottle, initialsFor } from '@/components/Bottle';
import { ClaimList, Footnotes, SourceIndex } from '@/components/Provenance';
import { WineActions } from '@/components/WineActions';
import { TastingNoteForm } from '@/components/TastingNoteForm';
import { vintageLabel } from '@/components/WineShelf';
import { WINES, getWine, winesForWinery } from '@/data/wines';
import { WINERIES_BY_SLUG } from '@/data/wineries';
import { wineryPage } from '@/data/chapters';
import { COMMERCE_MODE } from '@/config/business';

export function generateStaticParams() {
  return WINES.map((wine) => ({ slug: wine.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wine = getWine(slug);
  if (!wine) return { title: 'Not in this book' };
  const winery = WINERIES_BY_SLUG[wine.winerySlug];
  return {
    title: `${wine.name} ${vintageLabel(wine.vintage)} — ${winery?.name ?? ''}`.trim(),
    description: wine.profile.notes[0]?.text,
  };
}

const PRODUCER_AVAILABILITY = {
  current: 'On the producer’s current list',
  archive: 'Archive — documented, not sold by the producer',
  unknown: 'Listed, but we could not confirm current availability',
} as const;

export default async function WinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wine = getWine(slug);
  if (!wine) notFound();

  const winery = WINERIES_BY_SLUG[wine.winerySlug];
  const page = wineryPage(wine.winerySlug) + 6;

  const index = new SourceIndex();
  index.add(wine.sources);
  index.add(wine.availability.sources);

  const siblings = winesForWinery(wine.winerySlug).filter((w) => w.slug !== wine.slug);
  const bottleReference = BOTTLE_REFERENCES[wine.slug];
  const contracted = wine.availability.northAndVine === 'orderable';

  return (
    <Spread
      leftHead={`${winery?.shortName ?? 'Wine'} · ${wine.name}`}
      rightHead="The particulars"
      leftPage={page}
      rightPage={page + 1}
      left={
        <>
          <p className="chapter-number" style={{ color: winery?.accent.ink }}>
            <Link className="booklink" href={`/winery/${wine.winerySlug}`} style={{ textDecoration: 'none' }}>
              {winery?.name ?? 'Unknown producer'}
            </Link>
          </p>
          <h1 className="chapter-title">{wine.fullName ?? wine.name}</h1>
          <p className="chapter-standfirst">
            {vintageLabel(wine.vintage)} · {wine.region.appellation}
            {wine.vineyard ? ` · ${wine.vineyard}` : ''}
          </p>

          <div className="bottle-plate">
            <Bottle
              shape={wine.bottle}
              colour={wine.colour}
              producerInitials={initialsFor(winery?.name ?? wine.name)}
              vintage={typeof wine.vintage === 'number' ? String(wine.vintage) : undefined}
              photo={wine.photo}
              height={420}
            />
            <p className="bottle-plate__caption">
              {(wine.photo.status === 'licensed' || wine.photo.status === 'authorized')
                ? wine.photo.credit ?? 'Photograph supplied by the producer.'
                : 'Illustrated bottle silhouette · product photograph pending.'}
            </p>
          </div>

          {wine.photo.sourceUrl && <p className="marginal"><a className="booklink" href={wine.photo.sourceUrl} target="_blank" rel="noopener noreferrer">Photograph source ↗</a></p>}

          {bottleReference && !wine.photo.src && <p className="marginal">
            <a className="booklink" href={bottleReference.url} target="_blank" rel="noopener noreferrer">View the original bottle image ↗</a><br />
            {bottleReference.source}. {bottleReference.note}
          </p>}

          {wine.story && wine.story.length > 0 && (
            <>
              <h3 className="section-title">Why this bottle</h3>
              <ClaimList claims={wine.story} index={index} />
            </>
          )}

          <BookArtwork name={wine.colour === 'sparkling' ? 'sparkling-study' : wine.colour === 'red' ? 'red-aromas' : wine.colour === 'dessert' ? 'ice-study' : 'white-aromas'} compact />
          <p className="marginal">An editorial study of the wine world. See the tasting notes for this bottle’s documented profile.</p>

          <WineActions
            slug={wine.slug}
            name={wine.name}
            contracted={contracted}
            trialMode={COMMERCE_MODE === 'trial'}
          />
        </>
      }
      right={
        <>
          <h3 className="section-title">The particulars</h3>
          <dl className="spec">
            <div>
              <dt>Producer</dt>
              <dd>
                <Link className="booklink" href={`/winery/${wine.winerySlug}`}>
                  {winery?.name}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Vintage</dt>
              <dd>
                {vintageLabel(wine.vintage)}
                {wine.vintage === 'unspecified' && (
                  <>
                    {' '}
                    <span className="tag tag--gap">Gap</span>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd style={{ textTransform: 'capitalize' }}>{wine.colour}</dd>
            </div>
            <div>
              <dt>Grapes</dt>
              <dd>
                {wine.grapes
                  .map((grape) => (grape.share ? `${grape.variety} ${grape.share}%` : grape.variety))
                  .join(', ')}
              </dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>
                {wine.region.appellation}
                {wine.region.parent ? `, ${wine.region.parent}` : ''} — {wine.region.provinceName}
              </dd>
            </div>
            <div>
              <dt>Volume</dt>
              <dd>{wine.volumeMl ? `${wine.volumeMl} ml` : <span className="tag tag--gap">Not confirmed</span>}</dd>
            </div>
            <div>
              <dt>Alcohol</dt>
              <dd>{wine.abv != null ? `${wine.abv}%` : <span className="tag tag--gap">Not confirmed</span>}</dd>
            </div>
            <div>
              <dt>Producer&rsquo;s price</dt>
              <dd>
                {wine.producerPriceCad ? (
                  <>
                    CA${wine.producerPriceCad.amount}{' '}
                    <span style={{ color: 'var(--ink-faint)' }}>
                      — the producer&rsquo;s list price, checked {wine.producerPriceCad.checkedAt}. Not
                      our selling price.
                    </span>
                  </>
                ) : (
                  <span className="tag tag--gap">Not confirmed</span>
                )}
              </dd>
            </div>
          </dl>

          <h3 className="section-title">Tasting</h3>
          <ClaimList claims={wine.profile.notes} index={index} />

          {wine.profile.structure && (
            <div className="structure">
              {(
                [
                  ['Body', wine.profile.structure.body],
                  ['Acidity', wine.profile.structure.acidity],
                  ['Tannin', wine.profile.structure.tannin],
                  ['Sweetness', wine.profile.structure.sweetness],
                ] as const
              )
                .filter(([, value]) => value != null)
                .map(([label, value]) => (
                  <div className="structure__row" key={label}>
                    <span className="structure__label">{label}</span>
                    <span className="structure__scale" aria-label={`${label}: ${value} of 5`}>
                      {[1, 2, 3, 4, 5].map((pip) => (
                        <span className="structure__pip" key={pip} data-on={pip <= (value as number)} />
                      ))}
                    </span>
                  </div>
                ))}
              <p style={{ fontSize: '0.64rem', color: 'var(--ink-faint)', marginTop: '0.5rem' }}>
                These four scales are our own reading, for filtering and comparison. They are not
                the producer&rsquo;s figures.
              </p>
            </div>
          )}

          {wine.serving && wine.serving.length > 0 && (
            <>
              <h3 className="section-title">Serving</h3>
              <ClaimList claims={wine.serving} index={index} />
            </>
          )}
          {wine.pairing && wine.pairing.length > 0 && (
            <>
              <h3 className="section-title">At the table</h3>
              <ClaimList claims={wine.pairing} index={index} />
            </>
          )}

          <h3 className="section-title">Availability</h3>
          <dl className="spec">
            <div>
              <dt>At the producer</dt>
              <dd>{PRODUCER_AVAILABILITY[wine.availability.producer]}</dd>
            </div>
            <div>
              <dt>From North &amp; Vine</dt>
              <dd>
                {contracted ? (
                  'Orderable'
                ) : (
                  <>
                    <span className="tag tag--gap">Not contracted</span>{' '}
                    <span style={{ color: 'var(--ink-faint)' }}>
                      No supply agreement exists. Availability at the winery is not stock with us.
                    </span>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt>Checked</dt>
              <dd>{wine.availability.checkedAt}</dd>
            </div>
          </dl>

          <TastingNoteForm wineSlug={wine.slug} />

          {siblings.length > 0 && (
            <>
              <h3 className="section-title">Also from {winery?.shortName}</h3>
              <ul className="plain-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
                {siblings.slice(0, 6).map((sibling) => (
                  <li key={sibling.slug}>
                    <Link className="booklink" href={`/wine/${sibling.slug}`}>
                      {sibling.name}
                    </Link>{' '}
                    <span style={{ color: 'var(--ink-faint)' }}>{vintageLabel(sibling.vintage)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <Footnotes index={index} />
        </>
      }
    />
  );
}

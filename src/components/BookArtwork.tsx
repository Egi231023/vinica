/** Original illustrations, kept separate from documentary producer imagery. */
const ARTWORK = {
  'western-vineyard': {
    alt: 'Watercolor of vineyard rows descending toward a blue lake and ochre mountains.',
    caption: 'Between vines and water · an imagined western landscape',
  },
  'eastern-vineyard': {
    alt: 'Watercolor of rolling vineyards, autumn trees and pale stones.',
    caption: 'The quiet of the vineyard · an imagined eastern landscape',
  },
  'atlantic-vineyard': {
    alt: 'Watercolor of green vineyard rows beneath misty hills and an estuary sky.',
    caption: 'Where the mist settles · an imagined Atlantic landscape',
  },
  'vine-study': {
    alt: 'Botanical watercolor study of purple and golden grapes, vine leaves and curling tendrils.',
    caption: 'From the vine · a botanical study',
  },
  'cellar-study': {
    alt: 'Watercolor of a warm wine cellar with oak shelves, two wine glasses and a tasting notebook.',
    caption: 'A place for discovery · an imagined cellar',
  },
} as const;

export type ArtworkName = keyof typeof ARTWORK;

export function BookArtwork({
  name,
  compact = false,
  priority = false,
}: {
  name: ArtworkName;
  compact?: boolean;
  priority?: boolean;
}) {
  const art = ARTWORK[name];
  const base = process.env.NEXT_PUBLIC_NV_ASSET_BASE_PATH ?? '';
  const src = `${base}/art/${name}`;

  return (
    <figure className={`book-art${compact ? ' book-art--compact' : ''}`}>
      <img
        className="book-art__image"
        src={`${src}-960.webp`}
        srcSet={`${src}-480.webp 480w, ${src}-960.webp 960w, ${src}-1536.webp 1536w`}
        sizes={compact ? '(max-width: 760px) 75vw, 320px' : '(max-width: 760px) 85vw, (max-width: 1420px) 42vw, 620px'}
        width={1536}
        height={1024}
        alt={art.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      <figcaption className="book-art__caption">
        <span>{art.caption}</span>
        <span className="book-art__credit">Original AI illustration · watercolor &amp; ink</span>
      </figcaption>
    </figure>
  );
}

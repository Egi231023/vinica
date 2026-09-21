import type { BottleShape, Photo, WineColour } from '@/lib/types';

/** Original producer photos where authorized; a drawn silhouette for remaining gaps.
 * Packaging references carry a visible note so they never imply a vintage match.
 */

interface Geometry {
  /** Outline of the glass, in a 120 × 340 box. */
  d: string;
  /** Where the wine sits inside the glass. */
  fill: string;
  /** The paper plate. */
  plate: { x: number; y: number; w: number; h: number };
  neckTop: number;
}

function geometry(shape: BottleShape): Geometry {
  switch (shape) {
    case 'burgundy':
      return {
        d: 'M52 14 h16 a3 3 0 0 1 3 3 v78 c0 14 16 22 20 44 c3 16 4 34 4 50 v132 a8 8 0 0 1-8 8 H33 a8 8 0 0 1-8-8 V189 c0-16 1-34 4-50 c4-22 20-30 20-44 V17 a3 3 0 0 1 3-3 z',
        fill: 'M27 200 h66 v112 a6 6 0 0 1-6 6 H33 a6 6 0 0 1-6-6 z',
        plate: { x: 33, y: 214, w: 54, h: 74 },
        neckTop: 14,
      };
    case 'alsace':
      return {
        d: 'M54 12 h12 a3 3 0 0 1 3 3 v92 c0 16 12 24 15 46 c2 14 2 30 2 44 v124 a8 8 0 0 1-8 8 H42 a8 8 0 0 1-8-8 V197 c0-14 0-30 2-44 c3-22 15-30 15-46 V15 a3 3 0 0 1 3-3 z',
        fill: 'M35 206 h50 v116 a6 6 0 0 1-6 6 H41 a6 6 0 0 1-6-6 z',
        plate: { x: 40, y: 218, w: 40, h: 76 },
        neckTop: 12,
      };
    case 'sparkling':
      return {
        d: 'M49 16 h22 a4 4 0 0 1 4 4 v66 c0 16 19 24 23 48 c3 17 4 32 4 48 v130 a8 8 0 0 1-8 8 H26 a8 8 0 0 1-8-8 V182 c0-16 1-31 4-48 c4-24 23-32 23-48 V20 a4 4 0 0 1 4-4 z',
        fill: 'M20 196 h80 v116 a6 6 0 0 1-6 6 H26 a6 6 0 0 1-6-6 z',
        plate: { x: 29, y: 212, w: 62 , h: 76 },
        neckTop: 16,
      };
    case 'dessert-375':
      return {
        d: 'M55 74 h10 a3 3 0 0 1 3 3 v58 c0 13 10 19 13 36 c2 11 2 22 2 32 v109 a8 8 0 0 1-8 8 H45 a8 8 0 0 1-8-8 V203 c0-10 0-21 2-32 c3-17 13-23 13-36 V77 a3 3 0 0 1 3-3 z',
        fill: 'M38 214 h44 v98 a6 6 0 0 1-6 6 H44 a6 6 0 0 1-6-6 z',
        plate: { x: 43, y: 226, w: 34, h: 64 },
        neckTop: 74,
      };
    case 'bordeaux':
    default:
      return {
        d: 'M51 14 h18 a3 3 0 0 1 3 3 v96 c0 10 15 12 18 30 c2 11 2 20 2 30 v139 a8 8 0 0 1-8 8 H36 a8 8 0 0 1-8-8 V173 c0-10 0-19 2-30 c3-18 18-20 18-30 V17 a3 3 0 0 1 3-3 z',
        fill: 'M30 190 h60 v122 a6 6 0 0 1-6 6 H36 a6 6 0 0 1-6-6 z',
        plate: { x: 36, y: 206, w: 48, h: 78 },
        neckTop: 14,
      };
  }
}

/** Glass colour, then the colour of what is inside it. */
const GLASS: Record<WineColour, { glass: string; glassLight: string; wine: string }> = {
  red: { glass: '#2b3324', glassLight: '#485440', wine: '#4a0f22' },
  white: { glass: '#8a9367', glassLight: '#b3bb8f', wine: '#d9c98a' },
  rose: { glass: '#c9c3b4', glassLight: '#e4dfd2', wine: '#e0a08f' },
  sparkling: { glass: '#243a2c', glassLight: '#425a48', wine: '#d8c78c' },
  dessert: { glass: '#c6c2b2', glassLight: '#e6e2d4', wine: '#cf9a3c' },
  orange: { glass: '#9a9573', glassLight: '#c0bb98', wine: '#d08b4a' },
};

const CAPSULE: Record<WineColour, string> = {
  red: '#5d1128',
  white: '#8a7a45',
  rose: '#b98a7c',
  sparkling: '#a8894c',
  dessert: '#a8894c',
  orange: '#8a5a2a',
};

export function Bottle({
  shape,
  colour,
  producerInitials,
  vintage,
  photo,
  height = 200,
  className,
}: {
  shape: BottleShape;
  colour: WineColour;
  producerInitials: string;
  vintage?: string;
  photo?: Photo;
  height?: number;
  className?: string;
}) {
  if ((photo?.status === 'licensed' || photo?.status === 'authorized') && photo.src) {
    const base = process.env.NEXT_PUBLIC_NV_ASSET_BASE_PATH ?? '';
    const src = photo.src.startsWith('/') ? `${base}${photo.src}` : photo.src;
    return <span className={`bottle-photo ${className ?? ''}`}>
      <img src={src} alt={photo.alt ?? 'Original bottle photograph'} loading="lazy" decoding="async"
        style={{ height, maxWidth: '100%', objectFit: 'contain', width: 'auto' }} />
      {photo.note && <span className="bottle-photo__note">{photo.note}</span>}
    </span>;
  }

  const g = geometry(shape);
  const c = GLASS[colour];
  const uid = `${shape}-${colour}`.replace(/[^a-z0-9-]/gi, '');

  return (
    <svg
      viewBox="0 0 120 340"
      role="img"
      aria-label={`Drawn ${shape} bottle, ${colour} wine. No photograph of this bottle has been licensed yet.`}
      style={{ height, width: 'auto', display: 'block', margin: '0 auto' }}
      className={className}
    >
      <defs>
        <linearGradient id={`glass-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={c.glass} />
          <stop offset="26%" stopColor={c.glassLight} />
          <stop offset="46%" stopColor={c.glass} />
          <stop offset="100%" stopColor="#12160f" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <path d={g.d} />
        </clipPath>
      </defs>

      <path d={g.d} fill={`url(#glass-${uid})`} />
      <g clipPath={`url(#clip-${uid})`}>
        <path d={g.fill} fill={c.wine} opacity="0.92" />
        {/* The highlight that tells the eye this is glass. */}
        <rect x="34" y={g.neckTop} width="7" height="320" fill="#ffffff" opacity="0.16" rx="3" />
        <rect x="78" y={g.neckTop + 40} width="3" height="280" fill="#ffffff" opacity="0.07" rx="2" />
      </g>

      {/* Capsule over the cork. */}
      <rect
        x={shape === 'sparkling' ? 45 : shape === 'alsace' ? 50 : 47}
        y={g.neckTop}
        width={shape === 'sparkling' ? 30 : shape === 'alsace' ? 20 : 26}
        height="42"
        fill={CAPSULE[colour]}
        rx="2"
      />

      {/* A plate in our own lettering — deliberately not a facsimile label. */}
      <rect {...g.plate} fill="#f2ead9" opacity="0.95" rx="1" />
      <rect
        x={g.plate.x + 4}
        y={g.plate.y + 4}
        width={g.plate.w - 8}
        height={g.plate.h - 8}
        fill="none"
        stroke="#a8894c"
        strokeWidth="0.6"
        opacity="0.75"
      />
      <text
        x={g.plate.x + g.plate.w / 2}
        y={g.plate.y + g.plate.h / 2 + 1}
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize={g.plate.w > 50 ? 17 : 14}
        letterSpacing="1.6"
        fill="#5d1128"
      >
        {producerInitials}
      </text>
      {vintage && (
        <text
          x={g.plate.x + g.plate.w / 2}
          y={g.plate.y + g.plate.h - 12}
          textAnchor="middle"
          fontFamily="'EB Garamond', Georgia, serif"
          fontSize="8"
          letterSpacing="0.8"
          fill="#8b7b6c"
        >
          {vintage}
        </text>
      )}
    </svg>
  );
}

export function initialsFor(name: string): string {
  return name
    .replace(/[’']/g, '')
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word) && !['de', 'la', 'du', 'and', '&'].includes(word.toLowerCase()))
    .slice(0, 3)
    .map((word) => word[0]!.toUpperCase())
    .join('');
}

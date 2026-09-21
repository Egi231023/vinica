import geometry from '@/data/generated/map-geometry.json';

/**
 * The printed plate: coastlines and graticule, rendered on the server.
 *
 * This is a server component on purpose. The Natural Earth geometry is 280 kB
 * of path data, and shipping it as JavaScript would cost the reader a parse as
 * well as a download. As markup it arrives once, already drawn.
 */
export function MapPlate() {
  return (
    <>
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ccd6d4" />
          <stop offset="100%" stopColor="#bcc8c6" />
        </linearGradient>
      </defs>

      <rect width={geometry.width} height={geometry.height} fill="url(#sea)" />
      <path d={geometry.graticule} fill="none" stroke="#7d8f8c" strokeWidth="0.5" opacity="0.4" />

      {geometry.land.map((shape) => (
        <path
          key={shape.name}
          d={shape.d}
          fill={shape.focus ? '#f6eedb' : '#ddd5c2'}
          stroke={shape.focus ? '#8a6f39' : '#aa9e87'}
          strokeWidth={shape.focus ? 1.3 : 0.6}
          strokeLinejoin="round"
        />
      ))}
    </>
  );
}

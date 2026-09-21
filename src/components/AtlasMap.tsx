'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import markers from '@/data/generated/map-markers.json';

/**
 * The atlas spread.
 *
 * The outlines are Natural Earth geometry projected through a Lambert conformal
 * conic centred on Canada, and the pins are projected through that same
 * projection at build time — so a pin cannot drift from its coordinates.
 *
 * Four Okanagan estates fall within a pixel of each other at continental scale.
 * Rather than nudge them apart, which would be a small lie on a map, pins that
 * close are drawn as one mark that opens into its members.
 */

interface Pin {
  slug: string;
  name: string;
  shortName: string;
  settlement: string;
  region: string;
  province: string;
  precision: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
}

interface Cluster {
  id: string;
  label: string;
  x: number;
  y: number;
  side: 'left' | 'right';
  /** Label anchor, laid out at build time so labels never collide. */
  labelX: number;
  labelY: number;
  members: Pin[];
}

const data = markers as unknown as {
  width: number;
  height: number;
  projection: string;
  attribution: string;
  pins: Pin[];
  clusters: Cluster[];
};

export function AtlasMap({
  facts,
  plate,
}: {
  facts: Record<string, string>;
  /** The coastline, drawn on the server and handed in as markup. */
  plate: ReactNode;
}) {
  const [open, setOpen] = useState<Cluster | null>(null);

  return (
    <div className="atlas">
      <figure className="atlas__figure">
        <svg
          viewBox={`0 0 ${data.width} ${data.height}`}
          className="atlas__svg"
          role="img"
          aria-label="Map of North America with Canada at the centre, marking the ten wineries of this book. A text list of the same wineries follows."
        >
          {plate}

          {data.clusters.map((cluster) => {
            const isOpen = open?.id === cluster.id;
            return (
              <g key={cluster.id} className="atlas__mark" data-open={isOpen}>
                <line
                  x1={cluster.x}
                  y1={cluster.y}
                  x2={cluster.labelX}
                  y2={cluster.labelY + 3}
                  stroke="#8a6f39"
                  strokeWidth="0.8"
                  opacity={isOpen ? 1 : 0.55}
                />
                <text
                  x={cluster.labelX + (cluster.side === 'left' ? -4 : 4)}
                  y={cluster.labelY}
                  textAnchor={cluster.side === 'left' ? 'end' : 'start'}
                  fontFamily="'Cormorant Garamond', Georgia, serif"
                  fontSize="16"
                  letterSpacing="0.6"
                  fill={isOpen ? '#5d1128' : '#3d0a1b'}
                >
                  {cluster.label}
                </text>
                <circle
                  cx={cluster.x}
                  cy={cluster.y}
                  r={isOpen ? 11 : 8}
                  fill={isOpen ? '#5d1128' : '#8a2440'}
                  stroke="#f2ead9"
                  strokeWidth="2"
                  style={{ cursor: 'pointer', transition: 'r 160ms ease' }}
                  onClick={() => setOpen(isOpen ? null : cluster)}
                />
                {cluster.members.length > 1 && (
                  <text
                    x={cluster.x}
                    y={cluster.y + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="'EB Garamond', Georgia, serif"
                    fill="#f2ead9"
                    style={{ pointerEvents: 'none' }}
                  >
                    {cluster.members.length}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <figcaption className="atlas__caption">
          {data.attribution} Projection: {data.projection}. Pins are projected from each
          producer&rsquo;s published location through the same projection as the coastline.
        </figcaption>
      </figure>

      {/* The buttons that actually carry the interaction, so the map works from
          a keyboard and reads correctly to a screen reader. */}
      <div className="atlas__controls" role="group" aria-label="Map markers">
        {data.clusters.map((cluster) => (
          <button
            key={cluster.id}
            type="button"
            className="atlas__chip"
            aria-pressed={open?.id === cluster.id}
            onClick={() => setOpen(open?.id === cluster.id ? null : cluster)}
          >
            {cluster.label}
            {cluster.members.length > 1 && <span> ({cluster.members.length})</span>}
          </button>
        ))}
      </div>

      <div className="atlas__panel" aria-live="polite">
        {open ? (
          <>
            <h3 className="section-title">{open.label}</h3>
            <ul className="atlas__list">
              {open.members.map((pin) => (
                <li key={pin.slug}>
                  <Link className="atlas__entry" href={`/winery/${pin.slug}`}>
                    <span className="atlas__entry-name">{pin.name}</span>
                    <span className="atlas__entry-meta">
                      {pin.settlement} · {pin.region}
                    </span>
                    {facts[pin.slug] && <span className="atlas__entry-fact">{facts[pin.slug]}</span>}
                    <span className="atlas__entry-coords">
                      {formatCoord(pin.lat, 'lat')} {formatCoord(pin.lon, 'lon')}
                      {pin.precision === 'approx' && ' · located to the settlement'}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="empty-state">
            <span className="empty-state__mark" aria-hidden="true">
              ✥
            </span>
            Choose a marker to see the estates it holds. Every winery is also listed on the facing
            page.
          </p>
        )}
      </div>
    </div>
  );
}

function formatCoord(value: number, kind: 'lat' | 'lon'): string {
  const hemisphere = kind === 'lat' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W';
  const abs = Math.abs(value);
  const degrees = Math.floor(abs);
  const minutes = Math.round((abs - degrees) * 60);
  return `${degrees}°${String(minutes).padStart(2, '0')}′${hemisphere}`;
}

export const MAP_PINS = data.pins;

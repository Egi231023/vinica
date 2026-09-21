import type { MetadataRoute } from 'next';

/* Written at build time. Required explicitly so the static export can emit it
   as a file rather than treating it as a request-time route. */
export const dynamic = 'force-static';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://northandvine.example';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/basket', '/cellar'] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

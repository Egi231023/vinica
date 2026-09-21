import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://northandvine.example';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/basket', '/cellar'] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

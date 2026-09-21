import type { MetadataRoute } from 'next';
import { CHAPTERS } from '@/data/chapters';
import { WINERIES } from '@/data/wineries';
import { WINES } from '@/data/wines';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://northandvine.example';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '/',
    ...CHAPTERS.map((chapter) => chapter.href),
    ...WINERIES.flatMap((winery) => [
      `/winery/${winery.slug}`,
      `/winery/${winery.slug}/chronicle`,
      `/winery/${winery.slug}/cellar`,
    ]),
    ...WINES.map((wine) => `/wine/${wine.slug}`),
  ];

  return [...new Set(pages)].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}

import type { NextConfig } from 'next';

/**
 * Two builds from one codebase.
 *
 * The default build is the real service: server-rendered, with membership
 * verified from a signed cookie and orders recorded by Server Actions.
 *
 * With NV_STATIC_PREVIEW=1 the same source exports to static files for GitHub
 * Pages. Server Actions cannot exist in that build at all, so
 * `scripts/build-static-preview.mjs` swaps the two action modules for stubs
 * that decline and explain themselves, and `readSession` stops reading cookies
 * so every page can be prerendered. Nothing in the book itself changes.
 */
const isStaticPreview = process.env.NV_STATIC_PREVIEW === '1';

/** GitHub Pages serves a project site from /<repo>. */
const basePath = process.env.NV_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // No image optimiser exists on a static host.
    unoptimized: isStaticPreview,
  },

  ...(isStaticPreview
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath: basePath || undefined,
        env: { NEXT_PUBLIC_NV_STATIC_PREVIEW: '1' },
      }
    : {
        // Response headers are a server feature; a static export has none, and
        // Next refuses the combination rather than silently dropping them.
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;

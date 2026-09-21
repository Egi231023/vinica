import type { Metadata, Viewport } from 'next';
import '@fontsource/eb-garamond/latin-400.css';
import '@fontsource/eb-garamond/latin-400-italic.css';
import '@fontsource/eb-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import './globals.css';

import { Cover } from '@/components/book/Cover';
import { BookStage } from '@/components/book/BookStage';
import { Ribbons } from '@/components/book/Ribbons';
import { CellarProvider } from '@/lib/cellar';
import { readSession } from '@/lib/session';
import { IS_STATIC_PREVIEW, STATIC_PREVIEW_NOTE } from '@/lib/runtime';

export const metadata: Metadata = {
  title: {
    default: 'North & Vine — a Canadian wine book',
    template: '%s · North & Vine',
  },
  description:
    'Ten Canadian wineries, one membership, and a book you can read. Every fact carries its source and the date we checked it.',
  applicationName: 'North & Vine',
  openGraph: {
    title: 'North & Vine',
    description: 'Ten Canadian wineries, one membership, and a book you can read.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#3d0a1b',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession();

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#page-content">
          Skip to the page
        </a>
        {IS_STATIC_PREVIEW && (
          <p className="preview-band">
            <strong>Reading preview.</strong> {STATIC_PREVIEW_NOTE}
          </p>
        )}
        <CellarProvider memberStatus={session.status}>
          <Cover />
          <div className="stage">
            <BookStage>{children}</BookStage>
          </div>
          <Ribbons />
        </CellarProvider>
      </body>
    </html>
  );
}

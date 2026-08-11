import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { NotFoundView } from '@/components/pure-roots/not-found-view';
import en from '../../messages/en.json';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

/**
 * Root-level 404. Must include <html> and <body> because it renders
 * outside the `[locale]` layout (Next.js requirement).
 */
export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`dark ${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <NextIntlClientProvider locale="en" messages={en}>
          <main className="flex flex-1 flex-col">
            <NotFoundView />
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

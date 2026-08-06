import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Header } from '@/components/pure-roots/header';
import { Footer } from '@/components/pure-roots/footer';
import { ThemeProvider } from '@/lib/theme';
import { routing } from '@/i18n/routing';

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

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`dark ${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#14241C" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pure-roots-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light'}else{document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark'}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

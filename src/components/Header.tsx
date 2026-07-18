'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="border-b border-border/80 bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          Pure Roots
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          <Link href="/" className="hover:text-brand-deep">
            {t('home')}
          </Link>
          <Link href="/verify" className="hover:text-brand-deep">
            {t('verify')}
          </Link>
          <Link href="/admin/login" className="hover:text-brand-deep">
            {t('admin')}
          </Link>
          <div className="flex items-center gap-1 rounded-lg border border-border bg-paper px-1 py-0.5 text-xs font-medium">
            <Link
              href={pathname}
              locale="en"
              className={`rounded-md px-2 py-1 ${locale === 'en' ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="hi"
              className={`rounded-md px-2 py-1 ${locale === 'hi' ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
            >
              HI
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

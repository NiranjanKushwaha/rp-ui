'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t('home') },
    { href: '/verify', label: t('verify'), emphasized: true },
    { href: '/admin/login', label: t('admin') },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-[17px] font-semibold uppercase tracking-[3px] text-brand-deep"
        >
          Pure Roots
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                'emphasized' in link && link.emphasized
                  ? 'text-brand hover:text-brand-deep'
                  : 'text-muted transition-colors hover:text-brand-deep'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-paper p-0.5 text-xs font-semibold">
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
              हिं
            </Link>
          </div>

          <Link
            href="/verify"
            className="inline-flex h-9 items-center rounded-lg bg-brand px-3 text-sm font-semibold text-white transition hover:bg-brand-deep md:hidden"
          >
            {t('verify')}
          </Link>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-2 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-2 py-2.5 text-sm font-semibold ${
                'emphasized' in link && link.emphasized
                  ? 'text-brand'
                  : 'text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

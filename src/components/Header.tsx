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
    <header className="sticky top-0 z-50 border-b border-white/50 bg-surface/85 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-deep text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
            <span className="font-display text-sm font-semibold">PR</span>
          </div>
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-brand-deep">
              Pure Roots
            </p>
            <p className="text-[10px] uppercase tracking-[2px] text-muted">
              Farm to family
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                'emphasized' in link && link.emphasized
                  ? 'rounded-full bg-brand/10 px-4 py-2 text-brand hover:bg-brand/15'
                  : 'text-muted transition-colors hover:text-brand-deep'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-0.5 rounded-xl border border-border bg-paper p-0.5 text-xs font-semibold sm:flex">
            <Link
              href={pathname}
              locale="en"
              className={`rounded-lg px-3 py-1.5 ${locale === 'en' ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="hi"
              className={`rounded-lg px-3 py-1.5 ${locale === 'hi' ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
            >
              हिं
            </Link>
          </div>

          <Link
            href="/verify"
            className="hidden items-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-deep md:inline-flex"
          >
            {t('verify')}
          </Link>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-ink shadow-sm md:hidden"
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
        <nav className="border-t border-border bg-surface px-4 py-3 shadow-xl md:hidden">
          <div className="mb-3 flex items-center justify-between rounded-xl border border-border bg-paper p-2 sm:hidden">
            <span className="text-xs font-semibold uppercase tracking-[1px] text-muted">
              Language
            </span>
            <div className="flex items-center gap-1">
              <Link
                href={pathname}
                locale="en"
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${locale === 'en' ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="hi"
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${locale === 'hi' ? 'bg-surface text-ink shadow-sm' : 'text-muted'}`}
              >
                हिं
              </Link>
            </div>
          </div>

          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-3 text-sm font-semibold ${
                  'emphasized' in link && link.emphasized
                    ? 'bg-brand text-white shadow-lg shadow-brand/20'
                    : 'text-ink hover:bg-paper'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

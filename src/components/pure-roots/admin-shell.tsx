'use client';

import { useState, type ReactNode } from 'react';
import {
  FlaskConical,
  Leaf,
  Menu,
  Sprout,
  X,
  LogIn,
  LayoutDashboard,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin/batches', key: 'navBatches' as const, icon: FlaskConical },
  { href: '/admin/farmers', key: 'navFarmers' as const, icon: Sprout },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const t = useTranslations('admin');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLogin = pathname === '/admin/login' || pathname.endsWith('/admin/login');

  if (isLogin) {
    return <div className="min-h-dvh bg-background text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-dvh bg-background text-foreground lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      {/* Desktop sidebar */}
      <aside className="grain relative hidden border-r border-hairline bg-surface lg:flex lg:flex-col">
        <div className="spotlight absolute inset-0 opacity-40" aria-hidden />
        <div className="relative flex h-full flex-col px-4 py-6">
          <Link href="/admin/batches" className="focus-lux group flex items-center gap-3 rounded-lg px-2">
            <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-gold to-copper text-primary-foreground shadow-soft">
              <Leaf className="size-4" strokeWidth={2.4} aria-hidden />
            </span>
            <span className="min-w-0 leading-none">
              <span className="block font-display text-base font-semibold tracking-tight">
                Pure Roots
              </span>
              <span className="eyebrow mt-1.5 block text-[9px] text-muted-foreground">
                {t('shellEyebrow')}
              </span>
            </span>
          </Link>

          <nav aria-label={t('shellNavLabel')} className="mt-8 grid gap-1">
            {NAV.map(({ href, key, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'focus-lux tap flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
                    active
                      ? 'border border-gold/35 bg-gold/12 text-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  <Icon className={cn('size-4', active && 'text-primary')} aria-hidden />
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-hairline pt-5">
            <Link
              href="/admin/login"
              className="focus-lux tap flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogIn className="size-4" aria-hidden />
              {t('navSignIn')}
            </Link>
            <p className="px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {t('consoleNote')}
            </p>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-40 border-b border-hairline bg-background/80 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t('openMenu')}
                className="focus-lux grid size-11 place-items-center rounded-full border border-hairline bg-secondary lg:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </button>
              <div className="min-w-0 lg:hidden">
                <p className="truncate font-display text-base font-semibold">Pure Roots</p>
                <p className="eyebrow truncate text-[9px]">{t('shellEyebrow')}</p>
              </div>
              <div className="hidden items-center gap-2 lg:flex">
                <LayoutDashboard className="size-4 text-primary" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t('shellEyebrow')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex-1 pb-20 lg:pb-0">{children}</div>

        {/* Mobile bottom nav */}
        <nav
          aria-label={t('shellNavLabel')}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-background/90 backdrop-blur-md lg:hidden"
        >
          <div className="mx-auto grid max-w-lg grid-cols-3 gap-1 px-3 py-2">
            {NAV.map(({ href, key, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'focus-lux tap flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium',
                    active ? 'bg-gold/12 text-foreground' : 'text-muted-foreground',
                  )}
                >
                  <Icon className={cn('size-4', active && 'text-primary')} aria-hidden />
                  {t(key)}
                </Link>
              );
            })}
            <Link
              href="/admin/login"
              className={cn(
                'focus-lux tap flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium',
                pathname.includes('/admin/login')
                  ? 'bg-gold/12 text-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <LogIn className="size-4" aria-hidden />
              {t('navSignIn')}
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={t('closeMenu')}
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
          />
          <div className="grain absolute inset-y-0 left-0 flex w-[min(18rem,88vw)] flex-col border-r border-hairline bg-surface p-5 shadow-lift">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-lg font-semibold">Pure Roots</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('closeMenu')}
                className="focus-lux grid size-10 place-items-center rounded-full border border-hairline bg-secondary"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <nav className="mt-8 grid gap-1">
              {NAV.map(({ href, key, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'focus-lux flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium',
                      active
                        ? 'border border-gold/35 bg-gold/12'
                        : 'text-muted-foreground hover:bg-secondary',
                    )}
                  >
                    <Icon className="size-4 text-primary" aria-hidden />
                    {t(key)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}

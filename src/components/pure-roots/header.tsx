'use client';

import { useEffect, useMemo, useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#verify');

  const links = useMemo(
    () =>
      [
        { href: '#verify', label: t('verify') },
        { href: '#proof', label: t('proof') },
        { href: '#results', label: t('results') },
        { href: '#provenance', label: t('provenance') },
        { href: '#process', label: t('process') },
        { href: '#guarantee', label: t('guarantee') },
      ] as const,
    [t],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [links]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-shadow duration-300',
        scrolled ? 'glass shadow-soft' : 'border-b border-transparent bg-background/40 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:px-8">
        <Link href="/" className="focus-lux group flex min-w-0 items-center gap-3 rounded-md">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold to-copper text-primary-foreground shadow-soft transition-transform duration-500 group-hover:rotate-[8deg]">
            <Leaf className="size-4" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-lg font-semibold tracking-tight">
              Pure Roots
            </span>
            <span className="eyebrow mt-1 hidden text-[9px] sm:block">{t('tagline')}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-muted-foreground xl:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-active={active === l.href}
                className="nav-link focus-lux rounded-sm hover:text-foreground data-[active=true]:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link href="/verify" className="nav-link focus-lux rounded-sm hover:text-foreground">
              {t('certificate')}
            </Link>
          </nav>

          <LanguageSwitcher />
          <ThemeToggle />

          <Link
            href="/verify"
            className="sheen focus-lux hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            {t('orderCta')}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            className="focus-lux grid size-11 shrink-0 place-items-center rounded-full border border-hairline bg-secondary text-foreground xl:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="glass border-t border-hairline xl:hidden">
        <nav aria-label="Mobile" className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="focus-lux flex min-h-11 items-center justify-between rounded-lg px-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
            >
              {l.label}
              <span className="font-mono text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
            </a>
          ))}
          <Link
            href="/verify"
            onClick={() => setOpen(false)}
            className="focus-lux flex min-h-11 items-center justify-between rounded-lg px-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
          >
            {t('certificate')}
            <span className="font-mono text-[10px] text-muted-foreground">07</span>
          </Link>
          <div className="mt-3 border-t border-hairline pt-3">
            <LanguageSwitcher className="w-full [&_button]:w-full [&_button]:max-w-none [&_button]:justify-between" />
          </div>
          <Link
            href="/verify"
            onClick={() => setOpen(false)}
            className="sheen tap mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-soft"
          >
            {t('orderCta')}
          </Link>
        </nav>
      </div>
    </header>
  );
}

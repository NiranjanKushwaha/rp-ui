'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Languages, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { localeList, type AppLocale } from '@/i18n/locales';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('language');
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const current = localeList.find((l) => l.code === locale) ?? localeList[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return localeList;
    return localeList.filter(
      (l) =>
        l.native.toLowerCase().includes(q) ||
        l.english.toLowerCase().includes(q) ||
        l.code.includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    const id = window.setTimeout(() => searchRef.current?.focus(), 40);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('label')}
        onClick={() => setOpen((v) => !v)}
        className="focus-lux tap glass inline-flex h-9 max-w-[9.5rem] items-center gap-1.5 rounded-full px-2.5 text-sm text-foreground sm:max-w-none sm:px-3"
      >
        <Languages className="size-3.5 shrink-0 text-primary" aria-hidden />
        <span className="truncate font-medium leading-none">{current.native}</span>
        <ChevronDown
          className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={t('label')}
          className="lux-card absolute end-0 z-[60] mt-2 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden p-0 shadow-lift"
        >
          <div className="border-b border-hairline bg-surface-2/50 p-3">
            <p className="eyebrow mb-2 block text-[10px] text-primary">{t('label')}</p>
            <div className="relative">
              <Search
                className="pointer-events-none absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search')}
                className="focus-lux h-10 w-full rounded-full border border-hairline bg-card pe-9 ps-9 text-sm text-foreground placeholder:text-muted-foreground"
              />
              {query ? (
                <button
                  type="button"
                  aria-label={t('close')}
                  onClick={() => setQuery('')}
                  className="absolute end-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              ) : null}
            </div>
          </div>

          <ul className="max-h-72 overflow-y-auto overscroll-contain p-1.5">
            {filtered.map((l) => {
              const active = l.code === locale;
              return (
                <li key={l.code}>
                  <Link
                    href={pathname}
                    locale={l.code}
                    role="option"
                    aria-selected={active}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'tap flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
                      active ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary',
                    )}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-hairline bg-card font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {l.code}
                    </span>
                    <span className="min-w-0 flex-1 text-start">
                      <span className="block truncate text-sm font-medium leading-tight" dir="auto">
                        {l.native}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {l.english}
                      </span>
                    </span>
                    {active ? <Check className="size-4 shrink-0 text-primary" aria-hidden /> : null}
                  </Link>
                </li>
              );
            })}
            {filtered.length === 0 ? (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">—</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

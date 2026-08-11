'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search, ShieldAlert, ShieldCheck, Clock3 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { AdminBatchRow } from '@/lib/api';
import { farmerInitials, statusTone } from '@/lib/admin-status';
import { StatusBadge } from './ui-kit';
import { cn } from '@/lib/utils';

type Filter = 'ALL' | 'ACTIVE' | 'PENDING' | 'FAILED' | 'ARCHIVED';

export function BatchesConsole({ rows }: { rows: AdminBatchRow[] }) {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('ALL');

  const counts = useMemo(() => {
    const base = { ALL: rows.length, ACTIVE: 0, PENDING: 0, FAILED: 0, ARCHIVED: 0 };
    for (const r of rows) {
      const s = r.status.toUpperCase() as Exclude<Filter, 'ALL'>;
      if (s in base) base[s] += 1;
    }
    return base;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== 'ALL' && r.status.toUpperCase() !== filter) return false;
      if (!q) return true;
      const hay = `${r.batchCode} ${r.farmer?.name ?? ''} ${r.productName}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query, filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: 'ALL', label: t('filterAll') },
    { id: 'ACTIVE', label: t('filterActive') },
    { id: 'PENDING', label: t('filterPending') },
    { id: 'FAILED', label: t('filterFailed') },
    { id: 'ARCHIVED', label: t('filterArchived') },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <span className="eyebrow text-primary">{t('shellEyebrow')}</span>
          <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
            {t('batchesTitle')}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            {t('batchesBody')}
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {t('showingCount', { shown: filtered.length, total: rows.length })}
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <StatCard
          icon={<ShieldCheck className="size-4" aria-hidden />}
          label={t('statActive')}
          value={counts.ACTIVE}
          tone="pass"
        />
        <StatCard
          icon={<Clock3 className="size-4" aria-hidden />}
          label={t('statPending')}
          value={counts.PENDING}
          tone="pending"
        />
        <StatCard
          icon={<ShieldAlert className="size-4" aria-hidden />}
          label={t('statFailed')}
          value={counts.FAILED}
          tone="failed"
        />
      </div>

      <div className="lux-card mt-6 p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">{t('searchLabel')}</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="focus-lux h-12 w-full rounded-xl border border-input bg-card pr-4 pl-11 text-sm placeholder:text-muted-foreground hover:border-gold/45"
            />
          </label>
          <div
            role="tablist"
            aria-label={t('filterLabel')}
            className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'tap focus-lux shrink-0 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors',
                  filter === f.id
                    ? 'border-gold/45 bg-gold/15 text-foreground'
                    : 'border-hairline bg-secondary/60 text-muted-foreground hover:border-gold/35 hover:text-foreground',
                )}
              >
                {f.label}
                <span className="ml-1.5 opacity-70">{counts[f.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <ul className="mt-5 grid gap-3 md:hidden">
        {filtered.length === 0 ? (
          <li className="lux-card px-5 py-10 text-center text-sm text-muted-foreground">
            {t('emptyFiltered')}
          </li>
        ) : (
          filtered.map((row) => (
            <li key={row.id}>
              <Link
                href={`/admin/batches/${encodeURIComponent(row.batchCode)}`}
                className="lux-card lux-card-hover tap focus-lux block p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm font-semibold tracking-wide">{row.batchCode}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {row.farmer?.name ?? t('unknownFarmer')}
                    </p>
                  </div>
                  <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <StatusBadge tone={statusTone(row.labStatus)}>{row.labStatus}</StatusBadge>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {t('viewBatch')}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </div>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  {formatDate(row.createdAt, locale)}
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>

      {/* Desktop table */}
      <div className="lux-card mt-5 hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-sm">
            <thead>
              <tr className="border-b border-hairline bg-surface-2/50">
                <Th>{t('thBatch')}</Th>
                <Th>{t('thFarmer')}</Th>
                <Th>{t('thCreated')}</Th>
                <Th>{t('thLab')}</Th>
                <Th>{t('thStatus')}</Th>
                <Th className="text-right">{t('thActions')}</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-muted-foreground"
                  >
                    {t('emptyFiltered')}
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-hairline/60 transition-colors last:border-0 hover:bg-accent/25"
                  >
                    <td className="px-5 py-4">
                      <p className="font-mono text-xs font-semibold tracking-wide text-foreground">
                        {row.batchCode}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{row.productName}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 font-mono text-[10px] font-semibold text-primary">
                          {farmerInitials(row.farmer?.name ?? '?')}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-foreground">
                            {row.farmer?.name ?? t('unknownFarmer')}
                          </p>
                          {row.farmer?.location ? (
                            <p className="truncate text-xs text-muted-foreground">
                              {row.farmer.location}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                      {formatDate(row.createdAt, locale)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={statusTone(row.labStatus)}>{row.labStatus}</StatusBadge>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/batches/${encodeURIComponent(row.batchCode)}`}
                        className="focus-lux tap inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-primary hover:underline"
                      >
                        {t('viewBatch')}
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground italic">
        {t('batchesFooterNote')}
      </p>
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={cn(
        'px-5 py-3.5 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground',
        className,
      )}
    >
      {children}
    </th>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: 'pass' | 'pending' | 'failed';
}) {
  const toneCls =
    tone === 'pass'
      ? 'border-success/30 bg-success/8 text-success'
      : tone === 'failed'
        ? 'border-destructive/30 bg-destructive/8 text-destructive'
        : 'border-gold/35 bg-gold/10 text-accent-foreground';

  return (
    <div className="lux-card flex items-center gap-4 p-4 sm:p-5">
      <span className={cn('grid size-11 place-items-center rounded-xl border', toneCls)}>
        {icon}
      </span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
      </div>
    </div>
  );
}

function formatDate(iso: string, locale: string) {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

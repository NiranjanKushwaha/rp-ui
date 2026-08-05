'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export function VerifyHeroForm() {
  const t = useTranslations('home');
  const router = useRouter();
  const [code, setCode] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      router.push('/verify');
      return;
    }
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="relative w-full max-w-md rounded-[1.75rem] border border-white/60 bg-white/90 p-2 shadow-[0_24px_60px_-28px_rgba(15,31,28,0.45)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.2rem] border border-border bg-surface px-4 py-3 shadow-sm shadow-black/5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4zM15 15h2v2h-2zM19 19h1v1h-1zM15 19h1v1h-1zM19 15h1v1h-1z" />
            </svg>
          </span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('heroInputPlaceholder')}
            autoComplete="off"
            className="h-11 w-full min-w-0 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:text-muted"
          />
        </label>

        <button
          type="submit"
          className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-[1.2rem] bg-brand px-5 text-[15px] font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-0 sm:w-auto"
        >
          {t('heroInputCta')}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </form>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-paper/80 px-3 py-2 text-center">
          <p className="font-semibold text-ink">QR Scan</p>
          <p>Instant verify</p>
        </div>
        <div className="rounded-xl border border-border bg-paper/80 px-3 py-2 text-center">
          <p className="font-semibold text-ink">Lab PASS</p>
          <p>Accredited test</p>
        </div>
        <div className="col-span-2 rounded-xl border border-border bg-paper/80 px-3 py-2 text-center sm:col-span-1">
          <p className="font-semibold text-ink">Farmer Trace</p>
          <p>Source visible</p>
        </div>
      </div>
    </div>
  );
}

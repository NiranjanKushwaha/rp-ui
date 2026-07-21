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
    <form
      onSubmit={onSubmit}
      className="anim-pulse-ring flex w-full max-w-md items-center gap-1 rounded-full border border-border bg-surface p-1.5 shadow-lg shadow-brand/10"
    >
      <svg
        viewBox="0 0 24 24"
        className="ml-3 h-5 w-5 shrink-0 text-brand"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4zM15 15h2v2h-2zM19 19h1v1h-1zM15 19h1v1h-1zM19 15h1v1h-1z" />
      </svg>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t('heroInputPlaceholder')}
        autoComplete="off"
        className="h-11 w-full min-w-0 bg-transparent text-sm font-medium text-ink outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="inline-flex h-11 shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-deep active:scale-[0.97]"
      >
        {t('heroInputCta')}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

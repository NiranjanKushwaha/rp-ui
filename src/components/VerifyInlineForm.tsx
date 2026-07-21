'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

export function VerifyInlineForm() {
  const t = useTranslations('home');
  const router = useRouter();
  const [code, setCode] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-2.5 sm:flex-row md:w-auto"
    >
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t('verifyStripPlaceholder')}
        autoComplete="off"
        className="h-11 w-full rounded-lg border border-white/20 bg-forest-light px-4 text-sm text-white placeholder:text-white/50 focus:border-brand focus:outline-none sm:w-64"
      />
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-surface px-5 text-[15px] font-semibold text-forest-deep transition hover:bg-hero-mist active:scale-[0.98]"
      >
        {t('verifyStripCta')}
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

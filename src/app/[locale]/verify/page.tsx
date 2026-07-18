'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button';

export default function VerifyLookupPage() {
  const t = useTranslations('verify');
  const router = useRouter();
  const [code, setCode] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-ink">{t('title')}</h1>
      <p className="mt-3 text-muted">{t('subtitle')}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="sr-only">{t('placeholder')}</span>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('placeholder')}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink shadow-sm outline-none ring-brand focus:ring-2"
            autoComplete="off"
          />
        </label>
        <Button type="submit" className="w-full sm:w-auto">
          {t('submit')}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">{t('hint')}</p>
    </div>
  );
}

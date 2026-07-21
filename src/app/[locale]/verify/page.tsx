'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/Button';

export default function VerifyLookupPage() {
  const t = useTranslations('verify');
  const router = useRouter();
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    setSubmitting(true);
    router.push(`/verify/${encodeURIComponent(trimmed)}`);
  }

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ];

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 md:py-12">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-forest-deep sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted sm:text-base">
          {t('subtitle')}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
              {t('inputLabel')}
            </span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('placeholder')}
              autoComplete="off"
              autoFocus
              className="mt-1.5 h-12 w-full rounded-lg border border-border bg-surface px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <Button
            type="submit"
            disabled={submitting || !code.trim()}
            className="w-full"
          >
            {submitting ? t('loading') : t('submit')}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
            {t('or')}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-brand/40 px-4 py-3.5 text-sm font-semibold text-brand-deep">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4zM15 15h2v2h-2zM19 19h1v1h-1zM15 19h1v1h-1zM19 15h1v1h-1z" />
          </svg>
          {t('scanHint')}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted">{t('hint')}</p>

      <div className="mt-8 border-t border-border pt-6">
        <dl className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-sm font-bold text-ink">{faq.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

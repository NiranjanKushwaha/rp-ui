'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, QrCode, ScanLine, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Field, LuxButton } from '@/components/pure-roots/ui-kit';

export default function VerifyLookupPage() {
  const t = useTranslations('verify');
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setError(t('enterCodeError'));
      return;
    }
    setLoading(true);
    router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="grain spotlight mx-auto w-full max-w-xl px-5 py-14 sm:px-8 sm:py-20">
      <span className="eyebrow text-primary">{t('inputLabel')}</span>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">{t('title')}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{t('subtitle')}</p>

      <form onSubmit={onSubmit} className="lux-card mt-10 p-6 sm:p-8" noValidate>
        <Field
          id="verify-code"
          label={t('inputLabel')}
          name="code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(undefined);
          }}
          placeholder={t('placeholder')}
          autoComplete="off"
          spellCheck={false}
          className="font-mono tracking-[0.18em]"
          leading={<Search className="size-4" aria-hidden />}
          hint={t('hint')}
          error={error}
        />
        <LuxButton
          type="submit"
          size="lg"
          full
          loading={loading}
          icon={<ScanLine className="size-4" />}
          className="mt-5"
        >
          {loading ? t('loading') : t('submit')}
        </LuxButton>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-hairline" />
          {t('or')}
          <span className="h-px flex-1 bg-hairline" />
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <QrCode className="size-4 text-primary" aria-hidden />
          {t('scanHint')}
        </p>
        <button
          type="button"
          onClick={() => {
            setCode('PR-114-0832');
            setError(undefined);
          }}
          className="tap focus-lux mt-4 inline-flex w-full items-center justify-center gap-2 text-sm text-primary hover:underline"
        >
          {t('useSample')}
          <ArrowRight className="size-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}

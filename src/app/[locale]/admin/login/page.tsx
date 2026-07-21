import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminLoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-base font-semibold uppercase tracking-[3px] text-brand-deep">
          Pure Roots
        </p>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
          <h1 className="font-display text-xl font-semibold text-ink">
            {t('loginTitle')}
          </h1>
          <p className="mt-1 text-sm text-muted">{t('loginBody')}</p>
          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
                {t('phoneLabel')}
              </span>
              <input
                disabled
                placeholder="+91 XXXXX XXXXX"
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-paper px-4 text-sm text-muted"
              />
            </label>
            <button
              type="button"
              disabled
              className="h-11 w-full rounded-lg bg-brand/50 text-[15px] font-semibold text-white"
            >
              {t('otpCta')}
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">{t('consoleNote')}</p>
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminLoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-ink">{t('loginTitle')}</h1>
      <p className="mt-3 text-muted">{t('loginBody')}</p>
      <div className="mt-8 space-y-4">
        <input
          disabled
          placeholder="+91 …"
          className="w-full rounded-xl border border-border bg-paper px-4 py-3 text-muted"
        />
        <button
          type="button"
          disabled
          className="w-full rounded-xl bg-brand/60 px-5 py-2.5 text-sm font-medium text-white"
        >
          Request OTP (stub)
        </button>
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LuxButton } from '@/components/pure-roots/ui-kit';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminLoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <div className="grain flex min-h-[60vh] items-center justify-center px-5 py-14 sm:px-8">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-base font-semibold tracking-tight text-foreground">
          Pure Roots
        </p>
        <div className="lux-card mt-4 p-6 sm:p-7">
          <h1 className="font-display text-xl">{t('loginTitle')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t('loginBody')}</p>
          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="eyebrow">{t('phoneLabel')}</span>
              <input
                disabled
                placeholder="+91 XXXXX XXXXX"
                className="mt-1.5 h-11 w-full rounded-lg border border-hairline bg-secondary px-4 text-sm text-muted-foreground"
              />
            </label>
            <LuxButton full disabled>
              {t('otpCta')}
            </LuxButton>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t('consoleNote')}</p>
      </div>
    </div>
  );
}

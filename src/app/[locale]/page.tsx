import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  return (
    <div>
      <section className="relative overflow-hidden bg-hero-mist">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(31,143,136,0.12),_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-display text-4xl font-semibold tracking-tight text-brand-deep sm:text-5xl">
            {t('brand')}
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t('headline')}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t('subhead')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/verify">
              <Button>{t('ctaVerify')}</Button>
            </Link>
            <Link href="/verify">
              <Button variant="secondary">{t('ctaLearn')}</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-ink">{t('pillarsTitle')}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            ['pillarFarm', 'pillarFarmBody'],
            ['pillarLab', 'pillarLabBody'],
            ['pillarSeal', 'pillarSealBody'],
          ].map(([title, body]) => (
            <div key={title} className="space-y-2">
              <h3 className="text-lg font-semibold text-brand-deep">
                {t(title as 'pillarFarm')}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {t(body as 'pillarFarmBody')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold text-ink">{t('evidenceTitle')}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t('evidenceBody')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-semibold text-ink">{t('priceTitle')}</h2>
        <p className="mt-3 max-w-2xl text-muted">{t('priceBody')}</p>
      </section>

      <section className="bg-brand-deep text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {t('verifyStripTitle')}
            </h2>
            <p className="mt-2 text-sm text-white/80">{t('verifyStripBody')}</p>
          </div>
          <Link href="/verify">
            <Button variant="secondary" className="border-0">
              {t('verifyStripCta')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

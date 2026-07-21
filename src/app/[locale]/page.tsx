import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { VerifyInlineForm } from '@/components/VerifyInlineForm';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const proofCards = [
    { num: '01', title: t('pillarLab'), body: t('pillarLabBody') },
    { num: '02', title: t('pillarFarm'), body: t('pillarFarmBody') },
    { num: '03', title: t('pillarSeal'), body: t('pillarSealBody') },
  ];

  const priceCards = [
    { kicker: t('priceStep1Kicker'), title: t('priceStep1Title'), body: t('priceStep1Body') },
    { kicker: t('priceStep2Kicker'), title: t('priceStep2Title'), body: t('priceStep2Body') },
    { kicker: t('priceStep3Kicker'), title: t('priceStep3Title'), body: t('priceStep3Body') },
  ];

  const tests = [
    { icon: '💧', title: t('testWater'), body: t('testWaterBody') },
    { icon: '❄️', title: t('testFreeze'), body: t('testFreezeBody') },
    { icon: '📄', title: t('testPaper'), body: t('testPaperBody') },
    { icon: '🔥', title: t('testSmoke'), body: t('testSmokeBody') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-mist">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-14">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[4px] text-brand">
              {t('brand')}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-forest-deep sm:text-[42px] sm:leading-[1.15]">
              {t('headline')}
            </h1>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
              {t('subhead')}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/verify" className="contents">
                <Button className="w-full sm:w-auto">{t('ctaVerify')}</Button>
              </Link>
              <Link href="/verify" className="contents">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {t('ctaLearn')}
                </Button>
              </Link>
            </div>
            <ul className="mt-5 space-y-1.5">
              {[t('trustBullet1'), t('trustBullet2'), t('trustBullet3')].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-pass"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 shrink-0"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 1 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Product stage */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest-deep to-forest-light p-6 shadow-2xl sm:p-8">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-seed/20 blur-3xl" />
            <div className="relative flex flex-col items-center py-4">
              <span className="rounded-full border border-pass/30 bg-pass-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-pass">
                {t('stageBadge')}
              </span>
              <svg
                viewBox="0 0 120 260"
                className="mt-5 h-52 w-auto drop-shadow-2xl sm:h-64"
                aria-hidden
              >
                <defs>
                  <linearGradient id="oil" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E8B62E" />
                    <stop offset="55%" stopColor="#C9891B" />
                    <stop offset="100%" stopColor="#8F5E0F" />
                  </linearGradient>
                </defs>
                <rect x="42" y="6" width="36" height="18" rx="4" fill="#101E1B" />
                <path
                  d="M46 24h28v22c14 10 24 26 24 48v138a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22V94c0-22 10-38 24-48V24Z"
                  fill="url(#oil)"
                />
                <rect
                  x="34"
                  y="120"
                  width="52"
                  height="76"
                  rx="6"
                  fill="#F2F6F4"
                  opacity="0.92"
                />
                <text
                  x="60"
                  y="150"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#0F1F1C"
                >
                  PURE
                </text>
                <text
                  x="60"
                  y="164"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#0F1F1C"
                >
                  ROOTS
                </text>
                <text
                  x="60"
                  y="183"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#1B7A4E"
                >
                  BATCH #114
                </text>
              </svg>
              <p className="mt-4 text-xs text-white/70">{t('stageCaption')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12">
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[3px] text-brand">
            {t('proofKicker')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-forest-deep sm:text-3xl">
            {t('pillarsTitle')}
          </h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {proofCards.map((card) => (
            <div
              key={card.num}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[1px] text-seed">
                {card.num}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence: lab card + farmer panel */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-12">
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
                  {t('evidenceBatchKicker')}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-forest-deep">
                  {t('evidenceLabTitle')}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-pass-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-pass">
                ✓ {t('evidencePassed')}
              </span>
            </div>
            <dl className="divide-y divide-border text-sm">
              {[
                [t('labAcidValue'), '0.32 (< 0.60)'],
                [t('labArgemone'), t('labNegative')],
                [t('labMoisture'), '0.08%'],
                [t('labAitc'), '0.45%'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2.5"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-semibold text-forest-deep">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/verify/PR-114" className="mt-4 block">
              <Button variant="secondary" className="w-full">
                {t('evidenceCta')}
              </Button>
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-deep to-forest-light p-5 text-white sm:p-6">
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-seed/15 blur-2xl" />
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-seed">
              {t('farmerKicker')}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-seed/40 bg-forest-light font-display text-xl font-semibold text-seed">
                RY
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold">
                  Ramesh Yadav
                </h3>
                <p className="text-sm text-white/70">{t('farmerLocation')}</p>
              </div>
            </div>
            <p className="mt-4 text-sm italic leading-relaxed text-white/85">
              “{t('farmerQuote')}”
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[1px] text-seed/90">
                  {t('farmerAcreage')}
                </p>
                <p className="mt-0.5 font-semibold">12 {t('farmerAcres')}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[1px] text-seed/90">
                  {t('farmerHarvest')}
                </p>
                <p className="mt-0.5 font-semibold">April 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honest price */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[3px] text-seed">
            {t('priceKicker')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-forest-deep sm:text-3xl">
            {t('priceTitle')}
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">{t('priceBody')}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {priceCards.map((card) => (
            <div
              key={card.kicker}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
                {card.kicker}
              </p>
              <h3 className="mt-2 text-base font-bold text-ink">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verify strip */}
      <section className="bg-forest-deep">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-8 sm:px-6 md:flex-row md:py-10">
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl font-semibold text-white">
              {t('verifyStripTitle')}
            </h2>
            <p className="mt-1 text-sm text-white/70">{t('verifyStripBody')}</p>
          </div>
          <VerifyInlineForm />
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-12">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[3px] text-brand">
            {t('eduKicker')}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-forest-deep sm:text-3xl">
            {t('eduTitle')}
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tests.map((test) => (
            <div
              key={test.title}
              className="rounded-xl border border-border bg-surface p-4 sm:p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hero-mist text-lg">
                {test.icon}
              </div>
              <h3 className="mt-3 text-sm font-bold text-ink">{test.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                {test.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

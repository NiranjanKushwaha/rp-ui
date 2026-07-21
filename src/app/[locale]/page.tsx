import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/Reveal';
import { VerifyHeroForm } from '@/components/VerifyHeroForm';
import { VerifyInlineForm } from '@/components/VerifyInlineForm';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const marqueeItems = [
    t('trustBullet1'),
    t('trustBullet2'),
    t('trustBullet3'),
    t('marquee4'),
    t('marquee5'),
    t('marquee6'),
  ];

  const stats = [
    { end: 24, suffix: '', label: t('statParams') },
    { end: 3420, suffix: '+', label: t('statBottles') },
    { end: 8, suffix: '', label: t('statFarmers') },
    { end: 10, suffix: '×', label: t('statGuarantee') },
  ];

  const tests = [
    { icon: '💧', title: t('testWater'), body: t('testWaterBody') },
    { icon: '❄️', title: t('testFreeze'), body: t('testFreezeBody') },
    { icon: '📄', title: t('testPaper'), body: t('testPaperBody') },
    { icon: '🔥', title: t('testSmoke'), body: t('testSmokeBody') },
  ];

  const tickerLines = [
    t('ticker1'),
    t('ticker2'),
    t('ticker3'),
    t('ticker1'),
  ];

  const labRows = [
    { label: t('labAcidValue'), value: '0.32', limit: '< 0.60' },
    { label: t('labArgemone'), value: t('labNegative'), limit: '—' },
    { label: t('labMoisture'), value: '0.08%', limit: '< 0.25%' },
    { label: t('labAitc'), value: '0.45%', limit: '≥ 0.20%' },
  ];

  return (
    <div className="overflow-x-clip">
      {/* ============ HERO ============ */}
      <section className="relative isolate bg-hero-mist">
        <div className="anim-blob pointer-events-none absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-3xl" />
        <div
          className="anim-blob pointer-events-none absolute top-1/3 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-seed/15 blur-3xl"
          style={{ animationDelay: '-7s' }}
        />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pt-16 md:pb-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-surface/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[2px] text-brand-deep backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pass" />
                {t('heroKicker')}
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-forest-deep sm:text-5xl lg:text-6xl">
                {t('headlinePre')}{' '}
                <em className="relative whitespace-nowrap text-brand not-italic">
                  <svg
                    viewBox="0 0 200 12"
                    className="absolute -bottom-1.5 left-0 w-full text-seed"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M2 9C60 3 140 3 198 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                  {t('headlineEm')}
                </em>{' '}
                {t('headlinePost')}
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                {t('subhead')}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-6">
                <VerifyHeroForm />
                <p className="mt-2.5 text-xs text-muted">{t('heroInputHint')}</p>
              </div>
            </Reveal>

            {/* live ticker */}
            <Reveal delay={400}>
              <div className="mt-6 flex max-w-md items-center gap-3 rounded-xl border border-border bg-surface/80 px-4 py-2.5 backdrop-blur">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pass" />
                </span>
                <div className="h-5 flex-1 overflow-hidden">
                  <div
                    className="text-[13px] font-medium leading-5 text-ink/80"
                    style={{ animation: 'ticker-up 9s infinite' }}
                  >
                    {tickerLines.map((line, i) => (
                      <p key={i} className="h-5 truncate">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scan stage */}
          <Reveal delay={200} className="mx-auto w-full max-w-sm md:max-w-none">
            <div className="anim-scan relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-forest-deep via-forest-light to-forest-deep p-6 shadow-2xl sm:p-8">
              {/* corner brackets */}
              {[
                'top-4 left-4 border-t-2 border-l-2 rounded-tl-lg',
                'top-4 right-4 border-t-2 border-r-2 rounded-tr-lg',
                'bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg',
                'bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg',
              ].map((pos) => (
                <span
                  key={pos}
                  className={`pointer-events-none absolute h-8 w-8 border-brand/70 ${pos}`}
                />
              ))}

              <div className="flex flex-col items-center py-2">
                <span className="shimmer inline-flex items-center gap-1.5 rounded-full border border-pass/30 bg-pass-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-pass">
                  ✓ {t('stageBadge')}
                </span>

                <div className="anim-float mt-6">
                  <svg
                    viewBox="0 0 120 260"
                    className="h-56 w-auto drop-shadow-[0_24px_32px_rgba(0,0,0,0.45)] sm:h-64"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="oil" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#F0C244" />
                        <stop offset="55%" stopColor="#C9891B" />
                        <stop offset="100%" stopColor="#8F5E0F" />
                      </linearGradient>
                    </defs>
                    <rect x="42" y="6" width="36" height="18" rx="4" fill="#101E1B" />
                    <path
                      d="M46 24h28v22c14 10 24 26 24 48v138a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22V94c0-22 10-38 24-48V24Z"
                      fill="url(#oil)"
                    />
                    <rect x="34" y="120" width="52" height="76" rx="6" fill="#F2F6F4" opacity="0.94" />
                    <text x="60" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F1F1C">PURE</text>
                    <text x="60" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F1F1C">ROOTS</text>
                    <rect x="46" y="170" width="28" height="18" rx="2" fill="#0F1F1C" opacity="0.9" />
                    <text x="60" y="182" textAnchor="middle" fontSize="6" fill="#E8F1EF">QR</text>
                  </svg>
                </div>

                <p className="mt-5 text-xs tracking-wide text-white/60">
                  {t('stageCaption')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="border-y border-border bg-surface py-3.5">
        <div className="flex overflow-hidden" aria-hidden>
          <div className="anim-marquee flex shrink-0 items-center gap-8 pr-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 whitespace-nowrap text-[12px] font-semibold uppercase tracking-[2.5px] text-muted"
              >
                {item}
                <span className="text-seed">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-forest-deep">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-4 md:py-12">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="text-center">
              <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </p>
              <p className="mx-auto mt-1.5 max-w-[11rem] text-xs leading-snug text-white/60 sm:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ BENTO PROOF GRID ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[3px] text-brand">
            {t('proofKicker')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-forest-deep sm:text-4xl">
            {t('pillarsTitle')}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {/* Lab report — hero cell */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="bento-card h-full rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted">
                    {t('evidenceBatchKicker')}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-forest-deep">
                    {t('evidenceLabTitle')}
                  </h3>
                </div>
                <span className="shimmer inline-flex items-center gap-1.5 rounded-full bg-pass-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-pass">
                  ✓ {t('evidencePassed')}
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-border">
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 bg-paper px-4 py-2 text-[10px] font-semibold uppercase tracking-[1px] text-muted">
                  <span>{t('labColParam')}</span>
                  <span className="text-right">{t('labColLimit')}</span>
                  <span className="w-16 text-right">{t('labColResult')}</span>
                </div>
                {labRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-t border-border px-4 py-3 text-sm transition-colors hover:bg-hero-mist/50"
                  >
                    <span className="text-ink">{row.label}</span>
                    <span className="text-right text-xs italic text-muted">
                      {row.limit}
                    </span>
                    <span className="w-16 text-right font-bold text-pass">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Link href="/verify/PR-114" className="contents">
                  <Button className="w-full sm:w-auto">{t('evidenceCta')}</Button>
                </Link>
                <Link href="/verify" className="contents">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {t('ctaVerify')}
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Farmer */}
          <Reveal delay={120} className="md:row-span-2">
            <div className="bento-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest-light bg-gradient-to-br from-forest-deep to-forest-light p-5 text-white sm:p-6">
              <div className="anim-blob pointer-events-none absolute -right-14 -bottom-14 h-44 w-44 rounded-full bg-seed/20 blur-2xl" />
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-seed">
                {t('farmerKicker')}
              </p>
              <div className="mt-4 flex items-center gap-3.5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-seed/40 bg-forest-light font-display text-lg font-semibold text-seed">
                  RY
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">Ramesh Yadav</h3>
                  <p className="text-sm text-white/60">{t('farmerLocation')}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-white/80">
                “{t('farmerQuote')}”
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
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
          </Reveal>

          {/* Guarantee */}
          <Reveal delay={80} className="md:col-span-2">
            <div className="bento-card flex h-full flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:p-6">
              <p className="font-display text-6xl font-semibold leading-none text-seed sm:text-7xl">
                10×
              </p>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {t('pillarSeal')}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {t('pillarSealBody')}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Traceability */}
          <Reveal delay={160}>
            <div className="bento-card h-full rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <p className="font-display text-3xl">🌾</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                {t('pillarFarm')}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t('pillarFarmBody')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ HONEST PRICE ============ */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[3px] text-seed">
                {t('priceKicker')}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-forest-deep sm:text-4xl">
                {t('priceTitle')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {t('priceBody')}
              </p>
            </Reveal>
            <div className="space-y-3">
              {[
                { kicker: t('priceStep1Kicker'), title: t('priceStep1Title'), body: t('priceStep1Body') },
                { kicker: t('priceStep2Kicker'), title: t('priceStep2Title'), body: t('priceStep2Body') },
                { kicker: t('priceStep3Kicker'), title: t('priceStep3Title'), body: t('priceStep3Body') },
              ].map((step, i) => (
                <Reveal key={step.kicker} delay={i * 110}>
                  <div className="bento-card flex gap-4 rounded-xl border border-border bg-paper p-4 sm:p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-seed/15 font-display text-sm font-semibold text-seed">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[1px] text-muted">
                        {step.kicker}
                      </p>
                      <h3 className="mt-0.5 text-sm font-bold text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ EDUCATION ============ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[3px] text-brand">
            {t('eduKicker')}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-forest-deep sm:text-4xl">
            {t('eduTitle')}
          </h2>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tests.map((test, i) => (
            <Reveal key={test.title} delay={i * 90}>
              <div className="bento-card group h-full rounded-2xl border border-border bg-surface p-4 sm:p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-hero-mist text-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {test.icon}
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink">{test.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {test.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ VERIFY CTA BAND ============ */}
      <section className="relative isolate overflow-hidden bg-forest-deep">
        <div className="anim-blob pointer-events-none absolute -top-20 left-1/4 -z-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:py-14">
          <Reveal className="text-center md:text-left">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {t('verifyStripTitle')}
            </h2>
            <p className="mt-1.5 text-sm text-white/70">{t('verifyStripBody')}</p>
          </Reveal>
          <Reveal delay={120} className="w-full md:w-auto">
            <VerifyInlineForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/Button';
import { fetchVerify } from '@/lib/api';

type Props = {
  params: Promise<{ locale: string; code: string }>;
};

type BannerState = 'pass' | 'pending' | 'failed';

function bannerState(status: string, labStatus?: string): BannerState {
  const s = status.toUpperCase();
  const lab = labStatus?.toUpperCase();
  if (s === 'FAILED' || lab === 'FAIL') return 'failed';
  if (s === 'ACTIVE' && lab === 'PASS') return 'pass';
  return 'pending';
}

const bannerStyles: Record<
  BannerState,
  { wrap: string; icon: string; title: string }
> = {
  pass: {
    wrap: 'border-pass/20 bg-pass-soft',
    icon: 'bg-pass text-white',
    title: 'text-pass',
  },
  pending: {
    wrap: 'border-pending/20 bg-pending-soft',
    icon: 'bg-pending text-white',
    title: 'text-pending',
  },
  failed: {
    wrap: 'border-fail/20 bg-fail-soft',
    icon: 'bg-fail text-white',
    title: 'text-fail',
  },
};

export default async function VerifyResultPage({ params }: Props) {
  const { locale, code: raw } = await params;
  setRequestLocale(locale);
  const code = decodeURIComponent(raw);
  const t = await getTranslations('verify');

  let result: Awaited<ReturnType<typeof fetchVerify>>;
  try {
    result = await fetchVerify(code);
  } catch {
    return (
      <EmptyState title={t('error')} back={t('back')} code={code} />
    );
  }

  if (!result.ok) {
    return (
      <EmptyState title={t('notFound')} body={t('notFoundBody')} back={t('back')} code={code} />
    );
  }

  const { data } = result;
  const state = bannerState(data.status, data.lab?.status);
  const styles = bannerStyles[state];
  const displayCode = data.serialCode ?? data.batchCode;

  const bannerTitle =
    state === 'pass'
      ? t('bannerPass', { code: displayCode })
      : state === 'pending'
        ? t('bannerPending', { code: displayCode })
        : t('bannerFailed', { code: displayCode });

  const bannerBody =
    state === 'pass'
      ? t('bannerPassBody', {
          batch: data.batchCode,
          date: data.lab
            ? new Date(data.lab.testedAt).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : '—',
        })
      : state === 'pending'
        ? t('bannerPendingBody')
        : t('bannerFailedBody');

  const labRows = data.lab
    ? [
        {
          label: t('ri'),
          range: '1.4646 – 1.4662',
          value: String(data.lab.params.refractiveIndex),
        },
        {
          label: t('aitc'),
          range: '≥ 0.20%',
          value: `${data.lab.params.aitcPercent}%`,
        },
        {
          label: t('argemone'),
          range: t('labNegative'),
          value: data.lab.params.argemone,
        },
        {
          label: t('acidValue'),
          range: '≤ 1.5',
          value: String(data.lab.params.acidValue),
        },
      ]
    : [];

  const labPassed = data.lab?.status.toUpperCase() === 'PASS';

  const shareText = encodeURIComponent(
    `${t('shareText', { code: displayCode })} — https://pureroots.in/${locale}/verify/${encodeURIComponent(displayCode)}`,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6 md:py-8">
      {/* Status banner */}
      <section
        className={`flex flex-col items-center gap-3 rounded-xl border p-4 text-center sm:flex-row sm:items-start sm:p-5 sm:text-left ${styles.wrap}`}
      >
        <span
          className={`anim-badge-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${styles.icon}`}
        >
          {state === 'pass' ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          ) : state === 'pending' ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          )}
        </span>
        <div>
          <h1 className={`font-display text-xl font-semibold sm:text-2xl ${styles.title}`}>
            {bannerTitle}
          </h1>
          <p className="mt-1 text-sm text-ink/80">{bannerBody}</p>
        </div>
      </section>

      {/* Evidence row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Lab certificate */}
        <section className="flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                {t('labCardTitle')}
              </h2>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-muted">
                {data.lab
                  ? t('labAccredited', { lab: data.lab.labName })
                  : t('labNoReport')}
              </p>
            </div>
            {data.lab && (
              <div className="text-right text-xs text-muted">
                <p className="font-semibold uppercase tracking-[1px] text-ink">
                  {data.lab.labName}
                </p>
                <p className="mt-0.5">
                  {new Date(data.lab.testedAt).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>

          {data.lab ? (
            <>
              <div className="mt-4 border-t border-border">
                {labRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 border-b border-border py-2.5"
                  >
                    <span className="text-sm text-muted">{row.label}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="text-xs italic text-muted">
                        {row.range}
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          labPassed ? 'text-pass' : 'text-ink'
                        }`}
                      >
                        {row.value}
                        {labPassed ? ` ${t('passLabel')}` : ''}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="secondary" className="mt-4 w-full sm:w-fit" disabled>
                {t('viewPdf')}
              </Button>
            </>
          ) : (
            <p className="mt-4 rounded-lg bg-pending-soft p-4 text-sm text-pending">
              {t('labPendingNote')}
            </p>
          )}
        </section>

        {/* Named farmer */}
        <section className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-forest-deep to-forest-light p-5 text-white sm:p-6">
          <div className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-seed/15 blur-3xl" />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-seed">
              {t('farmerKicker')}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-seed/40 bg-forest-light font-display text-xl font-semibold text-seed">
                {data.farmer.name
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold">
                  {data.farmer.name}
                </h2>
                <p className="text-sm text-white/70">{data.farmer.location}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[1px] text-white/50">
                  {t('batch')}
                </p>
                <p className="mt-0.5 font-semibold">{data.batchCode}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[1px] text-white/50">
                  {t('product')}
                </p>
                <p className="mt-0.5 font-semibold">{data.productName}</p>
              </div>
            </div>
          </div>
          <p className="relative mt-6 text-xs text-white/50">
            {t('farmerConsentNote')}
          </p>
        </section>
      </div>

      {/* Guarantee */}
      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
          {t('guaranteeTitle')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {t('guaranteeBody', { batch: data.batchCode })}
        </p>
        <Button className="mt-4 w-full sm:w-auto" disabled>
          {t('guaranteeCta')}
        </Button>
      </section>

      {/* Bottom actions */}
      <div className="flex flex-col items-center justify-between gap-3 pb-2 sm:flex-row">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand transition-colors hover:text-brand-deep"
        >
          {t('shareWhatsApp')} →
        </a>
        <Link href="/verify">
          <Button variant="secondary">{t('back')}</Button>
        </Link>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  body,
  back,
  code,
}: {
  title: string;
  body?: string;
  back: string;
  code: string;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pending-soft text-pending">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted">{body ?? code}</p>
      <Link href="/verify" className="mt-6 inline-block">
        <Button variant="secondary">{back}</Button>
      </Link>
    </div>
  );
}

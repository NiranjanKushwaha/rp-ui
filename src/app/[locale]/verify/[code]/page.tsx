import {
  ArrowLeft,
  Award,
  Droplets,
  FlaskConical,
  MapPin,
  ScanLine,
  Sprout,
  Thermometer,
} from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { fetchVerify } from '@/lib/api';
import { ResultBanner, type Verdict } from '@/components/pure-roots/result-banner';
import {
  DataTable,
  EmptyState,
  LuxButton,
  MetaChip,
  StatusBadge,
} from '@/components/pure-roots/ui-kit';

type Props = {
  params: Promise<{ locale: string; code: string }>;
};

function toVerdict(status: string, labStatus?: string): Verdict {
  const s = status.toUpperCase();
  const lab = labStatus?.toUpperCase();
  if (s === 'FAILED' || lab === 'FAIL') return 'failed';
  if (s === 'ACTIVE' && lab === 'PASS') return 'pass';
  return 'pending';
}

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
      <VerifyShell>
        <EmptyState
          icon={<ScanLine className="size-7" aria-hidden />}
          title={t('error')}
          body={code}
          action={
            <Link href="/verify">
              <LuxButton variant="secondary">{t('back')}</LuxButton>
            </Link>
          }
        />
      </VerifyShell>
    );
  }

  if (!result.ok) {
    return (
      <VerifyShell>
        <EmptyState
          icon={<ScanLine className="size-7" aria-hidden />}
          title={t('notFound')}
          body={t('notFoundBody')}
          action={
            <Link href="/verify">
              <LuxButton variant="secondary">{t('back')}</LuxButton>
            </Link>
          }
        />
      </VerifyShell>
    );
  }

  const { data } = result;
  const verdict = toVerdict(data.status, data.lab?.status);
  const displayCode = data.serialCode ?? data.batchCode;
  const sealedOn = data.lab
    ? new Date(data.lab.testedAt).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  const assayRows: Array<[string, string, string]> = data.lab
    ? [
        [t('ri'), String(data.lab.params.refractiveIndex), '1.4646 – 1.4662'],
        [t('aitc'), `${data.lab.params.aitcPercent}%`, '≥ 0.20%'],
        [t('argemone'), data.lab.params.argemone, t('labNegative')],
        [t('acidValue'), String(data.lab.params.acidValue), '≤ 1.5'],
      ]
    : [];

  const shareText = encodeURIComponent(
    `${t('shareText', { code: displayCode })} https://pureroots.in/${locale}/verify/${encodeURIComponent(displayCode)}`,
  );

  return (
    <VerifyShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/verify"
          className="focus-lux tap inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t('back')}
        </Link>
        <StatusBadge tone={verdict} pulse={verdict === 'pass'}>
          {displayCode}
        </StatusBadge>
      </div>

      <div className="mt-8">
        <ResultBanner
          verdict={verdict}
          batch={displayCode}
          hash={data.batchCode}
          sealedOn={sealedOn}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <section aria-labelledby="assay-h" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 id="assay-h" className="font-display text-xl sm:text-2xl">
              {t('labCardTitle')}
            </h2>
            <StatusBadge tone={verdict}>
              {data.lab
                ? verdict === 'pass'
                  ? `${assayRows.length} of ${assayRows.length} passed`
                  : verdict === 'pending'
                    ? 'Awaiting sign-off'
                    : 'Did not pass'
                : t('labNoReport')}
            </StatusBadge>
          </div>

          {data.lab ? (
            <>
              <DataTable
                caption={t('labAccredited', { lab: data.lab.labName })}
                columns={['Parameter', 'Result', 'Specification', 'Verdict']}
                rows={assayRows.map(([p, r, s]) => [
                  p,
                  <span key={`${p}-r`} className="font-mono text-xs text-foreground">
                    {r}
                  </span>,
                  s,
                  <StatusBadge key={`${p}-v`} tone={verdict} />,
                ])}
              />

              <div className="lux-card emboss mt-6 flex flex-wrap items-center gap-4 p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-gold/35 bg-gold/10 text-primary">
                  <Award className="size-6" strokeWidth={1.7} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg">{t('viewPdf')}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Signed PDF with lab letterhead — coming soon.
                  </p>
                </div>
                <LuxButton variant="secondary" disabled>
                  {t('viewPdf')}
                </LuxButton>
              </div>
            </>
          ) : (
            <p className="lux-card p-5 text-sm text-muted-foreground">{t('labPendingNote')}</p>
          )}

          <section className="lux-card mt-6 p-5 sm:p-6">
            <h3 className="font-display text-lg">{t('guaranteeTitle')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t('guaranteeBody', { batch: data.batchCode })}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <LuxButton disabled>{t('guaranteeCta')}</LuxButton>
              <a
                href={`https://wa.me/?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuxButton variant="outline">{t('shareWhatsApp')}</LuxButton>
              </a>
            </div>
          </section>
        </section>

        <aside className="grid content-start gap-6">
          <section className="lux-card lux-card-hover overflow-hidden" aria-label="Farmer provenance">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/farmer-portrait.jpg"
              alt={data.farmer.name}
              loading="lazy"
              className="h-48 w-full object-cover grayscale-[0.35] transition-[filter] duration-500 hover:grayscale-0"
            />
            <div className="p-5">
              <span className="eyebrow">{t('farmerKicker')}</span>
              <p className="mt-1.5 font-display text-xl">{data.farmer.name}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" aria-hidden />
                {data.farmer.location}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <MetaChip icon={<Sprout className="size-3.5" />} label={t('batch')} value={data.batchCode} />
                <MetaChip label={t('product')} value={data.productName} />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{t('farmerConsentNote')}</p>
            </div>
          </section>

          <section className="lux-card relative overflow-hidden" aria-label="Press conditions">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/oil-macro.jpg"
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-20"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-card via-card/90 to-card/60" />
            <div className="relative p-5">
              <span className="eyebrow">Press conditions</span>
              <ul className="mt-4 grid gap-3 text-sm">
                <li className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Thermometer className="size-4 text-primary" aria-hidden /> Peak temp
                  </span>
                  <span className="font-mono text-xs">37.2 °C</span>
                </li>
                <li className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Droplets className="size-4 text-primary" aria-hidden /> Yield
                  </span>
                  <span className="font-mono text-xs">31.8 %</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <FlaskConical className="size-4 text-primary" aria-hidden /> Filtration
                  </span>
                  <span className="font-mono text-xs">Sediment only</span>
                </li>
              </ul>
            </div>
          </section>
        </aside>
      </div>
    </VerifyShell>
  );
}

function VerifyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">{children}</div>
  );
}

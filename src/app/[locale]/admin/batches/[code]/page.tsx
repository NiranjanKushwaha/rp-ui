import {
  ArrowLeft,
  ExternalLink,
  FlaskConical,
  MapPin,
  ScanLine,
} from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { fetchAdminBatch } from '@/lib/api';
import { farmerInitials, statusTone } from '@/lib/admin-status';
import { BatchLifecycle } from '@/components/pure-roots/batch-lifecycle';
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

export default async function AdminBatchDetailPage({ params }: Props) {
  const { locale, code: raw } = await params;
  setRequestLocale(locale);
  const code = decodeURIComponent(raw);
  const t = await getTranslations('admin');
  const tv = await getTranslations('verify');

  let batchRes: Awaited<ReturnType<typeof fetchAdminBatch>>;
  try {
    batchRes = await fetchAdminBatch(code);
  } catch {
    return (
      <DetailShell>
        <EmptyState
          icon={<ScanLine className="size-7" aria-hidden />}
          title={t('apiErrorTitle')}
          body={t('apiErrorBody')}
          tone="failed"
          action={
            <Link href="/admin/batches">
              <LuxButton variant="secondary">{t('backToBatches')}</LuxButton>
            </Link>
          }
        />
      </DetailShell>
    );
  }

  if (!batchRes.ok) {
    return (
      <DetailShell>
        <EmptyState
          icon={<ScanLine className="size-7" aria-hidden />}
          title={t('batchNotFoundTitle')}
          body={t('batchNotFoundBody', { code })}
          action={
            <Link href="/admin/batches">
              <LuxButton variant="secondary">{t('backToBatches')}</LuxButton>
            </Link>
          }
        />
      </DetailShell>
    );
  }

  const batch = batchRes.data;
  const farmer = batch.farmer;
  const lab = batch.lab;
  const labStatus = lab?.status?.toUpperCase() ?? 'PENDING';
  const created = new Date(batch.createdAt).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const testedOn = lab
    ? new Date(lab.testedAt).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  const assayRows: Array<[string, string, string]> = lab
    ? [
        [tv('ri'), String(lab.params.refractiveIndex), '1.4646 – 1.4662'],
        [tv('aitc'), `${lab.params.aitcPercent}%`, '≥ 0.20%'],
        [tv('argemone'), lab.params.argemone, tv('labNegative')],
        [tv('acidValue'), String(lab.params.acidValue), '≤ 1.5'],
      ]
    : [];

  const labTone = statusTone(labStatus);
  const statusToneVal = statusTone(batch.status);

  return (
    <DetailShell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/batches"
          className="focus-lux tap inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t('backToBatches')}
        </Link>
        <Link
          href={`/verify/${encodeURIComponent(batch.batchCode)}`}
          className="focus-lux tap inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 text-sm text-muted-foreground hover:border-gold/40 hover:text-foreground"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          {t('openPublicCertificate')}
        </Link>
      </div>

      <header className="mt-8 flex flex-col gap-5 border-b border-hairline pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="eyebrow text-primary">{t('detailEyebrow')}</span>
          <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
            {batch.batchCode}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{batch.productName}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <MetaChip label={t('thCreated')} value={created} />
            <MetaChip label={t('batchNumber')} value={String(batch.batchNumber)} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <StatusBadge tone={labTone} pulse={labTone === 'pass'}>
            {t('thLab')}: {labStatus}
          </StatusBadge>
          <StatusBadge tone={statusToneVal}>
            {t('thStatus')}: {batch.status}
          </StatusBadge>
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="grid content-start gap-6">
          <BatchLifecycle
            batchCode={batch.batchCode}
            status={batch.status}
            labStatus={lab?.status ?? null}
          />

          <section aria-labelledby="lab-h">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 id="lab-h" className="font-display text-xl sm:text-2xl">
                {tv('labCardTitle')}
              </h2>
              <StatusBadge tone={labTone}>{labStatus}</StatusBadge>
            </div>

            {lab ? (
              <DataTable
                caption={tv('labAccredited', { lab: lab.labName })}
                columns={[
                  t('thParameter'),
                  t('thResult'),
                  t('thSpec'),
                  t('thVerdict'),
                ]}
                rows={assayRows.map(([p, r, s]) => [
                  p,
                  <span key={`${p}-r`} className="font-mono text-xs text-foreground">
                    {r}
                  </span>,
                  s,
                  <StatusBadge key={`${p}-v`} tone={labTone} />,
                ])}
              />
            ) : (
              <div className="lux-card flex items-start gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/35 bg-gold/10 text-primary">
                  <FlaskConical className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg">{tv('labNoReport')}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {tv('labPendingNote')}
                  </p>
                </div>
              </div>
            )}

            {lab ? (
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {t('testedOn')}: {testedOn} · {lab.labName}
              </p>
            ) : null}
          </section>
        </div>

        <aside className="grid content-start gap-6">
          <section className="lux-card p-5" aria-label={t('farmerCardTitle')}>
            <span className="eyebrow">{t('farmerCardTitle')}</span>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full border border-gold/35 bg-gold/12 font-mono text-sm font-semibold text-primary">
                {farmerInitials(farmer?.name ?? '?')}
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl">
                  {farmer?.name ?? t('unknownFarmer')}
                </p>
                {farmer?.location ? (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden />
                    {farmer.location}
                  </p>
                ) : null}
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{tv('farmerConsentNote')}</p>
          </section>

          <section className="lux-card p-5">
            <span className="eyebrow">{t('ruleCardTitle')}</span>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('ruleCardBody')}
            </p>
          </section>

          <section className="lux-card p-5" aria-labelledby="history-h">
            <h2 id="history-h" className="font-display text-lg">
              {t('historyTitle')}
            </h2>
            {(batch.statusHistory?.length ?? 0) === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{t('historyEmpty')}</p>
            ) : (
              <ol className="mt-4 space-y-3">
                {batch.statusHistory!.map((ev) => (
                  <li
                    key={ev.id}
                    className="border-b border-hairline pb-3 last:border-0 last:pb-0"
                  >
                    <p className="font-mono text-xs text-foreground">
                      {(ev.fromStatus ?? '—') + ' → ' + ev.toStatus}
                    </p>
                    {ev.note ? (
                      <p className="mt-1 text-xs text-muted-foreground">{ev.note}</p>
                    ) : null}
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {new Date(ev.createdAt).toLocaleString(locale)}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </aside>
      </div>
    </DetailShell>
  );
}

function DetailShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {children}
    </div>
  );
}

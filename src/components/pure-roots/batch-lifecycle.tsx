'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Archive, CheckCircle2, FlaskConical } from 'lucide-react';
import { patchBatchStatus, upsertBatchLab } from '@/lib/api';
import { LuxButton } from './ui-kit';

type Props = {
  batchCode: string;
  status: string;
  labStatus: string | null;
};

const PASS_DEFAULTS = {
  status: 'PASS' as const,
  labName: 'Pure Roots Partner Lab',
  refractiveIndex: 1.4655,
  aitcPercent: 0.34,
  argemone: 'Not Detected',
  acidValue: 'Within limit',
};

const FAIL_DEFAULTS = {
  status: 'FAIL' as const,
  labName: 'Pure Roots Partner Lab',
  refractiveIndex: 1.452,
  aitcPercent: 0.12,
  argemone: 'Detected',
  acidValue: 'Above limit',
};

export function BatchLifecycle({ batchCode, status, labStatus }: Props) {
  const t = useTranslations('admin');
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const upper = status.toUpperCase();
  const lab = labStatus?.toUpperCase() ?? null;
  const canActivate = lab === 'PASS' && upper !== 'ACTIVE' && upper !== 'ARCHIVED';
  const canFail = upper === 'PENDING';
  const canArchive = upper !== 'ARCHIVED';
  const canRecordLab = upper !== 'ARCHIVED';

  async function runStatus(next: string) {
    setError(null);
    setBusy(next);
    try {
      const res = await patchBatchStatus(batchCode, next);
      if (!res.ok) {
        setError(res.message);
        return;
      }
      router.refresh();
    } catch {
      setError(t('apiErrorTitle'));
    } finally {
      setBusy(null);
    }
  }

  async function runLab(kind: 'PASS' | 'FAIL') {
    setError(null);
    setBusy(`LAB_${kind}`);
    try {
      const res = await upsertBatchLab(
        batchCode,
        kind === 'PASS' ? PASS_DEFAULTS : FAIL_DEFAULTS,
      );
      if (!res.ok) {
        setError(res.message);
        return;
      }
      router.refresh();
    } catch {
      setError(t('apiErrorTitle'));
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="lux-card p-5 sm:p-6" aria-labelledby="lifecycle-h">
      <h2 id="lifecycle-h" className="font-display text-xl">
        {t('lifecycleTitle')}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('lifecycleBody')}</p>

      <div className="mt-5 rounded-xl border border-gold/30 bg-gold/8 px-4 py-3.5 text-sm">
        <p className="font-medium text-foreground">{t('labGateTitle')}</p>
        <p className="mt-1 text-muted-foreground">{t('labGateBody')}</p>
        {lab !== 'PASS' && upper !== 'ACTIVE' ? (
          <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-accent-foreground">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {t('labGateBlocked')}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <LuxButton
          loading={busy === 'ACTIVE'}
          disabled={!canActivate || !!busy}
          icon={<CheckCircle2 className="size-4" aria-hidden />}
          onClick={() => void runStatus('ACTIVE')}
        >
          {t('actionActivate')}
        </LuxButton>
        <LuxButton
          variant="danger"
          loading={busy === 'FAILED'}
          disabled={!canFail || !!busy}
          icon={<AlertTriangle className="size-4" aria-hidden />}
          onClick={() => void runStatus('FAILED')}
        >
          {t('actionFail')}
        </LuxButton>
        <LuxButton
          variant="secondary"
          loading={busy === 'ARCHIVED'}
          disabled={!canArchive || !!busy}
          icon={<Archive className="size-4" aria-hidden />}
          onClick={() => void runStatus('ARCHIVED')}
        >
          {t('actionArchive')}
        </LuxButton>
      </div>

      <div className="mt-6 border-t border-hairline pt-5">
        <p className="font-display text-base">{t('labUploadTitle')}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t('labUploadBody')}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <LuxButton
            variant="outline"
            loading={busy === 'LAB_PASS'}
            disabled={!canRecordLab || !!busy}
            icon={<FlaskConical className="size-4" aria-hidden />}
            onClick={() => void runLab('PASS')}
          >
            {t('labRecordPass')}
          </LuxButton>
          <LuxButton
            variant="outline"
            loading={busy === 'LAB_FAIL'}
            disabled={!canRecordLab || !!busy}
            icon={<AlertTriangle className="size-4" aria-hidden />}
            onClick={() => void runLab('FAIL')}
          >
            {t('labRecordFail')}
          </LuxButton>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ArrowRight, QrCode, ScanLine, Search, ShieldCheck } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Section } from './primitives';
import { Field, LuxButton, MetaChip, StatusBadge } from './ui-kit';

type Status = 'idle' | 'loading' | 'error';

export function VerifyPanel() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    router.push(`/verify/${encodeURIComponent(clean)}`);
  };

  return (
    <Section id="verify">
      <div className="glass grain relative overflow-hidden rounded-[1.75rem] p-6 shadow-lift sm:p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gold/20 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-16 size-72 rounded-full bg-olive/15 blur-[120px]"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="eyebrow text-primary">Authenticate</span>
              <StatusBadge tone="pass" pulse>
                Registry online
              </StatusBadge>
            </div>
            <h2 className="text-3xl leading-[1.06] text-balance sm:text-4xl md:text-[2.75rem]">
              Enter your batch code. Read the whole story.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every cap carries a code and a QR. Both resolve to the same record: harvest date,
              press temperature, lab assay, and named farmer.
            </p>

            <form onSubmit={onSubmit} className="mt-8" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <Field
                    id="batch-code"
                    label="Batch or bottle code"
                    name="batch-code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setStatus('idle');
                    }}
                    placeholder="PR-114-0832"
                    autoComplete="off"
                    spellCheck={false}
                    className="font-mono tracking-[0.18em]"
                    leading={<Search className="size-4" aria-hidden />}
                    hint={
                      status === 'idle' || status === 'loading'
                        ? 'Try PR-114 or PR-114-0832 · printed under the cap'
                        : undefined
                    }
                    error={
                      status === 'error' ? 'Enter a batch or bottle code to verify.' : undefined
                    }
                  />
                </div>
                <LuxButton
                  type="submit"
                  size="lg"
                  loading={status === 'loading'}
                  icon={<ScanLine className="size-4" />}
                  className="sm:mt-[1.85rem]"
                >
                  {status === 'loading' ? 'Checking' : 'Verify'}
                </LuxButton>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MetaChip icon={<ShieldCheck className="size-3.5" />} label="Demo" value="PR-114-0832" />
                <Link href="/verify/PR-114-0832">
                  <LuxButton variant="secondary" size="sm" icon={<ArrowRight className="size-4" />}>
                    Open sample certificate
                  </LuxButton>
                </Link>
              </div>
            </form>
          </div>

          <div className="lux-card lux-card-hover inner-light w-full max-w-xs p-6 text-center lg:w-64">
            <div className="relative mx-auto grid size-24 place-items-center overflow-hidden rounded-2xl border border-hairline bg-surface-2">
              <QrCode className="size-12 text-primary" strokeWidth={1.6} aria-hidden />
              <span
                aria-hidden
                className="pr-scan-line pointer-events-none absolute inset-x-0 h-8 bg-linear-to-b from-transparent via-gold/45 to-transparent"
              />
            </div>
            <p className="mt-4 font-display text-lg">Scan instead</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Point any camera at the seal. No app, no account.
            </p>
            <Link href="/verify">
              <LuxButton variant="outline" size="sm" full className="mt-4">
                Open verify page
              </LuxButton>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

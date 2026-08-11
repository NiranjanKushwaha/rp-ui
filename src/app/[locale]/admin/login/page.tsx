'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Leaf } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';
import { getApiUrl } from '@/lib/api';
import { LuxButton, Field } from '@/components/pure-roots/ui-kit';
import { ThemeToggle } from '@/components/pure-roots/theme-toggle';
import { LanguageSwitcher } from '@/components/pure-roots/language-switcher';

const TOKEN_KEY = 'pr-admin-token';

export default function AdminLoginPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [phone, setPhone] = useState('+919999000001');
  const [code, setCode] = useState('');
  const [debugHint, setDebugHint] = useState<string | null>(null);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function requestOtp() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`${getApiUrl()}/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const body = (await res.json()) as { message?: string; debugCode?: string };
      if (!res.ok) {
        setError(body.message ?? t('otpError'));
        return;
      }
      setDebugHint(body.debugCode ?? null);
      setStep('otp');
    } catch {
      setError(t('apiErrorTitle'));
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(`${getApiUrl()}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const body = (await res.json()) as {
        accessToken?: string;
        message?: string;
      };
      if (!res.ok || !body.accessToken) {
        setError(body.message ?? t('otpError'));
        return;
      }
      localStorage.setItem(TOKEN_KEY, body.accessToken);
      router.push('/admin/batches');
    } catch {
      setError(t('apiErrorTitle'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grain relative flex min-h-dvh flex-col">
      <div className="spotlight absolute inset-0 opacity-50" aria-hidden />
      <div className="relative flex items-center justify-end gap-2 px-5 py-4 sm:px-8">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      <div className="relative flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center">
            <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-gold to-copper text-primary-foreground shadow-soft">
              <Leaf className="size-5" strokeWidth={2.4} aria-hidden />
            </span>
            <p className="mt-4 font-display text-xl font-semibold tracking-tight">
              Pure Roots
            </p>
            <p className="eyebrow mt-2 text-muted-foreground">{t('shellEyebrow')}</p>
          </div>

          <div className="lux-card mt-6 space-y-4 p-6 sm:p-7">
            <div>
              <h1 className="font-display text-xl sm:text-2xl">{t('loginTitle')}</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t('loginBody')}
              </p>
            </div>

            <Field
              label={t('phoneLabel')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91XXXXXXXXXX"
              disabled={busy || step === 'otp'}
            />

            {step === 'otp' ? (
              <Field
                label={t('otpLabel')}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit code"
                hint={debugHint ? t('otpDebugHint', { code: debugHint }) : undefined}
                disabled={busy}
              />
            ) : null}

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            {step === 'phone' ? (
              <LuxButton full loading={busy} onClick={() => void requestOtp()}>
                {t('otpCta')}
              </LuxButton>
            ) : (
              <div className="grid gap-2">
                <LuxButton full loading={busy} onClick={() => void verifyOtp()}>
                  {t('otpVerifyCta')}
                </LuxButton>
                <LuxButton
                  full
                  variant="ghost"
                  disabled={busy}
                  onClick={() => {
                    setStep('phone');
                    setCode('');
                    setDebugHint(null);
                  }}
                >
                  {t('otpChangePhone')}
                </LuxButton>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground">{t('consoleNote')}</p>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/admin/batches"
              className="focus-lux text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t('continueWithoutAuth')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

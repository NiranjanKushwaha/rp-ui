'use client';

import { Compass, Home, ScanLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { GoBack } from '@/components/GoBack';
import { LuxButton } from '@/components/pure-roots/ui-kit';

export type NotFoundCopy = {
  code: string;
  eyebrow: string;
  title: string;
  body: string;
  goBack: string;
  goHome: string;
  verifyCta: string;
};

export const NOT_FOUND_FALLBACK: NotFoundCopy = {
  code: '404',
  eyebrow: 'Off the map',
  title: 'This path isn’t on the ledger.',
  body: 'The route you asked for doesn’t exist — or it left the registry. Trace back, or verify a bottle instead.',
  goBack: 'Go back',
  goHome: 'Back to home',
  verifyCta: 'Verify a bottle',
};

/** Locale-aware 404 — use under `[locale]` layouts with next-intl. */
export function NotFoundView() {
  const t = useTranslations('notFound');
  return (
    <NotFoundCanvas
      copy={{
        code: t('code'),
        eyebrow: t('eyebrow'),
        title: t('title'),
        body: t('body'),
        goBack: t('goBack'),
        goHome: t('goHome'),
        verifyCta: t('verifyCta'),
      }}
    />
  );
}

/** Static 404 copy helper when next-intl messages are unavailable. */
export function NotFoundViewStatic({
  copy = NOT_FOUND_FALLBACK,
}: {
  copy?: Partial<NotFoundCopy>;
}) {
  return <NotFoundCanvas copy={{ ...NOT_FOUND_FALLBACK, ...copy }} />;
}

function NotFoundCanvas({ copy }: { copy: NotFoundCopy }) {
  return (
    <section className="relative isolate flex min-h-[min(100dvh,920px)] flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,var(--gold-ring),transparent_55%),radial-gradient(ellipse_70%_50%_at_100%_100%,oklch(0.5_0.06_118_/_0.18),transparent_50%),radial-gradient(ellipse_60%_40%_at_0%_80%,oklch(0.72_0.14_82_/_0.12),transparent_45%)]"
        aria-hidden
      />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-80" aria-hidden />

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <p className="pr-reveal font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
          {copy.eyebrow}
        </p>

        <p
          className="pr-reveal mt-6 font-display text-[clamp(5.5rem,22vw,9.5rem)] leading-none font-semibold tracking-tight text-gold/25 select-none delay-75 sm:text-gold/20"
          aria-hidden
        >
          {copy.code}
        </p>

        <div className="pr-reveal -mt-8 delay-150 sm:-mt-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground backdrop-blur-sm">
            <Compass className="size-3.5 text-gold" aria-hidden />
            Pure Roots
          </div>

          <h1 className="font-display text-balance text-3xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {copy.title}
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.body}
          </p>
        </div>

        <div className="pr-reveal mt-10 flex flex-col gap-3 delay-200 sm:flex-row sm:flex-wrap sm:items-center">
          <GoBack label={copy.goBack} fallbackHref="/" variant="secondary" size="lg" />

          <Link href="/" className="inline-flex">
            <LuxButton variant="outline" size="lg" icon={<Home className="size-4" aria-hidden />}>
              {copy.goHome}
            </LuxButton>
          </Link>

          <Link href="/verify" className="inline-flex sm:ml-auto">
            <LuxButton variant="primary" size="lg" icon={<ScanLine className="size-4" aria-hidden />}>
              {copy.verifyCta}
            </LuxButton>
          </Link>
        </div>

        <div className="pr-reveal mt-14 flex items-center gap-3 border-t border-hairline pt-6 delay-300 text-xs text-muted-foreground">
          <span className="inline-flex size-2 rounded-full bg-gold pr-pulse-ring" aria-hidden />
          <span className="font-mono tracking-wide">Registry online · chain intact</span>
        </div>
      </div>
    </section>
  );
}

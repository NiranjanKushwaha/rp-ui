import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Hero } from '@/components/pure-roots/hero';
import { LiveTicker } from '@/components/pure-roots/live-ticker';
import { StatsBand } from '@/components/pure-roots/stats-band';
import { VerifyPanel } from '@/components/pure-roots/verify-panel';
import { ProofSection } from '@/components/pure-roots/proof-section';
import { ProvenanceSection } from '@/components/pure-roots/provenance-section';
import { ProcessTimeline } from '@/components/pure-roots/process-timeline';
import { GuaranteeSection } from '@/components/pure-roots/guarantee-section';
import { Testimonials } from '@/components/pure-roots/testimonials';
import { StickyVerifyCta } from '@/components/pure-roots/sticky-verify-cta';
import { ResultBanner } from '@/components/pure-roots/result-banner';
import { Reveal, Section, SectionHeading } from '@/components/pure-roots/primitives';
import { LuxButton } from '@/components/pure-roots/ui-kit';

type Props = { params: Promise<{ locale: string }> };

async function ResultPreview() {
  const t = await getTranslations('home');
  return (
    <Section id="results" className="bg-surface-2/35">
      <SectionHeading
        eyebrow={t('resultEyebrow')}
        align="center"
        title={
          <>
            {t('resultTitleBefore')} <span className="gold-text">{t('resultTitleEm')}</span>
          </>
        }
        blurb={t('resultBlurb')}
      />
      <div className="grid gap-6">
        <Reveal>
          <ResultBanner verdict="pass" batch="PR-114-0832" />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={90}>
            <ResultBanner verdict="pending" batch="PR-116" hash="0x41ba…77e2" />
          </Reveal>
          <Reveal delay={180}>
            <ResultBanner verdict="failed" batch="PR-115" hash="no ledger entry" sealedOn="—" />
          </Reveal>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/verify/PR-114-0832">
          <LuxButton size="lg">{t('openCertificate')}</LuxButton>
        </Link>
        <Link href="/verify">
          <LuxButton size="lg" variant="outline">
            {t('verifyYourBottle')}
          </LuxButton>
        </Link>
      </div>
    </Section>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background text-foreground">
      <Hero />
      <LiveTicker />
      <StatsBand />
      <VerifyPanel />
      <ProofSection />
      <ResultPreview />
      <ProvenanceSection />
      <ProcessTimeline />
      <GuaranteeSection />
      <Testimonials />
      <StickyVerifyCta />
    </div>
  );
}

import { Beaker, Droplets, FileCheck2, Fingerprint, Link2, Thermometer } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LabCertificate } from "./lab-certificate";

export async function ProofSection() {
  const t = await getTranslations("sections.proof");

  const cards = [
    {
      icon: Thermometer,
      title: t("coldPressTitle"),
      body: t("coldPressBody"),
      meta: [
        [t("coldPressTemp"), "38.2°C"],
        [t("coldPressYield"), "31%"],
      ] as const,
    },
    {
      icon: Fingerprint,
      title: t("soilTitle"),
      body: t("soilBody"),
      meta: [
        [t("soilFields"), "14"],
        [t("soilMatch"), "98.4%"],
      ] as const,
    },
    {
      icon: Link2,
      title: t("ledgerTitle"),
      body: t("ledgerBody"),
      meta: [
        [t("ledgerEvents"), "4 / batch"],
        [t("ledgerLatency"), "< 60 min"],
      ] as const,
    },
    {
      icon: Droplets,
      title: t("assayTitle"),
      body: t("assayBody"),
      meta: [
        [t("assayPurity"), "99.8%"],
        [t("assayErucic"), "< 5%"],
      ] as const,
    },
  ];

  return (
    <Section id="proof" className="grain">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("titleBefore")} <span className="italic">{t("titleEm")}</span>
            {t("titleAfter")}
          </>
        }
        blurb={t("blurb")}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <article className="lux-card lux-card-hover group h-full overflow-hidden p-6">
              <div
                aria-hidden
                className="mb-6 grid size-11 place-items-center rounded-xl bg-linear-to-br from-gold/20 to-copper/10 text-primary transition-transform duration-300 group-hover:scale-105"
              >
                <c.icon className="size-5" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl">{c.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <dl className="mt-6 space-y-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.meta.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-t border-hairline py-2">
                    <dt>{k}</dt>
                    <dd className="text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal delay={80}>
          <LabCertificate />
        </Reveal>
        <Reveal delay={160}>
          <article className="lux-card lux-card-hover flex h-full flex-col justify-between overflow-hidden bg-linear-to-br from-gold to-copper p-7 text-primary-foreground">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">
                {t("waitlistEyebrow")}
              </span>
              <h3 className="mt-3 font-display text-3xl leading-tight text-primary-foreground">
                {t("waitlistTitle")}
              </h3>
              <p className="mt-3 max-w-sm text-sm opacity-90">{t("waitlistBody")}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#verify"
                className="focus-lux inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-ivory transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FileCheck2 className="size-4" aria-hidden /> {t("waitlistCta")}
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-90">
                <Beaker className="size-3.5" aria-hidden /> {t("waitlistNote")}
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

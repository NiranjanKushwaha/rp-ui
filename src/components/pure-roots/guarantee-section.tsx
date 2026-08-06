'use client';
import { BadgeCheck, RotateCcw, Sprout, Thermometer } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LuxButton, MetaChip } from "./ui-kit";

export function GuaranteeSection() {
  const t = useTranslations("sections.guarantee");

  const promises = [
    { icon: Thermometer, title: t("promise1Title"), body: t("promise1Body") },
    { icon: Sprout, title: t("promise2Title"), body: t("promise2Body") },
    { icon: BadgeCheck, title: t("promise3Title"), body: t("promise3Body") },
    { icon: RotateCcw, title: t("promise4Title"), body: t("promise4Body") },
  ];

  return (
    <Section id="guarantee">
      <div className="lux-card grain relative overflow-hidden p-0">
        <img
          src="/images/mustard-field.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          width={1600}
          height={912}
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity dark:opacity-15"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-background/80 via-background/92 to-background"
        />
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:p-14">
          <div>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={
                <>
                  {t("titleBefore")} <span className="gold-text">{t("titleEm")}</span>
                  {t("titleAfter")}
                </>
              }
              blurb={t("blurb")}
            />
            <div className="-mt-6 flex flex-wrap gap-2">
              <MetaChip label={t("chipAudit")} value={t("chipAuditValue")} />
              <MetaChip label={t("chipRecalls")} value={t("chipRecallsValue")} />
              <MetaChip label={t("chipLots")} value={t("chipLotsValue")} />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LuxButton onClick={() => document.querySelector("#verify")?.scrollIntoView()}>
                {t("verifyBatch")}
              </LuxButton>
              <LuxButton variant="outline">{t("readStandard")}</LuxButton>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <li className="lux-card lux-card-hover inner-light h-full list-none p-5 sm:p-6">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-primary">
                    <p.icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{p.body}</p>
                  <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    0{i + 1} / 04
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

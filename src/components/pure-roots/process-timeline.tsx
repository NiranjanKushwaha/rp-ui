import { getTranslations } from "next-intl/server";
import { Reveal, Section, SectionHeading } from "./primitives";

export async function ProcessTimeline() {
  const t = await getTranslations("sections.process");

  const steps = [
    { title: t("step1Title"), body: t("step1Body"), meta: t("step1Meta") },
    { title: t("step2Title"), body: t("step2Body"), meta: t("step2Meta") },
    { title: t("step3Title"), body: t("step3Body"), meta: t("step3Meta") },
    { title: t("step4Title"), body: t("step4Body"), meta: t("step4Meta") },
  ];

  return (
    <Section id="process">
      <SectionHeading eyebrow={t("eyebrow")} title={<>{t("title")}</>} blurb={t("blurb")} />

      <ol className="relative space-y-10">
        <span
          aria-hidden
          className="absolute bottom-4 left-[1.125rem] top-4 w-px -translate-x-1/2 bg-hairline"
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex items-start gap-5 sm:gap-8">
            <span
              aria-hidden
              className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-hairline bg-card font-display text-xs tabular-nums text-primary shadow-soft"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Reveal delay={i * 90} className="min-w-0 flex-1">
              <div className="lux-card lux-card-hover p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <span className="eyebrow text-[10px]">{s.meta}</span>
                </div>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

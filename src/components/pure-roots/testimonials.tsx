import { Quote, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal, Section, SectionHeading } from "./primitives";

export async function Testimonials() {
  const t = await getTranslations("sections.testimonials");

  const quotes = [
    { quote: t("quote1"), name: t("name1"), role: t("role1") },
    { quote: t("quote2"), name: t("name2"), role: t("role2") },
    { quote: t("quote3"), name: t("name3"), role: t("role3") },
  ];

  const marks = [t("mark1"), t("mark2"), t("mark3"), t("mark4")];

  return (
    <Section id="voices" className="grain">
      <SectionHeading eyebrow={t("eyebrow")} title={<>{t("title")}</>} align="center" />

      <div className="grid gap-4 lg:grid-cols-3">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="lux-card lux-card-hover flex h-full flex-col justify-between p-7">
              <Quote className="size-7 text-primary/70" strokeWidth={1.8} aria-hidden />
              <blockquote className="mt-5 text-base leading-relaxed text-foreground/90 text-pretty">
                {q.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-hairline pt-5">
                <p className="font-display text-lg">{q.name}</p>
                <p className="eyebrow mt-1 text-[10px]">{q.role}</p>
                <div className="mt-3 flex gap-0.5" aria-label={t("starsAria")}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-primary text-primary" aria-hidden />
                  ))}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {marks.map((m) => (
          <li key={m} className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {m}
          </li>
        ))}
      </ul>
    </Section>
  );
}

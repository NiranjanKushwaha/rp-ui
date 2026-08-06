import { Quote, Star } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const QUOTES = [
  {
    quote:
      "The first mustard oil I've cooked with where the pungency is a feature, not a warning. My kitchen switched entirely.",
    name: "Meera Iyer",
    role: "Chef · Nilgiri House, Bengaluru",
  },
  {
    quote:
      "We audit food supply chains for a living. Pure Roots is the first consumer brand whose paperwork we couldn't poke a hole in.",
    name: "Daniel Okoye",
    role: "Lead auditor · Verity Foods",
  },
  {
    quote:
      "Being able to show buyers my own plot on the record changed what my harvest is worth.",
    name: "Rajinder Singh",
    role: "Master presser · Alwar",
  },
];

const MARKS = ["ISO 22000", "FSSAI Licensed", "Fair Equity Certified", "Carbon-audited press"];

export function Testimonials() {
  return (
    <Section id="voices" className="grain">
      <SectionHeading
        eyebrow="Voices"
        title={<>Trusted by cooks, auditors and growers.</>}
        align="center"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} delay={i * 90}>
            <figure className="lux-card lux-card-hover flex h-full flex-col justify-between p-7">
              <Quote className="size-7 text-primary/70" strokeWidth={1.8} aria-hidden />
              <blockquote className="mt-5 text-base leading-relaxed text-foreground/90 text-pretty">
                {q.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-hairline pt-5">
                <p className="font-display text-lg">{q.name}</p>
                <p className="eyebrow mt-1 text-[10px]">{q.role}</p>
                <div className="mt-3 flex gap-0.5" aria-label="5 out of 5">
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
        {MARKS.map((m) => (
          <li key={m} className="flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {m}
          </li>
        ))}
      </ul>
    </Section>
  );
}

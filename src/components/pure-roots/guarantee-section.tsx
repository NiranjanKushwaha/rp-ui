'use client';
import { BadgeCheck, RotateCcw, Sprout, Thermometer } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LuxButton, MetaChip } from "./ui-kit";


const PROMISES = [
  {
    icon: Thermometer,
    title: "Never above 40°C",
    body: "Wood-churned kachi ghani pressing. Every press logs a temperature curve you can read.",
  },
  {
    icon: Sprout,
    title: "Single-origin seed",
    body: "One farm, one harvest window, one lot. No blending, no imported filler oil.",
  },
  {
    icon: BadgeCheck,
    title: "Third-party assayed",
    body: "NABL-accredited labs test erucic acid, peroxide value and adulterants per batch.",
  },
  {
    icon: RotateCcw,
    title: "Fail = full refund",
    body: "If a batch you own fails our own audit, we refund it and recall the lot publicly.",
  },
];

export function GuaranteeSection() {
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
              eyebrow="The Pure Roots guarantee"
              title={
                <>
                  Four promises, <span className="gold-text">each one testable</span>.
                </>
              }
              blurb="We would rather be audited than advertised. Every claim below maps to a record you can open, timestamped and signed."
            />
            <div className="-mt-6 flex flex-wrap gap-2">
              <MetaChip label="Audit" value="Quarterly" />
              <MetaChip label="Recalls" value="Public" />
              <MetaChip label="Lots" value="Single-origin" />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LuxButton onClick={() => document.querySelector("#verify")?.scrollIntoView()}>
                Verify a batch
              </LuxButton>
              <LuxButton variant="outline">Read the standard</LuxButton>

            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <li className="lux-card lux-card-hover inner-light h-full list-none p-5 sm:p-6">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-primary">
                    <p.icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {p.body}
                  </p>
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

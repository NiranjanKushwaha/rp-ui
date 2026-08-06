import { CalendarDays, MapPin, Sprout, Users } from "lucide-react";

import { Chip, Reveal, Section, SectionHeading } from "./primitives";

const CHIPS = [
  { icon: CalendarDays, label: "Harvest 04 Mar 2026" },
  { icon: Sprout, label: "Varietal · Pusa Bold" },
  { icon: Users, label: "3rd generation" },
];

export function ProvenanceSection() {
  return (
    <Section id="provenance">
      <SectionHeading
        eyebrow="Provenance"
        title={<>The people behind the press.</>}
        blurb="Fourteen micro-farms in the Rajasthan mustard belt, no middlemen, 48% of revenue returned to growers."
      />

      <Reveal>
        <div className="lux-card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-72 bg-surface-2">
            <img
              src="/images/farmer-portrait.jpg"
              alt="Rajinder Singh, master presser of the Pure Roots farmer collective, in Alwar district"
              width={1024}
              height={768}
              loading="lazy"
              className="size-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-forest/80 via-forest/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="font-display text-2xl text-ivory">Rajinder Singh</p>
              <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ivory/80">
                <MapPin className="size-3.5" aria-hidden /> Alwar District · 27.55°N 76.63°E
              </p>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <span className="eyebrow block text-primary">Farmer 07 / 14</span>
            <blockquote className="mt-4 font-display text-xl leading-snug text-balance sm:text-2xl">
              “My grandfather pressed sarson in the same wooden kolhu. The only thing new is that now
              the world can check my work.”
            </blockquote>

            <div className="mt-6 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <Chip key={c.label}>
                  <c.icon className="size-3.5 text-primary" aria-hidden />
                  {c.label}
                </Chip>
              ))}
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-hairline sm:grid-cols-3">
              {[
                ["Field size", "6.2 ha"],
                ["Yield share", "48%"],
                ["Press lag", "4 days"],
              ].map(([k, v]) => (
                <div key={k} className="bg-card p-4">
                  <p className="eyebrow text-[9px]">{k}</p>
                  <p className="mt-1 font-display text-xl">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-hairline bg-surface-2 p-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>Field map · plot A7</span>
                <span className="text-primary">● Geo-verified</span>
              </div>
              <div
                aria-hidden
                className="mt-3 h-24 rounded-md border border-hairline bg-[repeating-linear-gradient(45deg,transparent,transparent_9px,var(--hairline)_9px,var(--hairline)_10px)]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

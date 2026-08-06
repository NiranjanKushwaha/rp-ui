import { Beaker, Droplets, FileCheck2, Fingerprint, Link2, Thermometer } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";
import { LabCertificate } from "./lab-certificate";

const CARDS = [
  {
    icon: Thermometer,
    title: "Cold pressing",
    body: "Wooden kolhu extraction held below 40°C so glucosinolates and aroma survive the press.",
    meta: [["Temp", "38.2°C"], ["Yield", "31%"]] as const,
  },
  {
    icon: Fingerprint,
    title: "Soil signature",
    body: "Trace-element fingerprinting ties every litre to a specific field, not a region.",
    meta: [["Fields", "14"], ["Match", "98.4%"]] as const,
  },
  {
    icon: Link2,
    title: "Immutable ledger",
    body: "Harvest, press, seal, ship — each step hashed on-chain within the hour.",
    meta: [["Events", "4 / batch"], ["Latency", "< 60 min"]] as const,
  },
  {
    icon: Droplets,
    title: "Purity assay",
    body: "Independent labs measure erucic acid, peroxide value and adulterants per batch.",
    meta: [["Purity", "99.8%"], ["Erucic", "< 5%"]] as const,
  },
];

export function ProofSection() {
  return (
    <Section id="proof" className="grain">
      <SectionHeading
        eyebrow="Proof / 04 checkpoints"
        title={<>Radical transparency, <span className="italic">engineered</span>.</>}
        blurb="Four independent checkpoints stand between the field and your kitchen. Each one publishes its own record."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((c, i) => (
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
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">Limited release</span>
              <h3 className="mt-3 font-display text-3xl leading-tight text-primary-foreground">
                Batch 005 opens in 14 days.
              </h3>
              <p className="mt-3 max-w-sm text-sm opacity-90">
                1,400 bottles from the February harvest. Reserved first for the collective's members.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#verify"
                className="focus-lux inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-ivory transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FileCheck2 className="size-4" aria-hidden /> Join the waitlist
              </a>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-90">
                <Beaker className="size-3.5" aria-hidden /> Assay published on seal
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Chip } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="grain spotlight relative overflow-hidden px-5 pt-12 pb-20 sm:px-8 md:pt-20 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="pr-reveal min-w-0">
          <Chip className="mb-7 border-primary/30 bg-accent text-accent-foreground">
            <span className="pr-pulse-ring size-1.5 rounded-full bg-primary" aria-hidden />
            Batch 004 · Verified today
          </Chip>

          <h1 className="text-[2.6rem] leading-[0.98] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Mustard oil with a <span className="gold-text italic">provenance</span> you can read.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            Cold-pressed below 40°C in wooden kolhus, fingerprinted in the lab, and sealed with an
            immutable record — from soil signature to your table.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#verify"
              className="sheen focus-lux inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
            >
              Verify my bottle
              <ArrowRight className="size-4" strokeWidth={2.4} aria-hidden />
            </a>
            <a
              href="#provenance"
              className="focus-lux inline-flex min-h-12 items-center justify-center rounded-full border border-hairline bg-secondary px-7 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40"
            >
              Meet the farmers
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" strokeWidth={2.2} aria-hidden />
              ISO 22000 certified press
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-primary" strokeWidth={2.2} aria-hidden />
              99.8% purity, third-party assayed
            </span>
          </div>
        </div>

        <div className="pr-reveal relative min-w-0 [animation-delay:180ms]">
          <div className="pr-float relative">
            <div className="lux-card overflow-hidden p-3 shadow-lift">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-md bg-surface-2">
                <img
                  src="/images/hero-bottle.jpg"
                  alt="Pure Roots cold-pressed mustard oil in an amber glass bottle, lit in a dark studio"
                  width={1024}
                  height={1280}
                  className="size-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-forest/70 via-transparent to-transparent"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-4 py-3 font-mono text-[10px] tracking-widest text-white/85 backdrop-blur-md">
                  <span>SIGNATURE / 500 ML</span>
                  <span className="text-gold">● LIVE</span>
                </div>
              </div>
            </div>

            <div className="lux-card relative -mt-6 ml-2 w-[13.5rem] p-4 shadow-lift sm:absolute sm:-bottom-6 sm:-left-8 sm:mt-0 sm:ml-0">
              <span className="eyebrow text-[9px]">Soil signature</span>
              <p className="mt-1.5 font-display text-xl">Alwar, Rajasthan</p>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-4/5 rounded-full bg-linear-to-r from-gold to-copper" />
              </div>
              <p className="mt-2 font-mono text-[9px] text-muted-foreground">MATCH CONFIDENCE 98.4%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

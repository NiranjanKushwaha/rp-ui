import { Reveal, Section, SectionHeading } from "./primitives";

const STEPS = [
  {
    title: "Harvest & soil sample",
    body: "Growers log the plot, date and varietal. A soil core is sent for trace-element fingerprinting.",
    meta: "Day 0",
  },
  {
    title: "Wooden kolhu press",
    body: "Seeds are ground slowly in a wooden kolhu, kept below 40°C so nothing volatile is lost.",
    meta: "Day 4",
  },
  {
    title: "Independent assay",
    body: "A third-party lab measures purity, erucic acid and peroxide value, then publishes the report.",
    meta: "Day 6",
  },
  {
    title: "Seal & ledger entry",
    body: "Each bottle receives a unique code and QR; the batch record is hashed and sealed on-chain.",
    meta: "Day 8",
  },
];

export function ProcessTimeline() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Process"
        title={<>Eight days, four signatures.</>}
        blurb="Nothing is batched together, blended or backdated. The timeline for every bottle is public."
      />

      {/*
        Rail geometry: markers are size-9 (2.25rem). The vertical line sits at
        left: 1.125rem (half the marker) and is centered with -translate-x-1/2
        so it bisects every circle exactly.
      */}
      <ol className="relative space-y-10">
        <span
          aria-hidden
          className="absolute bottom-4 left-[1.125rem] top-4 w-px -translate-x-1/2 bg-hairline"
        />
        {STEPS.map((s, i) => (
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
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

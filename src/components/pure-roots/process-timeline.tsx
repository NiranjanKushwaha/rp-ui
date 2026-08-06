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

      <ol className="relative ml-1 border-l border-hairline pl-8 sm:pl-12">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[2.3rem] grid size-9 place-items-center rounded-full border border-hairline bg-card font-mono text-xs text-primary shadow-soft sm:-left-[3.55rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Reveal delay={i * 90}>
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

import { MapPin, ShieldCheck } from "lucide-react";

type Event = { batch: string; city: string; ago: string; tone: "pass" | "pending" };

const EVENTS: Event[] = [
  { batch: "PR-2026-118", city: "Bengaluru", ago: "12s", tone: "pass" },
  { batch: "PR-2026-117", city: "Pune", ago: "48s", tone: "pass" },
  { batch: "PR-2026-114", city: "Kolkata", ago: "2m", tone: "pending" },
  { batch: "PR-2026-112", city: "Jaipur", ago: "4m", tone: "pass" },
  { batch: "PR-2026-109", city: "Kochi", ago: "6m", tone: "pass" },
  { batch: "PR-2026-107", city: "Lucknow", ago: "9m", tone: "pass" },
  { batch: "PR-2026-103", city: "Ahmedabad", ago: "11m", tone: "pending" },
  { batch: "PR-2026-101", city: "Delhi", ago: "14m", tone: "pass" },
];

function Item({ e }: { e: Event }) {
  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-hairline px-6 py-3.5">
      <span
        aria-hidden
        className={
          e.tone === "pass"
            ? "pr-blip size-1.5 shrink-0 rounded-full bg-success"
            : "pr-blip size-1.5 shrink-0 rounded-full bg-gold"
        }
      />
      <span className="font-mono text-xs tracking-widest text-foreground">{e.batch}</span>
      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="size-3" aria-hidden />
        {e.city}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {e.tone === "pass" ? "authentic" : "in assay"} · {e.ago}
      </span>
    </div>
  );
}

export function LiveTicker() {
  const loop = [...EVENTS, ...EVENTS];
  return (
    <section aria-label="Live verifications" className="border-y border-hairline bg-surface-2/45">
      <div className="mx-auto flex max-w-7xl flex-col gap-0 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center gap-2.5 border-b border-hairline px-5 py-3 sm:border-b-0 sm:border-r sm:px-6">
          <ShieldCheck className="size-4 text-primary" aria-hidden />
          <span className="eyebrow text-foreground">Live scans</span>
          <span aria-hidden className="pr-blip size-1.5 rounded-full bg-success" />
        </div>
        <div className="edge-fade min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track">
            {loop.map((e, i) => (
              <Item key={`${e.batch}-${i}`} e={e} />
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only">
        Latest verified batches: {EVENTS.map((e) => `${e.batch} in ${e.city}`).join(", ")}.
      </p>
    </section>
  );
}

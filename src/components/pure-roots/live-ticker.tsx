import { MapPin, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Event = { batch: string; cityKey: string; ago: string; tone: "pass" | "pending" };

const EVENTS: Event[] = [
  { batch: "PR-2026-118", cityKey: "cityBengaluru", ago: "12s", tone: "pass" },
  { batch: "PR-2026-117", cityKey: "cityPune", ago: "48s", tone: "pass" },
  { batch: "PR-2026-114", cityKey: "cityKolkata", ago: "2m", tone: "pending" },
  { batch: "PR-2026-112", cityKey: "cityJaipur", ago: "4m", tone: "pass" },
  { batch: "PR-2026-109", cityKey: "cityKochi", ago: "6m", tone: "pass" },
  { batch: "PR-2026-107", cityKey: "cityLucknow", ago: "9m", tone: "pass" },
  { batch: "PR-2026-103", cityKey: "cityAhmedabad", ago: "11m", tone: "pending" },
  { batch: "PR-2026-101", cityKey: "cityDelhi", ago: "14m", tone: "pass" },
];

export async function LiveTicker() {
  const t = await getTranslations("sections.ticker");

  const srList = EVENTS.map((e) => `${e.batch} in ${t(e.cityKey)}`).join(", ");

  return (
    <section aria-label={t("ariaLabel")} className="border-y border-hairline bg-surface-2/45">
      <div className="mx-auto flex max-w-7xl flex-col gap-0 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center gap-2.5 border-b border-hairline px-5 py-3 sm:border-b-0 sm:border-r sm:px-6">
          <ShieldCheck className="size-4 text-primary" aria-hidden />
          <span className="eyebrow text-foreground">{t("label")}</span>
          <span aria-hidden className="pr-blip size-1.5 rounded-full bg-success" />
        </div>
        <div className="edge-fade min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track">
            {[...EVENTS, ...EVENTS].map((e, i) => (
              <div
                key={`${e.batch}-${i}`}
                className="flex shrink-0 items-center gap-3 border-r border-hairline px-6 py-3.5"
              >
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
                  {t(e.cityKey)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {e.tone === "pass" ? t("authentic") : t("inAssay")} · {e.ago}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only">{t("srOnly", { list: srList })}</p>
    </section>
  );
}

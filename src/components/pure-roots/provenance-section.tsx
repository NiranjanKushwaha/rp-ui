import { CalendarDays, MapPin, Sprout, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Chip, Reveal, Section, SectionHeading } from "./primitives";

export async function ProvenanceSection() {
  const t = await getTranslations("sections.provenance");

  const chips = [
    { icon: CalendarDays, label: t("chipHarvest") },
    { icon: Sprout, label: t("chipVarietal") },
    { icon: Users, label: t("chipGeneration") },
  ];

  const stats = [
    [t("fieldSize"), "6.2 ha"],
    [t("yieldShare"), "48%"],
    [t("pressLag"), "4 days"],
  ] as const;

  return (
    <Section id="provenance">
      <SectionHeading eyebrow={t("eyebrow")} title={<>{t("title")}</>} blurb={t("blurb")} />

      <Reveal>
        <div className="lux-card grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-72 bg-surface-2">
            <img
              src="/images/farmer-portrait.jpg"
              alt={t("farmerAlt")}
              width={1024}
              height={768}
              loading="lazy"
              className="size-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-forest/80 via-forest/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="font-display text-2xl text-ivory">{t("farmerName")}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ivory/80">
                <MapPin className="size-3.5" aria-hidden /> {t("farmerLocation")}
              </p>
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <span className="eyebrow block text-primary">{t("farmerIndex")}</span>
            <blockquote className="mt-4 font-display text-xl leading-snug text-balance sm:text-2xl">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>

            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <Chip key={c.label}>
                  <c.icon className="size-3.5 text-primary" aria-hidden />
                  {c.label}
                </Chip>
              ))}
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg bg-hairline sm:grid-cols-3">
              {stats.map(([k, v]) => (
                <div key={k} className="bg-card p-4">
                  <p className="eyebrow text-[9px]">{k}</p>
                  <p className="mt-1 font-display text-xl">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-hairline bg-surface-2 p-4">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{t("fieldMap")}</span>
                <span className="text-primary">{t("geoVerified")}</span>
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

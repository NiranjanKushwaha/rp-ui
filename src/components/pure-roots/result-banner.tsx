'use client';
import { AlertTriangle, CheckCircle2, Clock3, Hash, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LuxButton, MetaChip } from "./ui-kit";

export type Verdict = "pass" | "pending" | "failed";

export function ResultBanner({
  verdict,
  batch,
  hash = "0x8f3c…a19d",
  sealedOn = "12 Mar 2026 · 06:41 IST",
  className,
}: {
  verdict: Verdict;
  batch: string;
  hash?: string;
  sealedOn?: string;
  className?: string;
}) {
  const t = useTranslations("sections.resultBanner");

  const styles: Record<
    Verdict,
    {
      icon: typeof CheckCircle2;
      ring: string;
      wash: string;
      ribbon: string;
      accent: string;
    }
  > = {
    pass: {
      icon: CheckCircle2,
      ring: "border-success/40",
      wash: "from-success/14 via-success/5 to-transparent",
      ribbon: "bg-success text-success-foreground",
      accent: "text-success",
    },
    pending: {
      icon: Clock3,
      ring: "border-gold/45",
      wash: "from-gold/16 via-gold/5 to-transparent",
      ribbon: "bg-gold text-ink",
      accent: "text-accent-foreground",
    },
    failed: {
      icon: AlertTriangle,
      ring: "border-destructive/45",
      wash: "from-destructive/14 via-destructive/5 to-transparent",
      ribbon: "bg-destructive text-destructive-foreground",
      accent: "text-destructive",
    },
  };

  const copy: Record<Verdict, { label: string; headline: string; body: string }> = {
    pass: { label: t("passLabel"), headline: t("passHeadline"), body: t("passBody") },
    pending: { label: t("pendingLabel"), headline: t("pendingHeadline"), body: t("pendingBody") },
    failed: { label: t("failedLabel"), headline: t("failedHeadline"), body: t("failedBody") },
  };

  const c = { ...styles[verdict], ...copy[verdict] };
  const Icon = styles[verdict].icon;

  return (
    <div
      className={cn(
        "lux-card grain guilloche relative overflow-hidden border-2 p-0",
        c.ring,
        className,
      )}
      role={verdict === "failed" ? "alert" : "status"}
    >
      <div aria-hidden className={cn("absolute inset-0 bg-linear-to-br", c.wash)} />
      {verdict === "pending" ? (
        <div
          aria-hidden
          className="pr-scan-line pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-gold/22 to-transparent"
        />
      ) : null}

      <span className={cn("ribbon z-10", c.ribbon)}>{c.label}</span>

      <div className="relative p-6 pt-16 sm:p-10 sm:pt-10">
        <div className="flex items-start gap-4">
          <span
            className={cn(
              "grid size-14 shrink-0 place-items-center rounded-2xl border bg-card/70 backdrop-blur-sm",
              c.ring,
              c.accent,
            )}
          >
            <Icon className="size-7" strokeWidth={1.9} aria-hidden />
          </span>
          <div className="min-w-0">
            <span className="eyebrow block">{t("eyebrow")}</span>
            <h1 className="mt-2 font-display text-2xl leading-tight text-balance sm:text-4xl">{c.headline}</h1>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          {c.body}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <MetaChip icon={<Hash className="size-3.5" />} label={t("batch")} value={batch} />
          <MetaChip icon={<ShieldCheck className="size-3.5" />} label={t("ledger")} value={hash} />
          <MetaChip label={t("sealed")} value={sealedOn} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {verdict === "failed" ? (
            <>
              <LuxButton variant="danger" size="lg">
                {t("reportSeller")}
              </LuxButton>
              <LuxButton variant="outline" size="lg">
                {t("claimReplacement")}
              </LuxButton>
            </>
          ) : (
            <>
              <LuxButton size="lg">{t("downloadCert")}</LuxButton>
              <LuxButton variant="outline" size="lg">
                {t("viewLabReport")}
              </LuxButton>
            </>
          )}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-surface-2/50 px-6 py-3 sm:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("footerLeft")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {t("footerRight")}
        </span>
      </div>
    </div>
  );
}

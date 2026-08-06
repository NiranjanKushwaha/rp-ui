import { AlertTriangle, CheckCircle2, Clock3, Hash, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { LuxButton, MetaChip } from "./ui-kit";

export type Verdict = "pass" | "pending" | "failed";

const CONFIG: Record<
  Verdict,
  {
    label: string;
    headline: string;
    body: string;
    icon: typeof CheckCircle2;
    ring: string;
    wash: string;
    ribbon: string;
    accent: string;
  }
> = {
  pass: {
    label: "Authentic",
    headline: "This batch is genuine Pure Roots.",
    body: "Seal intact, ledger hash matches the lab assay filed at press time. Nothing about this lot has been altered since sealing.",
    icon: CheckCircle2,
    ring: "border-success/40",
    wash: "from-success/14 via-success/5 to-transparent",
    ribbon: "bg-success text-success-foreground",
    accent: "text-success",
  },
  pending: {
    label: "In assay",
    headline: "This batch is sealed, assay still open.",
    body: "The lot is registered and the seal is valid, but the third-party lab report has not been countersigned yet. Expect results within 48 hours.",
    icon: Clock3,
    ring: "border-gold/45",
    wash: "from-gold/16 via-gold/5 to-transparent",
    ribbon: "bg-gold text-ink",
    accent: "text-accent-foreground",
  },
  failed: {
    label: "Not verified",
    headline: "We cannot vouch for this bottle.",
    body: "The code resolves to a lot that failed audit or was never sealed by us. Do not consume. Report the seller and we will replace your bottle.",
    icon: AlertTriangle,
    ring: "border-destructive/45",
    wash: "from-destructive/14 via-destructive/5 to-transparent",
    ribbon: "bg-destructive text-destructive-foreground",
    accent: "text-destructive",
  },
};

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
  const c = CONFIG[verdict];
  const Icon = c.icon;

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
            <span className="eyebrow block">Verification result</span>
            <h1 className="mt-2 font-display text-2xl leading-tight text-balance sm:text-4xl">
              {c.headline}
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          {c.body}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          <MetaChip icon={<Hash className="size-3.5" />} label="Batch" value={batch} />
          <MetaChip icon={<ShieldCheck className="size-3.5" />} label="Ledger" value={hash} />
          <MetaChip label="Sealed" value={sealedOn} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {verdict === "failed" ? (
            <>
              <LuxButton variant="danger" size="lg">
                Report this seller
              </LuxButton>
              <LuxButton variant="outline" size="lg">
                Claim a replacement
              </LuxButton>
            </>
          ) : (
            <>
              <LuxButton size="lg">Download certificate</LuxButton>
              <LuxButton variant="outline" size="lg">
                View lab report
              </LuxButton>
            </>
          )}
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-2 border-t border-hairline bg-surface-2/50 px-6 py-3 sm:px-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Pure Roots authenticity record
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Issued by Pure Roots Trust Registry
        </span>
      </div>
    </div>
  );
}

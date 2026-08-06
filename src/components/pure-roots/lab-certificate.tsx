import { BadgeCheck, Download } from "lucide-react";

const ROWS = [
  ["Purity", "99.82%", "pass"],
  ["Erucic acid", "4.1%", "pass"],
  ["Peroxide value", "1.2 meq/kg", "pass"],
  ["Adulterants", "None detected", "pass"],
] as const;

export function LabCertificate() {
  return (
    <article className="emboss grain relative h-full overflow-hidden rounded-xl bg-card p-7 sm:p-9">
      <span className="absolute right-0 top-6 rounded-l-full bg-linear-to-r from-gold to-copper px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground shadow-soft">
        Verified
      </span>

      <span className="eyebrow block text-primary">Certificate of analysis</span>
      <h3 className="mt-3 font-display text-2xl sm:text-3xl">Batch PR-2024-004</h3>
      <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
        Assayed 12 Mar 2026 · Sundar Analytical Labs, Jaipur
      </p>

      <dl className="mt-7 border-t border-hairline">
        {ROWS.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-hairline py-3">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="flex items-center gap-2 font-mono text-xs text-foreground">
              {value}
              <BadgeCheck className="size-3.5 text-success" aria-hidden />
              <span className="sr-only">pass</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Signed 0x82f7…c1F2E
        </div>
        <a
          href="#verify"
          className="focus-lux inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-secondary px-5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40"
        >
          <Download className="size-4" strokeWidth={2.2} aria-hidden />
          Download PDF
        </a>
      </div>
    </article>
  );
}

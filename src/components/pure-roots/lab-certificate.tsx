import { BadgeCheck, Download } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function LabCertificate() {
  const t = await getTranslations("sections.labCertificate");

  const rows = [
    [t("purity"), "99.82%"],
    [t("erucic"), "4.1%"],
    [t("peroxide"), "1.2 meq/kg"],
    [t("adulterants"), t("noneDetected")],
  ] as const;

  return (
    <article className="emboss grain relative h-full overflow-hidden rounded-xl bg-card p-7 sm:p-9">
      <span className="absolute right-0 top-6 rounded-l-full bg-linear-to-r from-gold to-copper px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground shadow-soft">
        {t("verified")}
      </span>

      <span className="eyebrow block text-primary">{t("eyebrow")}</span>
      <h3 className="mt-3 font-display text-2xl sm:text-3xl">{t("batchTitle")}</h3>
      <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">{t("assayed")}</p>

      <dl className="mt-7 border-t border-hairline">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-hairline py-3">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="flex items-center gap-2 font-mono text-xs text-foreground">
              {value}
              <BadgeCheck className="size-3.5 text-success" aria-hidden />
              <span className="sr-only">{t("passSr")}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {t("signed")}
        </div>
        <a
          href="#verify"
          className="focus-lux inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-secondary px-5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40"
        >
          <Download className="size-4" strokeWidth={2.2} aria-hidden />
          {t("downloadPdf")}
        </a>
      </div>
    </article>
  );
}

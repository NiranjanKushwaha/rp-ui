import { Leaf, ShieldCheck } from "lucide-react";

const COLUMNS = [
  {
    title: "Protocol",
    links: ["Verification hub", "Lab methodology", "Farmer ledger", "Chain explorer"],
  },
  {
    title: "Product",
    links: ["Signature 500 ml", "Kitchen 1 L", "Gift dossier", "Wholesale"],
  },
  {
    title: "Company",
    links: ["The collective", "Journal", "Press kit", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="grain border-t border-hairline bg-surface-2/50">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-gold to-copper text-primary-foreground">
                <Leaf className="size-4" strokeWidth={2.4} aria-hidden />
              </span>
              <span className="font-display text-xl font-semibold">Pure Roots</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A forensic approach to a kitchen essential. Transparency is the highest form of luxury.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden />
              Chain connected · System optimal
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow mb-5 block text-[10px] text-primary">{col.title}</h2>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="focus-lux nav-link inline-block rounded-sm hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-hairline pt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Pure Roots Collective</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Traceability policy", "Accessibility"].map((l) => (
              <li key={l}>
                <a href="#top" className="focus-lux rounded-sm hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

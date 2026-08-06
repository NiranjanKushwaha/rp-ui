'use client';
import { useTranslations } from "next-intl";
import { useCountUp, useInView } from "@/lib/motion";

const STAT_KEYS = [
  { value: 14, suffix: "", key: "farms" as const },
  { value: 48, suffix: "%", key: "revenue" as const },
  { value: 99.8, suffix: "%", key: "purity" as const, decimals: 1 },
  { value: 38.2, suffix: "°C", key: "temp" as const, decimals: 1 },
];

function Stat({
  value,
  suffix,
  label,
  decimals = 0,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="px-6 py-7 text-center sm:py-8">
      <p className="font-display text-3xl tabular-nums sm:text-4xl">
        {n.toFixed(decimals)}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="eyebrow mt-2 block text-[10px]">{label}</p>
    </div>
  );
}

export function StatsBand() {
  const t = useTranslations("sections.stats");
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <div ref={ref} className="grain border-y border-hairline bg-surface-2/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline px-5 sm:px-8 lg:grid-cols-4 lg:divide-y-0">
        {STAT_KEYS.map((s) => (
          <Stat key={s.key} value={s.value} suffix={s.suffix} decimals={s.decimals} label={t(s.key)} active={inView} />
        ))}
      </div>
    </div>
  );
}

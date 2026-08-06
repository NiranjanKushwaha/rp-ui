import { getTranslations, setRequestLocale } from 'next-intl/server';
import { StatusBadge } from '@/components/pure-roots/ui-kit';

type Props = { params: Promise<{ locale: string }> };

const STUB_ROWS = [
  { code: 'PR-114', farmer: 'Ramesh Yadav', lab: 'PASS' as const, status: 'ACTIVE' as const },
  { code: 'PR-116', farmer: 'Ramesh Yadav', lab: 'PENDING' as const, status: 'PENDING' as const },
  { code: 'PR-115', farmer: 'Sita Devi', lab: 'FAIL' as const, status: 'FAILED' as const },
];

function tone(value: string) {
  const v = value.toUpperCase();
  if (v === 'PASS' || v === 'ACTIVE') return 'pass' as const;
  if (v === 'FAIL' || v === 'FAILED') return 'failed' as const;
  return 'pending' as const;
}

export default async function AdminBatchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <div className="grain mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <h1 className="font-display text-2xl sm:text-3xl">{t('batchesTitle')}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('batchesBody')}</p>

      <div className="lux-card mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-hairline text-left">
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t('thBatch')}
              </th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t('thFarmer')}
              </th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t('thLab')}
              </th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {t('thStatus')}
              </th>
            </tr>
          </thead>
          <tbody>
            {STUB_ROWS.map((row) => (
              <tr key={row.code} className="border-b border-hairline/60 last:border-0 hover:bg-accent/25">
                <td className="px-5 py-3.5 font-mono text-xs font-semibold">{row.code}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{row.farmer}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge tone={tone(row.lab)}>{row.lab}</StatusBadge>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge tone={tone(row.status)}>{row.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BadgeLabPass } from '@/components/BadgeLabPass';

type Props = { params: Promise<{ locale: string }> };

const STUB_ROWS = [
  { code: 'PR-114', farmer: 'Ramesh Yadav', lab: 'PASS', status: 'ACTIVE' },
  { code: 'PR-116', farmer: 'Ramesh Yadav', lab: 'PENDING', status: 'PENDING' },
  { code: 'PR-115', farmer: 'Sita Devi', lab: 'FAIL', status: 'FAILED' },
];

export default async function AdminBatchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            {t('batchesTitle')}
          </h1>
          <p className="mt-1 text-sm text-muted">{t('batchesBody')}</p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-[1px] text-muted">
              <th className="px-4 py-3">{t('thBatch')}</th>
              <th className="px-4 py-3">{t('thFarmer')}</th>
              <th className="px-4 py-3">{t('thLab')}</th>
              <th className="px-4 py-3">{t('thStatus')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {STUB_ROWS.map((row) => (
              <tr key={row.code} className="transition-colors hover:bg-paper">
                <td className="px-4 py-3 font-semibold text-ink">{row.code}</td>
                <td className="px-4 py-3 text-muted">{row.farmer}</td>
                <td className="px-4 py-3">
                  <BadgeLabPass status={row.lab} />
                </td>
                <td className="px-4 py-3">
                  <BadgeLabPass status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

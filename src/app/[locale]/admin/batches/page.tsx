import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BadgeLabPass } from '@/components/BadgeLabPass';

type Props = { params: Promise<{ locale: string }> };

const STUB_ROWS = [
  { code: 'PR-114', status: 'ACTIVE' },
  { code: 'PR-116', status: 'PENDING' },
  { code: 'PR-115', status: 'FAILED' },
];

export default async function AdminBatchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-ink">{t('batchesTitle')}</h1>
      <p className="mt-3 text-muted">{t('batchesBody')}</p>
      <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
        {STUB_ROWS.map((row) => (
          <li
            key={row.code}
            className="flex items-center justify-between px-4 py-3 text-sm"
          >
            <span className="font-medium text-ink">{row.code}</span>
            <BadgeLabPass status={row.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

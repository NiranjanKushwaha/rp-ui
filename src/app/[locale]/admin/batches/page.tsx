import { FlaskConical } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { fetchAdminBatchRows } from '@/lib/api';
import { BatchesConsole } from '@/components/pure-roots/batches-console';
import { EmptyState, LuxButton } from '@/components/pure-roots/ui-kit';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminBatchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  let result: Awaited<ReturnType<typeof fetchAdminBatchRows>>;
  try {
    result = await fetchAdminBatchRows();
  } catch {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <EmptyState
          icon={<FlaskConical className="size-7" aria-hidden />}
          title={t('apiErrorTitle')}
          body={t('apiErrorBody')}
          tone="failed"
          action={
            <Link href="/admin/batches">
              <LuxButton variant="secondary">{t('retry')}</LuxButton>
            </Link>
          }
        />
      </div>
    );
  }

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <EmptyState
          icon={<FlaskConical className="size-7" aria-hidden />}
          title={t('apiErrorTitle')}
          body={t('apiErrorBody')}
          tone="failed"
          action={
            <Link href="/admin/batches">
              <LuxButton variant="secondary">{t('retry')}</LuxButton>
            </Link>
          }
        />
      </div>
    );
  }

  if (result.rows.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <EmptyState
          icon={<FlaskConical className="size-7" aria-hidden />}
          title={t('emptyBatchesTitle')}
          body={t('emptyBatchesBody')}
        />
      </div>
    );
  }

  return <BatchesConsole rows={result.rows} />;
}

import { MapPin, Sprout } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { fetchAdminFarmers } from '@/lib/api';
import { farmerInitials } from '@/lib/admin-status';
import { EmptyState, LuxButton } from '@/components/pure-roots/ui-kit';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminFarmersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('admin');

  let result: Awaited<ReturnType<typeof fetchAdminFarmers>>;
  try {
    result = await fetchAdminFarmers();
  } catch {
    return (
      <Shell>
        <EmptyState
          icon={<Sprout className="size-7" aria-hidden />}
          title={t('apiErrorTitle')}
          body={t('apiErrorBody')}
          tone="failed"
          action={
            <Link href="/admin/farmers">
              <LuxButton variant="secondary">{t('retry')}</LuxButton>
            </Link>
          }
        />
      </Shell>
    );
  }

  if (!result.ok) {
    return (
      <Shell>
        <EmptyState
          icon={<Sprout className="size-7" aria-hidden />}
          title={t('apiErrorTitle')}
          body={t('apiErrorBody')}
          tone="failed"
          action={
            <Link href="/admin/farmers">
              <LuxButton variant="secondary">{t('retry')}</LuxButton>
            </Link>
          }
        />
      </Shell>
    );
  }

  const farmers = result.data;

  return (
    <Shell>
      <span className="eyebrow text-primary">{t('shellEyebrow')}</span>
      <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
        {t('farmersTitle')}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {t('farmersBody')}
      </p>

      {farmers.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<Sprout className="size-7" aria-hidden />}
            title={t('farmersEmptyTitle')}
            body={t('farmersEmptyBody')}
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {farmers.map((farmer) => (
            <li key={farmer.id}>
              <Link
                href={`/admin/farmers/${encodeURIComponent(farmer.id)}`}
                className="lux-card lux-card-hover tap focus-lux block p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full border border-gold/35 bg-gold/12 font-mono text-xs font-semibold text-primary">
                    {farmerInitials(farmer.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg">{farmer.name}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" aria-hidden />
                      {farmer.location}
                    </p>
                  </div>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {farmer.id}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {children}
    </div>
  );
}

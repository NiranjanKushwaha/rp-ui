import { ArrowLeft, MapPin, ShieldCheck, ShieldOff } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { fetchAdminFarmer } from '@/lib/api';
import { farmerInitials } from '@/lib/admin-status';
import { EmptyState, LuxButton, StatusBadge } from '@/components/pure-roots/ui-kit';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function AdminFarmerDetailPage({ params }: Props) {
  const { locale, id: raw } = await params;
  setRequestLocale(locale);
  const id = decodeURIComponent(raw);
  const t = await getTranslations('admin');

  let result: Awaited<ReturnType<typeof fetchAdminFarmer>>;
  try {
    result = await fetchAdminFarmer(id);
  } catch {
    return (
      <Shell>
        <EmptyState
          icon={<MapPin className="size-7" aria-hidden />}
          title={t('apiErrorTitle')}
          body={t('apiErrorBody')}
          tone="failed"
        />
      </Shell>
    );
  }

  if (!result.ok) {
    return (
      <Shell>
        <EmptyState
          icon={<MapPin className="size-7" aria-hidden />}
          title={t('farmerNotFoundTitle')}
          body={t('farmerNotFoundBody', { id })}
          action={
            <Link href="/admin/farmers">
              <LuxButton variant="secondary">{t('backToFarmers')}</LuxButton>
            </Link>
          }
        />
      </Shell>
    );
  }

  const farmer = result.data;
  const consented = farmer.consentPublished !== false;

  return (
    <Shell>
      <Link
        href="/admin/farmers"
        className="focus-lux tap inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t('backToFarmers')}
      </Link>

      <div className="lux-card mt-8 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full border border-gold/35 bg-gold/12 font-mono text-sm font-semibold text-primary">
              {farmerInitials(farmer.name)}
            </span>
            <div>
              <span className="eyebrow text-primary">{t('farmerCardTitle')}</span>
              <h1 className="mt-1 font-display text-3xl">{farmer.name}</h1>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" aria-hidden />
                {farmer.location}
              </p>
            </div>
          </div>
          <StatusBadge tone={consented ? 'pass' : 'pending'}>
            {consented ? t('consentOn') : t('consentOff')}
          </StatusBadge>
        </div>

        <div className="mt-6 rounded-xl border border-hairline bg-surface-2/40 p-4 text-sm text-muted-foreground">
          <p className="inline-flex items-start gap-2">
            {consented ? (
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            ) : (
              <ShieldOff className="mt-0.5 size-4 shrink-0 text-accent-foreground" aria-hidden />
            )}
            {consented ? t('consentOnBody') : t('consentOffBody')}
          </p>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {farmer.id}
        </p>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {children}
    </div>
  );
}

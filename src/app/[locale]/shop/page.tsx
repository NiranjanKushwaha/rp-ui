import { ShoppingBag } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getApiUrl } from '@/lib/api';
import { EmptyState, LuxButton, StatusBadge } from '@/components/pure-roots/ui-kit';

type Product = {
  sku: string;
  batchCode: string;
  name: string;
  sizeMl: number;
  priceInr: number;
  status: string;
};

type Props = { params: Promise<{ locale: string }> };

async function fetchCatalog(): Promise<Product[]> {
  const res = await fetch(`${getApiUrl()}/catalog/products`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  return (await res.json()) as Product[];
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('shop');

  let products: Product[] = [];
  try {
    products = await fetchCatalog();
  } catch {
    products = [];
  }

  return (
    <div className="grain mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <span className="eyebrow text-primary">{t('eyebrow')}</span>
      <h1 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {t('body')}
      </p>

      {products.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<ShoppingBag className="size-7" aria-hidden />}
            title={t('emptyTitle')}
            body={t('emptyBody')}
            action={
              <Link href="/verify">
                <LuxButton variant="secondary">{t('verifyCta')}</LuxButton>
              </Link>
            }
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.sku} className="lux-card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{p.sku}</p>
                  <h2 className="mt-1 font-display text-xl">{p.name}</h2>
                </div>
                <StatusBadge tone="pass">{p.status}</StatusBadge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {t('batchLine', { batch: p.batchCode, size: p.sizeMl })}
              </p>
              <p className="mt-4 font-display text-2xl">₹{p.priceInr}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <LuxButton disabled>{t('addToCartSoon')}</LuxButton>
                <Link href={`/verify/${encodeURIComponent(p.batchCode)}`}>
                  <LuxButton variant="outline">{t('seeProof')}</LuxButton>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

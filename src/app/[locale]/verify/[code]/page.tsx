import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BadgeLabPass } from '@/components/BadgeLabPass';
import { Button } from '@/components/Button';
import { fetchVerify } from '@/lib/api';

type Props = {
  params: Promise<{ locale: string; code: string }>;
};

export default async function VerifyResultPage({ params }: Props) {
  const { locale, code: raw } = await params;
  setRequestLocale(locale);
  const code = decodeURIComponent(raw);
  const t = await getTranslations('verify');

  let result: Awaited<ReturnType<typeof fetchVerify>>;
  try {
    result = await fetchVerify(code);
  } catch {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <p className="text-muted">{t('error')}</p>
        <Link href="/verify" className="mt-6 inline-block">
          <Button variant="secondary">{t('back')}</Button>
        </Link>
      </div>
    );
  }

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <p className="text-muted">{t('notFound')}</p>
        <Link href="/verify" className="mt-6 inline-block">
          <Button variant="secondary">{t('back')}</Button>
        </Link>
      </div>
    );
  }

  const { data } = result;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold text-ink">
          {data.serialCode ?? data.batchCode}
        </h1>
        <BadgeLabPass status={data.status} />
        {data.lab && <BadgeLabPass status={data.lab.status} label={`Lab ${data.lab.status}`} />}
      </div>

      <dl className="mt-8 space-y-4 text-sm">
        <div className="flex justify-between gap-4 border-b border-border pb-3">
          <dt className="text-muted">{t('batch')}</dt>
          <dd className="font-medium text-ink">{data.batchCode}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border pb-3">
          <dt className="text-muted">{t('product')}</dt>
          <dd className="font-medium text-ink">{data.productName}</dd>
        </div>
        {data.serialCode && (
          <div className="flex justify-between gap-4 border-b border-border pb-3">
            <dt className="text-muted">{t('serial')}</dt>
            <dd className="font-medium text-ink">{data.serialCode}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4 border-b border-border pb-3">
          <dt className="text-muted">{t('farmer')}</dt>
          <dd className="font-medium text-ink">{data.farmer.name}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border pb-3">
          <dt className="text-muted">{t('location')}</dt>
          <dd className="font-medium text-ink">{data.farmer.location}</dd>
        </div>
        {data.lab && (
          <>
            <div className="flex justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted">{t('lab')}</dt>
              <dd className="font-medium text-ink">{data.lab.labName}</dd>
            </div>
            <div className="pt-2">
              <p className="mb-3 font-medium text-ink">{t('params')}</p>
              <ul className="space-y-2 rounded-xl border border-border bg-surface p-4">
                <li className="flex justify-between">
                  <span className="text-muted">{t('ri')}</span>
                  <span>{data.lab.params.refractiveIndex}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">{t('aitc')}</span>
                  <span>{data.lab.params.aitcPercent}%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">{t('argemone')}</span>
                  <span>{data.lab.params.argemone}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted">{t('acidValue')}</span>
                  <span>{data.lab.params.acidValue}</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </dl>

      <Link href="/verify" className="mt-10 inline-block">
        <Button variant="secondary">{t('back')}</Button>
      </Link>
    </div>
  );
}

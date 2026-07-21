import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-base font-semibold uppercase tracking-[3px] text-brand-deep">
            Pure Roots
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {t('tagline')}
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
            {t('colTrust')}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/verify" className="transition-colors hover:text-brand-deep">
                {t('linkVerify')}
              </Link>
            </li>
            <li>
              <Link href="/" className="transition-colors hover:text-brand-deep">
                {t('linkLabs')}
              </Link>
            </li>
            <li>
              <Link href="/" className="transition-colors hover:text-brand-deep">
                {t('linkFarmers')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
            {t('colCompany')}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-brand-deep">
                {t('linkAbout')}
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="transition-colors hover:text-brand-deep">
                {t('linkAdmin')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{t('rights')}</p>
          <p>{t('fssai')}</p>
        </div>
      </div>
    </footer>
  );
}

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { deepMergeMessages } from './merge-messages';
import { routing } from './routing';

type Messages = Record<string, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let en: Messages;
  try {
    en = (await import('../../messages/en.json')).default as Messages;
  } catch {
    return { locale: routing.defaultLocale, messages: {} };
  }

  if (locale === 'en') {
    return { locale, messages: en };
  }

  try {
    const overlay = (await import(`../../messages/${locale}.json`)).default as Messages;
    return { locale, messages: deepMergeMessages(en, overlay) };
  } catch {
    // Missing or broken locale file — serve English so the UI never breaks.
    return { locale, messages: en };
  }
});

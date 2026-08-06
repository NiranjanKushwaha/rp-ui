/** Official / widely used Indian languages + English. */
export const locales = [
  'en',
  'hi',
  'bn',
  'te',
  'mr',
  'ta',
  'gu',
  'ur',
  'kn',
  'or',
  'ml',
  'pa',
  'as',
  'mai',
  'sat',
  'ks',
  'ne',
  'sd',
  'kok',
  'mni',
  'doi',
] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'en';

export type LocaleMeta = {
  code: AppLocale;
  /** Name in its own script */
  native: string;
  /** English label */
  english: string;
  /** BCP 47 for dates / Intl */
  bcp47: string;
  dir?: 'ltr' | 'rtl';
};

export const localeMeta: Record<AppLocale, LocaleMeta> = {
  en: { code: 'en', native: 'English', english: 'English', bcp47: 'en-IN' },
  hi: { code: 'hi', native: 'हिन्दी', english: 'Hindi', bcp47: 'hi-IN' },
  bn: { code: 'bn', native: 'বাংলা', english: 'Bengali', bcp47: 'bn-IN' },
  te: { code: 'te', native: 'తెలుగు', english: 'Telugu', bcp47: 'te-IN' },
  mr: { code: 'mr', native: 'मराठी', english: 'Marathi', bcp47: 'mr-IN' },
  ta: { code: 'ta', native: 'தமிழ்', english: 'Tamil', bcp47: 'ta-IN' },
  gu: { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', bcp47: 'gu-IN' },
  ur: { code: 'ur', native: 'اردو', english: 'Urdu', bcp47: 'ur-IN', dir: 'rtl' },
  kn: { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', bcp47: 'kn-IN' },
  or: { code: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia', bcp47: 'or-IN' },
  ml: { code: 'ml', native: 'മലയാളം', english: 'Malayalam', bcp47: 'ml-IN' },
  pa: { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', bcp47: 'pa-IN' },
  as: { code: 'as', native: 'অসমীয়া', english: 'Assamese', bcp47: 'as-IN' },
  mai: { code: 'mai', native: 'मैथिली', english: 'Maithili', bcp47: 'mai-IN' },
  sat: { code: 'sat', native: 'ᱥᱟᱱᱛᱟᱲᱤ', english: 'Santali', bcp47: 'sat-IN' },
  ks: { code: 'ks', native: 'کٲشُر', english: 'Kashmiri', bcp47: 'ks-IN', dir: 'rtl' },
  ne: { code: 'ne', native: 'नेपाली', english: 'Nepali', bcp47: 'ne-IN' },
  sd: { code: 'sd', native: 'سنڌي', english: 'Sindhi', bcp47: 'sd-IN', dir: 'rtl' },
  kok: { code: 'kok', native: 'कोंकणी', english: 'Konkani', bcp47: 'kok-IN' },
  mni: { code: 'mni', native: 'ꯃꯤꯇꯩꯂꯣꯟ', english: 'Manipuri', bcp47: 'mni-IN' },
  doi: { code: 'doi', native: 'डोगरी', english: 'Dogri', bcp47: 'doi-IN' },
};

export const localeList: LocaleMeta[] = locales.map((code) => localeMeta[code]);

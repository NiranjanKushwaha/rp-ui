/** Unicode script ranges used to validate locale-specific translations. */
export const LOCALE_SCRIPT_RANGES = {
  hi: [[0x0900, 0x097f]],
  mr: [[0x0900, 0x097f]],
  mai: [[0x0900, 0x097f]],
  ne: [[0x0900, 0x097f]],
  kok: [[0x0900, 0x097f]],
  doi: [[0x0900, 0x097f]],
  bn: [[0x0980, 0x09ff]],
  as: [[0x0980, 0x09ff]],
  te: [[0x0c00, 0x0c7f]],
  ta: [[0x0b80, 0x0bff]],
  gu: [[0x0a80, 0x0aff]],
  kn: [[0x0c80, 0x0cff]],
  or: [[0x0b00, 0x0b7f]],
  ml: [[0x0d00, 0x0d7f]],
  pa: [[0x0a00, 0x0a7f]],
  ur: [[0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]],
  ks: [[0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]],
  sd: [[0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]],
  // Santali may use Ol Chiki or Latin; Latin-heavy overlays are accepted by RELAXED in sanitize.
  sat: [[0x1c50, 0x1c7f]],
  // Manipuri may use Meitei Mayek or Bengali script.
  mni: [[0xabc0, 0xabff], [0x0980, 0x09ff]],
};

/** Latin digits, punctuation, brand tokens — always allowed. */
const LATIN_OR_COMMON =
  /[A-Za-z0-9\s·•.,;:!?'"()\-–—/%°@#&+×→←↗↘…0-9\u0964\u0965]/;

function charInRanges(code, ranges) {
  return ranges.some(([start, end]) => code >= start && code <= end);
}

function scriptCounts(text) {
  const counts = { expected: 0, devanagari: 0, other: 0, latin: 0 };

  for (const char of text) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;

    if (code <= 0x007f || LATIN_OR_COMMON.test(char)) {
      counts.latin += 1;
      continue;
    }

    if (code >= 0x0900 && code <= 0x097f) {
      counts.devanagari += 1;
      continue;
    }

    counts.other += 1;
  }

  return counts;
}

/**
 * Returns true when a translation string looks appropriate for the locale.
 * Mixed Hindi fragments in Telugu/Bengali files are rejected → English fallback.
 */
export function isTranslationAcceptable(value, locale) {
  if (typeof value !== 'string' || !value.trim()) return false;

  const ranges = LOCALE_SCRIPT_RANGES[locale];
  if (!ranges) return true;

  let expected = 0;
  let devanagari = 0;
  let letters = 0;

  for (const char of value) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;
    if (code <= 0x007f || LATIN_OR_COMMON.test(char)) continue;

    letters += 1;
    if (charInRanges(code, ranges)) expected += 1;
    else if (code >= 0x0900 && code <= 0x097f) devanagari += 1;
  }

  if (letters === 0) return true;

  const devanagariLocales = new Set(['hi', 'mr', 'mai', 'ne', 'kok', 'doi']);
  // Latin / mixed orthographies intentionally used for some locales
  if (locale === 'sat') return true;
  if (locale === 'mni') {
    // Meitei Mayek or Bengali script both OK
    return expected / letters >= 0.2 || letters === 0;
  }

  if (!devanagariLocales.has(locale) && devanagari / letters > 0.15) {
    return false;
  }

  if (devanagariLocales.has(locale)) return true;

  return expected / letters >= 0.35;
}

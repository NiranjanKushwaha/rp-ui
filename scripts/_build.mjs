#!/usr/bin/env node
/** Builds scripts/generate-section-overlays.mjs with embedded overlays for 19 locales. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const hi = JSON.parse(readFileSync(join(ROOT, 'messages/hi.json'), 'utf8'));
const en = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));

const LOCALES = [
  'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa',
  'as', 'mai', 'sat', 'ks', 'ne', 'sd', 'kok', 'mni', 'doi',
];

function flat(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v) Object.assign(out, flat(v, path));
    else out[path] = v;
  }
  return out;
}

function unflattenPaths(flatObj) {
  const footer = {};
  const sections = {};
  for (const [path, value] of Object.entries(flatObj)) {
    const parts = path.split('.');
    const root = parts[0] === 'footer' ? footer : sections;
    let cur = root;
    for (let i = 1; i < parts.length - 1; i++) {
      cur[parts[i]] ??= {};
      cur = cur[parts[i]];
    }
    cur[parts.at(-1)] = value;
  }
  return { footer, sections };
}

const enFlat = { ...flat(en.footer, 'footer'), ...flat(en.sections, 'sections') };
const hiFlat = { ...flat(hi.footer, 'footer'), ...flat(hi.sections, 'sections') };
const paths = Object.keys(enFlat).sort();

function applyRules(text, rules) {
  let out = text;
  for (const [from, to] of rules) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

/** English-string translation tables per locale (165 unique en leaf values). */
const EN_TABLE = {};

// Import locale tables from generated data file
const { LOCALE_EN_TABLES } = await import(`./_locale-en-tables.mjs?t=${Date.now()}`);
for (const loc of LOCALES) EN_TABLE[loc] = LOCALE_EN_TABLES[loc];

function translateEn(text, locale) {
  return EN_TABLE[locale]?.[text] ?? text;
}

const overlays = Object.fromEntries(
  LOCALES.map((locale) => {
    const flatOut = {};
    for (const path of paths) flatOut[path] = translateEn(enFlat[path], locale);
    return [locale, unflattenPaths(flatOut)];
  }),
);

const script = `#!/usr/bin/env node
/**
 * Generate messages/overlays/{locale}.json (footer + sections only).
 * Usage: node scripts/generate-section-overlays.mjs
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OVERLAYS_DIR = join(ROOT, 'messages', 'overlays');

const LOCALES = ${JSON.stringify(LOCALES)};

export const overlays = ${JSON.stringify(overlays, null, 2)};

function countLeafKeys(obj) {
  let count = 0;
  for (const value of Object.values(obj ?? {})) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) count += countLeafKeys(value);
    else count += 1;
  }
  return count;
}

function main() {
  if (!existsSync(OVERLAYS_DIR)) mkdirSync(OVERLAYS_DIR, { recursive: true });
  console.log('Generating section overlay files…\\n');
  console.log('Locale | footer | sections | total');
  console.log('-------|--------|----------|------');
  for (const locale of LOCALES) {
    const overlay = overlays[locale];
    const footerKeys = countLeafKeys(overlay.footer);
    const sectionsKeys = countLeafKeys(overlay.sections);
    writeFileSync(join(OVERLAYS_DIR, \`\${locale}.json\`), \`\${JSON.stringify(overlay, null, 2)}\\n\`, 'utf8');
    console.log(
      \`\${locale.padEnd(6)} | \${String(footerKeys).padStart(6)} | \${String(sectionsKeys).padStart(8)} | \${footerKeys + sectionsKeys}\`,
    );
  }
  console.log(\`\\nCreated \${LOCALES.length} overlay file(s) in messages/overlays/\`);
}

main();
`;

writeFileSync(join(__dirname, 'generate-section-overlays.mjs'), script, 'utf8');
console.log('Built generate-section-overlays.mjs');

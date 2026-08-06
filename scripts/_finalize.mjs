#!/usr/bin/env node
/**
 * Builds self-contained scripts/generate-section-overlays.mjs
 * with export const overlays = { ... } for 19 locales.
 */
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
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

const hiFlat = { ...flat(hi.footer, 'footer'), ...flat(hi.sections, 'sections') };
const paths = Object.keys(hiFlat).sort();
const hiUniq = [...new Set(Object.values(hiFlat))];

function applyRules(text, rules) {
  let out = text;
  for (const [from, to] of [...rules].sort((a, b) => b[0].length - a[0].length)) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

// Complete hi-string -> locale maps (163 entries × 19 locales)
const MAPS = JSON.parse(readFileSync(join(__dirname, '_overlay-maps.json'), 'utf8'));

function translate(hiText, locale) {
  return MAPS[locale]?.[hiText] ?? hiText;
}

const overlays = Object.fromEntries(
  LOCALES.map((locale) => {
    const out = {};
    for (const path of paths) out[path] = translate(hiFlat[path], locale);
    return [locale, unflattenPaths(out)];
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
console.log('Wrote generate-section-overlays.mjs with embedded overlays');

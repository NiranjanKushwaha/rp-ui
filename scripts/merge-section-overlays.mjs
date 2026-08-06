#!/usr/bin/env node
/**
 * Deep-merge messages/overlays/{locale}.json (footer + sections)
 * into messages/{locale}.json, preserving existing nav/home/verify/admin keys.
 *
 * Usage: node scripts/merge-section-overlays.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MESSAGES_DIR = join(ROOT, 'messages');
const OVERLAYS_DIR = join(MESSAGES_DIR, 'overlays');

const LOCALES = [
  'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa',
  'as', 'mai', 'sat', 'ks', 'ne', 'sd', 'kok', 'mni', 'doi',
];

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Deep-merge overlay onto base; skip empty overlay strings (English wins). */
function deepMerge(base, overlay) {
  const out = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (isPlainObject(value)) {
      const baseChild = isPlainObject(base[key]) ? base[key] : {};
      out[key] = deepMerge(baseChild, value);
    } else if (typeof value === 'string' && value.trim()) {
      out[key] = value;
    }
  }
  return out;
}

/** Count leaf keys in a nested object. */
function countLeafKeys(obj) {
  let count = 0;
  for (const value of Object.values(obj)) {
    if (isPlainObject(value)) {
      count += countLeafKeys(value);
    } else {
      count += 1;
    }
  }
  return count;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function main() {
  if (!existsSync(OVERLAYS_DIR)) {
    console.error(`Missing overlays directory: ${OVERLAYS_DIR}`);
    process.exit(1);
  }

  const overlayFiles = readdirSync(OVERLAYS_DIR).filter((f) => f.endsWith('.json'));
  const locales = LOCALES.filter((locale) => overlayFiles.includes(`${locale}.json`));

  if (locales.length === 0) {
    console.error('No overlay files found in messages/overlays/');
    process.exit(1);
  }

  const missing = LOCALES.filter((locale) => !overlayFiles.includes(`${locale}.json`));
  if (missing.length > 0) {
    console.warn(`Warning: missing overlays for: ${missing.join(', ')}`);
  }

  console.log('Merging section overlays into locale message files…\n');

  const summary = [];

  for (const locale of locales) {
    const overlayPath = join(OVERLAYS_DIR, `${locale}.json`);
    const localePath = join(MESSAGES_DIR, `${locale}.json`);

    if (!existsSync(localePath)) {
      console.warn(`Skipping ${locale}: ${localePath} does not exist`);
      continue;
    }

    const overlay = readJson(overlayPath);
    const existing = readJson(localePath);

    // Replace footer + sections entirely so removed/stale overlay keys don't linger
    // (e.g. Hindi fragments left in te.json after sanitize dropped them from overlays).
    const { footer: _f, sections: _s, ...base } = existing;
    const merged = { ...base };
    if (overlay.footer) merged.footer = overlay.footer;
    if (overlay.sections) merged.sections = overlay.sections;

    writeJson(localePath, merged);

    const footerKeys = countLeafKeys(overlay.footer ?? {});
    const sectionsKeys = countLeafKeys(overlay.sections ?? {});
    summary.push({ locale, footerKeys, sectionsKeys, total: footerKeys + sectionsKeys });
  }

  console.log('Locale | footer | sections | total');
  console.log('-------|--------|----------|------');
  for (const row of summary) {
    console.log(
      `${row.locale.padEnd(6)} | ${String(row.footerKeys).padStart(6)} | ${String(row.sectionsKeys).padStart(8)} | ${row.total}`,
    );
  }
  console.log(`\nMerged ${summary.length} locale file(s).`);
}

main();

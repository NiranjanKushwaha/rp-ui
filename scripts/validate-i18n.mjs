#!/usr/bin/env node
/**
 * Validate i18n completeness after English-base merge.
 * Exits 1 if any locale resolves to empty strings (should never happen).
 *
 * Usage: node scripts/validate-i18n.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, '../messages');

const LOCALES = [
  'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa',
  'as', 'mai', 'sat', 'ks', 'ne', 'sd', 'kok', 'mni', 'doi',
];

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isValidOverlayValue(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function deepMergeMessages(base, overlay) {
  const out = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (isPlainObject(value)) {
      const baseChild = isPlainObject(base[key]) ? base[key] : {};
      out[key] = deepMergeMessages(baseChild, value);
    } else if (isValidOverlayValue(value)) {
      out[key] = value;
    }
  }
  return out;
}

function collectLeafPaths(obj, prefix = '') {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) paths.push(...collectLeafPaths(value, path));
    else if (typeof value === 'string') paths.push(path);
  }
  return paths;
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => {
    if (!isPlainObject(acc)) return undefined;
    return acc[part];
  }, obj);
}

function topKeys(obj) {
  return isPlainObject(obj) ? Object.keys(obj) : [];
}

function main() {
  const en = JSON.parse(readFileSync(join(MESSAGES_DIR, 'en.json'), 'utf8'));
  const requiredPaths = collectLeafPaths(en);
  const enTop = topKeys(en).join(',');
  let failed = false;

  console.log(`Required leaf keys (from en.json): ${requiredPaths.length}`);
  console.log(`Required top-level order: ${enTop}\n`);
  console.log('Locale | missing | empty | overlay | topOrder');
  console.log('-------|---------|-------|---------|---------');

  for (const locale of LOCALES) {
    const localePath = join(MESSAGES_DIR, `${locale}.json`);
    if (!existsSync(localePath)) {
      console.log(`${locale.padEnd(6)} | ${String(requiredPaths.length).padStart(7)} | ${String(0).padStart(5)} | ${String(0).padStart(7)} | MISSING`);
      failed = true;
      continue;
    }

    const overlay = JSON.parse(readFileSync(localePath, 'utf8'));
    const merged = deepMergeMessages(en, overlay);
    const orderOk = topKeys(overlay).join(',') === enTop;

    let missing = 0;
    let empty = 0;

    for (const path of requiredPaths) {
      const value = getByPath(merged, path);
      const overlayValue = getByPath(overlay, path);

      if (typeof value !== 'string' || !value.trim()) {
        empty += 1;
        failed = true;
        console.error(`  ERROR ${locale} empty at ${path}`);
      }

      if (overlayValue === undefined || (typeof overlayValue === 'string' && !overlayValue.trim())) {
        missing += 1;
      }
    }

    if (missing > 0) {
      failed = true;
      console.error(`  ERROR ${locale}: ${missing} keys missing from locale file (must match en.json)`);
    }
    if (!orderOk) {
      failed = true;
      console.error(`  ERROR ${locale}: top-level key order differs from en.json`);
      console.error(`    got: ${topKeys(overlay).join(',')}`);
    }

    const overlayKeys = collectLeafPaths(overlay).length;
    console.log(
      `${locale.padEnd(6)} | ${String(missing).padStart(7)} | ${String(empty).padStart(5)} | ${String(overlayKeys).padStart(7)} | ${orderOk ? 'match' : 'DIFF'}`,
    );
  }

  if (failed) {
    console.error('\nValidation FAILED: every locale must have all keys in en.json order.');
    process.exit(1);
  }

  console.log('\nValidation passed: every locale has all keys in en.json structure/order.');
}

main();

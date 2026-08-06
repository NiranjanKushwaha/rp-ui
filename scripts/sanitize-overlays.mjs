#!/usr/bin/env node
/**
 * Soft sanitize: only drop empty strings and clear Hindi leaks into non-Devanagari locales.
 * Does NOT strip partial native content. Prefer English fallback only for empty values.
 *
 * Usage: node scripts/sanitize-overlays.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCALE_SCRIPT_RANGES } from './i18n-script-ranges.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OVERLAYS_DIR = join(__dirname, '../messages/overlays');

const DEVANAGARI = new Set(['hi', 'mr', 'mai', 'ne', 'kok', 'doi']);
/** Locales that intentionally use Latin / Bengali-script fallbacks. */
const RELAXED = new Set(['sat', 'mni', 'en']);

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasDevanagari(text) {
  for (const ch of text) {
    const c = ch.codePointAt(0);
    if (c >= 0x0900 && c <= 0x097f) return true;
  }
  return false;
}

function hasExpectedScript(text, locale) {
  const ranges = LOCALE_SCRIPT_RANGES[locale];
  if (!ranges) return true;
  for (const ch of text) {
    const c = ch.codePointAt(0);
    if (c === undefined || c <= 0x007f) continue;
    if (ranges.some(([s, e]) => c >= s && c <= e)) return true;
  }
  return false;
}

/**
 * Drop only: empty strings, or heavy Devanagari leaks into non-Devanagari locales
 * that also lack any expected-script characters.
 */
function shouldKeep(value, locale) {
  if (typeof value !== 'string' || !value.trim()) return false;
  if (RELAXED.has(locale) || DEVANAGARI.has(locale)) return true;

  // Punctuation / brand-only strings (©, ISO, Pure Roots, danda, etc.)
  if (/^[©\d\sA-Za-z0-9·•.,;:!?'"()\-–—/%°@#&+×→←↗↘…।॥۔]+$/.test(value.trim())) {
    return true;
  }

  // Hindi leak: mostly Devanagari with no target-script letters
  if (hasDevanagari(value) && !hasExpectedScript(value, locale)) {
    const letters = [...value].filter((ch) => {
      const c = ch.codePointAt(0);
      return c > 0x007f;
    }).length;
    const dev = [...value].filter((ch) => {
      const c = ch.codePointAt(0);
      return c >= 0x0900 && c <= 0x097f;
    }).length;
    // Ignore danda-only / punctuation as "letters"
    const realLetters = [...value].filter((ch) => {
      const c = ch.codePointAt(0);
      return c > 0x007f && c !== 0x0964 && c !== 0x0965 && c !== 0x06d4;
    }).length;
    if (realLetters > 0 && dev / Math.max(letters, 1) > 0.5 && !hasExpectedScript(value, locale)) {
      // Allow if the only Devanagari chars are danda
      const nonDandaDev = [...value].some((ch) => {
        const c = ch.codePointAt(0);
        return c >= 0x0900 && c <= 0x097f && c !== 0x0964 && c !== 0x0965;
      });
      if (nonDandaDev) return false;
    }
  }

  return true;
}

function sanitizeNode(node, locale, stats) {
  if (!isPlainObject(node)) return node;
  const out = {};
  for (const [key, value] of Object.entries(node)) {
    if (isPlainObject(value)) {
      const child = sanitizeNode(value, locale, stats);
      if (Object.keys(child).length > 0) out[key] = child;
      continue;
    }
    if (!shouldKeep(value, locale)) {
      stats.removed += 1;
      continue;
    }
    // Fix RTL punctuation
    if (
      (locale === 'ur' || locale === 'ks' || locale === 'sd') &&
      (key === 'titleAfter') &&
      value.trim() === '।'
    ) {
      out[key] = '۔';
      stats.fixed += 1;
      continue;
    }
    out[key] = value;
  }
  return out;
}

function main() {
  const files = readdirSync(OVERLAYS_DIR).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const locale = file.replace('.json', '');
    const path = join(OVERLAYS_DIR, file);
    const data = JSON.parse(readFileSync(path, 'utf8'));
    const stats = { removed: 0, fixed: 0 };
    const sanitized = sanitizeNode(data, locale, stats);
    writeFileSync(path, `${JSON.stringify(sanitized, null, 2)}\n`, 'utf8');
    console.log(`${locale}: removed ${stats.removed}, fixed ${stats.fixed}`);
  }
}

main();

#!/usr/bin/env node
/**
 * Audit locale JSON files: flag strings whose script doesn't match the locale.
 * Usage: node scripts/audit-locale-language.mjs [--overlays|--messages|--all]
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isTranslationAcceptable, LOCALE_SCRIPT_RANGES } from './i18n-script-ranges.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = join(__dirname, '../messages');
const OVERLAYS_DIR = join(MESSAGES_DIR, 'overlays');

const LOCALES = [
  'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa',
  'as', 'mai', 'sat', 'ks', 'ne', 'sd', 'kok', 'mni', 'doi',
];

const DEVANAGARI = new Set(['hi', 'mr', 'mai', 'ne', 'kok', 'doi']);
const LATIN_OK = /^[\x00-\x7F\s·•.,;:!?'"()\-–—/%°@#&+×→←↗↘…]*$/;

function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function walk(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (isPlainObject(v)) out.push(...walk(v, path));
    else if (typeof v === 'string') out.push({ path, value: v });
  }
  return out;
}

function charInRanges(code, ranges) {
  return ranges.some(([s, e]) => code >= s && code <= e);
}

function analyzeString(value, locale) {
  const ranges = LOCALE_SCRIPT_RANGES[locale];
  let latin = 0;
  let expected = 0;
  let devanagari = 0;
  let otherNative = 0;

  for (const char of value) {
    const code = char.codePointAt(0);
    if (code === undefined) continue;
    if (code <= 0x007f || /[0-9\s·•.,;:!?'"()\-–—/%°@#&+×→←↗↘…]/.test(char)) {
      latin += 1;
      continue;
    }
    if (code >= 0x0900 && code <= 0x097f) devanagari += 1;
    else if (ranges && charInRanges(code, ranges)) expected += 1;
    else otherNative += 1;
  }

  const letters = expected + devanagari + otherNative;
  if (!value.trim()) return { kind: 'empty' };
  // Devanagari danda / Arabic full stop / common punctuation
  if (/^[।॥۔\.!?…]+$/.test(value.trim())) return { kind: 'native_ok' };
  // Brand / copyright / Latin-only technical strings
  if (/^[©\d\sA-Za-z0-9·•.,;:!?'"()\-–—/%°@#&+×→←↗↘…●]+$/.test(value.trim())) {
    return { kind: 'latin_only' };
  }
  if (letters === 0) return { kind: 'latin_only' };

  if (DEVANAGARI.has(locale)) {
    if (devanagari / letters >= 0.5) return { kind: 'native_ok', script: 'devanagari' };
    if (latin / (latin + letters) > 0.85) return { kind: 'english_only' };
    if (devanagari > 0 && otherNative / letters > 0.2)
      return { kind: 'wrong_script', detail: 'mixed non-Devanagari' };
    return { kind: devanagari > 0 ? 'native_ok' : 'english_only' };
  }

  if (devanagari / letters > 0.15) return { kind: 'wrong_script', detail: 'Hindi/Devanagari leak' };
  if (expected / letters >= 0.35) return { kind: 'native_ok' };
  if (otherNative / letters > 0.35) return { kind: 'wrong_script', detail: 'foreign script' };
  if (latin / (latin + letters) > 0.7) return { kind: 'english_only' };

  return { kind: 'ambiguous' };
}

function auditFile(filePath, locale) {
  if (!existsSync(filePath)) return null;
  const data = JSON.parse(readFileSync(filePath, 'utf8'));
  const leaves = walk(data);

  const summary = {
    locale,
    file: filePath.replace(MESSAGES_DIR + '/', ''),
    total: leaves.length,
    native_ok: 0,
    english_only: 0,
    latin_only: 0,
    wrong_script: 0,
    ambiguous: 0,
    empty: 0,
    wrongSamples: [],
    englishSamples: [],
  };

  for (const { path, value } of leaves) {
    const a = analyzeString(value, locale);
    summary[a.kind] = (summary[a.kind] ?? 0) + 1;

    if (a.kind === 'wrong_script' && summary.wrongSamples.length < 5) {
      summary.wrongSamples.push({ path, preview: value.slice(0, 80) });
    }
    if (a.kind === 'english_only' && summary.englishSamples.length < 3 && !path.includes('ISO')) {
      summary.englishSamples.push({ path, preview: value.slice(0, 60) });
    }
  }

  summary.pass =
    summary.wrong_script === 0 &&
    summary.ambiguous === 0 &&
    summary.empty === 0;

  return summary;
}

function printReport(summaries) {
  console.log('\n=== Locale language audit ===\n');
  console.log(
    'Locale | File        | Total | Native✓ | English | Wrong | Pass',
  );
  console.log('-------|-------------|-------|---------|---------|-------|------');

  for (const s of summaries) {
    console.log(
      `${s.locale.padEnd(6)} | ${s.file.padEnd(11)} | ${String(s.total).padStart(5)} | ${String(s.native_ok).padStart(7)} | ${String(s.english_only + s.latin_only).padStart(7)} | ${String(s.wrong_script).padStart(5)} | ${s.pass ? '✓' : '✗'}`,
    );
  }

  const failed = summaries.filter((s) => !s.pass);
  if (failed.length) {
    console.log('\n--- Issues (wrong script / ambiguous) ---\n');
    for (const s of failed) {
      if (s.wrongSamples.length) {
        console.log(`[${s.locale}] ${s.file} — wrong script (${s.wrong_script}):`);
        for (const w of s.wrongSamples) console.log(`  • ${w.path}: ${w.preview}`);
      }
      if (s.ambiguous) console.log(`[${s.locale}] ${s.ambiguous} ambiguous strings`);
      if (s.empty) console.log(`[${s.locale}] ${s.empty} empty strings`);
    }
  }
}

const mode = process.argv[2] ?? '--all';
const summaries = [];

if (mode === '--overlays' || mode === '--all') {
  console.log('Auditing messages/overlays/*.json …');
  for (const locale of LOCALES) {
    const s = auditFile(join(OVERLAYS_DIR, `${locale}.json`), locale);
    if (s) summaries.push(s);
  }
}

if (mode === '--messages' || mode === '--all') {
  console.log('Auditing messages/{locale}.json (merged locale files) …');
  for (const locale of LOCALES) {
    const s = auditFile(join(MESSAGES_DIR, `${locale}.json`), locale);
    if (s) {
      s.file = `${locale}.json`;
      summaries.push(s);
    }
  }
}

printReport(summaries);

const anyWrong = summaries.some((s) => s.wrong_script > 0 || s.ambiguous > 0 || s.empty > 0);
process.exit(anyWrong ? 1 : 0);

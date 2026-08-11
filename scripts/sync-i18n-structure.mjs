#!/usr/bin/env node
/**
 * Rebuild every messages/{locale}.json to match en.json key order + shape.
 * Keeps existing locale strings; fills gaps from scripts/i18n-fills/{locale}.json
 * (falling back to en only if a fill is missing — should not happen).
 *
 * Usage: node scripts/sync-i18n-structure.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MESSAGES = join(ROOT, 'messages');
const FILLS = join(__dirname, 'i18n-fills');

function isPlainObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => {
    if (!isPlainObject(acc)) return undefined;
    return acc[part];
  }, obj);
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!isPlainObject(cur[p])) cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

/** Rebuild `base` shape/order; prefer overlay, then fill, then English. */
function rebuild(enNode, overlayNode, fillNode, enFallbackNode) {
  if (typeof enNode === 'string') {
    if (typeof overlayNode === 'string' && overlayNode.trim()) return overlayNode;
    if (typeof fillNode === 'string' && fillNode.trim()) return fillNode;
    return enFallbackNode;
  }
  if (!isPlainObject(enNode)) return enNode;

  const out = {};
  for (const key of Object.keys(enNode)) {
    out[key] = rebuild(
      enNode[key],
      isPlainObject(overlayNode) ? overlayNode[key] : undefined,
      isPlainObject(fillNode) ? fillNode[key] : undefined,
      isPlainObject(enFallbackNode) ? enFallbackNode[key] : enFallbackNode,
    );
  }
  return out;
}

function collectLeaves(obj, prefix = '') {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) paths.push(...collectLeaves(value, path));
    else if (typeof value === 'string') paths.push(path);
  }
  return paths;
}

function main() {
  const en = JSON.parse(readFileSync(join(MESSAGES, 'en.json'), 'utf8'));
  const enLeaves = collectLeaves(en);
  mkdirSync(FILLS, { recursive: true });

  const files = readdirSync(MESSAGES).filter((f) => f.endsWith('.json'));
  let ok = 0;

  for (const file of files) {
    const locale = file.replace(/\.json$/, '');
    if (locale === 'en') {
      // Normalize en formatting only
      writeFileSync(join(MESSAGES, file), `${JSON.stringify(en, null, 2)}\n`, 'utf8');
      ok++;
      continue;
    }

    const overlayPath = join(MESSAGES, file);
    const overlay = JSON.parse(readFileSync(overlayPath, 'utf8'));
    const fillPath = join(FILLS, file);
    const fill = existsSync(fillPath)
      ? JSON.parse(readFileSync(fillPath, 'utf8'))
      : {};

    const synced = rebuild(en, overlay, fill, en);
    const leaves = collectLeaves(synced);
    const missing = enLeaves.filter((p) => {
      const v = getByPath(synced, p);
      return typeof v !== 'string' || !v.trim();
    });

    if (missing.length) {
      console.error(`✗ ${locale}: still missing ${missing.length} — ${missing.slice(0, 5).join(', ')}`);
      process.exitCode = 1;
      continue;
    }

    // Ensure no English leftovers for fill-covered paths when fill exists
    writeFileSync(overlayPath, `${JSON.stringify(synced, null, 2)}\n`, 'utf8');
    const top = Object.keys(synced).join(',');
    const enTop = Object.keys(en).join(',');
    console.log(
      `✓ ${locale.padEnd(4)} leaves=${leaves.length} topOrder=${top === enTop ? 'match' : 'DIFF'}`,
    );
    ok++;
  }

  console.log(`\nSynced ${ok}/${files.length} locale files to en.json structure.`);
}

main();

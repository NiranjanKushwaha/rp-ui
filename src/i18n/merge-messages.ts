type Messages = Record<string, unknown>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Overlay values must be non-empty strings to override English base. */
export function isValidOverlayValue(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Deep-merge locale overlays onto English.
 * Empty / whitespace overlay strings are ignored so English always wins.
 */
export function deepMergeMessages(base: Messages, overlay: Messages): Messages {
  const out: Messages = { ...base };

  for (const [key, value] of Object.entries(overlay)) {
    if (isPlainObject(value)) {
      const baseChild = isPlainObject(base[key]) ? (base[key] as Messages) : {};
      out[key] = deepMergeMessages(baseChild, value);
      continue;
    }

    if (isValidOverlayValue(value)) {
      out[key] = value;
    }
  }

  return out;
}

/** Collect dot-paths for every leaf string in a message tree. */
export function collectLeafPaths(obj: Messages, prefix = ''): string[] {
  const paths: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) {
      paths.push(...collectLeafPaths(value, path));
    } else if (typeof value === 'string') {
      paths.push(path);
    }
  }

  return paths;
}

/** Read nested string by dot path; undefined if missing or not a string. */
export function getByPath(obj: Messages, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (!isPlainObject(current) || !(part in current)) return undefined;
    current = current[part];
  }

  return typeof current === 'string' ? current : undefined;
}

export type StatusTone = 'pass' | 'pending' | 'failed' | 'neutral';

export function statusTone(value: string): StatusTone {
  const v = value.toUpperCase();
  if (v === 'PASS' || v === 'ACTIVE') return 'pass';
  if (v === 'FAIL' || v === 'FAILED') return 'failed';
  if (v === 'ARCHIVED') return 'neutral';
  return 'pending';
}

export function farmerInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

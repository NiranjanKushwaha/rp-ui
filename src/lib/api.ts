export type LabParams = {
  refractiveIndex: number;
  aitcPercent: number;
  argemone: string;
  acidValue: string;
};

export type PublicVerifyResult = {
  batchCode: string;
  batchNumber: number;
  status: string;
  productName: string;
  serialCode?: string;
  farmer: { name: string; location: string };
  lab: {
    status: string;
    labName: string;
    testedAt: string;
    params: LabParams;
  } | null;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
  'http://localhost:4000';

export function getApiUrl() {
  return API_URL;
}

/** Heuristic: bottle serials look like PR-114-0832 (extra segment). */
export function looksLikeBottleSerial(code: string): boolean {
  const parts = code.trim().split('-');
  return parts.length >= 3;
}

export async function fetchVerify(
  code: string,
): Promise<{ ok: true; data: PublicVerifyResult } | { ok: false; status: number }> {
  const trimmed = code.trim();
  const path = looksLikeBottleSerial(trimmed)
    ? `/public/bottles/${encodeURIComponent(trimmed)}`
    : `/public/batches/${encodeURIComponent(trimmed)}`;

  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    return { ok: false, status: res.status };
  }

  const data = (await res.json()) as PublicVerifyResult;
  return { ok: true, data };
}

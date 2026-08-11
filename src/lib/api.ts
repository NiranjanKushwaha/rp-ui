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

export type AdminFarmer = {
  id: string;
  name: string;
  location: string;
  consentPublished?: boolean;
};

export type AdminBatch = {
  id: string;
  batchNumber: number;
  batchCode: string;
  status: string;
  farmerId: string;
  labResultId: string | null;
  createdAt: string;
  productName: string;
  farmer: AdminFarmer | null;
  lab: {
    status: string;
    labName: string;
    testedAt: string;
    params: LabParams;
  } | null;
  statusHistory?: Array<{
    id: string;
    fromStatus: string | null;
    toStatus: string;
    note: string | null;
    createdAt: string;
  }>;
  certificates?: Array<{
    id: string;
    storageKey: string;
    originalName: string;
    createdAt: string;
  }>;
};

export type AdminBatchRow = AdminBatch & {
  labStatus: string;
};

export type UpsertLabBody = {
  status: 'PASS' | 'FAIL' | 'PENDING';
  labName: string;
  refractiveIndex: number;
  aitcPercent: number;
  argemone: string;
  acidValue: string;
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

async function getJson<T>(
  path: string,
): Promise<{ ok: true; data: T } | { ok: false; status: number }> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 0 } });
  if (!res.ok) return { ok: false, status: res.status };
  return { ok: true, data: (await res.json()) as T };
}

async function mutateJson<T>(
  path: string,
  method: 'PATCH' | 'PUT' | 'POST',
  body: unknown,
): Promise<{ ok: true; data: T } | { ok: false; status: number; message: string }> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const err = (await res.json()) as { message?: string | string[] };
      if (Array.isArray(err.message)) message = err.message.join(', ');
      else if (err.message) message = err.message;
    } catch {
      /* keep default */
    }
    return { ok: false, status: res.status, message };
  }

  return { ok: true, data: (await res.json()) as T };
}

export async function fetchVerify(code: string) {
  const trimmed = code.trim();
  const path = looksLikeBottleSerial(trimmed)
    ? `/public/bottles/${encodeURIComponent(trimmed)}`
    : `/public/batches/${encodeURIComponent(trimmed)}`;
  return getJson<PublicVerifyResult>(path);
}

export async function fetchAdminBatches() {
  return getJson<AdminBatch[]>('/admin/batches');
}

export async function fetchAdminBatch(batchCode: string) {
  return getJson<AdminBatch>(`/admin/batches/${encodeURIComponent(batchCode)}`);
}

export async function fetchAdminFarmers() {
  return getJson<AdminFarmer[]>('/admin/farmers');
}

export async function fetchAdminFarmer(id: string) {
  return getJson<AdminFarmer>(`/admin/farmers/${encodeURIComponent(id)}`);
}

export async function patchBatchStatus(batchCode: string, status: string, note?: string) {
  return mutateJson<AdminBatch>(
    `/admin/batches/${encodeURIComponent(batchCode)}/status`,
    'PATCH',
    { status, note },
  );
}

export async function upsertBatchLab(batchCode: string, body: UpsertLabBody) {
  return mutateJson<AdminBatch>(
    `/admin/batches/${encodeURIComponent(batchCode)}/lab`,
    'PUT',
    body,
  );
}

export async function fetchAdminBatchRows(): Promise<
  { ok: true; rows: AdminBatchRow[] } | { ok: false; status: number }
> {
  const res = await fetchAdminBatches();
  if (!res.ok) return res;

  const rows = res.data.map((batch) => ({
    ...batch,
    labStatus: batch.lab?.status?.toUpperCase() ?? 'PENDING',
  }));

  return { ok: true, rows };
}

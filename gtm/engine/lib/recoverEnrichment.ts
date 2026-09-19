import { isObject } from './isObject.ts';
export interface RecoveryRecord {
  id: string;
  run_id: string;
  status: 'pending' | 'completed' | 'failed';
  output?: unknown;
  basis?: Array<{ field?: string; [key: string]: unknown }>;
  checked_at?: string;
  last_error?: string;
}

/** Read an existing provider job. Never submits research or writes to CRM. */
export async function recoverEnrichment(
  row: RecoveryRecord,
  apiKey: string,
  fetcher: typeof fetch = fetch,
): Promise<RecoveryRecord> {
  if (!/^trun_[A-Za-z0-9_-]+$/.test(row.run_id)) throw new Error('Invalid run ID');
  if (row.status !== 'pending') return row;
  if (!apiKey) throw new Error('PARALLEL_API_KEY is required');
  const checked = { ...row, checked_at: new Date().toISOString() };
  try {
    const response = await fetcher(
      `https://api.parallel.ai/v1/tasks/runs/${row.run_id}/result?timeout=1`,
      { method: 'GET', headers: { 'x-api-key': apiKey }, signal: AbortSignal.timeout(20000), redirect: 'error' },
    );
    if (!response.ok) return { ...checked, last_error: `Provider HTTP ${response.status}` };
    const body: unknown = await response.json();
    if (!isObject(body) || !isObject(body.run) || body.run.run_id !== row.run_id) return { ...checked, last_error: 'Invalid provider response' };
    if (body.run.status === 'failed' || body.run.status === 'cancelled') {
      return { ...checked, status: 'failed', last_error: 'Provider reports terminal failure' };
    }
    if (body.run.status !== 'completed') return { ...checked, last_error: 'Provider job is not complete' };
    if (!isObject(body.output) || !Object.hasOwn(body.output, 'content') || !Array.isArray(body.output.basis)) {
      return { ...checked, last_error: 'Invalid provider response' };
    }
    const basis: NonNullable<RecoveryRecord['basis']> = [];
    for (const item of body.output.basis as unknown[]) {
      if (!isObject(item) || (item.field !== undefined && typeof item.field !== 'string')) return { ...checked, last_error: 'Invalid provider response' };
      basis.push({ ...item, field: item.field });
    }
    return { ...checked, status: 'completed', output: body.output.content, basis, last_error: undefined };
  } catch (error: unknown) {
    const category = error instanceof Error && ['SyntaxError','TimeoutError','AbortError','TypeError'].includes(error.name) ? error.name : 'RequestError';
    return { ...checked, last_error: `Provider ${category}; retry retrieval of this same run ID` };
  }
}

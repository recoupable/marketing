import { isObject } from './isObject.ts';
import type { RecoveryRecord } from './recoverEnrichment.ts';

/** Validate a private checkpoint; never echo its contents in errors. */
export function parseRecoveryCheckpoint(body: unknown): RecoveryRecord[] {
  if (!isObject(body) || body.version !== 1 || !Array.isArray(body.records)) {
    throw new Error('Invalid checkpoint schema');
  }

  const ids = new Set<string>();
  const runs = new Set<string>();

  return body.records.map((row: unknown): RecoveryRecord => {
    if (
      !isObject(row) ||
      typeof row.id !== 'string' ||
      !row.id ||
      typeof row.run_id !== 'string' ||
      !/^trun_[A-Za-z0-9_-]+$/.test(row.run_id) ||
      (row.status !== 'pending' && row.status !== 'completed' && row.status !== 'failed') ||
      ids.has(row.id) ||
      runs.has(row.run_id)
    ) {
      throw new Error('Invalid or duplicate checkpoint record');
    }

    if (
      (row.checked_at !== undefined && typeof row.checked_at !== 'string') ||
      (row.last_error !== undefined && typeof row.last_error !== 'string')
    ) {
      throw new Error('Invalid checkpoint schema');
    }

    let basis: RecoveryRecord['basis'];
    if (row.basis !== undefined) {
      if (!Array.isArray(row.basis)) {
        throw new Error('Invalid checkpoint schema');
      }
      basis = row.basis.map((item: unknown) => {
        if (!isObject(item) || (item.field !== undefined && typeof item.field !== 'string')) {
          throw new Error('Invalid checkpoint schema');
        }
        return { ...item, field: item.field };
      });
    }

    ids.add(row.id);
    runs.add(row.run_id);
    return {
      id: row.id,
      run_id: row.run_id,
      status: row.status,
      output: row.output,
      basis,
      checked_at: row.checked_at,
      last_error: row.last_error,
    };
  });
}

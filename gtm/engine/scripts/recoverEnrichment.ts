import { randomUUID } from 'node:crypto';
import { parseRecoveryCheckpoint } from '../lib/parseRecoveryCheckpoint.ts';
import { isObject } from '../lib/isObject.ts';
import { readFile, open, rename, unlink, realpath } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { recoverEnrichment } from '../lib/recoverEnrichment.ts';

const help = `Recover existing Recoup enrichment jobs after a timeout.
Usage: node --experimental-strip-types scripts/recoverEnrichment.ts --checkpoint PATH [--apply]
Default: validate and show aggregate counts, with no network or file writes.
--apply: fetch pending jobs from Parallel and checkpoint after each result.
Requires PARALLEL_API_KEY in the environment only for pending live retrievals.
Checkpoint: { "version": 1, "records": [{ "id": "local-id", "run_id": "trun_...", "status": "pending" }] }
Keep checkpoints under ignored engine/exports or engine/runs, outside public content.
Never starts research, sends messages, writes CRM fields, or marks a match verified.
Completed/failed rows are skipped. Network/HTTP failures stay pending. Run again to retrieve later.
A crashed process can leave a .lock file; inspect the checkpoint and confirm no recovery process is active before removing it.`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === '--help') { console.log(help); return; }
  let checkpoint = ''; let apply = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--checkpoint' && !checkpoint && args[i+1] && !args[i+1].startsWith('--')) checkpoint = args[++i];
    else if (args[i] === '--apply' && !apply) apply = true;
    else throw new Error('Invalid arguments. Use --help.');
  }
  if (!checkpoint) throw new Error('--checkpoint is required. Use --help.');
  const path = await realpath(resolve(checkpoint));
  const allowed = await Promise.all(['exports','runs'].map(async d => {
    try { return await realpath(new URL(`../${d}/`, import.meta.url)); } catch { return null; }
  }));
  if (!allowed.some(root => root && path.startsWith(root + '/'))) throw new Error('Checkpoint must be inside this engine’s ignored exports/ or runs/ directory.');
  const lockPath = path + '.lock'; let lock: Awaited<ReturnType<typeof open>> | undefined;
  const temporary = join(dirname(path), `.${randomUUID()}-enrichment-checkpoint.tmp`);
  try {
    if (apply) lock = await open(lockPath, 'wx', 0o600);
    const body: unknown = JSON.parse(await readFile(path, 'utf8'));
    const records = parseRecoveryCheckpoint(body);
    if (apply) {
      const key = process.env.PARALLEL_API_KEY || '';
      if (records.some(r => r.status === 'pending') && !key) throw new Error('PARALLEL_API_KEY is required');
      for (let i = 0; i < records.length; i++) {
        if (records[i].status !== 'pending') continue;
        records[i] = await recoverEnrichment(records[i], key);
        const file = await open(temporary, 'wx', 0o600);
        try { await file.writeFile(JSON.stringify({version:1,records},null,2)); await file.sync(); } finally { await file.close(); }
        await rename(temporary, path);
        console.log(JSON.stringify({processed:i+1,total:records.length,status:records[i].status}));
      }
    }
    console.log(JSON.stringify({mode:apply?'retrieval':'preview',total:records.length,completed:records.filter(r=>r.status==='completed').length,pending:records.filter(r=>r.status==='pending').length,failed:records.filter(r=>r.status==='failed').length}));
  } finally {
    if (lock) { await unlink(temporary).catch(()=>{}); await lock.close(); await unlink(lockPath); }
  }
}
main().catch((error: unknown) => {
  const safeMessages = new Set(['Invalid arguments. Use --help.','--checkpoint is required. Use --help.','Checkpoint must be inside this engine’s ignored exports/ or runs/ directory.','Invalid checkpoint schema','Invalid or duplicate checkpoint record','PARALLEL_API_KEY is required']);
  let reason = 'Unexpected recovery failure';
  if (error instanceof Error && safeMessages.has(error.message)) reason = error.message;
  else if (error instanceof SyntaxError) reason = 'Checkpoint is not valid JSON';
  else if (isObject(error) && error.code === 'EEXIST') reason = 'Recovery lock or temporary file already exists; confirm no process is active before cleanup';
  else if (isObject(error) && error.code === 'ENOENT') reason = 'Checkpoint or runtime directory does not exist';
  else if (isObject(error) && (error.code === 'EACCES' || error.code === 'EPERM')) reason = 'Filesystem access denied';
  console.error(`Recovery stopped: ${reason}. No new research was submitted.`); process.exitCode=1;
});

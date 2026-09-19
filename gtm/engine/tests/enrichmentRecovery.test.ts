import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recoverEnrichment } from '../lib/recoverEnrichment.ts';

test('completed records never make a network call', async () => {
 const row = { id: 'one', run_id: 'trun_abc', status: 'completed' as const, output: { name: 'Fixture' } };
 const result = await recoverEnrichment(row, 'secret', async () => { throw new Error('network forbidden'); });
 assert.equal(result, row);
});
test('pending run recovery uses only GET and retains field evidence', async () => {
 const row = { id: 'one', run_id: 'trun_abc', status: 'pending' as const };
 const result = await recoverEnrichment(row, 'secret', async (url, init) => {
  assert.equal(String(url), 'https://api.parallel.ai/v1/tasks/runs/trun_abc/result?timeout=1');
  assert.equal(init?.method, 'GET');
  return Response.json({run:{status:'completed',run_id:'trun_abc'},output:{content:{name:'Fixture'},basis:[{field:'name',confidence:'high',citations:[{url:'https://example.com/team'}]}]}});
 });
 assert.equal(result.status, 'completed');
 assert.deepEqual(result.output, {name:'Fixture'});
 assert.equal(result.basis?.[0].field, 'name');
});
test('408 remains pending; 429 remains retryable without new runs', async () => {
 for (const status of [408,429]) {
  const result = await recoverEnrichment({id:'one',run_id:'trun_abc',status:'pending'}, 'secret', async () => new Response('',{status}));
  assert.equal(result.status,'pending');
 }
});
test('network failures do not expose request secrets or lose the run ID', async () => {
 const result = await recoverEnrichment({id:'one',run_id:'trun_abc',status:'pending'}, 'secret', async () => {throw new Error('secret and private person');});
 assert.equal(result.status,'pending');
 assert.equal(result.run_id,'trun_abc');
 assert.ok(!JSON.stringify(result).includes('secret'));
});
test('rejects mismatched or malformed completed payloads', async () => {
 for (const body of [{run:{status:'completed',run_id:'trun_other'},output:{content:{}}},{run:{status:'completed',run_id:'trun_abc'}}]) {
  const result=await recoverEnrichment({id:'one',run_id:'trun_abc',status:'pending'},'secret',async()=>Response.json(body));
  assert.equal(result.status,'pending');
  assert.equal(result.last_error,'Invalid provider response');
 }
});
test('rejects invalid run IDs before accessing the provider', async () => {
 await assert.rejects(()=>recoverEnrichment({id:'one',run_id:'../../other',status:'pending'},'secret',async()=>{throw new Error('network forbidden');}),/Invalid run ID/);
});

test('terminal failure is not mistaken for a completed match', async () => {
 const result=await recoverEnrichment({id:'one',run_id:'trun_abc',status:'pending'},'secret',async()=>Response.json({run:{run_id:'trun_abc',status:'failed'}}));
 assert.equal(result.status,'failed');
});

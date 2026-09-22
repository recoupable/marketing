import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync, readFileSync, rmSync, existsSync, statSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const script=fileURLToPath(new URL('../scripts/recoverEnrichment.ts',import.meta.url));
const guard=fileURLToPath(new URL('./noNetwork.mjs',import.meta.url));
const root=fileURLToPath(new URL('../exports/',import.meta.url));
function execute(args:string[], key?:string) {
 const env={...process.env}; delete env.PARALLEL_API_KEY; if(key) env.PARALLEL_API_KEY=key;
 return spawnSync(process.execPath,['--import',guard,'--experimental-strip-types',script,...args],{env,encoding:'utf8'});
}
test('recovery help needs neither checkpoint nor credentials',()=>{
 const result=execute(['--help']);assert.equal(result.status,0);assert.match(result.stdout,/Never starts research/);
});
test('preview and completed reruns require no provider calls or writes',()=>{
 mkdirSync(root,{recursive:true});const dir=mkdtempSync(join(root,'test-recovery-'));const file=join(dir,'checkpoint.json');
 try {
  const body=JSON.stringify({version:1,records:[{id:'fixture',run_id:'trun_fixture',status:'completed',output:{name:'Fictional Artist'}}]});writeFileSync(file,body);
  for(const flags of [[],['--apply']]) {const r=execute(['--checkpoint',file,...flags]);assert.equal(r.status,0,r.stderr);assert.equal(readFileSync(file,'utf8'),body);assert.doesNotMatch(r.stdout,/Fictional Artist/);}
  assert.equal(existsSync(file+'.lock'),false);
 } finally {rmSync(dir,{recursive:true,force:true});}
});
test('another operator lock and duplicate run IDs fail closed',()=>{
 mkdirSync(root,{recursive:true});const dir=mkdtempSync(join(root,'test-recovery-'));const file=join(dir,'checkpoint.json');
 try {
  const row={id:'fixture',run_id:'trun_fixture',status:'pending'};
  writeFileSync(file,JSON.stringify({version:1,records:[row,{...row,id:'second'}]}));
  assert.equal(execute(['--checkpoint',file]).status,1);
  writeFileSync(file,JSON.stringify({version:1,records:[row]}));writeFileSync(file+'.lock','other operator');
  assert.equal(execute(['--checkpoint',file,'--apply']).status,1);assert.equal(readFileSync(file+'.lock','utf8'),'other operator');
 } finally {rmSync(dir,{recursive:true,force:true});}
});

test('pending retrieval failures checkpoint atomically without leaking contact details',()=>{
 mkdirSync(root,{recursive:true});const dir=mkdtempSync(join(root,'test-recovery-'));const file=join(dir,'checkpoint.json');
 try {
  writeFileSync(file,JSON.stringify({version:1,records:[{id:'private-fixture',run_id:'trun_fixture',status:'pending'}]}));
  const r=execute(['--checkpoint',file,'--apply'],'dummy-test-key');assert.equal(r.status,0,r.stderr);
  const saved=JSON.parse(readFileSync(file,'utf8'));assert.equal(saved.records[0].status,'pending');assert.ok(saved.records[0].last_error);assert.ok(saved.records[0].checked_at);
  assert.equal(statSync(file).mode & 0o777,0o600);assert.deepEqual(readdirSync(dir),['checkpoint.json']);assert.match(r.stdout,/processed/);assert.doesNotMatch(r.stdout+r.stderr,/private-fixture|dummy-test-key/);
 } finally {rmSync(dir,{recursive:true,force:true});}
});
test('argument errors remain actionable without exposing inputs',()=>{
 const r=execute(['--nonsense','private-input']);assert.equal(r.status,1);assert.match(r.stderr,/Invalid arguments/);assert.doesNotMatch(r.stderr,/private-input/);
});

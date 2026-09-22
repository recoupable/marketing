import test from "node:test";
import assert from "node:assert/strict";
import {mkdtemp, writeFile, rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {readCrmImportExclusions} from "../lib/readCrmImportExclusions.ts";

test("registry fails closed and normalizes exact emails", async () => {
 const dir = await mkdtemp(join(tmpdir(), "crm-exclusions-"));
 const path = join(dir, "registry.json");
 try {
  await assert.rejects(readCrmImportExclusions(path));
  for (const value of ["invalid", "{}", JSON.stringify({exclusions:[{email:"*@example.invalid"}]})]) {
   await writeFile(path,value); await assert.rejects(readCrmImportExclusions(path));
  }
  await writeFile(path,JSON.stringify({exclusions:[{email:" ALIAS@example.invalid "}]}));
  assert.deepEqual([...await readCrmImportExclusions(path)],["alias@example.invalid"]);
 } finally { await rm(dir,{recursive:true,force:true}); }
});

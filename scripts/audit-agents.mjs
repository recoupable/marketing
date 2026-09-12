import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = new URL(process.argv[2] || 'http://localhost:3000');
if (!['localhost', '127.0.0.1', '[::1]'].includes(base.hostname) || base.username || base.password || base.pathname !== '/') throw new Error('Use a local test origin. This audit does not call production services.');
const checks = [];
async function request(path, options = {}) {
  const response = await fetch(new URL(path, base), { ...options, signal: AbortSignal.timeout(25_000) });
  return { response, text: await response.text() };
}
async function json(path, options) {
  const result = await request(path, options);
  assert.match(result.response.headers.get('content-type') || '', /application\/(?:json|linkset\+json)/);
  return { ...result, data: JSON.parse(result.text) };
}
async function tool(name, args) {
  const result = await json('/agent-api/v1/tools', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, arguments: args }) });
  assert.equal(result.response.status, 200);
  return result.data;
}
for (const path of ['/llms.txt', '/llms-full.txt', '/agents.md']) {
  const { response, text } = await request(path);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/(plain|markdown)/);
  assert.ok(text.startsWith('# ') && text.length > 500 && !text.startsWith('<'));
  checks.push(`Readable discovery: ${path}`);
}
const { data: catalog } = await json('/agents/catalog.json');
assert.equal(catalog.tools.length, 5);
assert.ok(catalog.content.length > 200);
assert.equal(new Set(catalog.content.map(item => item.id)).size, catalog.content.length);
const { data: openapi } = await json('/openapi.json');
assert.equal(openapi.openapi, '3.1.0');
assert.deepEqual(openapi.security, []);
assert.equal(Object.keys(openapi.paths).length, 3);
checks.push('Documented public tools and a unique content registry');
const { data: apiCatalog, response: apiResponse } = await json('/.well-known/api-catalog');
assert.match(apiResponse.headers.get('content-type'), /profile="https:\/\/www.rfc-editor.org\/info\/rfc9727"/);
const specLinks = apiCatalog.linkset[0].item;
assert.equal(specLinks.length, 11);
for (const item of specLinks) {
  const { response, data } = await json(new URL(item.href).pathname);
  assert.equal(response.status, 200);
  assert.ok(data.openapi && data.paths);
}
const { response: catalogHead } = await request('/.well-known/api-catalog', { method: 'HEAD' });
assert.match(catalogHead.headers.get('link'), /rel="api-catalog"/);
const { data: ard } = await json('/.well-known/ard.json');
assert.equal(ard.entries.length, 5);
for (const entry of ard.entries) {
  assert.match(entry.identifier, /^urn:air:/);
  assert.equal(Number('url' in entry) + Number('data' in entry), 1);
  if (entry.url) assert.equal((await request(new URL(entry.url).pathname)).response.status, 200);
}
checks.push('All API and agent-discovery destinations resolve locally');
const search = await tool('search_recoup', { query: 'royalty reporting', limit: 2 });
assert.equal(search.results[0].id, 'page:/operations');
const follow = await tool('search_recoup', { query: 'royalty reporting', limit: 2, cursor: search.nextCursor });
assert.ok(follow.results.every(item => !search.results.some(first => first.id === item.id)));
const source = await tool('read_recoup_page', { id: search.results[0].id });
assert.equal(source.representation, 'summary');
assert.match(source.markdown, /source|Source/);
const apiSearch = await tool('search_recoup', { query: 'GET /api/artists', type: 'docs', limit: 1 });
const apiRead = await tool('read_recoup_page', { id: apiSearch.results[0].id, maxLength: 12_000 });
assert.match(apiRead.markdown, /GET \/api\/artists/);
assert.match(apiRead.markdown, /[Aa]uthentication/);
checks.push('Search, pagination, and source reading complete a service and API lookup');
const estimate = await tool('estimate_workflow_roi', { monthlyHours: 100, hourlyCost: 60, timeReduction: 40, monthlySystemCost: 500, setupCost: 6000 });
assert.equal(estimate.result.hoursSaved, 40);
assert.equal(estimate.result.monthlyNetValue, 1900);
assert.equal(estimate.result.firstYearNetValue, 16_800);
const assessment = await tool('assess_workflow_readiness', { answers: { workflow: 'Reporting and finance', frequency: 'Every month', information: 'Across several tools and files', access: 'Yes, with the permissions we need', method: 'Yes, the steps are documented', owner: 'We have someone in mind', ai: 'A few people use individual tools' } });
assert.equal(assessment.recommendation.interest, 'Custom systems');
const draft = await tool('prepare_project_brief', { workflow: 'Manually match monthly royalty statements to catalog records.', desiredOutcome: 'Prepare an exception report with source links for our reviewer.' });
assert.equal(draft.submitted, false);
assert.equal(draft.status, 'draft');
assert.equal(draft.nextStep, '/contact');
checks.push('Assessment, calculation, and explicitly unsent brief return correct results');
const unknown = await json('/agent-api/v1/read?id=page:/not-a-published-page');
assert.equal(unknown.response.status, 404);
const invalid = await json('/agent-api/v1/search?query=test&limit=999');
assert.equal(invalid.response.status, 400);
const wrongType = await json('/agent-api/v1/tools', { method: 'POST', body: '{}' });
assert.equal(wrongType.response.status, 415);
checks.push('Invalid requests have typed errors and correct HTTP statuses');
const report = { base: base.origin, publicContentEntries: catalog.content.length, tools: catalog.tools.length, specifications: specLinks.length, checks, errors: [], externalActionsPerformed: false };
await mkdir(new URL('../docs/agents/', import.meta.url), { recursive: true });
await writeFile(new URL('../docs/agents/local-audit.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));

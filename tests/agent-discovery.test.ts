import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { getAgentCatalog, getAgentsMarkdown, getApiCatalog, getArdManifest, getLlmsFullText, getLlmsText, discoveryHeaders, apiCatalogMediaType } from '../lib/agent-discovery.ts';
import { agentToolDefinitions } from '../lib/agent-tools.ts';
import { site } from '../lib/site.ts';

const index = [
  { id: 'page:services', type: 'page', title: 'Services', description: 'AI strategy, custom systems, and team enablement.', url: '/services', representation: 'summary' },
  { id: 'docs:authentication', type: 'docs', title: 'Authentication', description: 'Credentials for the platform.', url: '/docs/authentication', representation: 'source' },
];
const inventory = JSON.parse(readFileSync(new URL('../content/docs/inventory.json', import.meta.url), 'utf8')) as { specifications: string[] };

test('navigation and full-context summaries identify scope and separate website access from platform auth', () => {
  for (const text of [getLlmsText(index), getLlmsFullText(index), getAgentsMarkdown()]) {
    assert.match(text, /x-api-key/);
    assert.match(text, /Authorization: Bearer/);
    assert.match(text, /website does not host a remote MCP server/);
    assert.match(text, /do not submit an inquiry or book a call/);
    assert.match(text, /not guaranteed cash savings/);
    assert.ok(!text.includes('YOUR_API_KEY'));
  }
  assert.match(getLlmsText(index), /https?:\/\/[^\s]+\/services/);
  const full = getLlmsFullText(index);
  assert.match(full, /not the full text of the website/);
  assert.match(full, /Content ID: page:services/);
  assert.ok(!full.includes('Content ID: docs:authentication'));
  assert.ok(!getLlmsText([{ ...index[0], title: 'A [special]\npage' }]).includes('[A [special]'));
});

test('custom catalog uses actual tools and content metadata without claiming an MCP protocol', () => {
  const catalog = getAgentCatalog(index);
  assert.deepEqual(catalog.tools, agentToolDefinitions);
  assert.equal(catalog.content[0].representation, 'summary');
  assert.equal(catalog.content[0].url, new URL('/services', site.url).href);
  assert.equal(catalog.interfaces.http.authentication, 'none');
  assert.match(catalog.interfaces.webmcp.draftEffect, /Nothing is submitted/);
  assert.equal(catalog.platform.mcp.url, 'https://api.recoupable.dev/mcp');
});

test('RFC 9727 catalog links the website specification and every existing imported specification', () => {
  const catalog = getApiCatalog();
  const items = catalog.linkset[0].item!;
  assert.equal(items.length, inventory.specifications.length + 1);
  assert.equal(new Set(items.map(item => item.href)).size, items.length);
  assert.equal(items[0].href, new URL('/openapi.json', site.url).href);
  for (const spec of inventory.specifications) {
    assert.ok(items.some(item => item.href.endsWith(`/docs/spec/${spec}`)), spec);
    assert.ok(existsSync(new URL(`../content/docs/source/api-reference/openapi/${spec}`, import.meta.url)), spec);
  }
  const headers = discoveryHeaders(apiCatalogMediaType);
  assert.match(headers['Content-Type'], /^application\/linkset\+json;/);
  assert.match(headers['Content-Type'], /https:\/\/www.rfc-editor.org\/info\/rfc9727/);
  assert.match(headers.Link, /rel="api-catalog"/);
  assert.equal(headers['Access-Control-Allow-Origin'], '*');
});

test('ARD entries have unique publisher-bound handles and describe actual artifacts', () => {
  const { entries } = getArdManifest();
  assert.equal(new Set(entries.map(entry => entry.identifier)).size, entries.length);
  for (const entry of entries) {
    assert.ok(entry.identifier.startsWith(`urn:air:${new URL(site.url).hostname}:recoup:`));
    assert.match(entry.type, /^[a-z]+\/[a-z0-9.+-]+/i);
    assert.ok(entry.displayName && entry.url);
    assert.equal('data' in entry, false);
    assert.equal('trustManifest' in entry, false);
    assert.ok(entry.representativeQueries.length >= 2 && entry.representativeQueries.length <= 5);
    assert.equal(entry['@context'], 'https://agenticresourcediscovery.org/context/v1');
  }
  assert.equal(entries.find(entry => entry.identifier.endsWith('platform-mcp-guide'))?.type, 'text/html');
  const website = entries.find(entry => entry.identifier.endsWith('website-api'));
  assert.ok(website && 'capabilities' in website);
  assert.deepEqual(website.capabilities, agentToolDefinitions.map(tool => tool.name));
});

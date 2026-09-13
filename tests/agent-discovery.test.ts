import { test, expect } from 'vitest';
import { ok } from './support/ok.ts';
import { readFileSync, existsSync } from 'node:fs';
import { getAgentCatalog } from '../lib/agent-discovery/getAgentCatalog.ts';
import { getAgentsMarkdown } from '../lib/agent-discovery/getAgentsMarkdown.ts';
import { getApiCatalog } from '../lib/agent-discovery/getApiCatalog.ts';
import { getArdManifest } from '../lib/agent-discovery/getArdManifest.ts';
import { getLlmsFullText } from '../lib/agent-discovery/getLlmsFullText.ts';
import { getLlmsText } from '../lib/agent-discovery/getLlmsText.ts';
import { discoveryHeaders } from '../lib/agent-discovery/discoveryHeaders.ts';
import { apiCatalogMediaType } from '../lib/agent-discovery/apiCatalogMediaType.ts';
import { agentToolDefinitions } from '../lib/agent-tools/agentToolDefinitions.ts';
import { siteConfig } from "../lib/config.ts";

const index = [
  { id: 'page:services', type: 'page', title: 'Services', description: 'AI strategy, custom systems, and team enablement.', url: '/services', representation: 'summary' },
  { id: 'docs:authentication', type: 'docs', title: 'Authentication', description: 'Credentials for the platform.', url: '/docs/authentication', representation: 'source' },
];
const inventory = JSON.parse(readFileSync(new URL('../content/docs/inventory.json', import.meta.url), 'utf8')) as { specifications: string[] };

test('navigation and full-context summaries identify scope and separate website access from platform auth', () => {
  for (const text of [getLlmsText(index), getLlmsFullText(index), getAgentsMarkdown()]) {
    expect(text).toMatch(/x-api-key/);
    expect(text).toMatch(/Authorization: Bearer/);
    expect(text).toMatch(/website does not host a remote MCP server/);
    expect(text).toMatch(/do not submit an inquiry or book a call/);
    expect(text).toMatch(/not guaranteed cash savings/);
    expect(!text.includes('YOUR_API_KEY')).toBeTruthy();
  }
  expect(getLlmsText(index)).toMatch(/https?:\/\/[^\s]+\/services/);
  const full = getLlmsFullText(index);
  expect(full).toMatch(/not the full text of the website/);
  expect(full).toMatch(/Content ID: page:services/);
  expect(!full.includes('Content ID: docs:authentication')).toBeTruthy();
  expect(!getLlmsText([{ ...index[0], title: 'A [special]\npage' }]).includes('[A [special]')).toBeTruthy();
});

test('custom catalog uses actual tools and content metadata without claiming an MCP protocol', () => {
  const catalog = getAgentCatalog(index);
  expect(catalog.tools).toStrictEqual(agentToolDefinitions);
  expect(catalog.content[0].representation).toBe('summary');
  expect(catalog.content[0].url).toBe(new URL('/services', siteConfig.url).href);
  expect(catalog.interfaces.http.authentication).toBe('none');
  expect(catalog.interfaces.webmcp.draftEffect).toMatch(/Nothing is submitted/);
  expect(catalog.platform.mcp.url).toBe('https://api.recoupable.dev/mcp');
});

test('RFC 9727 catalog links the website specification and every existing imported specification', () => {
  const catalog = getApiCatalog();
  const items = catalog.linkset[0].item!;
  expect(items.length).toBe(inventory.specifications.length + 1);
  expect(new Set(items.map(item => item.href)).size).toBe(items.length);
  expect(items[0].href).toBe(new URL('/openapi.json', siteConfig.url).href);
  for (const spec of inventory.specifications) {
    expect(items.some(item => item.href.endsWith(`/docs/spec/${spec}`)), spec).toBeTruthy();
    expect(existsSync(new URL(`../content/docs/source/api-reference/openapi/${spec}`, import.meta.url)), spec).toBeTruthy();
  }
  const headers = discoveryHeaders(apiCatalogMediaType);
  expect(headers['Content-Type']).toMatch(/^application\/linkset\+json;/);
  expect(headers['Content-Type']).toMatch(/https:\/\/www.rfc-editor.org\/info\/rfc9727/);
  expect(headers.Link).toMatch(/rel="api-catalog"/);
  expect(headers['Access-Control-Allow-Origin']).toBe('*');
});

test('ARD entries have unique publisher-bound handles and describe actual artifacts', () => {
  const { entries } = getArdManifest();
  expect(new Set(entries.map(entry => entry.identifier)).size).toBe(entries.length);
  for (const entry of entries) {
    expect(entry.identifier.startsWith(`urn:air:${new URL(siteConfig.url).hostname}:recoup:`)).toBeTruthy();
    expect(entry.type).toMatch(/^[a-z]+\/[a-z0-9.+-]+/i);
    expect(entry.displayName && entry.url).toBeTruthy();
    expect('data' in entry).toBe(false);
    expect('trustManifest' in entry).toBe(false);
    expect(entry.representativeQueries.length >= 2 && entry.representativeQueries.length <= 5).toBeTruthy();
    expect(entry['@context']).toBe('https://agenticresourcediscovery.org/context/v1');
  }
  expect(entries.find(entry => entry.identifier.endsWith('platform-mcp-guide'))?.type).toBe('text/html');
  const website = entries.find(entry => entry.identifier.endsWith('website-api'));
  ok(website && 'capabilities' in website);
  expect(website.capabilities).toStrictEqual(agentToolDefinitions.map(tool => tool.name));
});

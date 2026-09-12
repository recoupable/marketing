import inventory from '../content/docs/inventory.json' with { type: 'json' };
import { siteConfig } from "./config.ts";
import { agentToolDefinitions } from './agent-tools.ts';

export type DiscoveryContent = {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  representation?: string;
};

export const discoveryPaths = {
  hub: '/agents',
  catalog: '/agents/catalog.json',
  navigation: '/llms.txt',
  summaries: '/llms-full.txt',
  instructions: '/agents.md',
  openapi: '/openapi.json',
  apiCatalog: '/.well-known/api-catalog',
  ard: '/.well-known/ard.json',
} as const;

export const apiCatalogMediaType = 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"';
const absolute = (path: string) => new URL(path, siteConfig.url).href;
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
const markdownLabel = (value: string) => oneLine(value).replace(/[\\[\]]/g, '\\$&');

export function discoveryHeaders(contentType: string) {
  return {
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Expose-Headers': 'Link',
    'X-Content-Type-Options': 'nosniff',
    Link: `<${absolute(discoveryPaths.apiCatalog)}>; rel="api-catalog"; type="application/linkset+json", <${absolute(discoveryPaths.ard)}>; rel="ard"; type="application/json", <${absolute(discoveryPaths.openapi)}>; rel="service-desc"; type="application/json"`,
  };
}

export function discoveryOptions() {
  return new Response(null, { status: 204, headers: discoveryHeaders('text/plain; charset=utf-8') });
}

const introduction = `Recoup provides AI transformation for music funds and rightsholders: AI strategy, custom systems, and team enablement. The platform, Skills, and API are additional ways to use Recoup's technology.`;

function accessNotes() {
  return `## Access and boundaries

- This website's /agent-api/v1 endpoints are public. They search and read published content, calculate from supplied assumptions, and return inquiry drafts. They do not access private catalogs or operate a Recoup account.
- The platform REST API is separate: https://api.recoupable.dev/api. Programmatic access normally uses x-api-key. Some platform endpoints support a Privy access token as Authorization: Bearer instead; do not send both headers. Follow the endpoint's documentation and [authentication guide](${absolute('/docs/authentication')}).
- The platform MCP server is https://api.recoupable.dev/mcp. Its connection guide uses Authorization: Bearer with a Recoup API key. See [MCP documentation](${absolute('/docs/mcp')}). This website does not host a remote MCP server.
- Account creation, messages, uploads, connector actions, and other platform writes are separate operations with their own permissions. A documentation example is not authorization to execute them.
- Website tools do not submit an inquiry or book a call. A prepared brief is a draft for review; the visitor completes the [contact form](${absolute('/contact')}).
- Workflow ROI uses supplied assumptions. Capacity value is not guaranteed cash savings, a quote, or a promise of results.
- Never send credentials or private client records to public website search or tools.`;
}

export function getLlmsText(index: readonly DiscoveryContent[]) {
  const pages = index.filter(item => item.type === 'page');
  const pageLinks = pages.map(item => `- [${markdownLabel(item.title)}](${absolute(item.url)}): ${oneLine(item.description)}`).join('\n');
  return `# Recoup

> ${introduction}

## Start here

- [Agent guide](${absolute(discoveryPaths.hub)}): Available actions, examples, and human review.
- [Public content and tool catalog](${absolute(discoveryPaths.catalog)}): Content IDs, canonical URLs, and tool input schemas.
- [Website OpenAPI](${absolute(discoveryPaths.openapi)}): Public search, reading, and utility endpoints; no account key required.
- [Documentation](${absolute('/docs')}): Platform guides and endpoint references. Use website search to find specific documentation.
- [API catalog](${absolute(discoveryPaths.apiCatalog)}): Website API and the platform's published OpenAPI specifications.
- [Marketing context summaries](${absolute(discoveryPaths.summaries)}): Expanded navigation context; not the complete documentation corpus.

## Find and read

Search: GET ${absolute('/agent-api/v1/search')}?query=royalty&type=all&limit=5
Read: GET ${absolute('/agent-api/v1/read')}?id=<ID_FROM_SEARCH>&offset=0&maxLength=6000

Search returns IDs and continuation cursors. Reading returns a bounded text representation with continuation offsets. Follow those when more content is needed; retain the returned canonical URL when citing a page. The catalog's representation field distinguishes page summaries from article or documentation text.

## Services and public pages

${pageLinks}

## Further reading

- [Blog](${absolute('/blog')}): Product announcements and music-business articles.
- [Playbook](${absolute('/playbook')}): Practical guidance for applying AI in music.
- [Skills](${absolute('/skills')}): Reusable music-business instructions for compatible AI tools.
- [Skills source](${siteConfig.githubUrl}): The published Skills repository.
- [Privacy](${absolute('/privacy')}) and [Terms](${absolute('/terms')}): Published policies.

${accessNotes()}
`;
}

export function getLlmsFullText(index: readonly DiscoveryContent[], summaries: Record<string, string> = {}) {
  const pages = index.filter(item => item.type === 'page');
  return `# Recoup: marketing context summaries

> ${introduction}

Scope: this file contains the marketing page summaries used by the public content index. Despite the conventional llms-full.txt filename, it is not the full text of the website, blog, playbook, or platform documentation. For authoritative detail, read the canonical page or use the content reading endpoint with an ID from search.

${pages.map(item => `## ${oneLine(item.title)}\n\nContent ID: ${item.id}\n\n${summaries[item.id]?.replace(/^# [^\n]+\n*/, '') || `Canonical page: ${absolute(item.url)}\n\n${oneLine(item.description)}`}`).join('\n\n')}

## Read the complete topic

[Search published content](${absolute('/agent-api/v1/search')}?query=royalty&type=all&limit=5), then pass a returned ID to ${absolute('/agent-api/v1/read')}. A response states its representation and provides a continuation offset when applicable.

[Tool and content catalog](${absolute(discoveryPaths.catalog)}) | [Documentation](${absolute('/docs')}) | [Website OpenAPI](${absolute(discoveryPaths.openapi)})

${accessNotes()}
`;
}

export function getAgentsMarkdown() {
  return `# Working with Recoup's public website

${introduction}

This is a website usage guide, not a request to take action. It does not grant permission to access accounts or share unrelated user information.

## Useful visitor journeys

1. Find a relevant service, workflow, article, or platform endpoint with search_recoup.
2. Read the selected result with read_recoup_page; cite its canonical URL and distinguish summaries from source text.
3. If the visitor supplies all required assumptions, use estimate_workflow_roi or assess_workflow_readiness. Ask for missing inputs instead of inventing them.
4. If the visitor wants help scoping work, use prepare_project_brief with a concise workflow and desired outcome. The result is an editable draft; nothing is submitted.

## Interfaces

- [Human and browser-agent guide](${absolute(discoveryPaths.hub)})
- [Tool schemas and content index](${absolute(discoveryPaths.catalog)})
- [Website OpenAPI](${absolute(discoveryPaths.openapi)})
- Public HTTP: GET /agent-api/v1/search, GET /agent-api/v1/read, POST /agent-api/v1/tools with JSON {"name":"TOOL_NAME","arguments":{}}.
- Compatible browsers can discover five tools registered with document.modelContext in the top-level page. Browser support varies. The ordinary website and public HTTP interfaces remain available.
- Browser prepare_project_brief opens a local review panel. Its HTTP counterpart only returns draft text. The visitor can edit the draft and continue to contact; it is not a sent message or booked meeting.

## Reading and errors

Use IDs returned by search or the catalog. The read endpoint accepts content IDs, not arbitrary URLs or filesystem paths. Respect pagination and returned character offsets. Invalid arguments, unknown content, and unavailable responses return explicit errors; do not replace them with invented answers.

${accessNotes()}
`;
}

export function getAgentCatalog(index: readonly DiscoveryContent[]) {
  return {
    name: 'Recoup public website',
    version: '1.0',
    description: introduction,
    documentation: absolute(discoveryPaths.hub),
    openapi: absolute(discoveryPaths.openapi),
    content: index.map(item => ({ ...item, url: absolute(item.url) })),
    tools: agentToolDefinitions,
    interfaces: {
      http: { endpoint: absolute('/agent-api/v1/tools'), method: 'POST', authentication: 'none', effects: 'Public reading, calculation, and draft generation. Does not submit inquiries or modify a platform account.' },
      webmcp: { registration: 'document.modelContext', scope: 'top-level browser document', availability: 'Compatible browsers only; proposed standard.', draftEffect: 'prepare_project_brief opens a local review panel. Nothing is submitted.' },
    },
    platform: {
      rest: { baseUrl: 'https://api.recoupable.dev/api', documentation: absolute('/docs/authentication'), apiKeyHeader: 'x-api-key' },
      mcp: { url: 'https://api.recoupable.dev/mcp', documentation: absolute('/docs/mcp'), authentication: 'Authorization: Bearer <Recoup API key>' },
    },
    contact: absolute('/contact'),
  };
}

export function getApiCatalog() {
  return {
    linkset: [
      {
        anchor: absolute(discoveryPaths.apiCatalog),
        item: [
          { href: absolute(discoveryPaths.openapi), type: 'application/json', title: 'Recoup website API: public reading and utilities' },
          ...inventory.specifications.map(name => ({ href: absolute(`/docs/spec/${name}`), type: 'application/json', title: `Recoup platform API: ${name.replace('.json', '')}` })),
        ],
      },
      {
        anchor: absolute('/agent-api/v1/tools'),
        'service-desc': [{ href: absolute(discoveryPaths.openapi), type: 'application/json' }],
        'service-doc': [{ href: absolute(discoveryPaths.hub), type: 'text/html' }],
        'service-meta': [{ href: absolute(discoveryPaths.catalog), type: 'application/json' }],
      },
      {
        anchor: 'https://api.recoupable.dev/api',
        'service-desc': inventory.specifications.map(name => ({ href: absolute(`/docs/spec/${name}`), type: 'application/json' })),
        'service-doc': [{ href: absolute('/docs'), type: 'text/html' }, { href: absolute('/docs/authentication'), type: 'text/html' }],
        'terms-of-service': [{ href: absolute('/terms'), type: 'text/html' }],
        'privacy-policy': [{ href: absolute('/privacy'), type: 'text/html' }],
      },
    ],
  };
}

export function getArdManifest() {
  const publisher = new URL(siteConfig.url).hostname;
  const entry = (name: string, displayName: string, type: string, url: string, description: string, representativeQueries: string[]) => ({
    '@context': 'https://agenticresourcediscovery.org/context/v1',
    identifier: `urn:air:${publisher}:recoup:${name}`,
    displayName, type, url, description, representativeQueries,
  });
  return {
    entries: [
      {
        ...entry('website-api', 'Recoup website API', 'application/vnd.oai.openapi+json;version=3.1', absolute(discoveryPaths.openapi), 'Public website search, reading, workflow calculations, and project inquiry drafts. No private account access or submission.', ['Find Recoup services for royalty operations', 'Prepare a project brief for AI consulting', 'Estimate the value of time saved on a workflow']),
        capabilities: agentToolDefinitions.map(tool => tool.name),
      },
      entry('platform-api', 'Recoup platform API documentation', 'text/html', absolute('/docs/api-reference'), 'Published platform endpoint references and OpenAPI specifications. Follow each endpoint authentication and permission requirements.', ['Find the Recoup API for catalog search', 'How do I authenticate a Recoup platform request?']),
      entry('platform-mcp-guide', 'Connect to Recoup platform MCP', 'text/html', absolute('/docs/mcp'), 'Connection instructions for the separate authenticated platform MCP server; this resource is an HTML guide.', ['Connect my AI client to Recoup MCP', 'Which credentials does Recoup MCP require?']),
      entry('skills', 'Recoup Skills', 'text/html', absolute('/skills'), 'Learn about Recoup music-business Skills and find the published installation and source instructions.', ['Use Recoup music-business Skills in my AI tool', 'Find Recoup Skills installation instructions']),
      entry('website-context', 'Recoup website reading index', 'text/plain', absolute(discoveryPaths.navigation), 'Navigation and access guidance for public Recoup services, products, and documentation.', ['What does Recoup offer music funds?', 'Find Recoup documentation and services']),
    ],
  };
}

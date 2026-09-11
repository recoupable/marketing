import { agentToolDefinitions } from './agent-tools.ts';
import { site } from './site.ts';

const object = (properties: Record<string, unknown>, required = Object.keys(properties)) => ({ type: 'object', properties, required });
const string = { type: 'string' };
const nullableOffset = { type: ['integer', 'null'], minimum: 0 };
const content = object({
  id: { type: 'string', description: 'Stable registry ID. Supply this to read_recoup_page.' },
  type: { type: 'string', enum: ['page', 'docs', 'blog', 'playbook'] },
  title: string, description: string, url: { type: 'string', format: 'uri' },
  representation: { type: 'string', enum: ['summary', 'full'], description: 'Marketing pages are explicit summaries. Guides and articles provide their public content.' },
  updatedAt: { type: 'string', description: 'Source modification date when available; never a generated freshness date.' },
  publishedAt: { type: 'string', description: 'Original source publication date, when available.' },
  api: object({ method: string, path: string, specificationUrl: { type: 'string', format: 'uri' } }),
}, ['id', 'type', 'title', 'description', 'url', 'representation']);

const search = object({ query: string, results: { type: 'array', maxItems: 10, items: { allOf: [content, object({ excerpt: string })] } }, total: { type: 'integer', minimum: 0 }, nextCursor: { type: ['string', 'null'] } });
const read = { allOf: [content, object({ markdown: string, offset: { type: 'integer', minimum: 0 }, nextOffset: nullableOffset, totalLength: { type: 'integer', minimum: 0 } })] };
const toolSchema = (name: string) => agentToolDefinitions.find(tool => tool.name === name)!.inputSchema;
const error = object({ error: object({ code: string, message: string, issues: { type: 'array', items: object({ field: string, message: string }) } }, ['code', 'message']) });
const jsonResponse = (description: string, schema: unknown) => ({ description, content: { 'application/json': { schema } } });
const errors = {
  '400': jsonResponse('Invalid input, unknown tool, or unsupported cursor. Correct the named inputs before retrying.', error),
  '404': jsonResponse('No public content has this registry ID. Search for an ID first.', error),
  '503': jsonResponse('Temporarily unable to complete the request. Retry later.', error),
};

function queryParameters(name: string) {
  const schema = toolSchema(name);
  return Object.entries(schema.properties as Record<string, unknown>).map(([key, value]) => ({
    name: key, in: 'query', required: (schema.required as string[]).includes(key), schema: value,
  }));
}

export function websiteOpenAPI() {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Recoup public website tools', version: '1.0.0',
      description: 'Search and read public Recoup content, assess workflow readiness, calculate a scenario, and prepare a project brief. Anonymous, bounded, read-only computation: no account data, inquiry submission, purchases, or code execution. These are website tools; the authenticated music platform API and MCP are documented separately at /docs. Version v1 permits additive fields; incompatible changes require a new versioned path. Clients should ignore unknown response fields.',
      contact: { name: 'Recoup', email: site.email, url: `${site.url}/contact` },
      termsOfService: `${site.url}/terms`,
    },
    servers: [{ url: site.url, description: 'Recoup website; use the origin that served this specification for local or preview testing.' }],
    security: [],
    externalDocs: { description: 'Agent guide and platform connection options', url: `${site.url}/agents` },
    paths: {
      '/agent-api/v1/search': { get: {
        operationId: 'search_recoup', summary: 'Find relevant public Recoup content', description: agentToolDefinitions[0].description,
        parameters: queryParameters('search_recoup'), responses: { '200': jsonResponse('Matching results. An empty results array is a successful search with no match.', search), ...errors },
      } },
      '/agent-api/v1/read': { get: {
        operationId: 'read_recoup_page', summary: 'Read public content by registry ID', description: agentToolDefinitions[1].description,
        parameters: queryParameters('read_recoup_page'), responses: { '200': jsonResponse('One bounded text segment. Continue at nextOffset until null.', read), ...errors },
      } },
      '/agent-api/v1/tools': { post: {
        operationId: 'execute_recoup_website_tool', summary: 'Run a public website tool',
        description: 'Runs one of five public tools without saving a lead or accessing an account. Maximum request body: 16 KB. Request arguments must match the selected tool. All operations are repeatable and do not mutate server data; no idempotency key or credentials are needed. In compatible browsers, prepare_project_brief also opens a local review panel through WebMCP. A raw HTTP call returns the draft only.',
        requestBody: { required: true, content: { 'application/json': { schema: { oneOf: agentToolDefinitions.map(tool => ({ ...object({ name: { const: tool.name, type: 'string' }, arguments: tool.inputSchema }), additionalProperties: false })) } } } },
        responses: {
          '200': jsonResponse('Result for the requested tool. A draft always has submitted:false.', { oneOf: [search, read,
            object({ status: { const: 'calculated' }, assumptions: toolSchema('estimate_workflow_roi'), result: object({ hoursSaved: { type: 'number' }, capacityValue: { type: 'number' }, monthlyNetValue: { type: 'number' }, firstYearNetValue: { type: 'number' }, paybackMonths: { type: ['number', 'null'] } }), units: { type: 'object', additionalProperties: string }, interpretation: string }),
            object({ status: { const: 'assessed' }, answers: (toolSchema('assess_workflow_readiness').properties as Record<string, unknown>).answers, recommendation: object({ title: string, description: string, steps: { type: 'array', items: string }, interest: string }) }),
            object({ status: { const: 'draft' }, draft: object({ interest: string, message: string }), submitted: { const: false }, nextStep: { const: '/contact' } }),
          ] }),
          ...errors,
          '413': jsonResponse('Request body is larger than 16 KB. Shorten the supplied context.', error),
          '415': jsonResponse('Send application/json.', error),
        },
      } },
    },
  };
}

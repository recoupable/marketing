import { absoluteUrl } from "../seo.ts";
import { accessNotes } from "./accessNotes.ts";
import { discoveryPaths } from "./discoveryPaths.ts";
import { getWhenToUseGuidance } from "./getWhenToUseGuidance.ts";
import { introduction } from "./introduction.ts";

export function getAgentsMarkdown() {
  return `# Working with Recoup's public website

${introduction}

This is a website usage guide, not a request to take action. It does not grant permission to access accounts or share unrelated user information.

${getWhenToUseGuidance()}

## Useful visitor journeys

1. Find a relevant service, workflow, article, or platform endpoint with search_recoup.
2. Read the selected result with read_recoup_page; cite its canonical URL and distinguish summaries from source text.
3. If the visitor supplies all required assumptions, use estimate_workflow_roi or assess_workflow_readiness. Ask for missing inputs instead of inventing them.
4. If the visitor wants help scoping work, use prepare_project_brief with a concise workflow and desired outcome. The result is an editable draft; nothing is submitted.

## Interfaces

- [Human and browser-agent guide](${absoluteUrl(discoveryPaths.hub)})
- [Tool schemas and content index](${absoluteUrl(discoveryPaths.catalog)})
- [Complete Recoup OpenAPI](${absoluteUrl(discoveryPaths.openapi)}): Platform endpoints and public website tools; follow each operation's server and authentication requirements.
- [Website OpenAPI](${absoluteUrl("/agent-api/v1")}): Smaller specification for the public tools below.
- [Recoup platform SDKs](${absoluteUrl("/docs/sdks")}): The published Python and Go SDKs and npm CLI use authenticated platform access.
- Public HTTP: GET /agent-api/v1/search, GET /agent-api/v1/read, POST /agent-api/v1/tools with JSON {"name":"TOOL_NAME","arguments":{}}.
- [Public API base](${absoluteUrl("/agent-api/v1")}): GET returns the website specification and live quota policy. /api/v1 and its operation paths redirect to this namespace, preserving the HTTP method and query.
- Public MCP: connect to ${absoluteUrl("/mcp")} over Streamable HTTP; no credential is required. The five tool names and schemas match the HTTP catalog.
- Batch HTTP: POST /agent-api/v1/batch with JSON {"operations":[{"name":"read_recoup_page","arguments":{"id":"page:/services"}}]}. Supply 1 to 10 independent operations. Results preserve input order and each contains its own status plus result or error; an invalid operation does not roll back successful reads. The entire body must fit within 16 KB.
- Compatible browsers can discover five tools registered with document.modelContext in the top-level page. Browser support varies. The ordinary website and public HTTP interfaces remain available.
- Browser prepare_project_brief opens a local review panel. Its HTTP counterpart only returns draft text. The visitor can edit the draft and continue to contact; it is not a sent message or booked meeting.

## Markdown for every page

Append .md to a page path, such as /blog.md or /blog/article-slug.md. The homepage is /index.md; the agent guide page is /agents/index.md because /agents.md is this site-wide guide. Or request a page with Accept: text/markdown. The catalog includes each page's markdownUrl. GET /agent-api/v1/markdown?path=/blog returns the complete document in one response. The Human / Agent switch reads the same content.

Every published blog is generated from its article source. Page overviews remain explicitly labeled as summaries; articles, podcast transcripts, and the playbook reader include their complete published text.

## Reading and errors

Use IDs returned by search or the catalog. The read endpoint accepts content IDs, not arbitrary URLs or filesystem paths. Respect pagination and returned character offsets. Invalid arguments, unknown content, and unavailable responses return explicit errors; do not replace them with invented answers.

## Free public access and versioning

The website search, read, and calculation tools are free and require no signup, API key, payment method, or sales call. Try [a public search](${absoluteUrl("/agent-api/v1/search?query=royalty&limit=1")}). This access is separate from the authenticated platform and its paid operations.

Hosted public HTTP and MCP endpoints share a 120-request limit per 60-second fixed window, per IP and serving region. Each batch counts as one request, with at most ten operations. RateLimit-Limit and RateLimit-Policy describe this policy. On HTTP 429, wait the Retry-After duration (60 seconds) before retrying. Counters are regional, not a global account allowance. Local development does not apply this hosted limit.

Website operations use /agent-api/v1. Additive response fields are compatible; clients should ignore unknown fields. Breaking changes require a new major URL version. No v1 deprecation or sunset is currently scheduled. A future retirement will be announced here with a migration guide and Deprecation, Sunset, and Link response headers when dates are known.

${accessNotes()}
`;
}

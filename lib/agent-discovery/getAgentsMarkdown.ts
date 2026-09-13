import { absoluteUrl } from "../seo.ts";
import { accessNotes } from "./accessNotes.ts";
import { discoveryPaths } from "./discoveryPaths.ts";
import { introduction } from "./introduction.ts";

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

- [Human and browser-agent guide](${absoluteUrl(discoveryPaths.hub)})
- [Tool schemas and content index](${absoluteUrl(discoveryPaths.catalog)})
- [Website OpenAPI](${absoluteUrl(discoveryPaths.openapi)})
- Public HTTP: GET /agent-api/v1/search, GET /agent-api/v1/read, POST /agent-api/v1/tools with JSON {"name":"TOOL_NAME","arguments":{}}.
- Compatible browsers can discover five tools registered with document.modelContext in the top-level page. Browser support varies. The ordinary website and public HTTP interfaces remain available.
- Browser prepare_project_brief opens a local review panel. Its HTTP counterpart only returns draft text. The visitor can edit the draft and continue to contact; it is not a sent message or booked meeting.

## Reading and errors

Use IDs returned by search or the catalog. The read endpoint accepts content IDs, not arbitrary URLs or filesystem paths. Respect pagination and returned character offsets. Invalid arguments, unknown content, and unavailable responses return explicit errors; do not replace them with invented answers.

${accessNotes()}
`;
}

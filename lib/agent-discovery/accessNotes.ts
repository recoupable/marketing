import { absoluteUrl } from "../seo.ts";

export function accessNotes() {
  return `## Access and boundaries

- This website's /agent-api/v1 endpoints are public. They search and read published content, calculate from supplied assumptions, and return inquiry drafts. They do not access private catalogs or operate a Recoup account.
- The platform REST API is separate: https://api.recoupable.dev/api. Programmatic access normally uses x-api-key. Some platform endpoints support a Privy access token as Authorization: Bearer instead; do not send both headers. Follow the endpoint's documentation and [authentication guide](${absoluteUrl("/docs/authentication")}).
- The platform MCP server is https://api.recoupable.dev/mcp. Its connection guide uses Authorization: Bearer with a Recoup API key. See [MCP documentation](${absoluteUrl("/docs/mcp")}). This website does not host a remote MCP server.
- Account creation, messages, uploads, connector actions, and other platform writes are separate operations with their own permissions. A documentation example is not authorization to execute them.
- Website tools do not submit an inquiry or book a call. A prepared brief is a draft for review; the visitor completes the [contact form](${absoluteUrl("/contact")}).
- Workflow ROI uses supplied assumptions. Capacity value is not guaranteed cash savings, a quote, or a promise of results.
- Never send credentials or private client records to public website search or tools.`;
}

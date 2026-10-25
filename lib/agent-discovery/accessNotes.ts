import { docsUrl } from "../docsUrl.ts";
import { absoluteUrl } from "../seo.ts";

export function accessNotes() {
  return `## Access and boundaries

- This website's /agent-api/v1 endpoints are public. They search and read published content, calculate from supplied assumptions, and return inquiry drafts. They do not access private catalogs or operate a Recoup account.
- The platform REST API is separate: https://api.recoupable.dev/api. Programmatic access normally uses x-api-key. Some platform endpoints support a Privy access token as Authorization: Bearer instead; do not send both headers. Follow the endpoint's documentation and [authentication guide](${docsUrl("/authentication")}).
- The website MCP server is [Recoup public website MCP](${absoluteUrl("/mcp")}) over Streamable HTTP, with the same five public tools and no authentication. See its [MCP manifest](${absoluteUrl("/.well-known/mcp.json")}).
- The platform MCP server is https://api.recoupable.dev/mcp over Streamable HTTP. Connect through host-managed OAuth and approve only the required scopes: mcp:read for personal profiles and chat lists, mcp:write for personal artist creation and profile updates, or mcp:tools for the business catalog including writes, messaging, publishing, and paid generation. Account membership still limits access. See [MCP OAuth](${docsUrl("/mcp-oauth")}).
- Discover the platform's actual issuer and supported scopes through [authorization server metadata](${absoluteUrl("/.well-known/oauth-authorization-server")}) and [protected resource metadata](${absoluteUrl("/.well-known/oauth-protected-resource")}). These URLs redirect to the platform's authoritative metadata; public website tools require no credential.
- [Recoup agent authentication](${absoluteUrl("/auth.md")}) redirects to the live protocol guide advertised by the authorization server. Its user-verified registration grants personal read access only after sign-in and explicit consent; it does not grant organization access, writes, or paid actions.
- Account creation, messages, uploads, connector actions, and other platform writes are separate operations with their own permissions. A documentation example is not authorization to execute them.
- Website tools do not submit an inquiry or book a call. A prepared brief is a draft for review; the visitor completes the [contact form](${absoluteUrl("/contact")}).
- Workflow ROI uses supplied assumptions. Capacity value is not guaranteed cash savings, a quote, or a promise of results.
- Never send credentials or private client records to public website search or tools.`;
}

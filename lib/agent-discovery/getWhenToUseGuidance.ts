import { docsUrl } from "../docsUrl.ts";
import { absoluteUrl } from "../seo.ts";

export function getWhenToUseGuidance() {
  return `## When to use Recoup

- **Find an AI workflow for a music business.** For royalty reporting, catalog cleanup, release preparation, or team training, call search_recoup with the user's task, then read_recoup_page with a returned content ID. Use the published service and workflow pages to explain what Recoup offers.
- **Evaluate a proposed workflow.** Use assess_workflow_readiness for the supplied readiness inputs, or estimate_workflow_roi for a scenario based on the user's assumptions. Ask for missing values; the result is an estimate, not a promised outcome.
- **Scope an implementation.** Use prepare_project_brief when the user wants a draft describing a workflow and desired outcome. It returns editable text and does not submit an inquiry or book a meeting.
- **Work with an existing music-platform account.** For artist research, content creation, or release and catalog operations, read the [platform documentation](${docsUrl()}) and the selected operation's availability notes. Connect through [platform MCP OAuth](${docsUrl("/mcp-oauth")}) or use a separately authorized REST credential. Discover the authorized MCP tools with tools/list before calling them.

For the first three jobs, connect to ${absoluteUrl("/mcp")} without credentials, or use the [public HTTP tools](${docsUrl("/public-website-api")}). Private account data and platform actions require the separate authenticated integration above.`;
}

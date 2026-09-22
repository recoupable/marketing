import type { EveMessagePart } from "eve/client";

export type ActivityStep = {
  id: string;
  label: string;
  state: "active" | "complete" | "failed" | "stopped";
  url?: string;
  title?: string;
  domain?: string;
};

const labels: Record<string, string> = {
  read_company_website: "Reading the company website",
  read_recoup: "Reading about Recoup",
  search_recoup: "Searching Recoup’s information",
  web_search: "Searching the web",
  update_brief: "Saving your answers",
  publish_plan: "Preparing your report",
};

/** Only observable tool work belongs in the activity trail. */
export function getActivitySteps(
  parts: readonly EveMessagePart[],
  active: boolean,
) {
  const steps: ActivityStep[] = [];
  for (const part of parts) {
    if (part.type !== "dynamic-tool" || !labels[part.toolName]) continue;
    // Partial arguments are not an executed action.
    if (part.state === "input-streaming") continue;
    const output =
      part.state === "output-available" &&
      part.output &&
      typeof part.output === "object"
        ? (part.output as Record<string, unknown>)
        : undefined;
    const input =
      part.input && typeof part.input === "object"
        ? (part.input as Record<string, unknown>)
        : undefined;
    const failed =
      part.state === "output-error" ||
      part.state === "output-denied" ||
      !!output?.error;
    const complete =
      part.state === "output-available" && !part.partial && !failed;
    const step: ActivityStep = {
      id: part.toolCallId,
      label: labels[part.toolName],
      state: failed
        ? "failed"
        : complete
          ? "complete"
          : active
            ? "active"
            : "stopped",
    };
    if (part.toolName === "web_search") {
      const query = Array.isArray(input?.search_queries)
        ? input.search_queries[0]
        : input?.query;
      if (typeof query === "string" && query.trim())
        step.label = `Searching: ${query.trim().slice(0, 160)}`;
      else if (complete) step.label = "Searched the web";
    }
    const sourceUrl = typeof output?.url === "string" ? output.url : input?.url;
    if (
      ["read_company_website", "read_recoup"].includes(part.toolName) &&
      typeof sourceUrl === "string"
    ) {
      try {
        const url = new URL(sourceUrl);
        if (url.protocol === "https:" && !url.username && !url.password) {
          step.domain = url.hostname.replace(/^www\./, "");
          step.url = url.href;
          const page = `${step.domain}${url.pathname === "/" ? "" : url.pathname}`;
          step.title =
            typeof output?.title === "string" && output.title.trim()
              ? output.title.trim()
              : page;
          step.label = failed
            ? output?.statusCode === 404 || output?.statusCode === 410
              ? `Page not found: ${page}`
              : output?.reason === "timeout"
                ? `Timed out reading ${page}`
                : `Couldn’t read ${page}`
            : complete
              ? `Read ${step.domain}`
              : `Reading ${step.domain}`;
        }
      } catch {
        /* Malformed sources remain plain activity, never clickable links. */
      }
    }
    if (failed && !step.domain) step.label = `${step.label} — unavailable`;
    steps.push(step);
  }
  return steps;
}

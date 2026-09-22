import type { EveMessage } from "eve/client";

/** Match the source evidence retained by the server, including its sixteen-page limit. */
export function getResearchPages(messages: readonly EveMessage[]) {
  const pages = new Map<string, string>();
  for (const message of messages)
    for (const part of message.parts) {
      if (
        part.type !== "dynamic-tool" ||
        part.toolName !== "read_company_website" ||
        part.state !== "output-available" ||
        part.partial ||
        !part.output ||
        typeof part.output !== "object"
      )
        continue;
      const page = part.output as Record<string, unknown>;
      if (
        !page.error &&
        typeof page.url === "string" &&
        typeof page.text === "string"
      ) {
        pages.delete(page.url);
        pages.set(page.url, page.text);
      }
    }
  return Object.fromEntries([...pages].slice(-16));
}

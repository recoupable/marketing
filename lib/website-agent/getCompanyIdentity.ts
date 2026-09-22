import type { EveMessage } from "eve/client";
import { cleanDomain } from "./companyWebsite";

/** Only the submitted homepage can supply the company identity, never an article publisher. */
export function getCompanyIdentity(messages: readonly EveMessage[]) {
  const first = messages.find((message) => message.role === "user");
  const text =
    first?.parts
      .flatMap((part) => (part.type === "text" ? [part.text] : []))
      .join(" ") ?? "";
  const domain = cleanDomain(text);
  if (!domain) return;
  let name: string | undefined;
  for (const message of messages) {
    if (message.role !== "assistant") continue;
    for (const part of message.parts) {
      if (
        part.type !== "dynamic-tool" ||
        part.toolName !== "read_company_website" ||
        part.state !== "output-available" ||
        part.partial
      )
        continue;
      const input = part.input as { url?: unknown } | undefined;
      const output = part.output as
        | { siteName?: unknown; title?: unknown; error?: unknown }
        | undefined;
      if (
        typeof input?.url !== "string" ||
        cleanDomain(input.url) !== domain ||
        output?.error
      )
        continue;
      const candidate =
        typeof output?.siteName === "string" && output.siteName.trim()
          ? output.siteName
          : typeof output?.title === "string"
            ? output.title.split(/\s*[|•]\s*|\s+[–—-]\s+/)[0]
            : "";
      const title = candidate.replace(/\s+/g, " ").trim();
      if (title && title.length <= 64) name = title;
    }
  }
  return { domain, name, messageId: first!.id };
}

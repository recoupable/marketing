import { resolveDescriptionLinks } from "./resolve-description-links.ts";
import { resolveSpecLinks } from "./resolve-spec-links.ts";
import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import type { DocPage } from "./docs";
import { resolveDocsHref } from "./docs-paths.ts";
import { getDocSpec, type ApiObject } from "./docs-server.ts";
import { site } from "./site.ts";

type MarkdownNode = {
  type: string; value?: string; children?: MarkdownNode[]; depth?: number;
  url?: string; title?: string; alt?: string; lang?: string; meta?: string;
  ordered?: boolean; start?: number; checked?: boolean | null;
  identifier?: string; label?: string; referenceType?: string;
  name?: string; attributes?: { type: string; name?: string; value?: unknown }[];
};

export function absoluteAgentLink(href: string, pageUrl: string, docsLinks = false): string {
  let destination = docsLinks ? resolveDocsHref(href) : href;
  if (docsLinks && /^\/docs\/(?!raw\/).+\.mdx?(?:#.*)?$/.test(destination)) destination = destination.replace(/^\/docs\//, "/docs/raw/").replace(/\.mdx(?=#|$)/, ".md");
  try {
    const url = new URL(destination, pageUrl);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

/** Parse content, never execute MDX. Presentation components become ordinary Markdown. */
export function readableAgentMarkdown(source: string, pageUrl: string, docsLinks = false): string {
  const tree = createProcessor({ format: docsLinks ? "mdx" : "md", remarkPlugins: [remarkGfm] }).parse(source) as MarkdownNode;
  const childText = (node: MarkdownNode) => (node.children || []).map(render).join("");
  const blocks = (node: MarkdownNode) => (node.children || []).map(render).filter(Boolean).join("\n\n");
  const link = (label: string, href?: string, title?: string) => {
    const url = href ? absoluteAgentLink(href, pageUrl, docsLinks) : "";
    return url ? `[${label}](${url}${title ? ` "${title.replaceAll('"', '\\"')}"` : ""})` : label;
  };
  function render(node: MarkdownNode): string {
    switch (node.type) {
      case "root": return blocks(node);
      case "text": return node.value || "";
      case "paragraph": return childText(node);
      case "heading": return `${"#".repeat(node.depth || 2)} ${childText(node)}`;
      case "strong": return `**${childText(node)}**`;
      case "emphasis": return `*${childText(node)}*`;
      case "delete": return `~~${childText(node)}~~`;
      case "inlineCode": {
        const value = node.value || "";
        const fence = "`".repeat(Math.max(1, ...[...value.matchAll(/`+/g)].map(match => match[0].length + 1)));
        const padding = value.startsWith("`") || value.endsWith("`") ? " " : "";
        return `${fence}${padding}${value}${padding}${fence}`;
      }
      case "code": {
        const value = node.value || "";
        const fence = "`".repeat(Math.max(3, ...[...value.matchAll(/`+/g)].map(match => match[0].length + 1)));
        return `${fence}${node.lang || ""}${node.meta ? ` ${node.meta}` : ""}\n${value}\n${fence}`;
      }
      case "link": return link(childText(node), node.url, node.title);
      case "image": {
        const image = link(node.alt || "Image", node.url, node.title);
        return image.startsWith("[") ? `!${image}` : image;
      }
      case "definition": return `[${node.identifier}]: ${absoluteAgentLink(node.url || "", pageUrl, docsLinks)}${node.title ? ` "${node.title}"` : ""}`;
      case "linkReference": return `[${childText(node)}][${node.identifier}]`;
      case "imageReference": return `![${node.alt || ""}][${node.identifier}]`;
      case "blockquote": return blocks(node).split("\n").map(line => `> ${line}`).join("\n");
      case "list": return (node.children || []).map((item, index) => {
        const marker = node.ordered ? `${(node.start || 1) + index}.` : "-";
        const checkbox = item.checked === true ? "[x] " : item.checked === false ? "[ ] " : "";
        return `${marker} ${checkbox}${blocks(item).replaceAll("\n", "\n  ")}`;
      }).join("\n");
      case "listItem": return blocks(node);
      case "table": {
        const rows = (node.children || []).map(row => `| ${(row.children || []).map(cell => childText(cell).replaceAll("|", "\\|").replaceAll("\n", " ")).join(" | ")} |`);
        const separator = `| ${(node.children?.[0].children || []).map(() => "---").join(" | ")} |`;
        return rows.length ? [rows[0], separator, ...rows.slice(1)].join("\n") : "";
      }
      case "break": return "  \n";
      case "thematicBreak": return "---";
      case "footnoteReference": return `[^${node.identifier}]`;
      case "footnoteDefinition": return `[^${node.identifier}]: ${blocks(node).replaceAll("\n", "\n    ")}`;
      case "html": return (node.value || "").replace(/<br\s*\/?\s*>/gi, "\n").replace(/<[^>]*>/g, "");
      case "mdxJsxFlowElement":
      case "mdxJsxTextElement": {
        const text = blocks(node);
        const attribute = (name: string) => {
          const value = node.attributes?.find(attr => attr.type === "mdxJsxAttribute" && attr.name === name)?.value;
          return typeof value === "string" ? value : undefined;
        };
        if (node.name === "Card") return [link(attribute("title") || "Read more", attribute("href")), text].filter(Boolean).join("\n\n");
        if (["Note", "Tip", "Info", "Warning"].includes(node.name || "")) return `> **${node.name}**\n${text.split("\n").map(line => `> ${line}`).join("\n")}`;
        return text;
      }
      // Imports and expressions have no place in a readable public response.
      case "mdxjsEsm": case "mdxFlowExpression": case "mdxTextExpression": return "";
      default: return node.children ? childText(node) : node.value || "";
    }
  }
  return render(tree).trim();
}

function pointerValue(spec: ApiObject, pointer: string): unknown {
  let value: unknown = spec;
  for (const key of pointer.slice(2).split("/").map(part => part.replaceAll("~1", "/").replaceAll("~0", "~"))) {
    if (!value || typeof value !== "object" || !Object.hasOwn(value, key)) return undefined;
    value = (value as Record<string, unknown>)[key];
  }
  return value;
}

/** A complete, source-authored operation slice with its local schema closure. */
export function operationSpecification(page: DocPage, spec: ApiObject): ApiObject | undefined {
  if (!page.api) return undefined;
  const pathItem = spec.paths?.[page.api.path];
  const operation = pathItem?.[page.api.method.toLowerCase()];
  if (!operation) return undefined;
  const pathContext = Object.fromEntries(["summary", "description", "servers", "parameters"].filter(key => pathItem[key] !== undefined).map(key => [key, pathItem[key]]));
  const output: ApiObject = {
    openapi: spec.openapi,
    info: spec.info,
    ...(spec.servers ? { servers: spec.servers } : {}),
    ...(spec.security !== undefined ? { security: spec.security } : {}),
    paths: { [page.api.path]: resolveSpecLinks({ ...pathContext, [page.api.method.toLowerCase()]: operation }) },
  };
  const refs = new Set<string>();
  const scan = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    if ("$ref" in value && typeof value.$ref === "string" && value.$ref.startsWith("#/")) refs.add(value.$ref);
    Object.values(value).forEach(scan);
  };
  scan(output);
  const security = [...(spec.security || []), ...(operation.security || [])];
  for (const alternative of security) for (const scheme of Object.keys(alternative)) {
    refs.add(`#/components/securitySchemes/${scheme.replaceAll("~", "~0").replaceAll("/", "~1")}`);
  }
  // New references discovered in a component are visited by Set iteration;
  // recursive schemas terminate because every pointer is visited once.
  for (const pointer of refs) {
    const value = pointerValue(spec, pointer);
    if (value === undefined) continue;
    const keys = pointer.slice(2).split("/").map(part => part.replaceAll("~1", "/").replaceAll("~0", "~"));
    if (keys.some(key => ["__proto__", "constructor", "prototype"].includes(key))) continue;
    let target = output;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) target[key] = structuredClone(value);
      else target = target[key] ||= {};
    });
    scan(value);
  }
  return output;
}

export async function documentationAgentMarkdown(page: DocPage): Promise<string> {
  const url = new URL(page.slug ? `/docs/${page.slug}` : "/docs", site.url).href;
  const parts = [`# ${page.title}`, `Source: ${url}`, resolveDescriptionLinks(page.description ?? ""), page.body ? readableAgentMarkdown(page.body, url, true) : ""].filter(Boolean);
  if (page.api?.spec) {
    const spec = await getDocSpec(page.api.spec);
    const slice = operationSpecification(page, spec);
    const specificationUrl = new URL(`/docs/spec/${page.api.spec}`, site.url).href;
    parts.push(`## ${page.api.method} ${page.api.path}`, `Full OpenAPI specification: ${specificationUrl}`);
    if (slice) {
      const operation = spec.paths[page.api.path][page.api.method.toLowerCase()];
      const security = operation.security ?? spec.security;
      const authentication = security === undefined
        ? "The supplied specification does not declare an OpenAPI security object for this operation. Its declared headers and parameters still apply. Consult the authentication guide and the full specification before calling it."
        : security.length === 0 || security.some((alternative: Record<string, unknown>) => Object.keys(alternative).length === 0)
          ? "This operation's specification permits a request without authentication."
          : "This operation requires one of the security alternatives in the specification below. Security scheme definitions are included where present in the published specification.";
      parts.push(`## Authentication\n\n${authentication}\n\n[Authentication guide](${new URL("/docs/authentication", site.url).href})`);
      const missingSchemes = [...new Set<string>((security || []).flatMap((alternative: Record<string, unknown>) => Object.keys(alternative)))].filter(name => !Object.hasOwn(spec.components?.securitySchemes || {}, name));
      if (missingSchemes.length) parts.push(`Documentation gap: the published specification names ${missingSchemes.map(name => `\`${name}\``).join(", ")} but does not define ${missingSchemes.length === 1 ? "that security scheme" : "those security schemes"}. Check the full specification and authentication guide before calling this operation.`);
      parts.push("## Operation and referenced schemas\n\n```json\n" + JSON.stringify(slice, null, 2) + "\n```");
    } else parts.push(page.gap || "The operation could not be found in the supplied specification. Use the full specification for the current contract.");
  }
  return `${parts.join("\n\n")}\n`;
}

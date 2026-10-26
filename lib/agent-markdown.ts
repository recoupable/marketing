import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

type MarkdownNode = {
  type: string; value?: string; children?: MarkdownNode[]; depth?: number;
  url?: string; title?: string; alt?: string; lang?: string; meta?: string;
  ordered?: boolean; start?: number; checked?: boolean | null;
  identifier?: string; label?: string; referenceType?: string;
};

export function absoluteAgentLink(href: string, pageUrl: string): string {
  try {
    const url = new URL(href, pageUrl);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}

/** Parse Markdown, never execute it: readable text with absolute links for agents. */
export function readableAgentMarkdown(source: string, pageUrl: string): string {
  const tree = createProcessor({ format: "md", remarkPlugins: [remarkGfm] }).parse(source) as MarkdownNode;
  const childText = (node: MarkdownNode) => (node.children || []).map(render).join("");
  const blocks = (node: MarkdownNode) => (node.children || []).map(render).filter(Boolean).join("\n\n");
  const link = (label: string, href?: string, title?: string) => {
    const url = href ? absoluteAgentLink(href, pageUrl) : "";
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
      case "definition": return `[${node.identifier}]: ${absoluteAgentLink(node.url || "", pageUrl)}${node.title ? ` "${node.title}"` : ""}`;
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
      default: return node.children ? childText(node) : node.value || "";
    }
  }
  return render(tree).trim();
}

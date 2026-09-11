import { headingId } from "../lib/docs-paths.ts";

type Heading = { title: string; id: string };
type MarkdownNode = {
  type: string; value?: string; depth?: number; children?: MarkdownNode[];
  data?: { hProperties?: Record<string, unknown>; [key: string]: unknown };
};

function nodeText(node: MarkdownNode): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value || "";
  return (node.children || []).map(nodeText).join("");
}

/** Collect real document headings, never Markdown demonstrated inside code. */
export function docsHeadingPlugin(headings: Heading[]) {
  return function headingAnchors() {
    return function transform(tree: unknown) {
      const used = new Set<string>();
      function visit(node: MarkdownNode) {
        if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
          const title = nodeText(node);
          const base = headingId(title) || "section";
          let id = base;
          let suffix = 2;
          while (used.has(id)) id = `${base}-${suffix++}`;
          used.add(id);
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
          if (node.depth === 2) headings.push({ title, id });
        }
        for (const child of node.children || []) visit(child);
      }
      visit(tree as MarkdownNode);
    };
  };
}

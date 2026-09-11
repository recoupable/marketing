import { Fragment, type ReactNode } from "react";
import { blogPosts } from "@/lib/blog";
import { blogImageDescription } from "./blog-image-descriptions";

function articleHref(href: string) {
  if (/^https?:\/\/(?:developers|docs)\.recoupable\.(?:com|dev)(?=\/|$)/.test(href)) return href.replace(/^https?:\/\/(?:developers|docs)\.recoupable\.(?:com|dev)/, "/docs");
  const normalized = href.replace(/^https?:\/\/(?:www\.)?recoupable\.(?:com|dev)(?=\/|$)/, "") || "/";
  if (["/", "/blog", "/skills", "/platform", "/developers", "/pricing", "/advisory", "/build", "/roi", "/audit", "/docs", "/contact"].includes(normalized.split(/[?#]/)[0])) return normalized;
  if (normalized.startsWith("/blog/") && blogPosts.some(({ slug }) => normalized.split(/[?#]/)[0] === `/blog/${slug}`)) return normalized;
  if (normalized.startsWith("/") && !normalized.startsWith("//")) return `https://recoupable.dev${normalized}`;
  return /^(https?:\/\/|#|mailto:)/.test(href) ? href : "#";
}

function inline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  return text.split(pattern).filter(Boolean).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{inline(part.slice(2, -2))}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{inline(part.slice(1, -1))}</em>;
    if (part.startsWith("_") && part.endsWith("_")) return <em key={i}>{inline(part.slice(1, -1))}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={articleHref(link[2])}>{inline(link[1])}</a>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function BlogBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const listItem = (line: string) => line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
  function readList(start: number): { node: ReactNode; next: number } {
    const first = listItem(lines[start])!;
    const indent = first[1].length;
    const ordered = /\d/.test(first[2]);
    const items: ReactNode[] = [];
    let cursor = start;
    while (cursor < lines.length) {
      const current = listItem(lines[cursor]);
      if (!current || current[1].length !== indent || /\d/.test(current[2]) !== ordered) break;
      const itemKey = cursor;
      const nested: ReactNode[] = [];
      cursor++;
      while (cursor < lines.length) {
        if (!lines[cursor].trim()) { cursor++; continue; }
        const child = listItem(lines[cursor]);
        if (!child || child[1].length <= indent) break;
        const result = readList(cursor); nested.push(result.node); cursor = result.next;
      }
      items.push(<li key={itemKey}>{inline(current[3])}{nested}</li>);
    }
    return { node: ordered ? <ol key={start} start={Number.parseInt(first[2], 10)}>{items}</ol> : <ul key={start}>{items}</ul>, next: cursor };
  }
  const blocks: ReactNode[] = [];
  const isBoundary = (line: string) => !line.trim() || /^(#{1,4} |[-*] |\d+\. |---+$|\||>|```|!\[)/.test(line);
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    const key = i;
    if (!line.trim()) { i++; continue; }
    if (i + 1 < lines.length && /^(?:=+|-+)$/.test(lines[i + 1].trim()) && line.trim()) {
      blocks.push(<h2 key={key}>{inline(line)}</h2>); i += 2; continue;
    }
    if (/^---+$/.test(line.trim())) { blocks.push(<hr key={key} />); i++; continue; }
    if (line.startsWith("```")) {
      const code: string[] = []; i++;
      while (i < lines.length && !lines[i].startsWith("```")) { code.push(lines[i]); i++; }
      i++; blocks.push(<pre key={key}><code>{code.join("\n")}</code></pre>); continue;
    }
    const picture = line.match(/^!\[([^\]]*)\]\((https?:\/\/[^)]+|\/[^)]+)\)$/);
    if (picture) {
      if (picture[2].startsWith("https://paragraph.com/editor/callout/")) {
        blocks.push(<div key={key} className="blog-callout-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="7.5" r=".75" fill="currentColor" stroke="none" /></svg></div>); i++; continue;
      }
      // Imported editorial images keep their source URLs; no raw HTML is rendered.
      // eslint-disable-next-line @next/next/no-img-element
      blocks.push(<figure key={key}><img src={picture[2]} alt={picture[1] || blogImageDescription(picture[2])} loading="lazy" /><a className="blog-figure-open" href={picture[2]} target="_blank" rel="noopener noreferrer" aria-label={`View full-size image: ${picture[1] || blogImageDescription(picture[2]) || "Article illustration"} (opens in a new tab)`}>View full-size image <span aria-hidden="true">↗</span></a>{picture[1] && <figcaption>{picture[1]}</figcaption>}</figure>); i++; continue;
    }
    const heading = line.match(/^(#{1,4}) (.+)$/);
    if (heading) {
      const Tag = `h${Math.max(2, heading[1].length)}` as "h2" | "h3" | "h4";
      blocks.push(<Tag key={key}>{inline(heading[2])}</Tag>); i++; continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        const cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-+:?$/.test(cell))) rows.push(cells);
        i++;
      }
      blocks.push(<Fragment key={key}><p className="blog-table-hint">Scroll to see all columns <span aria-hidden="true">→</span></p><div className="blog-table-wrap" tabIndex={0} role="region" aria-label="Article comparison table"><table><thead><tr>{rows[0]?.map((cell, index) => <th key={index} scope="col">{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div></Fragment>); continue;
    }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) { quote.push(lines[i].replace(/^> ?/, "")); i++; }
      blocks.push(<blockquote key={key}>{quote.join("\n").split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{inline(paragraph.replaceAll("\n", " "))}</p>)}</blockquote>); continue;
    }
    if (listItem(line)) {
      const result = readList(i); blocks.push(result.node); i = result.next; continue;
    }
    const paragraph = [line]; i++;
    while (i < lines.length && !isBoundary(lines[i])) { paragraph.push(lines[i]); i++; }
    blocks.push(<p key={key}>{inline(paragraph.join(" "))}</p>);
  }
  return <div className="blog-prose">{blocks}</div>;
}

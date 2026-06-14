#!/usr/bin/env node
/**
 * scrape-every-newsletter.mjs
 *
 * Archives publicly available articles from https://every.to/newsletter into
 * ./articles/*.md for internal design/copy reference.
 *
 * - Crawls the paginated newsletter index until it hits an empty page.
 * - Saves only what the server publicly serves. Gated posts are truncated by
 *   the server itself; we mark the cut point with [PAYWALL]. No circumvention.
 * - Idempotent: already-downloaded files are skipped (use --force to rewrite).
 *
 * Usage:
 *   node scrape-every-newsletter.mjs                 # full archive
 *   node scrape-every-newsletter.mjs --pages 2       # only first 2 index pages
 *   node scrape-every-newsletter.mjs --limit 10      # only first 10 articles
 *   node scrape-every-newsletter.mjs --urls /p/a,/p/b  # specific posts only
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://every.to";
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "articles");
const UA = "Mozilla/5.0 (compatible; RecoupReferenceArchiver/1.0; personal reference copy)";
const CONCURRENCY = 5;
const MAX_INDEX_PAGES = 150;

// Listing nav/asset paths that are not articles.
const NON_ARTICLE_SEGMENTS = new Set([
  "cdn-cgi", "assets", "uploads", "users", "tags", "login", "subscribe",
  "search", "account", "api", "feeds", "sitemap.xml",
]);

// Markers that appear in the gate block right after a truncated article body.
const GATE_MARKERS = [
  "icons/lock_outline", "continue reading", "read the rest",
  "aid subscriber", "Unlock the full", "Upgrade to read",
];

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const PAGE_CAP = Number(flag("pages")) || MAX_INDEX_PAGES;
const ARTICLE_CAP = Number(flag("limit")) || Infinity;
const ONLY_URLS = flag("urls")?.split(",").map((u) => u.trim());
const FORCE = args.includes("--force");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html" },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    if (attempt >= 3) throw err;
    await sleep(1000 * attempt);
    return fetchHtml(url, attempt + 1);
  }
}

/** Returns article paths (e.g. "/p/slug") found on one newsletter index page. */
function extractPostPaths(indexHtml) {
  const paths = new Set();
  for (const m of indexHtml.matchAll(/href="([^"]+)"/g)) {
    const p = m[1].replace(/^https?:\/\/every\.to/, "").split("?")[0];
    if (!p.startsWith("/")) continue;
    const seg = p.split("/").filter(Boolean);
    if (seg.length !== 2 || seg[0].startsWith("@") || NON_ARTICLE_SEGMENTS.has(seg[0])) continue;
    paths.add(p);
  }
  return [...paths];
}

/** Finds the inner HTML of the <div> whose opening tag contains `classNeedle`. */
function extractDivByClass(html, classNeedle) {
  const idx = html.indexOf(classNeedle);
  if (idx === -1) return null;
  const open = html.lastIndexOf("<div", idx);
  let i = html.indexOf(">", open) + 1;
  let depth = 1;
  const re = /<\/?div\b/g;
  re.lastIndex = i;
  let m;
  while ((m = re.exec(html))) {
    depth += m[0] === "<div" ? 1 : -1;
    if (depth === 0) return { inner: html.slice(i, m.index), endIndex: m.index };
  }
  return { inner: html.slice(i), endIndex: html.length };
}

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Minimal HTML -> Markdown good enough for reference reading. */
function htmlToMarkdown(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|svg|noscript|form|button)[\s\S]*?<\/\1>/gi, "")
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, "\n*$1*\n")
    .replace(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, "\n![$2]($1)\n")
    .replace(/<img[^>]*src="([^"]+)"[^>]*>/gi, "\n![]($1)\n")
    .replace(/<iframe[^>]*src="([^"]+)"[^>]*>[\s\S]*?<\/iframe>/gi, "\n[Embedded media]($1)\n")
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, h, t) => {
      const text = t.replace(/<[^>]+>/g, "").trim();
      const href = h.startsWith("/") ? BASE + h : h;
      return text ? `[${text}](${href})` : "";
    })
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${"#".repeat(Number(n))} ${t.replace(/<[^>]+>/g, "").trim()}\n\n`)
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*")
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, t) => `\n\n\`\`\`\n${decodeEntities(t.replace(/<[^>]+>/g, ""))}\n\`\`\`\n\n`)
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => "\n\n" + t.replace(/<[^>]+>/g, " ").trim().split(/\n+/).map((l) => `> ${l.trim()}`).join("\n") + "\n\n")
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, t) => {
      let n = 0;
      return "\n" + t.replace(/<li[^>]*>/gi, () => `\n${++n}. `) + "\n";
    })
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|ul|ol|li|tr|table)>/gi, "\n")
    .replace(/<hr[^>]*>/gi, "\n\n---\n\n")
    .replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  return s
    .split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim()).join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseArticleLd(html) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const obj = JSON.parse(m[1]);
      if (obj["@type"] === "Article" || obj["@type"] === "NewsArticle") return obj;
    } catch { /* ignore malformed blocks */ }
  }
  return null;
}

function metaContent(html, property) {
  const m = html.match(new RegExp(`<meta[^>]*(?:property|name)="${property}"[^>]*content="([^"]*)"`));
  return m ? decodeEntities(m[1]) : "";
}

/** Builds the markdown document for one article page. */
function buildMarkdown(pagePath, html) {
  const ld = parseArticleLd(html);
  const title = ld?.headline || metaContent(html, "og:title") || pagePath;
  const description = ld?.description || metaContent(html, "og:description") || "";
  const author = Array.isArray(ld?.author) ? ld.author.map((a) => a.name).join(", ") : ld?.author?.name || "";
  const date = (ld?.datePublished || "").slice(0, 10);
  const column = pagePath.split("/").filter(Boolean)[0];
  const slug = pagePath.split("/").filter(Boolean)[1];

  let bodyMd = "";
  let paywalled = false;
  let layout = "post";

  const body = extractDivByClass(html, "post-body-content");
  if (body) {
    bodyMd = htmlToMarkdown(body.inner);
    const afterBody = html.slice(body.endIndex, body.endIndex + 4000);
    paywalled = GATE_MARKERS.some((g) => afterBody.toLowerCase().includes(g.toLowerCase()));
  } else {
    // Special layouts (interactive essays/guides): save readable text of <article>/<main>.
    layout = "special";
    const region = html.match(/<article[\s\S]*?<\/article>/i)?.[0] || html.match(/<main[\s\S]*?<\/main>/i)?.[0] || "";
    bodyMd = region ? htmlToMarkdown(region) : "*Could not extract a readable body from this layout.*";
    paywalled = /icons\/lock_outline|continue reading|read the rest|data-guide-locked-section/i.test(html);
  }

  if (paywalled) bodyMd += "\n\n[PAYWALL]";

  const fm = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    description && `subtitle: "${description.replace(/"/g, '\\"')}"`,
    author && `author: "${author.replace(/"/g, '\\"')}"`,
    date && `date: ${date}`,
    `column: ${column}`,
    `url: ${BASE}${pagePath}`,
    `paywalled: ${paywalled}`,
    layout !== "post" && `layout: ${layout}`,
    `scraped_at: ${new Date().toISOString()}`,
    "---",
  ].filter(Boolean).join("\n");

  const fileName = `${date || "undated"}-${slug}.md`;
  return { fileName, content: `${fm}\n\n# ${title}\n\n${description ? `*${description}*\n\n` : ""}${bodyMd}\n`, meta: { title, date, column, paywalled, pagePath, fileName } };
}

async function collectPostPaths() {
  if (ONLY_URLS) return ONLY_URLS;
  const all = [];
  const seen = new Set();
  let emptyStreak = 0;
  for (let page = 1; page <= PAGE_CAP; page++) {
    const html = await fetchHtml(`${BASE}/newsletter?page=${page}`);
    const paths = extractPostPaths(html);
    if (paths.length === 0) {
      if (++emptyStreak >= 2) break;
      continue;
    }
    emptyStreak = 0;
    for (const p of paths) if (!seen.has(p)) { seen.add(p); all.push(p); }
    console.log(`index page ${page}: +${paths.length} (total ${all.length})`);
    await sleep(120);
  }
  return all;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const postPaths = (await collectPostPaths()).slice(0, ARTICLE_CAP);
  console.log(`\nArticles to fetch: ${postPaths.length}\n`);

  const results = [];
  const failures = [];
  let cursor = 0;
  let done = 0;

  async function worker() {
    while (cursor < postPaths.length) {
      const pagePath = postPaths[cursor++];
      try {
        const html = await fetchHtml(BASE + pagePath);
        const { fileName, content, meta } = buildMarkdown(pagePath, html);
        const target = path.join(OUT_DIR, fileName);
        if (!FORCE && fs.existsSync(target)) {
          meta.skipped = true;
        } else {
          fs.writeFileSync(target, content);
        }
        results.push(meta);
      } catch (err) {
        failures.push({ pagePath, error: String(err) });
      }
      done++;
      if (done % 25 === 0) console.log(`fetched ${done}/${postPaths.length}`);
      await sleep(120);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Index file: newest first.
  results.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const rows = results.map((r) => `| ${r.date || "—"} | [${r.title.replace(/\|/g, "\\|")}](${r.fileName}) | ${r.column} | ${r.paywalled ? "[PAYWALL]" : "full"} |`);
  const index = [
    "# Every — newsletter archive (internal reference copies)",
    "",
    `Source: ${BASE}/newsletter — scraped ${new Date().toISOString().slice(0, 10)}.`,
    "Publicly served content only; gated posts end at the wall and are marked [PAYWALL].",
    "",
    `Total: ${results.length} | full: ${results.filter((r) => !r.paywalled).length} | paywalled: ${results.filter((r) => r.paywalled).length} | failures: ${failures.length}`,
    "",
    "| Date | Title | Column | Access |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(OUT_DIR, "INDEX.md"), index);

  if (failures.length) {
    console.log("\nFailures:");
    for (const f of failures) console.log(`  ${f.pagePath}: ${f.error}`);
  }
  console.log(`\nDONE total=${results.length} full=${results.filter((r) => !r.paywalled).length} paywalled=${results.filter((r) => r.paywalled).length} failed=${failures.length}`);
}

main().catch((err) => { console.error(err); process.exit(1); });

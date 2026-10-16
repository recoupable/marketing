import assert from "node:assert/strict";

const base = new URL(process.argv[2] || "http://localhost:3000");
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname) &&
    !base.username &&
    !base.password &&
    base.pathname === "/",
  "Use a local test origin.",
);
const catalogResponse = await fetch(new URL("/agents/catalog.json", base));
assert.equal(catalogResponse.status, 200);
const catalog = await catalogResponse.json();
const pages = catalog.content.filter((item) => item.markdownUrl);
let checked = 0;
const pending = [...pages];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (pending.length) {
      const page = pending.shift();
      for (const [path, headers] of [
        [new URL(page.markdownUrl).pathname, {}],
        [new URL(page.url).pathname, { Accept: "text/markdown" }],
      ]) {
        const response = await fetch(new URL(path, base), {
          headers,
          signal: AbortSignal.timeout(30000),
        });
        assert.equal(response.status, 200, path);
        assert.match(
          response.headers.get("content-type") || "",
          /text\/markdown/,
          path,
        );
        assert.match(response.headers.get("vary") || "", /Accept/i, path);
        assert.match(await response.text(), /^# /, path);
      }
      checked++;
    }
  }),
);
for (const path of ["/blog.md", "/docs/api-reference.md", "/index.md"]) {
  assert.equal(
    (await fetch(new URL(path, base), { method: "HEAD" })).status,
    200,
    path,
  );
}
const missing = await fetch(new URL("/blog/not-a-published-article.md", base));
assert.equal(missing.status, 404);
for (const path of ["/blog", "/about", "/docs/api-reference"]) {
  const response = await fetch(new URL(path, base), {
    headers: { Accept: "text/html" },
  });
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type") || "", /text\/html/, path);
  assert.match(response.headers.get("vary") || "", /Accept/i, path);
  assert.match(
    response.headers.get("link") || "",
    /rel="alternate"; type="text\/markdown"/,
    path,
  );
}
console.log(
  JSON.stringify(
    {
      pages: checked,
      blogs: pages.filter((page) => page.type === "blog").length,
      markdownRequests: checked * 2,
      htmlNegotiation: "passed",
      unknownPage: 404,
    },
    null,
    2,
  ),
);

import assert from "node:assert/strict";

const origin = process.argv[2] ?? "http://127.0.0.1:3000";
const read = async (path, accept = "*/*") => {
  const response = await fetch(new URL(path, origin), {
    headers: { Accept: accept }, signal: AbortSignal.timeout(20_000),
  });
  return { response, body: await response.text() };
};

for (const path of ["/__missing_readiness_probe", "/Missing_Readiness_Page", "/docs/missing-readiness-page"]) {
  const { response, body } = await read(path, "text/markdown");
  assert.equal(response.status, 404, path);
  assert.match(response.headers.get("content-type"), /text\/markdown/);
  assert.match(body, /\[.+?\]\(https?:\/\/.+?\/llms\.txt\)/);
  console.log(`PASS Markdown 404: ${path}`);
}
for (const path of ["/api", "/api/no-such-route", "/agent-api/no-such-route", "/agent-api/v1/read?id=page:/missing"]) {
  const { response, body } = await read(path, "application/json");
  assert.equal(response.status, 404, path);
  assert.match(response.headers.get("content-type"), /application\/json/);
  assert.match(JSON.parse(body).error.resolution, /openapi\.json/);
  console.log(`PASS JSON 404: ${path}`);
}
for (const [path, target, field, value] of [
  ["/.well-known/oauth-authorization-server", "/.well-known/oauth-authorization-server/api/oauth", "issuer", "https://api.recoupable.dev/api/oauth"],
  ["/.well-known/oauth-protected-resource", "/.well-known/oauth-protected-resource/mcp", "resource", "https://api.recoupable.dev/mcp"],
]) {
  const { response, body } = await read(path, "application/json");
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /application\/json/);
  const metadata = JSON.parse(body);
  assert.ok(metadata.scopes_supported.includes("mcp:read"));
  assert.equal(response.url, `https://api.recoupable.dev${target}`);
  assert.equal(metadata[field], value);
  console.log(`PASS authoritative OAuth discovery: ${path}`);
}
const readJson = async (path) => {
  const { response, body } = await read(path, "application/json");
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /application\/json/);
  return JSON.parse(body);
};
const manifest = await readJson("/.well-known/mcp.json");
assert.deepEqual(manifest.remotes, [{ type: "streamable-http", url: "https://api.recoupable.dev/mcp" }]);
const spec = await readJson("/openapi.json");
assert.ok(spec.components.schemas.ErrorResponse);
assert.deepEqual(spec.security, []);
for (const path of ["/api/missing", "/agent-api/missing"]) {
  const response = await fetch(new URL(path, origin), {
    method: "OPTIONS", headers: { Origin: "https://example.com", "Access-Control-Request-Method": "DELETE" },
    signal: AbortSignal.timeout(20_000),
  });
  assert.equal(response.status, 204);
  assert.ok(response.headers.get("access-control-allow-methods").split(", ").includes("DELETE"));
}
for (const path of ["/icons/README.md", "/images/customers/README.md", "/images/label-kit/README.md", "/images/label-kit/brands/README.md"]) {
  const { response, body } = await read(path, "text/markdown");
  assert.equal(response.status, 200, path);
  assert.ok(body.trim().length > 0);
}
const { response: homepage, body: html } = await read("/", "text/html");
assert.equal(homepage.status, 200);
assert.match(homepage.headers.get("content-type"), /text\/html/);
assert.equal(html.match(/<h([1-6])\b/i)?.[1], "1");
assert.ok(html.indexOf("<dialog") > html.indexOf("</main>"));
const organization = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
  .flatMap((match) => JSON.parse(match[1])["@graph"] ?? [])
  .find((entry) => entry["@type"] === "Organization");
assert.ok(organization.contactPoint.email);
assert.equal(organization.address["@type"], "PostalAddress");
assert.equal(organization.address.addressLocality, "Washington");
console.log("PASS MCP manifest, typed errors, anonymous access, CORS, Markdown assets, heading/dialog order, and organization metadata");

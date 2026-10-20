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
for (const path of ["/.well-known/oauth-authorization-server", "/.well-known/oauth-protected-resource"]) {
  const { response, body } = await read(path, "application/json");
  assert.equal(response.status, 200, path);
  assert.ok(JSON.parse(body).scopes_supported.includes("mcp:read"));
  assert.equal(new URL(response.url).origin, "https://api.recoupable.dev");
  console.log(`PASS authoritative OAuth discovery: ${path}`);
}
const manifest = JSON.parse((await read("/.well-known/mcp.json")).body);
assert.deepEqual(manifest.remotes, [{ type: "streamable-http", url: "https://api.recoupable.dev/mcp" }]);
const spec = JSON.parse((await read("/openapi.json")).body);
assert.ok(spec.components.schemas.ErrorResponse);
assert.deepEqual(spec.security, []);
const { body: html } = await read("/", "text/html");
assert.equal(html.match(/<h([1-6])\b/i)?.[1], "1");
const organization = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
  .flatMap((match) => JSON.parse(match[1])["@graph"] ?? [])
  .find((entry) => entry["@type"] === "Organization");
assert.ok(organization.contactPoint.email);
assert.equal(organization.address["@type"], "PostalAddress");
console.log("PASS MCP manifest, typed errors, anonymous access, first heading, and organization metadata");

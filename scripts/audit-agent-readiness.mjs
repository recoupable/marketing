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
assert.deepEqual(manifest.remotes, [{ type: "streamable-http", url: "https://recoupable.dev/mcp" }]);
const spec = await readJson("/openapi.json");
assert.ok(spec.components.schemas.ErrorResponse);
assert.deepEqual(spec.security, []);
assert.equal(spec.servers[0].url, "https://recoupable.dev/agent-api/v1");
assert.ok(spec.paths["/batch"].post.requestBody.content["application/json"].schema.properties.operations);
const { response: apiBase, body: apiBaseBody } = await read("/api/v1");
assert.equal(apiBase.status, 200);
assert.equal(new URL(apiBase.url).pathname, "/agent-api/v1");
const websiteSpec = JSON.parse(apiBaseBody);
assert.equal(websiteSpec.info.title, "Recoup public website tools");
assert.equal(websiteSpec.paths["/batch"].post.operationId, spec.paths["/batch"].post.operationId);
const bundledOperations = Object.values(spec.paths).flatMap(item => Object.entries(item).filter(([method]) => ["get", "post", "put", "patch", "delete", "head", "options", "trace"].includes(method)).map(([, operation]) => operation));
assert.equal(bundledOperations.length, 217);
assert.ok(bundledOperations.every(operation => operation.servers?.length && Array.isArray(operation.security)));
assert.match(apiBase.headers.get("link"), /rel="deprecation"/);
assert.equal(apiBase.headers.has("deprecation"), false);
assert.equal(apiBase.headers.has("sunset"), false);
const policyTarget = apiBase.headers.get("link").match(/<([^>]+)>; rel="deprecation"/)?.[1];
assert.ok(policyTarget);
const policyResponse = await fetch(policyTarget, { signal: AbortSignal.timeout(20_000) });
assert.equal(policyResponse.status, 200);
assert.match(await policyResponse.text(), /No v1 deprecation or sunset is scheduled/);
if (origin.startsWith("https://")) {
  assert.equal(apiBase.headers.get("ratelimit-limit"), "120");
  assert.match(apiBase.headers.get("ratelimit-policy"), /q=120;w=60/);
}
const { response: aliasSearch, body: aliasSearchBody } = await read("/api/v1/search?query=royalty&limit=1");
assert.equal(aliasSearch.status, 200);
assert.equal(new URL(aliasSearch.url).search, "?query=royalty&limit=1");
assert.equal(JSON.parse(aliasSearchBody).query, "royalty");
console.log("PASS versioned API alias preserves query and exposes the enforced quota");
const metadata = await readJson("/.well-known/oauth-authorization-server");
const { response: authGuide, body: authGuideBody } = await read("/auth.md");
assert.equal(authGuide.status, 200);
const { response: advertisedGuide, body: advertisedGuideBody } = await read(metadata.agent_auth.skill);
assert.equal(advertisedGuide.status, 200);
assert.equal(authGuide.url, advertisedGuide.url);
assert.equal(authGuideBody, advertisedGuideBody);
assert.match(authGuide.headers.get("content-type"), /text\/markdown/);
assert.match(authGuideBody, /^# Recoup agent authentication/);
console.log("PASS auth.md resolves to the guide advertised by the authorization server");
for (const path of ["/agent-api/v1/tools", "/agent-api/v1/batch"]) {
  const { response, body } = await read(path);
  assert.equal(response.status, 405, path);
  assert.equal(response.headers.get("allow"), "POST, OPTIONS");
  assert.equal(JSON.parse(body).error.code, "METHOD_NOT_ALLOWED");
  if (origin.startsWith("https://")) {
    assert.equal(response.headers.get("ratelimit-limit"), "120");
    assert.match(response.headers.get("ratelimit-policy"), /q=120;w=60/);
  }
}
console.log("PASS POST-only API probes expose method recovery and hosted quota policy");
const { response: markdownSpec, body: markdownSpecBody } = await read("/openapi.json.md");
assert.equal(markdownSpec.status, 200);
assert.match(markdownSpec.headers.get("content-type"), /text\/markdown/);
assert.ok(markdownSpecBody.startsWith(`# ${spec.info.title}\n`));
const fencedSpec = markdownSpecBody.match(/```json\n([\s\S]+?)\n```/)?.[1];
assert.ok(fencedSpec, "Markdown fallback includes the full OpenAPI document");
assert.deepEqual(JSON.parse(fencedSpec), spec);
console.log("PASS OpenAPI Markdown fallback preserves the full JSON contract");
for (const path of ["/api/missing", "/agent-api/missing"]) {
  const response = await fetch(new URL(path, origin), {
    method: "OPTIONS", headers: { Origin: "https://example.com", "Access-Control-Request-Method": "DELETE", "Access-Control-Request-Headers": "content-type" },
    signal: AbortSignal.timeout(20_000),
  });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.ok(response.headers.get("access-control-allow-headers").toLowerCase().split(", ").includes("content-type"));
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
const mainEnd = html.indexOf("</main>");
const dialogStart = html.indexOf("<dialog");
assert.ok(mainEnd >= 0 && dialogStart >= 0, "Main content and dialog must both exist");
assert.ok(dialogStart > mainEnd, "Dialog follows main content");
const organization = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
  .flatMap((match) => JSON.parse(match[1])["@graph"] ?? [])
  .find((entry) => entry["@type"] === "Organization");
assert.ok(organization.contactPoint.email);
assert.equal(organization.address["@type"], "PostalAddress");
assert.equal(organization.address.addressLocality, "Washington");
console.log("PASS MCP manifest, typed errors, anonymous access, CORS, Markdown assets, heading/dialog order, and organization metadata");

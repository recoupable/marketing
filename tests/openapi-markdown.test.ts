import { expect, test } from "vitest";
import { GET as jsonSpec } from "../app/openapi.json/route";
import { GET as markdownSpec } from "../app/openapi.json.md/route";

test("the OpenAPI Markdown fallback preserves the complete published JSON contract", async () => {
  const json = jsonSpec();
  const markdown = markdownSpec();
  const body = await markdown.text();
  const spec = await json.json();
  const fencedJson = body.match(/```json\n([\s\S]+?)\n```/)?.[1];

  expect(markdown.status).toBe(200);
  expect(markdown.headers.get("content-type")).toContain("text/markdown");
  expect(markdown.headers.get("access-control-allow-origin")).toBe("*");
  expect(body.startsWith(`# ${spec.info.title}\n`)).toBe(true);
  expect(fencedJson).toBeDefined();
  expect(JSON.parse(fencedJson!)).toEqual(spec);
  expect(json.headers.get("link")).toContain(
    '</openapi.json.md>; rel="alternate"; type="text/markdown"',
  );
  expect(markdown.headers.get("link")).toContain(
    '</openapi.json>; rel="canonical"',
  );
});

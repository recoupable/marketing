import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { docs } from "../lib/docs";
import { documentationAgentMarkdown } from "../lib/agent-markdown";

const slug = "api-reference/applications/validate-registration";
const endpoint = "/api/applications/registration/validate";
const source = () =>
  JSON.parse(
    readFileSync(
      "content/docs/source/api-reference/openapi/applications.json",
      "utf8",
    ),
  );

describe("application proposal preflight documentation", () => {
  it("publishes a proposal check without an application or domain-verification claim", () => {
    const spec = source();
    const operation = spec.paths[endpoint].post;
    expect(operation["x-recoup-availability"]).toBe("pending");
    expect(operation.security).toEqual([
      { apiKeyAuth: [] },
      { bearerAuth: [] },
    ]);
    const request = spec.components.schemas.ApplicationRegistrationProposal;
    expect(request.additionalProperties).toBe(false);
    expect(request.required).toEqual([
      "name",
      "environment",
      "allowed_origins",
      "return_urls",
    ]);
    expect(request.properties).not.toHaveProperty("account_id");
    expect(request.properties).not.toHaveProperty("billing_owner_id");
    expect(request.properties).not.toHaveProperty("client_secret");
    const example =
      operation.responses["200"].content["application/json"].example;
    expect(example).toMatchObject({
      status: "validated",
      persisted: false,
      origins_verified: false,
    });
    expect(example).not.toHaveProperty("application_id");
    expect(example).not.toHaveProperty("token");
    expect(example.workspace_id).toBe(example.billing_owner_id);
    expect(Object.keys(operation.responses).sort()).toEqual([
      "200",
      "400",
      "401",
      "403",
      "503",
    ]);
  });

  it("carries the complete operation, authentication errors and limits into agent Markdown", async () => {
    const page = docs.find((item) => item.slug === slug);
    expect(
      page,
      "endpoint must be present in the generated documentation index",
    ).toBeDefined();
    const markdown = await documentationAgentMarkdown(
      page!,
      "https://recoupable.dev",
    );
    const match = markdown.match(
      /## Operation and referenced schemas\n\n```json\n([\s\S]*?)\n```/,
    );
    expect(match).not.toBeNull();
    const rendered = JSON.parse(match![1]);
    expect(rendered.paths[endpoint].post.responses["200"]).toEqual(
      source().paths[endpoint].post.responses["200"],
    );
    for (const [, reference] of JSON.stringify(rendered).matchAll(
      /"\$ref":"(#\/[^"]+)"/g,
    )) {
      const target = reference
        .slice(2)
        .split("/")
        .reduce(
          (value, key) =>
            value?.[key.replaceAll("~1", "/").replaceAll("~0", "~")],
          rendered,
        );
      expect(target, reference).toBeDefined();
    }
    expect(markdown).toContain("origins_verified");
    expect(markdown).toContain("does not prove domain ownership");
    expect(markdown).toContain("normal account provisioning");
    expect(markdown).toContain("Delegated OAuth excludes");
    const reader = readFileSync("content/docs/source/llms-full.txt", "utf8");
    expect(reader).toContain(`Source: https://recoupable.dev/docs/${slug}`);
    expect(reader).toContain("validate_application_registration");
  });
});

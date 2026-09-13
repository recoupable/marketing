import { describe, expect, it } from "vitest";
import { buildPlaygroundCurl } from "@/lib/docs/playground/buildPlaygroundCurl";
import type { PlaygroundRequest } from "@/lib/docs/playground/types";

describe("buildPlaygroundCurl", () => {
  it("masks the api key and mirrors the reference curl layout", () => {
    const request: PlaygroundRequest = { method: "GET", url: "https://x.dev/api/artists?org_id=1", headers: { "x-api-key": "secret-123" } };
    expect(buildPlaygroundCurl(request)).toBe(
      "curl --request GET \\\n  --url 'https://x.dev/api/artists?org_id=1' \\\n  --header 'x-api-key: YOUR_API_KEY'",
    );
  });
  it("masks a bearer token and quotes the body safely", () => {
    const request: PlaygroundRequest = { method: "POST", url: "https://x.dev/api/chat", headers: { Authorization: "Bearer tok", "Content-Type": "application/json" }, body: "{\"prompt\":\"it's\"}" };
    const curl = buildPlaygroundCurl(request);
    expect(curl).toContain("--header 'Authorization: Bearer YOUR_API_KEY'");
    expect(curl).toContain("--header 'Content-Type: application/json'");
    expect(curl.endsWith("--data '{\"prompt\":\"it'\"'\"'s\"}'")).toBe(true);
    expect(curl).not.toContain("tok");
  });
});

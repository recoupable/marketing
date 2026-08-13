import { describe, expect, it } from "vitest";
import { buildChatUrl } from "@/lib/buildChatUrl";

describe("buildChatUrl", () => {
  it("builds the checkout success URL with UTM attribution", () => {
    expect(buildChatUrl({ checkout: "success", campaign: "pro-trial" })).toBe(
      "https://teams.recoupable.dev/?checkout=success&utm_source=marketing&utm_medium=pricing&utm_campaign=pro-trial",
    );
  });

  it("builds the free URL with UTMs only when no checkout flag is given", () => {
    expect(buildChatUrl({ campaign: "free" })).toBe(
      "https://teams.recoupable.dev/?utm_source=marketing&utm_medium=pricing&utm_campaign=free",
    );
  });
});

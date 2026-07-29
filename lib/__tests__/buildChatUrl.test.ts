import { describe, expect, it } from "vitest";
import { buildChatUrl } from "@/lib/buildChatUrl";

describe("buildChatUrl", () => {
  it("builds the pro-trial URL with intent plus UTM attribution", () => {
    expect(buildChatUrl({ intent: "pro-trial", campaign: "pro-trial" })).toBe(
      "https://chat.recoupable.dev/?intent=pro-trial&utm_source=marketing&utm_medium=pricing&utm_campaign=pro-trial",
    );
  });

  it("builds the free URL with UTMs only when no intent is given", () => {
    expect(buildChatUrl({ campaign: "free" })).toBe(
      "https://chat.recoupable.dev/?utm_source=marketing&utm_medium=pricing&utm_campaign=free",
    );
  });
});

import { describe, expect, it } from "vitest";
import { videoRequestSchema } from "../videoRequestSchema";

const input = {
  name: "Test Artist", email: "artist@example.com", artist: "Example",
  song: "https://example.com/song", brief: "A film by the sea.", rights: true as const,
};

describe("videoRequestSchema length messages", () => {
  it("explains every length limit in the form's own voice, never zod's default text", () => {
    for (const [field, length] of [["name", 121], ["email", 255], ["artist", 121], ["song", 2001], ["brief", 3001]] as const) {
      const value = field === "email" ? `${"a".repeat(length - 12)}@example.com` : field === "song" ? `https://example.com/${"s".repeat(length - 20)}` : "x".repeat(length);
      const result = videoRequestSchema.safeParse({ ...input, [field]: value });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).not.toMatch(/String must contain/);
        expect(result.error.issues[0].message).toMatch(/characters/);
      }
    }
  });
});

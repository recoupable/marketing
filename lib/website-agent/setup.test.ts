import { describe, expect, it } from "vitest";
import { setupSchema } from "./setup";

const unknown = {
  aiUsage: null, aiTools: null, dataSources: null,
  previousAttempts: null, pilotOwner: null, accessConstraints: null,
};
describe("visitor setup", () => {
  it("keeps unknown tools distinct from confirmed no tools", () => {
    expect(setupSchema.parse(unknown).aiTools).toBeNull();
    expect(setupSchema.parse({ ...unknown, aiTools: [] }).aiTools).toEqual([]);
  });
  it("does not silently fill missing answers or accept undeclared fields", () => {
    expect(setupSchema.safeParse({ aiTools: ["ChatGPT"] }).success).toBe(false);
    expect(setupSchema.safeParse({ ...unknown, inferred: true }).success).toBe(false);
  });
});

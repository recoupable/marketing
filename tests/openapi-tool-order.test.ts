import { expect, test, vi } from "vitest";
import { searchRecoupTool } from "../lib/agent-tools/searchRecoupTool";
import { readRecoupPageTool } from "../lib/agent-tools/readRecoupPageTool";
import { websiteOpenAPI } from "../lib/agent-openapi";

vi.mock(
  "../lib/agent-tools/agentToolDefinitions.ts",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("../lib/agent-tools/agentToolDefinitions")
      >();
    return {
      agentToolDefinitions: [...original.agentToolDefinitions].reverse(),
    };
  },
);

test("search and read documentation stays with its HTTP operation when discovery order changes", () => {
  const { paths } = websiteOpenAPI();
  expect(paths["/search"].get.description).toBe(searchRecoupTool.description);
  expect(paths["/read"].get.description).toBe(readRecoupPageTool.description);
  expect(paths["/search"].get.parameters.map(({ name }) => name)).toEqual([
    "query",
    "type",
    "limit",
    "cursor",
  ]);
  expect(paths["/read"].get.parameters.map(({ name }) => name)).toEqual([
    "id",
    "offset",
    "maxLength",
  ]);
});

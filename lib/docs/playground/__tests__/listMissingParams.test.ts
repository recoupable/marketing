import { describe, expect, it } from "vitest";
import { listMissingParams } from "@/lib/docs/playground/listMissingParams";
import type { PlaygroundParam } from "@/lib/docs/playground/types";

const params: PlaygroundParam[] = [
  { name: "id", in: "path", required: true, type: "string", example: "" },
  { name: "org_id", in: "query", required: false, type: "string", example: "" },
  { name: "limit", in: "query", required: true, type: "integer", example: "" },
];

describe("listMissingParams", () => {
  it("names required params that are blank or whitespace", () => {
    expect(listMissingParams(params, { "path:id": "  ", "query:limit": "5" })).toEqual(["id"]);
  });
  it("is empty when every required param is filled", () => {
    expect(listMissingParams(params, { "path:id": "x", "query:limit": "5" })).toEqual([]);
  });
});

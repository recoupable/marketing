import { expect, test } from "vitest";
import { handleAgentBatch } from "../lib/agent-http";

const read = {
  name: "read_recoup_page",
  arguments: { id: "page:/services", maxLength: 100 },
};
function request(value: unknown) {
  return new Request("https://recoupable.dev/agent-api/v1/batch", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(value),
  });
}

test("a batch preserves operation order and reports individual failures", async () => {
  const response = await handleAgentBatch(
    request({
      operations: [read, { name: "send_email", arguments: {} }, read],
    }),
  );
  expect(response.status).toBe(200);
  const body = await response.json();
  expect(
    body.results.map((result: { status: number }) => result.status),
  ).toEqual([200, 400, 200]);
  expect(body.results[0].result.markdown).toHaveLength(100);
  expect(body.results[1].error.code).toBe("UNKNOWN_TOOL");
  expect(body.results[2].result).toEqual(body.results[0].result);
});

test("a batch rejects empty, oversized, and malformed operation lists", async () => {
  for (const value of [
    { operations: [] },
    { operations: Array(11).fill(read) },
    { operations: [read], extra: true },
    { operations: [null] },
    {},
  ]) {
    expect((await handleAgentBatch(request(value))).status).toBe(400);
  }
});

test("the existing byte limit also bounds the entire batch", async () => {
  const response = await handleAgentBatch(
    request({ operations: [read], padding: "x".repeat(16_384) }),
  );
  expect(response.status).toBe(413);
});

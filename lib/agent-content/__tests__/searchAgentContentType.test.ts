import { expect, it } from "vitest";
import { AgentContentError } from "../AgentContentError.ts";
import { searchAgentContent } from "../searchAgentContent.ts";

it("rejects the retired docs type and lists only the supported types", async () => {
  const error = await searchAgentContent({ query: "artists", type: "docs" as never }).catch(caught => caught);
  expect(error).toBeInstanceOf(AgentContentError);
  expect(error.code).toBe("INVALID_TYPE");
  expect(error.message).toBe("Choose all, page, blog, or playbook.");
});

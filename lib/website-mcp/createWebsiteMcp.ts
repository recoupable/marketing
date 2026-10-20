import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { agentToolDefinitions } from "../agent-tools/agentToolDefinitions.ts";
import { executeAgentTool } from "../agent-tools/executeAgentTool.ts";
import { agentError } from "../agent-http.ts";
import { getMcpManifest } from "../agent-discovery/getMcpManifest.ts";

export function createWebsiteMcp() {
  const { title, icons, websiteUrl, version } = getMcpManifest();
  const server = new McpServer(
    { name: "recoup-public-website", version, title, icons, websiteUrl },
    {
      instructions:
        "Search and read published Recoup content, calculate supplied scenarios, or prepare an unsubmitted project brief. These tools never access platform accounts. Do not send credentials or private records. ROI is illustrative capacity value, not guaranteed savings.",
    },
  );
  for (const tool of agentToolDefinitions) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        inputSchema: z.fromJSONSchema(tool.inputSchema),
        annotations: {
          ...tool.annotations,
          destructiveHint: false,
          idempotentHint: true,
          openWorldHint: false,
        },
      },
      async (args) => {
        try {
          const result = await executeAgentTool({
            name: tool.name,
            arguments: args,
          });
          return {
            content: [{ type: "text", text: JSON.stringify(result) }],
            structuredContent: result,
          };
        } catch (error) {
          const result = await agentError(error).json();
          return {
            isError: true,
            content: [{ type: "text", text: JSON.stringify(result) }],
            structuredContent: result,
          };
        }
      },
    );
  }
  return server;
}

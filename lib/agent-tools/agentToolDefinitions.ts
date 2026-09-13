import { searchRecoupTool } from "./searchRecoupTool.ts";
import { readRecoupPageTool } from "./readRecoupPageTool.ts";
import { estimateWorkflowRoiTool } from "./estimateWorkflowRoiTool.ts";
import { assessWorkflowReadinessTool } from "./assessWorkflowReadinessTool.ts";
import { prepareProjectBriefTool } from "./prepareProjectBriefTool.ts";
import type { AgentToolDefinition } from "./types.ts";

export const agentToolDefinitions: readonly AgentToolDefinition[] = [
  searchRecoupTool,
  readRecoupPageTool,
  estimateWorkflowRoiTool,
  assessWorkflowReadinessTool,
  prepareProjectBriefTool,
];

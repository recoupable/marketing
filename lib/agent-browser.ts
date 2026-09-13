import { agentToolDefinitions } from './agent-tools/agentToolDefinitions.ts';
import { generalInterests } from './inquiry-topics.ts';

export type AgentDraft = { interest: string; message: string };
type ToolResult = Record<string, unknown>;
type BrowserTool = Omit<(typeof agentToolDefinitions)[number], 'annotations'> & {
  annotations: { readOnlyHint: boolean; consequentialHint?: boolean; untrustedContentHint?: boolean };
  execute: (input: unknown, context?: { signal?: AbortSignal }) => Promise<ToolResult>;
};
export type BrowserModelContext = {
  registerTool: (tool: BrowserTool, options: { signal: AbortSignal }) => Promise<void> | void;
};

// One adapter for the proposed browser API. Ordinary browsing does not require it.
export function registerRecoupBrowserTools(
  modelContext: BrowserModelContext,
  dependencies: {
    fetch: typeof fetch;
    onDraft: (draft: AgentDraft) => void;
    signal: AbortSignal;
  },
) {
  return Promise.all(agentToolDefinitions.map(async definition => {
    await modelContext.registerTool({
      ...definition,
      annotations: {
        ...definition.annotations,
        // Preparing a brief opens a local review panel; it changes browser state.
        readOnlyHint: definition.name !== 'prepare_project_brief',
        consequentialHint: false,
        untrustedContentHint: definition.name === 'prepare_project_brief',
      },
      async execute(input, context) {
        const signal = AbortSignal.any([dependencies.signal, ...(context?.signal ? [context.signal] : []), AbortSignal.timeout(20_000)]);
        signal.throwIfAborted();
        const response = await dependencies.fetch('/agent-api/v1/tools', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: definition.name, arguments: input }),
          signal,
          credentials: 'omit',
        });
        const result: ToolResult = await response.json();
        signal.throwIfAborted();
        if (response.ok && definition.name === 'prepare_project_brief' && result.status === 'draft') {
          const draft = result.draft as AgentDraft;
          if (result.submitted !== false || result.nextStep !== '/contact' || !draft || !generalInterests.some(interest => interest === draft.interest) || typeof draft.message !== 'string' || draft.message.trim().length < 20 || draft.message.length > 5000) {
            return { error: { code: 'INVALID_RESULT', message: 'The brief could not be confirmed. No draft was opened or submitted.' } };
          }
          if (!dependencies.signal.aborted) dependencies.onDraft(draft);
          return { ...result, reviewAvailable: !dependencies.signal.aborted, handoff: 'The draft is shown on the page. The visitor can review it and continue to the contact form. Nothing has been submitted.' };
        }
        return result;
      },
    }, { signal: dependencies.signal });
  }));
}

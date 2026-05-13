"use client";

import { ToolPart, type ToolPartLike } from "./tool-part";

/**
 * AgentTree renders a fan-out turn — when the orchestrator spawned 2+
 * agents in parallel on a single user prompt. Visually it's a header
 * chip with the live agent counter ("3 of 4 agents working…") followed
 * by a 2-column grid of agent cards. Each card surfaces its own state
 * via its ToolHeader, so users see individual agents go from pulsing
 * (running) to settled (complete) as their tool calls resolve.
 *
 * Used by HeroDemo when an assistant message contains 2+ contiguous
 * tool parts. Single-tool responses render inline through ToolPart
 * directly — no orchestrator framing needed.
 */
export function AgentTree({ tools }: { tools: ToolPartLike[] }) {
  const total = tools.length;
  const done = tools.filter(
    (t) => t.state === "output-available" || t.state === "output-error",
  ).length;
  const errored = tools.filter((t) => t.state === "output-error").length;
  const allDone = done === total;

  return (
    <div className="space-y-2">
      <OrchestratorChip total={total} done={done} errored={errored} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tools.map((part, idx) => (
          <AgentBranch key={part.toolCallId ?? idx} part={part} />
        ))}
      </div>
      {!allDone && (
        <div className="text-[10px] font-pixel uppercase tracking-[0.12em] text-(--foreground)/35 pt-1">
          Synthesis incoming…
        </div>
      )}
    </div>
  );
}

function OrchestratorChip({
  total,
  done,
  errored,
}: {
  total: number;
  done: number;
  errored: number;
}) {
  const allDone = done === total;
  const label = allDone
    ? errored > 0
      ? `${total} agents · ${errored} unavailable`
      : `${total} agents · complete`
    : `${done} of ${total} agents working…`;

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={
          allDone
            ? "w-1.5 h-1.5 rounded-full bg-(--foreground)/60"
            : "w-1.5 h-1.5 rounded-full bg-(--foreground)/40 animate-pulse"
        }
        aria-hidden
      />
      <span className="text-[10px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/45">
        Orchestrator · {label}
      </span>
    </div>
  );
}

/**
 * Each agent branch is just a wrapped ToolPart with the brand surface
 * (shadow-as-border, rounded corners, background). The ToolHeader inside
 * the renderer handles its own state pulse + label.
 */
function AgentBranch({ part }: { part: ToolPartLike }) {
  return (
    <div
      className="rounded-xl bg-(--background) p-3"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      <ToolPart part={part} />
    </div>
  );
}

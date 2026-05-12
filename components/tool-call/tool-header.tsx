"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToolPartState =
  | "input-streaming"
  | "input-available"
  | "output-available"
  | "output-error"
  | "input-error";

interface ToolHeaderProps {
  label: string;
  state: ToolPartState;
  summary?: string;
}

/**
 * Sub-header chip shown above a tool's rendered output inside an assistant
 * message card. Lives flush — no outer chrome — because the assistant card
 * already provides the surface.
 *
 * Visually it mirrors the "Recoup Agent" chip pattern from HeroDemo but
 * scoped per-tool, with a spinner while the tool is mid-flight.
 */
export function ToolHeader({ label, state, summary }: ToolHeaderProps) {
  const isRunning =
    state === "input-streaming" || state === "input-available";
  const isError = state === "output-error" || state === "input-error";

  return (
    <div className="flex items-center gap-1.5 mb-2">
      <span
        className={cn(
          "w-1 h-1 rounded-full",
          isError
            ? "bg-red-500"
            : isRunning
              ? "bg-(--foreground)/30 animate-pulse"
              : "bg-(--foreground)/50",
        )}
        aria-hidden
      />
      <span className="text-[10px] font-pixel uppercase tracking-[0.14em] text-(--foreground)/45">
        {label}
      </span>
      {summary && (
        <span className="text-[11px] font-ui text-(--foreground)/35 truncate">
          {summary}
        </span>
      )}
      {isRunning && (
        <Loader2
          className="ml-auto h-3 w-3 animate-spin text-(--foreground)/30"
          aria-label="Tool running"
        />
      )}
    </div>
  );
}

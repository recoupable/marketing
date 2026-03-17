"use client";

import { useHumanMachine } from "@/contexts/HumanMachineContext";

/**
 * Human / Machine view toggle. Machine view shows markdown for agents.
 * Persists choice in localStorage.
 */
export function HumanMachineToggle() {
  const { view, setView } = useHumanMachine();

  const isMachine = view === "machine";
  const containerClass = isMachine
    ? "flex items-center gap-1 rounded-full border border-[#30363d] bg-[#21262d] p-0.5 text-xs"
    : "flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--muted)]/50 p-0.5 text-xs";

  return (
    <div
      className={containerClass}
      role="tablist"
      aria-label="View mode"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === "human"}
        onClick={() => setView("human")}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          view === "human"
            ? isMachine
              ? "bg-[#0d1117] text-[#e6edf3] font-medium shadow-sm ring-1 ring-[#30363d]"
              : "bg-[var(--background)] text-[var(--foreground)] font-medium shadow-sm"
            : isMachine
              ? "text-[#8b949e] hover:text-[#e6edf3]"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        }`}
      >
        Human
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "machine"}
        onClick={() => setView("machine")}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          view === "machine"
            ? "bg-[#0d1117] text-[#e6edf3] font-medium shadow-sm ring-1 ring-[#30363d]"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        }`}
      >
        Machine
      </button>
    </div>
  );
}

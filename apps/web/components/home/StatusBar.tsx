/**
 * Thin system status strip (HUD / ops console). Server component.
 */
export function StatusBar() {
  return (
    <div className="w-full border-b border-[var(--border)] bg-[#0a0a0a]/95">
      <div className="mx-auto flex max-w-7xl items-stretch px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-[var(--muted-foreground)] sm:px-4 sm:text-[11px]">
        <div className="flex min-w-0 flex-1 items-center justify-start gap-1.5 pr-2 sm:gap-2 sm:pr-0">
          <span className="shrink-0">SYS.STATUS:</span>
          <span
            className="size-1.5 shrink-0 rounded-full bg-[#22c55e] animate-blink"
            aria-hidden
          />
          <span className="truncate font-semibold text-[#c8ff00]">ONLINE</span>
        </div>

        <span
          className="mx-2 h-3 w-px shrink-0 self-center bg-[var(--border)] sm:mx-4 md:mx-6"
          aria-hidden
        />

        <div className="flex min-w-0 flex-1 items-center justify-center px-1">
          <span className="truncate text-center tabular-nums">
            V. 2.0.4 // AGENT_CORE
          </span>
        </div>

        <span
          className="mx-2 h-3 w-px shrink-0 self-center bg-[var(--border)] sm:mx-4 md:mx-6"
          aria-hidden
        />

        <div className="flex min-w-0 flex-1 items-center justify-end pl-2 sm:pl-0">
          <span className="truncate text-right">40+ MCP TOOLS ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Static product mockup: AI agent chat UI (visual only, CSS animations).
 * Staggered message reveal via keyframes + animation-delay — no client JS.
 */
export function AgentChat() {
  return (
    <div className="w-full max-w-[600px] mx-auto aspect-[600/400] min-h-[280px]">
      <style>{`
        @keyframes agent-chat-fade-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .agent-chat-fade {
          opacity: 0;
          animation: agent-chat-fade-in 0.5s ease-out forwards;
        }
        .agent-chat-delay-1 {
          animation-delay: 0.15s;
        }
        .agent-chat-delay-2 {
          animation-delay: 0.55s;
        }
        .agent-chat-delay-3 {
          animation-delay: 0.95s;
        }
        .agent-chat-delay-4 {
          animation-delay: 1.35s;
        }
      `}</style>

      <div className="h-full flex flex-col rounded-lg border border-[var(--border)] bg-[#111] overflow-hidden shadow-2xl shadow-[var(--brand)]/[0.04]">
        {/* macOS-style title bar */}
        <div className="flex shrink-0 items-center gap-2 px-3 py-2 border-b border-[#222] bg-[#0d0d0d]">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-2 text-xs font-medium tracking-tight text-[var(--muted-foreground)]">
            Recoupable
          </span>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Artist sidebar */}
          <aside className="w-[34%] max-w-[200px] shrink-0 border-r border-[#222] bg-[#0d0d0d] p-3 flex flex-col gap-3">
            <div className="rounded-md border border-[#222] bg-[var(--muted)]/60 p-3">
              <div className="flex items-start gap-2.5">
                <div
                  className="size-10 shrink-0 rounded-full border border-[#222] bg-gradient-to-br from-[var(--muted)] to-[#0a0a0a]"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-tight truncate">
                    Gatsby Grace
                  </p>
                  <span className="mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--muted-foreground)] border border-[#222] bg-[#111]">
                    Dream Pop
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[var(--muted-foreground)]">
                <span className="text-[var(--foreground)] font-medium tabular-nums">
                  12.4k
                </span>{" "}
                followers
              </p>
            </div>
          </aside>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col min-w-0 p-3 gap-2.5 overflow-hidden bg-[#111]">
            <div className="agent-chat-fade agent-chat-delay-1 self-end max-w-[92%] rounded-lg rounded-br-sm border border-[#222] bg-[var(--muted)] px-3 py-2 text-sm text-[var(--foreground)]">
              Create 3 visualizers for the new single
            </div>

            <div className="agent-chat-fade agent-chat-delay-2 max-w-[95%] rounded-lg rounded-bl-sm border border-[#222] bg-[#0d0d0d] px-3 py-2 text-xs leading-relaxed text-[var(--foreground)] font-mono">
              Analyzing track... BPM: 128, Key: C minor, Mood: melancholic
            </div>

            <div className="agent-chat-fade agent-chat-delay-3 max-w-[95%] rounded-lg rounded-bl-sm border border-[#222] bg-[#0d0d0d] px-3 py-2 text-xs text-[var(--foreground)] font-mono">
              Generating visualizer 1/3...
            </div>

            <div className="agent-chat-fade agent-chat-delay-4 mt-1 w-full max-w-[220px] space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-[#222] overflow-hidden">
                <div className="h-full w-[66%] rounded-full bg-[var(--brand)]" />
              </div>
              <p className="text-[10px] font-mono text-[var(--muted-foreground)]">
                66%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

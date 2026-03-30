/**
 * CSS/SVG flow diagram: Connect → Process → Deploy (marketing visual only).
 */
export function SystemDiagram() {
  return (
    <div className="w-full py-2" aria-hidden>
      <div className="flex flex-col sm:flex-row sm:items-stretch sm:justify-center gap-0 min-h-[200px]">
        <DiagramNode
          step="01"
          title="CONNECT"
          subtitle="Catalog"
          items={["Socials", "Streaming"]}
        />

        <div className="flex justify-center py-1 sm:hidden shrink-0">
          <MobileArrowDown />
        </div>

        <Connector className="hidden sm:flex" />

        <DiagramNode
          step="02"
          title="PROCESS"
          subtitle="Agents"
          items={["analyze", "create", "execute"]}
        />

        <div className="flex justify-center py-1 sm:hidden shrink-0">
          <MobileArrowDown />
        </div>

        <Connector className="hidden sm:flex" />

        <DiagramNode
          step="03"
          title="DEPLOY"
          subtitle="Content"
          items={["Social posts", "Videos", "Campaigns"]}
        />
      </div>
    </div>
  );
}

function Connector({ className }: { className?: string }) {
  return (
    <div
      className={`shrink-0 w-10 lg:w-14 items-center justify-center self-center ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 48 24"
        className="w-full h-6 text-[var(--brand)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="2"
          y1="12"
          x2="38"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M36 8l6 4-6 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function MobileArrowDown() {
  return (
    <svg
      viewBox="0 0 24 28"
      className="h-7 w-5 text-[var(--brand)] shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M7 16l5 6 5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DiagramNode({
  step,
  title,
  subtitle,
  items,
}: {
  step: string;
  title: string;
  subtitle: string;
  items: readonly string[];
}) {
  return (
    <div className="flex-1 min-w-0 max-w-md mx-auto w-full sm:max-w-none">
      <div
        className="
          h-full rounded-lg border border-[var(--border)]
          bg-[var(--muted)]/80
          px-4 py-3 sm:py-4
          shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand)_6%,transparent),0_8px_32px_-8px_color-mix(in_srgb,var(--brand)_18%,transparent)]
        "
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-mono text-sm font-semibold tabular-nums text-[var(--brand)]">
            {step}
          </span>
          <span className="text-xs font-semibold tracking-[0.12em] text-[var(--foreground)]">
            {title}
          </span>
        </div>
        <p className="text-sm font-medium text-[var(--foreground)] mb-2">
          {subtitle}
        </p>
        <ul className="space-y-1 text-xs text-[var(--muted-foreground)]">
          {items.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-[var(--brand)] opacity-50 font-mono text-[10px] mt-0.5">
                ·
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const platforms = ["Claude Code", "Cowork", "Cursor", "Codex"] as const;

function getCommand(platform: (typeof platforms)[number], name: string) {
  const url = `https://github.com/recoupable/${name}`;
  switch (platform) {
    case "Claude Code":
      return `claude plugin install ${url}`;
    case "Cowork":
      return "Add custom plugin → paste URL";
    case "Cursor":
      return "Settings → Plugins → Add custom plugin";
    case "Codex":
      return `codex plugin install ${url}`;
  }
}

export function InstallTabs({ name }: { name: string }) {
  const [active, setActive] = useState<(typeof platforms)[number]>("Claude Code");
  const command = getCommand(active, name);
  const isCode = active === "Claude Code" || active === "Codex";

  return (
    <div className="mt-4">
      <div className="flex gap-1 mb-3">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              active === p
                ? "bg-[var(--foreground)] text-[var(--background)] font-medium"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="rounded-md bg-[var(--background)] p-3 shadow-[0_0_0_1px_var(--border)]">
        {isCode ? (
          <code className="text-sm font-mono text-[var(--foreground)] break-all">
            {command}
          </code>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">{command}</p>
        )}
      </div>
    </div>
  );
}

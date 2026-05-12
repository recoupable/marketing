"use client";

import { usePathname } from "next/navigation";
import { useHumanMachine } from "@/contexts/HumanMachineContext";
import { siteConfig } from "@/lib/config";
import { useEffect, useState } from "react";

/**
 * When view is "machine", fetches markdown for current path and renders
 * in a dark, monospace panel (agent-friendly). Otherwise renders children.
 */
export function MachineContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { view } = useHumanMachine();
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (view !== "machine") {
      setMarkdown(null);
      return;
    }
    setLoading(true);
    fetch(`/api/machine?path=${encodeURIComponent(pathname)}`)
      .then((res) => res.text())
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(() => {
        setMarkdown("# Error\n\nCould not load machine view.");
        setLoading(false);
      });
  }, [view, pathname]);

  if (view !== "machine") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] bg-[#0d1117] text-[#e6edf3] font-mono text-sm">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-[#8b949e]">Loading machine view…</p>
        ) : (
          <pre className="whitespace-pre-wrap break-words overflow-x-auto">
            {markdown}
          </pre>
        )}
        <p className="mt-8 pt-6 border-t border-[#30363d] text-xs text-[#8b949e]">
          {siteConfig.name} — machine-readable view for agents. Same content
          as the human page, in Markdown.
        </p>
      </div>
    </div>
  );
}

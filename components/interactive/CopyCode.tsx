"use client";
import { useState } from "react";

export function CopyCode({
  code,
  label = "Install with one command",
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  async function copy() {
    try {
      await Promise.race([
        navigator.clipboard.writeText(code),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Clipboard unavailable")), 1800),
        ),
      ]);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      setError(true);
    }
  }
  return (
    <div className="copy-code">
      <div>
        <span className="mono">{label}</span>
        <button onClick={copy} aria-label={`Copy: ${label}`}>
          {copied ? "Copied \u2713" : "Copy"}
          <span className="sr-only" role="status">
            {copied ? "Code copied to clipboard" : ""}
          </span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      {error && <p role="status">Select the command above to copy it.</p>}
    </div>
  );
}

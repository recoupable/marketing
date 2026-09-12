"use client";
import type { PlaygroundResult } from "@/lib/docs/playground/types";
import { DocsCode } from "../docs-interactive";

export function PlaygroundResponse({ result, pending }: { result: PlaygroundResult | null; pending: boolean }) {
  return (
    <div className="docs-playground-response" aria-live="polite">
      {pending && <p className="docs-playground-note">Sending request</p>}
      {!pending && result && "error" in result && <p className="docs-playground-error">{result.error}</p>}
      {!pending && result && "status" in result && (
        <>
          <p className="docs-playground-status">
            <span className={`docs-status${result.status < 300 ? " docs-status-success" : ""}`}>{result.status}</span>
            <span>{result.statusText || "Response"} · {result.elapsedMs} ms</span>
          </p>
          <details className="docs-playground-headers">
            <summary>Response headers ({result.headers.length})</summary>
            <dl>
              {result.headers.map(([name, value]) => (
                <div key={name}><dt>{name}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </details>
          <DocsCode language={result.isJson ? "json" : "text"} label="Response body">{result.body || "(empty body)"}</DocsCode>
        </>
      )}
    </div>
  );
}

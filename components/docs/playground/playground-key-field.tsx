"use client";
import { useId } from "react";
import type { PlaygroundAuth } from "@/lib/docs/playground/types";

export function PlaygroundKeyField({ auth, value, onChange }: { auth: PlaygroundAuth; value: string; onChange: (value: string) => void }) {
  const id = useId();
  if (auth.type === "none") return null;
  return (
    <div className="docs-playground-field docs-playground-key">
      <label htmlFor={id}>
        {auth.type === "bearer" ? "Bearer token" : "API key"}
        <span>{auth.type === "bearer" ? "Authorization header" : `${auth.header} header`}</span>
      </label>
      <input id={id} type="password" autoComplete="off" spellCheck={false} data-1p-ignore value={value} onChange={(event) => onChange(event.target.value)} aria-describedby={`${id}-hint`} />
      <p id={`${id}-hint`} className="docs-playground-hint">Kept in this browser tab only and cleared when it closes.</p>
    </div>
  );
}

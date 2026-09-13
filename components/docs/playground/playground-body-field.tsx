"use client";
import { useId } from "react";

export function PlaygroundBodyField({ contentType, value, onChange }: { contentType: string; value: string; onChange: (value: string) => void }) {
  const id = useId();
  return (
    <div className="docs-playground-field">
      <label htmlFor={id}>
        Request body<span>{contentType}</span>
      </label>
      <textarea id={id} value={value} spellCheck={false} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

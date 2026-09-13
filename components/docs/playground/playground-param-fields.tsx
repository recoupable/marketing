"use client";
import { useId } from "react";
import type { PlaygroundParam } from "@/lib/docs/playground/types";

const LABELS: Record<PlaygroundParam["in"], string> = { path: "path", query: "query", header: "header" };

export function PlaygroundParamFields({ parameters, values, onChange }: { parameters: PlaygroundParam[]; values: Record<string, string>; onChange: (key: string, value: string) => void }) {
  const id = useId();
  if (!parameters.length) return null;
  return (
    <div className="docs-playground-grid">
      {parameters.map((param, index) => {
        const key = `${param.in}:${param.name}`;
        return (
          <div className="docs-playground-field" key={key}>
            <label htmlFor={`${id}-${index}`}>
              <code>{param.name}</code>
              <span>{LABELS[param.in]} · {param.type}</span>
              {param.required && <em>required</em>}
            </label>
            <input id={`${id}-${index}`} type="text" autoComplete="off" spellCheck={false} value={values[key] ?? ""} placeholder={param.example || undefined} required={param.required} onChange={(event) => onChange(key, event.target.value)} />
          </div>
        );
      })}
    </div>
  );
}

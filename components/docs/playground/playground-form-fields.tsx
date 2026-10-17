"use client";
import { useId } from "react";
import type { PlaygroundFormField } from "@/lib/docs/playground/types";

export function PlaygroundFormFields({ fields, values, onChange }: { fields: PlaygroundFormField[]; values: Record<string, string>; onChange: (key: string, value: string) => void }) {
  const id = useId();
  return (
    <div className="docs-playground-grid">
      {fields.map((field, index) => {
        const key = `form:${field.name}`;
        return (
          <div className="docs-playground-field" key={key}>
            <label htmlFor={`${id}-${index}`}>
              <code>{field.name}</code>
              <span>{field.binary ? "form part · file" : "form part"}</span>
              {field.required && <em>required</em>}
            </label>
            {field.binary ? (
              <input id={`${id}-${index}`} type="text" value="@YOUR_FILE_PATH" readOnly aria-describedby={`${id}-${index}-hint`} />
            ) : (
              <input id={`${id}-${index}`} type="text" autoComplete="off" spellCheck={false} value={values[key] ?? ""} placeholder={field.example || undefined} required={field.required} onChange={(event) => onChange(key, event.target.value)} />
            )}
            {field.binary && <p id={`${id}-${index}-hint`} className="docs-playground-hint">Replace with the path to your file when you run the curl.</p>}
          </div>
        );
      })}
    </div>
  );
}

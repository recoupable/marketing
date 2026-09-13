"use client";
import { useState } from "react";
import { buildPlaygroundCurl } from "@/lib/docs/playground/buildPlaygroundCurl";
import { buildPlaygroundRequest } from "@/lib/docs/playground/buildPlaygroundRequest";
import { listMissingParams } from "@/lib/docs/playground/listMissingParams";
import { sendPlaygroundRequest } from "@/lib/docs/playground/sendPlaygroundRequest";
import type { PlaygroundOperation, PlaygroundResult } from "@/lib/docs/playground/types";
import { DocsCode } from "../docs-interactive";
import { PlaygroundBodyField } from "./playground-body-field";
import { PlaygroundKeyField } from "./playground-key-field";
import { PlaygroundParamFields } from "./playground-param-fields";
import { PlaygroundResponse } from "./playground-response";
import { useStoredApiKey } from "./use-stored-api-key";
import "./api-playground.css";

function invalidJson(body: string): string | null {
  try {
    JSON.parse(body);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

export function ApiPlayground({ operation, baseUrl }: { operation: PlaygroundOperation; baseUrl: string }) {
  const [params, setParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState(operation.body?.example ?? "");
  const [apiKey, setApiKey] = useStoredApiKey();
  const [result, setResult] = useState<PlaygroundResult | null>(null);
  const [pending, setPending] = useState(false);
  const request = buildPlaygroundRequest(operation, { params, body, apiKey }, baseUrl);

  async function send() {
    const missing = listMissingParams(operation.parameters, params);
    if (missing.length) return setResult({ error: `Fill in the required ${missing.length === 1 ? "parameter" : "parameters"}: ${missing.join(", ")}`, elapsedMs: 0 });
    const problem = operation.body?.contentType === "application/json" && body.trim() ? invalidJson(body) : null;
    if (problem) return setResult({ error: `Request body is not valid JSON: ${problem}`, elapsedMs: 0 });
    setPending(true);
    setResult(await sendPlaygroundRequest(request));
    setPending(false);
  }

  return (
    <div className="docs-playground">
      <h3 id="try-it">Try it</h3>
      <p className="docs-playground-intro">Fill in the fields, send the request from your browser, and read the live response. The curl below updates as you type.</p>
      <PlaygroundKeyField auth={operation.auth} value={apiKey} onChange={setApiKey} />
      <PlaygroundParamFields parameters={operation.parameters} values={params} onChange={(key, value) => setParams((current) => ({ ...current, [key]: value }))} />
      {operation.body && <PlaygroundBodyField contentType={operation.body.contentType} value={body} onChange={setBody} />}
      <DocsCode language="bash" label="cURL for this request">{buildPlaygroundCurl(request)}</DocsCode>
      <div className="docs-playground-actions">
        {operation.runnable ? (
          <button type="button" className="docs-playground-send" onClick={send} disabled={pending}>{pending ? "Sending" : "Send request"}</button>
        ) : (
          <p className="docs-playground-note">Run this one from the terminal with the curl above.</p>
        )}
      </div>
      <PlaygroundResponse result={result} pending={pending} />
    </div>
  );
}

export type PlaygroundParam = {
  name: string;
  in: "path" | "query" | "header";
  required: boolean;
  type: string;
  example: string;
};

export type PlaygroundAuth =
  | { type: "apiKey"; header: string }
  | { type: "bearer" }
  | { type: "none" };

/** Serializable summary of one OpenAPI operation, built on the server for the client playground. */
export type PlaygroundOperation = {
  method: string;
  path: string;
  parameters: PlaygroundParam[];
  body?: { contentType: string; example: string };
  auth: PlaygroundAuth;
  securitySchemes: string[];
  /** False when the browser cannot drive the call (multipart upload, event stream). */
  runnable: boolean;
};

/** What the visitor typed. Params are keyed `${in}:${name}` so path and query names cannot collide. */
export type PlaygroundValues = { params: Record<string, string>; body: string; apiKey: string };

export type PlaygroundRequest = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
};

export type PlaygroundResponse = {
  status: number;
  statusText: string;
  elapsedMs: number;
  headers: [string, string][];
  body: string;
  isJson: boolean;
};

export type PlaygroundResult = PlaygroundResponse | { error: string; elapsedMs: number };

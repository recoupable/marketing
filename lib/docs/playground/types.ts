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
  | { type: "none" }
  /** The spec asks for a credential the single key field cannot supply (unknown scheme, or several at once). */
  | { type: "unsupported"; schemes: string[] };

/** One part of a multipart/form-data body; binary parts are shown as a file placeholder in the curl. */
export type PlaygroundFormField = { name: string; required: boolean; binary: boolean; example: string };

export type PlaygroundBody = { contentType: string; example: string; required: boolean; form?: PlaygroundFormField[] };

/** Serializable summary of one OpenAPI operation, built on the server for the client playground. */
export type PlaygroundOperation = {
  method: string;
  path: string;
  parameters: PlaygroundParam[];
  body?: PlaygroundBody;
  auth: PlaygroundAuth;
  securitySchemes: string[];
  /** False when the browser cannot drive the call (multipart upload, event stream). */
  runnable: boolean;
};

/** What the visitor typed. Params are keyed `${in}:${name}` (multipart parts use `form:`) so names cannot collide across locations. */
export type PlaygroundValues = { params: Record<string, string>; body: string; apiKey: string };

export type PlaygroundRequest = {
  method: string;
  url: string;
  headers: Record<string, string>;
  /** Name of the header carrying the credential, so the curl can mask exactly that one. */
  secretHeader?: string;
  body?: string;
  /** Multipart parts, rendered as curl --form entries. */
  form?: [string, string][];
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

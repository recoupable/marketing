import { AgentContentError, readAgentContent, searchAgentContent } from './agent-content.ts';
import { AgentToolInputError, executeUtilityTool } from './agent-tools.ts';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

export function agentResponse(value: unknown, status = 200) {
  return Response.json(value, { status, headers });
}

export function agentOptions() {
  return new Response(null, { status: 204, headers });
}

class RequestError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status = 400) { super(message); this.code = code; this.status = status; }
}

export function agentError(error: unknown) {
  if (error instanceof AgentContentError || error instanceof RequestError) {
    return agentResponse({ error: { code: error.code, message: error.message } }, error.status);
  }
  if (error instanceof AgentToolInputError) {
    return agentResponse({ error: { code: error.code, message: error.message, issues: error.issues } }, 400);
  }
  return agentResponse({ error: { code: 'UNAVAILABLE', message: 'This request could not be completed. Please retry.' } }, 503);
}

function queryValues(request: Request, keys: string[]) {
  const params = new URL(request.url).searchParams;
  for (const key of params.keys()) {
    if (!keys.includes(key) || params.getAll(key).length !== 1) throw new RequestError('INVALID_QUERY', `Unknown or repeated parameter: ${key}`);
  }
  return Object.fromEntries(params.entries());
}

function numberParameter(value: string | undefined) {
  if (value === undefined) return undefined;
  if (!/^\d+$/.test(value)) throw new RequestError('INVALID_QUERY', 'Numeric parameters must be whole nonnegative numbers.');
  return Number(value);
}

export async function handleAgentSearch(request: Request) {
  try {
    const input = queryValues(request, ['query', 'type', 'limit', 'cursor']);
    return agentResponse(await searchAgentContent({ ...input, query: input.query, limit: numberParameter(input.limit) }));
  } catch (error) { return agentError(error); }
}

export async function handleAgentRead(request: Request) {
  try {
    const input = queryValues(request, ['id', 'offset', 'maxLength']);
    return agentResponse(await readAgentContent({ id: input.id, offset: numberParameter(input.offset), maxLength: numberParameter(input.maxLength) }));
  } catch (error) { return agentError(error); }
}

async function boundedJson(request: Request) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') throw new RequestError('UNSUPPORTED_MEDIA_TYPE', 'Use Content-Type: application/json.', 415);
  const maximum = 16_384;
  if (Number(request.headers.get('content-length')) > maximum) throw new RequestError('BODY_TOO_LARGE', 'The request must be at most 16 KB.', 413);
  if (!request.body) throw new RequestError('INVALID_JSON', 'A JSON request body is required.');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) { await reader.cancel(); throw new RequestError('BODY_TOO_LARGE', 'The request must be at most 16 KB.', 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
  catch { throw new RequestError('INVALID_JSON', 'The request body must be valid JSON.'); }
}

export async function handleAgentTool(request: Request) {
  try {
    const input: unknown = await boundedJson(request);
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(key => !['name', 'arguments'].includes(key))) throw new RequestError('INVALID_INPUT', 'Provide name and arguments only.');
    const { name, arguments: args } = input as Record<string, unknown>;
    if (typeof name !== 'string' || !args || typeof args !== 'object' || Array.isArray(args)) throw new RequestError('INVALID_INPUT', 'A tool name and arguments object are required.');
    if (name === 'search_recoup') {
      if (Object.keys(args).some(key => !['query','type','limit','cursor'].includes(key))) throw new RequestError('INVALID_INPUT', 'Unknown search argument.');
      return agentResponse(await searchAgentContent(args as Parameters<typeof searchAgentContent>[0]));
    }
    if (name === 'read_recoup_page') {
      if (Object.keys(args).some(key => !['id','offset','maxLength'].includes(key))) throw new RequestError('INVALID_INPUT', 'Unknown read argument.');
      return agentResponse(await readAgentContent(args as Parameters<typeof readAgentContent>[0]));
    }
    return agentResponse(executeUtilityTool(name, args));
  } catch (error) { return agentError(error); }
}

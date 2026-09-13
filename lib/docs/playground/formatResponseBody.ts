/** Pretty prints a JSON body; anything else is shown as the raw text the api returned. */
export function formatResponseBody(text: string): { body: string; isJson: boolean } {
  if (!text.trim()) return { body: "", isJson: false };
  try {
    return { body: JSON.stringify(JSON.parse(text), null, 2), isJson: true };
  } catch {
    return { body: text, isJson: false };
  }
}

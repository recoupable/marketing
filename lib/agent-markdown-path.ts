/** Public raw-document URL. The homepage uses /index.md. */
export function agentMarkdownPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/agents") return "/agents/index.md";
  return path === "/" ? "/index.md" : `${path}.md`;
}

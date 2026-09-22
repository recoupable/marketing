export type CompanySuggestion = {
  name: string;
  domain: string;
};

const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i;

export function cleanDomain(value: string): string | undefined {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed || /\s/.test(trimmed)) return;
  try {
    const url = new URL(
      /^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`,
    );
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      return;
    const hostname = url.hostname.replace(/^www\./, "");
    return domainPattern.test(hostname) ? hostname : undefined;
  } catch {
    return;
  }
}

export function normalizeCompanyWebsite(value: string): string | undefined {
  const domain = cleanDomain(value);
  return domain ? `https://${domain}` : undefined;
}

export function parseCompanySuggestions(value: unknown): CompanySuggestion[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const suggestions: CompanySuggestion[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const { name, domain } = item as Record<string, unknown>;
    if (typeof name !== "string" || typeof domain !== "string") continue;
    const cleanName = name.trim().replace(/\s+/g, " ").slice(0, 100);
    const clean = cleanDomain(domain);
    if (!cleanName || !clean || seen.has(clean)) continue;
    seen.add(clean);
    suggestions.push({ name: cleanName, domain: clean });
    if (suggestions.length === 4) break;
  }
  return suggestions;
}

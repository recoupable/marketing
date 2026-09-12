export const companyTypes = [
  "Music fund",
  "Catalog owner",
  "Publisher",
  "Record label or distributor",
  "Artist management",
  "Other",
] as const;

export const projectBudgets = [
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000+",
  "Not decided yet",
] as const;

export const projectTimelines = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Just exploring",
] as const;

export type LeadQualification = {
  companyType: (typeof companyTypes)[number];
  budget: (typeof projectBudgets)[number];
  timeline: (typeof projectTimelines)[number];
  role: string;
  companyWebsite: string;
  phone: string;
  tools: string;
};

const fields = new Set(["companyType", "budget", "timeline", "role", "companyWebsite", "phone", "tools"]);

function option<T extends readonly string[]>(value: unknown, options: T, label: string): T[number] {
  if (typeof value !== "string" || !options.includes(value.trim())) throw new Error(`Please choose ${label}.`);
  return value.trim() as T[number];
}

function optionalText(value: unknown, maxLength: number, label: string, multiline = false): string {
  if (value === undefined) return "";
  if (typeof value !== "string") throw new Error(`${label} must be text.`);
  const text = value.trim();
  const controls = multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u : /[\u0000-\u001f\u007f]/u;
  if (text.length > maxLength || controls.test(text)) throw new Error(`Check ${label.toLowerCase()} and keep it under ${maxLength + 1} characters.`);
  return text;
}

function website(value: unknown): string {
  const text = optionalText(value, 2048, "Company website");
  if (!text) return "";
  const invalid = () => new Error("Enter a valid company website, such as example.com or https://example.com.");
  // This address is recorded only. It is never fetched or used as a redirect.
  if (/[\s\\]/u.test(text)) throw invalid();
  let url: URL;
  try {
    url = new URL(/^[a-z][a-z\d+.-]*:/i.test(text) ? text : `https://${text}`);
  } catch {
    throw invalid();
  }
  const labels = url.hostname.split(".");
  if (
    !["http:", "https:"].includes(url.protocol) || url.username || url.password ||
    labels.length < 2 || url.hostname.length > 253 ||
    !labels.every(label => /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i.test(label)) ||
    !/[a-z]/i.test(labels.at(-1)!) || url.href.length > 2048
  ) throw invalid();
  return url.href;
}

export function validateLeadQualification(input: unknown): LeadQualification {
  if (typeof input !== "object" || input === null || Array.isArray(input)) throw new Error("Please check your project details.");
  const values = input as Record<string, unknown>;
  if (Object.keys(values).some(key => !fields.has(key))) throw new Error("Please check your project details.");
  return {
    companyType: option(values.companyType, companyTypes, "a company type"),
    budget: option(values.budget, projectBudgets, "an initial project budget"),
    timeline: option(values.timeline, projectTimelines, "a project timeline"),
    role: optionalText(values.role, 120, "Role"),
    companyWebsite: website(values.companyWebsite),
    phone: optionalText(values.phone, 40, "Phone number"),
    tools: optionalText(values.tools, 1200, "Current tools and systems", true),
  };
}

export function leadQualificationEntries(qualification: LeadQualification): [string, string][] {
  const entries: [string, string][] = [
    ["Initial budget (USD)", qualification.budget],
    ["Timeline", qualification.timeline],
    ["Company type", qualification.companyType],
    ["Role", qualification.role],
    ["Company website", qualification.companyWebsite],
    ["Phone", qualification.phone],
    ["Current tools and systems", qualification.tools],
  ];
  return entries.filter(([, value]) => value !== "");
}

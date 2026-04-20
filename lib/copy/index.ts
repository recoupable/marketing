/**
 * Copy registry — single source of truth for all page copy.
 * Human pages import copy from here; machine view gets markdown via getMarkdownForPath.
 * Edit copy in lib/copy/<page>.ts only; both views stay in sync.
 */
import { homeCopy, homeToMarkdown } from "./home";
import { platformCopy, platformToMarkdown } from "./platform";
import { solutionsCopy, solutionsToMarkdown } from "./solutions";
import { developersCopy, developersToMarkdown } from "./developers";
import { learnCopy, learnToMarkdown } from "./learn";
import {
  companyIndexCopy,
  companyIndexToMarkdown,
  companyVisionCopy,
  companyVisionToMarkdown,
  companyAboutCopy,
  companyAboutToMarkdown,
  companyRecoupRecordsCopy,
  companyRecoupRecordsToMarkdown,
} from "./company";

/** Pathname (no trailing slash) -> copy getter + toMarkdown */
const registry: Record<
  string,
  { getCopy: () => unknown; toMarkdown: (c: unknown) => string }
> = {
  "": { getCopy: () => homeCopy, toMarkdown: (c) => homeToMarkdown(c as typeof homeCopy) },
  platform: { getCopy: () => platformCopy, toMarkdown: (c) => platformToMarkdown(c as typeof platformCopy) },
  solutions: { getCopy: () => solutionsCopy, toMarkdown: (c) => solutionsToMarkdown(c as typeof solutionsCopy) },
  developers: { getCopy: () => developersCopy, toMarkdown: (c) => developersToMarkdown(c as typeof developersCopy) },
  learn: { getCopy: () => learnCopy, toMarkdown: (c) => learnToMarkdown(c as typeof learnCopy) },
  company: { getCopy: () => companyIndexCopy, toMarkdown: (c) => companyIndexToMarkdown(c as typeof companyIndexCopy) },
  "company/vision": { getCopy: () => companyVisionCopy, toMarkdown: (c) => companyVisionToMarkdown(c as typeof companyVisionCopy) },
  "company/about": { getCopy: () => companyAboutCopy, toMarkdown: (c) => companyAboutToMarkdown(c as typeof companyAboutCopy) },
  "company/recoup-records": {
    getCopy: () => companyRecoupRecordsCopy,
    toMarkdown: (c) => companyRecoupRecordsToMarkdown(c as typeof companyRecoupRecordsCopy),
  },
};

function pathToKey(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, "") || "";
}

export function getCopyForPath<T>(pathname: string): T | null {
  const key = pathToKey(pathname);
  const entry = registry[key];
  if (!entry) return null;
  return entry.getCopy() as T;
}

export function getMarkdownForPath(pathname: string): string {
  const key = pathToKey(pathname);
  const entry = registry[key];
  if (!entry) {
    return `# Recoup\n\nMachine-readable view for \`${pathname}\` is not yet available.\n\n[Back to site](/)`;
  }
  const copy = entry.getCopy();
  return entry.toMarkdown(copy);
}

/** Export copy for direct use in pages */
export { homeCopy } from "./home";
export { platformCopy } from "./platform";
export { solutionsCopy } from "./solutions";
export { developersCopy } from "./developers";
export {
  companyVisionCopy,
  companyAboutCopy,
  companyRecoupRecordsCopy,
  companyIndexCopy,
} from "./company";
export { learnCopy } from "./learn";

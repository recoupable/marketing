import manifest from '../content/docs/manifest.json';
import { docHref } from './docs-paths';
export { docHref, headingId, resolveDocsHref } from './docs-paths';

export type DocPage = {
  slug: string; title: string; description: string; category: string; group: string;
  source: string; body: string; searchText: string; compiled?: string; gap?: string;
  headings: {title: string; id: string}[];
  api?: {method: string; path: string; spec: string | null};
};
// Keep imported endpoint contracts intact while giving fallback source titles a readable label.
const displayTitles: Record<string, string> = {
  'api-reference/artist/socials-scrape': 'Scrape Artist Socials',
  'api-reference/complete/content/post-music-compose-detailed': 'Compose Music with Metadata',
};
export const docs: DocPage[] = (manifest as DocPage[]).map(page => {
  const title = displayTitles[page.slug];
  return title ? { ...page, title, searchText: `${title} ${page.searchText}` } : page;
});
export const docsRoutes = ['/docs', '/docs/api-reference', ...docs.filter(p=>p.slug).map(p=>docHref(p.slug))];
export const docsCategories = [...new Set(docs.map(page=>page.category))];

export const docHref = (slug: string) => slug ? `/docs/${slug}` : '/docs';
export function headingId(text: string) { return text.toLowerCase().replace(/[`*]/g,'').replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-'); }
export function resolveDocsHref(href?: string) {
 if(!href)return '#';
 href=href.replace(/^https:\/\/docs\.recoupable\.dev(?=\/|$)/,'');
 const [pathname,...fragment]=href.split('#');
 const suffix=fragment.length?`#${fragment.join('#')}`:'';
 // Pricing is a public-site destination, not a relative documentation slug.
 if(pathname.split('?')[0]==='/pricing')return href;
 if(pathname==='/api-reference/sandboxes/file')return '/docs/api-reference/sandboxes/get-file'+suffix;
 if(href.startsWith('/docs')||href.startsWith('#')||/^(mailto:|https?:)/.test(href))return href;
 if(pathname==='/'||pathname==='/index'||pathname==='')return '/docs'+suffix;
 if(href.startsWith('/'))return `/docs${href}`;
 return href;
}

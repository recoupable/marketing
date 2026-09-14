import { caseStudies } from "./case-studies.ts";

// Canonical public pages. Legacy aliases and design archives stay out of the sitemap.
export const publicRoutes = [
  "", "/services", "/advisory", "/build", "/training", "/platform", "/pricing", "/skills", "/music-videos",
  "/developers", "/lab", "/about", "/company", "/company/vision", "/records",
  "/solutions", "/acquisitions", "/operations", "/resources", "/learn/demos",
  "/playbook", "/playbook/download", "/roi", "/audit", "/valuation", "/compare",
  "/case-studies", "/blog", "/contact", "/start-project", "/privacy", "/terms", "/agents",
  ...caseStudies.map(({ slug }) => `/case-studies/${slug}`),
];

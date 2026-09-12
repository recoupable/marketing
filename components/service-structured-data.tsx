import { absoluteUrl, serializeJsonLd } from "@/lib/seo";

export function ServiceStructuredData({ path, name, description, serviceType }: { path: string; name: string; description: string; serviceType: string[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${path}#service`),
    url: absoluteUrl(path),
    name,
    description,
    serviceType,
    provider: { "@id": absoluteUrl("/#organization") },
    audience: { "@type": "BusinessAudience", audienceType: "Music funds, catalog owners, and rightsholders" },
  }) }} />;
}

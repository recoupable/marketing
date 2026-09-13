import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/dm-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { SiteFrame } from "@/components/site-frame";
import { site } from "@/lib/site";
import { isSearchPreview, organizationGraph, serializeJsonLd, searchDescription } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Recoup — AI transformation for music funds and rightsholders",
    template: "%s | Recoup",
  },
  description: searchDescription,
  applicationName: site.name,
  alternates: { types: { "application/rss+xml": `${site.url}/feed.xml` } },
  robots: isSearchPreview() ? { index: false, follow: false } : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
  openGraph: {
    title: "Recoup — AI transformation for music funds and rightsholders",
    siteName: site.name,
    url: site.url,
    locale: "en_US",
    description:
      "Strategy, custom systems, and team training for music funds and rightsholders.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="ard" href="/.well-known/ard.json" />
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="service-desc" type="application/json" href="/openapi.json" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteFrame>{children}</SiteFrame>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationGraph()),
          }}
        />
      </body>
    </html>
  );
}

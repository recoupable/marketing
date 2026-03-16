import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * Global metadata defaults — overridden per-page via generateMetadata().
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.metadata.defaultTitle,
    template: siteConfig.metadata.titleTemplate,
  },
  description: siteConfig.metadata.defaultDescription,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.metadata.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

/**
 * Root layout — wraps every page with fonts, header, footer,
 * and Plausible analytics. Do NOT remove the analytics script.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Plausible analytics — privacy-friendly, no cookie banner needed */}
        <script
          defer
          data-domain={siteConfig.plausible.domain}
          src={siteConfig.plausible.src}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

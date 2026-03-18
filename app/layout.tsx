import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/config";
import { HumanMachineProvider } from "@/contexts/HumanMachineContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MachineContent } from "@/components/layout/MachineContent";
import { ViewModeBar } from "@/components/layout/ViewModeBar";
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
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-display",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Theme: set before first paint to avoid flash (must match ThemeContext logic) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var k='recoupable-theme:v1';var s=typeof localStorage!='undefined'&&(localStorage.getItem(k)==='dark'||localStorage.getItem(k)==='light')?localStorage.getItem(k):(typeof window!='undefined'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',s);})();`,
          }}
        />
        {/* Plausible analytics — privacy-friendly, no cookie banner needed */}
        <script
          defer
          data-domain={siteConfig.plausible.domain}
          src={siteConfig.plausible.src}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
        <HumanMachineProvider>
          <Header />
          <main className="flex-1">
            <MachineContent>{children}</MachineContent>
          </main>
          <Footer />
          <ViewModeBar />
        </HumanMachineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

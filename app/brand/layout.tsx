import type { Metadata } from "next";
export const metadata: Metadata = {
  title: { absolute: "Recoup Brand Studio" },
  description: "Recoup brand artwork, final assets, and experiments.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/brand" },
};
export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

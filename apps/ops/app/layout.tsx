import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Ops",
  description: "Internal Recoupable marketing operations workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

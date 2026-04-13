import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
const COMPANY_LINKS = [
  { label: "Vision", href: "/vision" },
  { label: "Recoupable Records", href: "/records" },
  { label: "About", href: "/about" },
];

export const metadata: Metadata = buildPageMetadata({
  title: "Company | Recoupable",
  description:
    "Vision, Recoupable Records, and about. The company building the future of music operations.",
  path: "/company",
});

export default function CompanyPage() {
  const links = COMPANY_LINKS;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Company
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          Vision, Recoupable Records, and who we are.
        </p>
      </header>

      <div className="grid gap-4">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block border border-[var(--border)] rounded-lg p-6 hover:border-[var(--brand)] transition-colors"
          >
            <span className="font-medium text-[var(--foreground)]">
              {item.label}
            </span>
            <span className="ml-2 text-[var(--muted-foreground)]">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

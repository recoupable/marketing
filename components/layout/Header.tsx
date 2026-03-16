import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

/**
 * Site-wide header with logo and navigation.
 * Included in the root layout — appears on every page.
 */
export function Header() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Home link */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo.svg"
            alt={`${siteConfig.name} logo`}
            width={140}
            height={28}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/blog"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            Blog
          </Link>
          <Link
            href={siteConfig.appUrl}
            className="bg-[var(--brand)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[var(--brand-light)] transition-colors"
          >
            Try Recoupable
          </Link>
        </nav>
      </div>
    </header>
  );
}

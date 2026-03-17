import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Site-wide footer — Platform, Solutions, Developers, Learn, Company, Legal.
 * Matches nav structure from website-structure-report.md.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Run your music business with agents.
            </p>
          </div>

          {/* Platform & Solutions */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/platform"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.appUrl}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Try Recoupable
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn & Company */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Learn & Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/company/vision"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/company/about"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <p>&copy; {new Date().getFullYear()} {siteConfig.legalName}</p>
          <div className="flex gap-4">
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
              aria-label="X / Twitter"
            >
              𝕏
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] transition-colors"
              aria-label="YouTube"
            >
              YT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

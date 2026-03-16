import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Site-wide footer with links, legal pages, and social.
 * Included in the root layout — appears on every page.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {siteConfig.tagline}. AI agents that handle your music marketing
              so you can focus on making music.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Navigate
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
                  href={siteConfig.appUrl}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Try Recoupable
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.docsUrl}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal + Social column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {siteConfig.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {siteConfig.social.twitter && (
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                X / Twitter
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)] transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

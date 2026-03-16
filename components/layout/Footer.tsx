import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Site-wide footer — matches live recoupable.com structure:
 * Logo, tagline, Resources, Legal, copyright, social icons.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <h3 className="font-semibold text-lg text-[var(--foreground)] mb-3">
              🎵 {siteConfig.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {siteConfig.tagline}.
            </p>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">
              Resources
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

          {/* Legal column */}
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

        {/* Bottom bar */}
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

import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-ui font-semibold text-[var(--foreground)] mb-3">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              Run your music business with agents.
            </p>
          </div>

          <div>
            <h3 className="font-ui font-semibold text-[var(--foreground)] mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/platform", label: "Platform" },
                { href: "/solutions", label: "Solutions" },
                { href: "/developers", label: "Developers" },
                { href: siteConfig.appUrl, label: "Try Recoupable" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui font-semibold text-[var(--foreground)] mb-3">
              Learn &amp; Company
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/learn", label: "Learn" },
                { href: "/company/vision", label: "Vision" },
                { href: "/company/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui font-semibold text-[var(--foreground)] mb-3">
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
            {[
              { href: siteConfig.social.twitter, label: "X / Twitter", text: "𝕏" },
              { href: siteConfig.social.instagram, label: "Instagram", text: "IG" },
              { href: siteConfig.social.linkedin, label: "LinkedIn", text: "in" },
              { href: siteConfig.social.youtube, label: "YouTube", text: "YT" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--foreground)] transition-colors"
                aria-label={s.label}
              >
                {s.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { useTheme } from "@/contexts/ThemeContext";

const FOOTER_NAV = [
  {
    title: "Product",
    links: [
      { href: "/platform", label: "Platform" },
      { href: "/solutions", label: "Solutions" },
      { href: "/developers", label: "Developers" },
      { href: siteConfig.docsUrl, label: "API Docs" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/learn/use-cases", label: "Use Cases" },
      { href: "/learn/playbooks", label: "Playbooks" },
      { href: "/learn/demos", label: "Demos" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company/about", label: "About" },
      { href: "/company/vision", label: "Vision" },
      { href: "/company/recoupable-records", label: "Recoupable Records" },
      { href: `mailto:${siteConfig.contactEmail}`, label: "Contact" },
    ],
  },
];

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-(--border)">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 py-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <Image
                src={theme === "dark" ? "/brand/icon-darkmode.svg" : "/brand/icon-lightmode.svg"}
                alt={siteConfig.name}
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="font-ui font-bold text-[15px] text-(--foreground)">Recoupable</span>
            </Link>
            <p className="text-[13px] text-(--foreground)/35 leading-relaxed max-w-[260px] mb-6">
              The AI-native platform for the music industry.
            </p>
            <div className="flex items-center gap-4 text-[12px] font-ui text-(--foreground)/20">
              <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-(--foreground)/50 transition-colors" aria-label="X / Twitter">𝕏</a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-(--foreground)/50 transition-colors" aria-label="Instagram">IG</a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-(--foreground)/50 transition-colors" aria-label="LinkedIn">in</a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-(--foreground)/50 transition-colors" aria-label="YouTube">YT</a>
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <h4 className="font-ui font-semibold text-[11px] text-(--foreground)/25 uppercase tracking-[0.12em] mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-(--foreground)/40 hover:text-(--foreground)/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-(--border) flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-(--foreground)/20">&copy; {new Date().getFullYear()} {siteConfig.legalName}</p>
          <div className="flex items-center gap-4 text-[11px] text-(--foreground)/20">
            <Link href="/privacy-policy" className="hover:text-(--foreground)/40 transition-colors">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-(--foreground)/40 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

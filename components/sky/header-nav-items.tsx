import Link from "next/link";
import { headerNavigation } from "@/lib/copy/navigation";

export function HeaderNavItems({ pathname, mobile = false }: { pathname: string; mobile?: boolean }) {
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return headerNavigation.map((item) => "href" in item ? (
    <Link key={item.label} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
      {item.label}
    </Link>
  ) : (
    <details className="ss-tool-menu" name={mobile ? "mobile-nav-sections" : "desktop-nav-sections"} key={item.label}>
      <summary data-current={item.links.some((link) => isCurrent(link.href)) || undefined}>
        {item.label}
        <svg className="ss-tool-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </summary>
      <div>
        {item.links.map((link) => (
          <Link key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
            <strong>{link.label}</strong>
            {"description" in link && <span>{link.description}</span>}
          </Link>
        ))}
      </div>
    </details>
  ));
}

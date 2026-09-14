import Link from "next/link";
import { headerNavigation } from "@/lib/copy/navigation";
import { SkyArrow } from "./arrow";
import { NavProductArt } from "./nav-product-art";
import { BookOpen, Newspaper, FlaskConical, UsersRound } from "lucide-react";
import { NavWorkArt } from "./nav-work-art";

const resourceIcons = { docs: BookOpen, blog: Newspaper, lab: FlaskConical, about: UsersRound };

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
      <div className="ss-nav-panel">
        {"layout" in item ?
          <div className="ss-nav-resource-grid">
            <div className="ss-nav-resource-links">
              {item.links.map(link => {
                if (link.icon === "work") return null;
                const Icon = resourceIcons[link.icon];
                return <Link className="ss-nav-resource-link" key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
                  <div className="ss-nav-resource-icon"><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></div>
                  <div className="ss-nav-resource-copy"><strong>{link.label}</strong><span>{link.description}</span></div>
                  <SkyArrow />
                </Link>;
              })}
            </div>
            {item.links.filter(link => link.icon === "work").map(link => <Link className="ss-nav-work-card" key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
              <NavWorkArt />
              <div className="ss-nav-link-title"><strong>{link.label}</strong><SkyArrow /></div>
              <span>{link.description}</span>
            </Link>)}
          </div>
         : <div className="ss-nav-product-grid">
          {item.links.map(link => <Link className="ss-nav-product-link" key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
            <NavProductArt kind={link.visual} />
            <div className="ss-nav-link-title"><strong>{link.label}</strong><SkyArrow /></div>
            <span>{link.description}</span>
          </Link>)}
        </div>}
      </div>
    </details>
  ));
}

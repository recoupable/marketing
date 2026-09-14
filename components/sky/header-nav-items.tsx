import Link from "next/link";
import { headerNavigation } from "@/lib/copy/navigation";
import { SkyArrow } from "./arrow";
import { NavProductArt } from "./nav-product-art";

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
        {"groups" in item ? <>
          <div className="ss-nav-resource-grid">
            {item.groups.map(group => <section key={group} aria-label={group}>
              <h2 className="ss-nav-group-label">{group}</h2>
              {item.links.filter(link => link.group === group).map(link => <Link className="ss-nav-resource-link" key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
                <div className="ss-nav-link-title"><strong>{link.label}</strong><SkyArrow /></div>
                <span>{link.description}</span>
              </Link>)}
            </section>)}
          </div>
          {item.links.filter(link => link.group === "footer").map(link => <Link className="ss-nav-panel-footer" key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
            <strong>{link.label}</strong><SkyArrow />
          </Link>)}
        </> : <div className="ss-nav-product-grid">
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

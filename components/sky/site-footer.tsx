import { footerCopy } from "@/lib/copy/footer";
import Link from "next/link";
import { FooterBrand } from "./brand";
import { FooterSignup } from "./footer-signup";
import { SkyArrow } from "./arrow";

export function SkySiteFooter() {
  return (
    <footer className="ss-footer">
      <div className="ss-footer-top">
        <div className="ss-footer-brand">
          <FooterBrand />
          <p>{footerCopy.description}</p>
          <Link className="ss-footer-project" href="/start-project">
            {footerCopy.projectLabel}<SkyArrow />
          </Link>
        </div>
        <FooterSignup />
      </div>
      <div className="ss-footer-navigation">
        {footerCopy.groups.map((group) => (
          <nav key={group.title} aria-label={`Recoup ${group.title.toLowerCase()}`}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="ss-footer-bottom">
        <span>© {new Date().getFullYear()} Recoup</span>
        <Link href="/feed.xml">RSS feed</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
}

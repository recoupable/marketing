import { CUSTOMER_LOGOS, type CustomerLogo } from "@/lib/customerLogos";

/**
 * Shared customer logo bar (W-08 / W-17). Single source for the homepage and
 * consulting credibility blocks. Logos served via /api/customer-logos/[slug].
 */
export function LogoBar({ caption }: { caption?: string }) {
  return (
    <div data-testid="logo-bar">
      <p className="text-center font-ui text-[10px] text-(--foreground)/45 uppercase tracking-[0.18em] mb-6">
        {caption ??
          `Used by teams at ${CUSTOMER_LOGOS.length} labels, distributors & platforms`}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-x-7 sm:gap-x-10 gap-y-5">
        {CUSTOMER_LOGOS.map((logo: CustomerLogo) => (
          <span
            key={logo.slug}
            className="flex h-9 w-16 sm:w-20 items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/customer-logos/${logo.slug}`}
              alt={logo.alt}
              className={`${logo.className ?? "max-h-6 sm:max-h-7"} customer-logo-image`}
              loading="lazy"
              decoding="async"
            />
          </span>
        ))}
      </div>
    </div>
  );
}

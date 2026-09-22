import { Button } from "@/components/ui/button";
import type { getCompanyIdentity } from "@/lib/website-agent/getCompanyIdentity";

export function CompanyHeader({
  company,
  onChange,
}: {
  company: NonNullable<ReturnType<typeof getCompanyIdentity>>;
  onChange: () => void;
}) {
  return (
    <div className="wa-company-header" aria-label="Company being researched">
      <span className="wa-company-avatar" aria-hidden="true">
        <span
          style={{
            backgroundImage: `url("/api/company-favicon?domain=${encodeURIComponent(company.domain)}")`,
          }}
        />
      </span>
      <div className="wa-company-identity">
        <strong>{company.name || company.domain}</strong>
        {company.name && (
          <a
            href={`https://${company.domain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.domain}
          </a>
        )}
      </div>
      <Button
        variant="ghost"
        className="wa-change-company"
        aria-label="Change company"
        onClick={onChange}
      >
        Change
      </Button>
    </div>
  );
}

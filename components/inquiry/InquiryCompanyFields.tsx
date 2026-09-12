import { companyTypes } from "@/lib/lead-qualification";

/** The qualified brief's company block, between the identity fields and the work. */
export function InquiryCompanyFields() {
  return <>
    <div className="form-field wide">
      <label htmlFor="companyType">Company type *</label>
      <select id="companyType" name="companyType" required defaultValue="">
        <option value="" disabled>Choose a company type</option>
        {companyTypes.map((type) => <option key={type}>{type}</option>)}
      </select>
    </div>
    <div className="form-field">
      <label htmlFor="role">Your role (optional)</label>
      <input id="role" name="role" autoComplete="organization-title" maxLength={120} placeholder="e.g. Head of operations" />
    </div>
    <div className="form-field">
      <label htmlFor="phone">Phone (optional)</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code" />
    </div>
    <div className="form-field wide">
      <label htmlFor="companyWebsite">Company website (optional)</label>
      <input id="companyWebsite" name="companyWebsite" type="text" inputMode="url" autoComplete="url" maxLength={2048} placeholder="yourcompany.com" />
    </div>
    <div className="lead-group-title wide"><h3><span>02</span> The work</h3></div>
  </>;
}

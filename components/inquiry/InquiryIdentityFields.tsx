import type { RefObject } from "react";

export function InquiryIdentityFields({ nameInput }: { nameInput: RefObject<HTMLInputElement | null> }) {
  return <>
    <div className="form-field">
      <label htmlFor="name">Your name *</label>
      <input ref={nameInput} id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Full name" />
    </div>
    <div className="form-field">
      <label htmlFor="email">Work email *</label>
      <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" />
    </div>
    <div className="form-field wide">
      <label htmlFor="company">Company *</label>
      <input id="company" name="company" autoComplete="organization" required minLength={2} maxLength={160} placeholder="Your company or fund" />
    </div>
  </>;
}

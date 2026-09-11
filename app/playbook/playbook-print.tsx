"use client";
export function PrintPlaybook() {
  return <button className="playbook-print" type="button" onClick={() => window.print()}>Print / save as PDF</button>;
}

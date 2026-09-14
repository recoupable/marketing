import { homeCopy } from "@/lib/copy/home";

const deliverableIcons = [
  "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  "M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6",
  "M15 21v-2a5 5 0 0 0-10 0v2m14 0v-2a5 5 0 0 0-3-4.6M13 4a4 4 0 0 1 0 7M14 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
];

export function SkyOwnership() {
  return <section className="sky-section sky-ownership" id="ownership" aria-labelledby="sky-ownership-title">
    <div className="sky-ownership-panel">
      <header data-reveal=""><p className="sky-section-label">{homeCopy.ownership.eyebrow}</p><h2 id="sky-ownership-title">Built by Recoup.<br /><span>Owned by you.</span></h2></header>
      <dl className="sky-ownership-deliverables" data-reveal-group="">
        {homeCopy.ownership.deliverables.map((item, index) => <div key={item.title}><dt><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={deliverableIcons[index]} /></svg>{item.title}</dt><dd>{item.description}</dd></div>)}
      </dl>
      <p className="sky-ownership-terms" data-reveal="">{homeCopy.ownership.terms}</p>
    </div>
  </section>;
}

import { homeCopy } from "@/lib/copy/home";

export function SkyOwnership() {
  return <section className="sky-section sky-ownership" id="ownership" aria-labelledby="sky-ownership-title">
    <div className="sky-ownership-panel">
      <header data-reveal=""><p className="sky-section-label">{homeCopy.ownership.eyebrow}</p><h2 id="sky-ownership-title">Built by Recoup.<br /><span>Owned by you.</span></h2></header>
      <dl className="sky-ownership-deliverables" data-reveal-group="">
        {homeCopy.ownership.deliverables.map((item, index) => <div key={item.title}><dt><span>{String(index + 1).padStart(2, "0")}</span> {item.title}</dt><dd>{item.description}</dd></div>)}
      </dl>
      <p className="sky-ownership-terms" data-reveal="">{homeCopy.ownership.terms}</p>
    </div>
  </section>;
}

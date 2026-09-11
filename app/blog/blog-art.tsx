export function BlogArt({ theme, feature = false, image }: { theme: string; feature?: boolean; image?: string }) {
  if (image) return <div className="blog-art blog-art-editorial" aria-hidden="true">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={image} alt="" loading="lazy" />
  </div>;
  if (feature) return <div className="blog-art blog-art-feature" aria-hidden="true">
    <div className="blog-art-orbit" /><div className="blog-art-orbit blog-art-orbit-two" />
    <div className="blog-decision decision-buy"><span>01</span><strong>Buy.</strong><i>Domain expertise</i></div>
    <div className="blog-decision decision-build"><span>02</span><strong>Build.</strong><i>Your way of working</i></div>
    <div className="blog-decision decision-ignore"><span>03</span><strong>Ignore.</strong><i>The noise</i></div>
    <span className="blog-art-caption">A framework for your next decision.</span>
  </div>;
  return <div className={`blog-art blog-art-${theme}`} aria-hidden="true">
    {theme === "agents" ? <div className="blog-agent-art"><span>Research</span><b>→</b><span>Create</span><b>→</b><span>Review</span></div> : theme === "content" ? <div className="blog-content-art"><span>One story.</span><div><i /><i /><i /><i /><i /></div><strong>More ways to tell it.</strong></div> : <div className="blog-release-art"><span>Before.</span><span>Release.</span><span>Beyond.</span><i /></div>}
  </div>;
}

import { Fragment, type ReactNode } from "react";

type ArchiveEntry = { slug: string; card: ReactNode };

export function BlogArchive({ entries }: { entries: ArchiveEntry[] }) {
  return <section className="blog-articles blog-archive" aria-labelledby="blog-articles-title">
    <div className="blog-section-heading"><h2 id="blog-articles-title">More from Recoup</h2><a className="blog-archive-feed" href="/feed.xml">RSS feed</a></div>
    <div className="blog-grid" data-reveal-group="">
      {entries.map((entry) => <Fragment key={entry.slug}>{entry.card}</Fragment>)}
    </div>
  </section>;
}

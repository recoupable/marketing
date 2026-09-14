"use client";

import { Fragment, useId, useRef, useState, type ReactNode } from "react";

type ArchiveEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  card: ReactNode;
};

export function BlogArchive({ entries }: { entries: ArchiveEntry[] }) {
  const id = useId();
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const categories = [...new Set(entries.map((entry) => entry.category))].sort((a, b) => a.localeCompare(b, "en"));
  const filtered = entries.filter((entry) => {
    const text = `${entry.title} ${entry.description} ${entry.category}`.toLowerCase();
    return (!category || entry.category === category) && terms.every((term) => text.includes(term));
  });
  const hasFilters = Boolean(query || category);

  function reset() {
    setQuery("");
    setCategory("");
    searchInput.current?.focus();
  }

  return <section className="blog-articles blog-archive" aria-labelledby="blog-articles-title">
    <div className="blog-section-heading"><h2 id="blog-articles-title">More from Recoup</h2><a className="blog-archive-feed" href="/feed.xml">RSS feed</a></div>
    <form className="blog-archive-filters" role="search" aria-label="Search the article archive" onSubmit={(event) => event.preventDefault()}>
      <div className="blog-archive-search">
        <label htmlFor={`${id}-query`}>Search articles</label>
        <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 4.5 4.5" strokeLinecap="round" /></svg><input ref={searchInput} id={`${id}-query`} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by topic or title" maxLength={200} aria-controls={`${id}-results`} /></div>
      </div>
      <div className="blog-archive-category"><label htmlFor={`${id}-category`}>Category</label><select id={`${id}-category`} value={category} onChange={(event) => setCategory(event.target.value)} aria-controls={`${id}-results`}><option value="">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
    </form>
    <div className="blog-archive-status"><p role="status" aria-live="polite" aria-atomic="true">{hasFilters ? `${filtered.length} of ${entries.length} articles` : `${entries.length} articles`}</p>{hasFilters && <button type="button" onClick={reset}>Clear filters</button>}</div>
    <div id={`${id}-results`}>
      {filtered.length ? <div className="blog-grid" data-reveal-group="">
        {filtered.map((entry) => <Fragment key={entry.slug}>{entry.card}</Fragment>)}
      </div> : <div className="blog-archive-empty"><h3>No articles found.</h3><p>Try a broader search or choose another category.</p></div>}
    </div>
  </section>;
}

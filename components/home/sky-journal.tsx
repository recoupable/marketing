import Image from "next/image";
import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { SkyArrow } from "@/components/sky/arrow";
import "./sky-journal.css";

const selections = [
  { slug: "music-executive-guide-ai-agents", image: "engineering-desk", crop: "engineering" },
  { slug: "why-artists-need-ai-agents", image: "services-studio", crop: "studio" },
  { slug: "music-release-strategy-2026", image: "catalog-library", crop: "library" },
] as const;

export function SkyJournal() {
  return (
    <section className="sky-section sky-journal" id="journal" aria-labelledby="sky-journal-title">
      <header className="sky-journal-heading" data-reveal="">
        <div>
          <p className="sky-section-label">FROM THE BLOG</p>
          <h2 id="sky-journal-title">Ideas for the<br />music business.</h2>
        </div>
        <Link href="/blog" className="sky-journal-all">See all articles <SkyArrow /></Link>
      </header>
      <div className="sky-journal-grid" data-reveal-group="">
        {selections.map(({ slug, image, crop }) => {
          const post = getBlogPost(slug);
          if (!post) return null;
          return (
            <article key={slug} className={`sky-journal-story sky-journal-story-${crop}`}>
              <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                <Image src={`/images/sky/${image}.webp`} alt="" fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 28vw, 380px" />
                <span className="sky-journal-topic">{post.category}</span>
                <div className="sky-journal-story-copy">
                  <h3>{post.title}</h3>
                  <div className="sky-journal-story-meta"><span>{post.readingMinutes} min read</span><SkyArrow /></div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { stripHtml, calculateReadingTime } from "@/lib/paragraph/helpers";

interface ResearchArticleProps {
  title: string;
  subtitle?: string;
  author?: string;
  /** ISO date string */
  date: string;
  imageUrl?: string;
  /** Pre-rendered HTML body (from Paragraph or markdown→html) */
  html: string;
}

/**
 * Shared detail renderer for a research essay — used by both pipelines
 * (Paragraph-synced and in-repo MDX) so they look identical.
 */
export function ResearchArticle({
  title,
  subtitle,
  author,
  date,
  imageUrl,
  html,
}: ResearchArticleProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const readingTime = calculateReadingTime(stripHtml(html));

  return (
    <article className="mx-auto max-w-3xl px-4 pt-36 pb-16 sm:pt-44">
      <Link
        href="/research"
        className="inline-flex items-center gap-1.5 text-sm text-(--muted-foreground) transition-colors hover:text-(--foreground)"
      >
        <ArrowLeft className="h-4 w-4" />
        Research
      </Link>

      <header className="mt-8 mb-10">
        <h1 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight text-(--foreground)">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 text-lg leading-relaxed text-(--foreground)/65">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-(--muted-foreground)">
          {author ? (
            <>
              <span className="font-medium text-(--foreground)">{author}</span>
              <span className="text-(--foreground)/30">·</span>
            </>
          ) : null}
          <time dateTime={date}>{formattedDate}</time>
          <span className="text-(--foreground)/30">·</span>
          <span>{readingTime}</span>
        </div>
      </header>

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={title}
          className="mb-12 w-full rounded-2xl"
          style={{ boxShadow: "0 0 0 1px var(--border)" }}
        />
      ) : null}

      <div
        className="prose prose-lg max-w-none prose-headings:text-[var(--foreground)] prose-headings:font-ui prose-p:text-[var(--foreground)]/85 prose-a:text-[var(--brand)] prose-strong:text-[var(--foreground)] prose-li:text-[var(--foreground)]/85"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

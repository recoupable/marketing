import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  resolveContent,
  getAllContentSlugs,
  getRelatedContent,
  categoryFor,
} from "@/lib/content";
import {
  CONTENT_CATEGORY_LABELS,
  type ContentEntry,
} from "@/lib/content-types";
import { getParagraphPost } from "@/lib/paragraph/api";
import {
  timestampToISODate,
  normalizeParagraphHtml,
} from "@/lib/paragraph/helpers";
import { markdownToHtml, stripLeadingH1 } from "@/lib/markdown";
import { buildPostMetadata, buildPostJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { ContentArticle } from "@/components/content/ContentArticle";
import { RelatedContent } from "@/components/content/RelatedContent";
import { BlogCTA } from "@/components/blog/BlogCTA";

/** ISR — Paragraph-synced essays revalidate hourly; MDX content still shares route-level revalidation. */
export const revalidate = 3600;

/**
 * Static params across all three pipelines (blog MDX, research MDX, Paragraph).
 */
export function generateStaticParams() {
  return getAllContentSlugs().map((slug) => ({ slug }));
}

/**
 * Per-entry SEO metadata. MDX pipelines reuse buildPostMetadata; Paragraph
 * essays build metadata from the live post (canonical points at /blog).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolution = resolveContent(slug);
  if (!resolution) return { title: "Post Not Found" };

  if (resolution.kind === "post" || resolution.kind === "research-mdx") {
    return buildPostMetadata(resolution.post);
  }

  const canonical = `${siteConfig.url}/blog/${slug}`;
  const post = await getParagraphPost(resolution.config.paragraphId);
  if (!post) return { title: resolution.config.title };

  const description = post.subtitle || resolution.config.excerpt;
  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "article",
      images: post.imageUrl ? [post.imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

/** Footer slot shared across pipelines — tags, email CTA, related content. */
function ArticleFooter({
  tags,
  slug,
  related,
}: {
  tags: string[];
  slug: string;
  related: ContentEntry[];
}) {
  return (
    <>
      {tags.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <BlogCTA postSlug={slug} />
      <RelatedContent entries={related} />
    </>
  );
}

/**
 * Content detail — resolves the slug to its pipeline and renders all three
 * through the shared ContentArticle layout.
 */
export default async function ContentPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolution = resolveContent(slug);
  if (!resolution) notFound();

  const related = getRelatedContent(slug);

  // MDX pipelines (blog posts + in-repo research essays)
  if (resolution.kind === "post" || resolution.kind === "research-mdx") {
    const { post } = resolution;
    // The body repeats the title as a leading H1; the header already shows it.
    const html = await markdownToHtml(stripLeadingH1(post.content));
    const jsonLd = buildPostJsonLd(post);
    const eyebrow =
      CONTENT_CATEGORY_LABELS[
        categoryFor({ type: post.type, tags: post.tags, source: resolution.kind })
      ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ContentArticle
          eyebrow={eyebrow}
          title={post.title}
          subtitle={post.excerpt}
          author={post.author}
          date={post.date}
          html={html}
        >
          <ArticleFooter tags={post.tags} slug={slug} related={related} />
        </ContentArticle>
      </>
    );
  }

  // Paragraph-synced pipeline (body fetched live)
  const { config } = resolution;
  const post = await getParagraphPost(config.paragraphId);
  if (!post || !post.staticHtml) notFound();
  const publishedAt = timestampToISODate(post.publishedAt);
  if (!publishedAt) notFound();
  const modifiedAt = timestampToISODate(post.updatedAt) || publishedAt;

  const eyebrow =
    CONTENT_CATEGORY_LABELS[
      categoryFor({ tags: config.tags, source: "paragraph" })
    ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle || config.excerpt,
    author: {
      "@type": "Person",
      name: config.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: publishedAt,
    dateModified: modifiedAt,
    url: `${siteConfig.url}/blog/${slug}`,
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContentArticle
        eyebrow={eyebrow}
        title={post.title}
        subtitle={post.subtitle}
        author={config.author}
        date={publishedAt}
        imageUrl={post.imageUrl}
        html={normalizeParagraphHtml(post.staticHtml)}
      >
        <ArticleFooter tags={config.tags} slug={slug} related={related} />
      </ContentArticle>
    </>
  );
}

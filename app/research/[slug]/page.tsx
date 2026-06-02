import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  resolveResearch,
  getAllResearchSlugs,
  getResearchPostBySlug,
} from "@/lib/research";
import { getParagraphPost } from "@/lib/paragraph/api";
import {
  timestampToISODate,
  sanitizeParagraphHtml,
} from "@/lib/paragraph/helpers";
import { markdownToHtml } from "@/lib/markdown";
import { buildPostMetadata, buildPostJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { ResearchArticle } from "@/components/research/ResearchArticle";
import { BlogCTA } from "@/components/blog/BlogCTA";

/** ISR — Paragraph-synced essays revalidate hourly. */
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllResearchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resolution = resolveResearch(slug);
  if (!resolution) return { title: "Research Not Found" };

  const canonical = `${siteConfig.url}/research/${slug}`;

  if (resolution.kind === "mdx") {
    try {
      return buildPostMetadata(getResearchPostBySlug(slug), "research");
    } catch {
      return { title: "Research Not Found" };
    }
  }

  const post = await getParagraphPost(resolution.config.paragraphId);
  if (!post) return { title: resolution.config.title };

  return {
    title: post.title,
    description: post.subtitle || resolution.config.excerpt,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.subtitle || resolution.config.excerpt,
      url: canonical,
      siteName: siteConfig.name,
      type: "article",
      images: post.imageUrl ? [post.imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.subtitle || resolution.config.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}

/**
 * Research detail — resolves the slug to its pipeline and renders both through
 * the shared ResearchArticle component.
 */
export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolution = resolveResearch(slug);
  if (!resolution) notFound();

  // In-repo MDX pipeline
  if (resolution.kind === "mdx") {
    let post;
    try {
      post = getResearchPostBySlug(slug);
    } catch {
      notFound();
    }

    const html = await markdownToHtml(post.content);
    const jsonLd = buildPostJsonLd(post, "research");

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ResearchArticle
          title={post.title}
          subtitle={post.excerpt}
          author={post.author}
          date={post.date}
          html={html}
        />
        <div className="max-w-3xl mx-auto px-4">
          <BlogCTA postSlug={slug} />
        </div>
      </>
    );
  }

  // Paragraph-synced pipeline
  const { config } = resolution;
  const post = await getParagraphPost(config.paragraphId);
  if (!post || !post.staticHtml) notFound();

  return (
    <>
      <ResearchArticle
        title={post.title}
        subtitle={post.subtitle}
        author={config.author}
        date={timestampToISODate(post.publishedAt)}
        imageUrl={post.imageUrl}
        html={sanitizeParagraphHtml(post.staticHtml)}
      />
      <div className="max-w-3xl mx-auto px-4">
        <BlogCTA postSlug={slug} />
      </div>
    </>
  );
}

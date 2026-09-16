import { ArticleArt } from "./article-art";

export function BlogArt({
  slug,
  feature = false,
  image,
}: {
  slug: string;
  feature?: boolean;
  image?: string;
}) {
  if (image)
    return (
      <div className="blog-art blog-art-editorial" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading="lazy" />
      </div>
    );
  if (feature)
    return (
      <div className="blog-art blog-art-feature" aria-hidden="true">
        <div className="blog-art-orbit" />
        <div className="blog-art-orbit blog-art-orbit-two" />
        <div className="blog-decision decision-buy">
          <span>01</span>
          <strong>Buy.</strong>
          <i>Domain expertise</i>
        </div>
        <div className="blog-decision decision-build">
          <span>02</span>
          <strong>Build.</strong>
          <i>Your way of working</i>
        </div>
        <div className="blog-decision decision-ignore">
          <span>03</span>
          <strong>Ignore.</strong>
          <i>The noise</i>
        </div>
        <span className="blog-art-caption">
          A framework for your next decision.
        </span>
      </div>
    );
  return (
    <div className="blog-art blog-art-specific" aria-hidden="true">
      <ArticleArt slug={slug} />
    </div>
  );
}

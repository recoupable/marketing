import publishedPosts from "../content/blog/posts.json";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  body: string;
  coverImage?: string;
  updatedAt?: string;
};

// Published articles imported from Recoup's marketing and blog repositories.
// Keep the approved executive guide featured; original dates and copy are retained.
export const blogPosts: readonly BlogPost[] = publishedPosts;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Date(`${date.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  });
}

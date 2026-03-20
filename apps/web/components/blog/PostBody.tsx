/**
 * Renders the HTML content of a blog post inside a prose container.
 * Uses Tailwind Typography plugin for consistent styling.
 */
export function PostBody({ content }: { content: string }) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-[var(--foreground)] prose-p:text-[var(--foreground)] prose-a:text-[var(--brand)] prose-strong:text-[var(--foreground)]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

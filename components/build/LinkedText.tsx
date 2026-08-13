import Link from "next/link";

/**
 * Renders a copy string with one phrase turned into an inline link — so copy
 * files stay plain strings and the page decides what links where (chat#1800
 * row 10: "Strategy Session" on /build links to /advisory).
 */
export function LinkedText({
  text,
  phrase,
  href,
}: {
  text: string;
  phrase: string;
  href: string;
}) {
  const index = text.indexOf(phrase);
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <Link href={href} className="underline underline-offset-4 hover:opacity-70">
        {phrase}
      </Link>
      {text.slice(index + phrase.length)}
    </>
  );
}

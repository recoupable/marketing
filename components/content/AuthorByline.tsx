import Image from "next/image";
import { getAuthorProfile } from "@/lib/authors";

/**
 * Author byline block (W-29) — founder-as-main-character. Renders avatar, name,
 * role, and an X link for known authors; falls back to nothing for unknown
 * authors (the inline byline in the header already covers the name).
 */
export function AuthorByline({ author }: { author?: string }) {
  const profile = getAuthorProfile(author);
  if (!profile) return null;

  return (
    <div
      className="mt-12 flex items-center gap-4 rounded-2xl p-5"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
      data-testid="author-byline"
    >
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
      ) : null}
      <div className="flex-1">
        <p className="font-ui font-bold text-[14px] text-(--foreground)">{profile.name}</p>
        <p className="font-ui text-[13px] text-(--foreground)/50">{profile.role}</p>
      </div>
      {profile.xUrl ? (
        <a
          href={profile.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-ui text-[13px] font-semibold text-(--foreground)/60 hover:text-(--foreground) transition-colors"
        >
          Follow ↗
        </a>
      ) : null}
    </div>
  );
}

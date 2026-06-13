import Image from "next/image";
import { getAuthorProfile } from "@/lib/authors";

/**
 * Founder presence (D-04) — puts a real face on the brand. Used on /consulting
 * ("work directly with the team") and /company/about. Reads the Sidney Swift
 * profile from lib/authors so the avatar + X link stay consistent with bylines.
 */
export function FounderCard({ blurb }: { blurb?: string }) {
  const founder = getAuthorProfile("Sidney Swift");
  if (!founder) return null;

  return (
    <div
      className="flex items-start gap-5 rounded-2xl bg-(--background) p-6 sm:p-7"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
      data-testid="founder-card"
    >
      {founder.avatar ? (
        <Image
          src={founder.avatar}
          alt={founder.name}
          width={72}
          height={72}
          className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-full object-cover shrink-0"
        />
      ) : null}
      <div>
        <p className="font-ui font-bold text-[16px] text-(--foreground)">{founder.name}</p>
        <p className="font-ui text-[13px] text-(--foreground)/50 mb-2">{founder.role}</p>
        <p className="text-[14px] text-(--foreground)/65 leading-relaxed">
          {blurb ??
            "You work directly with the people who build the tools — not an account manager. We run our own label on the same stack we put in yours."}
        </p>
        {founder.xUrl ? (
          <a
            href={founder.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex font-ui text-[13px] font-semibold text-(--accent) hover:opacity-80 transition-opacity"
          >
            Follow along ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}

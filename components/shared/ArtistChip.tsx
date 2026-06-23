"use client";

import Image from "next/image";

type ArtistChipProps = {
  name: string;
  image?: string | null;
  /** Disable the clear button (e.g. while a run is in flight). */
  disabled?: boolean;
  onRemove: () => void;
};

/** Selected-artist chip shown inside the search island (avatar + name + clear). */
export function ArtistChip({
  name,
  image,
  disabled,
  onRemove,
}: ArtistChipProps) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-(--foreground)/8 py-1 pl-1 pr-1">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={20}
          height={20}
          className="h-5 w-5 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-(--muted)">
          <span className="text-[8px] text-(--foreground)/30">♪</span>
        </div>
      )}
      <span className="pr-1 text-[13px] font-medium text-(--foreground)">
        {name}
      </span>
      <button
        type="button"
        onClick={onRemove}
        disabled={disabled}
        aria-label={`Remove ${name}`}
        className="flex h-4 w-4 items-center justify-center rounded-full text-(--foreground)/30 transition-colors hover:bg-(--foreground)/8 hover:text-(--foreground)/70 disabled:opacity-40"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}

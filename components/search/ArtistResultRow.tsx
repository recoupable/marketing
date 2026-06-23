"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { formatFollowers } from "@/lib/spotify/formatFollowers";
import type { SpotifyArtist } from "@/lib/spotify/types";

type ArtistResultRowProps = {
  artist: SpotifyArtist;
  active: boolean;
  onSelect: (artist: SpotifyArtist) => void;
};

/** A single artist row in the autocomplete dropdown (avatar + name + meta). */
export function ArtistResultRow({
  artist,
  active,
  onSelect,
}: ArtistResultRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(artist)}
      className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
        active ? "bg-(--muted)" : "hover:bg-(--muted)/60"
      }`}
    >
      {artist.image ? (
        <Image
          src={artist.image}
          alt={`${artist.name} profile image`}
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--muted)">
          <Search size={14} className="text-(--foreground)/30" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-(--foreground)">
          {artist.name}
        </p>
        <p className="truncate text-[11px] text-(--foreground)/40">
          {artist.genre && <span className="capitalize">{artist.genre}</span>}
          {artist.genre && artist.followers > 0 && " · "}
          {artist.followers > 0 &&
            `${formatFollowers(artist.followers)} followers`}
        </p>
      </div>
    </button>
  );
}

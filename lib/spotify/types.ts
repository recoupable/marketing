/** Simplified Spotify artist shape returned by `/api/spotify/search`. */
export type SpotifyArtist = {
  id: string;
  name: string;
  image: string | null;
  genre: string | null;
  followers: number;
};

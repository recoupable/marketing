export type Artist = { id: string; name: string; image?: string; followers?: number };

export type Band = { low: number; central: number; high: number };

export type StartedAlbum = {
  id: string;
  name: string | null;
  image: string | null;
  releaseDate: string | null;
};

export type MeasuredAlbum = {
  id: string;
  streams: number;
  tracks: Array<{ name: string | null; streams: number }>;
};

export type Result = {
  state: string;
  trackCount: number;
  albumCount: number;
  capturedAlbums: number;
  totalStreams: number;
  catalogAgeYears: number;
  valueBand: Band;
  annualNls: Band;
  assumptions: { runRateBasis: string; multiple: Band };
  albums: MeasuredAlbum[];
};

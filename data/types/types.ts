// file: src/data/types.ts
export type LyricsContentFromAPI = {
  Id: number;
  lyricsId: number;
  title: string;
  chorus: string;
  verse1?: string;
  verse2?: string;
  verse3?: string;
  verse4?: string;
  verse5?: string;
  verse6?: string;
  verse7?: string;
  status: string;
  approvedAt?: string | null;
  approvedById?: number | null;
};

export type SongFromAPI = {
  Id: number;
  albumId: number;
  artistId: number;
  language: string;
  Category: string;
  LyricsContents: LyricsContentFromAPI[];
  Artist: {
    Id: number;
    name: string;
    genre: string;
    bio: string;
    imageUrl: string;
  };
};

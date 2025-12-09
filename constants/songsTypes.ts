export type SongContent = {
  Id: number;
  lyricsId?: number;
  artistId?:number
  language: string;
  Header?:string
  albumId?:number
  audioFileUrl?:string
  title?: string;
  Category?: string;
  chorus?: string;
    displayOrder?: number;
    createdAt?:Date
    deletedAt?:Date
    updatedAt?:Date
    LyricsContents: LyricsContent[];
};
export type LyricsContent = {
  Id: number;
  displayId?: number; 
  lyricsId?: number;
  languageKey: string;
  Category:string
  title?: string;
  chorus?: string;
  verse1?: string;
  verse2?: string;
  verse3?: string;
  verse4?: string;
  verse5?: string;
  verse6?: string;
  verse7?: string;
  
};
 type Song = {
    id: number;
    title: string;
    chorus: string;
    category: string;
    verse_1?: string;
    verse_2?: string;
    verse_3?: string;
    verse_4?: string;
    verse_5?: string;
    verse_6?: string;
    verse_7?: string;
    language_value: string;
    displayOrder?: number;
    createdAt?:Date
    deletedAt?:Date
    updatedAt?:Date
  };

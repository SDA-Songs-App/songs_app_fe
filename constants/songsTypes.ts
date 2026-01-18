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
  Artist:Artist
  
};
  export type Artist={
            Id :number,
            name: string,
            genre: string,
            bio: string,
            imageUrl:string,
            createdAt:string,
            deletedAt:string
  }

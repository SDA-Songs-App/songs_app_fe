import { LyricsContent } from "@/constants/songsTypes";

const normalizeLyricsContents = (value: any): LyricsContent[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};
export const transformSongsByLanguage = (dataSongs: any[]) => {
  const result: any[] = [];
  let activeCount=0;
  dataSongs.forEach((song) => {
    if(!song.deletedAt){
       activeCount ++;
    }
    let languageKey = song.language?.toLowerCase();
   
    
     const existingLang = result.find((item) => item.language === languageKey);
    // Merge LyricsContents with top-level properties
    const mergedLyrics = normalizeLyricsContents(song.LyricsContents || []).map((lyric: any) => ({
      ...lyric,
      
      albumId: song.albumId,
      artistId: song.artistId,
      Category: song.Category,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
      deletedAt: song.deletedAt,
      
      audioFileUrl: song.audioFileUrl,
    }));

    if (existingLang) {
      existingLang.LyricsContents.push(...mergedLyrics);
    } else {
      result.push({
        language: languageKey,
        LyricsContents: mergedLyrics,
      });
    }
  });

  return result;
};

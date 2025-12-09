export const transformSongsByLanguage = (dataSongs: any[]) => {
  const result: any[] = [];
  let activeCount=0;
  dataSongs.forEach((song) => {
    if(!song.deletedAt){
       activeCount ++;
    }
    let languageKey = song.language?.toLowerCase();
   
     if(languageKey ==='afaan_oromo'){
       languageKey =='oromo' 
    }
    else if(languageKey ==='guragigna'){
       languageKey =='ጉራጊኛ' 
    }
    else if(languageKey ==='sidama'){
       languageKey =='ሲዳምኛ' 
    }
     const existingLang = result.find((item) => item.language === languageKey);
    // Merge LyricsContents with top-level properties
    const mergedLyrics = (song.LyricsContents || []).map((lyric: any) => ({
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

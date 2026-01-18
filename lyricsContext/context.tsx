import { transformSongsByLanguage } from "@/configurations/dataTransformations";
import { SongContent } from "@/constants/songsTypes";
import { 
  getFromLocalDB, 
  getLastSyncedAt, 
  initializeDatabase, 
  markUpdatesSynced, 
  saveToLocalDB, 
  deleteRowById
} from "@/data/database/localDb";
import Constants from "expo-constants";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";

interface SongContextType {
  dataSongsToLoad: SongContent[];
  loadingSongsData: boolean;
  err: string | null;
  hasUpdates: boolean;
  syncUpdates: () => Promise<void>;
  saveSongToLocal: (song: SongContent) => Promise<void>;
  setDataSongs: (songs: SongContent[]) => void; 
}

interface Lyric {
  Id?: number;
  lyricsId?: number;
  languageKey?: string | null;
  status?: string;
  approvedAt?: string | null;
  title?: string;
  chorus?: string;
  verse1?: string;
  verse2?: string;
  verse3?: string;
  verse4?: string;
  verse5?: string;
  verse6?: string;
  approvedById?: number | null;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const useSongs = () => {
  const ctx = useContext(SongContext);
  if (!ctx) throw new Error("useSongs must be used within SongProvider");
  return ctx;
};

// Helper to safely normalize LyricsContents
const normalizeLyricsContents = (lc: any): Lyric[] => {
  if (!lc) return [];
  if (typeof lc === "string") return JSON.parse(lc);
  if (Array.isArray(lc)) return lc;
  return [];
};

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [dataSongsToLoad, setData] = useState<SongContent[]>([]);
  const [loadingSongsData, setLoadingData] = useState(true);
  const [err, setError] = useState<string | null>(null);
  const [hasUpdates, setHasUpdates] = useState(false);

  const getApiUrl = () => {
    const debuggerHost = Constants.expoGoConfig?.debuggerHost || Constants.expoConfig?.hostUri;
    const host = debuggerHost?.split(':')[0] || 'localhost';
    return `http://${host}:3001`;
  };

  const saveSongToLocal = async (song: SongContent) => {
    try {
      await deleteRowById(String(song.Id));
      await saveToLocalDB([song]);

      const updatedLocal = await getFromLocalDB();
      const normalizedLocal = updatedLocal.map(s => ({
        ...s,
        LyricsContents: normalizeLyricsContents(s.LyricsContents)
      }));

      setData(transformSongsByLanguage(normalizedLocal));
    } catch (e) {
      console.error("Save song failed:", e);
    }
  };

const normalizeSongs = (songs: any[]): SongContent[] => {
  return songs.map(song => ({
    Id: Number(song.Id),
    language: song.language,
    Category: song.category ?? song.Category ?? "",
    deletedAt: song.deletedAt ?? null,
    albumId: song.albumId,
    artistId: song.artistId,
    audioFileUrl: song.audioFileUrl ?? "",
    LyricsContents: Array.isArray(song.LyricsContents)
      ? song.LyricsContents.map((lyric: any) => ({
          Id: Number(lyric.Id ?? song.Id),
         // languageKey: lyric.languageKey ?? song.language, // required
          Category: lyric.Category ?? song.category ?? "",  // required
          title: lyric.title ?? "",
          chorus: lyric.chorus ?? "",
          verse1: lyric.verse1 ?? "",
          verse2: lyric.verse2 ?? "",
          verse3: lyric.verse3 ?? "",
          verse4: lyric.verse4 ?? "",
          verse5: lyric.verse5 ?? "",
          verse6: lyric.verse6 ?? "",
          verse7: lyric.verse7 ?? "",
          Artist: {
            Id: song.Artist?.Id ?? 0,
            name: song.Artist?.name ?? "Unknown",
            genre: song.Artist?.genre ?? "",
            bio: song.Artist?.bio ?? "",
            imageUrl: song.Artist?.imageUrl ?? "",
            createdAt: song.Artist?.createdAt ?? "",
            deletedAt: song.Artist?.deletedAt ?? "",
          },
        }))
      : [],
  }));
};


  const syncUpdates = async () => {
    try {
      const lastSyncedAt = await getLastSyncedAt();
      const apiBase = getApiUrl();

      const res = await fetch(`${apiBase}/lyrics/sync?since=${lastSyncedAt ?? ""}`);
      if (!res.ok) throw new Error("Sync failed");

      const backendData = await res.json();
      const incoming = normalizeSongs(backendData.updated);

      const localSongs = await getFromLocalDB();
      const mergedMap = new Map<string, SongContent>();
      [...localSongs, ...incoming].forEach(song => mergedMap.set(`${song.Id}_${song.language}`, song));

      const finalSongs = Array.from(mergedMap.values()).filter(song => !song.deletedAt);
      await saveToLocalDB(finalSongs);
      await markUpdatesSynced(backendData.serverTime);

      setData(transformSongsByLanguage(finalSongs));
      setHasUpdates(false);
    } catch (e) {
      console.error("Sync error:", e);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoadingData(true);
        await initializeDatabase();

        // Load local songs first
        const localSongs = await getFromLocalDB('LyricsContents');
        if (localSongs.length > 0) {
          const normalizedLocal = transformSongsByLanguage(
            localSongs.map(s => ({
              ...s,
              LyricsContents: normalizeLyricsContents(s.LyricsContents)
            }))
          );
          setData(normalizedLocal);
          console.log("Loaded local songs:", normalizedLocal.length);
        }

        // Try fetching online songs
        const apiBase = getApiUrl();
        try {
          const res = await fetch(`${apiBase}/lyrics`);
          if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);

          const apiSongs = await res.json();
          const normalized = normalizeSongs(apiSongs);

          // Save updated songs to local DB
          const songsToSave = normalized.map(song => ({
            ...song,
            LyricsContents: JSON.stringify(song.LyricsContents)
          }));
          await saveToLocalDB(songsToSave, 'LyricsContents');

          // Update context
          setData(transformSongsByLanguage(normalized));
          console.log("Fetched and saved backend songs:", normalized.length);
        } catch (apiError) {
          console.warn("Backend offline, using local songs only.", apiError);
        }

      } catch (err) {
        console.error("Initialization failed:", err);
      } finally {
        setLoadingData(false);
      }
    };

    initApp();
  }, []);

  return (
    <SongContext.Provider value={{ 
      dataSongsToLoad, 
      loadingSongsData, 
      err, 
      hasUpdates, 
      syncUpdates, 
      saveSongToLocal, 
      setDataSongs: setData 
    }}>
      {children}
    </SongContext.Provider>
  );
};

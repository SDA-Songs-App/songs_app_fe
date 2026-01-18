import React, { FC, useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
  ImageBackground,
  Alert,
  Share,
  SafeAreaView,
  ToastAndroid,
  Platform,
} from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import GestureRecognizer from "react-native-swipe-gestures";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import SongList from "./SongList";
import CollapsibleActionButton from "./CollapsibleActionButton";
import getStyles from "../components/css/app";
import { useTheme } from "@/app/ThemeProvier";
import allSongs from "@/data/allsongs";
import localizations from "@/data/localizations";
import { LyricsContent, SongContent } from "../constants/songsTypes";
import { getFromLocalDB, initializeDatabase, saveToLocalDB } from "@/data/database/localDb";
import { useSongs } from "@/lyricsContext/context";
import { RootStackParams } from "@/app/types";


const { height: deviceHeight } = Dimensions.get("window");

type NavigationProp = DrawerNavigationProp<RootStackParams>;
type NavbarScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

type FavoriteKey = `${string}_${number}`;
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
const NavbarScreen: FC<NavbarScreenProps> = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const styles = getStyles(isDarkMode, fontSize, fontFamily);
  const [isModalVisible, setModalVisible] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    windowDimensions.width > windowDimensions.height ? "landscape" : "portrait"
  );
const { dataSongsToLoad: dataSongs, setDataSongs, syncUpdates } = useSongs();
  // Orientation change
  useEffect(() => {
    const handleOrientationChange = ({ window }: { window: any }) => {
      setWindowDimensions(window);
      setOrientation(window.width > window.height ? "landscape" : "portrait");
    };
    const subscription = Dimensions.addEventListener("change", handleOrientationChange);
    return () => subscription.remove();
  }, []);

  // Search & Favorites
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isFavoritesModalVisible, setFavoritesModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredSongs, setFilteredSongs] = useState<LyricsContent[]>([]);
  const [selectedSong, setSelectedSong] = useState<LyricsContent | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("አማርኛ");

  // Pagination & swipe
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [swipeLock, setSwipeLock] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState<FavoriteKey[]>([]);

  // Load font preferences
  useEffect(() => {
    const loadPreferences = async () => {
      const storedSize = await AsyncStorage.getItem("fontSize");
      const storedFamily = await AsyncStorage.getItem("fontFamily");
      if (storedSize) setFontSize(Number(storedSize));
      if (storedFamily) setFontFamily(storedFamily);
    };
    loadPreferences();
  }, []);

  // Load favorites
  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
  const parsedFavorites = JSON.parse(storedFavorites);
  const validFavorites = parsedFavorites
    .filter((key: any) => {
      if (typeof key !== "string") return false;
      const parts = key.split("_");
      return parts.length === 2 && !isNaN(Number(parts[1]));
    })
    .map((key: string) => key as FavoriteKey); // <-- assert the type here

  setFavorites(validFavorites);
}

    };
    loadFavorites();
  }, []);

  // Fetch songs from backend or local DB
 useEffect(() => {
  const fetchAndSyncSongs = async () => {
    try {
      setLoading(true);
      await initializeDatabase();

      // First, try to sync with backend
      await syncUpdates(); // <-- fetch new/updated songs from backend

      // After sync, load songs from context
      const songsFromContext = dataSongs; // this comes from useSongs()
      if (songsFromContext.length > 0) {
        const languageSongs = songsFromContext
          .filter((l) => l.language === selectedLanguage && !l.deletedAt)
          .flatMap((l) => normalizeLyricsContents(l.LyricsContents));

        if (languageSongs.length > 0) {
          setFilteredSongs(languageSongs);
          setSelectedSong(languageSongs[0]);
          setCurrentSongIndex(0);
        }
      }
    } catch (error) {
      console.error("Failed to fetch and sync songs:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAndSyncSongs();
}, []); // runs once on mount

useEffect(() => {
  if (!dataSongs.length) return;

  const languageSongs = dataSongs
    .filter(l => l.language === selectedLanguage && !l.deletedAt)
    .flatMap(l => normalizeLyricsContents(l.LyricsContents));

  if (languageSongs.length > 0) {
    setFilteredSongs(languageSongs);
    setSelectedSong(languageSongs[0]);
    setCurrentSongIndex(0);
  }
}, [dataSongs, selectedLanguage]);

  const uniqueLanguages = Array.from(new Set(dataSongs.map((song) => song.language)));

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (songId: number, isAdding: boolean) => {
      const favoriteKey: FavoriteKey = `${selectedLanguage}_${songId}`;
      setFavorites((prev) => {
        let newFavorites;
        if (isAdding) {
          newFavorites = prev.includes(favoriteKey)
            ? prev.filter((key) => key !== favoriteKey)
            : [...prev, favoriteKey];
        } else {
          newFavorites = prev.filter((key) => key !== favoriteKey);
        }
        AsyncStorage.setItem("favorites", JSON.stringify(newFavorites)).catch(console.error);
        return newFavorites;
      });
    },
    [selectedLanguage]
  );

  // Swipe handlers
  const onSwipeLeft = useCallback(() => {
    const fullSongs =
      dataSongs
        .filter((lang) => lang.language === selectedLanguage && !lang.deletedAt)
        .flatMap((lang) => lang.LyricsContents) || [];

    if (swipeLock || currentSongIndex >= fullSongs.length - 1) return;

    setCurrentSongIndex((prev) => prev + 1);
    setSelectedSong(fullSongs[currentSongIndex + 1]);
    setSwipeLock(true);
    setTimeout(() => setSwipeLock(false), 300);
  }, [swipeLock, currentSongIndex, selectedLanguage]);

  const onSwipeRight = useCallback(() => {
    const fullSongs =
      dataSongs
        .filter((lang) => lang.language === selectedLanguage && !lang.deletedAt)
        .flatMap((lang) => lang.LyricsContents) || [];

    if (swipeLock || currentSongIndex <= 0) return;

    setCurrentSongIndex((prev) => prev - 1);
    setSelectedSong(fullSongs[currentSongIndex - 1]);
    setSwipeLock(true);
    setTimeout(() => setSwipeLock(false), 300);
  }, [swipeLock, currentSongIndex, selectedLanguage]);

  // Language selection
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    const selectedLanguageSongs = dataSongs
      .filter((lang) => lang.language === language && !lang.deletedAt)
      .flatMap((lang) => lang.LyricsContents);

    if (selectedLanguageSongs.length > 0) {
      setSelectedSong(selectedLanguageSongs[0]);
      setFilteredSongs(selectedLanguageSongs);
      setPage(1);
      setHasMore(true);
    }
  };

  // Search
  const searchSongs = (text: string) => {
    const selectedLanguageSongs = dataSongs
      .filter((lang) => lang.language === selectedLanguage)
      .flatMap((lang) => lang.LyricsContents);

    const trimmed = text.trim().toLowerCase();
    const results = selectedLanguageSongs.filter((song) => {
      const matchesCategory = selectedCategory ? song.Category === selectedCategory : true;
      const matchesText =
        !trimmed ||
        song.title?.toLowerCase().includes(trimmed) ||
        song.Id.toString().includes(trimmed);
      return matchesCategory && matchesText;
    });
    setFilteredSongs(results);
  };

  // Copy & Share
  const fullLyricText = [
    selectedSong?.title,
    selectedSong?.chorus,
    selectedSong?.verse1,
    selectedSong?.verse2,
    selectedSong?.verse3,
    selectedSong?.verse4,
    selectedSong?.verse5,
    selectedSong?.verse6,
    selectedSong?.verse7,
  ]
    .filter(Boolean)
    .join("\n");

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Alert.alert(
      localizations.find((key) => key.language === selectedLanguage)?.LyricsCopiedTitle || "",
      localizations.find((key) => key.language === selectedLanguage)?.LyricsCopiedDescription || ""
    );
  };

  const handleShare = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch {
      Alert.alert(
        localizations.find((key) => key.language === selectedLanguage)?.CopyErrorTitle || "",
        localizations.find((key) => key.language === selectedLanguage)?.CopyErrorDescription || ""
      );
    }
  };

  // Render
  const renderSongItem = useCallback(
    ({ item }: { item: LyricsContent }) => (
      <TouchableOpacity
        style={[styles.songCard, { backgroundColor: isDarkMode ? "white" : "black" }]}
        onPress={() => {
          const fullSongs =
            dataSongs
              .filter((lang) => lang.language === selectedLanguage && !lang.deletedAt)
              .flatMap((lang) => lang.LyricsContents) || [];
          const index = fullSongs.findIndex((song) => song.Id === item.Id);
          if (index !== -1) {
            setCurrentSongIndex(index);
            setSelectedSong(fullSongs[index]);
          }
          setSearchModalVisible(false);
        }}
      >
        <Text style={[styles.songTitle, { color: isDarkMode ? "black" : "white" }]}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [dataSongs, selectedLanguage, isDarkMode]
  );

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {selectedSong && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.number}>
          {selectedSong ? `#${filteredSongs.findIndex((s) => s.Id === selectedSong.Id) + 1}` : ""}
        </Text>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
        {selectedSong && (
          <TouchableOpacity onPress={() => toggleFavorite(selectedSong.Id, true)}>
            <Icon name="plus-square" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setFavoritesModalVisible(true)}>
          <Icon name="list" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Info", "መዝሙር ማጨዎቻ ሊሰራ ታቅዷል")}>
          <Icon name="play" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FontSettings")}>
          <Icon name="cog" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerContainer}>
          <Text style={styles.pickerText}>{selectedLanguage}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons name={isDarkMode ? "moon" : "sunny"} size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Swipe Gesture */}
      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{ velocityThreshold: 0.5, directionalOffsetThreshold: 100 }}
      >
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}>
          {selectedSong && (
            <View style={styles.songContainer}>
              <ImageBackground
                source={
                  isDarkMode
                    ? require("../assets/images/S.jpg")
                    : require("../assets/images/inverted_S.jpg")
                }
                resizeMode="cover"
                style={[styles.backgroundImage, { paddingBottom: deviceHeight * 0.42 }]}
              >
                <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
                  {selectedSong.title && <Text style={styles.selectedSongPlainTitle}>{selectedSong.title}</Text>}
                  {selectedSong.chorus && <Text style={styles.selectedSongTitle}>{selectedSong.chorus}</Text>}
                  {[selectedSong.verse1, selectedSong.verse2, selectedSong.verse3, selectedSong.verse4,
                    selectedSong.verse5, selectedSong.verse6, selectedSong.verse7]
                    .filter(Boolean)
                    .map((verse, idx) => (
                      <Text key={idx} style={styles.verse1Style}>{verse}</Text>
                    ))}
                </SafeAreaView>
                <View style={styles.footerContainer}>
                  <Text style={[styles.artistName, { color: isDarkMode ? "#aaa" : "#000" }]}>
                    {selectedSong.Artist?.name || "Not found"}
                  </Text>
                  <Text style={[styles.artistBio, { color: isDarkMode ? "#aaa" : "#555" }]}>
                    {selectedSong.Artist?.bio || "Not found"}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          )}
        </ScrollView>
      </GestureRecognizer>

      {/* Floating Collapsible Button */}
      <View style={styles.floatingButtonContainer}>
        <CollapsibleActionButton
          fullLyricText={fullLyricText}
          onCopy={handleCopy}
          onShare={handleShare}
          isDarkMode={isDarkMode}
        />
      </View>

      {/* Modals */}
      {/* Search Modal */}
      <Modal
        isVisible={isSearchModalVisible}
        onBackdropPress={() => {
          setSearchModalVisible(false);
          setSearchText("");
          setSelectedCategory(null);
          const selectedLanguageSongs = dataSongs
            .filter((lang) => lang.language === selectedLanguage && !lang.deletedAt)
            .flatMap((lang) => lang.LyricsContents);
          setFilteredSongs(selectedLanguageSongs);
        }}
        backdropColor="#000"
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={localizations.find((key) => key.language === selectedLanguage)?.LyricsCopiedTitle || "Search..."}
            placeholderTextColor={isDarkMode ? "black" : "white"}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              searchSongs(text);
            }}
          />
          {filteredSongs.length > 0 ? (
            <FlatList<LyricsContent>
              data={filteredSongs}
              keyExtractor={(item) => `${item.Id}`}
              renderItem={renderSongItem}
              nestedScrollEnabled
            />
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>
      </Modal>

      {/* Favorites Modal */}
      <Modal
        isVisible={isFavoritesModalVisible}
        onBackdropPress={() => setFavoritesModalVisible(false)}
        backdropTransitionOutTiming={0}
        style={styles.favoritesModalContainer}
      >
        <View style={styles.favoritesModalContent}>
          <SongList
  data={dataSongs
    .filter((l) => l.language === selectedLanguage && !l.deletedAt)
    .flatMap((l) => normalizeLyricsContents(l.LyricsContents))}
  onPressItem={(item) => {
    setSelectedSong(item);
    setFavoritesModalVisible(false);
  }}
  favorites={favorites}
  onToggleFavorite={(songId) => toggleFavorite(songId, true)} // wrapper
  currentLanguage={selectedLanguage}
  loadMore={() => {}}
  loading={loading}
  removalOnly
/>

        </View>
      </Modal>

      {/* Language Selection Modal */}
      <Modal
  isVisible={isModalVisible}
  onBackdropPress={() => setModalVisible(false)}
  animationIn="slideInUp"
  animationOut="slideOutDown"
  backdropOpacity={0.5}
  style={{ margin: 0 }}
>
  <View style={styles.modalContent}>
    {uniqueLanguages.map((language) => (
      <TouchableOpacity
        key={language}
        onPress={() => {
          handleLanguageSelect(language);
          setModalVisible(false);
        }}
        style={styles.languageOption}
      >
        <Text style={styles.languageText}>{language}</Text>
      </TouchableOpacity>
    ))}
  </View>
</Modal>

    </View>
  );
};

export default NavbarScreen; 
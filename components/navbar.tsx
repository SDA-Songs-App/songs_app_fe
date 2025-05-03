import {
  DrawerActions,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  Dimensions,
  ImageBackground,
  ListRenderItem,
  Alert,
  Share,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RooStackSettingsParams, RootStackParams } from "@/app/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import GestureRecognizer from "react-native-swipe-gestures";
import { SlideInUp, SlideOutDown } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import TextGradient from "react-native-text-gradient";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongList from "./SongList";
import CollapsibleActionButton from "./CollapsibleActionButton";
import getStyles from "../components/css/app";
import allSongs from "@/data/allsongs";
import { useTheme } from "@/app/ThemeProvier";
type NavigationProp = DrawerNavigationProp<RootStackParams>;
type NavbarScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};
const NavbarScreen: FC<NavbarScreenProps> = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const styles = getStyles(isDarkMode, fontSize, fontFamily);

  Dimensions.get("window");

  const navigation = useNavigation<NavigationProp>();
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isFavoritesModalVisible, setFavoritesModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("አማርኛ");
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [verseIndex, setVerseIndex] = useState(0); // Index for current verse
  const [songIndex, setSongIndex] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [mVerses, setVerses] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<FavoriteKey[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [swipeLock, setSwipeLock] = useState(false);
  //const [cursorSelection, setCursorSelection] = useState(start: 0, end: 0);

  const openSearchModal = () => {
    setSearchModalVisible(true);
  };
  const openFavoriteModal = () => {
    setFavoritesModalVisible(true);
  };
  const closeSearchModal = () => {
    setSearchText("");
    //setFilteredSongs([]);
    resetActiveSongsForLanguage();
    setSelectedCategory(null);
    setSearchModalVisible(false);
  };
  const handlePress = (actionName: string) => {
    console.log(`${actionName} component to be implemented`);
  };
  const handleSettingPress = () => {
    console.log("navigation:", navigation);
  };

  const searchPlaceholders: Record<string, string> = {
    አማርኛ: "በመዝ. ርዕስ፣ ቁጥር፣ ምድብ፣ ወይም በዘማሪ ስም ይፈልጉ",
    English: "Search by title, category, or artist name",
    Oromo: "Search by title, category, or artist name",
    ሲዳሚኛ: "Search by title, category, or artist name",
    ትግርኛ: "በመዝ. ርዕስ፣ ቁጥር፣ ምድብ፣ ወይም በዘማሪ ስም ይፈልጉ",
    ከምባትኛ: "Search by title, category, or artist name",
    ሀዲይኛ: "በመዝ. ርዕስ፣ ቁጥር፣ ምድብ፣ ወይም በዘማሪ ስም ይፈልጉ",
    ወላይትኛ: "Search by title, category, or artist name",
    Neur: "Search by title, category, or artist name",
    ጉራጊኛ: "Search by title, category, or artist name",
  };

  const resetActiveSongsForLanguage = () => {
    const selectedLanguageSongs = allSongs.find(
      (lang) => lang.language_key === selectedLanguage
    )?.Content;
    if (selectedLanguageSongs && selectedLanguageSongs.length > 0) {
      setFilteredSongs(selectedLanguageSongs);
      return selectedLanguageSongs;
    }
    return [];
  };

  type Song = {
    id: number;
    song_num: number;
    date?: string;
    title: string;
    chorus: string;
    category: string;
    artist: string;
    verse_1?: string;
    verse_2?: string;
    verse_3?: string;
    verse_4?: string;
    verse_5?: string;
    verse_6?: string;
    verse_7?: string;
    language_value: string;
    displayOrder?: number;
  };
  type AllSongs = {
    language_key: string;
    Content: Song[];
  }[];

  type FavoriteKey = `${string}_${number}`; // literal type for language_id

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          // Validate and filter favorite keys
          const parsedFavorites = JSON.parse(storedFavorites);
          const validFavorites = parsedFavorites.filter(
            (key: any) => typeof key === "string" && key.includes("_")
          );
          setFavorites(validFavorites);
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  //for font and font family change effect
  useFocusEffect(
    useCallback(() => {
      const loadPreferences = async () => {
        const storedSize = await AsyncStorage.getItem("fontSize");
        const storedFamily = await AsyncStorage.getItem("fontFamily");
        if (storedSize) setFontSize(Number(storedSize));
        if (storedFamily) setFontFamily(storedFamily);
      };
      loadPreferences();
    }, [])
  );

  // When the language changes, reset the song list and pagination.
  useEffect(() => {
    const selectedLanguageSongs = allSongs.find(
      (lang) => lang.language_key === selectedLanguage
    );
    if (selectedLanguageSongs) {
      setFilteredSongs(selectedLanguageSongs.Content);
      setSelectedSong(selectedLanguageSongs.Content[0]);
      setPage(1);
      setHasMore(true);
    }
  }, [selectedLanguage]);

  // Toggle favorite handler
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
          newFavorites = prev.includes(favoriteKey)
            ? prev.filter((key) => key !== favoriteKey)
            : [...prev, favoriteKey];
        }
        // Save to AsyncStorage
        AsyncStorage.setItem("favorites", JSON.stringify(newFavorites)).catch(
          (error) => console.error("Error saving favorite:", error)
        );
        return newFavorites;
      });
    },
    [selectedLanguage]
  );

  const removeFavorite = useCallback(
    async (songId: number) => {
      const favoriteKey: FavoriteKey = `${selectedLanguage}_${songId}`;
      setFavorites((prev) => {
        const newFavorites = prev.filter((key) => key !== favoriteKey);
        AsyncStorage.setItem("favorites", JSON.stringify(newFavorites)).catch(
          (error) => console.error("Error saving favorite:", error)
        );
        return newFavorites;
      });
    },
    [selectedLanguage]
  );

  // Handle language selection and reset pagination.
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    const selectedLanguageSongs = allSongs.find(
      (lang) => lang.language_key === language
    );
    if (selectedLanguageSongs && selectedLanguageSongs.Content.length > 0) {
      setSelectedSong(selectedLanguageSongs.Content[0]);
      setFilteredSongs(selectedLanguageSongs.Content);
      setPage(1);
      setHasMore(true);
      setVerseIndex(0);
    }
    setModalVisible(false);
  };

  // song item renderer
  const renderSongItem: ListRenderItem<Song> = useCallback(
    ({ item }: { item: Song }) => {
      const fullSongs =
        allSongs.find((lang) => lang.language_key === selectedLanguage)
          ?.Content || [];

      return (
        <TouchableOpacity
          style={[
            styles.songCard, // base static styles
            {
              backgroundColor: isDarkMode ? "white" : "black",
            },
          ]}
          onPress={() => {
            const indexInFullList = fullSongs.findIndex(
              (song) => song.id === item.id
            );
            if (indexInFullList !== -1) {
              setCurrentSongIndex(indexInFullList);
              setSelectedSong(fullSongs[indexInFullList]);
            }
            closeSearchModal();
          }}
        >
          <Text
            style={[
              styles.songTitle,
              { color: isDarkMode ? "black" : "white" },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.songCategory,
              { color: isDarkMode ? "black" : "white" },
            ]}
          >
            {item.artist}
          </Text>
        </TouchableOpacity>
      );
    },
    [allSongs, favorites, selectedLanguage, isDarkMode]
  );

  const setDefaultSongsForLanguage = () => {
    const selectedLanguageSongs = allSongs.find(
      (language) => language.language_key === selectedLanguage
    );

    // If there are songs for the selected language, set them as default
    if (selectedLanguageSongs) {
      setFilteredSongs(selectedLanguageSongs.Content.slice(0, 5));
    } else {
      setFilteredSongs([]); // No songs available for the selected language
    }
  };

  const searchSongs = (text: string) => {
    const trimmedSearch = searchText.trim();
    const selectedLanguageSongs = allSongs.find(
      (language) => language.language_key === selectedLanguage
    );

    if (!selectedLanguageSongs) {
      setFilteredSongs([]);
      return;
      //} else if (selectedLanguageSongs) {
      //setFilteredSongs(selectedLanguageSongs.Content);
    }
    //Check if the search text us numeric (all digits)
    const isNumeric = /^d+$/.test(trimmedSearch);
    const lowerSearchText = trimmedSearch.toLowerCase();

    const results = selectedLanguageSongs.Content.filter((song) => {
      const matchesCategory = selectedCategory
        ? song.category === selectedCategory
        : true;

      let matchesText = false;

      if (trimmedSearch === "") {
        matchesText = true;
      } else if (isNumeric) {
        matchesText =
          song.song_num.toString() === trimmedSearch ||
          song.id.toString() === trimmedSearch;
      } else {
        matchesText =
          song.title.toLowerCase().includes(lowerSearchText) ||
          song.artist.toLowerCase().includes(lowerSearchText) ||
          song.id.toString().includes(trimmedSearch); // Check if ID matches search text
      }
      return matchesCategory && matchesText;
    });

    if (trimmedSearch === "") {
      setFilteredSongs(results.slice(0, 5));
    } else {
      setFilteredSongs(results);
    }
  };

  const verses = [
    { text: selectedSong?.verse_1, style: styles.verse1Style },
    { text: selectedSong?.verse_2, style: styles.verse1Style },
    { text: selectedSong?.verse_3, style: styles.verse1Style },
    { text: selectedSong?.verse_4, style: styles.verse1Style },
    { text: selectedSong?.verse_5, style: styles.verse1Style },
    { text: selectedSong?.verse_6, style: styles.verse1Style },
    { text: selectedSong?.verse_7, style: styles.verse1Style },
  ];

  // Pagination handler
  const loadMoreSongs = useCallback(() => {
    if (hasMore && !loading) {
      setLoading(true);
      // Simulated pagination
      const newSongs = allSongs[0].Content.slice((page - 1) * 10, page * 10);
      setFilteredSongs((prev) => [...prev, ...newSongs]);
      setPage((prev) => prev + 1);
      setLoading(false);
      if (page >= 2) setHasMore(false);
    }
  }, [page, hasMore, loading]);

  // Swipe handlers
  // Swipe Handlers using currentSongIndex:
  const onSwipeLeft = useCallback(() => {
    const fullSongs =
      allSongs.find((lang) => lang.language_key === selectedLanguage)
        ?.Content || [];

    if (swipeLock) return;

    if (currentSongIndex < fullSongs.length - 1) {
      const newIndex = currentSongIndex + 1;
      setCurrentSongIndex(newIndex);
      setSelectedSong(fullSongs[newIndex]);

      setTimeout(() => setSwipeLock(false), 300);
    }
  }, [swipeLock, currentSongIndex, selectedLanguage]);

  // Swipe right
  const onSwipeRight = useCallback(() => {
    const fullSongs =
      allSongs.find((lang) => lang.language_key === selectedLanguage)
        ?.Content || [];

    if (swipeLock) return;
    if (currentSongIndex > 0) {
      const newIndex = currentSongIndex - 1;
      setCurrentSongIndex(newIndex);
      setSelectedSong(fullSongs[newIndex]);

      setTimeout(() => setSwipeLock(false), 300);
    }
  }, [swipeLock, currentSongIndex, selectedLanguage]);

  // Dark mode toggle
  // const toggleDarkMode = useCallback(() => {
  //   setIsDarkMode((prev) => !prev);
  // }, []);

  const handleSongSelect = (item: Song): void => {
    setSelectedSong(item);
    setFavoritesModalVisible(false);
  };

  // Compute the full lyric text by concatenating all verses with newlines.
  // for the copy and share functionality

  const fullLyricText = [
    selectedSong?.title,
    selectedSong?.artist,
    selectedSong?.chorus,
    ...verses.filter((verse) => verse?.text).map((verse) => verse.text),
  ].join("\n");

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copied", "Lyrics copied to clipboard.");
  };

  const handleShare: (text: string) => Promise<void> = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch (error) {
      Alert.alert("Error", "Unable to share lyrics.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {selectedSong && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        {/* Number Display*/}
        <Text style={styles.number}>
          {selectedSong ? `#${selectedSong?.id}` : ""}
        </Text>
        {/*Search icon*/}
        <TouchableOpacity onPress={openSearchModal}>
          <Icon name="search" size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        {/*heart icon*/}
        {selectedSong && (
          <TouchableOpacity
            onPress={() => toggleFavorite(selectedSong.id, true)}
          >
            <Icon name="plus-square" size={20} color={"#fff"}></Icon>
          </TouchableOpacity>
        )}

        {/*List icon*/}
        <TouchableOpacity onPress={openFavoriteModal}>
          <Icon name="list" size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        {/*play icon*/}
        <TouchableOpacity onPress={() => handlePress("play")}>
          <Icon name="play" size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        {/*setting icon*/}
        <TouchableOpacity onPress={() => navigation.navigate("FontSettings")}>
          <Icon name="cog" size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        {/* Language Picker (opens modal) */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.pickerContainer}
        >
          <Text style={styles.pickerText}>{selectedLanguage}</Text>
        </TouchableOpacity>

        {/* Modal for language selection */}
        {isModalVisible && (
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            animationOut="slideOutDown"
            backdropOpacity={0.5}
          >
            <View style={styles.modalContent}>
              {allSongs.map((language) => (
                <TouchableOpacity
                  key={language.language_key}
                  onPress={() => handleLanguageSelect(language.language_key)}
                  style={styles.languageOption}
                >
                  <Text style={styles.languageText}>
                    {language.language_key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        )}

        {/* Favorite Modal*/}

        {isFavoritesModalVisible && (
          <Modal
            isVisible={isFavoritesModalVisible}
            onBackdropPress={() => {
              setFavoritesModalVisible(false);
              const selectedLanguageSongs = allSongs.find(
                (lang) => lang.language_key === selectedLanguage
              );
              if (selectedLanguageSongs) {
                setFilteredSongs(selectedLanguageSongs.Content);
              }
            }}
            backdropTransitionOutTiming={0}
            style={styles.favoritesModalContainer}
          >
            {selectedSong && (
              <View style={styles.favoritesModalContent}>
                <Text style={styles.modalTitle}>ተወዳጅ መዝሙሮች</Text>
                <SongList
                  data={
                    allSongs.find((l) => l.language_key === selectedLanguage)
                      ?.Content || []
                  }
                  onPressItem={(item) => {
                    setSelectedSong(item);
                    setFavoritesModalVisible(false);
                  }}
                  favorites={favorites}
                  //onToggleFavorite={() => toggleFavorite(selectedSong.id, true)}
                  onToggleFavorite={removeFavorite}
                  currentLanguage={selectedLanguage}
                  loadMore={loadMoreSongs}
                  loading={loading}
                  removalOnly={true}
                />
              </View>
            )}
          </Modal>
        )}

        {/* Search Modal*/}

        {isSearchModalVisible && (
          <Modal
            isVisible={isSearchModalVisible}
            onBackdropPress={() => {
              setSearchModalVisible(false);
              setSearchText("");
              //setFilteredSongs([]);
              setSelectedCategory(null);
              resetActiveSongsForLanguage();
            }}
            onModalShow={setDefaultSongsForLanguage}
            backdropColor="#000"
            backdropOpacity={0.5}
            backdropTransitionInTiming={0}
          >
            <View style={styles.modalContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholders[selectedLanguage] || "ይፈልጉ..."}
                placeholderTextColor={isDarkMode ? "black" : "white"}
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  searchSongs(text);
                }}
              ></TextInput>
              {filteredSongs.length > 0 ? (
                <FlatList
                  data={filteredSongs}
                  keyExtractor={(item, index) =>
                    `${item.language_value}_${item.id}_${index}`
                  }
                  renderItem={renderSongItem}
                  nestedScrollEnabled={true}
                  extraData={isDarkMode}
                />
              ) : (
                <Text style={styles.noResultsText}></Text>
              )}
            </View>
          </Modal>
        )}
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Swipe-enabled Content */}
      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{ velocityThreshold: 0.5, directionalOffsetThreshold: 100 }}
      >
        {selectedSong && (
          // view WHERE SELECTED SONG DISPLAYED
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ paddingBottom: 50 }} // Add padding for the bottom
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.songContainer}>
              <ImageBackground
                source={
                  isDarkMode
                    ? require("../assets/images/S.jpg")
                    : require("../assets/images/inverted_S.jpg")
                }
                style={[styles.backgroundImage, { paddingBottom: 60 }]}
              >
                {/* Verses Display */}
                {selectedSong.chorus && (
                  <Text style={styles.selectedSongPlainTitle}>
                    {selectedSong.title}
                  </Text>
                )}
                <Text style={styles.selectedSongTitle}>
                  {selectedSong.chorus}
                </Text>
                {[
                  selectedSong.verse_1,
                  selectedSong.verse_2,
                  selectedSong.verse_3,
                  selectedSong.verse_4,
                  selectedSong.verse_5,
                  selectedSong.verse_6,
                  selectedSong.verse_7,
                ]
                  .filter((verse) => verse && verse.trim() !== "")
                  .map((verse, index) => (
                    <Text key={index} style={styles.verse1Style}>
                      {verse}
                    </Text>
                  ))}
                <Text style={styles.footer}>
                  Author: {selectedSong.artist}{" "}
                </Text>
              </ImageBackground>
            </View>
            <CollapsibleActionButton
              fullLyricText={fullLyricText}
              onCopy={handleCopy}
              onShare={handleShare}
              isDarkMode={isDarkMode}
            />
          </ScrollView>
        )}
      </GestureRecognizer>
    </View>
  );
};
export default NavbarScreen;

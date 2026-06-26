import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
  Alert,
  Share,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Button,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GestureRecognizer from "react-native-swipe-gestures";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import SongList from "./SongList";
import CollapsibleActionButton from "./CollapsibleActionButton";
import getStyles from "../components/css/app";
import { useTheme } from "@/app/ThemeProvider";
import localizations from "@/data/localizations";
import { LyricsContent } from "../constants/songsTypes";
import { initializeDatabase } from "@/data/database/localDb";
import { useSongs } from "@/lyricsContext/context";
import { RootStackParams } from "@/app/types";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated,{ runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CategoryScroll from "./categories/categories";
import { LanguageName } from "./categories/language-key";
import { useRootNavigationState } from "expo-router";
import { useLanguage } from "./languageContext/language-context";
import {Audio} from "expo-av"
import { categoryTranslations } from "./categories/categoryTranslations";
import { LinearGradient } from "expo-linear-gradient";

const { height: deviceHeight } = Dimensions.get("window");
type NavigationProp = DrawerNavigationProp<RootStackParams>;
type NavbarScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route:  {
    key: string;
    name: string;
    params?: any;
  };
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
const displayLanguage = (lang: string) => {
  if (!lang) return "";
  lang ==(lang=='oromo'?'A.Oromo':lang);
  return lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();;
};
const NavbarScreen: FC<NavbarScreenProps> = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const styles = getStyles(isDarkMode, fontSize, fontFamily);
  const [isModalVisible, setModalVisible] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    windowDimensions.width > windowDimensions.height ? "landscape" : "portrait"
  );
  const { dataSongsToLoad: dataSongs, setDataSongs, syncUpdates } = useSongs();
  const [syncProgress, setSyncProgress] = useState(0);
  // Orientation
  useEffect(() => {
    const handleOrientationChange = ({ window }: { window: any }) => {
          setWindowDimensions(window);
          setOrientation(window.width > window.height ? "landscape" : "portrait");
        };
    const subscription = Dimensions.addEventListener("change", handleOrientationChange);
        return () => subscription.remove();
      }, []);
        const route = useRoute().params;
        
  const {language:initialLanguage} = useRoute().params|| {};
  // Search & Favorites
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isFavoritesModalVisible, setFavoritesModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<LyricsContent[]>([]);
  const [selectedSong, setSelectedSong] = useState<LyricsContent | null>(null);
  const {language:selectedLanguage, setLanguage:setSelectedLanguage} = useLanguage();
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [swipeLock, setSwipeLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(fontSize);
  const [favorites, setFavorites] = useState<FavoriteKey[]>([]);
  const [selectedCategory,setSelectedCategory] = useState("All")
  //const route = useNavigation()
  const playSound = async () => {
  try {
    if (sound) {
      // If already loaded → toggle play/pause
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    // Load sound first time
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../assets/audio/smu-audio.mp3") // <-- your file here
    );

    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();

  } catch (error) {
    console.log("Error playing sound:", error);
  }
};
useEffect(() => {
  savedScale.value = fontSize;
}, [fontSize]);
useEffect(() => {
  return () => {
    if (sound) {
      sound.unloadAsync();
    }
  };
}, [sound]);
useEffect(() => {
  
     if (initialLanguage) {
          setSelectedLanguage(initialLanguage)
        }
       

}, [initialLanguage]);
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
          .filter((key: any) => typeof key === "string" && key.includes("_"))
          .map((key: string) => key as FavoriteKey);
        setFavorites(validFavorites);
      }
    };
    loadFavorites();
  }, []);
  // Fetch songs from backend or local DB
  useEffect(() => {
    let interval:NodeJS.Timeout;
    const fetchAndSyncSongs = async () => {
      try {
        setLoading(true);
        setSyncProgress(0);
        interval = setInterval(() =>{
          setSyncProgress(prev =>{
            if(prev >=95) return prev;
            return prev + 2;
          })
        }, 300)
        await initializeDatabase();
        await syncUpdates(); // fetch new songs from backend
      } catch (error) {
        console.error("Failed to fetch and sync songs:", error);
      } finally {
        clearInterval(interval);
      }
    };
    fetchAndSyncSongs();
    return () =>{
       if(interval) clearInterval(interval)
    }
  }, []);
  // Derived: full songs of selected language
  const fullSongs = useMemo(() => {
    return dataSongs
      .filter((l) => l.language === selectedLanguage && !l.deletedAt)
      .flatMap((l) => normalizeLyricsContents(l.LyricsContents));
  }, [dataSongs, selectedLanguage]);
  // Set filtered songs when dataSongs or language changes
  useEffect(() => {
    if (fullSongs.length > 0) {
      setFilteredSongs(fullSongs);
      setSelectedSong(fullSongs[0]);
      setCurrentSongIndex(0);
      setSyncProgress(100); 
      setTimeout(() => {
      setLoading(false);
    }, 300); 
    }
  }, [fullSongs]);
 const uniqueLanguages = useMemo(() => {
  const map = new Map<string, string>();

  dataSongs
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? 0).getTime() -
        new Date(a.updatedAt ?? 0).getTime()
    )
    .forEach(song => {
      if (!map.has(song.language)) {
        map.set(song.language, song.language);
      }
    });

  return Array.from(map.values());
}, [dataSongs]);
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
          newFavorites = prev.includes(favoriteKey)
            ? prev.filter((key) => key !== favoriteKey)
            : [...prev, favoriteKey];
        }
        // Save to AsyncStorage
        AsyncStorage.setItem("favorites", JSON.stringify(newFavorites)).catch(
          (error) => console.error("Error saving favorite:", error),
        );
        return newFavorites;
      });
    },
    [selectedLanguage],)
  const getSwipeSongs = useCallback(() => fullSongs, [fullSongs]);
  // Swipe handlers
  const onSwipeLeft = useCallback(() => {
    const songs = getSwipeSongs();
    if (swipeLock || currentSongIndex >= songs.length - 1) return;
    const nextIndex = currentSongIndex + 1;
    setCurrentSongIndex(nextIndex);
    setSelectedSong(songs[nextIndex]);
    setSwipeLock(true);
    setTimeout(() => setSwipeLock(false), 250);
  }, [currentSongIndex, swipeLock, getSwipeSongs]);
  const onSwipeRight = useCallback(() => {
    const songs = getSwipeSongs();
    if (swipeLock || currentSongIndex <= 0) return;
    const prevIndex = currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setSelectedSong(songs[prevIndex]);
    setSwipeLock(true);
    setTimeout(() => setSwipeLock(false), 250);
  }, [currentSongIndex, swipeLock, getSwipeSongs]);
  // Language selection
  const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
  };
  // Search
  const searchSongs = (text: string) => {
    const trimmed = text.trim().toLowerCase();
    if (/^\d+$/.test(trimmed)) {
      const idx = parseInt(trimmed, 10) - 1;
      setFilteredSongs(idx >= 0 && idx < fullSongs.length ? [fullSongs[idx]] : []);
      return;
    }
    const filtered = fullSongs.filter((song) =>
      song.title?.toLowerCase().includes(trimmed) || 
      song.Artist?.name?.toLowerCase().includes(trimmed)
    )
    setFilteredSongs(filtered);
  };
  const underline = selectedSong?.title ? "*".repeat(selectedSong.title.length) : "";
  const fullLyricText = [
    selectedSong?.title,
    underline,
    selectedSong?.chorus,
    selectedSong?.verse1,
    selectedSong?.verse2,
    selectedSong?.verse3,
    selectedSong?.verse4,
    selectedSong?.verse5,
    selectedSong?.verse6,
    selectedSong?.verse7,
  ].filter(Boolean).join("\n \n");
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
  const closeSearchModal = useCallback(() => {
    setSearchText("");
    setFilteredSongs(fullSongs);
    setSearchModalVisible(false);
  }, [fullSongs]);
const songIndexInFullList = fullSongs.findIndex(s => s.Id === selectedSong?.Id);
const MIN_SIZE = 16;
const MAX_SIZE = 40;
const pinchGesture = Gesture.Pinch()
  .onUpdate((event) => {
    // Apply temporary scale but don't go below min or above max
    const newScale = savedScale.value * event.scale;
    scale.value = Math.min(Math.max(newScale, MIN_SIZE), MAX_SIZE) / savedScale.value;
  })
  .onEnd(() => {
    // Save the final size, clamped
    const newSize = Math.min(Math.max(savedScale.value * scale.value, MIN_SIZE), MAX_SIZE);
    savedScale.value = newSize;
    scale.value = 1;
    runOnJS(setFontSize)(newSize);
  });
  //const categories = ["All","THANKSGIVING", "Testmony","Prayer","Praise", "Worship","CONFESS","DEVOTIONAL","CHRISTIAN_LIVING"]
const uniqueCategories = ["All",Array.from(new Set(filteredSongs.map(item => item.Category)))];
const categories = useMemo(() => {
  const uniqueCategories = Array.from(
    new Set(filteredSongs.map(item => item.Category))
  );
  return ["All", ...uniqueCategories];
}, [filteredSongs]);

const songsByCategory = useMemo(()=>{
   if(selectedCategory ==="All")
    return filteredSongs
  return filteredSongs.filter(song =>song.Category === selectedCategory)
},[filteredSongs, selectedCategory])
useEffect(() => {
  return () => {
    if (sound) {
      sound.unloadAsync();
    }
  };
}, [sound]);

const displayLanguageName = (lang: string) => {
  if (!lang) return "";

  const normalized = lang.toLowerCase();

  if (normalized === "amharic") return "አማርኛ";
if (normalized === "sidama") return "ሲዳሚኛ";
  return lang;
};//category translation
const translateCategory = (category?: string): string => {
  if (!category) return "";

  return (
    categoryTranslations[
      category as keyof typeof categoryTranslations]?.[selectedLanguage]
     || category
  );
};
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: scale.value }],
  };
});
//selectedLanguage ==(selectedLanguage !=='oromo'?selectedLanguage:'A.Oromo')
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        {selectedSong && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="home" size={18} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.number}>
          #
  {typeof songIndexInFullList === "number" && songIndexInFullList >= 0
    ? songIndexInFullList + 1
    : ""}
        </Text>
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Icon name="search" size={18} color="#fff" />
        </TouchableOpacity>
        {selectedSong && (
          <TouchableOpacity onPress={() => toggleFavorite(selectedSong.Id, true)}>
            <Icon name="plus-square" size={18} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => setFavoritesModalVisible(true)}>
          <Icon name="list" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert("Info", "መዝሙር ማጨዎቻ ሊሰራ ታቅዷል")}>
          <Icon name={isPlaying?"pause":"play"} size={18} color="#fff" onPress={() =>playSound} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ቅርጽ፟_ማስተካከያ")}>
          <Icon name="cog" size={18} color="#fff" />
        </TouchableOpacity>
        <LinearGradient
        colors={
          isDarkMode
            ? ["rgba(20, 100, 71, 0.9)", "rgba(20, 100, 71, 0.4)"]
            : ["rgba(23, 47, 37, 0.9)", "rgba(23, 47, 37, 0.4)"]
        }
        style={styles.pickerContainer}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.pickerText}>
            {displayLanguage(selectedLanguage ) =='Oromo'?'A.Oromo':displayLanguage(selectedLanguage )}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons name={isDarkMode ? "moon" : "sunny"} size={20} color="#fff" />
        </TouchableOpacity>
        
      </View>
      <View>
          
             {/* Sync Progress */}
    {loading ? (
        <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop:80
    }}
  >
    <ActivityIndicator size="large" color={isDarkMode?"#1F6F5B":'#fff'} />
    <Text
      style={{
        marginTop: 40,
        fontSize: 16,
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      Syncing...
    </Text>
  </View>
   
    ):(
          <View>
             <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1}}>
                {selectedSong && (
                    <ImageBackground
                      source={
                        isDarkMode
                          ? require("../assets/images/S.jpg")
                          : require("../assets/images/inverted_S.jpg")
                      }
                      resizeMode="cover"
                      style={[styles.backgroundImage, { paddingBottom: deviceHeight * 0.42,   minHeight: deviceHeight, }]}
                    >
                      <GestureDetector gesture={pinchGesture}>
                       <Animated.View style={animatedStyle}> 
                  <GestureRecognizer
                    onSwipeLeft={onSwipeLeft}
                    onSwipeRight={onSwipeRight}
                    config={{ velocityThreshold: 0.5, directionalOffsetThreshold: 50 }}
                  >
                      <SafeAreaView style={{ flex: 1}}>
                        <View style={{ width: "100%", alignItems: "center" }}>
                        {selectedSong.title && 
                        <Text style={styles.selectedSongPlainTitle}>
                          {selectedSong.title
                            .toLowerCase()
                            .split(" ")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Text>}
                        
                        {selectedSong.chorus && 
                        <Text style={styles.selectedSongTitle}>{selectedSong.chorus}{'\n \n'}</Text>}
                            {[selectedSong.verse1, selectedSong.verse2, selectedSong.verse3, selectedSong.verse4,
                              selectedSong.verse5, selectedSong.verse6, selectedSong.verse7]
                              .filter(Boolean)
                              .map((verse, idx) => (
                        <Text key={idx} style={styles.verse1Style}>{verse}</Text>
                          ))} 
                        </View>                       
                      </SafeAreaView>                     
                      </GestureRecognizer>
                      </Animated.View > 
                      </GestureDetector>
                    </ImageBackground>
                )} 
                <View style={styles.footerContainer}>
                          <Text style={[styles.artistName, { color: isDarkMode ? "#aaa" : "#555" }]}>
                            {selectedSong?.Artist?.name !== "Not Specified"
                              ? selectedSong?.Artist?.name
                                .toLowerCase().split(" ")
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")
                              : null}
                          </Text>
                          <Text style={[styles.artistBio, { color: isDarkMode ? "#aaa" : "#555" }]}>
                            {translateCategory(selectedSong?.Category) || "Not found"}
                          </Text>
                </View>  
            </ScrollView>
            <View style ={{display:"flex"}}>             
                <View style={[styles.floatingButtonContainer]}>
                  <CollapsibleActionButton
                    fullLyricText={fullLyricText}
                    onCopy={handleCopy}
                    onShare={handleShare}
                    isDarkMode={isDarkMode}
                  />
                
              </View>
            </View>
         </View>
          )}
      </View>
      <Modal
        isVisible={isSearchModalVisible}
        backdropOpacity={0.5}
        avoidKeyboard
        propagateSwipe
        style={{ margin: 0 }}
        onBackdropPress={closeSearchModal}
        onBackButtonPress={closeSearchModal}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
           <View style={styles.fancyModal}>
        <View>
      <CategoryScroll 
          lyricsData={filteredSongs} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory}
          selectedLanguage={selectedLanguage as LanguageName}
          translateCategory={translateCategory}>
      </CategoryScroll>
    </View>
    <View style={styles.searchHeader}>
              <TextInput
                style={styles.fancyInput}
                placeholder={localizations.find((key) => key.language === selectedLanguage)?.SearchHolder || "Barbaad ..."}
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={(text) => {
                  setSearchText(text);
                  searchSongs(text);
                }}
              />
            </View>
            {filteredSongs.length > 0 ? (
              <FlashList
                data={songsByCategory}
                keyExtractor={(item) => `${item.Id}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.songRow, { backgroundColor: isDarkMode ? "#fff" : "#121212" }]}
                    onPress={() => {
                      setSelectedSong(item);
                      setCurrentSongIndex(fullSongs.findIndex(s => s.Id === item.Id));
                      closeSearchModal();
                    }}
                  >
                    <View style={styles.songIndex}>
                      <Text style={[styles.indexText, { color: isDarkMode ? "#000" : "#9acd32" }]}>
                        {fullSongs.findIndex(s => s.Id === item.Id) + 1}
                      </Text>
                    </View>
                    <View style={styles.songInfo}>
                      <Text style={[styles.songTitle, { color: isDarkMode ? "#000" : "#fff" }]} numberOfLines={1}>{item.title}</Text>
                      {item.Artist && <Text style={[styles.songSubtitle, { color: isDarkMode ? "#444" : "#aaa" }]} numberOfLines={1}>{item.Artist.name}</Text>}
                    </View>
                  </TouchableOpacity>
                )}
                estimatedItemSize={300}
                keyboardShouldPersistTaps="handled"
              />
            ) : (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>No songs found</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
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
            data={fullSongs}
            onPressItem={(item) => {
              setSelectedSong(item);
              setFavoritesModalVisible(false);
            }}
            favorites={favorites}
            onToggleFavorite={(songId) => toggleFavorite(songId, true)}
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
                setTimeout(() => setModalVisible(false), 50);
              }}
              style={styles.languageOption}
            >
             <Text style={styles.languageText}>
              {displayLanguageName(language) ==='oromo'?'A.Oromo':displayLanguage(language)}
             </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};
export default NavbarScreen;

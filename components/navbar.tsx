import {
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import Toast from 'react-native-toast-message';
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
  ListRenderItem,
  Alert,
  Share,
  SafeAreaView,
  ToastAndroid,
  Platform,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParams } from "@/app/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import GestureRecognizer from "react-native-swipe-gestures";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SongList from "./SongList";
import CollapsibleActionButton from "./CollapsibleActionButton";
import getStyles from "../components/css/app";
import allSongs from "@/data/allsongs";
import localizations from "@/data/localizations";
import { useTheme } from "@/app/ThemeProvier";
import Constants from 'expo-constants'
import {LyricsContent, SongContent} from "../constants/songsTypes"
import {transformSongsByLanguage} from "../configurations/dataTransformations"
import { LANGUAGE_MAP} from "@/configurations/language-map";
const { height: deviceHeight } = Dimensions.get("window");
type NavigationProp = DrawerNavigationProp<RootStackParams>;
type NavbarScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

const NavbarScreen: FC<NavbarScreenProps> = () => {
  //const { dataSongs, loadingData, error } = useExternalSongsHook();
  const { isDarkMode, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Roboto");
  const styles = getStyles(isDarkMode, fontSize, fontFamily);

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    windowDimensions.width > windowDimensions.height ? 'landscape' : 'portrait'
  );

 useEffect(() => {
  const handleOrientationChange = ({ window }: { window: any }) => {
    setWindowDimensions(window);
    setOrientation(window.width > window.height ? 'landscape' : 'portrait');
  };

  // Subscribe to dimension changes
  const subscription = Dimensions.addEventListener('change', handleOrientationChange);

  // Cleanup subscription on unmount
  return () => {
    subscription.remove(); // <-- Correct way to remove
  };
}, []);



  const navigation = useNavigation<NavigationProp>();
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [isFavoritesModalVisible, setFavoritesModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [filteredSongs, setFilteredSongs] = useState<LyricsContent[]>([]);
  const [selectedSong, setSelectedSong] = useState<LyricsContent | null>(null);

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
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    const message = "መዝሙር ማጨዎቻ ሊሰራ ታቅዷል";

  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("Info", message); // fallback for iOS
  }
  };
  const handleSettingPress = () => {
    console.log("navigation:", navigation);
  };
//calling API 
  const [dataSongs, setData] = useState<SongContent[]>([]);
  const[loadingData, setLoadingData] = useState(true)
  const[error, setError] = useState('')
  const selectedSongGroup = dataSongs.find((item) =>item.language ===selectedLanguage)
  const handleSwipe = (direction:'left' | 'right')=>{
    const languageSongs = dataSongs
                                  .filter((lang) => lang.language === selectedLanguage)
                                  .flatMap((lang) => lang.LyricsContents.map((lyric, index) => ({
                                    ...lyric,
                                    displayId: index + 1,
                                  })));

    const currentIndex = languageSongs.findIndex((song) =>song.displayId ===selectedSong?.displayId)
    if(currentIndex === -1) return;
    let newIndex = direction ==='left'?currentIndex+1:currentIndex -1
    if(newIndex < 0) newIndex = 0
    if(newIndex >=languageSongs.length){
      newIndex = languageSongs.length -1 ;
    }
    setSelectedSong(languageSongs[newIndex])
  }
  useEffect(() =>{
  const fetchData=async()=>{
        try{
              let debuggerHost: string | undefined;

        // Expo Go / development mode
        if (Constants.expoGoConfig?.debuggerHost) {
          debuggerHost = Constants.expoGoConfig.debuggerHost;
        }
        // Fallback to expoConfig if available
        else if (Constants.expoConfig?.hostUri) {
          debuggerHost = Constants.expoConfig.hostUri;
        }

        // Extract IP address
        const host = debuggerHost?.split(':')[0] || 'localhost';
        const apiUrl = `http://${host}:3001/lyrics`;

        const response =  await fetch(apiUrl);;
        if(!response.ok){
          throw new Error('Network response was not ok');
        }
      let dt = await response.json();
      dt =  dt.map((song: any) => ({
        ...song,
        LyricsContents: Array.isArray(song.LyricsContents)
          ? song.LyricsContents
          : [],
      }));
      
   //dt = JSON.stringify(dt, null, 2);
    //   console.log('Fetched Data:', JSON.stringify(dt, null, 2));
       const transformedSongs = transformSongsByLanguage(dt);
       console.log('Transformed Data:', JSON.stringify(transformedSongs, null, 2));

      setData(transformedSongs);
       }
        catch(e:any){
          setError(e.message || 'something is wrong')
    } finally{
      setLoadingData(false)
    }
  };
  fetchData()
}, [])

  const searchPlaceholders: Record<string, string> = {
    አማርኛ: "በመዝ. ርዕስ፣ ቁጥር፣ ምድብ፣ ወይም በዘማሪ ስም ይፈልጉ",
    English: "Search by title, category, or artist name",
    Oromo:
      "Mata dureen, Tartiibaan ykn faarfattootaan/ Maqaa faarfattootaa barbaadaa",
    ሲዳሚኛ: "Birxichunni, gaamotenni wey faarsaannote su'minni hasse",
    ትግርኛ: "ብኣርእስቲ ብመደብ ወይ ከዓ ብዘማሪ ስም ይድለዩ",
    ከምባትኛ: "boqqo xawwin te zammaraanch/zamaran su'mmin su'mmiin hashe",
    ሀዲይኛ: "በመዝ. ርዕስ፣ ቁጥር፣ ምድብ፣ ወይም በዘማሪ ስም ይፈልጉ",
    ወላይትኛ: "Huuphe yohuwan Woyikko Sabanchchan / Sabanchatu Sunttaa Koyite",
    Neur: "Kä göörɛ kɛ  kɛ thäänyniknɛn kiɛ caak ti cikɛ cak/wutnikiɛ män",
    ጉራጊኛ: "በሸድ ሸድ ዌም ቢዘምር ዌም ቢዘምሮዌ ሽም ሳቦ።",
  };
// Transformate the Json

  const resetActiveSongsForLanguage = () => {
    const selectedLanguageSongs = dataSongs.filter(
      (lang) => {
        lang.language.toLowerCase() === 'AMHARIC' ? 'አማርኛ' : lang.language;
        lang.language === selectedLanguage}
    );
      const allLyrics = selectedLanguageSongs.flatMap((lang) =>lang.LyricsContents)

    if (selectedLanguageSongs && selectedLanguageSongs) {
      setFilteredSongs(allLyrics);
      return selectedLanguageSongs;
    }
    return [];
  };
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
  if (!dataSongs || dataSongs.length === 0) return;


  // Normalize languages inside songs
  const normalizedSongs = dataSongs.map((song) => {
   return {
    ...song,
   }
  });

  // Filter by selected language, flatten, and add displayId
  const selectedLanguageSongs = normalizedSongs
    .filter((song) => song.language === selectedLanguage)
    .flatMap((song) => song.LyricsContents || [])
    .map((song, index) => ({
      ...song,
      displayId: index + 1,
    }));

  setFilteredSongs(selectedLanguageSongs);
  setSelectedSong(selectedLanguageSongs[0] ?? null);
}, [dataSongs, selectedLanguage]);

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
    const selectedLanguageSongs = dataSongs
                .filter((lang) => lang.language === language)
                .flatMap((lang) =>lang.LyricsContents);
    if (selectedLanguageSongs && selectedLanguageSongs.length > 0) {
      setSelectedSong(selectedLanguageSongs[0]);
      setFilteredSongs(selectedLanguageSongs);
      setPage(1);
      setHasMore(true);
      setVerseIndex(0);
    }
    setModalVisible(false);
  };

  // song item renderer
  const renderSongItem: ListRenderItem<LyricsContent> = useCallback(
    ({ item }: { item: LyricsContent }) => {
      const fullSongs =
        dataSongs.filter((lang) => lang.language === selectedLanguage)
                .flatMap((lang) =>lang.LyricsContents)
           || [];

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
              (song) => song.Id === item.Id
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
          </Text>
        </TouchableOpacity>
      );
    },
    [dataSongs, favorites, selectedLanguage, isDarkMode]
  );

  const setDefaultSongsForLanguage = () => {
    const selectedLanguageSongs = dataSongs.filter(
      (language) => language.language === selectedLanguage
    );

    // If there are songs for the selected language, set them as default
    if (selectedLanguageSongs.length > 0) {
        const allLyrics = selectedLanguageSongs.flatMap(song => song.LyricsContents);
      setFilteredSongs(allLyrics.slice(0, 5));
    } else {
      setFilteredSongs([]); // No songs available for the selected language
    }
  };

  const searchSongs = (text: string) => {
    const trimmedSearch = searchText.trim();
    const selectedLanguageSongs = dataSongs
    .filter((language) => language.language === selectedLanguage)
    .flatMap((song) =>song.LyricsContents)

    if (!selectedLanguageSongs || selectedLanguageSongs.length === 0) {
      setFilteredSongs([]);
      return;
      //} else if (selectedLanguageSongs) {
      //setFilteredSongs(selectedLanguageSongs.Content);
    }
    //Check if the search text us numeric (all digits)
    const isNumeric = /^d+$/.test(trimmedSearch);
    const lowerSearchText = trimmedSearch.toLowerCase();

    const results = selectedLanguageSongs.filter((song) => {
    
      const matchesCategory = selectedCategory
        ? song.Category === selectedCategory
        : true;

      let matchesText = false;

      if (trimmedSearch === "") {
        matchesText = true;
      } else if (isNumeric) {
        matchesText =
          song.Id.toString() === trimmedSearch;
      } else {
        matchesText =
          song.title?.toLowerCase().includes(lowerSearchText) ||
          song.Id.toString().includes(trimmedSearch); // Check if ID matches search text
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
    { text: selectedSong?.verse1, style: styles.verse1Style },
    { text: selectedSong?.verse2, style: styles.verse1Style },
    { text: selectedSong?.verse3, style: styles.verse1Style },
    { text: selectedSong?.verse4, style: styles.verse1Style },
    { text: selectedSong?.verse5, style: styles.verse1Style },
    { text: selectedSong?.verse6, style: styles.verse1Style },
    { text: selectedSong?.verse7, style: styles.verse1Style },
  ];

  // Pagination handler
  const loadMoreSongs = useCallback(() => {
    if (hasMore && !loading) {
      setLoading(true);
      // Simulated pagination
      const selectedLanguageSongs : LyricsContent[] = dataSongs
                     .filter((song) =>song.language === selectedLanguage)
                     .flatMap((song) =>song.LyricsContents)
      const newSongs = selectedLanguageSongs.slice((page - 1) * 10, page * 10);
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
      dataSongs.filter((lang) => lang.language === selectedLanguage)
               .flatMap((lang) =>lang.LyricsContents)
        || [];

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
      dataSongs.filter((lang) => lang.language === selectedLanguage)
              .flatMap((lang) => lang.LyricsContents)
        || [];
   
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

  // const handleSongSelect = (item: SongContent): void => {
  //   setSelectedSong(item);
  //   setFavoritesModalVisible(false);
  // };

  // Compute the full lyric text by concatenating all verses with newlines.
  // for the copy and share functionality

  const fullLyricText = [
    selectedSong?.title,
    selectedSong?.chorus,
    ...verses.filter((verse) => verse?.text).map((verse) => verse.text),
  ].join("\n");

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    //  const title =  localizations.find(key => key.language_key === selectedLanguage)?.LyricsCopiedTitle || ''

    //  const description =  localizations.find(key => key.language_key === selectedLanguage)?.LyricsCopiedDescription || ''
 
        Alert.alert(localizations.find(key =>key.language === selectedLanguage)?.LyricsCopiedTitle||'',localizations.find(key =>key.language === selectedLanguage)?.LyricsCopiedDescription ||'')
       };

  const handleShare: (text: string) => Promise<void> = async (text: string) => {
    try {
      await Share.share({ message: text });
    } catch (error) {
      Alert.alert(localizations.find(key =>key.language === selectedLanguage)?.CopyErrorTitle||'',localizations.find(key =>key.language === selectedLanguage)?.CopyErrorDescription ||'')
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
          {selectedSong ? `#${filteredSongs.findIndex(s => s.Id === selectedSong.Id) + 1}` : ""}
        </Text>
        {/*Search icon*/}
        <TouchableOpacity onPress={openSearchModal}>
          <Icon name="search" size={20} color={"#fff"}></Icon>
        </TouchableOpacity>
        {/*heart icon*/}
        {selectedSong && (
          <TouchableOpacity
            onPress={() => toggleFavorite(selectedSong.Id, true)}
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
            style={{ margin: 0 }}
          >
            <View style={styles.modalContent}>
              {dataSongs.map((language) => (
                <TouchableOpacity
                  key={`${language.language}_${language.Id}`}
                  onPress={() => handleLanguageSelect(language.language)}
                  style={styles.languageOption}
                >
                  <Text style={styles.languageText}>
                    {language.language}
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
              const selectedLanguageSongs = dataSongs.filter(
                (lang) => lang.language === selectedLanguage
              );
              const allLyrics = selectedLanguageSongs.flatMap(song => song.LyricsContents);
              if (selectedLanguageSongs.length >0) {
                setFilteredSongs(allLyrics);
              }
            }}
            backdropTransitionOutTiming={0}
            style={styles.favoritesModalContainer}
          >
            {selectedSong && (
              <View style={styles.favoritesModalContent}>
                <Text>Title</Text>
                <Text style={styles.modalTitle}>
                  
                  {dataSongs.find((l) => l.language === selectedLanguage)
                    ?.Header || "No Header"}
                </Text>
                <SongList
                  data={
                    dataSongs.filter((l) => l.language === selectedLanguage)
                             .flatMap((l) =>l.LyricsContents)
                      
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
                <FlatList<LyricsContent>
                  data={filteredSongs}
                  keyExtractor={(item) =>
                    `${item.Id}`
                  }
                  renderItem={renderSongItem}
                  nestedScrollEnabled={true}
                  extraData={isDarkMode}
                />
              ) : (
                <Text style={styles.noResultsText}>
                  {
                    dataSongs.find(
                      (key) => key.language === selectedLanguage
                    )?.Header
                  }
                </Text>
              )}
            </View>
          </Modal>
        )}
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDarkMode ? "moon" : "sunny"}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Swipe-enabled Content */}
      <View style={{ flex: 1, position:'relative' }}>
      <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{ velocityThreshold: 0.5, directionalOffsetThreshold: 100 }}
      >
        {selectedSong && (
          // view WHERE SELECTED SONG DISPLAYED
          <ScrollView
            style={styles.scrollContainer}
// Add padding for the bottom
           contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
          >
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
                <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
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
                  selectedSong.verse1,
                  selectedSong.verse2,
                  selectedSong.verse3,
                  selectedSong.verse4,
                  selectedSong.verse5,
                  selectedSong.verse6,
                  selectedSong.verse7,
                ]
                  .filter((verse) => verse && verse.trim() !== "")
                  .map((verse, index) => (
                    <Text key={index} style={styles.verse1Style}>
                      {verse}
                    </Text>
                  ))}
                </SafeAreaView>
              </ImageBackground>
            </View>
            
          </ScrollView>
        )}
       
      </GestureRecognizer>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 999,
          }}
        >
             </View>
      </View>
      <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 40,
            zIndex: 999,
          }}
        >
            </View>
            <View style={styles.floatingButtonContainer}>
        <CollapsibleActionButton
              fullLyricText={fullLyricText}
              onCopy={handleCopy}
              onShare={handleShare}
              isDarkMode={isDarkMode}
            />
          </View>
    </View>
  );
};
export default NavbarScreen;

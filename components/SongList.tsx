import React, { memo, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import songListStyles from "./css/song-list";
import { LyricsContent } from "@/constants/songsTypes";
import { useTheme } from "@/app/ThemeProvider";
import allSongs from "@/data/allsongs";

type FavoriteKey = `${string}_${number}`;

type SongListProps = {
  data: LyricsContent[];
  onPressItem: (item: LyricsContent) => void;
  favorites: FavoriteKey[];
  onToggleFavorite: (songId: number) => void;
  loadMore?: () => void;
  loading?: boolean;
  currentLanguage: string;
  removalOnly?: boolean; // show only favorites for removal
};

const SongList = memo(
  ({
    data,
    onPressItem,
    favorites,
    onToggleFavorite,
    loadMore,
    loading,
    currentLanguage,
    removalOnly = false,
  }: SongListProps) => {
    const { isDarkMode } = useTheme();
    const [fontSize] = useState(16);
    const [fontFamily] = useState("Roboto");

    const styles = songListStyles(isDarkMode, fontSize, fontFamily);

    // Filter favorites for current language
    const currentLangFavorites = useMemo(
      () => favorites.filter((key) => key.startsWith(`${currentLanguage}_`)),
      [favorites, currentLanguage]
    );

    // Filter data: all songs or only favorites if removalOnly
    const filteredDataWithIndices = useMemo(() => {
      return data
        .map((item, index) => ({
          ...item,
          displayIndex: index + 1,
        }))
        .filter((item) =>
          removalOnly
            ? currentLangFavorites.includes(`${currentLanguage}_${item.Id}`)
            : true
        );
    }, [data, currentLangFavorites, currentLanguage, removalOnly]);

    const renderItem: ListRenderItem<LyricsContent & { displayIndex: number }> =
      ({ item }) => {
        const isFavorite = currentLangFavorites.includes(
          `${currentLanguage}_${item.Id}`
        );

        return (
          <TouchableOpacity
            style={styles.songCard}
            onPress={() => onPressItem(item)}
          >
            <View style={styles.songInfoContainer}>
              <Text style={styles.songNumber}>#{item.displayIndex}</Text>
              <View style={styles.songTextContainer}>
                <Text style={styles.songTitle}>{item.title}</Text>
              </View>
            </View>

            {isFavorite && (
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation(); // prevent card click
                  onToggleFavorite(item.Id); // remove from favorites
                }}
                style={styles.favoriteButton}
              >
                <Icon name="trash" size={16} color="#ff4444" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      };

    return (
      <FlatList
        data={filteredDataWithIndices}
        renderItem={renderItem}
        keyExtractor={(item) => `${currentLanguage}_${item.Id}`}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {allSongs.find((s) => s.language_key === currentLanguage)?.notFound}
            </Text>
          </View>
        }
      />
    );
  }
);

export default SongList;

import React, { memo, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Appearance,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Song } from "@/app/types";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import songListStyles from "./css/song-list";
import allSongs from "@/data/allsongs";
type FavoriteKey = `${string}_${number}`;

// Type guard to validate favorite keys
const isFavoriteKey = (key: any): key is FavoriteKey => {
  return typeof key === "string" && key.includes("_");
};

type SongListProps = {
  data: Song[];
  onPressItem: (item: Song) => void;
  favorites: FavoriteKey[];
  onToggleFavorite: (songId: number) => void;
  loadMore?: () => void;
  loading?: boolean;
  currentLanguage: string; // Add selectedLanguage prop
  removalOnly?: boolean; // prop for the removal only
};

const SongList = memo(
  ({
    data,
    onPressItem,
    favorites,
    onToggleFavorite,
    loadMore,
    loading,
    currentLanguage, // Receive selectedLanguage
    removalOnly = false,
  }: SongListProps) => {
    // Filter favorites for current language
    const currentLangFavorites = useMemo(
      () => favorites.filter((key) => key.startsWith(`${currentLanguage}_`)),
      [favorites, currentLanguage]
    );
    
  
  const styles = songListStyles()
    // Filter data to show only favorited songs
    const filteredData = useMemo(
      () =>
        data.filter((item) =>
          currentLangFavorites.includes(`${currentLanguage}_${item.id}`)
        ),
      [data, currentLangFavorites, currentLanguage]
    );

    const renderItem: ListRenderItem<Song> = ({ item }) => {
      const isFavorite = currentLangFavorites.includes(
        `${currentLanguage}_${item.id}`
      );

      return (
        <TouchableOpacity
          style={styles.songCard}
          onPress={() => onPressItem(item)}
        >
          <View style={styles.songInfoContainer}>
            <Text style={styles.songNumber}>#{item.song_num}</Text>
            <View style={styles.songTextContainer}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => onToggleFavorite(item.id)}
            style={styles.favoriteButton}
          >
            <Icon
              name={"trash"}
              size={16}
              color={isFavorite ? "#ff4444" : "#888"}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => `${currentLanguage}_${item.id}`}
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
            <Text style={styles.emptyText}>{allSongs.find((key) =>key.language_key ===currentLanguage)?.notFound}</Text>
          </View>
        }
      />
    );
  }
);

// const styles = StyleSheet.create({
//   songCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#fff",
//     marginVertical: 4,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   songInfoContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     color:'white'
//   },
//   songTextContainer: {
//     marginLeft: 12,
//   },
//   songNumber: {
//     fontSize: 16,
//     color: "#888",
//   },
//   songTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
//   songArtist: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
//   favoriteButton: {
//     padding: 8,
//   },
//   loadingContainer: {
//     padding: 16,
//     alignItems: "center",
//   },
//   emptyContainer: {
//     padding: 20,
//     alignItems: "center",
//   },
//   emptyText: {
//     color: "#888",
//     fontSize: 16,
//   },
// });

export default SongList;

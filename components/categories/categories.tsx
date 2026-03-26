import { LyricsContent } from "@/constants/songsTypes";
interface Props {
  lyricsData: LyricsContent[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLanguage: LanguageName; // use proper type
}
import React, { useMemo } from "react";
import {
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { categoryTranslations } from "./categoryTranslations";
import { CategoryKey } from "./category-key";
import { LanguageName } from "./language-key";
interface Props {
  lyricsData: LyricsContent[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLanguage: LanguageName; // use proper type
}
export default function CategoryScroll({
  lyricsData,
  selectedCategory,
  setSelectedCategory,
  selectedLanguage, 
}: Props) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  // Get unique categories
  const uniqueCategories = Array.from(
    new Set(lyricsData.map(item => item.Category))
  ) as CategoryKey[];

  const categories = ["All", ...uniqueCategories] as (CategoryKey | "All")[];

  return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      //  contentContainerStyle={styles.container}
      >
        {categories.map((item) => {
          const isActive = selectedCategory === item;
          const translationLabel = categoryTranslations[item as CategoryKey]?.[selectedLanguage] ?? item;
          return (
            <Pressable
              key={item}
              onPress={() => setSelectedCategory(item)}
              style={({ pressed }) => [
                styles.chip,
                {
                  backgroundColor: isActive
                    ? "#2e7d32"
                    : isDarkMode
                    ? "#1e1e1e"
                    : "#f1f1f1",
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive
                      ? "#fff"
                      : isDarkMode
                      ? "#ccc"
                      : "#333",
                  },
                ]}
              >
                {translationLabel}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 0,
    marginRight: 0,
    elevation: 3,
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
  },
});

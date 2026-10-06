import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LyricsContent } from "@/constants/songsTypes";
import { useTheme } from "@/app/ThemeProvider";

type Slide = { kind: "verse" | "chorus"; label: string; text: string };

type Props = {
  visible: boolean;
  song: LyricsContent | null;
  songNumber?: number;
  fontFamily?: string;
  language?: string;
  onClose: () => void;
  onNextSong?: () => void;
};

type SlideLabels = { chorus: string; verse: string; previous: string; next: string; nextSong: string };
const DEFAULT_SLIDE_LABELS: SlideLabels = {
  chorus: "Chorus",
  verse: "Verse",
  previous: "Previous",
  next: "Next",
  nextSong: "Next song",
};
const SLIDE_LABELS: Record<string, SlideLabels> = {
  አማርኛ: {
    chorus: "አዝማች",
    verse: "ቁጥር",
    previous: "ወደ መጀመሪያ",
    next: "ወደ ቀጣዩ",
    nextSong: "ወደ ቀጣዩ መዝሙር",
  },
  oromo: { ...DEFAULT_SLIDE_LABELS, chorus: "Azmacha", verse: "Wollo" },
};

const MIN_FONT = 20;
const MAX_FONT = 64;

function buildSlides(song: LyricsContent | null): Slide[] {
  if (!song) return [];
  const verses = [
    song.verse1,
    song.verse2,
    song.verse3,
    song.verse4,
    song.verse5,
    song.verse6,
    song.verse7,
  ]
    .map((text, i) => ({ text: text?.trim() ?? "", number: i + 1 }))
    .filter((v) => v.text);
  const chorus = song.chorus?.trim();
  const slides: Slide[] = [];
  if (chorus) {
    slides.push({ kind: "chorus", label: "Chorus", text: chorus });
  }
  verses.forEach((verse) => {
    slides.push({ kind: "verse", label: String(verse.number), text: verse.text });
  });
  return slides;
}

export default function PresentationMode({
  visible,
  song,
  songNumber,
  fontFamily,
  language,
  onClose,
  onNextSong,
}: Props) {
  const labels = (language && SLIDE_LABELS[language]) || DEFAULT_SLIDE_LABELS;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const [index, setIndex] = useState(0);
  const [fontSize, setFontSize] = useState(() => Math.round(Math.min(40, Math.max(26, width * 0.075))));

  // Same palette as the lyrics screen (`isDarkMode` here means the light paper look).
  const barBg = isDarkMode ? "#1F6F5B" : "#2a2a2a";
  const textColor = isDarkMode ? "black" : "white";
  const chorusColor = isDarkMode ? "rgba(0, 11, 28, 0.8)" : "rgba(255, 244, 227, 0.8)";
  const glowColor = isDarkMode ? "rgba(13, 106, 18, 0.75)" : "#F295ED";

  const slides = useMemo(() => buildSlides(song), [song]);
  const isLast = index >= slides.length - 1;

  useEffect(() => {
    setIndex(0);
  }, [song?.Id, visible]);

  const next = () => {
    if (!isLast) setIndex((i) => i + 1);
    else if (onNextSong) onNextSong();
  };
  const previous = () => setIndex((i) => Math.max(0, i - 1));

  const nextRef = useRef(next);
  const previousRef = useRef(previous);
  nextRef.current = next;
  previousRef.current = previous;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 20 && Math.abs(g.dx) > Math.abs(g.dy) * 1.5,
        onPanResponderRelease: (_, g) => {
          if (g.dx < -50) nextRef.current();
          else if (g.dx > 50) previousRef.current();
        },
      }),
    []
  );

  const slide = slides[index];
  const isChorus = slide?.kind === "chorus";
  const counter = slides.length > 0 ? `${index + 1} / ${slides.length}` : "";
  const nextLabel = isLast && onNextSong ? labels.nextSong : labels.next;
  const nextDisabled = isLast && !onNextSong;

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent supportedOrientations={["portrait", "landscape"]}>
      <StatusBar hidden />
      <View style={{ flex: 1, backgroundColor: barBg }} {...panResponder.panHandlers}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: insets.top + 8,
            paddingHorizontal: 14,
            paddingBottom: 10,
            backgroundColor: barBg,
          }}
        >
          <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close presentation">
            <Ionicons name="close" size={26} color="#fff" />
          </Pressable>
          <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 12 }}>
            <Text numberOfLines={1} style={{ color: "#fff", fontSize: 15, fontWeight: "700", fontFamily }}>
              {songNumber ? `#${songNumber} · ` : ""}
              {song?.title ?? ""}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 }}>
              {slide ? `${isChorus ? labels.chorus : `${labels.verse} ${slide.label}`}  ·  ${counter}` : ""}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable onPress={() => setFontSize((s) => Math.max(MIN_FONT, s - 4))} hitSlop={10} accessibilityLabel="Smaller text">
              <Ionicons name="remove-circle-outline" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={() => setFontSize((s) => Math.min(MAX_FONT, s + 4))} hitSlop={10} accessibilityLabel="Larger text">
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            </Pressable>
          </View>
        </View>

        <ImageBackground
          source={isDarkMode ? require("../assets/images/S.jpg") : require("../assets/images/inverted_S.jpg")}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <ScrollView
            key={`${song?.Id}-${index}`}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 28, paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                color: isChorus ? chorusColor : textColor,
                fontFamily,
                fontSize,
                lineHeight: Math.round(fontSize * 1.5),
                textAlign: "center",
                fontWeight: isChorus ? "600" : "400",
                textShadowColor: isChorus ? glowColor : "transparent",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: isChorus ? 10 : 0,
              }}
            >
              {slide?.text ?? ""}
            </Text>
          </ScrollView>
          <Pressable
            onPress={previous}
            accessibilityLabel="Previous"
            style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "16%" }}
          />
          <Pressable
            onPress={next}
            accessibilityLabel="Next"
            style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "16%" }}
          />
        </ImageBackground>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingTop: 8,
            paddingBottom: insets.bottom + 10,
            gap: 10,
            backgroundColor: barBg,
          }}
        >
          <Pressable
            onPress={previous}
            disabled={index === 0}
            style={{ flexDirection: "row", alignItems: "center", gap: 4, opacity: index === 0 ? 0.4 : 1, padding: 8 }}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>{labels.previous}</Text>
          </Pressable>
          <Pressable
            onPress={next}
            disabled={nextDisabled}
            style={{ flexDirection: "row", alignItems: "center", gap: 4, opacity: nextDisabled ? 0.4 : 1, padding: 8 }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>{nextLabel}</Text>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

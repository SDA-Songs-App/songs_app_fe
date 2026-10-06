import React, { useEffect, useMemo, useRef, useState } from "react";
import {
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

type Slide = { kind: "verse" | "chorus"; label: string; text: string };

type Props = {
  visible: boolean;
  song: LyricsContent | null;
  songNumber?: number;
  onClose: () => void;
  onNextSong?: () => void;
};

const MIN_FONT = 20;
const MAX_FONT = 64;

function buildSlides(song: LyricsContent | null, repeatChorus: boolean): Slide[] {
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
  verses.forEach((verse, i) => {
    slides.push({ kind: "verse", label: String(verse.number), text: verse.text });
    if (chorus && (repeatChorus || i === 0)) {
      slides.push({ kind: "chorus", label: "Chorus", text: chorus });
    }
  });
  if (slides.length === 0 && chorus) {
    slides.push({ kind: "chorus", label: "Chorus", text: chorus });
  }
  return slides;
}

export default function PresentationMode({ visible, song, songNumber, onClose, onNextSong }: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [repeatChorus, setRepeatChorus] = useState(true);
  const [index, setIndex] = useState(0);
  const [fontSize, setFontSize] = useState(() => Math.round(Math.min(40, Math.max(26, width * 0.075))));

  const slides = useMemo(() => buildSlides(song, repeatChorus), [song, repeatChorus]);
  const isLast = index >= slides.length - 1;

  useEffect(() => {
    setIndex(0);
  }, [song?.Id, repeatChorus, visible]);

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
  const nextLabel = isLast && onNextSong ? "Next song" : "Next";
  const nextDisabled = isLast && !onNextSong;

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} statusBarTranslucent supportedOrientations={["portrait", "landscape"]}>
      <StatusBar hidden />
      <View style={{ flex: 1, backgroundColor: "#000" }} {...panResponder.panHandlers}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: insets.top + 12,
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="Close presentation">
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>
          <View style={{ alignItems: "center", flex: 1, paddingHorizontal: 12 }}>
            <Text numberOfLines={1} style={{ color: "#9acd32", fontSize: 14, fontWeight: "700" }}>
              {songNumber ? `${songNumber} · ` : ""}
              {song?.title ?? ""}
            </Text>
            <Text style={{ color: "#aaa", fontSize: 12, marginTop: 2 }}>
              {slide ? `${isChorus ? "Chorus" : `Verse ${slide.label}`}  ·  ${counter}` : ""}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable onPress={() => setFontSize((s) => Math.max(MIN_FONT, s - 4))} hitSlop={10} accessibilityLabel="Smaller text">
              <Ionicons name="remove-circle-outline" size={26} color="#fff" />
            </Pressable>
            <Pressable onPress={() => setFontSize((s) => Math.min(MAX_FONT, s + 4))} hitSlop={10} accessibilityLabel="Larger text">
              <Ionicons name="add-circle-outline" size={26} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView
            key={`${song?.Id}-${index}`}
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 28, paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                color: isChorus ? "#9acd32" : "#fff",
                fontSize,
                lineHeight: Math.round(fontSize * 1.45),
                textAlign: "center",
                fontStyle: isChorus ? "italic" : "normal",
                fontWeight: "600",
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
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingTop: 10,
            paddingBottom: insets.bottom + 14,
            gap: 10,
          }}
        >
          <Pressable
            onPress={previous}
            disabled={index === 0}
            style={{ flexDirection: "row", alignItems: "center", gap: 6, opacity: index === 0 ? 0.35 : 1, padding: 10 }}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Previous</Text>
          </Pressable>
          {!!song?.chorus?.trim() && (
            <Pressable
              onPress={() => setRepeatChorus((r) => !r)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                borderColor: repeatChorus ? "#9acd32" : "#666",
                borderWidth: 1,
                borderRadius: 20,
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}
              accessibilityRole="switch"
              accessibilityState={{ checked: repeatChorus }}
            >
              <Ionicons name="repeat" size={16} color={repeatChorus ? "#9acd32" : "#999"} />
              <Text style={{ color: repeatChorus ? "#9acd32" : "#999", fontSize: 12, fontWeight: "600" }}>Chorus</Text>
            </Pressable>
          )}
          <Pressable
            onPress={next}
            disabled={nextDisabled}
            style={{ flexDirection: "row", alignItems: "center", gap: 6, opacity: nextDisabled ? 0.35 : 1, padding: 10 }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>{nextLabel}</Text>
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

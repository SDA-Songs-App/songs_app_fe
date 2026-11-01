import React, { useEffect, useState } from "react";
import { Image, Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useEvents } from "@/hooks/useEvents";
import { EventAnnouncement, parseDateOnly, pickText } from "@/data/events";

type Props = {
  language: string;
  /** Distance from the bottom of the screen to float the ribbon at (just above the bottom panel). */
  bottomOffset: number;
};

const DEFAULT_ACCENT = "#1F6F5B";

function darken(hex: string, factor = 0.55): string {
  const value = parseInt(hex.slice(1), 16);
  const r = Math.round(((value >> 16) & 255) * factor);
  const g = Math.round(((value >> 8) & 255) * factor);
  const b = Math.round((value & 255) * factor);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function formatDate(event: EventAnnouncement, options: Intl.DateTimeFormatOptions): string {
  const date = event.eventDate ? parseDateOnly(event.eventDate) : null;
  return date ? date.toLocaleDateString(undefined, options) : "";
}

function formatEventLine(event: EventAnnouncement, language: string): string {
  const parts: string[] = [];
  const date = formatDate(event, { year: "numeric", month: "short", day: "numeric" });
  if (date) parts.push(date);
  const location = pickText(event.location, language);
  if (location) parts.push(location);
  return parts.join(" · ");
}

function openLink(url?: string) {
  if (url) Linking.openURL(url).catch(() => {});
}

function PulseDot() {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 1300, easing: Easing.out(Easing.quad) }), -1, false);
  }, [pulse]);
  const ring = useAnimatedStyle(() => ({
    opacity: 0.7 * (1 - pulse.value),
    transform: [{ scale: 1 + pulse.value * 1.8 }],
  }));
  return (
    <View style={{ width: 14, height: 14, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[{ position: "absolute", width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" }, ring]}
      />
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" }} />
    </View>
  );
}

export default function EventAnnouncements({ language, bottomOffset }: Props) {
  const { banners, popup, dismissPopup } = useEvents(language);
  const [opened, setOpened] = useState<EventAnnouncement | null>(null);

  const ribbonEvent = banners[0] ?? null;
  const modalEvent = opened ?? popup;
  const closeModal = () => {
    if (opened) setOpened(null);
    else if (popup) dismissPopup(popup.id);
  };

  const accent = modalEvent?.accentColor ?? DEFAULT_ACCENT;

  return (
    <>
      {ribbonEvent ? (
        <Animated.View
          entering={FadeInDown.springify().damping(14).delay(400)}
          pointerEvents="box-none"
          style={{
            position: "absolute",
            left: scale(14),
            right: scale(14),
            bottom: bottomOffset,
            zIndex: 10,
          }}
        >
          <Pressable
            onPress={() => setOpened(ribbonEvent)}
            accessibilityRole="button"
            accessibilityLabel={pickText(ribbonEvent.title, language)}
          >
            <LinearGradient
              colors={[ribbonEvent.accentColor ?? DEFAULT_ACCENT, darken(ribbonEvent.accentColor ?? DEFAULT_ACCENT)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: scale(10),
                paddingHorizontal: scale(14),
                borderRadius: 30,
                borderWidth: 1.5,
                borderColor: "rgba(255,255,255,0.55)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
                elevation: 10,
              }}
            >
              <PulseDot />
              <View style={{ flex: 1 }}>
                <Text
                  numberOfLines={1}
                  maxFontSizeMultiplier={1.15}
                  style={{ color: "#fff", fontSize: moderateScale(14), fontWeight: "800" }}
                >
                  {pickText(ribbonEvent.title, language)}
                </Text>
                {formatEventLine(ribbonEvent, language) ? (
                  <Text
                    numberOfLines={1}
                    maxFontSizeMultiplier={1.15}
                    style={{ color: "rgba(255,255,255,0.85)", fontSize: moderateScale(11), marginTop: 1 }}
                  >
                    {formatEventLine(ribbonEvent, language)}
                  </Text>
                ) : null}
              </View>
              <Ionicons name="sparkles" size={20} color="#fff" />
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </LinearGradient>
          </Pressable>
        </Animated.View>
      ) : null}

      <Modal visible={!!modalEvent} transparent animationType="fade" onRequestClose={closeModal}>
        {modalEvent ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.65)",
              justifyContent: "center",
              padding: scale(20),
            }}
          >
            <Animated.View
              entering={FadeInUp.springify().damping(15)}
              style={{
                backgroundColor: "#fff",
                borderRadius: scale(22),
                overflow: "hidden",
                maxHeight: "88%",
              }}
            >
              <ScrollView contentContainerStyle={{ paddingBottom: scale(16) }}>
                <LinearGradient
                  colors={[accent, darken(accent)]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ paddingTop: scale(26), paddingBottom: scale(22), paddingHorizontal: scale(20) }}
                >
                  <View
                    style={{
                      alignSelf: "flex-start",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: 16,
                      paddingVertical: 5,
                      paddingHorizontal: 12,
                    }}
                  >
                    <PulseDot />
                    {formatDate(modalEvent, { day: "numeric", month: "short", year: "numeric" }) ? (
                      <Text style={{ color: "#fff", fontSize: moderateScale(12), fontWeight: "800" }}>
                        {formatDate(modalEvent, { day: "numeric", month: "short", year: "numeric" })}
                      </Text>
                    ) : (
                      <Ionicons name="sparkles" size={14} color="#fff" />
                    )}
                  </View>
                  <Text
                    maxFontSizeMultiplier={1.15}
                    style={{
                      color: "#fff",
                      fontSize: moderateScale(24),
                      lineHeight: moderateScale(31),
                      fontWeight: "800",
                      marginTop: 14,
                      paddingRight: 28,
                    }}
                  >
                    {pickText(modalEvent.title, language)}
                  </Text>
                  {pickText(modalEvent.location, language) ? (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
                      <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.9)" />
                      <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: moderateScale(13), fontWeight: "600" }}>
                        {pickText(modalEvent.location, language)}
                      </Text>
                    </View>
                  ) : null}
                </LinearGradient>

                {modalEvent.imageUrl ? (
                  <Image
                    source={{ uri: modalEvent.imageUrl }}
                    style={{ width: "100%", height: verticalScale(160), backgroundColor: "#eee" }}
                    resizeMode="cover"
                  />
                ) : null}

                <View style={{ padding: scale(20) }}>
                  <Text
                    maxFontSizeMultiplier={1.15}
                    style={{ color: "#222", fontSize: moderateScale(15), lineHeight: moderateScale(23) }}
                  >
                    {pickText(modalEvent.description, language)}
                  </Text>
                  {modalEvent.linkUrl ? (
                    <Pressable onPress={() => openLink(modalEvent.linkUrl)} style={{ marginTop: 20 }}>
                      <LinearGradient
                        colors={[accent, darken(accent)]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          borderRadius: 26,
                          paddingVertical: 13,
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <Text style={{ color: "#fff", fontSize: moderateScale(15), fontWeight: "800" }}>
                          {pickText(modalEvent.linkLabel, language) || "Learn more"}
                        </Text>
                        <Ionicons name="arrow-forward" size={18} color="#fff" />
                      </LinearGradient>
                    </Pressable>
                  ) : null}
                </View>
              </ScrollView>
              <Pressable
                onPress={closeModal}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: "rgba(0,0,0,0.35)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="close" size={22} color="#fff" />
              </Pressable>
            </Animated.View>
          </View>
        ) : null}
      </Modal>
    </>
  );
}

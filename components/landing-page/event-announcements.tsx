import React from "react";
import { Image, Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useEvents } from "@/hooks/useEvents";
import { EventAnnouncement, parseDateOnly, pickText } from "@/data/events";

type Props = {
  language: string;
  isDarkMode: boolean;
};

const DEFAULT_ACCENT = "#1F6F5B";

function formatEventLine(event: EventAnnouncement, language: string): string {
  const parts: string[] = [];
  const date = event.eventDate ? parseDateOnly(event.eventDate) : null;
  if (date) {
    parts.push(date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }));
  }
  const location = pickText(event.location, language);
  if (location) parts.push(location);
  return parts.join(" · ");
}

function openLink(url?: string) {
  if (url) Linking.openURL(url).catch(() => {});
}

export default function EventAnnouncements({ language, isDarkMode }: Props) {
  const { banners, popup, dismissPopup } = useEvents(language);

  // `isDarkMode` follows the app's inverted naming: true = light panel.
  const textColor = isDarkMode ? "#000" : "#fff";
  const mutedColor = isDarkMode ? "#444" : "#ccc";
  const cardBg = isDarkMode ? "#e8efe9" : "#3a3232";

  return (
    <>
      {banners.map((event) => {
        const accent = event.accentColor ?? DEFAULT_ACCENT;
        const line = formatEventLine(event, language);
        return (
          <Pressable
            key={event.id}
            disabled={!event.linkUrl}
            onPress={() => openLink(event.linkUrl)}
            style={{
              marginTop: verticalScale(14),
              backgroundColor: cardBg,
              borderRadius: scale(14),
              borderLeftWidth: 5,
              borderLeftColor: accent,
              paddingVertical: scale(10),
              paddingHorizontal: scale(12),
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons name="calendar-outline" size={22} color={accent} />
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={2}
                maxFontSizeMultiplier={1.15}
                style={{ color: textColor, fontSize: moderateScale(15), fontWeight: "700" }}
              >
                {pickText(event.title, language)}
              </Text>
              {line ? (
                <Text
                  numberOfLines={1}
                  maxFontSizeMultiplier={1.15}
                  style={{ color: mutedColor, fontSize: moderateScale(12), marginTop: 2 }}
                >
                  {line}
                </Text>
              ) : null}
            </View>
            {event.linkUrl ? <Ionicons name="chevron-forward" size={20} color={mutedColor} /> : null}
          </Pressable>
        );
      })}

      <Modal
        visible={!!popup}
        transparent
        animationType="fade"
        onRequestClose={() => popup && dismissPopup(popup.id)}
      >
        {popup ? (
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              justifyContent: "center",
              padding: scale(20),
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: scale(18),
                overflow: "hidden",
                maxHeight: "85%",
              }}
            >
              <View style={{ height: 6, backgroundColor: popup.accentColor ?? DEFAULT_ACCENT }} />
              <ScrollView contentContainerStyle={{ paddingBottom: scale(16) }}>
                {popup.imageUrl ? (
                  <Image
                    source={{ uri: popup.imageUrl }}
                    style={{ width: "100%", height: verticalScale(160), backgroundColor: "#eee" }}
                    resizeMode="cover"
                  />
                ) : null}
                <View style={{ padding: scale(18) }}>
                  <Text
                    maxFontSizeMultiplier={1.15}
                    style={{ color: "#000", fontSize: moderateScale(20), fontWeight: "800" }}
                  >
                    {pickText(popup.title, language)}
                  </Text>
                  {formatEventLine(popup, language) ? (
                    <Text
                      maxFontSizeMultiplier={1.15}
                      style={{
                        color: popup.accentColor ?? DEFAULT_ACCENT,
                        fontSize: moderateScale(13),
                        fontWeight: "700",
                        marginTop: 6,
                      }}
                    >
                      {formatEventLine(popup, language)}
                    </Text>
                  ) : null}
                  <Text
                    maxFontSizeMultiplier={1.15}
                    style={{ color: "#333", fontSize: moderateScale(15), lineHeight: moderateScale(22), marginTop: 12 }}
                  >
                    {pickText(popup.description, language)}
                  </Text>
                  {popup.linkUrl ? (
                    <Pressable
                      onPress={() => openLink(popup.linkUrl)}
                      style={{
                        marginTop: 18,
                        backgroundColor: popup.accentColor ?? DEFAULT_ACCENT,
                        borderRadius: 24,
                        paddingVertical: 12,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: moderateScale(15), fontWeight: "700" }}>
                        {pickText(popup.linkLabel, language) || "Learn more"}
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </ScrollView>
              <Pressable
                onPress={() => dismissPopup(popup.id)}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Close"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 12,
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: "rgba(0,0,0,0.55)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="close" size={22} color="#fff" />
              </Pressable>
            </View>
          </View>
        ) : null}
      </Modal>
    </>
  );
}

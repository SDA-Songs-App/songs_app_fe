import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/app/ThemeProvider";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SettingsHeader({ title, subtitle }: Props) {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  return (
    <LinearGradient
      colors={isDarkMode ? ["#278a71", "#1F6F5B"] : ["#3a3a3a", "#2a2a2a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 16,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      }}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.18)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} maxFontSizeMultiplier={1.2} style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
          {title}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </LinearGradient>
  );
}

import React from "react";
import { View, Text, ScrollView, Linking, Pressable, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@/app/types";
import { useLanguage } from "../languageContext/language-context";
import { versesLLocalization } from "../languageContext/langauage-content";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/setting-style";
import SettingsHeader from "./SettingsHeader";

const STORE_URL = "https://play.google.com/store/apps/details?id=com.sda.songs.hagarigna";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface SettingRowProps {
  icon: IconName;
  color: string;
  label: string;
  onPress?: () => void;
  last?: boolean;
}

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { language } = useLanguage();
  const content = versesLLocalization[language];
  const { isDarkMode } = useTheme();
  const styles = getStyle(isDarkMode);

  const appName = Constants.expoConfig?.name ?? "Hallelujah Songs";
  const version = Constants.expoConfig?.version;

  const SettingRow = ({ icon, color, label, onPress, last }: SettingRowProps) => (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(31,111,91,0.12)" }}
      style={[styles.row, !last && styles.rowDivider]}
    >
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>
      <Text style={styles.rowText} maxFontSizeMultiplier={1.2}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#aab5b0" : "#888"} />
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <SettingsHeader title={content?.setting?.title || appName} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroName} maxFontSizeMultiplier={1.2}>
            {appName}
          </Text>
          {version ? <Text style={styles.heroVersion}>v{version}</Text> : null}
        </View>

        <View style={styles.card}>
          <SettingRow
            icon="book-outline"
            color="#3b82f6"
            label={content.userGuide.title}
            onPress={() => navigation.navigate("UserGuide")}
          />
          <SettingRow
            icon="chatbubble-ellipses-outline"
            color="#f59e0b"
            label={content.shareLyricsWithUs.title}
            onPress={() => Linking.openURL("https://t.me/SDAStagingApp")}
            last
          />
        </View>

        <View style={styles.card}>
          <SettingRow
            icon="people-outline"
            color="#8b5cf6"
            label={content.contributors.title}
            onPress={() => navigation.navigate("Contributors")}
          />
          <SettingRow
            icon="shield-checkmark-outline"
            color="#10b981"
            label={content.privacyPolicy.title}
            onPress={() => navigation.navigate("Privacy")}
            last
          />
        </View>

        <View style={styles.card}>
          <SettingRow
            icon="share-social-outline"
            color="#ec4899"
            label={content.sharing.title}
            onPress={() => Share.share({ message: `${appName}\n${STORE_URL}` }).catch(() => {})}
          />
          <SettingRow
            icon="information-circle-outline"
            color="#64748b"
            label={content.about.title}
            onPress={() => navigation.navigate("About")}
            last
          />
        </View>

        <Text style={styles.footer}>{appName}</Text>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

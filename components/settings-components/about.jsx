import React from "react";
import { versesLLocalization } from "../languageContext/langauage-content";
import { useLanguage } from "../languageContext/language-context";
import { Text, View, ScrollView } from "react-native";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/about-css";
import SettingsHeader from "./SettingsHeader";
const About = () => {
  const { language } = useLanguage(); // coming from global context
  const { isDarkMode } = useTheme();
  const styles = getStyle(isDarkMode);
  const contentInCurrentLang = versesLLocalization[language];
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#fff" : "#302828" }}>
      <SettingsHeader title={contentInCurrentLang.about.title} />
      <ScrollView style={styles.container}>
        <Text style={styles.text}>
          {contentInCurrentLang.about.titleDescription}
        </Text>

        <Text style={styles.sectionTitle}>መዝሙሮቹ በሚከተሉት ቋንቋዎች ተዘጋጅተዋል፦</Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>• ኦሮምኛ</Text>
          <Text style={styles.listItem}>• አማርኛ</Text>
          <Text style={styles.listItem}>• ሲዳሚኛ</Text>
          <Text style={styles.listItem}>• ትግርኛ</Text>
          <Text style={styles.listItem}>• ጉራግኛ</Text>
          <Text style={styles.listItem}>• ከምባትኛ</Text>
          <Text style={styles.listItem}>• ወላይትኛ</Text>
          <Text style={styles.listItem}>• ሀድይኛ</Text>
          <Text style={styles.listItem}>• ኑዌርኛ</Text>
        </View>

        <Text style={styles.text}>
          ወደፊትም ሌሎች ቋንቋዎች እንዲጨመሩ ታስቦበታል።
        </Text>

        <Text style={styles.sectionTitle}>ዓላማችን</Text>

        <Text style={styles.text}>
          ዓላማችን መዝሙሮችን ቋንቋ ልዩነት ሳይኖር
          ለሁሉም ሰዎች እንዲደርሱ ማድረግ እና
          መንፈሳዊ አንድነትን ማጠናከር ነው።
          {"\n \n \n"}
        </Text>
      </ScrollView>
    </View>
  );
};
export default About;

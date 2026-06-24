import React from "react";
import { versesLLocalization } from "../languageContext/langauage-content";
import { useLanguage } from "../languageContext/language-context";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/about-css";
const About = () => {
   const {language} = useLanguage()   // coming from gloabl context 
  //  type Language = keyof typeof versesLLocalization;
  const { isDarkMode, toggleTheme } = useTheme();
     const styles = getStyle(isDarkMode);
    const contentInCurrentLang = versesLLocalization[language];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{contentInCurrentLang.about.title}</Text>

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
      </Text>

      <Text style={styles.sectionTitle}>ምስጋና</Text>

      <Text style={styles.text}>
        ለዚህ የዝማሬ መተግበሪያ ዝግጅት በርካቶች አስተዋጽኦ 
        ያደረጉ ሲሆን በዋናነት ግን የበጎ ስጦታ ሁሉ 
        ባለቤት የሆነውን እግዚአብሔርን ለማመስገን እንሻለን።
      </Text>

      <Text style={styles.text}>
        ቅኔው ከእርሱ ነው፤ ዘማሪያኑም የእርሱ ናቸው። 
        የመተግበሪያው ሀሳብና ክንውኑ ሁሉ ከእርሱ ስለሆነ 
        ስሙ ብሩክ ይሁን።
      </Text>

      <Text style={styles.text}>
        በመቀጠል ዝማሬውን አስቀድመው የዘመሩ 
        ሶሎ ዘማሪያንን / ኳየሮችን ጌታ ይባርክልን። 
        ይህ ታላቅ ጥረትን እና መስዋዕትን የሚጠይቅ 
        ሥራ ስለሆነ “ጌታ ይባርክልን!” እንላለን።{'\n \n \n'}
      </Text>
    </ScrollView>
  );
};
export default About;
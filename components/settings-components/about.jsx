import React from "react";
import { versesLLocalization } from "../languageContext/langauage-content";
import { useLanguage } from "../languageContext/language-context";
import { Text, View, StyleSheet, ScrollView } from "react-native";
const About = () => {
   const {language} = useLanguage()   // coming from gloabl context 
  //  type Language = keyof typeof versesLLocalization;
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
        ሥራ ስለሆነ “ጌታ ይባርክልን!” እንላለን።
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: "#333",
  },
  list: {
    marginLeft: 10,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
});

export default About;
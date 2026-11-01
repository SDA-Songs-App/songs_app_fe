import React from "react";
import { Text, View, ScrollView } from "react-native";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/contributors-css";
import SettingsHeader from "./SettingsHeader";

const Contributors = () => {
  const { isDarkMode } = useTheme();
  const styles = getStyle(isDarkMode);
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#fff" : "#302828" }}>
      <SettingsHeader title="አስተዋፅኦ አድራጊዎች" subtitle="ምስጋና እና እውቅና" />
      <ScrollView style={styles.container}>
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

        <Text style={styles.sectionTitle}>ዘማሪያንና ኳየሮች</Text>

        <Text style={styles.text}>
          ዝማሬውን አስቀድመው የዘመሩ ሶሎ ዘማሪያንን / ኳየሮችን ጌታ ይባርክልን።
          ይህ ታላቅ ጥረትን እና መስዋዕትን የሚጠይቅ ሥራ ስለሆነ
          “ጌታ ይባርክልን!” እንላለን።{"\n \n \n"}
        </Text>
      </ScrollView>
    </View>
  );
};
export default Contributors;


import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/privacy-css";
const Privacy = () => {
   const { isDarkMode, toggleTheme } = useTheme();
   const styles = getStyle(isDarkMode);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>የግላዊነት መመሪያ</Text>
      <Text style={styles.date}>መጨረሻ የተሻሻለበት ቀን፦ ሰኔ 21, 2026</Text>

      <Text style={styles.paragraph}>
        ይህ መተግበሪያ የሰባትኛ ቀን አድቬንቲስት ቤተክርስቲያን መዝሙሮችንና መንፈሳዊ ይዘቶችን ለማቅረብ የተዘጋጀ ነው።
        የተጠቃሚዎችን ግላዊነት እናከብራለን።
      </Text>

      <Text style={styles.section}>1. የምንሰበስበው መረጃ</Text>
      <Text style={styles.paragraph}>
        በአጠቃላይ መተግበሪያው የግል መረጃ አይሰበስብም። ሆኖም በFeedback ክፍል የሚላኩ
        መልዕክቶች ሊደርሱን ይችላሉ።
      </Text>

      <Text style={styles.section}>2. መረጃውን እንዴት እንጠቀማለን?</Text>
      <Text style={styles.paragraph}>
        - ምላሽ ለመስጠት{"\n"}
        - መተግበሪያውን ለማሻሻል{"\n"}
        - ስህተቶችን ለማረም
      </Text>

      <Text style={styles.section}>3. የመረጃ ጥበቃ</Text>
      <Text style={styles.paragraph}>
        መረጃዎች በጥንቃቄ ይጠበቃሉ፣ ለሶስተኛ ወገን አይሸጡም።
      </Text>

      <Text style={styles.section}>4. ስለ ይዘት ትክክለኛነት</Text>
      <Text style={styles.paragraph}>
        ይዘቶች ከተለያዩ ምንጮች ስለሚመጡ ስህተት ሊኖር ይችላል።
        ጥቆማ እንቀበላለን።
      </Text>

      <Text style={styles.section}>5. ገንዘብ እና ፈንድ</Text>
      <Text style={styles.paragraph}>
        በአሁኑ ጊዜ ምንም የገንዘብ ድጋፍ የሌለው ነው፡፡ 
      </Text>

      <Text style={styles.footer}>
        {/*footet contnets*/}
      </Text>
    </ScrollView>
  );
};

export default Privacy;


import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../languageContext/language-context";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/user-guide-css";

const UserGuide = () => {
  const lang = useLanguage();
const { isDarkMode, toggleTheme } = useTheme();
   const styles = getStyle(isDarkMode);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.header}>የተጠቃሚ መመሪያ {'\n'}</Text>

      <Text style={styles.stepsTitle}>1. ወደ መዝሙር ገጽ መሄድ</Text>
      <Text  style={styles.stepsTitle}>2. መተግበሪያውን ይክፈቱ</Text>
      <Text  style={styles.stepsTitle}>3. በመነሻ ገጹ ላይ የሚፈልጉቱን ቋንቋ ይምረጡ</Text>
      <Text  style={styles.stepsTitle}>4. "ቀጥል" የሚለውን ቁልፍ ይጫኑ</Text>
      <Text  style={styles.stepsTitle}>
        5. መተግበሪያው ከዚህ በስክሪንሽቱ ላይ ወደሚታየው የመዝሙር ገጽ
        ይመራዎታል
      </Text>

      <ImageBackground
        source={require("../../assets/images/lyricsPage.jpg")}
        style={styles.bgImage}
        resizeMode="contain"
      />

      <Text  style={styles.stepsTitle}>
        ከላይ በምስሉ እንደሚመለከቱት የመዝሙሩ ገጹ የለይኘው ክፍል
        የተለያዩ ምልክቶችን ይዟል፡፡ እያንዳንዱ ምልክት የተለያየ ተግባር
        ይዝዟል
      </Text>

      <Text style={styles.tableTitle}>የምልክቶች መግለጫ</Text>

<View style={styles.table}>

  {/* Home */}
  <View style={styles.row}>
    <Icon name="home" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text style={styles.cell}>{"፡  "}ወደ መነሻ ገጽ ያመራል</Text>
  </View>
    
    <View style={styles.row}>
    
    <Text style={styles.SongNum}> # {"፡  "}አሁን የመረጡትን የመዝሙር ቁጥር ያሳያል </Text>
  </View>

  {/* Search */}
  <View style={styles.row}>
    <Icon name="search" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text style={styles.cell}>{"፡  "}መዝሙር እንዲመርጡ ያስችላል</Text>
  </View>

   {/* Search list*/}
  <View style={styles.row}>
    <Icon name="plus-square" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text style={styles.cell}>{"፡  "}መዝሙሩን  የተመረጡ ዝርዝር የመዝሙር ምርጫዎች ይጨምራል</Text>
  </View>

   {/* Search list*/}
  <View style={styles.row}>
    <Icon name="list" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text style={styles.cell}>{"፡  "}የተመረጡ የመዝሙር ዝርዝርን ያሳያል</Text>
  </View>

   {/* Search list*/}
  <View style={styles.row}>
    <Icon name="cog" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text style={styles.cell}>{"፡  "}የመተግበሪያውን ቅንብሮች ይከፍታል</Text>
  </View>
  <View style={styles.row}>
    <Icon name="sun" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text>/</Text>
    <Icon name="moon" size={20} color={isDarkMode?"#000":"#fff"} />
    <Text style={styles.cell}>{"፡  "}የብርሃን ወይም የጨለማ ገጽታ ያሳያል</Text>
  </View>
  <View style={styles.row}>
    <Icon name="plus" size={18} color={isDarkMode?"#000":"#fff"} style ={{backgroundColor:'green', borderRadius:20}} />
    <Text style={styles.cell}>{"፡  "}የተመረጠውን መዝሙር ለሌሎች ተጠቃሚዎች በተለያዩ መተግበሪያዎች(Telegram, WhatsApp, Facebook) ወዘተ ወደሚያጋራ እንዲሁም የተመረጠውን መዝሙር ኮፒ ለማድረግ ወደሚያስችል ምልክት ያመራል</Text>
  </View>
</View>
        
    </ScrollView>
  );
};
export default UserGuide;
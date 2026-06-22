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

const UserGuide = () => {
  const lang = useLanguage();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.header}>የተጠቃሚ መመሪያ {'\n'}</Text>

      <Text>1. ወደ መዝሙር ገጽ መሄድ</Text>
      <Text>2. መተግበሪያውን ይክፈቱ</Text>
      <Text>3. በመነሻ ገጹ ላይ የሚፈልጉቱን ቋንቋ ይምረጡ</Text>
      <Text>4. "ቀጥል" የሚለውን ቁልፍ ይጫኑ</Text>
      <Text>
        5. መተግበሪያው ከዚህ በስክሪንሽቱ ላይ ወደሚታየው የመዝሙር ገጽ
        ይመራዎታል
      </Text>

      <ImageBackground
        source={require("../../assets/images/lyricsPage.jpg")}
        style={styles.bgImage}
        resizeMode="contain"
      />

      <Text>
        ከላይ በምስሉ እንደሚመለከቱት የመዝሙሩ ገጹ የለይኘው ክፍል
        የተለያዩ ምልክቶችን ይዟል፡፡ እያንዳንዱ ምልክት የተለያየ ተግባር
        ይዝዟል
      </Text>

      <Text style={styles.tableTitle}>የምልክቶች መግለጫ</Text>

<View style={styles.table}>
  {/* Header */}
  <View style={[styles.row, styles.headerRow]}>
    <Text style={[styles.cell, styles.headerText]}>ምልክት {" ፡ "} ተግባር</Text>
    
  </View>

  {/* Home */}
  <View style={styles.row}>
    <Icon name="home" size={20} color="#000" />
    <Text style={styles.cell}>{"፡  "}ወደ መነሻ ገጽ ያመራል</Text>
  </View>
    
    <View style={styles.row}>
    
    <Text style={styles.SongNum}> # {"፡  "}አሁን የመረጡትን የመዝሙር ቁጥር ያሳያል </Text>
  </View>

  {/* Search */}
  <View style={styles.row}>
    <Icon name="search" size={20} color="#000" />
    <Text style={styles.cell}>{"፡  "}መዝሙር እንዲመርጡ ያስችላል</Text>
  </View>

   {/* Search list*/}
  <View style={styles.row}>
    <Icon name="plus-square" size={20} color="#000" />
    <Text style={styles.cell}>{"፡  "}መዝሙሩን  የተመረጡ ዝርዝር የመዝሙር ምርጫዎች ይጨምራል</Text>
  </View>

   {/* Search list*/}
  <View style={styles.row}>
    <Icon name="list" size={20} color="#000" />
    <Text style={styles.cell}>{"፡  "}የተመረጡ የመዝሙር ዝርዝርን ያሳያል</Text>
  </View>

   {/* Search list*/}
  <View style={styles.row}>
    <Icon name="cog" size={20} color="#000" />
    <Text style={styles.cell}>{"፡  "}የመተግበሪያውን ቅንብሮች ይከፍታል</Text>
  </View>
  <View style={styles.row}>
    <Icon name="sun" size={20} color="#000" />
    <Text>/</Text>
    <Icon name="moon" size={20} color="#000" />
    <Text style={styles.cell}>{"፡  "}የብርሃን ወይም የጨለማ ገጽታ ያሳያል</Text>
  </View>
  <View style={styles.row}>
    <Icon name="plus" size={18} color="#fff" style ={{backgroundColor:'green', borderRadius:20}} />
    <Text style={styles.cell}>{"፡  "}የተመረጠውን መዝሙር ለሌሎች ተጠቃሚዎች በተለያዩ መተግበሪያዎች(Telegram, WhatsApp, Facebook) ወዘተ ወደሚያጋራ እንዲሁም የተመረጠውን መዝሙር ኮፒ ለማድረግ ወደሚያስሽል ምልክት ያመራል</Text>
  </View>
</View>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header:{
      fontSize:26,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  bgImage: {
    width: "100%",
    height: 500, // adjust as needed
    marginVertical: 16,
  },
  tableTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 10,
},

table: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  overflow: "hidden",
},

row: {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

headerRow: {
  backgroundColor: "#f2f2f2",
},

cell: {
  flex: 1,
  marginLeft: 12,
},
SongNum:{
flex: 1,
  marginLeft: 0,
},
headerText: {
  fontWeight: "bold",
},
});

export default UserGuide;
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { languages } from "../landing-page/contents";
import { useLanguage } from "../languageContext/language-context";
import { versesLLocalization } from "../languageContext/langauage-content";
interface SettingRowProps {
  icon: React.ReactNode; // <-- for JSX elements like <Ionicons />
  label: string;
  onPress?: () => void; // optional
}
const SettingRow:React.FC<SettingRowProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {icon}
      <Text style={styles.rowText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </TouchableOpacity>
);
const SettingsScreen = () => {
  const navigation  = useNavigation()
  const {language} = useLanguage()   // coming from gloabl context 
  type Language = keyof typeof versesLLocalization;
  const contentInCurrentLang = versesLLocalization[language];

  return (
    <ScrollView style={styles.container}>
      {/* Back button + header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>Settings</Text>
        {/* Empty space to balance layout */}
      </View>
      {/* Settings Options */}
      <View style={styles.card}>
        {/* <Text style={{color:"Green", fontSize:20, fontWeight:"bold"}}>Support</Text> */}
        <SettingRow 
            icon={<FontAwesome5 
            name="user" size={20} 
            color="#000" />} 
            label={contentInCurrentLang.userGuide.title}
            onPress={() =>navigation.navigate("UserGuide")}/>
        <SettingRow 
                    icon={<Ionicons 
                                   name="pulse" 
                                   size={20} 
                                   color="#000"
                           />} 
                    label={contentInCurrentLang.shareLyricsWithUs.title} 
                    onPress={() =>Linking.openURL('https://t.me/SDAStagingApp')}/>
        </View>
        <View style = {styles.card}>
        <SettingRow 
              icon={<Ionicons 
              name="people-outline" 
              size={20} 
              color="#000" />} 
              label={contentInCurrentLang.contributors.title}
              onPress={()=>navigation.navigate("Contributors")} />
        <SettingRow 
             icon={<Ionicons 
                            name="shield" 
                            size={20} 
                            color="#000"
                    />} 
              label={contentInCurrentLang.privacyPolicy.title}
        onPress={() =>navigation.navigate("Privacy")}/>
      </View>

 
      {/* Refer a friend */}

      {/* Other Settings */}
      <View style={styles.card}>
        <SettingRow 
            icon={<Ionicons 
            name="share-social-outline" 
            size={20} 
            color="#000" />} 
            label={contentInCurrentLang.sharing.title} />  
        <SettingRow 
            icon={<Ionicons 
            name="information-circle-outline" 
            size={20} 
            color="#000" />}
            label={contentInCurrentLang.about.title}
              
             onPress={() =>navigation.navigate("About")}/>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  rowText: { marginLeft: 12, fontSize: 16, color: "#000" },
  premiumCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  referCard: {
    backgroundColor: "#3899ab",
    marginHorizontal: 16,
    borderRadius: 12,
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  referText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  referSubText: { color: "#fff", marginTop: 4 },
});

export default SettingsScreen;
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@/app/types";
import { languages } from "../landing-page/contents";
import { useLanguage } from "../languageContext/language-context";
import { versesLLocalization } from "../languageContext/langauage-content";
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./css/setting-style";
interface SettingRowProps {
  icon: React.ReactNode; // <-- for JSX elements like <Ionicons />
  label: string;
  onPress?: () => void; // optional
}
  const SettingsScreen = () => {
  const navigation  = useNavigation<NavigationProp<RootStackParams>>()
  const {language} = useLanguage()   // coming from gloabl context 
  type Language = keyof typeof versesLLocalization;
  const contentInCurrentLang = versesLLocalization[language];
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyle(isDarkMode);
  const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  rowText: { marginLeft: 12, fontSize: 16, color: isDarkMode? "#000000":'#fff' }
})
const SettingRow:React.FC<SettingRowProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {icon}
      <Text style={styles.rowText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </TouchableOpacity>
  
);
  return (
    <ScrollView style={styles.container}>
      {/* Back button + header */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={isDarkMode?"#000":'#fff' } />
        </TouchableOpacity>       
        <Text style={styles.headerTitle}></Text>
        {/* Empty space to balance layout */}
      </View>
      {/* Settings Options */}
      <View style={styles.card}>
        {/* <Text style={{color:"Green", fontSize:20, fontWeight:"bold"}}>Support</Text> */}
        <SettingRow 
            icon={<FontAwesome5 
            name="user" size={20} 
            color={isDarkMode?"#683737":'#fff'} />} 
            label={contentInCurrentLang.userGuide.title}
            onPress={() =>navigation.navigate("UserGuide")}/>
        <SettingRow 
                    icon={<Ionicons 
                                   name="share-social-outline" 
                                   size={20} 
                                   color={isDarkMode?"#683737":'#fff'}
                           />} 
                    label={contentInCurrentLang.shareLyricsWithUs.title} 
                    onPress={() =>Linking.openURL('https://t.me/SDAStagingApp')}/>
        </View>
        <View style = {styles.card}>
        <SettingRow 
              icon={<Ionicons 
              name="people-outline" 
              size={20} 
              color={isDarkMode?"#683737":'#fff'} />} 
              label={contentInCurrentLang.contributors.title}
              onPress={()=>navigation.navigate("Contributors")} />
        <SettingRow 
             icon={<Ionicons 
                            name="shield" 
                            size={20} 
                            color={isDarkMode?"#683737":'#fff'}
                    />} 
              label={contentInCurrentLang.privacyPolicy.title}
        onPress={() =>navigation.navigate("Privacy")}/>
      </View>
      <View style={styles.card}>
        <SettingRow
            icon={<Ionicons 
            name="share-social-outline" 
            size={20} 
            color={isDarkMode?"#683737":'#fff'} />} 
            label={contentInCurrentLang.sharing.title}  />  
        <SettingRow 
            icon={<Ionicons 
            name="information-circle-outline" 
            size={20} 
            color={isDarkMode?"#683737":'#fff'} />}
            label={contentInCurrentLang.about.title}             
            onPress={() =>navigation.navigate("About")}/>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { landingPageContents } from "./contents";
import { Verse, versesLLocalization } from "../languageContext/langauage-content";
import { navigate } from "expo-router/build/global-state/routing";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@/app/types";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font"
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
// import * as FontLoading from "expo-app-loading"

import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {scale, verticalScale, moderateScale} from "react-native-size-matters"
import { useTheme } from "@/app/ThemeProvider";
import getStyle from "./style";



type VerseLocalization = {
  titleTop: string
  titleMain: string
  buttonText: string
  scriptureTitle: string
  value: string
  ref: string
}
export default function LandingPage() {
  const [fontLoad, setFontLoad] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  type Language = keyof typeof versesLLocalization;
  const [language, setLanguage] = useState<Language>("አማርኛ");
  const[randomVerse, setRandomVerse] = useState<Verse | null>(null);
  const currentVerse = versesLLocalization[language]
  const header = currentVerse.selectHeader
  const { isDarkMode, toggleTheme } = useTheme();
    const [fontSize, setFontSize] = useState(18);
    const [fontFamily, setFontFamily] = useState("Roboto");
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const styles = getStyle(isDarkMode, fontSize, fontFamily, width);
  const langauageLabel = language ==='oromo'?'Afaan Oromo':language
 const languageOptions = Object.keys(versesLLocalization).map((lang) => ({
  label: lang,
  value: lang
}));
 const displayLanguage = (lang: string) =>
  lang === 'oromo' ? 'Afaan Oromo' : lang === 'nuer' ? 'Nuer' : lang === 'ሲዳሚኛ' ? 'Sidaamu Afoo' : lang
 const handleLanguageChange =(value:Language)=>{
    setLanguage(value)
 }
const navigation = useNavigation<NavigationProp<RootStackParams>>();
useEffect(() =>{
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))
  // const day = new Date().getFullYear() * 1000 +
  //                    (new Date().getMonth()) +
  //                    (new Date().getDate())
  const index = dayNumber % currentVerse.contents_translation.length;
    setRandomVerse(currentVerse.contents_translation[index]) 
}, [language]);
useEffect(() => {
  AsyncStorage.getItem("lastLanguage").then((saved) => {
    if (saved && saved in versesLLocalization) setLanguage(saved as Language)
  }).catch(() => {})
}, [])
useEffect(() =>{
  Font.loadAsync({
    "Montserrat":require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
    "LexendGiga":require("../../assets/fonts/LexendGiga-VariableFont_wght.ttf"), 
    "OpenSans-VariableFont":require("../../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf")
  }).then(()=>setFontLoad(true))
},[])
if(!fontLoad)
  return <ActivityIndicator size={"large"} style ={{flex:1}} />;
return (
<LinearGradient
  colors={isDarkMode?["#278a71", "#1F6F5B", "#154439"]:["#2a2a2a", "#000", "#000"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={{ flex: 1 }}
>
  <SafeAreaView style={styles.container}>
  {/* Background circles */}
  <View style={styles.circle1}/>
  <View style={styles.circle3}/>
  <View style={styles.circle2}/>
  <View style={[styles.content, { flex: 1, justifyContent: "center", minHeight: verticalScale(150) }]}>
  {/* Header */}
  <Animated.View entering={FadeIn.duration(500)} style={styles.titleContainer}>
      {<Text style={styles.titleTop}>
        {currentVerse.titleTop}{' '}
        {currentVerse.titleMain}{' '}
        {currentVerse.titleMain2}</Text> }

  </Animated.View>
  </View>


  {/* Bottom White Section */}
  <View style={[styles.bottomContainer, styles.content, { paddingBottom: verticalScale(24) + insets.bottom }]}>
      <View style={styles.languageLabelRow}>
        <Feather size={scale(18)} color={isDarkMode?"#000":"#fff"} />
        <Text style={styles.languageLabel}>
          {currentVerse.selectHeader}
        </Text>
      </View>
      <Pressable
        style={styles.languageBox}
        onPress={() => setPickerOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={header}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ color: isDarkMode ? "#000" : "#fff", fontSize: moderateScale(16), flex: 1, textAlign: "center" }}>
            {displayLanguage(language)}
          </Text>
          <Ionicons name="chevron-down" size={22} color={isDarkMode ? "#000000" : "#fff"} />
        </View>
      </Pressable>
      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: scale(24) }}
          onPress={() => setPickerOpen(false)}
        >
          <View style={{ backgroundColor: "#fff", borderRadius: scale(16), maxHeight: height * 0.6, overflow: "hidden" }}>
            <FlatList
              data={languageOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    handleLanguageChange(item.value as Language);
                    setPickerOpen(false);
                  }}
                  style={{
                    paddingVertical: scale(13),
                    paddingHorizontal: scale(20),
                    backgroundColor: item.value === language ? "#e4ebea" : "#fff",
                  }}
                >
                  <Text style={{ color: "#000", fontSize: moderateScale(16), fontWeight: item.value === language ? "700" : "400" }}>
                    {displayLanguage(item.value)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
  {/* Button */}
  <Pressable
    style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
    onPress={()=>{
      AsyncStorage.setItem("lastLanguage", language).catch(() => {})
      navigation.navigate("Navbar", {language, openList: true})
    }}
  >
    <Text style={styles.buttonText}>
      {currentVerse.buttonText}
    </Text>
    <Feather name="arrow-right" size={scale(18)} color="#fff" />
  </Pressable>


  {/* Scripture Card */}
  <Animated.View entering={FadeInDown.duration(500).delay(220)} style={styles.card}>
    <View style ={styles.verticalBar}/>

        <View style ={styles.cardContent}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="sparkles" size={scale(16)} color={isDarkMode?"#1F6F5B":"#9acd32"} />
              <Text style={styles.cardTitle}>
              {currentVerse.scriptureTitle}
              </Text>
            </View>
           <ScrollView
              style={{ flexShrink: 1 }}
              contentContainerStyle={{ paddingBottom: verticalScale(5) }}
              showsVerticalScrollIndicator>
                 <Text style={styles.verse}>                
                  {randomVerse?.verse_text}</Text>
                  <Text style={styles.ref}>                    
                    {randomVerse?.book} {randomVerse?.reference}
                  </Text>
            </ScrollView>
        </View>

  </Animated.View>

  </View>
  </SafeAreaView>
</LinearGradient>
);
}



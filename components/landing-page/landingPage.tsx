import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
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
  type Language = keyof typeof versesLLocalization;
  const [language, setLanguage] = useState<Language>("አማርኛ");
  const[randomVerse, setRandomVerse] = useState<Verse | null>(null);
  const currentVerse = versesLLocalization[language]
  const header = currentVerse.selectHeader
  const { isDarkMode, toggleTheme } = useTheme();
    const [fontSize, setFontSize] = useState(18);
    const [fontFamily, setFontFamily] = useState("Roboto");
  const { width, height } = useWindowDimensions();
  const styles = getStyle(isDarkMode, fontSize, fontFamily, width);
  const langauageLabel = language ==='oromo'?'Afaan Oromo':language
 const languageOptions = Object.keys(versesLLocalization).map((lang) => ({
  label: lang,
  value: lang
}));
 const handleLanguageChange = (value:Language)=>{
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
  <View style={styles.content}>
  {/* Header */}
  <Animated.View entering={FadeIn.duration(500)} style={styles.titleContainer}>
      <View style={styles.emblemCircle}>
        <Ionicons name="musical-notes" size={scale(24)} color="#fff" />
      </View>
      {<Text style={styles.titleTop}>
        {currentVerse.titleTop}{' '}
        {currentVerse.titleMain}{' '}
        {currentVerse.titleMain2}</Text> }

  </Animated.View>
  </View>


  {/* Bottom White Section */}
  <Animated.View entering={FadeInDown.duration(500).delay(120)} style={[styles.bottomContainer, styles.content]}>
      <View style={styles.languageLabelRow}>
        <Feather name="globe" size={scale(18)} color={isDarkMode?"#000":"#fff"} />
        <Text style={styles.languageLabel}>
          {currentVerse.selectHeader}
        </Text>
      </View>
      <RNPickerSelect
        onValueChange={handleLanguageChange}
        value={language}
        items={languageOptions.map( item =>({
          ...item, label:item.label =='oromo'?'Afaan Oromo': item.label =='nuer'?'Nuer':item.label=='ሲዳሚኛ'?'Sidaamu Afoo':item.label
        })) }
        placeholder={{label:header, value:null}}
        style={{
          inputIOS: styles.languageBox,
          inputAndroid: styles.languageBox,
          placeholder:{color:isDarkMode?"gray":'white', textDecorationLine:"underline"}        
        }}
  Icon={() =>  {
    return (
      <View style ={{marginRight:20}}>
        <Ionicons 
          name="chevron-up" 
          size={22} 
          color={isDarkMode?"#000000":'#fff'}
          />
        <Ionicons 
          name="chevron-down" 
          size={22} 
          color={isDarkMode?"#000000":'#fff'} />
      </View>
    )
  }}
        useNativeAndroidPickerStyle={false}
        pickerProps={{ mode: "dropdown" }}
      />
  {/* Button */}
  <Pressable
    style={({pressed}) => [styles.button, pressed && styles.buttonPressed]}
    onPress={()=>navigation.navigate("Navbar", {language})}
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
              style={{ maxHeight: Math.min(height * 0.32, 280) }}
              showsVerticalScrollIndicator>
                 <Text style={styles.verse}>                
                  {randomVerse?.verse_text}</Text>
                  <Text style={styles.ref}>                    
                    {randomVerse?.book} {randomVerse?.reference}
                  </Text>
            </ScrollView>
        </View>

  </Animated.View>

  </Animated.View>
  </SafeAreaView>
</LinearGradient>
);
}



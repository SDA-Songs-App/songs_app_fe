import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { landingPageContents } from "./contents";
import { Verse, versesLLocalization } from "../languageContext/langauage-content";
import { navigate } from "expo-router/build/global-state/routing";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font"
import { ActivityIndicator } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
// import * as FontLoading from "expo-app-loading"



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
 const languageOptions = Object.keys(versesLLocalization).map((lang) => ({
  label: lang,
  value: lang
}));
 const handleLanguageChange = (value:Language)=>{
    setLanguage(value)
 }
const navigation = useNavigation();
useEffect(() =>{
  const today = new Date();
  const dayNumber = Math.floor(today.getTime() / (1000 * 60 * 60 * 24))
  // const day = new Date().getFullYear() * 1000 +
  //                    (new Date().getMonth()) +
  //                    (new Date().getDate())
  const index = dayNumber % currentVerse.contents_translation.length;
    setRandomVerse(currentVerse.contents_translation[index]) 
}, []);
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
  colors={["#59c3c3", "#2fa4a9"]}
  style={{ flex: 1 }}
>
<SafeAreaView style={styles.container}>
{/* Background circles */}
<View style={styles.circle1}/>
<View style={styles.circle2}/>
{/* Header */}
<View style={styles.titleContainer}>

{/* <Text style={styles.welcome}>{currentVerse.titleTop}</Text> */}

<View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
  {<Text style={styles.titleTop}>{currentVerse.titleTop}</Text> }
  <Text style={styles.titleMain}>{currentVerse.titleMain}</Text>
  <Text style={styles.titleMain2}>
  {currentVerse.titleMain2}
</Text>
</View>



</View>


{/* Bottom White Section */}
<View style={styles.bottomContainer}>
    <TouchableOpacity>
      <Text style={styles.languageLabel}>
        {currentVerse.selectHeader}
      </Text>
    </TouchableOpacity>
    <RNPickerSelect
      onValueChange={handleLanguageChange}
      value={language}
      items={languageOptions}
      placeholder={{label:header, value:null}}
      style={{
        inputIOS: styles.languageBox,
        inputAndroid: styles.languageBox,
        placeholder:{color:"gray", textDecorationLine:"underline"}        
      }}
 Icon={() =>  {
  return (
    <View style ={{marginRight:20}}>
      <Ionicons 
        name="chevron-up" 
        size={22} 
        color="#000000"
        paddingTop ="" />
        <Ionicons name="chevron-down" size={22} color="#000000" />
    </View>
  )
 }}
      useNativeAndroidPickerStyle={false}
    />
{/* Button */}
<Pressable
  style={styles.button}
  onPress={()=>navigation.navigate("Navbar", {language})}
>
  <TouchableOpacity>
 
      <Text style={styles.buttonText}>
        {currentVerse.buttonText}
      </Text>
        
  </TouchableOpacity>
  
</Pressable>


{/* Scripture Card */}

<View style={styles.card}>
  <View style ={styles.verticalBar}/>
    <View style ={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {currentVerse.scriptureTitle}
        </Text>
        <Text style={styles.verse}>
        
        {randomVerse?.verse_text}
        </Text>
        <Text style={styles.ref}>
          
          {randomVerse?.book} {randomVerse?.reference}
        </Text>
    </View>
</View>

</View>

</SafeAreaView>
</LinearGradient>
);
}

const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"space-between"
},

titleContainer:{
alignItems:"center",
marginTop:40
},

welcome:{
fontSize:22,
color:"#fff",
fontWeight:"600",
marginBottom:20
},

titleTop:{
fontSize:22,
fontWeight:"bold",
color:"#fff"
},

titleMain:{

fontSize:22,
fontWeight:"bold",
color:"#fff"
},
titleMain2:{
fontSize:22,
fontWeight:"bold",
color:"#fff"
},

bottomContainer:{
backgroundColor:"#e4e4e4",
//borderTopLeftRadius:30,
//borderTopRightRadius:30,
padding:25,
marginTop:100

},

languageLabel:{
fontSize:20,
fontWeight:"600",
marginBottom:20
},

languageBox:{
  backgroundColor:"#cfd9d9",
  borderRadius:30,
  padding:15,
  textAlign:"center",
  borderColor: "#2a6cff",
  paddingVertical:16,
   shadowOpacity: 0.4,
    shadowRadius: 6,
},

button:{
marginTop:25,
backgroundColor:"#2fa4a9",
padding:15,
borderRadius:30,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontSize:16,
fontWeight:"600"
},

card:{
backgroundColor:"#fff",
padding:20,
//borderRadius:15,
marginTop:30,
shadowColor:"#01196e",
shadowOpacity:0.2,
shadowRadius:6,
height:200,

},

cardTitle:{
fontSize:18,
fontWeight:"600",
//textDecorationLine:'underline'
},

verse:{
fontSize:16,
marginTop:10
},
ref:{
fontSize:14,
fontStyle:'italic',
marginTop:10
},
circle1:{
  fontFamily:"LexendGiga",
position:"absolute",
width:200,
height:200,
borderRadius:100,
backgroundColor:"rgba(255,255,255,0.15)",
top:-40,
left:-40
},

circle2:{
position:"absolute",
width:180,
height:180,
borderRadius:90,
backgroundColor:"rgba(255,255,255,0.15)",
top:180,
right:-40
},
verticalBarContainer: {
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 0 },
  shadowOpacity: 0.4,
  shadowRadius: 4,
  elevation: 6,
  borderRadius: 0,
},
verticalBar: {
   position: "absolute",
  //left: -4,
 // bottom: -20,
  width: 6,          // make bar narrow if shadow is vertical
  height: "125%",    // full height
  borderRadius: 3,
  backgroundColor: "#2fa4a9", // main bar color
  // iOS shadow
  shadowColor: "#000",
  shadowOffset: { width: -4, height: 0 }, // negative width = left
  shadowOpacity: 0.3,
  shadowRadius: 4,
  // Android shadow (approximate left-only)
  elevation: 4,// Android
},
cardContent: {
  flex: 1,
  marginLeft: 12,
},
bottomRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 12,
},
icons: {
  flexDirection: "row",
},
});
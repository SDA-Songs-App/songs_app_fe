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
import { ActivityIndicator, Dimensions } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
// import * as FontLoading from "expo-app-loading"
import {scale, verticalScale, moderateScale} from "react-native-size-matters"



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
  const langauageLabel = language ==='oromo'?'Afaan Oromo':language
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
  colors={["#59c3c3", "#2fa4a9"]}
  style={{ flex: 1 }}
>
<SafeAreaView style={styles.container}>
{/* Background circles */}
<View style={styles.circle1}/>
<View style={styles.circle2}/>
{/* Header */}
<View style={styles.titleContainer}>

    {<Text style={styles.titleTop}>
      {currentVerse.titleTop + "\n"}
      {currentVerse.titleMain + "\n"}
      {currentVerse.titleMain2}</Text> }
 
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
      items={languageOptions }
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
         />
      <Ionicons 
        name="chevron-down" 
        size={22} 
        color="#000000" />
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

const {width, height} = Dimensions.get("window");
//Scaling helpers
//const scale = (size: number) => (width / 375) * size; //Based on standard width
//const vScale = (size: number) => (height / 812) * size; //Based on standard height


const styles = StyleSheet.create({

container:{
flex:1,
justifyContent:"space-between"
},

titleContainer:{
alignItems:"center",
paddingTop: verticalScale(30),//vScale(20),
paddingBottom: verticalScale(10),//vScale(20),
display:'flex',
justifyContent:'center'
},

welcome:{
fontSize:scale(22),//scale(22),//scale(22),
color:"#fff",
fontWeight:"600",
marginBottom:verticalScale(18),//verticalScale(18)
},

titleTop:{
fontSize:scale(22),//scale(15),//scale(18),
lineHeight: moderateScale(28),
fontWeight:"bold",
color:"#fff",
textAlign:"center"
},

titleMain:{

fontSize:scale(20),//moderateScale(15), //scale(18),
fontWeight:"bold",
color:"#fff"
},
titleMain2:{
fontSize:scale(20),//moderateScale(15), //scale(18),
fontWeight:"bold",
color:"#fff"
},

bottomContainer:{
backgroundColor:"#e4e4e4",
//borderTopLeftRadius:30,
//borderTopRightRadius:30,
padding:scale(20),
marginTop:verticalScale(50)

},

languageLabel:{
fontSize:moderateScale(20),
fontWeight:"600",
marginBottom:verticalScale(20)
},

languageBox:{
  backgroundColor:"#cfd9d9",
  borderRadius:scale(30),//scale(30),
  padding: scale(15),//scale(15),
  textAlign:"center",
  borderColor: "#2a6cff",
  paddingVertical:12,//vScale(25),
   shadowOpacity: 0.4,
    shadowRadius: 6,
},

button:{
marginTop:verticalScale(25),//vScale(30),
backgroundColor:"#2fa4a9",
padding:scale(10),//scale(30),
borderRadius:scale(30),//scale(30),
alignItems:"center"
},

buttonText:{
color:"#fff",
fontSize:moderateScale(16),
fontWeight:"600"
},

card:{
backgroundColor:"#fff",
padding:scale(10),
borderRadius:scale(15),
marginTop:verticalScale(20),
shadowColor:"#01196e",
shadowOpacity:0.2,
shadowRadius:6,
height:verticalScale(230),

},

cardTitle:{
fontSize:moderateScale(18),//scale(18),
fontWeight:"600",
//textDecorationLine:'underline'
},

verse:{
fontSize:moderateScale(16),//scale(18),
marginTop: verticalScale(10), //vScale(12)
lineHeight: moderateScale(24)
},
ref:{
fontSize:moderateScale(16),
fontStyle:'italic',
marginTop:verticalScale(10)
},
circle1:{
  fontFamily:"LexendGiga",
position:"absolute",
width:width*0.5,
height:width*0.5,
borderRadius:width*0.25,
backgroundColor:"rgba(255,255,255,0.15)",
top:-verticalScale(40),
left:-verticalScale(40)
},

circle2:{
position:"absolute",
width:width*0.45,
height:width*0.45,
borderRadius:width*0.225,
backgroundColor:"rgba(255,255,255,0.15)",
top:verticalScale(180),
right:-scale(30)
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
  width: scale(8),          // make bar narrow if shadow is vertical
  height: "102%",    // full height
  borderRadius: 3,
  backgroundColor: "#2fa4a9", // main bar color
  shadowColor: "#000",
  shadowOffset: { width: -4, height: 0 }, // negative width = left
  shadowOpacity: 0.3,
  shadowRadius: 4,
  // Android shadow (approximate left-only)
  elevation: 4,// Android
},
verticalBar2: {
   position: "absolute",
   right:0,
  width: scale(5),          // make bar narrow if shadow is vertical
  height: "125%",    // full height
  borderRadius: 3,
  backgroundColor: "#2fa4a9", // main bar color
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 0 }, // negative width = left
  shadowOpacity: 0.3,
  shadowRadius: 4,
  // Android shadow (approximate left-only)
  elevation: 4,// Android
},
cardContent: {
  flex: 1,
  marginLeft: scale(10),
},
bottomRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: verticalScale(10),
},
icons: {
  flexDirection: "row",
},
});
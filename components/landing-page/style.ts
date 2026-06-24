import { Dimensions, StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
const {width, height} = Dimensions.get("window");
const getStyle = (isDarkMode:boolean, fontSize:Number, fontFamily:string) =>{
        return StyleSheet.create({
              container:{
              flex:1,
              justifyContent:"space-between",
              },
              button:{
              marginTop:verticalScale(25),//vScale(30),
              backgroundColor:isDarkMode?"#1F6F5B":'#1e1a1a',
              padding:scale(10),//scale(30),
              borderRadius:scale(30),//scale(30),
              alignItems:"center"
              },
              buttonText:{
              color:"#fff",
              fontSize:moderateScale(16),
              fontWeight:"600"
              },
              circle1:{
                position:"absolute",
                width:width*0.45,
                height:width*0.45,
                borderRadius:width*0.225,
                backgroundColor:"rgba(255,255,255,0.15)",
                top:-verticalScale(30),
                left:-verticalScale(30)
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
            titleContainer:{
                alignItems:"center",
                paddingTop: verticalScale(60),//vScale(20),
                paddingBottom: verticalScale(20),//vScale(20),
                display:'flex',
                justifyContent:'center', 
                },
                welcome:{
            fontSize:scale(22),//scale(22),//scale(22),
            color:"#fff",
            fontWeight:"600",
            marginBottom:verticalScale(18),//verticalScale(18)
            },
            titleTop:{
            fontSize:scale(20),//scale(15),//scale(18),
            lineHeight: moderateScale(31),
            fontWeight:"bold",
            color:"#fff",
            textAlign:"center",
            margin:5
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
            backgroundColor:isDarkMode?"#f6f4f4e4":'#2d2626',
            padding:scale(20),
            marginTop:verticalScale(50)
            },
            languageLabel:{
                color:isDarkMode?'#000':'#fff',
            fontSize:moderateScale(20),
            fontWeight:"600",
            marginBottom:verticalScale(20)
            },

languageBox:{
  backgroundColor:isDarkMode?"#cfd9d9":'#1e1a1a',
  borderRadius:scale(30),//scale(30),
  padding: scale(15),//scale(15),
  textAlign:"center",
  borderColor: "#2a6cff",
  color:isDarkMode?'#000':'#fff',
  paddingVertical:12,//vScale(25),
   shadowOpacity: 0.4,
    shadowRadius: 6,
},
card:{
backgroundColor:isDarkMode?"#cfd9d9":"#262121",
padding:scale(10),
borderRadius:scale(5),
marginTop:verticalScale(20),
shadowColor:"#01196e",
shadowOpacity:0.2,
shadowRadius:3,
height:verticalScale(230),

},

cardTitle:{
fontSize:moderateScale(18),//scale(18),
fontWeight:"600",
color:isDarkMode?'#000':'#fff'
//textDecorationLine:'underline'
},

verse:{
fontSize:moderateScale(16),//scale(18),
marginTop: verticalScale(10), //vScale(12)
lineHeight: moderateScale(24),
color:isDarkMode?'#000':'#fff'
},
ref:{
fontSize:moderateScale(16),
fontStyle:'italic',
marginTop:verticalScale(10),
color:isDarkMode?'#000':'#fff'
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
  width: scale(4),          // make bar narrow if shadow is vertical
  height: "110%",    // full height
  borderRadius: 3,
  backgroundColor: isDarkMode?"#1F6F5B":'#fff', // main bar color
  shadowColor: "#000",
  shadowOffset: { width: -4, height: 0 }, // negative width = left
  shadowOpacity: 0.3,
  shadowRadius: 4,
  // Android shadow (approximate left-only)
  elevation: 4,// Android
},
cardContent: {
  flex: 1,
  marginLeft: scale(10),
  backgroundColor:isDarkMode?'#cfd9d9':'#262121'
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
        })
}
export default getStyle
import { StyleSheet } from "react-native"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"

const getStyle = (isDarkMode:boolean, fontSize:Number, fontFamily:string, width:number) =>{
        const maxContentWidth = Math.min(width, 520);
        return StyleSheet.create({
              container:{
              flex:1,
              justifyContent:"space-between",
              },
              content:{
              width:"100%",
              maxWidth:maxContentWidth,
              alignSelf:"center",
              },
              button:{
              flexDirection:"row",
              justifyContent:"center",
              alignItems:"center",
              gap:8,
              marginTop:verticalScale(25),
              backgroundColor:isDarkMode?"#1F6F5B":'#2b6f5c',
              paddingVertical:scale(14),
              paddingHorizontal:scale(20),
              borderRadius:scale(30),
              shadowColor:"#000",
              shadowOffset:{width:0,height:4},
              shadowOpacity:0.25,
              shadowRadius:8,
              elevation:6,
              },
              buttonPressed:{
              opacity:0.85,
              transform:[{scale:0.98}],
              },
              buttonText:{
              color:"#fff",
              fontSize:moderateScale(16),
              fontWeight:"700",
              letterSpacing:0.3,
              },
            circle1:{
                position:"absolute",
                width:width*0.5,
                height:width*0.5,
                borderRadius:width*0.25,
                backgroundColor:"rgba(255,255,255,0.10)",
                top:-verticalScale(40),
                left:-verticalScale(40)
                },
            circle2:{
                position:"absolute",
                width:width*0.4,
                height:width*0.4,
                borderRadius:width*0.2,
                backgroundColor:"rgba(255,255,255,0.10)",
                top:verticalScale(140),
                right:-scale(40)
                },
            circle3:{
                position:"absolute",
                width:width*0.22,
                height:width*0.22,
                borderRadius:width*0.11,
                backgroundColor:"rgba(255,255,255,0.08)",
                top:verticalScale(10),
                right:width*0.18,
                },
            titleContainer:{
                alignItems:"center",
                paddingTop: verticalScale(56),
                paddingBottom: verticalScale(24),
                paddingHorizontal:scale(12),
                display:'flex',
                justifyContent:'center',
                },
            emblemCircle:{
                width:scale(52),
                height:scale(52),
                borderRadius:scale(26),
                backgroundColor:"rgba(255,255,255,0.16)",
                alignItems:"center",
                justifyContent:"center",
                marginBottom:verticalScale(14),
                borderWidth:1,
                borderColor:"rgba(255,255,255,0.25)",
                },
            welcome:{
                fontSize:scale(22),
                color:"#fff",
                fontWeight:"600",
                marginBottom:verticalScale(18),
            },
            titleTop:{
            fontSize:Math.min(scale(20), 24),
            lineHeight: moderateScale(32),
            fontWeight:"800",
            color:"#fff",
            textAlign:"center",
            letterSpacing:0.2,
            textShadowColor:"rgba(0,0,0,0.25)",
            textShadowOffset:{width:0,height:2},
            textShadowRadius:6,
            },
            titleMain:{
            fontSize:scale(20),
            fontWeight:"bold",
            color:"#fff"
            },
            titleMain2:{
            fontSize:scale(20),
            fontWeight:"bold",
            color:"#fff"
            },
            bottomContainer:{
            backgroundColor:isDarkMode?"#f6f4f4e4":'#2d2626',
            borderTopLeftRadius:scale(28),
            borderTopRightRadius:scale(28),
            paddingHorizontal:scale(20),
            paddingTop:verticalScale(26),
            paddingBottom:verticalScale(24),
            marginTop:verticalScale(30),
            shadowColor:"#000",
            shadowOffset:{width:0,height:-4},
            shadowOpacity:0.15,
            shadowRadius:12,
            elevation:8,
            },
            languageLabelRow:{
            flexDirection:"row",
            alignItems:"center",
            gap:8,
            marginBottom:verticalScale(14),
            },
            languageLabel:{
                color:isDarkMode?'#000':'#fff',
            fontSize:moderateScale(19),
            fontWeight:"700",
            },

languageBox:{
  backgroundColor:isDarkMode?"#e4ebea":'#241f1f',
  borderRadius:scale(18),
  paddingHorizontal: scale(15),
  textAlign:"center",
  borderWidth:1,
  borderColor:isDarkMode?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.12)",
  color:isDarkMode?'#000':'#fff',
  paddingVertical:scale(12),
  shadowColor:"#000",
  shadowOpacity:0.12,
  shadowOffset:{width:0,height:2},
  shadowRadius:6,
  elevation:2,
},
card:{
backgroundColor:isDarkMode?"#cfd9d9":"#262121",
padding:scale(14),
borderRadius:scale(18),
marginTop:verticalScale(22),
overflow:"hidden",
shadowColor:"#01196e",
shadowOffset:{width:0,height:6},
shadowOpacity:0.25,
shadowRadius:10,
elevation:5,
},
cardHeaderRow:{
flexDirection:"row",
alignItems:"center",
gap:8,
},
cardTitle:{
fontSize:moderateScale(17),
fontWeight:"700",
color:isDarkMode?'#000':'#fff'
},
verse:{
fontSize:moderateScale(14.5),
lineHeight:moderateScale(22),
marginTop: verticalScale(10),
color:isDarkMode?'#000':'#fff'
},
ref:{
fontSize:moderateScale(12),
fontStyle:'italic',
marginTop:verticalScale(6),
color:isDarkMode?'#000':'#fff',
paddingLeft:10,
fontWeight:'bold'
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
  width: scale(4),
  height: "100%",
  borderRadius: 3,
  backgroundColor: isDarkMode?"#1F6F5B":'#fff',
  shadowColor: "#000",
  shadowOffset: { width: -4, height: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
},
cardContent: {
 height:'100%',
  marginLeft: scale(12),
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

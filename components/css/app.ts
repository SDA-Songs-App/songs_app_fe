import { useTheme } from "@/app/ThemeProvider";
import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

const getStyles = (
  isDarkMode: boolean,
  fontSize: number,
  fontFamily: string
) => {
  // const { isDarkMode } = useTheme();
  
  return StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? "#f2f2f2" : "#1a1a1a",
      width: "100%",
      flex: 1,
    },

    navbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 5,
      backgroundColor: isDarkMode ? "#1F6F5B" : "#2a2a2a",
        borderBottomWidth: 0.5,
  borderBottomColor: isDarkMode ? "#2E8B57" : "#DCEFE2",
  elevation: 4, // Android shadow
  shadowOpacity: 0.12, // iOS shadow

      //// marginTop: 2,
    },
    number: {
      color: "#fff",
      fontSize: 20,
      fontFamily: fontFamily,
    },
    modalContainer: {
      width: "100%",
      height: height * 0.7,
      justifyContent:"center",
      backgroundColor: isDarkMode ? "white" : "black",
      borderRadius: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white",
      marginTop:"40%"
    },
    fancyModal: {
  height: height * 0.85,
 // backgroundColor: "#111456",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  marginTop: 100,
  paddingHorizontal: 16,
},
    backgroundImage: {
     // paddingLeft: 20,
      flex: 1,
      // Ensures the image covers the entire background
     // justifyContent: "center",
      position:"relative",
      width: "100%",
    },
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(0, 0, 0, 0.5)",
    },
    filterRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: fontFamily,
      marginBottom: 15,
      color: isDarkMode ? "black" : "white",
    },
    favoriteSongItem: {},
    verse1Style: {
      color: isDarkMode ? "black" : "white",
      fontFamily: fontFamily,
      fontSize: moderateScale(fontSize),
      lineHeight: moderateScale(fontSize),
      alignItems: 'center',      // align all line starts
     // width: '100%',           // fixed width for the verse block
      paddingBottom: 30,     
      alignContent:'flex-start',
      paddingLeft:5
     // textAlign: 'left',
  //alignSelf: 'stretch',
    },
    footer: {
      fontSize: 12,
      color: isDarkMode ? "black" : "white",
      fontStyle: "italic",
    },
    categoryContainer: {
      flexDirection: "row",
      marginBottom: 12,
    },
    floatingButtonContainer: {
         position: "relative",
        // marginBottom: 60,
         transform: [{ scale: 0.8 }],
         marginRight:  -42,
         backgroundColor:isDarkMode ? "#fff":"#1F6F5B"
      
    },
    categoryButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#888",
      borderRadius: 8,
    },
    selectedCategoryButton: {
      backgroundColor: "#4CAF50",
    },
    searchModalContainer: {
      justifyContent: "flex-start",
      margin: 0,
    },
    categoryButtonText: {
      fontSize: 14,
      fontFamily: fontFamily,
      color: "#888",
    },
    selectedCategoryButtonText: {
      color: "#fff",
      fontFamily: fontFamily,
    },
    songItem: {
      padding: 15,
      backgroundColor: "#f8f8f8",
      borderBottomWidth: 1,
    },
    songCard: {
      backgroundColor: isDarkMode ? "white" : "black",
      borderRadius: 2,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      marginBottom: 0,
      width: 300,
      //borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDarkMode ? "black" : "white",
      justifyContent: "center",
    },
    noResultsText: {
      marginTop: 20,
      textAlign: "center",
      color: "#888",
    },
    searchInput: {
      height: 50,
      fontSize: 11,
      fontFamily: fontFamily,
      backgroundColor: isDarkMode ? "white" : "black",
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 10,
      marginTop: 2,
      borderWidth: 1,
      borderColor: "#ddd",
      textAlign: "left",
      writingDirection: "ltr",
      color: isDarkMode ? "black" : "white",
    },
    listContainer: {
      flex: 1,   
                   // 🔑 FlatList fills remaining space
    },
    listContent: {
      paddingVertical: 10,
    },
    songDate: {
      fontSize: 12,
      fontFamily: fontFamily,
      color: "#888",
      marginBottom: 5,
    },
    songListContainer: {
      backgroundColor: isDarkMode ? "white" : "black",
    },
    songTitle: {
      fontSize: 18,
      fontFamily: fontFamily,
      fontWeight: "bold",
      marginBottom: 5,
    //  marginLeft: 15,
      color: isDarkMode ? "white" : "black",
    },
    //Not used any where
    songLyrics: {
      fontSize: 30,
      fontFamily: fontFamily,
      color: "#555",
    },
    iconContainer: {
      padding: 8,
    },
    songCategory: {
      fontStyle: "italic",
      fontSize: 16,
      fontFamily: fontFamily,
      marginLeft: 15,
      color: isDarkMode ? "white" : "black",
    },
    columnWrapper: {
      justifyContent: "space-between",
    },
    selectedSongContainer: {
      padding: 16,
      marginTop: 40,
      backgroundColor: isDarkMode ? "white" : "black",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    selectedSongPlainTitle: {
      //fontSize: fontSize + fontSize * 0.25,
      textShadowColor: isDarkMode ? "rgba(13, 106, 18, 0.75)" : "#F295ED",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      fontFamily: fontFamily,
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: isDarkMode ? "rgba(13, 106, 18, 0.75)" : "#F295ED",
      textAlign: "left",
      color: isDarkMode ? "rgba(0, 11, 28, 0.8)" : "rgba(255, 244, 227, 0.8)",
      fontWeight: "bold",
      paddingBottom: 10,
      paddingTop:20,
      fontSize:moderateScale(fontSize),//scale(18),

     },
    selectedSongTitle: {
      fontFamily: fontFamily,
     // color: isDarkMode ? "green" : "#00FFFF",
      color: isDarkMode ? "rgba(0, 11, 28, 0.8)" : "rgba(255, 244, 227, 0.8)",

     // paddingBottom: 10,
      textAlign:"left",
     // width:'100%',
      paddingLeft:5,
      fontSize:moderateScale(fontSize),//scale(18),
      textShadowColor: isDarkMode ? "rgba(13, 106, 18, 0.75)" : "#F295ED",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      textDecorationStyle: "solid",
    },
      controlButton: {
      fontSize: 18,
      fontFamily: fontFamily,
      fontWeight: "bold",
      padding: 10,
      marginHorizontal: 10,
      color: "#007BFF",
    },
    disabled: {
      color: "#ccc",
    },
    controls: {
      flexDirection: "row",
      marginTop: 20,
    },
    selectedSongCategory: {
      fontSize: 16,
      fontFamily: fontFamily,
      fontStyle: "italic",
      marginBottom: 5,
    },
    selectedSongArtist: {
      fontSize: 16,
      fontFamily: fontFamily,
      color: "#555",
      marginBottom: 5,
    },
    selectedSongLyrics: {
      fontSize: fontSize,
      fontFamily: fontFamily,
      color: "#777",
      marginBottom: 10,
    },
    closeButton: {
      fontSize: 16,
      fontFamily: fontFamily,
      color: "#007bff",
      marginTop: 10,
      textAlign: "right",
    },
    backButton: {
      marginRight: 1,
      padding: 10,
    },
    LangModalContainer: {
      marginBottom: 200,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    langOptionModalContainer: {
      justifyContent: "flex-start", // Align at top
      alignItems: "flex-end", // Align to right
      margin: 0,
      paddingTop: height * 0.08, // Adjust depending on navbar height
      paddingRight: width * 0.03,
    },
    modalContent: {
      position: "absolute",
      top: 50,
      right: 5,
      minWidth: 140, 
      maxWidth:200,//for responsive sizing
      backgroundColor: isDarkMode ? "#fff" : "#2a2a2a",
      borderRadius: 8,
      borderWidth: isDarkMode ? 0 : 1,
      borderColor: "white",
      paddingVertical: 8,
      zIndex: 999, // Make sure it overlays
      justifyContent: "center",
      alignItems: "center",
      paddingRight: 25,
    },
    languageOption: {
      paddingVertical: 10,
      marginLeft: "auto",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      alignSelf: "auto",
    },
    languageText: {
      fontSize: 16,
      textAlign: "center",
      color: isDarkMode ? "black" : "white",
    },
    langContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    pickerContainer: {
      width: 65,
      fontSize: 20,
      fontWeight: "100",
      paddingVertical: 5,
      paddingRight: -7,
      borderWidth:0.8,
      borderColor:'#ccc',
      borderRadius:15,
      textAlign:'center',
      alignContent:'center'
      //backgroundColor:isDarkMode?'#146447':'#172f26'
    },
    pickerText: {
      color: isDarkMode?"#fff":"#fff",
      fontSize: 13,
      textAlign:'center',
      //fontFamily: fontFamily,
      fontWeight: "bold",
    },
    scrollContainer: {
       //flexGrow: 1, // Allows the content to grow
      // Center content vertically
    },
    songContainer: {
      width: Dimensions.get("window").width * 0.99, // Slightly narrower for balanced spacing
      justifyContent: "center",
      height: "100%",
      borderRadius: 0, // Rounded corners
      backgroundColor: isDarkMode ? "#f2f2f2" : "#1a1a1a", // Soft background color
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 0,
      // elevation: 5, // For Android shadow
      alignSelf: "center", // Center horizontally
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    filterButton: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
      borderRadius: 8,
      backgroundColor: "#f0f0f0",
    },
    activeFilter: {
      backgroundColor: "#4CAF50",
    },
    filterButtonText: {
      marginLeft: 6,
      color: "#888",
    },
    categoryPicker: {
      flex: 1,
      marginLeft: 10,
      height: 40,
    },
favoritesModalContainer: {
 
  justifyContent: "center",
 
  margin: 20,
},
favoritesModalContent: {
 backgroundColor: isDarkMode ? "#fff" : "black",
      fontFamily: fontFamily,
      padding: 10,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: "white",
      maxHeight: "80%",
},
    lyricContainer: {
      backgroundColor: isDarkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    fullLyricText: {
      fontSize: 16,
      fontFamily: fontFamily,
      color: isDarkMode ? "black" : "white",
      fontWeight: "bold",
      marginBottom: 8,
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
      zIndex: 1,
    },
      footerContainer: {
    //width: "100%",
   //paddingVertical: 12,
    //paddingHorizontal: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#888",
    position: "absolute",
    //marginBottom: -105,
    left: 10,
    bottom:55,
   // marginBottom:-500
  },
  artistName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artistBio: {
    fontSize: 12,
    marginTop: 4,
  },


searchHeader: {
  marginBottom: 0,
  alignContent:"center",
   flexDirection:"row",
  alignItems:"center"
},

fancyInput: {
  
  height: 48,
  flex: 1, // ⭐ THIS is the key
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  backgroundColor: isDarkMode ? "#d1cdcdff" : "#1e1e1e",
  paddingHorizontal: 15,
  color: isDarkMode?"#000":'#fff',
  fontSize: 16,
},
orderText: {
  marginLeft: 10,
  fontSize: 14,
  fontWeight: "600",
  color: "#9acd32",
},
chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    elevation: 3,
  },
  text: {
    fontWeight: "600",
    fontSize: 14,
  },
songRow: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 14,
  borderBottomWidth: 0.5,
  borderBottomColor: "#333",
  height:70
},

songIndex: {
  width: 30,
  height: 30,
  borderRadius: 17,
  //backgroundColor: "#2a2a2a",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

indexText: {
  color:isDarkMode ? "#fff":"#9acd32",
 // fontWeight: "bold",
},

songInfo: {
  flex: 1,
},

// songTitle: {
//   color: "#fff",
//   fontSize: 16,
//   fontWeight: "600",
// },

songSubtitle: {
  color: "#aaa",
  fontSize: 13,
  marginTop: 2,
},

emptyBox: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor:"White"
},

emptyText: {
  color: "#777",
  fontSize: 16,
},

  });
};
export default getStyles;

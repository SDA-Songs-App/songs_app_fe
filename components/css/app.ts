import { useTheme } from "@/app/ThemeProvier";
import { Dimensions, StyleSheet } from "react-native";
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
      padding: 10,
      backgroundColor: isDarkMode ? "green" : "#2a2a2a",
      //// marginTop: 2,
    },
    number: {
      color: "#fff",
      fontSize: 20,
      fontFamily: fontFamily,
    },
    modalContainer: {
      width: "100%",
      padding: 10,
      backgroundColor: isDarkMode ? "white" : "black",
      borderRadius: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "white",
    },
    backgroundImage: {
      paddingLeft: 20,
      flex: 1,
      // Ensures the image covers the entire background
      justifyContent: "center",
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
      fontSize: fontSize, //20
      fontFamily: fontFamily,
      paddingBottom: 30,
      fontWeight: "bold",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    footer: {
      fontSize: 12,
      color: isDarkMode ? "black" : "white",
      fontStyle: "italic",
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
    },
    floatingButtonContainer: {
      position: "relative",
      marginBottom: -40,
      transform: [{ scale: 0.6 }],
      marginRight: -80,
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
      direction: "ltr",
      color: isDarkMode ? "black" : "white",
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
      marginLeft: 15,
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
      fontSize: fontSize + fontSize * 0.25,
      textShadowColor: isDarkMode ? "rgba(13, 106, 18, 0.75)" : "#F295ED",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
      fontFamily: fontFamily,
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: isDarkMode ? "rgba(13, 106, 18, 0.75)" : "#F295ED",
      textAlign: "center",
      color: isDarkMode ? "rgba(0, 11, 28, 0.8)" : "rgba(255, 244, 227, 0.8)",
      fontWeight: "bold",
      paddingBottom: 10,
      padding: 5,
    },
    selectedSongTitle: {
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: isDarkMode ? "green" : "#00FFFF",
      paddingBottom: 20,
    },
    selectedSongTitle1: {
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: "black",
      marginBottom: 10,
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
      top: 60,
      right: 5,
      width: width * 0.3, //for responsive sizing
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
      width: 50,
      fontSize: 20,
      fontWeight: "100",
      paddingVertical: 5,
      paddingRight: -7,
    },
    pickerText: {
      color: "#fff",
      fontSize: 13,
      //fontFamily: fontFamily,
      fontWeight: "bold",
    },
    scrollContainer: {
      flexGrow: 1, // Allows the content to grow
      // Center content vertically
    },
    songContainer: {
      width: Dimensions.get("window").width * 0.99, // Slightly narrower for balanced spacing
      justifyContent: "flex-start",
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
      padding: 20,
      borderRadius: 20,
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
  });
};
export default getStyles;

import {Dimensions, StyleSheet} from 'react-native'
import { withDecay } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
const getStyles = (isDarkMode: boolean, fontSize: number, fontFamily: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? "#f2f2f2" : "#1a1a1a",
      width: "100%",
      height: "100%",
    },

    navbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      backgroundColor: isDarkMode ? "green" : "#2a2a2a",
      marginTop: 2,
    },
    number: {
      color: "#fff",
      fontSize: 20,
      fontFamily: fontFamily,
    },
    modalContainer: {
      width: "100%",
      padding: 10,
      backgroundColor: isDarkMode ? "#fff" : "#2a2a2a",
      borderRadius: 10,
      alignItems: "center",
    },
    backgroundImage: {
      paddingLeft: 20,
      flex: 1,
      resizeMode: "cover", // Ensures the image covers the entire background
      justifyContent: "center",
    },
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(0, 0, 0, 0.5",
    },
    filterRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      fontFamily: fontFamily,
    },
    verse1Style: {
      color: "black",
      fontFamily: fontFamily,
      fontSize: fontSize, //20
      paddingBottom: 30,
      fontWeight: "bold",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 20,
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
    },
    songItem: {
      padding: 15,
      backgroundColor: "#f8f8f8",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    songCard: {
      backgroundColor: "#fff",
      borderRadius: 2,
      elevation: 5, // Shadow for Android
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      marginBottom: 0,
      width: 350,

      justifyContent: "center",

      marginVertical: 1,
    },
    noResultsText: {
      marginTop: 20,
      textAlign: "center",
      color: "#888",
    },
    searchInput: {
      height: 50,
      fontSize: 11,
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 10,
      marginTop: 2,
      borderWidth: 1,
      borderColor: "#ddd",
      textAlign: "left",
      writingDirection: "ltr",
      direction: "ltr",
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
    songTitle: {
      fontSize: 16,
      fontFamily: fontFamily,
      fontWeight: "bold",
      marginBottom: 5,
      marginLeft: 15,
    },
    songLyrics: {
      fontSize: fontSize, //14
      fontFamily: fontFamily,
      color: "#555",
    },
    iconContainer: {
      padding: 8,
    },
    songCategory: {
      fontStyle: "italic",
      marginLeft: 15,
    },
    columnWrapper: {
      justifyContent: "space-between",
    },
    selectedSongContainer: {
      padding: 16,
      marginTop: 40,
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    selectedSongPlainTitle:{
        fontFamily:fontFamily,
        fontSize:40,
        color:'black',
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center'
    },
    selectedSongTitle: {
      fontSize: fontSize, //22
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: "green",
      paddingBottom: 20,
    },
    selectedSongTitle1: {
      fontSize: fontSize, //22,
      fontFamily: fontFamily,
      fontWeight: "bold",
      color: "black",
      marginBottom: 10,
    },
    controlButton: {
      fontSize: 18,
      fontFamily: fontFamily,
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
      fontSize: 16,
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
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 8,
      width: width * 0.3, 
      marginTop: height * -0.315,
      marginLeft: width * 0.645, 
      marginRight: width * 0.01,
      paddingRight: width * 0.06, 
    },
    languageOption: {
      paddingVertical: 10,
      marginLeft:'auto',
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      alignSelf:'auto',
    },
    languageText: {
      fontSize: fontSize, //20,
      fontFamily: fontFamily,
      textAlign: "center",
    },
    langContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    pickerContainer: {
      width: 50,
      fontSize: 20,
      fontFamily: fontFamily,
      fontWeight: "100",
      paddingVertical: 5,
      paddingRight: -7,
    },
    pickerText: {
      color: "#fff",
      fontSize: 14,
      fontFamily: fontFamily,
    },
    scrollContainer: {
      flexGrow: 1, // Allows the content to grow
      // Center content vertically
    },
    songContainer: {
      width: Dimensions.get("window").width * 0.99, // Slightly narrower for balanced spacing
      justifyContent: "flex-start",
      height:'100%',
      // Add padding for better content spacing
      borderRadius: 15, // Rounded corners
      backgroundColor: "#f8f9fa", // Soft background color
      shadowColor: "#000", // Add shadow for depth
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5, // For Android shadow
      borderWidth: 1, // Add a light border for separation
      borderColor: "#ddd", // Light border color
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
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 20,
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
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
      zIndex: 1,
    },
  });
  export default getStyles
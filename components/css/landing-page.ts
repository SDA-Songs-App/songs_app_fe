import { StyleSheet, Dimensions } from "react-native";
const { height: deviceHeight } = Dimensions.get("window");
const { width: deviceWidth } = Dimensions.get("window");
const landingPageStyles = () =>
  StyleSheet.create({
    gradientBackground: {
      flexGrow: 1,
    },
    container: {
      flexGrow: 1,
      alignItems: "center",
      paddingTop: 50,
    },
    header: {
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#fff",
    },
    navbar: {
      flexDirection: "row",
    },
    navItem: {
      marginHorizontal: 10,
    },
    NavText: {
      fontSize: 16,
      color: "#fff",
    },
    heroSection: {
      height: deviceHeight /4,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    heroTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 20,
      textShadowColor: "rgba(0,0,0,0.75)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    heroSubtitle: {
      fontSize: 18,
      color: "#fff",
      textAlign: "center",
      marginBottom: 10,
      textShadowColor: "rgba(0,0,0,0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    featureContainer: {
      flex: 1,
      width: "100%",
      height: deviceHeight / 2,
      backgroundColor: "rgba(255,255,255,0.9)",
      justifyContent: "space-between", // Place the views on opposite sides (left and right)
      alignItems: "center",
      padding: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // For Android
      paddingBottom: 100,
    },
    featureLine: {
      fontSize: 14,
      color: "#333",
      marginVertical: deviceHeight * 0.002,
    },
    footerRow: {
      flexDirection: "column",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      paddingVertical: deviceHeight * 0.01,
      //paddingHorizontal: 10,
    },
    footerText: {
      fontWeight:'bold',
      fontSize: 14,
      color: "#555",
    },
    footerVerse: {
       fontStyle:'italic',
      fontSize: 14,
      color: "#555",
    },
     // Two-column layout + logo in center
    twoColumnContainer: {
     flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 0,
      gap: 5,
    },
    column: {
      flex: 1,
      justifyContent: 'center',
       paddingHorizontal: 0, 
    },
    iconContainer:{
       flex: 2,
       alignItems: 'center',
       justifyContent: 'center',
    },
    centerLogo: {
        width: 180,
        height: 180,
         resizeMode: 'contain',
    }, 
    headingTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: deviceHeight * 0.002,
      color: "#333",
      textAlign: "center",
      textShadowColor: "rgba(0,0,0,0.75)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    rightVerse: {
        fontSize: 12,
        textAlign: "right", // ensures alignment from start
        marginBottom: 6,
        marginRight:0
    },
    entry:{ 
      marginBottom: 12,
    },
     entryRight:{ 
      marginBottom: 12,
      //marginRight:0
    },
    rightVerseText: {
        fontSize: 12,
        textAlign: "right", // ensures alignment from start
        marginRight:0
    },
    verse: {
        fontSize: 12,
        textAlign: "left", // ensures alignment from start
        fontStyle:'italic',
        gap:12,
        marginLeft: 5,

    },
    VerseText: {
        fontWeight:'600',
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 5,
    },
     verseRight: {
        fontSize: 12,
        fontStyle:'italic',
        textAlign: "left", // ensures alignment from start
        gap:12,
        
    },
    VerseTextRight: {
      fontWeight:'600',
       fontSize: 14,
       textAlign: 'left',
       
    },
    searchInput: {
      height: 40,
      borderColor: "#ccc",
      borderRadius: 5,
      borderWidth: 1,
      width: "100%",
      paddingHorizontal: deviceWidth * 0.06,
      paddingLeft: 10,
      backgroundColor: "#fff",
    },
  });
export default landingPageStyles;
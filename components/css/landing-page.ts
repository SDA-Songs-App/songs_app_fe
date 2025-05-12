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
      paddingTop: 80,
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
      height: deviceHeight / 3,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    heroTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 10,
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
    ctaButton: {
      backgroundColor: "#fff",
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    ctaText: {
      color: "#6a11cb",
      fontSize: 18,
      fontWeight: "bold",
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
      paddingBottom: 200,
    },
featureContainerTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#333",
    },
    featureLine: {
      fontSize: 14,
      color: "#333",
      marginVertical: deviceHeight * 0.002,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      paddingVertical: deviceHeight * 0.01,
      //paddingHorizontal: 10,
    },
    footerText: {
      fontSize: 14,
      color: "#555",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#6a11cb",
      marginBottom: 20,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    // Two-column layout + logo in center
    twoColumnContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingHorizontal: 10, // Equal margin left and right

     
      
    },
    column: {
      flex: 1,
      paddingHorizontal: 10,
    },
     centerLogoContainer: {
      width: deviceWidth * 0.3,
      height: deviceWidth * 0.3,
      justifyContent: "center",
      alignItems: "center",
      paddingRight: deviceWidth * 0.05,
      marginRight: deviceWidth * 0.01,
      marginLeft: deviceWidth * 0.01,
    },
    centerLogo: {
        width: 200,
        height: 200,
        marginHorizontal: 10,
        alignSelf: "center",
    },
    feature: {
      alignItems: "flex-start",
      marginBottom: 30,
    },
    feature2: {
      alignItems: "flex-start",
      marginBottom: 30,
      marginLeft: 50,
    },
    featureTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
      marginVertical: 10,
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
    backgroundImage: {
      flex: 1,
      resizeMode: "cover", // Ensures the image covers the entire background
      justifyContent: "center",
      height: "100%",
      width: "100%", // Centers the content inside
    },
    featureTitle1: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#333",
    },
    featureDescription: {
      fontSize: 14,
      textAlign: "justify",
      color: "#666",
    },
    featureDescription2: {
      fontSize: 14,
      textAlign: "justify",
      marginRight: 0,
      color: "#666",
    },
    rightVerseText: {
    fontSize: 16,
    textAlign: "right", // ensures alignment from start
    marginBottom: 6,
    marginRight:0
    },
    leftVerseText: {
        fontSize: 16,
        textAlign: "left", // ensures alignment from start
        marginBottom: 6,
        marginLeft:0,
        gap:12,
    },
    searchInput: {
      height: 40,
      borderColor: "#ccc",
      borderRadius: 5,
      borderWidth: 1,
      width: "100%",
      paddingHorizontal: deviceWidth * 0.06,
      paddingLeft: 10,
      marginBottom: 20,
      backgroundColor: "#fff",
    },
  });
export default landingPageStyles;
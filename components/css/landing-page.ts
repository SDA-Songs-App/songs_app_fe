import {StyleSheet} from 'react-native'
const landingPageStyles = () =>
    StyleSheet.create({
        gradientBackground: {
            flexGrow: 1,
          },
          container: {
            flexGrow: 1,
            alignItems: "center",
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
            padding: 40,
            alignItems: "center",
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
            marginBottom: 20,
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
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.9)",
            justifyContent: "space-between", // Place the views on opposite sides (left and right)
            alignItems: "center",
            borderRadius: 12,
            padding: 16,
            marginBottom: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5, // For Android
          },
          featureContainerTitle: {
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 8,
            color: "#333",
          },
          featuresSection2: {
            paddingLeft: 100,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center",
          },
          featureLine: {
            fontSize: 14,
            color: "#333",
            marginVertical: 8,
          },
          footerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            paddingTop: 10,
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
            alignItems: "center",
            justifyContent: "space-between", // space-around or space-evenly if you prefer
            marginBottom: 10,
          },
          column: {
            flex: 1,
          },
          centerLogoContainer: {
            width: 100,
            height: 100,
           
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
         
            // Shadow for the circular logo container
          
          
          },
          centerLogo: {
            width: 200,
            height: 200,
            //marginHorizontal: 16,
            resizeMode: "contain",
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
          // The heading outside (above) the container
          headingTitle: {
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 8,
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
            height: 229,
            width: 400, // Centers the content inside
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
          featureLeft: {
            flex: 1,
            alignItems: "flex-start",
          },
          featureRight: {
            flex: 1,
            alignItems: "flex-end",
          },
          searchInput: {
            height: 40,
            borderColor: "#ccc",
            borderRadius: 5,
            borderWidth: 1,
            width: "100%",
            paddingHorizontal: 20,
            paddingLeft: 20,
            marginBottom: 10,
            backgroundColor: "#fff",
          },
        
    })
    export default landingPageStyles
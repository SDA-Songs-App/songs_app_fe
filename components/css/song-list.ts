import { useTheme } from "@/app/ThemeProvier";
import { StyleSheet } from "react-native";

const songListStyles = (
  isDarkMode: boolean,
  fontSize: number,
  fontFamily: string
) => {
  //const { isDarkMode } = useTheme();
  return StyleSheet.create({
    songCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: isDarkMode ? "white" : "black",
      marginVertical: 4,
      borderRadius: 4,
      elevation: 2,
    },
    songInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      color: isDarkMode ? "white" : "black ",
    },
    songTextContainer: {
      marginLeft: 12,
    },
    songNumber: {
      fontSize: 16,
      fontFamily: fontFamily,
      color: isDarkMode ? "#888" : "white",
    },
    songTitle: {
      fontSize: 16,
      fontFamily: fontFamily,
      fontWeight: "500",
      color: isDarkMode ? "black" : "white",
    },
    songArtist: {
      fontSize: 14,
      fontFamily: fontFamily,
      color: isDarkMode ? "black" : "#666",
      marginTop: 4,
    },
    favoriteButton: {
      padding: 8,
    },
    loadingContainer: {
      padding: 16,
      alignItems: "center",
    },
    emptyContainer: {
      padding: 20,
      alignItems: "center",
    },
    emptyText: {
      color: "#888",
      fontSize: 16,
      fontFamily: fontFamily,
    },
  });
};
export default songListStyles;

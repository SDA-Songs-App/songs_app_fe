import { StyleSheet } from "react-native";

// `isDarkMode` follows the app's inverted naming: true = light appearance.
const getStyle = (isDarkMode: boolean) => {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: isDarkMode ? "#f1f4f2" : "#1a1a1a" },
    content: { paddingBottom: 32 },
    hero: {
      alignItems: "center",
      paddingTop: 22,
      paddingBottom: 6,
      paddingHorizontal: 24,
    },
    heroName: {
      fontSize: 17,
      fontWeight: "800",
      color: isDarkMode ? "#14392f" : "#fff",
      textAlign: "center",
    },
    heroVersion: {
      fontSize: 12,
      color: isDarkMode ? "#5c6b66" : "#aaa",
      marginTop: 3,
    },
    card: {
      backgroundColor: isDarkMode ? "#fff" : "#2a2a2a",
      borderRadius: 18,
      marginHorizontal: 16,
      marginTop: 16,
      overflow: "hidden",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
      gap: 14,
    },
    rowDivider: {
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#edf0ee" : "#3a3a3a",
    },
    badge: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    rowText: {
      flex: 1,
      fontSize: 16,
      fontWeight: "600",
      color: isDarkMode ? "#1c2b26" : "#fff",
    },
    footer: {
      textAlign: "center",
      marginTop: 24,
      fontSize: 12,
      color: isDarkMode ? "#7a8a84" : "#888",
    },
  });
};
export default getStyle;

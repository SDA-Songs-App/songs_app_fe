// CollapsibleActionButton.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CollapsibleActionButtonProps = {
  fullLyricText: string;
  onCopy: (text: string) => void;
  onShare: (text: string) => Promise<void>;
  isDarkMode?: boolean;
};

const CollapsibleActionButton: React.FC<CollapsibleActionButtonProps> = ({
  fullLyricText,
  onCopy,
  onShare,
  isDarkMode = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.fabContainer}>
      {expanded && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => onCopy(fullLyricText)}
            style={styles.actionButton}
          >
            <Ionicons name="copy-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShare(fullLyricText)}
            style={styles.actionButton}
          >
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={toggleExpand} style={styles.mainButton}>
        <Ionicons name={expanded ? "close" : "add"} size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    fabContainer: {
      position: "absolute",
      bottom: 80,
      right: 5,
      alignItems: "center",
    },
    mainButton: {
      backgroundColor: isDarkMode ? "#1F6F5B" : "#2a2a2a",
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    actionsContainer: {
      marginBottom: 50,
      alignItems: "center",
    },
    actionButton: {
      backgroundColor: isDarkMode ? "#1F6F5B" : "#2a2a2a",
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
  });

export default CollapsibleActionButton;

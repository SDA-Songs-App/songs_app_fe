// CollapsibleActionButton.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

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
            <Icon name="copy" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onShare(fullLyricText)}
            style={styles.actionButton}
          >
            <Icon name="share" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={toggleExpand} style={styles.mainButton}>
        <Icon name={expanded ? "times" : "plus"} size={24} color="#fff" />
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
      backgroundColor: isDarkMode ? "green" : "#333",
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    actionsContainer: {
      marginBottom: 50,
      alignItems: "center",
    },
    actionButton: {
      backgroundColor: isDarkMode ? "#000" : "gray",
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
  });

export default CollapsibleActionButton;

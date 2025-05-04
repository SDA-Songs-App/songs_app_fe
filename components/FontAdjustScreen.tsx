import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/app/ThemeProvier";
const FONT_SIZES = [14, 16, 18, 20, 24, 28, 30];

// Use platform-specific font names
const FONT_FAMILIES =
  Platform.select({
    ios: [
      "System",
      "ArialMT",
      "Georgia",
      "CourierNewPSMT",
      "Avenir",
      "Avenir-Black",
      "Avenir-Book",
      "Avenir-Light",
      "Menlo",
      "Verdana",
      "Helvetica",
      "HelveticaNeue",
      "Palatino-Roman",
    ],
    android: [
      "Roboto",
      "sans-serif",
      "sans-serif-light",
      "sans-serif-thin",
      "sans-serif-condensed",
      "sans-serif-medium",
      "sans-serif-black",
      "serif",
      "serif-monospace",
      "notoserif",
      "monospace",
    ],
  }) || [];

type FontSizeAdjustProps = {
  onFontSizeChange?: (size: number) => void;
  onFontFamilyChange?: (family: string) => void;
};

const FontSizeAdjustScreen: React.FC<FontSizeAdjustProps> = ({
  onFontSizeChange = () => {},
  onFontFamilyChange = () => {},
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>("Roboto");
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES[0]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const loadPreferences = async () => {
      const storedSize = await AsyncStorage.getItem("fontSize");
      const storedFamily = await AsyncStorage.getItem("fontFamily");
      if (storedSize) setFontSize(Number(storedSize));
      if (storedFamily) {
        setFontFamily(storedFamily);
        setSelectedFont(storedFamily);
      }
    };
    loadPreferences();
  }, []);

  const savePreferences = async (size: number, family: string) => {
    await AsyncStorage.setItem("fontSize", String(size));
    await AsyncStorage.setItem("fontFamily", family);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    savePreferences(size, fontFamily);
    onFontSizeChange(size);
  };

  const handleFontSelect = async (font: string) => {
    setSelectedFont(font);
    setFontFamily(font);
    await savePreferences(fontSize, font);
    onFontFamilyChange(font);
    setModalVisible(false);
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "white" : "black" },
      ]}
    >
      <Text
        style={{
          color: isDarkMode ? "#000" : "#fff",
          fontSize: 22,
          fontWeight: "600",
          letterSpacing: 1,
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        🎚️Adjust Size
      </Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          transform: [{ scaleY: 2.5 }],
          marginBottom: 20,
        }}
        minimumValue={16}
        maximumValue={30}
        step={2}
        value={fontSize}
        onValueChange={handleFontSizeChange}
      />

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: isDarkMode ? "#fff" : "#000",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
          alignItems: "center",
          shadowColor: isDarkMode ? "#000" : "#888",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: isDarkMode ? "#000" : "#fff",
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          🖋️ Select Font:{" "}
          <Text
            style={{ textDecorationLine: "underline", fontStyle: "italic" }}
          >
            {selectedFont}
          </Text>
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: isDarkMode ? "#fff" : "#000" },
            ]}
          >
            <FlatList
              data={FONT_FAMILIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleFontSelect(item)}
                  style={styles.option}
                >
                  <Text style={{ color: isDarkMode ? "#000" : "#fff" }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={{ color: "red", textAlign: "center" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 16,
  // },
  label: {
    marginVertical: 8,
    fontSize: 16,
  },
  container: {
    justifyContent: "flex-start",
    padding: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000aa", // semi-transparent backdrop
  },
  modalContainer: {
    margin: 40,
    padding: 20,
    borderRadius: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
  },
});

export default FontSizeAdjustScreen;

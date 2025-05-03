import React, { useState, useEffect } from "react";
import { View, Text, Platform, useColorScheme, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>("Roboto");
  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadPreferences = async () => {
      const storedSize = await AsyncStorage.getItem("fontSize");
      const storedFamily = await AsyncStorage.getItem("fontFamily");
      if (storedSize) setFontSize(Number(storedSize));
      if (storedFamily) setFontFamily(storedFamily);
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

  const handleFontFamilyChange = (family: string) => {
    setFontFamily(family);
    savePreferences(fontSize, family);
    onFontFamilyChange(family);
  };

  // Choose background based on theme
  const backgroundColor =
    colorScheme === "dark"
      ? styles.lightBackground.backgroundColor
      : styles.darkBackground.backgroundColor;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.label}>Font Size</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          transform: [{ scaleY: 3 }],
        }}
        minimumValue={16}
        maximumValue={30}
        step={2}
        value={fontSize}
        onValueChange={handleFontSizeChange}
      />
      <Text>Font Type</Text>
      <Picker selectedValue={fontFamily} onValueChange={handleFontFamilyChange}>
        {FONT_FAMILIES.map((family) => (
          <Picker.Item key={family} label={family} value={family} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
  },
  lightBackground: {
    backgroundColor: "#ffffff",
  },
  darkBackground: {
    backgroundColor: "#000000",
  },
});

export default FontSizeAdjustScreen;

import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 30];

// Use platform-specific font names
const FONT_FAMILIES =
  Platform.select({
    ios: ["System", "ArialMT", "Georgia", "CourierNewPSMT"],
    android: ["Roboto", "sans-serif", "serif", "monospace"],
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

  return (
    <View>
      <Text>Font Size</Text>
      <Slider
        style={{
          width: 300,
          height: 40,
          transform: [{ scaleY: 3 }],
        }}
        minimumValue={18}
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

export default FontSizeAdjustScreen;

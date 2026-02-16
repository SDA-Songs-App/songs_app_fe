import React from "react";
import { useTheme } from "../ThemeProvider";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "@/components/homescreen";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import FontSizeAdjustScreen from "@/components/FontAdjustScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavbarWithSongs from "../screens/NavbarWithSongs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

function MainApp() {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor={isDarkMode ? "#0a8f25" : "#1a1a1a"}
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "green" }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Navbar"
              component={NavbarWithSongs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FontSettings"
              component={FontSizeAdjustScreen}
            />
            <Stack.Screen
              name="ቅርጽ፟_ማስተካከያ"
              component={FontSizeAdjustScreen}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default MainApp;

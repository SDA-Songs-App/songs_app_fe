import React from "react";
import { useTheme } from "../ThemeProvider";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "@/components/homescreen";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import FontSizeAdjustScreen from "@/components/FontAdjustScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavbarWithSongs from "../screens/NavbarWithSongs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SettingsScreen from "@/components/settings-components/setting";
import About from "@/components/settings-components/about"
import UserGuide from "@/components/settings-components/user-guide";
import Contributors from "@/components/settings-components/contributors";
const Stack = createNativeStackNavigator();

function MainApp() {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor={isDarkMode ? "#1F6F5B" : "#1a1a1a"}
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#1F6F5B" }}>
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
              name="About"
              component={About}
            />
             <Stack.Screen
              name="Privacy"
              component={UserGuide}
            />
            <Stack.Screen
              name="UserGuide"
              component={UserGuide}
            />
            <Stack.Screen
              name="Contributors"
              component={Contributors}
            />
            <Stack.Screen
              name="ቅርጽ፟_ማስተካከያ"
              component={SettingsScreen}
            />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default MainApp;

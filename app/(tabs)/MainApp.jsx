import React from "react";
import {useTheme } from "../ThemeProvier";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "@/components/homescreen";
import NavbarScreen from "@/components/navbar";
import { createStackNavigator } from "@react-navigation/stack";
import FontSizeAdjustScreen from "@/components/FontAdjustScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {NavigationIndependentTree, NavigationContainer} from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const Stack = createStackNavigator(); 
function MainApp (){
    const {isDarkMode, theme} = useTheme()
      return theme ? (
        <SafeAreaProvider>
        <StatusBar
        style="light"                // light-content icons
        backgroundColor = {isDarkMode ? "#0a8f25": "#1a1a1a"} // background color
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent"}}>
        <NavigationIndependentTree>
          <NavigationContainer theme = {theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Navbar"
                  component={NavbarScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="FontSettings"
                  component={FontSizeAdjustScreen}
                />
              </Stack.Navigator>
            </GestureHandlerRootView>
          </NavigationContainer>
        </NavigationIndependentTree>
        </SafeAreaView>
        </SafeAreaProvider>
      ):(
        <FallbackUI />
      );
    }
export default MainApp    
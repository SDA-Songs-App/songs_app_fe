import React from "react";
import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Navbar from "@/components/navbar";
import LandingPage from "@/components/landingPage";
import {useTheme } from "../ThemeProvier";
import HomeScreen from "@/components/homescreen";
import NavbarScreen from "@/components/navbar";
import { createStackNavigator } from "@react-navigation/stack";
import { RooStackSettingsParams, RootStackParams } from "../types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Preferences from "@/components/settings-components/Preferences";
import LanguagesSwitcher from "@/components/settings-components/languages-switcher";
import FontSizeAdjustScreen from "@/components/FontAdjustScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {NavigationIndependentTree, NavigationContainer} from '@react-navigation/native'
const Stack = createStackNavigator(); 
function MainApp (){
    const {theme} = useTheme()
      return theme ? (
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
      ):(
        <FallbackUI />
      );
    }
export default MainApp    
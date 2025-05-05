import React from "react";
import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Navbar from "@/components/navbar";
import LandingPage from "@/components/landingPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import HomeScreen from "@/components/homescreen";
import NavbarScreen from "@/components/navbar";
import { RooStackSettingsParams, RootStackParams } from "../types";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Preferences from "@/components/settings-components/Preferences";
import LanguagesSwitcher from "@/components/settings-components/languages-switcher";
import FontSizeAdjustScreen from "@/components/FontAdjustScreen";
import  ThemeProvider from "../ThemeProvier";

import MainApp from "../(tabs)/MainApp"
// import { Drawer } from 'expo-router/drawer'
const Stack = createStackNavigator();
export default function App() {
    return (
      <ThemeProvider >
        
        <MainApp />
      </ThemeProvider>
            
          )
}

import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Navbar from '@/components/navbar';
import LandingPage from '@/components/landingPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/components/homescreen';
import NavbarScreen from '@/components/navbar';
import { RooStackSettingsParams, RootStackParams } from './types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Preferences from '@/components/settings-components/Preferences';
import LanguagesSwitcher from '@/components/settings-components/languages-switcher';
// import { Drawer } from 'expo-router/drawer'
const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
 const SettingsDrawer = () =>{
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Personal Preferences' component={Preferences} options={{drawerLabel:'Home', title:'overview'}}/>
      <Drawer.Screen name ='Languages Switcher'component={LandingPage} options={{drawerLabel:'testing', title:'user'}}/>
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
     <NavigationContainer independent>
        <GestureHandlerRootView style ={{flex:1}}>
          <Stack.Navigator initialRouteName='Home'>
            {/* Define HomeScreen */}
            <Stack.Screen name ='Home' component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'Navbar' component={NavbarScreen} options={{headerShown:false}}/>
            <Stack.Screen 
              name ='settings' 
              component={SettingsDrawer} 
              options={{headerShown:false}}/>
            {/* <Navbar></Navbar>   */}
            {/* <LandingPage></LandingPage> */}
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

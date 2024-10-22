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
import { RootStackParams } from './types';
const Stack = createStackNavigator<RootStackParams>();
export default function App() {
  return (
     <NavigationContainer independent>
        <GestureHandlerRootView style ={{flex:1}}>
          <Stack.Navigator initialRouteName='Home'>
            {/* Define HomeScreen */}
            <Stack.Screen name ='Home' component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name = 'Navbar' component={NavbarScreen} options={{headerShown:false}}/>
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

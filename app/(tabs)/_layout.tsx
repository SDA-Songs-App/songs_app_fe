import { Stack, Tabs } from "expo-router";
import React from "react";




export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index"
      options={{
        tabBarStyle: { display: "none" }, // hides tab bar
        tabBarButton: () => null,         // hides tab icon
      }}
      />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}


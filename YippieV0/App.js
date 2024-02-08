import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Geocoding from "react-native-geocoding";
import { LogBox } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import { ChatProvider } from "./src/chat/context";


LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

// Initialize the Geocoding library with the API key
Geocoding.init("AIzaSyDZ_unBvP3bbZljXfJOVDMDnQG6Onwa4kM");

export default function App() {
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

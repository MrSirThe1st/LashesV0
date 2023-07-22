import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "../screens/onboarding/Onboarding";
import Home from "../screens/BuyerUI/Home";
import Selection from "../screens/selection/Selection";
import Login from "../screens/Login&SignUp/Login";
import Orders from "../screens/BuyerUI/Orders";
import Profile from "../screens/BuyerUI/Profile";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inbox from "../screens/BuyerUI/Inbox";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="HomeScreen" component={Home} options={{ headerShown: false }}/>
    <Tab.Screen name="Orders" component={Orders} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Inbox" component={Inbox} />
  </Tab.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="Selection" component={Selection} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "../screens/onboarding/Onboarding";
import Home from "../screens/BuyerUI/Home";
import Selection from "../screens/selection/Selection";
import Login from "../screens/Login&SignUp/Login";
import Categories from "../screens/Categories/Categories"

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Selection" component={Selection}/>
            <Stack.Screen name="Login" options={Login}/>
            <Stack.Screen name="Categories" options={Categories}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default Navigation
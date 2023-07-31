import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "../screens/onboarding/Onboarding";
import Home from "../screens/BuyerUI/Home";
import Selection from "../screens/selection/Selection";
import Login from "../screens/Login&SignUp/Login";
import Orders from "../screens/BuyerUI/Orders";
import Profile from "../screens/BuyerUI/Profile";
import CategoriesPage from "../screens/Categories/CategoriesPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inbox from "../screens/BuyerUI/Inbox";
import SignUp from "../screens/Login&SignUp/SignUp";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator screenOptions={{
    tabBarLabelStyle: { fontWeight: 'bold'},
    tabBarStyle: { display: 'flex', paddingBottom:5}
  }}>
    <Tab.Screen name="HomeScreen" component={Home} options={{ headerShown: false, tabBarLabel:"Home", 
    tabBarIcon:({focused}) => focused ? (<AntDesign name="home" size={24} color="#1e90ff" />):
    (<AntDesign name="home" size={24} color="black" />)
    }}/>

    <Tab.Screen name="Orders" component={Orders} options={{
      tabBarIcon:({focused}) => focused ?(<MaterialIcons name="list-alt" size={24} color="#1e90ff" />):
      (<MaterialIcons name="list-alt" size={24} color="black" />)
  }}/>

    <Tab.Screen name="Categories" component={CategoriesPage} options={{
      tabBarIcon:({focused}) => focused ?(<MaterialIcons name="category" size={24} color="#1e90ff" />):
      (<MaterialIcons name="category" size={24} color="black" />)
  }}/>

    <Tab.Screen name="Inbox" component={Inbox} options={{
      tabBarIcon:({focused}) => focused ?(<FontAwesome5 name="envelope" size={24} color="#1e90ff" />):
    (<FontAwesome5 name="envelope" size={24} color="black" />)
  }}/>

    <Tab.Screen name="Profile" component={Profile} options={{headerShown: false,
      tabBarIcon:({focused}) => focused ?(<MaterialCommunityIcons name="face-man-outline" size={24} color="#1e90ff" />):
      (<MaterialCommunityIcons name="face-man-outline" size={24} color="black" />)
  }}/>
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
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Categories" component={CategoriesPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

import React, { useEffect, useState } from "react";
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
import Step1 from "../screens/SellerUI/MultiStepForm/Step1";
import Step2 from "../screens/SellerUI/MultiStepForm/Step2";
import Step3 from "../screens/SellerUI/MultiStepForm/Step3";
import Step4 from "../screens/SellerUI/MultiStepForm/Step4";
import AccountInfo from "../screens/SellerUI/AccountInfo";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../config/firebase";


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
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState('')

  useEffect (()=>{
    const unsubscribe =  onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  },[])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loading ? ( 
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : user ? (
          <>
            <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false,animation: "none"}}/>
            <Stack.Screen name="AccountInfo" component={AccountInfo} options={{ headerShown: true,animation: "none",title: "",headerStyle: {
      backgroundColor: "#1e90ff", 
    },}}/>
          </> 
        ) : (
          <>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false,animation: "none"}}/>
          <Stack.Screen name="Step1" component={Step1} options={{animation: "none"}}/>
          <Stack.Screen name="Step2" component={Step2} options={{animation: "none"}}/>
          <Stack.Screen name="Step3" component={Step3} options={{animation: "none"}}/>
          <Stack.Screen name="Step4" component={Step4} options={{animation: "none"}}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false,animation: "none"}}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false,animation: "none"}}/>
          <Stack.Screen name="Selection" component={Selection} options={{ headerShown: false,animation: "none" }}/>

        </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

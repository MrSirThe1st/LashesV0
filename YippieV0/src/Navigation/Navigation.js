import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/onboarding/Onboarding";
import Home from "../screens/BuyerUI/Home";
import Selection from "../screens/selection/Selection";
import Login from "../screens/Login&SignUp/Login";
import Orders from "../screens/BuyerUI/Orders";
import Profile from "../screens/BuyerUI/Profile";
import CategoriesPage from "../screens/Categories/CategoriesPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Inbox from "../screens/BuyerUI/Inbox";
import SignUp from "../screens/Login&SignUp/SignUp";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Step1 from "../screens/SellerUI/MultiStepForm/Step1";
import Step2 from "../screens/SellerUI/MultiStepForm/Step2";
import Step3 from "../screens/SellerUI/MultiStepForm/Step3";
import Step4 from "../screens/SellerUI/MultiStepForm/Step4";
import AccountInfo from "../screens/SellerUI/AccountInfo";
import AddProduct from "../screens/SellerUI/AddProduct";
import { onAuthStateChanged } from "firebase/auth";
import SellerProfile from "../screens/SellerUI/SelleProfile";
import { ActivityIndicator } from "react-native";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import SkeletonHome from "../componets/SkeletonHome";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontWeight: "bold" },
      tabBarStyle: { display: "flex", paddingBottom: 5 },
    }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <AntDesign name="home" size={24} color="#1e90ff" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Orders"
      component={Orders}
      options={{
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="list-alt" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="list-alt" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Categories"
      component={CategoriesPage}
      options={{
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="category" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="category" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Inbox"
      component={Inbox}
      options={{
        tabBarIcon: ({ focused }) =>
          focused ? (
            <FontAwesome5 name="envelope" size={24} color="#1e90ff" />
          ) : (
            <FontAwesome5 name="envelope" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialCommunityIcons
              name="face-man-outline"
              size={24}
              color="#1e90ff"
            />
          ) : (
            <MaterialCommunityIcons
              name="face-man-outline"
              size={24}
              color="black"
            />
          ),
      }}
    />
  </Tab.Navigator>
);

const HomeTabNavigatorSeller = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontWeight: "bold" },
      tabBarStyle: { display: "flex", paddingBottom: 5 },
    }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <AntDesign name="home" size={24} color="#1e90ff" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Orders"
      component={Orders}
      options={{
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="list-alt" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="list-alt" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Categories"
      component={CategoriesPage}
      options={{
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="category" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="category" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Inbox"
      component={Inbox}
      options={{
        tabBarIcon: ({ focused }) =>
          focused ? (
            <FontAwesome5 name="envelope" size={24} color="#1e90ff" />
          ) : (
            <FontAwesome5 name="envelope" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Account"
      component={SellerProfile}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialCommunityIcons
              name="face-man-outline"
              size={24}
              color="#1e90ff"
            />
          ) : (
            <MaterialCommunityIcons
              name="face-man-outline"
              size={24}
              color="black"
            />
          ),
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user) {
        fetchDocument(user.uid);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  async function fetchDocument(userUID) {
    const usersCollectionRef = collection(FIRESTORE_DB, "users");

    try {
      const q = query(usersCollectionRef, where("uid", "==", userUID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const document = querySnapshot.docs[0];
        const userData = document.data();
        const userRole = userData.role;
        setUserRole(userRole);
      } else {
        console.log("No matching document found!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <SkeletonHome />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            {userRole === "seller" ? (
              <>
                <Stack.Screen
                  name="SellerHome"
                  component={HomeTabNavigatorSeller}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AccountInfo"
                  component={AccountInfo}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="AddProduct"
                  component={AddProduct}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="BuyerHome"
                  component={HomeTabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AccountInfo"
                  component={AccountInfo}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Step1"
              component={Step1}
              options={{ animation: "none" }}
            />
            <Stack.Screen
              name="Step2"
              component={Step2}
              options={{ animation: "none" }}
            />
            <Stack.Screen
              name="Step3"
              component={Step3}
              options={{ animation: "none" }}
            />
            <Stack.Screen
              name="Step4"
              component={Step4}
              options={{ animation: "none" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Selection"
              component={Selection}
              options={{ headerShown: false, animation: "none" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

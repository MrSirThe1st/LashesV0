import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/onboarding/Onboarding";
import Home from "../screens/BuyerUI/Home";
import Selection from "../screens/selection/Selection";
import Login from "../screens/Login&SignUp/Login";
import Login1 from "../screens/Login&SignUp/Login1";
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
import AddService from "../screens/SellerUI/AddService";
import { onAuthStateChanged } from "firebase/auth";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import SkeletonHome from "../componets/SkeletonHome";
import SearchPage from "../screens/BuyerUI/SearchPage";
import Chat from "../chat/Chat";
import Catalogue from "../screens/SellerUI/Catalogue";
import CategoryScreen from "../categories/CategoryScreen";
import ProductDescription from "../screens/SellerUI/ProductDescription";
import Search from "../componets/Search";
import EditAccount from "../screens/SellerUI/settings/EditAccount";
import Favorites from "../screens/SellerUI/settings/Favorites";
import SellerSettings from "../screens/SellerUI/SellerSettings";
import MyProducts from "../screens/SellerUI/settings/MyProducts";
import MyServices from "../screens/SellerUI/settings/MyServices";
import Catalogue1 from "../screens/SellerUI/Catalogue1";
import SellerServices from "../componets/SellerServices";
import Service from "../componets/Service";
import EditProduct from "../screens/SellerUI/settings/EditProduct";
import EditService from "../screens/SellerUI/settings/EditService";
import OrderSeller from "../screens/SellerUI/OrderSeller";
import Review from "../screens/SellerUI/Review";
import AccountInfo1 from "../screens/SellerUI/AccountInfo1";
import EditAccountBuyer from "../screens/BuyerUI/EditAccountBuyer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUpStep1 from "../screens/Login&SignUp/SignUpStep1";
import InboxSeller from "../screens/SellerUI/InboxSeller";
import { ActivityIndicator, View } from "react-native";

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
            <MaterialIcons name="library-books" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="library-books" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Categories"
      component={CategoriesPage}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="search" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="search" size={24} color="black" />
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
      tabBarStyle: {
        display: "flex",
        paddingVertical: 10,
        elevation: -1,
        backgroundColor: "white",
      },
    }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={Home}
      options={{
        headerShown: false,
        tabBarLabel: "",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <AntDesign name="home" size={24} color="#1e90ff" />
          ) : (
            <AntDesign name="home" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Manage orders"
      component={OrderSeller}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons
              name="format-list-bulleted"
              size={24}
              color="#1e90ff"
            />
          ) : (
            <MaterialIcons
              name="format-list-bulleted"
              size={24}
              color="black"
            />
          ),
      }}
    />

    <Tab.Screen
      name="Categories"
      component={CategoriesPage}
      options={{
        tabBarLabel: "",
        headerShown: false,
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="search" size={24} color="#1e90ff" />
          ) : (
            <MaterialIcons name="search" size={24} color="black" />
          ),
      }}
    />

    <Tab.Screen
      name="Inbox"
      component={Inbox}
      options={{
        tabBarLabel: "",
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
      component={SellerSettings}
      options={{
        tabBarLabel: "",
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

const Navigation = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user) {
        fetchDocument(user.uid);
      } else {
        setLoading(false);
      }
      checkOnboardingStatus();
    });
    return unsubscribe;
  }, []);

  async function fetchDocument(userUID) {
    const usersCollectionRef = collection(FIRESTORE_DB, "users");

    try {
      setLoading(true)
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

 

  const checkOnboardingStatus = async () => {
    try {
      console.log("Checking onboarding status...");
      const onboardingStatus = await AsyncStorage.getItem(
        "onboardingCompleted"
      );

      if (onboardingStatus) {
        console.log("Onboarding has been completed!");
        setOnboardingCompleted(true);
      } else {
        console.log("Onboarding has not been completed.");
        setOnboardingCompleted(false);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setLoading(false);
    }
  };



  if (loading) {
    // Loading indicator
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
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
                  name="AccountInfo1"
                  component={AccountInfo1}
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

                <Stack.Screen
                  name="SearchPage"
                  component={SearchPage}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />

                <Stack.Screen
                  name="Catalogue"
                  component={Catalogue}
                  options={{
                    headerShown: true,
                    title: "Products",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Catalogue1"
                  component={Catalogue1}
                  options={{
                    headerShown: true,
                    title: "Services",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="CategoryScreen"
                  component={CategoryScreen}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="ProductDescription"
                  component={ProductDescription}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Search"
                  component={Search}
                  options={{
                    headerShown: false,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="EditAccount"
                  component={EditAccount}
                  options={{
                    headerShown: true,
                    title: "Account",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Favorites"
                  component={Favorites}
                  options={{
                    headerShown: true,
                    title: "Favorites",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="MyProducts"
                  component={MyProducts}
                  options={{
                    headerShown: true,
                    title: "Products",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="MyServices"
                  component={MyServices}
                  options={{
                    headerShown: true,
                    title: "Services",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="AddService"
                  component={AddService}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Service"
                  component={Service}
                  options={{
                    headerShown: true,
                    title: "Services",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    headerShown: false,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Login1"
                  component={Login1}
                  options={{
                    headerShown: false,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="EditProduct"
                  component={EditProduct}
                  options={{
                    headerShown: true,
                    title: "Edit Product",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="EditService"
                  component={EditService}
                  options={{
                    headerShown: true,
                    title: "Edit Service",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="OrderSeller"
                  component={OrderSeller}
                  options={{
                    headerShown: true,
                    title: "View Your order ",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Review"
                  component={Review}
                  options={{
                    headerShown: true,
                    title: "Reviews ",
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
                <Stack.Screen
                  name="AccountInfo1"
                  component={AccountInfo1}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="SearchPage"
                  component={SearchPage}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Catalogue"
                  component={Catalogue}
                  options={{
                    headerShown: true,
                    title: "Products",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Catalogue1"
                  component={Catalogue1}
                  options={{
                    headerShown: true,
                    title: "Services",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="CategoryScreen"
                  component={CategoryScreen}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="ProductDescription"
                  component={ProductDescription}
                  options={{
                    headerShown: true,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Search"
                  component={Search}
                  options={{
                    headerShown: false,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="EditAccount"
                  component={EditAccount}
                  options={{
                    headerShown: true,
                    title: "Account",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="EditAccountBuyer"
                  component={EditAccountBuyer}
                  options={{
                    headerShown: true,
                    title: "Account",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Favorites"
                  component={Favorites}
                  options={{
                    headerShown: true,
                    title: "Favorites",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="MyProducts"
                  component={MyProducts}
                  options={{
                    headerShown: true,
                    title: "Products",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="MyServices"
                  component={MyServices}
                  options={{
                    headerShown: true,
                    title: "Services",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Service"
                  component={Service}
                  options={{
                    headerShown: true,
                    title: "Services",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{
                    headerShown: false,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Login1"
                  component={Login1}
                  options={{
                    headerShown: false,
                    title: "",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
                <Stack.Screen
                  name="Review"
                  component={Review}
                  options={{
                    headerShown: true,
                    title: "Reviews ",
                    headerStyle: { backgroundColor: "white" },
                  }}
                />
              </>
            )}
          </>
        ) : onboardingCompleted ? (
  
          <>
            <Stack.Screen
              name="Selection"
              component={Selection}
              options={{ headerShown: false, animation: "none" }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="SignUpStep1"
              component={SignUpStep1}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
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
              name="Login1"
              component={Login1}
              options={{
                headerShown: false,
                title: "",
                headerStyle: { backgroundColor: "white" },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="SignUpStep1"
              component={SignUpStep1}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
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
              name="Selection"
              component={Selection}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Login1"
              component={Login1}
              options={{
                headerShown: false,
                title: "",
                headerStyle: { backgroundColor: "white" },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

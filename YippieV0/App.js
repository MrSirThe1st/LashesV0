import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import Login from "./src/screens/Login&SignUp/Login";
import SignUp from "./src/screens/Login&SignUp/SignUp";
import Home from "./src/screens/BuyerUI/Home";
import Selection from "./src/screens/selection/Selection";
import CategoriesPage from "./src/screens/Categories/CategoriesPage";
import Profile from "./src/screens/BuyerUI/Profile";
import Onboarding from "./src/screens/onboarding/Onboarding";
import NavigationForm from "./src/screens/SellerUI/MultiStepForm/NavigationForm";
import Step2 from "./src/screens/SellerUI/MultiStepForm/Step2";
import { Provider as PaperProvider } from "react-native-paper";
import AddProduct from "./src/screens/SellerUI/AddProduct";
import Example from "./src/screens/SellerUI/MultiStepForm/test";
import Step1 from "./src/screens/SellerUI/MultiStepForm/Step1";
import Step4 from "./src/screens/SellerUI/MultiStepForm/Step4";
import AccountInfo from "./src/screens/SellerUI/AccountInfo";
import Inbox from "./src/screens/BuyerUI/Inbox";
import Stars from "./src/componets/Stars";
import SkeletonHome from "./src/componets/SkeletonHome";
import Product from "./src/componets/Product";
import Chat from "./src/chat/Chat";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

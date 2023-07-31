import { StatusBar } from "expo-status-bar";
import { StyleSheet,View } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import Login from "./src/screens/Login&SignUp/Login";
import SignUp from "./src/screens/Login&SignUp/SignUp";
import Home from "./src/screens/BuyerUI/Home";
import Selection from "./src/screens/selection/Selection";
import CategoriesPage from "./src/screens/Categories/CategoriesPage";
import Profile from "./src/screens/BuyerUI/Profile";
import Onboarding from "./src/screens/onboarding/Onboarding";
import SellerSignUp from "./src/screens/SellerUI/SellerSignUp";
import NavigationForm from "./src/screens/SellerUI/MultiStepForm/NavigationForm";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationForm/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

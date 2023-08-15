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
import NavigationForm from "./src/screens/SellerUI/MultiStepForm/NavigationForm";
import Step2 from "./src/screens/SellerUI/MultiStepForm/Step2";
import { Provider as PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <View style={styles.container}>
      <PaperProvider>
        <SignUp/>
      </PaperProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

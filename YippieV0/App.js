import { StatusBar } from "expo-status-bar";
import { StyleSheet,View } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import Login from "./src/screens/Login&SignUp/Login";
import SignUp from "./src/screens/Login&SignUp/SignUp";
import Home from "./src/screens/BuyerUI/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

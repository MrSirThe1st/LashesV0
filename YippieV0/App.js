import { StatusBar } from "expo-status-bar";
import { StyleSheet,View } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import Login from "./src/screens/Login&SignUp/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

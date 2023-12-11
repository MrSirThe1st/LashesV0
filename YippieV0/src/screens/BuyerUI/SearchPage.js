import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../../componets/Search";


export default function SearchPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Search navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginVertical:10,
  },
});

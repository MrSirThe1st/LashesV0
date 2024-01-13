import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const BackArrow = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={[styles.container]}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    width: 110,
    marginLeft: 5,
    marginTop: 10,
  },
  arrow: {
    tintColor: "#1e90ff",
    marginRight: 5,
    width: 20,
    height: 20,
    transform: [{ scaleX: -1 }],
  },
  text: {
    color: "#1e90ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BackArrow;

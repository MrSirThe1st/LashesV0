import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

const SelectButton = (props) => {
  const { SignUpText, buttonText, Icon, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.square}>
        <Image style={styles.icon} source={Icon} resizeMode="contain" />
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.text}>{SignUpText}</Text>
      </View> */}
      <View style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: 180,
    marginHorizontal: 10,
    elevation: 5,
  },
  square: {
    width: 110,
    height: 25,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    width: 140,
    height: 110,
    borderRadius: 50,
    resizeMode: "contain",
  },
  textContainer: {
    marginVertical: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 35,
    marginVertical: 5,
    backgroundColor: "#1e90ff",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default SelectButton;

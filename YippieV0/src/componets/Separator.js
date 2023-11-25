import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";

const Separator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "#E5E5E5",
  },
});

export default Separator;

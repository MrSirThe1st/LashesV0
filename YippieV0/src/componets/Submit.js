import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FeatherIcon from "react-native-vector-icons/Feather";

const Submit = ({ Title, ...rest }) => {
  return (
    <View style={styles.customContent}>
      <TouchableOpacity {...rest}>
        <View style={styles.addProduct}>
          <Text style={styles.addText}>{Title}</Text>
          <FeatherIcon color="#fff" name="send" size={16} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Submit;

const styles = StyleSheet.create({
  customContent: {
    padding: 20,
    alignItems: "center",
  },
  addProduct: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  addText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
});

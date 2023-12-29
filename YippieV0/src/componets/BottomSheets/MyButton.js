import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function MyButton({ title, onPress, disabled = false }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.appButtonContainer, disabled && styles.disabled]}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#3bb3f8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 14,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  disabled: {
    opacity: 0.3,
  },
});

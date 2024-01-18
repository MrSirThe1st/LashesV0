import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

// Define the Alert2 component
const Alert3 = ({
  text,
  option,
  option1,
  onOptionPress,
  onOption1Press,
  username,
}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.alert}>
        <Text style={styles.alertTitle}>{username}</Text>
        <Text style={styles.alertMessage}>{text}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={onOptionPress} style={styles.btn}>
            <Text style={styles.btnText}>{option}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onOption1Press}
            style={styles.btnSecondary}
          >
            <Text style={styles.btnSecondaryText}>{option1}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  alert: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 8,
    width: "80%",
    maxWidth: 400,
  },
  alertAvatar: {
    width: 160,
    height: 160,
    borderRadius: 9999,
    alignSelf: "center",
    marginBottom: 24,
  },
  alertTitle: {
    marginBottom: 16,
    fontSize: 34,
    lineHeight: 44,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  alertMessage: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "#9a9a9a",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  btn: {
    flex: 1,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#FA8072",
    borderColor: "#f75249",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  btnSecondary: {
    flex: 1,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#1e90ff",
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#1e90ff",
  },
});

// Export the Alert2 component
export default Alert3;

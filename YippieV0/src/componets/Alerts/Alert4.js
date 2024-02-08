import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from "react-native";

// Define the Alert2 component
const Alert4 = ({
  text,
  option,
  option1,
  onOptionPress,
  onOption1Press,
  profileImage,
  username,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.overlay}>
      <View style={styles.alert}>
        {profileImage ? (
          <Image style={styles.alertAvatar} source={{ uri: profileImage }} />
        ) : (
          <Image style={styles.alertAvatar} />
        )}

        <Text style={styles.alertTitle}>{username}</Text>
        <Text style={styles.alertMessage}>{text}</Text>

        <View>
          <View style={styles.reauthContainer}>
            <Text style={styles.reauthLabel}>Email</Text>
            <TextInput
              style={styles.inputR}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.reauthLabel}>Password</Text>
            <TextInput
              style={styles.inputR}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
        </View>

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
  inputR: {
    height: 44,
    backgroundColor: "#EFF1F5",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginBottom: 12,
  },
  reauthLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#989898",
    marginBottom: 10,
  },
});

// Export the Alert2 component
export default Alert4;

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

export default function Example() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.alert}>
          <View style={styles.alertContent}>
            <Image
              alt=""
              style={styles.alertAvatar}
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
            />

            <Text style={styles.alertTitle}>
              Log out of
              {"\n"}
              @MarkSimmons
            </Text>

            <Text style={styles.alertMessage}>
              Are you sure you would like to log out of this account? You will
              need your password to log back in.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Yes, log me out</Text>
            </View>
          </TouchableOpacity>

          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.btnSecondary}>
                <Text style={styles.btnSecondaryText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  alert: {
    position: "relative",
    flexDirection: "column",
    alignItems: "stretch",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: 80,
  },
  alertContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#f75249",
    borderColor: "#f75249",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  btnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#f75249",
  },
});

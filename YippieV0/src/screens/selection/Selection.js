import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import SelectButton from "../../componets/SelectButton";
import Separator from "../../componets/Separator";

const Selection = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.upperContainer}>
        <View style={styles.selectButtonDiv}>
          <SelectButton
            SignUpText={`I'm a buyer`}
            buttonText={"Buyer sign up"}
            Icon={require("../../assets/homeAssets/happy.png")}
            onPress={() => {
              navigation.navigate("SignUp", { role: "buyer" });
            }}
          />
          <SelectButton
            SignUpText={`I'm a Seller`}
            buttonText={"Seller sign up"}
            Icon={require("../../assets/homeAssets/money-currency.png")}
            onPress={() => {
              navigation.navigate("Step1", { role: "seller" });
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>Let's Get Started</Text>
        <Separator />
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonummy
          ligula volutpat id, tristique libero. Aliquam in lorem sit amet leo
          accumsan luctus. Integer sodales velit tellus, ut faucibus ac, gravida
          velit. Vestibulum in mauris arcu, ut vulputate metus. Integer
          scelerisque elementum posuere.
        </Text>
        <View style={styles.bottomContainerRow}>
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.textSkip}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.textSkip}>Skip</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Selection;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafdff",
    width: "100%",
  },
  upperContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  text: {
    color: "black",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
  },
  paragraph: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 15,
    paddingHorizontal: 5,
  },
  selectButtonDiv: {
    flexDirection: "row",
  },
  imageBackground: {
    flex: 1,
  },
  bottomContainerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textSkip: {
    color: "#1e90ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

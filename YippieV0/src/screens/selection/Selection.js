import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import SelectButton from "../../componets/SelectButton";
import Separator from "../../componets/Separator";
import { Video,} from "expo-av";

const Selection = ({ navigation }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.playAsync();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Video
        ref={videoRef}
        source={require("../../../video/video4.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        volume={1.0}
        isMuted={false}
      />
      <StatusBar style="dark" />
      <View style={styles.upperContainer}>
        <View style={styles.selectButtonDiv}>
          <SelectButton
            // SignUpText={`I'm a buyer`}
            buttonText={"Buyer sign up"}
            Icon={require("../../assets/svg/all-good-4.png")}
            onPress={() => {
              navigation.navigate("SignUpStep1", { role: "buyer" });
            }}
          />
          <SelectButton
            // SignUpText={`I'm a Seller`}
            buttonText={"Seller sign up"}
            Icon={require("../../assets/svg/shop-open-3.png")}
            onPress={() => {
              navigation.navigate("Step1", { role: "seller" });
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerRow}>
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={styles.LoginBtn}
          >
            <Text style={styles.textSkip}>Login</Text>
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
    height: "10%",
  },
  text: {
    color: "black",
    fontSize: 20,
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
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  LoginBtn: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 35,
    marginVertical: 5,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

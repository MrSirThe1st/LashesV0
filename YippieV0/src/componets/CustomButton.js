import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomButton = ({
  flatListRef,
  flatListIndex,
  dataLength,
  navigation,
}) => {
  const handleOnboardingCompletion = async () => {
    try {
      // Set onboarding status to completed in AsyncStorage
      await AsyncStorage.setItem("onboardingCompleted", "true");
      console.log("Onboarding completed");
    } catch (error) {
      console.error("Error setting onboarding status:", error);
    }
  };
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  const handleButtonPress = () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      handleOnboardingCompletion();
      navigation.navigate("Selection");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handleButtonPress}>
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get started
        </Animated.Text>
        <Animated.Image
          source={require("../assets/icons/ArrowIcon.png")}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
  },
});

export default CustomButton;

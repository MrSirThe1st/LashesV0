import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";

const Toast = ({ message, onDismiss }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    translateY.value = withTiming(0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });

    const timeout = setTimeout(() => {
      hideToast();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const hideToast = () => {
    opacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    translateY.value = withTiming(-20, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    setTimeout(() => {
      onDismiss();
    }, 500);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle]}>
      <Ionicons name="checkmark-circle" size={24} color="#fff" />
      <View style={styles.TextContainer}>
        <Text style={styles.toastText}>{message}</Text>
        <TouchableOpacity onPress={hideToast}>
          <Icon name="close" size={24} color="#F6F4F4" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: 20,
    position: "absolute",
    shadowColor: "#eaf5ff",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    backgroundColor: "#1e90ff",
    borderRadius: 12,
    padding: 15,
    left: "15%",
  },
  toastContainer1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toastText: {
    color: "#F6F4F4",
    fontWeight: "bold",
    marginLeft: 10,
  },
  TextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  close: {
    top: -10, // Adjust as needed
    right: -10,
  },
});


export default Toast;

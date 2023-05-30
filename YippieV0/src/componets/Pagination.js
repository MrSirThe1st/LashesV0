import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";

const Pagination = ({ data, x, screenWidth }) => {
  const PaginationComp = ({ i }) => {
    const AnimatedDotStyle = useAnimatedStyle(() => {
        const widthAnimation = interpolate(
            x.value,
            [
                (i - 1)*screenWidth, i * screenWidth, (i + 1) * screenWidth
            ],
            [10, 20, 10],
            Extrapolate.CLAMP,
        );
        const opacityAnimation = interpolate(
            x.value,
            [
                (i - 1)*screenWidth, i * screenWidth, (i + 1) * screenWidth
            ],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP,
        );
        return {
            width: widthAnimation,
            opacity: opacityAnimation,
        }
    })
    return <Animated.View style={[styles.dots,AnimatedDotStyle]} />;
  };
  return (
    <View style={styles.PaginationContainer}>
      {data.map((_, i) => {
        return <PaginationComp i={i} key={i} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  PaginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dots: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

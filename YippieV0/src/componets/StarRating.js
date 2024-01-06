import React, { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tailwind from "twrnc";

/**
 * React Native star rating component built with Tailwind CSS
 */
export const StarRating = ({
  starRating,
  onChange,
  scale = 5,
  showLabel = false,
  label,
  selectedStarStyle,
  unselectedStarStyle,
  starSize = 32,
  customIcon,
  labelStyle,
  customLabel,
  containerStyle,
  starContainerStyle,
}) => {
  const animatedButtonScale = new Animated.Value(1);

  const starRatingOptions = Array.from(Array(scale).keys()).map((i) => i + 1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  const getLabel = () => {
    if (customLabel) {
      return customLabel();
    }

    const defaultLabel =
      Platform.OS === "web" ? "Click to rate" : "Tap to rate";

    return (
      <Text
        style={[
          tailwind`text-xl font-bold text-gray-950 dark:text-gray-50`,
          labelStyle,
        ]}
      >
        {starRating ? `${starRating}*` : `${label || defaultLabel}`}
      </Text>
    );
  };

  return (
    <View style={[tailwind`flex flex-col items-center gap-3`, containerStyle]}>
      {showLabel ? getLabel() : null}
      <View style={[tailwind`flex flex-row gap-1`, starContainerStyle]}>
        {starRatingOptions.map((option) => (
          <TouchableWithoutFeedback
            onPressIn={() => handlePressIn()}
            onPressOut={() => handlePressOut()}
            onPress={() => onChange(option)}
            key={`sr-option-${option}`}
          >
            <Animated.View style={animatedScaleStyle}>
              {customIcon ? (
                customIcon(starRating >= option)
              ) : (
                <MaterialIcons
                  name={starRating >= option ? "star" : "star-border"}
                  size={starSize}
                  style={
                    starRating >= option
                      ? [tailwind`text-yellow-400`, selectedStarStyle]
                      : [tailwind`text-yellow-400`, unselectedStarStyle]
                  }
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

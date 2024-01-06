import React from "react";
import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tailwind from "twrnc";

const StarRatingDisplay = ({
  rating,
  starSize = 20,
  filledColor = "#FFD700",
  emptyColor = "#D3D3D3",
}) => {
  const stars = Array.from({ length: 5 }).map((_, index) => (
    <MaterialIcons
      key={index}
      name={index < rating ? "star" : "star-border"}
      size={starSize}
      style={
        index < rating
          ? [tailwind`text-yellow-400`, filledColor]
          : [tailwind`text-yellow-400`, emptyColor]
      }
    />
  ));

  return <View style={tailwind`flex flex-row gap-1`}>{stars}</View>;
};

export default StarRatingDisplay;

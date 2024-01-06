import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Stars = ({ averageRating }) => {
  return (
    <View style={styles.headerRow}>
      <View style={styles.headerStars}>
        <FontAwesome color="#FFC107" name="star" solid={true} size={20} />
        <Text style={styles.headerStarsText}>{averageRating}</Text>
      </View>
    </View>
  );
};

export default Stars;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  headerStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerStarsText: {
    marginLeft: 8,
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 20,
    color: "#7b7c7e",
  },
});

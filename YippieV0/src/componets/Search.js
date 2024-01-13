import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default function Search({ navigation, sellerData }) {
  const handleSearchPress = () => {
    navigation.navigate("SearchPage", { sellerData });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleSearchPress}
        style={styles.SearchContainer}
      >
        <Icon name="search" size={28} color="grey" style={styles.Icon} />
        <Text style={styles.input}>Search for sellers</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 12,
    justifyContent: "space-between",
    elevation: 3,
  },
  input: {
    flex: 1,
    color: "grey",
    fontSize: 16,
  },
  Icon: {
    marginRight: 10,
    color: "blue",
  },
});

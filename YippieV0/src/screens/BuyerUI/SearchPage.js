import React, { useState, useRef, Text } from "react";
import { View, StyleSheet, TextInput, FlatList, Pressable } from "react-native";
import { CardItem } from "../../componets/CardItem";
import debounce from "lodash/debounce";
import { useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";

export default function SearchPage({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const route = useRoute();
  const [filteredSellers, setFilteredSellers] = useState([]);
  const { sellerData } = route.params;
  const textInput = useRef(null);

  const debouncedSearch = debounce((text) => handleSearch(text), 300);

  const handleSearch = (text) => {
    const lowerCaseSearchText = text.toLowerCase();

    if (sellerData) {
      const filtered = sellerData.filter(
        (seller) =>
          seller.username.toLowerCase().includes(lowerCaseSearchText) ||
          seller.category.label.toLowerCase().includes(lowerCaseSearchText) ||
          seller.address.toLowerCase().includes(lowerCaseSearchText)
      );
      setFilteredSellers(filtered);
    } else {
      console.error("Seller data is undefined.");
      setFilteredSellers([]);
    }
  };

  const handleChangeText = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.SearchContainer}>
        <Icon name="search" size={28} color="grey" style={styles.Icon} />
        <TextInput
          style={{ width: "90%" }}
          placeholder="Search for sellers"
          autoFocus={false}
          ref={textInput}
          onChangeText={handleChangeText}
          value={searchText}
          returnKeyType="done"
        />
      </View>

      {/* Display filtered sellers using FlatList */}
      <FlatList
        data={filteredSellers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("AccountInfo", { seller: item })}
          >
            <CardItem seller={item} navigation={navigation} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  TextInput: {
    borderRadius: 5,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fafdff",
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
    elevation: 2,
  },
});

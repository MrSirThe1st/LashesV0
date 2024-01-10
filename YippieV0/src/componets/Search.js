import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import { services } from "./Data";
import filter from "lodash/filter";
import { CardItem } from "./CardLists";


export default function Search({ navigation, sellerData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputFocused, setTextInputFocused] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]); // Added data state
  const textInput = useRef(null);

  const contains = (seller, query) => {
    const { username = "", category = { label: "" }, address = "" } = seller;
    const normalizedQuery = query.toLowerCase();

    return (
      username.toLowerCase().includes(normalizedQuery) ||
      category.label.toLowerCase().includes(normalizedQuery) ||
      address.toLowerCase().includes(normalizedQuery)
    );
  };


  const handleSearch = (text) => {
    setSearchText(text);

    const sellerSuggestions = filter(sellerData, (seller) => {
      return contains(seller, text);
    });

    setData(sellerSuggestions);
  };

  const renderSuggestions = () => {
    if (searchText === "") {
      return null;
    }

    const serviceSuggestions = filter(services, (item) =>
      contains(item, searchText)
    );

    const sellerSuggestions = filter(sellerData, (item) =>
      contains(item, searchText)
    );

    const combinedSuggestions = [...serviceSuggestions, ...sellerSuggestions];

    return (
      <FlatList
        data={combinedSuggestions}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              if (item.serviceName) {
                // Handle service suggestion
                navigation.navigate("CategoryScreen", {
                  service: { name: item.serviceName },
                });
              } else {
                // Handle seller suggestion
                navigation.navigate("AccountInfo", {
                  seller: item,
                });
              }
              setModalVisible(false);
              setTextInputFocused(true);
              setSearchText(""); // Clear the search text after selecting a suggestion
            }}
          >
            <CardItem seller={item} navigation={navigation} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => (item.serviceId || item.uid).toString()}
      />
    );
  };



  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.SearchContainer}>
          <Icon name="search" size={28} color="grey" style={styles.Icon} />
          <Text style={styles.input}>Search for sellers</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.view1}>
            <View style={styles.TextInput}>
              <Animatable.View
                animation={textInputFocused ? "fadeInRight" : "fadeInLeft"}
                duration={400}
              >
                <Icon
                  name={textInputFocused ? "arrow-back" : "search"}
                  onPress={() => {
                    if (textInputFocused) setModalVisible(false);
                    setTextInputFocused(true);
                  }}
                  style={styles.icon2}
                  type="material"
                  iconStyle={{ marginRight: 5, color: "grey" }}
                />
              </Animatable.View>

              <TextInput
                style={{ width: "90%" }}
                placeholder=""
                autoFocus={false}
                ref={textInput}
                onFocus={() => {
                  setTextInputFocused(true);
                }}
                onBlur={() => {
                  setTextInputFocused(false);
                }}
                onChangeText={handleSearch}
              ></TextInput>

              <Animatable.View
                animation={textInputFocused ? "fadeInLeft" : ""}
                duration={400}
              >
                <Icon
                  name={textInputFocused ? "cancel" : null}
                  iconStyle={styles.icon3}
                  type="material"
                  style={{ marginRight: -10 }}
                  onPress={() => {
                    textInput.current.clear();
                    handleSearch("");
                  }}
                />
              </Animatable.View>
            </View>
          </View>

          {renderSuggestions()}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafdff",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 12,
    justifyContent: "space-between",
    elevation:2
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
  text1: {
    color: "grey",
    fontSize: 16,
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

  SearchArea: {
    marginTop: 10,
    width: "94%",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: {
    fontSize: 24,
    padding: 5,
    color: "grey",
  },

  view1: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  view2: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },

  icon2: { fontSize: 24, padding: 5, color: "grey" },
  modal: {
    flex: 1,
  },
  icon3: {
    color: "grey",
  },
  suggestionItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
});

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

export default function Search({ navigation }) {
  const [data, setData] = useState([...services]);
  const [modalVisible, setModalVisible] = useState(false);
  const [textInputFocused, setTextInputFocused] = useState(true);
  const textInput = useRef(0);
  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    const dataS = filter(services, (userSearch) => {
      return contains(userSearch, text);
    });

    setData([...dataS]);
  };
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.SearchContainer}>
          <Icon name="search" size={28} color="grey" style={styles.Icon} />
          <Text style={styles.input}>Search for services</Text>
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
                    handleSearch();
                  }}
                />
              </Animatable.View>
            </View>
          </View>

          <FlatList
            data={services}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss;
                  navigation.navigate("CategoryScreen", {
                    service: { name: item.name }, // Wrap the service name in an object
                  });
                  setModalVisible(false);
                  setTextInputFocused(true);
                }}
              >
                <View style={styles.view2}>
                  <Icon
                    name="search"
                    size={20}
                    color="grey"
                    style={styles.Icon}
                  />
                  <Text style={{}}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
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
});

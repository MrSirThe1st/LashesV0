import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet, ListItem } from "react-native-elements";


const Modal5 = () => {

  const [isVisible, setIsVisible] = useState(false);

  const list = [
    { title: "List Item 1" },
    { title: "List Item 2" },
    {
      title: "Close",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <View style={styles.row}>
          <View style={[styles.rowIcon]}>
            <FeatherIcon color="#8e8d91" name="flag" size={18} />
          </View>

          <Text style={styles.rowLabel}>Report Bug</Text>

          <View style={styles.rowSpacer} />
        </View>
      </TouchableOpacity>
      <BottomSheet isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

export default Modal5;

const styles = StyleSheet.create({
  modal: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 12,
    elevation: 1,
  },

  rowIconClose: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",

    right: -330,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

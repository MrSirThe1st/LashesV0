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


const Modal3 = ({navigation}) => {

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <View style={styles.row}>
          <View style={[styles.rowIcon]}>
            <FeatherIcon color="#dc143c" name="heart" size={18} />
          </View>

          <Text style={styles.rowLabel}>Favourites</Text>

          <View style={styles.rowSpacer} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Modal3;

const styles = StyleSheet.create({
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

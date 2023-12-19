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

const Edit = ({navigation}) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("EditAccount")}>
        <View style={styles.row}>
          <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
            <MaterialCommunityIcons
              color="#1e90ff"
              name="account-circle-outline"
              size={24}
            />
          </View>

          <Text style={styles.rowLabel}>Edit Account</Text>

          <View style={styles.rowSpacer} />
          {/* Additional elements based on type */}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Edit;

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

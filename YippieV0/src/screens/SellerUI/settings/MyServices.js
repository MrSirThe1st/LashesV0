import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import Product from "../../../componets/Product";
import Service from "../../../componets/Service";
import { SafeAreaView } from "react-native-safe-area-context";

const MyServices = ({ navigation }) => {
  
  return (
    <ScrollView style={styles.Content} showsVerticalScrollIndicator={false}>
      <View style={styles.RowContainer}>
        <View style={styles.customContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddService");
            }}
          >
            <View style={styles.addProduct}>
              <Text style={styles.addText}>Add a service</Text>
              <FeatherIcon color="#fff" name="plus" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Service />
      </View>

      <TouchableOpacity onPress={() => pressHandler()}></TouchableOpacity>
    
    </ScrollView>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  addProduct: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  addText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  Content: {
    flex: 1,
    backgroundColor:'#fff',
    paddingVertical:5
  },
  customContent: {
    padding: 20,
  },
  RowContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

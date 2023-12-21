import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useRef } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import Product from "../../../componets/Product";


const MyServices = ({ navigation }) => {
  const bottomSheetRef = useRef(null);

  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

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
          <Product />
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

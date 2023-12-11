import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

const Orders = () => {
  const hasOrders = false; 

  return (
    <ScrollView style={styles.container}>
      {hasOrders ? (
        <View>
          <Text>Your orders content goes here</Text>
        </View>
      ) : (
        // Render empty state when there are no orders
        <View style={styles.empty}>
          <FeatherIcon color="#1e90ff" name="box" size={36} />

          <Text style={styles.emptyTitle}>No orders</Text>

          <Text style={styles.emptyDescription}>
            Your orders will appear here
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: "#878787",
    marginBottom: 24,
  },
});

export default Orders;

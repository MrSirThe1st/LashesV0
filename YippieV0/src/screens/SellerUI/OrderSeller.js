import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FIRESTORE_DB } from "../../config/firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebase"; 

const OrderSeller = () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = FIREBASE_APP;

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const sellerOrdersCollection = collection(FIRESTORE_DB, "Orders");
          const q = query(
            sellerOrdersCollection,
            where("sellerID", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const sellerOrders = [];
          querySnapshot.forEach((doc) => {
            const orderData = doc.data();
            sellerOrders.push(orderData);
          });
          setSellerOrders(sellerOrders);
        }
      } catch (error) {
        console.error("Error fetching seller orders: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSellerOrders();
  }, []); 

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : sellerOrders.length > 0 ? (
        <View>
          {/* Render sellerOrders content here */}
          {sellerOrders.map((order, index) => (
            <Text key={index}>{/* Render order details */}</Text>
          ))}
        </View>
      ) : (
        // Render empty state when there are no orders
        <View style={styles.empty}>
          <FeatherIcon color="#1e90ff" name="box" size={36} />

          <Text style={styles.emptyTitle}>You have no orders</Text>

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

export default OrderSeller;

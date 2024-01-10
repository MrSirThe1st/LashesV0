import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Orders = () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(FIREBASE_APP);

  const fetchSellerOrders = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const sellerOrdersCollection = collection(FIRESTORE_DB, "Orders");
        const q = query(
          sellerOrdersCollection,
          where("customerID", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        const ordersData = [];
        querySnapshot.forEach((doc) => {
          const orderData = { id: doc.id, ...doc.data() };
          ordersData.push(orderData);
        });

        setSellerOrders(ordersData);
      }
    } catch (error) {
      console.error("Error fetching seller orders: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        fetchSellerOrders(user);
      } else {
        console.error("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : sellerOrders.length > 0 ? (
        <View>
          {sellerOrders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.orderTitle}>
                  Order Number #{order.orderNumber}
                </Text>
              </View>

              {order.products.map((product, productIndex) => (
                <View key={productIndex} style={styles.productContainer}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: product.img }}
                    style={styles.cardImg}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text>{product.label}</Text>
                      <Text>{product.price}</Text>
                      <Text>Quantity {product.quantity}</Text>
                    </View>

                    <View>
                      <Text>{product.totalPrice}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <View
                style={{
                  alignItems: "flex-end",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.orderTotal}>Total</Text>
                {/* <Pressable
                  style={styles.row}
                  onPress={() => deleteDocument(index)}
                >
                  <View style={[styles.rowIcon]}>
                    <MaterialCommunityIcons
                      name="delete-forever"
                      size={24}
                      color="#1e90ff"
                    />
                  </View>
                </Pressable> */}
                <Text style={styles.orderTotal}>{order.totalPrice}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
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

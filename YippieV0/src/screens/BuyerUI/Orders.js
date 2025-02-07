import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FIRESTORE_DB } from "../../config/firebase";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";

const Orders = () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(FIREBASE_APP);

  const fetchBuyerOrders = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const sellerOrdersCollection = collection(FIRESTORE_DB, "Orders");
        const q = query(
          sellerOrdersCollection,
          where("customerID", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const ordersData = [];
          snapshot.forEach((doc) => {
            const orderData = { id: doc.id, ...doc.data() };
            ordersData.push(orderData);
          });

          setSellerOrders(ordersData);
          setLoading(false);
        });

        return unsubscribe; // This will be used to unsubscribe when the component unmounts
      }
    } catch (error) {
      console.error("Error fetching seller orders: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        fetchBuyerOrders(user);
      } else {
        console.error("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteDocument = async (orderIndex) => {
    try {
      const orderToDelete = sellerOrders[orderIndex];

      if (orderToDelete) {
        const orderId = orderToDelete.id;
        if (orderId) {
          // Show an alert for confirmation
          Alert.alert(
            "Delete Order",
            "Are you sure you want to delete this order?",
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async () => {
                  try {
                    await deleteDoc(doc(FIRESTORE_DB, "Orders", orderId));
                    // Remove the deleted order from the local state
                    setSellerOrders((prevOrders) =>
                      prevOrders.filter((order, index) => index !== orderIndex)
                    );
                  } catch (error) {
                    console.log("Error deleting the document:", error);
                  }
                },
              },
            ]
          );
        } else {
          console.error("Document ID not found in the order data");
        }
      } else {
        console.error("Invalid order");
      }
    } catch (error) {
      console.log("Error deleting the document:", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : sellerOrders && sellerOrders.length > 0 ? (
        <View>
          {sellerOrders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.orderTitle}>{order.sellerName}</Text>
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
                <View
                  style={[
                    styles.orderStatus,
                    {
                      backgroundColor:
                        order.status === "COMPLETED" ? "#66bb6a" : "#e0e0e0",
                    },
                  ]}
                >
                  <Text style={styles.orderStatusText}>{order.status}</Text>
                </View>

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
    backgroundColor: "#FAFAFA",
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
  orderContainer: {
    padding: 16,
    backgroundColor: "white",
    elevation: 2,
    margin: 10,
    borderRadius: 12,
  },
  orderTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  productContainer: {
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
  },
  productLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  productQuantity: {
    fontSize: 14,
    color: "#888",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 10,
  },
  orderTotal: {
    fontWeight: "bold",
  },
  orderStatus: {
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  orderStatusText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Orders;

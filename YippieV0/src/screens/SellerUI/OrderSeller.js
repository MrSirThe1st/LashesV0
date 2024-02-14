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
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";
import * as Linking from "expo-linking";
import { FontAwesome } from "@expo/vector-icons";

const OrderSeller = () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(FIREBASE_APP);
  const [completedOrders, setCompletedOrders] = useState([]);

  const fetchSellerOrders = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const sellerOrdersCollection = collection(FIRESTORE_DB, "Orders");
        const q = query(
          sellerOrdersCollection,
          where("sellerID", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const ordersData = [];
          const completedOrdersData = [];

          querySnapshot.forEach((doc) => {
            const orderData = { id: doc.id, ...doc.data() };
            ordersData.push(orderData);
            if (orderData.status === "COMPLETED") {
              completedOrdersData.push(orderData.id);
            }
          });

          setSellerOrders(ordersData);
          setCompletedOrders(completedOrdersData);
          setLoading(false);
        });

        return unsubscribe; 
      }
    } catch (error) {
      console.error("Error fetching seller orders: ", error);
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

  // const deleteDocument = async (orderIndex) => {
  //   try {
  //     const orderToDelete = sellerOrders[orderIndex];

  //     if (orderToDelete) {
  //       const orderId = orderToDelete.id;
  //       if (orderId) {
  //         // Show an alert for confirmation
  //         Alert.alert(
  //           "Delete Order",
  //           "Are you sure you want to delete this order?",
  //           [
  //             {
  //               text: "No",
  //               style: "cancel",
  //             },
  //             {
  //               text: "Yes",
  //               onPress: async () => {
  //                 try {
  //                   await deleteDoc(doc(FIRESTORE_DB, "Orders", orderId));
  //                   // Remove the deleted order from the local state
  //                   setSellerOrders((prevOrders) =>
  //                     prevOrders.filter((order, index) => index !== orderIndex)
  //                   );
  //                 } catch (error) {
  //                   console.log("Error deleting the document:", error);
  //                 }
  //               },
  //             },
  //           ]
  //         );
  //       } else {
  //         console.error("Document ID not found in the order data");
  //       }
  //     } else {
  //       console.error("Invalid order");
  //     }
  //   } catch (error) {
  //     console.log("Error deleting the document:", error);
  //   }
  // };

  const markAsCompleted = async (orderIndex) => {
    try {
      const orderToUpdate = sellerOrders[orderIndex];

      if (orderToUpdate) {
        const orderId = orderToUpdate.id;

        if (orderId) {
          // Update the order status to "completed"
          await updateDoc(doc(FIRESTORE_DB, "Orders", orderId), {
            status: "COMPLETED",
          });

          // Update the local state to reflect the change
          setSellerOrders((prevOrders) =>
            prevOrders.map((order, index) =>
              index === orderIndex ? { ...order, status: "COMPLETED" } : order
            )
          );

          // Update the completedOrders array
          setCompletedOrders((prevCompletedOrders) => [
            ...prevCompletedOrders,
            orderId,
          ]);
        } else {
          console.error("Document ID not found in the order data");
        }
      } else {
        console.error("Invalid order");
      }
    } catch (error) {
      console.log("Error updating the document:", error);
    }
  };

  const openWhatsAppChat = async (order) => {
    const PhoneNumber = order.buyerCellphone;

    const message = `Hello ${order.customerUsername}`;

    const deepLink = `https://wa.me/${PhoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    try {
      await Linking.openURL(deepLink);
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : sellerOrders.length > 0 ? (
        <View>
          {sellerOrders
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((order, index) => (
              <View key={index} style={styles.orderContainer}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Text style={styles.orderTitle}>
                      {order.customerUsername}
                    </Text>
                    <Pressable
                      style={styles.Chat}
                      onPress={() => openWhatsAppChat(order)}
                    >
                      <View style={styles.Chatbtn}>
                        <Text style={styles.ChatbtnText}>Contact</Text>
                        <FontAwesome
                          name="whatsapp"
                          size={16}
                          color="#25D366"
                        />
                      </View>
                    </Pressable>
                  </View>

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
                  <Pressable
                    onPress={() => markAsCompleted(index)}
                    disabled={completedOrders.includes(order.id)}
                    style={[
                      styles.CompletedStatus,
                      {
                        backgroundColor: completedOrders.includes(order.id)
                          ? "#d3d3d3"
                          : "#a5d6b8",
                      },
                    ]}
                  >
                    <Text style={styles.CompletedStatusText}>
                      Mark as completed
                    </Text>
                  </Pressable>
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
    fontSize: 18,
    fontWeight: "600",
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
  CompletedStatus: {
    borderRadius: 5,
    backgroundColor: "#a5d6b8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  CompletedStatusText: {
    color: "#fff",
    fontWeight: "bold",
  },
  Chatbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#25D366",
    marginVertical: 4,
  },
  ChatbtnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    marginRight: 4,
    fontSize: 13,
    color: "#25D366",
  },
});

export default OrderSeller;

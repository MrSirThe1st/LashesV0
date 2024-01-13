import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  StatusBar
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
} from "firebase/firestore";
import { FIREBASE_APP } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";

const OrderSeller = () => {
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
         where("sellerID", "==", user.uid)
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
                <Pressable
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
    margin: 15,
    borderRadius: 12,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  productContainer: {
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginRight: 8,
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
    paddingVertical: 5,
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 10,
  },
});

export default OrderSeller;

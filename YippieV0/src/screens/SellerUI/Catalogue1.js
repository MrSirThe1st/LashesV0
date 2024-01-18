import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "../../componets/Toast";

const Catalogue1 = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState([]);
  const route = useRoute();
  const { seller } = route.params;
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;
  const [currentUserUID, setCurrentUserUID] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sellerId = route.params.seller.uid;

        const servicesCollection = collection(FIRESTORE_DB, "users");
        const q = query(servicesCollection, where("uid", "==", sellerId));
        const querySnapshot = await getDocs(q);

        const servicesData = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userProducts = userData.services || [];

          userProducts.forEach((service, index) => {
            servicesData.push({
              index,
              img:
                service.images && service.images.length > 0
                  ? service.images[0]
                  : "",
              label: service.name || "",
              ordered: 0,
              likes: 0,
              price: service.price || 0,
            });
          });
        });

        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [route.params.seller]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setCurrentUserUID(user.uid);
      } else {
        setCurrentUserUID(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleIncrement = (productIndex) => {
    setCart((prevCart) => {
      const newCart = {
        ...prevCart,
        [productIndex]: (prevCart[productIndex] || 0) + 1,
      };
      console.log("Updated Cart:", newCart);
      return newCart;
    });
  };

  const handleDecrement = (productIndex) => {
    setCart((prevCart) => {
      const newCart = {
        ...prevCart,
        [productIndex]: Math.max((prevCart[productIndex] || 0) - 1, 0),
      };
      console.log("Updated Cart:", newCart);
      return newCart;
    });
  };

  const addOrder = async () => {
    try {
      console.log("Cart Before Order:", cart);
      const orderedServices = services
        .map((item, index) => ({
          ...item,
          quantity: cart[index] || 0,
          totalPrice: (cart[index] || 0) * item.price,
        }))
        .filter((item) => item.quantity > 0);

      const userQuery = query(
        collection(FIRESTORE_DB, "users"),
        where("uid", "==", currentUserUID)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.size !== 1) {
        console.error("Error finding user document.");
        return;
      }

      const userData = userSnapshot.docs[0].data();
      const username = userData.username;

      const order = {
        orderNumber: Math.floor(Math.random() * 100000),
        products: orderedServices,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
        customerID: currentUserUID,
        sellerID: seller.uid,
        sellerName: seller.username,
        customerUsername: username,
      };

      // Wait for the order to be added
      await addDoc(collection(FIRESTORE_DB, "Orders"), order);

      // Order added successfully, now reset the cart
      setCart({});
      console.log("Cart:", cart);
      console.log("Services:", services);
      console.log("Ordered Services:", orderedServices);

      setShowSuccessToast(true);
    } catch (error) {
      console.error("Error adding order: ", error);
      // Handle error
    }
  };

  // Add this useEffect to log the cart after it has been updated
  useEffect(() => {
    console.log("Cart After Order:", cart);
  }, [cart]);

  const renderProductItem = ({ item }) => {
    return (
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate("ProductDescription", {
              seller,
              selectedProduct: item,
            })
          }
        >
          <View style={styles.card}>
            <Image
              alt=""
              resizeMode="cover"
              source={{ uri: item.img }}
              style={styles.cardImg}
            />

            <View style={styles.cardBody}>
              <Text
                numberOfLines={1}
                style={styles.cardTitle}
                ellipsizeMode="tail"
              >
                {item.label}
              </Text>
              <Text style={styles.cardPrice}>
                R{item.price.toLocaleString("en-US")}
              </Text>
            </View>
          </View>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            elevation: 1,
            width: 100,
            marginBottom: 10,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            marginHorizontal: 10,
            justifyContent: "center",
          }}
        >
          <Pressable
            onPress={() => handleDecrement(item.index)}
            disabled={!cart[item.index]}
          >
            <Text
              style={{
                fontSize: 25,
                color: cart[item.index] ? "#1e90ff" : "white",
                paddingHorizontal: 10,
              }}
            >
              -
            </Text>
          </Pressable>

          <Text
            style={{
              fontSize: 17,
              color: cart[item.index] ? "#1e90ff" : "white",
            }}
          >
            {cart[item.index]}
          </Text>

          <Pressable onPress={() => handleIncrement(item.index)}>
            <Text
              style={{
                fontSize: 20,
                color: "#1e90ff",
                paddingHorizontal: 10,
              }}
            >
              +
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const totalQuantity = Object.values(cart).reduce(
    (total, quantity) => total + (quantity || 0),
    0
  );

  const totalPrice = services.reduce(
    (total, item, index) => total + (cart[index] || 0) * (item.price || 0),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.overlay}>
        <View style={styles.OverlayTotal}>
          <Text
            style={{
              fontSize: 17,
              color: totalQuantity !== 0 ? "#1e90ff" : "white",
            }}
          >
            {totalQuantity}
          </Text>
          {/* <Text
            style={{
              fontSize: 17,
              color: totalPrice !== 0 ? "#1e90ff" : "white",
              paddingHorizontal: 10,
            }}
          >
            R{totalPrice.toLocaleString("en-US")}
          </Text> */}
        </View>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => {
              addOrder();
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Send order request</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {showSuccessToast && (
        <Toast
          message="Your order Request has been sent"
          onDismiss={() => setShowSuccessToast(false)}
        />
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Catalogue1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  flatListContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    elevation: 1,
    width: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    height: 120,
    width: 100,
    height: 100,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 6,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#173153",
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: "#000",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -6,
    marginTop: 10,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#1e90ff",
    borderColor: "#1e90ff",
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
  },
  OverlayTotal: {
    marginTop: 5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
  },
});

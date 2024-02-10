import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Alert,
  ActivityIndicator
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import { collection, getDocs, where, query, onSnapshot, updateDoc } from "firebase/firestore";
import { Divider } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Toast from "./Toast";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

   const showSuccessToast = (message) => {
     setToastMessage(message);
     setToastVisible(true);
     setTimeout(() => {
       setToastVisible(false);
     }, 3000); // Adjust the duration as needed
   };

   const showErrorToast = (message) => {
     setToastMessage(message);
     setToastVisible(true);
     setTimeout(() => {
       setToastVisible(false);
     }, 3000); // Adjust the duration as needed
   };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const productsCollection = collection(FIRESTORE_DB, "users");
        const q = query(productsCollection, where("uid", "==", userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const productsData = [];
          snapshot.forEach((doc) => {
            const userData = doc.data();
            const userProducts = userData.products || [];

            userProducts.forEach((product) => {
              productsData.push({
                img:
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "",
                label: product.name || "",
                price: product.price || 0,
                description: product.description || "",

              });
            });
          });

          setProducts(productsData);
        });

        return () => unsubscribe(); 
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productIndex) => {
    try {
      if (productIndex >= 0 && productIndex < products.length) {
        const shouldDelete = await showDeleteConfirmationAlert();

        if (shouldDelete) {
          const user = FIREBASE_AUTH.currentUser;
          const userId = user.uid;

          const servicesCollectionRef = collection(FIRESTORE_DB, "users");
          const q = query(servicesCollectionRef, where("uid", "==", userId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userProducts = userDoc.data().products || [];

            setLoading(true);
            // Delete the service from the array in Firestore
            userProducts.splice(productIndex, 1);
            await updateDoc(userDoc.ref, { products: userProducts });

            // Remove the deleted service from the local state
            setProducts((prevProducts) =>
              prevProducts.filter((product, index) => index !== productIndex)
            );

            // Show success toast
            showSuccessToast("Service deleted successfully!");
          } else {
            console.error("User document not found");
          }
        }
      } else {
        console.error("Invalid service index");
      }
    } catch (error) {
      console.error("Error deleting service: ", error);
      // Show error toast if needed
      showErrorToast("Error deleting service");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirmationAlert = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Delete Service",
        "Are you sure you want to delete this service?",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {products.map(
          ({ img, label, ordered, likes, price, description }, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}
              >
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <View style={styles.card}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={{ uri: img }}
                      style={styles.cardImg}
                    />

                    <View style={styles.cardBody}>
                      <Text numberOfLines={1} style={styles.cardTitle}>
                        {label}
                      </Text>
                      <View style={styles.cardRow}>
                        <View style={styles.cardRowItem}>
                          <Text
                            style={styles.cardRowItemText}
                            numberOfLines={1}
                          >
                            {description}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cardPrice}>
                        {price.toLocaleString("en-US")}
                      </Text>
                    </View>
                    <View style={styles.menu}>
                      <View style={styles.contentContainer}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate("EditProduct", {
                              img: products[index].img,
                              label: products[index].label,
                              price: products[index].price,
                              description: products[index].description,
                            })
                          }
                          style={styles.row}
                        >
                          <View style={[styles.rowIcon]}>
                            <FeatherIcon
                              color="#1e90ff"
                              name="edit-3"
                              size={22}
                            />
                          </View>
                        </Pressable>
                        <Pressable
                          style={styles.row}
                          onPress={() => deleteProduct(index)}
                        >
                          <View style={[styles.rowIcon]}>
                            <MaterialCommunityIcons
                              name="delete-forever"
                              size={22}
                              color="#1e90ff"
                            />
                          </View>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        )}
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}
      {toastVisible && (
        <Toast
          message={toastMessage}
          onDismiss={() => setToastVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  card: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  cardWrapper: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "#e6e7e8",
  },
  cardImg: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 16,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 4,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    color: "#222",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: -6,
  },
  cardRowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  cardRowItemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#173153",
    marginLeft: 4,
  },
  cardPrice: {
    fontSize: 19,
    fontWeight: "700",
    color: "#173153",
  },
  menu: {
    justifyContent: "center",
  },
  menuContainer: {
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    backgroundColor: "white",
    padding: 2,
  },
  rowIcon: {
    height: 32,
    borderRadius: 9999,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

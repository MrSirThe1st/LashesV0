import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import Swiper from "react-native-swiper";
import { useRoute } from "@react-navigation/native";

const ProductDescription = () => {
  const [products, setProducts] = useState([]);

  const route = useRoute();
  const { seller } = route.params;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const productsCollection = collection(FIRESTORE_DB, "users");
        const q = query(productsCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        const productsData = [];

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userProducts = userData.products || [];

          userProducts.forEach((product) => {
            productsData.push({
              img:
                product.images && product.images.length > 0
                  ? product.images[0]
                  : "",
              label: product.name || "",
              ordered: 0,
              likes: 0,
              price: product.price || 0,
              description: product.description || "",
            });
          });
        });

        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.photos}>
          <Swiper
            renderPagination={(index, total) => (
              <View style={styles.photosPagination}>
                <Text style={styles.photosPaginationText}>
                  {index + 1} / {total}
                </Text>
              </View>
            )}
          >
            {products.map((product, index) => (
              <Image
                alt=""
                key={index}
                source={{ uri: product.img }}
                style={styles.photosImg}
              />
            ))}
          </Swiper>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Image
                source={{}}
                style={styles.avatarImg}
              />
            </View>
            <View style={styles.profileBody}>
              <Text style={styles.profileTitle}>{seller.username}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.profileDescription}>
              {products.length > 0 ? products[0].label : ""}
            </Text>
            <View style={styles.about}>
              <Text style={styles.aboutDescription}>
                {products.length > 0 ? products[0].description : ""}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.overlay}>
        <View style={styles.btnGroup}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Join Seller</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 6 }}
          >
            <View style={styles.btnPrimary}>
              <Text style={styles.btnPrimaryText}>Add To Cart</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -6,
    marginTop: 18,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#1e90ff",
  },
  container: {
    paddingVertical: 5,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "white",
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  profileContainer: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 14,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#121a26",
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#778599",
  },
  profileDescription: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 18,
    paddingVertical: 5,
  },

  stats: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  statsItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#1e90ff",
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#778599",
  },

  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#fff",
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

  avatar: {
    position: "relative",
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#1e90ff",
  },
  avatarNotification: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 0,
    right: -2,
    width: 21,
    height: 21,
    backgroundColor: "#22C55E",
  },
  photos: {
    marginTop: 12,
    position: "relative",
    height: 250,
    overflow: "hidden",
  },
  photosPagination: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fbfbfb",
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: "100%",
    height: 250,
  },

  aboutDescription: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 20,
    color: "#7b7c7e",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
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
  dot: {
    backgroundColor: "rgba(255,255,255,.3)", 
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

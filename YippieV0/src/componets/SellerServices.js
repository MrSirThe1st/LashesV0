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
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { Divider } from "react-native-elements";

export default function SellerServices() {
  const [products, setProducts] = useState([]);

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
    <ScrollView contentContainerStyle={styles.container}>
      {products.map(({ img, label, ordered, likes, price }, index) => {
        return (
          <View
            key={index}
            style={[styles.cardWrapper, index === 0 && { borderTopWidth: 0 }]}
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
                  <Text style={styles.cardPrice}>
                    R{price.toLocaleString("en-US")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
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
});

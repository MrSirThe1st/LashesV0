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
import { collection, getDocs, where, query } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";

const Catalogue = ({ navigation }) => {
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

  const renderProductItem = ({ item }) => {
    return (
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
            <Text numberOfLines={1} style={styles.cardTitle}>
              {item.label}
            </Text>
            <Text style={styles.cardPrice}>
              R{item.price.toLocaleString("en-US")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

export default Catalogue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginBottom: 10,
  },
  flatListContainer: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginBottom: 16,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 1,
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
});

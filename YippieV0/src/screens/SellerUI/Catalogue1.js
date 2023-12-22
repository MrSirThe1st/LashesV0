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

const Catalogue1 = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const route = useRoute();
  const { seller } = route.params;

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

          userProducts.forEach((service) => {
            servicesData.push({
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
            <Text
              numberOfLines={1}
             
              style={styles.cardTitle}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
            <Text style={styles.cardPrice} >
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
        data={services}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Catalogue1;

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
    width: 100,
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

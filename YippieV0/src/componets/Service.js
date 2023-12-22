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
} from "react-native";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import FeatherIcon from "react-native-vector-icons/Feather";


const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const servicesCollection = collection(FIRESTORE_DB, "users");
        const q = query(servicesCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        const servicesData = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userServices = userData.services || [];

          userServices.forEach((service) => {
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
        console.error("Error fetching services: ", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {services.map(({ img, label, ordered, likes, price }, index) => {
        return (
          <View
            key={index}
            style={[styles.cardWrapper, index === 0 && { borderTopWidth: 0 }]}
          >
            <View
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
                      {/* <FontAwesome color="#173153" name="bed" size={13} /> */}

                      <Text style={styles.cardRowItemText}>{ordered}</Text>
                    </View>

                    <View style={styles.cardRowItem}>
                      {/* <FontAwesome
                          color="#173153"
                          name="plus-square"
                          solid={true}
                          size={13}
                        /> */}
                    </View>
                  </View>

                  <Text style={styles.cardPrice}>
                    R{price.toLocaleString("en-US")}
                  </Text>
                </View>

                <View style={styles.menu}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Pressable onPress={() => openMenu(index)}>
                      <FeatherIcon
                        color="#6A6D70"
                        name="more-vertical"
                        size={20}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Service;

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
});

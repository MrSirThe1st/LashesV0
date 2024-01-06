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
  Animated,
} from "react-native";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteField,
  getDoc,
} from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import BottomSheetEdit from "./BottomSheets/BottomSheetEdit";
import { useNavigation } from "@react-navigation/native";

const Service = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

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

  const deleteService = async (serviceIndex) => {
    try {
      if (serviceIndex >= 0 && serviceIndex < services.length) {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const userDocRef = doc(FIRESTORE_DB, "users", userId);
        const querySnapshot = await getDocs(userDocRef);

        if (querySnapshot.exists()) {
          const userData = querySnapshot.data();
          const userServices = userData.services || [];

          // Delete the service from the array in Firestore
          userServices.splice(serviceIndex, 1);
          await updateDoc(userDocRef, { services: userServices });

          // Remove the deleted service from the local state
          setServices((prevServices) =>
            prevServices.filter((service, index) => index !== serviceIndex)
          );
        } else {
          console.error("User document not found");
        }
      } else {
        console.error("Invalid service index");
      }
    } catch (error) {
      console.error("Error deleting service: ", error);
    }
  };




  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {services.map(({ img, label, ordered, likes, price }, index) => {
          return (
            <View
              key={index}
              style={[styles.cardWrapper, index === 0 && { borderTopWidth: 0 }]}
            >
              <Pressable key={index}>
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
                    <View style={styles.contentContainer}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate("EditService", {
                            img: services[index].img,
                            label: services[index].label,
                            ordered: services[index].ordered,
                            likes: services[index].likes,
                            price: services[index].price,
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
                        onPress={() => deleteService(index)}
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
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
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
});

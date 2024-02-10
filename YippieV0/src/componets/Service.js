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
  Alert,
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
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import BottomSheetEdit from "./BottomSheets/BottomSheetEdit";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Toast from "./Toast";

const Service = () => {
  const [services, setServices] = useState([]);
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

        const servicesCollection = collection(FIRESTORE_DB, "users");
        const q = query(servicesCollection, where("uid", "==", userId));

        // Create a real-time listener for the services collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const servicesData = [];
          snapshot.forEach((doc) => {
            const userData = doc.data();
            const userServices = userData.services || [];

            userServices.forEach((service) => {
              servicesData.push({
                img:
                  service.images && service.images.length > 0
                    ? service.images[0]
                    : "",
                label: service.name || "",
                description: service.description,
                likes: 0,
                price: service.price || 0,
              });
            });
          });

          setServices(servicesData);
        });

        // Return the unsubscribe function to clean up the listener
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching services: ", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteService = async (serviceIndex) => {
    try {
      if (serviceIndex >= 0 && serviceIndex < services.length) {
        const shouldDelete = await showDeleteConfirmationAlert();

        if (shouldDelete) {
          const user = FIREBASE_AUTH.currentUser;
          const userId = user.uid;

          const servicesCollectionRef = collection(FIRESTORE_DB, "users");
          const q = query(servicesCollectionRef, where("uid", "==", userId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userServices = userDoc.data().services || [];

            setLoading(true);
            // Delete the service from the array in Firestore
            userServices.splice(serviceIndex, 1);
            await updateDoc(userDoc.ref, { services: userServices });

            // Remove the deleted service from the local state
            setServices((prevServices) =>
              prevServices.filter((service, index) => index !== serviceIndex)
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
        {services.map(
          ({ img, label, ordered, likes, price, description }, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.cardWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}
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
                          <Text style={styles.cardRowItemText} numberOfLines={1}>
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
                            navigation.navigate("EditService", {
                              img: services[index].img,
                              label: services[index].label,
                              ordered: services[index].ordered,
                              price: services[index].price,
                              description: services[index].description,
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

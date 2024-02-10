import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../config/firebase";
import FeatherIcon from "react-native-vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = FIREBASE_AUTH.currentUser;

      if (currentUser) {
        const usersCollectionRef = collection(FIRESTORE_DB, "users");
        const q = query(
          usersCollectionRef,
          where("uid", "==", currentUser.uid)
        );

        try {
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDocRef = doc(
              FIRESTORE_DB,
              "users",
              querySnapshot.docs[0].id
            );
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              console.log(
                "Favorites fetched successfully: ",
                userData.favorites
              );
              setFavorites(userData.favorites || []);
            }
          } else {
            console.error("User document not found.");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching favorites: ", error);
        }
      }
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      ) : favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View key={item.uid} style={styles.favoriteItem}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
              <Text style={styles.sellerName}>{item.username}</Text>
              <Text style={styles.categoryLabel}>{item.categoryLabel}</Text>
              <Text style={styles.address}>{item.address}</Text>
              {/* Add other fields as needed */}
            </View>
          )}
        />
      ) : (
        <View style={styles.empty}>
          <FontAwesome5 name="heart-broken" size={36} color="#FA8072" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyDescription}>
            Your favorite sellers will appear here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    padding: 16,
    backgroundColor: "white",
    
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  favoriteItem: {
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 12,
    
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  categoryLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: "#555",
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Favorites;

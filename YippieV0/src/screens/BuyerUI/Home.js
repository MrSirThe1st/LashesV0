import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardLists from "../../componets/CardLists";
import { FIRESTORE_DB } from "../../config/firebase";
import { FIREBASE_AUTH } from "../../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Geocoder from "react-native-geocoding";
import SkeletonHome from "../../componets/SkeletonHome";


const YourLogoComponent = () => (
  <Image
    source={require("../../assets/icons/lashes-GoodBLue.png")}
    style={{ width: 100, height: 40 }}
    resizeMode="contain"
  />
);

export default function Home({ navigation }) {
  const [sellerData, setSellerData] = useState([]);
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUserCoordinates = await getCurrentUserCoordinates();

        const sellersSnapshot = await getDocs(
          query(
            collection(FIRESTORE_DB, "users"),
            where("role", "==", "seller")
          )
        );

        const updatedSellers = [];

        for (const doc of sellersSnapshot.docs) {
          const sellerData = doc.data();
          const coordinates = await extractCoordinatesFromAddress(
            sellerData.address
          );

          if (coordinates) {
            const distance = haversine(currentUserCoordinates, coordinates);
        

            updatedSellers.push({
              ...sellerData,
              id: doc.id,
              distance,
            });
          } else {
            console.error("Invalid seller coordinates.");
          }
        }

        updatedSellers.sort((a, b) => a.distance - b.distance);

        setSellerData(updatedSellers);
      } catch (error) {
   
      } finally {
        setLoading(false);
        if (initialLoading) {
          setInitialLoading(false);
        }
      }
    };

    const unsubscribe = onSnapshot(
      query(collection(FIRESTORE_DB, "users"), where("role", "==", "seller")),
      () => {
        fetchData();
      }
    );

    fetchData();

    return () => unsubscribe();
  }, [initialLoading]);

  async function getCurrentUserCoordinates() {
    try {
      const user = FIREBASE_AUTH.currentUser;
      const userId = user.uid;

      const profileCollection = collection(FIRESTORE_DB, "users");
      const q = query(profileCollection, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      let currentUserCoordinates;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        currentUserCoordinates = extractCoordinatesFromAddress(userData.address);
      });

      if (currentUserCoordinates) {
     
        return currentUserCoordinates;
      } else {
    
        throw new Error("Invalid current user coordinates");
      }
    } catch (error) {
      console.error("Error fetching user coordinates: ", error);
      throw error; 
    }
  }

  async function extractCoordinatesFromAddress(address) {
    try {
      const json = await Geocoder.from(address);
      const location = json.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } catch (error) {
      console.error("Error extracting coordinates: ", error);
      return null;
    }
  }

function haversine(coord1, coord2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


if (initialLoading) {
  return <SkeletonHome />;
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.stickyHeader}>
        <YourLogoComponent />
      </View>

      <View style={styles.content}>
        <View style={styles.Cardlists}>
          <CardLists sellerData={sellerData} navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 2,
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafdff",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: "grey",
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  Cardlists: {
    flex: 1,
  },
});

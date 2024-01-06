import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Services from "../../componets/Services";
import CardLists from "../../componets/CardLists";
import { FIRESTORE_DB } from "../../config/firebase";
import { FIREBASE_AUTH } from "../../config/firebase";
import { collection, query, where, getDocs, onSnapshot, doc } from "firebase/firestore";
import { Skeleton } from "@rneui/themed";


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
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(firestore, "users"),
        where("role", "==", "seller")
      );
      try {
        const querySnapshot = await getDocs(q);
        const sellers = querySnapshot.docs.map((doc) => doc.data());
        setSellerData(sellers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    const unsubscribe = onSnapshot(
      query(collection(firestore, "users"), where("role", "==", "seller")),
      (snapshot) => {
        const updatedSellers = snapshot.docs.map((doc) => doc.data());
        setSellerData(updatedSellers);
      }
    );

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (auth.currentUser) {
      const userDocRef = doc(firestore, "users", auth.currentUser.uid);

      const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.data());
        } else {
          console.log("No such document!");
        }
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser, firestore]);

  useEffect(() => {
    if (user && user.role === "buyer") {
      firestore
        .collection("users")
        .where("role", "==", "seller")
        .onSnapshot((users) => {
          if (!users.empty) {
            const USERS = [];

            users.forEach((user) => {
              USERS.push(user.data());
            });

            setUser(USERS);
            setSellerData(USERS);
          }
        });
    }
  }, [user]);

  return (
    <SafeAreaView
      style={styles.container}

    >
      <StatusBar backgroundColor="white" />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 2,
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

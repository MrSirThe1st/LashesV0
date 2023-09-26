import React, { useEffect, useState }from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Services from "../../componets/Services";
import CardLists from "../../componets/CardLists";
import { FIRESTORE_DB } from "../../config/firebase";
import { FIREBASE_AUTH } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const YourLogoComponent = () => (
  <Image
    source={require("../../assets/icons/lashes-Good3.png")}
    style={{ width: 100, height: 40,}}
    resizeMode="contain"
  />
);

export default function Home({ navigation}) {

  const [sellerData, setSellerData] = useState([]);
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState(null) 

 

  useEffect(()=>{
    async function fetchData() {
      const q = query(collection(firestore, "users"), where("role", "==", "seller"));
      try {
        const querySnapshot = await getDocs(q);
        const sellers = querySnapshot.docs.map((doc) => doc.data());
        setSellerData(sellers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }  
    fetchData();
  },[]);
  
  useEffect(() => {
    if (user) {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then(snapshot => {
          setUser(snapshot.data());
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === "buyer") {
      firestore
        .collection("users")
        .where("role", "==", "seller")
        .onSnapshot(users => {
          if (!users.empty) {
            const USERS = [];
  
            users.forEach(user => {
              USERS.push(user.data());
            });
  
            setUser(USERS);
            setSellerData(USERS);
          }
        });
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor="#1e90ff"barStyle="light-content"/>
      <View style={styles.stickyHeader}>
        <YourLogoComponent />
      </View>
      <View style={styles.content}>
        <View style={styles.SearchContainer}>
          <Icon name="search" size={28} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search for services or sellers"
            placeholderTextColor="gray"
          />
        </View>
          <Services navigation={navigation}/>
       
          <View style={styles.Cardlists}>
              <CardLists sellerData={sellerData} navigation={navigation}/>
          </View>  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  stickyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
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
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  Cardlists:{
    backgroundColor:"white",
    flex:1
  }
});

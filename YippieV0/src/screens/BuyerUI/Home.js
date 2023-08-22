import React, { useEffect, useState }from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Services from "../../componets/Services";
import { FIRESTORE_DB } from "../../config/firebase";
import { FIREBASE_AUTH } from "../../config/firebase";

const YourLogoComponent = () => (
  <Image
    source={require("../../assets/icons/lashes-Good3.png")}
    style={{ width: 100, height: 40,}}
    resizeMode="contain"
  />
);

export default function Home({ navigation}) {

  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  
  const [user, setUser] = useState(null) 

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
  
            setUsers(USERS);
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
      <Pressable onPress={()=>auth.signOut()}><Text>Sign Out</Text></Pressable>
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
      </View>
      <View>
        
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
    backgroundColor: "#f2f2f2",
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
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import Submit from "../../../componets/Submit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../config/firebase";

const EditService = ({ navigation }) => {
  const route = useRoute();
  const { img, label, ordered, likes, price, description } = route.params;
  const [loading, setLoading] = useState(true);
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const [userData, setUserData] = useState({
    label: label,
    price: price,
    description: description,
  });

  const handleUpdate = async () => {
    const userUID = auth.currentUser.uid;
    setLoading(true);
    try {
      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      const q = query(usersCollectionRef, where("uid", "==", userUID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const document = querySnapshot.docs[0];
        const servicesData = document.data().services || [];
        const updatedServices = servicesData.map((service) => {
          if (service.name === label) {
            return {
              ...service,
              name: userData.label,
              price: userData.price,
              description: userData.description,
            };
          }
          return service;
        });

        const DocRef = doc(usersCollectionRef, document.id);

        await updateDoc(DocRef, { services: updatedServices });

        console.log("User Updated!");
        Alert.alert(
          "Profile Updated!",
          "Your profile has been updated successfully."
        );
      } else {
        console.log("No matching document found!");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      setLoading(false); // Set loading to false after handling the update operation
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          margin: 20,
        }}
      >
        <Image
          alt=""
          resizeMode="cover"
          source={{ uri: img }}
          style={styles.cardImg}
        />
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={20}
            color="#333333"
          />
          <TextInput
            placeholder="Label"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.label : ""}
            onChangeText={(txt) => setUserData({ ...userData, label: txt })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="currency-usd"
            size={20}
            color="#333333"
          />
          <TextInput
            placeholder="Price"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.price : ""}
            onChangeText={(txt) => setUserData({ ...userData, price: txt })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="currency-usd"
            size={20}
            color="#333333"
          />
          <TextInput
            placeholder="Price"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.description : ""}
            onChangeText={(txt) => setUserData({ ...userData, description: txt })}
            style={styles.textInput}
          />
        </View>
        <View>
          <Submit Title="Submit" onPress={handleUpdate} />
        </View>
      </Animated.View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}
    </View>
  );
};

export default EditService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardImg: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 16,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#333333",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

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
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../config/firebase";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import Submit from "../../../componets/Submit";


const EditAccount = () => {
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  async function fetchDocument(userUID) {
    const usersCollectionRef = collection(FIRESTORE_DB, "users");

    try {
      const q = query(usersCollectionRef, where("uid", "==", userUID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const document = querySnapshot.docs[0];
        const userData = document.data();
        setUserData(userData);
        console.log(userData);
      } else {
        console.log("No matching document found!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  }

  const handleUpdate = async () => {
    const userUID = auth.currentUser.uid;

    try {
      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      const q = query(usersCollectionRef, where("uid", "==", userUID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const document = querySnapshot.docs[0];
        const DocRef = doc(usersCollectionRef, document.id);

        // updating the document data
        await updateDoc(DocRef, {
          username: userData.username,
          email: userData.email,
          brief: userData.brief,
          cellphoneNumber: userData.cellphoneNumber,
          country: userData.country,
          city: userData.city,
          overview: userData.overview,
          // userImg: imgUrl,
        });

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
    }
  };


  useEffect(() => {
    const userUID = auth.currentUser.uid;
    fetchDocument(userUID);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          margin: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          {/* <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                    : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity> */}
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {userData ? userData.username : ""}{" "}
            {/* {userData ? userData.username : ""} */}
          </Text>
          {/* <Text>{user.uid}</Text> */}
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={20}
            color="#333333"
          />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.username : ""}
            onChangeText={(txt) => setUserData({ ...userData, username: txt })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <MaterialIcons name="alternate-email" size={20} color="#333333" />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            value={userData ? userData.email : ""}
            onChangeText={(txt) => setUserData({ ...userData, email: txt })}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="About Me"
            placeholderTextColor="#666666"
            value={userData ? userData.brief : ""}
            onChangeText={(txt) => setUserData({ ...userData, brief: txt })}
            autoCorrect={true}
            style={[styles.textInput, { height: 40 }]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color="#333333" size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            value={userData ? userData.cellphoneNumber : ""}
            onChangeText={(txt) =>
              setUserData({ ...userData, cellphoneNumber: txt })
            }
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="globe" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.country : ""}
            onChangeText={(txt) => setUserData({ ...userData, country: txt })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#333333"
            size={20}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.city : ""}
            onChangeText={(txt) => setUserData({ ...userData, city: txt })}
            style={styles.textInput}
          />
        </View>
        <View>
          <Submit Title="Submit" onPress={handleUpdate}/>
        </View>
      </Animated.View>
    </View>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2e64e5",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
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
});

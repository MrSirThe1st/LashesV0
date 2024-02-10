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
  Pressable,
  ActivityIndicator,
  ScrollView
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../config/firebase";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import Submit from "../../componets/Submit";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PhoneInput from "react-native-phone-input";

const EditAccountBuyer = () => {
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState([]);
  
  const getInitials = (name) => {
    const words = name.split(" ");
    return (
      (words.length > 0 ? words[0].charAt(0) : "") +
      (words.length > 1 ? words[1].charAt(0) : "")
    ).toUpperCase();
  };


  async function fetchDocument(userUID) {
    const usersCollectionRef = collection(FIRESTORE_DB, "users");

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async () => {
    const userUID = auth.currentUser.uid;

    try {
      setLoading(true);
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
          address: userData.address,
          cellphoneNumber: userData.cellphoneNumber,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userUID = auth.currentUser.uid;
    fetchDocument(userUID);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Pressable style={styles.profileAvatarWrapper}>
          {userData && (
            <Text style={styles.profileAvatar}>
              {getInitials(userData.username)}
            </Text>
          )}
        </Pressable>
      </View>

      <Animated.View
        style={{
          margin: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {userData ? userData.username : ""}{" "}
            {/* {userData ? userData.username : ""} */}
          </Text>
          {/* <Text>{user.uid}</Text> */}
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color="#333333"
            size={20}
          />
          <GooglePlacesAutocomplete
            placeholder="Address"
            placeholderTextColor="#666666"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setUserData({ ...userData, address: details.formatted_address });
            }}
            query={{
              key: "AIzaSyDZ_unBvP3bbZljXfJOVDMDnQG6Onwa4kM",
              language: "en", // language of the results
            }}
            styles={{
              textInput: styles.textInput,
              container: { flex: 1 },
            }}
            fetchDetails={true}
          />
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
          <Feather name="phone" color="#333333" size={20} />
          <PhoneInput
            ref={(ref) => {
              this.phone = ref;
            }}
            initialCountry="za"
            onPressFlag={() => {}}
            value={userData ? userData.cellphoneNumber : ""}
            onChangePhoneNumber={(number) =>
              setUserData({ ...userData, cellphoneNumber: number })
            }
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

export default EditAccountBuyer;

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
  profile: {
    padding: 24,
    backgroundColor: "#fafdff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileAvatar: {
    fontSize: 40, 
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

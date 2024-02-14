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
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  FlatList,
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
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PhoneInput from "react-native-phone-input";

const EditAccount = () => {
  const firestore = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickProfile = async () => {
    try {
      setLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled) {
        const selectedUri = result.assets[0].uri;
        setUserData({ ...userData, profile: [selectedUri] });
      }
    } catch (error) {
      console.error("Error picking profile image:", error);
    } finally {
      setLoading(false);
    }
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
        setThumbnails(userData.thumbnails || []);
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
          brief: userData.brief,
          cellphoneNumber: userData.cellphoneNumber,
          country: userData.country,
          city: userData.city,
          overview: userData.overview,
          address: userData.address,
          overview: userData.overview,
          profile: userData.profile,
          thumbnails: thumbnails,
          Userwebsite: userData.Userwebsite,
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

  const renderThumbnailItem = ({ item, index }) => (
    <View style={styles.thumbnailItem}>
      <Image source={{ uri: item }} style={styles.thumbnailImage} />
      <Pressable
        style={styles.deleteButton}
        onPress={() => deleteThumbnail(index)}
      >
        <Feather name="x-circle" size={20} color="#1e90ff" />
      </Pressable>
    </View>
  );

  const deleteThumbnail = (index) => {
    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.splice(index, 1); 
    setThumbnails(updatedThumbnails); 
  };

  const addThumbnails = async () => {
    try {
      setLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const selectedThumbnails = result.assets.map((asset) => asset.uri);
        setThumbnails([...thumbnails, ...selectedThumbnails]);
      }
    } catch (error) {
      console.error("Error picking images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <Pressable style={styles.profileAvatarWrapper} onPress={pickProfile}>
            {userData && userData.profile && userData.profile.length > 0 ? (
              <Image
                source={{ uri: userData.profile[0] }}
                style={styles.profileAvatar}
              />
            ) : (
              <View style={styles.defaultAvatar}>
                <MaterialCommunityIcons name="camera" size={35} color="#fff" />
              </View>
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
              name="account-circle-outline"
              size={20}
              color="#333333"
            />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.username : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, username: txt })
              }
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <MaterialIcons name="alternate-email" size={20} color="#333333" />
            <TextInput
              placeholder=""
              placeholderTextColor="#666666"
              value={userData ? userData.email : ""}
              onChangeText={(txt) => setUserData({ ...userData, email: txt })}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <MaterialIcons name="alternate-email" size={20} color="#333333" />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              value={userData ? userData.Userwebsite : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, Userwebsite: txt })
              }
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
            <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="About Me"
              placeholderTextColor="#666666"
              value={userData ? userData.overview : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, overview: txt })
              }
              autoCorrect={true}
              style={[styles.textInput, { height: 40 }]}
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
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              color="#333333"
              size={20}
            />
            <GooglePlacesAutocomplete
              placeholder="Edit address..."
              placeholderTextColor="#666666"
              onPress={(data, details = null) => {
                setUserData({
                  ...userData,
                  address: details.formatted_address,
                });
              }}
              query={{
                key: "AIzaSyDZ_unBvP3bbZljXfJOVDMDnQG6Onwa4kM",
                language: "en",
              }}
              styles={{
                textInput: styles.textInput,
                container: { flex: 1 },
              }}
              fetchDetails={true}
            />
          </View>
          <View style={styles.thumbnailsContainer}>
            <FlatList
              data={thumbnails}
              horizontal
              renderItem={renderThumbnailItem}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <Pressable style={styles.addButton} onPress={addThumbnails}>
              <Text style={styles.addButtonText}>Add</Text>
              <Feather name="plus" size={20} color="white" />
            </Pressable>
          </View>
          <View>
            <Submit Title="Submit" onPress={handleUpdate} />
          </View>
        </Animated.View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      )}
    </KeyboardAvoidingView>
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
  profile: {
    padding: 24,
    backgroundColor: "#fafdff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  thumbnailsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems:'center'
  },
  thumbnailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  thumbnailItem: {
    marginRight: 10,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  addButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    borderRadius:12,
    width:"20%",
    flexDirection:'row'
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

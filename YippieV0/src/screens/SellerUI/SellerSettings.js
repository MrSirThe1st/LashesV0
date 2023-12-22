import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Edit from "../../componets/SettingsComponents.js/Edit";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../config/firebase";
import { signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import {  FIRESTORE_DB } from "../../config/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";


const SellerSettings = () => {
  const [selectedProfile, setSelectedProfile] = useState([]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedUris = result.assets.map((asset) => asset.uri);
        setSelectedImages([...selectedProfile, ...selectedUris]);
      }
    }
  };
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
   const uploadProfile = async (selectedProfile, setUploading) => {
     setUploading(true);

     try {
       const uploadPromises = selectedProfile.map(async (imageUri, index) => {
         const imageName = `profilePicture_${Date.now()}_${index}`;
         const storageReference = ref(storage, `profile/${imageName}`);
         const response = await fetch(imageUri);
         const blob = await response.blob();
         await uploadBytes(storageReference, blob);
         const downloadURL = await getDownloadURL(storageReference);
         return downloadURL;
       });

       const imageUrl = await Promise.all(uploadPromises);

       return imageUrl;
     } catch (error) {
       console.error("Error is: ", error);
       alert("Error uploading profile: " + error.message);
       return [];
     } finally {
       setUploading(false);
     }
   };
const handleProfileUpdate = async () => {
  if (selectedProfile.length > 0) {
    const uploadedUrls = await uploadProfile(selectedProfile);
    console.log("Uploaded URLs:", uploadedUrls);
    // You may want to update user data with the new profile picture URLs
  }
};

  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert("An error happened: " + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profile}>
        <View>
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
              source={{
                uri:
                  selectedProfile.length > 0
                    ? selectedProfile[0]
                    : "https://example.com/placeholder.jpg",
              }}
              style={styles.profileAvatar}
            />

            <TouchableOpacity onPress={pickImage}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileBody}>
          <Text style={styles.profileName}>John Doe</Text>

          <Text style={styles.profileAddress}>
            123 Maple Street. Anytown, PA 17101
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Products & Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate("MyProducts")}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#1e90ff" name="shopping-bag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Products</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyServices")}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#1e90ff" name="shopping-bag" size={18} />
              </View>
              <Text style={styles.rowLabel}>Services</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>

          <Edit navigation={navigation} />
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <MaterialIcons name="logout" size={20} color="#dc143c" />
              </View>

              <Text style={styles.rowLabel}>Logout</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <Text style={styles.sectionHeader}>Delete Account</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <MaterialCommunityIcons
                  name="delete-forever"
                  size={22}
                  color="#dc143c"
                />
              </View>
              <Text style={styles.rowLabel}>Delete Account</Text>
              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#fe9400" name="globe" size={18} />
              </View>

              <Text style={styles.rowLabel}>Language</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="black" name="moon" size={18} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Help</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#8e8d91" name="flag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#007afe" name="mail" size={18} />
              </View>

              <Text style={styles.rowLabel}>Contact us</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Content</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#32c759" name="heart" size={18} />
              </View>

              <Text style={styles.rowLabel}>Favorites</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerSettings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

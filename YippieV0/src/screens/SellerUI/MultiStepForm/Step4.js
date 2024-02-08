import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { WizardStore } from "../../../Store";
import FeatherIcon from "react-native-vector-icons/Feather";
import Swiper from "react-native-swiper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, ProgressBar, Portal, Dialog } from "react-native-paper";
import { FIREBASE_AUTH } from "../../../config/firebase";
import { FIRESTORE_DB } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../config/firebase";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

const Step4 = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;
  const { role } = route.params;
  const information = WizardStore.useState();

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [loading, setLoading] = useState("");
  const email = WizardStore.getRawState().email;
  const password = WizardStore.getRawState().password;
  const confirmPassword = WizardStore.getRawState().confirmPassword;
  const username = WizardStore.getRawState().UserName;
  const cellphoneNumber = WizardStore.getRawState().cellphoneNumber;
  const overview = WizardStore.getRawState().overview;
  const brief = WizardStore.getRawState().brief;
  const city = WizardStore.getRawState().city;
  const country = WizardStore.getRawState().country;
  const category = WizardStore.getRawState().category;
  const address = WizardStore.getRawState().address;
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [websiteEnabled, setWebsiteEnabled] = useState(false);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [pickupEnabled, setPickupEnabled] = useState(false);


  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        setSelectedImages([...selectedImages, ...selectedUris]);
      }
    }
  };

  //profile
  const pickProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const selectedUris = result.assets.map((asset) => asset.uri);
        setSelectedProfile([...selectedProfile, ...selectedUris]);
      }
    }
  };
  //profile

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

  const uploadImagesToFirebase = async () => {
    setUploading(true);

    try {
      const uploadPromises = selectedImages.map(async (imageUri, index) => {
        const imageName = `thumbnail_${Date.now()}_${index}`;
        const storageReference = ref(storage, `thumbnails/${imageName}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);
        const downloadURL = await getDownloadURL(storageReference);
        return downloadURL;
      });
      const imageUrls = await Promise.all(uploadPromises);

      return imageUrls;
    } catch (error) {
      console.error("Error uploading images: ", error);
      alert("Error uploading images: " + error.message);
      return [];
    } finally {
      setUploading(false);
    }
  };

  //profile upload
  const uploadProfileToFirebase = async () => {
    setUploading(true);

    try {
      const uploadPromises = selectedProfile.map(async (profileUri, index) => {
        const imageName = `profile_${Date.now()}_${index}`;
        const storageReference = ref(storage, `profile/${imageName}`);
        const response = await fetch(profileUri);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);
        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageReference);
        return downloadURL;
      });

      // Wait for all uploadPromises to complete
      const profileUrls = await Promise.all(uploadPromises);

      return profileUrls;
    } catch (error) {
      console.error("Error uploading images: ", error);
      alert("Error uploading images: " + error.message);
      return []; // Return an empty array to avoid issues with the code.
    } finally {
      setUploading(false);
    }
  };
  //profile upload

  const signUp = async () => {
    if (password === confirmPassword) {
      setLoading(true);

      try {
        console.log("Username:", username);
        console.log("Cellphone Number:", cellphoneNumber);
        console.log("Overview:", overview);
        console.log("category:", category);
        console.log("Brief:", brief);
        console.log("City:", city);
        console.log("Country:", country);
        console.log("address:", address);
        const [uploadedImageUrls, uploadedProfileUrls] = await Promise.all([
          uploadImagesToFirebase(),
          uploadProfileToFirebase(),
        ]);

        // Create user in Firebase Authentication
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response);

        // Get the UID of the newly created user
        const userUID = response.user.uid;

        // Create a user document in Firestore
        await addDoc(collection(db, "users"), {
          role,
          uid: userUID,
          username,
          email,
          cellphoneNumber,
          overview,
          category,
          brief,
          thumbnails: uploadedImageUrls,
          profile: uploadedProfileUrls,
          city,
          country,
          address,
          whatsapp: whatsappEnabled,
          website: websiteEnabled,
          delivery: deliveryEnabled,
          pickup: pickupEnabled,
        });

        console.log("User document created successfully");
      } catch (error) {
        console.error(error);
        alert("Sign up failed: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.FormContainer}>
          <View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={styles.title}>
                Take a last look at your{" "}
                <Text style={{ color: "#1e90ff" }}>Profile</Text>
              </Text>
            </View>

            <View style={styles.summaryEntriesContainer}>
              <View style={styles.photos}>
                <Swiper
                  renderPagination={(index, total) => (
                    <View style={styles.photosPagination}>
                      <Text style={styles.photosPaginationText}>
                        {index + 1} / {total}
                      </Text>
                    </View>
                  )}
                >
                  {selectedImages.map((imageUri, index) => (
                    <Image
                      alt=""
                      key={index}
                      source={{ uri: imageUri }}
                      style={styles.photosImg}
                    />
                  ))}
                </Swiper>
              </View>
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.addProduct}>
                  <Text style={styles.addText}>Add thumbnails</Text>
                  <FeatherIcon color="#fff" name="plus" size={16} />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.title}>
                  Select Your
                  <Text style={{ color: "#1e90ff" }}> Logo</Text>
                </Text>
              </View>
              <View style={styles.profile}>
                <View style={styles.profileAvatarWrapper}>
                  <Image
                    source={{ uri: selectedProfile[0] }}
                    style={styles.profileAvatar}
                  />
                </View>
              </View>

              <TouchableOpacity onPress={pickProfile}>
                <View style={styles.addProduct}>
                  <Text style={styles.addText}>Add Logo</Text>
                  <FeatherIcon color="#fff" name="plus" size={16} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.overlay}>
        {loading ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          <TouchableOpacity onPress={signUp} mode="outlined">
            <View style={styles.btn}>
              <Text style={styles.btnText}>Finish</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Step4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf5ff",
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  SummaryEntry: {
    marginBottom: 5,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  FormContainer: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  addProduct: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
    marginVertical: 10,
  },
  addText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: "#000",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  photos: {
    marginTop: 12,
    position: "relative",
    height: 240,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#6fbfff",
    backgroundColor: "white",
  },

  photosPagination: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fbfbfb",
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: "100%",
    height: 240,
  },

  overlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  overlayContentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  overlayContentPrice: {
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "700",
    color: "#000",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    backgroundColor: "white",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profile: {
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

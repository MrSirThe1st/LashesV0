import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import Swiper from "react-native-swiper";
import { BottomSheet } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../config/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import Toast from "../../componets/Toast";

const AddProduct = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const itemWidth = windowWidth / 3;
  const imageWidth = itemWidth - 24;
  const imageHeight = imageWidth * 0.8;
  const user = FIREBASE_AUTH.currentUser;
  const userId = user.uid;
   const [showSuccessToast, setShowSuccessToast] = useState(false);

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
  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
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

  const uploadImagesToFirebase = async (selectedImages, setUploading) => {
    setUploading(true);

    try {
      const uploadPromises = selectedImages.map(async (imageUri, index) => {
        const imageName = `product_${Date.now()}_${index}`;
        const storageReference = ref(storage, `products/${imageName}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageReference, blob);
        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageReference);
        return downloadURL;
      });

      // Wait for all uploadPromises to complete
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

  const uploadProductToFirestore = async (userUID, productData) => {
    const usersCollectionRef = collection(FIRESTORE_DB, "users");
    let userDocRef;
    let currentProducts;

    const q = query(usersCollectionRef, where("uid", "==", userUID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      userDocRef = doc(FIRESTORE_DB, "users", userDoc.id);
      currentProducts = userDoc.data().products || [];
    } else {
      console.error("User document not found.");
      return;
    }

    try {
      await setDoc(
        userDocRef,
        { products: [...currentProducts, ...productData] },
        { merge: true }
      );

      console.log("Product uploaded successfully!");
      setShowSuccessToast(true);
    } catch (error) {
      console.error("Error uploading product: ", error);
    }
  };

  const handleUploadImages = async () => {
    setUploading(true);
    try {
      const imageUrls = await uploadImagesToFirebase(
        selectedImages,
        setUploading
      );
      const productData = {
        name,
        price,
        description,
        category,
        images: imageUrls,
      };

      uploadProductToFirestore(userId, [productData]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="light-content" />
        <View style={styles.Wrapper}>
          <View>
            <View style={styles.AddInput}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.map((imageUri, index) => (
                  <View
                    style={[styles.pressable, { width: itemWidth }]}
                    key={index}
                  >
                    <View
                      style={[
                        styles.pressableImage,
                        { width: imageWidth, height: imageHeight },
                      ]}
                    >
                      <Image source={{ uri: imageUri }} style={styles.image} />
                    </View>
                    <Pressable
                      style={styles.Xbutton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <Feather name="x-circle" size={24} color="#1e90ff" />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.AddInputInner} onPress={pickImage}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.AddText}>Select pictures</Text>
                <FeatherIcon color="white" name="plus" size={20} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
              placeholder={"product name"}
              keyboardType={"default"}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={price}
              autoCapitalize="none"
              onChangeText={(text) => setPrice(text)}
              placeholder={"Price"}
              keyboardType={"default"}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={description}
              autoCapitalize="none"
              onChangeText={(text) => setDescription(text)}
              placeholder={"description"}
              keyboardType={"default"}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={category}
              autoCapitalize="none"
              onChangeText={(text) => setCategory(text)}
              placeholder={"category"}
              keyboardType={"default"}
            />
          </View>
        </View>

        <View style={styles.overlay}>
          <TouchableOpacity onPress={handleUploadImages} mode="outlined">
            <View style={styles.btn}>
              <Text style={styles.btnText}>Upload</Text>
            </View>
          </TouchableOpacity>
        </View>
        {showSuccessToast && (
          <Toast
            message="Services uploaded successfully!"
            onDismiss={() => setShowSuccessToast(false)}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 5,
  },
  Wrapper: {
    flex: 1,
    alignItems: "center",
  },
  AddInput: {
    alignItems: "center",
    width: "95%",
    borderColor: "#1e90ff",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
  },
  AddInputInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  AddText: {
    fontSize: 13,
    color: "white",
  },
  input: {
    width: "95%",
    height: 45,
    margin: 12,
    fontSize: 18,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e90ff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    margin: 12,
    width: "95%",
    height: 45,
  },
  photos: {
    position: "relative",
    height: 130,
    overflow: "hidden",
    padding: 8,
  },
  photosPagination: {
    position: "absolute",
    bottom: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: "#1e90ff",
    borderRadius: 12,
  },
  photosPaginationText: {
    fontWeight: "600",
    fontSize: 10,
    color: "#fbfbfb",
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: "100%",
    height: 130,
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

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 5,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 5,
  },
  pressableImage: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  AddInput: {
    alignItems: "center",
    width: "95%",
    marginBottom: 10,
    borderRadius: 10,
  },
  AddInputInner: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  AddText: {
    fontSize: 14,
    color: "white",
  },
  photos: {
    position: "relative",
    height: 130,
    overflow: "hidden",
    padding: 8,
  },
  Xbutton: {
    paddingVertical: 5,
  },
});

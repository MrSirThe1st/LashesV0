import {
  StyleSheet,
  Switch,
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import Swiper from "react-native-swiper";
import PicturesData, {
  uploadImagesToFirebase,
} from "../../componets/PicturesData";
import { BottomSheet } from "@rneui/themed";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../config/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const AddProduct = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(undefined);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const user = FIREBASE_AUTH.currentUser;
  const userId = user.uid;

  // const onSearch = (text) => {
  //   setQuery(text);
  // };
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
    } catch (error) {
      console.error("Error uploading product: ", error);
    }
  };

  const handleUploadImages = async () => {
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
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <View style={styles.Wrapper}>
        <PicturesData />
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
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
            <Text style={styles.overlayContentPrice}>
              All <Text style={{ color: "#1e90ff" }}>Good?</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleUploadImages} mode="outlined">
          <View style={styles.btn}>
            <Text style={styles.btnText}>Upload</Text>

            <MaterialCommunityIcons
              color="#fff"
              name="arrow-right-circle"
              size={18}
              style={{ marginLeft: 12 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
});

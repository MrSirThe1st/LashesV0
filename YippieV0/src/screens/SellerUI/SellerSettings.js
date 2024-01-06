import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Edit from "../../componets/SettingsComponents.js/Edit";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../config/firebase";
import { signOut } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { FIRESTORE_DB } from "../../config/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetComponent from "../../componets/BottomSheets/BottomSheetComponent";
import { MyButton } from "../../componets/BottomSheets/MyButton";

const SellerSettings = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const profileCollection = collection(FIRESTORE_DB, "users");
        const q = query(profileCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        const profileData = [];
        querySnapshot.forEach((doc) => {
          console.log("Fetched Document Data: ", doc.data());
          const userData = doc.data();
          setUsername(userData.username); // Set the username state
          setProfileImage(userData.profile[0]);
        });
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

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
              source={{ uri: profileImage }}
              style={styles.profileAvatar}
            />

            <TouchableOpacity>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileBody}>
          <Text style={styles.profileName}>{username}</Text>

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
          <Pressable onPress={() => navigation.navigate("MyProducts")}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#1e90ff" name="shopping-bag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Products</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("MyServices")}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#1e90ff" name="shopping-bag" size={18} />
              </View>
              <Text style={styles.rowLabel}>Services</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>

          <Edit navigation={navigation} />
          <Pressable onPress={handleLogout}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <MaterialIcons name="logout" size={20} color="#dc143c" />
              </View>

              <Text style={styles.rowLabel}>Logout</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
          <Text style={styles.sectionHeader}>Delete Account</Text>
          <Pressable
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
          </Pressable>
        </View>
        {/* <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <Pressable
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
          </Pressable>
          <Pressable
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
          </Pressable>
        </View> */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Help</Text>
          <Pressable onPress={() => setShowBottomSheet(!showBottomSheet)}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#8e8d91" name="flag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
          <Pressable onPress={() => setShowBottomSheet(!showBottomSheet)}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#007afe" name="mail" size={18} />
              </View>

              <Text style={styles.rowLabel}>Contact us</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Content</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Favorites");
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#32c759" name="heart" size={18} />
              </View>

              <Text style={styles.rowLabel}>Favorites</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <BottomSheetComponent
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
      />
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
  profileAvatarEmpty: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    backgroundColor: "#eaf5ff",
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
    backgroundColor: "#fafdff",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    elevation: 1,
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

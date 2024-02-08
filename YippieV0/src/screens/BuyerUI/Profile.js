import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Edit from "../../componets/SettingsComponents.js/Edit";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { FIRESTORE_DB } from "../../config/firebase";
import EditBuyer from "../../componets/EditBuyer";

import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import BottomSheetLink from "../../componets/BottomSheets/BottomSheetLink";
import BottomSheetReport from "../../componets/BottomSheets/BottomSheetReport";
import Alert2 from "../../componets/Alerts/Alert2";
import Alert3 from "../../componets/Alerts/Alert3";
import { Modal } from "react-native";

const SellerSettings = () => {
  const [profile, setProfile] = useState({
    username: "",
    profileImage: "",
  });
  const [username, setUsername] = useState("");
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showBottomSheetLink, setShowBottomSheetLink] = useState(false);
  const [showBottomSheetReport, setShowBottomSheetReport] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const user = FIREBASE_AUTH.currentUser;
  const userId = user.uid;

  const getInitials = (name) => {
    const words = name.split(" ");
    return (
      (words.length > 0 ? words[0].charAt(0) : "") +
      (words.length > 1 ? words[1].charAt(0) : "")
    ).toUpperCase();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        const userId = user.uid;

        const profileCollection = collection(FIRESTORE_DB, "users");
        const q = query(profileCollection, where("uid", "==", userId));

        // Fetch initial data
        const initialQuerySnapshot = await getDocs(q);
        initialQuerySnapshot.forEach((doc) => {
          const userData = doc.data();
          setProfile({
            username: userData.username,
          });
        });

        // Subscribe to automatic updates using onSnapshot
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
              // Handle modified data
              const modifiedData = change.doc.data();
              setProfile({
                username: modifiedData.username,
              });
            }
          });
        });

        // Cleanup function to unsubscribe when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };

    fetchProfile();
  }, []);

  const navigation = useNavigation();

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };
  const handleDelete = () => {
    setShowDeleteAlert(true);
    setPasswordModalVisible(true);
  };

  
  const promptForPassword = () => {
    return new Promise((resolve, reject) => {
      Alert.prompt(
        "Enter your current password",
        null,
        [
          {
            text: "Cancel",
            onPress: () => reject(new Error("Password prompt canceled")),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: (password) => resolve(password),
          },
        ],
        "secure-text"
      );
    });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profile}>
        <View style={styles.profileAvatarWrapper}>
          <Text style={styles.profileAvatarText}>
            {getInitials(profile.username)}
          </Text>
        </View>

        <View style={styles.profileBody}>
          <Text style={styles.profileName}>{profile.username}</Text>
          <Text style={styles.profileAddress}></Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>
          <EditBuyer navigation={navigation} />
          <Pressable
            onPress={() => {
              handleLogout();
            }}
          >
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
              handleDelete();
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

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Contact us</Text>

          <Pressable
            onPress={() => setShowBottomSheetLink(!showBottomSheetLink)}
          >
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

      <BottomSheetLink
        showBottomSheetLink={showBottomSheetLink}
        setShowBottomSheetLink={setShowBottomSheetLink}
      />
      <BottomSheetReport
        showBottomSheetReport={showBottomSheetReport}
        setShowBottomSheetReport={setShowBottomSheetReport}
      />
      {showLogoutAlert && (
        <Alert3
          text="Are you sure you want to log out?"
          option="Logout"
          option1="Cancel"
          onOptionPress={async () => {
            try {
              await signOut(FIREBASE_AUTH);
              navigation.navigate("Login1");
            } catch (error) {
              console.log(error);
              alert("An error happened: " + error.message);
            } finally {
              setShowLogoutAlert(false);
            }
          }}
          onOption1Press={() => setShowLogoutAlert(false)}
          profileImage={profile.profileImage}
          username={profile.username}
        />
      )}
      {showDeleteAlert && (
        <Alert3
          text="Are you sure you want to Delete your account?"
          option="Delete"
          option1="Cancel"
          onOptionPress={async () => {
            try {
              const currentPassword = await promptForPassword();

              // Ensure that user is not undefined before accessing its properties
              const user = FIREBASE_AUTH.currentUser;
              if (!user) {
                throw new Error("User is not authenticated");
              }

              const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
              );
              await reauthenticateWithCredential(user, credential);

              
              const userId = user.uid;
              const profileCollection = collection(FIRESTORE_DB, "users");
              const q = query(profileCollection, where("uid", "==", userId));
              const querySnapshot = await getDocs(q);

              const deletionPromises = querySnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
              });

              await Promise.all(deletionPromises);
              await user.delete();

              await signOut(FIREBASE_AUTH);
            } catch (error) {
              console.error("Error during account deletion:", error.message);
              alert(
                "Error",
                "Failed to delete account. Please try again."
              );
            } finally {
              setShowDeleteAlert(false);
            }
          }}
          onOption1Press={() => setShowDeleteAlert(false)}
          profileImage={profile.profileImage}
          username={profile.username}
        />
      )}
    </SafeAreaView>
  );
};

export default SellerSettings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
    flex: 1,
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
    width: 72,
    height: 72,
    borderRadius: 9999,
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
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
  profileAvatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
});

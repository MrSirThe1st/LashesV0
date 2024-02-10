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
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
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
import BackArrow from "../../componets/BackArrow";
import BackButton from "../../componets/BackButton";
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

const SellerSettings = () => {
  const [profile, setProfile] = useState({
    username: "",
    profileImage: "",
  });
  const [username, setUsername] = useState("");
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [showBottomSheetLink, setShowBottomSheetLink] = useState(false);
  const [showBottomSheetReport, setShowBottomSheetReport] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const navigation = useNavigation();

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };
  const handleDelete = () => {
    setShowReauthModal(true);
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential);
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
      let errorMessage = "An error occurred. Please try again.";
      if (error.code === "auth/wrong-password") {
        errorMessage = "Invalid password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please try again.";
      } else if (error.code === "auth/requires-recent-login") {
        errorMessage = "Please log in again to delete your account.";
      } else {
        errorMessage = "An error occurred. Please try again later.";
      }
      alert(errorMessage);
    } finally {
      setShowReauthModal(false);
      setLoading(false);
    }
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
      <Modal
        visible={showReauthModal}
        onRequestClose={() => setShowReauthModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.alert}>
            {profile.profileImage ? (
              <Image
                style={styles.alertAvatar}
                source={{ uri: profile.profileImage }}
              />
            ) : (
              <Image style={styles.alertAvatar} />
            )}

            <Text style={styles.alertTitle}>{profile.username}</Text>
            <Text style={styles.alertMessage}>
              Are you sure you want to Delete your account?
            </Text>

            <View>
              <View style={styles.reauthContainer}>
                <Text style={styles.reauthLabel}>Email</Text>
                <TextInput
                  style={styles.inputR}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.reauthLabel}>Password</Text>
                <TextInput
                  style={styles.inputR}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                />
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.btnText}>Delete account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
              alert("Error", "Failed to delete account. Please try again.");
            } finally {
              setShowDeleteAlert(false);
            }
          }}
          onOption1Press={() => setShowDeleteAlert(false)}
          profileImage={profile.profileImage}
          username={profile.username}
        />
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
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
  overlay: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignSelf: "center",
  },
  alert: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 8,
    width: "90%",
    maxWidth: 450,
  },
  alertAvatar: {
    width: 110,
    height: 110,
    borderRadius: 9999,
    alignSelf: "center",
    marginBottom: 10,
  },
  alertTitle: {
    marginBottom: 16,
    fontSize: 25,
    lineHeight: 44,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  alertMessage: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "#9a9a9a",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  btn: {
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#FA8072",
    borderColor: "#f75249",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  btnSecondary: {
    flex: 1,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "transparent",
    borderColor: "#1e90ff",
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#1e90ff",
  },
  inputR: {
    height: 44,
    backgroundColor: "#EFF1F5",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginBottom: 12,
  },
  reauthLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#989898",
    marginBottom: 10,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

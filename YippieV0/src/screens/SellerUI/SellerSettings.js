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
  Modal,
  Button,
  TextInput,
  Switch,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Edit from "../../componets/SettingsComponents.js/Edit";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { FIRESTORE_DB } from "../../config/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { reauthenticateWithCredential } from "firebase/auth";
import BottomSheetLink from "../../componets/BottomSheets/BottomSheetLink";
import BottomSheetReport from "../../componets/BottomSheets/BottomSheetReport";
import Alert2 from "../../componets/Alerts/Alert2";
import { EmailAuthProvider } from "firebase/auth";

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
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [websiteEnabled, setWebsiteEnabled] = useState(false);
  const [deliveryEnabled, setDeliveryEnabled] = useState(false);
  const [pickupEnabled, setPickupEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = FIREBASE_AUTH.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileCollection = collection(FIRESTORE_DB, "users");
        const q = query(profileCollection, where("uid", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setProfile({
            username: userData.username,
            profileImage: userData.profile[0],
          });
          setWhatsappEnabled(userData.whatsapp);
          setWebsiteEnabled(userData.website);
          setDeliveryEnabled(userData.delivery);
          setPickupEnabled(userData.pickup);
        });
      } catch (error) {
        console.error(" ", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleToggleWhatsapp = async (value) => {
    setWhatsappEnabled(value);
    await updateBooleanFieldInFirestore("whatsapp", value);
  };

  const handleToggleWebsite = async (value) => {
    setWebsiteEnabled(value);
    await updateBooleanFieldInFirestore("website", value);
  };

  const handleToggleDelivery = async (value) => {
    setDeliveryEnabled(value);
    await updateBooleanFieldInFirestore("delivery", value);
  };

  const handleTogglePickup = async (value) => {
    setPickupEnabled(value);
    await updateBooleanFieldInFirestore("pickup", value);
  };

  const updateBooleanFieldInFirestore = async (fieldName, value) => {
    try {
      if (!userId) {
        console.error("User ID not found.");
        return;
      }

      const usersCollectionRef = collection(FIRESTORE_DB, "users");
      const userQuerySnapshot = await getDocs(
        query(usersCollectionRef, where("uid", "==", userId))
      );

      if (userQuerySnapshot.empty) {
        console.error("User document not found in Firestore:", userId);
        return;
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userRef = doc(FIRESTORE_DB, "users", userDoc.id);

      await updateDoc(userRef, {
        [fieldName]: value,
      });
      console.log(fieldName + " updated successfully in Firestore");
    } catch (error) {
      console.error("Error updating " + fieldName + " in Firestore:", error);
    }
  };


  const navigation = useNavigation();

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };
  const handleDelete = () => {
    setShowReauthModal(true);
  };

  const handleDeleteAccount = async () => {
    try {
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
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profile}>
        <View style={styles.profileAvatarWrapper}>
          {profile.profileImage ? (
            <Image
              source={{ uri: profile.profileImage }}
              style={styles.profileAvatar}
            />
          ) : (
            <View style={styles.profileAvatarEmpty} />
          )}
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
          <Text style={styles.sectionHeader}>communication</Text>
          <Pressable>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FontAwesome name="whatsapp" size={18} color="#25D366" />
              </View>

              <Text style={styles.rowLabel}>Whatsapp</Text>
              <View style={styles.rowSpacer} />
              <Switch
                value={whatsappEnabled}
                onValueChange={handleToggleWhatsapp}
              />
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FontAwesome name="globe" size={18} color="#1e90ff" />
              </View>

              <Text style={styles.rowLabel}>Website</Text>
              <View style={styles.rowSpacer} />
              <Switch
                value={websiteEnabled}
                onValueChange={handleToggleWebsite}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Delivery</Text>
          <Pressable>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <Feather name="truck" size={18} color="#1e90ff" />
              </View>

              <Text style={styles.rowLabel}>Delivery</Text>
              <View style={styles.rowSpacer} />
              <Switch
                value={deliveryEnabled}
                onValueChange={handleToggleDelivery}
              />
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FontAwesome name="home" size={24} color="#1e90ff" />
              </View>

              <Text style={styles.rowLabel}>Pickup</Text>
              <View style={styles.rowSpacer} />
              <Switch
                value={pickupEnabled}
                onValueChange={handleTogglePickup}
              />
            </View>
          </Pressable>
        </View>
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
          <Text style={styles.sectionHeader}>Help</Text>
          <Pressable
            onPress={() => setShowBottomSheetReport(!showBottomSheetReport)}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#8e8d91" name="flag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />
            </View>
          </Pressable>
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
        <Alert2
          text="Are you sure you want to log out?"
          option="Logout"
          option1="Cancel"
          onOptionPress={async () => {
            try {
              await signOut(FIREBASE_AUTH);
              navigation.navigate("Login1");
            } catch (error) {
              console.log(error);
              alert("An error happened please try again later");
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
        <Alert2
          text="Are you sure you want to Delete your account?"
          option="Delete"
          option1="Cancel"
          onOptionPress={async () => {
            try {
              const password = "userCurrentPassword";
              const credential = EmailAuthProvider.credential(
                user.email,
                password
              );
              await reauthenticateWithCredential(user, credential);
              const user = FIREBASE_AUTH.currentUser;
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
              console.log(error);
              alert("An error happened: " + error.message);
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
  standaloneSwitch: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  standaloneSwitchLabel: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#0c0c0c",
  },
});

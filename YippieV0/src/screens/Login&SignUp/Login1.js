import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../componets/BackButton";
import { FIREBASE_AUTH, GoogleAuth, FIRESTORE_DB } from "../../config/firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login1 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (user) {
        fetchDocument(user.uid);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      fetchDocument(response.user.uid);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async () => {
    setLoading(true);
    try {
      if (!email) {
        alert(
          "Please provide your email address before requesting a password reset."
        );
        return;
      }

      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your email inbox.");
    } catch (error) {
      console.log(error);
      alert("Password reset failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  async function fetchDocument(userUID) {
    const usersCollectionRef = collection(FIRESTORE_DB, "users");

    try {
      const q = query(usersCollectionRef, where("uid", "==", userUID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const document = querySnapshot.docs[0];
        const userData = document.data();
        const userRole = userData.role;

        // Use navigation.navigate to redirect based on user role
        if (userRole === "seller" || userRole === "buyer") {
          // Redirect to the appropriate screen
          const targetScreen =
            userRole === "seller" ? "SellerHome" : "BuyerHome";
        } else {
          console.log("Invalid user role:", userRole);
        }
      } else {
        console.log("No matching document found!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
   
      <SafeAreaView style={styles.container}>
        <View style={styles.containerForm}>
          <View style={styles.header}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.headerImg}
              source={require("../../../assets/adaptive-icon.png")}
            />

            <Text style={styles.title}>Sign in to Your Accoun</Text>

            <Text style={styles.subtitle}>Welcom back</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCorrect={false}
                onChangeText={(password) => setPassword(password)}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={password}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={signIn}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.formFooter}>
              <Text>Forgot your password?</Text>
              <TouchableOpacity onPress={requestPasswordReset}>
                <Text style={{ color: "#FE724E" }}> Recover it here</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.formSpacer}>
            <Text style={styles.formSpacerText}>Or Sign in with</Text>
            <View style={styles.formSpacerDivider} />
          </View>

          <View style={styles.btnGroup}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={{ flex: 1, paddingHorizontal: 6 }}
            >
              <View style={styles.btnGoogle}>
                 <MaterialIcons
                color="#fff"
                name="google"
                size={18}
                style={{ marginRight: 12 }}
              /> 
                <Text style={styles.btnGoogleText}>Google</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1e90ff" />
          </View>
        )}
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf5ff",
  },
  containerForm: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  formSpacer: {
    marginTop: 72,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  formSpacerText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#454545",
    lineHeight: 20,
    paddingHorizontal: 12,
    zIndex: 9,
  },
  formSpacerDivider: {
    borderBottomWidth: 2,
    borderColor: "#eff1f5",
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginHorizontal: -6,
  },
  btnFacebook: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#355288",
    borderColor: "#355288",
  },
  btnFacebookText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  btnGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#3367D6",
    borderColor: "#3367D6",
  },
  btnGoogleText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  formFooter: {
    marginTop: 16,
    fontSize: 13,
    fontWeight: "500",
    color: "#454545",
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default Login1;

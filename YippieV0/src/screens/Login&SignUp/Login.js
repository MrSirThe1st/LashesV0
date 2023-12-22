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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../componets/BackButton";
import { FIREBASE_AUTH, GoogleAuth, FIRESTORE_DB } from "../../config/firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDocs, collection, query, where } from "firebase/firestore";

const Login = ({ navigation }) => {
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
      alert("Signed in successfully");
      fetchDocument(response.user.uid);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
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

          navigation.navigate(targetScreen, { screen: "HomeScreen" });
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


  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithRedirect(FIREBASE_AUTH, GoogleAuth);

      const result = await getRedirectResult(auth);
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("Sign in with Google failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.Wrapper}>
        <View style={styles.inputContainer}>
          <Icon
            name="alternate-email"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholder={"Email"}
            keyboardType={"email-address"}
          />
        </View>
   
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Password"}
            keyboardType={"default"}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <View style={styles.forgotPasswordContainer}>
            <Pressable>
              <Text style={styles.forgotPasswordText}>Forgot?</Text>
            </Pressable>
          </View>
        </View>
        {/* Loading indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={signIn}
            disabled={false}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.InnerbottomContainer}>
          <Text style={styles.forgotPasswordText}>Choose instead to</Text>
          <Pressable style={styles.button} onPress={signInWithGoogle}>
            <Image
              source={require("../../assets/icons/google(1).png")}
              style={[styles.buttonIcon, { width: 30, height: 30 }]}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={[styles.text, { flex: 1 }]}>Login With Google</Text>
            </View>
          </Pressable>
          <Pressable style={styles.button}>
            <Image
              source={require("../../assets/icons/facebook(1).png")}
              style={[styles.buttonIcon, { width: 30, height: 30 }]}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text style={[styles.text, { flex: 1 }]}>
                Login With Facebook
              </Text>
            </View>
          </Pressable>
          <View style={styles.footer}>
            <Text>terms and condition applies copyright @2023</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafdff",
  },
  Wrapper: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 0.5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  InnerbottomContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "#1e90ff",
    marginHorizontal: 20,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 50,
    width: "95%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonIcon: {
    backgroundColor: "white",
    borderRadius: 50,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    width: "90%",
    height: 45,
    margin: 12,
    fontSize: 18,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 12,
    width: "90%",
    height: 45,
  },
  forgotPasswordContainer: {
    position: "absolute",
    right: 12,
    justifyContent: "center",
    height: "100%",
  },
  forgotPasswordText: {
    color: "#1e90ff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSignUp: {
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    alignItems: "center",
    color: "white",
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;

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
import { FIREBASE_AUTH } from "../../config/firebase";
import { FIRESTORE_DB } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";



const SignUp = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;
  const { role, address } = route.params;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  

  useEffect(() => {
    console.log("Selected Address in SignUp:", address);
  }, [address]);

  const signUp = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(response);
        const userUID = response.user.uid;
        await addDoc(collection(db, "users"), {
          username: username,
          role: role,
          email: email,
          uid: userUID,
          address:address,
          role: role,
        }).then(() => {
          console.log("data submitted");
        });
      } catch (error) {
        console.log(error);
        alert("Sign up : " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton navigation={navigation} />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>
          Please enter your information below to create a new account.
        </Text>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder={"Username"}
          keyboardType={"default"}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          placeholder={"Email Address"}
          keyboardType={"email-address"}
        />

        {/* <TextInput
          style={styles.input}
          value={cellphoneNumber}
          onChangeText={setCellphoneNumber}
          placeholder={"Cellphone Number"}
          keyboardType={"default"}
          secureTextEntry={false}
        /> */}
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputR}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={"Password"}
            secureTextEntry={!showPassword}
            keyboardType={"default"}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 10 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputR}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder={"Confirm Password"}
            keyboardType={"default"}
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ padding: 10 }}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={signUp} disabled={false}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.formFooter}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#FE724E" }}> Login here</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#fff",
  },
  form: {
    paddingHorizontal: 16,
    marginTop: 35,
  },
  logoImg: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#242424",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#989898",
    marginBottom: 16,
  },
  input: {
    height: 44,
    backgroundColor: "#EFF1F5",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginBottom: 12,
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
    width:"90%"
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#FE724E",
    borderColor: "#FE724E",
    marginTop: 24,
  },
  btnText: {
    fontSize: 16,
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
  formSpacer: {
    marginTop: 18,
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
    backgroundColor: "#fff",
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default SignUp;

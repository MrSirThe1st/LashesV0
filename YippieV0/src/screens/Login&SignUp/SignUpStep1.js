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
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../Store";

const SignUpStep1 = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;
  const { role } = route.params;
  const APY_KEY = "AIzaSyDZ_unBvP3bbZljXfJOVDMDnQG6Onwa4kM";

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    WizardStore.update((s) => {
      s.address = data.address;
    });

    navigation.navigate("SignUp", { role: "buyer", address: data.address });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <View style={styles.form}>
          <Text style={styles.title}>What is your address ?</Text>
          <Text style={styles.subtitle}>
            This helps us give you results based on your location
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <GooglePlacesAutocomplete
                placeholder="Enter your address"
                minLength={2}
                autoFocus={false}
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  onChange(text);
                }}
                returnKeyType="default"
                fetchDetails={true}
                isRowScrollable={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                  setAddress(data.description);
                  onChange(data.description);
                }}
                query={{
                  key: APY_KEY,
                  language: "en",
                  types: "address",
                }}
                styles={{
                  textInputContainer: {
                    fontSize: 17,
                    fontWeight: "600",
                    color: "#222",
                    marginBottom: 8,
                  },
                  textInput: {
                    height: 44,
                    backgroundColor: "#EFF1F5",
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#222",
                    marginHorizontal: 8,
                    marginVertical: 4,
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                }}
              />
            )}
            name="address"
          />
          {errors.address && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              add your addres before continuing.
            </Text>
          )}

          <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>Next</Text>
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
    justifyContent: "space-between",
  },
  form: {
    flex: 1, 
    paddingHorizontal: 16,
    marginTop: 35,
    justifyContent: "space-between",
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
    marginBottom: 20,
  },
  btnText: {
    fontSize: 16,
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

export default SignUpStep1;

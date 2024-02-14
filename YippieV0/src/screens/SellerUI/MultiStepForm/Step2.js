import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../../Store";
import { ProgressBar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Step2 = ({ navigation, route }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { role } = route.params;
  const APY_KEY = "AIzaSyDZ_unBvP3bbZljXfJOVDMDnQG6Onwa4kM";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    WizardStore.update((s) => {
      s.country = data.country;
      s.city = data.city;
      s.address = data.address;
    });

    navigation.navigate("Step3", { role: "seller" });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.title}>
          Let's Take Your <Text style={{ color: "#1e90ff" }}> Location </Text>
        </Text>
      </View>

      <View>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Country</Text>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(text) => {
                    setCountry(text);
                    onChange(text);
                  }}
                  placeholder="Enter your country"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={country}
                  autoCapitalize="none"
                  onBlur={onBlur}
                />
              </View>
            )}
            name="country"
          />
          {errors.country && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>
      </View>

      <View>
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>City</Text>
                <TextInput
                  autoCorrect={false}
                  onChangeText={(text) => {
                    setCity(text);
                    onChange(text);
                  }}
                  placeholder="Enter your city"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={city}
                  autoCapitalize="none"
                  onBlur={onBlur}
                />
              </View>
            )}
            name="city"
          />
          {errors.city && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.inputLabelA}>Address</Text>
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
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                borderRadius: 12,
                fontSize: 15,
                fontWeight: "500",
                color: "#222",
                borderWidth: 2,
                borderColor: "#6fbfff",
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
      <View
        style={[
          styles.BottomContainer,
          keyboardHeight > 0 && { opacity: 0 }, // Set opacity to 0 when the keyboard is up
        ]}
      >
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={1}
          style={{
            backgroundColor: "#1e90ff",
            padding: 10,
            borderRadius: 5,
            fontSize: 18,
            fontWeight: "bold",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Next step</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step2;

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#eaf5ff",
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-evenly",
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  FormContainer: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "space-between",
  },
  BottomContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: "auto",
    justifyContent: "center",
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
  inputLabelA: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    marginHorizontal: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 2,
    borderColor: "#6fbfff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

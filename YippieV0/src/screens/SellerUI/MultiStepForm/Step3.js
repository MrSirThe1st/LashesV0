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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../../Store";
import { ProgressBar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import FeatherIcon from "react-native-vector-icons/Feather";

const data = [
  {
    value: "0",
    label: "Hair Styling",
  },
  {
    value: "1",
    label: "Makeup",
  },
  {
    value: "2",
    label: "Tailoring",
  },
  {
    value: "3",
    label: "Manicures",
  },
  {
    value: "4",
    label: "Skincare",
  },
  {
    value: "5",
    label: "Nutrition",
  },
  {
    value: "6",
    label: "Jewelry",
  },
  {
    value: "7",
    label: "Event planning",
  },
  {
    value: "8",
    label: "Baking",
  },
  {
    value: "9",
    label: "Health & Fitness",
  },
  {
    value: "10",
    label: "Handmade",
  },
  {
    value: "11",
    label: "Babies & kids",
  },
];

const Step3 = ({ navigation, route }) => {
  const { role } = route.params;
  const [isFocus, setIsFocus] = useState(false);
  const [service, setService] = useState("");
  const [brief, setBrief] = useState("");
  const [overview, setOverview] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  const onSubmit = (data) => {
    // Update WizardStore with form data and navigate to the next step
    WizardStore.update((s) => {
      s.overview = data.overview;
      s.brief = data.brief;
    });
    navigation.navigate("Step4", { role: "seller" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.FormContainer}>
            <View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.title}>
                  Tell us what you<Text style={{ color: "#1e90ff" }}> do </Text>
                </Text>
              </View>

              <View style={styles.DropdownContainer}>
                <View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Dropdown
                        style={[
                          styles.dropdown,
                          isFocus && { borderColor: "blue" },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? "Service provided" : ""}
                        searchPlaceholder="Search"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                          // Handle the selected item from the fourth dropdown if needed
                          setIsFocus(false);
                        }}
                      />
                    )}
                    name="item"
                    defaultValue={null} // Set the initial value for the fourth dropdown
                  />
                </View>
              </View>
              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                      <Text style={styles.inputLabel}>
                        Not what you are looking for?
                      </Text>
                      <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => {
                          setService(text);
                          onChange(text);
                        }}
                        placeholder="create a new service"
                        placeholderTextColor="#6b7280"
                        style={styles.inputControl}
                        value={service}
                        autoCapitalize="none"
                        onBlur={onBlur}
                      />
                    </View>
                  )}
                  name="service"
                />
              </View>
              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.input}>
                      <Text style={styles.inputLabel}>
                        write a small brief?
                      </Text>
                      <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => {
                          setBrief(text);
                          onChange(text);
                        }}
                        placeholder="eg. I make incredible nails"
                        placeholderTextColor="#6b7280"
                        style={styles.inputControl}
                        value={brief}
                        autoCapitalize="none"
                        onBlur={onBlur}
                      />
                    </View>
                  )}
                  name="brief"
                />
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.title}>
                  Give us a small{" "}
                  <Text style={{ color: "#1e90ff" }}> Overview </Text> about
                  yourself
                </Text>
              </View>

              <View style={styles.formEntry}>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputOverview}>
                      <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => {
                          setOverview(text);
                          onChange(text);
                        }}
                        placeholder="Overview"
                        placeholderTextColor="#6b7280"
                        style={styles.inputControlOverview}
                        value={overview}
                        autoCapitalize="none"
                        onBlur={onBlur}
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={150}
                      />
                    </View>
                  )}
                  name="overview"
                />
              </View>
            </View>

            {/* Next button */}
            <View style={styles.BottomContainer}>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Step3;

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#eaf5ff",
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
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
    marginBottom: 50,
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
  inputOverview: {
    borderWidth: 2,
    borderColor: "#6fbfff",
    borderRadius: 12,
  },
  inputControlOverview: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  formEntry: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

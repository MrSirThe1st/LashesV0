import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../../Store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
 

const data = [
  { label: 'category', value: '1' },
  { label: 'category', value: '2' },
  { label: 'category', value: '3' },
  { label: 'category', value: '4' },
  { label: 'category', value: '5' },
  { label: 'category', value: '6' },
  { label: 'category', value: '7' },
  { label: 'category', value: '8' },
];

const Step3 = () => {
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
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
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 66;
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    // Update WizardStore with form data and navigate to the next step
    WizardStore.update((s) => {
      s.progress = 99;
      s.item = data.item
      s.overview = data.overview
    });
    navigation.navigate("Step3");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color="#1e90ff" // Set the color to your primary color
      />
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.title}>
            Tell Us What <Text style={{ color: "#1e90ff" }}>Service</Text> you <Text style={{ color: "#1e90ff" }}>Provide</Text>
          </Text>
        </View>

        {/* Country and City Dropdowns */}
        <View style={styles.DropdownContainer}>
          
          <View>
            <Controller
              control={control}
              rules={{ required: true }} // Add any validation rules if needed
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Service provided" : "..."}
                  searchPlaceholder="Search"
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    // Handle the selected item from the fourth dropdown if needed
                    // For example: setFourthDropdownValue(item.value);
                    setIsFocus(false);
                  }}
                />
              )}
              name="item"
              defaultValue={null} // Set the initial value for the fourth dropdown
            />
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.title}>
            Give us a small <Text style={{ color: "#1e90ff" }}> Overview </Text> about yourself
          </Text>
        </View>

        <View style={[styles.formEntry]}>
        <Controller
          control={control}
          rues={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Overview"
              placeholder="write your overview"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable
              multiline
              numberOfLines={4}
              maxLength={200}
              
            />
          )}
          name="overview"
        />
      </View>
      <Text>Drop link to personal website</Text>
      <Text>Fields for social pressence</Text>
      <Text>Add education</Text>
      <Text>Add certification</Text>
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
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  BottomContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 20,
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
});

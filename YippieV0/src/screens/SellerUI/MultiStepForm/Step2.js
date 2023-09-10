import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../../Store";
import { ProgressBar, } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";


const Step2 = ({ navigation,route  }) => {

  const [country, setCountry] = useState(""); 
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const { role } = route.params;
  const [isFocus, setIsFocus] = useState(false);

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
  

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 33;
      });
    console.log("updated state...", WizardStore.getRawState().progress);
  }, [isFocused]);

  const onSubmit = (data) => {
    // Update WizardStore with form data and navigate to the next step
    WizardStore.update((s) => {
      s.progress = 66;
      s.country = data.country;
      s.city = data.city;
      s.state = data.state;
    });
    navigation.navigate("Step3",{ username: WizardStore.getRawState().UserName});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.useState().progress / 100}
      color="#1e90ff" // Set the color to your primary color
      />
      <View>

        <View style={styles.FormContainer}>
          <View style={styles.DropdownContainer}>
            <View style={{ alignItems: "center", justifyContent: "center", marginBottom:10}}>
            <Text style={styles.title}>
              Let's Take Your <Text style={{ color: "#1e90ff" }}> Location </Text>
            </Text>
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
                      <Text style={styles.inputLabel}>Country</Text>
                      <TextInput
                        autoCorrect={false}
                        onChangeText={(text)=>{setCountry(text); onChange(text);}}
                        placeholder="Enter your country"
                        placeholderTextColor="#6b7280"
                        style={styles.inputControl}
                        value={country}
                        autoCapitalize = "none"
                        onBlur={onBlur}
                      />
                    </View>
                  )}
                  name="Country"
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
                      <Text style={styles.inputLabel}>State</Text>
                      <TextInput
                        autoCorrect={false}
                        onChangeText={(text)=>{setState(text); onChange(text);}}
                        placeholder="Enter your State"
                        placeholderTextColor="#6b7280"
                        style={styles.inputControl}
                        value={state}
                        autoCapitalize = "none"
                        onBlur={onBlur}
                      />
                    </View>
                  )}
                  name="State"
                />
                  {errors.state && (
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
                      <Text style={styles.inputLabel}>Confirm password</Text>
                      <TextInput
                        autoCorrect={false}
                        onChangeText={(text)=>{setCity(text); onChange(text);}}
                        placeholder="Enter your city"
                        placeholderTextColor="#6b7280"
                        style={styles.inputControl}
                        value={city}
                        autoCapitalize = "none"
                        onBlur={onBlur}
                      />
                    </View>
                  )}
                  name="City"
                />
                  {errors.city && (
                  <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
                    This is a required field.
                  </Text>
                )}
              </View>
            </View>
            
            <Text>Add language</Text>
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
    marginVertical:4
  },
  container: {
    flex: 1,
    backgroundColor:'#eaf5ff'
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
  FormContainer:{
    paddingHorizontal: 16,
    height:"100%",
    justifyContent:'space-between',
  },
  BottomContainer:{
    alignItems:'center',
    marginBottom:50,
    marginTop:'auto',
    justifyContent:'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
});

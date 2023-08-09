import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../../Store";
import { ProgressBar, } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import {API_KEY} from '@env'
import {BASE_URL} from '@env'


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

const Step2 = () => {
  // State variables for country and city dropdown data
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // Fetch country data from API when the component mounts
  useEffect(() => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/countries`,
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let countryArray = [];
        for (var i = 0; i < count; i++) {
          countryArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setCountryData(countryArray);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleState = countryCode => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/countries/${countryCode}/states`,
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Fetch city data when a country is selected
  const handleCity = (countryCode, stateCode) => {
    var config = {
      method: 'get',
      url: `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        'X-CSCAPI-KEY': API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setCityData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
        s.progress = 33;
      });
  }, [isFocused]);

  const onSubmit = (data) => {
    // Update WizardStore with form data and navigate to the next step
    WizardStore.update((s) => {
      s.progress = 66;
      s.password = data.password;
      s.country = data.country;
      s.city = data.city;
      s.state = data.state;
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
            Let's Take Your <Text style={{ color: "#1e90ff" }}> Location </Text>
          </Text>
        </View>

        {/* Country and City Dropdowns */}
        <View style={styles.DropdownContainer}>
          <View>
            <Controller
              control={control}
              rules={{ required: false}} // Add any validation rules if needed
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={countryData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select country" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setCountry(item.value);
                    handleState(item.value);
                    setCountryName(item.label);
                    setIsFocus(false);
                  }}
                />
              )}
              name="country"
              defaultValue={country} // Set the initial value from WizardStore
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{ required: false }} // Add any validation rules if needed
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={cityData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select state" : "..."}
                  searchPlaceholder="Search..."
                  value={state}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setState(item.value);
                    handleCity(country, item.value);
                    setStateName(item.label);
                    setIsFocus(false);
                  }}
                />
              )}
              name="state"
              defaultValue={state} // Set the initial value from WizardStore
            />
          </View>
          <View>
            <Controller
              control={control}
              rules={{ required: false }} 
              render={({ field: { onChange, onBlur, value } }) => (
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={cityData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select city" : "..."}
                  searchPlaceholder="Search..."
                  value={city}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setCity(item.value);
                    setCityName(item.label);
                    setIsFocus(false);
                  }}
                />
              )}
              name="city"
              defaultValue={city} // Set the initial value from WizardStore
            />
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
    </SafeAreaView>
  );
};

export default Step2;

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

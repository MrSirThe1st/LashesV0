import { StyleSheet, Text, View, Alert,TouchableOpacity, SafeAreaView, StatusBar, Image} from 'react-native'
import React, { useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from '../../../Store';
import { Button, MD3Colors, ProgressBar, TextInput} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Step1 = () => {

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
        s.progress = 0;
      });

  }, [isFocused]);

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 33;
      s.UserName = data.UserName;
      s.email = data.email;
      s.cellphoneNumber = data.cellphoneNumber;
      s.password = data.password;
      s.confirmPassword = data.confirmPassword
    });
    navigation.navigate("Step2");
  };
  return (
    <SafeAreaView  style={styles.container}>
    <StatusBar backgroundColor="#1e90ff"barStyle="light-content"/>
    <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color="#1e90ff" // Set the color to your primary color
    />
    <View style={{ paddingHorizontal: 16 }}>
      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.title}>Let's Take In Your <Text style={{ color: '#1e90ff' }}>Informations</Text></Text>
      </View>
  {/* username */}

      <View style={styles.formEntry}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="UserName"
              placeholder="Enter your UserName"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              
            />
          )}
          name="UserName"
        />
        {errors.UserName && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

{/* email Address */}

      <View style={[styles.formEntry]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Email"
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType={'email-address'}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

{/* cellphoneNumber */}

      <View style={[styles.formEntry]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Cellphone Number"
              placeholder="Enter your cellphoneNumber "
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="cellphoneNumber"
        />
        {errors.cellphoneNumber  && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            This is a required field.
          </Text>
        )}
      </View>

{/* password */}


      <View style={[styles.formEntry]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Create a password "
              right={<TextInput.Icon icon="eye" />}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="password"
        />
        {errors.password  && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            Create a password before proceeding.
          </Text>
        )}
      </View>

      <View style={[styles.formEntry]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Confirm Password"
              placeholder="Create a password "
              right={<TextInput.Icon icon="eye" />}
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword  && (
          <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
            Create a password before proceeding.
          </Text>
        )}
      </View>

      <View style={{alignItems:'center', justifyContent:'center',}}>
          <TouchableOpacity>
            <Image source={require('../../../assets/icons/woman.png')}
              style={{width:150, height:150, borderWidth:2, borderColor:'#1e90ff',borderRadius:100,
              resizeMode:'contain'
            
            }}
            />
          </TouchableOpacity>
        </View>

{/* next button */}

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
            <Text style={{ color: "white" }}>Save your information</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView >
  )
}

export default Step1

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
  BottomContainer:{
    marginHorizontal:20,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize: 30,
    fontWeight:'bold'
  }
})
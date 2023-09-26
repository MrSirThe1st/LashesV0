import { StyleSheet, Text, View, Alert,TouchableOpacity, SafeAreaView, StatusBar, TextInput} from 'react-native'
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from '../../../Store';
import { ProgressBar} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";



const Step1 = ({ navigation, route }) => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [cellphoneNumber, setCellphoneNumber] = useState('');
  const { role } = route.params;

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
    navigation.navigate("Step2",{  role: 'seller' });
  };
  return (
    <SafeAreaView  style={styles.container}>
    <StatusBar backgroundColor="#1e90ff"barStyle="light-content"/>
    <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color="#1e90ff" // Set the color to your primary color
    />
    <View style={styles.FormContainer}>

      <View>
        <View style={{alignItems:'center', justifyContent:'center',}}>
          <Text style={styles.title}>Let's Take In Your <Text style={{ color: '#1e90ff' }}>Informations</Text></Text>
        </View>
        
        {/* username */}
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>UserName</Text>

                <TextInput
                  autoCapitalize="none"
                  onBlur={onBlur}
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={(text)=>{setUsername(text); onChange(text);}}
                  placeholder="john"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={username}
                />
            </View>
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>

                <TextInput
                  autoCapitalize="none"
                  onBlur={onBlur}
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={(text)=>{setEmail(text); onChange(text);}}
                  placeholder="john@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={email}
                />
            </View>
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>cellphone Number</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={(text)=>{setCellphoneNumber(text); onChange(text);}}
                  placeholder="cellphone number"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={cellphoneNumber}
                  onBlur={onBlur}
                />
            </View>
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={(text)=>{setPassword(text); onChange(text);}}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={password}
                  autoCapitalize = "none"
                  onBlur={onBlur}
                />
            </View>
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Confirm password</Text>

                <TextInput
                  autoCorrect={false}
                  onChangeText={(text)=>{setConfirmPassword(text); onChange(text);}}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={ConfirmPassword}
                  autoCapitalize = "none"
                  onBlur={onBlur}
                />
            </View>
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword  && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              Create a password before proceeding.
            </Text>
          )}
        </View>
      </View>
      
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
    marginHorizontal: 8,
    marginVertical:4
  },
  container: {
    flex: 1,
    backgroundColor:'#fafdff'
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  BottomContainer:{
    alignItems:'center',
    marginBottom:50,
    marginTop:'auto'
  },
  title:{
    fontSize: 30,
    fontWeight:'bold'
  },
  FormContainer:{
    paddingHorizontal: 16,
    height:"100%",
    justifyContent:'space-between'
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
})
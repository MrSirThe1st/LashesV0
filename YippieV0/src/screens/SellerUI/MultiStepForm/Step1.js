import { StyleSheet, Text, View, Alert,TouchableOpacity, SafeAreaView, StatusBar, Image} from 'react-native'
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from '../../../Store';
import { ProgressBar, TextInput} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import UserAvatar from 'react-native-user-avatar';



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
    navigation.navigate("Step2",{ username: WizardStore.getRawState().UserName, });
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
              <TextInput
                mode="outlined"
                label="UserName"
                placeholder="Enter your UserName"
                onBlur={onBlur}
                onChangeText={(text)=>{setUsername(text); onChange(text);}}
                value={username}
                
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                onBlur={onBlur}
                onChangeText={(text)=>{setEmail(text); onChange(text);}}
                value={email}
                keyboardType={'email-address'}
                autoCapitalize = "none"
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Cellphone Number"
                placeholder="Enter your cellphoneNumber "
                onBlur={onBlur}
                onChangeText={setCellphoneNumber}
                value={cellphoneNumber}
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Password"
                placeholder="Create a password "
                right={<TextInput.Icon icon="eye" />}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={(text)=>{setPassword(text); onChange(text);}}
                value={password}
                keyboardType="numeric"
                autoCapitalize = "none"
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
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="Confirm Password"
                placeholder="Create a password "
                right={<TextInput.Icon icon="eye" />}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(text)=>{setConfirmPassword(text); onChange(text);}}
                value={ConfirmPassword}
                keyboardType="numeric"
                autoCapitalize = "none"
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
        <View style={{alignItems:'center', justifyContent:'center', marginVertical:20}}>
          <View >
            <UserAvatar size={100} name={username} bgColor='#1e90ff' borderRadius={50}/>
          </View>
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
    margin: 8,
  },
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  progressBar: {
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  BottomContainer:{
    alignItems:'center',
    marginBottom:50
  },
  title:{
    fontSize: 30,
    fontWeight:'bold'
  },
  FormContainer:{
    paddingHorizontal: 16,
    height:"100%",
    justifyContent:'space-between'
  }
})
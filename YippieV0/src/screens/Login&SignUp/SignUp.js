import React, {useState} from "react";
import { StyleSheet, View, Image, Text, Pressable, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../componets/BackButton";


const SignUp = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [cellphoneNumber, onChangeCellphoneNumber] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.Wrapper}>
        <Text style={styles.title}>Create an Account</Text>
        <Text>LOCATION</Text>
      <View style={styles.inputContainer}>
        <Icon name='account-circle' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={onChangeUsername}
          placeholder={'Userame'}
          keyboardType={'default'}
        />
      </View>
        <Text>The username will be publicly visible</Text>
        <View style={styles.inputContainer}>
        <Icon name='alternate-email' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={onChangeEmail}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name='lock' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          cellphoneNumber
          onChangeText={onChangeCellphoneNumber}
          placeholder={'Cellphone Number'}
          keyboardType={'default'}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name='lock' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
          placeholder={'Password'}
          keyboardType={'default'}
          secureTextEntry={true}
        />
      </View>
        <Text>Combine upper and lower case letters and numbers</Text>
        <View style={styles.inputContainer}>
            <Icon name='lock' size={24} color='black' style={styles.icon} />
            <TextInput
            style={styles.input}
            value={password}
            onChangeText={onChangePassword}
            placeholder={'Confirm Password'}
            keyboardType={'default'}
            secureTextEntry={true}
            />
      </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.InnerbottomContainer}>
          <Text style={styles.forgotPasswordText}>Choose instead to</Text>
          <Pressable style={styles.button}>
            <View style={styles.buttonContent}>
              <Image
                source={require('../../assets/icons/google(1).png')}
                style={[styles.buttonIcon, { width: 30, height: 30 }]}
              />
              <Text style={styles.text}>Login With Google</Text>
            </View>
          </Pressable>
          <Pressable style={styles.button}>
            <View style={styles.buttonContent}>
              <Image
                source={require('../../assets/icons/facebook(1).png')}
                style={[styles.buttonIcon, { width: 30, height: 30 }]}
              />
              <Text style={styles.text}>Login With Facebook</Text>
            </View>
          </Pressable>
          <Pressable style={styles.button}>
            <View style={styles.buttonContent}>
              <Image
                // source={require('../assets/icons/EmailIcon.png')}
                style={[styles.buttonIcon, { width: 20, height: 20 }]}
              />
              <Text style={styles.text}>Log In With Email</Text>
            </View>
          </Pressable>
          <View style={styles.footer}>
            <Text>Already have an account?</Text>
            <Pressable>
              <Text  style={styles.forgotPasswordText}>Login here</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  Wrapper: {
    flex: 2,
    alignItems:'center',
    justifyContent:'center'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10
  },
  InnerbottomContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: '#eaf5ff',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    width: "95%",
    alignItems:'center'
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },
  input:{
    width:"90%",
    height: 45,
    margin: 12,
    fontSize: 18,
    color:'black',
  },
  inputContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal:15,
    paddingVertical:10,
    margin: 12,
    width:"90%",
    height: 45,
  },
  forgotPasswordContainer: {
    position: 'absolute',
    right: 12,
    justifyContent: 'center',
    height: '100%',
  },
  forgotPasswordText: {
    color: '#1e90ff',
    fontWeight: 'bold',
    marginLeft: 5
  },
  footer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize: 30,
    fontWeight:'bold',
  }
});

export default SignUp;

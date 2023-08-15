import React, {useState} from "react";
import { StyleSheet, View, Image, Text, Pressable, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../componets/BackButton";
import { FIREBASE_AUTH } from "../../config/firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('')
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Signed in successfully')
    } catch (error){
      console.log(error);
      alert('Sign in failed: ' + error.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <BackButton navigation={navigation} />
      </View>
      <View style={styles.Wrapper}>
      <View style={styles.inputContainer}>
        <Icon name='alternate-email' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize = "none"
          onChangeText={(text) => setEmail(text)}
          placeholder={'Email'}
          keyboardType={'email-address'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name='account-circle' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder={'Userame'}
          keyboa  rdType={'default'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name='lock' size={24} color='black' style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder={'Password'}
          keyboardType={'default'}
          secureTextEntry={true}
          autoCapitalize = "none"
        />
        <View style={styles.forgotPasswordContainer}>
          <Pressable>
            <Text style={styles.forgotPasswordText}>Forgot?</Text>
          </Pressable>
        </View>
      </View>
      {/* Loading indicator */}
      {loading ? (
          <ActivityIndicator size="large" color="#1e90ff" />
        ) : (
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={signIn}
            disabled={false} 
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.InnerbottomContainer}>
          <Text style={styles.forgotPasswordText}>Choose instead to</Text>
          <Pressable style={styles.button}>
              <Image
                source={require('../../assets/icons/google(1).png')}
                style={[styles.buttonIcon, { width: 30, height: 30 }]}
              />
              <View style={{justifyContent:'center',alignItems:'center', flex:1,}}>
                <Text style={[styles.text, { flex: 1,  }]}>Login With Google</Text>
              </View>
          </Pressable>
          <Pressable style={styles.button}>
                  <Image
                      source={require('../../assets/icons/facebook(1).png')}
                      style={[styles.buttonIcon, { width:30, height: 30}]}
                    />
                  <View style={{justifyContent:'center',alignItems:'center', flex:1,}}>
                    <Text style={[styles.text, { flex: 1,  }]}>Login With Facebook</Text>
                  </View>
          </Pressable>
          <View style={styles.footer}>
            <Text>New to the app?</Text>
            <Pressable>
              <Text  style={styles.forgotPasswordText}>Sign up here</Text>
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
    backgroundColor:"#fafdff"
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
    backgroundColor: '#1e90ff',
    marginHorizontal: 20,
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 50,
    width: "95%",
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },

  buttonIcon: {
    backgroundColor:'white',
    borderRadius:50
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input:{
    width:"90%",
    height: 45,
    margin: 12,
    fontSize: 18,
    color:'black'
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
  buttonSignUp:{
    backgroundColor:"#1e90ff",
    borderRadius:5,
    padding:10,
    margin:10,
    alignItems:'center',
    color:'white',
    width:'90%'
  },
  buttonText:{
    color:'white',
    fontWeight:'bold'
  },

});

export default Login;

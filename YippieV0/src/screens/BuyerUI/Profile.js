import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import Separator from '../../componets/Separator';
import { StatusBar } from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e90ff"
        barStyle="light-content"/>
      <View style={styles.stickyHeader}>
        <View style={styles.avatar}>
          <Image style={styles.image} source={require('../../assets/homeAssets/avatar.jpg')}/>
        </View>
        <Text style={styles.name}>Marc Ilunga Mbuyu</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.button}>
            <Icon name="account-circle" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>Account</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity style={styles.button}>
            <Icon name="settings" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity style={styles.button}>
            <Icon name="favorite" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>favorites</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity style={styles.button}>
            <Icon name="account-balance-wallet" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>payments methode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.button}>
            <Icon name="account-circle" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>Account</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity style={styles.button}>
            <Icon name="settings" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity style={styles.button}>
            <Icon name="settings" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>preferences</Text>
          </TouchableOpacity>
          <Separator/>
          <TouchableOpacity style={styles.button}>
            <Icon name="settings" size={28} color="#1e90ff" style={styles.icon} />
            <Text style={styles.text}>other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#E5E4E2'
  },
  stickyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 200,
    backgroundColor:'#1e90ff',
    
  },
  content:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    
  },
  settingsCard:{
    backgroundColor:"#f2f2f2",
    borderRadius:10,
    width:'90%',
    marginVertical:20
    
  },
  button:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  text:{
    paddingHorizontal:10,
    fontWeight:'bold'
  },
  name:{
    color:'white',
    fontSize:25,
    fontWeight:'bold'
  },
  avatar:{
    borderRadius:50,
    backgroundColor:'white',
    width: 80,
    height: 80,
    overflow: 'hidden',
    marginRight: 10
  },
  image:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
})
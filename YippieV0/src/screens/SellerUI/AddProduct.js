import {
    StyleSheet,
    Switch,
    TextInput,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import Swiper from 'react-native-swiper';
import PicturesData from '../../componets/PicturesData';
import { BottomSheet } from '@rneui/themed';


const AddProduct = () => {
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [selected, setSelected] = useState(undefined);
    const [query, setQuery] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploading, setUploading] = useState(false);


  const onSearch = (text) => {
    setQuery(text);
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="light-content"/>
        <View style={styles.Wrapper}>
             <PicturesData/> 
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={name}
                    autoCapitalize = "none"
                    onChangeText={(text) => setName(text)}
                    placeholder={'product name'}
                    keyboardType={'default'}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    value={price}
                    autoCapitalize = "none"
                    onChangeText={(text) => setPrice(text)}
                    placeholder={'Price'}
                    keyboardType={'default'}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={description}
                    autoCapitalize = "none"
                    onChangeText={(text) => setDescription(text)}
                    placeholder={'description'}
                    keyboardType={'default'}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={description}
                    autoCapitalize = "none"
                    onChangeText={(text) => setCategory(text)}
                    placeholder={'category'}
                    keyboardType={'default'}/>
            </View>
            
        </View>           
      
        
    </View>
  )
}

export default AddProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        paddingVertical: 5,
      },
      Wrapper:{
        flex:1,
        alignItems:'center'
      },
      AddInput:{
        alignItems:'center',
        width:"95%",
        borderColor:"#1e90ff",
        borderWidth:1,
        marginBottom:10,
        borderRadius:10,

      },
      AddInputInner:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#1e90ff",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical:10
      },
      AddText:{
        fontSize: 13,
        color:'white'
      },
      input:{
        width:"95%",
        height: 45,
        margin: 12,
        fontSize: 18,
        color:'black',
      },
      inputContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1,
        borderColor: '#1e90ff',
        borderRadius: 5,
        paddingHorizontal:10,
        paddingVertical:20,
        margin: 12,
        width:"95%",
        height: 45,
      },
      photos: {
        position: 'relative',
        height: 130,
        overflow: 'hidden',
        padding:8
      },
      photosPagination: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: '#1e90ff',
        borderRadius: 12,
      },
      photosPaginationText: {
        fontWeight: '600',
        fontSize: 10,
        color: '#fbfbfb',
      },
      photosImg: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        width: '100%',
        height: 130,
        
      },

    
})
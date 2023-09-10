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

const AddProduct = () => {
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState(undefined);
    const [query, setQuery] = useState('');
    const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const onSearch = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1e90ff" barStyle="light-content"/>
        <View style={styles.Wrapper}>
            <TouchableOpacity style={styles.AddInput}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.AddText}>Add</Text>
                        <FeatherIcon color="#1e90ff" name="file-plus" size={18} />
                    </View>   
            </TouchableOpacity>
            <Text>Select a several pictures of your product:0/5</Text>
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
            <View>
     
            </View>
        </View>
        
    </SafeAreaView>
  )
}

export default AddProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      Wrapper:{
        flex:1,
        alignItems:'center'
      },
      AddInput:{
        alignItems:'center',
        justifyContent:'center',
        height:"15%",
        width:"95%",
        borderColor:"#1e90ff",
        borderWidth:1,
        backgroundColor:'#eaf5ff',
        marginTop:30,
        marginBottom:10,
        borderRadius:10
      },
      AddText:{
        fontSize: 16,
        fontWeight:'bold'
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
    
})
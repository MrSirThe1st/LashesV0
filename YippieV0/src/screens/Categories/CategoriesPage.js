import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Pressable } from 'react-native';
import React from 'react';

const services = [
  {
    id: "1",
    image: require("../../assets/homeAssets/buy.png"),
    name: "event",
  },
  {
    id: "2",
    image: require("../../assets/homeAssets/cake.png"),
    name: "name",
  },
  {
    id: "3",
    image: require("../../assets/homeAssets/nail-art.png"),
    name: "name",
  },
  {
    id: "4",
    image: require("../../assets/homeAssets/sewing(1).png"),
    name: "name",
  },
  {
    id: "5",
    image: require("../../assets/homeAssets/cake.png"),
    name: "name",
  },
  {
    id: "6",
    image: require("../../assets/homeAssets/cake.png"),
    name: "name",
  },
  {
    id: "7",
    image: require('../../assets/homeAssets/nail-art.png'),
    name: "name",
  },
  {
    id: "8",
    image: require('../../assets/homeAssets/nail-art.png'),
    name: "name",
  },
  {
    id: "9",
    image: require('../../assets/homeAssets/nail-art.png'),
    name: "name",
  },
  {
    id: "10",
    image: require('../../assets/homeAssets/nail-art.png'),
    name: "name",
  },
  {
    id: "11",
    image: require('../../assets/homeAssets/nail-art.png'),
    name: "name",
  },
  {
    id: "12",
    image: require('../../assets/homeAssets/nail-art.png'),
    name: "name",
  },
  
];

const Item = ({image, name}) => (
  <View style={styles.itemContainer}>
      <Pressable style={styles.pressable}>
        <View style={styles.pressableImage}>
          <Image source={image} style={styles.image} />
          <View>
            <Text style={styles.text}>{name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
)

const CategoriesPage = () => {
  const renderItem = ({ item }) => <Item image={item.image} name={item.name}/>

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3} 
        />    
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  itemContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:8,
    paddingVertical:20,
    backgroundColor:'white'
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableImage: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal:20,
    paddingVertical:12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  text:{
    fontWeight:'bold'
  }
});

export default CategoriesPage;

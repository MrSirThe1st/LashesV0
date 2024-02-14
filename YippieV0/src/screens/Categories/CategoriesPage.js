import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../../componets/Search";
import { SafeAreaView } from "react-native-safe-area-context";

const services = [
  {
    id: "1",
    image: require("../../assets/Assets/hair.jpg"),
    name: "Hair Styling",
  },
  {
    id: "2",
    image: require("../../assets/Assets/makeup2.jpg"),
    name: "Makeup",
  },
  {
    id: "3",
    image: require("../../assets/Assets/tailor1.jpg"),
    name: "Tailoring",
  },
  {
    id: "4",
    image: require("../../assets/Assets/nails.jpg"),
    name: "Manicures",
  },
  {
    id: "5",
    image: require("../../assets/Assets/skin.jpg"),
    name: "Skincare",
  },
  {
    id: "6",
    image: require("../../assets/Assets/food.jpg"),
    name: "Nutrition",
  },
  {
    id: "7",
    image: require("../../assets/Assets/jewel.jpg"),
    name: "Jewelry",
  },
  {
    id: "8",
    image: require("../../assets/Assets/Miscellaneous.jpg"),
    name: "Miscellaneous",
  },
  {
    id: "9",
    image: require("../../assets/Assets/cake.jpg"),
    name: "Baking",
  },
  {
    id: "11",
    image: require("../../assets/Assets/handmade.jpg"),
    name: "Handmade",
  },
];

const Item = ({ image, name, navigation }) => (
  <View style={styles.itemContainer}>
    <Pressable
      style={styles.pressable}
      onPress={() =>
        navigation.navigate("CategoryScreen", { service: { image, name } })
      }
    >
      <View style={styles.pressableImage}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>
      <View>
        <Text style={styles.text}>{name}</Text>
      </View>
    </Pressable>
  </View>
);

const CategoriesPage = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item image={item.image} name={item.name} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressableImage: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical:10
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafdff",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: "grey",
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  View: {
    height: 70,
    justifyContent:'center'
  },
});

export default CategoriesPage;

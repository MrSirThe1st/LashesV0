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
    image: require("../../assets/homeAssets/hairstlye-salon-1.png"),
    name: "Hair Styling",
  },
  {
    id: "2",
    image: require("../../assets/homeAssets/makeup-3.png"),
    name: "Makeup",
  },
  {
    id: "3",
    image: require("../../assets/homeAssets/dress-1.png"),
    name: "Tailoring",
  },
  {
    id: "4",
    image: require("../../assets/homeAssets/nail-polish-1.png"),
    name: "Manicures",
  },
  {
    id: "5",
    image: require("../../assets/homeAssets/skincare-cream-4.png"),
    name: "Skincare",
  },
  {
    id: "6",
    image: require("../../assets/homeAssets/tableware.png"),
    name: "Nutrition",
  },
  {
    id: "7",
    image: require("../../assets/homeAssets/diamon-hands-1.png"),
    name: "Jewelry",
  },
  {
    id: "8",
    image: require("../../assets/homeAssets/work-calendar.png"),
    name: "Event planning",
  },
  {
    id: "9",
    image: require("../../assets/homeAssets/celebration-cake-4.png"),
    name: "Baking",
  },
  {
    id: "10",
    image: require("../../assets/homeAssets/drumbell-fitness-1.png"),
    name: "Health & Fitness",
  },
  {
    id: "11",
    image: require("../../assets/homeAssets/scissors-2.png"),
    name: "Handmade",
  },
  {
    id: "12",
    image: require("../../assets/homeAssets/trolley.png"),
    name: "Babies & kids",
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
      <View style={styles.View}>
        <Search navigation={navigation} />
      </View>

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
    fontSize: 20,
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

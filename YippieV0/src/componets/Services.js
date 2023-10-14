import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Services = ({navigation}) => {
  const services = [
    {
      id: "0",
      image: require("../assets/homeAssets/hair1.jpg"),
      name: "Hair Styling",
    },
    {
      id: "1",
      image: require("../assets/homeAssets/makeup.jpg"),
      name: "Makeup",
    },
    {
      id: "2",
      image: require("../assets/homeAssets/tailor.jpg"),
      name: "Tailoring",
    },
    {
      id: "3",
      image: require("../assets/homeAssets/manicure.jpg"),
      name: "Manicures",
    },
    {
      id: "4",
      image: require("../assets/homeAssets/skincare1.jpg"),
      name: "Skincare",
    },
    {
      id: "5",
      image: require("../assets/homeAssets/food.jpg"),
      name: "Nutrition",
    },
    {
      id: "6",
      image: require("../assets/homeAssets/jewel.jpg"),
      name: "Jewelry",
    },
    {
      id: "7",
      image: require("../assets/homeAssets/event.jpg"),
      name: "Event planning",
    },
    {
      id: "8",
      image: require("../assets/homeAssets/cake.jpg"),
      name: "Baking",
    },
    {
      id: "9",
      image: require("../assets/homeAssets/fitness.jpg"),
      name: "Health & Fitness",
    },
    {
      id: "10",
      image: require("../assets/homeAssets/hand.jpg"),
      name: "Handmade ",
    },
    
  ];
  const windowWidth = Dimensions.get("window").width;
  const itemWidth = windowWidth / 3;
  const imageWidth = itemWidth - 24; 
  const imageHeight = imageWidth * 0.8; 

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Categories</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Categories")}
        >
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowText}>See all</Text>
            <Icon
              name="chevron-right"
              size={25}
              color="#1e90ff"
              style={styles.arrow}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <Pressable
            style={[styles.pressable, { width: itemWidth }]}
            key={service.id}
          >
            <View style={[styles.pressableImage, { width: imageWidth, height: imageHeight }]}>
              <Image source={service.image} style={styles.image} />
            </View>
            <View>
              <Text>{service.name}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius:5,
    
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom:30,
  },
  pressableImage: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    
  },
  text: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    width: 110,
    marginLeft: 5,
    marginTop: 10,
  },
  arrowText: {
    margin: 12,
  },
});
import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Services = ({ navigation }) => {
  const services = [
    {
      id: "0",
      image: require("../assets/homeAssets/hairstlye-salon-1.png"),
      name: "Hair Styling",
    },
    {
      id: "1",
      image: require("../assets/homeAssets/makeup-3.png"),
      name: "Makeup",
    },
    {
      id: "2",
      image: require("../assets/homeAssets/dress-1.png"),
      name: "Tailoring",
    },
    {
      id: "3",
      image: require("../assets/homeAssets/nail-polish-1.png"),
      name: "Manicures",
    },
    {
      id: "4",
      image: require("../assets/homeAssets/skincare-cream-4.png"),
      name: "Skincare",
    },
    {
      id: "5",
      image: require("../assets/homeAssets/tableware.png"),
      name: "Nutrition",
    },
    {
      id: "6",
      image: require("../assets/homeAssets/diamon-hands-1.png"),
      name: "Jewelry",
    },
    {
      id: "7",
      image: require("../assets/homeAssets/work-calendar.png"),
      name: "Event planning",
    },
    {
      id: "8",
      image: require("../assets/homeAssets/celebration-cake-4.png"),
      name: "Baking",
    },
    {
      id: "9",
      image: require("../assets/homeAssets/drumbell-fitness-1.png"),
      name: "Health & Fitness",
    },
    {
      id: "10",
      image: require("../assets/homeAssets/scissors-2.png"),
      name: "Handmade ",
    },
    {
      id: "11",
      image: require("../assets/homeAssets/trolley.png"),
      name: "Babies ",
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
            onPress={() => navigation.navigate("CategoryScreen", { service })}
          >
            <View
              style={[
                styles.pressableImage,
                { width: imageWidth, height: imageHeight },
              ]}
            >
              <Image source={service.image} style={styles.image} />
            </View>
            <Text>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 5,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
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
    fontSize: 18,
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
    fontWeight: "bold",
  },
});

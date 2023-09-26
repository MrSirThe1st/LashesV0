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
      image: require("../assets/homeAssets/mountain.png"),
      name: "event",
    },
    {
      id: "1",
      image: require("../assets/homeAssets/island.png"),
      name: "name",
    },
    {
      id: "2",
      image: require("../assets/homeAssets/sunset.png"),
      name: "name",
    },
    {
      id: "3",
      image: require("../assets/homeAssets/mountain.png"),
      name: "name",
    },
    {
      id: "4",
      image: require("../assets/homeAssets/island.png"),
      name: "name",
    },
    {
      id: "5",
      image: require("../assets/homeAssets/salon.jpg"),
      name: "name",
    },
    {
      id: "6",
      image: require("../assets/homeAssets/salon.jpg"),
      name: "name",
    },
  ];
  const windowWidth = Dimensions.get("window").width;
  const itemWidth = windowWidth / 4;
  const imageWidth = itemWidth - 24; // Adjusted width to leave space for margins and padding
  const imageHeight = imageWidth * 0.8; // Assuming an aspect ratio of 5:4 (you can adjust this based on your image aspect ratio)

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
  container: {},
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius:5,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom:30
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
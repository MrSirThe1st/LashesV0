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
      image: require("../assets/Assets/hair.jpg"),
      name: "Hair Styling",
    },
    {
      id: "1",
      image: require("../assets/Assets/makeup2.jpg"),
      name: "Makeup",
    },
    {
      id: "2",
      image: require("../assets/Assets/tailor1.jpg"),
      name: "Tailoring",
    },
    {
      id: "3",
      image: require("../assets/Assets/nails.jpg"),
      name: "Manicures",
    },
    {
      id: "4",
      image: require("../assets/Assets/skin.jpg"),
      name: "Skincare",
    },
    {
      id: "5",
      image: require("../assets/Assets/food.jpg"),
      name: "Nutrition",
    },
    {
      id: "6",
      image: require("../assets/Assets/jewel.jpg"),
      name: "Jewelry",
    },
    {
      id: "7",
      image: require("../assets/Assets/Miscellaneous.jpg"),
      name: "Miscellaneous",
    },
    {
      id: "8",
      image: require("../assets/Assets/cake.jpg"),
      name: "Baking",
    },
    {
      id: "10",
      image: require("../assets/Assets/handmade.jpg"),
      name: "Handmade",
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
            <View style={styles.carroussel}>
              <View
                style={[
                  styles.pressableImage,
                  { width: imageWidth, height: imageHeight },
                ]}
              >
                <Image source={service.image} style={styles.image} />
              </View>
              <Text style={styles.carrousselText}>{service.name}</Text>
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
    
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  pressable: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  pressableImage: {
   
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
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
    color:"#1e90ff",
    fontSize:15
  },
  carroussel: {
    backgroundColor: "white",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  carrousselText:{
    padding:5,
    fontWeight:'600'
  }
});

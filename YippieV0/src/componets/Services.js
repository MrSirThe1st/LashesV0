import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Services = ({navigation}) => {
  const services = [
    {
      id: "0",
      image: require("../assets/homeAssets/birthday.png"),
      name: "event",
    },
    {
      id: "1",
      image: require("../assets/homeAssets/cake.png"),
      name: "name",
    },
    {
      id: "2",
      image: require("../assets/homeAssets/nail-art.png"),
      name: "name",
    },
    {
      id: "3",
      image: require("../assets/homeAssets/sewing(1).png"),
      name: "name",
    },
    {
      id: "4",
      image: require("../assets/homeAssets/cake.png"),
      name: "name",
    },
  ];
  return (
    <View style={styles.Container}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.Text}>Categories</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Categories")}>
          <View style={[styles.ArrowContainer]}>
            <Text style={styles.ArrowText}>See all</Text>
            <Icon name="chevron-right" size={25} color="#1e90ff" style={styles.arrow}  />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <Pressable style={styles.Pressable} key={service.id}>
            <View style={styles.PressableImage}>
              <Image source={service.image} style={styles.Image} />
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
  Container: {},
  Image: {
    width: 70,
    height: 70,
  },
  Pressable: {
    alignItems: "center",
    justifyContent: "center",
  },
  PressableImage: {
    backgroundColor: "#f2f2f2",
    margin: 12,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  ArrowContainer: {

    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    width: 110,
    marginLeft: 5,
    marginTop: 10,
  },
  ArrowText: {
    margin: 12,
  },
});

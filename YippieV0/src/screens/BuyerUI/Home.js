import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import Services from "../../componets/Services";


const YourLogoComponent = () => (
  <Image
    source={require("../../assets/icons/lashes-Good3.png")}
    style={{ width: 100, height: 40 }}
    resizeMode="contain"
  />
);

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stickyHeader}>
        <YourLogoComponent />
      </View>
      <View style={styles.content}>
        <View style={styles.SearchContainer}>
          <Icon name="search" size={28} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search for services or sellers"
            placeholderTextColor="gray"
          />
        </View>
          <Services navigation={navigation}/>
      </View>
      <View>
        <Text>content cards displayed based on intrest</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  stickyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  content: {
    flex: 1,
  },
  SearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 8,
    margin: 12,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

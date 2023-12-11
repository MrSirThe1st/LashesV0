import React, { useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialIcons } from "@expo/vector-icons";
import Styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import Product from "../../componets/Product";
import Service from "../../componets/Service";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal1 from "../../componets/modal1";
import Modal2 from "../../componets/modal2";
import Modal3 from "../../componets/modal3";
import Modal4 from "../../componets/modal4";
import Modal5 from "../../componets/modal5";
import Modal6 from "../../componets/modal6";
import Modal7 from "../../componets/modal7";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../config/firebase";

const SellerProfile = () => {
  const [value, setValue] = React.useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const auth = FIREBASE_AUTH;

  const SECTIONS = [
    {
      header: "Catalogue",
      icon: "shopping-bag",
      items: (
        <ScrollView style={Styles.Content} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.customContent}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddProduct");
                }}
              >
                <View style={Styles.addProduct}>
                  <Text style={Styles.addText}>Add a product</Text>
                  <FeatherIcon color="#fff" name="plus" size={16} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={Styles.customContent}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddService");
                }}
              >
                <View style={Styles.addProduct}>
                  <Text style={Styles.addText}>Add a service</Text>
                  <FeatherIcon color="#fff" name="plus" size={16} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Product />
            <Service />
          </View>
        </ScrollView>
      ),
    },
    {
      header: "Preferences",
      icon: "settings",
      items: (
        <View style={{ flex: 1 }}>
          <View contentContainerStyle={Styles.containerSettings}>
            <View style={Styles.section}>
              <Modal1 />
              <TouchableOpacity onPress={() => ""}>
                <View style={Styles.row}>
                  <View style={[Styles.rowIcon]}>
                    <FeatherIcon color="black" name="moon" size={18} />
                  </View>

                  <Text style={Styles.rowLabel}>Dark Mode</Text>

                  <View style={Styles.rowSpacer} />

                  <Switch value={false} />
                </View>
              </TouchableOpacity>
              <Modal2 />
              <Modal3 />
            </View>
          </View>
        </View>
      ),
    },
    {
      header: "profile",
      icon: "user",
      items: (
        <View style={{ flex: 1 }}>
          <View contentContainerStyle={Styles.containerSettings}>
            <View style={Styles.section}>

              <Modal4 navigation={navigation} />

              <Modal5 />

              <Modal6 />

              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={Styles.row}>
                  <View style={[Styles.rowIcon]}>
                    <MaterialIcons name="logout" size={18} color="#dc143c" />
                  </View>

                  <Text style={Styles.rowLabel}>Logout</Text>

                  <View style={Styles.rowSpacer} />
                </View>
              </TouchableOpacity>

              <Modal7 />
            </View>
          </View>
        </View>
      ),
    },
    {
      header: "Dates",
      icon: "calendar",
      items: (
        <ScrollView style={Styles.Content}>
          <View style={Styles.customContent}></View>
          <View>
            <Text>calendar and notes here</Text>
          </View>
        </ScrollView>
      ),
    },
  ];

  const { tabs } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        name: header,
        icon,
      })),
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#f8f8f8", flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="light-content" />

      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <TouchableWithoutFeedback>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles.profileAvatar}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("EditAccount");
            }}
          >
            <View style={styles.profileBody}>
              <Text style={styles.profileName}>Marc im</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.tabs}>
            {tabs.map(({ name, icon }, index) => {
              const isActive = index === value;

              return (
                <View
                  key={name}
                  style={[
                    styles.tabWrapper,
                    isActive && {
                      borderBottomColor: "#1e90ff",
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setValue(index);
                    }}
                  >
                    <View style={styles.tab}>
                      <FeatherIcon
                        color={isActive ? "#1e90ff" : "#eaf5ff"}
                        name={icon}
                        size={16}
                      />

                      <Text
                        style={[
                          styles.tabText,
                          isActive && { color: "#1e90ff" },
                        ]}
                      >
                        {name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          {SECTIONS[value].items}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3d3d3d",
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: "#989898",
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#e5e7eb",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    marginLeft: 5,
  },
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    flex: 1,
  },
});

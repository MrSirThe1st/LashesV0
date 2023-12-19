import React, { useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Edit from "../../componets/SettingsComponents.js/Edit";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const SellerSettings = () => {
  const navigation = useNavigation();
 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.profile}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles.profileAvatar}
            />

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.profileBody}>
          <Text style={styles.profileName}>John Doe</Text>

          <Text style={styles.profileAddress}>
            123 Maple Street. Anytown, PA 17101
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Products & Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate("MyProducts")}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#1e90ff" name="shopping-bag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Products</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyServices")}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#1e90ff" name="shopping-bag" size={18} />
              </View>
              <Text style={styles.rowLabel}>Services</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>

          <Edit navigation={navigation} />
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <MaterialIcons name="logout" size={20} color="#dc143c" />
              </View>

              <Text style={styles.rowLabel}>Logout</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <Text style={styles.sectionHeader}>Delete Account</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <MaterialCommunityIcons
                  name="delete-forever"
                  size={22}
                  color="#dc143c"
                />
              </View>
              <Text style={styles.rowLabel}>Delete Account</Text>
              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#fe9400" name="globe" size={18} />
              </View>

              <Text style={styles.rowLabel}>Language</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="black" name="moon" size={18} />
              </View>

              <Text style={styles.rowLabel}>Dark Mode</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Help</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#8e8d91" name="flag" size={18} />
              </View>

              <Text style={styles.rowLabel}>Report Bug</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#fff" }]}>
                <FeatherIcon color="#007afe" name="mail" size={18} />
              </View>

              <Text style={styles.rowLabel}>Contact us</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Content</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "white" }]}>
                <FeatherIcon color="#32c759" name="heart" size={18} />
              </View>

              <Text style={styles.rowLabel}>Favorites</Text>

              <View style={styles.rowSpacer} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerSettings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingBottom: 10,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

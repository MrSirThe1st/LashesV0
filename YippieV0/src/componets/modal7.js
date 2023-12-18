import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const Modal7 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.row}>
          <View style={[styles.rowIcon]}>
            <MaterialCommunityIcons
              name="delete-forever"
              size={24}
              color="#dc143c"
            />
          </View>

          <Text style={styles.rowLabel}>Delete Account</Text>

          <View style={styles.rowSpacer} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}></View>
    </>
  );
};

export default Modal7;

const styles = StyleSheet.create({
  modal: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 12,
    elevation: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  rowIconClose: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e90ff",

    right: -330,
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

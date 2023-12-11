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
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const Modal2 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.row}>
          <View style={[styles.rowIcon]}>
            <FeatherIcon color="#32c759" name="navigation" size={18} />
          </View>

          <Text style={styles.rowLabel}>Location</Text>

          <View style={styles.rowSpacer} />
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent={false}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <View style={[styles.rowIconClose]}>
              <FeatherIcon color="#fff" name="x" size={18} />
            </View>
          </TouchableOpacity>
          <View>
            <Text>modal 1</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Modal2;

const styles = StyleSheet.create({
  modal: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 12,
    elevation: 1,
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

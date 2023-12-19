import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import FeatherIcon from "react-native-vector-icons/Feather";


const Contact = () => {
  // ref


  // renders
  return (
 
      <View style={styles.container}>
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
            {/* Additional elements based on type */}
          </View>
        </TouchableOpacity>
  
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});

export default Contact;

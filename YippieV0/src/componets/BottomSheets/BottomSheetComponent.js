import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { MyButton } from "./MyButton";
import BottomSheet from "@gorhom/bottom-sheet";

export function BottomSheetComponent({ showBottomSheet, setShowBottomSheet }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["30%", "60%"];
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleSheetChanges = useCallback((index) => {
    setShowBottomSheet(index > -1);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (showBottomSheet) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomSheet]);

  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose={true}
      style={showBottomSheet ? styles.shadow : null}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.popupText}>Awesome! 🎉</Text>

        {/* <View style={styles.btnWrap}>
          <MyButton
            onPress={() => {
              if (currentIndex === 1) {
                bottomSheetRef.current?.snapToIndex(0);
              } else {
                bottomSheetRef.current?.snapToIndex(1);
              }
            }}
            title={`Animate To ${currentIndex === 1 ? "30%" : "60%"}`}
          />
        </View> */}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  btnWrap: {
    padding: 12,
  },
  contentContainer: {
    marginTop: 24,
    flex: 1,
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.78,
    shadowRadius: 12,
    elevation: 24,
  },
  popupText: {
    fontSize: 44,
  },
});

export default BottomSheetComponent;

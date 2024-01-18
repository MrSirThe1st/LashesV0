import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { MyButton } from "./MyButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";

export function BottomSheetLink({
  showBottomSheetLink,
  setShowBottomSheetLink,
}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["28%"];
  const [currentIndex, setCurrentIndex] = useState(-1);

  const emailToCopy = "Lashes_App@outlook.com";
  const [copiedText, setCopiedText] = useState("");

  const handleSheetChanges = useCallback((index) => {
    setShowBottomSheetLink(index > -1);
    setCurrentIndex(index);
  }, []);

  const copyEmailToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(emailToCopy);
      setCopiedText(emailToCopy);
      Alert.alert("Copied", "we cannot wait to hear from you");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const fetchCopiedText = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setCopiedText(text);
    } catch (error) {
      console.error("Error fetching from clipboard:", error);
    }
  };

  useEffect(() => {
    if (showBottomSheetLink) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomSheetLink]);

  useEffect(() => {
    if (showBottomSheetLink) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomSheetLink]);

  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose={true}
      style={showBottomSheetLink ? styles.shadow : null}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "grey" }}>
            copy the link to report a bug or share an idea
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.emailText}>{emailToCopy}</Text>
          <TouchableOpacity
            onPress={copyEmailToClipboard}
            style={styles.Button}
          >
            <Feather name="copy" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emailText: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#1e90ff",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafdff",
    elevation: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  Button: {
    backgroundColor: "#1e90ff",
    padding: 8,
    borderRadius: 12,
  },
});

export default BottomSheetLink;

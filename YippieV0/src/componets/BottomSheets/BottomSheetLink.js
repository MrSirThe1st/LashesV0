import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MyButton } from "./MyButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { Alert } from "react-native";


export function BottomSheetLink({
  showBottomSheetLink,
  setShowBottomSheetLink,
}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = ["40%"];
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState("");

  const handleSheetChanges = useCallback((index) => {
    setShowBottomSheetLink(index > -1);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (showBottomSheetLink) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomSheetLink]);

  const sendMessage = async () => {
    try {
      const sendEmailFunction = firebase.functions().httpsCallable("sendEmail");

      // Replace with your email address
      const to = "Lashes_App@outlook.com";
      const subject = "New Message from App User";

      // Call the Cloud Function to send the email
      const result = await sendEmailFunction({ to, subject, message });

      if (result.data.success) {
        Alert.alert("Success", "Message sent successfully!");
      } else {
        Alert.alert("Error", `Failed to send message: ${result.data.error}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send message");
    }
  };

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
        <Text>
          Chat to us and we'll get back ASAP
        </Text>
        <TextInput
          style={styles.inputControlOverview}
          placeholder="Type your message here"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
        />

        <View style={styles.btnWrap}>
          <MyButton onPress={sendMessage} title="Send Message" />
        </View>
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
    justifyContent:'space-between'
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
  inputControlOverview: {
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",

    width: "80%",
    borderWidth: 1,
    borderColor: "#3bb3f8",
  },
});

export default BottomSheetLink;

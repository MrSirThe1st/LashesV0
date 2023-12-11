import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { FieldValue } from "firebase/firestore";
import firebase from "firebase/app";
import { Avatar } from "react-native-elements";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const db = FIRESTORE_DB;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.chatName || "Chat",
      headerStyle: { backgroundColor: "#fff" },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.container1}>
            <Image
              source={require("../assets/icons/ArrowIcon.png")}
              style={styles.arrow}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.header}>
          <Text>Last seen 1d ago</Text>
          <TouchableOpacity style={styles.call}>
            <MaterialIcons name="phone-in-talk" size={25} color="#1e90ff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, route.params]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    try {
      await addDoc(
        collection(FIRESTORE_DB, "chats", route.params.id, "messages"),
        {
          timestamp: serverTimestamp(),
          message: input,
          displayName: FIREBASE_AUTH.currentUser.displayName,
          photoURL: FIREBASE_AUTH.currentUser.photoURL,
          email: FIREBASE_AUTH.currentUser.email,
        }
      );

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "chats", route.params.id, "messages"),
      orderBy("timestamp", "asc"), 
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={Platform.select({ android: 30, ios: 20 })}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScrollView>
          {messages.map(({ id, data }) =>
            data.email === FIREBASE_AUTH.email ? (
              <View key={id} style={styles.receiver}>
                <Avatar
                  rounded
                  size={30}
                  backgroundColor="white"
                  source={{ uri: data.photoURL }}
                  marginRight={10}
                />
                <Text style={styles.receiverText}>{data.message}</Text>
              </View>
            ) : (
              <View style={styles.sender}>
                <Avatar
                  rounded
                  size={30}
                  backgroundColor="grey"
                  source={{ uri: data.photoURL }}
                  marginRight={10}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
      </KeyboardAwareScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.footer}>
          <TextInput
            value={input}
            placeholder="Write your message"
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={sendMessage}
            style={styles.Textinput}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} disabled={!input}>
            <MaterialIcons name="send" size={24} color="#1e90ff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    paddingRight: 10,
  },
  receiver: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: "flex-end",
    borderRadius: 12,
    marginBottom: 20,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
    backgroundColor: "#1e90ff",
    flexDirection: "row",
  },
  receiverText: {
    color: "white",
  },
  sender: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: "flex-start",
    borderRadius: 12,
    marginBottom: 20,
    marginLeft: 15,
    maxWidth: "80%",
    position: "relative",
    backgroundColor: "white",
    flexDirection: "row",
  },
  senderText: {
    color: "black",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    color: "white",
    marginLeft: 10,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
    backgroundColor: "white",
    elevation: 1,
  },
  Textinput: {
    flex: 1,
    height: 60,
    borderColor: "transparent",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    height: null,
  },
  arrow: {
    tintColor: "#1e90ff",
    width: 26,
    height: 24,
    transform: [{ scaleX: -1 }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  call: {
    paddingLeft: 25,
  },
});

export default Chat;

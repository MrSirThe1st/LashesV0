import { StyleSheet, Text, View } from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { GiftedChat, renderTicks } from "react-native-gifted-chat";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  where,
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const authUser = FIREBASE_AUTH.currentUser;
  const route = useRoute();
  const recipient = route.params.recipient;
  const { chatName, chatId, profileImageUrl } = route.params;
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImageUri(result.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };



  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: chatName, // Set the header title to chatName
    });
  }, [navigation, chatName]);

  useEffect(() => {
    const q = query(
      collection(FIRESTORE_DB, "chats"),
      orderBy("createdAt", "desc"),
      where("chatName", "==", chatName)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        // Use toMillis to get the timestamp in milliseconds
        const createdAt = data.createdAt
          ? data.createdAt.toMillis()
          : new Date();

        return {
          _id: doc.id,
          text: data.text || "",
          createdAt: createdAt,
          user: data.user || { _id: "unknown" },
        };
      });
      setMessages(newMessages);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const { text, createdAt, user } = newMessages[0];
    const recipientId = recipient ? recipient.uid : null;

    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "chats"), {
        text,
        createdAt: new Date(createdAt),
        user,
        recipientId,
        chatName,
        chatId: chatId || null, 
        profileImageUrl: profileImageUrl || null,
      });

      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: authUser ? authUser.uid : null,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});

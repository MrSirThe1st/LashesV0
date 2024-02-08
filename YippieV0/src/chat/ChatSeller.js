import { StyleSheet, Text, View } from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
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

const ChatSeller = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const authUser = FIREBASE_AUTH.currentUser;
  const route = useRoute();

  const { chatName, sellerAvatar, sellerId, sellerName, recipient,  } =
    route.params;
  const currentUserId = authUser.uid;
  //   const recipientId = authUser.uid === currentUserId ? sellerId : currentUserId;

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: chatName,
  //   });
  // }, [navigation, chatName]);

  useEffect(() => {
    const q = query(
      collection(FIRESTORE_DB, "chats"),
      orderBy("createdAt", "desc"),
      where("participants", "array-contains-any", [currentUserId])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
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

    return () => unsubscribe();
  }, [currentUserId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const { text, createdAt, user } = newMessages[0];
      const recipientName = sellerName;
      const senderName = authUser.username;
      try {
        const chatId = `${currentUserId}_${sellerId}_${Date.now()}`;
        const senderId = currentUserId;
        const recipientId = recipient;
        const participants = [senderId, recipientId];
        const docRef = await addDoc(collection(FIRESTORE_DB, "chats"), {
          text,
          createdAt: new Date(createdAt),
          user,
        //   senderId: currentUserId,
        //   recipientId: recipient,
          chatId,
          participants,
          //   sellerAvatar,
        });

        console.log("Document written with ID:", docRef.id);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    },
    [authUser.uid, recipient]
  );

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

export default ChatSeller;

const styles = StyleSheet.create({});

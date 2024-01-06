import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase"; // Import your Firebase configuration
import { collection, query, orderBy, onSnapshot, addDoc, where } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const authUser = FIREBASE_AUTH.currentUser;
  const route = useRoute();
  const recipient = route.params.recipient;
  const { id, chatName } = route.params;

  useEffect(() => {
    const q = query(
      collection(FIRESTORE_DB, "chats"),
      orderBy("createdAt", "desc"),
      where("chatName", "==", chatName)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: doc.data().user,
      }));
      setMessages(newMessages);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const { text, createdAt, user } = newMessages[0];
    const recipientId = recipient.uid;

    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "chats"), {
        text,
        createdAt,
        user,
        recipientId,
        chatName
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

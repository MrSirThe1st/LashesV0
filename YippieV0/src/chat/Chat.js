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
  getDocs,
  limit,
} from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import SellerSettings from "../screens/BuyerUI/Profile";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const authUser = FIREBASE_AUTH.currentUser;
  const route = useRoute();
  const recipient = route.params.recipient;
  const { sellerId, sellerName, sellerAvatar } = route.params;
  const currentUserId = authUser.uid;
  const recipientId = authUser.uid === currentUserId ? sellerId : currentUserId;
  const [senderName, setSenderName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: sellerName,
    });
  }, [navigation]);

  useEffect(() => {
    fetchBuyerName();
  }, [authUser.uid]);

  const fetchBuyerName = async () => {
    try {
      console.log("Fetching buyer name...");
      const userQuery = query(
        collection(FIRESTORE_DB, "users"),
        where("uid", "==", authUser.uid),
        limit(1)
      );

      const userQuerySnapshot = await getDocs(userQuery);

      userQuerySnapshot.forEach((doc) => {
        const userData = doc.data();
        setSenderName(userData.username);
      });
      console.log("Buyer name fetched:", senderName);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(FIRESTORE_DB, "chats"),
      orderBy("createdAt", "desc"),
      where("recipientName", "==", sellerName)
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
  });

  const onSend = useCallback(
    async (newMessages = []) => {
      await fetchBuyerName();

      const { text, createdAt, user } = newMessages[0];

      try {
        const chatId = `${currentUserId}_${sellerId}_${Date.now()}`;
        const senderId = currentUserId;
        const recipientId =
          authUser.uid === currentUserId ? sellerId : currentUserId;
        const participants = [senderId, recipientId];
        const recipientName = sellerName;
        const docRef = await addDoc(collection(FIRESTORE_DB, "chats"), {
          text,
          createdAt: new Date(createdAt),
          user,
          // senderId: currentUserId,
          // recipientId:
          //   authUser.uid === currentUserId ? sellerId : currentUserId,
          chatId,
          sellerAvatar,
          participants,
          recipientName,
          senderId,
          recipientId,
          senderName,
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

export default Chat;

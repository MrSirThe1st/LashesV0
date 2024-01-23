import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ListItemComponent from "../../componets/ListItemComponent";
import { FIRESTORE_DB } from "../../config/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  collectionGroup,
  limit,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "../../config/firebase";

const Inbox = ({ navigation }) => {
  const db = FIRESTORE_DB;
  const [chats, setChats] = useState([]);
  const authUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const userId = authUser.uid;
    const q = query(
      collectionGroup(db, "chats"),
      orderBy("createdAt", "desc"),
      where("user._id", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uniqueChats = {};

      snapshot.forEach((doc) => {
        const chatId = doc.id;
        const chatData = doc.data();
        const recipient = chatData.recipientId;
        const user = chatData.user;
        const chatName = chatData.chatName;
        const profileImageUrl = chatData.profileImageUrl;
        const createdAtMillis = chatData.createdAt
          ? chatData.createdAt.toMillis()
          : 0;
        if (
          !uniqueChats[chatName] ||
          createdAtMillis > uniqueChats[chatName].createdAtMillis
        ) {
          uniqueChats[chatName] = {
            id: chatId,
            data: { ...chatData, recipient, profileImageUrl, createdAtMillis },
            lastMessage: "",
          };
        }
      });

      const sortedChats = Object.values(uniqueChats);
      setChats(sortedChats);

      sortedChats.forEach(({ id, data }) => {
        const messagesRef = collection(db, "chats", id, "messages");
        const messagesQuery = query(
          messagesRef,
          orderBy("createdAt", "desc"),
          limit(1)
        );

        onSnapshot(messagesQuery, (messagesSnapshot) => {
          messagesSnapshot.forEach((messageDoc) => {
            const lastMessage = messageDoc.data().text || "";
            console.log("LAST MESSAGE:", lastMessage);

            const chatIndex = sortedChats.findIndex((chat) => chat.id === id);

            if (chatIndex !== -1) {
              sortedChats[chatIndex].lastMessage = lastMessage;
              console.log("UPDATED CHATS:", sortedChats);
              setChats([...sortedChats]);
            }
          });
        });
      });
    });

    return unsubscribe;
  }, []);

  const enterChat = (id, chatName, recipient) => {
    navigation.navigate("Chat", {
      id,
      chatName,
      recipient,
    });
  };

  useEffect(() => {
    console.log("Chats:", chats);
  }, [chats]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {chats.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.fake}>
              <View style={styles.fakeCircle} />
              <View style={styles.fakeBlock}>
                <View style={styles.fakeLine} />
                <View style={styles.fakeLine} />
              </View>
            </View>
            <View style={[styles.fake, { opacity: 0.5 }]}>
              <View style={styles.fakeCircle} />
              <View style={styles.fakeBlock}>
                <View style={styles.fakeLine} />
                <View style={styles.fakeLine} />
              </View>
            </View>
            <View style={styles.fake}>
              <View style={styles.fakeCircle} />
              <View style={styles.fakeBlock}>
                <View style={styles.fakeLine} />
                <View style={styles.fakeLine} />
              </View>
            </View>
            <View style={styles.fake}>
              <View style={styles.fakeCircle} />
              <View style={styles.fakeBlock}>
                <View style={styles.fakeLine} />
                <View style={styles.fakeLine} />
              </View>
            </View>
            <View style={[styles.fake, { opacity: 0.5 }]}>
              <View style={styles.fakeCircle} />
              <View style={styles.fakeBlock}>
                <View style={styles.fakeLine} />
                <View style={styles.fakeLine} />
              </View>
            </View>
            <View style={styles.fake}>
              <View style={styles.fakeCircle} />
              <View style={styles.fakeBlock}>
                <View style={styles.fakeLine} />
                <View style={styles.fakeLine} />
              </View>
            </View>
            <Text style={styles.emptyDescription}>Your inbox is empty</Text>
          </View>
        ) : (
          chats.map(
            ({
              id,
              data: { chatName, recipient, profileImageUrl, lastMessage },
            }) => (
              <ListItemComponent
                key={id}
                id={id}
                chatName={chatName}
                recipient={recipient}
                profileImageUrl={profileImageUrl}
                lastMessage={lastMessage}
                enterChat={enterChat}
              />
            )
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  fake: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  fakeCircle: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: "#1e90ff",
    marginRight: 16,
  },
  fakeLine: {
    width: 200,
    height: 10,
    borderRadius: 4,
    backgroundColor: "#1e90ff",
    marginBottom: 8,
  },
  fakeBlock: {
    flexDirection: "column",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyDescription: {
    fontSize: 19,
    lineHeight: 22,
    fontWeight: "500",
    color: "#8c9197",
    textAlign: "center",
  },
});

export default Inbox;

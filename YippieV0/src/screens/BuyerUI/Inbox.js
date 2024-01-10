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
} from "firebase/firestore";

const Inbox = ({ navigation }) => {
  const db = FIRESTORE_DB;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const q = query(collectionGroup(db, "chats"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uniqueChats = {};

      snapshot.forEach((doc) => {
        const chatId = doc.id;
        const chatData = doc.data();

        // Use the chatName as a key to group messages by conversation
        const chatName = chatData.chatName;
        if (
          !uniqueChats[chatName] ||
          chatData.createdAt.toDate() > uniqueChats[chatName].createdAt.toDate()
        ) {
          uniqueChats[chatName] = { id: chatId, data: chatData };
        }
      });

      // Convert the object back to an array
      const sortedChats = Object.values(uniqueChats);
      setChats(sortedChats);
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
          chats.map(({ id, data: { chatName, recipient } }) => (
            <ListItemComponent
              key={id}
              id={id}
              chatName={chatName}
              recipient={recipient}
              enterChat={enterChat}
            />
          ))
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

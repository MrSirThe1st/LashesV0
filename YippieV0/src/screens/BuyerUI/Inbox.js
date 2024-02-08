import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
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
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_AUTH } from "../../config/firebase";

const Inbox = ({ navigation }) => {
  const db = FIRESTORE_DB;
  const [chats, setChats] = useState([]);
  const authUser = FIREBASE_AUTH.currentUser;
  const [loading, setLoading] = useState(true);

  const deleteConversation = async (chatId) => {
    try {
      // Delete the conversation from the database
      await deleteDoc(doc(db, "chats", chatId));

      // Update state to reflect the deleted conversation
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  useEffect(() => {
    const userId = authUser.uid;
    const q = query(
      collectionGroup(db, "chats"),
      orderBy("createdAt", "desc"),
      where("user._id", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const uniqueChats = {};

        snapshot.forEach((doc) => {
          const chatId = doc.id;
          const chatData = doc.data();
          const sellerId = chatData.recipientId;
          const user = chatData.user;
          const sellerName = chatData.recipientName;
          const sellerAvatar = chatData.sellerAvatar;
          const createdAtMillis = chatData.createdAt
            ? chatData.createdAt.toMillis()
            : 0;
          if (
            !uniqueChats[sellerName] ||
            createdAtMillis > uniqueChats[sellerName].createdAtMillis
          ) {
            uniqueChats[sellerName] = {
              id: chatId,
              data: {
                ...chatData,
                sellerId,
                sellerAvatar,
                createdAtMillis,
                sellerName,
              },
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

        // Update loading state to indicate that data has been loaded
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Update loading state to indicate that an error occurred
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const enterChat = (id, sellerName, sellerId, sellerAvatar) => {
    console.log("sellerAvatar:", sellerAvatar);
    navigation.navigate("Chat", {
      id,
      sellerId,
      sellerName,
      sellerAvatar,
    });
  };

  useEffect(() => {
    console.log("Chats:", chats);
  }, [chats]);

  return (
    <View style={styles.container}>
      {loading ? ( // Render loading indicator if data is still being fetched
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1e90ff" />
        </View>
      ) : (
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
                data: { sellerName, sellerId, sellerAvatar, lastMessage },
              }) => (
                <ListItemComponent
                  key={id}
                  id={id}
                  sellerName={sellerName}
                  sellerId={sellerId}
                  sellerAvatar={sellerAvatar}
                  lastMessage={lastMessage}
                  enterChat={enterChat}
                  onDeletePress={() => deleteConversation(id)}
                />
              )
            )
          )}
        </ScrollView>
      )}
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Inbox;

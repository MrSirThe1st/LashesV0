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

const InboxSeller = ({ navigation }) => {
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

    // Query for documents where user._id === userId
    const userQuery = query(
      collectionGroup(db, "chats"),
      orderBy("createdAt", "desc"),
      where("user._id", "==", userId)
    );

    // Query for documents where recipientId === userId
    const recipientQuery = query(
      collectionGroup(db, "chats"),
      orderBy("createdAt", "desc"),
      where("recipientId", "==", userId)
    );

    // Execute both queries concurrently
    const unsubscribeUser = onSnapshot(userQuery, (userSnapshot) => {
      // Handle user documents
      const userChats = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      // Merge or handle the results as needed
      setChats((prevChats) => [...prevChats, ...userChats]);
      setLoading(false);
    });

    const unsubscribeRecipient = onSnapshot(
      recipientQuery,
      (recipientSnapshot) => {
        // Handle recipient documents
        const recipientChats = recipientSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        // Merge or handle the results as needed
        setChats((prevChats) => [...prevChats, ...recipientChats]);
        setLoading(false);
      }
    );

    return () => {
      // Unsubscribe when the component is unmounted
      unsubscribeUser();
      unsubscribeRecipient();
    };
  }, [authUser.uid, db]);

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

export default InboxSeller;

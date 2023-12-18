import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItemComponent from "../../componets/ListItemComponent";
import { ListItem, Avatar } from "react-native-elements";
import { FIRESTORE_DB } from "../../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";



const Inbox = ({navigation}) => {
  const db = FIRESTORE_DB;
  const [chats, setChats] = useState([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };
  return (
    <View>
      <ScrollView style={styles.container}>
        {chats.length === 0 ? (
          // Render custom content when the inbox is empty
          <View style={styles.container1}>
            <View style={styles.empty}>
              <View style={styles.fake}>
                <View style={styles.fakeCircle} />

                <View style={styles.fakeBlock}>
                  <View style={[styles.fakeLine, { width: 120 }]} />

                  <View style={styles.fakeLine} />

                  <View
                    style={[styles.fakeLine, { width: 70, marginBottom: 0 }]}
                  />
                </View>
              </View>

              <View style={[styles.fake, { opacity: 0.5 }]}>
                <View style={styles.fakeCircle} />

                <View style={styles.fakeBlock}>
                  <View style={[styles.fakeLine, { width: 120 }]} />

                  <View style={styles.fakeLine} />

                  <View
                    style={[styles.fakeLine, { width: 70, marginBottom: 0 }]}
                  />
                </View>
              </View>

              <Text style={styles.emptyTitle}>Your inbox is empty</Text>
              <Text style={styles.emptyDescription}>
                Once you start a new conversation, you'll see new messages here
              </Text>
            </View>
          </View>
        ) : (
          // Render chat list when there are messages
          chats.map(({ id, data: { chatName } }) => (
            <ListItemComponent
              key={id}
              id={id}
              chatName={chatName}
              enterChat={enterChat}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor:'white'
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
  empty: {
    flex: 1,
    flexBasis: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    color: "#8c9197",
    textAlign: "center",
  },
  container1: {
    flex: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
  },
});

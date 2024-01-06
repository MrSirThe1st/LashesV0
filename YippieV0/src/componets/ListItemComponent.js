import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { FIRESTORE_DB } from "../config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

const ListItemComponent = ({ id, chatName, enterChat }) => {
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const q = query(
      collection(FIRESTORE_DB, "chats", id, "messages"),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const latestMessageData = snapshot.docs.map((doc) => doc.data().text)[0];
      console.log("Latest message:", latestMessageData);
      setLatestMessage(latestMessageData);
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <View>
        <Avatar
          rounded
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
        />
        <Badge
          status="success"
          containerStyle={{ position: "absolute", top: 1, right: 1 }}
        />
      </View>
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {latestMessage || ""}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ListItemComponent;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Badge } from "react-native-elements";
import { FIRESTORE_DB } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const ListItemComponent = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(FIRESTORE_DB, "chats", id, "messages"),
      orderBy("timestamp", "desc"),
      (snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()));
      }
    );
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
          {chatMessages.length > 0
            ? chatMessages[chatMessages.length - 1].message
            : ""}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ListItemComponent;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar, Badge } from "react-native-elements";


const ListItemComponent = ({
  id,
  chatName,
  enterChat,
  profileImageUrl,
  lastMessage,
}) => {
  
console.log("LAST MESSAGE IN ListItemComponent:", lastMessage);

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <View>
        <Avatar
          rounded
          source={{
            uri: profileImageUrl,
          }}
        />
        {/* <Badge
          status="success"
          containerStyle={{ position: "absolute", top: 1, right: 1 }}
        /> */}
      </View>
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{ fontWeight: "bold" }}>{chatName}</Text>
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          <Text>{lastMessage}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ListItemComponent;

const styles = StyleSheet.create({});

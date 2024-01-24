import { StyleSheet, Text, View, TouchableOpacity,Alert } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";


const ListItemComponent = ({
  id,
  chatName,
  enterChat,
  profileImageUrl,
  lastMessage,
  onDeletePress,
  recipient,
}) => {
  const handleLongPress = () => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDeletePress,
        },
      ]
    );
  };

  console.log("LAST MESSAGE IN ListItemComponent:", lastMessage);

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          handleLongPress();
        }
      }}
    >
      <View>
        <ListItem
          key={id}
          onPress={() => enterChat(id, chatName, recipient)}
          bottomDivider
        >
          <View>
            <Avatar
              rounded
              source={{
                uri: profileImageUrl,
              }}
            />
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
      </View>
    </LongPressGestureHandler>
  );
};

export default ListItemComponent;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";

const ListItemComponentSeller = ({
  id,
  chatName,
  enterChat,
  sellerAvatar,
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
              //   rounded
              //   source={{
              //     uri: sellerAvatar,
              //   }}
              style={styles.avatarBackground}
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

export default ListItemComponentSeller;

const styles = StyleSheet.create({
  avatarBackground: {
    backgroundColor: "red", // Set your desired background color
    borderRadius: 50, // Adjust the borderRadius as needed
    padding: 20, // Add padding if necessary
  },
});

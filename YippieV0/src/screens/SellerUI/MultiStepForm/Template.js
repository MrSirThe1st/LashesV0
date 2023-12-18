// // useChatClient.js

// import { useEffect, useState } from "react";
// import { StreamChat } from "stream-chat";
// import {
//   chatApiKey,
//   chatUserId,
//   chatUserName,
//   chatUserToken,
// } from "./src/config/ChatConfig";
// import {
//   Channel,
//   ChannelList,
//   Chat,
//   MessageInput,
//   MessageList,
//   MessageType,
//   OverlayProvider,
//   Thread,
// } from "stream-chat-expo";
// import Inbox from "./src/screens/BuyerUI/Inbox";

// const client = StreamChat.getInstance(chatApiKey);

// const user = {
//   id: chatUserId,
//   name: chatUserName,
// };

// await client.connectUser(
//   {
//     id: "jlahey",
//     name: "Jim Lahey",
//     image: "https://i.imgur.com/fR9Jz14.png",
//   },
//   "user_token"
// );



// export const useChatClient = () => {
//   const [client, setClient] = useState(false);
//   const [channel, setChannel] = useState(null)
//   const [thread, setThread] = useState<MessageType | null>();

//   useEffect(() => {
//     const setupClient = async () => {
//       try {
//         await client.connectUser(
//           {
//             id: "userUID",
//             name: "username",
//             image: "https://i.imgur.com/fR9Jz14.png",
//           },
//            client.devToken('userUID'),
//         );
//         setClientReady(true);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     setupClient();
//   }, []);

//   const onBackPress = () => {
//     if (thread) {
//       setThread(undefined);
//     } else if (channel) {
//       setChannel(undefined);
//     }
//   };

//   if (!clientReady) return null;
// return (
//   <OverlayProvider topInset={60}>
//     <TouchableOpacity onPress={onBackPress} disabled={!channel}>
//       <View style={{ height: 60, paddingLeft: 16, paddingTop: 40 }}>
//         {channel && <Text>Back</Text>}
//       </View>
//     </TouchableOpacity>
//     <View style={{ flex: 1 }}>
//       <Chat client={client}>
//         {channel ? (
//           <Channel
//             channel={channel}
//             keyboardVerticalOffset={60}
//             thread={thread}
//             threadList={!!thread}
//           >
//             {thread ? (
//               <Thread />
//             ) : (
//               <>
//                 <MessageList onThreadSelect={setThread} />
//                 <MessageInput />
//               </>
//             )}
//           </Channel>
//         ) : (
//           <ChannelList onSelect={setChannel} />
//         )}
//       </Chat>
//     </View>
//   </OverlayProvider>
// );
  
// };

// import React, { useEffect, useState } from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import { Channel as ChannelType, StreamChat } from "stream-chat-expo";
// import {
//   Channel,
//   ChannelList,
//   Chat,
//   MessageInput,
//   MessageList,
//   OverlayProvider,
//   Thread,
// } from "stream-chat-expo";

// import { chatApiKey } from "./src/config/ChatConfig";

// const client = StreamChat.getInstance(chatApiKey);

// export const UseChatClient = () => {
//   const [channel, setChannel] = useState();
//   const [clientReady, setClientReady] = useState(false);
//   const [thread, setThread] = useState(null);

//   useEffect(() => {
//     const setupClient = async () => {
//       try {
//         await client.connectUser(
//           {
//             id: "userUID",
//             name: "Jim Lahey",
//             image: "https://i.imgur.com/fR9Jz14.png",
//           },
//           client.devToken("userUID")
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
//       setThread(null);
//     } else if (channel) {
//       setChannel(null);
//     }
//   };

//   if (!clientReady) return null;

//   return (
//     <OverlayProvider topInset={60}>
//       <TouchableOpacity onPress={onBackPress} disabled={!channel}>
//         <View style={{ height: 60, paddingLeft: 16, paddingTop: 40 }}>
//           {channel && <Text>Back</Text>}
//         </View>
//       </TouchableOpacity>
//       <View style={{ flex: 1 }}>
//         <Chat client={client}>
//           {channel ? (
//             <Channel
//               channel={channel}
//               keyboardVerticalOffset={60}
//               thread={thread}
//               threadList={!!thread}
//             >
//               {thread ? (
//                 <Thread />
//               ) : (
//                 <>
//                   <MessageList onThreadSelect={setThread} />
//                   <MessageInput />
//                 </>
//               )}
//             </Channel>
//           ) : (
//             <ChannelList onSelect={setChannel} />
//           )}
//         </Chat>
//       </View>
//     </OverlayProvider>
//   );
// };

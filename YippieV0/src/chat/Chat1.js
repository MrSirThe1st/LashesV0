// import { StyleSheet, Text, View } from "react-native";
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useLayoutEffect,
// } from "react";
// import { GiftedChat, renderTicks } from "react-native-gifted-chat";
// import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/firebase";
// import {
//   collection,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
//   doc,
//   query,
//   orderBy,
// } from "firebase/firestore";
// import { useRoute } from "@react-navigation/native";

// const Chat = ({ navigation }) => {
//   const authUser = FIREBASE_AUTH.currentUser;
//   const route = useRoute();
//   const [messages, setMessages] = useState([]);
//   const { sellerId, sellerName, chatName } = route.params;
//   const currentUserId = authUser.uid;

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: chatName,
//     });
//   }, [navigation, chatName]);

//   useEffect(() => {
//     const conversationRef = collection(
//       FIRESTORE_DB,
//       "conversations",
//       `${currentUserId}_${sellerId}`,
//       "messages"
//     );

//     const orderedConversationRef = query(
//       conversationRef,
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(orderedConversationRef, (snapshot) => {
//       try {
//         const newMessages = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             _id: doc.id,
//             text: data.text || "",
//             createdAt: data.createdAt.toMillis(),
//             user: data.user || { _id: "unknown" },
//           };
//         });
//         setMessages(newMessages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     });

//     return () => unsubscribe();
//   }, [currentUserId, sellerId]);

//   const onSend = useCallback(
//     async (newMessages = []) => {
//       const { text, createdAt, user } = newMessages[0];

//       try {
//         // Use doc() to create a document reference with an auto-generated ID
//         const conversationRef = collection(
//           FIRESTORE_DB,
//           "conversations",
//           `${currentUserId}_${sellerId}`,
//           "messages"
//         );

//         const docRef = await addDoc(conversationRef, {
//           text,
//           createdAt: new Date(createdAt),
//           user,
//           senderId: currentUserId,
//           recipientId:
//             authUser.uid === currentUserId ? sellerId : currentUserId,
//         });

//         console.log("Document written with ID:", docRef.id);
//       } catch (error) {
//         console.error("Error adding document:", error);
//       }
//     },
//     [currentUserId, sellerId, authUser.uid]
//   );

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => onSend(newMessages)}
//       user={{
//         _id: authUser ? authUser.uid : null,
//       }}
//     />
//   );
// };

// export default Chat;

// const styles = StyleSheet.create({});








// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import ListItemComponent from "../../componets/ListItemComponent";
// import { FIRESTORE_DB } from "../../config/firebase";
// import {
//   collection,
//   onSnapshot,
//   query,
//   orderBy,
//   collectionGroup,
//   limit,
//   where,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { FIREBASE_AUTH } from "../../config/firebase";

// const Inbox = ({ navigation }) => {
//   const db = FIRESTORE_DB;
//   const [conversations, setConversations] = useState([]);
//   const authUser = FIREBASE_AUTH.currentUser;
//   const [loading, setLoading] = useState(true);

//   const deleteConversation = async (chatId) => {
//     try {
//       // Delete the conversation from the database
//       await deleteDoc(doc(db, "chats", chatId));

//       // Update state to reflect the deleted conversation
//       setConversations((prevChats) =>
//         prevChats.filter((chat) => chat.id !== chatId)
//       );
//     } catch (error) {
//       console.error("Error deleting conversation:", error);
//     }
//   };

//   useEffect(() => {
//     const conversationsRef = collection(FIRESTORE_DB, "conversations");

//     const senderConversationsQuery = query(
//       conversationsRef,
//       where("senderId", "==", authUser.uid)
//     );

//     const unsubscribe = onSnapshot(senderConversationsQuery, (snapshot) => {
//       const newConversations = [];

//       snapshot.docs.forEach(async (doc) => {
//         const conversationId = doc.id;

//         // Reference the "messages" subcollection for the current conversation
//         const messagesRef = collection(
//           conversationsRef.doc(conversationId),
//           "messages"
//         );

//         // Query the latest message in the conversation
//         const latestMessageQuery = query(
//           messagesRef,
//           orderBy("createdAt", "desc"),
//           limit(1)
//         );

//         const messagesSnapshot = await getDocs(latestMessageQuery);

//         // Check if there are messages
//         if (!messagesSnapshot.empty) {
//           const latestMessageDoc = messagesSnapshot.docs[0];
//           const latestMessageData = latestMessageDoc.data();

//           newConversations.push({
//             id: conversationId,
//             recipientId: latestMessageData.recipientId,
//             sellerName: latestMessageData.sellerName,
//             senderId: latestMessageData.senderId,
//             buyerName: latestMessageData.buyerName,
//             lastMessage: latestMessageData.text, // Assuming text is the message field
//             // Add other fields as needed
//           });

//           // Update state with the new conversations
//           setConversations(newConversations);
//           setLoading(false);
//         }
//       });
//     });

//     return () => unsubscribe();
//   }, [authUser.uid]);

//   const handleChatPress = (sellerId, sellerName, buyerId, buyerName) => {
//     navigation.navigate("Chat", {
//       sellerId,
//       sellerName,
//       buyerId,
//       buyerName,
//     });
//   };

//   console.log("CONVERSATIONS:", conversations);

//   return (
//     <View style={styles.container}>
//       {loading ? ( // Render loading indicator if data is still being fetched
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#1e90ff" />
//         </View>
//       ) : (
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {conversations.length === 0 ? (
//             <View style={styles.empty}>
//               <View style={styles.fake}>
//                 <View style={styles.fakeCircle} />
//                 <View style={styles.fakeBlock}>
//                   <View style={styles.fakeLine} />
//                   <View style={styles.fakeLine} />
//                 </View>
//               </View>
//               <View style={[styles.fake, { opacity: 0.5 }]}>
//                 <View style={styles.fakeCircle} />
//                 <View style={styles.fakeBlock}>
//                   <View style={styles.fakeLine} />
//                   <View style={styles.fakeLine} />
//                 </View>
//               </View>
//               <View style={styles.fake}>
//                 <View style={styles.fakeCircle} />
//                 <View style={styles.fakeBlock}>
//                   <View style={styles.fakeLine} />
//                   <View style={styles.fakeLine} />
//                 </View>
//               </View>
//               <View style={styles.fake}>
//                 <View style={styles.fakeCircle} />
//                 <View style={styles.fakeBlock}>
//                   <View style={styles.fakeLine} />
//                   <View style={styles.fakeLine} />
//                 </View>
//               </View>
//               <View style={[styles.fake, { opacity: 0.5 }]}>
//                 <View style={styles.fakeCircle} />
//                 <View style={styles.fakeBlock}>
//                   <View style={styles.fakeLine} />
//                   <View style={styles.fakeLine} />
//                 </View>
//               </View>
//               <View style={styles.fake}>
//                 <View style={styles.fakeCircle} />
//                 <View style={styles.fakeBlock}>
//                   <View style={styles.fakeLine} />
//                   <View style={styles.fakeLine} />
//                 </View>
//               </View>
//               <Text style={styles.emptyDescription}>Your inbox is empty</Text>
//             </View>
//           ) : (
//             conversations.map((item) => (
//               <ListItemComponent
//                 key={item.id}
//                 id={item.id}
//                 chatName={item.sellerName} // Assuming sellerName is used for chatName
//                 enterChat={(senderId, sellerName, recipientId, buyerName) =>
//                   handleChatPress(senderId, sellerName, recipientId, buyerName)
//                 }
//                 profileImageUrl={item.profileImageUrl} // Add profile image URL if available
//                 lastMessage={item.lastMessage} // Add last message if available
//                 onDeletePress={() => deleteConversation(item.id)}
//                 recipient={item.sellerId}
//                 sellerName={item.sellerName} // Added sellerName prop
//                 recipientId={item.recipientId} // Added recipientId prop
//                 senderId={item.senderId} // Added senderId prop
//               />
//             ))
//           )}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   fake: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//   },
//   fakeCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 9999,
//     backgroundColor: "#1e90ff",
//     marginRight: 16,
//   },
//   fakeLine: {
//     width: 200,
//     height: 10,
//     borderRadius: 4,
//     backgroundColor: "#1e90ff",
//     marginBottom: 8,
//   },
//   fakeBlock: {
//     flexDirection: "column",
//   },
//   empty: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },
//   emptyDescription: {
//     fontSize: 19,
//     lineHeight: 22,
//     fontWeight: "500",
//     color: "#8c9197",
//     textAlign: "center",
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default Inbox;

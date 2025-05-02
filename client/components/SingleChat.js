// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Text,
//   IconButton,
//   Spinner,
//   Input,
//   VStack,
//   HStack,
//   useToast,
// } from "native-base";
// import { ArrowBackIcon } from "native-base";
// import { ChatState } from "../Context/ChatProvider";
// import axios from "axios";
// import io from "socket.io-client";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import ScrollView from "react-native-scrollview"; // Or use FlatList
// import LottieView from "lottie-react-native";
// import animationData from "../animations/typing.json";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import ScrollableChat from "./ScrollableChat";

// const ENDPOINT = "http://localhost:5000";
// let socket, selectedChatCompare;

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);

//   const toast = useToast();
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast.show({
//         title: "Error Occurred!",
//         description: "Failed to load the messages",
//         status: "error",
//         duration: 5000,
//       });
//     }
//   };

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return;

//     socket.emit("stop typing", selectedChat._id);
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.post(
//         "/api/message",
//         {
//           content: newMessage,
//           chatId: selectedChat._id,
//         },
//         config
//       );

//       setNewMessage("");
//       socket.emit("new message", data);
//       setMessages((prev) => [...prev, data]);
//     } catch (error) {
//       toast.show({
//         title: "Error Occurred!",
//         description: "Failed to send the message",
//         status: "error",
//         duration: 5000,
//       });
//     }
//   };

//   const typingHandler = (text) => {
//     setNewMessage(text);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     const timerLength = 3000;

//     setTimeout(() => {
//       const now = new Date().getTime();
//       const timeDiff = now - lastTypingTime;

//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//     selectedChatCompare = selectedChat;
//   }, [selectedChat]);

//   useEffect(() => {
//     socket.on("message received", (newMessageReceived) => {
//       if (
//         !selectedChatCompare ||
//         selectedChatCompare._id !== newMessageReceived.chat._id
//       ) {
//         if (!notification.includes(newMessageReceived)) {
//           setNotification([newMessageReceived, ...notification]);
//           setFetchAgain((prev) => !prev);
//         }
//       } else {
//         setMessages((prev) => [...prev, newMessageReceived]);
//       }
//     });
//   });

//   if (!selectedChat) {
//     return (
//       <Box flex={1} alignItems="center" justifyContent="center">
//         <Text fontSize="2xl">Click on a user to start chatting</Text>
//       </Box>
//     );
//   }

//   return (
//     <VStack flex={1} px={3} py={2} space={2}>
//       <HStack justifyContent="space-between" alignItems="center">
//         <IconButton
//           icon={<ArrowBackIcon />}
//           onPress={() => setSelectedChat(null)}
//           display={{ base: "flex", md: "none" }}
//         />
//         <Text fontSize="xl" fontWeight="bold">
//           {!selectedChat.isGroupChat
//             ? getSender(user, selectedChat.users)
//             : selectedChat.chatName.toUpperCase()}
//         </Text>
//         {!selectedChat.isGroupChat ? (
//           <ProfileModal user={getSenderFull(user, selectedChat.users)} />
//         ) : (
//           <UpdateGroupChatModal
//             fetchMessages={fetchMessages}
//             fetchAgain={fetchAgain}
//             setFetchAgain={setFetchAgain}
//           />
//         )}
//       </HStack>

//       <Box flex={1} bg="#E8E8E8" borderRadius="lg" p={2}>
//         {loading ? (
//           <Spinner size="lg" alignSelf="center" />
//         ) : (
//           <ScrollView>
//             <ScrollableChat messages={messages} />
//           </ScrollView>
//         )}
//         {istyping && (
//           <LottieView
//             source={animationData}
//             autoPlay
//             loop
//             style={{ width: 60, height: 40 }}
//           />
//         )}
//         <Input
//           variant="filled"
//           bg="#E0E0E0"
//           placeholder="Enter a message..."
//           value={newMessage}
//           onChangeText={typingHandler}
//           onSubmitEditing={sendMessage}
//           mt={2}
//         />
//       </Box>
//     </VStack>
//   );
// };

// export default SingleChat;

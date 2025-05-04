import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  IconButton,
  Spinner,
  Input,
  VStack,
  HStack,
  useToast,
  ArrowBackIcon,
  Icon,
} from "native-base";
import { ScrollView } from "react-native";
import { ChatState } from "../Context/ChatProvider";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import io from "socket.io-client";
import { getSender, getSenderFull } from "../config/ChatLogics";
import LottieView from "lottie-react-native";
import animationData from "../animations/typing.json";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const toast = useToast();
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `${ENDPOINT}/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);

      if (data.length === 0) {
        toast.show({
          title: "No messages yet!",
          description: "Start the conversation!",
          status: "info",
          duration: 3000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.show({
        title: "Error Occurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage) return;
    socket.emit("stop typing", selectedChat._id);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        `${ENDPOINT}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (error) {
      toast.show({
        title: "Error Occured!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        placement: "bottom",
      });
    }
  };

  const typingHandler = (text) => {
    setNewMessage(text);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const now = new Date().getTime();
      const timeDiff = now - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.some((n) => n._id === newMessageReceived._id)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain((prev) => !prev);
        }
      } else {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    });
  });

  if (!selectedChat) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="2xl">Click on a user to start chatting</Text>
      </Box>
    );
  }

  return (
    <VStack flex={1} px={3} py={2} space={2}>
      <HStack justifyContent="space-between" alignItems="center" width="100%">
        <IconButton
          icon={<ArrowBackIcon />}
          onPress={() => setSelectedChat(null)}
          display={{ base: "flex", md: "none" }}
        />
        <Text fontSize="xl" fontWeight="bold">
          {!selectedChat.isGroupChat
            ? getSender(user, selectedChat.users)
            : selectedChat.chatName.toUpperCase()}
        </Text>

        <HStack space={2} alignItems="center">
          {!selectedChat.isGroupChat ? (
            <ProfileModal user={getSenderFull(user, selectedChat.users)}>
              <Icon as={MaterialIcons} name="visibility" size={6} />
            </ProfileModal>
          ) : (
            <UpdateGroupChatModal
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              fetchMessages={fetchMessages}
            />
          )}
        </HStack>
      </HStack>

      <Box flex={1} bg="#E8E8E8" borderRadius="lg" p={2}>
        <Box
          flex={1}
          bg="white"
          borderRadius="lg"
          px={3}
          py={2}
          mb={2}
          width="100%"
        >
          {loading ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Spinner size="lg" color="blue.500" />
            </Box>
          ) : (
            <ScrollableChat messages={messages} />
          )}
        </Box>

        {istyping && (
          <LottieView
            source={animationData}
            autoPlay
            loop
            style={{ width: 70, height: 70 }}
          />
        )}

        <HStack space={2} alignItems="center">
          <Input
            variant="filled"
            placeholder="Type a message"
            value={newMessage}
            onChangeText={typingHandler}
            bg="white"
            borderRadius="full"
            flex={1}
            onSubmitEditing={() => {
              console.log("Sending message:", newMessage);
              sendMessage();
            }}
          />
          <IconButton
            icon={<MaterialIcons name="send" size={24} color="gray" />}
            onPress={sendMessage}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </Box>
    </VStack>
  );
};

export default SingleChat;

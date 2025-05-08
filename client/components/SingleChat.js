import React, { useEffect, useRef, useState } from "react";
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
import { Platform } from "react-native";
import { ChatState } from "../Context/ChatProvider";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import io from "socket.io-client";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import { getENDPOINT } from "../config/ChatLogics";

// NOTE: Replace with your local IP if testing on a mobile device



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

  const selectedChatCompare = useRef();
  const scrollViewRef = useRef();
  const socketRef = useRef();
  const ENDPOINT = getENDPOINT(Platform)


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

      socketRef.current.emit("join chat", selectedChat._id);

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
    socketRef.current.emit("stop typing", selectedChat._id);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${ENDPOINT}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      setNewMessage("");
      socketRef.current.emit("new message", data);
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      toast.show({
        title: "Error Occurred!",
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
      socketRef.current.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const now = new Date().getTime();
      const timeDiff = now - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socketRef.current.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (!user || socketRef.current) return;

    const ENDPOINT = getENDPOINT(Platform)

    socketRef.current = io(ENDPOINT);
    const socket = socketRef.current;

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare.current = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    const socket = socketRef.current;

    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare.current ||
        selectedChatCompare.current._id !== newMessageReceived.chat._id
      ) {
        if (!notification.some((n) => n._id === newMessageReceived._id)) {
          setNotification((prev) => [newMessageReceived, ...prev]);
          setFetchAgain((prev) => !prev);
        }
      } else {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [notification, setFetchAgain, setNotification]);

  if (!selectedChat) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text fontSize="2xl">Click on a user to start chatting</Text>
      </Box>
    );
  }

  return (
    <VStack flex={1} px={3} py={2} space={2}>
      <HStack alignItems="center" justifyContent="space-between" width="100%">
        <IconButton
          icon={<ArrowBackIcon />}
          onPress={() => setSelectedChat(null)}
          display={{ base: "flex", md: "none" }}
        />

        <HStack flex={1} alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">
            {!selectedChat.isGroupChat
              ? getSender(user, selectedChat.users)
              : selectedChat.chatName.toUpperCase()}
          </Text>
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

      <Box flex={1} bg="#00BFFF" borderRadius="lg" p={2}>
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
            <ScrollableChat
              messages={messages}
              istyping={istyping}
              selectedChat={selectedChat}
              scrollViewRef={scrollViewRef}
            />
          )}
        </Box>

        <HStack space={2} alignItems="center">
          <Input
            variant="filled"
            placeholder="Type a message"
            value={newMessage}
            onChangeText={typingHandler}
            bg="white"
            borderRadius="full"
            flex={1}
            onSubmitEditing={sendMessage}
            _focus={{
              bg: "#BEE3F8",
              borderColor: "gray.300",
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

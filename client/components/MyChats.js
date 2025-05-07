import React, { useState, useEffect } from "react";
import { Box, Text, useToast, Stack } from "native-base";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import axios from "axios";
import { Pressable, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; // Your server endpoint

export default function MyChats({ fetchAgain }) {
  var storage = AsyncStorage;

  if (Platform.OS === "web") {
    storage = localStorage;
  } else {
    storage = AsyncStorage;
  }

  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const userInfo = storage.getItem("userInfo");

    if (typeof userInfo === "string") {
      try {
        const parsedUser = JSON.parse(userInfo);
        setLoggedUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse userInfo:", error);
      }
    }

    fetchChats();
  }, [fetchAgain]);

  useEffect(() => {
    if (!user) return; // If there's no user, skip socket connection setup.

    const socket = io(ENDPOINT);

    socket.emit("setup", user);
    socket.on("connected", () => console.log("Socket Connected"));

    // Listen for new messages
    socket.on("message received", (newMessageReceived) => {
      // Update chats state with the new message
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat._id === newMessageReceived.chat._id) {
            return { ...chat, latestMessage: newMessageReceived }; // Update the chat with the new message
          }
          return chat;
        });

        // Return the updated chats array
        return updatedChats;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Function to update the chat list when sending a message
  const sendMessageHandler = async (newMessage, selectedChat) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      // Manually update the chats list after sending a message
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat._id === selectedChat._id) {
            return {
              ...chat,
              latestMessage: data, // Update the latest message in the selected chat
            };
          }
          return chat;
        });
        return updatedChats;
      });
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        placement: "bottom",
      });
    }
  };

  const setTheChat = (theChat) => {
    setSelectedChat(theChat);
  };

  return (
    <Box
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w="100%"
      borderRadius="lg"
      h="100%"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        flexDir="row"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>My Chats</Text>
        <GroupChatModal>
          <Text
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: "#A1DBF1",
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            New Group Chat
          </Text>
        </GroupChatModal>
      </Box>

      <Box
        flex={1}
        bg="#F8F8F8"
        w="100%"
        borderRadius="lg"
        px={3}
        py={3}
        overflowY="auto"
      >
        {chats ? (
          <Stack space={3}>
            {chats.map((chat) => (
              <Pressable key={chat._id} onPress={() => setTheChat(chat)}>
                <Box
                  bg={selectedChat === chat ? "#00BFFF" : "#A1DBF1"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                >
                  <Text fontWeight="bold">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs" color="gray.700" isTruncated>
                      <Text fontWeight="bold">
                        {chat.latestMessage.sender?.name}:{" "}
                      </Text>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Pressable>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

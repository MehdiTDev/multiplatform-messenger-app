import React, { useState, useEffect } from "react";
import { Box, Text, useToast, Stack } from "native-base";
import { StyleSheet, Pressable } from "react-native";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import axios from "axios";

export default function MyChats() {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  // Track the hover state of the "New Group Chat" button
  const [hovered, setHovered] = useState(false);

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
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <Box
      flexDir={{ base: selectedChat ? "none" : "column", md: "column" }}
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* Header */}
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
          <Pressable
            onMouseEnter={() => setHovered(true)} // Mouse enter sets hovered to true
            onMouseLeave={() => setHovered(false)} // Mouse leave sets hovered to false
          >
            <Text style={[styles.newGroupChatBtn, hovered && styles.hovered]}>
              New Group Chat
            </Text>
          </Pressable>
        </GroupChatModal>
      </Box>

      {/* Chat List Container */}
      <Box
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="calc(100vh - 150px)"
        borderRadius="lg"
        overflowY="auto"
      >
        {chats ? (
          <Box flex={1} overflowY="auto">
            <Stack space={3}>
              {chats.map((chat) => (
                <Pressable key={chat._id} onPress={() => setSelectedChat(chat)}>
                  <Box
                    style={[
                      styles.chatItem,
                      {
                        backgroundColor:
                          selectedChat === chat ? "#38B2AC" : "#87CEFA",
                      },
                    ]}
                  >
                    <Text color={selectedChat === chat ? "white" : "black"}>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text
                        fontSize="xs"
                        color={selectedChat === chat ? "white" : "black"}
                      >
                        <Text fontWeight="bold">
                          {chat.latestMessage.sender.name}:
                        </Text>{" "}
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
                  </Box>
                </Pressable>
              ))}
            </Stack>
          </Box>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  newGroupChatBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#87CEFA",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    transition: "background-color 0.3s ease", // Smooth transition effect
  },
  hovered: {
    backgroundColor: "#4682B4", // Change the color when hovered
  },
  chatItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

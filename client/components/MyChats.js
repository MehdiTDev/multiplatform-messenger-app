import React, { useState, useEffect } from "react";
import { Box, Text, useToast, Button, Stack, Icon, PresenceTransition, TouchableOpacity } from "native-base";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import axios from "axios";
import { Pressable } from "react-native";



export default function MyChats() {



  const [loggedUser, setLoggedUser] = useState()
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast()

  const fetchChats = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5000/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
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
              backgroundColor: "#9B4DCA", // Purple color equivalent
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
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack space={3}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onPress={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>

  );
};



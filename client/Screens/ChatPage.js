import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  Input,
  IconButton,
  Icon,
  Divider,
  Pressable,
  ScrollView,
} from "native-base";
import { ChatState } from "../Context/ChatProvider";

export default function ChatPage({ navigation }) {
  const { user } = ChatState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigation.navigate("HomePage");
    } else {
      setUser(userInfo);
      setActiveChat(chats[0]);
      if (chats[0]) {
        setMessages(chatMessages[chats[0].id] || []);
      }
    }
  }, []);

  return (
    <HStack flex={1} bg="white" safeArea>
      {/* {user && <SideDrawer/>}  */}
      <Box>
        {/* {user && <MyChats/>}  */}
        {/* {user && <ChatBox />}  */}
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

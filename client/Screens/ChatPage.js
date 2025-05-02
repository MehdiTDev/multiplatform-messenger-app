import React from "react";
import { StyleSheet } from "react-native";
import { Box, VStack, HStack } from "native-base";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

export default function ChatPage({ navigation }) {
  const { user } = ChatState();

  return (
    <VStack style={styles.mainContainer}>
      {/* SideDrawer at the top */}
      {user && <SideDrawer />}

      {/* Horizontal chat area with space-between */}
      <HStack style={styles.chatContainer}>
        {user && <MyChats style={styles.myChats} />}
        {user && <Chatbox style={styles.chatbox} />}
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#00BFFF",
  },
  chatContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    padding: 10, // equivalent to p={2} in NativeBase
  },
  myChats: {
    width: "30%",
  },
  chatBox: {
    width: "68%",
  },
});

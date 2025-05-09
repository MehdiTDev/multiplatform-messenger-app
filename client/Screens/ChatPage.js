import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, SafeAreaView } from "react-native";
import { Box, VStack, HStack } from "native-base";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/ChatBox";

export default function ChatPage({ navigation }) {
  const { user, selectedChat } = ChatState();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [fetchAgain, setFetchAgain] = useState(false);

  console.log("this is the chatPage")
  console.log(" ChatPage; user:", user)
  return (

    <SafeAreaView style={styles.SafeAreaContainer}>

      <VStack style={styles.mainContainer}>
        {/* SideDrawer at the top */}
        {user && <SideDrawer />}
        {/* Horizontal chat area */}
        <HStack style={styles.chatContainer}>
          {/* Show MyChats if not mobile OR if mobile and no chat is selected */}
          {user && (!isMobile || (isMobile && !selectedChat)) && (
            <Box style={isMobile ? styles.fullWidth : styles.myChats}>
              <MyChats fetchAgain={fetchAgain} />
            </Box>
          )}

          {/* Show Chatbox if not mobile OR if mobile and chat is selected */}
          {user && (!isMobile || (isMobile && selectedChat)) && (
            <Box style={isMobile ? styles.fullWidth : styles.chatBox}>
              <Chatbox />
            </Box>
          )}
        </HStack>
      </VStack>
    </SafeAreaView>

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
    flexDirection: "row",
    padding: 10,
  },
  myChats: {
    width: "30%", // Adjust the width as needed for larger screens
    marginRight: 10,
  },
  chatBox: {
    flex: 1, // Takes the remaining space
  },
  fullWidth: {
    width: "100%",
  },
  SafeAreaContainer: {

    flex: 1,
    padding: 16,

  },
});

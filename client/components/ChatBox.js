import React from "react";
import { useWindowDimensions } from "react-native";
import { Box } from "native-base";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  // Conditionally render only when chat is selected on mobile
  if (isMobile && !selectedChat) {
    return null;
  }

  return (
    <Box flex={1} w="100%" bg="white" borderRadius="lg">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;

import React from "react";
import { useWindowDimensions } from "react-native";
import { Box } from "native-base";
// import SingleChat from "./SingleChat";
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
    <Box
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="white"
      w={isMobile ? "100%" : "100%"} // Make it take full width on larger screens
      borderRadius="lg"
      borderWidth={1}
      flex={1} // Ensure it grows to fill the available space
    >
      {/* <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
    </Box>
  );
};

export default Chatbox;

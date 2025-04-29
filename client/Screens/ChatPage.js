import React, { useState } from "react";
import { Box, VStack, HStack } from "native-base";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { ScrollView } from "react-native";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box flex={1} bg="white">
      {user && <SideDrawer />}

      {/* You can use HStack here if you're on tablet/web, otherwise VStack is best for mobile */}
      <HStack space={2} justifyContent="space-between" w="100%" h="91.5%" p={2}>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </HStack>
    </Box>
  );
};

export default Chatpage;

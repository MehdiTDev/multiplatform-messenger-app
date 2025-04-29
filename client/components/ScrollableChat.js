import React, { useRef, useEffect } from "react";
import { Avatar, Tooltip, Text, Box, HStack, ScrollView } from "native-base";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const scrollViewRef = useRef();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {messages &&
        messages.map((m, i) => (
          <HStack key={m._id} space={2} alignItems="flex-start">
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="2"
                  mr="2"
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  source={{ uri: m.sender.pic }}
                />
              </Tooltip>
            )}
            <Box
              bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
              ml={isSameSenderMargin(messages, m, i, user._id)}
              mt={isSameUser(messages, m, i, user._id) ? 1 : 3}
              borderRadius="full"
              px={3}
              py={2}
              maxW="75%"
            >
              <Text>{m.content}</Text>
            </Box>
          </HStack>
        ))}
    </ScrollView>
  );
};

export default ScrollableChat;

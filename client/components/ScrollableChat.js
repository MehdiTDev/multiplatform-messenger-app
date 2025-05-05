import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Avatar, Text, Tooltip, HStack } from "native-base";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({
  messages,
  istyping,
  selectedChat,
  scrollViewRef,
}) => {
  const { user } = ChatState();

  useEffect(() => {
    if (scrollViewRef?.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, istyping]);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      ref={scrollViewRef}
    >
      {messages &&
        messages.map((m, i) => {
          const isFromCurrentUser = m.sender._id === user._id;
          const showAvatar =
            isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id);

          return (
            <Box
              key={m._id}
              width="100%"
              flexDirection="row"
              justifyContent={isFromCurrentUser ? "flex-end" : "flex-start"}
              mb={2}
              px={2}
            >
              {!isFromCurrentUser && showAvatar && (
                <Tooltip label={m.sender.name} openDelay={500}>
                  <Avatar
                    mt={1}
                    mr={2}
                    size="sm"
                    source={{ uri: m.sender.pic }}
                    name={m.sender.name}
                  />
                </Tooltip>
              )}

              <Box
                bg={isFromCurrentUser ? "#BEE3F8" : "#B9F5D0"}
                ml={
                  !isFromCurrentUser
                    ? isSameSenderMargin(messages, m, i, user._id)
                    : 0
                }
                mt={isSameUser(messages, m, i, user._id) ? 1 : 3}
                px={4}
                py={2}
                borderRadius="2xl"
                maxWidth="75%"
              >
                <Text>{m.content}</Text>
              </Box>
            </Box>
          );
        })}

      {istyping && (
        <Box flexDirection="row" alignItems="center" mt={1} px={2}>
          <Avatar
            size="sm"
            name="typing"
            source={{
              uri: selectedChat.users.find((u) => u._id !== user._id)?.pic,
            }}
            mr={2}
          />
          <HStack space={1}>
            <Box w={2} h={2} bg="gray.400" rounded="full" />
            <Box w={2} h={2} bg="gray.400" rounded="full" />
            <Box w={2} h={2} bg="gray.400" rounded="full" />
          </HStack>
        </Box>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 10,
  },
});

export default ScrollableChat;

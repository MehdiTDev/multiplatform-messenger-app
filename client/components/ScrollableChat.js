import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Box, Avatar, Text, Tooltip } from "native-base";
import {
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
    >
      {messages &&
        messages.map((m, i) => {
          const isFromCurrentUser = m.sender._id === user._id;
          const showAvatar =
            !isFromCurrentUser && isLastMessage(messages, i, user._id);

          return (
            <Box
              key={m._id}
              width="100%"
              flexDirection="row"
              justifyContent={isFromCurrentUser ? "flex-end" : "flex-start"}
              mb={2}
              px={2}
            >
              {/* Received Messages (Left Side) */}
              {!isFromCurrentUser && (
                <Box flexDirection="row" alignItems="flex-end" maxWidth="80%">
                  {showAvatar && (
                    <Tooltip label={m.sender.name} openDelay={500}>
                      <Avatar
                        mt={1}
                        mr={2}
                        size="sm"
                        source={{ uri: m.sender.pic }}
                      />
                    </Tooltip>
                  )}
                  <Box
                    bg="#B9F5D0"
                    ml={isSameSenderMargin(messages, m, i, user._id)}
                    mt={isSameUser(messages, m, i, user._id) ? 1 : 3}
                    px={4}
                    py={2}
                    borderRadius="2xl"
                  >
                    <Text>{m.content}</Text>
                  </Box>
                </Box>
              )}

              {/* Sent Messages (Right Side) */}
              {isFromCurrentUser && (
                <Box
                  bg="#BEE3F8"
                  mt={isSameUser(messages, m, i, user._id) ? 1 : 3}
                  px={4}
                  py={2}
                  borderRadius="2xl"
                  maxWidth="80%"
                >
                  <Text>{m.content}</Text>
                </Box>
              )}
            </Box>
          );
        })}
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

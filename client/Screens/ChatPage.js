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
import { MaterialIcons } from "@expo/vector-icons";

export default function ChatPage({ navigation }) {
  const [user, setUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Alice",
      lastMessage: "woooo",
      time: "10:30 AM",
      unread: 2,
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: 2,
      name: "Roadside Code",
      lastMessage: "yo",
      time: "Yesterday",
      unread: 0,
      avatar: "https://example.com/avatar2.jpg",
    },
    {
      id: 3,
      name: "Guest User",
      lastMessage: "susp",
      time: "2 days ago",
      unread: 0,
      avatar: "https://example.com/avatar3.jpg",
    },
    {
      id: 4,
      name: "Karle Vedant Prasad",
      lastMessage: "hello there",
      time: "1 week ago",
      unread: 1,
      avatar: "https://example.com/avatar4.jpg",
    },
  ]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigation.navigate("HomePage");
    } else {
      setUser(userInfo);
      setActiveChat(chats[0]); // Set first chat as active by default
    }
  }, []);

  if (!user) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <HStack flex={1} bg="coolGray.100">
      {/* Left sidebar - Chat list */}
      <Box
        w="30%"
        borderRightWidth={1}
        borderRightColor="coolGray.200"
        bg="white"
      >
        <VStack space={4} flex={1}>
          {/* Search bar */}
          <Box p={3} bg="white">
            <Input
              placeholder="Search User"
              variant="filled"
              borderRadius={10}
              py={2}
              px={3}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="search" />}
                  size={5}
                  ml={2}
                  color="coolGray.400"
                />
              }
              value={searchText}
              onChangeText={setSearchText}
            />
          </Box>

          {/* My Chats section */}
          <Box px={3}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              My Chats
            </Text>
            <Divider mb={2} />
          </Box>

          {/* Chat list */}
          <ScrollView flex={1}>
            {chats.map((chat) => (
              <Pressable
                key={chat.id}
                onPress={() => setActiveChat(chat)}
                bg={activeChat?.id === chat.id ? "blue.50" : "white"}
              >
                <HStack
                  space={3}
                  p={3}
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="coolGray.100"
                >
                  <Avatar source={{ uri: chat.avatar }} size="sm" />
                  <VStack flex={1}>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="medium">{chat.name}</Text>
                      <Text fontSize="xs" color="coolGray.500">
                        {chat.time}
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color="coolGray.500" numberOfLines={1}>
                      {chat.lastMessage}
                    </Text>
                  </VStack>
                  {chat.unread > 0 && (
                    <Box
                      bg="blue.500"
                      borderRadius="full"
                      w={5}
                      h={5}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text color="white" fontSize="xs">
                        {chat.unread}
                      </Text>
                    </Box>
                  )}
                </HStack>
              </Pressable>
            ))}
          </ScrollView>
        </VStack>
      </Box>

      {/* Right side - Chat area */}
      <Box flex={1} bg="white">
        {activeChat ? (
          <VStack flex={1}>
            {/* Chat header */}
            <HStack
              p={3}
              space={2}
              alignItems="center"
              borderBottomWidth={1}
              borderBottomColor="coolGray.200"
            >
              <Avatar source={{ uri: activeChat.avatar }} size="sm" />
              <VStack flex={1}>
                <Text fontWeight="bold">{activeChat.name}</Text>
                <Text fontSize="xs" color="coolGray.500">
                  last seen recently
                </Text>
              </VStack>
              <HStack space={4}>
                <IconButton
                  icon={<Icon as={MaterialIcons} name="search" />}
                  size="sm"
                  colorScheme="gray"
                />
                <IconButton
                  icon={<Icon as={MaterialIcons} name="more-vert" />}
                  size="sm"
                  colorScheme="gray"
                />
              </HStack>
            </HStack>

            {/* Chat messages area */}
            <Box flex={1} p={4} bg="blue.50">
              <Text>Chat messages will appear here</Text>
            </Box>

            {/* Message input */}
            <HStack p={3} space={2} alignItems="center" bg="white">
              <IconButton
                icon={<Icon as={MaterialIcons} name="insert-emoticon" />}
                size="sm"
                colorScheme="gray"
              />
              <Input
                flex={1}
                placeholder="Type a message"
                variant="filled"
                borderRadius={20}
                py={2}
              />
              <IconButton
                icon={<Icon as={MaterialIcons} name="send" />}
                size="sm"
                colorScheme="blue"
              />
            </HStack>
          </VStack>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text>Select a chat to start messaging</Text>
          </Box>
        )}
      </Box>
    </HStack>
  );
}

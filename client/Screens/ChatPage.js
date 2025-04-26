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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Piyush",
      lastMessage: "woooo",
      time: "10:30 AM",
      unread: 2,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      status: "online",
    },
    {
      id: 2,
      name: "Roadside Code",
      lastMessage: "yo",
      time: "Yesterday",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      status: "last seen 2h ago",
    },
    {
      id: 3,
      name: "Guest User",
      lastMessage: "susp",
      time: "2 days ago",
      unread: 0,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      status: "offline",
    },
    {
      id: 4,
      name: "Karle Vedant Prasad",
      lastMessage: "hello there",
      time: "1 week ago",
      unread: 1,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      status: "online",
    },
  ]);

  // Sample messages for active chat
  const chatMessages = {
    1: [
      { id: 1, text: "Hello there!", time: "10:30 AM", sent: false },
      { id: 2, text: "Hi! How are you?", time: "10:32 AM", sent: true },
      { id: 3, text: "I'm good, thanks!", time: "10:33 AM", sent: false },
      { id: 4, text: "What about you?", time: "10:33 AM", sent: false },
    ],
    4: [
      { id: 1, text: "Welcome to Talk-A-Tive!", time: "9:00 AM", sent: false },
      { id: 2, text: "Thanks! Glad to be here", time: "9:05 AM", sent: true },
    ],
  };

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

  useEffect(() => {
    if (activeChat) {
      setMessages(chatMessages[activeChat.id] || []);
    }
  }, [activeChat]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  if (!user) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="white">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <HStack flex={1} bg="white" safeArea>
      {/* Left sidebar - Chat list (30% width) */}
      <Box w="30%" borderRightWidth={1} borderRightColor="coolGray.200">
        <VStack space={4} flex={1}>
          {/* Search bar */}
          <Box p={3} bg="white">
            <Input
              placeholder="Search User"
              variant="filled"
              borderRadius={10}
              py={2}
              px={3}
              bg="coolGray.100"
              borderColor="coolGray.200"
              _focus={{ bg: "white", borderColor: "#00BFFF" }}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="search" />}
                  size={5}
                  ml={2}
                  color="coolGray.500"
                />
              }
              value={searchText}
              onChangeText={setSearchText}
            />
          </Box>

          {/* Create Group Chat Button */}
          <Box px={3} pt={2}>
            <Pressable
              onPress={() => {
                // Navigate or open modal to create group chat
                console.log("Create Group Chat Pressed");
                // navigation.navigate('CreateGroupChat') // if you have a screen
              }}
              bg="#00BFFF"
              borderRadius={10}
              py={2}
              alignItems="center"
              mb={3}
            >
              <Text color="white" fontWeight="bold">
                + Create Group Chat
              </Text>
            </Pressable>
          </Box>

          {/* My Chats section */}
          <Box px={3}>
            <Text fontSize="lg" fontWeight="bold" mb={2} color="coolGray.800">
              My Chats
            </Text>
            <Divider mb={2} bg="coolGray.200" />
          </Box>

          {/* Chat list */}
          <ScrollView flex={1}>
            {chats.map((chat) => (
              <Pressable
                key={chat.id}
                onPress={() => setActiveChat(chat)}
                bg={activeChat?.id === chat.id ? "#E3F2FD" : "white"}
              >
                <HStack
                  space={3}
                  p={3}
                  alignItems="center"
                  borderBottomWidth={1}
                  borderBottomColor="coolGray.100"
                >
                  <Box position="relative">
                    <Avatar source={{ uri: chat.avatar }} size="sm" />
                    {chat.status === "online" && (
                      <Box
                        position="absolute"
                        bottom={0}
                        right={0}
                        w={3}
                        h={3}
                        bg="green.500"
                        borderRadius="full"
                        borderWidth={2}
                        borderColor="white"
                      />
                    )}
                  </Box>
                  <VStack flex={1}>
                    <HStack justifyContent="space-between">
                      <Text fontWeight="medium" color="coolGray.800">
                        {chat.name}
                      </Text>
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
                      bg="#00BFFF"
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

      {/* Right side - Chat area (70% width) */}
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
              bg="white"
            >
              <Box position="relative">
                <Avatar source={{ uri: activeChat.avatar }} size="sm" />
                {activeChat.status === "online" && (
                  <Box
                    position="absolute"
                    bottom={0}
                    right={0}
                    w={3}
                    h={3}
                    bg="green.500"
                    borderRadius="full"
                    borderWidth={2}
                    borderColor="white"
                  />
                )}
              </Box>
              <VStack flex={1}>
                <Text fontWeight="bold" color="coolGray.800">
                  {activeChat.name}
                </Text>
                <Text fontSize="xs" color="coolGray.500">
                  {activeChat.status}
                </Text>
              </VStack>
              <HStack space={4}>
                <IconButton
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name="search"
                      color="coolGray.600"
                    />
                  }
                  size="sm"
                  variant="ghost"
                />
                <IconButton
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name="more-vert"
                      color="coolGray.600"
                    />
                  }
                  size="sm"
                  variant="ghost"
                />
              </HStack>
            </HStack>

            {/* Chat messages area */}
            <ScrollView flex={1} p={4} bg="coolGray.50">
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  alignSelf={msg.sent ? "flex-end" : "flex-start"}
                  bg={msg.sent ? "#E3F2FD" : "white"}
                  p={3}
                  borderRadius={8}
                  mb={2}
                  maxW="80%"
                >
                  <Text color="coolGray.800">{msg.text}</Text>
                  <Text fontSize="xs" color="coolGray.500" textAlign="right">
                    {msg.time}
                  </Text>
                </Box>
              ))}
            </ScrollView>

            {/* Message input */}
            <HStack
              p={3}
              space={2}
              alignItems="center"
              bg="white"
              borderTopWidth={1}
              borderTopColor="coolGray.200"
            >
              <IconButton
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="insert-emoticon"
                    color="coolGray.600"
                  />
                }
                size="sm"
                variant="ghost"
              />
              <Input
                flex={1}
                placeholder="Type a message"
                variant="filled"
                borderRadius={20}
                py={2}
                bg="coolGray.100"
                borderColor="coolGray.200"
                _focus={{ bg: "white", borderColor: "#00BFFF" }}
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSendMessage}
              />
              <IconButton
                icon={<Icon as={MaterialIcons} name="send" color="white" />}
                size="sm"
                bg="#00BFFF"
                borderRadius="full"
                onPress={handleSendMessage}
              />
            </HStack>
          </VStack>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center" bg="white">
            <Text color="coolGray.500">Select a chat to start messaging</Text>
          </Box>
        )}
      </Box>
    </HStack>
  );
}

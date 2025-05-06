import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Icon,
  Text,
  Button,
  Avatar,
  Menu,
  Pressable,
  Input,
  Spinner,
  Divider,
  Slide,
  useDisclose,
  Tooltip,
  useToast,
  Stack,
} from "native-base";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ENDPOINT = "http://localhost:5000"; // Change to your backend URL
let socket;

export default function SideDrawer() {

  var storage = localStorage

  if (Platform.OS === 'web') {
    storage = localStorage
  } else if (Platform.OS === 'ios') {
    storage = AsyncStorage
  } else if (Platform.OS === 'android') {
    storage = AsyncStorage

  }




  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const toast = useToast();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);

    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
        setNotification((prev) => {
          if (prev.find((n) => n._id === newMessageReceived._id)) return prev;
          return [newMessageReceived, ...prev];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const logoutHandler = () => {
    storage.removeItem("userInfo");
    navigation.navigate("HomePage");
  };

  const searchHandler = async (query) => {
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${query}`,
        config
      );

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.show({
        title: "Error searching",
        description: "Failed to find results",
        status: "error",
        duration: 1000,
        placement: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/chat`,
        { userId },
        config
      );

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);

      toast.show({
        title: "Error",
        description: "Chat not found",
        status: "error",
        duration: 1000,
        placement: "top-left",
      });
    }
  };

  return (
    <>
      {/* Header */}
      <Box style={styles.header}>
        {/* Search Button */}
        <Tooltip label="Search Users to chat" placement="bottom right">
          <Pressable onPress={onOpen}>
            <HStack alignItems="center" space={2}>
              <Icon as={FontAwesome} name="search" size="sm" color="black" />
              <Text display={{ base: "none", md: "flex" }}>Search User</Text>
            </HStack>
          </Pressable>
        </Tooltip>

        {/* Title */}
        <Text style={styles.title}>Multi Chat</Text>

        {/* Right Menu */}
        <HStack space={4} alignItems="center">
          {/* Notification Bell */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <HStack alignItems="center">
                  {notification.length > 0 && (
                    <Box style={styles.notificationDot} />
                  )}
                  <Icon as={Ionicons} name="notifications" size="lg" />
                </HStack>
              </Pressable>
            )}
          >
            {notification.length === 0 ? (
              <Menu.Item>No New Messages</Menu.Item>
            ) : (
              notification.map((notif) => (
                <Menu.Item
                  key={notif._id}
                  onPress={() => {
                    setSelectedChat(notif.chat);
                    setNotification((prev) =>
                      prev.filter((n) => n._id !== notif._id)
                    );
                  }}
                >
                  <Text fontWeight="bold">
                    {notif.chat.isGroupChat
                      ? `Group: ${notif.chat.chatName}`
                      : `From: ${notif.sender.name}`}
                  </Text>
                  <Text numberOfLines={1}>{notif.content}</Text>
                </Menu.Item>
              ))
            )}
          </Menu>

          {/* Profile Dropdown */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <HStack alignItems="center">
                  <Avatar size="sm" name={user.name} source={user.pic} />
                  <Icon
                    as={MaterialIcons}
                    name="keyboard-arrow-down"
                    size="md"
                  />
                </HStack>
              </Pressable>
            )}
          >
            <Menu.Item>
              <ProfileModal user={user}>
                <Text>My Profile</Text>
              </ProfileModal>
            </Menu.Item>

            <Divider />
            <Menu.Item onPress={logoutHandler}>Logout</Menu.Item>
          </Menu>
        </HStack>
      </Box>

      {/* Slide-out Drawer */}


      {isOpen && (
        <Pressable
          onPress={onClose}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="transparent"
          zIndex={9}
        />
      )}





      <Slide in={isOpen} placement="left" duration={300}>
        <Box w="300px" h="100%" bg="white" shadow={9} p="5" safeArea zIndex={10} >
          <Text fontSize="xl" mb="4">
            Search users
          </Text>

          <HStack space={2} w="100%" px={4} mb={3}>
            <Input
              h={10}
              placeholder="Search by name or email"
              bg="gray.100"
              onChangeText={searchHandler}
            />

          </HStack>


          <Box maxHeight="80%" overflowY="auto">
            <Stack>

              {loading ? (
                <ChatLoading />
              ) : (

                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))

              )}
            </Stack>
          </Box>

          {loadingChat && <Spinner ml="auto" d="flex" />}

        </Box>
      </Slide>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
  },
  notificationDot: {
    backgroundColor: "#EF4444",
    borderRadius: 9999,
    width: 12,
    height: 12,
    position: "absolute",
    top: -2,
    right: -2,
    zIndex: 1,
  },
});
